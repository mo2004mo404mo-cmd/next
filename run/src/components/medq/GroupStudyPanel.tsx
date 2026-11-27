'use client';

/**
 * GroupStudyPanel — Video Library edition.
 *
 * Redesigned with a clean, attractive, less-distractive UI inspired by
 * YouTube / Coursera / Netflix:
 *   - Cover-grid of lecture thumbnail cards (gradient covers when no image)
 *   - "Continue Watching" horizontal row for in-progress lectures
 *   - Full-screen lecture viewer with side playlist (YouTube theater mode)
 *   - Minimal chrome — pill badges, subtle hover, generous whitespace
 *   - Question bank uses a compact 2-column grid with clean filter chips
 *
 * All API contracts preserved — same endpoints, same data shape.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCurrentUser } from '@/components/medq/useCurrentUser';
import {
  BookOpen, Video, FileText, Plus, Loader2, Play,
  Trash2, X, Check, AlertTriangle, StickyNote,
  Award, Clock, ListChecks, GraduationCap, Stethoscope,
  FlaskConical, Star, ChevronRight, Send, Flag, Bookmark, MessageSquare,
  CheckCircle2, Circle, TrendingUp, Search, ArrowLeft, Maximize2,
  FileImage, Link2, ChevronDown, BookmarkCheck, Layers, ChevronLeft,
  Headphones, Music, FileVideo, Sparkles, Pencil,
  // New icons for LectureViewer enhancements
  Keyboard, NotebookPen, Timer, BookmarkPlus, Command, ZapOff, Zap,
  // Upload icon for source file upload
  Upload,
  // Fullscreen exit icon
  Minimize2,
  // More menu icon for collapsing secondary actions
  MoreVertical,
} from 'lucide-react';
import { toast } from 'sonner';

/* ───────── Types ───────── */

interface LectureChunk {
  id: string;
  title: string;
  sourceTitle: string;
  sourceDescription: string;
  type: string; // video, pdf, image, text, link
  url: string;
  textContent: string;
  duration: number;
  order: number;
}

interface GroupLecture {
  id: string;
  title: string;
  description: string;
  system: string;
  topic: string;
  coverUrl: string;
  order: number;
  author?: { id: string; name: string | null; image: string | null };
  chunks: LectureChunk[];
  _count?: { questions: number };
  progress?: { totalChunks: number; completedCount: number; totalSections?: number; completedSections?: number; pct: number; lectureCompleted: boolean };
}

interface GroupQuestion {
  id: string;
  category: string;
  type: string;
  text: string;
  options: string;
  answer: string;
  explanation: string;
  difficulty: string;
  system: string;
  topic: string;
  tags: string;
  notes: string;
  reports: string;
  createdAt: string;
  lecture?: { id: string; title: string } | null;
  author?: { id: string; name: string | null; image: string | null };
  myAttempts?: { count: number; correct: number };
  _count?: { attempts: number; comments?: number };
  bookmarked?: boolean;
}

const CATEGORY_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  previous_exam: { label: 'Previous Exams', icon: Award, color: '#ff5757' },
  lecture: { label: 'Lecture', icon: BookOpen, color: '#4fc3f7' },
  doctor: { label: 'Doctor', icon: Stethoscope, color: '#8b5cf6' },
  high_yield: { label: 'High-Yield', icon: Star, color: '#f59e0b' },
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: '#00e5a0',
  Basic: '#4fc3f7',
  Moderate: '#f59e0b',
  Hard: '#ff8c42',
  Expert: '#ff5757',
};

/* ───────── Unified Design Tokens ─────────
 * Single source of truth for the study panel's visual language. Every
 * header, card, search bar, and body container references these constants
 * so the entire study experience feels cohesive. Change a value here →
 * it updates everywhere.
 *
 * Design principles:
 *  - ONE header style (same bg, blur, border, padding, gap) across all screens
 *  - ONE card system (same radius, border, shadow, hover) for all card types
 *  - ONE body padding (px-3 py-3) for all list views
 *  - Distinct accent colors (no overloaded meanings):
 *    green = completion/progress, orange = in-progress, purple = AI, blue = info
 */
const TOKENS = {
  // Header bars — study panel tab bar, course detail header, lecture viewer top bar
  header: {
    bg: 'rgba(8,10,14,0.85)',
    blur: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: 'px-3 py-2.5',
    gap: 'gap-2',
    position: 'relative' as const,
    zIndex: 40,
  },
  // Body containers — list views (courses grid, questions grid)
  body: {
    padding: 'px-3 py-3',
    spacing: 'space-y-4',
    scroll: 'overflow-y-auto chat-scrollbar',
  },
  // Cards — CourseCard, LectureCard, QuestionCard
  card: {
    radius: 'rounded-2xl',
    bg: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    shadow: '0 2px 8px rgba(0,0,0,0.2)',
    hoverScale: 'hover:scale-[1.02]',
    hoverLift: 'hover:-translate-y-0.5',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]',
    hoverBorder: 'hover:border-white/10',
    transition: 'transition-all duration-300 ease-out',
  },
  // Search bar — unified glassmorphic input
  search: {
    inputBg: 'rgba(255,255,255,0.05)',
    inputBorder: '1px solid rgba(255,255,255,0.08)',
    inputRadius: 'rounded-xl',
    inputPadding: 'pl-9 pr-12 py-2.5',
  },
  // Accent colors — distinct meanings, no overloading
  color: {
    green: 'var(--medq-accent-green, #00e5a0)',   // completion, done, primary CTA
    orange: 'var(--medq-accent-amber, #f59e0b)',  // in-progress, active, warning
    purple: 'var(--medq-accent-purple, #a78bfa)',  // AI features (distinct from blue)
    blue: '#4fc3f7',    // info, links, system indicators
    red: 'var(--medq-accent-danger, #ff5757)',     // delete, danger
    muted: '#8b95a7',   // muted text, inactive states
    tabInactive: '#5a6478', // tab inactive text (slightly darker than muted)
  },
};

/* ───────── Visual helpers ───────── */

/** Deterministic gradient cover for lectures without a coverUrl. */
function gradientFor(title: string): string {
  const palettes = [
    ['#6366f1', '#8b5cf6'], // indigo → violet
    ['#0ea5e9', '#06b6d4'], // sky → cyan
    ['#f59e0b', '#ef4444'], // amber → red
    ['#10b981', '#06b6d4'], // emerald → cyan
    ['#ec4899', '#f43f5e'], // pink → rose
    ['#8b5cf6', '#ec4899'], // violet → pink
    ['#14b8a6', '#0ea5e9'], // teal → sky
    ['#f97316', '#facc15'], // orange → yellow
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) | 0;
  const [a, b] = palettes[Math.abs(hash) % palettes.length];
  return `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;
}

function chunkTypeIcon(type: string) {
  switch (type) {
    case 'video': return Video;
    case 'audio': return Headphones;
    case 'pdf': return FileText;
    case 'image': return FileImage;
    case 'link': return Link2;
    default: return FileText;
  }
}

/** Detect if a URL is a YouTube/Vimeo embed link (needs <iframe>) vs a
 *  direct video file (needs native HTML5 <video>). */
function isEmbedVideoUrl(url: string): boolean {
  const u = url.toLowerCase();
  return u.includes('youtube.com') || u.includes('youtu.be') || u.includes('vimeo.com') || u.includes('/embed/');
}

/** Detect if a URL points to a direct audio/video file (HTML5 playable). */
function isDirectMediaUrl(url: string, exts: string[]): boolean {
  const u = url.toLowerCase().split('?')[0];
  return exts.some(ext => u.endsWith(ext));
}

function formatDuration(seconds: number): string {
  if (!seconds) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`;
}

/** Format file size in bytes to a human-readable string (e.g. "2.4 MB"). */
function formatFileSize(bytes: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ───────── Main Component ───────── */

export default function GroupStudyPanel({ groupId, isAdmin, onClose }: { groupId: string; isAdmin: boolean; onClose?: () => void }) {
  const [section, setSection] = useState<'lectures' | 'questions' | 'flashcards' | 'live-quiz'>('lectures');
  const [fullscreen, setFullscreen] = useState(false);
  const [questionAI, setQuestionAI] = useState<{ questionId?: string; questionText?: string } | null>(null);

  // Navigation state — LIFTED UP from LecturesSection so the persistent
  // header can show breadcrumbs. This is the key to a unified experience:
  // ONE header that always knows where you are.
  //   viewCourse = null, selectedLecture = null → courses grid
  //   viewCourse = "Cardiology", selectedLecture = null → course detail
  //   viewCourse = "Cardiology", selectedLecture = {...} → lecture viewer
  const [viewCourse, setViewCourse] = useState<string | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<GroupLecture | null>(null);

  // Lecture viewer action states — lifted UP so the header can render the
  // action buttons (AI, Complete, More). The viewer reads these via props.
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [lectureCompleted, setLectureCompleted] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!moreMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) setMoreMenuOpen(false);
    };
    const id = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => { clearTimeout(id); document.removeEventListener('mousedown', handler); };
  }, [moreMenuOpen]);
  // Reset viewer action states when the lecture changes
  useEffect(() => {
    setAiDrawerOpen(false);
    setMoreMenuOpen(false);
  }, [selectedLecture]);

  // The header is ALWAYS visible — it never hides. It adapts its breadcrumb
  // to show the current location. This eliminates the "multiple headers"
  // and "height changes" problems entirely.

  // Breadcrumb segments — clickable, show the navigation hierarchy
  const breadcrumbs: { label: string; onClick?: () => void }[] = [];
  if (onClose) breadcrumbs.push({ label: 'Chat', onClick: onClose });
  breadcrumbs.push({ label: 'Study', onClick: () => { setViewCourse(null); setSelectedLecture(null); setSection('lectures'); } });
  if (section === 'lectures' && viewCourse) {
    breadcrumbs.push({ label: viewCourse, onClick: () => setSelectedLecture(null) });
  }
  if (section === 'lectures' && selectedLecture) {
    breadcrumbs.push({ label: selectedLecture.title });
  }
  if (section === 'questions') {
    breadcrumbs.push({ label: 'Questions' });
  }
  if (section === 'flashcards') {
    breadcrumbs.push({ label: 'Flashcards' });
  }
  if (section === 'live-quiz') {
    breadcrumbs.push({ label: 'Live Quiz' });
  }

  return (
    <div className={`w-full flex-1 flex flex-col min-h-0 relative ${fullscreen ? 'fixed inset-0 z-[100]' : ''}`} style={fullscreen ? { background: 'rgba(8,10,14,0.98)', backdropFilter: 'blur(20px)' } : undefined}>
      {/* ─── ONE persistent header — ALWAYS visible, NEVER changes height ───
          [← back] [Chat / Study / Course / Lecture]    [🔍] [Lectures|Questions] [⛶]
          Breadcrumb navigation shows the user's location in the hierarchy.
          Clicking a segment navigates back to that level. */}
      <div
        className={`flex items-center ${TOKENS.header.gap} ${TOKENS.header.padding} flex-shrink-0`}
        style={{ background: TOKENS.header.bg, backdropFilter: TOKENS.header.blur, WebkitBackdropFilter: TOKENS.header.blur, borderBottom: TOKENS.header.borderBottom, position: TOKENS.header.position, zIndex: TOKENS.header.zIndex }}
      >
        {/* Back button — context-aware: goes back one level */}
        <button
          onClick={() => {
            if (selectedLecture) setSelectedLecture(null);
            else if (viewCourse) setViewCourse(null);
            else if (section === 'questions') setSection('lectures');
            else onClose?.();
          }}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0"
          title="Back"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Breadcrumb — shows the navigation hierarchy */}
        <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
          {breadcrumbs.map((bc, i) => (
            <div key={i} className="flex items-center gap-1 min-w-0">
              {i > 0 && <ChevronRight className="w-3 h-3 text-gray-600 flex-shrink-0" />}
              <button
                onClick={bc.onClick}
                disabled={!bc.onClick}
                className={`text-xs font-medium truncate transition-colors ${bc.onClick ? 'text-gray-400 hover:text-white cursor-pointer' : 'text-white cursor-default'}`}
                style={{ maxWidth: i === breadcrumbs.length - 1 ? '200px' : '120px' }}
              >
                {bc.label}
              </button>
            </div>
          ))}
        </div>

        {/* Tab switcher — ONLY visible at the top level (not inside course/lecture) */}
        {!viewCourse && !selectedLecture && (
          <div className="flex items-center gap-1 p-0.5 rounded-lg flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {([
              { id: 'lectures', label: 'Lectures', icon: BookOpen },
              { id: 'questions', label: 'Questions', icon: ListChecks },
              { id: 'flashcards', label: 'Flashcards', icon: Layers },
              { id: 'live-quiz', label: 'Live Quiz', icon: Zap },
            ] as const).map(t => {
              const active = section === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setSection(t.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${active ? 'bg-white/[0.08]' : ''}`}
                  style={{ color: active ? '#fff' : TOKENS.color.tabInactive }}
                >
                  <Icon className="w-3.5 h-3.5" /> {t.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Lecture viewer actions — ONLY visible when a lecture is open.
            These live in the HEADER so the content area stays clean.
            AI (purple) + Complete (green) + More menu (⋯) */}
        {selectedLecture && (
          <>
            <button
              onClick={() => setAiDrawerOpen(true)}
              className="p-1.5 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              style={{ color: aiDrawerOpen ? TOKENS.color.green : TOKENS.color.purple }}
              title="Ask AI"
              aria-label="Ask AI"
              aria-pressed={aiDrawerOpen}
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLectureCompleted(v => !v)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all flex-shrink-0 cursor-pointer"
              style={{ background: lectureCompleted ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.05)', color: lectureCompleted ? TOKENS.color.green : TOKENS.color.muted }}
              title={lectureCompleted ? 'Done — click to undo' : 'Mark complete'}
              aria-pressed={lectureCompleted}
            >
              {lectureCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
            </button>
            {/* More menu (⋯) — search, notes, bookmark, fullscreen, edit, delete.
                The actual menu items are rendered by the LectureViewer via a portal
                pattern: the viewer watches `moreMenuOpen` and renders the dropdown. */}
            <div ref={moreMenuRef} className="relative flex-shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); setMoreMenuOpen(v => !v); }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                style={{ background: moreMenuOpen ? 'rgba(255,255,255,0.08)' : 'transparent' }}
                title="More actions"
                aria-label="More actions"
                aria-expanded={moreMenuOpen}
                aria-haspopup="menu"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Fullscreen toggle */}
        <button
          onClick={() => setFullscreen(v => !v)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0"
          title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ─── Body — swaps based on navigation state ───
          The header above is ALWAYS the same. Only the body changes. */}
      {section === 'lectures' ? (
        <LecturesSection
          groupId={groupId}
          isAdmin={isAdmin}
          viewCourse={viewCourse}
          setViewCourse={setViewCourse}
          selectedLecture={selectedLecture}
          setSelectedLecture={setSelectedLecture}
          aiDrawerOpen={aiDrawerOpen}
          setAiDrawerOpen={setAiDrawerOpen}
          lectureCompleted={lectureCompleted}
          setLectureCompleted={setLectureCompleted}
          moreMenuOpen={moreMenuOpen}
          setMoreMenuOpen={setMoreMenuOpen}
        />
      ) : section === 'questions' ? (
        <QuestionsSection groupId={groupId} isAdmin={isAdmin} onAskAI={(questionId, questionText) => setQuestionAI({ questionId, questionText })} />
      ) : section === 'flashcards' ? (
        <FlashcardsSectionLazy groupId={groupId} isAdmin={isAdmin} />
      ) : section === 'live-quiz' ? (
        <LiveQuizSectionLazy groupId={groupId} isAdmin={isAdmin} />
      ) : null}

      {/* Question-card AI slide-over */}
      {questionAI && (
        <GroupAIAssistantLazy
          groupId={groupId}
          questionId={questionAI.questionId}
          questionText={questionAI.questionText}
          onClose={() => setQuestionAI(null)}
        />
      )}
    </div>
  );
}

/* Lazy-loaded AI Assistant slide-over — kept for question-card Explain mode.
 * Lectures use LectureInlineAI (below) instead. */
const GroupAIAssistantLazy = dynamic(() => import('@/components/medq/GroupAIAssistant'), { ssr: false });

/* Lazy-loaded Flashcards section — only loads when user clicks the Flashcards tab. */
const FlashcardsSectionLazy = dynamic(() => import('@/components/medq/FlashcardsSection'), { ssr: false });

/* Lazy-loaded Live Quiz section — Kahoot-style multiplayer quiz synced via socket.io. */
const LiveQuizSectionLazy = dynamic(() => import('@/components/medq/LiveQuizSection'), { ssr: false });

const LectureInlineAILazy = dynamic(() => import('@/components/medq/LectureInlineAI'), { ssr: false });

/* ───────── Lectures Section — Video Library Grid ───────── */

function LecturesSection({ groupId, isAdmin, viewCourse, setViewCourse, selectedLecture, setSelectedLecture, aiDrawerOpen, setAiDrawerOpen, lectureCompleted, setLectureCompleted, moreMenuOpen, setMoreMenuOpen }: {
  groupId: string;
  isAdmin: boolean;
  viewCourse: string | null;
  setViewCourse: (v: string | null) => void;
  selectedLecture: GroupLecture | null;
  setSelectedLecture: (l: GroupLecture | null) => void;
  // Viewer action states — passed through to LectureViewer
  aiDrawerOpen: boolean;
  setAiDrawerOpen: (v: boolean) => void;
  lectureCompleted: boolean;
  setLectureCompleted: (v: boolean | ((prev: boolean) => boolean)) => void;
  moreMenuOpen: boolean;
  setMoreMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const { authHeaders } = useCurrentUser();
  const [lectures, setLectures] = useState<GroupLecture[]>([]);
  // courseMeta — map of subject → { coverUrl, description }. Returned by the
  // lectures API. Used to show admin-set cover images on course cards.
  const [courseMeta, setCourseMeta] = useState<Record<string, { coverUrl: string; description: string }>>({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingLecture, setEditingLecture] = useState<GroupLecture | null>(null);
  // editingCourse — when set, opens the CourseEditDialog (admin edits cover/description)
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  // creatingCourse — when true, opens the CourseCreateDialog (admin creates a course shell)
  const [creatingCourse, setCreatingCourse] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchLectures = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/lectures`, { headers: authHeaders() });
      if (res.ok) {
        const d = await res.json();
        setLectures(d.lectures || []);
        setCourseMeta(d.courseMeta || {});
      }
    } catch { toast.error('Failed to load lectures'); }
    finally { setLoading(false); }
  }, [groupId, authHeaders]);

  useEffect(() => { fetchLectures(); }, [fetchLectures]);

  // ⌘K / Ctrl+K — focus the search bar.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Skeleton summary strip — slim, matches the new compact summary */}
        <div className="flex items-center gap-3 px-1">
          <div className="h-3 w-20 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="h-3 w-16 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="h-3 w-16 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="flex-1 h-1 rounded-full animate-pulse max-w-[120px] ml-auto" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        {/* Skeleton toolbar */}
        <div className="rounded-2xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="h-9 w-full rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="flex gap-2 flex-wrap">
            {[64, 56, 72, 60, 80].map((w, i) => (
              <div key={i} className="h-6 rounded-full animate-pulse" style={{ width: w, background: 'rgba(255,255,255,0.06)' }} />
            ))}
          </div>
        </div>
        {/* Skeleton cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="animate-pulse" style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.05)' }} />
              <div className="p-3 space-y-2">
                <div className="h-3 w-3/4 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="h-2 w-1/2 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="flex gap-2 pt-1">
                  <div className="h-3 w-10 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="h-3 w-10 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Split into "Continue Watching" (in-progress, 1-99%) — used for the
  // hero cards at the top. Computed from the UNFILTERED lectures so the
  // hero strip still works when a search is active.
  const inProgress = lectures.filter(l => {
    const p = l.progress?.pct ?? 0;
    return p > 0 && p < 100;
  });

  // ─── Apply search ───
  const hasFilters = search.trim().length > 0;
  const filteredLectures = lectures.filter(l => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const haystack = `${l.title} ${l.topic || ''} ${l.system || ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  // Group lectures by subject (course). When searching, use filtered list.
  const subjectGroups = groupLecturesBySubject(hasFilters ? filteredLectures : lectures);

  // activeCourse — derived. If viewCourse points to a course that no longer
  // exists, this is null and we fall back to the courses grid.
  const activeCourse = viewCourse ? subjectGroups.find(g => g.subject === viewCourse) : null;

  // Stats for the header strip — gives the user a sense of overall
  // progress at a glance. Computed from the UNFILTERED list.
  const totalLectures = lectures.length;
  const completedCount = lectures.filter(l => (l.progress?.pct ?? 0) === 100).length;
  const inProgressCount = inProgress.length;
  const overallPct = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;

  // Delete handler used by card hover buttons. Lives here (not in the
  // card) so we have access to fetchLectures + authHeaders.
  const handleDeleteFromCard = async (lecture: GroupLecture) => {
    if (!confirm(`Delete "${lecture.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/groups/${groupId}/lectures/${lecture.id}`, {
        method: 'DELETE', headers: authHeaders(),
      });
      if (res.ok) { toast.success('Lecture deleted'); fetchLectures(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to delete lecture'); }
  };

  // Lecture viewer — when a lecture is selected, render the viewer.
  // The edit dialog is rendered as an OVERLAY (not an early return) so the
  // viewer stays mounted underneath — preserving scroll position, active
  // section, drawer state, and avoiding a progress refetch.
  if (selectedLecture) {
    const currentIdx = lectures.findIndex(l => l.id === selectedLecture.id);
    return (
      <>
        <div className="h-full flex flex-col min-h-0">
          <LectureViewer
            lecture={selectedLecture}
            groupId={groupId}
            lectures={lectures}
            currentIndex={currentIdx >= 0 ? currentIdx : 0}
            onNavigate={(newIdx) => { if (lectures[newIdx]) setSelectedLecture(lectures[newIdx]); }}
            onBack={() => { setSelectedLecture(null); fetchLectures(); }}
            onEditFromViewer={(lec) => setEditingLecture(lec)}
            isAdmin={isAdmin}
            aiDrawerOpen={aiDrawerOpen}
            setAiDrawerOpen={setAiDrawerOpen}
            lectureCompleted={lectureCompleted}
            setLectureCompleted={setLectureCompleted}
            moreMenuOpen={moreMenuOpen}
            setMoreMenuOpen={setMoreMenuOpen}
          />
        </div>
        {editingLecture && (
          <LectureEditDialog
            groupId={groupId}
            lecture={editingLecture}
            onClose={() => setEditingLecture(null)}
            onSaved={() => { setEditingLecture(null); fetchLectures(); }}
          />
        )}
      </>
    );
  }

  // If we reach here, we're on the list view (not the viewer). The edit
  // dialog (if open from a card's edit button) is rendered at the end of
  // the main return as an overlay.

  if (creating) {
    return (
      <LectureCreateDialog
        groupId={groupId}
        onClose={() => setCreating(false)}
        onCreated={() => { setCreating(false); fetchLectures(); }}
      />
    );
  }

  if (lectures.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'rgba(0,229,160,0.08)' }}>
          <BookOpen className="w-8 h-8" style={{ color: '#00e5a0' }} />
        </div>
        <h3 className="text-base font-semibold text-white mb-1">No lectures yet</h3>
        <p className="text-xs text-gray-500 mb-4">Lectures added by admins will appear here.</p>
        {isAdmin && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Add first lecture
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 flex-1 flex flex-col min-h-0 overflow-y-auto chat-scrollbar px-3 py-3">
      {/* ─── Body: 2 modes ───
          1. Course selected → that course's lectures as cards (with back button)
          2. No course → hero continue card + search + stats + courses grid */}

      {/* ─── Glass search bar (always visible at top) ───
          ⌘K / Ctrl+K focuses this input. Esc clears it.
          Uses TOKENS.search for visual unity with the Questions section search. */}
      <div className="relative flex-shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          ref={searchRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => { if (e.key === 'Escape' && search) { e.preventDefault(); setSearch(''); searchRef.current?.blur(); } }}
          placeholder="Search lectures, topics, courses..."
          className={`w-full ${TOKENS.search.inputPadding} ${TOKENS.search.inputRadius} text-sm outline-none transition-all`}
          style={{ background: TOKENS.search.inputBg, border: TOKENS.search.inputBorder, color: 'white' }}
        />
        {!search && (
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-semibold text-gray-500 pointer-events-none select-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>⌘K</kbd>
        )}
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 cursor-pointer" aria-label="Clear search">
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
        )}
      </div>

      {/* ─── Search results (flat list when searching) ─── */}
      {search.trim() ? (
        filteredLectures.length > 0 ? (
          <div className="space-y-2">
            <div className="text-[10px] text-gray-500 px-1">{filteredLectures.length} {filteredLectures.length === 1 ? 'result' : 'results'}</div>
            {filteredLectures.map(l => (
              <LectureCard
                key={l.id}
                lecture={l}
                compact
                isAdmin={isAdmin}
                onClick={() => setSelectedLecture(l)}
                onEdit={() => setEditingLecture(l)}
                onDelete={() => handleDeleteFromCard(l)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No lectures match "{search}"</p>
          </div>
        )
      ) : activeCourse ? (
        /* ─── Course detail — NO separate header (breadcrumb is in parent) ─── */
        <div>
          {/* Course info bar — progress + admin actions (no back button, that's in the breadcrumb) */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <GraduationCap className="w-5 h-5 flex-shrink-0" style={{ color: TOKENS.color.blue }} />
            <span className="text-sm font-bold text-white">{activeCourse.lectures.length} lectures</span>
            <span className="text-[10px] font-semibold tabular-nums" style={{ color: activeCourse.lectures.length > 0 && activeCourse.lectures.every(l => (l.progress?.pct ?? 0) === 100) ? TOKENS.color.green : TOKENS.color.muted }}>
              {activeCourse.lectures.length > 0 ? Math.round((activeCourse.lectures.filter(l => (l.progress?.pct ?? 0) === 100).length / activeCourse.lectures.length) * 100) : 0}%
            </span>
            {isAdmin && (
              <button
                onClick={() => setCreating(true)}
                className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer"
                style={{ background: 'rgba(0,229,160,0.12)', color: TOKENS.color.green, border: '1px solid rgba(0,229,160,0.2)' }}
              >
                <Plus className="w-3.5 h-3.5" /> Add lecture
              </button>
            )}
          </div>
          {/* Lecture cards grid */}
          {activeCourse.lectures.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No lectures in this course yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCourse.lectures.map(l => (
                <LectureCard
                  key={l.id}
                  lecture={l}
                  isAdmin={isAdmin}
                  onClick={() => setSelectedLecture(l)}
                  onEdit={() => setEditingLecture(l)}
                  onDelete={() => handleDeleteFromCard(l)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ─── Mode 2: master view ─── */
        <>
          {/* Hero "Continue Learning" card — Spotify-style resume action.
              Only shown when there's at least one in-progress lecture.
              Uses the lecture's gradient as background with a dark overlay. */}
          {inProgress.length > 0 && (() => {
            const l = inProgress[0];
            const pct = l.progress?.pct ?? 0;
            const gradient = gradientFor(l.title + (l.system || ''));
            return (
              <div
                onClick={() => setSelectedLecture(l)}
                className="rounded-2xl overflow-hidden cursor-pointer relative transition-transform hover:scale-[1.01] flex-shrink-0"
              >
                <div className="absolute inset-0" style={{ background: gradient }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
                <div className="relative z-10 p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
                    {l.coverUrl ? <img src={l.coverUrl} alt="" className="w-full h-full object-cover" /> : '📚'}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-1">Continue learning</div>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">{l.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      {l.system && <span className="text-[11px] text-white/60 truncate max-w-[120px]">{l.system}</span>}
                      <span className="text-white/30 text-[11px]">·</span>
                      <div className="w-16 sm:w-24 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: TOKENS.color.orange }} />
                      </div>
                      <span className="text-[11px] font-bold" style={{ color: TOKENS.color.orange }}>{pct}%</span>
                    </div>
                  </div>
                  {/* Play button with Resume label */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="hidden sm:inline text-[11px] font-bold text-white/90 uppercase tracking-wider">Resume</span>
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                      <Play className="w-4 h-4 text-black fill-black" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Quick stats strip — subtle, single row */}
          {totalLectures > 0 && (
            <div className="flex items-center gap-4 px-1 text-[11px] text-gray-500 flex-shrink-0">
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {totalLectures} lectures</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" style={{ color: TOKENS.color.green }} /> {completedCount} done</span>
              {inProgressCount > 0 && <span className="flex items-center gap-1"><Play className="w-3 h-3" style={{ color: TOKENS.color.orange }} /> {inProgressCount} active</span>}
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
              <span className="font-semibold tabular-nums" style={{ color: overallPct === 100 ? TOKENS.color.green : TOKENS.color.muted }}>{overallPct}% overall</span>
            </div>
          )}

          {/* Courses section header */}
          <div className="flex items-center gap-2 px-1 flex-shrink-0">
            <h2 className="text-sm font-semibold text-gray-400">Courses</h2>
            <span className="text-[10px] text-gray-600 bg-white/[0.04] px-2 py-0.5 rounded-full">{subjectGroups.length}</span>
            {isAdmin && (
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  onClick={() => setCreatingCourse(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                  style={{ background: 'rgba(79,195,247,0.08)', color: TOKENS.color.blue, border: '1px solid rgba(79,195,247,0.2)' }}
                  title="Create a new course (subject + cover + description, 0 lectures)"
                >
                  <Plus className="w-3.5 h-3.5" /> New course
                </button>
              </div>
            )}
          </div>

          {/* Course cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectGroups.map(g => {
              const meta = courseMeta[g.subject];
              return (
                <CourseCard
                  key={g.subject}
                  subject={g.subject}
                  subjectLectures={g.lectures}
                  coverUrl={meta?.coverUrl}
                  description={meta?.description}
                  isAdmin={isAdmin}
                  onClick={() => setViewCourse(g.subject)}
                  onEdit={() => setEditingCourse(g.subject)}
                  onDelete={async () => {
                    if (!confirm(`Delete course metadata for "${g.subject}"?\n\nThe ${g.lectures.length} lecture(s) will NOT be deleted — they'll just lose the custom cover and description.`)) return;
                    try {
                      const res = await fetch(`/api/groups/${groupId}/courses/${encodeURIComponent(g.subject)}`, {
                        method: 'DELETE', headers: authHeaders(),
                      });
                      if (res.ok) { toast.success('Course metadata deleted'); fetchLectures(); }
                      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
                    } catch { toast.error('Failed to delete course'); }
                  }}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Edit dialog overlay — rendered here when editing was triggered from
          a lecture card (not from inside the viewer). The viewer case handles
          its own overlay above. */}
      {editingLecture && (
        <LectureEditDialog
          groupId={groupId}
          lecture={editingLecture}
          onClose={() => setEditingLecture(null)}
          onSaved={() => { setEditingLecture(null); fetchLectures(); }}
        />
      )}

      {/* Course create dialog — admin creates a course shell (subject + cover + description) */}
      {creatingCourse && (
        <CourseCreateDialog
          groupId={groupId}
          existingSubjects={subjectGroups.map(g => g.subject)}
          onClose={() => setCreatingCourse(false)}
          onCreated={() => { setCreatingCourse(false); fetchLectures(); }}
        />
      )}

      {/* Course edit dialog — admin edits cover + description */}
      {editingCourse && (
        <CourseEditDialog
          groupId={groupId}
          subject={editingCourse}
          coverUrl={courseMeta[editingCourse]?.coverUrl || ''}
          description={courseMeta[editingCourse]?.description || ''}
          lectureCount={subjectGroups.find(g => g.subject === editingCourse)?.lectures.length ?? 0}
          onClose={() => setEditingCourse(null)}
          onSaved={() => { setEditingCourse(null); fetchLectures(); }}
        />
      )}
    </div>
  );
}

/* ─── Lectures Toolbar — search bar + filter chips ───
 * Sticky-feeling toolbar that lets the user search and filter the library.
 * When any filter is active, the subject grouping in the list below is
 * bypassed and a flat filtered list shows instead. */
function LecturesToolbar({
  search,
  onSearch,
  mediaFilter,
  onMediaFilter,
  progressFilter,
  onProgressFilter,
  resultCount,
  hasFilters,
  onClear,
  isAdmin,
  onAddLecture,
}: {
  search: string;
  onSearch: (s: string) => void;
  mediaFilter: string;
  onMediaFilter: (s: string) => void;
  progressFilter: 'all' | 'not-started' | 'in-progress' | 'completed';
  onProgressFilter: (p: 'all' | 'not-started' | 'in-progress' | 'completed') => void;
  resultCount: number;
  hasFilters: boolean;
  onClear: () => void;
  isAdmin: boolean;
  onAddLecture: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-3 sm:p-4 space-y-3 sticky top-0 z-30 transition-shadow"
      style={{ background: 'rgba(15, 18, 25, 0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
    >
      {/* Row 1: search + add (admin) */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex-1 min-w-[220px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search lectures by title, topic, or subject..."
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
          />
        </div>
        {isAdmin && (
          <button
            onClick={onAddLecture}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold flex-shrink-0"
            style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }}
          >
            <Plus className="w-4 h-4" /> New lecture
          </button>
        )}
      </div>
      {/* Row 2: filter chips — media type + progress.
          Removed the "Type" / "Progress" text labels — the chips' icons
          already communicate what each group is, and the labels were eating
          horizontal space and forcing awkward wraps on narrow screens.
          A thin vertical divider still separates the two chip groups. */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Media type chips */}
        <FilterChip active={mediaFilter === 'all'} onClick={() => onMediaFilter('all')} label="All" />
        {SOURCE_TYPES.map(t => {
          const Icon = t.icon;
          return (
            <FilterChip
              key={t.value}
              active={mediaFilter === t.value}
              onClick={() => onMediaFilter(t.value)}
              label={t.label}
              icon={Icon}
              color={t.color}
            />
          );
        })}
        {/* Divider */}
        <div className="h-5 w-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        {/* Progress chips */}
        <FilterChip active={progressFilter === 'all'} onClick={() => onProgressFilter('all')} label="All" />
        <FilterChip active={progressFilter === 'not-started'} onClick={() => onProgressFilter('not-started')} label="Not started" icon={Circle} />
        <FilterChip active={progressFilter === 'in-progress'} onClick={() => onProgressFilter('in-progress')} label="In progress" icon={Play} color="#f59e0b" />
        <FilterChip active={progressFilter === 'completed'} onClick={() => onProgressFilter('completed')} label="Completed" icon={CheckCircle2} color="#00e5a0" />
        {/* Result count + clear */}
        {hasFilters && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500">{resultCount} {resultCount === 1 ? 'result' : 'results'}</span>
            <button
              onClick={onClear}
              className="text-xs font-semibold text-[#ff8c42] hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Group lectures by their `system` field (subject). Lectures with no system
   go under "General / Uncategorized". The order of subjects is determined
   by first appearance — admins can re-order by editing the `system` field
   on each lecture (subject names are free-text). */
function groupLecturesBySubject(lectures: GroupLecture[]): { subject: string; lectures: GroupLecture[] }[] {
  const map = new Map<string, GroupLecture[]>();
  const UNCATEGORIZED = 'General / Uncategorized';
  for (const l of lectures) {
    const key = (l.system || '').trim() || UNCATEGORIZED;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(l);
  }
  // Always show "General / Uncategorized" LAST if it exists.
  const entries = Array.from(map.entries());
  entries.sort((a, b) => {
    if (a[0] === UNCATEGORIZED && b[0] !== UNCATEGORIZED) return 1;
    if (b[0] === UNCATEGORIZED && a[0] !== UNCATEGORIZED) return -1;
    return a[0].localeCompare(b[0]);
  });
  return entries.map(([subject, ls]) => ({ subject, lectures: ls }));
}

/* ───────── Section Row with Header ───────── */

function SectionRow({ title, icon: Icon, count, children }: { title: string; icon: any; count?: number; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4" style={{ color: '#8b95a7' }} />
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {count !== undefined && (
          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#8b95a7' }}>
            {count}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

/* ───────── Course Card ─────────
 * A card representing a COURSE (subject) — the top-level grouping. Shown in
 * the master view grid. Click a card → drill into that course's lectures.
 *
 * Design: gradient cover (deterministic from subject name), subject name on
 * the cover, lecture count + progress bar in the footer. One consistent size.
 * The whole card is one click target — no hover buttons, no badges, no clutter. */
function CourseCard({
  subject,
  subjectLectures,
  coverUrl,
  description,
  isAdmin,
  onClick,
  onEdit,
  onDelete,
}: {
  subject: string;
  subjectLectures: GroupLecture[];
  coverUrl?: string;
  description?: string;
  isAdmin?: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const isUncategorized = subject === 'General / Uncategorized';
  const total = subjectLectures.length;
  const completed = subjectLectures.filter(l => (l.progress?.pct ?? 0) === 100).length;
  const inProgress = subjectLectures.filter(l => {
    const p = l.progress?.pct ?? 0;
    return p > 0 && p < 100;
  }).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const allDone = pct === 100;
  const Icon = isUncategorized ? BookOpen : GraduationCap;
  const gradient = gradientFor(subject);

  return (
    <div
      className={`group relative ${TOKENS.card.radius} overflow-hidden text-left ${TOKENS.card.transition} ${TOKENS.card.hoverScale} ${TOKENS.card.hoverLift} ${TOKENS.card.hoverShadow}`}
      style={{ background: TOKENS.card.bg, border: TOKENS.card.border, boxShadow: TOKENS.card.shadow }}
    >
      <button
        onClick={onClick}
        className="block w-full text-left cursor-pointer"
        aria-label={`Open course: ${subject}. ${total} lectures, ${pct}% complete.`}
      >
        {/* Cover — admin-set image if available, else gradient */}
        <div className="relative h-32 overflow-hidden" style={{ background: gradient }}>
          {coverUrl && <img src={coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)' }} />
          {/* Hover sheen */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
          {/* Status icon — top left */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: allDone ? 'rgba(0,229,160,0.9)' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
            {allDone ? (
              <Check className="w-4 h-4 text-black" />
            ) : (
              <Icon className="w-4 h-4 text-white" />
            )}
          </div>
          {/* In-progress badge — top CENTER (not top-right) so it never overlaps the admin buttons */}
          {inProgress > 0 && !allDone && (
            <span className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold tabular-nums" style={{ background: 'rgba(245,158,11,0.9)', backdropFilter: 'blur(8px)', color: '#000' }}>
              {inProgress} active
            </span>
          )}
          {/* Subject name — bottom, the visual hero */}
          <h3 className="absolute bottom-3 left-3 right-3 text-base font-bold text-white tracking-tight leading-tight drop-shadow-lg line-clamp-2">
            {subject}
          </h3>
        </div>
        {/* Footer — count + progress bar + % */}
        <div className="px-3 py-2.5 flex items-center gap-2">
          <span className="text-[10px] text-gray-500 tabular-nums flex-shrink-0">{total} {total === 1 ? 'lec' : 'lec'}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: allDone ? TOKENS.color.green : TOKENS.color.blue }} />
          </div>
          <span className="text-[10px] font-bold tabular-nums flex-shrink-0" style={{ color: allDone ? TOKENS.color.green : TOKENS.color.muted }}>{pct}%</span>
        </div>
      </button>

      {/* Admin actions — top-right, ALWAYS visible (not hover-only).
          Direct buttons (no dropdown) — one click to edit, one to delete.
          stopPropagation prevents the click from also opening the course. */}
      {isAdmin && (onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex items-center gap-1" style={{ zIndex: 10 }}>
          {onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); onEdit(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-white/30"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              title="Edit course"
              aria-label="Edit course"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-red-500/40"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
              title="Delete course"
              aria-label="Delete course"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────── Subject Section (flat, always-open group of lectures under one subject) ─────────
 * Redesigned: NO collapsible behavior — subjects are always expanded so the
 * user never has to click to reveal lectures. The header is a slim, non-
 * interactive label strip (icon + title + count + aggregate progress) that
 * frames the lecture grid below without competing for clicks. Mirrors how
 * Notion / Linear organize content: visible sections, no collapse toggles.
 *
 * Larger cards (2-col on desktop) — gives each lecture more visual weight
 * and makes thumbnails more readable. */
function SubjectSection({
  subject,
  subjectLectures,
  isAdmin,
  onOpen,
  onEdit,
  onDelete,
}: {
  subject: string;
  subjectLectures: GroupLecture[];
  isAdmin: boolean;
  onOpen: (lecture: GroupLecture) => void;
  onEdit: (lecture: GroupLecture) => void;
  onDelete: (lecture: GroupLecture) => void;
}) {
  const isUncategorized = subject === 'General / Uncategorized';
  const Icon = isUncategorized ? BookOpen : GraduationCap;
  const accentColor = isUncategorized ? '#8b95a7' : '#4fc3f7';
  const totalLectures = subjectLectures.length;
  const completedLectures = subjectLectures.filter(l => (l.progress?.pct ?? 0) === 100).length;
  const inProgressLectures = subjectLectures.filter(l => {
    const p = l.progress?.pct ?? 0;
    return p > 0 && p < 100;
  }).length;
  const subjectPct = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;
  const isComplete = subjectPct === 100;

  return (
    <section>
      {/* Slim non-interactive header — icon tile + title + count + progress.
          No collapse chevron, no click target. Reads as a label, not a control. */}
      <div className="flex items-center gap-3.5 px-1 mb-3.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: isComplete ? 'rgba(0,229,160,0.15)' : `${accentColor}1a`,
            border: `1px solid ${isComplete ? 'rgba(0,229,160,0.3)' : `${accentColor}30`}`,
          }}
        >
          {isComplete ? (
            <CheckCircle2 className="w-4 h-4" style={{ color: '#00e5a0' }} />
          ) : (
            <Icon className="w-4 h-4" style={{ color: accentColor }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-white tracking-tight truncate">{subject}</h2>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)', color: '#8b95a7' }}>
              {totalLectures}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2.5">
            <div className="flex-1 h-1 rounded-full overflow-hidden max-w-[200px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full transition-all duration-500" style={{ width: `${subjectPct}%`, background: isComplete ? '#00e5a0' : '#4fc3f7' }} />
            </div>
            <span className="text-[10px] font-medium tabular-nums flex-shrink-0" style={{ color: isComplete ? '#00e5a0' : '#8b95a7' }}>
              {subjectPct}%
            </span>
            {(inProgressLectures > 0 || completedLectures > 0) && (
              <span className="text-[10px] text-gray-600 flex-shrink-0 hidden sm:inline">
                · {completedLectures} done{inProgressLectures > 0 ? ` · ${inProgressLectures} active` : ''}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Body — lecture cards grid. 2 columns on desktop. Always visible. */}
      <div className="px-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjectLectures.map(l => (
            <LectureCard
              key={l.id}
              lecture={l}
              isAdmin={isAdmin}
              onClick={() => onOpen(l)}
              onEdit={() => onEdit(l)}
              onDelete={() => onDelete(l)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Lecture Card (thumbnail tile) ───────── */

function LectureCard({
  lecture,
  onClick,
  compact,
  isAdmin,
  onEdit,
  onDelete,
}: {
  lecture: GroupLecture;
  onClick: () => void;
  compact?: boolean;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const pct = lecture.progress?.pct ?? 0;
  const completed = pct === 100;
  const totalChunks = lecture.progress?.totalChunks ?? lecture.chunks.length;
  const completedChunks = lecture.progress?.completedCount ?? 0;
  // Section-level counts — preferred display since chunks within a section
  // are ALTERNATIVES (user picks one), not sequential steps. Fall back to
  // computing from chunks if API didn't return section counts.
  const totalSections = lecture.progress?.totalSections ?? new Set(lecture.chunks.map(c => c.title || 'Untitled section')).size;
  const completedSections = lecture.progress?.completedSections ?? 0;
  const cover = lecture.coverUrl
    ? <img src={lecture.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
    : <div className="absolute inset-0" style={{ background: gradientFor(lecture.title) }} />;

  // Hover edit/delete buttons — admin only. Rendered as absolutely-positioned
  // overlay buttons ON TOP of the card's main clickable area. They sit
  // OUTSIDE the card's <button> element (which is invalid HTML to nest),
  // so we wrap everything in a relative div and stopPropagation on click.
  // The buttons only appear on hover so non-admin viewers see a clean card.
  const AdminHover = ({ compact: c }: { compact?: boolean }) => {
    if (!isAdmin) return null;
    const btn = c ? 'w-7 h-7' : 'w-8 h-8';
    const pos = c ? 'top-2 right-2' : 'top-3 right-3';
    return (
      <div className={`absolute ${pos} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20`}>
        {onEdit && (
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onEdit(); }}
            className={`${btn} rounded-full flex items-center justify-center`}
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}
            title="Edit lecture"
          >
            <Pencil className="w-3.5 h-3.5 text-white" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(); }}
            className={`${btn} rounded-full flex items-center justify-center`}
            style={{ background: 'rgba(255,87,87,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}
            title="Delete lecture"
          >
            <Trash2 className="w-3.5 h-3.5 text-white" />
          </button>
        )}
      </div>
    );
  };

  if (compact) {
    // Horizontal-scroll variant — narrower card
    return (
      <div className="flex-shrink-0 w-56 text-left group relative">
        <button onClick={onClick} className="w-full text-left">
          <div className="relative rounded-xl overflow-hidden mb-2" style={{ aspectRatio: '16/9' }}>
            {cover}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            {/* Progress bar */}
            {pct > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                <div className="h-full" style={{ width: `${pct}%`, background: completed ? '#00e5a0' : '#4fc3f7' }} />
              </div>
            )}
            {/* Completion badge — hidden on hover for admins so the
                edit/delete buttons don't overlap it. Non-admins always see it. */}
            {completed && (!isAdmin || !onEdit) && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--medq-app-bg, #00e5a0)' }}>
                <Check className="w-3.5 h-3.5 text-black" />
              </div>
            )}
          </div>
          <h3 className="text-xs font-semibold text-white line-clamp-2 leading-tight">{lecture.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
            <span>{totalSections} {totalSections === 1 ? 'section' : 'sections'}</span>
            {pct > 0 && <span>· {pct}% done</span>}
          </div>
        </button>
        <AdminHover compact />
      </div>
    );
  }

  return (
    <div
      className={`text-left group ${TOKENS.card.radius} overflow-hidden ${TOKENS.card.transition} ${TOKENS.card.hoverScale} ${TOKENS.card.hoverLift} ${TOKENS.card.hoverShadow} ${TOKENS.card.hoverBorder} relative`}
      style={{ background: TOKENS.card.bg, border: TOKENS.card.border, boxShadow: TOKENS.card.shadow }}
    >
      <button onClick={onClick} className="w-full text-left">
        {/* Cover */}
        <div className="relative" style={{ aspectRatio: '16/9' }}>
          {cover}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
          {/* Top-right completion badge — hidden on hover for admins so
              the edit/delete buttons don't overlap it. Non-admins always
              see the badge. */}
          {completed && (!isAdmin || !onEdit) && (
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center z-10" style={{ background: 'var(--medq-app-bg, #00e5a0)' }}>
              <Check className="w-4 h-4 text-black" />
            </div>
          )}
          {/* Top-left system badge */}
          {lecture.system && (
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.55)', color: 'white' }}>
              {lecture.system}
            </div>
          )}
          {/* Bottom-left media-type chips — moved here from the meta footer
              so the footer can be a clean single-line summary. Sits on the
              cover's gradient overlay so it's readable against any image. */}
          {(() => {
            const types = Array.from(new Set(lecture.chunks.map(c => c.type)));
            if (types.length === 0) return null;
            return (
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 flex-wrap">
                {types.map(t => {
                  const meta = SOURCE_TYPES.find(s => s.value === t);
                  const Icon = meta?.icon || FileText;
                  const color = meta?.color || '#8b95a7';
                  return (
                    <span key={t} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.55)', color }}>
                      <Icon className="w-2.5 h-2.5" />
                      {meta?.label || t}
                    </span>
                  );
                })}
              </div>
            );
          })()}
          {/* Bottom progress bar */}
          {pct > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/40">
              <div className="h-full transition-all" style={{ width: `${pct}%`, background: completed ? '#00e5a0' : '#4fc3f7' }} />
            </div>
          )}
        </div>
        {/* Meta — single compact block: title (line 1) + topic (line 2, muted)
            + footer summary (line 3, single row with sections / progress / Qs).
            Previously this was 4 stacked rows (title / topic / media badges /
            stats) which made the card feel top-heavy and ate vertical space
            in the grid. */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">{lecture.title}</h3>
          {lecture.topic && (
            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{lecture.topic}</p>
          )}
          <div className="flex items-center gap-2.5 mt-2 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3" /> {totalSections}
            </span>
            {pct > 0 && (
              <span style={{ color: completed ? '#00e5a0' : '#4fc3f7' }} className="font-medium">
                {completedSections}/{totalSections}
              </span>
            )}
            {lecture._count?.questions ? (
              <>
                <span className="text-gray-700">·</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> {lecture._count.questions}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </button>
      <AdminHover />
    </div>
  );
}

/* ───────── Lecture Viewer (full-screen overlay, YouTube theater) ───────── */

function LectureViewer({
  lecture,
  groupId,
  onBack,
  isAdmin,
  lectures,
  currentIndex,
  onNavigate,
  onEditFromViewer,
  // Shared action states — lifted to GroupStudyPanel so the header can
  // render the action buttons. The viewer READS these (for its own UI like
  // the AI drawer) and the parent WRITES them (via the header buttons).
  aiDrawerOpen,
  setAiDrawerOpen,
  lectureCompleted,
  setLectureCompleted,
  moreMenuOpen,
  setMoreMenuOpen,
}: {
  lecture: GroupLecture;
  groupId: string;
  onBack: () => void;
  isAdmin: boolean;
  lectures?: GroupLecture[];
  currentIndex?: number;
  onNavigate?: (newIdx: number) => void;
  onEditFromViewer?: (lecture: GroupLecture) => void;
  aiDrawerOpen: boolean;
  setAiDrawerOpen: (v: boolean) => void;
  lectureCompleted: boolean;
  setLectureCompleted: (v: boolean | ((prev: boolean) => boolean)) => void;
  moreMenuOpen: boolean;
  setMoreMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}) {
  const { authHeaders } = useCurrentUser();
  const [activeChunkIdx, setActiveChunkIdx] = useState(0);
  const [completedChunks, setCompletedChunks] = useState<Set<string>>(new Set());
  // lectureCompleted + setLectureCompleted come from PROPS (lifted to parent)
  const [loading, setLoading] = useState(true);
  // aiDrawerOpen + setAiDrawerOpen come from PROPS (lifted to parent)
  // Mobile sections sidebar — on small screens the right-side sections
  // playlist is hidden (no room). This state toggles a slide-over version
  // of the same sidebar so mobile users can still jump between sections.
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // moreMenuOpen + setMoreMenuOpen come from PROPS (lifted to parent)
  // True browser fullscreen — uses the Fullscreen API on the viewer root
  // element so the whole theater (video + sidebar + nav) covers the screen
  // with no OS chrome / browser tabs. Falls back gracefully on browsers
  // that don't support it (button just stays inactive).
  const viewerRef = useRef<HTMLDivElement>(null);
  // Scroll container ref — used to reset scroll to top when switching sections.
  // Without this, jumping to a new section keeps the old scroll position and
  // the user sees the footer/empty space instead of the new section's header.
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = useCallback(() => {
    const el = viewerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      const requestFullscreen = el.requestFullscreen || (el as any).webkitRequestFullscreen;
      if (requestFullscreen) void requestFullscreen.call(el).catch?.(() => {});
    } else {
      const exitFullscreen = document.exitFullscreen || (document as any).webkitExitFullscreen;
      if (exitFullscreen) void exitFullscreen.call(document).catch?.(() => {});
    }
  }, []);
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  // ─── Per-section Notes (localStorage-backed) ───
  // Each section can have a free-text note. Stored per lecture in localStorage
  // under `lectureNotes:<lectureId>` as { [chunkId: string]: string }.
  // Notes are personal (not shared with the group) — they're a private study aid.
  const [notesByChunk, setNotesByChunk] = useState<Record<string, string>>({});
  const [notesDrawerOpen, setNotesDrawerOpen] = useState(false);

  // ─── Per-section Bookmarks (localStorage-backed) ───
  // Star any section to revisit later. Stored per lecture under
  // `lectureBookmarks:<lectureId>` as string[] of chunk IDs.
  // Bookmarks show as a starred icon in the sidebar; a filter toggle hides
  // non-bookmarked sections for focused review.
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [bookmarkFilterOn, setBookmarkFilterOn] = useState(false);

  // ─── Keyboard shortcuts help overlay ───
  // Press ? to toggle a modal listing all shortcuts. Discoverable + teachable.
  const [shortcutsOverlayOpen, setShortcutsOverlayOpen] = useState(false);

  // ─── In-lecture search overlay ───
  // Ctrl/Cmd+F or "/" opens a slide-over that searches across all section
  // titles + text content. Clicking a result jumps to that section.
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ─── Auto-advance after mark-complete ───
  // When ON, marking a section complete auto-jumps to the next incomplete
  // section — a "study flow" mode. Toggle persists per lecture in localStorage.
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Load notes + bookmarks + autoAdvance from localStorage when lecture changes.
  useEffect(() => {
    try {
      const nRaw = localStorage.getItem(`lectureNotes:${lecture.id}`);
      setNotesByChunk(nRaw ? JSON.parse(nRaw) : {});
      const bRaw = localStorage.getItem(`lectureBookmarks:${lecture.id}`);
      setBookmarks(new Set(bRaw ? JSON.parse(bRaw) : []));
      const aaRaw = localStorage.getItem(`lectureAutoAdvance:${lecture.id}`);
      setAutoAdvance(aaRaw === '1');
    } catch { /* ignore */ }
    setNotesDrawerOpen(false);
    setShortcutsOverlayOpen(false);
    setSearchOverlayOpen(false);
    setSearchQuery('');
    setBookmarkFilterOn(false);
  }, [lecture.id]);

  // Persist notes whenever they change.
  useEffect(() => {
    try { localStorage.setItem(`lectureNotes:${lecture.id}`, JSON.stringify(notesByChunk)); } catch { /* ignore */ }
  }, [notesByChunk, lecture.id]);
  // Persist bookmarks whenever they change.
  useEffect(() => {
    try { localStorage.setItem(`lectureBookmarks:${lecture.id}`, JSON.stringify(Array.from(bookmarks))); } catch { /* ignore */ }
  }, [bookmarks, lecture.id]);
  // Persist autoAdvance preference.
  useEffect(() => {
    try { localStorage.setItem(`lectureAutoAdvance:${lecture.id}`, autoAdvance ? '1' : '0'); } catch { /* ignore */ }
  }, [autoAdvance, lecture.id]);

  const setNoteForChunk = useCallback((chunkId: string, text: string) => {
    setNotesByChunk(prev => {
      const next = { ...prev };
      if (text.trim()) next[chunkId] = text;
      else delete next[chunkId];
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((chunkId: string) => {
    setBookmarks(prev => {
      const next = new Set(prev);
      if (next.has(chunkId)) next.delete(chunkId);
      else next.add(chunkId);
      return next;
    });
  }, []);


  // Next/Prev LECTURE navigation (not section). Available when the parent
  // passes the full lectures list + index. Lets the user continue studying
  // without going back to the library — a common YouTube-style "up next"
  // pattern. Falls back gracefully (no buttons) when not provided.
  const hasListNav = Array.isArray(lectures) && typeof currentIndex === 'number' && !!onNavigate;
  const canGoNextLecture = hasListNav && currentIndex! < lectures!.length - 1;
  const canGoPrevLecture = hasListNav && currentIndex! > 0;
  const goNextLecture = () => { if (canGoNextLecture) onNavigate!(currentIndex! + 1); };
  const goPrevLecture = () => { if (canGoPrevLecture) onNavigate!(currentIndex! - 1); };
  const nextLecture = hasListNav && canGoNextLecture ? lectures![currentIndex! + 1] : null;

  useEffect(() => {
    // Reset transient viewer state whenever the lecture changes (Next/Prev
    // lecture navigation). Without this, completedChunks / activeChunkIdx
    // from the PREVIOUS lecture would briefly leak into the new one.
    setLoading(true);
    setActiveChunkIdx(0);
    setAiDrawerOpen(false);
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/groups/${groupId}/lectures/${lecture.id}/progress`, { headers: authHeaders() });
        if (!res.ok) return;
        const d = await res.json();
        if (cancelled) return;
        setCompletedChunks(new Set(d.completedChunkIds || []));
        setLectureCompleted(!!d.lectureCompleted);
        // Auto-jump to first SECTION that isn't fully complete (so the user
        // resumes at the next section they need to work through, regardless
        // of how many alternative sources that section has).
        const secs = groupChunksIntoSections(lecture.chunks);
        const firstIncompleteSec = secs.findIndex(sec => !sec.chunks.every(({ chunk }) => (d.completedChunkIds || []).includes(chunk.id)));
        if (firstIncompleteSec >= 0) setActiveChunkIdx(secs[firstIncompleteSec].chunks[0].origIdx);
      } catch { /* ignore */ }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [lecture.id, lecture.chunks, groupId, authHeaders]);

  // Group chunks into sections by title — chunks with the same title are
  // ALTERNATIVE sources for the same section. The user picks ONE source to
  // watch; they do NOT need to consume all of them.
  const sections = groupChunksIntoSections(lecture.chunks);
  const totalSections = sections.length;
  const completedSectionCount = sections.filter(sec => sec.chunks.every(({ chunk }) => completedChunks.has(chunk.id))).length;
  const pct = totalSections > 0 ? Math.round((completedSectionCount / totalSections) * 100) : 0;

  const isSectionComplete = (sec: typeof sections[number]) =>
    sec.chunks.every(({ chunk }) => completedChunks.has(chunk.id));

  // Toggle SECTION completion — marks ALL chunks in the section. This makes
  // the section a single completion unit, regardless of how many alternative
  // sources it has. The user only needs to consume ONE alternative, then
  // clicks "Mark section complete" to finish the whole section.
  const toggleSectionComplete = async (sec: typeof sections[number]) => {
    const willComplete = !isSectionComplete(sec);
    const chunkIds = sec.chunks.map(c => c.chunk.id);
    const prev = new Set(completedChunks); // save for rollback
    const next = new Set(prev);
    if (willComplete) chunkIds.forEach(id => next.add(id));
    else chunkIds.forEach(id => next.delete(id));
    setCompletedChunks(next);
    try {
      await Promise.all(chunkIds.map(id =>
        fetch(`/api/groups/${groupId}/lectures/${lecture.id}/progress`, {
          method: 'POST', headers: authHeaders(),
          body: JSON.stringify({ chunkId: id, completed: willComplete }),
        })
      ));
      // Auto-advance: if completing (not uncompleting) AND autoAdvance is ON,
      // jump to the first incomplete section. Deferred so the state update
      // lands first. This is the behavior the toggle promises.
      if (willComplete && autoAdvance) {
        setTimeout(() => jumpToFirstIncomplete(), 50);
      }
    } catch {
      // Revert optimistic update so the UI doesn't show a false completion.
      setCompletedChunks(prev);
      toast.error('Failed to save progress — please retry');
    }
  };

  const markLectureComplete = async () => {
    const willComplete = !lectureCompleted;
    const prev = lectureCompleted; // save for rollback
    setLectureCompleted(willComplete);
    try {
      await fetch(`/api/groups/${groupId}/lectures/${lecture.id}/progress`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ chunkId: null, completed: willComplete }),
      });
      toast.success(willComplete ? 'Lecture marked complete' : 'Completion cleared');
    } catch {
      // Revert so the UI matches the server state.
      setLectureCompleted(prev);
      toast.error('Failed to save progress — please retry');
    }
  };

  const activeChunk = lecture.chunks[activeChunkIdx];
  const activeSectionIdx = sections.findIndex(s => s.chunks.some(c => c.origIdx === activeChunkIdx));
  const activeSection = activeSectionIdx >= 0 ? sections[activeSectionIdx] : null;
  const ActiveIcon = activeChunk ? chunkTypeIcon(activeChunk.type) : FileText;
  const activeChunkBookmarked = activeChunk ? bookmarks.has(activeChunk.id) : false;

  // ─── Estimated time remaining ───
  // Sum durations of all chunks in INCOMPLETE sections. Each section's
  // estimated time is the max duration across its alternative sources (since
  // the user only watches ONE alternative). Returns 0 when no durations set.
  const remainingSeconds = (() => {
    let total = 0;
    for (const sec of sections) {
      if (isSectionComplete(sec)) continue;
      const maxDur = sec.chunks.reduce((m, c) => Math.max(m, c.chunk.duration || 0), 0);
      total += maxDur;
    }
    return total;
  })();
  const hasDurationData = sections.some(s => s.chunks.some(c => c.chunk.duration > 0));

  // ─── Jump to first incomplete section ───
  // Finds the first section that isn't complete and jumps to it. Used by the
  // sidebar "jump" button and the Space-auto-advance flow.
  const jumpToFirstIncomplete = useCallback(() => {
    const idx = sections.findIndex(sec => !isSectionComplete(sec));
    if (idx >= 0) setActiveChunkIdx(sections[idx].chunks[0].origIdx);
  }, [sections]);

  // ─── Jump to next bookmark (J/K cycle through bookmarked sections) ───
  const jumpBookmark = useCallback((dir: 1 | -1) => {
    const bookmarkedSecIdxs = sections
      .map((sec, i) => sec.chunks.some(c => bookmarks.has(c.chunk.id)) ? i : -1)
      .filter(i => i >= 0);
    if (bookmarkedSecIdxs.length === 0) return;
    // Find current position in the bookmark cycle.
    let cur = bookmarkedSecIdxs.indexOf(activeSectionIdx);
    if (cur < 0) {
      // Not on a bookmark — start at the closest bookmark in the given direction.
      const fallback = dir === 1
        ? bookmarkedSecIdxs.find(i => i > activeSectionIdx)
        : [...bookmarkedSecIdxs].reverse().find(i => i < activeSectionIdx);
      if (fallback !== undefined) setActiveChunkIdx(sections[fallback].chunks[0].origIdx);
      return;
    }
    const next = (cur + dir + bookmarkedSecIdxs.length) % bookmarkedSecIdxs.length;
    const nextSecIdx = bookmarkedSecIdxs[next];
    setActiveChunkIdx(sections[nextSecIdx].chunks[0].origIdx);
  }, [sections, bookmarks, activeSectionIdx]);

  // Navigate to next/prev SECTION (not chunk — chunks within a section are
  // alternatives, not sequential steps).
  const goNextSection = () => {
    if (activeSectionIdx >= 0 && activeSectionIdx < sections.length - 1) {
      setActiveChunkIdx(sections[activeSectionIdx + 1].chunks[0].origIdx);
    }
  };
  const goPrevSection = () => {
    if (activeSectionIdx > 0) {
      setActiveChunkIdx(sections[activeSectionIdx - 1].chunks[0].origIdx);
    }
  };

  // ─── In-lecture search ───
  // Searches across all section titles + chunk textContent/sourceTitle/sourceDescription/url.
  // Returns [{ secIdx, chunkIdx, title, snippet }] for the current query.
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const out: { secIdx: number; chunkIdx: number; title: string; snippet: string }[] = [];
    sections.forEach((sec, si) => {
      sec.chunks.forEach(({ chunk, origIdx }) => {
        const haystack = [
          sec.title, chunk.sourceTitle, chunk.sourceDescription,
          chunk.title, chunk.textContent, chunk.url,
        ].filter(Boolean).join(' \n ').toLowerCase();
        const pos = haystack.indexOf(q);
        if (pos >= 0) {
          // Build a short snippet around the match.
          const start = Math.max(0, pos - 30);
          const end = Math.min(haystack.length, pos + q.length + 50);
          let snippet = haystack.slice(start, end);
          if (start > 0) snippet = '…' + snippet;
          if (end < haystack.length) snippet = snippet + '…';
          out.push({
            secIdx: si, chunkIdx: origIdx,
            title: chunk.sourceTitle || sec.title,
            snippet,
          });
        }
      });
    });
    return out.slice(0, 30); // cap at 30 results
  }, [sections, searchQuery]);

  const jumpToSearchResult = (secIdx: number, chunkIdx: number) => {
    setActiveChunkIdx(chunkIdx);
    setSearchOverlayOpen(false);
    setSearchQuery('');
  };

  // ─── Keyboard navigation ───
  // Escape → close any overlay (AI/notes/search/shortcuts). Works even while
  //   typing in an overlay's input/textarea.
  // Shift+Esc → exit the lecture (back to course). Only when NOT typing.
  // ArrowLeft / ArrowRight → previous / next section.
  // B → bookmark current section.  N → open notes drawer.
  // F → fullscreen.  J/K → prev/next bookmark.  / or Ctrl/Cmd+F → search.
  // ? → shortcuts help overlay.
  // Letter shortcuts are skipped when typing in an input/textarea (e.g. the
  // AI chat input at the bottom of the drawer). Lets power users navigate
  // without reaching for the mouse — a common pattern in video players and slide
  // viewers.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable;
      // Ctrl/Cmd+F — open search even when typing (browser would otherwise
      // grab it; we preventDefault to take over).
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setSearchOverlayOpen(true);
        return;
      }
      // Escape closes overlays one at a time — MUST run before the `typing`
      // guard so Escape works while focused inside a drawer's input/textarea.
      // It does NOT exit the lecture (that's destructive on a reflex keypress);
      // use the Back button or Shift+Esc to exit.
      if (e.key === 'Escape') {
        if (moreMenuOpen) { setMoreMenuOpen(false); return; }
        if (aiDrawerOpen) { setAiDrawerOpen(false); return; }
        if (notesDrawerOpen) { setNotesDrawerOpen(false); return; }
        if (searchOverlayOpen) { setSearchOverlayOpen(false); return; }
        if (shortcutsOverlayOpen) { setShortcutsOverlayOpen(false); return; }
        if (mobileSidebarOpen) { setMobileSidebarOpen(false); return; }
        // Shift+Esc exits the lecture (intentional, not reflexive). Only
        // applies when NOT typing — otherwise Shift+Esc in a textarea would
        // exit the lecture mid-note.
        if (e.shiftKey && !typing) { e.preventDefault(); onBack(); }
        return;
      }
      if (typing) return;
      if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        goPrevSection();
      } else if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        goNextSection();
      } else if (e.key.toLowerCase() === 'b' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        if (activeChunk) {
          toggleBookmark(activeChunk.id);
          toast.success(activeChunkBookmarked ? 'Bookmark removed' : 'Section bookmarked', { duration: 1500 });
        }
      } else if (e.key.toLowerCase() === 'n' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setNotesDrawerOpen(o => !o);
      } else if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'j' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        jumpBookmark(-1);
      } else if (e.key.toLowerCase() === 'k' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        jumpBookmark(1);
      } else if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setSearchOverlayOpen(true);
      } else if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setShortcutsOverlayOpen(o => !o);
      }
    };
    // Scope to the viewer root — only fire when the viewer (or one of its
    // descendants) has focus. Prevents hijacking arrows/space/letters when
    // the user is elsewhere on the page.
    const el = viewerRef.current;
    if (!el) return;
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  });

  // Auto-focus the viewer root on mount so keyboard shortcuts (arrows, B, N,
  // /, ?, etc.) work immediately — without this, the user must click inside
  // the viewer before any shortcut fires (the keydown listener is scoped to
  // viewerRef). tabIndex={-1} on the root div makes it programmatically
  // focusable without adding it to the tab order.
  useEffect(() => {
    viewerRef.current?.focus();
  }, [lecture.id]);

  // Scroll content to top when the active section changes. Without this,
  // jumping to a new section via the sidebar / source switcher / Resume
  // button keeps the old scroll position, so the user sees the footer or
  // empty space instead of the new section's header.
  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeChunkIdx]);

  const handleDelete = async () => {
    if (!confirm('Delete this lecture? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/groups/${groupId}/lectures/${lecture.id}`, {
        method: 'DELETE', headers: authHeaders(),
      });
      if (res.ok) { toast.success('Lecture deleted'); onBack(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to delete lecture'); }
  };

  return (
    <div ref={viewerRef} tabIndex={-1} className="flex flex-col h-full min-h-0 overflow-hidden outline-none" style={{ background: 'rgba(8,10,14,0.95)' }}>
      {/* NO top bar — the parent's breadcrumb header handles navigation.
          The viewer's actions (AI, complete, more menu) live in a slim
          action bar INSIDE the content area, below the section header. */}

      {/* Body: main content + sidebar playlist */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main content area — full width when AI drawer is closed */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#00e5a0' }} />
            </div>
          ) : activeChunk ? (
            <>
              <div ref={contentScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
                <div className="max-w-4xl mx-auto">
                  {/* Section header + action bar — ONE block.
                      The action bar (AI, complete, more menu) lives HERE,
                      inside the content — NOT as a separate top bar.
                      This means there's only ONE header (the parent's breadcrumb). */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <ActiveIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: TOKENS.color.green }} aria-hidden />
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold tabular-nums flex-shrink-0">
                        {activeSectionIdx + 1}/{totalSections}
                      </span>
                      <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight flex-1 min-w-0 truncate">
                        {activeChunk.sourceTitle || activeChunk.title}
                      </h1>
                      <span className="text-[10px] font-semibold tabular-nums flex-shrink-0" style={{ color: pct === 100 ? TOKENS.color.green : TOKENS.color.muted }}>{pct}%</span>
                    </div>
                    {activeChunk.sourceDescription && (
                      <p className="text-xs text-[#8b95a8] mt-1 leading-relaxed">{activeChunk.sourceDescription}</p>
                    )}
                  </div>

                  {/* More menu dropdown — RENDERED HERE (in the content) but
                      TRIGGERED from the header's ⋯ button. The dropdown needs
                      access to viewer internals (activeChunk, toggleBookmark,
                      notes, etc.) so it must live in the viewer. It's
                      positioned absolute relative to the header's ⋯ button
                      via a portal-like fixed positioning. */}
                  {moreMenuOpen && (
                    <div
                      className="fixed inset-0 z-[200]"
                      onClick={() => setMoreMenuOpen(false)}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <div
                        className="absolute top-12 right-12 w-52 rounded-xl py-1 z-[201]"
                        style={{ background: 'rgba(21,24,33,0.98)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }}
                        role="menu"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <button onClick={(e) => { e.stopPropagation(); setSearchOverlayOpen(true); setMoreMenuOpen(false); }} onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 transition-colors cursor-pointer" role="menuitem">
                          <Search className="w-3.5 h-3.5" /> Search <span className="ml-auto text-[9px] text-gray-600">⌘F</span>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setNotesDrawerOpen(true); setMoreMenuOpen(false); }} onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 transition-colors cursor-pointer relative" role="menuitem">
                          <NotebookPen className="w-3.5 h-3.5" /> Notes
                          {Object.keys(notesByChunk).length > 0 && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: TOKENS.color.orange }} />}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); if (activeChunk) { toggleBookmark(activeChunk.id); toast.success(activeChunkBookmarked ? 'Bookmark removed' : 'Section bookmarked', { duration: 1500 }); } setMoreMenuOpen(false); }} onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-white/5 transition-colors cursor-pointer" style={{ color: activeChunkBookmarked ? TOKENS.color.orange : TOKENS.color.muted }} role="menuitem">
                          {activeChunkBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />} {activeChunkBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); setMoreMenuOpen(false); }} onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 transition-colors cursor-pointer" role="menuitem">
                          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />} {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                        </button>
                        {isAdmin && (
                          <>
                            <div className="my-1 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }} />
                            <button onClick={(e) => { e.stopPropagation(); onEditFromViewer?.(lecture); setMoreMenuOpen(false); }} onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-white/5 transition-colors cursor-pointer" style={{ color: TOKENS.color.blue }} role="menuitem">
                              <Pencil className="w-3.5 h-3.5" /> Edit lecture
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setMoreMenuOpen(false); handleDelete(); }} onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} className="w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-white/5 transition-colors cursor-pointer" style={{ color: TOKENS.color.red }} role="menuitem">
                              <Trash2 className="w-3.5 h-3.5" /> Delete lecture
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Source switcher — slim inline strip (was a bordered
                      block with a header label). Removed the "Pick a source"
                      label and the wrapping border; now it's just a row of
                      pill buttons that sits naturally above the content.
                      Only shows when the current section has multiple
                      ALTERNATIVE sources. Picking a source is just a viewing
                      choice; it does NOT affect completion. */}
                  {activeSection && activeSection.chunks.length > 1 && (
                    <div className="flex items-center gap-1.5 flex-wrap mb-4">
                      <Layers className="w-3 h-3 text-gray-600 flex-shrink-0" />
                      {activeSection.chunks.map(({ chunk, origIdx }) => {
                        const Icon = chunkTypeIcon(chunk.type);
                        const isActive = origIdx === activeChunkIdx;
                        const srcMeta = SOURCE_TYPES.find(t => t.value === chunk.type);
                        const color = srcMeta?.color || '#8b95a7';
                        const label = chunk.sourceTitle || srcMeta?.label || chunk.type;
                        return (
                          <button
                            key={chunk.id}
                            onClick={() => setActiveChunkIdx(origIdx)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all"
                            style={{
                              background: isActive ? `${color}20` : 'rgba(255,255,255,0.04)',
                              color: isActive ? color : '#8b95a7',
                              border: `1px solid ${isActive ? `${color}40` : 'rgba(255,255,255,0.06)'}`,
                            }}
                            title={chunk.sourceDescription || label}
                          >
                            <Icon className="w-3 h-3" />
                            <span className="max-w-[140px] truncate">{label}</span>
                            {chunk.duration > 0 && <span className="text-[9px] opacity-60">· {formatDuration(chunk.duration)}</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Chunk content by type */}
                  <ChunkContent chunk={activeChunk} />

                  {/* Footer actions — TWO clean zones (was three stacked
                      bordered rows which felt disjointed and ate vertical
                      space):

                      Zone 1 (primary actions, higher emphasis):
                        Ask AI about this section  |  Mark section complete
                      Zone 2 (unified navigation, single row):
                        [← Prev lecture]  [← Prev section | counter | Next section →]  [Next lecture →]
                        The lecture-nav buttons flank the section-nav on the SAME row
                        instead of stacking as a third bordered row. When there's no
                        prev/next lecture, the slot is simply empty (no phantom row).
                        The "Next lecture" CTA also appears inline next to the section
                        counter when on the last section, as a contextual nudge.

                      Marking the section complete marks ALL its alternative
                      chunks done, so progress isn't diluted by unwatched
                      alternatives. */}
                  {/* ─── Footer — ONE compact row ───
                      [✓ complete] [⚡]     [← prev] [2/5] [next →] [next lecture →]
                      Merged the old 3-zone footer (mark complete + auto-advance,
                      section nav, mobile lecture nav) into a single row. Saves
                      ~80px of vertical space at the bottom of the viewer. */}
                  <div className="mt-6 flex items-center gap-2 flex-wrap pt-3 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
                    {/* Mark section complete — compact icon + label */}
                    {activeSection && (
                      <button
                        onClick={() => toggleSectionComplete(activeSection)}
                        title={isSectionComplete(activeSection) ? 'Marked complete — click to undo' : 'Mark section complete'}
                        aria-pressed={isSectionComplete(activeSection)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex-shrink-0"
                        style={{ background: isSectionComplete(activeSection) ? 'rgba(0,229,160,0.15)' : 'rgba(0,229,160,0.1)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }}
                      >
                        {isSectionComplete(activeSection) ? <><Check className="w-3.5 h-3.5" /> Done</> : <><Circle className="w-3.5 h-3.5" /> Complete</>}
                      </button>
                    )}
                    {/* Auto-advance toggle — icon only on mobile, label on desktop */}
                    <button
                      onClick={() => setAutoAdvance(v => !v)}
                      className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex-shrink-0"
                      style={{ background: autoAdvance ? 'rgba(79,195,247,0.12)' : 'rgba(255,255,255,0.04)', color: autoAdvance ? '#4fc3f7' : '#5a6478', border: autoAdvance ? '1px solid rgba(79,195,247,0.3)' : '1px solid rgba(255,255,255,0.06)' }}
                      title={autoAdvance ? 'Auto-advance ON' : 'Auto-advance OFF'}
                      aria-pressed={autoAdvance}
                    >
                      {autoAdvance ? <Zap className="w-3 h-3" /> : <ZapOff className="w-3 h-3" />}
                      <span className="hidden lg:inline">{autoAdvance ? 'Auto' : 'Manual'}</span>
                    </button>
                    {/* Spacer */}
                    <div className="flex-1" />
                    {/* Section nav — compact prev/next + counter */}
                    <button onClick={goPrevSection} disabled={activeSectionIdx <= 0} className="p-1.5 rounded-lg text-gray-400 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex-shrink-0" title="Previous section (←)"><ChevronLeft className="w-4 h-4" /></button>
                    <span className="text-[10px] text-gray-500 font-medium tabular-nums flex-shrink-0">{activeSectionIdx + 1}/{totalSections}</span>
                    <button onClick={goNextSection} disabled={activeSectionIdx >= totalSections - 1} className="p-1.5 rounded-lg text-gray-400 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex-shrink-0" title="Next section (→)"><ChevronRight className="w-4 h-4" /></button>
                    {/* Next lecture — only on last section, compact pill */}
                    {hasListNav && canGoNextLecture && activeSectionIdx >= totalSections - 1 && (
                      <button onClick={goNextLecture} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:bg-white/5 cursor-pointer flex-shrink-0" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }} title={`Next: ${nextLecture?.title}`}>
                        <span className="truncate max-w-[120px]">{nextLecture?.title}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                    {/* Mobile-only: prev/next lecture when not on last section */}
                    {hasListNav && (canGoPrevLecture || canGoNextLecture) && activeSectionIdx < totalSections - 1 && (
                      <div className="flex md:hidden items-center gap-1 flex-shrink-0">
                        {canGoPrevLecture && <button onClick={goPrevLecture} className="p-1.5 rounded-lg text-gray-400 hover:bg-white/5 transition-colors cursor-pointer" title="Prev lecture"><ArrowLeft className="w-4 h-4" /></button>}
                        {canGoNextLecture && <button onClick={goNextLecture} className="p-1.5 rounded-lg cursor-pointer" style={{ color: '#00e5a0' }} title="Next lecture"><ChevronRight className="w-4 h-4" /></button>}
                      </div>
                    )}
                    {/* Desktop-only: prev/next lecture flanking */}
                    {hasListNav && canGoPrevLecture && activeSectionIdx < totalSections - 1 && (
                      <button onClick={goPrevLecture} className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-medium hover:bg-white/5 text-gray-400 transition-colors flex-shrink-0 max-w-[120px] cursor-pointer" title={`Prev: ${lectures![currentIndex! - 1].title}`}>
                        <ArrowLeft className="w-3 h-3" /><span className="truncate">{lectures![currentIndex! - 1].title}</span>
                      </button>
                    )}
                    {hasListNav && canGoNextLecture && activeSectionIdx < totalSections - 1 && (
                      <button onClick={goNextLecture} className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:bg-white/5 flex-shrink-0 max-w-[120px] cursor-pointer" style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }} title={`Next: ${nextLecture?.title}`}>
                        <span className="truncate">{nextLecture?.title}</span><ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              No sections in this lecture.
            </div>
          )}
        </div>

        {/* Sidebar playlist — SECTIONS only (sources are alternatives, not
            separate items in the playlist). Clicking a section jumps to its
            first source; the source picker in the main area lets the user
            switch between alternatives. This matches the user's mental model:
            "I'm working through section 3" not "I'm working through source 7".

            Each section row has a small sparkle icon button (right side) that
            opens the AI drawer focused on that section — another inline AI
            entry point per the user's request.

            Rendered in TWO places: the desktop <aside> (always visible on
            md+) and a mobile slide-over (toggled by the floating "Sections"
            button on small screens). Both share the same inner content via
            renderSidebarContent() to avoid drift. */}
        {(() => {
          // renderSidebar(mobile) — shared inner content for the desktop
          // <aside> and the mobile slide-over. When `mobile` is true a close
          // button is rendered in the header (desktop has no close button
          // since it's always visible).
          const renderSidebar = (mobile: boolean) => {
            // Apply bookmark filter: when ON, only show sections that have at
            // least one bookmarked chunk. Helpful for focused review sessions.
            const visibleSections = sections
              .map((sec, si) => ({ sec, si }))
              .filter(({ sec }) => !bookmarkFilterOn || sec.chunks.some(c => bookmarks.has(c.chunk.id)));
            return (
            <>
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Sections</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-medium tabular-nums">{completedSectionCount}/{totalSections}</span>
                    {mobile && (
                      <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-white/5" title="Close">
                        <X className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
                {/* Mini progress bar at the top of the sidebar — gives a quick
                    visual sense of how far through the lecture the user is. */}
                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full transition-all" style={{ width: `${pct}%`, background: pct === 100 ? '#00e5a0' : '#4fc3f7' }} />
                </div>
                {/* Sidebar toolbar — two compact utility buttons that show when
                    relevant. "Jump to next" jumps to the first incomplete
                    section; "Bookmarks" toggles a filter that hides non-
                    bookmarked sections. Both also exist as keyboard shortcuts
                    but having visible buttons aids discoverability. */}
                <div className="mt-2 flex items-center gap-1.5">
                  <button
                    onClick={jumpToFirstIncomplete}
                    disabled={pct === 100}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
                    style={{ background: 'rgba(0,229,160,0.08)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.15)' }}
                    title="Jump to first incomplete section"
                  >
                    <Zap className="w-3 h-3" />
                    {pct === 100 ? 'All done' : 'Resume'}
                  </button>
                  <button
                    onClick={() => setBookmarkFilterOn(v => !v)}
                    disabled={bookmarks.size === 0}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: bookmarkFilterOn ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                      color: bookmarkFilterOn ? '#f59e0b' : '#8b95a7',
                      border: bookmarkFilterOn ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                    title={bookmarkFilterOn ? 'Showing only bookmarked sections' : 'Filter to bookmarked sections'}
                  >
                    <BookmarkCheck className="w-3 h-3" />
                    {bookmarks.size > 0 ? `${bookmarks.size}` : 'None'}
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                {visibleSections.length === 0 && bookmarkFilterOn && (
                  <div className="px-4 py-8 text-center">
                    <Bookmark className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-[11px] text-gray-500">No bookmarked sections yet.</p>
                    <p className="text-[10px] text-gray-600 mt-1">Press B on any section to bookmark it.</p>
                  </div>
                )}
                {visibleSections.map(({ sec, si }) => {
                  const isActive = si === activeSectionIdx;
                  const isDone = isSectionComplete(sec);
                  const multiSrc = sec.chunks.length > 1;
                  // Pick a "primary" type icon for the section (prefer video > audio > pdf > image > link > text)
                  const PrefIcon = (() => {
                    const order = ['video', 'audio', 'pdf', 'image', 'link', 'text'];
                    for (const t of order) {
                      if (sec.chunks.some(c => c.chunk.type === t)) return chunkTypeIcon(t);
                    }
                    return FileText;
                  })();
                  // Per-section bookmark state — true if ANY chunk in this
                  // section is bookmarked. Toggling it bookmarks/unbookmarks
                  // the section's primary chunk (first one).
                  const secBookmarked = sec.chunks.some(c => bookmarks.has(c.chunk.id));
                  // Per-section estimated duration — max across alternative
                  // sources (user only watches one).
                  const secDuration = sec.chunks.reduce((m, c) => Math.max(m, c.chunk.duration || 0), 0);
                  // Per-section note indicator — true if any chunk has a note.
                  const secHasNote = sec.chunks.some(c => notesByChunk[c.chunk.id]);
                  return (
                    <div
                      key={si}
                      className="w-full text-left transition-colors hover:bg-white/5 group relative"
                      style={{
                        background: isActive ? 'rgba(0,229,160,0.06)' : 'transparent',
                        borderLeft: isActive ? '2px solid #00e5a0' : '2px solid transparent',
                      }}
                    >
                      <button
                        onClick={() => { setActiveChunkIdx(sec.chunks[0].origIdx); if (mobile) setMobileSidebarOpen(false); }}
                        className="w-full text-left px-3 py-2.5"
                      >
                        <div className="flex items-start gap-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#00e5a0' }} />
                          ) : (
                            <div className="w-4 h-4 rounded-full border flex-shrink-0 mt-0.5" style={{ borderColor: isActive ? '#00e5a0' : 'rgba(255,255,255,0.2)' }} />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1">
                              <span>Section {si + 1}</span>
                              {/* Inline indicators on the eyebrow row — bookmark
                                  star, note dot, duration. Compact + scannable. */}
                              {secBookmarked && <BookmarkCheck className="w-2.5 h-2.5" style={{ color: '#f59e0b' }} />}
                              {secHasNote && <NotebookPen className="w-2.5 h-2.5" style={{ color: '#f59e0b' }} />}
                              {secDuration > 0 && (
                                <span className="text-[8px] text-gray-600 font-medium tabular-nums ml-auto flex items-center gap-0.5">
                                  <Clock className="w-2 h-2" />{formatDuration(secDuration)}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-medium text-white truncate">{sec.title}</div>
                            {multiSrc && (
                              <div className="text-[9px] text-gray-500 mt-0.5 flex items-center gap-1">
                                <PrefIcon className="w-2.5 h-2.5" /> {sec.chunks.length} alternatives
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                      {/* Per-section Ask AI icon — small sparkle button on the
                          right side of each row. Revealed on hover. Clicking
                          jumps to this section AND opens the AI drawer. */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveChunkIdx(sec.chunks[0].origIdx);
                          setAiDrawerOpen(true);
                          if (mobile) setMobileSidebarOpen(false);
                        }}
                        className="absolute top-2.5 right-2 w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.2)' }}
                        title="Ask AI about this section"
                      >
                        <Sparkles className="w-3 h-3" style={{ color: '#4fc3f7' }} />
                      </button>
                      {/* Per-section bookmark toggle — bottom-right. Revealed on
                          hover OR always shown when bookmarked. Lets the user
                          star a section from the sidebar without navigating
                          to it first. */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle the section's primary chunk bookmark.
                          toggleBookmark(sec.chunks[0].chunk.id);
                        }}
                        className={`absolute bottom-2 right-2 w-6 h-6 rounded-md flex items-center justify-center transition-opacity ${secBookmarked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        style={{
                          background: secBookmarked ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                          border: secBookmarked ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.06)',
                        }}
                        title={secBookmarked ? 'Remove bookmark' : 'Bookmark this section'}
                      >
                        {secBookmarked
                          ? <BookmarkCheck className="w-3 h-3" style={{ color: '#f59e0b' }} />
                          : <BookmarkPlus className="w-3 h-3" style={{ color: '#8b95a7' }} />}
                      </button>
                    </div>
                  );
                })}
              </div>
              {isAdmin && (
                <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
                  <p className="text-[10px] text-gray-600">Lecture by {lecture.author?.name || 'Admin'}</p>
                </div>
              )}
            </>
          );};
          return (
            <>
              {/* Desktop sidebar — always visible on md+. */}
              <aside className="w-72 border-l flex-col overflow-hidden hidden md:flex flex-shrink-0" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'rgba(0,0,0,0.2)' }}>
                {renderSidebar(false)}
              </aside>
              {/* Mobile floating "Sections" toggle — opens the slide-over
                  sidebar on small screens where there's no room for a
                  permanent sidebar column. */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden fixed bottom-4 right-4 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg"
                style={{ background: 'rgba(0,229,160,0.95)', color: '#000', boxShadow: '0 8px 24px rgba(0,229,160,0.3)' }}
              >
                <Layers className="w-4 h-4" /> Sections
                <span className="text-[10px] opacity-70">· {completedSectionCount}/{totalSections}</span>
              </button>
              {/* Mobile slide-over sidebar — same content as the desktop
                  sidebar, presented as a left-side drawer with a backdrop. */}
              {mobileSidebarOpen && (
                <>
                  <div
                    className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileSidebarOpen(false)}
                  />
                  <aside
                    className="md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] flex flex-col"
                    style={{
                      background: 'rgba(15, 18, 25, 0.98)',
                      backdropFilter: 'blur(16px)',
                      borderRight: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '8px 0 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    {renderSidebar(true)}
                  </aside>
                </>
              )}
            </>
          );
        })()}
      </div>

      {/* ─── Floating "Ask AI" button — REMOVED ───
          The user said the floating button felt intruding. The Ask AI
          action is now INLINE — it sits next to the "Mark section complete"
          button in the section footer (see footer actions above) and as a
          small sparkle icon on each section row in the sidebar. The slide-over
          drawer (below) is unchanged. */}

      {/* ─── AI drawer — right-side slide-over ───
          Overlays the lecture content (does NOT push it aside, so the
          lecture keeps its full width). On lg+ screens the drawer floats
          over the right side; on smaller screens it covers the full width
          with a backdrop. Same LectureInlineAI component as before, just
          a better container that doesn't permanently steal width. */}
      {aiDrawerOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setAiDrawerOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col"
            style={{
              background: 'rgba(15, 18, 25, 0.98)',
              backdropFilter: 'blur(16px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
            }}
          >
            <LectureInlineAILazy
              groupId={groupId}
              lectureId={lecture.id}
              lectureTitle={lecture.title}
              activeChunk={activeChunk ? { id: activeChunk.id, title: activeChunk.title, type: activeChunk.type } : null}
              onClose={() => setAiDrawerOpen(false)}
            />
          </aside>
        </>
      )}

      {/* ─── Notes drawer — right-side slide-over ───
          Per-section free-text notes saved to localStorage. The drawer shows
          a textarea for the CURRENT section at the top, plus a list of all
          notes in this lecture (clicking a note jumps to its section).
          Personal study aid — notes are NOT shared with the group. */}
      {notesDrawerOpen && (
        <>
          {/* Backdrop — lg:hidden so the drawer floats non-modally on desktop
              (same pattern as the AI drawer). On mobile it's modal. */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setNotesDrawerOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col"
            style={{
              background: 'rgba(15, 18, 25, 0.98)',
              backdropFilter: 'blur(16px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
              <div className="flex items-center gap-2">
                <NotebookPen className="w-4 h-4" style={{ color: '#f59e0b' }} />
                <h3 className="text-sm font-semibold text-white">My notes</h3>
                <span className="text-[10px] text-gray-500 tabular-nums">{Object.keys(notesByChunk).length}</span>
              </div>
              <button onClick={() => setNotesDrawerOpen(false)} className="p-1 rounded-lg hover:bg-white/5" title="Close (Esc)">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {/* Current section note editor */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeChunk && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">Current section</div>
                  <div className="text-sm font-medium text-white mb-2 truncate">{activeChunk.sourceTitle || activeChunk.title}</div>
                  <textarea
                    value={notesByChunk[activeChunk.id] || ''}
                    onChange={(e) => setNoteForChunk(activeChunk.id, e.target.value)}
                    placeholder="Write a note for this section… (saved automatically)"
                    className="w-full h-40 px-3 py-2 rounded-lg text-xs text-white outline-none resize-none leading-relaxed"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] text-gray-600">Saved locally · private to you</span>
                    {notesByChunk[activeChunk.id] && (
                      <button
                        onClick={() => setNoteForChunk(activeChunk.id, '')}
                        className="text-[10px] text-gray-500 hover:text-red-400 transition-colors"
                      >
                        Clear note
                      </button>
                    )}
                  </div>
                </div>
              )}
              {/* All notes list */}
              <div className="pt-4 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
                <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">All notes in this lecture</div>
                {Object.keys(notesByChunk).length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No notes yet. Type above to add one.</p>
                ) : (
                  <div className="space-y-2">
                    {sections.map((sec, si) => (
                      sec.chunks
                        .filter(({ chunk }) => notesByChunk[chunk.id])
                        .map(({ chunk, origIdx }) => (
                          <div
                            key={chunk.id}
                            className="relative p-2.5 pr-9 rounded-lg transition-colors hover:bg-white/5 cursor-pointer group"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                            onClick={() => { setActiveChunkIdx(origIdx); }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveChunkIdx(origIdx); } }}
                            aria-label={`Jump to section ${si + 1}: ${chunk.sourceTitle || sec.title}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Section {si + 1}</span>
                            </div>
                            <div className="text-[11px] text-white font-medium truncate mb-0.5">{chunk.sourceTitle || sec.title}</div>
                            <div className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed whitespace-pre-wrap">{notesByChunk[chunk.id]}</div>
                            {/* Real delete button — stops propagation so it
                                doesn't also jump to the section. */}
                            <button
                              onClick={(e) => { e.stopPropagation(); setNoteForChunk(chunk.id, ''); }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-colors cursor-pointer"
                              aria-label={`Delete note for section ${si + 1}`}
                              title="Delete note"
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        ))
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ─── Search overlay — right-side slide-over ───
          Searches across all section titles + chunk text content. Opens via
          the top-bar search button, Ctrl/Cmd+F, or the "/" key. Clicking a
          result jumps to that section and closes the overlay. */}
      {searchOverlayOpen && (
        <>
          {/* Backdrop — lg:hidden so the drawer floats non-modally on desktop
              (same pattern as AI + notes drawers). Consistent behavior. */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setSearchOverlayOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm flex flex-col"
            style={{
              background: 'rgba(15, 18, 25, 0.98)',
              backdropFilter: 'blur(16px)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header with search input */}
            <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" style={{ color: '#4fc3f7' }} />
                  <h3 className="text-sm font-semibold text-white">Search this lecture</h3>
                </div>
                <button onClick={() => setSearchOverlayOpen(false)} className="p-1 rounded-lg hover:bg-white/5" title="Close (Esc)">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search section titles and content…"
                autoFocus
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-gray-600">{searchQuery ? `${searchResults.length} match${searchResults.length === 1 ? '' : 'es'}` : 'Type to search'}</span>
                <span className="text-[10px] text-gray-600 flex items-center gap-1"><Command className="w-2.5 h-2.5" />Ctrl/Cmd+F</span>
              </div>
            </div>
            {/* Results */}
            <div className="flex-1 overflow-y-auto p-3">
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No matches for "{searchQuery}"</p>
                </div>
              )}
              {!searchQuery && (
                <div className="text-center py-12">
                  <Search className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Search across all section titles and content.</p>
                  <p className="text-[10px] text-gray-600 mt-1">Results jump to the matching section.</p>
                </div>
              )}
              <div className="space-y-1.5">
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => jumpToSearchResult(r.secIdx, r.chunkIdx)}
                    className="w-full text-left p-2.5 rounded-lg transition-colors hover:bg-white/5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold tabular-nums">Section {r.secIdx + 1}</span>
                      <span className="text-[10px] text-white font-medium truncate">{r.title}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">{r.snippet}</div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ─── Keyboard shortcuts overlay ───
          Press ? to toggle. Lists all available shortcuts in a centered
          modal so users can discover them. Click outside or press Esc/? to close. */}
      {shortcutsOverlayOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setShortcutsOverlayOpen(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(15, 18, 25, 0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4" style={{ color: '#4fc3f7' }} />
                <h3 className="text-sm font-semibold text-white">Keyboard shortcuts</h3>
              </div>
              <button onClick={() => setShortcutsOverlayOpen(false)} className="p-1 rounded-lg hover:bg-white/5" title="Close (Esc or ?)">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-h-[70vh] overflow-y-auto">
              {[
                { keys: ['←', '→'], label: 'Previous / next section' },
                { keys: ['B'], label: 'Bookmark / unbookmark current section' },
                { keys: ['N'], label: 'Open / close notes drawer' },
                { keys: ['F'], label: 'Toggle fullscreen' },
                { keys: ['J', 'K'], label: 'Previous / next bookmarked section' },
                { keys: ['/'], label: 'Search this lecture' },
                { keys: ['⌘/Ctrl', 'F'], label: 'Search (works while typing)' },
                { keys: ['?'], label: 'Show / hide this help' },
                { keys: ['Esc'], label: 'Close overlay (AI / notes / search)' },
                { keys: ['Shift', 'Esc'], label: 'Exit lecture (back to lectures)' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-2 py-1">
                  <span className="text-xs text-gray-300">{s.label}</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {s.keys.map((k, j) => (
                      <kbd
                        key={j}
                        className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-white tabular-nums"
                        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 1px 0 rgba(255,255,255,0.05)' }}
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t text-[10px] text-gray-600" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
              Shortcuts are ignored while typing in inputs / textareas (except Ctrl/Cmd+F).
            </div>
          </div>
        </>
      )}

      {/* Edit dialog is rendered at the LecturesSection level so saving
          an edit can refresh this lecture in place (no bounce back to the
          list). When admin clicks Edit in the top bar above, onEditFromViewer
          is called, which lifts the dialog up to the parent. */}
    </div>
  );
}

/* Helper — group chunks by title into sections. Chunks with the same title
   are ALTERNATIVE sources for the same section (user picks one to watch,
   does not need to consume all of them). */
function groupChunksIntoSections(chunks: LectureChunk[]) {
  const map = new Map<string, { title: string; chunks: { chunk: LectureChunk; origIdx: number }[] }>();
  chunks.forEach((c, i) => {
    const key = c.title || 'Untitled section';
    if (!map.has(key)) map.set(key, { title: key, chunks: [] });
    map.get(key)!.chunks.push({ chunk: c, origIdx: i });
  });
  return Array.from(map.values());
}

/* ───────── Chunk Content Renderer ───────── */

/**
 * NativeVideoWithPIP — wraps a native HTML5 <video> with a Picture-in-Picture
 * toggle button overlaid in the top-right corner. PIP is only available on
 * direct file videos (mp4/webm/etc); YouTube/Vimeo iframes handle their own
 * PIP internally via the iframe `allow` attribute.
 *
 * The button uses the browser's requestPictureInPicture() API and gracefully
 * degrades (hidden) on browsers without support. Clicking it again exits PIP
 * (we listen for the `leavepictureinpicture` event to keep state in sync).
 */
function NativeVideoWithPIP({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pipSupported, setPipSupported] = useState(false);
  const [pipActive, setPipActive] = useState(false);

  useEffect(() => {
    setPipSupported(typeof document !== 'undefined' && 'pictureInPictureEnabled' in document);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnter = () => setPipActive(true);
    const onLeave = () => setPipActive(false);
    v.addEventListener('enterpictureinpicture', onEnter);
    v.addEventListener('leavepictureinpicture', onLeave);
    return () => {
      v.removeEventListener('enterpictureinpicture', onEnter);
      v.removeEventListener('leavepictureinpicture', onLeave);
    };
  }, []);

  const togglePip = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (pipActive) {
        await document.exitPictureInPicture?.();
      } else {
        await v.requestPictureInPicture?.();
      }
    } catch {
      toast.error('Picture-in-Picture failed to start');
    }
  };

  return (
    <div className="rounded-xl overflow-hidden relative group" style={{ background: 'black', aspectRatio: '16/9' }}>
      <video
        ref={videoRef}
        src={src}
        controls
        className="w-full h-full"
        preload="metadata"
        title={title}
      >
        Your browser does not support the video tag.
      </video>
      {pipSupported && (
        <button
          onClick={togglePip}
          className="absolute top-2 right-2 px-2.5 py-1.5 rounded-md text-[11px] font-semibold opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
          style={{
            background: pipActive ? 'rgba(0,229,160,0.9)' : 'rgba(0,0,0,0.75)',
            color: pipActive ? '#0a0d14' : '#e8ecf4',
            backdropFilter: 'blur(4px)',
          }}
          title={pipActive ? 'Exit Picture-in-Picture' : 'Open in Picture-in-Picture'}
        >
          {pipActive ? <X className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          {pipActive ? 'Exit PIP' : 'PIP'}
        </button>
      )}
    </div>
  );
}

function ChunkContent({ chunk }: { chunk: LectureChunk }) {
  switch (chunk.type) {
    case 'video': {
      if (!chunk.url) {
        return (
          <div className="rounded-xl overflow-hidden flex flex-col items-center justify-center py-16" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Video className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-xs text-gray-500">Video URL not set</p>
          </div>
        );
      }
      // Embed (YouTube/Vimeo) → iframe. Direct video file → native <video>.
      if (isEmbedVideoUrl(chunk.url)) {
        // Normalize youtu.be/watch?v= → embed URL
        let embedUrl = chunk.url;
        const ytMatch = chunk.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
        if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
        return (
          <div className="rounded-xl overflow-hidden" style={{ background: 'black', aspectRatio: '16/9' }}>
            <iframe src={embedUrl} title={chunk.sourceTitle || chunk.title || 'Embedded video'} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        );
      }
      // Native HTML5 video for direct mp4/webm/ogg/mov files
      // Wraps in a relative container so we can overlay a PIP button (top-right).
      // PIP uses the browser's native Picture-in-Picture API — only works on
      // direct file videos (not YouTube iframes, which handle PIP internally).
      return <NativeVideoWithPIP src={chunk.url} title={chunk.title} />;
    }
    case 'audio': {
      if (!chunk.url && !chunk.textContent) {
        return (
          <div className="rounded-xl flex flex-col items-center justify-center py-12" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Headphones className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-xs text-gray-500">Audio URL not set</p>
          </div>
        );
      }
      return (
        <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(79,195,247,0.04) 100%)', border: '1px solid rgba(139,92,246,0.18)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139,92,246,0.15)' }}>
              <Headphones className="w-6 h-6" style={{ color: '#8b5cf6' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{chunk.title || 'Audio lecture'}</p>
              {chunk.duration > 0 && (
                <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5" /> {formatDuration(chunk.duration)}
                </p>
              )}
            </div>
          </div>
          {chunk.url && (
            <audio src={chunk.url} controls className="w-full" preload="metadata" style={{ borderRadius: '8px' }}>
              Your browser does not support the audio tag.
            </audio>
          )}
          {chunk.textContent && (
            <div className="mt-3 text-xs leading-relaxed text-gray-400 whitespace-pre-wrap">{chunk.textContent}</div>
          )}
        </div>
      );
    }
    case 'pdf':
      return chunk.url ? (
        <iframe src={chunk.url} title={chunk.title || 'PDF document'} className="w-full rounded-xl" style={{ height: 'min(70vh, 600px)', background: 'white' }} />
      ) : (
        <EmptyChunk icon={FileText} label="PDF not set" />
      );
    case 'image':
      return chunk.url ? (
        <img src={chunk.url} alt={chunk.title} className="w-full rounded-xl" />
      ) : (
        <EmptyChunk icon={FileImage} label="Image not set" />
      );
    case 'link':
      return (
        <a
          href={chunk.url}
          target="_blank"
          rel="noreferrer"
          className="block p-4 rounded-xl transition-colors hover:bg-white/5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,229,160,0.1)' }}>
              <Link2 className="w-5 h-5" style={{ color: '#00e5a0' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{chunk.title || 'External link'}</p>
              <p className="text-xs text-gray-500 truncate">{chunk.url}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>
        </a>
      );
    default: // text
      return (
        <div className="prose prose-invert max-w-none">
          <div
            className="text-sm leading-relaxed text-gray-300 whitespace-pre-wrap"
            style={{ fontFamily: 'inherit' }}
          >
            {chunk.textContent || chunk.url || 'No content yet.'}
          </div>
        </div>
      );
  }
}

function EmptyChunk({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <Icon className="w-8 h-8 text-gray-600 mb-2" />
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

/* ───────── Lecture Create Dialog (admin) ───────── */

/* ───────── Source type metadata ───────── */
const SOURCE_TYPES = [
  { value: 'text', label: 'Text', icon: FileText, color: '#8b95a7' },
  { value: 'video', label: 'Video', icon: Video, color: '#4fc3f7' },
  { value: 'audio', label: 'Audio', icon: Headphones, color: '#8b5cf6' },
  { value: 'pdf', label: 'PDF', icon: FileText, color: '#ff8c42' },
  { value: 'image', label: 'Image', icon: FileImage, color: '#00e5a0' },
  { value: 'link', label: 'Link', icon: Link2, color: '#f59e0b' },
] as const;

interface SourceDraft {
  sourceTitle: string;
  sourceDescription: string;
  type: string;
  url: string;
  textContent: string;
  duration: number;
}
interface SectionDraft {
  title: string;
  sources: SourceDraft[];
}

/* ───────── Source Uploader (upload + URL paste + live preview) ─────────
 * Replaces the plain URL input in SourceRow. Gives the admin TWO ways to
 * set a source URL:
 *   1. Upload a file → calls /api/groups/[id]/lectures/upload, gets back a
 *      relative URL, and auto-fills the URL field. Shows upload progress.
 *   2. Paste a URL (YouTube, direct .mp4, etc.) — same as before.
 *
 * Below the input, shows a LIVE PREVIEW of the content based on type:
 *   - video → <video> player (or YouTube embed if it's a YT URL)
 *   - audio → <audio> player
 *   - pdf → "View PDF" link
 *   - image → <img> thumbnail
 *   - link → clickable link
 *
 * The preview updates as the admin types or uploads, so they can verify
 * the source works before saving the lecture. */
function SourceUploader({
  type,
  url,
  groupId,
  authHeaders,
  onUrlChange,
  onTypeDetected,
}: {
  type: string;
  url: string;
  groupId: string;
  authHeaders: () => Record<string, string>;
  onUrlChange: (url: string) => void;
  onTypeDetected?: (kind: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setUploadPct(0);
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Simulate progress since fetch doesn't give upload progress natively.
      // The upload route accepts multipart/form-data with a `file` field.
      const progressInterval = setInterval(() => {
        setUploadPct(p => Math.min(p + 10, 90));
      }, 200);
      const res = await fetch(`/api/groups/${groupId}/lectures/upload`, {
        method: 'POST',
        headers: authHeaders(),
        body: formData,
      });
      clearInterval(progressInterval);
      setUploadPct(100);
      if (res.ok) {
        const d = await res.json();
        onUrlChange(d.url);
        if (d.kind && onTypeDetected) onTypeDetected(d.kind);
        toast.success(`Uploaded ${d.originalName || file.name} (${formatFileSize(d.size)})`);
      } else {
        const d = await res.json().catch(() => ({}));
        toast.error(d.error || `Upload failed (${res.status})`);
      }
    } catch {
      toast.error('Upload failed — check your connection');
    } finally {
      setUploading(false);
      setUploadPct(0);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const accept = type === 'video' ? 'video/*' :
                 type === 'audio' ? 'audio/*' :
                 type === 'pdf' ? 'application/pdf' :
                 type === 'image' ? 'image/*' : '*/*';

  const isYouTube = url && isEmbedVideoUrl(url);

  return (
    <div className="space-y-1.5">
      {/* URL input + Upload button — side by side */}
      <div className="flex gap-1.5">
        <input
          value={url}
          onChange={e => onUrlChange(e.target.value)}
          placeholder={
            type === 'video' ? 'YouTube URL or .mp4 URL' :
            type === 'audio' ? '.mp3/.wav URL' :
            type === 'pdf' ? 'PDF URL' :
            type === 'image' ? 'Image URL' :
            'Link URL'
          }
          className="flex-1 min-w-0 px-2 py-1.5 rounded text-xs text-white outline-none"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        {/* Upload button — opens file picker */}
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-semibold flex-shrink-0 disabled:opacity-50 cursor-pointer"
          style={{ background: 'rgba(0,229,160,0.12)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.2)' }}
          title="Upload a file from your device"
        >
          {uploading ? (
            <><Loader2 className="w-3 h-3 animate-spin" /> {uploadPct}%</>
          ) : (
            <><Upload className="w-3 h-3" /> Upload</>
          )}
        </button>
      </div>
      {/* Upload progress bar */}
      {uploading && (
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full transition-all duration-200" style={{ width: `${uploadPct}%`, background: 'var(--medq-app-bg, #00e5a0)' }} />
        </div>
      )}
      {/* Live preview — shows when a URL is set */}
      {url && !uploading && (
        <SourcePreview type={type} url={url} />
      )}
    </div>
  );
}

/* ───────── Source Preview ─────────
 * Renders a live preview of the source content based on type + URL.
 * Shown below the URL input in SourceUploader so the admin can verify
 * the source works before saving. */
function SourcePreview({ type, url }: { type: string; url: string }) {
  // Don't preview text/empty URLs
  if (!url.trim()) return null;

  // YouTube embed preview
  if (type === 'video' && isEmbedVideoUrl(url)) {
    let embedUrl = url;
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
    return (
      <div className="rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: 'black' }}>
        <iframe src={embedUrl} title="Preview" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
      </div>
    );
  }
  // Direct video preview
  if (type === 'video') {
    return (
      <div className="rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: 'black' }}>
        <video src={url} controls className="w-full h-full" preload="metadata" title="Preview" />
      </div>
    );
  }
  // Audio preview
  if (type === 'audio') {
    return (
      <div className="rounded-lg p-2" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
        <audio src={url} controls className="w-full" preload="metadata" style={{ borderRadius: '6px' }} />
      </div>
    );
  }
  // PDF preview
  if (type === 'pdf') {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#4fc3f7] hover:bg-white/5 transition-colors cursor-pointer" style={{ background: 'rgba(79,195,247,0.04)', border: '1px solid rgba(79,195,247,0.12)' }}>
        <FileText className="w-3.5 h-3.5" /> Preview PDF (opens in new tab)
      </a>
    );
  }
  // Image preview
  if (type === 'image') {
    return (
      <div className="rounded-lg overflow-hidden" style={{ maxHeight: '200px' }}>
        <img src={url} alt="Preview" className="w-full h-auto" style={{ maxHeight: '200px', objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
    );
  }
  // Link preview
  if (type === 'link') {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#00e5a0] hover:bg-white/5 transition-colors cursor-pointer" style={{ background: 'rgba(0,229,160,0.04)', border: '1px solid rgba(0,229,160,0.12)' }}>
        <Link2 className="w-3.5 h-3.5" /> Open link →
      </a>
    );
  }
  return null;
}

/* ───────── Shared Source Row (used by Create + Edit dialogs) ─────────
 * Each source within a section has its own editable title + description
 * (so the admin can label alternatives like "Short Intro" vs "Deep Dive"),
 * plus type, URL/text content, and duration. This component is identical
 * in both dialogs — keeping it in one place avoids drift. */
function SourceRow({
  src,
  srcIdx,
  secIdx,
  canRemove,
  onUpdate,
  onRemove,
  groupId,
  authHeaders,
}: {
  src: SourceDraft;
  srcIdx: number;
  secIdx: number;
  canRemove: boolean;
  onUpdate: (secIdx: number, srcIdx: number, field: string, value: any) => void;
  onRemove: (secIdx: number, srcIdx: number) => void;
  groupId: string;
  authHeaders: () => Record<string, string>;
}) {
  const SrcIcon = SOURCE_TYPES.find(t => t.value === src.type)?.icon || FileText;
  const srcColor = SOURCE_TYPES.find(t => t.value === src.type)?.color || '#8b95a7';
  return (
    <div className="rounded-lg p-2 space-y-1.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Row 1: icon + type + duration + remove */}
      <div className="flex items-center gap-1.5">
        <div className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center" style={{ background: `${srcColor}20` }}>
          <SrcIcon className="w-3 h-3" style={{ color: srcColor }} />
        </div>
        <select
          value={src.type}
          onChange={e => onUpdate(secIdx, srcIdx, 'type', e.target.value)}
          className="px-2 py-1 rounded text-[11px] text-white outline-none flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {SOURCE_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {(src.type === 'video' || src.type === 'audio') && (
          <input type="number" min={0} value={src.duration || ''} onChange={e => onUpdate(secIdx, srcIdx, 'duration', e.target.value)}
            placeholder="sec" className="w-14 px-1.5 py-1 rounded text-[11px] text-white outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} title="Duration in seconds" />
        )}
        <span className="flex-1" />
        {canRemove && (
          <button onClick={() => onRemove(secIdx, srcIdx)} className="p-1 hover:bg-white/5 rounded" title="Remove source">
            <Trash2 className="w-3 h-3 text-gray-500" />
          </button>
        )}
      </div>
      {/* Row 2: source-specific title (e.g. "Short Intro", "Deep Dive") */}
      <input
        value={src.sourceTitle}
        onChange={e => onUpdate(secIdx, srcIdx, 'sourceTitle', e.target.value)}
        placeholder="Source label (optional, e.g. 'Short Intro', 'Deep Dive', 'Professor's slides')"
        className="w-full px-2 py-1.5 rounded text-xs text-white outline-none"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      />
      {/* Row 3: source description (optional) */}
      <input
        value={src.sourceDescription}
        onChange={e => onUpdate(secIdx, srcIdx, 'sourceDescription', e.target.value)}
        placeholder="Short description of this source (optional)"
        className="w-full px-2 py-1.5 rounded text-[11px] text-white outline-none"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      />
      {/* Row 4: URL or text content depending on type. For non-text types,
          shows an upload button + URL input + live preview. */}
      {src.type === 'text' ? (
        <textarea
          value={src.textContent}
          onChange={e => onUpdate(secIdx, srcIdx, 'textContent', e.target.value)}
          placeholder="Write the section text content..."
          rows={3}
          className="w-full px-2 py-1.5 rounded text-xs text-white outline-none resize-none"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
      ) : (
        <SourceUploader
          type={src.type}
          url={src.url}
          groupId={groupId}
          authHeaders={authHeaders}
          onUrlChange={(url) => onUpdate(secIdx, srcIdx, 'url', url)}
          onTypeDetected={(kind) => {
            // Auto-switch the source type if the uploaded file's kind differs.
            if (kind !== src.type && SOURCE_TYPES.some(t => t.value === kind)) {
              onUpdate(secIdx, srcIdx, 'type', kind);
            }
          }}
        />
      )}
    </div>
  );
}

function LectureCreateDialog({ groupId, onClose, onCreated }: { groupId: string; onClose: () => void; onCreated: () => void }) {
  const { authHeaders } = useCurrentUser();
  const [form, setForm] = useState({ title: '', description: '', system: '', topic: '', coverUrl: '' });
  // New structure: sections containing multiple sources each.
  const [sections, setSections] = useState<SectionDraft[]>([
    { title: '', sources: [{ sourceTitle: '', sourceDescription: '', type: 'text', url: '', textContent: '', duration: 0 }] },
  ]);
  const [saving, setSaving] = useState(false);

  // Close on Escape — matches the drawer/overlay pattern used elsewhere.
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const updateSectionTitle = (i: number, title: string) => {
    const next = [...sections];
    next[i].title = title;
    setSections(next);
  };
  const addSection = () => setSections([...sections, { title: '', sources: [{ sourceTitle: '', sourceDescription: '', type: 'text', url: '', textContent: '', duration: 0 }] }]);
  const removeSection = (i: number) => setSections(sections.filter((_, idx) => idx !== i));

  const addSource = (secIdx: number) => {
    const next = [...sections];
    next[secIdx].sources.push({ sourceTitle: '', sourceDescription: '', type: 'video', url: '', textContent: '', duration: 0 });
    setSections(next);
  };
  const updateSource = (secIdx: number, srcIdx: number, field: string, value: any) => {
    const next = [...sections];
    (next[secIdx].sources[srcIdx] as any)[field] = value;
    setSections(next);
  };
  const removeSource = (secIdx: number, srcIdx: number) => {
    const next = [...sections];
    next[secIdx].sources = next[secIdx].sources.filter((_, idx) => idx !== srcIdx);
    setSections(next);
  };

  const handleCreate = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    // Flatten sections → chunks for the API (each source becomes a chunk
    // with its parent section's title).
    const chunks = sections.flatMap(s => s.sources.map(src => ({
      title: s.title.trim() || 'Untitled section',
      sourceTitle: src.sourceTitle.trim(),
      sourceDescription: src.sourceDescription.trim(),
      type: src.type,
      url: src.url,
      textContent: src.textContent,
      duration: Number(src.duration) || 0,
    })));
    if (chunks.length === 0) { toast.error('Add at least one section with a source'); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/lectures`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ ...form, chunks }),
      });
      if (res.ok) { toast.success('Lecture created'); onCreated(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to create lecture'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: 'var(--medq-app-bg, #1a1d24)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b z-10" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <h2 className="text-base font-semibold text-white">New Lecture</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Title *">
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Heart Failure — Pathophysiology"
              className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="System">
              <input value={form.system} onChange={e => setForm({ ...form, system: e.target.value })}
                placeholder="Cardiovascular"
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </Field>
            <Field label="Topic">
              <input value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                placeholder="Pathophysiology"
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </Field>
          </div>
          <Field label="Cover URL (optional)">
            <input value={form.coverUrl} onChange={e => setForm({ ...form, coverUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>

          {/* Sections builder — each section can have multiple sources */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-xs font-semibold text-gray-300 block">Sections</label>
                <p className="text-[10px] text-gray-500 mt-0.5">Each section can have multiple ALTERNATIVE sources — students pick one to watch.</p>
              </div>
              <button onClick={addSection} className="text-xs font-medium flex items-center gap-1 px-2 py-1 rounded" style={{ color: '#00e5a0', background: 'rgba(0,229,160,0.08)' }}>
                <Plus className="w-3 h-3" /> Add section
              </button>
            </div>
            <div className="space-y-3">
              {sections.map((sec, si) => (
                <div key={si} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {/* Section header */}
                  <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-[10px] font-bold text-gray-500 flex-shrink-0">SEC {si + 1}</span>
                    <input
                      value={sec.title}
                      onChange={e => updateSectionTitle(si, e.target.value)}
                      placeholder="Section title (e.g. Pathophysiology)"
                      className="flex-1 px-2 py-1 rounded text-xs text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                    <span className="text-[10px] text-gray-500 flex-shrink-0">{sec.sources.length} {sec.sources.length === 1 ? 'source' : 'sources'}</span>
                    {sections.length > 1 && (
                      <button onClick={() => removeSection(si)} className="p-1 hover:bg-white/5 rounded" title="Remove section">
                        <Trash2 className="w-3 h-3 text-gray-500" />
                      </button>
                    )}
                  </div>
                  {/* Sources list */}
                  <div className="p-2 space-y-2">
                    {sec.sources.map((src, sri) => (
                      <SourceRow
                        key={sri}
                        src={src}
                        srcIdx={sri}
                        secIdx={si}
                        canRemove={sec.sources.length > 1}
                        onUpdate={updateSource}
                        onRemove={removeSource}
                        groupId={groupId}
                        authHeaders={authHeaders}
                      />
                    ))}
                    <button
                      onClick={() => addSource(si)}
                      className="w-full py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors hover:bg-white/5"
                      style={{ color: '#8b95a7', border: '1px dashed rgba(255,255,255,0.1)' }}
                    >
                      <Plus className="w-3 h-3" /> Add alternative source
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 flex items-center justify-end gap-2 px-5 py-4 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:bg-white/5">Cancel</button>
          <button onClick={handleCreate} disabled={saving}
            className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
            style={{ background: 'var(--medq-app-bg, #00e5a0)', color: '#000' }}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />} Create lecture
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Lecture Edit Dialog (admin) ─────────
 *
 * Same shape as the Create dialog, but pre-fills the existing lecture's
 * fields and sections, and PATCHes the lecture instead of POSTing. The
 * admin can edit the lecture's title/system/topic/cover, and restructure
 * its sections (add/remove/rename sections, add/remove alternative sources
 * within each section). Uses the existing PATCH endpoint at
 * /api/groups/[id]/lectures/[lectureId] which already supports replacing
 * all chunks in one call.
 */

function LectureEditDialog({ groupId, lecture, onClose, onSaved }: { groupId: string; lecture: GroupLecture; onClose: () => void; onSaved: () => void }) {
  const { authHeaders } = useCurrentUser();
  const [form, setForm] = useState({
    title: lecture.title,
    description: lecture.description,
    system: lecture.system,
    topic: lecture.topic,
    coverUrl: lecture.coverUrl,
  });
  // Convert existing flat chunks → grouped sections (chunks with the same
  // title become ALTERNATIVE sources within one section).
  const [sections, setSections] = useState<SectionDraft[]>(() => {
    const map = new Map<string, SectionDraft>();
    lecture.chunks.forEach(c => {
      const key = c.title || 'Untitled section';
      if (!map.has(key)) map.set(key, { title: key, sources: [] });
      map.get(key)!.sources.push({
        sourceTitle: c.sourceTitle || '',
        sourceDescription: c.sourceDescription || '',
        type: c.type,
        url: c.url,
        textContent: c.textContent,
        duration: c.duration,
      });
    });
    const arr = Array.from(map.values());
    return arr.length > 0 ? arr : [{ title: '', sources: [{ sourceTitle: '', sourceDescription: '', type: 'text', url: '', textContent: '', duration: 0 }] }];
  });
  const [saving, setSaving] = useState(false);

  // Close on Escape — matches the drawer/overlay pattern.
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  // Same section/source manipulation helpers as CreateDialog
  const updateSectionTitle = (i: number, title: string) => {
    const next = [...sections];
    next[i].title = title;
    setSections(next);
  };
  const addSection = () => setSections([...sections, { title: '', sources: [{ sourceTitle: '', sourceDescription: '', type: 'text', url: '', textContent: '', duration: 0 }] }]);
  const removeSection = (i: number) => setSections(sections.filter((_, idx) => idx !== i));
  const addSource = (secIdx: number) => {
    const next = [...sections];
    next[secIdx].sources.push({ sourceTitle: '', sourceDescription: '', type: 'video', url: '', textContent: '', duration: 0 });
    setSections(next);
  };
  const updateSource = (secIdx: number, srcIdx: number, field: string, value: any) => {
    const next = [...sections];
    (next[secIdx].sources[srcIdx] as any)[field] = value;
    setSections(next);
  };
  const removeSource = (secIdx: number, srcIdx: number) => {
    const next = [...sections];
    next[secIdx].sources = next[secIdx].sources.filter((_, idx) => idx !== srcIdx);
    setSections(next);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    // Flatten sections → chunks for the API (each source becomes a chunk
    // with its parent section's title — same shape as Create).
    const chunks = sections.flatMap(s => s.sources.map(src => ({
      title: s.title.trim() || 'Untitled section',
      sourceTitle: src.sourceTitle.trim(),
      sourceDescription: src.sourceDescription.trim(),
      type: src.type,
      url: src.url,
      textContent: src.textContent,
      duration: Number(src.duration) || 0,
    })));
    if (chunks.length === 0) { toast.error('Add at least one section with a source'); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/lectures/${lecture.id}`, {
        method: 'PATCH', headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, chunks }),
      });
      if (res.ok) { toast.success('Lecture updated'); onSaved(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to update lecture'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: 'var(--medq-app-bg, #1a1d24)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b z-10" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Pencil className="w-4 h-4" style={{ color: '#4fc3f7' }} /> Edit Lecture
            </h2>
            <p className="text-[10px] text-gray-500 mt-0.5">Editing — {lecture.title}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Title *">
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Heart Failure — Pathophysiology"
              className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="System">
              <input value={form.system} onChange={e => setForm({ ...form, system: e.target.value })}
                placeholder="Cardiovascular"
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </Field>
            <Field label="Topic">
              <input value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                placeholder="Pathophysiology"
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            </Field>
          </div>
          <Field label="Cover URL (optional)">
            <input value={form.coverUrl} onChange={e => setForm({ ...form, coverUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>

          {/* Sections builder — same UI as Create dialog */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-xs font-semibold text-gray-300 block">Sections</label>
                <p className="text-[10px] text-gray-500 mt-0.5">Each section can have multiple ALTERNATIVE sources — students pick one.</p>
              </div>
              <button onClick={addSection} className="text-xs font-medium flex items-center gap-1 px-2 py-1 rounded" style={{ color: '#00e5a0', background: 'rgba(0,229,160,0.08)' }}>
                <Plus className="w-3 h-3" /> Add section
              </button>
            </div>
            <div className="space-y-3">
              {sections.map((sec, si) => (
                <div key={si} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-[10px] font-bold text-gray-500 flex-shrink-0">SEC {si + 1}</span>
                    <input
                      value={sec.title}
                      onChange={e => updateSectionTitle(si, e.target.value)}
                      placeholder="Section title (e.g. Pathophysiology)"
                      className="flex-1 px-2 py-1 rounded text-xs text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                    <span className="text-[10px] text-gray-500 flex-shrink-0">{sec.sources.length} {sec.sources.length === 1 ? 'source' : 'sources'}</span>
                    {sections.length > 1 && (
                      <button onClick={() => removeSection(si)} className="p-1 hover:bg-white/5 rounded" title="Remove section">
                        <Trash2 className="w-3 h-3 text-gray-500" />
                      </button>
                    )}
                  </div>
                  <div className="p-2 space-y-2">
                    {sec.sources.map((src, sri) => (
                      <SourceRow
                        key={sri}
                        src={src}
                        srcIdx={sri}
                        secIdx={si}
                        canRemove={sec.sources.length > 1}
                        onUpdate={updateSource}
                        onRemove={removeSource}
                        groupId={groupId}
                        authHeaders={authHeaders}
                      />
                    ))}
                    <button
                      onClick={() => addSource(si)}
                      className="w-full py-1.5 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors hover:bg-white/5"
                      style={{ color: '#8b95a7', border: '1px dashed rgba(255,255,255,0.1)' }}
                    >
                      <Plus className="w-3 h-3" /> Add alternative source
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 flex items-center justify-end gap-2 px-5 py-4 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:bg-white/5">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
            style={{ background: 'var(--medq-app-bg, #00e5a0)', color: '#000' }}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Course Create Dialog (admin) ─────────
 * Creates a COURSE shell — subject name + optional cover URL + description,
 * with ZERO lectures. Saves via PUT /api/groups/[id]/courses/[subject]. */
function CourseCreateDialog({ groupId, existingSubjects, onClose, onCreated }: { groupId: string; existingSubjects: string[]; onClose: () => void; onCreated: () => void }) {
  const { authHeaders } = useCurrentUser();
  const [subject, setSubject] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const trimmed = subject.trim();
  const isDuplicate = trimmed.length > 0 && existingSubjects.some(s => s.toLowerCase() === trimmed.toLowerCase());
  const canSave = trimmed.length > 0 && !isDuplicate && !saving;

  const handleCreate = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/courses/${encodeURIComponent(trimmed)}`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverUrl: coverUrl.trim(), description: description.trim() }),
      });
      if (res.ok) { toast.success('Course created'); onCreated(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to create course'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: 'var(--medq-app-bg, #1a1d24)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b z-10" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <h2 className="text-base font-semibold text-white">New Course</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 cursor-pointer"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Course name *">
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Cardiology" autoFocus className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${isDuplicate ? 'rgba(255,87,87,0.5)' : 'rgba(255,255,255,0.08)'}` }} />
            {isDuplicate && <p className="text-[10px] text-[#ff5757] mt-1">A course with this name already exists.</p>}
          </Field>
          <Field label="Cover image URL (optional)">
            <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            {coverUrl.trim() && (
              <div className="mt-2 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.04)' }}>
                <img src={coverUrl.trim()} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </Field>
          <Field label="Description (optional)">
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="A brief overview of what this course covers…" rows={3} className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none resize-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>
        </div>
        <div className="sticky bottom-0 flex items-center justify-end gap-2 px-5 py-4 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:bg-white/5 cursor-pointer">Cancel</button>
          <button onClick={handleCreate} disabled={!canSave} className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer" style={{ background: TOKENS.color.green, color: '#000' }}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />} Create course
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Course Edit Dialog (admin) ─────────
 * Edits a course's cover URL + description. The subject name is NOT editable
 * (renaming would require migrating lectures). Delete removes metadata only. */
function CourseEditDialog({ groupId, subject, coverUrl, description, lectureCount, onClose, onSaved }: {
  groupId: string; subject: string; coverUrl: string; description: string; lectureCount: number; onClose: () => void; onSaved: () => void;
}) {
  const { authHeaders } = useCurrentUser();
  const [form, setForm] = useState({ coverUrl, description });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/courses/${encodeURIComponent(subject)}`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverUrl: form.coverUrl.trim(), description: form.description.trim() }),
      });
      if (res.ok) { toast.success('Course updated'); onSaved(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to update course'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    const msg = lectureCount > 0
      ? `Delete the cover and description for "${subject}"?\n\nThe ${lectureCount} lecture(s) will NOT be deleted — they'll just lose the custom cover and description.`
      : `Delete the empty course "${subject}"?`;
    if (!confirm(msg)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/courses/${encodeURIComponent(subject)}`, { method: 'DELETE', headers: authHeaders() });
      if (res.ok) { toast.success('Course metadata deleted'); onSaved(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to delete course'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: 'var(--medq-app-bg, #1a1d24)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b z-10" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <div>
            <h2 className="text-base font-semibold text-white">Edit Course</h2>
            <p className="text-[10px] text-gray-500 mt-0.5">{subject} · {lectureCount} {lectureCount === 1 ? 'lecture' : 'lectures'}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 cursor-pointer"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="Cover image URL">
            <input value={form.coverUrl} onChange={e => setForm({ ...form, coverUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
            {form.coverUrl.trim() && (
              <div className="mt-2 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.04)' }}>
                <img src={form.coverUrl.trim()} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </Field>
          <Field label="Description">
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="A brief overview…" rows={3} className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none resize-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>
        </div>
        <div className="sticky bottom-0 flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <button onClick={handleDelete} disabled={deleting || saving} className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer disabled:opacity-40" style={{ color: TOKENS.color.red, background: 'rgba(255,87,87,0.08)', border: '1px solid rgba(255,87,87,0.2)' }}>
            {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} Delete
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:bg-white/5 cursor-pointer">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer" style={{ background: TOKENS.color.green, color: '#000' }}>
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-300 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

/* ───────── Questions Section — Clean Grid ───────── */

function QuestionsSection({ groupId, isAdmin, onAskAI }: { groupId: string; isAdmin: boolean; onAskAI?: (questionId: string, questionText: string) => void }) {
  const { authHeaders } = useCurrentUser();
  const [questions, setQuestions] = useState<GroupQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [search, setSearch] = useState('');
  // Debounced search — prevents a network request on every keystroke. The
  // fetch uses `debouncedSearch` (not `search`), so typing "cardiac" sends
  // one request after the user pauses, not 7.
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);
  const [creating, setCreating] = useState(false);
  const [selfTest, setSelfTest] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (difficulty !== 'all') params.set('difficulty', difficulty);
      if (bookmarkedOnly) params.set('bookmarked', '1');
      if (debouncedSearch.trim().length >= 2) params.set('search', debouncedSearch.trim());
      const res = await fetch(`/api/groups/${groupId}/questions?${params}`, { headers: authHeaders() });
      if (res.ok) { const d = await res.json(); setQuestions(d.questions || []); }
    } catch { toast.error('Failed to load questions'); }
    finally { setLoading(false); }
  }, [groupId, category, difficulty, bookmarkedOnly, debouncedSearch, authHeaders]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  if (creating) {
    return <QuestionCreateDialog groupId={groupId} onClose={() => setCreating(false)} onCreated={() => { setCreating(false); fetchQuestions(); }} />;
  }
  if (selfTest && questions.length > 0) {
    return <SelfTestMode groupId={groupId} questions={questions} onExit={() => setSelfTest(false)} />;
  }

  return (
    <div className={`${TOKENS.body.spacing} ${TOKENS.body.scroll} flex-1 flex flex-col min-h-0 ${TOKENS.body.padding}`}>
      {/* ─── Compact progress summary ───
          Single slim strip replacing the old 4-card stats grid, matching
          the lectures tab. The bookmark count stays clickable as a quick
          filter toggle (same as before, just less visual weight). The
          correct/attempts counts are useful practice stats but don't need
          their own card each. */}
      <div className="flex items-center gap-3 px-1 flex-wrap">
        <div className="flex items-center gap-2 text-xs flex-shrink-0">
          <span className="font-semibold text-white tabular-nums">{questions.length}</span>
          <span className="text-gray-500">questions</span>
        </div>
        <span className="text-gray-700">·</span>
        <button
          onClick={() => setBookmarkedOnly(b => !b)}
          className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
          style={{ color: bookmarkedOnly ? '#f59e0b' : '#8b95a7' }}
        >
          <Bookmark className="w-3 h-3" />
          <span className="font-semibold tabular-nums">{questions.filter(q => q.bookmarked).length}</span>
          <span className="opacity-70">saved</span>
        </button>
        <span className="text-gray-700">·</span>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#8b95a7' }}>
          <CheckCircle2 className="w-3 h-3" style={{ color: '#00e5a0' }} />
          <span className="font-semibold tabular-nums">{questions.reduce((n, q) => n + (q.myAttempts?.correct || 0), 0)}</span>
          <span className="opacity-70">/ {questions.reduce((n, q) => n + (q.myAttempts?.count || 0), 0)} correct</span>
        </div>
      </div>

      {/* ─── Toolbar: search + primary actions on top, filters below ───
          Unified with the lectures tab — same visual language, same chip
          component. Reorganized into two clearly-separated rows:
            Row 1: search bar (flex-1) + Self-test + Add (admin) — primary
                   "I want to find / create" actions.
            Row 2: category chips + difficulty + bookmark toggle — filters.
          STICKY so the user can keep filtering while scrolling through a
          long question bank. */}
      <div
        className={`rounded-2xl p-3 sm:p-4 ${TOKENS.body.spacing} sticky top-0 z-30`}
        style={{ background: TOKENS.header.bg, backdropFilter: TOKENS.header.blur, WebkitBackdropFilter: TOKENS.header.blur, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
      >
        {/* Row 1: search + primary actions (Self-test, Add) */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className={`w-full ${TOKENS.search.inputPadding} ${TOKENS.search.inputRadius} text-sm outline-none`}
              style={{ background: TOKENS.search.inputBg, border: TOKENS.search.inputBorder, color: 'white' }}
            />
          </div>
          {questions.length > 0 && (
            <button
              onClick={() => setSelfTest(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-shrink-0"
              style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0', border: '1px solid rgba(0,229,160,0.3)' }}
            >
              <Play className="w-3.5 h-3.5" /> Self-test
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#c0c8d5', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          )}
        </div>
        {/* Row 2: filters — category chips (left) + difficulty select +
            bookmark toggle (right). Removed the "Category" text label to
            match the lectures toolbar — the chips' icons are enough.
            On narrow screens this row wraps naturally under the search row. */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <FilterChip active={category === 'all'} onClick={() => setCategory('all')} label="All" />
            {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
              <FilterChip
                key={key}
                active={category === key}
                onClick={() => setCategory(key)}
                label={cfg.label}
                icon={cfg.icon}
                color={cfg.color}
              />
            ))}
          </div>
          {/* Divider */}
          <div className="h-5 w-px self-center" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex items-center gap-1.5 ml-auto">
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#c0c8d5' }}
            >
              <option value="all">All levels</option>
              <option value="Easy">Easy</option>
              <option value="Basic">Basic</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              onClick={() => setBookmarkedOnly(b => !b)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0"
              style={{
                background: bookmarkedOnly ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.04)',
                color: bookmarkedOnly ? '#00e5a0' : '#8b95a7',
                border: bookmarkedOnly ? '1px solid rgba(0,229,160,0.3)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Bookmark className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Bookmarked</span>
            </button>
          </div>
          {/* Clear all — visible when any filter is active. Lets the user
              reset category + difficulty + bookmarked + search in one click. */}
          {(category !== 'all' || difficulty !== 'all' || bookmarkedOnly || debouncedSearch.trim()) && (
            <button
              onClick={() => { setCategory('all'); setDifficulty('all'); setBookmarkedOnly(false); setSearch(''); }}
              className="text-xs font-semibold text-[#ff8c42] hover:underline cursor-pointer flex-shrink-0"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Question grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderLeft: '3px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-20 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="h-3 w-3/4 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 w-full rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="h-2.5 w-5/6 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
              <div className="flex gap-2 pt-1">
                <div className="h-2 w-12 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="h-2 w-10 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
            </div>
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-16 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <ListChecks className="w-10 h-10 text-gray-700 mx-auto mb-3" />
          <p className="text-sm text-gray-400 mb-1">No questions match these filters.</p>
          <button
            onClick={() => { setCategory('all'); setDifficulty('all'); setBookmarkedOnly(false); setSearch(''); }}
            className="text-xs font-semibold text-[#00e5a0] hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {questions.map(q => (
            <QuestionCard key={q.id} groupId={groupId} question={q} onUpdate={fetchQuestions} isAdmin={isAdmin} onAskAI={onAskAI} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label, icon: Icon, color }: { active: boolean; onClick: () => void; label: string; icon?: any; color?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
      style={{
        background: active ? `${color || '#00e5a0'}22` : 'rgba(255,255,255,0.04)',
        color: active ? (color || '#00e5a0') : '#8b95a7',
        border: active ? `1px solid ${color || '#00e5a0'}55` : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {Icon && <Icon className="w-3 h-3" />} {label}
    </button>
  );
}

/* ───────── Question Card ───────── */

function QuestionCard({ groupId, question, onUpdate, isAdmin, onAskAI }: { groupId: string; question: GroupQuestion; onUpdate: () => void; isAdmin: boolean; onAskAI?: (questionId: string, questionText: string) => void }) {
  const { authHeaders } = useCurrentUser();
  const [expanded, setExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [noteText, setNoteText] = useState('');

  const cat = CATEGORY_CONFIG[question.category] || CATEGORY_CONFIG.lecture;
  const CatIcon = cat.icon;
  const diffColor = DIFFICULTY_COLOR[question.difficulty] || '#8b95a7';

  const bookmark = async () => {
    try {
      await fetch(`/api/groups/${groupId}/questions/${question.id}/bookmark`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ bookmark: !question.bookmarked }),
      });
      onUpdate();
    } catch { toast.error('Failed to toggle bookmark'); }
  };

  const loadNotes = async () => {
    try {
      const res = await fetch(`/api/groups/${groupId}/questions/${question.id}/note`, { headers: authHeaders() });
      if (res.ok) { const d = await res.json(); setNotes(d.notes || []); }
    } catch { /* ignore */ }
  };

  const addNote = async () => {
    if (!noteText.trim()) return;
    try {
      const res = await fetch(`/api/groups/${groupId}/questions/${question.id}/note`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ text: noteText.trim() }),
      });
      if (res.ok) { setNoteText(''); loadNotes(); toast.success('Note added'); }
    } catch { toast.error('Failed to add note'); }
  };

  let options: string[] = [];
  try { options = JSON.parse(question.options || '[]'); } catch {}

  return (
    <div
      className={`${TOKENS.card.radius} overflow-hidden ${TOKENS.card.transition} ${TOKENS.card.hoverScale} ${TOKENS.card.hoverLift} ${TOKENS.card.hoverShadow} relative group`}
      style={{
        background: TOKENS.card.bg,
        border: TOKENS.card.border,
        borderLeft: `3px solid ${diffColor}`,
        boxShadow: TOKENS.card.shadow,
      }}
    >
      {/* Card header — rendered as a div (not a <button>) because it
          contains nested <button> elements (bookmark toggle) which
          would otherwise cause invalid HTML nesting and a hydration
          error. Keyboard accessibility is preserved via role/tabIndex
          and an onKeyDown handler. */}
      <div
        onClick={() => setExpanded(e => !e)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(e => !e); } }}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        className="w-full text-left p-4 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]/40"
      >
        <div className="flex items-start gap-3">
          {/* Category icon */}
          <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}22` }}>
            <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
          </div>
          {/* Question text + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: cat.color }}>{cat.label}</span>
              {question.difficulty && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: `${diffColor}22`, color: diffColor }}>
                  {question.difficulty}
                </span>
              )}
              {question.lecture && (
                <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                  <BookOpen className="w-2.5 h-2.5" /> {question.lecture.title}
                </span>
              )}
            </div>
            <p className={`text-sm text-gray-200 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>{question.text}</p>
            {/* Stats footer */}
            <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
              {question.myAttempts && question.myAttempts.count > 0 && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {question.myAttempts.correct}/{question.myAttempts.count} correct
                </span>
              )}
              {question._count?.comments ? (
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> {question._count.comments}
                </span>
              ) : null}
              {question.author?.name && (
                <span>by {question.author.name}</span>
              )}
            </div>
          </div>
          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); bookmark(); }}
              className="p-1.5 rounded-lg hover:bg-white/5"
              title={question.bookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {question.bookmarked ? (
                <BookmarkCheck className="w-4 h-4" style={{ color: '#00e5a0' }} />
              ) : (
                <Bookmark className="w-4 h-4 text-gray-500" />
              )}
            </button>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 space-y-3">
          {/* Options */}
          {options.length > 0 && (
            <div className="space-y-1.5">
              {options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isAnswer = question.answer === letter || question.answer === opt;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                    style={{
                      background: isAnswer ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.02)',
                      border: isAnswer ? '1px solid rgba(0,229,160,0.3)' : '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{
                        background: isAnswer ? '#00e5a0' : 'rgba(255,255,255,0.06)',
                        color: isAnswer ? '#000' : '#8b95a7',
                      }}
                    >
                      {isAnswer ? <Check className="w-3 h-3" /> : letter}
                    </span>
                    <span className={isAnswer ? 'text-white' : 'text-gray-300'}>{opt}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Explanation */}
          {question.explanation && (
            <div className="p-3 rounded-lg text-xs leading-relaxed" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.2)', color: '#a8c5d8' }}>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-1">Explanation</div>
              {question.explanation}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1 flex-wrap">
            <ActionBtn icon={StickyNote} label="Notes" active={showNotes} onClick={() => { setShowNotes(s => !s); if (!showNotes) loadNotes(); }} />
            <ActionBtn icon={MessageSquare} label="Discussion" active={showDiscussion} onClick={() => setShowDiscussion(s => !s)} />
            <ActionBtn icon={Flag} label="Report" active={showReport} onClick={() => setShowReport(s => !s)} />
            {onAskAI && (
              <ActionBtn
                icon={Sparkles}
                label="Ask AI"
                onClick={() => onAskAI(question.id, question.text)}
              />
            )}
            {isAdmin && (
              <ActionBtn icon={Trash2} label="Delete" danger onClick={async () => {
                if (!confirm('Delete this question?')) return;
                try {
                  await fetch(`/api/groups/${groupId}/questions/${question.id}`, { method: 'DELETE', headers: authHeaders() });
                  toast.success('Question deleted'); onUpdate();
                } catch { toast.error('Failed to delete'); }
              }} />
            )}
          </div>

          {/* Inline panels */}
          {showNotes && (
            <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
              {notes.length === 0 ? <p className="text-xs text-gray-500">No notes yet.</p> : null}
              {notes.map((n, i) => (
                <div key={i} className="p-2 rounded-lg text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.03)' }}>{n.text}</div>
              ))}
              <div className="flex gap-2">
                <input
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addNote()}
                  placeholder="Add a private note..."
                  className="flex-1 px-2 py-1.5 rounded-lg text-xs outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
                />
                <button onClick={addNote} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
          {showDiscussion && <QuestionDiscussion groupId={groupId} questionId={question.id} />}
          {showReport && <ReportForm groupId={groupId} questionId={question.id} onDone={() => setShowReport(false)} />}
        </div>
      )}
    </div>
  );
}

function ActionBtn({ icon: Icon, label, onClick, active, danger }: { icon: any; label: string; onClick: () => void; active?: boolean; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all"
      style={{
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: danger ? '#ff8c42' : '#8b95a7',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Icon className="w-3 h-3" /> {label}
    </button>
  );
}

/* ───────── Question Discussion (threaded comments) ───────── */

interface QComment {
  id: string;
  content: string;
  createdAt: string;
  author?: { id: string; name: string | null };
  replies?: QComment[];
}

function QuestionDiscussion({ groupId, questionId }: { groupId: string; questionId: string }) {
  const { authHeaders } = useCurrentUser();
  const [comments, setComments] = useState<QComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/groups/${groupId}/questions/${questionId}/comments`, { headers: authHeaders() });
      if (res.ok) { const d = await res.json(); setComments(d.comments || []); }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [groupId, questionId, authHeaders]);

  useEffect(() => { load(); }, [load]);

  const submit = async (parentId?: string) => {
    const body = parentId ? { content: text, parentCommentId: parentId } : { content: text };
    if (!text.trim()) return;
    try {
      const res = await fetch(`/api/groups/${groupId}/questions/${questionId}/comments`, {
        method: 'POST', headers: authHeaders(), body: JSON.stringify(body),
      });
      if (res.ok) { setText(''); load(); }
    } catch { /* ignore */ }
  };

  if (loading) return <div className="py-3 text-center text-xs text-gray-500">Loading...</div>;

  return (
    <div className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
      {comments.length === 0 && <p className="text-xs text-gray-500">No discussion yet. Start the conversation.</p>}
      {comments.map(c => <CommentItem key={c.id} comment={c} depth={0} />)}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-1.5 rounded-lg text-xs outline-none"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
        />
        <button onClick={() => submit()} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}>
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function CommentItem({ comment, depth }: { comment: QComment; depth: number }) {
  return (
    <div className="space-y-2" style={{ marginLeft: depth * 16 }}>
      <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}>
            {(comment.author?.name || '?').charAt(0)}
          </div>
          <span className="text-[11px] font-medium text-gray-300">{comment.author?.name || 'Anonymous'}</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{comment.content}</p>
      </div>
      {comment.replies?.map(r => <CommentItem key={r.id} comment={r} depth={depth + 1} />)}
    </div>
  );
}

/* ───────── Report Form ───────── */

function ReportForm({ groupId, questionId, onDone }: { groupId: string; questionId: string; onDone: () => void }) {
  const { authHeaders } = useCurrentUser();
  const [reason, setReason] = useState('incorrect_answer');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/questions/${questionId}/report`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ reason, details }),
      });
      if (res.ok) { toast.success('Report submitted'); onDone(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed to submit'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
      <select value={reason} onChange={e => setReason(e.target.value)}
        className="w-full px-2 py-1.5 rounded-lg text-xs outline-none"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}>
        <option value="incorrect_answer">Incorrect answer</option>
        <option value="unclear_question">Unclear question</option>
        <option value="outdated_content">Outdated content</option>
        <option value="spam">Spam</option>
        <option value="other">Other</option>
      </select>
      <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Provide details..."
        rows={2}
        className="w-full px-2 py-1.5 rounded-lg text-xs outline-none resize-none"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }} />
      <button onClick={submit} disabled={submitting}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
        style={{ background: 'rgba(255,140,66,0.15)', color: '#ff8c42', border: '1px solid rgba(255,140,66,0.3)' }}>
        {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Flag className="w-3 h-3" />} Submit report
      </button>
    </div>
  );
}

/* ───────── Question Create Dialog (admin) ───────── */

function QuestionCreateDialog({ groupId, onClose, onCreated }: { groupId: string; onClose: () => void; onCreated: () => void }) {
  const { authHeaders } = useCurrentUser();
  const [form, setForm] = useState({
    text: '', category: 'high_yield', difficulty: 'Moderate',
    options: ['', '', '', ''], answer: 'A',
    explanation: '', system: '', topic: '', lectureId: '',
  });
  const [saving, setSaving] = useState(false);

  // Close on Escape — matches the drawer/overlay pattern.
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const submit = async () => {
    if (!form.text.trim()) { toast.error('Question text required'); return; }
    // Validate that the selected answer points to a non-empty option. Without
    // this, filtering out blank options on submit can leave `answer` pointing
    // to a now-deleted option letter (e.g. answer='D' but D was blank and
    // filtered out), making the question unanswerable.
    const answerIdx = form.answer.charCodeAt(0) - 65;
    if (!form.options[answerIdx]?.trim()) {
      toast.error('The selected answer points to an empty option. Fill it in or pick a different answer.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/questions`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({
          ...form,
          options: JSON.stringify(form.options.filter(o => o.trim())),
        }),
      });
      if (res.ok) { toast.success('Question created'); onCreated(); }
      else { const d = await res.json(); toast.error(d.error || 'Failed'); }
    } catch { toast.error('Failed'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: 'var(--medq-app-bg, #1a1d24)', border: '1px solid rgba(255,255,255,0.08)' }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <h2 className="text-base font-semibold text-white">New Question</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-5 space-y-3">
          <Field label="Question text *">
            <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={3}
              placeholder="Enter the clinical scenario..."
              className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {Object.entries(CATEGORY_CONFIG).map(([k, c]) => <option key={k} value={k}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Difficulty">
              <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {['Easy', 'Basic', 'Moderate', 'Hard', 'Expert'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Options (correct answer highlighted)</label>
            <div className="space-y-2">
              {form.options.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isAnswer = form.answer === letter;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <button
                      onClick={() => setForm({ ...form, answer: letter })}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                      style={{
                        background: isAnswer ? '#00e5a0' : 'rgba(255,255,255,0.06)',
                        color: isAnswer ? '#000' : '#8b95a7',
                      }}
                    >
                      {letter}
                    </button>
                    <input
                      value={opt}
                      onChange={e => {
                        const next = [...form.options]; next[i] = e.target.value;
                        setForm({ ...form, options: next });
                      }}
                      placeholder={`Option ${letter}`}
                      className="flex-1 px-3 py-1.5 rounded-lg text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${isAnswer ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.08)'}` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Field label="Explanation">
            <textarea value={form.explanation} onChange={e => setForm({ ...form, explanation: e.target.value })} rows={2}
              placeholder="Why is this the correct answer?"
              className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} />
          </Field>
        </div>
        <div className="sticky bottom-0 flex items-center justify-end gap-2 px-5 py-4 border-t" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))', background: 'var(--medq-app-bg, #1a1d24)' }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-medium text-gray-400 hover:bg-white/5">Cancel</button>
          <button onClick={submit} disabled={saving}
            className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
            style={{ background: 'var(--medq-app-bg, #00e5a0)', color: '#000' }}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />} Create question
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Self-Test Mode (clean quiz interface) ───────── */

function SelfTestMode({ groupId, questions, onExit }: { groupId: string; questions: GroupQuestion[]; onExit: () => void }) {
  const { authHeaders } = useCurrentUser();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [submitting, setSubmitting] = useState(false);

  // Escape exits self-test (with confirm) — matches every other overlay.
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && confirm('Exit self-test? Your progress will be lost.')) onExit();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onExit]);

  const q = questions[idx];
  if (!q) return null;

  let options: string[] = [];
  try { options = JSON.parse(q.options || '[]'); } catch {}

  const submit = async (letter: string) => {
    if (revealed) return;
    setSelected(letter);
    setRevealed(true);
    setSubmitting(true);
    const correct = letter === q.answer;
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    try {
      await fetch(`/api/groups/${groupId}/quiz/attempt`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ questionId: q.id, selectedAnswer: letter, correct }),
      });
    } catch { /* ignore */ }
    finally { setSubmitting(false); }
  };

  const next = () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1); setSelected(null); setRevealed(false);
    } else {
      toast.success(`Self-test complete! Score: ${score.correct}/${score.total}`);
      onExit();
    }
  };

  const cat = CATEGORY_CONFIG[q.category] || CATEGORY_CONFIG.lecture;
  const diffColor = DIFFICULTY_COLOR[q.difficulty] || '#8b95a7';

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(8, 10, 14, 0.98)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'var(--medq-card-border, rgba(255,255,255,0.06))' }}>
        <button onClick={() => { if (confirm('Exit self-test? Your progress will be lost.')) onExit(); }} className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white cursor-pointer">
          <X className="w-4 h-4" /> Exit self-test
        </button>
        <div className="flex items-center gap-3">
          {/* Slim progress bar — scales to any question count (dots overflow at 40+) */}
          <div className="w-24 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full transition-all duration-300" style={{ width: `${((idx + (revealed ? 1 : 0)) / questions.length) * 100}%`, background: 'var(--medq-app-bg, #00e5a0)' }} />
          </div>
          <span className="text-xs text-gray-500 tabular-nums">{idx + 1} / {questions.length}</span>
          <span className="text-xs font-semibold tabular-nums" style={{ color: '#00e5a0' }}>{score.correct} correct</span>
        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: cat.color }}>{cat.label}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: `${diffColor}22`, color: diffColor }}>
              {q.difficulty}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-lg font-semibold text-white leading-relaxed mb-6">{q.text}</h2>

          {/* Options */}
          <div className="space-y-2">
            {options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              const isAnswer = q.answer === letter;
              const isSelected = selected === letter;
              let bg = 'rgba(255,255,255,0.04)';
              let border = '1px solid rgba(255,255,255,0.08)';
              let color = '#c0c8d5';
              if (revealed) {
                if (isAnswer) { bg = 'rgba(0,229,160,0.15)'; border = '1px solid #00e5a0'; color = '#fff'; }
                else if (isSelected) { bg = 'rgba(255,87,87,0.15)'; border = '1px solid #ff5757'; color = '#fff'; }
              } else if (isSelected) {
                bg = 'rgba(255,255,255,0.08)'; border = '1px solid rgba(255,255,255,0.2)';
              }
              return (
                <button
                  key={i}
                  onClick={() => submit(letter)}
                  disabled={revealed || submitting}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all hover:bg-white/5"
                  style={{ background: bg, border, color }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: revealed && isAnswer ? '#00e5a0' : 'rgba(255,255,255,0.06)', color: revealed && isAnswer ? '#000' : '#8b95a7' }}>
                    {revealed && isAnswer ? <Check className="w-3 h-3" /> : letter}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation (after answer) */}
          {revealed && q.explanation && (
            <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.2)', color: '#a8c5d8' }}>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-1">Explanation</div>
              {q.explanation}
            </div>
          )}

          {/* Skip button — visible before answering. Lets the user move on
              without guessing; no attempt is recorded. Works on the last
              question too (finishes the test). */}
          {!revealed && (
            <button
              onClick={next}
              className="mt-6 w-full py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors hover:bg-white/5 cursor-pointer"
              style={{ color: '#8b95a7', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {idx < questions.length - 1 ? 'Skip' : 'Skip & finish'} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
          {/* Next button — visible after answering */}
          {revealed && (
            <button
              onClick={next}
              className="mt-6 w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              style={{ background: 'var(--medq-app-bg, #00e5a0)', color: '#000' }}
            >
              {idx < questions.length - 1 ? <>Next question <ChevronRight className="w-4 h-4" /></> : 'Finish self-test'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
