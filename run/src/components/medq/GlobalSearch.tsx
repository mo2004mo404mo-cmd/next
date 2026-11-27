'use client';

/**
 * GlobalSearch — Command Palette edition.
 *
 * Three layers of results, top to bottom:
 *   1. Quick Actions  — common one-tap actions (Start Quiz, Review Cards, …)
 *   2. Navigate       — fuzzy jump to any of the 40+ app tabs
 *   3. Content Search — existing /api/search results (questions, notes,
 *                       flashcards, discussions) preserved unchanged
 *
 * Behaviour:
 *   • Empty query       → show recent searches + popular destinations + quick actions
 *   • ">" prefix        → show ONLY navigation matches (e.g. ">card" → Cards tabs)
 *   • "/" prefix        → show ONLY quick actions (e.g. "/quiz")
 *   • Any other query   → navigation + quick actions + content search (debounced)
 *
 * Keyboard:
 *   ↑ ↓ navigate · ↵ open · esc close · ⌘K toggle (handled by parent shell)
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Search, X, BookOpen, FileText, MessageCircle, Brain,
  Clock, ArrowRight, Loader2, Sparkles, Home, Flame,
  Trophy, PenLine, Stethoscope, GraduationCap, Mic,
  Film, Eye, Gamepad2, Users, Settings, Zap, Bookmark,
  Brain as BrainIcon, FolderOpen, FileText as FileTextIcon,
  UsersRound, ClipboardList, ExternalLink,
} from 'lucide-react';

/* ───────── Content search types (preserved from v1) ───────── */

interface SearchResult {
  id: string;
  type: 'question' | 'note' | 'discussion' | 'flashcard' | 'group' | 'guideline';
  title: string;
  snippet: string;
  matchingField: string;
  system?: string;
  topic?: string;
  difficulty?: string;
  questionId?: string;
  author?: string;
}

interface SearchResponse {
  questions: SearchResult[];
  notes: SearchResult[];
  discussions: SearchResult[];
  flashcards: SearchResult[];
  groups: SearchResult[];
  guidelines: SearchResult[];
  total: number;
}

const TYPE_CONFIG: Record<string, { icon: typeof BookOpen; label: string; color: string; tab: string }> = {
  question: { icon: BookOpen, label: 'Question', color: '#00e5a0', tab: 'bank' },
  note: { icon: FileText, label: 'Note', color: '#4fc3f7', tab: 'bank' },
  discussion: { icon: MessageCircle, label: 'Discussion', color: '#8b5cf6', tab: 'bank' },
  flashcard: { icon: Brain, label: 'Flashcard', color: '#f59e0b', tab: 'flashcards' },
  group: { icon: UsersRound, label: 'Group', color: '#8b5cf6', tab: 'groups' },
  guideline: { icon: ClipboardList, label: 'Guideline', color: '#06b6d4', tab: 'guideline-library' },
};

const MATCHING_FIELD_LABELS: Record<string, string> = {
  text: 'Question Text',
  explanation: 'Explanation',
  mnemonic: 'Mnemonic',
  clinicalPearl: 'Clinical Pearl',
  system: 'System',
  topic: 'Topic',
  tags: 'Tags',
  note: 'Note Text',
  content: 'Discussion',
  questionText: 'Question',
  // Groups
  name: 'Group Name',
  description: 'Description',
  university: 'University',
  specialty: 'Specialty',
  year: 'Year',
  // Guidelines
  title: 'Title',
  society: 'Society',
  summary: 'Summary',
};

/* ───────── NEW: Navigation registry ─────────
 * Static list of every navigable tab. Kept in this file (not imported from
 * MedQAppShell) so the palette stays self-contained and tree-shakeable.
 * When a tab is added/removed in the shell, update this list too. */

interface NavItem {
  id: string;
  label: string;
  section: string;
  icon: typeof Home;
  color?: string;
  keywords?: string[]; // extra fuzzy-match terms
  premium?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  // Home
  { id: 'dashboard', label: 'Home', section: 'Home', icon: Home, color: '#00e5a0', keywords: ['main', 'overview'] },

  // Library
  { id: 'bank', label: 'Question Bank', section: 'Library', icon: BookOpen, keywords: ['questions', 'mcq', 'quiz'] },
  { id: 'flashcards', label: 'Flashcards', section: 'Library', icon: Brain, keywords: ['cards', 'spaced', 'review'] },
  { id: 'review', label: 'Review Hub', section: 'Library', icon: Flame, color: '#f59e0b', keywords: ['spaced repetition'] },
  { id: 'lab-values', label: 'Lab Values', section: 'Library', icon: FileText, color: '#06b6d4' },
  { id: 'exams', label: 'Exams', section: 'Library', icon: FileText, keywords: ['test', 'mock'] },
  { id: 'collections', label: 'Collections', section: 'Library', icon: FolderOpen, keywords: ['folders'] },
  { id: 'create', label: 'Create', section: 'Library', icon: PenLine, keywords: ['new', 'add'] },

  // AI Tools
  { id: 'generate', label: 'Generate Questions', section: 'AI Tools', icon: Zap, premium: true, keywords: ['ai', 'auto'] },
  { id: 'tutor', label: 'AI Tutor', section: 'AI Tools', icon: MessageCircle, premium: true, keywords: ['chat', 'assistant'] },
  { id: 'cases', label: 'Case Simulator', section: 'AI Tools', icon: Stethoscope, premium: true },
  { id: 'mnemonics', label: 'AI Mnemonics', section: 'AI Tools', icon: Sparkles, premium: true },
  { id: 'voice', label: 'Voice Study', section: 'AI Tools', icon: Mic, premium: true },
  { id: 'video', label: 'Video Lessons', section: 'AI Tools', icon: Film, premium: true },
  { id: 'anatomy', label: 'Anatomy 3D', section: 'AI Tools', icon: Eye, premium: true },
  { id: 'clinical-vignettes', label: 'Clinical Vignettes', section: 'AI Tools', icon: FileText, color: '#ff5757', premium: true },
  { id: 'board-prep', label: 'Board Prep', section: 'AI Tools', icon: GraduationCap, premium: true },

  // Practice
  { id: 'qotd', label: 'Question of the Day', section: 'Practice', icon: Zap, color: '#f59e0b' },
  { id: 'challenge', label: 'Daily Challenge', section: 'Practice', icon: Trophy },
  { id: 'speed-quiz', label: 'Speed Quiz', section: 'Practice', icon: Gamepad2, color: '#00e5a0' },
  { id: 'arena', label: 'Challenge Arena', section: 'Practice', icon: Trophy },
  { id: 'leaderboard', label: 'Leaderboard', section: 'Practice', icon: Trophy, color: '#f59e0b' },

  // Community
  { id: 'groups', label: 'Groups', section: 'Community', icon: Users, color: '#8b5cf6' },

  // Reference
  { id: 'guideline-library', label: 'Guideline Library', section: 'Reference', icon: ClipboardList, color: '#06b6d4', keywords: ['guidelines', 'society', 'aha', 'esc'] },
];

/* ───────── NEW: Quick Actions registry ─────────
 * Common one-tap actions. Each maps to a tab + optional payload that the
 * destination tab can read on mount (e.g. auto-open quiz config). For now
 * these just navigate — but the structure is here for future deep-linking. */

interface QuickAction {
  id: string;
  label: string;
  hint: string;
  icon: typeof Zap;
  color: string;
  tab: string;
  keywords?: string[];
}

const QUICK_ACTIONS: QuickAction[] = [
  { id: 'start-quiz', label: 'Start a Quiz', hint: 'Open Question Bank', icon: BookOpen, color: '#00e5a0', tab: 'bank', keywords: ['mcq', 'test'] },
  { id: 'review-cards', label: 'Review Flashcards', hint: 'Due cards today', icon: Brain, color: '#f59e0b', tab: 'flashcards', keywords: ['spaced', 'repetition'] },
  { id: 'review-hub', label: 'Open Review Hub', hint: 'Spaced repetition dashboard', icon: Flame, color: '#f59e0b', tab: 'review' },
  { id: 'daily-challenge', label: 'Take Daily Challenge', hint: 'Today\'s set', icon: Trophy, color: '#f59e0b', tab: 'challenge' },
  { id: 'qotd', label: 'Question of the Day', hint: 'Daily high-yield MCQ', icon: Zap, color: '#f59e0b', tab: 'qotd' },
  { id: 'ai-tutor', label: 'Ask AI Tutor', hint: 'Chat with AI', icon: MessageCircle, color: '#8b5cf6', tab: 'tutor', keywords: ['chat', 'help'] },
  { id: 'case-sim', label: 'Case Simulator', hint: 'Practice clinical cases', icon: Stethoscope, color: '#8b5cf6', tab: 'cases' },
  { id: 'mnemonics', label: 'Make a Mnemonic', hint: 'AI-generated memory aids', icon: Sparkles, color: '#8b5cf6', tab: 'mnemonics' },
  { id: 'speed-quiz', label: 'Speed Quiz', hint: '60-second rapid fire', icon: Gamepad2, color: '#00e5a0', tab: 'speed-quiz' },
  { id: 'create-question', label: 'Create a Question', hint: 'Add to question bank', icon: PenLine, color: '#4fc3f7', tab: 'create' },
  { id: 'open-groups', label: 'Open Study Groups', hint: 'Group study & lectures', icon: Users, color: '#8b5cf6', tab: 'groups' },
  { id: 'open-exams', label: 'Take an Exam', hint: 'Mock exam mode', icon: FileText, color: '#4fc3f7', tab: 'exams' },
];

/* ───────── Fuzzy match (very small, no dep) ───────── */

function fuzzyMatch(haystack: string, query: string): boolean {
  const h = haystack.toLowerCase();
  const q = query.toLowerCase();
  if (h.includes(q)) return true;
  // Subsequence fuzzy: each char of q appears in haystack in order
  let qi = 0;
  for (let hi = 0; hi < h.length && qi < q.length; hi++) {
    if (h[hi] === q[qi]) qi++;
  }
  return qi === q.length;
}

function fuzzyScore(haystack: string, query: string): number {
  const h = haystack.toLowerCase();
  const q = query.toLowerCase();
  if (h === q) return 1000;
  if (h.startsWith(q)) return 500 - (h.length - q.length);
  const idx = h.indexOf(q);
  if (idx >= 0) return 200 - idx;
  // Subsequence
  let qi = 0;
  let lastMatch = -1;
  let gapPenalty = 0;
  for (let hi = 0; hi < h.length && qi < q.length; hi++) {
    if (h[hi] === q[qi]) {
      if (lastMatch >= 0) gapPenalty += (hi - lastMatch - 1);
      lastMatch = hi;
      qi++;
    }
  }
  if (qi === q.length) return 100 - gapPenalty;
  return -1;
}

/* ───────── Recent searches (preserved from v1) ───────── */

const RECENT_SEARCHES_KEY = 'medq-recent-searches';
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(query: string) {
  if (typeof window === 'undefined') return;
  try {
    const recent = getRecentSearches().filter(r => r !== query);
    recent.unshift(query);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch { /* ignore */ }
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || !text) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-[#00e5a0] font-semibold bg-[#00e5a0]/10 px-0.5 rounded">
        {text.slice(index, index + query.length)}
      </span>
      {text.slice(index + query.length)}
    </>
  );
}

/* ───────── Main component ───────── */

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export default function GlobalSearch({ open, onClose, onNavigateToTab }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setRecentSearches(getRecentSearches());
      setQuery('');
      setResults(null);
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Determine the query mode
  const mode: 'nav' | 'actions' | 'all' = useMemo(() => {
    if (query.startsWith('>')) return 'nav';
    if (query.startsWith('/')) return 'actions';
    return 'all';
  }, [query]);

  const strippedQuery = query.replace(/^[>/]/, '').trim();

  // Navigation matches (only when mode === 'nav' or mode === 'all' with strippedQuery length > 0)
  const navMatches = useMemo(() => {
    if (mode === 'actions') return [];
    if (!strippedQuery && mode === 'all') return []; // empty query → no nav
    if (!strippedQuery) return NAV_ITEMS.slice(0, 6); // ">"+empty → show top 6
    return NAV_ITEMS
      .map(item => {
        const score = Math.max(
          fuzzyScore(item.label, strippedQuery),
          ...(item.keywords || []).map(k => fuzzyScore(k, strippedQuery)),
          fuzzyScore(item.section, strippedQuery),
        );
        return { item, score };
      })
      .filter(r => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(r => r.item);
  }, [strippedQuery, mode]);

  // Quick action matches
  const actionMatches = useMemo(() => {
    if (mode === 'nav') return [];
    if (!strippedQuery && mode === 'all') return [];
    if (!strippedQuery) return QUICK_ACTIONS.slice(0, 4); // "/"+empty → top 4
    return QUICK_ACTIONS
      .map(action => {
        const score = Math.max(
          fuzzyScore(action.label, strippedQuery),
          ...(action.keywords || []).map(k => fuzzyScore(k, strippedQuery)),
          fuzzyScore(action.hint, strippedQuery),
        );
        return { action, score };
      })
      .filter(r => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(r => r.action);
  }, [strippedQuery, mode]);

  // Debounced content search — ONLY in 'all' mode with query length >= 2
  useEffect(() => {
    if (mode !== 'all' || !query || query.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setResults(await res.json());
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setLoading(false);
      }
      setSelectedIndex(-1);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, mode]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Combined flat list for keyboard navigation
  type CombinedItem =
    | { kind: 'nav'; item: NavItem }
    | { kind: 'action'; item: QuickAction }
    | { kind: 'content'; item: SearchResult };

  const flatItems = useCallback((): CombinedItem[] => {
    const out: CombinedItem[] = [];
    navMatches.forEach(item => out.push({ kind: 'nav', item }));
    actionMatches.forEach(item => out.push({ kind: 'action', item }));
    if (results && mode === 'all') {
      [
        ...results.questions,
        ...results.notes,
        ...results.discussions,
        ...results.flashcards,
        ...results.groups,
        ...results.guidelines,
      ].forEach(item => out.push({ kind: 'content', item }));
    }
    return out;
  }, [navMatches, actionMatches, results, mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = flatItems();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < items.length) {
      e.preventDefault();
      activate(items[selectedIndex]);
    }
  };

  const activate = (entry: CombinedItem) => {
    if (entry.kind === 'nav') {
      addRecentSearch(query);
      onClose();
      onNavigateToTab(entry.item.id);
    } else if (entry.kind === 'action') {
      addRecentSearch(query);
      onClose();
      onNavigateToTab(entry.item.tab);
    } else {
      const config = TYPE_CONFIG[entry.item.type];
      addRecentSearch(query);
      onClose();
      onNavigateToTab(config.tab);
    }
  };

  const handleRecentClick = (recentQuery: string) => setQuery(recentQuery);

  const handleRemoveRecent = (recentQuery: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = getRecentSearches().filter(r => r !== recentQuery);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    setRecentSearches(updated);
  };

  // Scroll selected into view
  useEffect(() => {
    if (selectedIndex < 0) return;
    const el = document.getElementById(`palette-item-${selectedIndex}`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!open) return null;

  const items = flatItems();
  let globalIndex = -1;

  /* ─── Render helpers ─── */

  const renderNavRow = (item: NavItem) => {
    globalIndex++;
    const idx = globalIndex;
    const isSelected = idx === selectedIndex;
    const Icon = item.icon;
    const color = item.color || '#8b95a8';
    return (
      <button
        key={`nav-${item.id}`}
        id={`palette-item-${idx}`}
        onClick={() => activate({ kind: 'nav', item })}
        onMouseEnter={() => setSelectedIndex(idx)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
          isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
        }`}
        style={isSelected ? { borderLeft: '2px solid #00e5a0' } : { borderLeft: '2px solid transparent' }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
          <Icon className="w-3.5 h-3.5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-[#e8ecf4] font-medium leading-tight">
            {strippedQuery ? highlightMatch(item.label, strippedQuery) : item.label}
          </div>
          <div className="text-[10px] text-[#5a6478] mt-0.5">{item.section}{item.premium ? ' · Premium' : ''}</div>
        </div>
        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isSelected ? '#00e5a0' : '#3a4055' }} />
      </button>
    );
  };

  const renderActionRow = (action: QuickAction) => {
    globalIndex++;
    const idx = globalIndex;
    const isSelected = idx === selectedIndex;
    const Icon = action.icon;
    return (
      <button
        key={`action-${action.id}`}
        id={`palette-item-${idx}`}
        onClick={() => activate({ kind: 'action', item: action })}
        onMouseEnter={() => setSelectedIndex(idx)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
          isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
        }`}
        style={isSelected ? { borderLeft: '2px solid #00e5a0' } : { borderLeft: '2px solid transparent' }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${action.color}15` }}>
          <Icon className="w-3.5 h-3.5" style={{ color: action.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-[#e8ecf4] font-medium leading-tight">
            {strippedQuery ? highlightMatch(action.label, strippedQuery) : action.label}
          </div>
          <div className="text-[10px] text-[#5a6478] mt-0.5">{action.hint}</div>
        </div>
        <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[#5a6478]">↵</kbd>
      </button>
    );
  };

  const renderContentGroup = (
    type: 'question' | 'note' | 'discussion' | 'flashcard' | 'group' | 'guideline',
    groupResults: SearchResult[]
  ) => {
    if (groupResults.length === 0) return null;
    const config = TYPE_CONFIG[type];
    const Icon = config.icon;
    return (
      <div className="mb-2">
        <div className="flex items-center gap-2 px-4 py-2 sticky top-0 z-10" style={{ background: '#1a1e2e' }}>
          <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: config.color }}>
            {type === 'guideline' ? 'Guidelines' : `${config.label}s`}
          </span>
          <span className="text-[10px] text-[#5a6478] ml-auto">{groupResults.length}</span>
        </div>
        {groupResults.map(result => {
          globalIndex++;
          const idx = globalIndex;
          const isSelected = idx === selectedIndex;
          // Customize the metadata badges based on result type so groups show
          // member count + public/private, and guidelines show specialty + society + year.
          const isGroup = type === 'group';
          const isGuideline = type === 'guideline';
          return (
            <button
              key={`${result.type}-${result.id}`}
              id={`palette-item-${idx}`}
              onClick={() => activate({ kind: 'content', item: result })}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all ${
                isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
              }`}
              style={isSelected ? { borderLeft: '2px solid #00e5a0' } : { borderLeft: '2px solid transparent' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${config.color}15` }}>
                <Icon className="w-4 h-4" style={{ color: config.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-[#e8ecf4] font-medium leading-tight line-clamp-2">
                  {highlightMatch(result.title, query)}
                </div>
                <div className="text-[11px] text-[#5a6478] mt-0.5 line-clamp-1">
                  {highlightMatch(result.snippet, query)}
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#5a6478]">
                    {MATCHING_FIELD_LABELS[result.matchingField] || result.matchingField}
                  </span>
                  {isGroup ? (
                    <>
                      {result.system && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#8b5cf6]" style={{ background: 'rgba(139,92,246,0.1)' }}>
                          {result.system}
                        </span>
                      )}
                      {result.difficulty && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#00e5a0]" style={{ background: 'rgba(0,229,160,0.1)' }}>
                          {result.difficulty} members
                        </span>
                      )}
                      {result.author && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#5a6478]" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          {result.author}
                        </span>
                      )}
                    </>
                  ) : isGuideline ? (
                    <>
                      {result.system && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#06b6d4]" style={{ background: 'rgba(6,182,212,0.1)' }}>
                          {result.system}
                        </span>
                      )}
                      {result.topic && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#8b5cf6]" style={{ background: 'rgba(139,92,246,0.1)' }}>
                          {result.topic}
                        </span>
                      )}
                      {result.difficulty && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#5a6478]">
                          {result.difficulty}
                        </span>
                      )}
                      {result.author && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] text-[#4fc3f7]">
                          <ExternalLink className="w-2.5 h-2.5" /> source
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {result.system && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#4fc3f7]" style={{ background: 'rgba(79,195,247,0.1)' }}>
                          {result.system}
                        </span>
                      )}
                      {result.topic && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#8b5cf6]" style={{ background: 'rgba(139,92,246,0.1)' }}>
                          {result.topic}
                        </span>
                      )}
                      {result.difficulty && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.05] text-[#5a6478]">
                          {result.difficulty}
                        </span>
                      )}
                      {result.author && (
                        <span className="text-[9px] text-[#5a6478]">by {result.author}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#3a4055] flex-shrink-0 mt-2" style={{ opacity: isSelected ? 1 : 0.3 }} />
            </button>
          );
        })}
      </div>
    );
  };

  /* ─── Empty state ─── */

  const isEmpty = !query && recentSearches.length === 0;
  const showRecent = !query && recentSearches.length > 0;
  const showNoContentResults = results && results.total === 0 && !loading && navMatches.length === 0 && actionMatches.length === 0;
  const showLoading = loading && !results;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[8vh] sm:pt-[12vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        ref={panelRef}
        className="relative w-[95vw] max-w-[640px] rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden animate-fade-in"
        style={{ background: '#151821', maxHeight: '74vh' }}
      >
        {/* ─── Input row ─── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <Search className="w-5 h-5 text-[#00e5a0] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or jump to…  (try > for tabs, / for actions)"
            className="flex-1 bg-transparent text-[15px] text-[#e8ecf4] placeholder:text-[#3a4055] outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-[#00e5a0]" />}
          {query && !loading && (
            <button
              onClick={() => { setQuery(''); setResults(null); inputRef.current?.focus(); }}
              className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/[0.06] transition-all"
            >
              <X className="w-3.5 h-3.5 text-[#5a6478]" />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] text-[#3a4055] bg-white/[0.04] border border-white/[0.06]">
            ESC
          </kbd>
        </div>

        {/* ─── Results scroll area ─── */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(74vh - 56px)', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>

          {/* Recent searches */}
          {showRecent && (
            <div className="py-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <Clock className="w-3.5 h-3.5 text-[#5a6478]" />
                <span className="text-[11px] font-bold text-[#5a6478] uppercase tracking-wider">Recent Searches</span>
              </div>
              {recentSearches.map(recent => (
                <button
                  key={recent}
                  onClick={() => handleRecentClick(recent)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/[0.03] transition-all group"
                >
                  <Clock className="w-3.5 h-3.5 text-[#3a4055]" />
                  <span className="flex-1 text-[13px] text-[#8b95a8] group-hover:text-[#e8ecf4]">{recent}</span>
                  <button
                    onClick={(e) => handleRemoveRecent(recent, e)}
                    className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded flex items-center justify-center hover:bg-white/[0.06] transition-all"
                  >
                    <X className="w-3 h-3 text-[#5a6478]" />
                  </button>
                </button>
              ))}
            </div>
          )}

          {/* Empty state — popular destinations + quick actions */}
          {isEmpty && (
            <div className="py-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00e5a0]" />
                <span className="text-[11px] font-bold text-[#5a6478] uppercase tracking-wider">Quick Actions</span>
              </div>
              {QUICK_ACTIONS.slice(0, 6).map(action => {
                globalIndex++;
                const idx = globalIndex;
                const isSelected = idx === selectedIndex;
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    id={`palette-item-${idx}`}
                    onClick={() => activate({ kind: 'action', item: action })}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
                      isSelected ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                    }`}
                    style={isSelected ? { borderLeft: '2px solid #00e5a0' } : { borderLeft: '2px solid transparent' }}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${action.color}15` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: action.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-[#e8ecf4] font-medium leading-tight">{action.label}</div>
                      <div className="text-[10px] text-[#5a6478] mt-0.5">{action.hint}</div>
                    </div>
                    <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[#5a6478]">↵</kbd>
                  </button>
                );
              })}

              <div className="flex items-center gap-2 px-4 py-2 mt-2">
                <Home className="w-3.5 h-3.5 text-[#5a6478]" />
                <span className="text-[11px] font-bold text-[#5a6478] uppercase tracking-wider">Popular Destinations</span>
              </div>
              {NAV_ITEMS.slice(0, 6).map(item => renderNavRow(item))}
            </div>
          )}

          {/* Navigation matches */}
          {navMatches.length > 0 && (
            <div className="py-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <Home className="w-3.5 h-3.5 text-[#8b95a8]" />
                <span className="text-[11px] font-bold text-[#5a6478] uppercase tracking-wider">Navigate</span>
                <span className="text-[10px] text-[#5a6478] ml-auto">{navMatches.length}</span>
              </div>
              {navMatches.map(item => renderNavRow(item))}
            </div>
          )}

          {/* Quick action matches */}
          {actionMatches.length > 0 && (
            <div className="py-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <Zap className="w-3.5 h-3.5 text-[#00e5a0]" />
                <span className="text-[11px] font-bold text-[#5a6478] uppercase tracking-wider">Quick Actions</span>
                <span className="text-[10px] text-[#5a6478] ml-auto">{actionMatches.length}</span>
              </div>
              {actionMatches.map(action => renderActionRow(action))}
            </div>
          )}

          {/* Content search results */}
          {results && results.total > 0 && mode === 'all' && (
            <div className="py-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <BookOpen className="w-3.5 h-3.5 text-[#5a6478]" />
                <span className="text-[11px] font-bold text-[#5a6478] uppercase tracking-wider">Content</span>
                <span className="text-[10px] text-[#5a6478] ml-auto">{results.total}</span>
              </div>
              {renderContentGroup('question', results.questions)}
              {renderContentGroup('flashcard', results.flashcards)}
              {renderContentGroup('group', results.groups)}
              {renderContentGroup('guideline', results.guidelines)}
              {renderContentGroup('note', results.notes)}
              {renderContentGroup('discussion', results.discussions)}
            </div>
          )}

          {/* No results anywhere */}
          {showNoContentResults && (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <Search className="w-6 h-6 text-[#3a4055]" />
              </div>
              <p className="text-[14px] font-semibold text-[#e8ecf4] mb-1">No results found</p>
              <p className="text-[12px] text-[#5a6478] text-center mb-4">
                Try different keywords, or use <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px]">{'>'}</kbd> for tabs · <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px]">/</kbd> for actions
              </p>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-[10px] text-[#3a4055]">Try:</span>
                {['Cardiology', 'Pharmacology', 'Diabetes', 'Anatomy'].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.06] text-[#5a6478] hover:text-[#00e5a0] hover:border-[#00e5a0]/20 hover:bg-[#00e5a0]/5 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {showLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#00e5a0] mb-3" />
              <p className="text-[12px] text-[#5a6478]">Searching…</p>
            </div>
          )}

          {/* Min chars hint */}
          {mode === 'all' && query.length === 1 && (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <Sparkles className="w-5 h-5 text-[#3a4055] mb-2" />
              <p className="text-[12px] text-[#5a6478]">Type at least 2 characters to search content</p>
            </div>
          )}
        </div>

        {/* ─── Footer ─── */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] text-[10px] text-[#3a4055]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[8px]">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[8px]">↵</kbd>
              Open
            </span>
            <span className="flex items-center gap-1 hidden sm:flex">
              <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[8px]">{'>'}</kbd>
              Tabs
            </span>
            <span className="flex items-center gap-1 hidden sm:flex">
              <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[8px]">/</kbd>
              Actions
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[8px]">esc</kbd>
              Close
            </span>
          </div>
          {items.length > 0 && (
            <span className="text-[#5a6478]">{items.length} item{items.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
    </div>
  );
}
