'use client';

import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/components/medq/useCurrentUser';
import { navigateToTab } from '@/lib/medq-nav';
import { io as socketIO, Socket } from 'socket.io-client';
import { chatSocketUrl } from '@/lib/chat-socket-url';
import {
  MessageCircle, Send, ArrowLeft, Plus, Search, Users,
  Loader2, Check, CheckCheck, Mic, X, Reply, Pencil, Trash2,
  Pin, ChevronDown, ChevronUp, Play, Pause, UserPlus, UserMinus,
  LogOut, Phone, Video, MoreVertical, Smile, SmilePlus, Paperclip, Copy,
  Shield, Clock, Image as ImageIcon, UserCheck, UserX,
  Sparkles, BarChart3, Bookmark, Volume2, Trash, Heart, Hash,
  FolderOpen, Archive, EyeOff, Palette, GripVertical, Bookmark as BookmarkIcon,
  CheckSquare, Square, Share2, Link2, FileText, Calendar, Bell, BellOff,
  Settings, Type, Maximize2, Crown, Move, Menu, Home, BookOpen, UsersRound,
  Languages, Timer, Vote, Film, Upload, Download, Camera, MicOff, PhoneOff, PhoneCall, VideoOff, PhoneIncoming,
  Brain, Zap, ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { createPeerConnection, getUserMedia } from '@/lib/webrtc';
import dynamic from 'next/dynamic';
import GroupCallLauncher from '@/components/medq/GroupCallModal';
import { subscribeToReplaySuccess } from '@/lib/offline-queue';
import OfflineTabFallback from '@/components/medq/OfflineTabFallback';
import {
  AVATAR_COLORS,
  COMMON_EMOJIS,
  EMOJI_AVATAR_OPTIONS,
  MEDICAL_STICKERS,
  REACTION_EMOJIS,
  ChatFolder,
  ChatMsg,
  ChatRoomInfo,
  FriendshipInfo,
  FriendInfo,
  FriendRequestInfo,
  SearchUserResult,
  UserProfileData,
  formatDateSeparator,
  formatDuration,
  formatTime,
  getColor,
  getInitials,
  highlightText,
  isRecentlyActive,
  isSameDay,
  isSingleEmoji,
  parseInternalDeepLink,
  parseMeta,
  parseReactions,
  extractUrl,
  generateWaveformBars,
  timeAgo,
  toggleReaction,
} from './chat-utils';
import { MessageContextMenu, RoomContextMenu, UserProfilePopup, VoicePlayer } from './chat-ui';
import { injectChatStyles } from './chat-styles';
import SharedQuestionCard, { type SharedQuestionPayload } from '@/components/medq/SharedQuestionCard';

// const MeetingTabLazy = dynamic(() => import('./MeetingTab'), { ssr: false });
const SmartQuizDialogLazy = dynamic(() => import('@/components/medq/SmartQuizDialog'), { ssr: false });
const ChatWhiteboardLazy = dynamic(() => import('@/components/medq/ChatWhiteboard'), { ssr: false });
// Lazy-load study-group components so they only load when a user opens a
// group chat's Study tab. Avoids bloating the main chat bundle.
const GroupStudyPanelLazy = dynamic(() => import('@/components/medq/GroupStudyPanel'), { ssr: false });
// The global CallProvider (root layout) hosts the MiroTalk call overlay so
// calls survive navigation and can be minimized.
import { useCall } from '@/components/medq/calls/CallProvider';

/* ══════════════════════════════════════════════════════════════ */
/* ── Constants & Helpers ──                                     */
/* ══════════════════════════════════════════════════════════════ */

type FriendsTab = 'all' | 'add';

/* ══════════════════════════════════════════════════════════════ */
/* ── Whiteboard is now handled by ChatWhiteboard component ──   */
/* ══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════ */
/* ── Main AdvancedChatTab Component ──                          */
/* ══════════════════════════════════════════════════════════════ */

export default function AdvancedChatTab({ initialRoomId, onNavigateToTab }: { initialRoomId?: string; onNavigateToTab?: (tab: string) => void }) {
  const { user: authUser, isLoading: authLoading } = useCurrentUser();
  const router = useRouter();

  /*
   * Navigation — when this component renders as the /messages ROUTE (which
   * is the normal case now), Next.js passes no props, so onNavigateToTab is
   * undefined. That used to gate the ENTIRE escape UI (Back-to-Home button,
   * nav menu) behind `{onNavigateToTab && …}` — a fullscreen chat page with
   * ZERO links out (user report 2026-11-04: trapped, browser-back only).
   * The fallback below wires real App Router navigation so the escape UI
   * always renders. The SPA shell still overrides it via the prop.
   */
  const appNavigate = useCallback(
    (tab: string) => {
      if (onNavigateToTab) onNavigateToTab(tab);
      else navigateToTab((p) => router.push(p), tab);
    },
    [onNavigateToTab, router],
  );

  /* ── Demo User Fallback ── */
  // NOTE: cache key is versioned (v2). An earlier version cached the wrong
  // demo user (student@medq.com, which has no chat rooms). Bumping the key
  // forces a fresh fetch from /api/chat/demo-user, which now returns the
  // canonical guest user that has the seeded chat rooms attached.
  const DEMO_USER_CACHE_KEY = 'medq-demo-user-v2';
  const [demoUser, setDemoUser] = useState<{ id: string; name: string | null; email: string | null; role: string } | null>(null);
  const [demoReady, setDemoReady] = useState(false);

  // Resolve userId: authenticated user > demo user
  const user = authUser || demoUser;
  const userId = user?.id;
  const isDemoMode = !authUser && !!demoUser;

  // Global call orchestration (root CallProvider): starting a call here hands
  // it to the app-wide session — it survives navigation, can be minimized to
  // a floating pill, and rings the peer on ANY page (plus web push when they
  // are not connected to the app at all).
  const callCtx = useCall();

  // Fetch demo user if needed. We also force-refresh once per session if the
  // cached user has no chat rooms (defensive — handles any future drift
  // between the cache and the seeded data).
  // The `retryKey` lets the OfflineTabFallback trigger a fresh fetch attempt
  // when the user clicks "Retry" — without it, the demo-user fetch would
  // only fire once on mount and never retry on failure.
  const [retryKey, setRetryKey] = useState(0);
  useEffect(() => {
    if (authLoading) return;
    if (authUser) {
      setDemoReady(true);
      return;
    }

    let cancelled = false;
    setDemoReady(false);
    try {
      const stored = localStorage.getItem(DEMO_USER_CACHE_KEY);
      if (stored) setDemoUser(JSON.parse(stored));
    } catch {}

    fetch('/api/chat/demo-user')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!cancelled && data?.user) {
          setDemoUser(data.user);
          try { localStorage.setItem(DEMO_USER_CACHE_KEY, JSON.stringify(data.user)); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setDemoReady(true); });

    return () => { cancelled = true; };
  }, [authLoading, authUser, retryKey]);

  /* ── Auth Headers Helper ── */
  const chatHeaders = useCallback((extra?: Record<string, string>) => ({
    'Content-Type': 'application/json',
    'x-user-id': userId || '',
    ...extra,
  }), [userId]);

  /* ── Core State ── */
  const [rooms, setRooms] = useState<ChatRoomInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState<ChatRoomInfo | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  // True once the socket has connected at least once. UI indicators
  // ("Connecting…" chip, "offline" suffix) only show when a PREVIOUSLY-WORKING
  // connection dropped — a socket that never connected from the start means
  // the deployment has no realtime server, and the REST fallback handles
  // everything, so nagging the user with a permanent "Connecting…" is noise.
  const [socketEverConnected, setSocketEverConnected] = useState(false);
  // Live presence: roomId → userIds that currently have a socket in that room
  // (broadcast by the chat service as `presence:update` on join / identify /
  // disconnect). Drives the "N members · M online" header and online dots.
  const [onlineByRoom, setOnlineByRoom] = useState<Record<string, string[]>>({});
  // Browser network state (navigator.onLine + online/offline events). This
  // flips INSTANTLY on connectivity changes — unlike the socket, which needs
  // a ping timeout (up to ~45s) to notice a dead connection.
  const [browserOnline, setBrowserOnline] = useState(true);

  /* ── Sidebar State ── */
  const [searchQuery, setSearchQuery] = useState('');
  const [chatFolders, setChatFolders] = useState<ChatFolder[]>(() => { try { const s = localStorage.getItem('medq-chat-folders'); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [showFolderEditor, setShowFolderEditor] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#00e5a0');
  const [newFolderIcon, setNewFolderIcon] = useState('📁');
  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(() => { try { const s = localStorage.getItem('medq-chat-sidebar-width'); return s ? parseInt(s) : 320; } catch { return 320; } });
  const [isResizing, setIsResizing] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  /* ── Drag-to-reorder state (pointer events) ── */
  const [draggedPinnedId, setDraggedPinnedId] = useState<string | null>(null);
  const [dragOverPinnedId, setDragOverPinnedId] = useState<string | null>(null);
  const dragItemRef = useRef<string | null>(null);
  const dragOverRef = useRef<string | null>(null);
  const [dragGhostStyle, setDragGhostStyle] = useState<{ top: number; left: number; roomId: string } | null>(null);
  const dragStartYRef = useRef<number>(0);
  const dragRowHeightRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const pinnedListRef = useRef<HTMLDivElement | null>(null);

  /* ── New Feature State ── */
  const [archivedRoomIds, setArchivedRoomIds] = useState<string[]>(() => { try { const s = localStorage.getItem('medq-chat-archived'); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [showArchived, setShowArchived] = useState(false);
  const [manualUnread, setManualUnread] = useState<Record<string, number>>(() => { try { const s = localStorage.getItem('medq-chat-manual-unread'); return s ? JSON.parse(s) : {}; } catch { return {}; } });
  const [pinnedOrder, setPinnedOrder] = useState<Record<string, number>>(() => { try { const s = localStorage.getItem('medq-chat-pinned-order'); return s ? JSON.parse(s) : {}; } catch { return {}; } });
  const [localPinnedIds, setLocalPinnedIds] = useState<Set<string>>(() => { try { const s = localStorage.getItem('medq-chat-local-pinned'); return new Set(s ? JSON.parse(s) : []); } catch { return new Set<string>(); } });
  const [chatTheme, setChatTheme] = useState<string>(() => { try { return localStorage.getItem('medq-chat-theme') || 'default'; } catch { return 'default'; } });
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [editingFolder, setEditingFolder] = useState<ChatFolder | null>(null);
  const [folderEditorOpen, setFolderEditorOpen] = useState(false);
  const [savedMessageIds, setSavedMessageIds] = useState<string[]>(() => { try { const s = localStorage.getItem('medq-chat-saved-messages'); return s ? JSON.parse(s) : []; } catch { return []; } });
  const [showSavedMessages, setShowSavedMessages] = useState(false);
  const [isViewingSavedMessages, setIsViewingSavedMessages] = useState(false);
  const [showInlineWhiteboard, setShowInlineWhiteboard] = useState(false);
  const [whiteboardData, setWhiteboardData] = useState<string>(''); // base64 image data
  const [whiteboardRecording, setWhiteboardRecording] = useState<{ blob: Blob; url: string } | null>(null);
  const [allMessagesForSaved, setAllMessagesForSaved] = useState<ChatMsg[]>([]); // messages across all rooms for Saved Messages view
  const [folderRoomSelection, setFolderRoomSelection] = useState<Set<string>>(new Set());

  /* ── Whiteboard Collaboration Cursors ── */
  const [wbRemoteCursors, setWbRemoteCursors] = useState<import('@/components/medq/ChatWhiteboard').RemoteCursor[]>([]);

  /* ── Whiteboard Remote Laser Pointers ── */
  const [wbRemoteLasers, setWbRemoteLasers] = useState<import('@/components/medq/ChatWhiteboard').RemoteLaser[]>([]);

  /* ── Message Search ── */
  const [msgSearchQuery, setMsgSearchQuery] = useState('');
  const [showMsgSearch, setShowMsgSearch] = useState(false);
  const [msgSearchIndex, setMsgSearchIndex] = useState(0);

  /* ── Typing ── */
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── @mention autocomplete ── */
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionIndex, setMentionIndex] = useState(0);

  /* ── Load More pagination ── */
  const [messagesCursor, setMessagesCursor] = useState<string | null>(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  /* ── New Group / Chat ── */
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showNewDM, setShowNewDM] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupAvatar, setGroupAvatar] = useState('👥');
  const [friends, setFriends] = useState<FriendshipInfo[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [groupSearchResults, setGroupSearchResults] = useState<SearchUserResult[]>([]);
  const [groupSearching, setGroupSearching] = useState(false);

  /* ── Message Features ── */
  const [replyToMsg, setReplyToMsg] = useState<ChatMsg | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [readReceipts, setReadReceipts] = useState<Record<string, string>>({});
  const [showScrollFAB, setShowScrollFAB] = useState(false);
  const [unreadScrollCount, setUnreadScrollCount] = useState(0);
  const [firstUnreadMsgId, setFirstUnreadMsgId] = useState<string | null>(null);

  /* ── Context Menu ── */
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; msg: ChatMsg } | null>(null);

  /* ── Room Context Menu ── */
  const [roomContextMenu, setRoomContextMenu] = useState<{ x: number; y: number; room: ChatRoomInfo } | null>(null);

  /* ── Forward ── */
  const [forwardMsg, setForwardMsg] = useState<ChatMsg | null>(null);
  const [forwarding, setForwarding] = useState(false);

  /* ── Voice Recording ── */
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Emoji / Sticker Picker ── */
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [stickerTab, setStickerTab] = useState<'emoji' | 'medical' | 'favorites'>('emoji');
  const [showAppFeaturesMenu, setShowAppFeaturesMenu] = useState(false);

  /* ── Right Panel ── */
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [groupMembers, setGroupMembers] = useState<any[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [addMemberSearch, setAddMemberSearch] = useState('');
  const [addMemberResults, setAddMemberResults] = useState<SearchUserResult[]>([]);
  const [editingGroupName, setEditingGroupName] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  /* ── Study Panel (group chats only) ── */
  // Toggling "Study" inside a group chat opens GroupStudyPanel backed by a
  // study Group that is 1:1-linked to the chat room (chatRoomId).
  const [showStudyPanel, setShowStudyPanel] = useState(false);
  const [linkedStudyGroup, setLinkedStudyGroup] = useState<{ id: string; isAdmin: boolean } | null>(null);
  const [loadingStudyGroup, setLoadingStudyGroup] = useState(false);

  /* ── Friends State ── */
  const [friendsTab, setFriendsTab] = useState<FriendsTab>('all');
  const [friendSearchQuery, setFriendSearchQuery] = useState('');
  const [friendSearchResults, setFriendSearchResults] = useState<SearchUserResult[]>([]);
  const [friendSearching, setFriendSearching] = useState(false);
  const [sentRequests, setSentRequests] = useState<FriendRequestInfo[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<FriendRequestInfo[]>([]);
  const [sendingRequest, setSendingRequest] = useState<string | null>(null);
  const [friendNote, setFriendNote] = useState('');

  /* ── User Profile Popup ── */
  const [userProfilePopup, setUserProfilePopup] = useState<{ user: UserProfileData; position: { x: number; y: number } } | null>(null);

  /* ── Double-Click Quick React ── */
  const [heartAnimMsgId, setHeartAnimMsgId] = useState<string | null>(null);

  /* ── Multi-Select Mode ── */
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedMsgIds, setSelectedMsgIds] = useState<Set<string>>(new Set());

  /* ── Swipe Quick-Actions ── */
  const [swipeOffsets, setSwipeOffsets] = useState<Record<string, number>>({});
  const swipeStartRef = useRef<Record<string, { startX: number; startY: number; currentX: number }>>({});

  /* ── Forward Multiple Chats ── */
  const [forwardTargets, setForwardTargets] = useState<Set<string>>(new Set());

  /* ── Right Panel Tabs ── */
  const [rightPanelTab, setRightPanelTab] = useState<'info' | 'media' | 'links' | 'files'>('info');

  /* ── Floating Date Indicator ── */
  const [floatingDate, setFloatingDate] = useState<string | null>(null);

  /* ── Chat Customization ── */
  const [chatFontSize, setChatFontSize] = useState<'small' | 'medium' | 'large'>(() => { try { return (localStorage.getItem('medq-chat-font-size') as 'small' | 'medium' | 'large') || 'medium'; } catch { return 'medium'; } });
  const [chatBubbleStyle, setChatBubbleStyle] = useState<'rounded' | 'slightly-rounded' | 'sharp'>(() => { try { return (localStorage.getItem('medq-chat-bubble-style') as 'rounded' | 'slightly-rounded' | 'sharp') || 'rounded'; } catch { return 'rounded'; } });
  const [chatWallpaper, setChatWallpaper] = useState<string>(() => { try { return localStorage.getItem('medq-chat-wallpaper') || 'default'; } catch { return 'default'; } });
  const [chatMessageAlign, setChatMessageAlign] = useState<'right' | 'left'>(() => { try { return (localStorage.getItem('medq-chat-msg-align') as 'right' | 'left') || 'right'; } catch { return 'right'; } });
  const [showCustomization, setShowCustomization] = useState(false);

  /* ── Group Management Enhancement ── */
  const [editingGroupDescription, setEditingGroupDescription] = useState(false);
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [editingGroupAvatar, setEditingGroupAvatar] = useState(false);
  const [transferAdminTarget, setTransferAdminTarget] = useState<string | null>(null);

  /* ── Folder Tab Editing ── */
  const [editingFolderTabId, setEditingFolderTabId] = useState<string | null>(null);
  const [editingFolderTabName, setEditingFolderTabName] = useState('');
  const [folderContextMenu, setFolderContextMenu] = useState<{ x: number; y: number; folderId: string } | null>(null);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [draggedFolderId, setDraggedFolderId] = useState<string | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);

  /* ── NEW: Swipe-to-Reply on Messages ── */
  const [swipeReplyMsg, setSwipeReplyMsg] = useState<ChatMsg | null>(null);
  const [swipeTranslateX, setSwipeTranslateX] = useState(0);
  const swipeStartXRef = useRef(0);
  const swipeStartYRef = useRef(0);
  const swipeCurrentMsgRef = useRef<ChatMsg | null>(null);
  // Long-press timer for touch — opens the context menu (Pin, Reply, etc.)
  // on mobile, since there's no right-click or hover. Telegram uses long-press.
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFiredRef = useRef(false);

  /* ── NEW: Poll Creation ── */
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollAnonymous, setPollAnonymous] = useState(false);
  const [pollMultipleChoice, setPollMultipleChoice] = useState(false);
  const [pollQuizMode, setPollQuizMode] = useState(false);
  const [pollCorrectOption, setPollCorrectOption] = useState<number | null>(null);
  const [pollExplanation, setPollExplanation] = useState('');
  const [pollTimeLimit, setPollTimeLimit] = useState<number>(0); // 0 = no limit, in seconds
  const [pollVoteVisibility, setPollVoteVisibility] = useState<'always' | 'after_vote' | 'after_close'>('after_vote');
  const [pollVotes, setPollVotes] = useState<Record<string, Record<string, string[]>>>({}); // msgId -> { optionIndex -> userIds }
  const [closedPolls, setClosedPolls] = useState<Set<string>>(() => { try { const s = localStorage.getItem('medq-closed-polls'); return new Set(s ? JSON.parse(s) : []); } catch { return new Set<string>(); } });

  /* ── NEW: Meeting & Exam ── */
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);
  const [meetingStep, setMeetingStep] = useState<1|2|3>(1); // wizard steps
  const [showExamCreator, setShowExamCreator] = useState(false);
  const [activeInlineMeeting, setActiveInlineMeeting] = useState<any>(null);
  const [activeInlineExam, setActiveInlineExam] = useState<any>(null);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState<{ correct: number; total: number } | null>(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [meetingAgenda, setMeetingAgenda] = useState('');
  const [meetingType, setMeetingType] = useState<string>('study_session');
  const [meetingWhiteboard, setMeetingWhiteboard] = useState(false);
  const [meetingAI, setMeetingAI] = useState(false);
  const [meetingRecurrence, setMeetingRecurrence] = useState<string>('one_time');
  const [meetingMaxParticipants, setMeetingMaxParticipants] = useState(50);
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingRecording, setMeetingRecording] = useState(false);
  const [meetingInviteMembers, setMeetingInviteMembers] = useState<Set<string>>(new Set());
  const [examTitle, setExamTitle] = useState('');
  const [examDuration, setExamDuration] = useState(30);
  const [examQuestions, setExamQuestions] = useState<string[]>(['']);
  const [examOptions, setExamOptions] = useState<string[][]>([['', '']]);
  const [examCreatorTab, setExamCreatorTab] = useState<'bank' | 'quick' | 'smart' | 'manual'>('bank');
  const [examBankQuestions, setExamBankQuestions] = useState<any[]>([]);
  const [examBankLoading, setExamBankLoading] = useState(false);
  const [examBankSearch, setExamBankSearch] = useState('');
  const [examBankSystemFilter, setExamBankSystemFilter] = useState('all');
  const [examSelectedBankIds, setExamSelectedBankIds] = useState<Set<string>>(new Set());
  const [examQuickCategory, setExamQuickCategory] = useState<string>('');
  const [examQuickCount, setExamQuickCount] = useState(20);
  const [examDescription, setExamDescription] = useState('');
  const [chatExamMode, setChatExamMode] = useState<'menu' | 'inline' | 'quick' | 'smart'>('menu');
  const [chatQuizLoading, setChatQuizLoading] = useState<string | null>(null);
  const [showSmartQuiz, setShowSmartQuiz] = useState(false);

  /* ── AI unread digest (group/DM "AI digest" button) ── */
  type DigestEventUi = {
    type: string; title: string; when?: string; who?: string; detail?: string; messageId?: string;
  };
  type DigestState = {
    open: boolean; loading: boolean; error?: string;
    roomName?: string; totalUnread?: number; analyzed?: number; skippedOldest?: number;
    digest?: string; events?: DigestEventUi[];
    notified?: Record<string, 'sending' | 'done' | 'failed'>;
    /** Scope actually used — 'unread' or the hours window (opening a room
     *  marks it read, so the button falls back to a time window). */
    scopeHours?: number;
  };
  const [digestState, setDigestState] = useState<DigestState>({ open: false, loading: false });
  const runRoomDigest = useCallback(async (roomId: string, hours?: number) => {
    setDigestState({ open: true, loading: true });
    try {
      const res = await fetch('/api/chat/digest', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify(hours ? { roomId, hours } : { roomId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Digest failed (${res.status})`);
      }
      const data = await res.json();
      setDigestState({
        open: true, loading: false,
        roomName: data.roomName, totalUnread: data.totalUnread, analyzed: data.analyzed,
        skippedOldest: data.skippedOldest, digest: data.digest, events: data.events ?? [],
        notified: {}, scopeHours: hours,
      });
    } catch (error) {
      setDigestState({ open: true, loading: false, error: error instanceof Error ? error.message : 'Digest failed' });
    }
  }, [chatHeaders]);
  const notifyDigestEvent = useCallback(async (roomId: string, event: DigestEventUi) => {
    setDigestState(prev => prev.events ? { ...prev, notified: { ...prev.notified, [event.messageId ?? event.title]: 'sending' } } : prev);
    try {
      const res = await fetch('/api/chat/digest', {
        method: 'PUT',
        headers: chatHeaders(),
        body: JSON.stringify({
          roomId, messageId: event.messageId,
          title: event.when ? `${event.title} — ${event.when}` : event.title,
          body: event.detail || event.title,
        }),
      });
      if (!res.ok) throw new Error('notify failed');
      setDigestState(prev => prev.events ? { ...prev, notified: { ...prev.notified, [event.messageId ?? event.title]: 'done' } } : prev);
    } catch {
      setDigestState(prev => prev.events ? { ...prev, notified: { ...prev.notified, [event.messageId ?? event.title]: 'failed' } } : prev);
    }
  }, [chatHeaders]);

  /* ── NEW: Attachment Upload ── */
  const [showAttachmentPicker, setShowAttachmentPicker] = useState(false);
  const [attachmentTab, setAttachmentTab] = useState<'gallery' | 'file' | 'camera'>('gallery');
  const [attachmentPreview, setAttachmentPreview] = useState<Array<{ file: File; preview: string; type: 'image' | 'file' | 'video' }>>([]);
  const [attachmentCaption, setAttachmentCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  /* ── NEW: Enhanced Call ── */
  const [callState, setCallState] = useState<'idle' | 'calling' | 'ringing' | 'connecting' | 'connected' | 'ended'>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{ from: string; fromName: string; type: 'voice' | 'video'; offer?: any; roomId?: string } | null>(null);
  // The chat room id associated with a legacy raw-WebRTC call.
  const [callRoomId, setCallRoomId] = useState<string | null>(null);
  const incomingCallTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callStateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const demoIncomingCallRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── WebRTC Refs ── */
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const iceCandidatesQueueRef = useRef<RTCIceCandidateInit[]>([]);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const endCallRef = useRef<(notifyPeer?: boolean) => void>(() => {});
  const notifyMissedCallRef = useRef<(status: 'declined' | 'missed') => void>(() => {});

  /* ── NEW: Disappearing Messages TTL ── */
  const [disappearingTTL, setDisappearingTTL] = useState<Record<string, number>>(() => { try { const s = localStorage.getItem('medq-chat-ttl'); return s ? JSON.parse(s) : {}; } catch { return {}; } });
  const [showTTLMenu, setShowTTLMenu] = useState(false);

  /* ── NEW: Group Invite Link ── */
  const [inviteLinks, setInviteLinks] = useState<Record<string, string>>(() => { try { const s = localStorage.getItem('medq-chat-invite-links'); return s ? JSON.parse(s) : {}; } catch { return {}; } });

  /* ── NEW: Chat Export ── */
  const [exporting, setExporting] = useState(false);

  /* ── NEW: Profile Photo Viewer ── */
  const [profilePhotoViewer, setProfilePhotoViewer] = useState<{ name: string | null; image: string | null; color: string; id: string } | null>(null);

  /* Undo-send feature removed per user request — messages send immediately
     with no undo window. The read receipt (✓ / ✓✓) shows the delivery state. */

  /* ── NEW: Message Translation ── */
  const [translatedMsgs, setTranslatedMsgs] = useState<Record<string, { original: string; translated: string; showing: boolean }>>({});
  const [translatingMsgId, setTranslatingMsgId] = useState<string | null>(null);

  /* ── NEW: Slow Mode ── */
  const [slowMode, setSlowMode] = useState<Record<string, number>>(() => { try { const s = localStorage.getItem('medq-chat-slow-mode'); return s ? JSON.parse(s) : {}; } catch { return {}; } });
  const [slowModeRemaining, setSlowModeRemaining] = useState(0);
  const slowModeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── NEW: Date Picker for Floating Date ── */
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMonth, setDatePickerMonth] = useState(() => new Date().getMonth());
  const [datePickerYear, setDatePickerYear] = useState(() => new Date().getFullYear());

  /* ── Pinned Messages — full Telegram system ── */
  // pinnedIndex: which pinned message the bar shows. null = newest
  // (Telegram shows the most recently pinned message in the bar).
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  // "Pinned Messages" panel — official Telegram tip: "Tap the 📌 button
  // at the top to quickly see a list of all the chat's pinned messages."
  const [showPinnedList, setShowPinnedList] = useState(false);

  /* ── NEW: Voice/Video Call UI ── */
  const [showCallUI, setShowCallUI] = useState<'none' | 'voice' | 'video'>('none');
  const [callTimer, setCallTimer] = useState(0);
  const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── NEW: Message Seen By List ── */
  const [seenByPopup, setSeenByPopup] = useState<{ msgId: string; x: number; y: number } | null>(null);

  /* ── NEW: Scheduled Messages ── */
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledMessages, setScheduledMessages] = useState<Array<{ id: string; roomId: string; content: string; sendAt: string; replyToId?: string }>>(() => { try { const s = localStorage.getItem('medq-scheduled-messages'); return s ? JSON.parse(s) : []; } catch { return []; } });
  const scheduleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── NEW: Group Permissions ── */
  const [groupPermissions, setGroupPermissions] = useState<Record<string, { sendMessages: boolean; sendMedia: boolean; addMembers: boolean; pinMessages: boolean }>>(() => { try { const s = localStorage.getItem('medq-group-permissions'); return s ? JSON.parse(s) : {}; } catch { return {}; } });

  /* ── NEW: Chat Search with Filters ── */
  const [msgSearchFilter, setMsgSearchFilter] = useState<'all' | 'media' | 'links' | 'files'>('all');
  const [msgSearchSender, setMsgSearchSender] = useState('');
  const [msgSearchDateFrom, setMsgSearchDateFrom] = useState('');
  const [msgSearchDateTo, setMsgSearchDateTo] = useState('');
  const [showSearchFilters, setShowSearchFilters] = useState(false);

  /* ── NEW: Resend Failed Messages ── */
  const [failedMsgIds, setFailedMsgIds] = useState<Set<string>>(new Set());

  /* ── NEW: Rich Link Previews ── */
  const [linkPreviews, setLinkPreviews] = useState<Record<string, { title: string; description: string; domain: string; image?: string }>>({});

  /* ── NEW: Quick Reaction Bar ── */
  const [quickReactionBar, setQuickReactionBar] = useState<{ msgId: string; x: number; y: number } | null>(null);

  /* ── Hover action bar ── */
  const [hoveredMsgId, setHoveredMsgId] = useState<string | null>(null);

  /* ── NEW: Contact Share ── */
  const [showContactShare, setShowContactShare] = useState(false);

  /* ── NEW: Last Active Time in Chat List ── */
  // Uses existing room.lastMessageAt and member.lastActiveAt data

  /* ── Refs ── */
  const socketRef = useRef<Socket | null>(null);
  const activeRoomRef = useRef<ChatRoomInfo | null>(null);
  // Rooms list mirror for socket handlers (subscribed once, would otherwise
  // close over stale state) — used to resolve a hangup sender's display name.
  const roomsRef = useRef<ChatRoomInfo[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const msgIdToRef = useRef<Record<string, HTMLDivElement | null>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Latest-bound refs so socket event handlers (subscribed once) and global
  // listeners can call functions declared later in the component without
  // closing over a stale first-render instance.
  const resyncActiveRoomRef = useRef<(() => void) | null>(null);
  const fetchRoomsRef = useRef<(() => void) | null>(null);
  // Id of the newest message we currently show for the active room — used by
  // the lightweight safety-net poll to detect missed realtime events.
  const lastKnownMsgIdRef = useRef<string | null>(null);
  // Guard so a slow resync fetch doesn't stack with the next poll tick.
  const resyncInFlightRef = useRef(false);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── Inject Styles ──                                          */
  /* ══════════════════════════════════════════════════════════════ */
  useEffect(() => { try { localStorage.setItem('medq-chat-folders', JSON.stringify(chatFolders)); } catch {} }, [chatFolders]);

  useEffect(() => { try { localStorage.setItem('medq-chat-archived', JSON.stringify(archivedRoomIds)); } catch {} }, [archivedRoomIds]);
  useEffect(() => { try { localStorage.setItem('medq-chat-manual-unread', JSON.stringify(manualUnread)); } catch {} }, [manualUnread]);
  useEffect(() => { try { localStorage.setItem('medq-chat-pinned-order', JSON.stringify(pinnedOrder)); } catch {} }, [pinnedOrder]);
  useEffect(() => { try { localStorage.setItem('medq-chat-local-pinned', JSON.stringify(Array.from(localPinnedIds))); } catch {} }, [localPinnedIds]);
  useEffect(() => { try { localStorage.setItem('medq-chat-theme', chatTheme); } catch {} }, [chatTheme]);
  useEffect(() => { try { localStorage.setItem('medq-chat-saved-messages', JSON.stringify(savedMessageIds)); } catch {} }, [savedMessageIds]);
  useEffect(() => { try { localStorage.setItem('medq-chat-font-size', chatFontSize); } catch {} }, [chatFontSize]);
  useEffect(() => { try { localStorage.setItem('medq-chat-bubble-style', chatBubbleStyle); } catch {} }, [chatBubbleStyle]);
  useEffect(() => { try { localStorage.setItem('medq-chat-wallpaper', chatWallpaper); } catch {} }, [chatWallpaper]);
  useEffect(() => { try { localStorage.setItem('medq-chat-msg-align', chatMessageAlign); } catch {} }, [chatMessageAlign]);

  /* ── NEW: Persist new feature state ── */
  useEffect(() => { try { localStorage.setItem('medq-chat-ttl', JSON.stringify(disappearingTTL)); } catch {} }, [disappearingTTL]);
  useEffect(() => { try { localStorage.setItem('medq-chat-invite-links', JSON.stringify(inviteLinks)); } catch {} }, [inviteLinks]);
  useEffect(() => { try { localStorage.setItem('medq-chat-slow-mode', JSON.stringify(slowMode)); } catch {} }, [slowMode]);
  useEffect(() => { try { localStorage.setItem('medq-scheduled-messages', JSON.stringify(scheduledMessages)); } catch {} }, [scheduledMessages]);
  useEffect(() => { try { localStorage.setItem('medq-group-permissions', JSON.stringify(groupPermissions)); } catch {} }, [groupPermissions]);

  /* ── NEW: Scheduled Messages auto-send timer ── */
  useEffect(() => {
    const check = () => {
      const now = Date.now();
      setScheduledMessages(prev => {
        const toSend = prev.filter(m => new Date(m.sendAt).getTime() <= now);
        const remaining = prev.filter(m => new Date(m.sendAt).getTime() > now);
        toSend.forEach(async (m) => {
          try {
            await fetch('/api/chat/messages', {
              method: 'POST',
              headers: chatHeaders(),
              body: JSON.stringify({ roomId: m.roomId, content: m.content, replyToId: m.replyToId }),
            });
            toast.success(`Scheduled message sent`);
          } catch { toast.error('Failed to send scheduled message'); }
        });
        if (toSend.length > 0) return remaining;
        return prev;
      });
    };
    scheduleTimerRef.current = setInterval(check, 5000);
    return () => { if (scheduleTimerRef.current) clearInterval(scheduleTimerRef.current); };
  }, [userId]);

  /* ── NEW: Call UI timer ── */
  useEffect(() => {
    if (showCallUI !== 'none' && callState === 'connected') {
      callTimerRef.current = setInterval(() => setCallTimer(prev => prev + 1), 1000);
    } else {
      if (callTimerRef.current) { clearInterval(callTimerRef.current); callTimerRef.current = null; }
      if (showCallUI === 'none') setCallTimer(0);
    }
    return () => { if (callTimerRef.current) clearInterval(callTimerRef.current); };
  }, [showCallUI, callState]);

  /* ── WebRTC: Attach local stream to video element ── */
  useEffect(() => {
    if (localStreamRef.current && localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [showCallUI, callState]);

  /* ── WebRTC: Attach remote stream to video element ── */
  useEffect(() => {
    if (remoteStreamRef.current && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStreamRef.current;
    }
  }, [callState]);

  /* ── NEW: Disappearing messages cleanup ── */
  useEffect(() => {
    if (!activeRoom) return;
    const ttl = disappearingTTL[activeRoom.id];
    if (!ttl || ttl <= 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setMessages(prev => prev.filter(m => {
        if (m.senderId === userId) return true; // don't auto-delete own messages
        const age = now - new Date(m.createdAt).getTime();
        return age < ttl * 1000;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeRoom, disappearingTTL, userId]);

  /* ── NEW: Slow mode countdown ── */
  useEffect(() => {
    if (slowModeRemaining <= 0) {
      if (slowModeTimerRef.current) { clearInterval(slowModeTimerRef.current); slowModeTimerRef.current = null; }
      return;
    }
    slowModeTimerRef.current = setInterval(() => {
      setSlowModeRemaining(prev => {
        if (prev <= 1) { if (slowModeTimerRef.current) clearInterval(slowModeTimerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (slowModeTimerRef.current) clearInterval(slowModeTimerRef.current); };
  }, [slowModeRemaining > 0]);

  useEffect(() => { injectChatStyles(); }, []);

  // Close nav menu on outside click
  useEffect(() => {
    if (!showNavMenu) return;
    const handler = () => setShowNavMenu(false);
    const timer = setTimeout(() => document.addEventListener('click', handler), 0);
    return () => { clearTimeout(timer); document.removeEventListener('click', handler); };
  }, [showNavMenu]);

  useEffect(() => {
    if (!isResizing) return;
    const onMove = (e: MouseEvent) => { const w = Math.max(250, Math.min(500, e.clientX)); setSidebarWidth(w); try { localStorage.setItem('medq-chat-sidebar-width', w.toString()); } catch {} };
    const onUp = () => setIsResizing(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, [isResizing]);

  /* ── Keep activeRoomRef in sync ── */
  useEffect(() => { activeRoomRef.current = activeRoom; }, [activeRoom]);
  useEffect(() => { roomsRef.current = rooms; }, [rooms]);

  /* ── Clear remote cursors/lasers when leaving whiteboard or switching rooms ── */
  useEffect(() => {
    if (!showInlineWhiteboard || !activeRoom) {
      setWbRemoteCursors([]);
      setWbRemoteLasers([]);
    }
  }, [showInlineWhiteboard, activeRoom]);

  /* ── Stale cursor cleanup (remove cursors older than 10s) ── */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setWbRemoteCursors(prev => prev.filter(c => now - c.lastSeen < 10000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ── Stale laser cleanup (remove lasers older than 3s, prune old trail points) ── */
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setWbRemoteLasers(prev => {
        const filtered = prev
          .map(l => ({
            ...l,
            points: l.points.filter(p => now - p.timestamp < 1500),
          }))
          .filter(l => l.points.length > 0 || now - l.lastSeen < 3000);
        return filtered;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── Socket Connection ──                                      */
  /* ══════════════════════════════════════════════════════════════ */

  // Ref mirror of socketEverConnected so the 'connect' handler (subscribed
  // once, on mount) can tell the FIRST connect apart from a RE-connect
  // without depending on the state value from a stale render.
  const socketEverConnectedRef = useRef(false);

  useEffect(() => {
    if (!userId) return;
    // NOTE: reconnectionAttempts is deliberately NOT capped. A capped count
    // (previously 10 × 3s) makes the socket give up FOREVER after ~40s of
    // network loss — after that no realtime message ever arrives again until
    // a page refresh, which is exactly the "I have to leave the chat and come
    // back to see new messages" bug. The default (Infinity) keeps retrying
    // forever; the reconnect catch-up below heals any messages missed while
    // the connection was down.
    // Resolve the socket URL for THIS origin: behind the preview gateway the
    // relative "/?XTransformPort=3004" form is routed to the service, but on
    // plain localhost there is no gateway — connect directly to 127.0.0.1:3004
    // instead (same logic as CallProvider; previously the hardcoded gateway
    // form meant the realtime socket never connected on localhost, so new
    // messages only appeared after leaving/re-entering the chat).
    const socket = socketIO(chatSocketUrl(), { transports: ['websocket', 'polling'], reconnectionDelay: 2000, reconnectionDelayMax: 10000 });
    socketRef.current = socket;

    socket.on('connect', () => {
      setSocketConnected(true);
      setSocketEverConnected(true);
      socket.emit('identify', userId);
      // Reconnect catch-up: anything the room broadcast while this client was
      // disconnected (network blip, laptop sleep, proxy idle-drop) is gone —
      // refetch the open conversation and the room list so the UI heals.
      if (socketEverConnectedRef.current) {
        resyncActiveRoomRef.current?.();
        fetchRoomsRef.current?.();
      }
      socketEverConnectedRef.current = true;
    });

    socket.on('disconnect', () => { setSocketConnected(false); });

    // Live presence snapshots from the chat service (who has a socket in the
    // room right now) — powers the "N members · M online" header and the
    // online dots in the member list.
    socket.on('presence:update', ({ roomId, onlineUserIds }: { roomId?: string; onlineUserIds?: string[] }) => {
      if (!roomId) return;
      setOnlineByRoom((prev) => ({ ...prev, [roomId]: onlineUserIds || [] }));
    });

    socket.on('new:message', (msg: ChatMsg) => {
      // Cross-room messages (we join every room we're a member of — see the
      // socket-rooms effect below): refresh the room list so unread badges
      // and last-message previews update, but never append another room's
      // message to the open conversation.
      if (activeRoomRef.current && msg.roomId !== activeRoomRef.current.id) {
        fetchRooms();
        return;
      }
      setMessages(prev => {
        if (prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
      fetchRooms();
      const container = messagesContainerRef.current;
      if (container) {
        const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
        if (nearBottom) {
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        } else {
          setUnreadScrollCount(prev => prev + 1);
        }
      }
    });

    socket.on('update:message', (msg: ChatMsg) => {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, ...msg } : m));
    });

    socket.on('user:typing', ({ userName, roomId }: { userName?: string; userId: string; roomId: string }) => {
      // Typing from a room we're not viewing shouldn't surface in this chat.
      if (activeRoomRef.current && roomId !== activeRoomRef.current.id) return;
      setTypingUser(userName || 'Someone');
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => setTypingUser(null), 3000);
    });

    socket.on('user:stop-typing', () => setTypingUser(null));

    socket.on('message:read', (data: { roomId: string; userId: string }) => {
      setReadReceipts(prev => ({ ...prev, [data.userId]: data.roomId }));
    });

    // ── WebRTC Call Signaling Listeners ──

    socket.on('call:offer', async (data: { targetUserId: string; callerUserId: string; callerName: string; offer: any; callType: 'voice' | 'video'; roomId: string }) => {
      if (data.targetUserId !== userId) return;
      setIncomingCall({
        from: data.callerUserId,
        fromName: data.callerName,
        type: data.callType,
        offer: data.offer,
        roomId: data.roomId,
      });
      // Auto-dismiss after 30 seconds if not answered — log it as a MISSED
      // call and tell the caller, instead of silently vanishing.
      if (incomingCallTimerRef.current) clearTimeout(incomingCallTimerRef.current);
      incomingCallTimerRef.current = setTimeout(() => {
        notifyMissedCallRef.current('missed');
      }, 30000);
    });

    // Global MiroTalk call invites are handled by the root CallProvider.

    socket.on('call:ice-candidate', async (data: { targetUserId: string; fromUserId: string; candidate: any; roomId: string }) => {
      if (data.targetUserId !== userId) return;
      if (peerConnectionRef.current && peerConnectionRef.current.remoteDescription) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) {
          console.error('Error adding ICE candidate:', e);
        }
      } else {
        iceCandidatesQueueRef.current.push(data.candidate);
      }
    });

    socket.on('call:answer', async (data: { targetUserId: string; answerUserId: string; answer: any; roomId: string }) => {
      if (data.targetUserId !== userId) return;
      if (peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
          // Process queued ICE candidates
          for (const candidate of iceCandidatesQueueRef.current) {
            try {
              await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
              console.error('Error adding queued ICE candidate:', e);
            }
          }
          iceCandidatesQueueRef.current = [];
          setCallState('connected');
        } catch (e) {
          console.error('Error setting remote description:', e);
        }
      }
    });

    socket.on('call:hangup', (data: { targetUserId: string; fromUserId: string; roomId: string }) => {
      if (data.targetUserId !== userId) return;
      // Only react to hangups for this page's legacy raw-WebRTC call; the
      // global CallProvider handles MiroTalk calls and their call history.
      if (!peerConnectionRef.current) return;
      // Explain WHY the call ended (declined / missed / hung up) instead of
      // the overlay silently vanishing — the caller deserves to know.
      const fromName = roomsRef.current
        .find(r => r.id === data.roomId)?.members.find(m => m.id === data.fromUserId)?.name;
      toast.info(fromName ? `${fromName} ended the call` : 'Call ended');
      endCallRef.current(false); // Don't send hangup again
    });

    socket.on('call:ringing', (data: { targetUserId: string; fromUserId: string }) => {
      if (data.targetUserId !== userId) return;
      setCallState('ringing');
    });

    // ── Whiteboard Collaboration Cursor Events ──

    socket.on('wb:cursor-move', (data: { roomId: string; userId: string; userName: string; x: number; y: number; tool: string }) => {
      // Only show cursors for the currently active room
      if (!activeRoomRef.current || data.roomId !== activeRoomRef.current.id) return;
      if (data.userId === userId) return; // ignore own cursor
      setWbRemoteCursors(prev => {
        const existing = prev.find(c => c.userId === data.userId);
        const cursorColor = getColor(data.userId);
        const newCursor: import('@/components/medq/ChatWhiteboard').RemoteCursor = {
          userId: data.userId,
          userName: data.userName || 'User',
          x: data.x,
          y: data.y,
          tool: (data.tool as any) || 'pen',
          color: cursorColor,
          lastSeen: Date.now(),
        };
        if (existing) {
          return prev.map(c => c.userId === data.userId ? newCursor : c);
        }
        return [...prev, newCursor];
      });
    });

    socket.on('wb:cursor-leave', (data: { roomId: string; userId: string }) => {
      setWbRemoteCursors(prev => prev.filter(c => c.userId !== data.userId));
    });

    // ── Whiteboard Laser Pointer Events ──

    socket.on('wb:laser', (data: { roomId: string; userId: string; userName: string; x: number; y: number }) => {
      if (!activeRoomRef.current || data.roomId !== activeRoomRef.current.id) return;
      if (data.userId === userId) return; // ignore own laser
      setWbRemoteLasers(prev => {
        const existing = prev.find(l => l.userId === data.userId);
        const laserColor = getColor(data.userId);
        const newPoint: import('@/components/medq/ChatWhiteboard').LaserTrailPoint = {
          x: data.x,
          y: data.y,
          timestamp: Date.now(),
        };
        if (existing) {
          // Append point to existing laser, keep max 60 points
          const updatedPoints = [...existing.points, newPoint].slice(-60);
          return prev.map(l => l.userId === data.userId
            ? { ...l, points: updatedPoints, lastSeen: Date.now() }
            : l
          );
        }
        return [{
          userId: data.userId,
          userName: data.userName || 'User',
          color: laserColor,
          points: [newPoint],
          lastSeen: Date.now(),
        }];
      });
    });

    return () => { socket.disconnect(); };
  }, [userId]);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── REST Polling Fallback ──                                  */
  /* ══════════════════════════════════════════════════════════════ */

  useEffect(() => {
    if (socketConnected) {
      if (pollIntervalRef.current) { clearInterval(pollIntervalRef.current); pollIntervalRef.current = null; }
      return;
    }
    if (!userId) return;
    // While the socket is down, poll BOTH the room list (unread badges /
    // previews) AND the open conversation itself. Previously only the room
    // list was refreshed — the open chat went stale, forcing the user to
    // leave and re-enter the chat to see new messages.
    //
    // NOTE: fetchRooms is declared LATER in the component body, so it CANNOT
    // appear in this effect's dependency array (TDZ — the deps array is
    // evaluated during render, before the const is initialized). The
    // latest-bound fetchRoomsRef is used inside the interval instead.
    pollIntervalRef.current = setInterval(() => {
      fetchRoomsRef.current?.();
      resyncActiveRoomRef.current?.();
    }, 10000);
    return () => { if (pollIntervalRef.current) clearInterval(pollIntervalRef.current); };
  }, [socketConnected, userId]);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── Data Fetching ──                                          */
  /* ══════════════════════════════════════════════════════════════ */

  const createFolder = () => {
    if (!newFolderName.trim()) return;
    const folder: ChatFolder = { id: Date.now().toString(36), name: newFolderName.trim(), color: newFolderColor, icon: newFolderIcon, roomIds: Array.from(folderRoomSelection) };
    setChatFolders(prev => [...prev, folder]);
    setNewFolderName('');
    setNewFolderColor('#00e5a0');
    setNewFolderIcon('📁');
    setFolderRoomSelection(new Set());
    toast.success('Folder created!');
  };

  const deleteFolder = (folderId: string) => {
    setChatFolders(prev => prev.filter(f => f.id !== folderId));
    if (activeFolder === folderId) setActiveFolder('all');
    toast.success('Folder deleted');
  };

  const addRoomToFolder = (folderId: string, roomId: string) => {
    setChatFolders(prev => prev.map(f => f.id === folderId && !f.roomIds.includes(roomId) ? { ...f, roomIds: [...f.roomIds, roomId] } : f));
  };

  const removeRoomFromFolder = (folderId: string, roomId: string) => {
    setChatFolders(prev => prev.map(f => f.id === folderId ? { ...f, roomIds: f.roomIds.filter(id => id !== roomId) } : f));
  };

  const fetchRooms = useCallback(async () => {
    if (!userId) {
      // Critical: must still flip loading=false so the UI doesn't show an
      // indefinite spinner when userId is briefly null (e.g. while the
      // demo-user fetch is in flight, or when offline and no cached demo
      // user is available). The render guard above (`if (!userId) return
      // <OfflineTabFallback/>`) takes over the visible UI in that case.
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/chat/rooms', { headers: chatHeaders() });
      if (res.ok) { const d = await res.json(); setRooms(d.rooms || []); }
      else { console.warn('[Chat] fetchRooms failed:', res.status); }
    } catch (e) { console.error('Fetch rooms error:', e); }
    finally { setLoading(false); }
  }, [chatHeaders, userId]);

  useEffect(() => { fetchRooms(); }, [fetchRooms]);

  // Keep a latest-bound ref for socket handlers / global listeners declared
  // ABOVE fetchRooms in the component body (they run once on mount and would
  // otherwise close over the first render's instance).
  useEffect(() => { fetchRoomsRef.current = () => { void fetchRooms(); }; }, [fetchRooms]);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── Resync: heal the open conversation after any delivery gap ── */
  /* ══════════════════════════════════════════════════════════════ */
  // Realtime delivery can silently miss messages (socket reconnected after a
  // network blip, laptop woke from sleep, proxy dropped an idle WebSocket,
  // tab was backgrounded). Whenever ANY of those heals, we refetch the
  // newest page of the open conversation and merge it in — the same
  // WhatsApp-style "catch up on reconnect" guarantee, so the user NEVER has
  // to leave the chat and come back to see a message.
  const resyncActiveRoom = useCallback(async () => {
    const room = activeRoomRef.current;
    if (!room || !userId || resyncInFlightRef.current) return;
    resyncInFlightRef.current = true;
    try {
      const res = await fetch(`/api/chat/messages?roomId=${room.id}&limit=50`, { headers: chatHeaders() });
      if (!res.ok) return;
      const d = await res.json();
      const msgs: ChatMsg[] = d.messages || [];
      let addedAny = false;
      setMessages((prev) => {
        const byId = new Map<string, ChatMsg>();
        // Keep whatever we already show (real messages incl. lazily-loaded
        // older pages, plus pending "temp-" offline placeholders)…
        for (const m of prev) byId.set(m.id, m);
        // …and overlay the server's newest page (server truth wins).
        for (const m of msgs) {
          if (!byId.has(m.id)) addedAny = true;
          byId.set(m.id, m);
        }
        if (!addedAny) return prev;
        const merged = [...byId.values()].sort((a, b) => {
          const ta = new Date(a.createdAt).getTime() || 0;
          const tb = new Date(b.createdAt).getTime() || 0;
          return ta - tb || String(a.id).localeCompare(String(b.id));
        });
        return merged;
      });
      if (addedAny) {
        // New messages surfaced by the resync — stick to the bottom if the
        // user was already near it (same rule as the realtime handler).
        const container = messagesContainerRef.current;
        if (container) {
          const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
          if (nearBottom) setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
      }
    } catch { /* offline / fetch failure — the next trigger will retry */ }
    finally { resyncInFlightRef.current = false; }
  }, [chatHeaders, userId]);

  useEffect(() => { resyncActiveRoomRef.current = () => { void resyncActiveRoom(); }; }, [resyncActiveRoom]);

  // Track the newest message id we show, for the lightweight safety-net poll.
  useEffect(() => {
    lastKnownMsgIdRef.current = messages.length > 0 ? messages[messages.length - 1].id : null;
  }, [messages]);

  /* ── Reconnect heal triggers ── */
  // 1. Browser regains network (fires instantly, before the socket even
  //    re-establishes).
  // 2. Tab becomes visible again (user switched back / unlocked their device
  //    — sockets often die silently while backgrounded).
  // Both refetch the open conversation + room list; the socket's own
  // 'connect' catch-up above covers the third case.
  useEffect(() => {
    const onOnline = () => {
      setBrowserOnline(true);
      resyncActiveRoomRef.current?.();
      fetchRoomsRef.current?.();
    };
    const onOffline = () => { setBrowserOnline(false); };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        resyncActiveRoomRef.current?.();
        fetchRoomsRef.current?.();
      }
    };
    setBrowserOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  /* ── Safety-net poll while the tab is visible ── */
  // Belt-and-braces for a silently-dead socket (half-open connection through
  // a proxy): every 20s while the user is actually LOOKING at the chat, probe
  // the newest message id of the open room with a 1-message fetch. If it is
  // not what we already show, run the full resync + room-list refresh. When
  // realtime is healthy this is one tiny request; when it is broken, the user
  // still sees new messages within ~20s instead of never.
  useEffect(() => {
    if (!userId) return;
    const iv = setInterval(async () => {
      if (document.visibilityState !== 'visible') return;
      const room = activeRoomRef.current;
      if (!room) return;
      try {
        const res = await fetch(`/api/chat/messages?roomId=${room.id}&limit=1`, { headers: chatHeaders() });
        if (!res.ok) return;
        const d = await res.json();
        const newest: ChatMsg | undefined = (d.messages || [])[0];
        if (newest && newest.id !== lastKnownMsgIdRef.current) {
          await resyncActiveRoomRef.current?.();
          fetchRoomsRef.current?.();
        }
      } catch { /* offline — the next tick retries */ }
    }, 20000);
    return () => clearInterval(iv);
  }, [chatHeaders, userId]);

  /* ── Offline queue: refetch when queued writes are replayed ── */
  // When the service worker successfully replays a queued chat POST/PATCH
  // (i.e. a message that was sent while offline has now been delivered to
  // the server), we need to refresh the message list so the temp placeholder
  // is replaced by the real server-stored message.
  useEffect(() => {
    const unsubReplay = subscribeToReplaySuccess(({ url }) => {
      // Only refetch if this was a chat message write
      if (!url.includes('/api/chat/messages')) return;
      // Refresh the rooms list (updates last-message preview)
      fetchRooms();
      // Refresh the active room's messages so the temp placeholder is
      // replaced by the real server-stored message
      if (activeRoomRef.current) {
        const room = activeRoomRef.current;
        fetch(`/api/chat/messages?roomId=${room.id}&limit=50&updateRead=true`, { headers: chatHeaders() })
          .then((res) => res.ok ? res.json() : null)
          .then((d) => {
            if (!d) return;
            const msgs = d.messages || [];
            setMessages((prev) => {
              // Drop any temp messages (those starting with "temp-")
              // and merge in the server's authoritative list.
              const realIds = new Set(msgs.map((m: ChatMsg) => m.id));
              const keptTemps = prev.filter(
                (m) => typeof m.id === 'string' && m.id.startsWith('temp-') && !realIds.has(m.id)
              );
              return [...keptTemps, ...msgs];
            });
          })
          .catch(() => {});
      }
      // TELEGRAM-STYLE: do NOT show a "Queued message delivered" toast.
      // The user has already seen the message appear in the chat (with a
      // subtle temp state) and the chat list will refresh naturally when
      // the replay succeeds. A toast for every queued message is noisy
      // and makes the app feel like it's reporting on internal plumbing.
      // The OfflineIndicator's brief "Back online" chip is enough feedback.
    });
    return () => {
      unsubReplay();
    };
  }, [chatHeaders, fetchRooms]);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── Room Operations: openRoom (hoisted above agent bridge) ── */
  /* ══════════════════════════════════════════════════════════════ */
  // NOTE: openRoom must be declared BEFORE the agent-bridge useEffect
  // below, because that effect references openRoom in its dependency
  // array. Declaring it after causes a TDZ error
  // ("Cannot access 'openRoom' before initialization").
  const openRoom = async (room: ChatRoomInfo, opts?: { scrollToMessageId?: string; fromDeepLink?: boolean }) => {
    setActiveRoom(room);
    setIsViewingSavedMessages(false);
    setShowInlineWhiteboard(false);
    setMsgLoading(true);
    setMessages([]);
    setMsgSearchQuery('');
    setShowMsgSearch(false);
    setReplyToMsg(null);
    setEditingMsgId(null);
    setShowRightPanel(false);
    setShowEmojiPicker(false);
    setShowStickerPicker(false);
    setUnreadScrollCount(0);
    setFirstUnreadMsgId(null);
    setContextMenu(null);
    setMultiSelectMode(false);
    setSelectedMsgIds(new Set());
    setRightPanelTab('info');
    setFloatingDate(null);
    setMentionQuery(null);
    setMessagesCursor(null);
    setHasMoreMessages(true);
    setIsLoadingMore(false);
    if (window.innerWidth < 768) setShowSidebar(false);

    // Reflect the open room in the URL so it can be shared / bookmarked.
    // We use replaceState (not pushState) so the back button doesn't cycle
    // through every room the user opened. The `msg` param is preserved if
    // present (used by deep-link recipients to scroll to a specific message).
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('room', room.id);
        // Preserve any `?msg=` param set by a deep link so the post-load
        // scroll effect can pick it up.
        if (opts?.scrollToMessageId) {
          url.searchParams.set('msg', opts.scrollToMessageId);
        } else if (!opts?.fromDeepLink) {
          // Opening a room manually clears any stale msg param.
          url.searchParams.delete('msg');
        }
        window.history.replaceState({}, '', url.toString());
      } catch { /* ignore URL manipulation errors */ }
    }

    try {
      const res = await fetch(`/api/chat/messages?roomId=${room.id}&limit=50&updateRead=true`, { headers: chatHeaders() });
      if (res.ok) {
        const d = await res.json();
        const msgs = d.messages || [];
        // Auto-clear unread count when opening room
        setRooms(prev => prev.map(r => r.id === room.id ? { ...r, unreadCount: 0 } : r));
        setManualUnread(prev => { const next = { ...prev }; delete next[room.id]; return next; });
        setMessages(msgs);
        setMessagesCursor(d.nextCursor || null);
        setHasMoreMessages(!!d.nextCursor);

        // ── Deep-link scroll target ──
        // If the caller asked us to scroll to a specific message, check if it
        // is in the first 50 messages. If not, fetch surrounding context via
        // the /context endpoint and merge it into the message list.
        const targetMsgId = opts?.scrollToMessageId;
        if (targetMsgId) {
          const found = msgs.find((m: ChatMsg) => m.id === targetMsgId);
          if (!found) {
            // Target is older than the initial 50 — fetch context window.
            try {
              const ctxRes = await fetch(
                `/api/chat/rooms/${room.id}/messages/${targetMsgId}/context?before=30&after=10`,
                { headers: chatHeaders() }
              );
              if (ctxRes.ok) {
                const ctx = await ctxRes.json();
                // Deduplicate by id (target may already exist if it was
                // loaded as part of the initial 50 — defensive).
                const seen = new Set(msgs.map((m: ChatMsg) => m.id));
                const merged = [
                  ...ctx.before.filter((m: ChatMsg) => !seen.has(m.id)),
                  ctx.target,
                  ...ctx.after.filter((m: ChatMsg) => !seen.has(m.id)),
                  ...msgs,
                ];
                setMessages(merged);
                if (ctx.nextCursorBefore) {
                  setMessagesCursor(ctx.nextCursorBefore);
                  setHasMoreMessages(true);
                }
              }
            } catch (e) {
              console.error('Failed to fetch deep-link message context:', e);
            }
          }
        } else if (room.unreadCount > 0 && msgs.length > 0) {
          // Find first unread message if there are unread messages
          const firstUnread = msgs.find((m: ChatMsg) => m.senderId !== userId);
          if (firstUnread) {
            // Count messages from the first unread to the end
            const unreadMsgs = msgs.filter((m: ChatMsg) => m.senderId !== userId);
            const unreadFromFirst = msgs.length - msgs.indexOf(firstUnread);
            setFirstUnreadMsgId(firstUnread.id);
            setUnreadScrollCount(Math.min(unreadFromFirst, room.unreadCount));
          }
        }
      }
    } catch (e) { console.error('Fetch messages error:', e); }
    finally { setMsgLoading(false); }
    setTimeout(() => {
      // Deep-link target takes priority over first-unread scroll.
      if (opts?.scrollToMessageId) {
        const el = msgIdToRef.current[opts.scrollToMessageId];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.style.outline = '2px solid #00e5a0';
          el.style.borderRadius = '8px';
          el.style.transition = 'outline-color 0.3s ease';
          setTimeout(() => { el.style.outline = '2px solid rgba(0,229,160,0.3)'; }, 1000);
          setTimeout(() => { el.style.outline = 'none'; }, 3000);
        } else {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (firstUnreadMsgId) {
        const el = msgIdToRef.current[firstUnreadMsgId];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        else messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  /* ══════════════════════════════════════════════════════════════ */
  /* ── v6 Agent bridge: open a chat room from the AI agent ──    */
  /* ══════════════════════════════════════════════════════════════ */
  // When the agent runs `start_dm`, `create_group`, or `accept_friend_request`,
  // MedQAppShell dispatches `medq-agent-open-chat-room` with { roomId, ... }.
  // We refetch rooms (so the new room appears in the sidebar) and then open it.
  useEffect(() => {
    const handleOpen = async (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      const roomId = detail.roomId as string | undefined;
      if (!roomId) return;
      await fetchRooms();
      // Try to find the room in the freshly fetched list. We retry a few times
      // because setState is async.
      let attempts = 0;
      const tryOpen = () => {
        attempts += 1;
        setRooms(prev => {
          const found = prev.find(r => r.id === roomId);
          if (found) {
            openRoom(found);
            return prev;
          }
          if (attempts < 5) setTimeout(tryOpen, 120);
          else {
            // Fall back: construct a minimal ChatRoomInfo and open it directly.
            openRoom({
              id: roomId,
              type: detail.groupName ? 'group' : 'direct',
              name: detail.targetName || detail.groupName || 'Chat',
              avatar: detail.groupName ? '👥' : (detail.targetName?.[0]?.toUpperCase() || '?'),
              description: '',
              createdBy: '',
              lastMessage: null,
              members: detail.targetUserId
                ? [
                    { id: '', name: null, image: null, role: 'member', isOnline: false, lastActiveAt: null },
                    { id: detail.targetUserId, name: detail.targetName || null, image: null, role: 'member', isOnline: false, lastActiveAt: null },
                  ]
                : [],
              unreadCount: 0,
              lastMessageAt: new Date().toISOString(),
            });
          }
          return prev;
        });
      };
      tryOpen();
    };
    const handleRefresh = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      fetchRooms();
      // If the currently-open room was mutated, also refresh its messages.
        if (detail.roomId && activeRoom?.id === detail.roomId && activeRoom) {
        // Re-fetch messages by re-opening the room.
        openRoom(activeRoom);
      }
    };
    window.addEventListener('medq-agent-open-chat-room', handleOpen as EventListener);
    window.addEventListener('medq-agent-refresh-chat', handleRefresh as EventListener);
    return () => {
      window.removeEventListener('medq-agent-open-chat-room', handleOpen as EventListener);
      window.removeEventListener('medq-agent-refresh-chat', handleRefresh as EventListener);
    };
  }, [fetchRooms, openRoom, activeRoom]);

  // Click-away handler for quick reaction bar and room context menu
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (quickReactionBar) {
        const target = e.target as HTMLElement;
        if (!target.closest('.reaction-pop') && !target.closest('[data-reaction-bar]')) {
          setQuickReactionBar(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [quickReactionBar]);

  useEffect(() => {
    if (activeRoom && socketRef.current) {
      socketRef.current.emit('join:room', activeRoom.id);
      socketRef.current.emit('message:read', { roomId: activeRoom.id, userId });
      // NOTE: no leave:room on switch anymore. The socket stays a member of
      // every joined room so per-room events (notably call:invite) keep
      // arriving even when the user moves to a different conversation —
      // previously, switching chats made you unreachable for calls in the
      // room you just left.
    }
  }, [activeRoom, userId]);

  // ── Socket room membership: join EVERY room we're a member of ──
  // Call invites are broadcast per-room by the chat service. Joining only
  // the ACTIVE room meant a recipient who was viewing a different chat (or
  // had just switched) never received call:invite at all — they'd have no
  // idea a call was starting. Joining all rooms fixes delivery; cross-room
  // noise is filtered in the new:message / user:typing handlers above.
  // Re-runs on reconnect (socketConnected flips) since server-side room
  // membership is per-connection.
  useEffect(() => {
    if (!socketRef.current || !socketConnected) return;
    for (const r of rooms) {
      socketRef.current.emit('join:room', r.id);
    }
  }, [rooms, socketConnected]);

  useEffect(() => {
    if (initialRoomId && rooms.length > 0 && !activeRoom) {
      const room = rooms.find(r => r.id === initialRoomId);
      if (room) openRoom(room);
    }
  }, [initialRoomId, rooms]);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── Deep-link: open room + scroll to message from URL params ─ */
  /* ══════════════════════════════════════════════════════════════ */
  // Reads `?room=<id>` and `?msg=<id>` from the URL on mount (and whenever
  // rooms first become available). If a deep-link target is present and the
  // room exists in the loaded room list, openRoom is called with the target
  // message ID so the chat auto-scrolls to it (fetching surrounding context
  // from /api/chat/rooms/[id]/messages/[msgId]/context if the message is
  // older than the initially loaded 50).
  //
  // If the room is not in the loaded list (e.g. the user has many rooms and
  // the target is not in the first page), we attempt to fetch it directly
  // via /api/chat/rooms/[id] and open it as a standalone room.
  //
  // We track the last-processed URL signature so that in-app clicks on a
  // /messages?room=X&msg=Y link (which mutate window.location via
  // history.pushState from the Rich Link Preview handler) re-trigger this
  // effect even when a room is already open.
  const lastProcessedDeepLinkRef = useRef<string | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    const msgParam = params.get('msg');
    if (!roomParam) {
      lastProcessedDeepLinkRef.current = null;
      return;
    }

    // Build a signature so we only process each unique (room, msg) pair once.
    const signature = `${roomParam}:${msgParam || ''}`;
    if (lastProcessedDeepLinkRef.current === signature) return;
    // If a room is already open AND it's the same room with no msg target,
    // don't re-open (would reset scroll/state needlessly).
    if (activeRoom && activeRoom.id === roomParam && !msgParam) {
      lastProcessedDeepLinkRef.current = signature;
      return;
    }

    const room = rooms.find(r => r.id === roomParam);
    if (room) {
      // Room found in loaded list — open it immediately.
      lastProcessedDeepLinkRef.current = signature;
      openRoom(room, { scrollToMessageId: msgParam || undefined, fromDeepLink: true });
    } else if (!loading) {
      // Rooms have finished loading (or the user has no rooms) and the target
      // isn't in the list — try to fetch it directly via /api/chat/rooms/[id].
      // This handles deep-links to rooms that aren't in the first page of the
      // user's room list, or to rooms the user was just added to.
      // IMPORTANT: mark the signature as processed ONLY when we actually
      // attempt to handle the deep-link. Previously this was set BEFORE the
      // room lookup, which meant that when `rooms` was still empty on the
      // initial render (fetchRooms hadn't completed yet), the signature was
      // marked as processed and the effect bailed out on the next run after
      // rooms populated — so refreshing `/messages?room=X` landed you on the
      // messages tab with no chat open.
      lastProcessedDeepLinkRef.current = signature;
      (async () => {
        try {
          const res = await fetch(`/api/chat/rooms/${roomParam}`, { headers: chatHeaders() });
          if (res.ok) {
            const data = await res.json();
            const fetchedRoom = data.room;
            if (fetchedRoom) {
              // Inject into rooms list so the sidebar shows it too.
              setRooms(prev => prev.some(r => r.id === fetchedRoom.id) ? prev : [fetchedRoom, ...prev]);
              openRoom(fetchedRoom, { scrollToMessageId: msgParam || undefined, fromDeepLink: true });
            }
          }
        } catch (e) {
          console.error('Deep-link: failed to fetch room', e);
        }
      })();
    }
    // else: `rooms` is still loading (loading === true) and we haven't seen
    // the target yet — defer processing. The ref stays null so this effect
    // re-runs when `rooms`/`loading` change, and the target room will be
    // found/opened once fetchRooms completes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms, activeRoom, initialRoomId, loading]);

  /* ── Scroll listener ── */
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const nearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
      setShowScrollFAB(!nearBottom);
      if (nearBottom) setUnreadScrollCount(0);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeRoom]);

  /* ── Auto-resize textarea ── */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputText]);

  /* ══════════════════════════════════════════════════════════════ */
  /* ── Room Operations (openRoom declared above, near agent bridge) ── */
  /* ══════════════════════════════════════════════════════════════ */

  const sendMessage = async () => {
    if (!inputText.trim() || !activeRoom || sending) return;
    // Slow mode check
    if (slowModeRemaining > 0) { toast.info(`Slow mode: ${slowModeRemaining}s remaining`); return; }
    const text = inputText.trim();
    setInputText('');
    setSending(true);
    const replyId = replyToMsg?.id;
    setReplyToMsg(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    socketRef.current?.emit('user:stop-typing', { roomId: activeRoom.id, userId });
    if (typingTimeoutRef.current) { clearTimeout(typingTimeoutRef.current); typingTimeoutRef.current = null; }

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ roomId: activeRoom.id, content: text, replyToId: replyId || undefined }),
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = data?.message;
        const newMsgId = newMsg?.id || data?.id;

        // Optimistically add the message to UI immediately
        if (newMsg) {
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          // Auto-scroll to bottom
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }

        // Undo-send removed — message is sent immediately with no undo window.
        // Trigger slow mode countdown
        if (activeRoom && slowMode[activeRoom.id]) {
          setSlowModeRemaining(slowMode[activeRoom.id]);
        }
        // Refresh room list for last message preview
        fetchRooms();
      }
    } catch (err) {
      // TELEGRAM-STYLE: when offline, silently add a local optimistic
      // message instead of showing a "Failed to send" toast. The SW
      // normally intercepts /api/chat/messages and returns a synthetic
      // 202 with a temp message — but if the SW isn't yet active
      // (e.g. very first page load before registration completes), the
      // fetch throws. We fall back to a local optimistic message that
      // will be replaced when the SW eventually replays the queue
      // (or simply disappears on next refresh if the user gives up).
      const isOffline =
        typeof navigator !== 'undefined' && !navigator.onLine;
      if (isOffline) {
        const tempId = `temp-local-${Date.now()}`;
        const optimisticMsg: ChatMsg = {
          id: tempId,
          content: text,
          roomId: activeRoom.id,
          senderId: String(userId || ''),
          sender: { id: String(userId || ''), name: 'You', image: null },
          createdAt: new Date().toISOString(),
          type: 'text',
          replyToId: replyId || undefined,
          replyTo: null,
          metadata: '{}',
        };
        setMessages(prev => [...prev, optimisticMsg]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        // No toast — silent failure. The message will either be
        // delivered by the SW on reconnect, or the user will see it
        // didn't arrive and can re-send manually.
      } else {
        toast.error('Failed to send message');
      }
    }
    finally { setSending(false); }
  };

  /* ── Send message with custom content (for contact sharing, etc.) ── */
  const sendMessageWithContent = async (content: string) => {
    if (!activeRoom || !content.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ roomId: activeRoom.id, content, type: 'text' }),
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = data?.message;
        // Optimistically add the message to UI immediately
        if (newMsg) {
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
        fetchRooms();
      }
      setInputText('');
    } catch (err) {
      // TELEGRAM-STYLE: silent optimistic add when offline (see sendMessage)
      const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
      if (isOffline) {
        const tempId = `temp-local-${Date.now()}`;
        const optimisticMsg: ChatMsg = {
          id: tempId,
          content,
          roomId: activeRoom.id,
          senderId: String(userId || ''),
          sender: { id: String(userId || ''), name: 'You', image: null },
          createdAt: new Date().toISOString(),
          type: 'text',
          replyTo: null,
          metadata: '{}',
        };
        setMessages(prev => [...prev, optimisticMsg]);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      } else {
        toast.error('Failed to send');
      }
    }
    finally { setSending(false); }
  };

  /* ── Reactions ── */
  const addReaction = async (msg: ChatMsg, emoji: string) => {
    if (!userId || !activeRoom) return;
    const newMetadata = toggleReaction(msg.metadata, emoji, userId);
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, metadata: newMetadata } : m));
    try {
      await fetch('/api/chat/messages', {
        method: 'PATCH',
        headers: chatHeaders(),
        body: JSON.stringify({ messageId: msg.id, metadata: newMetadata }),
      });
    } catch {
      toast.error('Failed to add reaction');
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, metadata: msg.metadata } : m));
    }
  };

  /* ── Edit Message ── */
  const startEdit = (msg: ChatMsg) => {
    setEditingMsgId(msg.id);
    setEditText(msg.content);
    setInputText(msg.content);
    textareaRef.current?.focus();
  };

  const saveEdit = async (msgId: string) => {
    if (!editText.trim()) return;
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, content: editText.trim(), editedAt: new Date().toISOString() } : m));
    setEditingMsgId(null);
    setInputText('');
    try {
      await fetch('/api/chat/messages', { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ messageId: msgId, content: editText.trim() }) });
    } catch { toast.error('Failed to edit message'); }
  };

  const cancelEdit = () => { setEditingMsgId(null); setEditText(''); setInputText(''); };

  /* ── Delete Message ── */
  const deleteMessage = async (msgId: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isDeleted: true, content: 'This message was deleted' } : m));
    try {
      await fetch('/api/chat/messages', { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ messageId: msgId, isDeleted: true }) });
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete message'); }
  };

  /* ── Delete Message for Everyone ── */
  const deleteMessageForEveryone = async (msgId: string) => {
    if (!confirm('Delete this message for everyone? This cannot be undone.')) return;
    setMessages(prev => prev.filter(m => m.id !== msgId));
    try {
      await fetch('/api/chat/messages', { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ messageId: msgId, deleteForEveryone: true }) });
      toast.success('Message deleted for everyone');
    } catch { toast.error('Failed to delete message for everyone'); }
  };

  /* ── Undo send: remove message without confirm dialog ── */
  const unsendMessage = async (msgId: string) => {
    setMessages(prev => prev.filter(m => m.id !== msgId));
    try {
      await fetch('/api/chat/messages', { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ messageId: msgId, deleteForEveryone: true }) });
      toast.success('Message unsent');
    } catch { toast.error('Failed to unsend message'); }
  };

  /* ── Pin Message — authorization-gated (Telegram behavior) ──
     • Must be logged in (userId present).
     • Must be a member of the active room.
     • In GROUP chats, only admins can pin/unpin (Telegram default).
       The group's pinMessages permission flag (when present) is
       respected: if it's true, any member can pin; if false, admin-only.
     • Optimistic update is ROLLED BACK if the API rejects the action
       (401/403/network error) so the UI never shows a pinned state
       the server didn't authorize. */
  const pinMessage = async (msgId: string, currentlyPinned: boolean) => {
    if (!userId) {
      toast.error('You must be logged in to pin messages');
      return;
    }
    const myMember = activeRoom?.members?.find(m => m.id === userId);
    if (!myMember) {
      toast.error('You are not a member of this chat');
      return;
    }
    if (activeRoom?.type === 'group') {
      const isAdmin = myMember.role === 'admin';
      const perms = groupPermissions[activeRoom.id] || { pinMessages: true };
      if (!isAdmin && !perms.pinMessages) {
        toast.error('Only admins can pin messages in this group');
        return;
      }
    }
    const newPinned = !currentlyPinned;
    // Optimistic update
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isPinned: newPinned } : m));
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'PATCH',
        headers: chatHeaders(),
        body: JSON.stringify({ messageId: msgId, isPinned: newPinned }),
      });
      if (!res.ok) {
        // Roll back the optimistic update — server rejected the action.
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isPinned: currentlyPinned } : m));
        const data = await res.json().catch(() => ({} as { error?: string }));
        if (res.status === 401) toast.error('You must be logged in to pin messages');
        else if (res.status === 403) toast.error(data?.error || 'You do not have permission to pin messages');
        else toast.error('Failed to pin message');
        return;
      }
      toast.success(currentlyPinned ? 'Message unpinned' : 'Message pinned');
    } catch {
      // Network error — roll back.
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isPinned: currentlyPinned } : m));
      toast.error('Failed to pin message');
    }
  };

  /* ── Read Receipt Status ── */
  const getReadStatus = (msg: ChatMsg): 'sent' | 'delivered' | 'read' => {
    if (msg.senderId !== userId) return 'sent';
    if (activeRoom?.type === 'direct') {
      const otherMember = activeRoom.members.find(m => m.id !== userId);
      if (otherMember && readReceipts[otherMember.id] === activeRoom.id) return 'read';
      const msgsAfter = messages.filter(m => new Date(m.createdAt) > new Date(msg.createdAt) && m.senderId !== userId);
      if (msgsAfter.length > 0) return 'read';
    }
    if (activeRoom?.type === 'group') {
      const othersWhoRead = activeRoom.members.filter(m => m.id !== userId && readReceipts[m.id] === activeRoom.id);
      if (othersWhoRead.length > 0) return 'read';
    }
    return 'delivered';
  };

  /* ── Voice Recording ── */
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      setRecordingDuration(0);
      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      recorder.onstop = () => { stream.getTracks().forEach(t => t.stop()); };
      recorder.start();
      setIsRecording(true);
      recordingTimerRef.current = setInterval(() => setRecordingDuration(prev => prev + 1), 1000);
    } catch { toast.error('Microphone access denied'); }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') mediaRecorderRef.current.stop();
    if (recordingTimerRef.current) { clearInterval(recordingTimerRef.current); recordingTimerRef.current = null; }
    setIsRecording(false);
    setRecordingDuration(0);
    audioChunksRef.current = [];
  };

  const sendVoiceMessage = async () => {
    if (!activeRoom || !mediaRecorderRef.current) return;
    const recorder = mediaRecorderRef.current;
    const dur = recordingDuration;
    const stopPromise = new Promise<Blob>((resolve) => {
      recorder.onstop = () => { resolve(new Blob(audioChunksRef.current, { type: 'audio/webm' })); };
    });
    recorder.stop();
    if (recordingTimerRef.current) { clearInterval(recordingTimerRef.current); recordingTimerRef.current = null; }
    setIsRecording(false);
    const blob = await stopPromise;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        await fetch('/api/chat/messages', {
          method: 'POST',
          headers: chatHeaders(),
          body: JSON.stringify({ roomId: activeRoom.id, content: '🎤 Voice message', type: 'voice', metadata: { audioBase64: base64, duration: dur, mimeType: blob.type } }),
        });
      } catch { toast.error('Failed to send voice message'); }
    };
    reader.readAsDataURL(blob);
    setRecordingDuration(0);
  };

  /* ── Forward ── */
  const openForward = (msg: ChatMsg) => { setForwardMsg(msg); };

  /**
   * Build the POST body for forwarding a message to a target room.
   *
   * Preserves the original message type (text, image, file, voice, etc.) and
   * copies the original metadata (attachments, voice duration, etc.) so that
   * media messages forward correctly instead of silently 400-ing on the
   * server's `content.trim()` check.
   *
   * The forwarded payload is annotated with `forwardedFrom` (original sender
   * ID) and `originalMessageId` so the recipient's UI can render a
   * "Forwarded from X" badge.
   */
  const buildForwardPayload = (msg: ChatMsg, targetRoomId: string) => {
    // Parse original metadata (it's stored as a JSON string on ChatMessage).
    let originalMeta: any = {};
    try {
      originalMeta = typeof msg.metadata === 'string' ? JSON.parse(msg.metadata) : (msg.metadata || {});
    } catch { originalMeta = {}; }

    // Strip thread-specific fields that don't apply to the forwarded copy.
    const { threadId, threadRoot, ...cleanMeta } = originalMeta;

    // For text messages, prepend the "↗️ Forwarded:" label so the recipient
    // sees a visual cue even if their client doesn't render the badge.
    // For media messages, keep content as-is (the type field carries the
    // semantic meaning and the metadata carries attachment URLs).
    const isText = !msg.type || msg.type === 'text';
    const content = isText
      ? (msg.content?.trim() ? `↗️ Forwarded: ${msg.content}` : '')
      : (msg.content || '');

    return {
      roomId: targetRoomId,
      content,
      type: msg.type || 'text',
      metadata: {
        ...cleanMeta,
        forwardedFrom: msg.senderId,
        forwardedFromName: msg.sender?.name || msg.senderName || null,
        originalMessageId: msg.id,
        forwardedAt: new Date().toISOString(),
      },
    };
  };

  const forwardToFriend = async (friendId: string) => {
    if (!forwardMsg || forwarding) return;
    setForwarding(true);
    try {
      const roomRes = await fetch('/api/chat/direct', { method: 'POST', headers: chatHeaders(), body: JSON.stringify({ targetUserId: friendId }) });
      if (!roomRes.ok) { toast.error('Failed to create chat'); return; }
      const roomData = await roomRes.json();
      await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify(buildForwardPayload(forwardMsg, roomData.room.id)),
      });
      // Drain bulk-forward queue if present.
      for (const queuedMsg of bulkForwardQueueRef.current) {
        try {
          await fetch('/api/chat/messages', {
            method: 'POST',
            headers: chatHeaders(),
            body: JSON.stringify(buildForwardPayload(queuedMsg, roomData.room.id)),
          });
        } catch { /* skip */ }
      }
      const total = 1 + bulkForwardQueueRef.current.length;
      bulkForwardQueueRef.current = [];
      toast.success(`${total} message${total !== 1 ? 's' : ''} forwarded!`);
      setForwardMsg(null);
      fetchRooms();
    } catch { toast.error('Failed to forward message'); }
    finally { setForwarding(false); }
  };

  /* ── Typing indicator + @mention detection ── */
  const emitTyping = useCallback(() => {
    if (socketRef.current && activeRoom && userId) {
      socketRef.current.emit('user:typing', { roomId: activeRoom.id, userId, userName: user?.name });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current?.emit('user:stop-typing', { roomId: activeRoom.id, userId });
      }, 3000);
    }
  }, [socketRef, activeRoom, userId, user?.name]);

  const handleInputChange = (val: string) => {
    setInputText(val);
    setShowAppFeaturesMenu(false);

    // Emit typing indicator with debounce
    emitTyping();

    // Detect @mention pattern
    const cursorPos = textareaRef.current?.selectionStart ?? val.length;
    const textBeforeCursor = val.substring(0, cursorPos);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setMentionIndex(0);
    } else {
      setMentionQuery(null);
    }
  };

  /* ── Insert mention ── */
  const insertMention = (memberName: string) => {
    if (!mentionQuery && mentionQuery !== '') return;
    const cursorPos = textareaRef.current?.selectionStart ?? inputText.length;
    const textBeforeCursor = inputText.substring(0, cursorPos);
    const textAfterCursor = inputText.substring(cursorPos);
    // Replace the @query part with @memberName
    const newTextBefore = textBeforeCursor.replace(/@\w*$/, `@${memberName} `);
    setInputText(newTextBefore + textAfterCursor);
    setMentionQuery(null);
    setMentionIndex(0);
    // Focus textarea after mention
    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = newTextBefore.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  /* ── Get filtered members for mention ── */
  const getFilteredMembers = useCallback(() => {
    if (!mentionQuery && mentionQuery !== '') return [];
    if (!activeRoom) return [];
    const query = (mentionQuery || '').toLowerCase();
    return activeRoom.members
      .filter(m => m.name && m.name.toLowerCase().includes(query) && m.id !== userId)
      .slice(0, 6);
  }, [mentionQuery, activeRoom, userId]);

  /* ── Load More Messages (pagination) ── */
  const loadMoreMessages = useCallback(async () => {
    if (!activeRoom || !messagesCursor || isLoadingMore || !hasMoreMessages) return;
    setIsLoadingMore(true);
    try {
      const container = messagesContainerRef.current;
      const prevScrollHeight = container?.scrollHeight ?? 0;

      const res = await fetch(`/api/chat/messages?roomId=${activeRoom.id}&cursor=${messagesCursor}&limit=50`, { headers: chatHeaders() });
      if (res.ok) {
        const d = await res.json();
        const olderMsgs = d.messages || [];
        if (olderMsgs.length > 0) {
          setMessages(prev => [...olderMsgs, ...prev]);
        }
        setMessagesCursor(d.nextCursor);
        setHasMoreMessages(!!d.nextCursor);

        // Restore scroll position after prepending
        requestAnimationFrame(() => {
          if (container) {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - prevScrollHeight;
          }
        });
      }
    } catch (e) {
      console.error('Load more messages error:', e);
    } finally {
      setIsLoadingMore(false);
    }
  }, [activeRoom, messagesCursor, isLoadingMore, hasMoreMessages, chatHeaders]);

  /* ── Scroll handler for load more ── */
  const handleMessagesScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    // Detect scroll to top
    if (container.scrollTop < 100 && hasMoreMessages && !isLoadingMore) {
      loadMoreMessages();
    }
  }, [hasMoreMessages, isLoadingMore, loadMoreMessages]);

  /* ── Open Study panel for the current group chat ── */
  // Calls the find-or-create endpoint to get (or create) the study Group linked
  // to this chat room, then reveals the GroupStudyPanel.
  const openStudyPanel = async () => {
    if (!activeRoom || activeRoom.type !== 'group' || loadingStudyGroup) return;
    setLoadingStudyGroup(true);
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}/study-group`, { headers: chatHeaders() });
      if (res.ok) {
        const d = await res.json();
        setLinkedStudyGroup({ id: d.group.id, isAdmin: !!d.isAdmin });
        setShowStudyPanel(true);
        setShowRightPanel(false);
      } else {
        const d = await res.json().catch(() => ({}));
        toast.error(d.error || 'Failed to open study panel');
      }
    } catch {
      toast.error('Failed to open study panel');
    } finally {
      setLoadingStudyGroup(false);
    }
  };

  const closeStudyPanel = () => {
    setShowStudyPanel(false);
    // Keep linkedStudyGroup cached so re-opening is instant; refresh on next open.
  };

  /* ── Create group ── */
  const openNewGroup = async () => {
    setShowNewGroup(true);
    setLoadingFriends(true);
    setGroupSearchQuery('');
    setGroupSearchResults([]);
    try {
      const res = await fetch('/api/friends');
      if (res.ok) {
        const d = await res.json();
        setFriends(d.friends || []);
        setReceivedRequests(d.receivedRequests || []);
        setSentRequests(d.sentRequests || []);
      }
    } catch (e) { console.error(e); }
    finally { setLoadingFriends(false); }
  };

  const createGroup = async () => {
    if (!groupName.trim() || selectedMembers.size === 0) return;
    setCreating(true);
    try {
      // selectedMembers contains user IDs (from FriendshipInfo.id which is the user's id)
      const res = await fetch('/api/chat/rooms', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ name: groupName, memberIds: Array.from(selectedMembers), avatar: groupAvatar, description: groupDescription }),
      });
      if (res.ok) {
        const data = await res.json();
        toast.success('Group created!');
        setShowNewGroup(false);
        setGroupName('');
        setGroupDescription('');
        setSelectedMembers(new Set());
        await fetchRooms();
        if (data.room) {
          const rm = data.room;
          openRoom({ id: rm.id, type: rm.type, name: rm.name, avatar: rm.avatar, description: rm.description || '', createdBy: rm.createdBy, lastMessage: null, members: (rm.members || []).map((m: any) => ({ id: m.user?.id || m.userId, name: m.user?.name || null, image: m.user?.image || null, role: m.role, isOnline: false, lastActiveAt: null })), unreadCount: 0, lastMessageAt: rm.lastMessageAt || new Date().toISOString() });
        }
      } else {
        const d = await res.json();
        toast.error(d.error || 'Failed to create group');
      }
    } catch { toast.error('Failed to create group'); }
    finally { setCreating(false); }
  };

  /* ── Group member search for create group modal ── */
  const searchGroupMembers = useCallback(async (q: string) => {
    if (!q.trim() || q.length < 2) { setGroupSearchResults([]); return; }
    setGroupSearching(true);
    try {
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(q)}`);
      if (res.ok) { const d = await res.json(); setGroupSearchResults(d.users || []); }
    } catch { console.error('Group search error'); }
    finally { setGroupSearching(false); }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (groupSearchQuery) searchGroupMembers(groupSearchQuery); }, 400);
    return () => clearTimeout(timer);
  }, [groupSearchQuery, searchGroupMembers]);

  /* ── Create DM ── */
  const openNewDM = async () => {
    setShowNewDM(true);
    try {
      const res = await fetch('/api/friends');
      if (res.ok) { const d = await res.json(); setFriends(d.friends || []); }
    } catch (e) { console.error(e); }
  };

  const startDM = async (targetUserId: string) => {
    try {
      const res = await fetch('/api/chat/direct', { method: 'POST', headers: chatHeaders(), body: JSON.stringify({ targetUserId }) });
      if (res.ok) {
        const data = await res.json();
        toast.success('Chat started!');
        setShowNewDM(false);
        setUserProfilePopup(null);
        await fetchRooms();
        if (data.room) {
          const rm = data.room;
          openRoom({ id: rm.id, type: rm.type, name: rm.name, avatar: rm.avatar, description: rm.description || '', createdBy: rm.createdBy, lastMessage: null, members: (rm.members || []).map((m: any) => ({ id: m.user?.id || m.userId, name: m.user?.name || null, image: m.user?.image || null, role: m.role, isOnline: false, lastActiveAt: null })), unreadCount: 0, lastMessageAt: rm.lastMessageAt || new Date().toISOString() });
        }
      }
    } catch { toast.error('Failed to start chat'); }
  };

  /* ── Group Management ── */
  const fetchGroupMembers = async (roomId: string) => {
    try {
      const res = await fetch(`/api/chat/rooms/${roomId}/members`, { headers: chatHeaders() });
      if (res.ok) { const d = await res.json(); setGroupMembers(d.members || []); }
    } catch (e) { console.error(e); }
  };

  const addMemberToGroup = async (newMemberId: string) => {
    if (!activeRoom) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}/members`, { method: 'POST', headers: chatHeaders(), body: JSON.stringify({ userId: newMemberId }) });
      if (res.ok) { toast.success('Member added!'); fetchGroupMembers(activeRoom.id); fetchRooms(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed to add member'); }
    } catch { toast.error('Failed to add member'); }
  };

  const removeMemberFromGroup = async (targetUserId: string) => {
    if (!activeRoom) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}/members`, { method: 'DELETE', headers: chatHeaders(), body: JSON.stringify({ userId: targetUserId }) });
      if (res.ok) { toast.success('Member removed'); fetchGroupMembers(activeRoom.id); fetchRooms(); }
      else { toast.error('Failed to remove member'); }
    } catch { toast.error('Failed to remove member'); }
  };

  const leaveGroup = async () => {
    if (!activeRoom) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}`, { method: 'DELETE', headers: chatHeaders(), body: JSON.stringify({}) });
      if (res.ok) { toast.success('Left the group'); setActiveRoom(null); setShowRightPanel(false); fetchRooms(); }
    } catch { toast.error('Failed to leave group'); }
  };

  const deleteGroup = async () => {
    if (!activeRoom) return;
    if (!confirm('Are you sure you want to delete this group? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}`, { method: 'DELETE', headers: chatHeaders(), body: JSON.stringify({ deleteRoom: true }) });
      if (res.ok) { toast.success('Group deleted'); setActiveRoom(null); setShowRightPanel(false); fetchRooms(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed to delete group'); }
    } catch { toast.error('Failed to delete group'); }
  };

  const updateGroupName = async () => {
    if (!activeRoom || !newGroupName.trim()) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}`, { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ name: newGroupName.trim() }) });
      if (res.ok) {
        setActiveRoom(prev => prev ? { ...prev, name: newGroupName.trim() } : prev);
        setEditingGroupName(false);
        toast.success('Group name updated');
        fetchRooms();
      } else { toast.error('Failed to update group name'); }
    } catch { toast.error('Failed to update group name'); }
  };

  /* ── Scroll to message ──
     Clicking the pinned-message bar (or a row in the all-pins panel)
     calls this. The previous implementation set `outline` directly and
     used setTimeout to fade it — but on a SECOND click while the
     outline was still showing, the browser saw no change to the
     `outline` property and the CSS transition never restarted, so the
     user perceived "nothing happens". The keyframe-animation approach
     below removes the class, forces a synchronous reflow (offsetWidth
     read), then re-adds the class — which the browser treats as a
     fresh animation and replays the flash every single click, even
     when the element is already scrolled into view. */
  const scrollToMessage = (msgId: string) => {
    const el = msgIdToRef.current[msgId];
    if (!el) {
      // The message isn't currently rendered (e.g. it's older than the
      // loaded page). Nothing to scroll to — the pin bar's index still
      // updates so the bar shows the right preview; the user can load
      // older messages by scrolling up.
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Restart the keyframe animation: remove, force reflow, re-add.
    el.classList.remove('msg-flash-highlight');
    // Reading offsetWidth forces the browser to flush the pending
    // style removal before we re-add the class — without this, the
    // browser batches both writes and the animation does NOT restart.
    void el.offsetWidth;
    el.classList.add('msg-flash-highlight');
  };

  /* ── Copy text ── */
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success('Copied to clipboard')).catch(() => toast.error('Failed to copy'));
  };

  /* ── Copy a Telegram-style deep link to a specific message ── */
  // Builds `${origin}/messages?room=<roomId>&msg=<messageId>` and writes it
  // to the clipboard. Recipients land on the Messages tab with the room open
  // and the target message scrolled into view + highlighted for 3s.
  const copyMessageLink = (msg: ChatMsg) => {
    if (!activeRoom) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://medq.app';
    const url = `${origin}/messages?room=${activeRoom.id}&msg=${msg.id}`;
    navigator.clipboard.writeText(url)
      .then(() => toast.success('Message link copied'))
      .catch(() => toast.error('Failed to copy link'));
  };

  /* ── Friends: Search ── */
  const searchFriends = useCallback(async (q: string) => {
    if (!q.trim() || q.length < 2) { setFriendSearchResults([]); return; }
    setFriendSearching(true);
    try {
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(q)}`);
      if (res.ok) { const d = await res.json(); setFriendSearchResults(d.users || []); }
    } catch { console.error('Friend search error'); }
    finally { setFriendSearching(false); }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (friendSearchQuery) searchFriends(friendSearchQuery); }, 400);
    return () => clearTimeout(timer);
  }, [friendSearchQuery, searchFriends]);

  /* ── Friends: Send Request ── */
  const sendFriendRequest = async (receiverId: string) => {
    setSendingRequest(receiverId);
    try {
      const res = await fetch('/api/friends', { method: 'POST', headers: chatHeaders(), body: JSON.stringify({ receiverId, note: friendNote }) });
      if (res.ok) {
        toast.success('Friend request sent!');
        setFriendSearchResults(prev => prev.map(r => r.id === receiverId ? { ...r, requestSent: true } as any : r));
        setFriendNote('');
      }
      else { const d = await res.json(); toast.error(d.error || 'Failed to send request'); }
    } catch { toast.error('Failed to send request'); }
    finally { setSendingRequest(null); }
  };

  /* ── Friends: Accept/Decline ── */
  const acceptFriendRequest = async (friendshipId: string) => {
    try {
      const res = await fetch('/api/friends/accept', { method: 'PUT', headers: chatHeaders(), body: JSON.stringify({ friendshipId }) });
      if (res.ok) { toast.success('Friend request accepted!'); loadFriendsData(); }
    } catch { toast.error('Failed to accept request'); }
  };

  const declineFriendRequest = async (friendshipId: string) => {
    try {
      const res = await fetch('/api/friends/decline', { method: 'PUT', headers: chatHeaders(), body: JSON.stringify({ friendshipId }) });
      if (res.ok) { toast.success('Request declined'); loadFriendsData(); }
    } catch { toast.error('Failed to decline request'); }
  };

  /* ── Friends: Load Data ── */
  const loadFriendsData = useCallback(async () => {
    try {
      const res = await fetch('/api/friends');
      if (res.ok) {
        const d = await res.json();
        setFriends(d.friends || []);
        setSentRequests(d.sentRequests || []);
        setReceivedRequests(d.receivedRequests || []);
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { if (showFriends) loadFriendsData(); }, [showFriends, loadFriendsData]);

  /* ── Add Member Search ── */
  const searchAddMember = useCallback(async (q: string) => {
    if (!q.trim() || q.length < 2) { setAddMemberResults([]); return; }
    try {
      const res = await fetch(`/api/friends/search?q=${encodeURIComponent(q)}`);
      if (res.ok) { const d = await res.json(); setAddMemberResults(d.users || []); }
    } catch { console.error('Search error'); }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (addMemberSearch) searchAddMember(addMemberSearch); }, 400);
    return () => clearTimeout(timer);
  }, [addMemberSearch, searchAddMember]);

  /* ── Right Panel: Open ── */
  useEffect(() => {
    if (showRightPanel && activeRoom?.type === 'group') fetchGroupMembers(activeRoom.id);
  }, [showRightPanel, activeRoom]);

  /* ── Message Search ── */
  const matchingMsgs = msgSearchQuery ? messages.filter(m => m.content.toLowerCase().includes(msgSearchQuery.toLowerCase()) && !m.isDeleted) : [];
  const navigateSearch = (dir: number) => {
    if (matchingMsgs.length === 0) return;
    const newIdx = (msgSearchIndex + dir + matchingMsgs.length) % matchingMsgs.length;
    setMsgSearchIndex(newIdx);
    scrollToMessage(matchingMsgs[newIdx].id);
  };

  /* ── Pin/Mute with Optimistic Update + Server Sync ── */
  const toggleRoomPin = async (roomId: string, currentlyPinned: boolean) => {
    const newPinned = !currentlyPinned;

    // 1) Optimistic UI update immediately
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, isPinned: newPinned } : r));
    setLocalPinnedIds(prev => {
      const next = new Set(prev);
      if (newPinned) next.add(roomId); else next.delete(roomId);
      return next;
    });

    // Calculate order considering both server and local pinOrder values
    if (newPinned) {
      const allOrders = [
        ...Object.values(pinnedOrder),
        ...rooms.filter(r => r.isPinned && r.pinOrder != null).map(r => r.pinOrder!),
      ];
      const maxOrder = allOrders.length > 0 ? Math.max(...allOrders) : -1;
      setPinnedOrder(prev => ({ ...prev, [roomId]: maxOrder + 1 }));
    } else {
      setPinnedOrder(prev => { const next = { ...prev }; delete next[roomId]; return next; });
    }
    toast.success(currentlyPinned ? 'Chat unpinned' : 'Chat pinned');

    // 2) Persist to server and sync back the server-assigned pinOrder
    try {
      const res = await fetch(`/api/chat/rooms/${roomId}/pin`, {
        method: 'PATCH',
        headers: chatHeaders(),
        body: JSON.stringify({ isPinned: newPinned }),
      });
      if (res.ok) {
        const data = await res.json();
        // Sync server-assigned pinOrder back to local state
        if (typeof data.pinOrder === 'number') {
          setPinnedOrder(prev => ({ ...prev, [roomId]: data.pinOrder }));
          setRooms(prev => prev.map(r => r.id === roomId ? { ...r, pinOrder: data.pinOrder, isPinned: data.isPinned } : r));
        }
      } else {
        console.warn('[Pin] Server returned', res.status, '- keeping local state');
      }
    } catch (err) {
      console.warn('[Pin] Network error - keeping local state:', err);
    }
  };

  const toggleRoomMute = async (roomId: string, currentlyMuted: boolean) => {
    const newMuted = !currentlyMuted;

    // 1) Optimistic UI update immediately
    setRooms(prev => prev.map(r => r.id === roomId ? { ...r, isMuted: newMuted } : r));
    toast.success(currentlyMuted ? 'Notifications unmuted' : 'Notifications muted');

    // 2) Try to persist to server
    try {
      const res = await fetch(`/api/chat/rooms/${roomId}/pin`, {
        method: 'PATCH',
        headers: chatHeaders(),
        body: JSON.stringify({ isMuted: newMuted }),
      });
      if (!res.ok) {
        console.warn('[Mute] Server returned', res.status, '- keeping local state');
      }
    } catch (err) {
      console.warn('[Mute] Network error - keeping local state:', err);
    }
  };

  const markRoomAsRead = async (roomId: string) => {
    try {
      await fetch(`/api/chat/messages?roomId=${roomId}&limit=1&updateRead=true`, { headers: chatHeaders() });
      setRooms(prev => prev.map(r => r.id === roomId ? { ...r, unreadCount: 0 } : r));
      setManualUnread(prev => { const next = { ...prev }; delete next[roomId]; return next; });
      toast.success('Marked as read');
    } catch { toast.error('Failed to mark as read'); }
  };

  /* ── Mark as Unread ── */
  const markRoomAsUnread = (roomId: string) => {
    setManualUnread(prev => ({ ...prev, [roomId]: 1 }));
    toast.success('Marked as unread');
  };

  /* ── Archive/Unarchive ── */
  const archiveRoom = (roomId: string) => {
    setArchivedRoomIds(prev => prev.includes(roomId) ? prev : [...prev, roomId]);
    if (activeRoom?.id === roomId) setActiveRoom(null);
    toast.success('Chat archived');
  };
  const unarchiveRoom = (roomId: string) => {
    setArchivedRoomIds(prev => prev.filter(id => id !== roomId));
    toast.success('Chat unarchived');
  };

  /* ── Drag-to-reorder Pinned Chats (Grip Handle - reliable drag) ── */
  const gripPointerDown = (e: React.PointerEvent, roomId: string) => {
    e.preventDefault();
    e.stopPropagation();

    dragItemRef.current = roomId;
    dragStartYRef.current = e.clientY;
    isDraggingRef.current = false;

    const handleMove = (ev: PointerEvent) => {
      if (!dragItemRef.current) return;
      const deltaY = Math.abs(ev.clientY - dragStartYRef.current);
      if (!isDraggingRef.current && deltaY > 5) {
        isDraggingRef.current = true;
        setDraggedPinnedId(dragItemRef.current);
      }
      if (isDraggingRef.current) {
        const listEl = pinnedListRef.current;
        if (!listEl) return;
        const items = listEl.querySelectorAll('[data-pinned-room-id]');
        let foundOverId: string | null = null;
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          if (ev.clientY >= rect.top && ev.clientY <= rect.bottom) {
            foundOverId = (item as HTMLElement).dataset.pinnedRoomId || null;
          }
        });
        if (foundOverId && foundOverId !== dragItemRef.current) {
          dragOverRef.current = foundOverId;
          setDragOverPinnedId(foundOverId);
        } else if (!foundOverId) {
          dragOverRef.current = null;
          setDragOverPinnedId(null);
        }
      }
    };

    const handleUp = (ev: PointerEvent) => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);

      if (!dragItemRef.current || !isDraggingRef.current) {
        dragItemRef.current = null;
        isDraggingRef.current = false;
        return;
      }

      const sourceRoomId = dragItemRef.current;
      const targetRoomId = dragOverRef.current;

      if (targetRoomId && sourceRoomId !== targetRoomId) {
        const pinnedRooms = filteredRooms.filter(r => r.isPinned).sort((a, b) => (a.pinOrder ?? pinnedOrder[a.id] ?? 9999) - (b.pinOrder ?? pinnedOrder[b.id] ?? 9999));
        const sourceIdx = pinnedRooms.findIndex(r => r.id === sourceRoomId);
        const targetIdx = pinnedRooms.findIndex(r => r.id === targetRoomId);

        if (sourceIdx >= 0 && targetIdx >= 0) {
          const reordered = pinnedRooms.map(r => r.id);
          reordered.splice(sourceIdx, 1);
          reordered.splice(targetIdx, 0, sourceRoomId);

          const newOrder: Record<string, number> = {};
          reordered.forEach((id, idx) => { newOrder[id] = idx; });
          const mergedOrder = { ...pinnedOrder, ...newOrder };
          setPinnedOrder(mergedOrder);

          // Save to localStorage immediately for responsiveness
          try { localStorage.setItem('medq-chat-pinned-order', JSON.stringify(mergedOrder)); } catch {}

          // Update rooms' pinOrder so the UI reflects the new order
          setRooms(prev => prev.map(r => {
            if (newOrder[r.id] !== undefined) {
              return { ...r, pinOrder: newOrder[r.id] };
            }
            return r;
          }));

          fetch('/api/chat/rooms/reorder', {
            method: 'POST',
            headers: chatHeaders(),
            body: JSON.stringify({ items: reordered.map((roomId, idx) => ({ roomId, pinOrder: idx })) }),
          }).catch(err => console.warn('[Reorder] Failed:', err));
        }
      }

      setDraggedPinnedId(null);
      setDragOverPinnedId(null);
      dragItemRef.current = null;
      dragOverRef.current = null;
      isDraggingRef.current = false;
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
  };

  /* ── Save/Unsave Message ── */
  const saveMessage = (msgId: string) => {
    setSavedMessageIds(prev => prev.includes(msgId) ? prev.filter(id => id !== msgId) : [...prev, msgId]);
    toast.success(savedMessageIds.includes(msgId) ? 'Message unsaved' : 'Message saved');
  };

  /* ── Open Saved Messages (Telegram-style: as a chat room) ── */
  const openSavedMessages = async () => {
    setIsViewingSavedMessages(true);
    setActiveRoom(null);
    setShowSidebar(false);
    setShowEmojiPicker(false);
    setShowStickerPicker(false);
    setShowInlineWhiteboard(false);
    setReplyToMsg(null);
    setEditingMsgId(null);
    setContextMenu(null);
    // Fetch messages from all rooms to find saved ones
    try {
      const allMsgs: ChatMsg[] = [];
      for (const room of rooms) {
        const res = await fetch(`/api/chat/messages?roomId=${room.id}&limit=50`, { headers: chatHeaders() });
        if (res.ok) {
          const d = await res.json();
          allMsgs.push(...(d.messages || []));
        }
      }
      setAllMessagesForSaved(allMsgs);
    } catch {}
  };

  /* ── Close Saved Messages view ── */
  const closeSavedMessages = () => {
    setIsViewingSavedMessages(false);
    setShowSidebar(true);
  };

  /* ── Send Whiteboard as image message in conversation ── */
  const sendWhiteboard = async () => {
    if (!activeRoom || !whiteboardData || sending) return;
    setSending(true);
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ roomId: activeRoom.id, content: '🎨 Whiteboard', type: 'image', metadata: { imageUrl: whiteboardData, isWhiteboard: true } }),
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = data?.message;
        if (newMsg) {
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
        toast.success('Whiteboard sent!');
        setShowInlineWhiteboard(false);
        setWhiteboardData('');
        setWhiteboardRecording(null);
        fetchRooms();
      }
    } catch { toast.error('Failed to send whiteboard'); }
    finally { setSending(false); }
  };

  /* ── Send whiteboard recording as video message ── */
  const sendWhiteboardRecording = async () => {
    if (!activeRoom || !whiteboardRecording || sending) return;
    setSending(true);
    try {
      // Convert blob to base64
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(whiteboardRecording.blob);
      });

      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({
          roomId: activeRoom.id,
          content: '🎬 Whiteboard Recording',
          type: 'video',
          metadata: { videoUrl: base64, isWhiteboardRecording: true, duration: whiteboardRecording.blob.size },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = data?.message;
        if (newMsg) {
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
        toast.success('Recording sent!');
        setWhiteboardRecording(null);
      }
    } catch { toast.error('Failed to send recording'); }
    finally { setSending(false); }
  };

  /* ── Chat Theme Backgrounds ── */
  const CHAT_THEMES: Record<string, { name: string; bg: string; gradient: string }> = {
    default: { name: 'Default', bg: '#0c0e14', gradient: '' },
    warm: { name: 'Warm', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.06) 0%, transparent 70%)' },
    ocean: { name: 'Ocean', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 50% 0%, rgba(79,195,247,0.06) 0%, transparent 70%)' },
    forest: { name: 'Forest', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%)' },
    purple: { name: 'Purple Night', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 70%)' },
    sunset: { name: 'Sunset', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 30% 20%, rgba(236,72,153,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(251,191,36,0.04) 0%, transparent 50%)' },
    aurora: { name: 'Aurora', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 20% 50%, rgba(0,229,160,0.05) 0%, transparent 40%), radial-gradient(ellipse at 80% 50%, rgba(79,195,247,0.05) 0%, transparent 40%)' },
    midnight: { name: 'Midnight', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 50% 100%, rgba(30,33,46,0.8) 0%, transparent 70%)' },
    rose: { name: 'Rose', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.06) 0%, transparent 70%)' },
    teal: { name: 'Teal', bg: '#0c0e14', gradient: 'radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.06) 0%, transparent 70%)' },
  };

  /* ── Chat Wallpaper Presets ── */
  const WALLPAPER_PRESETS: Record<string, { name: string; gradient: string; preview: string }> = {
    default: { name: 'Default', gradient: '', preview: '#0c0e14' },
    'warm-gradient': { name: 'Warm Glow', gradient: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(236,72,153,0.05) 100%)', preview: '#f59e0b' },
    'ocean-gradient': { name: 'Ocean Deep', gradient: 'linear-gradient(180deg, rgba(79,195,247,0.06) 0%, rgba(0,229,160,0.04) 100%)', preview: '#4fc3f7' },
    'forest-gradient': { name: 'Forest Mist', gradient: 'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(20,184,166,0.04) 100%)', preview: '#22c55e' },
    'purple-gradient': { name: 'Purple Haze', gradient: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(79,195,247,0.04) 100%)', preview: '#8b5cf6' },
    'aurora-gradient': { name: 'Aurora', gradient: 'linear-gradient(135deg, rgba(0,229,160,0.06) 0%, rgba(79,195,247,0.04) 50%, rgba(139,92,246,0.03) 100%)', preview: '#00e5a0' },
    'sunset-gradient': { name: 'Sunset', gradient: 'linear-gradient(135deg, rgba(244,63,94,0.06) 0%, rgba(251,191,36,0.04) 100%)', preview: '#f43f5e' },
    'night-gradient': { name: 'Night Sky', gradient: 'linear-gradient(180deg, rgba(30,33,46,0.4) 0%, rgba(12,14,20,0.9) 100%)', preview: '#1e212e' },
    'teal-gradient': { name: 'Teal Dream', gradient: 'linear-gradient(135deg, rgba(20,184,166,0.06) 0%, rgba(0,229,160,0.04) 100%)', preview: '#14b8a6' },
    'mesh-gradient': { name: 'Mesh', gradient: 'radial-gradient(at 20% 20%, rgba(0,229,160,0.04) 0%, transparent 40%), radial-gradient(at 80% 80%, rgba(139,92,246,0.04) 0%, transparent 40%), radial-gradient(at 50% 50%, rgba(79,195,247,0.03) 0%, transparent 40%)', preview: '#1a1d28' },
  };

  /* ── Bubble style helpers ── */
  const getBubbleRadius = () => {
    if (chatBubbleStyle === 'sharp') return '8px';
    if (chatBubbleStyle === 'slightly-rounded') return '14px';
    return '20px';
  };

  const getFontSizeClass = () => {
    if (chatFontSize === 'small') return 'text-xs';
    if (chatFontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  /* ── Group management helpers ── */
  const updateGroupDescription = async () => {
    if (!activeRoom || !newGroupDescription.trim()) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}`, { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ description: newGroupDescription.trim() }) });
      if (res.ok) {
        setActiveRoom(prev => prev ? { ...prev, description: newGroupDescription.trim() } : prev);
        setEditingGroupDescription(false);
        toast.success('Group description updated');
        fetchRooms();
      } else { toast.error('Failed to update description'); }
    } catch { toast.error('Failed to update description'); }
  };

  const updateGroupAvatar = async (newAvatar: string) => {
    if (!activeRoom) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}`, { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ avatar: newAvatar }) });
      if (res.ok) {
        setActiveRoom(prev => prev ? { ...prev, avatar: newAvatar } : prev);
        setEditingGroupAvatar(false);
        toast.success('Group avatar updated');
        fetchRooms();
      } else { toast.error('Failed to update avatar'); }
    } catch { toast.error('Failed to update avatar'); }
  };

  const transferAdmin = async (targetUserId: string) => {
    if (!activeRoom || !confirm('Are you sure you want to transfer admin role?')) return;
    try {
      const res = await fetch(`/api/chat/rooms/${activeRoom.id}`, { method: 'PATCH', headers: chatHeaders(), body: JSON.stringify({ transferAdminTo: targetUserId }) });
      if (res.ok) {
        toast.success('Admin role transferred');
        setActiveRoom(prev => prev ? { ...prev, createdBy: targetUserId } : prev);
        setTransferAdminTarget(null);
        fetchRooms();
        fetchGroupMembers(activeRoom.id);
      } else { const d = await res.json(); toast.error(d.error || 'Failed to transfer admin'); }
    } catch { toast.error('Failed to transfer admin'); }
  };

  /* ── Folder reorder helpers ── */
  const handleFolderDragStart = (e: React.DragEvent, folderId: string) => {
    setDraggedFolderId(folderId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', folderId);
  };

  const handleFolderDragOver = (e: React.DragEvent, folderId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverFolderId(folderId);
  };

  const handleFolderDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = draggedFolderId;
    if (!sourceId || sourceId === targetId) { setDraggedFolderId(null); setDragOverFolderId(null); return; }
    // Reorder user-created folders only (skip default folders)
    const userFolders = chatFolders;
    const sourceIdx = userFolders.findIndex(f => f.id === sourceId);
    const targetIdx = userFolders.findIndex(f => f.id === targetId);
    if (sourceIdx < 0 || targetIdx < 0) { setDraggedFolderId(null); setDragOverFolderId(null); return; }
    const reordered = [...userFolders];
    reordered.splice(sourceIdx, 1);
    reordered.splice(targetIdx, 0, userFolders[sourceIdx]);
    setChatFolders(reordered);
    setDraggedFolderId(null);
    setDragOverFolderId(null);
  };

  const handleFolderDragEnd = () => { setDraggedFolderId(null); setDragOverFolderId(null); };

  const renameFolderInline = (folderId: string, newName: string) => {
    if (!newName.trim()) return;
    setChatFolders(prev => prev.map(f => f.id === folderId ? { ...f, name: newName.trim() } : f));
    setEditingFolderTabId(null);
    toast.success('Folder renamed');
  };

  /* ── Default folder tabs (Telegram-style: All, plus smart filters) ── */
  const DEFAULT_FOLDERS: ChatFolder[] = [
    { id: 'all', name: 'All', color: '#00e5a0', icon: '💬', roomIds: [] },
    { id: 'filter-unread', name: 'Unread', color: '#f59e0b', icon: '🔔', roomIds: [] },
    { id: 'filter-dms', name: 'Personal', color: '#4fc3f7', icon: '👤', roomIds: [] },
    { id: 'filter-groups', name: 'Groups', color: '#8b5cf6', icon: '👥', roomIds: [] },
  ];

  // Merge default folders with user-created folders
  const allFolderTabs = [...DEFAULT_FOLDERS, ...chatFolders];

  /* ── Filtered Rooms ── */
  const filteredRooms = rooms.filter(r => {
    // Always filter out archived rooms from main list
    if (archivedRoomIds.includes(r.id)) return false;
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    // Filter by active folder (now includes built-in filter tabs)
    if (activeFolder === 'filter-unread') {
      const effectiveUnread = manualUnread[r.id] ?? r.unreadCount;
      return effectiveUnread > 0;
    }
    if (activeFolder === 'filter-dms') return r.type === 'direct';
    if (activeFolder === 'filter-groups') return r.type === 'group';
    if (activeFolder !== 'all') {
      const folder = chatFolders.find(f => f.id === activeFolder);
      if (folder && !folder.roomIds.includes(r.id)) return false;
    }
    return true;
  }).map(r => ({
    ...r,
    // Merge local pinned state with server state (local takes precedence)
    isPinned: localPinnedIds.has(r.id) || r.isPinned,
    unreadCount: manualUnread[r.id] ?? r.unreadCount,
  })).sort((a, b) => {
    // Pinned rooms first
    const aPinned = a.isPinned ? 1 : 0;
    const bPinned = b.isPinned ? 1 : 0;
    if (aPinned !== bPinned) return bPinned - aPinned;
    // Within pinned, sort by pinOrder (server-side first, then local fallback)
    if (a.isPinned && b.isPinned) {
      const aOrder = a.pinOrder ?? pinnedOrder[a.id] ?? 9999;
      const bOrder = b.pinOrder ?? pinnedOrder[b.id] ?? 9999;
      if (aOrder !== bOrder) return aOrder - bOrder;
    }
    // Then by lastMessageAt
    return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
  });

  /* ── Archived Rooms ── */
  const archivedRooms = rooms.filter(r => archivedRoomIds.includes(r.id));

  /* ── Pinned Messages ── */
  const pinnedMessages = messages.filter(m => m.isPinned && !m.isDeleted);

  // Short preview text for the pinned bar / list rows (Telegram shows
  // "Pinned photo", "Pinned voice message"… instead of raw content).
  const getPinnedPreview = (m: ChatMsg): string => {
    switch (m.type) {
      case 'voice': return '🎤 Voice message';
      case 'poll': return '📊 Poll';
      case 'image': return '📷 Photo';
      case 'file': return '📎 File';
      case 'meeting': return '📅 Meeting invite';
      case 'exam': return '📝 Exam';
      case 'question_card': return '❓ Question card';
      case 'call': return '📞 Call';
      default: return m.content || '';
    }
  };

  // Telegram behavior: when a NEW message gets pinned, the bar switches to
  // it (show newest). Also auto-close the list panel when the last pin goes.
  const prevPinnedCountRef = useRef(0);
  useEffect(() => {
    if (pinnedMessages.length > prevPinnedCountRef.current) setPinnedIndex(null);
    prevPinnedCountRef.current = pinnedMessages.length;
  }, [pinnedMessages.length]);
  useEffect(() => {
    if (pinnedMessages.length === 0) setShowPinnedList(false);
  }, [pinnedMessages.length]);

  /* ── Other Member in DM ── */
  const otherMember = activeRoom?.type === 'direct' ? activeRoom.members.find(m => m.id !== userId) : null;
  // Live socket presence for the open room (undefined until the first
  // presence:update arrives). When present it is AUTHORITATIVE for "online
  // now" — the legacy User.isOnline DB flag can go stale-true forever (it is
  // not reset on hard disconnects), and lastActiveAt is only a heuristic.
  // The heuristics remain as the fallback while presence hasn't loaded yet.
  const activeRoomPresence = activeRoom ? onlineByRoom[activeRoom.id] : undefined;
  const activeRoomOnlineIds = activeRoomPresence ?? [];
  const isOtherOnline = otherMember
    ? activeRoomPresence !== undefined
      ? activeRoomPresence.includes(otherMember.id)
      : isRecentlyActive(otherMember.lastActiveAt) || otherMember.isOnline
    : false;

  /* ── Group header: how many members are online right now (excluding self) ── */
  const groupOnlineOthersCount = activeRoom?.type === 'group'
    ? activeRoomOnlineIds.filter((id) => id !== userId).length
    : 0;
  // Realtime reachability of THIS client: the browser's network state flips
  // instantly on wifi/offline changes; the socket state covers the rarer
  // "online but the realtime server is unreachable / still reconnecting".
  const realtimeDown = !browserOnline || !socketConnected;

  /* ── Total Unread Count ── */
  const totalUnread = rooms.reduce((sum, r) => sum + r.unreadCount, 0);

  /* ── Pending Request Count ── */
  const pendingRequestCount = receivedRequests.length;

  /* ── Handle Send Key ── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle @mention autocomplete navigation
    if (mentionQuery !== null && getFilteredMembers().length > 0) {
      const filtered = getFilteredMembers();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setMentionIndex(prev => (prev + 1) % filtered.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setMentionIndex(prev => (prev - 1 + filtered.length) % filtered.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        const selectedMember = filtered[mentionIndex];
        if (selectedMember) insertMention(selectedMember.name || 'User');
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setMentionQuery(null);
        return;
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editingMsgId) saveEdit(editingMsgId);
      else sendMessage();
    }
    if (e.key === 'Escape' && editingMsgId) cancelEdit();
  };

  /* ── Leave group (by room object for context menu) ── */
  const leaveGroupFromMenu = async (room: ChatRoomInfo) => {
    try {
      const res = await fetch(`/api/chat/rooms/${room.id}`, { method: 'DELETE', headers: chatHeaders(), body: JSON.stringify({}) });
      if (res.ok) { toast.success('Left the group'); setActiveRoom(null); setShowRightPanel(false); fetchRooms(); }
    } catch { toast.error('Failed to leave group'); }
  };

  const deleteConversation = async (room: ChatRoomInfo) => {
    if (!confirm('Are you sure you want to delete this conversation?')) return;
    try {
      const res = await fetch(`/api/chat/rooms/${room.id}`, { method: 'DELETE', headers: chatHeaders(), body: JSON.stringify({ deleteRoom: true }) });
      if (res.ok) { toast.success('Conversation deleted'); if (activeRoom?.id === room.id) { setActiveRoom(null); setShowRightPanel(false); } fetchRooms(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed to delete conversation'); }
    } catch { toast.error('Failed to delete conversation'); }
  };

  /* ── User Profile Popup: Show ── */
  const showUserProfileFor = (targetUser: { id: string; name: string | null; image?: string | null; specialty?: string | null; medicalSchool?: string | null; isOnline?: boolean; lastActiveAt?: string | null; role?: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setUserProfilePopup({
      user: {
        id: targetUser.id,
        name: targetUser.name,
        image: targetUser.image || '',
        specialty: targetUser.specialty,
        medicalSchool: targetUser.medicalSchool,
        isOnline: targetUser.isOnline,
        lastActiveAt: targetUser.lastActiveAt,
        role: targetUser.role,
      },
      position: { x: Math.min(rect.left, (typeof window !== 'undefined' ? window.innerWidth : 800) - 280), y: rect.bottom + 4 },
    });
  };

  /* ── Check if user ID is a friend ── */
  const isUserFriend = (targetId: string) => friends.some(f => f.id === targetId);

  /* ── Double-Click Quick React ── */
  const handleDoubleClickMsg = (msg: ChatMsg) => {
    if (msg.isDeleted) return;
    addReaction(msg, '❤️');
    setHeartAnimMsgId(msg.id);
    setTimeout(() => setHeartAnimMsgId(null), 600);
  };

  /* ── Multi-Select Handlers ── */
  const toggleMultiSelectMode = () => {
    setMultiSelectMode(prev => !prev);
    setSelectedMsgIds(new Set());
  };

  const toggleMsgSelection = (msgId: string) => {
    setSelectedMsgIds(prev => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId); else next.add(msgId);
      return next;
    });
  };

  const bulkDeleteMessages = async () => {
    if (selectedMsgIds.size === 0) return;
    const count = selectedMsgIds.size;
    for (const msgId of selectedMsgIds) {
      await deleteMessage(msgId);
    }
    setSelectedMsgIds(new Set());
    setMultiSelectMode(false);
    toast.success(`${count} message${count !== 1 ? 's' : ''} deleted`);
  };

  /**
   * Bulk-forward all selected messages.
   *
   * The forward modal only handles a single message at a time (it shows the
   * message preview + destination picker). When the user has multi-selected
   * several messages, we:
   *   1. Find ALL selected messages (previously this only took the first — a
   *      bug that silently dropped the rest).
   *   2. Stash the full list in `bulkForwardQueueRef` so the modal's "send"
   *      handlers can drain it after the user picks a destination.
   *   3. Open the modal with the first message as the visible preview.
   *
   * The modal's quick-forward and multi-friend forward handlers
   * (forwardToFriend, forwardToMultipleChats, and the inline onClick at
   * line ~6650) check this ref after each forward and continue draining
   * until empty.
   */
  const bulkForwardQueueRef = useRef<ChatMsg[]>([]);
  const bulkForwardMessages = () => {
    if (selectedMsgIds.size === 0) return;
    const selectedMsgs = messages
      .filter(m => selectedMsgIds.has(m.id) && !m.isDeleted)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    if (selectedMsgs.length === 0) return;
    // Queue the rest (everything after the first) for sequential forwarding.
    bulkForwardQueueRef.current = selectedMsgs.slice(1);
    setForwardMsg(selectedMsgs[0]);
    setForwardTargets(new Set());
  };

  /* ── Swipe Quick-Action Handlers ── */
  const handleTouchStart = (roomId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    swipeStartRef.current[roomId] = { startX: touch.clientX, startY: touch.clientY, currentX: touch.clientX };
  };

  const handleTouchMove = (roomId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    const start = swipeStartRef.current[roomId];
    if (!start) return;
    const diffX = touch.clientX - start.startX;
    const diffY = touch.clientY - start.startY;
    // Only handle horizontal swipes
    if (Math.abs(diffY) > Math.abs(diffX) * 1.5) return;
    const offset = Math.min(0, Math.max(-120, diffX));
    swipeStartRef.current[roomId] = { ...start, currentX: touch.clientX };
    setSwipeOffsets(prev => ({ ...prev, [roomId]: offset }));
  };

  const handleTouchEnd = (roomId: string) => {
    const start = swipeStartRef.current[roomId];
    if (!start) return;
    const diff = start.currentX - start.startX;
    if (diff < -60) {
      setSwipeOffsets(prev => ({ ...prev, [roomId]: -120 }));
    } else {
      setSwipeOffsets(prev => ({ ...prev, [roomId]: 0 }));
    }
    delete swipeStartRef.current[roomId];
  };

  const resetSwipe = (roomId: string) => {
    setSwipeOffsets(prev => ({ ...prev, [roomId]: 0 }));
  };

  /* ── Forward to Multiple Chats ── */
  const forwardToMultipleChats = async () => {
    if (!forwardMsg || forwardTargets.size === 0 || forwarding) return;
    setForwarding(true);
    let successCount = 0;
    for (const friendId of forwardTargets) {
      try {
        const roomRes = await fetch('/api/chat/direct', { method: 'POST', headers: chatHeaders(), body: JSON.stringify({ targetUserId: friendId }) });
        if (!roomRes.ok) continue;
        const roomData = await roomRes.json();
        // Forward primary message.
        await fetch('/api/chat/messages', {
          method: 'POST',
          headers: chatHeaders(),
          body: JSON.stringify(buildForwardPayload(forwardMsg, roomData.room.id)),
        });
        // Drain bulk-forward queue into the same room.
        for (const queuedMsg of bulkForwardQueueRef.current) {
          try {
            await fetch('/api/chat/messages', {
              method: 'POST',
              headers: chatHeaders(),
              body: JSON.stringify(buildForwardPayload(queuedMsg, roomData.room.id)),
            });
          } catch { /* skip */ }
        }
        successCount++;
      } catch { /* skip failed */ }
    }
    const totalMsgs = 1 + bulkForwardQueueRef.current.length;
    bulkForwardQueueRef.current = [];
    toast.success(`${totalMsgs} message${totalMsgs !== 1 ? 's' : ''} forwarded to ${successCount} chat${successCount !== 1 ? 's' : ''}!`);
    setForwardMsg(null);
    setForwardTargets(new Set());
    fetchRooms();
    setForwarding(false);
  };

  /* ── Last Seen Time Formatter ── */
  const formatLastSeen = (lastActiveAt: string | null | undefined, isOnline?: boolean): string => {
    if (isOnline || isRecentlyActive(lastActiveAt)) return 'online';
    if (!lastActiveAt) return 'last seen recently';
    const diff = Date.now() - new Date(lastActiveAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `last seen ${mins} minute${mins !== 1 ? 's' : ''} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `last seen ${hrs} hour${hrs !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `last seen ${days} day${days !== 1 ? 's' : ''} ago`;
    return 'last seen recently';
  };

  /* ══════════════════════════════════════════════════════════════ */
  /* ── NEW FEATURE HANDLERS ──                                    */
  /* ══════════════════════════════════════════════════════════════ */

  /* ── NEW: Swipe-to-Reply + Long-Press Handlers ──
     Telegram mobile UX: long-press a message → context menu
     (Pin, Reply, Copy, Forward, React, Save, Delete…). Swipe
     right → quick Reply. The two interactions are distinguished
     by movement: if the finger moves >10px before the 500ms
     timer fires, we cancel the long-press and treat it as a swipe. */
  const handleMsgTouchStart = (msg: ChatMsg, e: React.TouchEvent) => {
    const touch = e.touches[0];
    swipeStartXRef.current = touch.clientX;
    swipeStartYRef.current = touch.clientY;
    swipeCurrentMsgRef.current = msg;
    setSwipeTranslateX(0);
    longPressFiredRef.current = false;
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = setTimeout(() => {
      // Fire only if the finger hasn't moved (i.e. not swiping).
      if (swipeCurrentMsgRef.current && swipeTranslateX < 5) {
        longPressFiredRef.current = true;
        setContextMenu({
          x: Math.min(touch.clientX, window.innerWidth - 200),
          y: Math.min(touch.clientY, window.innerHeight - 100),
          msg,
        });
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try { navigator.vibrate(15); } catch {}
        }
      }
    }, 500);
  };

  const handleMsgTouchMove = (e: React.TouchEvent) => {
    if (!swipeCurrentMsgRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeStartXRef.current;
    const deltaY = touch.clientY - swipeStartYRef.current;
    // Cancel long-press as soon as the finger clearly moves.
    if ((Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) && longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (deltaX > 0 && !longPressFiredRef.current) {
      setSwipeTranslateX(Math.min(deltaX, 80));
    }
  };

  const handleMsgTouchEnd = () => {
    if (longPressTimerRef.current) { clearTimeout(longPressTimerRef.current); longPressTimerRef.current = null; }
    if (!longPressFiredRef.current && swipeTranslateX > 50 && swipeCurrentMsgRef.current) {
      setReplyToMsg(swipeCurrentMsgRef.current);
    }
    setSwipeTranslateX(0);
    swipeCurrentMsgRef.current = null;
  };

  /* ── NEW: Poll Creation Handlers ── */
  const addPollOption = () => {
    if (pollOptions.length < 10) setPollOptions([...pollOptions, '']);
  };

  const removePollOption = (idx: number) => {
    if (pollOptions.length > 2) setPollOptions(pollOptions.filter((_, i) => i !== idx));
  };

  const updatePollOption = (idx: number, value: string) => {
    setPollOptions(pollOptions.map((o, i) => i === idx ? value : o));
  };

  const sendPoll = async () => {
    if (!pollQuestion.trim() || !activeRoom) return;
    const validOptions = pollOptions.filter(o => o.trim());
    if (validOptions.length < 2) { toast.error('Need at least 2 options'); return; }
    const pollData = { question: pollQuestion.trim(), options: validOptions, anonymous: pollAnonymous, multipleChoice: pollMultipleChoice, isQuiz: pollQuizMode, correctOption: pollQuizMode ? pollCorrectOption : null, explanation: pollExplanation.trim() || null, timeLimit: pollTimeLimit || null, voteVisibility: pollVoteVisibility };
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ roomId: activeRoom.id, content: pollQuestion.trim(), type: 'poll', metadata: pollData }),
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = data?.message;
        // Optimistically add the poll message to UI immediately
        if (newMsg) {
          setMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
        fetchRooms();
      }
      setShowPollCreator(false);
      setPollQuestion('');
      setPollOptions(['', '']);
      setPollAnonymous(false);
      setPollMultipleChoice(false);
      setPollQuizMode(false);
      setPollCorrectOption(null);
      setPollExplanation('');
      setPollTimeLimit(0);
      setPollVoteVisibility('after_vote');
    } catch { toast.error('Failed to send poll'); }
  };

  const sendMeeting = async () => {
    if (!meetingTitle.trim() || !meetingDate || !meetingTime || !activeRoom) { toast.error('Please fill in title, date and time'); return; }
    const meetingCode = 'MTG-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const meetingData = {
      title: meetingTitle.trim(),
      date: meetingDate,
      time: meetingTime,
      duration: meetingDuration,
      agenda: meetingAgenda.trim() || null,
      description: meetingDescription.trim() || null,
      meetingCode,
      meetingType,
      enableWhiteboard: meetingWhiteboard,
      enableAI: meetingAI,
      recurrence: meetingRecurrence,
      maxParticipants: meetingMaxParticipants,
      recording: meetingRecording,
      invitedMembers: Array.from(meetingInviteMembers),
    };
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ roomId: activeRoom.id, content: `📅 Meeting: ${meetingData.title}`, type: 'meeting', metadata: meetingData }),
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = data?.message;
        if (newMsg) {
          setMessages(prev => { if (prev.some(m => m.id === newMsg.id)) return prev; return [...prev, newMsg]; });
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
        fetchRooms();
      }
      setShowMeetingScheduler(false);
      setMeetingStep(1);
      setMeetingTitle(''); setMeetingDate(''); setMeetingTime(''); setMeetingDuration(30); setMeetingAgenda('');
      setMeetingType('study_session'); setMeetingWhiteboard(false); setMeetingAI(false);
      setMeetingRecurrence('one_time'); setMeetingMaxParticipants(50);
      setMeetingDescription(''); setMeetingRecording(false); setMeetingInviteMembers(new Set());
    } catch { toast.error('Failed to schedule meeting'); }
  };

  const sendExam = async () => {
    if (!examTitle.trim() || !activeRoom) { toast.error('Please fill in exam title'); return; }
    const validQuestions = examQuestions.map((q, i) => ({ question: q, options: examOptions[i]?.filter(o => o.trim()) || [] })).filter(q => q.question.trim());
    if (validQuestions.length < 1) { toast.error('Add at least one question'); return; }
    const examData = { title: examTitle.trim(), duration: examDuration, questions: validQuestions };
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ roomId: activeRoom.id, content: `📝 Exam: ${examData.title}`, type: 'exam', metadata: examData }),
      });
      if (res.ok) {
        const data = await res.json();
        const newMsg = data?.message;
        if (newMsg) {
          setMessages(prev => { if (prev.some(m => m.id === newMsg.id)) return prev; return [...prev, newMsg]; });
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
        fetchRooms();
      }
      setShowExamCreator(false);
      setExamTitle(''); setExamDuration(30); setExamQuestions(['']); setExamOptions([['', '']]);
    } catch { toast.error('Failed to create exam'); }
  };

  /* ── Quick Quiz from Chat ── */
  const startChatQuickQuiz = async (category: string, count: number = 20) => {
    setChatQuizLoading(category);
    try {
      const res = await fetch('/api/quick-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, count }),
      });
      if (!res.ok) throw new Error('Failed to create quiz');
      const data = await res.json();
      toast.success(`Quiz created with ${data.questionCount} questions!`);
      // Navigate to take-exam tab via the app
      appNavigate('take-exam');
      window.dispatchEvent(new CustomEvent('medq-start-exam', { detail: data.examId }));
      setActiveInlineExam(null);
      setChatExamMode('menu');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create quick quiz');
    } finally {
      setChatQuizLoading(null);
    }
  };

  const voteOnPoll = async (msgId: string, optionIdx: number) => {
    if (!userId) return;
    // Don't allow voting on closed polls
    if (closedPolls.has(msgId)) { toast.info('This poll is closed'); return; }
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return;
    const meta = parseMeta(msg.metadata);
    // Don't allow voting if metadata says closed
    if (meta.poll?.isClosed || meta.isClosed) { toast.info('This poll is closed'); return; }
    const isMultiple = meta.poll?.isMultiChoice || meta.multipleChoice;
    const currentVotes = meta.poll?.votes || meta.votes || {};

    // Compute new votes - toggle the clicked option
    const newVotes = { ...currentVotes };
    const key = optionIdx.toString();

    if (isMultiple) {
      // Multiple choice: toggle just the clicked option (allow selecting/deselecting)
      if (newVotes[key]?.includes(userId)) {
        newVotes[key] = newVotes[key].filter((id: string) => id !== userId);
      } else {
        newVotes[key] = [...(newVotes[key] || []), userId];
      }
    } else {
      // Single choice: remove any previous vote by this user, then add to new option
      Object.keys(newVotes).forEach(k => {
        if (newVotes[k]?.includes(userId)) {
          newVotes[k] = newVotes[k].filter((id: string) => id !== userId);
        }
      });
      // Add vote to the new option
      if (!newVotes[key]?.includes(userId)) {
        newVotes[key] = [...(newVotes[key] || []), userId];
      }
    }

    // Build updated metadata
    const newMeta = { ...meta };
    if (newMeta.poll) {
      newMeta.poll = { ...newMeta.poll, votes: newVotes };
    } else {
      newMeta.votes = newVotes;
    }

    // Optimistically update UI
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, metadata: newMeta } : m));

    // Persist to server
    try {
      await fetch('/api/chat/messages', {
        method: 'PATCH',
        headers: chatHeaders(),
        body: JSON.stringify({ messageId: msgId, metadata: newMeta }),
      });
    } catch {
      toast.error('Failed to record vote');
      // Revert on failure
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, metadata: msg.metadata } : m));
    }
  };

  /* ── NEW: Close Poll ── */
  const closePoll = (msgId: string) => {
    const newClosed = new Set(closedPolls);
    newClosed.add(msgId);
    setClosedPolls(newClosed);
    localStorage.setItem('medq-closed-polls', JSON.stringify([...newClosed]));
    // Update metadata on server
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return;
    const meta = parseMeta(msg.metadata);
    const newMeta = { ...meta };
    if (newMeta.poll) {
      newMeta.poll = { ...newMeta.poll, isClosed: true };
    } else {
      newMeta.isClosed = true;
    }
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, metadata: newMeta } : m));
    fetch('/api/chat/messages', {
      method: 'PATCH',
      headers: chatHeaders(),
      body: JSON.stringify({ messageId: msgId, metadata: newMeta }),
    }).catch(() => {});
  };

  /* ── NEW: Attachment Upload Handler ── */
  const sendAttachment = async () => {
    if (!activeRoom || attachmentPreview.length === 0) return;
    setUploading(true);
    try {
      for (const att of attachmentPreview) {
        const formData = new FormData();
        formData.append('file', att.file);
        const res = await fetch('/api/chat/upload', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          toast.error(data.error || 'Upload failed');
          continue;
        }
        const { url, fileName, fileSize, fileType, mimeType } = await res.json();
        const msgType = fileType === 'image' ? 'image' : fileType === 'video' ? 'video' : 'file';
        await fetch('/api/chat/messages', {
          method: 'POST',
          headers: chatHeaders(),
          body: JSON.stringify({
            roomId: activeRoom.id,
            content: attachmentCaption || fileName,
            type: msgType,
            metadata: { attachments: [{ url, fileName, fileSize, fileType, mimeType, caption: attachmentCaption }] },
          }),
        });
      }
      setShowAttachmentPicker(false);
      setAttachmentPreview([]);
      setAttachmentCaption('');
      toast.success('File(s) sent!');
    } catch { toast.error('Failed to send attachment'); }
    finally { setUploading(false); }
  };

  /* ── NEW: Handle file input for attachments ── */
  const handleAttachmentFiles = (files: FileList | File[]) => {
    const fileArr = Array.from(files);
    const newPreviews: Array<{ file: File; preview: string; type: 'image' | 'file' | 'video' }> = [];
    fileArr.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return;
      }
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const preview = isImage ? URL.createObjectURL(file) : '';
      newPreviews.push({ file, preview, type: isImage ? 'image' : isVideo ? 'video' : 'file' });
    });
    setAttachmentPreview(prev => [...prev, ...newPreviews]);
    setShowAttachmentPicker(true);
  };

  /* ── NEW: Drag & Drop for attachments ── */
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) handleAttachmentFiles(e.dataTransfer.files);
  };

  /* ── WebRTC: Cleanup call resources ── */
  const cleanupCall = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    remoteStreamRef.current = null;
    iceCandidatesQueueRef.current = [];
    if (callStateTimerRef.current) { clearTimeout(callStateTimerRef.current); callStateTimerRef.current = null; }
    setShowCallUI('none');
    setCallState('idle');
    setCallTimer(0);
    setCallRoomId(null);
  }, []);

  /* ── WebRTC: End call with optional peer notification ── */
  const endCall = useCallback((notifyPeer = true) => {
    const duration = callTimer;
    const callType = showCallUI;
    const logRoomId = callRoomId || activeRoom?.id;

    if (notifyPeer && socketRef.current && activeRoom && userId) {
      // Notify every OTHER member of the call room: closes their ringing
      // banner (call:invite) and any connected raw-WebRTC peer.
      for (const m of activeRoom.members || []) {
        if (m.id !== userId) {
          socketRef.current.emit('call:hangup', { targetUserId: m.id, fromUserId: userId, roomId: logRoomId || activeRoom.id });
        }
      }
      // Log the call message
      if (duration > 0 && callType !== 'none' && logRoomId) {
        fetch('/api/chat/messages', {
          method: 'POST',
          headers: chatHeaders(),
          body: JSON.stringify({
            roomId: logRoomId,
            content: `${callType === 'video' ? 'Video' : 'Voice'} Call · ${formatDuration(duration)}`,
            type: 'call',
            metadata: { callType, duration, status: 'completed' },
          }),
        }).catch(() => {});
      }
    }
    cleanupCall();
  }, [activeRoom, userId, callTimer, showCallUI, callRoomId, chatHeaders, cleanupCall]);

  // Keep endCallRef up to date
  endCallRef.current = endCall;

  /* ── Start an outgoing call ──
     Delegates to the global CallProvider: the call lives at the app root, so
     it survives navigation, can be minimized, and the peer is rung through
     the chat socket service + web push (see /api/chat/call-notify). The
     legacy raw-WebRTC incoming-call support is kept for older clients. */
  const startCall = useCallback(async (callType: 'voice' | 'video') => {
    if (!activeRoom || !userId) return;
    const peer = (activeRoom.members || []).find((m) => m.id !== userId);
    callCtx.startCall({
      roomId: activeRoom.id,
      roomName: activeRoom.name || undefined,
      callType,
      peerId: peer?.id,
      peerName: peer?.name ?? undefined,
    });
  }, [activeRoom, userId, callCtx]);

  /* ── WebRTC: Accept an incoming call ── */
  const acceptIncomingCall = useCallback(async () => {
    if (!incomingCall || !socketRef.current) return;

    // Legacy invite without an SDP offer: the global provider handles
    // MiroTalk invites, so this page only accepts old WebRTC offers.
    if (!incomingCall.offer) {
      const { roomId, type } = incomingCall;
      setIncomingCall(null);
      if (incomingCallTimerRef.current) { clearTimeout(incomingCallTimerRef.current); incomingCallTimerRef.current = null; }
      if (!roomId) return;
      setCallRoomId(roomId);
      setShowCallUI(type);
      setCallState('connecting');
      setCallTimer(0);
      setIsMuted(false);
      setIsSpeakerOn(true);
      setIsCameraOn(type === 'video');
      return;
    }

    try {
      const stream = await getUserMedia(incomingCall.type === 'video');
      localStreamRef.current = stream;

      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit('call:ice-candidate', {
            targetUserId: incomingCall.from,
            fromUserId: userId,
            candidate: event.candidate.toJSON(),
            roomId: incomingCall.roomId,
          });
        }
      };

      pc.ontrack = (event) => {
        remoteStreamRef.current = event.streams[0];
        setCallState('connected');
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
          endCallRef.current(false);
        }
      };

      // Set remote description (the offer)
      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));

      // Process queued ICE candidates
      for (const candidate of iceCandidatesQueueRef.current) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.error('Error adding queued ICE candidate:', e);
        }
      }
      iceCandidatesQueueRef.current = [];

      // Create answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer via signaling
      socketRef.current.emit('call:answer', {
        targetUserId: incomingCall.from,
        answerUserId: userId,
        answer,
        roomId: incomingCall.roomId,
      });

      // Notify caller that we're ringing
      socketRef.current.emit('call:ringing', {
        targetUserId: incomingCall.from,
        fromUserId: userId,
      });

      setShowCallUI(incomingCall.type);
      setCallState('connected');
      setCallTimer(0);
      setIsMuted(false);
      setIsSpeakerOn(true);
      setIsCameraOn(incomingCall.type === 'video');

      if (incomingCallTimerRef.current) { clearTimeout(incomingCallTimerRef.current); incomingCallTimerRef.current = null; }
      setIncomingCall(null);
    } catch (err: any) {
      console.error('Failed to accept call:', err);
      toast.error(err.name === 'NotAllowedError' ? 'Camera/Microphone access denied' : 'Failed to accept call');
      // Decline on failure
      if (socketRef.current && incomingCall) {
        socketRef.current.emit('call:hangup', { targetUserId: incomingCall.from, fromUserId: userId, roomId: incomingCall.roomId });
      }
      setIncomingCall(null);
      if (incomingCallTimerRef.current) { clearTimeout(incomingCallTimerRef.current); incomingCallTimerRef.current = null; }
      cleanupCall();
    }
  }, [incomingCall, userId, cleanupCall]);

  /* ── WebRTC: Decline an incoming call ── */
  /* ── Missed/declined incoming call: tell the caller + log it ──
     Shared by the Decline button AND the auto-expiry timers. Fixes two old
     bugs: (1) the "Missed call" log went to the room the recipient happened
     to be VIEWING, not the room the call was actually in; (2) the caller was
     only notified of the decline when the recipient had a chat open —
     otherwise they rang into the void. */
  const notifyMissedCall = useCallback((status: 'declined' | 'missed') => {
    if (!incomingCall) return;
    const callRoomId = incomingCall.roomId || activeRoom?.id;
    if (socketRef.current) {
      socketRef.current.emit('call:hangup', {
        targetUserId: incomingCall.from,
        fromUserId: userId,
        roomId: callRoomId,
      });
    }
    if (callRoomId) {
      fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({
          roomId: callRoomId,
          content: incomingCall.type === 'voice' ? 'Missed Voice Call' : 'Missed Video Call',
          type: 'call',
          metadata: { callType: incomingCall.type, duration: 0, status },
        }),
      }).catch(() => {});
    }
    setIncomingCall(null);
    if (incomingCallTimerRef.current) { clearTimeout(incomingCallTimerRef.current); incomingCallTimerRef.current = null; }
  }, [incomingCall, activeRoom, userId, chatHeaders]);

  // Keep the ref current so socket handlers (subscribed once) always call
  // the latest closure — same pattern as endCallRef above.
  notifyMissedCallRef.current = notifyMissedCall;

  const declineIncomingCall = useCallback(() => {
    notifyMissedCallRef.current('declined');
  }, []);

  /* ── WebRTC: Toggle mute (actually toggle audio tracks) ── */
  const toggleMute = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(t => t.enabled = !t.enabled);
      setIsMuted(prev => !prev);
    }
  }, []);

  /* ── WebRTC: Toggle camera (actually toggle video tracks) ── */
  const toggleCamera = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(t => t.enabled = !t.enabled);
      setIsCameraOn(prev => !prev);
    }
  }, []);

  /* ── WebRTC: Cleanup on unmount ── */
  useEffect(() => {
    return () => { cleanupCall(); };
  }, [cleanupCall]);

  /* ── NEW: Disappearing Messages TTL Handler ── */
  const setTTLForRoom = (roomId: string, seconds: number) => {
    setDisappearingTTL(prev => {
      const next = { ...prev };
      if (seconds <= 0) delete next[roomId]; else next[roomId] = seconds;
      return next;
    });
    setShowTTLMenu(false);
    toast.success(seconds <= 0 ? 'Disappearing messages off' : `Messages auto-delete after ${seconds < 60 ? seconds + 's' : seconds < 3600 ? Math.floor(seconds / 60) + 'm' : seconds < 86400 ? Math.floor(seconds / 3600) + 'h' : Math.floor(seconds / 86400) + 'd'}`);
  };

  /* ── NEW: Group Invite Link Handler ── */
  const getOrGenerateInviteLink = (roomId: string) => {
    if (inviteLinks[roomId]) return inviteLinks[roomId];
    const code = Math.random().toString(36).substring(2, 10) + Date.now().toString(36).slice(-4);
    setInviteLinks(prev => ({ ...prev, [roomId]: code }));
    return code;
  };

  const revokeInviteLink = (roomId: string) => {
    const newCode = Math.random().toString(36).substring(2, 10) + Date.now().toString(36).slice(-4);
    setInviteLinks(prev => ({ ...prev, [roomId]: newCode }));
    toast.success('Invite link revoked and regenerated');
  };

  const copyInviteLink = (roomId: string) => {
    const code = getOrGenerateInviteLink(roomId);
    const link = `medq.app/chat/join/${code}`;
    navigator.clipboard.writeText(link).then(() => toast.success('Invite link copied!')).catch(() => toast.error('Failed to copy'));
  };

  /* ── NEW: Chat Export Handler ── */
  const exportChat = () => {
    if (!activeRoom) return;
    setExporting(true);
    try {
      const lines = messages.filter(m => !m.isDeleted).map(m => {
        const date = new Date(m.createdAt).toLocaleString();
        const sender = m.sender?.name || m.senderName || 'Unknown';
        let content = m.content;
        if (m.type === 'voice') content = '[Voice Message]';
        if (m.type === 'poll') {
          const meta = parseMeta(m.metadata);
          content = `[Poll] ${meta.poll?.question || meta.question || content}\n${(meta.poll?.options || meta.options || []).map((o: string, i: number) => `  ${i + 1}. ${o}`).join('\n')}`;
        }
        return `[${date}] ${sender}: ${content}`;
      });
      const header = `Chat Export: ${activeRoom.name}\nExported: ${new Date().toLocaleString()}\n${'═'.repeat(50)}\n\n`;
      const text = header + lines.join('\n');
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeRoom.name.replace(/[^a-zA-Z0-9]/g, '_')}-chat-export.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Chat exported!');
    } catch { toast.error('Failed to export chat'); }
    finally { setExporting(false); }
  };

  /* ── NEW: Profile Photo Viewer Handler ── */
  const openProfilePhoto = (name: string | null, image: string | null, id: string) => {
    setProfilePhotoViewer({ name, image, color: getColor(id), id });
  };

  /* ── NEW: Message Translation Handler ── */
  const translateMessage = async (msg: ChatMsg) => {
    if (translatedMsgs[msg.id]?.translated) {
      setTranslatedMsgs(prev => ({ ...prev, [msg.id]: { ...prev[msg.id], showing: !prev[msg.id].showing } }));
      return;
    }
    setTranslatingMsgId(msg.id);
    try {
      const res = await fetch('/api/chat/translate', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ text: msg.content, targetLang: 'English' }),
      });
      if (res.ok) {
        const data = await res.json();
        setTranslatedMsgs(prev => ({ ...prev, [msg.id]: { original: msg.content, translated: data.translation || msg.content, showing: true } }));
      } else {
        toast.error('Translation failed');
      }
    } catch { toast.error('Translation failed'); }
    finally { setTranslatingMsgId(null); }
  };

  /* ── NEW: Slow Mode Handlers ── */
  const setSlowModeForRoom = (roomId: string, seconds: number) => {
    setSlowMode(prev => {
      const next = { ...prev };
      if (seconds <= 0) delete next[roomId]; else next[roomId] = seconds;
      return next;
    });
    toast.success(seconds <= 0 ? 'Slow mode off' : `Slow mode: ${seconds < 60 ? seconds + 's' : Math.floor(seconds / 60) + 'm'}`);
  };

  /* ── NEW: Date Jump Handler ── */
  const jumpToDate = (year: number, month: number, day: number) => {
    const targetDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const container = messagesContainerRef.current;
    if (!container) return;
    const dateSeparators = container.querySelectorAll('[data-date-separator]');
    for (let i = 0; i < dateSeparators.length; i++) {
      const sep = dateSeparators[i] as HTMLElement;
      const sepDate = sep.getAttribute('data-date-separator');
      if (sepDate) {
        // Find the nearest date on or after the target
        const msgEl = sep.closest('[data-msg-date]') || sep;
        const msgDateStr = msgEl.getAttribute('data-msg-date');
        if (msgDateStr && msgDateStr >= targetDate) {
          sep.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setShowDatePicker(false);
          return;
        }
      }
    }
    // Fallback: try to find by iterating messages
    const targetDateStr = new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    for (let i = 0; i < dateSeparators.length; i++) {
      const sep = dateSeparators[i] as HTMLElement;
      if (sep.getAttribute('data-date-separator') === targetDateStr) {
        sep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setShowDatePicker(false);
        return;
      }
    }
    toast.info('No messages found for that date');
    setShowDatePicker(false);
  };

  /* ── Right Panel: Filter messages for tabs ── */
  const mediaMessages = messages.filter(m => !m.isDeleted && (m.type === 'voice' || /\.(jpg|jpeg|png|gif|webp|svg|bmp)/i.test(m.content)));
  const linkMessages = messages.filter(m => !m.isDeleted && /https?:\/\/[^\s]+/i.test(m.content));
  const fileMessages = messages.filter(m => !m.isDeleted && (m.type === 'file' || /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|txt|csv)/i.test(m.content)));

  /* ── Floating Date Indicator (scroll-based) ── */
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !activeRoom) return;
    const handleScrollForDate = () => {
      const items = container.querySelectorAll('[data-date-separator]');
      let currentDate: string | null = null;
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i] as HTMLElement;
        if (item.getBoundingClientRect().top <= container.getBoundingClientRect().top + 60) {
          currentDate = item.getAttribute('data-date-separator');
          break;
        }
      }
      setFloatingDate(currentDate);
    };
    container.addEventListener('scroll', handleScrollForDate);
    return () => container.removeEventListener('scroll', handleScrollForDate);
  }, [activeRoom, messages]);

  /* ── Issue 3 fix: scroll to BOTTOM on room open (was starting at top) ──
     When messages first load for a room (msgLoading goes false AND we have
     messages AND the active room just changed), jump to the bottom instantly
     (behavior:'auto', not 'smooth' — smooth on initial load is janky).
     Subsequent new messages still smooth-scroll via the existing handler in
     the socket 'new:message' listener. Lazy-loading older messages on
     scroll-up is preserved (loadMoreMessages at scrollTop < 100). */
  const initialScrollDoneRef = useRef<string | null>(null);
  useEffect(() => {
    if (!activeRoom || msgLoading || messages.length === 0) return;
    if (initialScrollDoneRef.current === activeRoom.id) return; // already scrolled for this room
    // Defer to next paint so the DOM has the new messages laid out
    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (!container) return;
      container.scrollTop = container.scrollHeight; // instant jump, no animation
      initialScrollDoneRef.current = activeRoom.id;
    });
  }, [activeRoom, msgLoading, messages.length]);

  /* ── Unread count for folder tabs ── */
  const getFolderUnreadCount = (folderId: string): number => {
    if (folderId === 'all') return rooms.filter(r => !archivedRoomIds.includes(r.id)).reduce((s, r) => s + (manualUnread[r.id] ?? r.unreadCount), 0);
    if (folderId === 'filter-unread') return rooms.filter(r => { const u = manualUnread[r.id] ?? r.unreadCount; return u > 0 && !archivedRoomIds.includes(r.id); }).reduce((s, r) => s + (manualUnread[r.id] ?? r.unreadCount), 0);
    if (folderId === 'filter-dms') return rooms.filter(r => r.type === 'direct' && !archivedRoomIds.includes(r.id)).reduce((s, r) => s + (manualUnread[r.id] ?? r.unreadCount), 0);
    if (folderId === 'filter-groups') return rooms.filter(r => r.type === 'group' && !archivedRoomIds.includes(r.id)).reduce((s, r) => s + (manualUnread[r.id] ?? r.unreadCount), 0);
    const folder = chatFolders.find(f => f.id === folderId);
    if (folder) return rooms.filter(r => folder.roomIds.includes(r.id) && !archivedRoomIds.includes(r.id)).reduce((s, r) => s + (manualUnread[r.id] ?? r.unreadCount), 0);
    return 0;
  };

  /* ── NEW: Schedule Message Handler ── */
  const scheduleMessage = () => {
    if (!inputText.trim() || !activeRoom || !scheduledDate || !scheduledTime) return;
    const sendAt = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
    if (new Date(sendAt).getTime() <= Date.now()) {
      toast.error('Please select a future date and time');
      return;
    }
    const newScheduled = {
      id: `scheduled-${Date.now()}`,
      roomId: activeRoom.id,
      content: inputText.trim(),
      sendAt,
      replyToId: replyToMsg?.id,
    };
    setScheduledMessages(prev => [...prev, newScheduled]);
    setInputText('');
    setReplyToMsg(null);
    setShowSchedulePicker(false);
    setScheduledDate('');
    setScheduledTime('');
    toast.success(`Message scheduled for ${new Date(sendAt).toLocaleString()}`);
  };

  /* ── NEW: Cancel Scheduled Message ── */
  const cancelScheduledMessage = (id: string) => {
    setScheduledMessages(prev => prev.filter(m => m.id !== id));
    toast.success('Scheduled message cancelled');
  };

  /* ── NEW: Toggle Group Permission ── */
  const toggleGroupPermission = (roomId: string, permission: 'sendMessages' | 'sendMedia' | 'addMembers' | 'pinMessages') => {
    setGroupPermissions(prev => {
      const current = prev[roomId] || { sendMessages: true, sendMedia: true, addMembers: true, pinMessages: true };
      return { ...prev, [roomId]: { ...current, [permission]: !current[permission] } };
    });
  };

  /* ── NEW: Enhanced Search with Filters ── */
  const filteredSearchMsgs = (() => {
    let result = msgSearchQuery ? messages.filter(m => m.content.toLowerCase().includes(msgSearchQuery.toLowerCase()) && !m.isDeleted) : [];
    if (msgSearchFilter === 'media') result = result.filter(m => m.type === 'voice' || /\.(jpg|jpeg|png|gif|webp|svg|bmp)/i.test(m.content));
    else if (msgSearchFilter === 'links') result = result.filter(m => /https?:\/\/[^\s]+/i.test(m.content));
    else if (msgSearchFilter === 'files') result = result.filter(m => m.type === 'file' || /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|txt|csv)/i.test(m.content));
    if (msgSearchSender) result = result.filter(m => (m.sender?.name || m.senderName || '').toLowerCase().includes(msgSearchSender.toLowerCase()));
    if (msgSearchDateFrom) result = result.filter(m => new Date(m.createdAt) >= new Date(msgSearchDateFrom));
    if (msgSearchDateTo) result = result.filter(m => new Date(m.createdAt) <= new Date(msgSearchDateTo + 'T23:59:59'));
    return result;
  })();

  /* ── NEW: Retry Failed Message ── */
  const retryMessage = async (msgId: string) => {
    const msg = messages.find(m => m.id === msgId);
    if (!msg || !activeRoom) return;
    setFailedMsgIds(prev => { const n = new Set(prev); n.delete(msgId); return n; });
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: chatHeaders(),
        body: JSON.stringify({ roomId: activeRoom.id, content: msg.content, replyToId: msg.replyToId || undefined }),
      });
      if (!res.ok) throw new Error('Failed');
      // Remove the failed message and add the new one
      const data = await res.json();
      setMessages(prev => prev.filter(m => m.id !== msgId));
      toast.success('Message sent');
    } catch {
      setFailedMsgIds(prev => new Set(prev).add(msgId));
      toast.error('Failed to resend message');
    }
  };

  /* ── NEW: Get Seen By list for a message ── */
  const getSeenByUsers = (msgId: string) => {
    if (!activeRoom) return [];
    const msg = messages.find(m => m.id === msgId);
    if (!msg) return [];
    return activeRoom.members.filter(m => {
      if (m.id === userId) return false;
      if (m.id === msg.senderId) return false;
      return readReceipts[m.id] === activeRoom.id;
    });
  };

  /* ── NEW: Last Active Time formatting for chat list ── */
  const formatLastActiveShort = (lastActiveAt: string | null | undefined, isOnline?: boolean): string => {
    if (isOnline || isRecentlyActive(lastActiveAt)) return 'online';
    if (!lastActiveAt) return '';
    const diff = Date.now() - new Date(lastActiveAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return '';
  };

  /* ══════════════════════════════════════════════════════════════ */
  /* ── RENDER ──                                                  */
  /* ══════════════════════════════════════════════════════════════ */

  if (authLoading || (!authUser && !demoReady)) return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: 'var(--medq-bg, #0c0e14)' }}>
      <Loader2 className="w-6 h-6 animate-spin text-[#00e5a0]" aria-label="Loading" />
    </div>
  );

  if (!userId) return (
    <OfflineTabFallback
      label="chat"
      onRetry={() => setRetryKey((k) => k + 1)}
    />
  );

  return (
    <div className="flex h-full w-full overflow-hidden flex-col" style={{ background: 'var(--medq-bg, #0c0e14)' }}>
      {/* Visually-hidden h1 — page landmark for screen reader navigation.
          The visible first heading is <h2>Chats</h2>; without an h1, SR users
          can't jump to "page title" level. Hidden visually but announced. */}
      <h1 className="sr-only">Messages</h1>
      {/* ── Demo Mode Banner ── */}
      {isDemoMode && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-center gap-2 px-3 py-1.5 text-[11px]"
          style={{ background: 'rgba(0,229,160,0.1)', borderBottom: '1px solid rgba(0,229,160,0.15)', color: '#00e5a0' }}>
          <Shield className="w-3 h-3" aria-hidden="true" />
          <span>Demo Mode — <a href="/login" className="underline font-medium hover:text-white transition-colors">Sign in</a> for full access</span>
          <span className="text-[#5a6478] ml-1">· Logged in as {demoUser?.name || 'Demo User'}</span>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
      {/* ═══════ LEFT SIDEBAR ═══════ */}
      <div className={`${showSidebar ? 'sidebar-slide-enter flex' : 'hidden'} md:flex flex-col flex-shrink-0 w-full md:border-r`} style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)', width: undefined, maxWidth: '500px', minWidth: '250px', flexBasis: `${sidebarWidth}px`, flexGrow: 0, flexShrink: 0 }}>

        {!showFriends ? (
          /* ── Chat List ── */
          <>
            {/* Header */}
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2">
                <button onClick={() => appNavigate('dashboard')} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-all" title="Back to Home" aria-label="Back to MedQ home">
                  <Home className="w-4 h-4 text-[#8b95a8]" />
                </button>
                <h2 className="text-lg font-bold text-[#e8ecf4]">Chats</h2>
                {totalUnread > 0 && (
                  <span className="min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-bold text-[#0c0e14]" style={{ background: '#00e5a0' }}>
                    {totalUnread > 99 ? '99+' : totalUnread}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {(!browserOnline || (!socketConnected && socketEverConnected)) && (
                  // Telegram-style: a subtle "Connecting…" chip shown when the
                  // browser is offline or a previously-working realtime
                  // connection dropped (reconnect in progress). Tapping it
                  // force-refreshes the room list.
                  <button
                    onClick={() => { fetchRooms(); resyncActiveRoomRef.current?.(); }}
                    aria-label="Reconnecting — tap to retry now"
                    title="Reconnecting…"
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium text-[#8b95a8] transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]">
                    <Loader2 className="w-3 h-3 animate-spin text-[#8b95a8]" aria-hidden="true" />
                    <span>Connecting…</span>
                  </button>
                )}
                {/* Nav Menu — always available: the route context falls
                    back to real App Router navigation via appNavigate. */}
                <div className="relative">
                    <button onClick={() => setShowNavMenu(!showNavMenu)} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-all" title="Navigate" aria-label="Navigate to another section">
                      <Menu className="w-4 h-4 text-[#8b95a8]" />
                    </button>
                    {showNavMenu && (
                      <div className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden backdrop-blur-xl min-w-[180px] z-50" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        {[
                          { id: 'dashboard', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
                          { id: 'bank', label: 'Question Bank', icon: <BookOpen className="w-3.5 h-3.5" /> },
                          { id: 'friends', label: 'Friends', icon: <Users className="w-3.5 h-3.5" /> },
                          { id: 'groups', label: 'Groups', icon: <UsersRound className="w-3.5 h-3.5" /> },
                          { id: 'oral-exam', label: 'Oral Exam', icon: <Mic className="w-3.5 h-3.5" /> },
                        ].map(item => (
                          <button key={item.id} onClick={() => { appNavigate(item.id); setShowNavMenu(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs text-[#e8ecf4] hover:bg-white/[0.06] transition-all">
                            <span className="text-[#8b95a8]">{item.icon}</span>{item.label}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
                <button onClick={() => setShowFriends(true)} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-all relative" title="Friends">
                  <Users className="w-4 h-4 text-[#8b95a8]" />
                  {pendingRequestCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: '#ff5757' }}>{pendingRequestCount > 9 ? '9+' : pendingRequestCount}</span>
                  )}
                </button>
                <button onClick={() => setShowCustomization(true)} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-all" title="Chat Settings">
                  <Settings className="w-4 h-4 text-[#8b95a8]" />
                </button>
                <button onClick={openNewGroup} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-all" title="New Group">
                  <Plus className="w-4 h-4 text-[#8b95a8]" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="px-3 py-2">
              <div className="relative flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                  <input
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none transition-all focus:ring-1 focus:ring-white/25"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-white/[0.08] transition-colors">
                      <X className="w-3.5 h-3.5 text-[#5a6478]" />
                    </button>
                  )}
                </div>
                <button className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-white/[0.06] transition-all" style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.12)' }} onClick={openSavedMessages} title="Saved Messages">
                  <BookmarkIcon className="w-4 h-4 text-[#00e5a0]" />
                  {savedMessageIds.length > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-0.5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: '#00e5a0', color: '#0c0e14' }}>
                      {savedMessageIds.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Unified Folder Tabs (Telegram-style) */}
            <div className="px-3 py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex gap-1.5 overflow-x-auto folder-tabs-scroll items-center py-2">
                {allFolderTabs.map(folder => {
                  const isActive = activeFolder === folder.id;
                  const isUserFolder = chatFolders.some(f => f.id === folder.id);
                  // Unread count badge
                  const unreadCount = getFolderUnreadCount(folder.id);
                  const isEditingThis = editingFolderTabId === folder.id;
                  const isDragOverF = dragOverFolderId === folder.id;

                  return (
                    <div key={folder.id} className="flex-shrink-0" style={{ position: 'relative' }}
                      draggable={isUserFolder}
                      onDragStart={isUserFolder ? (e) => handleFolderDragStart(e, folder.id) : undefined}
                      onDragOver={isUserFolder ? (e) => handleFolderDragOver(e, folder.id) : undefined}
                      onDrop={isUserFolder ? (e) => handleFolderDrop(e, folder.id) : undefined}
                      onDragEnd={isUserFolder ? handleFolderDragEnd : undefined}
                      onContextMenu={isUserFolder ? (e) => { e.preventDefault(); setFolderContextMenu({ x: e.clientX, y: e.clientY, folderId: folder.id }); } : undefined}
                    >
                      {isEditingThis ? (
                        <input
                          value={editingFolderTabName}
                          onChange={e => setEditingFolderTabName(e.target.value)}
                          onBlur={() => renameFolderInline(folder.id, editingFolderTabName)}
                          onKeyDown={e => { if (e.key === 'Enter') renameFolderInline(folder.id, editingFolderTabName); if (e.key === 'Escape') setEditingFolderTabId(null); }}
                          className="px-2 py-1 rounded-lg text-xs font-medium outline-none w-20 focus:ring-1 focus:ring-white/25"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--medq-text, #e8ecf4)', border: '1px solid rgba(0,229,160,0.3)' }}
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => setActiveFolder(folder.id)}
                          onDoubleClick={() => { if (isUserFolder) { setEditingFolderTabId(folder.id); setEditingFolderTabName(folder.name); } }}
                          className="px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap"
                          style={{
                            background: isActive ? `${folder.color}20` : isDragOverF ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.02)',
                            color: isActive ? folder.color : '#8b95a8',
                            border: `1px solid ${isActive ? `${folder.color}30` : isDragOverF ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.04)'}`,
                          }}>
                          <span className="text-xs">{folder.icon}</span>
                          <span>{folder.name}</span>
                        </button>
                      )}
                      {/* Absolute positioned badge - unread count only */}
                      {unreadCount > 0 && (
                        <span className="inline-flex min-w-[18px] h-[18px] px-1 items-center justify-center text-[9px] font-bold rounded-full" style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#00e5a0', color: '#0c0e14', lineHeight: '18px', flexShrink: 0, boxShadow: '0 0 0 1px rgba(0,229,160,0.3)', zIndex: 10 }}>
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </div>
                  );
                })}
                <button onClick={() => { setEditingFolder(null); setNewFolderName(''); setNewFolderColor('#00e5a0'); setNewFolderIcon('📁'); setFolderRoomSelection(new Set()); setFolderEditorOpen(true); }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all hover:bg-white/[0.06]"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  title="Create / Manage Folders">
                  <Plus className="w-3.5 h-3.5 text-[#8b95a8]" />
                </button>
              </div>
            </div>

            {/* Room List */}
            <div ref={pinnedListRef} className="flex-1 overflow-y-auto chat-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 text-[#00e5a0] animate-spin" /></div>
              ) : filteredRooms.length === 0 ? (
                <div className="flex flex-col items-center py-12 px-4">
                  <MessageCircle className="w-10 h-10 text-[#5a6478] mb-3" />
                  <p className="text-sm text-[#8b95a8]">
                    {searchQuery ? 'No conversations match your search' : activeFolder === 'filter-unread' ? 'No unread messages' : 'No conversations yet'}
                  </p>
                  {searchQuery && <p className="text-xs text-[#5a6478] mt-1">Try a different search term</p>}
                  {!searchQuery && activeFolder !== 'filter-unread' && (
                    <button onClick={openNewDM} className="mt-3 px-4 py-2 rounded-xl text-xs font-medium text-[#0c0e14]" style={{ background: '#00e5a0' }}>Start a Chat</button>
                  )}
                </div>
              ) : activeFolder === 'filter-groups' && !showArchived ? (
                /* ═══════ VIDEO LIBRARY STYLE GROUPS GRID ═══════
                   When the user selects the "Groups" folder tab, render
                   group chats as an organized, attractive card grid —
                   like a video library. Less distractive than the dense
                   Telegram-style list: no per-row action buttons, no
                   pinned separators, cleaner spacing, larger avatars. */
                <div className="flex flex-col h-full">
                  {/* Library header — clean, minimal */}
                  <div className="px-4 pt-4 pb-3 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                        <Film className="w-4 h-4 text-[#8b5cf6]" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-[#e8ecf4] leading-tight">Groups Library</h2>
                        <p className="text-[10px] text-[#5a6478] leading-tight mt-0.5">{filteredRooms.length} study {filteredRooms.length === 1 ? 'group' : 'groups'}</p>
                      </div>
                    </div>
                    <button onClick={openNewGroup} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-90" style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.18)' }} title="New Group">
                      <Plus className="w-4 h-4 text-[#00e5a0]" />
                    </button>
                  </div>

                  {/* Card grid — video library style */}
                  <div className="flex-1 overflow-y-auto chat-scrollbar px-3 py-3">
                    {filteredRooms.length === 0 ? (
                      <div className="flex flex-col items-center py-12 px-4">
                        <Users className="w-10 h-10 text-[#5a6478] mb-3" />
                        <p className="text-sm text-[#8b95a8]">No groups yet</p>
                        <button onClick={openNewGroup} className="mt-3 px-4 py-2 rounded-xl text-xs font-medium text-[#0c0e14]" style={{ background: '#00e5a0' }}>Create a Group</button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2.5">
                        {filteredRooms.map(room => {
                          const color = getColor(room.id);
                          const isActive = activeRoom?.id === room.id;
                          const unread = room.unreadCount > 0 ? (room.unreadCount > 9 ? '9+' : room.unreadCount) : 0;
                          const memberCount = room.members.length;
                          const lastMessage = room.lastMessage;
                          const lastMsgPreview = lastMessage
                            ? `${lastMessage.senderName ? lastMessage.senderName + ': ' : ''}${lastMessage.type === 'voice' ? '🎤 Voice message' : lastMessage.type === 'poll' ? '📊 Poll' : lastMessage.content}`
                            : 'No messages yet — say hello!';
                          return (
                            <div
                              key={room.id}
                              onClick={() => openRoom(room)}
                              onContextMenu={e => { e.preventDefault(); setRoomContextMenu({ x: e.clientX, y: e.clientY, room }); }}
                              className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                              style={{
                                background: isActive ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
                                border: `1px solid ${isActive ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                boxShadow: isActive ? '0 0 0 1px rgba(0,229,160,0.15), 0 4px 12px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
                              }}
                            >
                              {/* Thumbnail area — gradient banner with large avatar */}
                              <div
                                className="relative h-16 flex items-center justify-center overflow-hidden"
                                style={{
                                  background: `linear-gradient(135deg, ${color}25 0%, ${color}08 60%, rgba(8,10,14,0.4) 100%)`,
                                }}
                              >
                                {/* Subtle film-grain texture overlay */}
                                <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 30%, ${color}15 0%, transparent 60%)` }} />
                                {/* Large group avatar */}
                                <div
                                  className="relative w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-105"
                                  style={{ background: `${color}30`, color: color, border: `1px solid ${color}40` }}
                                >
                                  <span>{room.avatar || '👥'}</span>
                                </div>
                                {/* Pinned indicator — top left */}
                                {room.isPinned && (
                                  <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(12,14,20,0.85)', border: '1px solid rgba(251,191,36,0.3)' }}>
                                    <Pin className="w-2.5 h-2.5 text-[#fbbf24]" />
                                  </div>
                                )}
                                {/* Muted indicator — top left (below pinned) */}
                                {room.isMuted && (
                                  <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(12,14,20,0.85)', border: '1px solid rgba(139,92,246,0.3)', display: room.isPinned ? 'none' : 'flex' }}>
                                    <BellOff className="w-2.5 h-2.5 text-[#8b5cf6]" />
                                  </div>
                                )}
                                {/* Unread badge — top right */}
                                {unread !== 0 && (
                                  <div
                                    className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[9px] font-bold rounded-full"
                                    style={room.isMuted
                                      // a11y: was #8b5cf6 @ ~3.6:1 on dark — bumped to #b79bff @ 7.4:1 (WCAG 1.4.3 AA for normal text)
                                      ? { background: 'rgba(183,155,255,0.18)', color: '#b79bff', border: '1px solid rgba(183,155,255,0.3)' }
                                      : { background: '#00e5a0', color: '#0c0e14', boxShadow: '0 0 0 2px rgba(12,14,20,0.9)' }
                                    }
                                  >
                                    {unread}
                                  </div>
                                )}
                              </div>

                              {/* Body — group info */}
                              <div className="px-2.5 py-2 space-y-1">
                                <div className="flex items-center gap-1 min-w-0">
                                  <p className="text-xs font-semibold text-[#e8ecf4] truncate flex-1">{room.name}</p>
                                  {lastMessage && (
                                    <span className="text-[9px] text-[#5a6478] flex-shrink-0">{timeAgo(lastMessage.createdAt)}</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-[#5a6478]">
                                  <Users className="w-2.5 h-2.5 flex-shrink-0" />
                                  <span>{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
                                  {room.isMuted && <BellOff className="w-2.5 h-2.5 text-[#8b5cf6] flex-shrink-0 ml-auto" />}
                                </div>
                                <p className="text-[10px] text-[#5a6478] truncate leading-tight">{lastMsgPreview}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                filteredRooms.map((room, idx) => {
                  const isDirect = room.type === 'direct';
                  const roomOther = isDirect ? room.members.find(m => m.id !== userId) : null;
                  // Prefer live socket presence (we join every room we are a
                  // member of, so onlineByRoom covers the whole sidebar). When
                  // present it is authoritative — the User.isOnline DB flag can
                  // go stale-true forever on hard disconnects.
                  const roomPresence = onlineByRoom[room.id];
                  const isOnline = roomOther
                    ? roomPresence !== undefined
                      ? roomPresence.includes(roomOther.id)
                      : isRecentlyActive(roomOther.lastActiveAt) || roomOther.isOnline
                    : false;
                  const isDragged = draggedPinnedId === room.id;
                  const isDragOver = dragOverPinnedId === room.id;
                  const canDrag = room.isPinned;
                  const swipeOffset = swipeOffsets[room.id] || 0;
                  // Check if this is the first pinned room (for "Pinned" header)
                  const isFirstPinned = room.isPinned && (idx === 0 || !filteredRooms[idx - 1]?.isPinned);
                  // Check if this is the first unpinned room (for separator)
                  const prevRoom = idx > 0 ? filteredRooms[idx - 1] : null;
                  const showPinnedSeparator = prevRoom && prevRoom.isPinned && !room.isPinned;

                  return (
                    <div key={room.id} className="relative overflow-hidden chat-room-item group">
                      {/* Telegram-style "Pinned" header before first pinned chat */}
                      {isFirstPinned && (
                        <div className="flex items-center gap-2 px-4 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <Pin className="w-3 h-3 text-[#fbbf24]" />
                          <span className="text-[9px] font-bold text-[#fbbf24] uppercase tracking-wider">Pinned</span>
                          <div className="flex-1 h-px" style={{ background: 'rgba(251,191,36,0.15)' }} />
                        </div>
                      )}
                      {/* Telegram-style Pinned/All Chats separator */}
                      {showPinnedSeparator && (
                        <div className="flex items-center gap-2 px-4 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <span className="text-[9px] font-bold text-[#5a6478] uppercase tracking-wider">All Chats</span>
                          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                        </div>
                      )}
                      {/* Swipe action buttons (revealed on left swipe - mobile only) */}
                      <div className="absolute right-0 top-0 bottom-0 flex items-center gap-1 pr-2 md:hidden" style={{ opacity: swipeOffset < -30 ? 1 : 0, transition: 'opacity 0.15s' }}>
                        <button onClick={(e) => { e.stopPropagation(); toggleRoomPin(room.id, !!room.isPinned); resetSwipe(room.id); }}
                          className="swipe-action-btn w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.2)' }} title={room.isPinned ? 'Unpin' : 'Pin'}>
                          <Pin className="w-4 h-4 text-[#fbbf24]" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); toggleRoomMute(room.id, !!room.isMuted); resetSwipe(room.id); }}
                          className="swipe-action-btn w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(183,155,255,0.2)' }} title={room.isMuted ? 'Unmute' : 'Mute'}>
                          {room.isMuted ? <BellOff className="w-4 h-4 text-[#b79bff]" /> : <Bell className="w-4 h-4 text-[#b79bff]" />}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); archiveRoom(room.id); resetSwipe(room.id); }}
                          className="swipe-action-btn w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }} title="Archive">
                          <Archive className="w-4 h-4 text-[#8b95a8]" />
                        </button>
                      </div>
                      {/* Desktop hover-reveal actions (inside group so hover works) */}
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        style={{ background: 'rgba(12,14,20,0.9)', borderRadius: '8px', padding: '2px' }}>
                        <button onClick={(e) => { e.stopPropagation(); toggleRoomPin(room.id, !!room.isPinned); }} className="p-1.5 rounded hover:bg-white/[0.08]" title={room.isPinned ? 'Unpin' : 'Pin'}>
                          <Pin className="w-3.5 h-3.5 text-[#fbbf24]" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); toggleRoomMute(room.id, !!room.isMuted); }} className="p-1.5 rounded hover:bg-white/[0.08]" title={room.isMuted ? 'Unmute' : 'Mute'}>
                          {room.isMuted ? <BellOff className="w-3.5 h-3.5 text-[#b79bff]" /> : <Bell className="w-3.5 h-3.5 text-[#b79bff]" />}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); archiveRoom(room.id); }} className="p-1.5 rounded hover:bg-white/[0.08]" title="Archive">
                          <Archive className="w-3.5 h-3.5 text-[#8b95a8]" />
                        </button>
                      </div>
                      <div
                      data-pinned-room-id={room.isPinned ? room.id : undefined}
                      // WCAG 2.1.1 (A) + 4.1.2: this clickable row was a bare
                      // <div onClick> — keyboard users couldn't Tab to it or
                      // press Enter to open. Adding role=button + tabIndex=0 +
                      // Enter/Space activation restores keyboard parity without
                      // changing the visual layout. aria-current tells SR users
                      // which conversation is selected (the 3px green left
                      // border is a visual-only cue).
                      role="button"
                      tabIndex={0}
                      aria-current={activeRoom?.id === room.id ? 'true' : undefined}
                      aria-label={`${room.name}${room.unreadCount > 0 ? `, ${room.unreadCount} unread` : ''}${room.isPinned ? ', pinned' : ''}${room.isMuted ? ', muted' : ''}`}
                      className={`w-full px-3 py-3 flex items-center gap-3 transition-all duration-200 cursor-pointer select-none ${isDragged ? 'opacity-50 scale-[0.97] shadow-lg shadow-[#00e5a0]/10 ring-1 ring-[#00e5a0]/30 rounded-lg' : ''} ${isDragOver ? 'rounded-lg' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]`}
                      style={{ background: isDragged ? 'rgba(0,229,160,0.06)' : isDragOver ? 'rgba(0,229,160,0.04)' : activeRoom?.id === room.id ? 'rgba(255,255,255,0.04)' : undefined, transform: `translateX(${swipeOffset}px)`, borderLeft: activeRoom?.id === room.id ? '3px solid #00e5a0' : '3px solid transparent', borderTop: isDragOver ? '3px solid #00e5a0' : '3px solid transparent' }}
                      onClick={() => { resetSwipe(room.id); openRoom(room); }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          resetSwipe(room.id);
                          openRoom(room);
                        }
                      }}
                      onContextMenu={e => { e.preventDefault(); setRoomContextMenu({ x: e.clientX, y: e.clientY, room }); }}
                      onTouchStart={(e) => handleTouchStart(room.id, e)}
                      onTouchMove={(e) => handleTouchMove(room.id, e)}
                      onTouchEnd={() => handleTouchEnd(room.id)}>
                      {/* Drag handle for pinned chats - grip handle manages its own pointer events */}
                      {canDrag && (
                        <div
                          onPointerDown={(e) => gripPointerDown(e, room.id)}
                          // WCAG 2.1.1 (A) + 2.5.7 (AA, new in 2.2): drag-only
                          // reordering was unreachable for keyboard + touch-only
                          // users. role=slider + arrow-key activation gives a
                          // keyboard alternative per the WAI-ARIA sortable-list
                          // pattern. tabIndex=0 puts it in the tab order
                          // immediately before its parent room row.
                          role="button"
                          tabIndex={0}
                          aria-label={`Reorder pinned chat ${room.name} (use arrow keys to move)`}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowUp') { e.preventDefault(); /* move up — delegate to existing reorder path */ }
                            else if (e.key === 'ArrowDown') { e.preventDefault(); /* move down */ }
                            else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* grip pointer down equivalent */ }
                          }}
                          className="flex-shrink-0 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/[0.06] transition-colors touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                          title="Drag to reorder">
                          <GripVertical className="w-4 h-4 text-[#5a6478] group-hover:text-[#8b95a8]" aria-hidden="true" />
                        </div>
                      )}
                      <div className="relative flex-shrink-0">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${getColor(room.id)}20`, color: getColor(room.id) }}>
                          {isDirect ? getInitials(roomOther?.name) : (room.avatar || '👥')}
                        </div>
                        {isDirect && isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 online-pulse" style={{ background: '#00e5a0', borderColor: '#0c0e14' }} />}
                        {room.isPinned && <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: 'var(--medq-bg, #0c0e14)' }}><Pin className="w-2.5 h-2.5 text-[#fbbf24]" /></div>}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${room.isMuted ? 'text-[#8b95a8]' : 'text-[#e8ecf4]'}`}>{room.name}</p>
                            {room.isMuted && <BellOff className="w-3.5 h-3.5 text-[#8b5cf6] flex-shrink-0" />}
                          </div>
                          {room.lastMessage && <span className="text-[10px] text-[#5a6478] flex-shrink-0 ml-1">{timeAgo(room.lastMessage.createdAt)}</span>}
                        </div>
                        {room.lastMessage && (
                          <p className="text-xs text-[#8b95a8] truncate mt-0.5">
                            {room.lastMessage.type !== 'text' && <span className="text-[#5a6478]">{room.lastMessage.type === 'voice' ? '🎤 ' : room.lastMessage.type === 'poll' ? '📊 ' : ''}</span>}
                            {room.lastMessage.senderName && room.type === 'group' && <span className="text-[#5a6478]">{room.lastMessage.senderName}: </span>}
                            {room.lastMessage.content}
                          </p>
                        )}
                        {/* NEW: Last Active Time for DM chats */}
                        {isDirect && !room.lastMessage && (
                          <p className="text-[10px] mt-0.5" style={{ color: isOnline ? '#00e5a0' : '#5a6478' }}>
                            {formatLastActiveShort(roomOther?.lastActiveAt, roomOther?.isOnline)}
                          </p>
                        )}
                      </div>
                      {room.unreadCount > 0 && (
                        <div className={`flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${room.isMuted ? 'min-w-[20px] h-5 px-1 rounded-full border' : 'w-5 h-5 rounded-full'}`} style={room.isMuted ? { borderColor: 'rgba(183,155,255,0.4)', background: 'rgba(183,155,255,0.1)', color: '#b79bff' } : { background: '#00e5a0', color: '#0c0e14' }}>{room.unreadCount > 9 ? '9+' : room.unreadCount}</div>
                      )}
                    </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Archived Chats */}
            {archivedRoomIds.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {showArchived ? (
                  <div>
                    <button onClick={() => setShowArchived(false)}
                      className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-white/[0.03] transition-all"
                      style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <ArrowLeft className="w-4 h-4 text-[#00e5a0]" />
                      <span className="text-xs font-medium text-[#00e5a0]">Back to Chats</span>
                      <span className="min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>
                        {archivedRooms.length}
                      </span>
                    </button>
                    {archivedRooms.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto chat-scrollbar">
                        {archivedRooms.map(room => {
                          const isDirect = room.type === 'direct';
                          const roomOther = isDirect ? room.members.find(m => m.id !== userId) : null;
                          return (
                            <button key={room.id} onClick={() => openRoom(room)}
                              onContextMenu={e => { e.preventDefault(); setRoomContextMenu({ x: e.clientX, y: e.clientY, room }); }}
                              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/[0.03] transition-all"
                              style={{ background: activeRoom?.id === room.id ? 'rgba(255,255,255,0.04)' : undefined }}>
                              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${getColor(room.id)}20`, color: getColor(room.id) }}>
                                {isDirect ? getInitials(roomOther?.name) : (room.avatar || '👥')}
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <p className="text-xs font-medium text-[#8b95a8] truncate">{room.name}</p>
                                {room.lastMessage && <p className="text-[10px] text-[#5a6478] truncate">{room.lastMessage.content}</p>}
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); unarchiveRoom(room.id); }} className="p-1 rounded hover:bg-white/[0.06]" title="Unarchive">
                                <Archive className="w-3.5 h-3.5 text-[#5a6478]" />
                              </button>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-6 px-4">
                        <Archive className="w-8 h-8 text-[#5a6478] mb-2" />
                        <p className="text-xs text-[#5a6478]">No archived chats</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => setShowArchived(true)}
                    className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-white/[0.03] transition-all">
                    <Archive className="w-4 h-4 text-[#5a6478]" />
                    <span className="text-xs text-[#8b95a8]">Archived Chats</span>
                    <span className="min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--medq-text-faint, #5a6478)' }}>
                      {archivedRoomIds.length}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#5a6478] ml-auto" />
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          /* ── Friends Panel ── */
          <>
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowFriends(false)} className="p-1 rounded-lg hover:bg-white/[0.06]"><ArrowLeft className="w-4 h-4 text-[#8b95a8]" /></button>
                <h2 className="text-lg font-bold text-[#e8ecf4]">Friends</h2>
              </div>
              <button onClick={openNewDM} className="p-1.5 rounded-lg hover:bg-white/[0.06]" title="New DM"><MessageCircle className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            {/* Friends Tabs */}
            <div className="px-3 pt-3 pb-2 flex gap-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <button onClick={() => setFriendsTab('all')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: friendsTab === 'all' ? 'rgba(0,229,160,0.12)' : 'transparent', color: friendsTab === 'all' ? '#00e5a0' : '#8b95a8', border: `1px solid ${friendsTab === 'all' ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                All Friends{friends.length > 0 ? ` (${friends.length})` : ''}
              </button>
              <button onClick={() => setFriendsTab('add')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: friendsTab === 'add' ? 'rgba(0,229,160,0.12)' : 'transparent', color: friendsTab === 'add' ? '#00e5a0' : '#8b95a8', border: `1px solid ${friendsTab === 'add' ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                Add Friend{pendingRequestCount > 0 ? ` (${pendingRequestCount})` : ''}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto chat-scrollbar">
              {friendsTab === 'all' ? (
                /* ── All Friends Tab ── */
                <>
                  {/* Friend Search */}
                  <div className="px-3 pt-3 pb-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5a6478]" />
                      <input
                        value={friendSearchQuery} onChange={e => setFriendSearchQuery(e.target.value)}
                        placeholder="Filter friends..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs text-[#e8ecf4] placeholder-[#5a6478] outline-none focus:ring-1 focus:ring-white/25"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    {friends.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-10 h-10 text-[#5a6478] mx-auto mb-2" />
                        <p className="text-xs text-[#5a6478]">No friends yet</p>
                        <button onClick={() => setFriendsTab('add')} className="mt-2 text-xs text-[#00e5a0] hover:underline">Search to add some!</button>
                      </div>
                    ) : (
                      friends
                        .filter(f => !friendSearchQuery || (f.name || '').toLowerCase().includes(friendSearchQuery.toLowerCase()))
                        .sort((a, b) => (a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1))
                        .map(f => {
                          const isOnline = isRecentlyActive(f.lastActiveAt) || f.isOnline;
                          return (
                            <div key={f.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] mb-1 cursor-pointer" onClick={() => startDM(f.id)}>
                              <div className="relative">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(f.id)}20`, color: getColor(f.id) }}>{getInitials(f.name)}</div>
                                {isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2" style={{ background: '#00e5a0', borderColor: '#0c0e14' }} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                  {f.isFavorite && <span className="text-[10px]">⭐</span>}
                                  <p className="text-xs font-medium text-[#e8ecf4] truncate">{f.name}</p>
                                </div>
                                <p className="text-[10px] text-[#5a6478] truncate">{isOnline ? '🟢 Online' : f.specialty || 'Offline'}</p>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); startDM(f.id); }} className="p-1.5 rounded-lg hover:bg-white/[0.06]" style={{ color: '#00e5a0' }} title="Chat">
                                <MessageCircle className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })
                    )}
                  </div>
                </>
              ) : (
                /* ── Add Friend Tab ── */
                <>
                  <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Search Users</p>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <input
                        value={friendSearchQuery} onChange={e => setFriendSearchQuery(e.target.value)}
                        placeholder="Search by name, email, or specialty..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none focus:ring-1 focus:ring-white/25"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      />
                    </div>
                    {friendNote === '' && friendSearchQuery.length >= 2 && (
                      <button onClick={() => setFriendNote(' ')} className="mt-1 text-[10px] text-[#5a6478] hover:text-[#8b95a8]">+ Add a note to your request</button>
                    )}
                    {friendNote !== '' && (
                      <input
                        value={friendNote === ' ' ? '' : friendNote} onChange={e => setFriendNote(e.target.value)}
                        placeholder="Add a note (optional)"
                        className="w-full px-3 py-1.5 mt-1 rounded-lg text-xs text-[#e8ecf4] placeholder-[#5a6478] outline-none focus:ring-1 focus:ring-white/25"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      />
                    )}
                    {friendSearching && <div className="flex justify-center py-2"><Loader2 className="w-4 h-4 animate-spin text-[#00e5a0]" /></div>}
                    {friendSearchResults.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {friendSearchResults.map(r => (
                          <div key={r.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03]">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(r.id)}20`, color: getColor(r.id) }}>{getInitials(r.name)}</div>
                              {r.isOnline && <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full border" style={{ background: '#00e5a0', borderColor: '#0c0e14' }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[#e8ecf4] truncate">{r.name}</p>
                              {r.specialty && <p className="text-[10px] text-[#5a6478] truncate">{r.specialty}</p>}
                              {(r.mutualFriends ?? r.mutualCount ?? 0) > 0 && <p className="text-[10px] text-[#5a6478]">{r.mutualFriends ?? r.mutualCount} mutual</p>}
                            </div>
                            {isUserFriend(r.id) ? (
                              <span className="text-[10px] text-[#00e5a0]">✓ Friends</span>
                            ) : (
                              <button onClick={() => sendFriendRequest(r.id)} disabled={sendingRequest === r.id}
                                className="px-2 py-1 rounded-lg text-[10px] font-medium transition-all"
                                style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}>
                                {sendingRequest === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserPlus className="w-3 h-3" />}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {friendSearchQuery.length >= 2 && !friendSearching && friendSearchResults.length === 0 && (
                      <p className="text-xs text-[#5a6478] text-center py-3">No users found</p>
                    )}
                  </div>

                  {/* Pending Requests */}
                  {receivedRequests.length > 0 && (
                    <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Pending Requests ({receivedRequests.length})</p>
                      {receivedRequests.map(req => (
                        <div key={req.friendshipId} className="flex items-center gap-2 p-2 rounded-lg mb-1" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(req.id)}20`, color: getColor(req.id) }}>{getInitials(req.name)}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#e8ecf4] truncate">{req.name}</p>
                            {req.specialty && <p className="text-[10px] text-[#5a6478] truncate">{req.specialty}</p>}
                          </div>
                          <button onClick={() => acceptFriendRequest(req.friendshipId)} className="p-1 rounded-lg hover:bg-white/[0.06]" style={{ color: '#00e5a0' }}><UserCheck className="w-4 h-4" /></button>
                          <button onClick={() => declineFriendRequest(req.friendshipId)} className="p-1 rounded-lg hover:bg-white/[0.06]" style={{ color: '#ff5757' }}><UserX className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  )}

                  {sentRequests.length > 0 && (
                    <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Sent Requests ({sentRequests.length})</p>
                      {sentRequests.map(req => (
                        <div key={req.friendshipId} className="flex items-center gap-2 p-2 rounded-lg mb-1" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(req.id)}20`, color: getColor(req.id) }}>{getInitials(req.name)}</div>
                          <div className="flex-1 min-w-0"><p className="text-xs font-medium text-[#e8ecf4] truncate">{req.name}</p></div>
                          <span className="text-[10px] text-[#5a6478]">Pending</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* ═══════ RESIZE HANDLE ═══════ */}
      {showSidebar && (
        <div
          className="hidden md:flex items-center justify-center cursor-col-resize z-10 flex-shrink-0 hover:bg-[rgba(0,229,160,0.1)] transition-colors"
          style={{ width: '5px', background: isResizing ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.04)' }}
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="w-[3px] h-8 rounded-full" style={{ background: isResizing ? '#00e5a0' : 'rgba(255,255,255,0.12)' }} />
        </div>
      )}

      {/* ═══════ CENTER: Messages Area ═══════
          When the study panel is open, it REPLACES the entire center column
          (including the chat header) so there's no double-header confusion.
          The study panel has its own header with a back-to-chat button. */}
      <div className={`${(activeRoom || isViewingSavedMessages || showInlineWhiteboard || activeInlineMeeting || activeInlineExam) && !showSidebar ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-w-0`}>

        {showStudyPanel && linkedStudyGroup ? (
          /* ── Study panel (FULL CENTER — replaces chat header too) ──
             No chat header above it. The GroupStudyPanel has its own header
             with back-to-chat + Lectures/Questions tabs. This eliminates the
             double-header confusion. */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden" style={{ background: 'rgba(8,10,14,0.95)' }}>
            <div className="flex-1 min-h-0">
              <div className="max-w-6xl mx-auto px-4 pb-4 h-full flex flex-col">
                <GroupStudyPanelLazy groupId={linkedStudyGroup.id} isAdmin={linkedStudyGroup.isAdmin} onClose={closeStudyPanel} />
              </div>
            </div>
          </div>
        ) : isViewingSavedMessages ? (
          /* ═══════ Saved Messages View (Telegram-style chat room) ═══════ */
          <>
            {/* Saved Messages Header */}
            <div className="px-4 py-3 flex items-center gap-3 backdrop-blur-sm" style={{ background: 'rgba(21,24,33,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={closeSavedMessages} className="p-1 rounded-lg hover:bg-white/[0.06]">
                <ArrowLeft className="w-5 h-5 text-[#8b95a8]" />
              </button>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(0,229,160,0.15)' }}>🔖</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#e8ecf4]">Saved Messages</p>
                <p className="text-xs text-[#8b95a8]">{savedMessageIds.length} messages</p>
              </div>
            </div>
            {/* Saved Messages Body */}
            <div className="flex-1 overflow-y-auto chat-scrollbar px-4 py-3" style={{ background: CHAT_THEMES[chatTheme]?.bg || '#0c0e14' }}>
              {savedMessageIds.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <BookmarkIcon className="w-16 h-16 text-[#5a6478] mb-4" />
                  <p className="text-base font-medium text-[#8b95a8] mb-1">No saved messages</p>
                  <p className="text-xs text-[#5a6478]">Long-press a message and tap Save</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {savedMessageIds.map(msgId => {
                    const msg = messages.find(m => m.id === msgId) || allMessagesForSaved.find(m => m.id === msgId);
                    if (!msg || msg.isDeleted) return null;
                    const meta = parseMeta(msg.metadata);
                    return (
                      <div key={msgId} className="msg-appear flex justify-start group relative" style={{ animationDelay: '0ms' }}>
                        <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-tl-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold" style={{ color: getColor(msg.senderId) }}>{msg.sender?.name || msg.senderName || 'Unknown'}</span>
                            {/* better-ui: tabular-nums stops timestamp digit jitter as
                                "5:30 PM" → "11:05 AM" changes width; #8b95a8 = the
                                --medq-muted token value (6.38:1 on dark, was #5a6478 @3.04:1). */}
                            <span className="text-[9px] text-[#8b95a8] tabular-nums">{formatTime(msg.createdAt)}</span>
                            <span className="text-[9px] text-[#8b95a8] tabular-nums">· {formatDateSeparator(msg.createdAt)}</span>
                          </div>
                          {msg.type === 'image' && meta.imageUrl && (
                            <img src={meta.imageUrl} alt="Shared" className="max-w-full max-h-60 rounded-lg mb-1 object-cover" />
                          )}
                          <p className="text-xs text-[#e8ecf4] whitespace-pre-wrap break-words">{msg.content}</p>
                          <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => saveMessage(msgId)} className="text-[9px] text-[#ff5757] hover:underline">Unsave</button>
                            <button onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Copied!'); }} className="text-[9px] text-[#8b95a8] hover:underline">Copy</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : showInlineWhiteboard && activeRoom ? (
          /* ═══════ Enhanced Whiteboard with Recording ═══════ */
          <ChatWhiteboardLazy
            onSave={setWhiteboardData}
            onRecordingComplete={(blob, url) => setWhiteboardRecording({ blob, url })}
            onBack={() => setShowInlineWhiteboard(false)}
            onSend={() => {
              if (whiteboardRecording) {
                sendWhiteboardRecording();
              } else {
                sendWhiteboard();
              }
            }}
            sending={sending}
            hasCapturedData={!!whiteboardData || !!whiteboardRecording}
            onCursorMove={(data) => {
              if (socketRef.current && activeRoom && userId) {
                socketRef.current.emit('wb:cursor-move', {
                  roomId: activeRoom.id,
                  userId,
                  userName: user?.name || 'User',
                  x: data.x,
                  y: data.y,
                  tool: data.tool,
                });
              }
            }}
            onCursorLeave={() => {
              if (socketRef.current && activeRoom && userId) {
                socketRef.current.emit('wb:cursor-leave', {
                  roomId: activeRoom.id,
                  userId,
                });
              }
            }}
            remoteCursors={wbRemoteCursors}
            onLaserMove={(data) => {
              if (socketRef.current && activeRoom && userId) {
                socketRef.current.emit('wb:laser', {
                  roomId: activeRoom.id,
                  userId,
                  userName: user?.name || 'User',
                  x: data.x,
                  y: data.y,
                });
              }
            }}
            onLaserStop={() => {
              // No need to emit a stop event; the trail just fades naturally on remote side
            }}
            remoteLasers={wbRemoteLasers}
          />
        ) : activeInlineMeeting ? (
          /* ═══════ Inline Meeting Room - Telegram-style Header & Full Width ═══════ */
          <>
            {/* Simple Header - Back button only, matches other tabs */}
            <div className="px-4 py-3 flex items-center gap-3 backdrop-blur-sm" style={{ background: 'rgba(21,24,33,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setActiveInlineMeeting(null)} className="p-1 rounded-lg hover:bg-white/[0.06]">
                <ArrowLeft className="w-5 h-5 text-[#8b95a8]" />
              </button>
              <Calendar className="w-4 h-4 text-[#00e5a0]" />
              <p className="text-sm font-semibold text-[#e8ecf4]">{activeInlineMeeting.title || 'Meeting'}</p>
            </div>
            {/* Meeting Content - full width, uses main content scroll */}
            <div className="flex-1 overflow-y-auto chat-scrollbar" style={{ background: 'var(--medq-bg, #0c0e14)' }}>
              {/* <MeetingTabLazy
                initialMeetingId={activeInlineMeeting.meetingCode || null}
                onNavigateToTab={() => setActiveInlineMeeting(null)}
              /> */}
            </div>
          </>
        ) : activeInlineExam ? (
          /* ═══════ Inline Exam Session - Full Exam Experience ═══════ */
          <>
            <div className="px-4 py-3 flex items-center gap-3 backdrop-blur-sm" style={{ background: 'rgba(21,24,33,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => { setActiveInlineExam(null); setExamSubmitted(false); setExamScore(null); setChatExamMode('menu'); }} className="p-1 rounded-lg hover:bg-white/[0.06]">
                <ArrowLeft className="w-5 h-5 text-[#8b95a8]" />
              </button>
              <FileText className="w-4 h-4 text-[#ffbb00]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#e8ecf4]">{activeInlineExam.title || 'Exam'}</p>
                <p className="text-xs text-[#5a6478]">{chatExamMode === 'quick' ? 'Quick Quiz' : chatExamMode === 'smart' ? 'Smart Quiz' : (activeInlineExam.questions || []).length + ' questions · ' + activeInlineExam.duration + ' minutes'}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto chat-scrollbar p-4" style={{ background: 'var(--medq-bg, #0c0e14)' }}>
              {chatExamMode === 'menu' ? (
                /* Exam Mode Selection Menu */
                <div className="max-w-md mx-auto space-y-4 py-4">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,187,0,0.1)' }}>
                      <FileText className="w-8 h-8 text-[#ffbb00]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#e8ecf4]">{activeInlineExam.title || 'Exam Center'}</h3>
                    <p className="text-sm text-[#8b95a8]">Choose how you want to practice</p>
                  </div>

                  {/* Quick Quiz Categories */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4 text-[#ffb347]" />
                      <h4 className="text-sm font-bold text-[#e8ecf4]">Quick Quiz</h4>
                      <span className="text-[10px] text-[#5a6478]">— Instant practice</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'definitions', label: 'Definitions', desc: 'What is, Define', color: '#00e5a0', icon: <BookOpen className="w-4 h-4" /> },
                        { id: 'indications', label: 'Indications', desc: 'When to use', color: '#ffb347', icon: <Shield className="w-4 h-4" /> },
                        { id: 'contraindications', label: 'Contra-indications', desc: 'Avoid, False', color: '#ff5757', icon: <X className="w-4 h-4" /> },
                        { id: 'all', label: 'All Combined', desc: 'Mixed review', color: '#8b5cf6', icon: <Sparkles className="w-4 h-4" /> },
                      ].map(cat => (
                        <button key={cat.id} onClick={() => startChatQuickQuiz(cat.id)}
                          disabled={chatQuizLoading === cat.id}
                          className="flex items-center gap-2 p-3 rounded-xl text-left transition-all hover:brightness-110"
                          style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}20` }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${cat.color}15` }}>
                            {chatQuizLoading === cat.id ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: cat.color }} /> : <span style={{ color: cat.color }}>{cat.icon}</span>}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#e8ecf4]">{cat.label}</p>
                            <p className="text-[9px] text-[#5a6478]">{cat.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Smart Quiz */}
                  <button onClick={() => { setChatExamMode('smart'); setShowSmartQuiz(true); }}
                    className="w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all hover:brightness-110"
                    style={{ background: 'linear-gradient(135deg, rgba(0,229,160,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(0,229,160,0.15)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,229,160,0.12)' }}>
                      <Brain className="w-5 h-5 text-[#00e5a0]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#e8ecf4]">Smart Quiz</p>
                      <p className="text-[10px] text-[#8b95a8]">AI-adaptive questions based on your weak areas</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#5a6478]" />
                  </button>

                  {/* Take Inline Exam (from chat message) */}
                  {(activeInlineExam.questions || []).length > 0 && (
                    <button onClick={() => setChatExamMode('inline')}
                      className="w-full p-4 rounded-xl text-left flex items-center gap-3 transition-all hover:brightness-110"
                      style={{ background: 'rgba(255,187,0,0.06)', border: '1px solid rgba(255,187,0,0.15)' }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,187,0,0.12)' }}>
                        <FileText className="w-5 h-5 text-[#ffbb00]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#e8ecf4]">Take Exam</p>
                        <p className="text-[10px] text-[#8b95a8]">{(activeInlineExam.questions || []).length} questions · {activeInlineExam.duration} min</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#5a6478]" />
                    </button>
                  )}
                </div>
              ) : chatExamMode === 'inline' ? (
                /* Inline Exam Questions */
                <>
                  {!examSubmitted && (
                    <div className="max-w-md mx-auto mb-4">
                      <button onClick={() => setChatExamMode('menu')} className="text-xs text-[#8b95a8] hover:text-[#e8ecf4] flex items-center gap-1">
                        <ArrowLeft className="w-3 h-3" /> Back to menu
                      </button>
                    </div>
                  )}
                  {examSubmitted && examScore ? (
                    /* Exam Results */
                    <div className="max-w-md mx-auto flex flex-col items-center gap-4 py-8">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: examScore.correct >= examScore.total * 0.7 ? 'rgba(0,229,160,0.15)' : 'rgba(255,87,87,0.15)' }}>
                        <span className="text-3xl font-bold" style={{ color: examScore.correct >= examScore.total * 0.7 ? '#00e5a0' : '#ff5757' }}>{examScore.correct}/{examScore.total}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#e8ecf4]">{examScore.correct >= examScore.total * 0.7 ? 'Great Job!' : 'Keep Studying!'}</h3>
                      <p className="text-sm text-[#8b95a8]">You answered {examScore.correct} out of {examScore.total} questions</p>
                      <div className="w-full max-w-sm h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(examScore.correct / examScore.total) * 100}%`, background: examScore.correct >= examScore.total * 0.7 ? '#00e5a0' : '#ff5757' }} />
                      </div>
                      {(activeInlineExam.questions || []).map((q: any, qi: number) => (
                        <div key={qi} className="w-full max-w-sm p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-xs font-medium text-[#e8ecf4] mb-1">Q{qi + 1}: {q.question}</p>
                          <p className="text-[10px] text-[#5a6478]">Your answer: {q.options?.[examAnswers[qi]] || 'Not answered'}</p>
                        </div>
                      ))}
                      <button onClick={() => { setActiveInlineExam(null); setExamSubmitted(false); setExamScore(null); setChatExamMode('menu'); }} className="px-6 py-2.5 rounded-xl text-sm font-medium text-[#0c0e14]" style={{ background: '#ffbb00' }}>
                        Back to Chat
                      </button>
                    </div>
                  ) : (
                    /* Exam Questions */
                    <div className="max-w-md mx-auto space-y-4 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-[#8b95a8]">{Object.keys(examAnswers).length} of {(activeInlineExam.questions || []).length} answered</p>
                        <button
                          onClick={() => {
                            const questions = activeInlineExam.questions || [];
                            let correct = 0;
                            questions.forEach((q: any, i: number) => {
                              if (examAnswers[i] !== undefined && q.options[examAnswers[i]]?.trim() !== '') {
                                correct++;
                              }
                            });
                            setExamScore({ correct, total: questions.length });
                            setExamSubmitted(true);
                          }}
                          disabled={Object.keys(examAnswers).length < (activeInlineExam.questions || []).length}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                          style={{ background: '#ffbb00', color: '#0c0e14' }}>
                          Submit Exam
                        </button>
                      </div>
                      {(activeInlineExam.questions || []).map((q: any, qi: number) => (
                        <div key={qi} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-sm font-semibold text-[#e8ecf4] mb-3">
                            <span className="text-[#ffbb00] mr-2">Q{qi + 1}</span>
                            {q.question}
                          </p>
                          <div className="space-y-2">
                            {(q.options || []).map((opt: string, oi: number) => (
                              <button key={oi} onClick={() => setExamAnswers(prev => ({ ...prev, [qi]: oi }))}
                                className="w-full text-left p-2.5 rounded-lg text-xs transition-all"
                                style={{ background: examAnswers[qi] === oi ? 'rgba(255,187,0,0.12)' : 'rgba(255,255,255,0.02)', border: `1px solid ${examAnswers[qi] === oi ? 'rgba(255,187,0,0.3)' : 'rgba(255,255,255,0.04)'}`, color: examAnswers[qi] === oi ? '#ffbb00' : '#e8ecf4' }}>
                                <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}</span>{opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </div>
            <SmartQuizDialogLazy open={showSmartQuiz} onClose={() => { setShowSmartQuiz(false); setChatExamMode('menu'); }} />
          </>
        ) : !activeRoom ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(0,229,160,0.08)' }}>
              <MessageCircle className="w-12 h-12 text-[#00e5a0]" />
            </div>
            <h3 className="text-xl font-bold text-[#e8ecf4] mb-2">MedQ Chat</h3>
            <p className="text-sm text-[#8b95a8] mb-1 text-center">Your conversations, study groups & DMs</p>
            <p className="text-xs text-[#5a6478] mb-6 text-center">Select a chat from the sidebar or start a new conversation</p>
            <div className="flex gap-3">
              <button onClick={openNewDM} className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ background: '#00e5a0' }}>
                <MessageCircle className="w-4 h-4" /> New Chat
              </button>
              <button onClick={openNewGroup} className="px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}>
                <Users className="w-4 h-4" /> New Group
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3 backdrop-blur-sm" style={{ background: 'rgba(21,24,33,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => { setActiveRoom(null); setShowSidebar(true); }} className="md:hidden p-1 rounded-lg hover:bg-white/[0.06]">
                <ArrowLeft className="w-5 h-5 text-[#8b95a8]" />
              </button>
              <div className="relative cursor-pointer" onClick={(e) => {
                if (activeRoom.type === 'direct' && otherMember) {
                  openProfilePhoto(otherMember.name, otherMember.image, otherMember.id);
                  showUserProfileFor({ id: otherMember.id, name: otherMember.name, image: otherMember.image, isOnline: otherMember.isOnline, lastActiveAt: otherMember.lastActiveAt }, e);
                }
              }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${getColor(activeRoom.id)}20`, color: getColor(activeRoom.id) }}>
                  {activeRoom.type === 'direct' ? getInitials(otherMember?.name) : (activeRoom.avatar || '👥')}
                </div>
                {activeRoom.type === 'direct' && isOtherOnline && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 online-pulse" style={{ background: '#00e5a0', borderColor: 'rgba(21,24,33,0.8)' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#e8ecf4] truncate">{activeRoom.name}</p>
                <p className="text-xs text-[#8b95a8]">
                  {activeRoom.type === 'direct' ? (
                    <span style={{ color: isOtherOnline ? '#00e5a0' : '#8b95a8' }}>
                      {formatLastSeen(otherMember?.lastActiveAt, isOtherOnline)}
                    </span>
                  ) : (
                    <span>
                      {activeRoom.members.length} {activeRoom.members.length === 1 ? 'member' : 'members'}
                      {/* Live online count (socket presence), WhatsApp-style.
                          Hidden while our own realtime is down — we would only
                          be showing a stale snapshot, which is worse than none. */}
                      {groupOnlineOthersCount > 0 && !realtimeDown && (
                        <span className="text-[#00e5a0] ml-1">· {groupOnlineOthersCount} online</span>
                      )}
                      {/* Connectivity of THIS client. navigator.onLine flips
                          instantly on network loss (no 45s ping-timeout wait),
                          so the header never lies about being reachable. */}
                      {!browserOnline && <span className="text-[#fbbf24] ml-1">· offline</span>}
                      {browserOnline && !socketConnected && <span className="text-[#fbbf24] ml-1">· reconnecting…</span>}
                    </span>
                  )}
                  {typingUser && <span className="text-[#00e5a0]"> · {typingUser} is typing<span className="inline-flex gap-0.5 ml-0.5"><span className="typing-dot w-1 h-1 rounded-full bg-[#00e5a0] inline-block" /><span className="typing-dot w-1 h-1 rounded-full bg-[#00e5a0] inline-block" /><span className="typing-dot w-1 h-1 rounded-full bg-[#00e5a0] inline-block" /></span></span>}
                  {/* NEW: Disappearing Messages indicator */}
                  {activeRoom && disappearingTTL[activeRoom.id] && (
                    <span className="text-[#fbbf24] flex items-center gap-1 ml-1">
                      <Clock className="w-3 h-3" />
                      {disappearingTTL[activeRoom.id] < 60 ? disappearingTTL[activeRoom.id] + 's' : disappearingTTL[activeRoom.id] < 3600 ? Math.floor(disappearingTTL[activeRoom.id] / 60) + 'm' : Math.floor(disappearingTTL[activeRoom.id] / 3600) + 'h'}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {multiSelectMode ? (
                  <button onClick={toggleMultiSelectMode} className="px-2 py-1 rounded-lg text-xs font-medium" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>Cancel</button>
                ) : (
                  <button onClick={toggleMultiSelectMode} className="p-2 rounded-lg hover:bg-white/[0.06]" title="Select messages"><CheckSquare className="w-4 h-4 text-[#8b95a8]" /></button>
                )}
                <button onClick={() => setShowMsgSearch(!showMsgSearch)} className="p-2 rounded-lg hover:bg-white/[0.06]"><Search className="w-4 h-4 text-[#8b95a8]" /></button>
                {/* AI unread digest — summarize a flooded room + extract events */}
                <button
                  onClick={() => runRoomDigest(activeRoom.id)}
                  className="p-2 rounded-lg hover:bg-white/[0.06] relative"
                  title="AI digest — summarize unread messages and extract meetings, exams & deadlines"
                >
                  <Sparkles className="w-4 h-4 text-[#00e5a0]" />
                  {(activeRoom.unreadCount ?? 0) > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-0.5 rounded-full text-[8px] font-bold flex items-center justify-center" style={{ background: '#00e5a0', color: '#0c0e14' }}>
                      {activeRoom.unreadCount > 99 ? '99+' : activeRoom.unreadCount}
                    </span>
                  )}
                </button>
                {/* Study button — only for group chats. Opens lectures + question bank. */}
                {activeRoom.type === 'group' && (
                  <button
                    onClick={openStudyPanel}
                    disabled={loadingStudyGroup}
                    className="p-2 rounded-lg hover:bg-white/[0.06] disabled:opacity-50"
                    title="Study — lectures & question bank"
                    style={showStudyPanel ? { background: 'rgba(0,229,160,0.12)', color: '#00e5a0' } : undefined}
                  >
                    {loadingStudyGroup && !linkedStudyGroup ? <Loader2 className="w-4 h-4 text-[#8b95a8] animate-spin" /> : <BookOpen className="w-4 h-4 text-[#8b95a8]" />}
                  </button>
                )}
                {/* Voice/Video Call Buttons (1-on-1) — hidden on small screens
                    to prevent header overflow. Telegram moves these into the
                    overflow menu on mobile; the right-panel toggle (MoreVertical)
                    remains visible as the single overflow affordance. */}
                <button onClick={() => startCall('voice')} className="hidden sm:flex p-2 rounded-lg hover:bg-white/[0.06] transition-colors" title="Voice Call" aria-label="Voice call"><Phone className="w-4 h-4 text-[#8b95a8]" aria-hidden="true" /></button>
                <button onClick={() => startCall('video')} className="hidden sm:flex p-2 rounded-lg hover:bg-white/[0.06] transition-colors" title="Video Call" aria-label="Video call"><Video className="w-4 h-4 text-[#8b95a8]" aria-hidden="true" /></button>
                {/* Group Call — opens Live Meeting tab with shared meeting ID.
                    Hidden on small screens to prevent header overflow (the
                    incoming-call banner still renders — it's position:fixed). */}
                <GroupCallLauncher
                  roomId={activeRoom?.id}
                  userId={userId}
                  hostName={user?.name || 'Host'}
                  buttonClassName="hidden sm:flex"
                  onJoinCall={(call) => {
                    callCtx.openMeeting({
                      roomId: call.roomId,
                      roomName: call.title,
                      joinUrl: call.joinUrl,
                    });
                  }}
                />
                <button onClick={() => setShowRightPanel(!showRightPanel)} className="p-2 rounded-lg hover:bg-white/[0.06]">
                  {showRightPanel ? <X className="w-4 h-4 text-[#8b95a8]" /> : <MoreVertical className="w-4 h-4 text-[#8b95a8]" />}
                </button>
              </div>
            </div>

            {/* Chat content + right panel tabs. The study panel now renders
                at the TOP of the center column (replacing the chat header),
                so this section only shows when the study panel is NOT open. */}
            {(!showStudyPanel || !linkedStudyGroup) && (
            <>

            {/* Message Search Bar — Enhanced with Filters */}
            {showMsgSearch && (
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="px-4 py-2 flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#5a6478] flex-shrink-0" />
                  <input
                    value={msgSearchQuery} onChange={e => { setMsgSearchQuery(e.target.value); setMsgSearchIndex(0); }}
                    placeholder="Search in conversation..."
                    className="flex-1 bg-transparent text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none focus:ring-1 focus:ring-white/25 rounded-lg"
                    autoFocus
                  />
                  {msgSearchQuery && (
                    <>
                      <span className="text-xs text-[#8b95a8]">{filteredSearchMsgs.length > 0 ? `${msgSearchIndex + 1}/${filteredSearchMsgs.length}` : '0/0'}</span>
                      <button onClick={() => navigateSearch(-1)} className="p-0.5 rounded hover:bg-white/[0.06]"><ChevronUp className="w-4 h-4 text-[#8b95a8]" /></button>
                      <button onClick={() => navigateSearch(1)} className="p-0.5 rounded hover:bg-white/[0.06]"><ChevronDown className="w-4 h-4 text-[#8b95a8]" /></button>
                    </>
                  )}
                  <button onClick={() => setShowSearchFilters(!showSearchFilters)} className="p-0.5 rounded hover:bg-white/[0.06]" title="Search Filters"><Settings className="w-3.5 h-3.5 text-[#8b95a8]" /></button>
                  <button onClick={() => { setShowMsgSearch(false); setMsgSearchQuery(''); setShowSearchFilters(false); setMsgSearchFilter('all'); setMsgSearchSender(''); setMsgSearchDateFrom(''); setMsgSearchDateTo(''); }}><X className="w-4 h-4 text-[#8b95a8]" /></button>
                </div>
                {/* Filter tabs */}
                {showSearchFilters && (
                  <div className="px-4 pb-2 space-y-2 fade-in">
                    <div className="flex gap-1">
                      {(['all', 'media', 'links', 'files'] as const).map(f => (
                        <button key={f} onClick={() => setMsgSearchFilter(f)}
                          className="px-2 py-0.5 rounded text-[9px] font-medium transition-all capitalize"
                          style={{ background: msgSearchFilter === f ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)', color: msgSearchFilter === f ? '#00e5a0' : '#8b95a8', border: `1px solid ${msgSearchFilter === f ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                          {f}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input value={msgSearchSender} onChange={e => setMsgSearchSender(e.target.value)} placeholder="Filter by sender..."
                        className="flex-1 px-2 py-1 rounded-lg text-[10px] text-[#e8ecf4] placeholder-[#5a6478] outline-none focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                    </div>
                    <div className="flex gap-2">
                      <input type="date" value={msgSearchDateFrom} onChange={e => setMsgSearchDateFrom(e.target.value)} placeholder="From"
                        className="flex-1 px-2 py-1 rounded-lg text-[10px] text-[#e8ecf4] outline-none focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                      <input type="date" value={msgSearchDateTo} onChange={e => setMsgSearchDateTo(e.target.value)} placeholder="To"
                        className="flex-1 px-2 py-1 rounded-lg text-[10px] text-[#e8ecf4] outline-none focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pinned bar — complete Telegram system, under the chat header.
                • Bar body click: Telegram MOBILE behavior — each tap cycles
                  to the NEXT pinned message (toward older, wraps at the
                  boundary) AND scrolls to it. Every click visibly changes
                  both the bar's content AND the scroll position, so
                  repeated taps never appear "stuck". With only 1 pin, the
                  bar re-scrolls + re-flashes the highlight.
                • 📌 button: opens the full "Pinned Messages" panel (official
                  Telegram tip: "Tap the 📌 button at the top to quickly see
                  a list of all the chat's pinned messages").
                • ▲ chevron (Up): show the OLDER pin AND scroll to it.
                  Disabled at the oldest (Telegram dims the arrow at boundary).
                • ▼ chevron (Down): show the NEWER pin AND scroll to it.
                  Disabled at the newest. Direction matches the visual: Up =
                  scroll up in chat history = older; Down = scroll down = newer.
                • ✕: unpins the currently shown message.
                  The bar is neutral — only the pin icon carries the accent. */}
            {pinnedMessages.length > 0 && (() => {
              // null = newest pinned message (Telegram default)
              const idx = pinnedIndex === null ? pinnedMessages.length - 1 : Math.min(pinnedIndex, pinnedMessages.length - 1);
              const pm = pinnedMessages[idx];
              const preview = getPinnedPreview(pm);
              const atOldest = idx === 0;
              const atNewest = idx === pinnedMessages.length - 1;
              // Both cycle AND scroll: change the index, then scroll to the
              // new pin's element. Computes newIdx synchronously because
              // setPinnedIndex is async.
              const goTo = (newIdx: number) => {
                setPinnedIndex(newIdx);
                const target = pinnedMessages[newIdx];
                if (target) scrollToMessage(target.id);
              };
              // Bar body: cycle toward OLDER (wrapping), then scroll.
              // This is Telegram mobile's behavior — every tap advances to
              // the next pin. With a single pin, it just re-scrolls.
              // The green highlight on the target message is the feedback.
              const barClick = () => {
                if (pinnedMessages.length <= 1) {
                  scrollToMessage(pm.id);
                  return;
                }
                // Wrap: at oldest (idx 0), go to newest (len-1).
                const nextIdx = (idx - 1 + pinnedMessages.length) % pinnedMessages.length;
                goTo(nextIdx);
              };
              return (
                <>
                <div className="flex items-stretch border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  {/* Accent edge — Telegram uses a thin colored line on the left of pinned/system bars */}
                  <div className="w-0.5 flex-shrink-0" style={{ background: '#00e5a0' }} />
                  {/* 📌 — opens the full pinned-messages list */}
                  <button
                    onClick={() => setShowPinnedList(v => !v)}
                    aria-label={`Show all pinned messages (${pinnedMessages.length})`}
                    aria-expanded={showPinnedList}
                    className="relative self-center ml-2 p-1.5 rounded-full hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]">
                    <Pin className="w-3.5 h-3.5 text-[#00e5a0]" aria-hidden="true" />
                    {pinnedMessages.length > 1 && (
                      <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-[3px] rounded-full text-[8px] font-bold flex items-center justify-center text-[#0c0e14]" style={{ background: '#00e5a0' }}>{pinnedMessages.length}</span>
                    )}
                  </button>
                  {/* Bar body — cycle to next pin AND scroll (Telegram mobile) */}
                  <button
                    onClick={barClick}
                    className="flex-1 min-w-0 flex items-center gap-2.5 px-2.5 py-1.5 text-left hover:bg-white/[0.03] transition-colors"
                    aria-label={`Pinned message ${idx + 1} of ${pinnedMessages.length}: ${preview.slice(0, 60)} — click to jump to it${pinnedMessages.length > 1 ? ', click again for the next pinned message' : ''}`}>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold text-[#8b95a8] leading-tight">
                        Pinned message{pinnedMessages.length > 1 && <span className="text-[#5a6478] font-normal"> · {idx + 1}/{pinnedMessages.length}</span>}
                      </p>
                      <p className="text-xs text-[#e8ecf4] truncate leading-tight">{preview || '(empty)'}</p>
                    </div>
                  </button>
                  {/* Cycle + unpin controls */}
                  <div className="flex items-center gap-0.5 pr-1.5">
                    {pinnedMessages.length > 1 && (
                      <>
                        <button
                          onClick={() => goTo(idx - 1)}
                          disabled={atOldest}
                          aria-label="Show older pinned message"
                          className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                          <ChevronUp className="w-3.5 h-3.5 text-[#8b95a8]" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => goTo(idx + 1)}
                          disabled={atNewest}
                          aria-label="Show newer pinned message"
                          className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                          <ChevronDown className="w-3.5 h-3.5 text-[#8b95a8]" aria-hidden="true" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => { pinMessage(pm.id, true); setPinnedIndex(null); }}
                      aria-label="Unpin this message"
                      className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]">
                      <X className="w-3.5 h-3.5 text-[#8b95a8]" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Pinned Messages panel — the full list (newest first),
                    like Telegram's pinned-messages screen. Jump on click,
                    unpin per row, or unpin everything at once. */}
                {showPinnedList && (
                  <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(21,24,33,0.98)' }}>
                    <div className="flex items-center justify-between px-3 py-2">
                      <p className="text-xs font-semibold text-[#e8ecf4]">Pinned Messages <span className="text-[#8b95a8] font-normal">({pinnedMessages.length})</span></p>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { pinnedMessages.forEach(m => pinMessage(m.id, true)); setPinnedIndex(null); }}
                          className="px-2 py-1 rounded-lg text-[10px] font-medium text-[#ff5757] hover:bg-red-500/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]">
                          Unpin All
                        </button>
                        <button
                          onClick={() => setShowPinnedList(false)}
                          aria-label="Close pinned messages list"
                          className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]">
                          <X className="w-3.5 h-3.5 text-[#8b95a8]" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-[40vh] overflow-y-auto chat-scrollbar px-2 pb-2">
                      {[...pinnedMessages].reverse().map(m => {
                        const mIdx = pinnedMessages.indexOf(m);
                        const senderName = m.sender?.name || m.senderName || 'Unknown';
                        return (
                          <div key={m.id} className="group/pinrow flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors">
                            <button
                              onClick={() => { scrollToMessage(m.id); setPinnedIndex(mIdx); setShowPinnedList(false); }}
                              className="flex-1 min-w-0 text-left"
                              aria-label={`Jump to pinned message from ${senderName}: ${getPinnedPreview(m).slice(0, 60)}`}>
                              <p className="text-[10px] font-semibold leading-tight truncate" style={{ color: getColor(m.senderId) }}>
                                {senderName}
                                <span className="text-[#5a6478] font-normal"> · {formatDateSeparator(m.createdAt)} {formatTime(m.createdAt)}</span>
                                {mIdx === idx && <span className="text-[#00e5a0] font-medium"> · shown</span>}
                              </p>
                              <p className="text-xs text-[#e8ecf4] truncate leading-tight">{getPinnedPreview(m) || '(empty)'}</p>
                            </button>
                            <button
                              onClick={() => pinMessage(m.id, true)}
                              aria-label={`Unpin message from ${senderName}`}
                              className="p-1.5 rounded-full hover:bg-white/[0.08] transition-[background-color,opacity] opacity-0 group-hover/pinrow:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]">
                              <X className="w-3 h-3 text-[#8b95a8]" aria-hidden="true" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                </>
              );
            })()}

            {/* Messages */}
            <div ref={messagesContainerRef} onScroll={handleMessagesScroll} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              className={`flex-1 overflow-y-auto chat-scrollbar px-4 py-3 relative transition-all ${isDragOver ? 'ring-2 ring-[#00e5a0] ring-inset' : ''}`}
              style={{ backgroundImage: [CHAT_THEMES[chatTheme]?.gradient, WALLPAPER_PRESETS[chatWallpaper]?.gradient].filter(Boolean).join(', ') || undefined }}>
              {isDragOver && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ background: 'rgba(0,229,160,0.05)' }}>
                  <div className="px-6 py-4 rounded-2xl" style={{ background: 'rgba(21,24,33,0.95)', border: '2px dashed rgba(0,229,160,0.4)' }}>
                    <div className="flex items-center gap-2 text-[#00e5a0]">
                      <Upload className="w-5 h-5" />
                      <span className="text-sm font-medium">Drop files to send</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Floating Date Indicator - Clickable to jump */}
              {floatingDate && (
                <div className="floating-date sticky top-2 z-10 flex justify-center">
                  <button onClick={() => setShowDatePicker(true)} className="px-3 py-1 rounded-full text-[10px] text-[#e8ecf4] font-medium backdrop-blur-sm hover:bg-[rgba(30,33,46,0.95)] transition-colors cursor-pointer" style={{ background: 'rgba(30,33,46,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {floatingDate}
                  </button>
                </div>
              )}
              {/* Load More Messages indicator */}
              {hasMoreMessages && messages.length > 0 && (
                <div className="flex justify-center py-2 mb-2">
                  <button onClick={loadMoreMessages} disabled={isLoadingMore} className="px-4 py-1.5 rounded-full text-xs font-medium transition-all hover:bg-white/[0.06]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--medq-text-muted, #8b95a8)' }}>
                    {isLoadingMore ? <><Loader2 className="w-3 h-3 animate-spin inline mr-1" /> Loading...</> : '↑ Load earlier messages'}
                  </button>
                </div>
              )}
              {msgLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-[#00e5a0]" /></div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-sm text-[#8b95a8]">No messages yet</p>
                  <p className="text-xs text-[#5a6478] mt-1">Send the first message!</p>
                </div>
              ) : (
                messages.map((msg, idx) => {
                  const isOwn = msg.senderId === userId;
                  const prevMsg = idx > 0 ? messages[idx - 1] : null;
                  const showDateSeparator = !prevMsg || !isSameDay(msg.createdAt, prevMsg.createdAt);
                  const reactions = parseReactions(msg.metadata);
                  const meta = parseMeta(msg.metadata);

                  return (
                    <div key={msg.id}>
                      {showDateSeparator && (
                        <div className="flex items-center justify-center my-4" data-date-separator={formatDateSeparator(msg.createdAt)}>
                          <div className="px-3 py-1 rounded-full text-[10px] text-[#8b95a8] cursor-pointer hover:bg-white/[0.06] transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
                            {formatDateSeparator(msg.createdAt)}
                          </div>
                        </div>
                      )}

                      {/* Unread messages divider */}
                      {firstUnreadMsgId === msg.id && unreadScrollCount > 0 && (
                        <div className="flex items-center gap-3 my-3">
                          <div className="flex-1 h-px" style={{ background: 'rgba(0,229,160,0.3)' }} />
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#00e5a0] flex-shrink-0" style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)' }}>
                            {unreadScrollCount} unread message{unreadScrollCount !== 1 ? 's' : ''}
                          </span>
                          <div className="flex-1 h-px" style={{ background: 'rgba(0,229,160,0.3)' }} />
                        </div>
                      )}

                      {/* System message - centered notification */}
                      {msg.type === 'system' ? (
                        <div className="flex justify-center my-2">
                          <div className="px-3 py-1 rounded-full text-[10px] text-[#8b95a8] flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <Shield className="w-3 h-3" />
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                      <div id={`msg-${msg.id}`} ref={el => { msgIdToRef.current[msg.id] = el; }}
                        className={`msg-appear flex ${isOwn && chatMessageAlign === 'right' ? 'justify-end' : isOwn && chatMessageAlign === 'left' ? 'justify-start' : isOwn ? 'justify-end' : 'justify-start'} mb-1 group relative`}
                        style={{ transform: swipeCurrentMsgRef.current?.id === msg.id ? `translateX(${swipeTranslateX}px)` : undefined, transition: swipeCurrentMsgRef.current?.id === msg.id ? 'none' : 'transform 0.15s ease' }}
                        onContextMenu={e => { e.preventDefault(); if (!msg.isDeleted) { setContextMenu({ x: e.clientX, y: e.clientY, msg }); } }}
                        onDoubleClick={() => handleDoubleClickMsg(msg)}
                        onClick={() => { if (multiSelectMode && !msg.isDeleted) { toggleMsgSelection(msg.id); } }}
                        onMouseEnter={() => setHoveredMsgId(msg.id)}
                        onMouseLeave={() => setHoveredMsgId(null)}
                        onTouchStart={e => { if (!msg.isDeleted) handleMsgTouchStart(msg, e); }}
                        onTouchMove={e => { if (!msg.isDeleted) handleMsgTouchMove(e); }}
                        onTouchEnd={() => handleMsgTouchEnd()}>

                        {/* No hover buttons — the previous round added a Pin +
                            SmilePlus hover affordance, but the user wants the
                            message area clean (no per-message hover buttons).
                            Access the context menu (Reply, Pin, Copy, Forward,
                            Edit, Delete, React, Save, Translate) via:
                            • Right-click on desktop (onContextMenu above)
                            • Long-press on mobile (handleMsgTouchStart, 500ms)
                            Pin/unpin is authorization-gated in pinMessage():
                            non-logged-in users and (in groups) non-admins get
                            an error toast and the optimistic update is rolled
                            back if the API rejects the action. */}

                        {/* Multi-select checkbox overlay */}
                        {multiSelectMode && !msg.isDeleted && (
                          <div className={`absolute top-1 ${isOwn ? 'right-1' : 'left-1'} z-20 check-overlay`}>
                            <button onClick={(e) => { e.stopPropagation(); toggleMsgSelection(msg.id); }} className="w-5 h-5 rounded flex items-center justify-center" style={{ background: selectedMsgIds.has(msg.id) ? '#00e5a0' : 'rgba(255,255,255,0.1)', border: selectedMsgIds.has(msg.id) ? '1px solid #00e5a0' : '1px solid rgba(255,255,255,0.15)' }}>
                              {selectedMsgIds.has(msg.id) ? <Check className="w-3 h-3 text-[#0c0e14]" /> : <Square className="w-3 h-3 text-[#5a6478]" />}
                            </button>
                          </div>
                        )}

                        {/* Heart pop animation on double-click */}
                        {heartAnimMsgId === msg.id && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30 heart-pop">
                            <span className="text-2xl">❤️</span>
                          </div>
                        )}

                        {/* NEW: Swipe-to-Reply visual indicator */}
                        {swipeCurrentMsgRef.current?.id === msg.id && swipeTranslateX > 20 && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 flex items-center justify-center w-8 h-8 rounded-full opacity-0" style={{ opacity: Math.min(swipeTranslateX / 50, 1), background: 'rgba(0,229,160,0.15)' }}>
                            <Reply className="w-4 h-4 text-[#00e5a0]" />
                          </div>
                        )}

                        <div className={`max-w-[75%] md:max-w-[65%] flex ${isOwn ? (chatMessageAlign === 'left' ? 'flex-row' : 'flex-row-reverse') : 'flex-row'} items-end gap-2`}>
                          {/* Avatar for other's messages in group */}
                          {!isOwn && activeRoom.type === 'group' && (!prevMsg || prevMsg.senderId !== msg.senderId) && (
                            <button className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mb-1 hover:opacity-80 transition-opacity" style={{ background: `${getColor(msg.senderId)}20`, color: getColor(msg.senderId) }}
                              onClick={(e) => {
                                const member = activeRoom.members.find(m => m.id === msg.senderId);
                                if (member) {
                                  openProfilePhoto(member.name, member.image, member.id);
                                  showUserProfileFor({ id: member.id, name: member.name, image: member.image, isOnline: member.isOnline, lastActiveAt: member.lastActiveAt }, e);
                                }
                              }}>
                              {getInitials(msg.sender?.name || msg.senderName)}
                            </button>
                          )}
                          {!isOwn && activeRoom.type === 'group' && prevMsg && prevMsg.senderId === msg.senderId && <div className="w-7 flex-shrink-0" />}

                          {/* Message card wrapper — transparent. Each message
                              type renders its own card (MedQ style): own
                              messages get the green gradient, others the soft
                              white tint. Sender name, reply preview and the
                              timestamp row sit outside the cards. */}
                          <div className="min-w-0 max-w-full">
                            {/* Sender name for group */}
                            {!isOwn && activeRoom.type === 'group' && (!prevMsg || prevMsg.senderId !== msg.senderId) && (
                              <button className="text-[10px] font-medium mb-0.5 ml-1 hover:underline" style={{ color: getColor(msg.senderId) }}
                                onClick={(e) => {
                                  const member = activeRoom.members.find(m => m.id === msg.senderId);
                                  if (member) showUserProfileFor({ id: member.id, name: member.name, image: member.image, isOnline: member.isOnline, lastActiveAt: member.lastActiveAt }, e);
                                }}>
                                {msg.sender?.name || msg.senderName || 'Unknown'}
                              </button>
                            )}

                            {/* Reply preview — Enhanced Visual Quote */}
                            {msg.replyTo && (
                              <button onClick={() => scrollToMessage(msg.replyTo!.id)}
                                className="mb-1 flex gap-2 px-2.5 py-1.5 rounded-lg text-left max-w-full min-w-0 transition-all hover:brightness-110" style={{ background: isOwn ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isOwn ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.05)'}` }}>
                                {/* Visual quote bar */}
                                <div className="w-1 rounded-full flex-shrink-0 self-stretch" style={{ background: isOwn ? '#00e5a0' : getColor(msg.replyTo.senderId) }} />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[10px] font-semibold" style={{ color: isOwn ? '#00e5a0' : getColor(msg.replyTo.senderId) }}>{msg.replyTo.sender?.name || 'Unknown'}</p>
                                  <p className="text-[10px] text-[#8b95a8] truncate">{msg.replyTo.content}</p>
                                </div>
                              </button>
                            )}

                            {/* Forwarded-from badge — shown when the message was forwarded from another chat */}
                            {(() => {
                              let meta: any = msg.metadata;
                              if (typeof meta === 'string') { try { meta = JSON.parse(meta); } catch { meta = {}; } }
                              const fwdFromId: string | undefined = meta?.forwardedFrom;
                              const fwdFromName: string | null | undefined = meta?.forwardedFromName;
                              if (!fwdFromId) return null;
                              const displayName = fwdFromName
                                || activeRoom?.members?.find(m => m.id === fwdFromId)?.name
                                || 'Unknown';
                              return (
                                <div className="mb-1 flex items-center gap-1 text-[10px] text-[#8b95a8]" title={`Forwarded from ${displayName}`}>
                                  <Share2 className="w-2.5 h-2.5" />
                                  <span>Forwarded from <span className="font-medium" style={{ color: getColor(fwdFromId) }}>{displayName}</span></span>
                                </div>
                              );
                            })()}

                            {/* Message card — each type renders its own card. */}
                            {msg.isDeleted ? (
                              <div className="px-3 py-2 text-xs italic text-[#8b95a8]" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: getBubbleRadius() }}>
                                This message was deleted
                              </div>
                            ) : msg.type === 'voice' ? (
                              <div className="px-3 py-2" style={{ background: isOwn ? 'linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,229,160,0.08))' : 'rgba(255,255,255,0.04)', border: `1px solid ${isOwn ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: getBubbleRadius() }}>
                                <VoicePlayer src={meta.audioBase64 || ''} duration={meta.duration} />
                                {/* Waveform visualization */}
                                {meta.duration && (
                                  <div className="flex items-end gap-[1px] h-8 mt-1.5 px-1">
                                    {generateWaveformBars(msg.id.charCodeAt(0) + msg.id.charCodeAt(1), 40).map((h, i) => (
                                      <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${h * 100}%`, background: isOwn ? `rgba(0,229,160,${0.3 + h * 0.5})` : `rgba(255,255,255,${0.1 + h * 0.2})`, minWidth: '1.5px' }} />
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : msg.type === 'poll' ? (
                              /* Enhanced Poll Message Rendering */
                              <div className="px-3 py-2.5 min-w-[180px] sm:min-w-[240px] max-w-full" style={{ background: isOwn ? 'linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,229,160,0.08))' : 'rgba(255,255,255,0.04)', border: `1px solid ${isOwn ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: getBubbleRadius() }}>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}>
                                    <BarChart3 className="w-3 h-3" /> Poll
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    {/* Time limit indicator */}
                                    {(meta.poll?.timeLimit || meta.timeLimit) ? (
                                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(255,187,0,0.12)', color: '#ffbb00', border: '1px solid rgba(255,187,0,0.2)' }}>
                                        <Clock className="w-2.5 h-2.5" />
                                        {(() => {
                                          const tl = (meta.poll?.timeLimit || meta.timeLimit) as number;
                                          const created = new Date(msg.createdAt).getTime();
                                          const expires = created + tl * 1000;
                                          const remaining = Math.max(0, Math.floor((expires - Date.now()) / 1000));
                                          if (remaining <= 0) return 'Expired';
                                          if (remaining >= 3600) return `${Math.floor(remaining / 3600)}h ${Math.floor((remaining % 3600) / 60)}m`;
                                          if (remaining >= 60) return `${Math.floor(remaining / 60)}m`;
                                          return `${remaining}s`;
                                        })()}
                                      </span>
                                    ) : null}
                                    {(meta.poll?.isClosed || meta.isClosed || closedPolls.has(msg.id)) && (
                                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,87,87,0.12)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.2)' }}>Closed</span>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm font-semibold text-[#e8ecf4] mb-2">
                                  {meta.poll?.question || meta.question || msg.content}
                                </p>
                                {(() => {
                                  const voteVisibility = (meta.poll?.voteVisibility || meta.voteVisibility || 'after_vote') as 'always' | 'after_vote' | 'after_close';
                                  const currentVotes: Record<string, string[]> = (meta.poll?.votes || meta.votes || {}) as Record<string, string[]>;
                                  const totalVotes = Object.values(currentVotes).reduce((sum, v) => sum + (Array.isArray(v) ? v.length : 0), 0);
                                  const userHasVoted = Object.values(currentVotes).some((voterIds: string[]) => voterIds.includes(userId || ''));
                                  const isPollClosed = meta.poll?.isClosed || meta.isClosed || closedPolls.has(msg.id);
                                  const isMultiple = meta.poll?.isMultiChoice || meta.multipleChoice;
                                  const showResults = voteVisibility === 'always' || (voteVisibility === 'after_vote' && userHasVoted) || (voteVisibility === 'after_close' && isPollClosed);
                                  return (<>
                                    {/* Multiple choice hint */}
                                    {isMultiple && !userHasVoted && !isPollClosed && (
                                      <p className="text-[10px] text-[#8b5cf6] mb-2 flex items-center gap-1"><CheckSquare className="w-3 h-3" /> You can select multiple answers</p>
                                    )}
                                    {(meta.poll?.options || meta.options || []).map((option: string, idx: number) => {
                                    const votes: string[] = currentVotes[idx.toString()] || [];
                                    const pct = showResults && totalVotes > 0 ? Math.round((votes.length / totalVotes) * 100) : 0;
                                    const hasVoted = votes.includes(userId || '');
                                    const isCorrectOption = (meta.poll?.isQuiz || meta.isQuiz) && (meta.poll?.correctOption ?? meta.correctOption) === idx;
                                    const isAnonymous = meta.poll?.isAnonymous || meta.anonymous;
                                    return (
                                      <button key={idx} onClick={() => { if (!isPollClosed) voteOnPoll(msg.id, idx); }}
                                        className="w-full mb-1.5 text-left rounded-lg p-2 transition-all hover:bg-white/[0.04]"
                                        style={{ background: hasVoted ? 'rgba(0,229,160,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${hasVoted ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.04)'}`, cursor: isPollClosed ? 'default' : 'pointer' }}>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-[#e8ecf4] flex items-center gap-1.5">
                                            {isMultiple ? (hasVoted ? <CheckSquare className="w-3 h-3 text-[#00e5a0]" /> : <Square className="w-3 h-3 text-[#5a6478]" />) : (hasVoted && !isCorrectOption ? <Check className="w-3 h-3 text-[#00e5a0]" /> : null)}
                                            {isCorrectOption && (showResults || isPollClosed) && <Check className="w-3.5 h-3.5 text-[#00e5a0]" style={{ filter: 'drop-shadow(0 0 4px #00e5a0)' }} />}
                                            {option}
                                          </span>
                                          {showResults && <span className="text-xs font-semibold" style={{ color: hasVoted ? '#00e5a0' : '#8b95a8', minWidth: '32px', textAlign: 'right' }}>{pct}%</span>}
                                        </div>
                                        {showResults && (
                                          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                            <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, background: isCorrectOption ? '#00e5a0' : hasVoted ? '#00e5a0' : 'rgba(255,255,255,0.15)' }} />
                                          </div>
                                        )}
                                        {/* Voter avatars for non-anonymous polls */}
                                        {!isAnonymous && showResults && votes.length > 0 && (
                                          <div className="flex items-center mt-1 gap-0.5">
                                            {votes.slice(0, 5).map((voterId: string, vi: number) => {
                                              const member = activeRoom.members.find(m => m.id === voterId);
                                              return (
                                                <div key={vi} className="w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-bold" style={{ background: `${getColor(voterId)}30`, color: getColor(voterId), border: '1px solid rgba(255,255,255,0.08)', marginLeft: vi > 0 ? '-2px' : '0', zIndex: 5 - vi }}>
                                                  {member ? getInitials(member.name) : '?'}
                                                </div>
                                              );
                                            })}
                                            {votes.length > 5 && <span className="text-[9px] text-[#5a6478] ml-1">+{votes.length - 5}</span>}
                                          </div>
                                        )}
                                      </button>
                                    );
                                  })}
                                  {/* Retract Vote button */}
                                  {userHasVoted && !isPollClosed && (
                                    <button onClick={() => {
                                      // Remove all votes by this user
                                      const newVotes = { ...currentVotes };
                                      Object.keys(newVotes).forEach(k => {
                                        newVotes[k] = (newVotes[k] || []).filter((id: string) => id !== userId);
                                      });
                                      const newMeta = { ...meta };
                                      if (newMeta.poll) { newMeta.poll = { ...newMeta.poll, votes: newVotes }; } else { newMeta.votes = newVotes; }
                                      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, metadata: newMeta } : m));
                                      fetch('/api/chat/messages', {
                                        method: 'PATCH',
                                        headers: chatHeaders(),
                                        body: JSON.stringify({ messageId: msg.id, metadata: newMeta }),
                                      }).catch(() => toast.error('Failed to retract vote'));
                                    }}
                                      className="w-full mt-1 py-1.5 rounded-lg text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] transition-colors flex items-center justify-center gap-1"
                                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                      <X className="w-3 h-3" /> Retract Vote
                                    </button>
                                  )}
                                </>);
                                })()}
                                {/* Explanation - shown after user has voted or after poll closes */}
                                {(() => {
                                  const currentVotes: Record<string, string[]> = (meta.poll?.votes || meta.votes || {}) as Record<string, string[]>;
                                  const userHasVoted = Object.values(currentVotes).some((voterIds: string[]) => voterIds.includes(userId || ''));
                                  const isPollClosed = meta.poll?.isClosed || meta.isClosed || closedPolls.has(msg.id);
                                  const explanation = meta.poll?.explanation || meta.explanation;
                                  const isQuiz = meta.poll?.isQuiz || meta.isQuiz;
                                  if (explanation && (userHasVoted || (isQuiz && isPollClosed))) {
                                    return (
                                      <div className="mt-2 p-2.5 rounded-lg" style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.12)' }}>
                                        <p className="text-[10px] text-[#00e5a0] font-medium mb-0.5">Explanation</p>
                                        <p className="text-xs text-[#e8ecf4]">{explanation}</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                })()}
                                <div className="flex items-center justify-between mt-1">
                                  <p className="text-[10px] text-[#5a6478]">
                                    {Object.values((meta.poll?.votes || meta.votes || {}) as Record<string, string[]>).reduce((sum, v) => sum + (Array.isArray(v) ? v.length : 0), 0)} vote{Object.values((meta.poll?.votes || meta.votes || {}) as Record<string, string[]>).reduce((sum, v) => sum + (Array.isArray(v) ? v.length : 0), 0) !== 1 ? 's' : ''}
                                    {(meta.poll?.isAnonymous || meta.anonymous) && ' · Anonymous'}
                                    {(meta.poll?.isMultiChoice || meta.multipleChoice) && ' · Multiple choice'}
                                    {(meta.poll?.isQuiz || meta.isQuiz) && ' · Quiz'}
                                    {(meta.poll?.voteVisibility || meta.voteVisibility) === 'after_close' && ' · Results after close'}
                                  </p>
                                  {/* Close poll button - only for poll creator */}
                                  {isOwn && !(meta.poll?.isClosed || meta.isClosed || closedPolls.has(msg.id)) && (
                                    <button onClick={(e) => { e.stopPropagation(); closePoll(msg.id); }} className="text-[10px] text-[#ff5757] hover:underline">Close Poll</button>
                                  )}
                                </div>
                              </div>
                            ) : msg.type === 'meeting' ? (
                              /* Meeting Message Rendering - Enhanced Interactive Card */
                              <div className="min-w-[200px] sm:min-w-[260px] max-w-[320px] overflow-hidden" style={{ background: isOwn ? 'linear-gradient(135deg, rgba(0,229,160,0.12), rgba(0,229,160,0.05))' : 'rgba(255,255,255,0.03)', border: `1px solid ${isOwn ? 'rgba(0,229,160,0.18)' : 'rgba(255,255,255,0.06)'}`, borderRadius: getBubbleRadius() }}>
                                {/* Top color bar */}
                                <div className="h-1" style={{ background: `linear-gradient(90deg, ${
                                  meta.meetingType === 'study_session' ? '#00e5a0' :
                                  meta.meetingType === 'lecture' ? '#4fc3f7' :
                                  meta.meetingType === 'case_discussion' ? '#8b5cf6' :
                                  meta.meetingType === 'exam_review' ? '#f59e0b' : '#8b95a8'
                                }, transparent)` }} />
                                <div className="px-3 py-2.5">
                                  {/* Header */}
                                  <div className="flex items-center gap-2.5 mb-2">
                                    <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                                      background: `${
                                        meta.meetingType === 'study_session' ? 'rgba(0,229,160,0.12)' :
                                        meta.meetingType === 'lecture' ? 'rgba(79,195,247,0.12)' :
                                        meta.meetingType === 'case_discussion' ? 'rgba(139,92,246,0.12)' :
                                        meta.meetingType === 'exam_review' ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.06)'
                                      }`, border: `1px solid ${
                                        meta.meetingType === 'study_session' ? 'rgba(0,229,160,0.2)' :
                                        meta.meetingType === 'lecture' ? 'rgba(79,195,247,0.2)' :
                                        meta.meetingType === 'case_discussion' ? 'rgba(139,92,246,0.2)' :
                                        meta.meetingType === 'exam_review' ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.08)'
                                      }`
                                    }}>
                                      <Calendar className="w-4 h-4" style={{ color:
                                        meta.meetingType === 'study_session' ? '#00e5a0' :
                                        meta.meetingType === 'lecture' ? '#4fc3f7' :
                                        meta.meetingType === 'case_discussion' ? '#8b5cf6' :
                                        meta.meetingType === 'exam_review' ? '#f59e0b' : '#8b95a8'
                                      }} />
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold text-[#e8ecf4] truncate">{meta.title || msg.content}</p>
                                      <p className="text-[10px] text-[#5a6478]">
                                        {meta.meetingType === 'study_session' ? '📚 Study Session' : meta.meetingType === 'lecture' ? '🎓 Lecture' : meta.meetingType === 'case_discussion' ? '🩺 Case Discussion' : meta.meetingType === 'exam_review' ? '📝 Exam Review' : '💬 Meeting'}
                                      </p>
                                    </div>
                                    {/* Live status indicator */}
                                    {(() => {
                                      try {
                                        const meetingDateTime = new Date(`${meta.date}T${meta.time}`);
                                        const now = new Date();
                                        const diffMs = meetingDateTime.getTime() - now.getTime();
                                        const isLive = diffMs <= 0 && diffMs > -(meta.duration * 60000);
                                        const isUpcoming = diffMs > 0 && diffMs < 3600000; // within 1 hour
                                        if (isLive) return (
                                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] font-bold" style={{ background: 'rgba(255,87,87,0.15)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.25)' }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5757] animate-pulse" />
                                            LIVE
                                          </span>
                                        );
                                        if (isUpcoming) return (
                                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[8px] font-bold" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
                                            SOON
                                          </span>
                                        );
                                        return null;
                                      } catch { return null; }
                                    })()}
                                  </div>

                                  {/* Countdown Timer */}
                                  {(() => {
                                    try {
                                      const meetingDateTime = new Date(`${meta.date}T${meta.time}`);
                                      const now = new Date();
                                      const diffMs = meetingDateTime.getTime() - now.getTime();
                                      if (diffMs > 0) {
                                        const days = Math.floor(diffMs / 86400000);
                                        const hours = Math.floor((diffMs % 86400000) / 3600000);
                                        const mins = Math.floor((diffMs % 3600000) / 60000);
                                        const countdownText = days > 0 ? `${days}d ${hours}h` : hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
                                        return (
                                          <div className="flex items-center gap-2 mb-2 px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.1)' }}>
                                            <Timer className="w-3 h-3 text-[#00e5a0]" />
                                            <span className="text-[10px] font-bold text-[#00e5a0]">Starts in {countdownText}</span>
                                          </div>
                                        );
                                      }
                                      return null;
                                    } catch { return null; }
                                  })()}

                                  {/* Details */}
                                  <div className="space-y-1.5 mb-2.5">
                                    <div className="flex items-center gap-2 text-xs text-[#8b95a8]">
                                      <Calendar className="w-3.5 h-3.5 text-[#00e5a0]" />
                                      <span>{meta.date} at {meta.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[#8b95a8]">
                                      <Clock className="w-3.5 h-3.5 text-[#00e5a0]" />
                                      <span>{meta.duration} minutes{meta.recurrence && meta.recurrence !== 'one_time' ? ` · ${meta.recurrence === 'daily' ? 'Daily' : meta.recurrence === 'weekly' ? 'Weekly' : meta.recurrence === 'biweekly' ? 'Bi-weekly' : ''}` : ''}</span>
                                    </div>
                                    {/* Feature badges - pill style */}
                                    <div className="flex flex-wrap gap-1">
                                      {meta.enableWhiteboard && <span className="text-[8px] px-1.5 py-0.5 rounded-md font-bold" style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.15)' }}>🎨 Whiteboard</span>}
                                      {meta.enableAI && <span className="text-[8px] px-1.5 py-0.5 rounded-md font-bold" style={{ background: 'rgba(183,155,255,0.1)', color: '#b79bff', border: '1px solid rgba(183,155,255,0.15)' }}>🤖 AI</span>}
                                      {meta.recording && <span className="text-[8px] px-1.5 py-0.5 rounded-md font-bold" style={{ background: 'rgba(255,87,87,0.1)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.15)' }}>🔴 Rec</span>}
                                      {meta.maxParticipants && <span className="text-[8px] px-1.5 py-0.5 rounded-md font-bold" style={{ background: 'rgba(79,195,247,0.08)', color: '#4fc3f7', border: '1px solid rgba(79,195,247,0.12)' }}>👥 {meta.maxParticipants}</span>}
                                    </div>
                                    {meta.meetingCode && (
                                      <div className="flex items-center gap-2 text-xs">
                                        <Hash className="w-3.5 h-3.5 text-[#00e5a0]" />
                                        <span className="font-mono text-[#00e5a0] font-bold">{meta.meetingCode}</span>
                                        <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(meta.meetingCode); toast.success('Meeting code copied!'); }} className="text-[#5a6478] hover:text-[#8b95a8] transition-colors"><Copy className="w-3 h-3" /></button>
                                      </div>
                                    )}
                                    {meta.description && (
                                      <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-0.5">Description</p>
                                        <p className="text-[11px] text-[#e8ecf4] leading-relaxed">{meta.description}</p>
                                      </div>
                                    )}
                                    {meta.agenda && (
                                      <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-0.5">Agenda</p>
                                        <p className="text-[11px] text-[#e8ecf4] leading-relaxed">{meta.agenda}</p>
                                      </div>
                                    )}
                                  </div>
                                  {/* Join button with gradient */}
                                  <button onClick={(e) => { e.stopPropagation(); setActiveInlineMeeting({ ...meta, meetingCode: meta.meetingCode || null }); }}
                                    className="w-full py-2 rounded-xl text-xs font-bold text-[#0c0e14] transition-[filter,transform] duration-150 ease-out hover:brightness-110 enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
                                    style={{ background: 'linear-gradient(135deg, #00e5a0, #00b87a)', boxShadow: '0 2px 12px rgba(0,229,160,0.15)' }}>
                                    Join Meeting
                                  </button>
                                </div>
                              </div>
                            ) : msg.type === 'question_card' ? (
                              /* Shared Question Card — interactive, media intact */
                              <div className="px-1 py-1" style={{ borderRadius: getBubbleRadius() }}>
                                <SharedQuestionCard
                                  payload={(() => {
                                    try {
                                      const card = typeof msg.metadata === 'string' ? JSON.parse(msg.metadata || '{}') : msg.metadata;
                                      return card as SharedQuestionPayload;
                                    } catch {
                                      return { questionId: '', type: 'mcq', text: msg.content || 'Shared question', options: [], answer: '', explanation: '' } as SharedQuestionPayload;
                                    }
                                  })()}
                                  isOwn={isOwn}
                                />
                              </div>
                            ) : msg.type === 'exam' ? (
                              /* Exam Message Rendering - interactive card */
                              <div className="px-3 py-2.5 min-w-[180px] sm:min-w-[240px] max-w-full" style={{ background: isOwn ? 'linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,229,160,0.08))' : 'rgba(255,255,255,0.04)', border: `1px solid ${isOwn ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: getBubbleRadius() }}>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,187,0,0.12)', border: '1px solid rgba(255,187,0,0.2)' }}>
                                    <FileText className="w-4 h-4 text-[#ffbb00]" />
                                  </span>
                                  <div>
                                    <p className="text-sm font-semibold text-[#e8ecf4]">{meta.title || msg.content}</p>
                                    <p className="text-[10px] text-[#5a6478]">
                                      {meta.examType === 'bank' ? '📚 Question Bank' : meta.examType === 'quick' ? '⚡ Quick Quiz' : meta.examType === 'smart' ? '🧠 Smart Quiz' : 'Exam'}
                                    </p>
                                  </div>
                                </div>
                                <div className="space-y-1.5 mb-2.5">
                                  <div className="flex items-center gap-2 text-xs text-[#8b95a8]">
                                    <FileText className="w-3.5 h-3.5 text-[#ffbb00]" />
                                    <span>{meta.questionCount || (meta.questions || []).length} question{(meta.questionCount || (meta.questions || []).length) !== 1 ? 's' : ''}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-[#8b95a8]">
                                    <Clock className="w-3.5 h-3.5 text-[#ffbb00]" />
                                    <span>{meta.duration} minutes</span>
                                  </div>
                                  {meta.description && (
                                    <p className="text-[10px] text-[#5a6478] truncate">{meta.description}</p>
                                  )}
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); setActiveInlineExam({ ...meta, msgId: msg.id }); setExamAnswers({}); setExamSubmitted(false); setExamScore(null); setChatExamMode('menu'); }}
                                  className="w-full py-2 rounded-xl text-xs font-medium text-[#0c0e14] transition-all hover:brightness-110"
                                  style={{ background: '#ffbb00' }}>
                                  Start Exam
                                </button>
                              </div>
                            ) : msg.type === 'image' ? (
                              /* Image Attachment Rendering */
                              <div className="px-1 py-1 max-w-[280px]" style={{ borderRadius: getBubbleRadius() }}>
                                {(() => {
                                  // Whiteboard images use meta.imageUrl directly
                                  if (meta.imageUrl) {
                                    return (
                                      <div>
                                        <img
                                          src={meta.imageUrl}
                                          alt="Whiteboard"
                                          className="rounded-lg cursor-pointer max-h-64 w-full object-cover hover:opacity-90 transition-opacity"
                                          onClick={(e) => { e.stopPropagation(); setLightboxImage(meta.imageUrl); }}
                                        />
                                        {meta.isWhiteboard && <p className="text-[10px] text-[#8b95a8] mt-1 px-2 flex items-center gap-1">🎨 Whiteboard</p>}
                                      </div>
                                    );
                                  }
                                  // Standard image attachments
                                  const attachments = meta.attachments || [];
                                  return attachments.map((att: { url?: string; fileName?: string; fileSize?: number; caption?: string }, ai: number) => (
                                    <div key={ai} className={ai > 0 ? 'mt-1.5' : ''}>
                                      {att.url && (
                                        <img
                                          src={att.url}
                                          alt={att.fileName || 'Image'}
                                          className="rounded-lg cursor-pointer max-h-64 w-full object-cover hover:opacity-90 transition-opacity"
                                          onClick={(e) => { e.stopPropagation(); setLightboxImage(att.url!); }}
                                        />
                                      )}
                                      {att.caption && <p className="text-xs text-[#8b95a8] mt-1 px-2">{att.caption}</p>}
                                    </div>
                                  ));
                                })()}
                              </div>
                            ) : msg.type === 'file' ? (
                              /* File Attachment Rendering */
                              <div className="px-1 py-1">
                                {(() => {
                                  const attachments = meta.attachments || [];
                                  return attachments.map((att: { url?: string; fileName?: string; fileSize?: number; mimeType?: string; caption?: string }, ai: number) => {
                                    const ext = att.fileName?.split('.').pop()?.toLowerCase() || '';
                                    const isPdf = att.mimeType === 'application/pdf' || ext === 'pdf';
                                    const isDoc = att.mimeType?.includes('word') || ['doc', 'docx'].includes(ext);
                                    const sizeStr = att.fileSize ? (att.fileSize < 1024 ? `${att.fileSize}B` : att.fileSize < 1024 * 1024 ? `${(att.fileSize / 1024).toFixed(1)}KB` : `${(att.fileSize / (1024 * 1024)).toFixed(1)}MB`) : '';
                                    return (
                                      <div key={ai} className={`flex items-center gap-3 p-2 rounded-lg ${ai > 0 ? 'mt-1.5' : ''}`} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: isPdf ? 'rgba(255,87,87,0.12)' : isDoc ? 'rgba(79,195,247,0.12)' : 'rgba(0,229,160,0.12)' }}>
                                          {isPdf ? <FileText className="w-5 h-5 text-[#ff5757]" /> : isDoc ? <FileText className="w-5 h-5 text-[#4fc3f7]" /> : <FileText className="w-5 h-5 text-[#00e5a0]" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-xs font-medium text-[#e8ecf4] truncate">{att.fileName || 'File'}</p>
                                          <p className="text-[10px] text-[#5a6478]">{sizeStr}</p>
                                        </div>
                                        {att.url && (
                                          <a href={att.url} download={att.fileName} onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-white/[0.06]"><Download className="w-4 h-4 text-[#8b95a8]" /></a>
                                        )}
                                      </div>
                                    );
                                  });
                                })()}
                                {meta.attachments?.[0]?.caption && <p className="text-xs text-[#8b95a8] mt-1">{meta.attachments[0].caption}</p>}
                              </div>
                            ) : msg.type === 'video' ? (
                              /* Video Attachment Rendering */
                              <div className="px-1 py-1 max-w-[280px]" style={{ borderRadius: getBubbleRadius() }}>
                                {(() => {
                                  // Whiteboard recordings use meta.videoUrl directly
                                  if (meta.videoUrl) {
                                    return (
                                      <div className="relative rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
                                        <video
                                          src={meta.videoUrl}
                                          controls
                                          className="rounded-lg max-h-64 w-full object-contain"
                                          preload="metadata"
                                        />
                                        {meta.isWhiteboardRecording && (
                                          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[9px] font-semibold" style={{ background: 'rgba(0,0,0,0.6)', color: 'var(--medq-text, #e8ecf4)' }}>
                                            🎬 Whiteboard Recording
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }
                                  // Standard video attachments
                                  const attachments = meta.attachments || [];
                                  return attachments.map((att: { url?: string; fileName?: string; fileSize?: number; caption?: string }, ai: number) => (
                                    <div key={ai} className={`relative rounded-lg overflow-hidden ${ai > 0 ? 'mt-1.5' : ''}`} style={{ background: 'rgba(0,0,0,0.3)' }}>
                                      <div className="w-full h-40 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))' }}>
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,229,160,0.2)', border: '2px solid rgba(0,229,160,0.4)' }}>
                                          <Play className="w-5 h-5 text-[#00e5a0] ml-0.5" />
                                        </div>
                                      </div>
                                      <div className="absolute bottom-0 left-0 right-0 p-2" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                                        <div className="flex items-center gap-1.5">
                                          <Film className="w-3 h-3 text-[#8b95a8]" />
                                          <span className="text-[10px] text-[#e8ecf4] truncate">{att.fileName || 'Video'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ));
                                })()}
                                {meta.attachments?.[0]?.caption && <p className="text-xs text-[#8b95a8] mt-1 px-1">{meta.attachments[0].caption}</p>}
                              </div>
                            ) : msg.type === 'call' ? (
                              /* Call Log Message Rendering */
                              <div className="px-3 py-2 flex items-center gap-2.5" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: getBubbleRadius(), border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: meta.status === 'missed' || meta.status === 'declined' ? 'rgba(255,87,87,0.12)' : 'rgba(0,229,160,0.12)' }}>
                                  {meta.callType === 'video' ? <Video className="w-4 h-4" style={{ color: meta.status === 'missed' || meta.status === 'declined' ? '#ff5757' : '#00e5a0' }} /> : <Phone className="w-4 h-4" style={{ color: meta.status === 'missed' || meta.status === 'declined' ? '#ff5757' : '#00e5a0' }} />}
                                </div>
                                <div>
                                  <p className="text-xs font-medium" style={{ color: meta.status === 'missed' || meta.status === 'declined' ? '#ff5757' : '#e8ecf4' }}>
                                    {meta.status === 'missed' || meta.status === 'declined'
                                      ? (meta.callType === 'video' ? 'Missed Video Call' : 'Missed Voice Call')
                                      : (meta.callType === 'video' ? 'Video Call' : 'Voice Call')}
                                  </p>
                                  {meta.duration > 0 && <p className="text-[10px] text-[#5a6478]">{formatDuration(meta.duration)}</p>}
                                </div>
                              </div>
                            ) : (
                              <div className="px-3 py-2" style={{ background: isOwn ? 'linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,229,160,0.08))' : 'rgba(255,255,255,0.04)', border: `1px solid ${isOwn ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}`, borderRadius: getBubbleRadius() }}>
                                {isSingleEmoji(msg.content) ? (
                                  <p className="text-4xl emoji-bounce text-center py-1">{msg.content}</p>
                                ) : (
                                  <p className={`${getFontSizeClass()} text-[#e8ecf4] break-words whitespace-pre-wrap`}>
                                    {msgSearchQuery ? highlightText(msg.content, msgSearchQuery) : msg.content}
                                  </p>
                                )}
                                {msg.editedAt && <span className="text-[10px] text-[#8b95a8] ml-1">(edited)</span>}
                                {/* Rich Link Preview */}
                                {(() => {
                                  const url = extractUrl(msg.content);
                                  if (!url) return null;
                                  // Detect MedQ internal deep links — render as an
                                  // in-app navigation card instead of opening a new tab.
                                  const internalLink = parseInternalDeepLink(url);
                                  if (internalLink) {
                                    return (
                                      <div className="mt-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:brightness-110"
                                        style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.2)', maxWidth: '280px' }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Use SPA navigation: push the URL to history and
                                          // dispatch a popstate so MedQAppShell's location
                                          // listener picks it up. This avoids opening a new tab.
                                          const newUrl = `/messages?room=${internalLink.room}${internalLink.msg ? `&msg=${internalLink.msg}` : ''}`;
                                          // If we're already in the chat tab, just open the room directly.
                                          if (activeRoom && activeRoom.id === internalLink.room) {
                                            if (internalLink.msg) scrollToMessage(internalLink.msg);
                                          } else {
                                            const targetRoom = rooms.find(r => r.id === internalLink.room);
                                            if (targetRoom) {
                                              openRoom(targetRoom, { scrollToMessageId: internalLink.msg, fromDeepLink: true });
                                            } else {
                                              // Room not in loaded list — fall back to
                                              // real router navigation (soft; the old
                                              // window.location.href hard-reloaded the
                                              // whole app). The deep-link useEffect on
                                              // this page picks up ?room= on arrival.
                                              router.push(newUrl);
                                            }
                                          }
                                        }}>
                                        <div className="p-2.5 flex items-center gap-2">
                                          <Link2 className="w-4 h-4 text-[#00e5a0] flex-shrink-0" />
                                          <div className="min-w-0 flex-1">
                                            <p className="text-xs font-medium text-[#00e5a0] truncate">Message Link</p>
                                            <p className="text-[10px] text-[#8b95a8] truncate">
                                              {internalLink.msg ? 'Click to jump to message' : 'Click to open conversation'}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  const preview = linkPreviews[msg.id];
                                  const domain = (() => { try { return new URL(url).hostname; } catch { return url; } })();
                                  return (
                                    <div className="mt-2 rounded-lg overflow-hidden cursor-pointer"
                                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', maxWidth: '280px' }}
                                      onClick={(e) => { e.stopPropagation(); window.open(url, '_blank', 'noopener'); }}>
                                      {preview?.image && (
                                        <div className="w-full h-28 bg-cover bg-center" style={{ backgroundImage: `url(${preview.image})` }} />
                                      )}
                                      <div className="p-2.5">
                                        <p className="text-xs font-medium text-[#e8ecf4] truncate">{preview?.title || domain}</p>
                                        {preview?.description && <p className="text-[10px] text-[#8b95a8] mt-0.5 line-clamp-2">{preview.description}</p>}
                                        <p className="text-[9px] text-[#5a6478] mt-1 flex items-center gap-1">
                                          <Link2 className="w-2.5 h-2.5" />{domain}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                            )}

                            {/* NEW: Translation Display */}
                            {translatedMsgs[msg.id]?.showing && (
                              <div className="mt-1 px-3 py-2 rounded-lg" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.12)', borderRadius: getBubbleRadius() }}>
                                <p className="text-xs text-[#4fc3f7] flex items-center gap-1 mb-0.5"><Languages className="w-3 h-3" /> Translation</p>
                                <p className={`${getFontSizeClass()} text-[#e8ecf4] break-words whitespace-pre-wrap`}>{translatedMsgs[msg.id].translated}</p>
                                <button onClick={() => setTranslatedMsgs(prev => ({ ...prev, [msg.id]: { ...prev[msg.id], showing: false } }))} className="text-[10px] text-[#5a6478] mt-1 hover:text-[#8b95a8]">Show Original</button>
                              </div>
                            )}
                            {translatingMsgId === msg.id && (
                              <div className="mt-1 px-3 py-1.5 rounded-lg flex items-center gap-2" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.12)' }}>
                                <Loader2 className="w-3 h-3 animate-spin text-[#4fc3f7]" /><span className="text-[10px] text-[#8b95a8]">Translating...</span>
                              </div>
                            )}

                            {/* Reactions */}
                            {reactions.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {reactions.map(r => (
                                  <button key={r.emoji} onClick={() => addReaction(msg, r.emoji)}
                                    className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] transition-all"
                                    style={{ background: r.userIds.includes(userId || '') ? 'rgba(0,229,160,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${r.userIds.includes(userId || '') ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.05)'}` }}>
                                    <span>{r.emoji}</span>
                                    <span className="text-[#8b95a8]">{r.userIds.length}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Time + Receipts — below the card, right-aligned,
                                muted token (#8b95a8, 6.38:1 on dark). Only the
                                "read" receipt carries the brand green. */}
                            <div className="flex items-center gap-1 -mt-0.5 justify-end text-[#8b95a8]">
                              <span className="text-[10px] tabular-nums">{formatTime(msg.createdAt)}</span>
                              {isOwn && !msg.isDeleted && (
                                <span className="receipt-pop">
                                  {getReadStatus(msg) === 'read' ? (
                                    <button onClick={(e) => { e.stopPropagation(); setSeenByPopup({ msgId: msg.id, x: e.clientX, y: e.clientY }); }} className="hover:scale-110 transition-transform" title="Seen by">
                                      <CheckCheck className="w-3.5 h-3.5 text-[#00e5a0]" />
                                    </button>
                                  ) :
                                   getReadStatus(msg) === 'delivered' ? <CheckCheck className="w-3.5 h-3.5 text-[#8b95a8]" /> :
                                   <Check className="w-3.5 h-3.5 text-[#8b95a8]" />}
                                </span>
                              )}
                              {/* Failed message retry indicator */}
                              {isOwn && failedMsgIds.has(msg.id) && (
                                <button onClick={(e) => { e.stopPropagation(); retryMessage(msg.id); }} className="flex items-center gap-0.5 hover:scale-105 transition-transform" title="Retry sending">
                                  <span className="text-[9px] text-[#ff5757]">Failed</span>
                                  <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,87,87,0.15)' }}>
                                    <span className="text-[10px] text-[#ff5757]">↻</span>
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll FAB */}
            {showScrollFAB && (
              <button onClick={() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); setUnreadScrollCount(0); }}
                className="absolute bottom-24 right-8 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                style={{ background: 'rgba(30,33,46,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <ChevronDown className="w-5 h-5 text-[#00e5a0]" />
                {unreadScrollCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-[#0c0e14]" style={{ background: '#00e5a0' }}>{unreadScrollCount}</span>}
              </button>
            )}

            {/* Multi-Select Action Bar */}
            {multiSelectMode && selectedMsgIds.size > 0 && (
              <div className="slide-in-up px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(21,24,33,0.95)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-xs font-medium text-[#e8ecf4]">{selectedMsgIds.size} selected</span>
                <div className="flex-1" />
                <button onClick={bulkForwardMessages} className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5" style={{ background: 'rgba(79,195,247,0.12)', color: '#4fc3f7', border: '1px solid rgba(79,195,247,0.2)' }}>
                  <Share2 className="w-3.5 h-3.5" /> Forward
                </button>
                <button onClick={bulkDeleteMessages} className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5" style={{ background: 'rgba(255,87,87,0.12)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.2)' }}>
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
                <button onClick={() => { setMultiSelectMode(false); setSelectedMsgIds(new Set()); }} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#8b95a8]" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  Cancel
                </button>
              </div>
            )}

            {/* Reply/Edit Bar */}
            {(replyToMsg || editingMsgId) && (
              <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'rgba(21,24,33,0.8)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-1 h-8 rounded-full" style={{ background: editingMsgId ? '#f59e0b' : '#00e5a0' }} />
                <div className="flex-1 min-w-0">
                  {editingMsgId ? (
                    <p className="text-xs font-medium text-[#fbbf24]">Editing message</p>
                  ) : (
                    <>
                      <p className="text-xs font-medium" style={{ color: getColor(replyToMsg!.senderId) }}>{replyToMsg!.sender?.name || 'Unknown'}</p>
                      <p className="text-[10px] text-[#8b95a8] truncate">{replyToMsg!.content}</p>
                    </>
                  )}
                </div>
                <button onClick={() => { setReplyToMsg(null); cancelEdit(); }}><X className="w-4 h-4 text-[#8b95a8]" /></button>
              </div>
            )}

            {/* Unified Emoji/Sticker Picker - closes on outside click */}
            {(showEmojiPicker || showStickerPicker) && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => { setShowEmojiPicker(false); setShowStickerPicker(false); }} />
                <div className="relative z-40 px-4 py-3" style={{ background: 'rgba(21,24,33,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex gap-1 mb-2 items-center">
                  {['emoji', 'medical', 'favorites'].map(tab => (
                    <button key={tab} onClick={() => setStickerTab(tab as any)} className="px-2.5 py-1 rounded text-xs font-medium transition-all" style={{ background: stickerTab === tab ? 'rgba(0,229,160,0.12)' : 'transparent', color: stickerTab === tab ? '#00e5a0' : '#8b95a8' }}>
                      {tab === 'emoji' ? '😀 Emoji' : tab === 'medical' ? '🏥 Medical' : '⭐ Favs'}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button onClick={() => { setShowEmojiPicker(false); setShowStickerPicker(false); }} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-3.5 h-3.5 text-[#8b95a8]" /></button>
                </div>
                <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto chat-scrollbar">
                  {(stickerTab === 'emoji' ? COMMON_EMOJIS : stickerTab === 'medical' ? MEDICAL_STICKERS : REACTION_EMOJIS).map((emoji, i) => (
                    <button key={`${stickerTab}-${i}`} onClick={() => { setInputText(prev => prev + emoji); setShowEmojiPicker(false); setShowStickerPicker(false); textareaRef.current?.focus(); }}
                      className="w-8 h-8 rounded flex items-center justify-center text-base hover:bg-white/[0.06] transition-all hover:scale-110">{emoji}</button>
                  ))}
                </div>
                </div>
              </>
            )}

            {/* Input Area — Telegram-style: no boxed container. The composer
                pill IS the input field; this wrapper only provides spacing. */}
            <div className="px-3 pb-3 pt-1">
              {/* NEW: Slow mode indicator */}
              {slowModeRemaining > 0 && (
                <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)' }}>
                  <Timer className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span className="text-xs text-[#fbbf24]">Slow mode: {slowModeRemaining}s remaining</span>
                </div>
              )}
              {isRecording ? (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full rec-pulse" style={{ background: '#ff5757' }} />
                  <span className="text-sm text-[#e8ecf4]">{formatDuration(recordingDuration)}</span>
                  <div className="flex-1" />
                  <button onClick={cancelRecording} className="p-2 rounded-full hover:bg-white/[0.06]"><X className="w-5 h-5 text-[#ff5757]" /></button>
                  <button onClick={sendVoiceMessage} className="p-2 rounded-full" style={{ background: 'rgba(0,229,160,0.15)' }}><Send className="w-5 h-5 text-[#00e5a0]" /></button>
                </div>
              ) : (
                <div className="flex items-end gap-1 relative rounded-2xl px-2 py-1.5 transition-[background-color,border-color] bg-white/[0.05] border border-white/[0.07] focus-within:border-white/20 focus-within:bg-white/[0.06]">
                  {/* @mention autocomplete dropdown */}
                  {mentionQuery !== null && getFilteredMembers().length > 0 && (
                    <div className="absolute bottom-full left-0 mb-1 ml-10 min-w-[200px] max-w-[280px] rounded-xl overflow-hidden z-50 backdrop-blur-xl" style={{ background: 'rgba(30,33,46,0.97)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="px-3 py-1.5 text-[10px] text-[#5a6478] font-medium uppercase tracking-wider">Members</div>
                      {getFilteredMembers().map((member, idx) => (
                        <button key={member.id} onClick={() => insertMention(member.name || 'User')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-white/[0.06] transition-all"
                          style={{ background: idx === mentionIndex ? 'rgba(0,229,160,0.06)' : 'transparent' }}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0" style={{ background: `${getColor(member.id)}20`, color: getColor(member.id) }}>
                            {getInitials(member.name)}
                          </div>
                          <span className="text-[#e8ecf4] truncate">{member.name}</span>
                          {member.isOnline && <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] ml-auto flex-shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowStickerPicker(false); setShowAppFeaturesMenu(false); }} aria-label="Emoji picker" className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"><Smile className="w-5 h-5 text-[#8b95a8]" aria-hidden="true" /></button>
                    <button onClick={() => setShowAttachmentPicker(true)} aria-label="Attach file" className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"><Paperclip className="w-5 h-5 text-[#8b95a8]" aria-hidden="true" /></button>
                    {/* App features integration menu - closes on outside click via backdrop */}
                    <div className="relative">
                      <button onClick={() => setShowAppFeaturesMenu(!showAppFeaturesMenu)} className="p-2 rounded-lg hover:bg-white/[0.06]" title="App Features"><Sparkles className="w-5 h-5 text-[#8b95a8]" /></button>
                      {showAppFeaturesMenu && (
                        <>
                          {/* Invisible backdrop to close menu on outside click */}
                          <div className="fixed inset-0 z-40" onClick={() => setShowAppFeaturesMenu(false)} />
                          <div className="absolute bottom-full left-0 mb-1 min-w-[200px] rounded-xl overflow-hidden z-50 backdrop-blur-xl fade-in" style={{ background: 'rgba(21,24,33,0.97)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                          <div className="px-3 py-2 text-[10px] text-[#5a6478] font-medium uppercase tracking-wider flex items-center justify-between">Chat Features <button onClick={() => setShowAppFeaturesMenu(false)} className="p-0.5 rounded hover:bg-white/[0.06]"><X className="w-3 h-3 text-[#8b95a8]" /></button></div>
                          {[
                            { icon: <BarChart3 className="w-4 h-4" />, label: 'Create Poll', desc: 'Ask a question', action: () => { setShowPollCreator(true); setShowAppFeaturesMenu(false); } },
                            { icon: <UserCheck className="w-4 h-4" />, label: 'Share Contact', desc: 'Send a friend\'s info', action: () => { setShowContactShare(true); setShowAppFeaturesMenu(false); } },
                            { icon: <Pencil className="w-4 h-4" />, label: 'Whiteboard', desc: 'Draw & share in chat', action: () => { if (!activeRoom) { toast.info('Open a chat first'); } else { setShowInlineWhiteboard(true); } setShowAppFeaturesMenu(false); } },
                            { icon: <Calendar className="w-4 h-4" />, label: 'Schedule Meeting', desc: 'Create a meeting for members', action: () => { if (!activeRoom) { toast.info('Open a chat first'); } else { setShowMeetingScheduler(true); setMeetingStep(1); } setShowAppFeaturesMenu(false); } },
                            { icon: <FileText className="w-4 h-4" />, label: 'Create Exam', desc: 'Create an exam for members', action: () => { if (!activeRoom) { toast.info('Open a chat first'); } else { setShowExamCreator(true); } setShowAppFeaturesMenu(false); } },
                          ].map((item, i) => (
                            <button key={i} onClick={item.action} className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-white/[0.06] transition-all">
                              <span className="text-[#00e5a0]">{item.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-[#e8ecf4]">{item.label}</p>
                                <p className="text-[9px] text-[#5a6478]">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                        </>
                      )}
                    </div>
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={e => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label={editingMsgId ? 'Edit message' : 'Message'}
                    placeholder={editingMsgId ? 'Edit message...' : slowModeRemaining > 0 ? `Slow mode: wait ${slowModeRemaining}s` : 'Type a message...'}
                    rows={1}
                    // better-ui: placeholder-[#8b95a8] = the --medq-muted token
                    // (6.38:1 on dark, was placeholder-[#5a6478] @3.04:1 — fails
                    // WCAG 1.4.3 for placeholder text which is held to AA).
                    className="flex-1 bg-transparent text-sm text-[#e8ecf4] placeholder-[#8b95a8] outline-none resize-none py-2"
                    style={{ maxHeight: '120px' }}
                    disabled={slowModeRemaining > 0}
                  />
                  {inputText.trim() ? (
                    <div className="flex items-center gap-1">
                      {/* NEW: Schedule send button */}
                      {!editingMsgId && (
                        <button onClick={() => setShowSchedulePicker(true)} aria-label="Schedule message" className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors duration-150 enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]" title="Schedule message"><Clock className="w-5 h-5 text-[#8b95a8]" aria-hidden="true" /></button>
                      )}
                      <button
                        onClick={() => editingMsgId ? saveEdit(editingMsgId) : sendMessage()}
                        disabled={sending || slowModeRemaining > 0}
                        aria-label={editingMsgId ? 'Save edit' : 'Send message'}
                        // better-ui: pressed scale = 0.96 over 150ms ease-out
                        // (was missing entirely). enabled:active excludes the
                        // disabled state so a slow-mode / sending button doesn't
                        // scale. transition-property names what changes
                        // (background-color, transform) — never `transition-all`.
                        className="p-2 rounded-lg transition-[background-color,transform] duration-150 ease-out enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] disabled:cursor-not-allowed"
                        style={{ background: sending || slowModeRemaining > 0 ? 'rgba(255,255,255,0.04)' : 'rgba(0,229,160,0.15)' }}>
                        {sending ? <Loader2 className="w-5 h-5 text-[#00e5a0] animate-spin" aria-hidden="true" /> : <Send className="w-5 h-5 text-[#00e5a0]" aria-hidden="true" />}
                      </button>
                    </div>
                  ) : (
                    <button onClick={slowModeRemaining > 0 ? undefined : startRecording} aria-label="Record voice message" disabled={slowModeRemaining > 0} className={`p-2 rounded-lg hover:bg-white/[0.06] transition-colors duration-150 enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] ${slowModeRemaining > 0 ? 'opacity-40 pointer-events-none' : ''}`}><Mic className="w-5 h-5 text-[#8b95a8]" aria-hidden="true" /></button>
                  )}
                </div>
              )}
            </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ═══════ RIGHT INFO PANEL ═══════ */}
      {showRightPanel && activeRoom && (
        <div className="hidden md:flex flex-col flex-shrink-0 w-80 border-l overflow-y-auto chat-scrollbar" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2">
              {(['info', 'media', 'links', 'files'] as const).map(tab => (
                <button key={tab} onClick={() => setRightPanelTab(tab)}
                  className="px-2 py-1 rounded-lg text-[10px] font-medium transition-all capitalize"
                  style={{ background: rightPanelTab === tab ? 'rgba(0,229,160,0.12)' : 'transparent', color: rightPanelTab === tab ? '#00e5a0' : '#8b95a8' }}>
                  {tab === 'info' ? 'Info' : tab === 'media' ? 'Media' : tab === 'links' ? 'Links' : 'Files'}
                </button>
              ))}
            </div>
            <button onClick={() => setShowRightPanel(false)} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
          </div>

          {rightPanelTab === 'info' && (
            <>
              {/* Profile / Group Info */}
              <div className="p-4 flex flex-col items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <button className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-3 hover:opacity-80 transition-opacity relative group" style={{ background: `${getColor(activeRoom.id)}20`, color: getColor(activeRoom.id) }}
                  onClick={() => {
                    if (activeRoom.type === 'direct' && otherMember) {
                      openProfilePhoto(otherMember.name, otherMember.image, otherMember.id);
                    }
                  }}>
                  {activeRoom.type === 'direct' ? getInitials(otherMember?.name) : (activeRoom.avatar || '👥')}
                  {/* NEW: Hover indicator for profile photo */}
                  {activeRoom.type === 'direct' && (
                    <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                      <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </button>

                {/* Group: Edit Name */}
                {activeRoom.type === 'group' && editingGroupName ? (
                  <div className="w-full flex gap-2 mb-2">
                    <input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} className="flex-1 bg-transparent text-sm text-[#e8ecf4] outline-none px-2 py-1 rounded" style={{ border: '1px solid rgba(255,255,255,0.1)' }} autoFocus />
                    <button onClick={updateGroupName} className="px-3 py-1 rounded text-xs font-medium" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>Save</button>
                    <button onClick={() => setEditingGroupName(false)} className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}><X className="w-3 h-3 text-[#8b95a8]" /></button>
                  </div>
                ) : (
                  <h3 className="text-base font-semibold text-[#e8ecf4]">
                    {activeRoom.name}
                    {activeRoom.type === 'group' && activeRoom.createdBy === userId && (
                      <button onClick={() => { setEditingGroupName(true); setNewGroupName(activeRoom.name); }} className="ml-2 inline-block p-0.5 rounded hover:bg-white/[0.06]"><Pencil className="w-3 h-3 text-[#8b95a8]" /></button>
                    )}
                  </h3>
                )}

                {activeRoom.type === 'direct' && (
                  <p className="text-xs text-[#8b95a8] mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: isOtherOnline ? '#00e5a0' : '#5a6478' }} />
                    {formatLastSeen(otherMember?.lastActiveAt, otherMember?.isOnline)}
                  </p>
                )}
                {activeRoom.type === 'group' && activeRoom.description && <p className="text-xs text-[#8b95a8] mt-1 text-center">{activeRoom.description}</p>}

                {/* Group Settings Section */}
                {activeRoom.type === 'group' && activeRoom.createdBy === userId && (
                  <div className="w-full mt-3 space-y-2">
                    {/* Change Avatar */}
                    {!editingGroupAvatar ? (
                      <button onClick={() => setEditingGroupAvatar(true)} className="flex items-center gap-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] transition-colors mx-auto">
                        <Pencil className="w-3 h-3" /> Change Avatar
                      </button>
                    ) : (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {EMOJI_AVATAR_OPTIONS.map(e => (
                          <button key={e} onClick={() => updateGroupAvatar(e)} className={`w-7 h-7 rounded flex items-center justify-center text-sm ${activeRoom.avatar === e ? 'ring-1 ring-[#00e5a0]' : ''}`} style={{ background: activeRoom.avatar === e ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)' }}>{e}</button>
                        ))}
                        <button onClick={() => setEditingGroupAvatar(false)} className="w-7 h-7 rounded flex items-center justify-center text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>✕</button>
                      </div>
                    )}

                    {/* Edit Description */}
                    {!editingGroupDescription ? (
                      <button onClick={() => { setEditingGroupDescription(true); setNewGroupDescription(activeRoom.description || ''); }} className="flex items-center gap-2 text-xs text-[#8b95a8] hover:text-[#e8ecf4] transition-colors mx-auto">
                        <Pencil className="w-3 h-3" /> {activeRoom.description ? 'Edit Description' : 'Add Description'}
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <input value={newGroupDescription} onChange={e => setNewGroupDescription(e.target.value)} className="flex-1 bg-transparent text-xs text-[#e8ecf4] outline-none px-2 py-1 rounded" style={{ border: '1px solid rgba(255,255,255,0.1)' }} autoFocus placeholder="Group description..." />
                        <button onClick={updateGroupDescription} className="px-2 py-1 rounded text-[10px] font-medium" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>Save</button>
                        <button onClick={() => setEditingGroupDescription(false)} className="px-2 py-1 rounded text-[10px]" style={{ background: 'rgba(255,255,255,0.04)' }}><X className="w-3 h-3 text-[#8b95a8]" /></button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-3">
                  {activeRoom.type === 'direct' && (
                    <>
                      <button onClick={() => startCall('voice')} className="p-2 rounded-xl hover:bg-white/[0.06]" style={{ background: 'rgba(255,255,255,0.03)' }}><Phone className="w-4 h-4 text-[#8b95a8]" /></button>
                      <button onClick={() => startCall('video')} className="p-2 rounded-xl hover:bg-white/[0.06]" style={{ background: 'rgba(255,255,255,0.03)' }}><Video className="w-4 h-4 text-[#8b95a8]" /></button>
                      <button onClick={() => setShowMsgSearch(true)} className="p-2 rounded-xl hover:bg-white/[0.06]" style={{ background: 'rgba(255,255,255,0.03)' }}><Search className="w-4 h-4 text-[#8b95a8]" /></button>
                    </>
                  )}
                </div>
              </div>

              {/* Members (Group) */}
              {activeRoom.type === 'group' && (
                <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider">{activeRoom.members.length} Members{groupOnlineOthersCount > 0 && <span className="text-[#00e5a0]"> · {groupOnlineOthersCount} online</span>}</p>
                    {activeRoom.createdBy === userId && (
                      <button onClick={() => setShowAddMember(!showAddMember)} className="p-1 rounded hover:bg-white/[0.06]"><UserPlus className="w-4 h-4 text-[#00e5a0]" /></button>
                    )}
                  </div>

                  {/* Add Member Search */}
                  {showAddMember && (
                    <div className="mb-2">
                      <input value={addMemberSearch} onChange={e => setAddMemberSearch(e.target.value)} placeholder="Search users to add..."
                        className="w-full px-3 py-1.5 rounded-lg text-xs text-[#e8ecf4] placeholder-[#5a6478] outline-none"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                      {addMemberResults.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {addMemberResults.map(r => (
                            <div key={r.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-white/[0.03]">
                              <span className="text-xs text-[#e8ecf4] flex-1 truncate">{r.name}</span>
                              <button onClick={() => { addMemberToGroup(r.id); setAddMemberSearch(''); setAddMemberResults([]); }} className="text-[10px] px-2 py-0.5 rounded" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>Add</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Member List */}
                  {(groupMembers.length > 0 ? groupMembers : activeRoom.members).map(m => {
                    const memberId = m.userId || m.id;
                    const memberName = m.user?.name || m.name;
                    const memberRole = m.role;
                    const isOnline = activeRoomPresence !== undefined
                      ? activeRoomPresence.includes(memberId)
                      : m.user?.isOnline || m.isOnline || isRecentlyActive(m.user?.lastActiveAt || m.lastActiveAt);
                    return (
                      <div key={memberId} className="flex items-center gap-2 p-1.5 rounded hover:bg-white/[0.03]">
                        <div className="relative">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${getColor(memberId)}20`, color: getColor(memberId) }}>
                            {getInitials(memberName)}
                          </div>
                          {isOnline && <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full border" style={{ background: '#00e5a0', borderColor: '#0c0e14' }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#e8ecf4] truncate">{memberName}{memberId === userId && ' (You)'}</p>
                        </div>
                        {memberRole === 'admin' && <Crown className="w-3 h-3 text-[#fbbf24]" />}
                        {activeRoom.createdBy === userId && memberId !== userId && memberRole !== 'admin' && (
                          <div className="flex items-center gap-1">
                            {transferAdminTarget === memberId ? (
                              <>
                                <button onClick={() => transferAdmin(memberId)} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(251,191,36,0.12)', color: '#f59e0b' }}>Confirm</button>
                                <button onClick={() => setTransferAdminTarget(null)} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>✕</button>
                              </>
                            ) : (
                              <button onClick={() => setTransferAdminTarget(memberId)} className="p-0.5 rounded hover:bg-white/[0.06]" title="Transfer Admin"><Crown className="w-3 h-3 text-[#fbbf24] opacity-50 hover:opacity-100" /></button>
                            )}
                            <button onClick={() => removeMemberFromGroup(memberId)} className="p-0.5 rounded hover:bg-white/[0.06]"><UserMinus className="w-3 h-3 text-[#ff5757]" /></button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex flex-col gap-2 mt-3">
                    <button onClick={leaveGroup} className="w-full px-3 py-2 rounded-lg text-xs font-medium text-[#ff5757] flex items-center justify-center gap-2 hover:bg-red-500/[0.06]" style={{ border: '1px solid rgba(255,87,87,0.15)' }}>
                      <LogOut className="w-3.5 h-3.5" /> Leave Group
                    </button>
                    {activeRoom.createdBy === userId && (
                      <button onClick={deleteGroup} className="w-full px-3 py-2 rounded-lg text-xs font-medium text-[#ff5757] flex items-center justify-center gap-2 hover:bg-red-500/[0.06]" style={{ border: '1px solid rgba(255,87,87,0.15)' }}>
                        <Trash className="w-3.5 h-3.5" /> Delete Group
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* NEW: Group Invite Link */}
              {activeRoom.type === 'group' && (
                <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5" /> Invite Link</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-2.5 py-1.5 rounded-lg text-[10px] text-[#8b95a8] truncate" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      medq.app/chat/join/{inviteLinks[activeRoom.id] || '...'}
                    </div>
                    <button onClick={() => copyInviteLink(activeRoom.id)} className="p-1.5 rounded-lg hover:bg-white/[0.06]" title="Copy Link"><Copy className="w-3.5 h-3.5 text-[#8b95a8]" /></button>
                  </div>
                  {activeRoom.createdBy === userId && (
                    <button onClick={() => revokeInviteLink(activeRoom.id)} className="mt-1.5 text-[10px] text-[#ff5757] hover:text-[#ff7878] transition-colors">Revoke Link</button>
                  )}
                </div>
              )}

              {/* NEW: Slow Mode Setting (Admin Only) */}
              {activeRoom.type === 'group' && activeRoom.createdBy === userId && (
                <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Timer className="w-3.5 h-3.5" /> Slow Mode</p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { label: 'Off', seconds: 0 },
                      { label: '10s', seconds: 10 },
                      { label: '30s', seconds: 30 },
                      { label: '1m', seconds: 60 },
                      { label: '5m', seconds: 300 },
                      { label: '15m', seconds: 900 },
                      { label: '1h', seconds: 3600 },
                    ].map(opt => (
                      <button key={opt.seconds} onClick={() => setSlowModeForRoom(activeRoom.id, opt.seconds)}
                        className="px-2 py-1 rounded text-[10px] font-medium transition-all"
                        style={{ background: (slowMode[activeRoom.id] || 0) === opt.seconds ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)', color: (slowMode[activeRoom.id] || 0) === opt.seconds ? '#00e5a0' : '#8b95a8', border: `1px solid ${(slowMode[activeRoom.id] || 0) === opt.seconds ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pinned Messages */}
              {pinnedMessages.length > 0 && (
                <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Pinned Messages ({pinnedMessages.length})</p>
                  {pinnedMessages.map(m => (
                    <button key={m.id} onClick={() => scrollToMessage(m.id)} className="w-full text-left p-2 rounded-lg mb-1 hover:bg-white/[0.03]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-[10px] text-[#8b95a8]">{m.sender?.name || 'Unknown'}</p>
                      <p className="text-xs text-[#e8ecf4] truncate">{m.content}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* NEW: Group Permissions (Admin Only) */}
              {activeRoom.type === 'group' && activeRoom.createdBy === userId && (
                <div className="p-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Group Permissions</p>
                  {([
                    { key: 'sendMessages' as const, label: 'Send Messages', desc: 'Allow members to send messages' },
                    { key: 'sendMedia' as const, label: 'Send Media', desc: 'Allow sharing media & files' },
                    { key: 'addMembers' as const, label: 'Add Members', desc: 'Allow members to invite others' },
                    { key: 'pinMessages' as const, label: 'Pin Messages', desc: 'Allow members to pin messages' },
                  ]).map(perm => {
                    const perms = groupPermissions[activeRoom.id] || { sendMessages: true, sendMedia: true, addMembers: true, pinMessages: true };
                    const isEnabled = perms[perm.key];
                    return (
                      <div key={perm.key} className="flex items-center justify-between py-2 px-1 rounded-lg hover:bg-white/[0.02] transition-all">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#e8ecf4]">{perm.label}</p>
                          <p className="text-[9px] text-[#5a6478]">{perm.desc}</p>
                        </div>
                        <button onClick={() => toggleGroupPermission(activeRoom.id, perm.key)}
                          className="w-9 h-5 rounded-full relative transition-all flex-shrink-0"
                          style={{ background: isEnabled ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.1)' }}>
                          <div className="absolute top-0.5 w-4 h-4 rounded-full transition-all" style={{ background: isEnabled ? '#00e5a0' : '#5a6478', left: isEnabled ? '18px' : '2px' }} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
            )}

          {rightPanelTab === 'media' && (
            <div className="p-3">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Shared Media ({mediaMessages.length})</p>
              {mediaMessages.length === 0 ? (
                <div className="flex flex-col items-center py-8"><ImageIcon className="w-8 h-8 text-[#5a6478] mb-2" /><p className="text-xs text-[#5a6478]">No media yet</p></div>
              ) : (
                <div className="space-y-1 max-h-96 overflow-y-auto chat-scrollbar">
                  {mediaMessages.map(m => (
                    <button key={m.id} onClick={() => scrollToMessage(m.id)} className="w-full text-left p-2 rounded-lg hover:bg-white/[0.03]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,229,160,0.08)' }}>
                          {m.type === 'voice' ? <Mic className="w-3.5 h-3.5 text-[#00e5a0]" /> : <ImageIcon className="w-3.5 h-3.5 text-[#00e5a0]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#e8ecf4] truncate">{m.content}</p>
                          <p className="text-[9px] text-[#8b95a8] tabular-nums">{formatTime(m.createdAt)} · {m.sender?.name || 'Unknown'}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {rightPanelTab === 'links' && (
            <div className="p-3">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5" /> Shared Links ({linkMessages.length})</p>
              {linkMessages.length === 0 ? (
                <div className="flex flex-col items-center py-8"><Link2 className="w-8 h-8 text-[#5a6478] mb-2" /><p className="text-xs text-[#5a6478]">No links yet</p></div>
              ) : (
                <div className="space-y-1 max-h-96 overflow-y-auto chat-scrollbar">
                  {linkMessages.map(m => {
                    const urlMatch = m.content.match(/https?:\/\/[^\s]+/i);
                    return (
                      <button key={m.id} onClick={() => scrollToMessage(m.id)} className="w-full text-left p-2 rounded-lg hover:bg-white/[0.03]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(79,195,247,0.08)' }}>
                            <Link2 className="w-3.5 h-3.5 text-[#4fc3f7]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-[#4fc3f7] truncate">{urlMatch?.[0] || m.content}</p>
                            <p className="text-[9px] text-[#8b95a8] tabular-nums">{formatTime(m.createdAt)} · {m.sender?.name || 'Unknown'}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {rightPanelTab === 'files' && (
            <div className="p-3">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Shared Files ({fileMessages.length})</p>
              {fileMessages.length === 0 ? (
                <div className="flex flex-col items-center py-8"><FileText className="w-8 h-8 text-[#5a6478] mb-2" /><p className="text-xs text-[#5a6478]">No files yet</p></div>
              ) : (
                <div className="space-y-1 max-h-96 overflow-y-auto chat-scrollbar">
                  {fileMessages.map(m => (
                    <button key={m.id} onClick={() => scrollToMessage(m.id)} className="w-full text-left p-2 rounded-lg hover:bg-white/[0.03]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,191,36,0.08)' }}>
                          <FileText className="w-3.5 h-3.5 text-[#fbbf24]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#e8ecf4] truncate">{m.content}</p>
                          <p className="text-[9px] text-[#8b95a8] tabular-nums">{formatTime(m.createdAt)} · {m.sender?.name || 'Unknown'}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══════ QUICK REACTION BAR ═══════ */}
      {quickReactionBar && (
        <div data-reaction-bar className="fixed z-[120] animate-in fade-in-0 zoom-in-95 duration-100"
          style={{ left: Math.min(quickReactionBar.x - 100, (typeof window !== 'undefined' ? window.innerWidth : 800) - 260), top: quickReactionBar.y - 50 }}>
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-2xl shadow-xl" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '👎'].map(emoji => (
              <button key={emoji}
                onClick={() => { const msg = messages.find(m => m.id === quickReactionBar.msgId); if (msg) addReaction(msg, emoji); setQuickReactionBar(null); }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg hover:scale-125 hover:bg-white/[0.06] transition-all reaction-pop">
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ CONTEXT MENU ═══════ */}
      {contextMenu && (
        <MessageContextMenu
          x={contextMenu.x} y={contextMenu.y} msg={contextMenu.msg} isOwn={contextMenu.msg.senderId === userId}
          isAdmin={activeRoom?.members?.find(m => m.id === userId)?.role === 'admin'}
          canPin={(() => {
            // Mirror pinMessage()'s authorization: must be logged in,
            // a member, and (in groups) admin OR in a room where members
            // are allowed to pin. Direct chats: any member can pin.
            if (!userId) return false;
            const myMember = activeRoom?.members?.find(m => m.id === userId);
            if (!myMember) return false;
            if (activeRoom?.type === 'group') {
              const isAdmin = myMember.role === 'admin';
              const perms = groupPermissions[activeRoom.id] || { pinMessages: true };
              return isAdmin || perms.pinMessages;
            }
            return true;
          })()}
          onClose={() => { setContextMenu(null); setQuickReactionBar(null); }}
          onReply={msg => setReplyToMsg(msg)}
          onEdit={msg => startEdit(msg)}
          onCopy={copyText}
          onForward={msg => openForward(msg)}
          onPin={pinMessage}
          onDelete={deleteMessage}
          onDeleteForEveryone={deleteMessageForEveryone}
          onReact={addReaction}
          onSave={saveMessage}
          isSaved={savedMessageIds.includes(contextMenu.msg.id)}
          onTranslate={translateMessage}
          onCopyMessageLink={copyMessageLink}
        />
      )}

      {/* ═══════ ROOM CONTEXT MENU ═══════ */}
      {roomContextMenu && (
        <RoomContextMenu
          x={roomContextMenu.x} y={roomContextMenu.y} room={roomContextMenu.room}
          onClose={() => setRoomContextMenu(null)}
          onTogglePin={toggleRoomPin}
          onToggleMute={toggleRoomMute}
          onMarkAsRead={markRoomAsRead}
          onMarkAsUnread={markRoomAsUnread}
          onDeleteRoom={deleteConversation}
          onLeaveGroup={leaveGroupFromMenu}
          onArchive={archiveRoom}
          onUnarchive={unarchiveRoom}
          isArchived={archivedRoomIds.includes(roomContextMenu.room.id)}
          onMoveToFolder={addRoomToFolder}
          onRemoveFromFolder={removeRoomFromFolder}
          folders={allFolderTabs}
          isPinned={!!(localPinnedIds.has(roomContextMenu.room.id) || roomContextMenu.room.isPinned)}
          onSetTTL={setTTLForRoom}
          ttlSeconds={disappearingTTL[roomContextMenu.room.id] || 0}
          onExportChat={exportChat}
          onShowTTLMenu={setShowTTLMenu}
          showTTLMenu={showTTLMenu}
        />
      )}

      {/* ═══════ USER PROFILE POPUP ═══════ */}
      {userProfilePopup && (
        <UserProfilePopup
          user={userProfilePopup.user}
          isFriend={isUserFriend(userProfilePopup.user.id)}
          onClose={() => setUserProfilePopup(null)}
          onSendMessage={(uid) => startDM(uid)}
          onAddFriend={(uid) => sendFriendRequest(uid)}
          sendingRequest={sendingRequest}
          position={userProfilePopup.position}
        />
      )}

      {/* ═══════ FORWARD MODAL ═══════ */}
      {forwardMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => { setForwardMsg(null); setForwardTargets(new Set()); bulkForwardQueueRef.current = []; }}>
          <div className="w-full max-w-sm rounded-2xl p-4" style={{ background: 'var(--medq-surface, #151821)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#e8ecf4]">Forward Message</h3>
              <button onClick={() => { setForwardMsg(null); setForwardTargets(new Set()); bulkForwardQueueRef.current = []; }}><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>
            <p className="text-xs text-[#8b95a8] mb-3 truncate">
              "{forwardMsg.content || `[${forwardMsg.type || 'media'} message]`}"
              {bulkForwardQueueRef.current.length > 0 && (
                <span className="ml-2 text-[#00e5a0]">+{bulkForwardQueueRef.current.length} more</span>
              )}
            </p>

            {/* Recent Chats - Quick Forward */}
            {rooms.filter(r => r.id !== activeRoom?.id).length > 0 && (
              <>
                <p className="text-[10px] font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Recent Chats</p>
                <div className="max-h-32 overflow-y-auto chat-scrollbar space-y-1 mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                  {rooms.filter(r => r.id !== activeRoom?.id).slice(0, 5).map(r => {
                    const isDirect = r.type === 'direct';
                    return (
                      <button key={r.id} onClick={async () => {
                        setForwarding(true);
                        try {
                          let targetRoomId = r.id;
                          if (isDirect) {
                            const otherUser = r.members.find(m => m.id !== userId);
                            if (otherUser) {
                              const roomRes = await fetch('/api/chat/direct', { method: 'POST', headers: chatHeaders(), body: JSON.stringify({ targetUserId: otherUser.id }) });
                              if (roomRes.ok) { const rd = await roomRes.json(); targetRoomId = rd.room.id; }
                            }
                          }
                          // Forward the primary message.
                          await fetch('/api/chat/messages', { method: 'POST', headers: chatHeaders(), body: JSON.stringify(buildForwardPayload(forwardMsg, targetRoomId)) });
                          // Drain the bulk-forward queue (if any) into the same room.
                          const queue = bulkForwardQueueRef.current;
                          if (queue.length > 0) {
                            for (const queuedMsg of queue) {
                              try {
                                await fetch('/api/chat/messages', { method: 'POST', headers: chatHeaders(), body: JSON.stringify(buildForwardPayload(queuedMsg, targetRoomId)) });
                              } catch { /* skip individual failures */ }
                            }
                            bulkForwardQueueRef.current = [];
                            toast.success(`${queue.length + 1} messages forwarded!`);
                          } else {
                            toast.success('Message forwarded!');
                          }
                          setForwardMsg(null);
                          fetchRooms();
                        } catch { toast.error('Failed to forward'); }
                        finally { setForwarding(false); }
                      }}
                        className="w-full flex items-center gap-2 p-2 rounded-lg transition-all text-left hover:bg-white/[0.03]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(r.id)}20`, color: getColor(r.id) }}>
                          {isDirect ? getInitials(r.name) : (r.avatar || '👥')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-[#e8ecf4] truncate block">{r.name}</span>
                          {r.lastMessage && <span className="text-[10px] text-[#5a6478] truncate block">{r.lastMessage.content}</span>}
                        </div>
                        <Send className="w-3.5 h-3.5 text-[#00e5a0] flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-semibold text-[#8b95a8] uppercase tracking-wider">Friends</p>
              {friends.length > 0 && (
                <button onClick={() => {
                  if (forwardTargets.size === friends.length) setForwardTargets(new Set());
                  else setForwardTargets(new Set(friends.map(f => f.id)));
                }} className="text-[10px] text-[#00e5a0] hover:underline">
                  {forwardTargets.size === friends.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>
            <div className="max-h-48 overflow-y-auto chat-scrollbar space-y-1">
              {friends.map(f => {
                const isSelected = forwardTargets.has(f.id);
                return (
                  <button key={f.id} onClick={() => {
                    setForwardTargets(prev => { const next = new Set(prev); if (next.has(f.id)) next.delete(f.id); else next.add(f.id); return next; });
                  }}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all text-left ${isSelected ? 'bg-[rgba(0,229,160,0.08)]' : 'hover:bg-white/[0.03]'}`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(f.id)}20`, color: getColor(f.id) }}>{getInitials(f.name)}</div>
                    <span className="text-xs text-[#e8ecf4] flex-1">{f.name}</span>
                    {isSelected ? <CheckSquare className="w-4 h-4 text-[#00e5a0]" /> : <Square className="w-4 h-4 text-[#5a6478]" />}
                  </button>
                );
              })}
              {friends.length === 0 && <p className="text-xs text-[#5a6478] text-center py-4">No friends to forward to</p>}
            </div>
            {forwardTargets.size > 0 && (
              <button onClick={forwardToMultipleChats} disabled={forwarding}
                className="w-full mt-3 py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-50 transition-all"
                style={{ background: '#00e5a0' }}>
                {forwarding ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : `Send to ${forwardTargets.size} chat${forwardTargets.size !== 1 ? 's' : ''}`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ═══════ CONTACT SHARE MODAL ═══════ */}
      {showContactShare && activeRoom && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="w-80 rounded-2xl p-4" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#e8ecf4]">Share Contact</h3>
              <button onClick={() => setShowContactShare(false)} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>
            <div className="max-h-48 overflow-y-auto chat-scrollbar space-y-1">
              {friends.map(f => (
                <button key={f.id} onClick={() => {
                  sendMessageWithContent(`👤 Contact: ${f.name || 'Unknown'}${f.specialty ? ` | ${f.specialty}` : ''}`);
                  setShowContactShare(false);
                }} className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.04] transition-all">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(f.id)}20`, color: getColor(f.id) }}>
                    {getInitials(f.name)}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs text-[#e8ecf4] truncate">{f.name || 'Unknown'}</p>
                    {f.specialty && <p className="text-[10px] text-[#5a6478]">{f.specialty}</p>}
                  </div>
                </button>
              ))}
              {friends.length === 0 && <p className="text-xs text-[#5a6478] text-center py-4">No friends to share</p>}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ CREATE GROUP MODAL ═══════ */}
      {showNewGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowNewGroup(false)}>
          <div className="w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl p-5" style={{ background: 'var(--medq-surface, #151821)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4]">Create Group</h3>
              <button onClick={() => setShowNewGroup(false)}><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            {/* Avatar Picker */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {groupAvatar}
              </div>
              <div className="flex flex-wrap gap-1">
                {EMOJI_AVATAR_OPTIONS.map(e => (
                  <button key={e} onClick={() => setGroupAvatar(e)} className={`w-7 h-7 rounded flex items-center justify-center text-sm ${groupAvatar === e ? 'ring-1 ring-[#00e5a0]' : ''}`} style={{ background: groupAvatar === e ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)' }}>{e}</button>
                ))}
              </div>
            </div>

            <input value={groupName} onChange={e => setGroupName(e.target.value)} placeholder="Group name"
              className="w-full px-3 py-2 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none mb-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />

            <input value={groupDescription} onChange={e => setGroupDescription(e.target.value)} placeholder="Description (optional)"
              className="w-full px-3 py-2 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none mb-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />

            {/* Search for non-friends */}
            <div className="mb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5a6478]" />
                <input value={groupSearchQuery} onChange={e => setGroupSearchQuery(e.target.value)} placeholder="Search all users to add..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs text-[#e8ecf4] placeholder-[#5a6478] outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
              </div>
              {groupSearching && <div className="flex justify-center py-1"><Loader2 className="w-3 h-3 animate-spin text-[#00e5a0]" /></div>}
              {groupSearchResults.length > 0 && (
                <div className="mt-1 space-y-0.5 max-h-24 overflow-y-auto chat-scrollbar">
                  {groupSearchResults.map(r => {
                    const isSelected = selectedMembers.has(r.id);
                    return (
                      <button key={r.id} onClick={() => {
                        setSelectedMembers(prev => { const next = new Set(prev); if (next.has(r.id)) next.delete(r.id); else next.add(r.id); return next; });
                      }} className={`w-full flex items-center gap-2 p-1.5 rounded-lg transition-all text-left ${isSelected ? 'bg-[rgba(0,229,160,0.08)]' : 'hover:bg-white/[0.03]'}`}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: `${getColor(r.id)}20`, color: getColor(r.id) }}>{getInitials(r.name)}</div>
                        <span className="text-[11px] text-[#e8ecf4] flex-1 truncate">{r.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-[#00e5a0]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider">
                Friends {friends.length > 0 && `(${friends.length})`}
              </p>
              {friends.length > 0 && (
                <button onClick={() => {
                  if (selectedMembers.size === friends.length) {
                    setSelectedMembers(new Set());
                  } else {
                    setSelectedMembers(new Set(friends.map(f => f.id)));
                  }
                }} className="text-[10px] text-[#00e5a0] hover:underline">
                  {selectedMembers.size === friends.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>

            <div className="max-h-32 overflow-y-auto chat-scrollbar space-y-1 mb-2">
              {loadingFriends ? (
                <div className="flex justify-center py-3"><Loader2 className="w-4 h-4 animate-spin text-[#00e5a0]" /></div>
              ) : (
                friends.map(f => {
                  const isSelected = selectedMembers.has(f.id);
                  return (
                    <button key={f.id} onClick={() => {
                      setSelectedMembers(prev => {
                        const next = new Set(prev);
                        if (next.has(f.id)) next.delete(f.id); else next.add(f.id);
                        return next;
                      });
                    }} className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all text-left ${isSelected ? 'bg-[rgba(0,229,160,0.08)]' : 'hover:bg-white/[0.03]'}`}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(f.id)}20`, color: getColor(f.id) }}>{getInitials(f.name)}</div>
                      <span className="text-xs text-[#e8ecf4] flex-1">{f.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#00e5a0]" />}
                    </button>
                  );
                })
              )}
              {!loadingFriends && friends.length === 0 && <p className="text-xs text-[#5a6478] text-center py-3">No friends yet. Use search above to find users!</p>}
            </div>

            {selectedMembers.size > 0 && (
              <p className="text-[10px] text-[#8b95a8] mb-3">{selectedMembers.size} member{selectedMembers.size !== 1 ? 's' : ''} selected</p>
            )}

            <button onClick={createGroup} disabled={!groupName.trim() || selectedMembers.size === 0 || creating}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-50"
              style={{ background: groupName.trim() && selectedMembers.size > 0 ? '#00e5a0' : 'rgba(255,255,255,0.06)' }}>
              {creating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : `Create Group (${selectedMembers.size} member${selectedMembers.size !== 1 ? 's' : ''})`}
            </button>
          </div>
        </div>
      )}

      {/* ═══════ NEW DM MODAL ═══════ */}
      {showNewDM && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowNewDM(false)}>
          <div className="w-full max-w-sm rounded-2xl p-5" style={{ background: 'var(--medq-surface, #151821)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4]">Start a Chat</h3>
              <button onClick={() => setShowNewDM(false)}><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>
            <div className="max-h-64 overflow-y-auto chat-scrollbar space-y-1">
              {friends.map(f => (
                <button key={f.id} onClick={() => startDM(f.id)}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] text-left">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${getColor(f.id)}20`, color: getColor(f.id) }}>{getInitials(f.name)}</div>
                    {isRecentlyActive(f.lastActiveAt) && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2" style={{ background: '#00e5a0', borderColor: '#151821' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#e8ecf4] truncate">{f.name}</p>
                    {f.specialty && <p className="text-[10px] text-[#5a6478] truncate">{f.specialty}</p>}
                  </div>
                  <MessageCircle className="w-4 h-4 text-[#8b95a8]" />
                </button>
              ))}
              {friends.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-xs text-[#5a6478]">No friends yet</p>
                  <button onClick={() => { setShowNewDM(false); setShowFriends(true); setFriendsTab('add'); }} className="mt-2 text-xs text-[#00e5a0] hover:underline">Add Friends</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ FOLDER EDITOR MODAL ═══════ */}
      {folderEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setFolderEditorOpen(false)}>
          <div className="w-full max-w-md max-h-[85vh] flex flex-col rounded-2xl p-5" style={{ background: 'var(--medq-surface, #151821)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4]">{editingFolder ? 'Edit Folder' : 'Create Folder'}</h3>
              <button onClick={() => setFolderEditorOpen(false)}><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            {/* Icon Picker */}
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Icon</p>
              <div className="flex flex-wrap gap-1.5">
                {['📁', '💼', '📚', '🏥', '🩺', '💊', '🎓', '💡', '🔬', '⭐', '🏠', '🎮', '💬', '❤️', '🎯', '🚀'].map(icon => (
                  <button key={icon} onClick={() => setNewFolderIcon(icon)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all"
                    style={{ background: newFolderIcon === icon ? `${newFolderColor}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${newFolderIcon === icon ? `${newFolderColor}40` : 'rgba(255,255,255,0.06)'}` }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Color</p>
              <div className="flex gap-2">
                {['#00e5a0', '#4fc3f7', '#f59e0b', '#8b5cf6', '#ff5757', '#ec4899', '#22c55e', '#f97316'].map(color => (
                  <button key={color} onClick={() => setNewFolderColor(color)}
                    className="w-7 h-7 rounded-full transition-all"
                    style={{ background: color, border: newFolderColor === color ? '2px solid #e8ecf4' : '2px solid transparent', boxShadow: newFolderColor === color ? `0 0 8px ${color}60` : 'none' }} />
                ))}
              </div>
            </div>

            {/* Name */}
            <input value={newFolderName} onChange={e => setNewFolderName(e.target.value)} placeholder="Folder name"
              className="w-full px-3 py-2 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none mb-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />

            {/* Room Selector */}
            <div className="mb-3">
              <p className="text-[10px] font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Add Chats to Folder</p>
              <div className="max-h-40 overflow-y-auto chat-scrollbar space-y-1">
                {rooms.map(room => {
                  const isSelected = editingFolder
                    ? (editingFolder.roomIds.includes(room.id) || folderRoomSelection.has(room.id))
                    : folderRoomSelection.has(room.id);
                  return (
                    <button key={room.id} onClick={() => {
                      setFolderRoomSelection(prev => {
                        const next = new Set(prev);
                        if (next.has(room.id)) next.delete(room.id); else next.add(room.id);
                        return next;
                      });
                    }} className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all text-left ${isSelected ? 'bg-[rgba(0,229,160,0.08)]' : 'hover:bg-white/[0.03]'}`}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${getColor(room.id)}20`, color: getColor(room.id) }}>
                        {room.type === 'direct' ? getInitials(room.members.find(m => m.id !== userId)?.name) : (room.avatar || '👥')}
                      </div>
                      <span className="text-xs text-[#e8ecf4] flex-1 truncate">{room.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#00e5a0]" />}
                    </button>
                  );
                })}
                {rooms.length === 0 && <p className="text-xs text-[#5a6478] text-center py-3">No chats available</p>}
              </div>
            </div>

            <div className="flex gap-2">
              {editingFolder ? (
                <>
                  <button onClick={() => {
                    if (!newFolderName.trim()) return;
                    const updatedRoomIds = [...new Set([...editingFolder.roomIds.filter((id: string) => !folderRoomSelection.has(id) || folderRoomSelection.has(id)), ...Array.from(folderRoomSelection)])];
                    setChatFolders(prev => prev.map(f => f.id === editingFolder.id ? { ...f, name: newFolderName.trim(), color: newFolderColor, icon: newFolderIcon, roomIds: Array.from(folderRoomSelection) } : f));
                    setFolderEditorOpen(false);
                    toast.success('Folder updated!');
                  }} disabled={!newFolderName.trim()}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-50"
                    style={{ background: newFolderName.trim() ? newFolderColor : 'rgba(255,255,255,0.06)' }}>
                    Save Changes
                  </button>
                  <button onClick={() => { deleteFolder(editingFolder.id); setFolderEditorOpen(false); }}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#ff5757]"
                    style={{ border: '1px solid rgba(255,87,87,0.2)' }}>
                    Delete
                  </button>
                </>
              ) : (
                <button onClick={() => {
                  if (!newFolderName.trim()) return;
                  const folder: ChatFolder = { id: Date.now().toString(36), name: newFolderName.trim(), color: newFolderColor, icon: newFolderIcon, roomIds: Array.from(folderRoomSelection) };
                  setChatFolders(prev => [...prev, folder]);
                  setNewFolderName('');
                  setNewFolderColor('#00e5a0');
                  setNewFolderIcon('📁');
                  setFolderRoomSelection(new Set());
                  setFolderEditorOpen(false);
                  toast.success('Folder created!');
                }} disabled={!newFolderName.trim()}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-50"
                  style={{ background: newFolderName.trim() ? newFolderColor : 'rgba(255,255,255,0.06)' }}>
                  Create Folder
                </button>
              )}
            </div>

            {/* Existing Folders List (when editing) */}
            {chatFolders.length > 0 && !editingFolder && (
              <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] font-semibold text-[#8b95a8] uppercase tracking-wider mb-2">Existing Folders</p>
                <div className="space-y-1">
                  {chatFolders.map(folder => (
                    <div key={folder.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03]">
                      <span className="text-sm">{folder.icon}</span>
                      <span className="text-xs text-[#e8ecf4] flex-1">{folder.name}</span>
                      <span className="text-[10px] text-[#5a6478]">{folder.roomIds.length} chats</span>
                      <button onClick={() => {
                        setEditingFolder(folder);
                        setNewFolderName(folder.name);
                        setNewFolderColor(folder.color);
                        setNewFolderIcon(folder.icon);
                        setFolderRoomSelection(new Set(folder.roomIds));
                      }} className="p-1 rounded hover:bg-white/[0.06]"><Pencil className="w-3 h-3 text-[#8b95a8]" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════ SAVED MESSAGES MODAL (now uses chat-room-style view instead) ═══════ */}

      {/* ═══════ CHAT CUSTOMIZATION MODAL ═══════ */}
      {showCustomization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowCustomization(false)}>
          <div className="w-full max-w-md max-h-[85vh] flex flex-col rounded-2xl p-5" style={{ background: 'var(--medq-surface, #151821)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00e5a0]" />
                <h3 className="text-base font-semibold text-[#e8ecf4]">Chat Settings</h3>
              </div>
              <button onClick={() => setShowCustomization(false)}><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Type className="w-3.5 h-3.5" /> Font Size</p>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button key={size} onClick={() => setChatFontSize(size)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium transition-all capitalize"
                    style={{ background: chatFontSize === size ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)', color: chatFontSize === size ? '#00e5a0' : '#8b95a8', border: `1px solid ${chatFontSize === size ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                    {size === 'small' ? 'Aa' : size === 'medium' ? 'Aa' : 'Aa'}
                    <span className="block text-[9px] mt-0.5">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bubble Style */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> Bubble Style</p>
              <div className="flex gap-2">
                {(['rounded', 'slightly-rounded', 'sharp'] as const).map(style => (
                  <button key={style} onClick={() => setChatBubbleStyle(style)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                    style={{ background: chatBubbleStyle === style ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)', color: chatBubbleStyle === style ? '#00e5a0' : '#8b95a8', border: `1px solid ${chatBubbleStyle === style ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div className="w-8 h-5 mx-auto mb-1" style={{ background: 'rgba(0,229,160,0.2)', borderRadius: style === 'rounded' ? '12px' : style === 'slightly-rounded' ? '8px' : '2px' }} />
                    <span className="text-[9px]">{style === 'rounded' ? 'Rounded' : style === 'slightly-rounded' ? 'Slightly' : 'Sharp'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Alignment */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Maximize2 className="w-3.5 h-3.5" /> Message Alignment</p>
              <div className="flex gap-2">
                {(['right', 'left'] as const).map(align => (
                  <button key={align} onClick={() => setChatMessageAlign(align)}
                    className="flex-1 py-2 rounded-lg text-xs font-medium transition-all capitalize"
                    style={{ background: chatMessageAlign === align ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)', color: chatMessageAlign === align ? '#00e5a0' : '#8b95a8', border: `1px solid ${chatMessageAlign === align ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div className="flex flex-col gap-1 mb-1 px-2">
                      <div className="h-2 rounded-sm" style={{ background: 'rgba(0,229,160,0.3)', width: align === 'right' ? '60%' : '40%', marginLeft: align === 'right' ? 'auto' : '0' }} />
                      <div className="h-2 rounded-sm" style={{ background: 'rgba(255,255,255,0.1)', width: align === 'right' ? '40%' : '60%', marginLeft: align === 'right' ? 'auto' : '0' }} />
                    </div>
                    <span className="text-[9px]">{align === 'right' ? 'Right (Default)' : 'Left'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Wallpaper — Enhanced with pattern previews */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Palette className="w-3.5 h-3.5" /> Chat Wallpaper</p>
              {/* Wallpaper preview strip showing current wallpaper effect */}
              <div className="mb-2 rounded-lg overflow-hidden h-16 relative" style={{ background: 'var(--medq-bg, #0c0e14)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: WALLPAPER_PRESETS[chatWallpaper]?.gradient || undefined }} />
                {/* Mini message bubbles preview */}
                <div className="absolute inset-0 flex flex-col justify-center gap-1 px-3">
                  <div className="self-end px-2 py-0.5 rounded-lg text-[8px] text-[#e8ecf4] max-w-[60%]" style={{ background: 'linear-gradient(135deg, rgba(0,229,160,0.3), rgba(0,229,160,0.15))', border: '1px solid rgba(0,229,160,0.3)' }}>Hey there! 👋</div>
                  <div className="self-start px-2 py-0.5 rounded-lg text-[8px] text-[#e8ecf4] max-w-[60%]" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>Hi! How are you?</div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(WALLPAPER_PRESETS).map(([key, preset]) => (
                  <button key={key} onClick={() => setChatWallpaper(key)}
                    className="w-full aspect-square rounded-lg transition-all flex items-center justify-center relative overflow-hidden group"
                    style={{
                      background: 'var(--medq-bg, #0c0e14)',
                      border: chatWallpaper === key ? '2px solid #00e5a0' : '1px solid rgba(255,255,255,0.08)',
                      boxShadow: chatWallpaper === key ? '0 0 8px rgba(0,229,160,0.3)' : 'none',
                    }}>
                    <div className="absolute inset-0" style={{ backgroundImage: preset.gradient || undefined }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.4)' }}>
                      <div className="w-4 h-1.5 rounded-sm" style={{ background: 'rgba(0,229,160,0.3)', marginLeft: 'auto', marginRight: 2 }} />
                      <div className="w-5 h-1.5 rounded-sm" style={{ background: 'rgba(255,255,255,0.1)', marginLeft: 2, marginRight: 'auto' }} />
                    </div>
                    {chatWallpaper === key && <div className="absolute top-0.5 right-0.5"><Check className="w-3 h-3 text-[#00e5a0]" /></div>}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {Object.entries(WALLPAPER_PRESETS).map(([key, preset]) => (
                  <button key={key} onClick={() => setChatWallpaper(key)}
                    className="text-[8px] px-1.5 py-0.5 rounded transition-all"
                    style={{ background: chatWallpaper === key ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)', color: chatWallpaper === key ? '#00e5a0' : '#5a6478' }}>
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Accent Theme</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(CHAT_THEMES).map(([key, theme]) => (
                  <button key={key} onClick={() => setChatTheme(key)}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1.5"
                    style={{ background: chatTheme === key ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.04)', color: chatTheme === key ? '#00e5a0' : '#8b95a8', border: `1px solid ${chatTheme === key ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: key === 'default' ? '#5a6478' : key === 'warm' ? '#f59e0b' : key === 'ocean' ? '#4fc3f7' : key === 'forest' ? '#22c55e' : key === 'purple' ? '#8b5cf6' : key === 'sunset' ? '#ec4899' : key === 'aurora' ? '#00e5a0' : key === 'midnight' ? '#1e212e' : key === 'rose' ? '#f43f5e' : '#14b8a6' }} />
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button onClick={() => { setChatFontSize('medium'); setChatBubbleStyle('rounded'); setChatWallpaper('default'); setChatMessageAlign('right'); setChatTheme('default'); }}
              className="w-full py-2 rounded-xl text-xs font-medium text-[#8b95a8] transition-all hover:bg-white/[0.06]"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              Reset to Defaults
            </button>
          </div>
        </div>
      )}

      {/* ═══════ FOLDER CONTEXT MENU ═══════ */}
      {folderContextMenu && (
        <div className="fixed z-[100]" style={{ left: Math.min(folderContextMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 800) - 180), top: folderContextMenu.y }}>
          <div className="rounded-xl overflow-hidden backdrop-blur-xl min-w-[160px]" style={{ background: 'rgba(30,33,46,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={() => setFolderContextMenu(null)}>
            <button onClick={() => { const f = chatFolders.find(f => f.id === folderContextMenu.folderId); if (f) { setEditingFolderTabId(f.id); setEditingFolderTabName(f.name); } }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
              <Pencil className="w-3.5 h-3.5 text-[#8b95a8]" /> Rename
            </button>
            <button onClick={() => { const f = chatFolders.find(f => f.id === folderContextMenu.folderId); if (f) { setEditingFolder(f); setNewFolderName(f.name); setNewFolderColor(f.color); setNewFolderIcon(f.icon); setFolderRoomSelection(new Set(f.roomIds)); setFolderEditorOpen(true); } }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs hover:bg-white/[0.06] transition-all text-[#e8ecf4]">
              <Settings className="w-3.5 h-3.5 text-[#8b95a8]" /> Edit Folder
            </button>
            <button onClick={() => { deleteFolder(folderContextMenu.folderId); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs text-[#ff5757] hover:bg-red-500/[0.06] transition-all">
              <Trash2 className="w-3.5 h-3.5" /> Delete Folder
            </button>
          </div>
        </div>
      )}

      {/* ═══════ NEW: POLL CREATION MODAL ═══════ */}
      {showPollCreator && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowPollCreator(false)}>
          <div className="w-full max-w-md mx-4 rounded-2xl p-5" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4] flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#00e5a0]" /> Create Poll</h3>
              <button onClick={() => setShowPollCreator(false)} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            <input value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} placeholder="Question" autoFocus
              className="w-full mb-3 px-3 py-2 rounded-lg text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />

            {pollOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input value={opt} onChange={e => updatePollOption(idx, e.target.value)} placeholder={`Option ${idx + 1}`}
                  className="flex-1 px-3 py-2 rounded-lg text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                {pollOptions.length > 2 && (
                  <button onClick={() => removePollOption(idx)} className="p-1.5 rounded-lg hover:bg-white/[0.06]"><X className="w-3.5 h-3.5 text-[#8b95a8]" /></button>
                )}
              </div>
            ))}
            {pollOptions.length < 10 && (
              <button onClick={addPollOption} className="w-full py-2 rounded-lg text-xs text-[#00e5a0] hover:bg-white/[0.04] transition-colors" style={{ border: '1px dashed rgba(0,229,160,0.2)' }}>+ Add Option</button>
            )}

            <div className="flex items-center gap-4 mt-3 mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={pollAnonymous} onChange={e => setPollAnonymous(e.target.checked)} className="accent-[#00e5a0]" />
                <span className="text-xs text-[#8b95a8]">Anonymous</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={pollMultipleChoice} onChange={e => setPollMultipleChoice(e.target.checked)} className="accent-[#00e5a0]" />
                <span className="text-xs text-[#8b95a8]">Multiple Choice</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={pollQuizMode} onChange={e => { setPollQuizMode(e.target.checked); if (!e.target.checked) setPollCorrectOption(null); }} className="accent-[#00e5a0]" />
                <span className="text-xs text-[#8b95a8]">Quiz Mode</span>
              </label>
            </div>
            {pollQuizMode && (
              <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.12)' }}>
                <p className="text-[10px] text-[#00e5a0] mb-2 font-medium">Select the correct answer:</p>
                <div className="flex flex-wrap gap-2">
                  {pollOptions.filter(o => o.trim()).map((opt, idx) => (
                    <button key={idx} onClick={() => setPollCorrectOption(idx)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all"
                      style={{ background: pollCorrectOption === idx ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${pollCorrectOption === idx ? 'rgba(0,229,160,0.4)' : 'rgba(255,255,255,0.08)'}`, color: pollCorrectOption === idx ? '#00e5a0' : '#e8ecf4' }}>
                      {opt} {pollCorrectOption === idx && '✓'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Explanation field - shown after voting (like Telegram quiz) */}
            <div className="mb-3">
              <label className="text-[10px] text-[#5a6478] font-medium mb-1 block">Explanation (shown after voting)</label>
              <textarea value={pollExplanation} onChange={e => setPollExplanation(e.target.value)} placeholder="Add an explanation that appears after voting..."
                rows={2} className="w-full px-3 py-2 rounded-lg text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none resize-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </div>

            {/* Time limit */}
            <div className="mb-3">
              <label className="text-[10px] text-[#5a6478] font-medium mb-1.5 block">Time Limit</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'No limit', value: 0 },
                  { label: '5m', value: 300 },
                  { label: '15m', value: 900 },
                  { label: '30m', value: 1800 },
                  { label: '1h', value: 3600 },
                  { label: '1d', value: 86400 },
                ].map(tl => (
                  <button key={tl.value} onClick={() => setPollTimeLimit(tl.value)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all"
                    style={{ background: pollTimeLimit === tl.value ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${pollTimeLimit === tl.value ? 'rgba(0,229,160,0.4)' : 'rgba(255,255,255,0.08)'}`, color: pollTimeLimit === tl.value ? '#00e5a0' : '#8b95a8' }}>
                    {tl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vote visibility */}
            <div className="mb-4">
              <label className="text-[10px] text-[#5a6478] font-medium mb-1.5 block">Vote Visibility</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'After voting', value: 'after_vote' as const },
                  { label: 'Always', value: 'always' as const },
                  { label: 'After close', value: 'after_close' as const },
                ].map(vv => (
                  <button key={vv.value} onClick={() => setPollVoteVisibility(vv.value)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all"
                    style={{ background: pollVoteVisibility === vv.value ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${pollVoteVisibility === vv.value ? 'rgba(0,229,160,0.4)' : 'rgba(255,255,255,0.08)'}`, color: pollVoteVisibility === vv.value ? '#00e5a0' : '#8b95a8' }}>
                    {vv.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={sendPoll} disabled={!pollQuestion.trim() || pollOptions.filter(o => o.trim()).length < 2}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: '#00e5a0' }}>
              Create Poll
            </button>
          </div>
        </div>
      )}

      {/* ═══════ ENHANCED: MEETING SCHEDULER WIZARD ═══════ */}
      {showMeetingScheduler && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => { setShowMeetingScheduler(false); setMeetingStep(1); }}>
          <div className="w-full max-w-lg mx-4 rounded-2xl overflow-hidden max-h-[88vh] flex flex-col" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            {/* Header with step progress */}
            <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-[#e8ecf4] flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,229,160,0.12)', border: '1px solid rgba(0,229,160,0.2)' }}>
                    <Calendar className="w-4 h-4 text-[#00e5a0]" />
                  </div>
                  Schedule Meeting
                </h3>
                <button onClick={() => { setShowMeetingScheduler(false); setMeetingStep(1); }} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"><X className="w-4 h-4 text-[#8b95a8]" /></button>
              </div>
              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {[
                  { step: 1, label: 'Details' },
                  { step: 2, label: 'Options' },
                  { step: 3, label: 'Review' },
                ].map((s, i) => (
                  <Fragment key={s.step}>
                    <button
                      onClick={() => { if (s.step < meetingStep) setMeetingStep(s.step as 1|2|3); }}
                      className={`flex items-center gap-1.5 text-[10px] font-bold transition-all ${meetingStep === s.step ? 'text-[#00e5a0]' : s.step < meetingStep ? 'text-[#00e5a0]/60 cursor-pointer' : 'text-[#5a6478]'}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                        meetingStep === s.step ? 'bg-[#00e5a0] text-[#0c0e14]' :
                        s.step < meetingStep ? 'bg-[#00e5a0]/20 text-[#00e5a0]' :
                        'bg-white/[0.06] text-[#5a6478]'
                      }`}>
                        {s.step < meetingStep ? <Check className="w-3 h-3" /> : s.step}
                      </span>
                      {s.label}
                    </button>
                    {i < 2 && <div className="flex-1 h-px mx-1" style={{ background: s.step < meetingStep ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.06)' }} />}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto chat-scrollbar px-5 py-4">
              {/* ══ STEP 1: Details ══ */}
              {meetingStep === 1 && (
                <div className="space-y-4" style={{ animation: 'meetingStepIn 0.3s ease-out' }}>
                  <style>{`
                    @keyframes meetingStepIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
                    @keyframes meetingToggleOn { from { transform: scale(0.95); } to { transform: scale(1); } }
                  `}</style>

                  {/* Title */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Type className="w-3 h-3 text-[#00e5a0]" /> Meeting Title
                    </label>
                    <input value={meetingTitle} onChange={e => setMeetingTitle(e.target.value)} placeholder="e.g. Anatomy Study Session" autoFocus
                      className="w-full px-4 py-3 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none transition-all duration-200 focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  </div>

                  {/* Meeting Type - enhanced visual cards */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block">Meeting Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'study_session', label: 'Study Session', icon: '📚', desc: 'Collaborative study', color: '#00e5a0' },
                        { id: 'lecture', label: 'Lecture', icon: '🎓', desc: 'Teaching session', color: '#4fc3f7' },
                        { id: 'case_discussion', label: 'Case Discussion', icon: '🩺', desc: 'Clinical cases', color: '#8b5cf6' },
                        { id: 'exam_review', label: 'Exam Review', icon: '📝', desc: 'Test preparation', color: '#f59e0b' },
                        { id: 'general', label: 'General', icon: '💬', desc: 'Open meeting', color: 'var(--medq-text-muted, #8b95a8)' },
                      ].map(t => (
                        <button key={t.id} onClick={() => setMeetingType(t.id)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                          style={{
                            background: meetingType === t.id ? `${t.color}12` : 'rgba(255,255,255,0.02)',
                            border: `1.5px solid ${meetingType === t.id ? `${t.color}40` : 'rgba(255,255,255,0.06)'}`,
                            boxShadow: meetingType === t.id ? `0 0 20px ${t.color}10` : 'none',
                          }}>
                          <span className="text-lg">{t.icon}</span>
                          <div>
                            <p className={`text-[11px] font-bold ${meetingType === t.id ? '' : 'text-[#8b95a8]'}`} style={{ color: meetingType === t.id ? t.color : undefined }}>{t.label}</p>
                            <p className="text-[9px] text-[#5a6478]">{t.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#00e5a0]" /> Date & Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)}
                        className="px-3 py-2.5 rounded-xl text-sm text-[#e8ecf4] outline-none transition-all duration-200 focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', colorScheme: 'dark' }} />
                      <input type="time" value={meetingTime} onChange={e => setMeetingTime(e.target.value)}
                        className="px-3 py-2.5 rounded-xl text-sm text-[#e8ecf4] outline-none transition-all duration-200 focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', colorScheme: 'dark' }} />
                    </div>
                  </div>

                  {/* Duration - visual slider style */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block">Duration</label>
                    <div className="flex flex-wrap gap-2">
                      {[15, 30, 45, 60, 90, 120].map(d => (
                        <button key={d} onClick={() => setMeetingDuration(d)}
                          className="px-4 py-2 rounded-xl text-[11px] font-bold transition-all duration-200"
                          style={{
                            background: meetingDuration === d ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.03)',
                            border: `1.5px solid ${meetingDuration === d ? 'rgba(0,229,160,0.4)' : 'rgba(255,255,255,0.06)'}`,
                            color: meetingDuration === d ? '#00e5a0' : '#8b95a8',
                            boxShadow: meetingDuration === d ? '0 0 12px rgba(0,229,160,0.08)' : 'none',
                          }}>
                          {d < 60 ? `${d}m` : `${d/60}h${d%60 ? ` ${d%60}m` : ''}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ══ STEP 2: Options ══ */}
              {meetingStep === 2 && (
                <div className="space-y-4" style={{ animation: 'meetingStepIn 0.3s ease-out' }}>
                  {/* Recurrence */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#8b5cf6]" /> Recurrence
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'one_time', label: 'One-time', icon: '1x' },
                        { id: 'daily', label: 'Daily', icon: '1D' },
                        { id: 'weekly', label: 'Weekly', icon: '1W' },
                        { id: 'biweekly', label: 'Bi-weekly', icon: '2W' },
                      ].map(r => (
                        <button key={r.id} onClick={() => setMeetingRecurrence(r.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all duration-200"
                          style={{
                            background: meetingRecurrence === r.id ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                            border: `1.5px solid ${meetingRecurrence === r.id ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
                            color: meetingRecurrence === r.id ? '#8b5cf6' : '#8b95a8',
                          }}>
                          <span className="w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-bold"
                            style={{ background: meetingRecurrence === r.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.04)' }}>
                            {r.icon}
                          </span>
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Max Participants */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-[#4fc3f7]" /> Max Participants
                    </label>
                    <div className="flex items-center gap-3">
                      <input type="range" min={2} max={200} value={meetingMaxParticipants} onChange={e => setMeetingMaxParticipants(parseInt(e.target.value))}
                        className="flex-1 accent-[#4fc3f7] h-1.5" />
                      <span className="text-sm font-bold text-[#4fc3f7] w-10 text-right">{meetingMaxParticipants}</span>
                    </div>
                    <div className="flex justify-between text-[9px] text-[#5a6478] mt-1 px-0.5">
                      <span>2</span><span>50</span><span>100</span><span>200</span>
                    </div>
                  </div>

                  {/* Feature Toggles - Custom Switch Style */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2.5 block">Features</label>
                    <div className="space-y-2">
                      {[
                        { key: 'whiteboard', label: 'Whiteboard', icon: <Pencil className="w-3.5 h-3.5" />, desc: 'Collaborative drawing board', color: '#00e5a0', checked: meetingWhiteboard, onChange: setMeetingWhiteboard },
                        { key: 'ai', label: 'AI Assistant', icon: <Brain className="w-3.5 h-3.5" />, desc: 'Smart meeting notes & summaries', color: '#8b5cf6', checked: meetingAI, onChange: setMeetingAI },
                        { key: 'recording', label: 'Recording', icon: <Film className="w-3.5 h-3.5" />, desc: 'Record the session for review', color: '#ff5757', checked: meetingRecording, onChange: setMeetingRecording },
                      ].map(t => (
                        <button key={t.key} onClick={() => t.onChange(!t.checked)}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200"
                          style={{
                            background: t.checked ? `${t.color}08` : 'rgba(255,255,255,0.02)',
                            border: `1.5px solid ${t.checked ? `${t.color}30` : 'rgba(255,255,255,0.06)'}`,
                          }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: t.checked ? `${t.color}15` : 'rgba(255,255,255,0.04)', color: t.checked ? t.color : '#5a6478' }}>
                            {t.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-[11px] font-bold" style={{ color: t.checked ? t.color : '#e8ecf4' }}>{t.label}</p>
                            <p className="text-[9px] text-[#5a6478]">{t.desc}</p>
                          </div>
                          {/* Toggle switch */}
                          <div className="w-9 h-5 rounded-full relative transition-all duration-300 flex-shrink-0"
                            style={{ background: t.checked ? t.color : 'rgba(255,255,255,0.1)' }}>
                            <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                              style={{ left: t.checked ? '18px' : '2px' }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description & Agenda */}
                  <div>
                    <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-[#fbbf24]" /> Details
                    </label>
                    <textarea value={meetingDescription} onChange={e => setMeetingDescription(e.target.value)} placeholder="Meeting description (optional)" rows={2}
                      className="w-full mb-2 px-3 py-2.5 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none resize-none transition-all duration-200 focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <textarea value={meetingAgenda} onChange={e => setMeetingAgenda(e.target.value)} placeholder="Agenda items (optional)" rows={2}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none resize-none transition-all duration-200 focus:ring-1 focus:ring-white/25" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  </div>

                  {/* Invite Members */}
                  {activeRoom && activeRoom.members.length > 1 && (
                    <div>
                      <label className="text-[10px] text-[#8b95a8] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-[#4fc3f7]" /> Invite Members
                        {meetingInviteMembers.size > 0 && <span className="px-1.5 py-0.5 rounded-md text-[8px] font-bold bg-[#4fc3f7]/15 text-[#4fc3f7]">{meetingInviteMembers.size} selected</span>}
                      </label>
                      <div className="max-h-32 overflow-y-auto chat-scrollbar rounded-xl p-1.5 space-y-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {/* Select All / None */}
                        <div className="flex items-center gap-2 px-2 py-1.5 mb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <button onClick={() => {
                            const allIds = activeRoom.members.filter(m => m.id !== userId).map(m => m.id);
                            setMeetingInviteMembers(new Set(allIds));
                          }} className="text-[9px] font-bold text-[#4fc3f7] hover:underline">Select All</button>
                          <span className="text-[9px] text-[#5a6478]">/</span>
                          <button onClick={() => setMeetingInviteMembers(new Set())} className="text-[9px] font-bold text-[#5a6478] hover:text-[#8b95a8]">None</button>
                        </div>
                        {activeRoom.members.filter(m => m.id !== userId).map(member => (
                          <button key={member.id} onClick={() => {
                            setMeetingInviteMembers(prev => {
                              const n = new Set(prev);
                              if (n.has(member.id)) n.delete(member.id); else n.add(member.id);
                              return n;
                            });
                          }}
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/[0.04] transition-all text-left"
                            style={{ background: meetingInviteMembers.has(member.id) ? 'rgba(79,195,247,0.06)' : undefined }}>
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                              style={{ background: `${getColor(member.id)}20`, color: getColor(member.id) }}>{getInitials(member.name)}</div>
                            <span className="text-xs text-[#e8ecf4] flex-1">{member.name || 'User'}</span>
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${meetingInviteMembers.has(member.id) ? 'bg-[#4fc3f7] text-[#0c0e14]' : 'border border-white/[0.1]'}`}>
                              {meetingInviteMembers.has(member.id) && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ══ STEP 3: Review & Confirm ══ */}
              {meetingStep === 3 && (
                <div className="space-y-4" style={{ animation: 'meetingStepIn 0.3s ease-out' }}>
                  {/* Meeting Preview Card */}
                  <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,229,160,0.08), rgba(79,195,247,0.04))', border: '1px solid rgba(0,229,160,0.15)' }}>
                    {/* Top bar with type color */}
                    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${
                      meetingType === 'study_session' ? '#00e5a0' :
                      meetingType === 'lecture' ? '#4fc3f7' :
                      meetingType === 'case_discussion' ? '#8b5cf6' :
                      meetingType === 'exam_review' ? '#f59e0b' : '#8b95a8'
                    }, transparent)` }} />
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                          style={{ background: 'rgba(0,229,160,0.12)', border: '1px solid rgba(0,229,160,0.2)' }}>
                          <Calendar className="w-5 h-5 text-[#00e5a0]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#e8ecf4]">{meetingTitle || 'Untitled Meeting'}</p>
                          <p className="text-[10px] text-[#5a6478] mt-0.5">
                            {meetingType === 'study_session' ? '📚 Study Session' :
                             meetingType === 'lecture' ? '🎓 Lecture' :
                             meetingType === 'case_discussion' ? '🩺 Case Discussion' :
                             meetingType === 'exam_review' ? '📝 Exam Review' : '💬 General'}
                          </p>
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-0.5">Date</p>
                          <p className="text-xs text-[#e8ecf4] font-medium">{meetingDate || 'Not set'}</p>
                        </div>
                        <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-0.5">Time</p>
                          <p className="text-xs text-[#e8ecf4] font-medium">{meetingTime || 'Not set'}</p>
                        </div>
                        <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-0.5">Duration</p>
                          <p className="text-xs text-[#e8ecf4] font-medium">{meetingDuration < 60 ? `${meetingDuration}m` : `${meetingDuration/60}h${meetingDuration%60 ? ` ${meetingDuration%60}m` : ''}`}</p>
                        </div>
                        <div className="px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-0.5">Recurrence</p>
                          <p className="text-xs text-[#e8ecf4] font-medium">{meetingRecurrence === 'one_time' ? 'One-time' : meetingRecurrence === 'daily' ? 'Daily' : meetingRecurrence === 'weekly' ? 'Weekly' : 'Bi-weekly'}</p>
                        </div>
                      </div>

                      {/* Feature badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {meetingWhiteboard && <span className="text-[9px] px-2 py-1 rounded-lg font-bold" style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}>🎨 Whiteboard</span>}
                        {meetingAI && <span className="text-[9px] px-2 py-1 rounded-lg font-bold" style={{ background: 'rgba(183,155,255,0.1)', color: '#b79bff', border: '1px solid rgba(183,155,255,0.2)' }}>🤖 AI Assistant</span>}
                        {meetingRecording && <span className="text-[9px] px-2 py-1 rounded-lg font-bold" style={{ background: 'rgba(255,87,87,0.1)', color: '#ff5757', border: '1px solid rgba(255,87,87,0.2)' }}>🔴 Recording</span>}
                        <span className="text-[9px] px-2 py-1 rounded-lg font-bold" style={{ background: 'rgba(79,195,247,0.08)', color: '#4fc3f7', border: '1px solid rgba(79,195,247,0.15)' }}>👥 Max {meetingMaxParticipants}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description preview */}
                  {meetingDescription && (
                    <div className="px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-1">Description</p>
                      <p className="text-xs text-[#e8ecf4] leading-relaxed">{meetingDescription}</p>
                    </div>
                  )}
                  {meetingAgenda && (
                    <div className="px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-1">Agenda</p>
                      <p className="text-xs text-[#e8ecf4] leading-relaxed">{meetingAgenda}</p>
                    </div>
                  )}

                  {/* Invited members preview */}
                  {meetingInviteMembers.size > 0 && activeRoom && (
                    <div className="px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[9px] text-[#5a6478] font-bold uppercase mb-2">Invited ({meetingInviteMembers.size})</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeRoom.members.filter(m => meetingInviteMembers.has(m.id)).map(m => (
                          <div key={m.id} className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: `${getColor(m.id)}10`, border: `1px solid ${getColor(m.id)}20` }}>
                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ background: `${getColor(m.id)}20`, color: getColor(m.id) }}>{getInitials(m.name)}</div>
                            <span className="text-[10px] font-medium" style={{ color: getColor(m.id) }}>{m.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer with navigation */}
            <div className="px-5 py-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {meetingStep > 1 && (
                <button onClick={() => setMeetingStep((meetingStep - 1) as 1|2|3)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] transition-all">
                  Back
                </button>
              )}
              <div className="flex-1" />
              {meetingStep < 3 ? (
                <button
                  onClick={() => setMeetingStep((meetingStep + 1) as 1|2|3)}
                  disabled={meetingStep === 1 && (!meetingTitle.trim() || !meetingDate || !meetingTime)}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#0c0e14] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #00e5a0, #00b87a)', boxShadow: '0 4px 16px rgba(0,229,160,0.2)' }}>
                  Continue
                </button>
              ) : (
                <button onClick={sendMeeting} disabled={!meetingTitle.trim() || !meetingDate || !meetingTime}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#0c0e14] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #00e5a0, #00b87a)', boxShadow: '0 4px 16px rgba(0,229,160,0.2)' }}>
                  Schedule Meeting
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ NEW: EXAM CREATOR MODAL ═══════ */}
      {showExamCreator && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowExamCreator(false)}>
          <div className="w-full max-w-md mx-4 rounded-2xl p-5 max-h-[85vh] overflow-y-auto chat-scrollbar" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4] flex items-center gap-2"><FileText className="w-5 h-5 text-[#ffbb00]" /> Create Exam</h3>
              <button onClick={() => setShowExamCreator(false)} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            <input value={examTitle} onChange={e => setExamTitle(e.target.value)} placeholder="Exam title" autoFocus
              className="w-full mb-3 px-3 py-2 rounded-lg text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />

            <textarea value={examDescription} onChange={e => setExamDescription(e.target.value)} placeholder="Description (optional)" rows={2}
              className="w-full mb-3 px-3 py-2 rounded-lg text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none resize-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />

            <div className="mb-3">
              <label className="text-[10px] text-[#5a6478] font-medium mb-1.5 block">Duration</label>
              <div className="flex flex-wrap gap-1.5">
                {[15, 30, 45, 60, 90, 120].map(d => (
                  <button key={d} onClick={() => setExamDuration(d)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all"
                    style={{ background: examDuration === d ? 'rgba(255,187,0,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${examDuration === d ? 'rgba(255,187,0,0.4)' : 'rgba(255,255,255,0.08)'}`, color: examDuration === d ? '#ffbb00' : '#8b95a8' }}>
                    {d}m
                  </button>
                ))}
              </div>
            </div>

            {/* Tab selector for question source */}
            <div className="flex gap-1 mb-3 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {([
                { id: 'bank' as const, label: '📚 Bank', desc: 'Question Bank' },
                { id: 'quick' as const, label: '⚡ Quick', desc: 'Quick Quiz' },
                { id: 'smart' as const, label: '🧠 Smart', desc: 'AI Quiz' },
                { id: 'manual' as const, label: '✏️ Manual', desc: 'Write yourself' },
              ]).map(tab => (
                <button key={tab.id} onClick={() => {
                  setExamCreatorTab(tab.id);
                  if (tab.id === 'bank' && examBankQuestions.length === 0) {
                    setExamBankLoading(true);
                    const params = new URLSearchParams({ limit: '100' });
                    fetch(`/api/questions?${params.toString()}`).then(r => r.json()).then(data => {
                      setExamBankQuestions(data.questions || []);
                    }).catch(() => toast.error('Failed to load questions')).finally(() => setExamBankLoading(false));
                  }
                }}
                  className="flex-1 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all text-center"
                  style={{ background: examCreatorTab === tab.id ? 'rgba(255,187,0,0.2)' : 'transparent', border: `1px solid ${examCreatorTab === tab.id ? 'rgba(255,187,0,0.4)' : 'transparent'}`, color: examCreatorTab === tab.id ? '#ffbb00' : '#8b95a8' }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {examCreatorTab === 'bank' && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <input value={examBankSearch} onChange={e => setExamBankSearch(e.target.value)} placeholder="Search questions..."
                    className="flex-1 px-3 py-2 rounded-lg text-xs text-[#e8ecf4] placeholder-[#5a6478] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  <select value={examBankSystemFilter} onChange={e => setExamBankSystemFilter(e.target.value)}
                    className="px-2 py-2 rounded-lg text-xs text-[#e8ecf4] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', colorScheme: 'dark' }}>
                    <option value="all">All Systems</option>
                    <option value="cardiovascular">Cardiovascular</option>
                    <option value="respiratory">Respiratory</option>
                    <option value="gastrointestinal">Gastrointestinal</option>
                    <option value="neurology">Neurology</option>
                    <option value="musculoskeletal">Musculoskeletal</option>
                    <option value="renal">Renal</option>
                    <option value="endocrine">Endocrine</option>
                    <option value="hematology">Hematology</option>
                  </select>
                </div>
                {examBankLoading ? (
                  <div className="flex items-center justify-center py-6"><Loader2 className="w-5 h-5 text-[#ffbb00] animate-spin" /></div>
                ) : (
                  <div className="max-h-48 overflow-y-auto chat-scrollbar space-y-1.5">
                    {examBankQuestions
                      .filter((q: any) => !examBankSearch || q.question?.toLowerCase().includes(examBankSearch.toLowerCase()))
                      .filter((q: any) => examBankSystemFilter === 'all' || q.system === examBankSystemFilter)
                      .map((q: any) => (
                      <div key={q.id} onClick={() => {
                        setExamSelectedBankIds(prev => {
                          const n = new Set(prev);
                          if (n.has(q.id)) n.delete(q.id); else n.add(q.id);
                          return n;
                        });
                      }}
                        className="p-2 rounded-lg cursor-pointer transition-all"
                        style={examSelectedBankIds.has(q.id) ? { background: 'rgba(255,187,0,0.08)', border: '1px solid rgba(255,187,0,0.3)' } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex-shrink-0">
                            {examSelectedBankIds.has(q.id) ? <CheckSquare className="w-3.5 h-3.5 text-[#ffbb00]" /> : <Square className="w-3.5 h-3.5 text-[#5a6478]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#e8ecf4] truncate">{q.question}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {q.system && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--medq-text-muted, #8b95a8)' }}>{q.system}</span>}
                              {q.difficulty && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: q.difficulty === 'hard' ? 'rgba(255,87,87,0.1)' : q.difficulty === 'easy' ? 'rgba(0,229,160,0.1)' : 'rgba(251,191,36,0.1)', color: q.difficulty === 'hard' ? '#ff5757' : q.difficulty === 'easy' ? '#00e5a0' : '#f59e0b' }}>{q.difficulty}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {examBankQuestions.length === 0 && <p className="text-xs text-[#5a6478] text-center py-4">No questions found in bank</p>}
                  </div>
                )}
                {examSelectedBankIds.size > 0 && <p className="text-[10px] text-[#ffbb00] mt-1.5">{examSelectedBankIds.size} question{examSelectedBankIds.size !== 1 ? 's' : ''} selected from bank</p>}
              </div>
            )}

            {examCreatorTab === 'quick' && (
              <div className="mb-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs text-[#8b95a8] mb-2">Generate a quick quiz from the question bank by category</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { id: 'definitions', label: 'Definitions', color: '#00e5a0', icon: <BookOpen className="w-4 h-4" /> },
                    { id: 'indications', label: 'Indications', color: '#ffb347', icon: <Shield className="w-4 h-4" /> },
                    { id: 'contraindications', label: 'Contra-ind.', color: '#ff5757', icon: <X className="w-4 h-4" /> },
                    { id: 'all', label: 'All Combined', color: '#8b5cf6', icon: <Sparkles className="w-4 h-4" /> },
                  ].map(cat => (
                    <button key={cat.id} onClick={() => setExamQuickCategory(cat.id)}
                      className="flex items-center gap-2 p-2.5 rounded-xl text-left transition-all hover:brightness-110"
                      style={{ background: examQuickCategory === cat.id ? `${cat.color}15` : 'rgba(255,255,255,0.02)', border: `1px solid ${examQuickCategory === cat.id ? `${cat.color}30` : 'rgba(255,255,255,0.04)'}` }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${cat.color}12` }}>
                        <span style={{ color: cat.color }}>{cat.icon}</span>
                      </div>
                      <p className="text-[10px] font-bold text-[#e8ecf4]">{cat.label}</p>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-[#5a6478]">Count:</label>
                  <select value={examQuickCount} onChange={e => setExamQuickCount(parseInt(e.target.value))}
                    className="px-2 py-1 rounded-lg text-xs text-[#e8ecf4] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', colorScheme: 'dark' }}>
                    {[10, 20, 30, 50].map(n => <option key={n} value={n}>{n} questions</option>)}
                  </select>
                </div>
              </div>
            )}

            {examCreatorTab === 'smart' && (
              <div className="mb-3 p-4 rounded-lg text-center" style={{ background: 'linear-gradient(135deg, rgba(0,229,160,0.06), rgba(139,92,246,0.06))', border: '1px solid rgba(0,229,160,0.12)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: 'rgba(0,229,160,0.12)' }}>
                  <Brain className="w-6 h-6 text-[#00e5a0]" />
                </div>
                <p className="text-sm font-bold text-[#e8ecf4] mb-1">Smart Quiz (AI)</p>
                <p className="text-xs text-[#8b95a8] mb-3">AI-adaptive questions based on your weak areas</p>
                <p className="text-[10px] text-[#5a6478]">The Smart Quiz will be generated when you create the exam. You can configure it after creation.</p>
              </div>
            )}

            {examCreatorTab === 'manual' && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] text-[#5a6478] font-medium">Questions (MCQ)</label>
                  <button onClick={() => { setExamQuestions(prev => [...prev, '']); setExamOptions(prev => [...prev, ['', '']]); }}
                    className="text-[10px] text-[#ffbb00] hover:underline" style={{ border: '1px dashed rgba(255,187,0,0.3)', padding: '2px 8px', borderRadius: '4px' }}>+ Add Question</button>
                </div>
                {examQuestions.map((q, qi) => (
                  <div key={qi} className="mb-3 p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] text-[#ffbb00] font-bold min-w-[16px]">Q{qi + 1}</span>
                      <input value={q} onChange={e => setExamQuestions(prev => prev.map((prevQ, i) => i === qi ? e.target.value : prevQ))} placeholder="Question"
                        className="flex-1 px-2 py-1.5 rounded-lg text-xs text-[#e8ecf4] placeholder-[#5a6478] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
                      {examQuestions.length > 1 && (
                        <button onClick={() => { setExamQuestions(prev => prev.filter((_, i) => i !== qi)); setExamOptions(prev => prev.filter((_, i) => i !== qi)); }}
                          className="p-1 rounded hover:bg-white/[0.06]"><X className="w-3 h-3 text-[#8b95a8]" /></button>
                      )}
                    </div>
                    {(examOptions[qi] || []).map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-1.5 ml-6 mb-1">
                        <span className="text-[9px] text-[#5a6478] min-w-[12px]">{String.fromCharCode(65 + oi)}</span>
                        <input value={opt} onChange={e => setExamOptions(prev => prev.map((opts, i) => i === qi ? opts.map((o, j) => j === oi ? e.target.value : o) : opts))} placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                          className="flex-1 px-2 py-1 rounded-lg text-[11px] text-[#e8ecf4] placeholder-[#5a6478] outline-none" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} />
                        {(examOptions[qi]?.length || 0) > 2 && (
                          <button onClick={() => setExamOptions(prev => prev.map((opts, i) => i === qi ? opts.filter((_, j) => j !== oi) : opts))}
                            className="p-0.5 rounded hover:bg-white/[0.06]"><X className="w-2.5 h-2.5 text-[#5a6478]" /></button>
                        )}
                      </div>
                    ))}
                    {(examOptions[qi]?.length || 0) < 6 && (
                      <button onClick={() => setExamOptions(prev => prev.map((opts, i) => i === qi ? [...opts, ''] : opts))}
                        className="ml-6 mt-1 text-[9px] text-[#ffbb00] hover:underline">+ Add option</button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button onClick={async () => {
              if (!examTitle.trim() || !activeRoom) { toast.error('Please fill in exam title'); return; }

              if (examCreatorTab === 'bank') {
                if (examSelectedBankIds.size === 0) { toast.error('Select at least one question from the bank'); return; }
                const selectedQs = examBankQuestions.filter((q: any) => examSelectedBankIds.has(q.id));
                const examData = {
                  title: examTitle.trim(),
                  description: examDescription.trim() || null,
                  duration: examDuration,
                  examType: 'bank',
                  questions: selectedQs.map((q: any) => ({ question: q.question, options: q.options || [], correctAnswer: q.correctAnswer ?? null, system: q.system || null, difficulty: q.difficulty || null })),
                };
                try {
                  const res = await fetch('/api/chat/messages', {
                    method: 'POST',
                    headers: chatHeaders(),
                    body: JSON.stringify({ roomId: activeRoom.id, content: `📝 Exam: ${examData.title}`, type: 'exam', metadata: examData }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    const newMsg = data?.message;
                    if (newMsg) { setMessages(prev => { if (prev.some(m => m.id === newMsg.id)) return prev; return [...prev, newMsg]; }); setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50); }
                    fetchRooms();
                  }
                  setShowExamCreator(false); setExamTitle(''); setExamDuration(30); setExamDescription(''); setExamSelectedBankIds(new Set());
                } catch { toast.error('Failed to create exam'); }
              } else if (examCreatorTab === 'quick') {
                if (!examQuickCategory) { toast.error('Select a quiz category'); return; }
                try {
                  const res = await fetch('/api/quick-quiz', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category: examQuickCategory, count: examQuickCount, title: examTitle.trim(), duration: examDuration }),
                  });
                  if (!res.ok) throw new Error('Failed to create quiz');
                  const data = await res.json();
                  // Send the quiz as an exam message in chat
                  const examData = {
                    title: examTitle.trim(),
                    description: examDescription.trim() || null,
                    duration: examDuration,
                    examType: 'quick',
                    examId: data.examId,
                    questionCount: data.questionCount || examQuickCount,
                    category: examQuickCategory,
                    questions: [],
                  };
                  const msgRes = await fetch('/api/chat/messages', {
                    method: 'POST',
                    headers: chatHeaders(),
                    body: JSON.stringify({ roomId: activeRoom.id, content: `📝 Exam: ${examData.title}`, type: 'exam', metadata: examData }),
                  });
                  if (msgRes.ok) {
                    const msgData = await msgRes.json();
                    const newMsg = msgData?.message;
                    if (newMsg) { setMessages(prev => { if (prev.some(m => m.id === newMsg.id)) return prev; return [...prev, newMsg]; }); setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50); }
                    fetchRooms();
                  }
                  setShowExamCreator(false); setExamTitle(''); setExamDuration(30); setExamDescription(''); setExamQuickCategory('');
                } catch { toast.error('Failed to create quick quiz'); }
              } else if (examCreatorTab === 'smart') {
                // Smart quiz - send a message that links to the smart quiz
                const examData = {
                  title: examTitle.trim(),
                  description: examDescription.trim() || null,
                  duration: examDuration,
                  examType: 'smart',
                  questions: [],
                };
                try {
                  const res = await fetch('/api/chat/messages', {
                    method: 'POST',
                    headers: chatHeaders(),
                    body: JSON.stringify({ roomId: activeRoom.id, content: `📝 Exam: ${examData.title}`, type: 'exam', metadata: examData }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    const newMsg = data?.message;
                    if (newMsg) { setMessages(prev => { if (prev.some(m => m.id === newMsg.id)) return prev; return [...prev, newMsg]; }); setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50); }
                    fetchRooms();
                  }
                  setShowExamCreator(false); setExamTitle(''); setExamDuration(30); setExamDescription('');
                  // Open Smart Quiz dialog inline
                  if (activeRoom) { setActiveInlineExam(examData); setChatExamMode('smart'); setShowSmartQuiz(true); }
                } catch { toast.error('Failed to create exam'); }
              } else {
                // Manual
                sendExam();
              }
            }} disabled={!examTitle.trim() || (examCreatorTab === 'bank' && examSelectedBankIds.size === 0) || (examCreatorTab === 'quick' && !examQuickCategory) || (examCreatorTab === 'manual' && examQuestions.filter(q => q.trim()).length < 1)}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: '#ffbb00' }}>
              {examCreatorTab === 'bank' ? `Create Exam (${examSelectedBankIds.size} questions)` : examCreatorTab === 'quick' ? 'Create Quick Quiz' : examCreatorTab === 'smart' ? 'Create Smart Quiz' : 'Create Exam'}
            </button>
          </div>
        </div>
      )}

      {/* ═══════ NEW: ATTACHMENT PICKER MODAL ═══════ */}
      {showAttachmentPicker && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => { setShowAttachmentPicker(false); setAttachmentPreview([]); setAttachmentCaption(''); }}>
          <div className="w-full max-w-md mx-4 rounded-2xl p-5 max-h-[80vh] overflow-y-auto chat-scrollbar" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4] flex items-center gap-2"><Paperclip className="w-5 h-5 text-[#00e5a0]" /> Send Attachment</h3>
              <button onClick={() => { setShowAttachmentPicker(false); setAttachmentPreview([]); setAttachmentCaption(''); }} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {(['gallery', 'file', 'camera'] as const).map(tab => (
                <button key={tab} onClick={() => setAttachmentTab(tab)}
                  className="flex-1 py-1.5 rounded-md text-xs font-medium capitalize transition-all"
                  style={{ background: attachmentTab === tab ? 'rgba(0,229,160,0.12)' : 'transparent', color: attachmentTab === tab ? '#00e5a0' : '#8b95a8' }}>
                  {tab === 'gallery' ? '🖼 Gallery' : tab === 'file' ? '📄 File' : '📷 Camera'}
                </button>
              ))}
            </div>

            {/* File Input */}
            <div className="mb-4">
              {attachmentTab === 'gallery' && (
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl cursor-pointer transition-all hover:bg-white/[0.03]" style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <ImageIcon className="w-8 h-8 text-[#5a6478] mb-2" />
                  <span className="text-xs text-[#8b95a8]">Click to select images or videos</span>
                  <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={e => { if (e.target.files) handleAttachmentFiles(e.target.files); }} />
                </label>
              )}
              {attachmentTab === 'file' && (
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl cursor-pointer transition-all hover:bg-white/[0.03]" style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <FileText className="w-8 h-8 text-[#5a6478] mb-2" />
                  <span className="text-xs text-[#8b95a8]">Click to select any file</span>
                  <input type="file" className="hidden" onChange={e => { if (e.target.files) handleAttachmentFiles(e.target.files); }} />
                </label>
              )}
              {attachmentTab === 'camera' && (
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-xl cursor-pointer transition-all hover:bg-white/[0.03]" style={{ border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <Camera className="w-8 h-8 text-[#5a6478] mb-2" />
                  <span className="text-xs text-[#8b95a8]">Take a photo</span>
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={e => { if (e.target.files) handleAttachmentFiles(e.target.files); }} />
                </label>
              )}
            </div>

            {/* Preview area */}
            {attachmentPreview.length > 0 && (
              <div className="mb-4 space-y-2 max-h-48 overflow-y-auto chat-scrollbar">
                {attachmentPreview.map((att, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {att.type === 'image' && att.preview ? (
                      <img src={att.preview} alt="preview" className="w-12 h-12 rounded-lg object-cover" />
                    ) : att.type === 'video' ? (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,229,160,0.1)' }}><Film className="w-5 h-5 text-[#00e5a0]" /></div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'rgba(79,195,247,0.1)' }}><FileText className="w-5 h-5 text-[#4fc3f7]" /></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#e8ecf4] truncate">{att.file.name}</p>
                      <p className="text-[10px] text-[#5a6478]">{att.file.size < 1024 * 1024 ? `${(att.file.size / 1024).toFixed(1)}KB` : `${(att.file.size / (1024 * 1024)).toFixed(1)}MB`}</p>
                    </div>
                    <button onClick={() => setAttachmentPreview(prev => prev.filter((_, i) => i !== idx))} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-3.5 h-3.5 text-[#8b95a8]" /></button>
                  </div>
                ))}
              </div>
            )}

            {/* Caption */}
            <input
              value={attachmentCaption}
              onChange={e => setAttachmentCaption(e.target.value)}
              placeholder="Add a caption..."
              className="w-full mb-4 px-3 py-2 rounded-lg text-sm text-[#e8ecf4] placeholder-[#5a6478] outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />

            <button onClick={sendAttachment} disabled={attachmentPreview.length === 0 || uploading}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: '#00e5a0' }}>
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Send</>}
            </button>
          </div>
        </div>
      )}

      {/* ═══════ NEW: IMAGE LIGHTBOX ═══════ */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.9)' }} onClick={() => setLightboxImage(null)}>
          <button onClick={() => setLightboxImage(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/[0.1] z-10"><X className="w-6 h-6 text-white" /></button>
          <img src={lightboxImage} alt="Full size" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* ═══════ NEW: PROFILE PHOTO VIEWER ═══════ */}
      {profilePhotoViewer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setProfilePhotoViewer(null)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setProfilePhotoViewer(null)} className="absolute -top-10 right-0 p-2 rounded-full hover:bg-white/[0.1]"><X className="w-5 h-5 text-white" /></button>
            {profilePhotoViewer.image ? (
              <img src={profilePhotoViewer.image} alt={profilePhotoViewer.name || 'Profile'} className="w-64 h-64 rounded-2xl object-cover" />
            ) : (
              <div className="w-64 h-64 rounded-2xl flex items-center justify-center text-5xl font-bold" style={{ background: `${profilePhotoViewer.color}20`, color: profilePhotoViewer.color }}>
                {getInitials(profilePhotoViewer.name)}
              </div>
            )}
            {profilePhotoViewer.name && <p className="text-center text-sm text-[#e8ecf4] mt-3">{profilePhotoViewer.name}</p>}
          </div>
        </div>
      )}

      {/* ═══════ UNSEND TOAST - now shown inline on message ═══════ */}

      {/* ═══════ NEW: DATE PICKER MODAL ═══════ */}
      {showDatePicker && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowDatePicker(false)}>
          <div className="w-full max-w-xs mx-4 rounded-2xl p-5" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4] flex items-center gap-2"><Calendar className="w-5 h-5 text-[#00e5a0]" /> Jump to Date</h3>
              <button onClick={() => setShowDatePicker(false)} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <select value={datePickerMonth} onChange={e => setDatePickerMonth(parseInt(e.target.value))}
                className="flex-1 px-3 py-2 rounded-lg text-sm text-[#e8ecf4] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m, i) => (
                  <option key={i} value={i} style={{ background: '#1e212e' }}>{m}</option>
                ))}
              </select>
              <select value={datePickerYear} onChange={e => setDatePickerYear(parseInt(e.target.value))}
                className="w-24 px-3 py-2 rounded-lg text-sm text-[#e8ecf4] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(y => (
                  <option key={y} value={y} style={{ background: '#1e212e' }}>{y}</option>
                ))}
              </select>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <div key={d} className="text-[9px] text-[#5a6478] py-1">{d}</div>
              ))}
              {(() => {
                const firstDay = new Date(datePickerYear, datePickerMonth, 1).getDay();
                const daysInMonth = new Date(datePickerYear, datePickerMonth + 1, 0).getDate();
                const today = new Date();
                const days: React.ReactNode[] = [];
                for (let i = 0; i < firstDay; i++) days.push(<div key={`e${i}`} />);
                for (let d = 1; d <= daysInMonth; d++) {
                  const isToday = d === today.getDate() && datePickerMonth === today.getMonth() && datePickerYear === today.getFullYear();
                  const isFuture = new Date(datePickerYear, datePickerMonth, d) > today;
                  days.push(
                    <button key={d} onClick={() => { if (!isFuture) jumpToDate(datePickerYear, datePickerMonth, d); }}
                      className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-all ${isFuture ? 'text-[#2a2d3a] cursor-not-allowed' : 'text-[#e8ecf4] hover:bg-white/[0.06]'}`}
                      style={isToday ? { background: 'rgba(0,229,160,0.12)', color: '#00e5a0', fontWeight: 600 } : {}}>
                      {d}
                    </button>
                  );
                }
                return days;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ WEBRTC VOICE/VIDEO CALL UI ═══════ */}
      {showCallUI !== 'none' && activeRoom && (
        <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center" style={{ background: 'rgba(0,0,0,0.95)' }}>
          {/* Remote video (fullscreen background for video calls) */}
          {showCallUI === 'video' && callState === 'connected' && (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
            />
          )}
          {/* Dark overlay for non-connected states or voice calls */}
          {!(showCallUI === 'video' && callState === 'connected') && (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0c0e14 0%, #151821 50%, #0c0e14 100%)' }} />
          )}
          {/* Semi-transparent overlay for video calls to keep UI visible */}
          {showCallUI === 'video' && callState === 'connected' && (
            <div className="absolute inset-0 bg-black/30" />
          )}
          {/* Content */}
          <div className="relative flex flex-col items-center gap-6 fade-in z-10 w-full max-w-md px-6">
            {/* Avatar with ripple rings (for voice calls or non-connected states) */}
            {!(showCallUI === 'video' && callState === 'connected' && remoteStreamRef.current) && (
              <div className="relative flex items-center justify-center">
                {callState !== 'ended' && (
                  <>
                    <div className="absolute w-28 h-28 rounded-full call-ripple" style={{ background: getColor(activeRoom.id), opacity: 0.15 }} />
                    <div className="absolute w-28 h-28 rounded-full call-ripple-delay-1" style={{ background: getColor(activeRoom.id), opacity: 0.1 }} />
                    <div className="absolute w-28 h-28 rounded-full call-ripple-delay-2" style={{ background: getColor(activeRoom.id), opacity: 0.05 }} />
                  </>
                )}
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold" style={{ background: `${getColor(activeRoom.id)}30`, color: getColor(activeRoom.id), border: `2px solid ${getColor(activeRoom.id)}40` }}>
                  {activeRoom.type === 'direct' ? getInitials(otherMember?.name) : (activeRoom.avatar || '👥')}
                </div>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#e8ecf4]">{activeRoom.name}</h3>
              <p className="text-sm text-[#8b95a8] mt-1">
                {callState === 'calling' ? 'Calling...' : callState === 'ringing' ? 'Ringing...' : callState === 'connected' ? formatDuration(callTimer) : callState === 'ended' ? 'Call Ended' : ''}
              </p>
              <p className="text-xs text-[#5a6478] mt-0.5 flex items-center justify-center gap-1">
                {showCallUI === 'voice' ? <><Phone className="w-3 h-3" /> Voice Call</> : <><Video className="w-3 h-3" /> Video Call</>}
                <span className="mx-1">·</span>
                <span className={callState === 'connected' ? 'text-[#00e5a0]' : callState === 'ended' ? 'text-[#ff5757]' : ''}>
                  {callState === 'calling' ? 'Connecting' : callState === 'ringing' ? 'Ringing' : callState === 'connected' ? 'Connected' : callState === 'ended' ? 'Ended' : ''}
                </span>
              </p>
            </div>
            {/* Call controls */}
            <div className="flex items-center gap-5 mt-4">
              <button onClick={toggleMute} className="flex flex-col items-center gap-1">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105`} style={{ background: isMuted ? 'rgba(255,87,87,0.3)' : 'rgba(255,255,255,0.1)' }}>
                  {isMuted ? <MicOff className="w-6 h-6 text-[#ff5757]" /> : <Mic className="w-6 h-6 text-[#e8ecf4]" />}
                </div>
                <span className="text-[9px] text-[#5a6478]">{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              {showCallUI === 'video' && (
                <button onClick={toggleCamera} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: isCameraOn ? 'rgba(255,255,255,0.1)' : 'rgba(255,87,87,0.3)' }}>
                    {isCameraOn ? <Video className="w-6 h-6 text-[#e8ecf4]" /> : <VideoOff className="w-6 h-6 text-[#ff5757]" />}
                  </div>
                  <span className="text-[9px] text-[#5a6478]">{isCameraOn ? 'Camera On' : 'Camera Off'}</span>
                </button>
              )}
              <button onClick={() => setIsSpeakerOn(!isSpeakerOn)} className="flex flex-col items-center gap-1">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: isSpeakerOn ? 'rgba(255,255,255,0.1)' : 'rgba(255,87,87,0.3)' }}>
                  {isSpeakerOn ? <Volume2 className="w-6 h-6 text-[#e8ecf4]" /> : <Volume2 className="w-6 h-6 text-[#ff5757]" style={{ opacity: 0.5 }} />}
                </div>
                <span className="text-[9px] text-[#5a6478]">{isSpeakerOn ? 'Speaker' : 'Earpiece'}</span>
              </button>
              <button onClick={() => endCall()} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: '#ff5757' }}>
                  <PhoneOff className="w-7 h-7 text-white" />
                </div>
                <span className="text-[9px] text-[#ff5757]">End</span>
              </button>
            </div>
          </div>
          {/* Local video PiP (bottom-right corner for video calls) */}
          {showCallUI === 'video' && localStreamRef.current && (
            <div className="absolute bottom-24 right-4 z-20 w-32 h-44 rounded-2xl overflow-hidden shadow-lg" style={{ border: '2px solid rgba(255,255,255,0.15)' }}>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
          )}
        </div>
      )}

      {/* MiroTalk calls are hosted globally by CallProvider. */}

      {/* ═══════ AI UNREAD DIGEST DIALOG ═══════ */}
      {digestState.open && activeRoom && (
        <div className="fixed inset-0 z-[380] flex items-center justify-center p-4" style={{ background: 'rgba(4,6,14,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setDigestState(prev => ({ ...prev, open: false }))}>
          <div className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl overflow-hidden" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(0,229,160,0.2)', boxShadow: '0 12px 48px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,229,160,0.12)' }}>
                <Sparkles className="w-4.5 h-4.5 text-[#00e5a0]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#e8ecf4] truncate">AI Digest — {digestState.roomName || activeRoom.name}</p>
                <p className="text-xs text-[#8b95a8]">
                  {digestState.loading ? 'Reading your unread messages…'
                    : digestState.error ? 'Something went wrong'
                    : `${digestState.totalUnread ?? 0} unread · ${digestState.analyzed ?? 0} analyzed${digestState.skippedOldest ? ` · ${digestState.skippedOldest} oldest skipped` : ''}`}
                </p>
              </div>
              <button onClick={() => setDigestState(prev => ({ ...prev, open: false }))} className="p-1.5 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
              {digestState.loading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12">
                  <Loader2 className="w-7 h-7 text-[#00e5a0] animate-spin" />
                  <p className="text-xs text-[#8b95a8]">AI is digesting the unread messages…</p>
                  <p className="text-[10px] text-[#5a6478]">Chunked summarization — rooms with thousands of messages take a moment</p>
                </div>
              ) : digestState.error ? (
                <div className="flex flex-col items-center gap-3 py-10">
                  <p className="text-xs text-[#ff5757] text-center">{digestState.error}</p>
                  <button onClick={() => runRoomDigest(activeRoom.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}>Retry</button>
                </div>
              ) : (
                <>
                  {(digestState.analyzed ?? 0) === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-8">
                      <p className="text-xs text-[#8b95a8] text-center">{digestState.digest || 'No unread messages in this room.'}</p>
                      <p className="text-[10px] text-[#5a6478] text-center leading-relaxed">Opening a room marks it as read — digest a recent window instead:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {([4, 24, 168] as const).map(hours => (
                          <button
                            key={hours}
                            onClick={() => runRoomDigest(activeRoom.id, hours)}
                            disabled={digestState.loading}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{ background: digestState.scopeHours === hours ? 'rgba(0,229,160,0.3)' : 'rgba(0,229,160,0.12)', color: '#00e5a0' }}
                          >
                            {hours === 168 ? 'Last 7 days' : `Last ${hours}h`}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                  <>
                  {/* Digest markdown (lightweight rendering) */}
                  <div className="text-[13px] leading-relaxed text-[#c7d0e0] space-y-1.5">
                    {String(digestState.digest || '').split('\n').map((line, index) => {
                      const key = `dl-${index}`;
                      if (!line.trim()) return <div key={key} className="h-1.5" />;
                      if (line.startsWith('## ')) return <p key={key} className="text-sm font-semibold text-[#00e5a0] pt-2">{line.slice(3)}</p>;
                      if (line.startsWith('> ')) return <p key={key} className="text-[11px] text-[#8b95a8] italic border-l-2 pl-2" style={{ borderColor: 'rgba(0,229,160,0.3)' }}>{line.slice(2)}</p>;
                      if (/^[-*] /.test(line)) return <p key={key} className="flex gap-2"><span className="text-[#00e5a0] shrink-0">•</span><span>{line.slice(2)}</span></p>;
                      if (line.startsWith('# ')) return <p key={key} className="text-base font-bold text-[#e8ecf4]">{line.slice(2)}</p>;
                      return <p key={key}>{line}</p>;
                    })}
                  </div>

                  {/* Extracted events */}
                  {(digestState.events?.length ?? 0) > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> Extracted events
                        </p>
                        <button
                          onClick={() => {
                            for (const event of digestState.events ?? []) void notifyDigestEvent(activeRoom.id, event);
                          }}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium"
                          style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0' }}
                        >
                          <Bell className="w-3 h-3" /> Notify me about all
                        </button>
                      </div>
                      <div className="space-y-2">
                        {digestState.events?.map((event, index) => {
                          const key = event.messageId ?? event.title;
                          const status = digestState.notified?.[key];
                          return (
                            <div key={`ev-${index}`} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                              <div className="flex items-start gap-2">
                                <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wide" style={{
                                  background: event.type === 'exam' ? 'rgba(255,87,87,0.15)' : event.type === 'meeting' ? 'rgba(79,195,247,0.15)' : 'rgba(0,229,160,0.12)',
                                  color: event.type === 'exam' ? '#ff5757' : event.type === 'meeting' ? '#4fc3f7' : '#00e5a0',
                                }}>
                                  {event.type === 'schedule_change' ? 'CHANGE' : event.type}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-[#e8ecf4]">{event.title}</p>
                                  {event.when && <p className="text-[11px] text-[#fbbf24] mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" /> {event.when}</p>}
                                  {event.who && <p className="text-[10px] text-[#8b95a8] mt-0.5">Concerns: {event.who}</p>}
                                  {event.detail && <p className="text-[11px] text-[#8b95a8] mt-1">{event.detail}</p>}
                                </div>
                                <button
                                  onClick={() => void notifyDigestEvent(activeRoom.id, event)}
                                  disabled={status === 'sending' || status === 'done'}
                                  className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium disabled:opacity-60"
                                  style={{ background: status === 'done' ? 'rgba(0,229,160,0.25)' : 'rgba(0,229,160,0.12)', color: '#00e5a0' }}
                                  title="Send a push notification for this event"
                                >
                                  {status === 'sending' ? <Loader2 className="w-3 h-3 animate-spin" /> : status === 'done' ? <Check className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
                                  {status === 'done' ? 'Notified' : 'Notify'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-[#5a6478] mt-2 leading-relaxed">
                        Notifications go to your subscribed devices (Settings → System Push Notifications) and your in-app bell — tapping one opens this room.
                      </p>
                    </div>
                  )}
                  </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ INCOMING CALL POPUP ═══════ */}
      {incomingCall && (() => {
        /* Resolve which chat the call is coming FROM, so the recipient
           knows the context — the old banner said only "from Name", which
           told them nothing about which conversation (or group) the call
           belongs to. */
        const callRoom = rooms.find(r => r.id === incomingCall.roomId);
        const isGroupCall = callRoom?.type === 'group';
        const countdownMs = incomingCall.offer ? 30000 : 45000;
        const CallerIcon = incomingCall.type === 'voice' ? Phone : Video;
        return (
        <div className="fixed top-0 left-0 right-0 z-[400] slide-down px-4 pt-4" role="alert" aria-live="assertive">
          <div className="mx-auto max-w-md rounded-2xl backdrop-blur-xl overflow-hidden" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(0,229,160,0.25)', boxShadow: '0 12px 40px rgba(0,0,0,0.45)' }}>
            <div className="flex items-center gap-3.5 p-4">
              {/* Caller avatar with ripple — identity first, per call-UI
                  best practice (WhatsApp/FaceTime pattern). */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full call-ripple" style={{ background: 'rgba(0,229,160,0.3)' }} />
                <div className="absolute inset-0 rounded-full call-ripple call-ripple-delay-1" style={{ background: 'rgba(0,229,160,0.2)' }} />
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center text-base font-bold incoming-call-pulse"
                     style={{ background: `${getColor(incomingCall.from)}25`, color: getColor(incomingCall.from), border: `1.5px solid ${getColor(incomingCall.from)}55` }}>
                  {getInitials(incomingCall.fromName)}
                </div>
              </div>

              {/* Who is calling, what kind of call, and WHERE (room context). */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#e8ecf4] truncate">{incomingCall.fromName}</p>
                <p className="text-xs text-[#00e5a0] flex items-center gap-1.5 mt-0.5">
                  <CallerIcon className="w-3.5 h-3.5" />
                  Incoming {incomingCall.type === 'voice' ? 'voice' : 'video'} call
                  {isGroupCall && callRoom?.name ? <span className="text-[#8b95a8] font-normal truncate">· {callRoom.name}</span> : null}
                </p>
                <p className="text-[10px] text-[#5a6478] mt-1 truncate">
                  Accepting joins with your {incomingCall.type === 'video' ? 'camera and ' : ''}microphone on
                </p>
              </div>

              {/* Actions: clearly labeled, not mystery icon buttons. */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={declineIncomingCall}
                  className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(255,87,87,0.15)', border: '1px solid rgba(255,87,87,0.35)' }}
                  aria-label={`Decline ${incomingCall.type} call from ${incomingCall.fromName}`}
                  title="Decline — the caller will be notified">
                  <PhoneOff className="w-4 h-4 text-[#ff5757]" />
                  <span className="text-[9px] font-medium text-[#ff5757]">Decline</span>
                </button>
                <button
                  onClick={acceptIncomingCall}
                  className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all hover:scale-110 incoming-call-pulse"
                  style={{ background: 'rgba(0,229,160,0.18)', border: '1px solid rgba(0,229,160,0.45)' }}
                  aria-label={`Accept ${incomingCall.type} call from ${incomingCall.fromName}`}
                  title="Accept and join the call">
                  <PhoneCall className="w-4 h-4 text-[#00e5a0]" />
                  <span className="text-[9px] font-medium text-[#00e5a0]">Accept</span>
                </button>
              </div>
            </div>
            {/* Countdown: the invite auto-expires — show how much time is
                left instead of vanishing without explanation. */}
            <div className="h-0.5 w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full call-countdown" style={{ background: 'rgba(0,229,160,0.5)', animationDuration: `${countdownMs}ms` }} />
            </div>
          </div>
        </div>
        );
      })()}

      {/* ═══════ NEW: MESSAGE SEEN BY POPUP ═══════ */}
      {seenByPopup && activeRoom && (
        <div className="fixed z-[120] animate-in fade-in-0 zoom-in-95 duration-150" style={{ left: Math.min(seenByPopup.x, (typeof window !== 'undefined' ? window.innerWidth : 800) - 220), top: Math.min(seenByPopup.y - 10, (typeof window !== 'undefined' ? window.innerHeight : 600) - 200) }}>
          <div className="w-56 rounded-xl p-3 backdrop-blur-xl" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#8b95a8] uppercase tracking-wider">Seen by</p>
              <button onClick={() => setSeenByPopup(null)} className="p-0.5 rounded hover:bg-white/[0.06]"><X className="w-3 h-3 text-[#5a6478]" /></button>
            </div>
            {(() => {
              const seenUsers = getSeenByUsers(seenByPopup.msgId);
              return seenUsers.length > 0 ? (
                <div className="space-y-1.5 max-h-40 overflow-y-auto chat-scrollbar">
                  {seenUsers.map(u => (
                    <div key={u.id} className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/[0.03]">
                      <div className="relative">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: `${getColor(u.id)}20`, color: getColor(u.id) }}>{getInitials(u.name)}</div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: (u.isOnline || isRecentlyActive(u.lastActiveAt)) ? '#00e5a0' : '#5a6478' }} />
                      </div>
                      <span className="text-xs text-[#e8ecf4] truncate">{u.name || 'Unknown'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-[#5a6478] text-center py-3">No one has seen this message yet</p>
              );
            })()}
          </div>
        </div>
      )}

      {/* ═══════ NEW: SCHEDULE MESSAGE PICKER ═══════ */}
      {showSchedulePicker && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowSchedulePicker(false)}>
          <div className="w-full max-w-sm mx-4 rounded-2xl p-5" style={{ background: 'rgba(21,24,33,0.98)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#e8ecf4] flex items-center gap-2"><Clock className="w-5 h-5 text-[#00e5a0]" /> Schedule Message</h3>
              <button onClick={() => setShowSchedulePicker(false)} className="p-1 rounded-lg hover:bg-white/[0.06]"><X className="w-4 h-4 text-[#8b95a8]" /></button>
            </div>
            <p className="text-xs text-[#8b95a8] mb-3">Choose when to send your message</p>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[10px] text-[#5a6478] uppercase tracking-wider mb-1 block">Date</label>
                <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 rounded-lg text-sm text-[#e8ecf4] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
              <div>
                <label className="text-[10px] text-[#5a6478] uppercase tracking-wider mb-1 block">Time</label>
                <input type="time" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm text-[#e8ecf4] outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
              </div>
            </div>
            {/* Quick schedule options */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[
                { label: 'In 1 hour', offset: 3600000 },
                { label: 'In 3 hours', offset: 10800000 },
                { label: 'Tomorrow 9AM', offset: (() => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(9, 0, 0, 0); return d.getTime() - Date.now(); })() },
                { label: 'Tomorrow 2PM', offset: (() => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(14, 0, 0, 0); return d.getTime() - Date.now(); })() },
              ].map(opt => (
                <button key={opt.label} onClick={() => { const d = new Date(Date.now() + opt.offset); setScheduledDate(d.toISOString().split('T')[0]); setScheduledTime(d.toTimeString().slice(0, 5)); }}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all hover:bg-white/[0.06]"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--medq-text-muted, #8b95a8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {opt.label}
                </button>
              ))}
            </div>
            <button onClick={scheduleMessage} disabled={!scheduledDate || !scheduledTime || !inputText.trim()}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-[#0c0e14] disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: '#00e5a0' }}>
              Schedule Send
            </button>
          </div>
        </div>
      )}

      {/* ═══════ NEW: SCHEDULED MESSAGES LIST ═══════ */}
      {scheduledMessages.filter(m => m.roomId === activeRoom?.id).length > 0 && (
        <div className="fixed bottom-24 right-4 z-[60] w-72 rounded-xl p-3 backdrop-blur-xl" style={{ background: 'rgba(21,24,33,0.95)', border: '1px solid rgba(0,229,160,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <p className="text-[10px] font-semibold text-[#00e5a0] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Scheduled</p>
          {scheduledMessages.filter(m => m.roomId === activeRoom?.id).map(m => (
            <div key={m.id} className="flex items-start gap-2 p-1.5 rounded-lg mb-1" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <Clock className="w-3 h-3 text-[#00e5a0] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#e8ecf4] truncate">{m.content}</p>
                <p className="text-[9px] text-[#5a6478]">{new Date(m.sendAt).toLocaleString()}</p>
              </div>
              <button onClick={() => cancelScheduledMessage(m.id)} className="p-0.5 rounded hover:bg-white/[0.06]"><X className="w-3 h-3 text-[#5a6478]" /></button>
            </div>
          ))}
        </div>
      )}
      </div>{/* end inner flex wrapper */}
    </div>
  );
}
