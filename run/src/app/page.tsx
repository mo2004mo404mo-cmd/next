
import AppContent from '@/components/medq/AppEntry';

/**
 * "/" — the SPA shell entry.
 *
 * 2026-11-04 consolidation: "/" used to render the SPA shell with the
 * dashboard tab as its default — the SAME content as the real /home route
 * (two URLs, one page, and the AI assistant only lived here). Now the
 * dashboard's only canonical URL is /home, enforced by next.config.ts
 * redirects BEFORE any rendering (deterministic for hard loads, soft
 * navigations and prefetches alike):
 *
 *   • "/"              → redirect → /home
 *   • "/?tab=dashboard"→ redirect → /home
 *   • "/?tab=<spa-id>" → this page renders the SPA shell for that tab.
 *
 * Every SPA-only tab keeps its refresh-safe /?tab=<id> URL.
 */
export default function AppPage() {
  return <AppContent />;
}
