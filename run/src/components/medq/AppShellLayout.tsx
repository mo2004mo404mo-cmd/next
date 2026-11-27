'use client';

/**
 * AppShellLayout — the MedQ application shell as a REAL App Router layout.
 *
 * Why this exists (user feedback 2026-11-04): clicking a sidebar tab with a
 * standalone page (Bank, Generate, Flashcards, …) used to land on a page
 * that rendered WITHOUT the sidebar/header — a dead end where the only way
 * out was the browser Back button. The shell chrome lived inside the SPA
 * root only.
 *
 * This component is rendered by src/app/(app)/layout.tsx for every route in
 * the (app) route group. Because App Router layouts PERSIST across route
 * changes within the same layout, the sidebar, header, dialogs and bottom
 * nav stay mounted while the user moves between /bank → /generate → /home —
 * no remount, no state loss, no Back-button dead ends.
 *
 * Contents (mirrors the SPA shell's chrome in MedQAppShell.tsx):
 *   - background blobs + OfflineIndicator
 *   - SidebarNav (desktop + mobile drawer)
 *   - Header (top bar: credits, theme, search, notifications, user menu)
 *   - shared dialogs (profile / settings / global search / credit shop /
 *     upgrade modal / rewarded ad) — opened via `medq-header-action` events
 *   - Pomodoro floating button + desktop footer
 *   - MobileBottomNav + customizer
 *   - {children} renders the page; {modal} renders the @modal parallel slot
 *     (used by intercepting routes, e.g. the bank question detail modal).
 */

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import { SubscriptionProvider, useSubscription } from '@/components/medq/SubscriptionContext';
import { SettingsProvider } from '@/components/medq/SettingsContext';
import { Toaster } from '@/components/ui/sonner';
import { SidebarNav, MobileBottomNav, BottomNavCustomizer, useBottomNav } from '@/components/medq/navigation';
import Header from '@/components/medq/header';
import OfflineIndicator from '@/components/medq/OfflineIndicator';
import UpgradeModal from '@/components/medq/UpgradeModal';
import { pathToTab } from '@/lib/medq-routing';
import { navigateToTab } from '@/lib/medq-nav';
import { useAppSettingsOpener } from '@/lib/utils/app-events';
import { Timer } from 'lucide-react';

// Heavy dialogs are lazy-loaded so the layout's initial chunk stays small.
const PomodoroTimer = dynamic(() => import('@/components/medq/PomodoroTimer'), { ssr: false });
const RewardedAd = dynamic(() => import('@/components/medq/RewardedAd'), { ssr: false });
const CreditShop = dynamic(() => import('@/components/medq/CreditShop'), { ssr: false });
const ProfileDialog = dynamic(() => import('@/components/medq/ProfileDialog'), { ssr: false });
const SettingsDialog = dynamic(() => import('@/components/medq/SettingsDialog'), { ssr: false });
const DeviceSecurityDialog = dynamic(() => import('@/components/medq/DeviceSecurityDialog'), { ssr: false });
const GlobalSearch = dynamic(() => import('@/components/medq/GlobalSearch'), { ssr: false });

/*
 * The MedQ AI assistant — same MedQAgentV3 the SPA shell mounts at "/",
 * hosted here so it is present on EVERY (app) route (user feedback
 * 2026-11-04: "medq assistant present only in /"). Lazy-loaded like the
 * other heavy chrome pieces. AppShellAgent also bridges the agent event
 * bus (medq-agent-navigate …) to real App Router navigation.
 */
const AppShellAgent = dynamic(() => import('@/components/medq/AppShellAgent'), { ssr: false });

/*
 * SW registration + device-session tracking used to live only in AppEntry
 * ("/"). Now that "/" redirects to /home, landing directly on any real
 * route would never register the service worker — breaking offline study
 * and web push. Mount both here so every (app) route registers them.
 * (Neither reloads on ordinary navigation; the registrar only reloads when
 * a NEW service worker activates — once per deploy, by design.)
 */
const ServiceWorkerRegistrar = dynamic(() => import('@/components/medq/ServiceWorkerRegistrar'), { ssr: false });
const DeviceSessionTracker = dynamic(() => import('@/components/medq/DeviceSessionTracker'), { ssr: false });

type HeaderAction =
  | 'profile' | 'settings' | 'pricing' | 'device-security'
  | 'sidebar' | 'search' | 'credit-shop' | 'rewarded-ad';

function AppShellChrome({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { tier } = useSubscription();

  /*
   * App Router is the source of truth for the active navigation tab
   * (e.g. /bank → 'bank', /messages → 'advanced-chat'). The sidebar and
   * bottom nav navigate with plain <Link> elements — real routing, no
   * click interception — and this URL-derived activeTab drives highlighting.
   */
  const activeTab = pathToTab(pathname || '/');

  /*
   * Fullscreen routes intentionally hide the shell chrome.
   */
  const hideSidebar =
    activeTab === 'meeting' ||
    activeTab === 'advanced-chat' ||
    activeTab === 'whiteboard-studio';

  const {
    items: bottomNavItems,
    itemIds: bottomNavIds,
    setItems: setBottomNavItems,
    customizerOpen,
    openCustomizer,
    closeCustomizer,
  } = useBottomNav();

  // ── Shell-owned dialog state (opened by Header via medq-header-action) ──
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeviceSecurity, setShowDeviceSecurity] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showCreditShop, setShowCreditShop] = useState(false);
  const [showRewardedAd, setShowRewardedAd] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);

  // Allow deeply-nested children to ask the layout to open the app-wide
  // SettingsDialog (same pattern as the SPA shell).
  useAppSettingsOpener((_section) => {
    setShowSettings(true);
  });

  // Header dispatches medq-header-action; the shell owns the dialogs those
  // actions open. (Same event contract as the SPA shell — header.tsx works
  // unchanged in both shells.)
  useEffect(() => {
    const handleHeaderAction = (event: Event) => {
      const { action } = (event as CustomEvent).detail || {};
      switch (action) {
        case 'profile': setShowProfile(true); break;
        case 'settings': setShowSettings(true); break;
        case 'pricing': navigateToTab((p) => router.push(p), 'pricing'); break;
        case 'device-security': setShowDeviceSecurity(true); break;
        case 'sidebar': setSidebarOpen(true); break;
        case 'search': setShowGlobalSearch(true); break;
        case 'credit-shop': setShowCreditShop(true); break;
        case 'rewarded-ad': setShowRewardedAd(true); break;
      }
    };
    window.addEventListener('medq-header-action', handleHeaderAction);
    return () => window.removeEventListener('medq-header-action', handleHeaderAction);
  }, [router]);

  // Ctrl/Cmd+K → global search (parity with the SPA shell).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowGlobalSearch(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // The AI assistant (AppShellAgent) asks the chrome to open the Pomodoro
  // timer via this event — same contract as the SPA shell's actionId handler.
  useEffect(() => {
    const openPomodoro = () => setShowPomodoro(true);
    window.addEventListener('medq-open-pomodoro', openPomodoro);
    return () => window.removeEventListener('medq-open-pomodoro', openPomodoro);
  }, []);

  /* Navigation note: the sidebar/bottom-nav navigate with plain <Link>
   * elements (real App-Router routing, no click interception). Only the
   * GlobalSearch and header actions navigate programmatically via
   * router.push — also real routing; the (app) layout persists across it. */

  return (
    <div className="h-screen flex flex-col relative medq-app-root overflow-hidden max-w-full" style={{ background: 'var(--medq-bg, #0c0e14)', color: 'var(--medq-text, #e8ecf4)' }}>
      <OfflineIndicator />
      {/* UpgradeModal reads its own open state from SubscriptionContext
          (setShowUpgradeModal) — same contract as the SPA shell. */}
      <UpgradeModal />
      <RewardedAd open={showRewardedAd} onClose={() => setShowRewardedAd(false)} />
      <CreditShop open={showCreditShop} onClose={() => setShowCreditShop(false)} onWatchAd={() => { setShowCreditShop(false); setShowRewardedAd(true); }} />
      <ProfileDialog open={showProfile} onClose={() => setShowProfile(false)} />
      <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />
      <DeviceSecurityDialog open={showDeviceSecurity} onClose={() => setShowDeviceSecurity(false)} />
      <GlobalSearch
        open={showGlobalSearch}
        onClose={() => setShowGlobalSearch(false)}
        onNavigateToTab={(tab) => navigateToTab((p) => router.push(p), tab)}
      />
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
        {/* Sidebar Navigation — persists across all (app) routes.
            Plain <Link> navigation (real routing) — no onTabSwitch. */}
        {!hideSidebar && (
          <SidebarNav
            activeTab={activeTab}
            tier={tier}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Top Header Bar */}
          {!hideSidebar && <Header />}

          <main className={`medq-main-content w-full mx-auto overflow-x-hidden ${
            hideSidebar
              ? 'flex-1 flex flex-col h-full max-w-full px-0 py-0 overflow-hidden'
              : 'flex-1 overflow-y-auto max-w-[1400px] px-3 py-3 pb-24 lg:pb-3'
          }`}>
            {/* Page content — swapped on route change, layout stays mounted */}
            {children}
          </main>

          {/* Pomodoro floating button */}
          {!hideSidebar && (showPomodoro ? (
            <div className="fixed bottom-24 lg:bottom-5 right-4 z-50"><PomodoroTimer onClose={() => setShowPomodoro(false)} /></div>
          ) : (
            <button onClick={() => setShowPomodoro(true)} className="fixed bottom-24 lg:bottom-5 right-4 z-50 flex min-h-[44px] min-w-[44px] items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)', color: '#00e5a0' }} aria-label="Pomodoro Timer">
              <Timer className="w-4 h-4" /><span className="text-xs font-semibold hidden sm:inline">Pomodoro</span>
            </button>
          ))}

          {/* Footer (desktop only) */}
          {!hideSidebar && (
            <footer className="hidden lg:block mt-auto border-t border-white/[0.05] py-3">
              <div className="max-w-[960px] mx-auto px-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <p className="text-[10px] text-[#3a4055]">MedQ — Medical Education Platform · Powered by AI</p>
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

      {/* Mobile Bottom Navigation — plain <Link> navigation (real routing) */}
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

      {/* AI Assistant — mounted for EVERY (app) route, fullscreen ones
          included, so the conversation never disappears mid-session.
          Renders its own UIStateProvider + agent event-bus bridge. */}
      <AppShellAgent currentTab={String(activeTab)} />

      {/* Offline / PWA support — registered from every (app) route (was
          "/"-only before the " → /home consolidation). */}
      <ServiceWorkerRegistrar />
      <DeviceSessionTracker />

      {/*
        @modal parallel route slot — renders the intercepted route (e.g.
        /bank/[id] opened from the bank list shows the question detail as a
        modal OVER the list; the list stays mounted underneath). When no
        modal route is active, @modal's default.tsx renders null and this
        slot contributes nothing to the tree.
      */}
      {modal}
    </div>
  );
}

/**
 * Exported wrapper — mounts the providers the chrome needs
 * (SubscriptionContext for tier gating, SettingsContext for the header,
 * Toaster for page-level toasts) so every (app) page has them available.
 */
export function AppShellLayout({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  return (
    <SubscriptionProvider>
      <SettingsProvider>
        <AppShellChrome>{children}{modal}</AppShellChrome>
        <Toaster />
      </SettingsProvider>
    </SubscriptionProvider>
  );
}

export default AppShellLayout;
