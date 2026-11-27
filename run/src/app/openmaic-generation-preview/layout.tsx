// Force dynamic rendering since this page uses client-side hooks (useI18n)
export const dynamic = 'force-dynamic';

import { I18nProvider } from '@/lib/hooks/use-i18n';

/**
 * Layout for the OpenMAIC generation preview route.
 *
 * The ported OpenMAIC page (`page.tsx`) calls `useI18n()` from
 * `@/lib/hooks/use-i18n`, which throws if the component tree is not wrapped
 * in `<I18nProvider>`. medq's root layout (`src/app/layout.tsx`) does NOT
 * include this provider (medq uses its own i18n stack), so we wrap it here
 * — this isolates the OpenMAIC i18n context to just the OpenMAIC routes
 * (`/openmaic-generation-preview/*` and `/classroom/*`) and leaves the rest
 * of medq untouched.
 */
export default function GenerationPreviewLayout({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
