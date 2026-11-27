'use client';

/**
 * Cross-shell navigation helper.
 *
 * MedQ has two navigation surfaces, and BOTH use real App-Router routing
 * (user directive 2026-11-04: "i want the real routing of next" — no more
 * preventDefault + onTabSwitch interception, no raw window.history
 * pushState):
 *   1. Real App-Router pages under the (app) route group — these share the
 *      persistent AppShellLayout (sidebar + header never unmount while the
 *      user moves between them).
 *   2. The SPA shell at "/" which hosts the remaining ~60 tabs. SPA tabs
 *      live at the REAL URL "/?tab=<id>" — server-served, refresh-safe,
 *      deep-linkable, back/forward-friendly. The shell derives its active
 *      tab from the URL (searchParams), so <Link href="/?tab=…"> is a
 *      genuine Next.js client-side navigation.
 *
 * This helper is the single source of truth for "where does tab X live":
 *   - Tabs with a real page  → their (app) route path
 *   - SPA-only tabs          → the real "/?tab=<id>" URL
 */

import type { TabId } from './medq-tabid';

/**
 * Tabs extracted to real App Router pages. Those inside the (app) route
 * group render within the shared AppShellLayout, so navigating between any
 * of them keeps the sidebar/header mounted (App Router layouts persist
 * across route changes within the same layout). '/freellm' is a real route
 * that owns its full-screen dashboard layout.
 *
 * NOTE 'take-exam' is deliberately NOT here: /exam/take is only a deep-link
 * forwarding shim to /?tab=take-exam — linking there directly would add a
 * pointless redirect hop. The sidebar targets the real /?tab= URL.
 */
export const REAL_PAGE_TABS: Record<string, string> = {
  'dashboard': '/home',
  'bank': '/bank',
  'generate': '/generate',
  'flashcards': '/flashcards',
  'advanced-chat': '/messages',
  'admin': '/admin',
  'ai-classroom': '/ai-classroom',
  'exam-sim': '/exam-sim',
  'pricing': '/pricing',
  'freellm': '/freellm',
  'osce': '/osce',
};

/**
 * The REAL href a navigation surface (sidebar link, bottom-nav link,
 * programmatic router.push) uses for a tab.
 *
 *   'bank'  → '/bank'   (real (app) route)
 *   'tutor' → '/?tab=tutor' (real URL — the SPA shell renders that tab)
 *
 * Every href this returns is a genuine, refresh-safe App-Router URL.
 */
export function tabHref(tabId: TabId | string): string {
  const id = String(tabId);
  if (REAL_PAGE_TABS[id]) return REAL_PAGE_TABS[id];
  return `/?tab=${encodeURIComponent(id)}`;
}

/**
 * Navigate to a MedQ tab from anywhere (command palette, AI agent events,
 * header actions). Real-page tabs stay inside the (app) layout; SPA tabs
 * hop to their real "/?tab=" URL.
 */
export function navigateToTab(
  push: (path: string) => void,
  tabId: TabId | string,
): void {
  push(tabHref(tabId));
}

/** True when the tab has a real standalone page (used for <Link> decisions). */
export function hasRealPage(tabId: TabId | string): boolean {
  return Boolean(REAL_PAGE_TABS[String(tabId)]);
}
