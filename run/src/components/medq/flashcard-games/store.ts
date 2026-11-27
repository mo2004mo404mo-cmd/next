'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* ─── Types ─── */

export type GameMode = 'classic' | 'match' | 'learn' | 'test';

export interface MatchPair {
  id: string;
  term: string;
  definition: string;
}

export interface MatchState {
  pairs: MatchPair[];
  flippedIds: string[];
  matchedIds: string[];
  mistakes: number;
  startTime: number;
  endTime: number | null;
  isComplete: boolean;
}

export interface MasteryRecord {
  cardId: string;
  level: 0 | 1 | 2 | 3 | 4; // 0=unseen, 1=new, 2=learning, 3=reviewing, 4=mastered
  correctCount: number;
  incorrectCount: number;
  lastSeen: number;
}

export interface TestAnswer {
  cardId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface TestState {
  questions: TestAnswer[];
  currentIndex: number;
  isComplete: boolean;
  startTime: number;
  endTime: number | null;
}

interface FlashcardGameState {
  /* Core */
  mode: GameMode;
  score: number;
  timeLeft: number;

  /* Match Game */
  match: MatchState;

  /* Learn Mode */
  mastery: Record<string, MasteryRecord>;
  learnCardIds: string[];
  learnCurrentIndex: number;

  /* Test Mode */
  test: TestState;

  /* Actions */
  setMode: (mode: GameMode) => void;
  setScore: (score: number) => void;
  addScore: (delta: number) => void;
  setTimeLeft: (seconds: number) => void;
  tickTimer: () => void;

  // Match
  initMatch: (pairs: MatchPair[]) => void;
  flipCard: (id: string) => void;
  recordMatch: (id1: string, id2: string) => void;
  recordMismatch: () => void;
  completeMatch: () => void;
  resetMatch: () => void;

  // Learn
  updateMastery: (cardId: string, correct: boolean) => void;
  setLearnCards: (cardIds: string[]) => void;
  advanceLearnCard: () => void;
  resetLearn: () => void;

  // Test
  initTest: (cardIds: string[]) => void;
  answerTestQuestion: (cardId: string, userAnswer: string, isCorrect: boolean, timeSpent: number) => void;
  completeTest: () => void;
  resetTest: () => void;

  // Global
  resetGame: () => void;
}

export const useFlashcardGameStore = create<FlashcardGameState>()(
  persist(
    (set, get) => ({
      mode: 'classic',
      score: 0,
      timeLeft: 0,

      match: {
        pairs: [],
        flippedIds: [],
        matchedIds: [],
        mistakes: 0,
        startTime: 0,
        endTime: null,
        isComplete: false,
      },

      mastery: {},
      learnCardIds: [],
      learnCurrentIndex: 0,

      test: {
        questions: [],
        currentIndex: 0,
        isComplete: false,
        startTime: 0,
        endTime: null,
      },

      setMode: (mode) => set({ mode }),
      setScore: (score) => set({ score }),
      addScore: (delta) => set((s) => ({ score: s.score + delta })),
      setTimeLeft: (seconds) => set({ timeLeft: seconds }),
      tickTimer: () => set((s) => ({ timeLeft: Math.max(0, s.timeLeft - 1) })),

      // Match
      initMatch: (pairs) => set({
        match: {
          pairs,
          flippedIds: [],
          matchedIds: [],
          mistakes: 0,
          startTime: Date.now(),
          endTime: null,
          isComplete: false,
        },
        score: 0,
      }),

      flipCard: (id) => set((s) => ({
        match: { ...s.match, flippedIds: [...s.match.flippedIds, id] },
      })),

      recordMatch: (id1, id2) => {
        const s = get();
        const newMatched = [...s.match.matchedIds, id1, id2];
        const isComplete = newMatched.length === s.match.pairs.length * 2;
        set({
          match: {
            ...s.match,
            matchedIds: newMatched,
            flippedIds: [],
            isComplete,
            endTime: isComplete ? Date.now() : null,
          },
          score: s.score + 100,
        });
      },

      recordMismatch: () => set((s) => ({
        match: {
          ...s.match,
          flippedIds: [],
          mistakes: s.match.mistakes + 1,
        },
        score: Math.max(0, s.score - 10),
      })),

      completeMatch: () => set((s) => ({
        match: { ...s.match, isComplete: true, endTime: Date.now() },
      })),

      resetMatch: () => set({
        match: {
          pairs: [],
          flippedIds: [],
          matchedIds: [],
          mistakes: 0,
          startTime: 0,
          endTime: null,
          isComplete: false,
        },
        score: 0,
      }),

      // Learn
      updateMastery: (cardId, correct) => set((s) => {
        const existing = s.mastery[cardId] || {
          cardId, level: 0 as const, correctCount: 0, incorrectCount: 0, lastSeen: 0,
        };
        const newCorrect = existing.correctCount + (correct ? 1 : 0);
        const newIncorrect = existing.incorrectCount + (correct ? 0 : 1);

        let newLevel: 0 | 1 | 2 | 3 | 4 = existing.level;
        if (existing.level === 0) newLevel = 1;
        else if (existing.level === 1 && newCorrect >= 1) newLevel = 2;
        else if (existing.level === 2 && newCorrect >= 2) newLevel = 3;
        else if (existing.level === 3 && newCorrect >= 3) newLevel = 4;
        if (!correct && newLevel > 1) newLevel = (newLevel - 1) as 1 | 2 | 3;

        return {
          mastery: {
            ...s.mastery,
            [cardId]: {
              cardId,
              level: newLevel,
              correctCount: newCorrect,
              incorrectCount: newIncorrect,
              lastSeen: Date.now(),
            },
          },
        };
      }),

      setLearnCards: (cardIds) => set({ learnCardIds: cardIds, learnCurrentIndex: 0 }),

      advanceLearnCard: () => set((s) => ({
        learnCurrentIndex: s.learnCurrentIndex + 1,
      })),

      resetLearn: () => set({
        learnCardIds: [],
        learnCurrentIndex: 0,
      }),

      // Test
      initTest: (cardIds) => set({
        test: {
          questions: cardIds.map((id) => ({
            cardId: id,
            userAnswer: '',
            isCorrect: false,
            timeSpent: 0,
          })),
          currentIndex: 0,
          isComplete: false,
          startTime: Date.now(),
          endTime: null,
        },
        score: 0,
      }),

      answerTestQuestion: (cardId, userAnswer, isCorrect, timeSpent) => set((s) => ({
        test: {
          ...s.test,
          questions: s.test.questions.map((q) =>
            q.cardId === cardId ? { ...q, userAnswer, isCorrect, timeSpent } : q
          ),
          currentIndex: s.test.currentIndex + 1,
          isComplete: s.test.currentIndex + 1 >= s.test.questions.length,
          endTime: s.test.currentIndex + 1 >= s.test.questions.length ? Date.now() : null,
        },
        score: s.score + (isCorrect ? 10 : 0),
      })),

      completeTest: () => set((s) => ({
        test: { ...s.test, isComplete: true, endTime: Date.now() },
      })),

      resetTest: () => set({
        test: {
          questions: [],
          currentIndex: 0,
          isComplete: false,
          startTime: 0,
          endTime: null,
        },
        score: 0,
      }),

      resetGame: () => set({
        mode: 'classic',
        score: 0,
        timeLeft: 0,
        match: {
          pairs: [],
          flippedIds: [],
          matchedIds: [],
          mistakes: 0,
          startTime: 0,
          endTime: null,
          isComplete: false,
        },
        learnCardIds: [],
        learnCurrentIndex: 0,
        test: {
          questions: [],
          currentIndex: 0,
          isComplete: false,
          startTime: 0,
          endTime: null,
        },
      }),
    }),
    {
      name: 'medq-flashcard-game-store',
      partialize: (state) => ({
        mastery: state.mastery,
      }),
    }
  )
);
