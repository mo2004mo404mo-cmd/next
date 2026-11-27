'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

import { navigateToTab } from '@/lib/medq-nav';
import type { TabId } from '@/lib/medq-tabid';

/**
 * /home — the MedQ dashboard.
 *
 * Previously this page rendered the sidebar chrome with a completely EMPTY
 * <main> (the dashboard content only existed inside the SPA root at "/").
 * Clicking "Home" in the sidebar navigated here and the user saw nothing.
 *
 * Now the page renders the real DashboardTab component (the same one the
 * SPA loads through the group-study tab loader). The shell chrome (sidebar,
 * header, bottom nav) comes from the (app) route group layout — this page
 * only owns the content area.
 *
 * The DashboardTab is lazy-loaded so the layout's first paint stays fast;
 * 'ssr: false' matches the SPA behavior (the dashboard fetches its data
 * client-side from /api/dashboard).
 */
const DashboardTab = dynamic(
  () => import('@/components/medq/DashboardTab'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-[#00e5a0]" />
      </div>
    ),
  },
);

export default function HomePage() {
  const router = useRouter();

  /*
   * DashboardTab navigates via onNavigateToTab(tab) — e.g. "Continue
   * studying" cards, quick actions, streak CTAs. Route real-page tabs to
   * their routes (staying inside this layout); SPA tabs hop to /?tab=.
   */
  const handleNavigate = useCallback(
    (tab: string) => {
      navigateToTab((p) => router.push(p), tab as TabId);
    },
    [router],
  );

  return (
    <div className="animate-fade-in">
      <DashboardTab onNavigateToTab={handleNavigate} />
    </div>
  );
}
