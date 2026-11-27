'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Timer, Zap, Trophy, RotateCcw, ArrowLeft, Shuffle,
  CheckCircle2, XCircle, Star, Crown, Medal,
} from 'lucide-react';
import { toast } from 'sonner';
import { useFlashcardGameStore, MatchPair } from './store';

/* ─── Color Constants ─── */
const C = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, #151821)',
  cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
  green: 'var(--medq-accent-green, #00e5a0)',
  cyan: 'var(--medq-accent-cyan, #22d3ee)',
  amber: 'var(--medq-accent-amber, #ffb347)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  purple: 'var(--medq-accent-purple, #8b5cf6)',
  text: 'var(--medq-text, #e8ecf4)',
  muted: 'var(--medq-muted, #5a6478)',
  dimmed: 'var(--medq-dimmed, #3a4055)',
};

interface MatchGameProps {
  cards: Array<{ id: string; text: string; answer: string }>;
  onBack: () => void;
}

/* ─── Single Card Tile ─── */
interface TileData {
  id: string;
  pairId: string;
  content: string;
  type: 'term' | 'definition';
}

function MatchTile({
  tile,
  isFlipped,
  isMatched,
  isWrong,
  onClick,
}: {
  tile: TileData;
  isFlipped: boolean;
  isMatched: boolean;
  isWrong: boolean;
  onClick: () => void;
}) {
  const borderColor = isMatched
    ? C.green
    : isWrong
    ? C.danger
    : isFlipped
    ? C.cyan
    : C.cardBorder;

  const bgColor = isMatched
    ? `${C.green}08`
    : isWrong
    ? `${C.danger}08`
    : isFlipped
    ? `${C.cyan}06`
    : 'rgba(255,255,255,0.02)';

  return (
    <button
      onClick={onClick}
      disabled={isMatched}
      className={`
        relative w-full p-3 rounded-xl border text-left transition-all duration-200
        ${isMatched ? 'opacity-60 cursor-default' : 'cursor-pointer hover:border-white/15'}
      `}
      style={{
        borderColor: `${borderColor}40`,
        background: bgColor,
        boxShadow: isFlipped && !isMatched ? `0 0 15px ${C.cyan}10` : 'none',
      }}
    >
      {/* Flip animation overlay */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: isFlipped && !isMatched
            ? `linear-gradient(135deg, ${C.cyan}08, ${C.purple}08)`
            : 'transparent',
          opacity: isFlipped ? 1 : 0,
        }}
      />

      <div className="relative">
        {/* Type label */}
        <span
          className="text-[9px] font-bold uppercase tracking-wider mb-1 block"
          style={{
            color: tile.type === 'term' ? C.cyan : C.amber,
          }}
        >
          {tile.type === 'term' ? 'Term' : 'Definition'}
        </span>

        {/* Content */}
        <p
          className="text-xs leading-relaxed"
          style={{
            color: isMatched ? C.green : isFlipped ? C.text : C.muted,
          }}
        >
          {tile.content.length > 80 ? tile.content.slice(0, 78) + '...' : tile.content}
        </p>
      </div>

      {/* Matched checkmark */}
      {isMatched && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 className="w-4 h-4" style={{ color: C.green }} />
        </div>
      )}
    </button>
  );
}

/* ─── Leaderboard ─── */
function MatchLeaderboard({ entries }: { entries: Array<{ score: number; time: number; mistakes: number }> }) {
  if (entries.length === 0) return null;

  return (
    <div className="p-4 rounded-xl border" style={{ background: C.card, borderColor: C.cardBorder }}>
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-4 h-4" style={{ color: C.amber }} />
        <span className="text-xs font-bold" style={{ color: C.text }}>Top Scores</span>
      </div>
      <div className="space-y-1.5">
        {entries.slice(0, 5).map((entry, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span style={{ color: i === 0 ? C.amber : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : C.dimmed }}>
                {i === 0 ? <Crown className="w-3.5 h-3.5" /> : i === 1 ? <Medal className="w-3.5 h-3.5" /> : <Star className="w-3 h-3" />}
              </span>
              <span style={{ color: C.muted }}>{Math.round(entry.time)}s</span>
              <span style={{ color: C.dimmed }}>·</span>
              <span style={{ color: C.muted }}>{entry.mistakes} mistakes</span>
            </div>
            <span className="font-bold" style={{ color: i === 0 ? C.amber : C.cyan }}>{entry.score}pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main MatchGame Component ─── */
export default function MatchGame({ cards, onBack }: MatchGameProps) {
  const store = useFlashcardGameStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Array<{ score: number; time: number; mistakes: number }>>([]);

  // Generate pairs from cards
  const pairs: MatchPair[] = useMemo(() =>
    cards.slice(0, 8).map((card) => ({
      id: card.id,
      term: card.text.length > 60 ? card.text.slice(0, 58) + '...' : card.text,
      definition: card.answer.length > 60 ? card.answer.slice(0, 58) + '...' : card.answer,
    })),
  [cards]
  );

  // Generate shuffled tiles
  const tiles: TileData[] = useMemo(() => {
    const allTiles: TileData[] = [];
    pairs.forEach((pair) => {
      allTiles.push({ id: `${pair.id}-term`, pairId: pair.id, content: pair.term, type: 'term' });
      allTiles.push({ id: `${pair.id}-def`, pairId: pair.id, content: pair.definition, type: 'definition' });
    });
    // Shuffle using Fisher-Yates
    for (let i = allTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]];
    }
    return allTiles;
  }, [pairs]);

  // Initialize match on mount
  useEffect(() => {
    useFlashcardGameStore.getState().initMatch(pairs);
  }, [pairs]);

  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle card click
  const handleTileClick = useCallback((tile: TileData) => {
    const state = useFlashcardGameStore.getState();
    if (state.match.isComplete) return;
    if (state.match.matchedIds.includes(tile.id)) return;
    if (state.match.flippedIds.includes(tile.id)) return;
    if (state.match.flippedIds.length >= 2) return;

    state.flipCard(tile.id);

    const newFlipped = [...state.match.flippedIds, tile.id];
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstTile = tiles.find((t) => t.id === first);
      const secondTile = tiles.find((t) => t.id === second);

      if (firstTile && secondTile && firstTile.pairId === secondTile.pairId && firstTile.type !== secondTile.type) {
        // Match found!
        setTimeout(() => {
          useFlashcardGameStore.getState().recordMatch(first, second);
          // Check completion
          const newState = useFlashcardGameStore.getState();
          if (newState.match.isComplete) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleSubmitScore();
          }
        }, 400);
      } else {
        // Mismatch
        setTimeout(() => {
          useFlashcardGameStore.getState().recordMismatch();
        }, 800);
      }
    }
  }, [tiles]);

  const handleSubmitScore = useCallback(async () => {
    const state = useFlashcardGameStore.getState();
    const time = (Date.now() - state.match.startTime) / 1000;

    try {
      const res = await fetch('/api/flashcards/match-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time,
          mistakes: state.match.mistakes,
          pairs: pairs.length,
          score: state.score,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.xpEarned) {
          toast.success(`+${data.xpEarned} XP`, { duration: 2000 });
        }
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      }
    } catch {
      // silent fail
    }
    setShowResults(true);
  }, [pairs.length]);

  const handleRestart = useCallback(() => {
    useFlashcardGameStore.getState().initMatch(pairs);
    setElapsed(0);
    setShowResults(false);
    // Restart timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }, [pairs]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const matchState = store.match;
  const totalPairs = pairs.length;
  const matchedCount = matchState.matchedIds.length / 2;
  const progressPercent = totalPairs > 0 ? (matchedCount / totalPairs) * 100 : 0;

  /* ─── Results Screen ─── */
  if (showResults) {
    const totalTime = matchState.endTime && matchState.startTime
      ? (matchState.endTime - matchState.startTime) / 1000
      : elapsed;
    const timeBonus = Math.max(0, 300 - Math.round(totalTime));
    const mistakePenalty = matchState.mistakes * 15;
    const finalScore = store.score + timeBonus - mistakePenalty;

    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6" style={{ background: C.bg }}>
        <div className="max-w-lg mx-auto text-center">
          {/* Trophy */}
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: `${C.amber}10` }}>
            <Trophy className="w-10 h-10" style={{ color: C.amber }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: C.text }}>Match Complete!</h2>
          <p className="text-sm mb-6" style={{ color: C.muted }}>You matched all {totalPairs} pairs</p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <Timer className="w-5 h-5 mx-auto mb-2" style={{ color: C.cyan }} />
              <p className="text-xl font-black" style={{ color: C.cyan }}>{formatTime(Math.round(totalTime))}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Time</p>
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <XCircle className="w-5 h-5 mx-auto mb-2" style={{ color: C.danger }} />
              <p className="text-xl font-black" style={{ color: C.danger }}>{matchState.mistakes}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Mistakes</p>
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: C.card, borderColor: C.cardBorder }}>
              <Zap className="w-5 h-5 mx-auto mb-2" style={{ color: C.amber }} />
              <p className="text-xl font-black" style={{ color: C.amber }}>{finalScore}</p>
              <p className="text-[9px] uppercase tracking-wider" style={{ color: C.muted }}>Score</p>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="p-4 rounded-xl border text-left mb-6" style={{ background: C.card, borderColor: C.cardBorder }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.text }}>Score Breakdown</p>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span style={{ color: C.muted }}>Base Score</span><span style={{ color: C.green }}>+{store.score}</span></div>
              <div className="flex justify-between"><span style={{ color: C.muted }}>Time Bonus</span><span style={{ color: C.cyan }}>+{timeBonus}</span></div>
              <div className="flex justify-between"><span style={{ color: C.muted }}>Mistake Penalty</span><span style={{ color: C.danger }}>-{mistakePenalty}</span></div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: C.cardBorder }}><span className="font-bold" style={{ color: C.text }}>Final</span><span className="font-bold" style={{ color: C.amber }}>{finalScore}</span></div>
            </div>
          </div>

          {/* Leaderboard */}
          <MatchLeaderboard entries={leaderboard} />

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: `${C.cyan}15`, color: C.cyan, border: `1px solid ${C.cyan}25` }}
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
            <button
              onClick={onBack}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.04)', color: C.muted, border: `1px solid ${C.cardBorder}` }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Game Board ─── */
  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ background: C.bg }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.cardBorder, background: C.card }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors" style={{ color: C.muted }}>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold" style={{ color: C.text }}>Match Game</h2>
            <p className="text-[10px]" style={{ color: C.dimmed }}>Match terms to definitions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <Timer className="w-3.5 h-3.5" style={{ color: C.cyan }} />
            <span className="text-xs font-mono font-bold" style={{ color: C.cyan }}>{formatTime(elapsed)}</span>
          </div>
          {/* Mistakes */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <XCircle className="w-3.5 h-3.5" style={{ color: matchState.mistakes > 0 ? C.danger : C.dimmed }} />
            <span className="text-xs font-bold" style={{ color: matchState.mistakes > 0 ? C.danger : C.dimmed }}>{matchState.mistakes}</span>
          </div>
          {/* Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: `${C.amber}08` }}>
            <Zap className="w-3.5 h-3.5" style={{ color: C.amber }} />
            <span className="text-xs font-bold" style={{ color: C.amber }}>{store.score}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px]" style={{ color: C.muted }}>{matchedCount}/{totalPairs} matched</span>
          <span className="text-[10px]" style={{ color: C.muted }}>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%`, background: `linear-gradient(90deg, ${C.cyan}, ${C.green})` }} />
        </div>
      </div>

      {/* Tile grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {tiles.map((tile) => {
            const isFlipped = matchState.flippedIds.includes(tile.id);
            const isMatched = matchState.matchedIds.includes(tile.id);
            const isWrong = matchState.flippedIds.length === 2 && matchState.flippedIds.includes(tile.id);

            return (
              <MatchTile
                key={tile.id}
                tile={tile}
                isFlipped={isFlipped || isMatched}
                isMatched={isMatched}
                isWrong={isWrong && !isMatched}
                onClick={() => handleTileClick(tile)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
