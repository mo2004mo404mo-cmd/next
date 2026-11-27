'use client';

/**
 * QuestionDetailFull — the direct-URL question detail page body.
 *
 * Rendered by (app)/bank/[id]/page.tsx when /bank/<id> is loaded directly
 * (fresh tab, shared link, search-engine click) — the non-intercepted,
 * full-page version of the question detail. It renders the same
 * QuestionCard as the bank list's expanded view plus a back affordance.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import QuestionCard from '@/components/medq/QuestionCard';
import type { Question } from '@/lib/medq-types';

export default function QuestionDetailFull({ id }: { id: string }) {
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Back to bank */}
      <button
        type="button"
        onClick={() => router.push('/bank')}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 mb-5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#c8d0e0] text-xs font-semibold hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Question Bank
      </button>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-6 h-6 animate-spin text-[#00e5a0]" />
        </div>
      )}

      {!loading && notFound && (
        <div className="bg-[#151821] border border-white/[0.06] rounded-2xl p-10 text-center">
          <p className="text-sm font-semibold text-[#ff8a8a]">Question not found</p>
          <p className="text-xs text-[#8b95a8] mt-1.5">
            It may have been deleted, or the link is out of date.
          </p>
        </div>
      )}

      {!loading && question && (
        <QuestionCard question={question} forceRevealed />
      )}
    </div>
  );
}
