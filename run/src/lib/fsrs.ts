/**
 * FSRS-5 Spaced Repetition Scheduler
 *
 * A faithful, dependency-free implementation of the Free Spaced Repetition
 * Scheduler (FSRS-5) — significantly sharper interval scheduling than SM-2:
 *
 *   - Memory STATE model: difficulty (D) + stability (S) instead of a single
 *     easiness factor, so "hard" and "easy" cards diverge much faster.
 *   - Power-law forgetting curve R(t, S) = (1 + FACTOR·t/S)^DECAY — better
 *     matches real memory decay than SM-2's exponential assumption.
 *   - Post-lapse stability: a forgotten card's next interval is computed from
 *     its own post-lapse stability (not reset to 1 day blindly), so mature
 *     cards come back sooner than new ones after a lapse.
 *   - Per-rating stability multipliers (hard penalty / easy bonus).
 *
 * Ratings (Anki-style): 1 Again (forgot) · 2 Hard (almost) · 3 Good (got it) · 4 Easy
 */

/** FSRS-5 default parameters (19 weights, open-spaced-repetition). */
export const FSRS_WEIGHTS = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046,
  1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315,
  2.9898, 0.51655, 0.6621,
] as const;

const DECAY = -0.5;
const FACTOR = 19 / 81;

/** Card states, persisted on FlashcardProgress. */
export interface FsrsCardState {
  /** Memory stability in days (higher = slower forgetting). */
  stability: number;
  /** Perceived difficulty 1 (easy) .. 10 (hard). */
  difficulty: number;
  /** Total review repetitions. */
  reps: number;
  /** Times the card was forgotten (Again). */
  lapses: number;
  /** Last rating 1-4. */
  lastRating: number;
  /** 0 new · 1 learning · 2 review · 3 relearning. */
  state: number;
}

export const NEW_CARD: FsrsCardState = {
  stability: 0,
  difficulty: 5,
  reps: 0,
  lapses: 0,
  lastRating: 0,
  state: 0,
};

export type FsrsRating = 1 | 2 | 3 | 4;

export interface FsrsReviewResult {
  state: FsrsCardState;
  /** Whole days until the next review. */
  intervalDays: number;
  /** Predicted probability of recall at the moment of review (before update). */
  retrievability: number;
  /** Predicted recall probability at the NEXT review (at the new interval). */
  nextRetrievability: number;
}

const MIN_INTERVAL = 1;
const MAX_INTERVAL = 365;
const REQUEST_RETENTION = 0.9; // 90% target — the FSRS sweet spot

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Power-law forgetting curve: probability of recall after t days with stability S. */
export function retrievability(elapsedDays: number, stability: number): number {
  if (stability <= 0) return 0;
  const t = Math.max(0, elapsedDays);
  return Math.pow(1 + (FACTOR * t) / stability, DECAY);
}

/** Interval (days) that decays retrievability to the target retention. */
function intervalForStability(s: number, retention = REQUEST_RETENTION): number {
  const raw = (s / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1);
  return clamp(Math.round(raw), MIN_INTERVAL, MAX_INTERVAL);
}

function initialStability(rating: FsrsRating): number {
  return clamp(FSRS_WEIGHTS[rating - 1], 0.1, 365);
}

function initialDifficulty(rating: FsrsRating): number {
  // D0(G) = w4 - e^(w5·(G-3)) + 1
  return clamp(FSRS_WEIGHTS[4] - Math.exp(FSRS_WEIGHTS[5] * (rating - 3)) + 1, 1, 10);
}

function nextDifficulty(current: number, rating: FsrsRating): number {
  const delta = FSRS_WEIGHTS[6] * (rating - 3);
  const reverted = FSRS_WEIGHTS[7] * initialDifficulty(4) + (1 - FSRS_WEIGHTS[7]) * (current - delta);
  return clamp(reverted, 1, 10);
}

/** Post-lapse stability — where a forgotten card lands after relearning. */
function postLapseStability(s: number, d: number, r: number): number {
  const post =
    FSRS_WEIGHTS[11] * Math.pow(d, -FSRS_WEIGHTS[12]) * (Math.pow(s + 1, FSRS_WEIGHTS[13]) - 1) * Math.exp(FSRS_WEIGHTS[14] * (1 - r));
  return clamp(post, 0.1, 365);
}

/** Stability growth after a successful recall. */
function nextStabilityAfterRecall(s: number, d: number, r: number, rating: FsrsRating): number {
  const hardPenalty = rating === 2 ? FSRS_WEIGHTS[15] : 1;
  const easyBonus = rating === 4 ? FSRS_WEIGHTS[16] : 1;
  const inc =
    1 +
    Math.exp(FSRS_WEIGHTS[8]) * (11 - d) * Math.pow(s, -FSRS_WEIGHTS[9]) * (Math.exp(FSRS_WEIGHTS[10] * (1 - r)) - 1) * hardPenalty * easyBonus;
  return clamp(s * inc, 0.1, 365);
}

/** Short-term (same-day) stability growth — for learning/relearning steps. */
function shortTermStability(s: number, r: number, rating: FsrsRating): number {
  if (rating === 1) {
    return clamp(s * Math.exp(FSRS_WEIGHTS[18] * (1 - r)), 0.1, 365);
  }
  return clamp(s * Math.exp(FSRS_WEIGHTS[17] * (1 - r)), 0.1, 365);
}

/**
 * One FSRS review step.
 *
 * @param card    current card state (use NEW_CARD for the first review)
 * @param rating  1 Again · 2 Hard · 3 Good · 4 Easy
 * @param elapsedDays days since the last review (0 for the first review)
 * @param sameDay  true when this is an intraday learning step
 */
export function fsrsReview(
  card: FsrsCardState,
  rating: FsrsRating,
  elapsedDays: number,
  sameDay = false,
): FsrsReviewResult {
  const wasNew = card.reps === 0 || card.state === 0;
  const recallNow = wasNew ? 0 : retrievability(elapsedDays, card.stability);

  // ── Stability update ──
  let stability: number;
  if (wasNew) {
    stability = initialStability(rating);
  } else if (sameDay) {
    stability = shortTermStability(card.stability, recallNow, rating);
  } else if (rating === 1) {
    stability = postLapseStability(card.stability, card.difficulty, recallNow);
  } else {
    stability = nextStabilityAfterRecall(card.stability, card.difficulty, recallNow, rating);
  }

  // ── Difficulty update (new cards get their initial difficulty) ──
  const difficulty = wasNew ? initialDifficulty(rating) : nextDifficulty(card.difficulty, rating);

  // ── State machine ──
  const lapses = card.lapses + (rating === 1 && !wasNew ? 1 : 0);
  let state: number;
  if (rating === 1) {
    state = 3; // relearning
  } else if (wasNew || card.state === 3 || card.state === 1) {
    state = wasNew ? 2 : card.state === 1 ? 2 : 2; // successful recall → review
  } else {
    state = 2;
  }

  const newCard: FsrsCardState = {
    stability,
    difficulty,
    reps: card.reps + 1,
    lapses,
    lastRating: rating,
    state,
  };

  const intervalDays = intervalForStability(stability);
  const nextRetrievability = retrievability(intervalDays, stability);

  return { state: newCard, intervalDays, retrievability: recallNow, nextRetrievability };
}

/** Read a FlashcardProgress row into an FsrsCardState (defaults for legacy rows). */
export function cardFromProgress(row: {
  stability?: number;
  fsrsDifficulty?: number;
  reps?: number;
  lapses?: number;
  lastRating?: number;
  state?: number;
}): FsrsCardState {
  return {
    stability: row.stability && row.stability > 0 ? row.stability : 0,
    difficulty: row.fsrsDifficulty && row.fsrsDifficulty > 0 ? row.fsrsDifficulty : 5,
    reps: row.reps ?? 0,
    lapses: row.lapses ?? 0,
    lastRating: row.lastRating ?? 0,
    state: row.state ?? 0,
  };
}

/** Map the review-hub's 3-button action to an FSRS rating. */
export function ratingFromAction(action: 'got_it' | 'almost' | 'forgot' | 'easy'): FsrsRating {
  switch (action) {
    case 'forgot': return 1;
    case 'almost': return 2;
    case 'easy': return 4;
    case 'got_it':
    default: return 3;
  }
}

/**
 * SM-2 compatibility view — legacy fields kept in sync so the existing UI
 * (interval / easeFactor chips) keeps rendering sensible values.
 */
export function sm2Compat(state: FsrsCardState, intervalDays: number): { interval: number; repetition: number; efactor: number } {
  return {
    interval: intervalDays,
    repetition: state.reps,
    efactor: clamp(2.5 - (state.difficulty - 5) * 0.1 - state.lapses * 0.02, 1.3, 3.2),
  };
}
