/**
 * URL routing utility for MedQ SPA.
 *
 * Maps the 73+ TabId values to clean URL paths and provides
 * helpers for syncing browser URL ↔ activeTab state.
 *
 * Design:
 * - Most tabs map directly: TabId → /{tabId} (e.g. 'bank' → '/bank')
 * - A few friendly aliases for common tabs (e.g. 'dashboard' → '/home')
 * - Special tabs have unique paths (e.g. 'take-exam' → '/exam/take')
 * - All paths are served by the same page.tsx via a catch-all rewrite
 */

import type { TabId } from './medq-tabid';

// ── TabId → URL path mapping ───────────────────────────────────
// Friendly aliases for the most common/landing tabs
const TAB_PATH_ALIASES: Partial<Record<TabId, string>> = {
  'dashboard': '/home',
  'advanced-chat': '/messages',
  'take-exam': '/exam/take',
  'pricing': '/pricing',
  'revenue': '/revenue',
  'admin': '/admin',
  // Batch C — SEO-friendly URL for the daily challenge page.
  // The 'challenge' tab id lives at /daily-challenge (not /challenge).
  // /challenge is kept as a 308 redirect → /daily-challenge (see
  // src/app/challenge/page.tsx).
  'challenge': '/daily-challenge',
};

// ── URL path → TabId reverse mapping ───────────────────────────
// Built from aliases + default rule (path = '/' + tabId)
const PATH_TO_TAB: Record<string, TabId> = {};
const TAB_TO_PATH: Record<TabId, string> = {} as any;

// Populate both maps from the aliases
for (const [tab, path] of Object.entries(TAB_PATH_ALIASES)) {
  PATH_TO_TAB[path] = tab as TabId;
  TAB_TO_PATH[tab as TabId] = path;
}

// For all other tabs, the path is simply '/' + tabId
// We don't enumerate all 73 tabs here — instead we use a fallback rule
// But we do need the reverse map for the common aliases

/**
 * Get the URL path for a given TabId.
 * Examples: 'dashboard' → '/home', 'bank' → '/bank', 'take-exam' → '/exam/take'
 *
 * Defensive: if a caller passes a value that already looks like a URL path
 * (starts with '/' or matches /^https?:\/\//), we return it as-is rather
 * than prepending another '/'. This prevents the bug where a download URL
 * like '/generated/user/file.pdf' becomes '//generated/user/file.pdf' which
 * the browser parses as a protocol-relative URL → 'https://generated/...'
 * → pushState throws a cross-origin SecurityError.
 */
export function tabToPath(tabId: TabId | string): string {
  if (TAB_TO_PATH[tabId as TabId]) return TAB_TO_PATH[tabId as TabId];
  const s = String(tabId);
  // If it already looks like an absolute path or URL, don't double-prefix.
  if (s.startsWith('/') || /^https?:\/\//i.test(s) || s.startsWith('//')) {
    return s;
  }
  return `/${s}`;
}

/**
 * Get the TabId for a given URL path.
 * Examples: '/home' → 'dashboard', '/bank' → 'bank', '/exam/take' → 'take-exam'
 * Returns 'dashboard' as fallback for unknown paths.
 */
export function pathToTab(path: string): TabId {
  // Normalize: remove trailing slash, ensure leading slash
  const normalized = (path || '').replace(/\/+$/, '') || '/';

  // Empty input → dashboard
  if (normalized === '/' || normalized === '') {
    return 'dashboard';
  }

  // Check explicit aliases first
  if (PATH_TO_TAB[normalized]) return PATH_TO_TAB[normalized];

  // Default rule: strip leading '/' and use as tabId
  if (normalized.startsWith('/')) {
    const candidate = normalized.slice(1) as TabId;
    // Validate it's a real TabId by checking if it appears in known tabs
    // We accept any string that looks like a tabId — the MedQAppShell
    // will fall back to 'dashboard' if it's invalid
    return candidate;
  }

  return 'dashboard';
}

/**
 * Check if a URL path corresponds to a valid MedQ tab.
 * Used by the catch-all rewrite to distinguish MedQ routes from
 * other routes (API, static assets, classroom, etc.)
 */
export function isMedQTabPath(path: string): boolean {
  const normalized = path.replace(/\/+$/, '') || '/';
  if (normalized === '/') return true; // root = home/dashboard
  if (PATH_TO_TAB[normalized]) return true;

  // Check if the path segment matches a known tab pattern
  const segment = normalized.slice(1);
  // Exclude paths that belong to other Next.js routes
  if (segment.startsWith('api/') || segment.startsWith('_next/')) return false;
  if (segment === 'classroom' || segment === 'openmaic-generation-preview' || segment === 'offline') return false;
  if (segment.startsWith('classroom/') || segment === 'openmaic-generation-preview/') return false;

  // Any other single-segment or known multi-segment path is a MedQ tab
  return true;
}

// ─── TabId validation & alias resolution ──────────────────────
//
// The LLM often emits free-text tab names like 'profile', 'messages',
// 'calendar', 'schedule', 'drug-lookup', etc. that don't exist as real
// TabIds. Without remapping, these get pushed into `setActiveTab()` and
// either silently no-op or break the URL sync. This section provides a
// single source of truth for "what the LLM calls X" → "the real TabId".
//
// The map also covers a few cases that should NOT be a tab at all but a
// dialog (profile, settings, search, upgrade) — for those we return a
// special marker so the route handler can emit `open_dialog` instead.

const TAB_ALIAS_TO_TAB: Record<string, TabId> = {
  // Aliases the LLM tends to emit for tabs that have different real names
  home: 'dashboard',
  main: 'dashboard',
  start: 'dashboard',
  overview: 'dashboard',
  messages: 'advanced-chat',
  chat: 'med-chat',
  inbox: 'advanced-chat',
  dm: 'advanced-chat',
  calendar: 'planner',
  schedule: 'planner',
  'study-plan': 'planner',
  'study-planner': 'planner',
  planner: 'planner',
  'flashcard': 'flashcards',
  deck: 'flashcards',
  decks: 'flashcards',
  cards: 'flashcards',
  quiz: 'speed-quiz',
  'speed-quiz': 'speed-quiz',
  'quick-quiz': 'speed-quiz',
  exam: 'exams',
  test: 'exams',
  tests: 'exams',
  'question-bank': 'bank',
  bank: 'bank',
  questions: 'bank',
  'question-generator': 'generate',
  generator: 'generate',
  create: 'create',
  'new-question': 'create',
  'drug-lookup': 'drug-interactions',
  'drug-info': 'drug-interactions',
  drugs: 'drug-interactions',
  medication: 'drug-interactions',
  medications: 'drug-interactions',
  interactions: 'drug-interactions',
  'medicine-prices': 'medicine-prices',
  calculator: 'medical-calculator',
  calculators: 'medical-calculator',
  'medical-calculator': 'medical-calculator',
  notes: 'quick-notes',
  note: 'quick-notes',
  'quick-notes': 'quick-notes',
  timer: 'study-timer',
  pomodoro: 'study-timer',
  'study-timer': 'study-timer',
  anatomy: 'anatomy',
  'anatomy-labeling': 'anatomy',
  cases: 'cases',
  'clinical-cases': 'cases',
  'case-study': 'cases',
  tutor: 'tutor',
  'ai-tutor': 'tutor',
  'tutoring': 'tutor',
  weak: 'weak-areas',
  'weak-areas': 'weak-areas',
  'weak-topics': 'weak-areas',
  'review-weak': 'weak-areas',
  stats: 'study-stats',
  'study-stats': 'study-stats',
  'my-stats': 'study-stats',
  analytics: 'study-stats',
  performance: 'study-stats',
  'insights': 'insights',
  'my-performance': 'study-stats',
  dictionary: 'medical-dictionary',
  'medical-dictionary': 'medical-dictionary',
  ecg: 'ecg-challenge',
  'ecg-challenge': 'ecg-challenge',
  'ekg': 'ecg-challenge',
  lab: 'lab-values',
  'labs': 'lab-values',
  'lab-values': 'lab-values',
  'clinical-pathways': 'clinical-pathways',
  pathway: 'clinical-pathways',
  pathways: 'clinical-pathways',
  'diff-diagnosis': 'diff-diagnosis',
  'differential': 'diff-diagnosis',
  'differentials': 'diff-diagnosis',
  'oral-exam': 'oral-exam',
  viva: 'oral-exam',
  'ai-mode': 'ai-mode',
  'image-analyzer': 'image-analyzer',
  image: 'image-analyzer',
  'medical-image': 'image-analyzer',
  files: 'files',
  'my-files': 'files',
  uploads: 'files',
  'knowledge-map': 'knowledge-map',
  'knowledge-graph': 'knowledge-map',
  'revision-scheduler': 'revision-scheduler',
  'revision': 'revision-scheduler',
  'review': 'review',
  'review-cards': 'review',
  'study': 'dashboard',
  'social': 'feed',
  community: 'feed',
  friends: 'friends',
  leaderboard: 'leaderboard',
  ranks: 'leaderboard',
  'ranking': 'leaderboard',
  groups: 'groups',
  meeting: 'meeting',
  meetings: 'meeting',
  'live-class': 'meeting',
  classroom: 'meeting',
  achievements: 'achievements',
  badges: 'achievements',
  'streak-calendar': 'streak-calendar',
  streak: 'streak-calendar',
  'study-streaks': 'study-streaks',
  streaks: 'study-streaks',
  'exam-countdown': 'exam-countdown',
  countdown: 'exam-countdown',
  'image-occlusion': 'image-occlusion',
  'decision-tree': 'decision-tree',
  'decision-making-tree': 'decision-making-tree',
  'guideline-library': 'guideline-library',
  guidelines: 'guideline-library',
  'procedure-player': 'procedure-player',
  procedures: 'procedure-player',
  'cme-tracker': 'cme-tracker',
  cme: 'cme-tracker',
  'knowledge-gap-analyzer': 'knowledge-gap-analyzer',
  'gap-analyzer': 'knowledge-gap-analyzer',
  'medication-tables': 'medication-tables',
  'micro-lessons': 'micro-lessons',
  'ai-classroom': 'ai-classroom',
  'freellm': 'freellm',
  'freellmapi': 'freellm',
  'free-llm': 'freellm',
  'llm-router': 'freellm',
  'byok-hub': 'freellm',
  'video-library': 'video-library',
  videos: 'video-library',
  'video': 'video',
  voice: 'voice',
  audio: 'voice',
  mnemonics: 'mnemonics',
  'mnemonic-maker': 'mnemonic-maker',
  'whiteboard-studio': 'whiteboard-studio',
  whiteboard: 'whiteboard-studio',
  'board-prep': 'board-prep',
  'clinical-vignettes': 'clinical-vignettes',
  vignettes: 'clinical-vignettes',
  qotd: 'qotd',
  'question-of-the-day': 'qotd',
  challenge: 'challenge',
  'daily-challenge': 'challenge',
  arena: 'arena',
  'live-battle': 'live-battle',
  battle: 'live-battle',
  'flashcard-arena': 'flashcard-arena',
  'medical-trivia': 'medical-trivia',
  trivia: 'medical-trivia',
  'med-memorize': 'med-memorize',
  'study-playlist': 'study-playlist',
  playlist: 'study-playlist',
  'peer-compare': 'peer-compare',
  compare: 'peer-compare',
  'performance-coach': 'performance-coach',
  coach: 'performance-coach',
  'med-chat': 'med-chat',
  'advanced-chat': 'advanced-chat',
  news: 'news',
  'medical-news': 'news',
  'symptom-checker': 'symptom-checker',
  symptoms: 'symptom-checker',
  'drug-zoom': 'drug-zoom',
  'openfda-drugs': 'openfda-drugs',
  'drug-zoom-labs': 'drug-zoom-labs',
  collections: 'collections',
  'my-collections': 'collections',
  folders: 'collections',
};

// Things the LLM might call "tabs" that are actually dialogs.
// We expose them as a special token so the caller can decide to emit
// `open_dialog` instead of `navigate`.
export const DIALOG_TARGETS = new Set([
  'profile', 'settings', 'search', 'upgrade', 'credit-shop',
  'auth-modal', 'auth', 'login', 'signin', 'sign-in',
  'create-exam', 'create-collection',
]);

// Free-text dialog aliases → canonical dialogId.
const DIALOG_ALIAS_TO_ID: Record<string, string> = {
  'auth': 'auth-modal',
  'login': 'auth-modal',
  'signin': 'auth-modal',
  'sign-in': 'auth-modal',
};

export interface ResolvedTarget {
  kind: 'tab' | 'dialog' | 'unknown';
  /** If kind === 'tab', the resolved TabId. If 'dialog', the dialogId. */
  target: string;
  /** True if the input was remapped (e.g. user said "messages" → advanced-chat). */
  remapped: boolean;
}

/**
 * Resolve a free-text navigation target (from the LLM) into either a real
 * TabId or a dialog ID. Always returns a valid target — unknown inputs
 * fall back to the dashboard tab.
 *
 * Examples:
 *   'profile'     → { kind: 'dialog', target: 'profile', remapped: false }
 *   'messages'    → { kind: 'tab', target: 'advanced-chat', remapped: true }
 *   'flashcards'  → { kind: 'tab', target: 'flashcards', remapped: false }
 *   'foobar'      → { kind: 'tab', target: 'dashboard', remapped: true }
 */
export function resolveNavigationTarget(input: string): ResolvedTarget {
  if (!input || typeof input !== 'string') {
    return { kind: 'tab', target: 'dashboard', remapped: true };
  }
  const raw = input.trim().toLowerCase().replace(/\s+/g, '-');

  // 1. Direct dialog match (canonical dialogId, e.g. 'profile', 'settings')
  if (DIALOG_TARGETS.has(raw)) {
    // Resolve aliases like 'login' → 'auth-modal'
    const canonicalId = DIALOG_ALIAS_TO_ID[raw] || raw;
    return { kind: 'dialog', target: canonicalId, remapped: canonicalId !== raw };
  }

  // 2. Alias map (covers LLM-common synonyms)
  if (TAB_ALIAS_TO_TAB[raw]) {
    return { kind: 'tab', target: TAB_ALIAS_TO_TAB[raw], remapped: raw !== TAB_ALIAS_TO_TAB[raw] };
  }

  // 3. Already a valid TabId (verify against the known type list at runtime
  //    by checking the alias map's values + the canonical TabId list)
  const allTabs = new Set<string>([
    // Mirror the TabId union from medq-tabid.ts to avoid an import cycle
    'dashboard', 'generate', 'files', 'bank', 'flashcards', 'review', 'lab-values',
    'collections', 'challenge', 'arena', 'live-battle', 'leaderboard', 'insights',
    'weak-areas', 'planner', 'knowledge-map', 'create', 'exams', 'take-exam',
    'tutor', 'cases', 'board-prep', 'video', 'image-analyzer', 'voice',
    'mnemonics', 'news', 'anatomy', 'friends', 'chat', 'erc', 'feed',
    'groups', 'achievements', 'pricing', 'revenue', 'admin',
    'drug-interactions', 'medicine-prices', 'openfda-drugs', 'drug-zoom',
    'drug-zoom-labs', 'exam-countdown', 'medical-calculator', 'symptom-checker',
    'study-stats', 'clinical-vignettes', 'qotd', 'speed-quiz', 'streak-calendar',
    'quick-notes', 'study-timer', 'mnemonic-maker', 'medical-dictionary',
    'peer-compare', 'revision-scheduler', 'flashcard-arena', 'study-playlist',
    'medical-trivia', 'performance-coach', 'ecg-challenge', 'clinical-pathways',
    'diff-diagnosis', 'study-streaks', 'med-memorize', 'med-chat', 'meeting',
    'oral-exam', 'advanced-chat', 'whiteboard-studio', 'video-library',
    'image-occlusion', 'decision-tree', 'guideline-library', 'procedure-player',
    'cme-tracker', 'knowledge-gap-analyzer', 'decision-making-tree',
    'medication-tables', 'ai-mode', 'micro-lessons', 'ai-classroom', 'freellm',
  ]);
  if (allTabs.has(raw)) {
    return { kind: 'tab', target: raw as TabId, remapped: false };
  }

  // 4. Try a few fuzzy normalizations: drop "my-" prefix, "tab-" prefix,
  //    trailing "-page", "-tab", "-view"
  const stripped = raw
    .replace(/^my-/, '')
    .replace(/^tab-/, '')
    .replace(/-page$/, '')
    .replace(/-tab$/, '')
    .replace(/-view$/, '');
  if (TAB_ALIAS_TO_TAB[stripped]) {
    return { kind: 'tab', target: TAB_ALIAS_TO_TAB[stripped], remapped: true };
  }
  if (allTabs.has(stripped)) {
    return { kind: 'tab', target: stripped as TabId, remapped: true };
  }
  if (DIALOG_TARGETS.has(stripped)) {
    return { kind: 'dialog', target: stripped, remapped: true };
  }

  // 5. Unknown — fall back to dashboard rather than letting a bogus value
  //    leak into setActiveTab() and break the URL sync.
  return { kind: 'unknown', target: 'dashboard', remapped: true };
}
