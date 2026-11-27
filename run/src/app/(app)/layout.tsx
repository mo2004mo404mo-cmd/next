import AppShellLayout from '@/components/medq/AppShellLayout';

/**
 * (app) route group layout — THE MedQ AppShell as a real App Router layout.
 *
 * Every route inside src/app/(app)/ renders inside this layout:
 *   /home, /bank, /bank/[id], /generate, /flashcards, /messages,
 *   /admin, /ai-classroom, /exam-sim
 *
 * Because App Router layouts persist across client-side navigations within
 * the same layout, the sidebar + header + dialogs + bottom nav stay mounted
 * while the user moves between these routes — fixing the dead-end pages
 * where clicking e.g. "Bank" landed on a page without the sidebar and the
 * only way out was the browser Back button.
 *
 * The `modal` prop is the @modal parallel route slot. Intercepting routes
 * (e.g. (app)/@modal/(.)bank/[id]) render into it as a modal overlay on top
 * of the still-mounted page underneath (e.g. the bank list with its filters,
 * scroll position and pagination intact). @modal/default.tsx renders null
 * when no modal route is active.
 */
export default function AppGroupLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return <AppShellLayout modal={modal}>{children}</AppShellLayout>;
}
