import QuestionDetailModal from '@/components/medq/QuestionDetailModal';

/**
 * INTERCEPTING ROUTE — (.)bank/[id] from inside the @modal parallel slot.
 *
 * When the user is on /bank and clicks a question (soft navigation to
 * /bank/<id>), Next.js matches this intercepted route INSTEAD of the real
 * (app)/bank/[id]/page.tsx and renders it into the @modal slot of the
 * (app) layout — a modal overlay on top of the still-mounted bank list.
 *
 * A direct load of /bank/<id> (fresh tab, shared link, F5) does NOT match
 * the interception — it renders the full (app)/bank/[id]/page.tsx instead.
 * Back / close pops the intercepted route and the modal disappears with
 * the list state intact.
 *
 * Server component: unwraps the async params and hands the id to the
 * client modal (fetch + interactions happen there).
 */
export default async function InterceptedBankQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuestionDetailModal id={id} />;
}
