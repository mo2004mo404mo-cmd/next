'use client';
let user = {
  id: "string",
  name: "Admin User",
  email: "admin@medq.com",
  image: null,
  password: "test123",
  role: "admin",
}
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  SidebarNav,
  MobileBottomNav,
  BottomNavCustomizer,
  useBottomNav,
  SIDEBAR_NAV
} from '@/components/medq/navigation';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { useSubscription } from '@/components/medq/SubscriptionContext';
import { useSettings } from '@/components/medq/SettingsContext';
import { useAppSettingsOpener } from '@/lib/utils/app-events';
import { UIStateProvider, useUIState } from '@/components/medq/ai-agent/UIStateContext';
import { useAgentVersion } from '@/components/medq/ai-agent/useAgentVersion';
import { useNotificationStream } from '@/components/medq/useNotificationStream';
import { pathToTab, resolveNavigationTarget, DIALOG_TARGETS } from '@/lib/medq-routing';
import { REAL_PAGE_TABS, tabHref } from '@/lib/medq-nav';
import PricingInline from '@/components/medq/PricingInline';
import { stageGeneratePrefill } from '@/lib/generate-prefill';
import type { TabId } from '@/lib/medq-tabid';
import OfflineTabFallback from './OfflineTabFallback';
import { TabVisibilityContext } from './TabVisibilityContext';
import {
  Stethoscope, LayoutDashboard, Bolt, FileUp, BookOpen, Brain, FolderOpen, Trophy,
  Lightbulb, CalendarDays, Network, PenLine, FileText, MessageCircle,
  GraduationCap, Clapperboard, ScanEye, Mic, Sparkles, Newspaper, Eye,
  Loader2, Timer, Crown, CreditCard, BarChart3, LogIn, ShieldCheck, Users,
  Swords, Radio, Zap, Bell, Menu, X, ChevronDown, ChevronRight,
  Home as HomeIcon, UsersRound, TrendingUp, MoreHorizontal,
  Compass, Star, Settings, HelpCircle, Heart, Hash, Flame, FlaskConical,
  Search, Award, Pill, Clock, Calculator, Stethoscope as StethoscopeIcon, BarChart2,
  Zap as ZapIcon, StickyNote, Calendar, Gamepad2,
  Wand2, BookOpenCheck, GitCompare, ListChecks, Swords as SwordsIcon, Music, HelpCircle as TriviaIcon, Activity,
  GitBranch, Brain as BrainIcon, MessageSquare, Shuffle as ShuffleIcon, Heart as HeartPulse,
  Film, Video as VideoIcon, Globe, Layers, Scissors, Radar, Table2,
  Sparkles as SparklesIcon,
} from 'lucide-react';
import Header from "@/components/medq/header";
// import { MedQAgent } from '@/components/medq/ai-agent/MedQAgent';
import { MedQAgentV3 } from '@/components/medq/ai-agent/MedQAgentV3';

import { VisualGuidanceOverlay } from '@/components/medq/ai-agent/VisualGuidanceOverlay';
import BannerAd from '@/components/medq/BannerAd';
import OfflineIndicator from '@/components/medq/OfflineIndicator';
import UpgradeModal from '@/components/medq/UpgradeModal';


// Heavy UI components are lazy-loaded via next/dynamic so the initial compile
// of this shell stays within the 4GB memory budget on this host.
const PomodoroTimer = dynamic(() => import('@/components/medq/PomodoroTimer'), { ssr: false });
// const InterstitialAd = dynamic(() => import('@/components/medq/InterstitialAd'), { ssr: false });
const RewardedAd = dynamic(() => import('@/components/medq/RewardedAd'), { ssr: false });
const CreditShop = dynamic(() => import('@/components/medq/CreditShop'), { ssr: false });
// const AuthModal = dynamic(() => import('@/components/medq/AuthModal'), { ssr: false });
const ProfileDialog = dynamic(() => import('@/components/medq/ProfileDialog'), { ssr: false });
const SettingsDialog = dynamic(() => import('@/components/medq/SettingsDialog'), { ssr: false });
const DeviceSecurityDialog = dynamic(() => import('@/components/medq/DeviceSecurityDialog'), { ssr: false });
const GlobalSearch = dynamic(() => import('@/components/medq/GlobalSearch'), { ssr: false });


interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  premium?: boolean;
  adminOnly?: boolean;
  badge?: string;
  color?: string;
}

const ALL_TABS = SIDEBAR_NAV.flatMap(s => s.items);

const SPECIAL_TABS: TabConfig[] = [
  { id: 'pricing', label: 'Pricing', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'revenue', label: 'Revenue', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" />, adminOnly: true },
];

const TAB_TO_CATEGORY: Record<string, string> = {
  generate: 'ai_generations', files: 'ai_generations', tutor: 'tutor_messages',
  cases: 'case_simulations', video: 'video_lessons', 'image-analyzer': 'image_analyzer',
  voice: 'voice_study', 'board-prep': 'board_prep_sessions', mnemonics: 'mnemonics',
  anatomy: 'anatomy_visuals', planner: 'study_planner',
  'oral-exam': 'voice_study', 'advanced-chat': 'tutor_messages',
  'whiteboard-studio': 'ai_generations',
  'video-library': 'ai_generations',
};

const INTERSTITIAL_INTERVAL = 4;
const INTERSTITIAL_ENABLED_TABS = new Set(['generate', 'tutor', 'cases', 'video', 'board-prep']);

const componentCache = new Map<string, React.ComponentType<any>>();

function PersistentTab({ tabId, active, ...props }: { tabId: string; active: boolean;[key: string]: any }) {
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(() => componentCache.get(tabId) ?? null);
  const [err, setErr] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  // retryKey bumps each time the user taps "Retry" on the OfflineTabFallback.
  // The useEffect below depends on it, so bumping it re-runs the chunk import.
  const [retryKey, setRetryKey] = useState(0);
  const loadedRef = useRef(componentCache.has(tabId));

  useEffect(() => {
    // On a fresh mount OR a user-initiated retry, attempt the import.
    // The retryKey === 0 path short-circuits if the chunk is already cached
    // (avoids re-fetching on every PersistentTab re-mount). For retries
    // (retryKey > 0) we always re-attempt — the user explicitly asked us to.
    if (loadedRef.current && retryKey === 0) { setComp(() => componentCache.get(tabId)!); return; }
    let cancelled = false;
    setErr(false);
    const loadTab = async () => {
      try {
        // Route tab load to the appropriate group loader. Each group is a
        // separate dynamically-imported chunk with ~10 entries, so no single
        // compile pass exceeds the 4GB memory budget.
        const TAB_GROUP: Record<string, string> = {
          // study group — core home/compete/streak/achievement
          'dashboard': 'study',
          'challenge': 'study',
          'tutor': 'study',
          'arena': 'study',
          'live-battle': 'study',
          'leaderboard': 'study',
          'qotd': 'study',
          'speed-quiz': 'study',
          'streak-calendar': 'study',
          'study-streaks': 'study',
          'achievements': 'study',
          'erc': 'study',
          // ai group — AI-powered tools
          'generate': 'ai',
          'insights': 'ai',
          'cases': 'ai',
          'anatomy': 'ai',
          'clinical-vignettes': 'ai',
          'ai-mode': 'ai',
          'micro-lessons': 'ai',
          'ai-classroom': 'ai',
          'freellm': 'ai',
          // social group — oral/med-memorize/med-chat
          'files': 'social',
          'weak-areas': 'social',
          'board-prep': 'social',
          'oral-exam': 'social',
          'med-memorize': 'social',
          'med-chat': 'social',
          // admin group — bank/planner/video/admin/pricing/revenue/feed/stats
          'bank': 'admin',
          'planner': 'admin',
          'video': 'admin',
          'admin': 'admin',
          'pricing': 'admin',
          'revenue': 'admin',
          'feed': 'admin',
          'study-stats': 'admin',
          // drugs group — drug tools + flashcards/knowledge-map/image-analyzer
          'flashcards': 'drugs',
          'knowledge-map': 'drugs',
          'image-analyzer': 'drugs',
          'drug-interactions': 'drugs',
          'medicine-prices': 'drugs',
          'openfda-drugs': 'drugs',
          'drug-zoom': 'drugs',
          'drug-zoom-labs': 'drugs',
          'medication-tables': 'drugs',
          // tools group — calculators, timers, notes, etc.
          'lab-values': 'tools',
          'exams': 'tools',
          'mnemonics': 'tools',
          'medical-calculator': 'tools',
          'symptom-checker': 'tools',
          'exam-countdown': 'tools',
          'medical-dictionary': 'tools',
          'study-timer': 'tools',
          'quick-notes': 'tools',
          // exam group — exam prep, revision, arena, playlist, coach
          'review': 'exam',
          'create': 'exam',
          'voice': 'exam',
          'mnemonic-maker': 'exam',
          'revision-scheduler': 'exam',
          'peer-compare': 'exam',
          'flashcard-arena': 'exam',
          'study-playlist': 'exam',
          'performance-coach': 'exam',
          // advanced group — split into 3 sub-groups to keep per-chunk bundle
          // size small. The former 16-tab 'advanced' chunk was the largest
          // per-group bundle in the app; splitting by domain isolates
          // media-heavy studio tabs from lightweight clinical reference tabs
          // and from data-table misc tabs. See src/components/medq/tabs/
          // group-advanced-{clinical,media,misc}.ts.
          //
          // advanced-clinical — decision trees, guidelines, pathways, dx, CME
          'decision-tree': 'advanced-clinical',
          'decision-making-tree': 'advanced-clinical',
          'guideline-library': 'advanced-clinical',
          'clinical-pathways': 'advanced-clinical',
          'diff-diagnosis': 'advanced-clinical',
          'cme-tracker': 'advanced-clinical',
          // advanced-media — heavy studio tabs (whiteboard, video, procedure, image)
          'whiteboard-studio': 'advanced-media',
          'video-library': 'advanced-media',
          'procedure-player': 'advanced-media',
          'image-occlusion': 'advanced-media',
          // advanced-misc — lightweight data tabs (collections, take-exam, news, ecg, trivia, gap-analyzer)
          'collections': 'advanced-misc',
          'take-exam': 'advanced-misc',
          'news': 'advanced-misc',
          'ecg-challenge': 'advanced-misc',
          'medical-trivia': 'advanced-misc',
          'knowledge-gap-analyzer': 'advanced-misc',
          // community group — chat, friends, groups, meeting
          'advanced-chat': 'community',
          'friends': 'community',
          'groups': 'community',
          'meeting': 'community',
        };
        const groupName = TAB_GROUP[tabId];
        if (!groupName) {
          // Unknown tab — fail gracefully instead of throwing. This can happen
          // for tabs listed in SIDEBAR_NAV that don't have a group loader yet.
          // Log a warning and mark as errored so the user sees the fallback UI
          // rather than a console exception that breaks the page.
          console.warn(`[PersistentTab] No group loader registered for tab: "${tabId}". Add it to TAB_GROUP in MedQAppShell.tsx.`);
          if (!cancelled) setErr(true);
          return;
        }
        const groupMod = await import(`./tabs/group-${groupName}`);
        const mod = await groupMod.loadTab(tabId);
        if (!cancelled) { componentCache.set(tabId, mod.default); loadedRef.current = true; setComp(() => mod.default); }
      } catch (e) { console.error(`Failed to load tab ${tabId}:`, e); if (!cancelled) setErr(true); }
    };
    loadTab();
    return () => { cancelled = true; };
  }, [tabId, retryKey]);

  const isMeeting = tabId === 'meeting' || tabId === 'whiteboard-studio' || tabId === 'video-library' || tabId === 'drug-zoom' || tabId === 'drug-zoom-labs' || tabId === 'freellm';
  if (err) {
    // Chunk-load failure — most likely cause is the user is offline and
    // this tab's chunk hasn't been cached yet. Show the friendly
    // OfflineTabFallback ("You're offline — Retry") instead of the bare
    // "Failed to load tab." red text. The Retry button bumps retryKey,
    // which re-runs the import effect above. If the user is online and
    // the chunk genuinely fails (e.g. dev server restarted),
    // OfflineTabFallback shows a "Something went wrong" variant with
    // the same Retry button.
    return (
      <div className={active && mounted ? 'flex flex-col flex-1 min-h-0' : 'hidden'}>
        <OfflineTabFallback
          label={tabId}
          onRetry={() => {
            // Clear the cache so we don't short-circuit on stale state
            componentCache.delete(tabId);
            loadedRef.current = false;
            setComp(null);
            setErr(false);
            setRetryKey(k => k + 1);
          }}
        />
      </div>
    );
  }
  if (!Comp) return <div className={active && mounted ? 'flex flex-col flex-1 min-h-0' : 'hidden'}><div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-[#00e5a0]" /></div></div>;
  const visible = active && mounted;
  return <div className={visible ? `animate-fade-in flex flex-col flex-1 min-h-0${isMeeting ? ' h-full' : ''}` : 'hidden'} aria-hidden={!visible}><TabVisibilityContext.Provider value={visible}><Comp {...props} /></TabVisibilityContext.Provider></div>;
}


/* ═══════════════════════════════════════════════════════════════
   MAIN APP - Redesigned with integrated features
   ═══════════════════════════════════════════════════════════════ */
function MedQApp() {
  const { tier, adsEnabled, canAccess, trackUsage, setShowUpgradeModal, showUpgradeModal, usage, credits, refresh } = useSubscription();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    items: bottomNavItems,
    itemIds: bottomNavIds,
    setItems: setBottomNavItems,
    customizerOpen,
    openCustomizer,
    closeCustomizer,
  } = useBottomNav();

  /*
   * REAL Next.js routing (user directive 2026-11-04): the App Router URL
   * is the single source of truth for the active tab.
   *   - "/"            → the SPA dashboard home
   *   - "/?tab=<id>"   → SPA tabs — REAL, refresh-safe URLs served by this
   *                      page; the shell renders the tab from the URL
   *   - real routes    → /bank, /generate … render through the (app)
   *                      AppShellLayout instead (never in-shell here)
   *
   * The sidebar and bottom nav navigate with plain <Link> elements — no
   * onTabSwitch interception — so this derivation must react to the URL
   * (usePathname + useSearchParams) alone.
   */
  const activeTab = React.useMemo<TabId>(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && (!pathname || pathname === '/')) {
      const resolved = resolveNavigationTarget(tabParam);
      if (resolved.kind === 'tab') {
        // Real-page tabs own their own routes — /?tab=bank bounces to
        // /bank (redirect effect below); never mount them in-shell.
        if (REAL_PAGE_TABS[resolved.target] && resolved.target !== 'dashboard') {
          return 'dashboard'; // transient — the redirect fires immediately
        }
        return resolved.target;
      }
    }
    return pathToTab(pathname);
  }, [pathname, searchParams]);

  /*
   * /?tab=<real-page-tab> → the tab's real route. Handles links/bookmarks
   * like /?tab=bank (and keeps them out of the in-shell PersistentTab
   * mount, which deliberately has no group-loader cases for standalone
   * tabs).
   */
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (!tabParam || (pathname && pathname !== '/')) return;
    const resolved = resolveNavigationTarget(tabParam);
    const realPath = resolved.kind === 'tab' ? REAL_PAGE_TABS[resolved.target] : undefined;
    if (realPath && resolved.target !== 'dashboard') {
      router.replace(realPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pathname]);

  /*
   * URL-driven keep-alive: whenever the URL says a SPA tab is active, mount
   * its PersistentTab. Covers plain <Link> navigations from the sidebar /
   * bottom nav (no onTabSwitch interception anymore), browser back/forward,
   * and deep links — every path that changes the URL.
   */
  useEffect(() => {
    if (REAL_PAGE_TABS[activeTab] && activeTab !== 'dashboard') return; // standalone tabs render at their routes
    setVisitedTabs(prev => prev.has(activeTab) ? prev : new Set(prev).add(activeTab));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('medq-tab-visible', { detail: activeTab }));
    }
  }, [activeTab]);

  /*
   * These pages intentionally use their own
   * full-screen/mobile layouts without the
   * standard sidebar.
   */
  const hideSidebar =
    activeTab === 'meeting' ||
    activeTab === 'advanced-chat' ||
    activeTab === 'whiteboard-studio';


  const { settings, playSoundIfEnabled } = useSettings();
  const router = useRouter();
  // v3: UI State context for the AI agent
  const { updateState: updateUIState } = useUIState();
  const { v2: useV2Agent } = useAgentVersion();

  const [browserPathname] = useState<string>('/');

  const initialTab = React.useMemo<TabId>(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const tabParam = sp.get('tab');
      if (tabParam) {
        const resolved = resolveNavigationTarget(tabParam);
        if (resolved.kind === 'tab') return resolved.target as TabId;
      }
    }
    return pathToTab(browserPathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeviceSecurity, setShowDeviceSecurity] = useState(false);
  // Allow deeply-nested children (e.g. OpenMAIC SettingsDialog) to ask the
  // page to open the app-wide SettingsDialog → BYOK section without prop-
  // drilling through 6+ layers.
  useAppSettingsOpener((_section) => {
    setShowSettings(true);
  });
  const [visitedTabs, setVisitedTabs] = useState<Set<TabId>>(() => new Set([
    // Standalone tabs (e.g. a deep link to /?tab=bank) never render
    // in-shell — the redirect effect above bounces them to their real
    // route — so seed with the SPA-safe tab.
    REAL_PAGE_TABS[initialTab] && initialTab !== 'dashboard' ? 'dashboard' as TabId : initialTab,
  ]));
  const [examId, setExamId] = useState<string | null>(null);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialCallback, setInterstitialCallback] = useState<(() => void) | null>(null);
  const [showRewardedAd, setShowRewardedAd] = useState(false);
  const [showCreditShop, setShowCreditShop] = useState(false);
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [initialMeetingId, setInitialMeetingId] = useState<string | null>(null);
  const [openfdaInitialSearch, setOpenfdaInitialSearch] = useState<string | undefined>(undefined);
  /**
   * Cross-feature integration flag: when WeakAreasTab wants to start an AI viva
   * targeting the user's weak topics, it calls onNavigateToTab('oral-exam', { weakAreasViva: true }).
   * The oral-exam tab reads this on mount and auto-starts a weak-areas viva.
   */
  const [triggerWeakAreasViva, setTriggerWeakAreasViva] = useState<boolean>(false);
  const [drugInteractionInitialDrug, setDrugInteractionInitialDrug] = useState<string | undefined>(undefined);
  const premiumSwitchCountRef = useRef(0);
  const dailyBonusRef = useRef(false);
  const previousTabRef = useRef<TabId>(initialTab);

  // Header owns its controls; the shell owns the dialogs those controls open.
  useEffect(() => {
    const handleHeaderAction = (event: Event) => {
      const action = (event as CustomEvent<{ action?: string }>).detail?.action;
      if (action === 'profile') setShowProfile(true);
      if (action === 'settings') setShowSettings(true);
      if (action === 'pricing') router.push('/pricing');
      if (action === 'device-security') setShowDeviceSecurity(true);
      if (action === 'sidebar') setSidebarOpen(true);
      if (action === 'search') setShowGlobalSearch(true);
      if (action === 'credit-shop') setShowCreditShop(true);
      if (action === 'rewarded-ad') setShowRewardedAd(true);
    };

    window.addEventListener('medq-header-action', handleHeaderAction);
    return () => window.removeEventListener('medq-header-action', handleHeaderAction);
  }, [router]);

  // Check URL for meeting join parameter
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const meetingParam = params.get('meeting');
    if (meetingParam) {
      setInitialMeetingId(meetingParam);
      // Real routing: settle on the REAL /?tab=meeting URL (the old
      // replaceState('/meeting') wrote a client-only path that 404'd on
      // refresh). initialMeetingId is already captured in state above.
      router.replace('/?tab=meeting');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Prewarm offline AI backend on idle ──────────────────────────────
  // Kicks off WebGPU capability detection + RAG embedder warm-up on idle
  // so the user doesn't see a 5-8s cold start when they first trigger an
  // offline AI feature. Safe to call multiple times — both probe and
  // warmup are cached for the session.
  //
  // The embedder downloads a 23MB ONNX model on first run (cached in the
  // browser cache afterwards). We deliberately defer this to idle so it
  // doesn't compete with the user's actual network activity.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;
    const schedule = () => {
      if (cancelled) return;
      import('@/lib/offline-ai/helpers')
        .then(({ prewarmBackend }) => prewarmBackend())
        .catch(() => {
          /* silent — prewarm is best-effort */
        });
    };
    if ('requestIdleCallback' in window) {
      const ric = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(schedule, { timeout: 8000 });
      return () => {
        cancelled = true;
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(ric);
        }
      };
    }
    const t = setTimeout(schedule, 3000);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);


  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  // const showOnboarding = !onboardingDismissed && !!isAuthenticated && !!user && user.onboardingCompleted === false;

  // v3: Sync UI state with active tab changes (for AI agent context awareness)
  useEffect(() => {
    const moduleMap: Record<string, string> = {
      'dashboard': 'study', 'challenge': 'study', 'tutor': 'study', 'arena': 'study',
      'live-battle': 'study', 'leaderboard': 'study', 'qotd': 'study', 'speed-quiz': 'study',
      'streak-calendar': 'study', 'study-streaks': 'study', 'achievements': 'study', 'erc': 'study',
      'generate': 'ai', 'insights': 'ai', 'cases': 'ai', 'anatomy': 'ai',
      'clinical-vignettes': 'ai', 'ai-mode': 'ai', 'micro-lessons': 'ai', 'ai-classroom': 'ai', 'freellm': 'ai',
      'files': 'social', 'weak-areas': 'social', 'board-prep': 'social', 'oral-exam': 'social',
      'med-memorize': 'social', 'med-chat': 'social',
      'bank': 'admin', 'planner': 'admin', 'video': 'admin', 'admin': 'admin',
      'pricing': 'admin', 'revenue': 'admin', 'feed': 'admin', 'study-stats': 'admin',
      'flashcards': 'drugs', 'knowledge-map': 'drugs', 'image-analyzer': 'drugs',
      'drug-interactions': 'drugs', 'medicine-prices': 'drugs', 'openfda-drugs': 'drugs',
      'drug-zoom': 'drugs', 'drug-zoom-labs': 'drugs', 'medication-tables': 'drugs',
      'lab-values': 'tools', 'exams': 'tools', 'mnemonics': 'tools', 'medical-calculator': 'tools',
      'symptom-checker': 'tools', 'exam-countdown': 'tools', 'medical-dictionary': 'tools',
      'study-timer': 'tools', 'quick-notes': 'tools',
      'review': 'exam', 'create': 'exam', 'voice': 'exam', 'mnemonic-maker': 'exam',
      'revision-scheduler': 'exam', 'peer-compare': 'exam', 'flashcard-arena': 'exam',
      'study-playlist': 'exam', 'performance-coach': 'exam',
      'collections': 'advanced', 'take-exam': 'advanced', 'news': 'advanced',
      'whiteboard-studio': 'advanced', 'video-library': 'advanced', 'image-occlusion': 'advanced',
      'decision-tree': 'advanced', 'decision-making-tree': 'advanced', 'guideline-library': 'advanced',
      'procedure-player': 'advanced', 'cme-tracker': 'advanced', 'knowledge-gap-analyzer': 'advanced',
      'ecg-challenge': 'advanced', 'clinical-pathways': 'advanced', 'diff-diagnosis': 'advanced',
      'medical-trivia': 'advanced',
    };
    const module = moduleMap[activeTab] || 'study';
    updateUIState({
      currentPage: activeTab,
      currentModule: module,
      currentRoute: tabHref(activeTab),
      openTabs: Array.from(visitedTabs),
      workspace: {
        sidebarOpen: sidebarOpen,
        sidebarCollapsed: false,
        theme: 'dark',
        viewport: { width: typeof window !== 'undefined' ? window.innerWidth : 0, height: typeof window !== 'undefined' ? window.innerHeight : 0 },
      },
    });
  }, [activeTab, visitedTabs, sidebarOpen, updateUIState]);

  // Direct-URL mount: on a hard load of a tab path (e.g. /freellm), activeTab
  // already resolves from the URL, but the visitedTabs mount-gate starts at
  // 'dashboard' (initialTab uses a static '/'), so the URL's tab would never
  // render. Add the URL's active tab to the mounted set on first paint.
  useEffect(() => {
    setVisitedTabs(prev => prev.has(activeTab) ? prev : new Set([...prev, activeTab]));
  }, [activeTab]);

  // v3: Listen for agent navigation events from UIActionEngine
  useEffect(() => {
    const handleAgentNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.tab) {
        // Defensive: resolve any free-text tab name through the same
        // resolveNavigationTarget() helper the backend uses, so the
        // frontend stays correct even if the backend validator misses
        // an edge case. This also rejects URL-like values (download URLs,
        // absolute URLs, paths containing dots/filenames) that would
        // otherwise crash pushState with a cross-origin SecurityError.
        const t = String(detail.tab);
        // Fast reject: URL-like values that should never be set as activeTab
        if (
          t.startsWith('/') ||
          /^https?:\/\//i.test(t) ||
          t.startsWith('//') ||
          t.includes('.')
        ) {
          console.warn('[MedQ] Ignored agent-navigate with URL-like tab value:', t);
          return;
        }
        const resolved = resolveNavigationTarget(t);
        if (resolved.kind === 'dialog') {
          // Profile/settings/etc. should open as dialogs, not as tabs.
          console.log(`[MedQ] Nav reroute: "${t}" → dialog "${resolved.target}"`);
          const setterMap: Record<string, (v: boolean) => void> = {
            'profile': setShowProfile,
            'settings': setShowSettings,
            'search': setShowGlobalSearch,
            'upgrade': setShowUpgradeModal,
            'credit-shop': setShowCreditShop,
            'auth-modal': setShowAuthModal,
          };
          const setter = setterMap[resolved.target];
          if (setter) setter(true);
          else console.warn('[MedQ] Unknown dialog target:', resolved.target);
          return;
        }
        if (resolved.remapped && resolved.target === 'dashboard' && t !== 'dashboard') {
          // Genuine unknown — log clearly so it shows up in dev logs.
          console.warn(`[MedQ] Unknown nav target "${t}" → falling back to dashboard`);
        } else if (resolved.remapped) {
          console.log(`[MedQ] Nav alias: "${t}" → "${resolved.target}"`);
        }
        handleTabSwitch(resolved.target as TabId);
      }
    };
    const handleAgentSearch = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.query) {
        if (detail.category === 'drugs') {
          setOpenfdaInitialSearch(detail.query);
          handleTabSwitch('drug-zoom');
        } else {
          setShowGlobalSearch(true);
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('medq-global-search', { detail: detail.query }));
          }, 300);
        }
      }
    };
    const handleAgentDrugLookup = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.drugName) {
        setDrugInteractionInitialDrug(detail.drugName);
        handleTabSwitch('drug-interactions');
      }
    };
    const handleAgentOpenDialog = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.dialogId === 'auth-modal') {
        // Allow callers to preselect the auth-modal tab (signin | signup).
        if (detail?.data?.tab === 'signup') setAuthModalTab('signup');
        else setAuthModalTab('signin');
        setShowAuthModal(true);
      }
      else if (detail?.dialogId === 'profile') setShowProfile(true);
      else if (detail?.dialogId === 'settings') setShowSettings(true);
      else if (detail?.dialogId === 'upgrade') setShowUpgradeModal(true);
      else if (detail?.dialogId === 'credit-shop') setShowCreditShop(true);
      else if (detail?.dialogId === 'search') setShowGlobalSearch(true);
    };
    const handleAgentCloseDialog = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      // Close the most likely dialog
      if (showAuthModal) setShowAuthModal(false);
      else if (showProfile) setShowProfile(false);
      else if (showSettings) setShowSettings(false);
      else if (showGlobalSearch) setShowGlobalSearch(false);
      else if (showUpgradeModal) setShowUpgradeModal(false);
      else if (showCreditShop) setShowCreditShop(false);
    };
    const handleAgentCrud = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.action === 'create' && detail?.entity === 'question') {
        handleTabSwitch('create');
      } else if (detail?.action === 'create' && detail?.entity === 'exam') {
        handleTabSwitch('exams');
      } else if (detail?.action === 'create' && detail?.entity === 'collection') {
        handleTabSwitch('collections');
      } else if (detail?.action === 'create' && detail?.entity === 'flashcard') {
        handleTabSwitch('flashcards');
        setTimeout(() => window.dispatchEvent(new CustomEvent('medq-create-flashcard', { detail: { topic: 'New', count: 1, style: 'qa' } })), 500);
      }
    };

    const handleAgentNavigateModule = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.module) {
        // Map module names to their first/default tab
        const moduleToTab: Record<string, TabId> = {
          'study': 'dashboard', 'ai': 'generate', 'social': 'feed',
          'admin': 'bank', 'drugs': 'flashcards', 'tools': 'lab-values',
          'exam': 'review', 'advanced': 'collections',
        };
        const targetTab = moduleToTab[detail.module] || 'dashboard';
        handleTabSwitch(targetTab);
      }
    };
    const handleAgentGoBack = () => {
      // Navigate to the previous page if tracked, otherwise dashboard
      if (previousTabRef.current) {
        handleTabSwitch(previousTabRef.current);
      } else {
        handleTabSwitch('dashboard');
      }
    };
    const handleAgentTogglePanel = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.panelId === 'sidebar') {
        setSidebarOpen(detail.open !== undefined ? detail.open : !sidebarOpen);
      } else if (detail?.panelId === 'notifications') {
        setShowNotifications(detail.open !== undefined ? detail.open : !showNotifications);
      } else if (detail?.panelId === 'search') {
        setShowGlobalSearch(detail.open !== undefined ? detail.open : !showGlobalSearch);
      }
    };
    const handleAgentAction = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      // Generic action routing — can be extended per actionId
      if (detail?.actionId === 'toggle-sidebar') {
        setSidebarOpen(!sidebarOpen);
      } else if (detail?.actionId === 'open-pomodoro') {
        setShowPomodoro(true);
      } else if (detail?.actionId === 'open-search') {
        setShowGlobalSearch(true);
      } else if (detail?.actionId === 'open-chat-room') {
        // v6: Agent created/accepted a DM or group → switch to chat tab and
        // forward the roomId so AdvancedChatTab can open it directly.
        // setActiveTab('advanced-chat' as TabId);
        // Defer the event so AdvancedChatTab has a chance to mount/remount
        // before the listener fires.
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('medq-agent-open-chat-room', {
            detail: { roomId: detail?.data?.roomId, targetUserId: detail?.data?.targetUserId, targetName: detail?.data?.targetName, groupName: detail?.data?.groupName },
          }));
        }, 350);
      } else if (detail?.actionId === 'refresh-chat') {
        // v6: Agent mutated a room (added member, sent message, etc.) → tell
        // AdvancedChatTab to refetch its room list and (if matching) the open room.
        window.dispatchEvent(new CustomEvent('medq-agent-refresh-chat', {
          detail: { roomId: detail?.data?.roomId },
        }));
      }
    };

    window.addEventListener('medq-agent-navigate', handleAgentNavigate as EventListener);
    window.addEventListener('medq-agent-search', handleAgentSearch as EventListener);
    window.addEventListener('medq-agent-drug-lookup', handleAgentDrugLookup as EventListener);
    window.addEventListener('medq-agent-open-dialog', handleAgentOpenDialog as EventListener);
    window.addEventListener('medq-agent-close-dialog', handleAgentCloseDialog as EventListener);
    window.addEventListener('medq-agent-crud', handleAgentCrud as EventListener);
    window.addEventListener('medq-agent-navigate-module', handleAgentNavigateModule as EventListener);
    window.addEventListener('medq-agent-go-back', handleAgentGoBack as EventListener);
    window.addEventListener('medq-agent-toggle-panel', handleAgentTogglePanel as EventListener);
    window.addEventListener('medq-agent-action', handleAgentAction as EventListener);
    return () => {
      window.removeEventListener('medq-agent-navigate', handleAgentNavigate as EventListener);
      window.removeEventListener('medq-agent-search', handleAgentSearch as EventListener);
      window.removeEventListener('medq-agent-drug-lookup', handleAgentDrugLookup as EventListener);
      window.removeEventListener('medq-agent-open-dialog', handleAgentOpenDialog as EventListener);
      window.removeEventListener('medq-agent-close-dialog', handleAgentCloseDialog as EventListener);
      window.removeEventListener('medq-agent-crud', handleAgentCrud as EventListener);
      window.removeEventListener('medq-agent-navigate-module', handleAgentNavigateModule as EventListener);
      window.removeEventListener('medq-agent-go-back', handleAgentGoBack as EventListener);
      window.removeEventListener('medq-agent-toggle-panel', handleAgentTogglePanel as EventListener);
      window.removeEventListener('medq-agent-action', handleAgentAction as EventListener);
    };
  }, [showAuthModal, showProfile, showSettings, showGlobalSearch, showUpgradeModal, showCreditShop, sidebarOpen, showNotifications]);

  // Real-time notifications via SSE — replaces the old 30s poll.
  // The hook opens a single EventSource per tab and updates `unreadCount`
  // within ~8s of any new notification arriving on the server.
  useNotificationStream({
    enabled: !!true && settings.notifications,
    onUnreadCount: (c) => setNotifCount(c),
    onNotification: (n) => {
      // Toast + chime on every new (unread) notification, unless the user
      // has the panel open (in which case the in-app list will surface it).
      try {
        if (!n.isRead) {
          if (settings.soundEffects) playSoundIfEnabled('notification');
          // Defer toast import to keep this hot path tiny
          import('sonner').then(({ toast }) => {
            toast(n.title || 'New notification', {
              description: n.message,
              duration: 4500,
            });
          });
        }
      } catch { /* never let toast break the SSE handler */ }
    },
  });

  // Fallback: if SSE is unavailable (very old browser, network issue), still
  // poll every 60s as a safety net so the badge doesn't go stale.
  useEffect(() => {
    if (!true) return;
    const fetchNotifs = async () => {
      try {
        const res = await fetch('/api/notifications?unreadOnly=true&limit=1');
        if (res.ok) { const d = await res.json(); setNotifCount(d.unreadCount || 0); }
      } catch { /* silent */ }
    };
    const interval = setInterval(() => {
      fetchNotifs();
    }, 60000);
    return () => clearInterval(interval);
  }, [true]);

  // Ctrl+K / Cmd+K keyboard shortcut for global search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowGlobalSearch(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Real App-Router routing (user directive 2026-11-04) ──
  // handleTabSwitch — for PROGRAMMATIC navigation only (AI agent
  // ui_action navigate, internal feature events like medq-start-exam).
  // The sidebar / bottom nav no longer use it: they navigate with plain
  // <Link> elements (real routing). Every branch below is a REAL
  // App-Router navigation via router.push to a refresh-safe URL:
  //   standalone tabs → their real route (/bank, /generate …)
  //   SPA tabs       → the REAL /?tab=<id> URL (this shell renders it)
  // The old raw window.history.pushState('/tutor') wrote client-only
  // URLs that 404'd on refresh — removed (user directive 2026-11-04).
  //
  // Do NOT add standalone tabs to visitedTabs: PersistentTab (mount-gate
  // in ALL_TABS.map below) would transiently mount a hidden in-shell copy
  // before the route transition completes — and whenever a group loader
  // case was missing, that transient mount threw "Unknown tab in group …"
  // (the generate console error of 2026-11-04). Standalone tabs live at
  // their own routes and are deliberately NOT wired in the group loaders
  // (src/components/medq/tabs/*): importing their heavy page subtrees into
  // the / route graph is what OOM-kills the dev compiler on the 4GB box.
  const handleTabSwitch = (tabId: TabId) => {
    if (tabId === 'admin' && (!user || user.role !== 'admin')) return;
    // Save previous tab before switching (for go_back navigation)
    previousTabRef.current = activeTab;

    const goToTab = () => {
      router.push(tabHref(tabId));
      if (!REAL_PAGE_TABS[tabId] || tabId === 'revenue') {
        // SPA tab — mount it in-shell (revenue renders inline, not via
        // PersistentTab, but the visitedTabs bookkeeping is harmless).
        setVisitedTabs(prev => prev.has(tabId) ? prev : new Set(prev).add(tabId));
      }
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('medq-tab-visible', { detail: tabId }));
    };

    const category = TAB_TO_CATEGORY[tabId];
    if (category && tier === 'free') {
      if (!canAccess(category)) { setShowUpgradeModal(true); return; }
      if (INTERSTITIAL_ENABLED_TABS.has(tabId)) {
        premiumSwitchCountRef.current += 1;
        if (premiumSwitchCountRef.current % INTERSTITIAL_INTERVAL === 0) {
          setShowInterstitial(true);
          setInterstitialCallback(() => () => {
            trackUsage(category);
            goToTab();
          });
          return;
        }
      }
      trackUsage(category);
    }
    goToTab();
  };

  // ─── AI Agent Action Handler ────────────────────────────────────
  const handleAgentAction = (action: { type: string; params: Record<string, unknown>; description: string }) => {
    switch (action.type) {
      case 'navigate_to_tab': {
        const tab = action.params.tab as string;
        if (tab) handleTabSwitch(tab as TabId);
        break;
      }
      case 'search_content': {
        const query = action.params.query as string;
        if (query) {
          setOpenfdaInitialSearch(action.params.category === 'drugs' ? query : undefined);
          if (action.params.category === 'drugs') {
            handleTabSwitch('drug-zoom');
          } else {
            setShowGlobalSearch(true);
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('medq-global-search', { detail: query }));
              }
            }, 300);
          }
        }
        break;
      }
      case 'generate_questions': {
        const topic = action.params.topic as string;
        if (topic) {
          // Stash BEFORE navigating — the /generate route may take longer than
          // the 500 ms event delay to mount, so the page drains this on
          // arrival (src/lib/generate-prefill.ts).
          stageGeneratePrefill({ topic, count: action.params.count || 5, difficulty: action.params.difficulty || 'mixed' });
          handleTabSwitch('generate');
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('medq-generate-questions', {
                detail: { topic, count: action.params.count || 5, difficulty: action.params.difficulty || 'mixed' },
              }));
            }
          }, 500);
        }
        break;
      }
      case 'start_quiz': {
        const mode = action.params.mode as string;
        const modeToTab: Record<string, TabId> = {
          'speed-quiz': 'speed-quiz',
          'daily-challenge': 'challenge',
          'qotd': 'qotd',
          'live-battle': 'live-battle',
          'flashcard-arena': 'flashcards',
          'exam': 'exams',
        };
        const tab = modeToTab[mode] || 'speed-quiz';
        handleTabSwitch(tab);
        break;
      }
      case 'look_up_drug': {
        const drugName = action.params.drugName as string;
        if (drugName) {
          setDrugInteractionInitialDrug(drugName);
          handleTabSwitch('drug-interactions');
        }
        break;
      }
      case 'create_flashcard': {
        const topic = action.params.topic as string;
        if (topic) {
          handleTabSwitch('flashcards');
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('medq-create-flashcard', {
                detail: { topic, count: action.params.count || 10, style: action.params.style || 'qa' },
              }));
            }
          }, 500);
        }
        break;
      }
      case 'set_study_timer': {
        handleTabSwitch('study-timer');
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('medq-set-timer', {
              detail: { minutes: action.params.minutes || 25, mode: action.params.mode || 'pomodoro' },
            }));
          }
        }, 500);
        break;
      }
      case 'bookmark_content': {
        // Dispatch bookmark event — tabs can listen for this
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('medq-bookmark', {
            detail: { type: action.params.type, identifier: action.params.identifier },
          }));
        }
        break;
      }
      case 'explain_concept': {
        handleTabSwitch('ai-mode');
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('medq-explain-concept', {
              detail: { concept: action.params.concept, depth: action.params.depth || 'standard' },
            }));
          }
        }, 500);
        break;
      }
      case 'get_study_plan': {
        handleTabSwitch('planner');
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('medq-study-plan', {
              detail: { exam: action.params.exam, daysLeft: action.params.daysLeft, focusAreas: action.params.focusAreas },
            }));
          }
        }, 500);
        break;
      }
      case 'review_weak_areas': {
        handleTabSwitch('weak-areas');
        break;
      }
      case 'answer_medical_question': {
        // No navigation needed — the answer is in the chat
        break;
      }
      default:
        // Unknown action — no-op
        break;
    }
  };

  useEffect(() => {
    const handler = (e: CustomEvent) => { setExamId(e.detail as string); handleTabSwitch('take-exam'); };
    window.addEventListener('medq-start-exam', handler as EventListener);
    return () => window.removeEventListener('medq-start-exam', handler as EventListener);
  }, []);

  const handleTakeExam = (id: string) => { setExamId(id); handleTabSwitch('take-exam'); };
  const handleBackFromExam = () => { setExamId(null); handleTabSwitch('exams'); };

  const getTabProps = (tabId: TabId): Record<string, any> => {
    switch (tabId) {
      case 'dashboard': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'generate': return { onQuestionsGenerated: () => { } };
      case 'knowledge-map': return { onNavigateToBank: () => handleTabSwitch('bank') };
      case 'exams': return { onTakeExam: handleTakeExam };
      case 'take-exam': return { examId, onBack: handleBackFromExam };
      case 'erc': return { onWatchAd: () => setShowRewardedAd(true) };
      case 'advanced-chat': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'chat': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'friends': return { onOpenChat: () => handleTabSwitch('advanced-chat'), onChallenge: () => handleTabSwitch('arena'), onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'groups': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'weak-areas': return {
        onNavigateToTab: (tab: string, context?: any) => {
          if (tab === 'oral-exam' && context?.weakAreasViva) {
            setTriggerWeakAreasViva(true);
          }
          handleTabSwitch(tab as TabId);
        }
      };
      case 'meeting': return { initialMeetingId, onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'oral-exam': return { triggerWeakAreasViva, clearWeakAreasVivaTrigger: () => setTriggerWeakAreasViva(false), onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'advanced-chat': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'whiteboard-studio': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'video-library': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'medicine-prices': return { onNavigateToTab: (tab: string, searchQuery?: string) => { if (searchQuery && tab === 'openfda-drugs') setOpenfdaInitialSearch(searchQuery); handleTabSwitch(tab as TabId); } };
      case 'openfda-drugs': return { initialSearch: openfdaInitialSearch, onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'drug-zoom': return { onNavigateToTab: (tab: string, searchQuery?: string) => { if (searchQuery && tab === 'openfda-drugs') setOpenfdaInitialSearch(searchQuery); handleTabSwitch(tab as TabId); } };
      case 'drug-zoom-labs': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'drug-interactions': return { initialDrug: drugInteractionInitialDrug, onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'medication-tables': return { onNavigateToTab: (tab: string, searchQuery?: string) => { if (searchQuery && tab === 'drug-interactions') setDrugInteractionInitialDrug(searchQuery); handleTabSwitch(tab as TabId); } };
      case 'performance-coach': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'ai-mode': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'micro-lessons': return { onNavigateToTab: (tab: string, query?: string) => handleTabSwitch(tab as TabId) };
      case 'ai-classroom': return {};
      case 'decision-tree': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'decision-making-tree': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'guideline-library': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'procedure-player': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'cme-tracker': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      case 'knowledge-gap-analyzer': return { onNavigateToTab: (tab: string) => handleTabSwitch(tab as TabId) };
      default: return {};
    }
  };

  // Find current tab label for header
  const currentTab = [...ALL_TABS, ...SPECIAL_TABS].find(t => t.id === activeTab);
  const currentLabel = currentTab?.label || 'MedQ';

  // Update browser title and URL based on current tab
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const label = currentLabel === 'Home' ? 'MedQ — Medical Question Generator' : `${currentLabel} — MedQ`;
    document.title = label;
  }, [currentLabel]);

  return (
    <div className="h-screen flex flex-col relative medq-app-root overflow-hidden max-w-full" style={{ background: 'var(--medq-bg, #0c0e14)', color: 'var(--medq-text, #e8ecf4)' }}>
      <OfflineIndicator />
      <UpgradeModal />
      {/* <InterstitialAd open={showInterstitial} onClose={() => { setShowInterstitial(false); if (interstitialCallback) interstitialCallback(); setInterstitialCallback(null); }} onReward={() => { setShowInterstitial(false); if (interstitialCallback) interstitialCallback(); setInterstitialCallback(null); }} /> */}
      <RewardedAd open={showRewardedAd} onClose={() => setShowRewardedAd(false)} onReward={async () => { await refresh(); }} />
      <CreditShop open={showCreditShop} onClose={() => setShowCreditShop(false)} onWatchAd={() => { setShowCreditShop(false); setShowRewardedAd(true); }} />

      {/* <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab={authModalTab} onSuccess={() => {
        // refreshUser();
      }} /> */}
      <ProfileDialog open={showProfile} onClose={() => setShowProfile(false)} />
      <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />
      <DeviceSecurityDialog open={showDeviceSecurity} onClose={() => setShowDeviceSecurity(false)} /> 
      {/* <OnboardingDialog open={showOnboarding} onClose={() => setOnboardingDismissed(true)} onComplete={() => { refreshUser(); setOnboardingDismissed(true); }} /> */}
       <GlobalSearch open={showGlobalSearch} onClose={() => setShowGlobalSearch(false)} onNavigateToTab={(tab) => handleTabSwitch(tab as TabId)} /> 

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blobFloat { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -30px) scale(1.05); } 66% { transform: translate(-20px, 20px) scale(0.95); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }
        .animate-slide-in { animation: slide-in 0.2s ease-out; }
        .medq-blob-green { background: radial-gradient(circle, #00e5a0, transparent 70%); animation: blobFloat 20s ease-in-out infinite; }
        .medq-blob-red { background: radial-gradient(circle, #ff5757, transparent 70%); animation: blobFloat 25s ease-in-out infinite reverse; }
        .medq-blob-blue { background: radial-gradient(circle, #4fc3f7, transparent 70%); animation: blobFloat 18s ease-in-out infinite 5s; }
      ` }} />

      <div className="medq-bg-blob medq-blob-green fixed" style={{ width: 600, height: 600, top: -200, right: -100, opacity: 0.06 }} />
      <div className="medq-bg-blob medq-blob-red fixed" style={{ width: 500, height: 500, bottom: -150, left: -100, opacity: 0.04 }} />
      <div className="medq-bg-blob medq-blob-blue fixed" style={{ width: 400, height: 400, top: '40%', left: '50%', opacity: 0.03 }} />

      <div className="relative z-10 flex-1 flex h-full overflow-hidden max-w-full">
        {/* Sidebar Navigation - hidden for fullscreen tabs */}
        {!hideSidebar && (
          <SidebarNav
            activeTab={activeTab}
            tier={tier}
            isOpen={sidebarOpen}
            onClose={() =>
              setSidebarOpen(false)
            }
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Header Bar - hidden for fullscreen tabs */}
          {activeTab !== 'meeting' && activeTab !== 'advanced-chat' && activeTab !== 'whiteboard-studio' && (
            <Header />
          )}
          <main className={`medq-main-content w-full mx-auto overflow-x-hidden ${activeTab === 'meeting' || activeTab === 'advanced-chat' || activeTab === 'whiteboard-studio'
            ? 'flex-1 flex flex-col h-full max-w-full px-0 py-0 overflow-hidden'
            : 'flex-1 overflow-y-auto max-w-[1400px] px-3 py-3 pb-24 lg:pb-3'
            }`}>
            {adsEnabled && activeTab === 'dashboard' && <div className="mb-4">
              <BannerAd placement="dashboard_top" />
            </div>}

            {activeTab === 'pricing' && <PricingInline onUpgrade={async (t) => { await fetch('/api/subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier: t }) }); await refresh(); }} tier={tier} />}
            {activeTab === 'revenue' && <RevenueInline />}
            {activeTab === 'admin' && user?.role === 'admin' && <PersistentTab tabId="admin" active={true} />}

            {activeTab !== 'pricing' && activeTab !== 'revenue' && activeTab !== 'admin' && ALL_TABS.map((tab) => {
              if (!visitedTabs.has(tab.id)) return null;
              return <PersistentTab key={tab.id} tabId={tab.id} active={activeTab === tab.id} {...getTabProps(tab.id)} />;
            })}

            {adsEnabled && activeTab !== 'dashboard' && activeTab !== 'pricing' && activeTab !== 'revenue' && (
              <div className="mt-6">
                <BannerAd placement="tab_bottom" />
              </div>
            )}
          </main>

          {/* Pomodoro button - hidden for fullscreen tabs */}
          {activeTab !== 'meeting' && activeTab !== 'advanced-chat' && activeTab !== 'whiteboard-studio' && (showPomodoro ? (
            <div className="fixed bottom-24 lg:bottom-5 right-4 z-50"><PomodoroTimer onClose={() => setShowPomodoro(false)} /></div>
          ) : (
            <button onClick={() => setShowPomodoro(true)} className="fixed bottom-24 lg:bottom-5 right-4 z-50 flex min-h-[44px] min-w-[44px] items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)', color: '#00e5a0' }} aria-label="Pomodoro Timer">
              <Timer className="w-4 h-4" /><span className="text-xs font-semibold hidden sm:inline">Pomodoro</span>
            </button>
          ))}

          {/* Footer (desktop only) - hidden for fullscreen tabs */}
          {activeTab !== 'meeting' && activeTab !== 'advanced-chat' && activeTab !== 'whiteboard-studio' && (
            <footer className="hidden lg:block mt-auto border-t border-white/[0.05] py-3">
              <div className="max-w-[960px] mx-auto px-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <p className="text-[10px] text-[#3a4055]">MedQ — Medical Education Platform · Powered by AI</p>
                  {tier === 'free' && (
                    <button onClick={() => setShowUpgradeModal(true)} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#000' }}>
                      <Crown className="w-2.5 h-2.5" /> Go Premium
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-center gap-3 text-[9px] text-[#3a4055] flex-wrap">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />Study · Quiz · Compete</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />Social · Groups · Chat</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />Earn · Battle · Premium</span>
                </div>
              </div>
            </footer>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation - hidden for fullscreen tabs.
          Plain <Link> navigation (real routing) — no onTabSwitch. */}
      {!hideSidebar && (
        <MobileBottomNav
          activeTab={activeTab}
          unreadNotifs={0}
          items={bottomNavItems}
          onCustomize={openCustomizer}
        />
      )}
      {/* Bottom Navigation Customizer */}
      {customizerOpen && (
        <BottomNavCustomizer
          selectedItems={bottomNavIds}
          onChange={setBottomNavItems}
          onClose={closeCustomizer}
        />
      )}
      {/* AI Voice/Text Agent — v1 or v2 based on feature flag.
          Toggle via localStorage 'medq:useV2Agent' = '1' or env NEXT_PUBLIC_AGENT_V2=1.
          Dev console: window.__setAgentV2(true | false) */}
      {useV2Agent ? (
        <MedQAgentV3 onAction={handleAgentAction} currentTab={activeTab} />
      ) : (
        <MedQAgentV3 onAction={handleAgentAction} currentTab={activeTab} />
      )}

      {/* Visual Guidance Overlay for highlights, tooltips, tours */}
      <VisualGuidanceOverlay />
    </div>
  );
}

/**
 * The exported component wraps MedQApp in UIStateProvider
 * so that useUIState() works in MedQAgent and all children.
 */
function MedQAppWithProvider() {
  return (
    <UIStateProvider>
      <MedQApp />
    </UIStateProvider>
  );
}

export default MedQAppWithProvider;

/* ── Inline Revenue Tab ── */
function RevenueInline() {
  const [stats, setStats] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/ads/revenue').then(r => r.json()).then(d => setStats(d.stats || [])).catch(() => { });
  }, []);
  const totalRev = stats.reduce((a, s) => a + (s.totalRevenue || 0), 0);
  const totalImp = stats.reduce((a, s) => a + (s.adImpressions || 0), 0);
  const totalClk = stats.reduce((a, s) => a + (s.adClicks || 0), 0);

  return (
    <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Revenue Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[#1a1e2b] rounded-xl border border-white/[0.06] text-center">
          <p className="text-xl font-bold text-[#00e5a0]">${totalRev.toFixed(2)}</p>
          <p className="text-[10px] text-[#5a6478]">Total Revenue</p>
        </div>
        <div className="p-4 bg-[#1a1e2b] rounded-xl border border-white/[0.06] text-center">
          <p className="text-xl font-bold text-[#4fc3f7]">{totalImp}</p>
          <p className="text-[10px] text-[#5a6478]">Ad Impressions</p>
        </div>
        <div className="p-4 bg-[#1a1e2b] rounded-xl border border-white/[0.06] text-center">
          <p className="text-xl font-bold text-[#f59e0b]">{totalClk}</p>
          <p className="text-[10px] text-[#5a6478]">Ad Clicks</p>
        </div>
      </div>
      {stats.length === 0 ? (
        <p className="text-xs text-[#5a6478] text-center py-8">No revenue data yet. Start showing ads to earn!</p>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-2">
          {stats.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 bg-[#1a1e2b] rounded-lg border border-white/[0.04] text-xs">
              <span className="text-[#8b95a8]">{s.date}</span>
              <div className="flex items-center gap-4">
                <span className="text-[#4fc3f7]">{s.adImpressions} imp</span>
                <span className="text-[#f59e0b]">{s.adClicks} clk</span>
                <span className="text-[#00e5a0] font-bold">${s.totalRevenue?.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
