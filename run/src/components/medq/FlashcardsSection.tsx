'use client';

/**
 * FlashcardsSection — shared flashcard decks for a study group.
 *
 * Features:
 *   - Grid of decks (with creation date, card count, due count)
 *   - Create / edit / delete decks (admin or any member)
 *   - Open a deck → study mode with flip animation + SM-2 review buttons
 *   - "Due today" filter
 *   - Inline card editor
 *
 * API:
 *   GET    /api/groups/[id]/flashcards           → list decks
 *   POST   /api/groups/[id]/flashcards           → create deck
 *   GET    /api/groups/[id]/flashcards/[deckId]  → fetch single deck
 *   PATCH  /api/groups/[id]/flashcards/[deckId]  → update deck + cards
 *   DELETE /api/groups/[id]/flashcards/[deckId]  → delete deck
 *   POST   /api/groups/[id]/flashcards/[deckId]/review  → record review
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Loader2, Plus, Layers, ArrowLeft, Trash2, Pencil, X, Check,
  RotateCw, ChevronLeft, ChevronRight, Zap, Brain, Calendar, Sparkles,
} from 'lucide-react';
import { useCurrentUser } from '@/components/medq/useCurrentUser';

const TOKENS = {
  card: {
    radius: 'rounded-2xl',
    bg: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    hoverShadow: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]',
    transition: 'transition-all duration-300 ease-out',
  },
  color: {
    green: 'var(--medq-accent-green, #00e5a0)',
    orange: 'var(--medq-accent-amber, #f59e0b)',
    purple: 'var(--medq-accent-purple, #a78bfa)',
    blue: '#4fc3f7',
    red: 'var(--medq-accent-danger, #ff5757)',
    muted: '#8b95a7',
  },
};

type ReviewState = {
  rating: number;
  repetitions: number;
  interval: number;
  easeFactor: number;
  dueAt: string;
  lastReviewed: string | null;
} | null;

type Flashcard = {
  id: string;
  front: string;
  back: string;
  hint: string;
  tags: string[];
  order: number;
  review: ReviewState;
};

type Deck = {
  id: string;
  name: string;
  description: string;
  subject: string;
  lectureId: string | null;
  createdBy: string;
  creator?: { id: string; name: string; image?: string | null };
  createdAt: string;
  updatedAt?: string;
  flashcardCount?: number;
  flashcards: Flashcard[];
};

function gradientFor(title: string): string {
  const palettes = [
    ['#6366f1', '#8b5cf6'], ['#0ea5e9', '#06b6d4'],
    ['#f59e0b', '#ef4444'], ['#10b981', '#06b6d4'],
    ['#ec4899', '#f43f5e'], ['#8b5cf6', '#ec4899'],
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) | 0;
  const [a, b] = palettes[Math.abs(hash) % palettes.length];
  return `linear-gradient(135deg, ${a} 0%, ${b} 100%)`;
}

function isDueToday(review: ReviewState): boolean {
  if (!review) return true; // never reviewed → due
  return new Date(review.dueAt).getTime() <= Date.now();
}

export default function FlashcardsSection({
  groupId, isAdmin,
}: {
  groupId: string;
  isAdmin: boolean;
  chatHeaders?: () => Record<string, string>;
}) {
  const { authHeaders } = useCurrentUser();
  const chatHeaders = authHeaders;
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDeck, setOpenDeck] = useState<Deck | null>(null);
  const [studyMode, setStudyMode] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [creating, setCreating] = useState(false);
  const [filterDue, setFilterDue] = useState(false);

  const fetchDecks = useCallback(async () => {
    if (!chatHeaders) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/groups/${groupId}/flashcards`, { headers: chatHeaders() });
      if (!res.ok) throw new Error('Failed to load decks');
      const data = await res.json();
      setDecks(data.decks || []);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [groupId, chatHeaders]);

  useEffect(() => { fetchDecks(); }, [fetchDecks]);

  const totalCards = useMemo(
    () => decks.reduce((sum, d) => sum + (d.flashcards?.length || 0), 0),
    [decks]
  );
  const dueCount = useMemo(
    () => decks.reduce((sum, d) => sum + (d.flashcards || []).filter(c => isDueToday(c.review)).length, 0),
    [decks]
  );

  // ── Study mode logic ──
  if (studyMode && openDeck) {
    return (
      <StudyMode
        deck={openDeck}
        groupId={groupId}
        chatHeaders={chatHeaders}
        onExit={async () => {
          // Refresh deck state (review times changed)
          await fetchDecks();
          // Re-fetch the open deck too
          try {
            const res = await fetch(`/api/groups/${groupId}/flashcards/${openDeck.id}`, { headers: chatHeaders() });
            if (res.ok) {
              const data = await res.json();
              setOpenDeck(data.deck);
            }
          } catch {}
          setStudyMode(false);
        }}
      />
    );
  }

  // ── Deck detail view ──
  if (openDeck) {
    return (
      <DeckDetail
        deck={openDeck}
        groupId={groupId}
        isAdmin={isAdmin}
        chatHeaders={chatHeaders}
        onBack={() => setOpenDeck(null)}
        onStudy={() => setStudyMode(true)}
        onEdit={() => setEditingDeck(openDeck)}
        onChanged={async () => {
          await fetchDecks();
          try {
            const res = await fetch(`/api/groups/${groupId}/flashcards/${openDeck.id}`, { headers: chatHeaders() });
            if (res.ok) {
              const data = await res.json();
              setOpenDeck(data.deck);
            }
          } catch {}
        }}
      />
    );
  }

  // ── Deck editor ──
  if (creating || editingDeck) {
    return (
      <DeckEditor
        deck={editingDeck}
        groupId={groupId}
        chatHeaders={chatHeaders}
        onCancel={() => { setCreating(false); setEditingDeck(null); }}
        onSaved={async () => {
          setCreating(false); setEditingDeck(null);
          await fetchDecks();
        }}
      />
    );
  }

  // ── Decks grid ──
  return (
    <div className="space-y-4">
      {/* Header row: stats + actions */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3 text-xs" style={{ color: TOKENS.color.muted }}>
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <strong style={{ color: '#fff' }}>{decks.length}</strong> decks
          </span>
          <span className="flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5" />
            <strong style={{ color: '#fff' }}>{totalCards}</strong> cards
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: TOKENS.color.orange }} />
            <strong style={{ color: TOKENS.color.orange }}>{dueCount}</strong> due today
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterDue(v => !v)}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{
              background: filterDue ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              color: filterDue ? TOKENS.color.orange : TOKENS.color.muted,
              border: `1px solid ${filterDue ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}`,
            }}
            title="Show only cards due today"
          >
            <Calendar className="w-3 h-3 inline mr-1" />Due only
          </button>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{ background: 'rgba(0,229,160,0.12)', color: TOKENS.color.green, border: '1px solid rgba(0,229,160,0.25)' }}
          >
            <Plus className="w-3.5 h-3.5" />New Deck
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" style={{ color: TOKENS.color.green }} /></div>
      ) : error ? (
        <div className="text-center py-8 text-xs" style={{ color: TOKENS.color.red }}>{error}</div>
      ) : decks.length === 0 ? (
        <div className="text-center py-12">
          <Layers className="w-10 h-10 mx-auto mb-2" style={{ color: '#2a3040' }} />
          <p className="text-sm font-semibold" style={{ color: '#5a6478' }}>No flashcard decks yet</p>
          <p className="text-[11px] mt-1" style={{ color: '#3a4055' }}>Create a deck to start studying with the group</p>
          <button
            onClick={() => setCreating(true)}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(0,229,160,0.12)', color: TOKENS.color.green }}
          >
            <Plus className="w-4 h-4" />Create your first deck
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {decks.map(deck => {
            const cards = deck.flashcards || [];
            const due = cards.filter(c => isDueToday(c.review)).length;
            const display = filterDue ? cards.filter(c => isDueToday(c.review)) : cards;
            return (
              <button
                key={deck.id}
                onClick={() => filterDue && display.length === 0 ? null : setOpenDeck(deck)}
                className={`text-left p-4 ${TOKENS.card.radius} ${TOKENS.card.transition} ${TOKENS.card.hoverShadow} hover:border-white/10`}
                style={{
                  background: TOKENS.card.bg,
                  border: TOKENS.card.border,
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: gradientFor(deck.name) }}>
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{deck.name}</p>
                    {deck.subject && (
                      <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: TOKENS.color.blue }}>{deck.subject}</p>
                    )}
                  </div>
                </div>
                {deck.description && (
                  <p className="text-[11px] mb-3 line-clamp-2" style={{ color: TOKENS.color.muted }}>{deck.description}</p>
                )}
                <div className="flex items-center gap-3 text-[10px]" style={{ color: TOKENS.color.muted }}>
                  <span className="flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    {cards.length} cards
                  </span>
                  {due > 0 && (
                    <span className="flex items-center gap-1" style={{ color: TOKENS.color.orange }}>
                      <Calendar className="w-3 h-3" />
                      {due} due
                    </span>
                  )}
                  {deck.creator && (
                    <span className="ml-auto truncate">by {deck.creator.name || 'Unknown'}</span>
                  )}
                </div>
                {filterDue && display.length === 0 && (
                  <div className="mt-2 pt-2 border-t border-white/[0.04] text-[10px] text-center" style={{ color: TOKENS.color.green }}>
                    ✓ All caught up
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ───────── Deck Detail View ───────── */

function DeckDetail({
  deck, groupId, isAdmin, chatHeaders, onBack, onStudy, onEdit, onChanged,
}: {
  deck: Deck; groupId: string; isAdmin: boolean; chatHeaders: () => Record<string, string>;
  onBack: () => void; onStudy: () => void; onEdit: () => void; onChanged: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  const dueCount = (deck.flashcards || []).filter(c => isDueToday(c.review)).length;

  async function handleDelete() {
    if (!confirm(`Delete deck "${deck.name}"? This removes all ${deck.flashcards.length} cards and everyone's review progress.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/flashcards/${deck.id}`, {
        method: 'DELETE',
        headers: chatHeaders(),
      });
      if (res.ok) { onChanged(); onBack(); }
      else { alert('Failed to delete deck'); }
    } catch (e) { alert('Error deleting deck'); }
    finally { setDeleting(false); }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold"
          style={{ color: TOKENS.color.muted, background: 'rgba(255,255,255,0.04)' }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> All decks
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onStudy}
            disabled={deck.flashcards.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
            style={{ background: 'rgba(0,229,160,0.15)', color: TOKENS.color.green, border: '1px solid rgba(0,229,160,0.3)' }}
          >
            <Zap className="w-3.5 h-3.5" /> Study {dueCount > 0 ? `(${dueCount} due)` : ''}
          </button>
          {(isAdmin || true) && (
            <>
              <button
                onClick={onEdit}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(167,139,250,0.12)', color: TOKENS.color.purple }}
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
                style={{ background: 'rgba(255,87,87,0.12)', color: TOKENS.color.red }}
              >
                {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />} Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white">{deck.name}</h2>
        {deck.subject && (
          <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: TOKENS.color.blue }}>{deck.subject}</p>
        )}
        {deck.description && (
          <p className="text-xs mt-1.5" style={{ color: TOKENS.color.muted }}>{deck.description}</p>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: TOKENS.color.muted }}>
          {deck.flashcards.length} cards
        </p>
        {deck.flashcards.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="w-8 h-8 mx-auto mb-2" style={{ color: '#2a3040' }} />
            <p className="text-xs" style={{ color: '#5a6478' }}>No cards in this deck yet</p>
            <button onClick={onEdit} className="mt-2 text-xs font-semibold" style={{ color: TOKENS.color.purple }}>
              Add some cards →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {deck.flashcards.map((card, i) => {
              const due = isDueToday(card.review);
              return (
                <div key={card.id} className={`p-3 ${TOKENS.card.radius}`}
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-mono mt-0.5" style={{ color: TOKENS.color.muted }}>
                      #{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white">{card.front}</p>
                      <p className="text-[11px] mt-1" style={{ color: TOKENS.color.muted }}>{card.back}</p>
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {card.tags.map((t, ti) => (
                            <span key={ti} className="text-[9px] px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(79,195,247,0.1)', color: TOKENS.color.blue }}>#{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    {card.review && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
                        style={{
                          background: due ? 'rgba(245,158,11,0.1)' : 'rgba(0,229,160,0.1)',
                          color: due ? TOKENS.color.orange : TOKENS.color.green,
                        }}>
                        {due ? 'Due' : `in ${card.review.interval}d`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────── Study Mode (flashcard flip + SM-2 review) ───────── */

function StudyMode({
  deck, groupId, chatHeaders, onExit,
}: {
  deck: Deck; groupId: string; chatHeaders: () => Record<string, string>; onExit: () => void;
}) {
  // Study only due cards; if none due, study all
  const queue = useMemo(() => {
    const due = deck.flashcards.filter(c => isDueToday(c.review));
    const list = due.length > 0 ? due : deck.flashcards;
    // Shuffle
    return [...list].sort(() => Math.random() - 0.5);
  }, [deck]);

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, correct: 0 });

  if (queue.length === 0) {
    return (
      <div className="text-center py-16">
        <Check className="w-10 h-10 mx-auto mb-2" style={{ color: TOKENS.color.green }} />
        <p className="text-sm font-semibold text-white">No cards to study</p>
        <button onClick={onExit} className="mt-3 text-xs font-semibold" style={{ color: TOKENS.color.green }}>
          Back to deck
        </button>
      </div>
    );
  }

  if (idx >= queue.length) {
    // Session complete
    return (
      <div className="text-center py-16">
        <Sparkles className="w-12 h-12 mx-auto mb-3" style={{ color: TOKENS.color.purple }} />
        <p className="text-lg font-bold text-white">Session complete!</p>
        <p className="text-xs mt-1" style={{ color: TOKENS.color.muted }}>
          Reviewed {stats.reviewed} cards · {stats.correct} correct
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => { setIdx(0); setFlipped(false); setStats({ reviewed: 0, correct: 0 }); }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(0,229,160,0.12)', color: TOKENS.color.green }}>
            <RotateCw className="w-3.5 h-3.5 inline mr-1" />Study again
          </button>
          <button onClick={onExit}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }}>
            Back to deck
          </button>
        </div>
      </div>
    );
  }

  const card = queue[idx];

  async function rate(rating: 0 | 1 | 2 | 3) {
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch(`/api/groups/${groupId}/flashcards/${deck.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...chatHeaders() },
        body: JSON.stringify({ flashcardId: card.id, rating }),
      });
      setStats(s => ({
        reviewed: s.reviewed + 1,
        correct: s.correct + (rating >= 2 ? 1 : 0),
      }));
      setFlipped(false);
      setIdx(i => i + 1);
    } catch (e) {
      alert('Failed to save review');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold"
          style={{ color: TOKENS.color.muted, background: 'rgba(255,255,255,0.04)' }}
        >
          <X className="w-3.5 h-3.5" /> Exit study
        </button>
        <div className="text-[11px] font-semibold" style={{ color: TOKENS.color.muted }}>
          {idx + 1} / {queue.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="h-full transition-all"
          style={{
            width: `${(idx / queue.length) * 100}%`,
            background: `linear-gradient(90deg, ${TOKENS.color.green}, ${TOKENS.color.blue})`,
          }} />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center py-4">
        <button
          onClick={() => setFlipped(f => !f)}
          className="w-full max-w-2xl min-h-[280px] p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300"
          style={{
            background: flipped
              ? `linear-gradient(135deg, rgba(0,229,160,0.08), rgba(79,195,247,0.05))`
              : `linear-gradient(135deg, rgba(167,139,250,0.08), rgba(99,102,241,0.05))`,
            border: `1px solid ${flipped ? 'rgba(0,229,160,0.2)' : 'rgba(167,139,250,0.2)'}`,
            cursor: 'pointer',
          }}
        >
          <div className="text-[10px] uppercase tracking-wider mb-3" style={{ color: flipped ? TOKENS.color.green : TOKENS.color.purple }}>
            {flipped ? 'Answer' : 'Question'}
          </div>
          <div className="text-base font-semibold text-white whitespace-pre-wrap">
            {flipped ? card.back : card.front}
          </div>
          {card.hint && !flipped && (
            <div className="text-[11px] mt-3 italic" style={{ color: TOKENS.color.muted }}>
              💡 Hint: {card.hint}
            </div>
          )}
          {!flipped && (
            <div className="text-[10px] mt-4" style={{ color: TOKENS.color.muted }}>
              Click to flip
            </div>
          )}
        </button>
      </div>

      {/* Review buttons */}
      {flipped && (
        <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
          {[
            { label: 'Again', rating: 0, color: TOKENS.color.red, desc: '<1m' },
            { label: 'Hard', rating: 1, color: TOKENS.color.orange, desc: '1d' },
            { label: 'Good', rating: 2, color: TOKENS.color.blue, desc: '3d' },
            { label: 'Easy', rating: 3, color: TOKENS.color.green, desc: '6d+' },
          ].map(b => (
            <button
              key={b.rating}
              onClick={() => rate(b.rating as any)}
              disabled={submitting}
              className="p-2.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
              style={{
                background: `${b.color}1a`,
                color: b.color,
                border: `1px solid ${b.color}40`,
              }}
            >
              <div>{b.label}</div>
              <div className="text-[9px] mt-0.5 opacity-70">{b.desc}</div>
            </button>
          ))}
        </div>
      )}

      {/* Skip / prev */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => { setFlipped(false); setIdx(i => Math.min(i + 1, queue.length)); }}
          className="text-[11px] font-semibold px-2 py-1"
          style={{ color: TOKENS.color.muted }}
        >
          Skip →
        </button>
      </div>
    </div>
  );
}

/* ───────── Deck Editor (create / edit) ───────── */

type CardDraft = { id?: string; front: string; back: string; hint: string; tags: string };

function DeckEditor({
  deck, groupId, chatHeaders, onCancel, onSaved,
}: {
  deck: Deck | null; groupId: string; chatHeaders: () => Record<string, string>;
  onCancel: () => void; onSaved: () => void;
}) {
  const [name, setName] = useState(deck?.name || '');
  const [description, setDescription] = useState(deck?.description || '');
  const [subject, setSubject] = useState(deck?.subject || '');
  const [cards, setCards] = useState<CardDraft[]>(
    deck?.flashcards?.map(c => ({
      id: c.id, front: c.front, back: c.back, hint: c.hint, tags: (c.tags || []).join(', '),
    })) || [{ front: '', back: '', hint: '', tags: '' }]
  );
  const [saving, setSaving] = useState(false);

  function updateCard(idx: number, field: keyof CardDraft, value: string) {
    setCards(cs => cs.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  }
  function addCard() { setCards(cs => [...cs, { front: '', back: '', hint: '', tags: '' }]); }
  function removeCard(idx: number) {
    setCards(cs => cs.length === 1 ? cs : cs.filter((_, i) => i !== idx));
  }

  async function handleSave() {
    if (!name.trim()) { alert('Deck name is required'); return; }
    const validCards = cards.filter(c => c.front.trim() || c.back.trim());
    setSaving(true);
    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        subject: subject.trim(),
        flashcards: validCards.map((c, i) => ({
          id: c.id,
          front: c.front.trim(),
          back: c.back.trim(),
          hint: c.hint.trim(),
          tags: c.tags.split(',').map(t => t.trim()).filter(Boolean),
          order: i,
        })),
      };
      const url = deck
        ? `/api/groups/${groupId}/flashcards/${deck.id}`
        : `/api/groups/${groupId}/flashcards`;
      const method = deck ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...chatHeaders() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Save failed');
      }
      onSaved();
    } catch (e: any) {
      alert(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold"
          style={{ color: TOKENS.color.muted, background: 'rgba(255,255,255,0.04)' }}
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40"
          style={{ background: 'rgba(0,229,160,0.15)', color: TOKENS.color.green, border: '1px solid rgba(0,229,160,0.3)' }}
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          {deck ? 'Save changes' : 'Create deck'}
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: TOKENS.color.muted }}>Deck name *</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Cardiology High-Yield"
            className="w-full mt-1 px-3 py-2 rounded-lg text-sm text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: TOKENS.color.muted }}>Subject (optional)</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Cardiology"
              className="w-full mt-1 px-3 py-2 rounded-lg text-sm text-white"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: TOKENS.color.muted }}>Description</label>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="High-yield cards for board prep"
              className="w-full mt-1 px-3 py-2 rounded-lg text-sm text-white"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold" style={{ color: TOKENS.color.muted }}>
            Cards ({cards.filter(c => c.front.trim() || c.back.trim()).length})
          </p>
          <button
            onClick={addCard}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold"
            style={{ background: 'rgba(167,139,250,0.12)', color: TOKENS.color.purple }}
          >
            <Plus className="w-3 h-3" /> Add card
          </button>
        </div>

        <div className="space-y-2">
          {cards.map((card, i) => (
            <div key={i} className="p-3 rounded-xl space-y-2"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono" style={{ color: TOKENS.color.muted }}>#{i + 1}</span>
                <button onClick={() => removeCard(i)}
                  className="text-[10px]"
                  style={{ color: cards.length === 1 ? '#3a4055' : TOKENS.color.red }}>
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <textarea
                value={card.front}
                onChange={e => updateCard(i, 'front', e.target.value)}
                placeholder="Front (question)"
                rows={2}
                className="w-full px-2 py-1.5 rounded text-xs text-white resize-none"
                style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)' }}
              />
              <textarea
                value={card.back}
                onChange={e => updateCard(i, 'back', e.target.value)}
                placeholder="Back (answer)"
                rows={2}
                className="w-full px-2 py-1.5 rounded text-xs text-white resize-none"
                style={{ background: 'rgba(0,229,160,0.05)', border: '1px solid rgba(0,229,160,0.15)' }}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={card.hint}
                  onChange={e => updateCard(i, 'hint', e.target.value)}
                  placeholder="Hint (optional)"
                  className="px-2 py-1 rounded text-[11px] text-white"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                />
                <input
                  value={card.tags}
                  onChange={e => updateCard(i, 'tags', e.target.value)}
                  placeholder="tags, comma, separated"
                  className="px-2 py-1 rounded text-[11px] text-white"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
