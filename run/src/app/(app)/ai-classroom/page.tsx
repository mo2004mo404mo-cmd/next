'use client';

/**
 * OpenMAIC Classroom Tab — mounts the real ported OpenMAIC HomePage inside
 * the MedQ app shell.
 *
 * The previous "AI Classroom" tab (`AIChatroomTab.tsx`) was a self-contained
 * stub that simulated lesson generation with setTimeout and fake data, while
 * the actual OpenMAIC UI (topic input → /openmaic-generation-preview →
 * /classroom/[id]) sat unused in `src/components/openmaic/*`.
 *
 * This wrapper restores the real OpenMAIC UX by mounting `<OpenMAICHomePage>`
 * with the two context providers it requires:
 *   • `<I18nProvider>`  — OpenMAIC UI strings (useI18n)
 *   • `<ThemeProvider>` — dark/light/-system theme (useTheme)
 *
 * Both providers are isolated to this tab so they don't affect the rest of
 * MedQ's i18n/theme stack (matches the layout strategy used by the
 * `/openmaic-generation-preview` and `/classroom/[id]` routes).
 *
 * The `<AccessCodeGuard>` is also mounted so the access-code flow (if the
 * `ACCESS_CODE` env var is set) is consistent with the standalone OpenMAIC
 * routes. When `ACCESS_CODE` is unset (default), the guard is a no-op.
 */

import { I18nProvider } from '@/lib/hooks/use-i18n';
import { ThemeProvider } from '@/lib/hooks/use-theme';
import { AccessCodeGuard } from '@/components/openmaic/access-code-guard';
import { OpenMAICHomePage } from '@/components/openmaic/home-page';

export default function OpenMAICClassroomTab() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AccessCodeGuard>
          <OpenMAICHomePage />
        </AccessCodeGuard>
      </ThemeProvider>
    </I18nProvider>
  );
}
