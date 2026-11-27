'use client';

/**
 * AppShellAgent — mounts the MedQ AI assistant (MedQAgentV3) inside the
 * persistent (app) AppShellLayout so it is available on EVERY real route
 * (/home, /bank, /generate, /flashcards, /messages, /admin, …), not only
 * inside the SPA shell at "/".
 *
 * 2026-11-04 (user feedback: "medq assistant present only in /"):
 * MedQAgentV3 used to be rendered solely by MedQAppShell — navigating to any
 * real route made the floating assistant (and the whole agent event bus)
 * disappear mid-conversation. Because App Router layouts persist across
 * route changes, hosting it here keeps the assistant mounted while the user
 * moves between pages — the conversation thread survives.
 *
 * The assistant needs a UIStateProvider ancestor (it calls useUIState()), so
 * one is wrapped around it here — a nested provider is harmless and keeps
 * this component self-contained.
 *
 * Event bus: this component ALSO bridges the agent's window-event navigation
 * contract (medq-agent-navigate / go-back / navigate-module / action /
 * toggle-panel / open-chat-room) to real App Router navigation. On the SPA
 * shell those listeners live in MedQAppShell; without them here the agent's
 * "take me to the bank" style actions would dispatch into the void on real
 * routes. Dialog-target actions are delegated to the chrome via the
 * `medq-header-action` event that AppShellLayout already handles.
 */

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { UIStateProvider } from '@/components/medq/ai-agent/UIStateContext';
import { MedQAgentV3 } from '@/components/medq/ai-agent/MedQAgentV3';
import type { AgentAction } from '@/components/medq/ai-agent/useAgentV2Stream';
import { resolveNavigationTarget } from '@/lib/medq-routing';
import { tabHref } from '@/lib/medq-nav';

/** Free-text tab names that are actually URL-ish — never set as a tab. */
function isUrlLike(value: string): boolean {
  return value.startsWith('/') || /^https?:\/\//i.test(value) || value.startsWith('//') || value.includes('.');
}

function AppShellAgentInner({ currentTab }: { currentTab: string }) {
  const router = useRouter();

  /* ── Compact tab navigation (mirror of MedQAppShell.handleTabSwitch) ── */
  const goToTab = (tab: string) => {
    router.push(tabHref(tab));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('medq-tab-visible', { detail: tab }));
    }
  };

  /* ── Agent event bus → real routing ─────────────────────────────────── */
  useEffect(() => {
    const handleAgentNavigate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const t = detail?.tab != null ? String(detail.tab) : '';
      if (!t || isUrlLike(t)) {
        if (t) console.warn('[AppShellAgent] Ignored agent-navigate with URL-like tab value:', t);
        return;
      }
      const resolved = resolveNavigationTarget(t);
      if (resolved.kind === 'dialog') {
        // Delegate dialog targets to the chrome's existing action handler
        // (profile / settings / search / credit-shop / …).
        const dialogToAction: Record<string, string> = {
          'profile': 'profile',
          'settings': 'settings',
          'search': 'search',
          'credit-shop': 'credit-shop',
          'auth-modal': 'sidebar', // no direct chrome action; harmless no-op
        };
        const action = dialogToAction[resolved.target];
        if (action) {
          window.dispatchEvent(new CustomEvent('medq-header-action', { detail: { action } }));
        }
        return;
      }
      goToTab(resolved.target);
    };

    const handleAgentNavigateModule = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.module) {
        const moduleToTab: Record<string, string> = {
          'study': 'dashboard', 'ai': 'generate', 'social': 'feed',
          'admin': 'bank', 'drugs': 'flashcards', 'tools': 'lab-values',
          'exam': 'review', 'advanced': 'collections',
        };
        goToTab(moduleToTab[String(detail.module)] || 'dashboard');
      }
    };

    const handleAgentGoBack = () => {
      router.back();
    };

    const handleAgentAction = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const actionId = detail?.actionId;
      switch (actionId) {
        case 'toggle-sidebar':
          window.dispatchEvent(new CustomEvent('medq-header-action', { detail: { action: 'sidebar' } }));
          break;
        case 'open-pomodoro':
          window.dispatchEvent(new CustomEvent('medq-open-pomodoro'));
          break;
        case 'open-search':
          window.dispatchEvent(new CustomEvent('medq-header-action', { detail: { action: 'search' } }));
          break;
        case 'open-chat-room': {
          // The Messages page owns the room-opening logic; navigate there
          // first, then re-dispatch so its freshly-mounted listener catches it.
          const roomId = detail?.data?.roomId;
          if (typeof window !== 'undefined' && window.location.pathname !== '/messages') {
            goToTab('advanced-chat');
          }
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('medq-agent-open-chat-room', {
              detail: {
                roomId,
                targetUserId: detail?.data?.targetUserId,
                targetName: detail?.data?.targetName,
                groupName: detail?.data?.groupName,
              },
            }));
          }, 400);
          break;
        }
        case 'refresh-chat':
          // The Messages page refetches its own room list on this event.
          window.dispatchEvent(new CustomEvent('medq-agent-refresh-chat', { detail: { roomId: detail?.data?.roomId } }));
          break;
        default:
          break;
      }
    };

    const handleAgentTogglePanel = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.panelId === 'sidebar') {
        window.dispatchEvent(new CustomEvent('medq-header-action', { detail: { action: 'sidebar' } }));
      } else if (detail?.panelId === 'search') {
        window.dispatchEvent(new CustomEvent('medq-header-action', { detail: { action: 'search' } }));
      }
    };

    window.addEventListener('medq-agent-navigate', handleAgentNavigate as EventListener);
    window.addEventListener('medq-agent-navigate-module', handleAgentNavigateModule as EventListener);
    window.addEventListener('medq-agent-go-back', handleAgentGoBack as EventListener);
    window.addEventListener('medq-agent-action', handleAgentAction as EventListener);
    window.addEventListener('medq-agent-toggle-panel', handleAgentTogglePanel as EventListener);
    return () => {
      window.removeEventListener('medq-agent-navigate', handleAgentNavigate as EventListener);
      window.removeEventListener('medq-agent-navigate-module', handleAgentNavigateModule as EventListener);
      window.removeEventListener('medq-agent-go-back', handleAgentGoBack as EventListener);
      window.removeEventListener('medq-agent-action', handleAgentAction as EventListener);
      window.removeEventListener('medq-agent-toggle-panel', handleAgentTogglePanel as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  /* onAction prop — legacy escape hatch for untyped actions (kept minimal:
   * everything typed flows through the event bus above). */
  const handleAction = (action: AgentAction) => {
    if (action?.type === 'navigate_to_tab' && action.params?.tab) {
      goToTab(String(action.params.tab));
    }
  };

  return <MedQAgentV3 onAction={handleAction} currentTab={currentTab} />;
}

export function AppShellAgent({ currentTab }: { currentTab: string }) {
  return (
    <UIStateProvider>
      <AppShellAgentInner currentTab={currentTab} />
    </UIStateProvider>
  );
}

export default AppShellAgent;
