import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SelfTest {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

export interface MicroLesson {
  id: string;
  fact: string;
  clinicalRelevance: string;
  selfTest: SelfTest;
  relatedContent: {
    title: string;
    type: 'flashcard' | 'question' | 'case' | 'topic';
    system: string;
    topic: string;
  };
  date: string; // ISO date string YYYY-MM-DD
  system: string;
  topic: string;
  difficulty: number; // 1-5
  completed: boolean;
  selfTestAnswered: boolean;
  selfTestCorrect: boolean | null;
}

export interface EngagementRecord {
  lessonId: string;
  timestamp: number;
  action: 'viewed' | 'flip' | 'self_test_answer' | 'navigate_related';
  metadata?: Record<string, any>;
}

export interface DayStreak {
  date: string;
  lessonsCompleted: number;
  totalLessons: number;
  allCompleted: boolean;
}

export type NotificationTime = 'morning' | 'afternoon' | 'evening' | 'night';

export interface MicroLessonPreferences {
  dailyCount: number; // 3-5
  preferredNotificationTime: NotificationTime;
  enabled: boolean;
  includeWeakAreas: boolean;
  includeTrending: boolean;
  includeReview: boolean;
}

// ─── State Interface ─────────────────────────────────────────────────────────

export interface MicroLessonState {
  // Lessons
  todayLessons: MicroLesson[];
  pastLessons: Record<string, MicroLesson[]>; // key: YYYY-MM-DD
  loading: boolean;
  error: string | null;
  lastGenerated: string | null; // ISO date

  // Engagement
  engagementLog: EngagementRecord[];
  currentCardIndex: number;

  // Streak
  currentStreak: number;
  longestStreak: number;
  dayStreaks: DayStreak[];
  lastEngagementDate: string | null;

  // Preferences
  preferences: MicroLessonPreferences;

  // Calendar
  selectedCalendarDate: string | null;
}

export interface MicroLessonActions {
  // Lessons
  setTodayLessons: (lessons: MicroLesson[]) => void;
  addPastLessons: (date: string, lessons: MicroLesson[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  generateLessons: () => Promise<void>;

  // Lesson interaction
  markLessonCompleted: (lessonId: string) => void;
  answerSelfTest: (lessonId: string, correct: boolean) => void;
  setCurrentCardIndex: (index: number) => void;

  // Engagement tracking
  logEngagement: (record: EngagementRecord) => void;
  submitEngagementBatch: () => Promise<void>;

  // Streak management
  calculateStreak: () => void;
  updateStreakForToday: () => void;

  // Preferences
  updatePreferences: (prefs: Partial<MicroLessonPreferences>) => void;

  // Calendar
  setSelectedCalendarDate: (date: string | null) => void;

  // Utilities
  getLessonsForDate: (date: string) => MicroLesson[];
  getTodayCompletionRate: () => number;
  getWeeklyEngagement: () => { day: string; completed: number; total: number }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function calculateStreakFromDays(dayStreaks: DayStreak[]): number {
  if (dayStreaks.length === 0) return 0;
  const sorted = [...dayStreaks].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  const today = todayISO();

  for (let i = 0; i < sorted.length; i++) {
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    const expectedStr = expectedDate.toISOString().split('T')[0];

    if (sorted[i].date === expectedStr && sorted[i].allCompleted) {
      streak++;
    } else if (sorted[i].date === expectedStr && !sorted[i].allCompleted) {
      break;
    } else {
      break;
    }
  }
  return streak;
}

// ─── Initial State ───────────────────────────────────────────────────────────

const initialState: MicroLessonState = {
  todayLessons: [],
  pastLessons: {},
  loading: false,
  error: null,
  lastGenerated: null,
  engagementLog: [],
  currentCardIndex: 0,
  currentStreak: 0,
  longestStreak: 0,
  dayStreaks: [],
  lastEngagementDate: null,
  preferences: {
    dailyCount: 4,
    preferredNotificationTime: 'morning',
    enabled: true,
    includeWeakAreas: true,
    includeTrending: true,
    includeReview: true,
  },
  selectedCalendarDate: null,
};

// ─── Store ───────────────────────────────────────────────────────────────────

export const useMicroLessonStore = create<MicroLessonState & MicroLessonActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTodayLessons: (lessons) => {
        const today = todayISO();
        set({
          todayLessons: lessons,
          lastGenerated: today,
          dayStreaks: [
            ...get().dayStreaks.filter(d => d.date !== today),
            {
              date: today,
              lessonsCompleted: lessons.filter(l => l.completed).length,
              totalLessons: lessons.length,
              allCompleted: lessons.every(l => l.completed),
            },
          ],
        });
      },

      addPastLessons: (date, lessons) => {
        const pastLessons = { ...get().pastLessons, [date]: lessons };
        set({ pastLessons });
      },

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      generateLessons: async () => {
        const state = get();
        const today = todayISO();
        if (state.lastGenerated === today && state.todayLessons.length > 0) return;

        set({ loading: true, error: null });
        try {
          const res = await fetch('/api/micro-lessons/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              count: state.preferences.dailyCount,
              includeWeakAreas: state.preferences.includeWeakAreas,
              includeTrending: state.preferences.includeTrending,
              includeReview: state.preferences.includeReview,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const lessons: MicroLesson[] = (data.lessons || []).map((l: any, i: number) => ({
              id: l.id || `ml-${today}-${i}`,
              fact: l.fact || '',
              clinicalRelevance: l.clinicalRelevance || '',
              selfTest: l.selfTest || { question: '', options: [], answer: '' },
              relatedContent: l.relatedContent || { title: '', type: 'topic' as const, system: '', topic: '' },
              date: today,
              system: l.system || 'General',
              topic: l.topic || 'General',
              difficulty: l.difficulty || 3,
              completed: false,
              selfTestAnswered: false,
              selfTestCorrect: null,
            }));
            get().setTodayLessons(lessons);
          } else {
            set({ error: 'Failed to generate micro-lessons' });
          }
        } catch {
          set({ error: 'Network error — could not generate micro-lessons' });
        } finally {
          set({ loading: false });
        }
      },

      markLessonCompleted: (lessonId) => {
        const state = get();
        const today = todayISO();
        const updated = state.todayLessons.map(l =>
          l.id === lessonId ? { ...l, completed: true } : l
        );
        const allCompleted = updated.every(l => l.completed);

        set({
          todayLessons: updated,
          dayStreaks: [
            ...state.dayStreaks.filter(d => d.date !== today),
            {
              date: today,
              lessonsCompleted: updated.filter(l => l.completed).length,
              totalLessons: updated.length,
              allCompleted,
            },
          ],
        });

        get().calculateStreak();
      },

      answerSelfTest: (lessonId, correct) => {
        const state = get();
        const updated = state.todayLessons.map(l =>
          l.id === lessonId ? { ...l, selfTestAnswered: true, selfTestCorrect: correct, completed: true } : l
        );
        set({ todayLessons: updated });

        // Auto-mark as completed when self-test is answered
        get().markLessonCompleted(lessonId);
      },

      setCurrentCardIndex: (index) => set({ currentCardIndex: index }),

      logEngagement: (record) => {
        set({ engagementLog: [...get().engagementLog, record], lastEngagementDate: todayISO() });
      },

      submitEngagementBatch: async () => {
        const state = get();
        if (state.engagementLog.length === 0) return;

        const batch = [...state.engagementLog];
        set({ engagementLog: [] }); // Clear after taking

        try {
          await fetch('/api/micro-lessons/engage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ events: batch }),
          });
        } catch {
          // Silent fail — engagement tracking is best-effort
          set({ engagementLog: [...get().engagementLog, ...batch] });
        }
      },

      calculateStreak: () => {
        const state = get();
        const streak = calculateStreakFromDays(state.dayStreaks);
        const longest = Math.max(streak, state.longestStreak, ...state.dayStreaks.filter(d => d.allCompleted).length > 0 ? [streak] : [0]);
        set({ currentStreak: streak, longestStreak: longest });
      },

      updateStreakForToday: () => {
        const state = get();
        const today = todayISO();
        const todayLessons = state.todayLessons;
        const completedCount = todayLessons.filter(l => l.completed).length;
        const allCompleted = todayLessons.length > 0 && todayLessons.every(l => l.completed);

        const existing = state.dayStreaks.find(d => d.date === today);
        if (!existing || existing.lessonsCompleted !== completedCount) {
          set({
            dayStreaks: [
              ...state.dayStreaks.filter(d => d.date !== today),
              { date: today, lessonsCompleted: completedCount, totalLessons: todayLessons.length, allCompleted },
            ],
          });
          get().calculateStreak();
        }
      },

      updatePreferences: (prefs) => {
        set({ preferences: { ...get().preferences, ...prefs } });
      },

      setSelectedCalendarDate: (date) => set({ selectedCalendarDate: date }),

      getLessonsForDate: (date) => {
        const state = get();
        if (date === todayISO()) return state.todayLessons;
        return state.pastLessons[date] || [];
      },

      getTodayCompletionRate: () => {
        const state = get();
        if (state.todayLessons.length === 0) return 0;
        return state.todayLessons.filter(l => l.completed).length / state.todayLessons.length;
      },

      getWeeklyEngagement: () => {
        const state = get();
        const result: { day: string; completed: number; total: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
          const ds = state.dayStreaks.find(s => s.date === dateStr);
          result.push({
            day: dayName,
            completed: ds?.lessonsCompleted ?? 0,
            total: ds?.totalLessons ?? 0,
          });
        }
        return result;
      },
    }),
    {
      name: 'medq-micro-lessons-store',
      partialize: (state) => ({
        todayLessons: state.todayLessons,
        pastLessons: state.pastLessons,
        lastGenerated: state.lastGenerated,
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        dayStreaks: state.dayStreaks,
        lastEngagementDate: state.lastEngagementDate,
        preferences: state.preferences,
      }),
    }
  )
);
