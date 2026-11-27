import type { Metadata } from 'next';
import QuestionDetailFull from '@/components/medq/QuestionDetailFull';

/**
 * /bank/[id] — the real (non-intercepted) question detail page.
 *
 * Rendered on direct loads (fresh tab, shared link, F5, SSR crawlers) and
 * as the SEO fallback for the intercepted modal route. Client-side
 * navigations from /bank are intercepted by (app)/@modal/(.)bank/[id] and
 * shown as a modal over the list instead.
 */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Question ${String(id).slice(0, 8)} — MedQ Bank`,
    description: 'View a medical question with full explanation, mnemonic and clinical pearl on MedQ.',
  };
}

export default async function BankQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuestionDetailFull id={id} />;
}
