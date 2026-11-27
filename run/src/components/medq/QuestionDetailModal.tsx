'use client';

/**
 * QuestionDetailModal — the intercepted-route question detail overlay.
 *
 * Rendered into the (app)/@modal parallel slot when the user soft-navigates
 * from the bank list to /bank/[id] (see (app)/@modal/(.)bank/[id]/page.tsx).
 * The bank list page stays mounted UNDERNEATH this modal — its filters,
 * scroll position and pagination survive because it never unmounted.
 *
 * Closing (backdrop click, × button, Escape key) calls router.back(), which
 * soft-navigates from /bank/[id] back to /bank: the @modal slot re-renders
 * to its null default and the modal disappears. No full reload, no lost
 * list state — this is the Intercepting Routes + Parallel Routes pattern
 * the App Router is designed around.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, X, Link2, Check } from 'lucide-react';
import QuestionCard from '@/components/medq/QuestionCard';
import type { Question } from '@/lib/medq-types';

export default function QuestionDetailModal({ id }: { id: string }) {
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch the question from the public questions API.
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setNotFound(false);
    (async () => {
      try {
        const res = await fetch(`/api/questions/${encodeURIComponent(id)}`);
        if (!alive) return;
        if (!res.ok) {
          setNotFound(true);
          setQuestion(null);
          return;
        }
        const q = (await res.json()) as Question;
        if (alive) setQuestion(q);
      } catch {
        if (alive) setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  /*
   * Close = router.back(). The intercepted route is popped off the history
   * stack; @modal falls back to its null default. If the modal was somehow
   * opened on a hard load (no history), fall back to /bank.
   */
  const close = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/bank');
    }
  };

  // Escape key closes the modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard unavailable — ignore */ }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Question detail"
    >
      {/* Backdrop — click to dismiss */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm animate-fade-in"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-3xl mt-[4vh] mb-6 max-h-[88vh] flex flex-col rounded-2xl border border-white/[0.08] bg-[#151821] shadow-2xl animate-fade-in overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-white/[0.06] flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-[#e8ecf4] truncate">Question Detail</h2>
            <p className="text-[10px] text-[#8b95a8] truncate">
              {question?.topic ? `${question.topic} · ` : ''}{question?.system || 'Bank'} · ID {String(id).slice(0, 10)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={copyLink}
              title="Copy direct link to this question"
              aria-label="Copy link to this question"
              className="w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.06] border border-white/[0.06] transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-[#00e5a0]" /> : <Link2 className="w-4 h-4 text-[#8b95a8]" />}
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close question detail"
              className="w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.06] border border-white/[0.06] transition-all"
            >
              <X className="w-4 h-4 text-[#8b95a8]" />
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-5 py-5">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-[#00e5a0]" />
            </div>
          )}

          {!loading && notFound && (
            <div className="text-center py-14">
              <p className="text-sm font-semibold text-[#ff8a8a]">Question not found</p>
              <p className="text-xs text-[#8b95a8] mt-1.5">
                It may have been deleted, or the link is out of date.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/25 text-[#00e5a0] text-xs font-bold hover:bg-[#00e5a0]/20 transition-all"
              >
                Back to Bank
              </button>
            </div>
          )}

          {!loading && question && (
            <QuestionCard question={question} forceRevealed />
          )}
        </div>
      </div>
    </div>
  );
}
