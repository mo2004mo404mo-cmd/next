'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Clock,
  Calendar,
  Target,
  CheckCircle,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Flame,
  Zap,
  ChevronDown,
  ChevronUp,
  Edit3,
  X,
  BookOpen,
  Brain,
  GraduationCap,
  Stethoscope,
  Activity,
  BarChart3,
  TrendingUp,
  Timer,
  Star,
  Sparkles,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface ExamConfig {
  id: string;
  name: string;
  examType: ExamType;
  examDate: string; // ISO date string
  targetHoursPerDay: number;
  createdAt: string;
}

type ExamType = 'USMLE' | 'PLAB' | 'MCAT' | 'NEET_PG' | 'FMGE' | 'MRCP' | 'custom';

interface StudyDay {
  date: string; // YYYY-MM-DD
  plannedHours: number;
  actualHours: number;
  subjects: string[];
  completed: boolean;
  checklist: ChecklistItem[];
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface WeeklyMilestone {
  weekNumber: number;
  startDate: string;
  endDate: string;
  target: string;
  completed: boolean;
}

interface StudySession {
  id: string;
  examId: string;
  startTime: number;
  elapsedSeconds: number;
  isRunning: boolean;
}

interface ExamState {
  exams: ExamConfig[];
  studyDays: Record<string, StudyDay[]>; // examId -> studyDays
  weeklyMilestones: Record<string, WeeklyMilestone[]>; // examId -> milestones
  streaks: Record<string, number>; // examId -> streak count
  lastStudyDate: Record<string, string>; // examId -> date
}

// ── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'medq-exam-countdown';
const MAX_EXAMS = 3;

const EXAM_PRESETS: Record<ExamType, { label: string; icon: React.ReactNode; subjects: string[] }> = {
  USMLE: {
    label: 'USMLE Step 1',
    icon: <Stethoscope className="w-4 h-4" />,
    subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Microbiology', 'Immunology', 'Behavioral Science', 'Genetics'],
  },
  PLAB: {
    label: 'PLAB 1',
    icon: <GraduationCap className="w-4 h-4" />,
    subjects: ['Medicine', 'Surgery', 'Paediatrics', 'Obstetrics & Gynaecology', 'Psychiatry', 'General Practice', 'Emergency Medicine'],
  },
  MCAT: {
    label: 'MCAT',
    icon: <Brain className="w-4 h-4" />,
    subjects: ['Biology', 'General Chemistry', 'Organic Chemistry', 'Physics', 'Psychology', 'Sociology', 'Critical Analysis'],
  },
  NEET_PG: {
    label: 'NEET PG',
    icon: <Activity className="w-4 h-4" />,
    subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'Microbiology', 'Forensic Medicine', 'PSM', 'Medicine', 'Surgery', 'OBG', 'Paediatrics', 'Ophthalmology', 'ENT', 'Dermatology', 'Psychiatry', 'Radiology', 'Anaesthesia'],
  },
  FMGE: {
    label: 'FMGE',
    icon: <BookOpen className="w-4 h-4" />,
    subjects: ['Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Microbiology', 'Medicine', 'Surgery', 'OBG', 'Paediatrics', 'Ophthalmology', 'ENT', 'PSM'],
  },
  MRCP: {
    label: 'MRCP',
    icon: <Stethoscope className="w-4 h-4" />,
    subjects: ['Cardiology', 'Respiratory', 'Gastroenterology', 'Neurology', 'Endocrinology', 'Nephrology', 'Haematology', 'Rheumatology', 'Infectious Disease', 'Oncology'],
  },
  custom: {
    label: 'Custom Exam',
    icon: <Target className="w-4 h-4" />,
    subjects: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'],
  },
};

const MOTIVATIONAL_QUOTES = [
  "The expert in anything was once a beginner. — Helen Hayes",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  "Medicine is a science of uncertainty and an art of probability. — William Osler",
  "The good physician treats the disease; the great physician treats the patient. — William Osler",
  "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible. — Richard Feynman",
  "It does not matter how slowly you go as long as you do not stop. — Confucius",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
  "Education is the most powerful weapon which you can use to change the world. — Nelson Mandela",
  "Hardships often prepare ordinary people for an extraordinary destiny. — C.S. Lewis",
  "A little knowledge that acts is worth infinitely more than much knowledge that is idle. — Khalil Gibran",
  "The beautiful thing about learning is that nobody can take it away from you. — B.B. King",
  "Wherever the art of medicine is loved, there is also a love of humanity. — Hippocrates",
  "He who studies medicine without books sails an uncharted sea. — William Osler",
];

// ── Helper Functions ─────────────────────────────────────────────────────────

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getCountdown(dateStr: string): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date().getTime();
  const target = new Date(dateStr).getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function getUrgencyColor(daysLeft: number): string {
  if (daysLeft > 30) return '#00e5a0';
  if (daysLeft > 14) return '#f59e0b';
  if (daysLeft > 7) return '#ff8c00';
  return '#ff5757';
}

function getUrgencyLabel(daysLeft: number): string {
  if (daysLeft > 30) return 'On Track';
  if (daysLeft > 14) return 'Heads Up';
  if (daysLeft > 7) return 'Getting Close';
  if (daysLeft > 0) return 'Crunch Time!';
  return 'Exam Day!';
}

function getDailyQuote(): string {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTimer(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function generateStudyDays(exam: ExamConfig, subjects: string[]): StudyDay[] {
  const daysLeft = getDaysUntil(exam.examDate);
  const today = new Date();
  const days: StudyDay[] = [];

  for (let i = 0; i < daysLeft; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    // Distribute subjects cyclically
    const subjectIndex = i % subjects.length;
    const subjectsForDay = [subjects[subjectIndex]];
    if (subjects.length > 1) {
      subjectsForDay.push(subjects[(subjectIndex + Math.floor(subjects.length / 2)) % subjects.length]);
    }

    // Vary hours slightly: less on weekends, more midweek
    const dayOfWeek = date.getDay();
    const hourModifier = dayOfWeek === 0 ? 0.6 : dayOfWeek === 6 ? 0.75 : 1;
    const plannedHours = Math.round(exam.targetHoursPerDay * hourModifier * 10) / 10;

    days.push({
      date: dateStr,
      plannedHours,
      actualHours: 0,
      subjects: subjectsForDay,
      completed: false,
      checklist: subjectsForDay.map((s, idx) => ({
        id: `${dateStr}-${idx}`,
        text: `Review ${s}`,
        completed: false,
      })),
    });
  }
  return days;
}

function generateWeeklyMilestones(exam: ExamConfig, subjects: string[]): WeeklyMilestone[] {
  const daysLeft = getDaysUntil(exam.examDate);
  const weeksLeft = Math.ceil(daysLeft / 7);
  const today = new Date();
  const milestones: WeeklyMilestone[] = [];

  for (let w = 0; w < weeksLeft; w++) {
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + w * 7);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const subjectsForWeek = subjects.slice(
      (w * 2) % subjects.length,
      Math.min(((w * 2) % subjects.length) + 3, subjects.length)
    );
    const targetSubject = subjectsForWeek.length > 0 ? subjectsForWeek[0] : 'Review';

    milestones.push({
      weekNumber: w + 1,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      target: `Master ${targetSubject} ${subjectsForWeek.length > 1 ? '+ ' + (subjectsForWeek.length - 1) + ' more' : ''}`,
      completed: false,
    });
  }
  return milestones;
}

function loadState(): ExamState {
  if (typeof window === 'undefined') {
    return { exams: [], studyDays: {}, weeklyMilestones: {}, streaks: {}, lastStudyDate: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ExamState;
    }
  } catch {
    // ignore parse errors
  }
  return { exams: [], studyDays: {}, weeklyMilestones: {}, streaks: {}, lastStudyDate: {} };
}

function saveState(state: ExamState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

// ── Sub-Components ───────────────────────────────────────────────────────────

function FlipCard({ value, label, color }: { value: number; label: string; color: string }) {
  const displayValue = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative w-16 sm:w-20 md:w-24 h-18 sm:h-22 md:h-26 rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${color}22`,
          boxShadow: `0 0 20px ${color}08, inset 0 1px 0 rgba(255,255,255,0.06)`,
          minHeight: '72px',
        }}
      >
        {/* Center line */}
        <div
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        />
        <span
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-wider"
          style={{ color }}
        >
          {displayValue}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-medium text-[#5a6478] uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function ExamSetupForm({
  onSubmit,
  onCancel,
  initialExam,
}: {
  onSubmit: (exam: Omit<ExamConfig, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialExam?: ExamConfig;
}) {
  const [name, setName] = useState(initialExam?.name ?? '');
  const [examType, setExamType] = useState<ExamType>(initialExam?.examType ?? 'USMLE');
  const [examDate, setExamDate] = useState(initialExam?.examDate ?? '');
  const [targetHours, setTargetHours] = useState(initialExam?.targetHoursPerDay ?? 6);

  const handleSubmit = () => {
    if (!name.trim() || !examDate) return;
    onSubmit({
      name: name.trim(),
      examType,
      examDate,
      targetHoursPerDay: targetHours,
    });
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6 space-y-5"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-2">
        <Plus className="w-5 h-5 text-[#00e5a0]" />
        <h3 className="text-sm font-bold text-[#e8ecf4]">
          {initialExam ? 'Edit Exam' : 'Add New Exam'}
        </h3>
      </div>

      {/* Exam Type Selector */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-[#8b95a8]">Exam Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(EXAM_PRESETS) as ExamType[]).map((type) => {
            const preset = EXAM_PRESETS[type];
            const isActive = examType === type;
            return (
              <button
                key={type}
                onClick={() => {
                  setExamType(type);
                  if (type !== 'custom' && !initialExam) {
                    setName(preset.label);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: isActive ? 'rgba(0,229,160,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  color: isActive ? '#00e5a0' : '#8b95a8',
                }}
              >
                {preset.icon}
                <span className="truncate">{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exam Name */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-[#8b95a8]">Exam Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., USMLE Step 1"
          className="w-full px-4 py-2.5 rounded-xl text-sm text-[#e8ecf4] placeholder-[#3a4055] outline-none transition-all focus:ring-1 focus:ring-[#00e5a0]/40"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        />
      </div>

      {/* Exam Date */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-[#8b95a8]">Exam Date</label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          min={minDate}
          className="w-full px-4 py-2.5 rounded-xl text-sm text-[#e8ecf4] outline-none transition-all focus:ring-1 focus:ring-[#00e5a0]/40"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            colorScheme: 'dark',
          }}
        />
      </div>

      {/* Target Hours */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-[#8b95a8]">
          Target Study Hours/Day: <span className="text-[#00e5a0] font-bold">{targetHours}h</span>
        </label>
        <input
          type="range"
          min={1}
          max={14}
          step={0.5}
          value={targetHours}
          onChange={(e) => setTargetHours(Number(e.target.value))}
          className="w-full accent-[#00e5a0] h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #00e5a0 0%, #00e5a0 ${((targetHours - 1) / 13) * 100}%, rgba(255,255,255,0.06) ${((targetHours - 1) / 13) * 100}%, rgba(255,255,255,0.06) 100%)`,
          }}
        />
        <div className="flex justify-between text-[10px] text-[#3a4055]">
          <span>1h</span>
          <span>7h</span>
          <span>14h</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || !examDate}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: '#00e5a0',
            color: '#0c0e14',
          }}
        >
          {initialExam ? 'Save Changes' : 'Add Exam'}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#8b95a8] hover:text-[#e8ecf4] transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function StudySessionTimer({
  examId,
  onSessionComplete,
}: {
  examId: string;
  onSessionComplete: (examId: string, seconds: number) => void;
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      const startElapsed = elapsedRef.current;

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const newElapsed = startElapsed + Math.floor((now - startTimeRef.current) / 1000);
        setElapsed(newElapsed);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handlePlayPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setElapsed(0);
  }, []);

  const handleComplete = useCallback(() => {
    setIsRunning(false);
    onSessionComplete(examId, elapsed);
    setElapsed(0);
  }, [examId, elapsed, onSessionComplete]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);

  return (
    <div
      className="rounded-xl border p-4 space-y-3"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center gap-2">
        <Timer className="w-4 h-4 text-[#4fc3f7]" />
        <span className="text-xs font-semibold text-[#e8ecf4]">Study Session</span>
      </div>

      <div className="text-center">
        <span
          className="text-3xl sm:text-4xl font-bold font-mono tracking-wider"
          style={{ color: isRunning ? '#4fc3f7' : '#e8ecf4' }}
        >
          {formatTimer(elapsed)}
        </span>
        {elapsed > 0 && (
          <p className="text-[10px] text-[#5a6478] mt-1">
            {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`} recorded
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handlePlayPause}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all active:scale-95"
          style={{
            background: isRunning ? 'rgba(79,195,247,0.15)' : 'rgba(0,229,160,0.15)',
            color: isRunning ? '#4fc3f7' : '#00e5a0',
          }}
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] transition-all active:scale-95"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        {elapsed > 0 && (
          <button
            onClick={handleComplete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
            style={{
              background: 'rgba(0,229,160,0.15)',
              color: '#00e5a0',
            }}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Log
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function ExamCountdownTab() {
  // ── State ────────────────────────────────────────────────────────────────
  const [state, setState] = useState<ExamState>(() => loadState());
  const [activeExamId, setActiveExamId] = useState<string | null>(
    () => {
      const loaded = loadState();
      return loaded.exams.length > 0 ? loaded.exams[0].id : null;
    }
  );
  const [showSetup, setShowSetup] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamConfig | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showSchedule, setShowSchedule] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Save to localStorage (debounced) ────────────────────────────────────
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveState(state);
    }, 300);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state]);

  // ── Countdown tick ──────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const activeExam = state.exams.find((e) => e.id === activeExamId);
      if (activeExam) {
        setCountdown(getCountdown(activeExam.examDate));
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [state.exams, activeExamId]);

  // ── Derived data ────────────────────────────────────────────────────────
  const activeExam = useMemo(
    () => state.exams.find((e) => e.id === activeExamId) ?? null,
    [state.exams, activeExamId]
  );

  const daysLeft = useMemo(
    () => (activeExam ? getDaysUntil(activeExam.examDate) : 0),
    [activeExam]
  );

  const urgencyColor = useMemo(() => getUrgencyColor(daysLeft), [daysLeft]);
  const urgencyLabel = useMemo(() => getUrgencyLabel(daysLeft), [daysLeft]);
  const dailyQuote = useMemo(() => getDailyQuote(), []);

  const studyDaysForExam = useMemo(
    () => (activeExam ? state.studyDays[activeExam.id] ?? [] : []),
    [state.studyDays, activeExam]
  );

  const milestonesForExam = useMemo(
    () => (activeExam ? state.weeklyMilestones[activeExam.id] ?? [] : []),
    [state.weeklyMilestones, activeExam]
  );

  const streak = useMemo(
    () => (activeExam ? state.streaks[activeExam.id] ?? 0 : 0),
    [state.streaks, activeExam]
  );

  const todayPlan = useMemo(() => {
    if (!activeExam) return null;
    const today = getTodayStr();
    return studyDaysForExam.find((d) => d.date === today) ?? null;
  }, [activeExam, studyDaysForExam]);

  // Study progress calculations
  const progressData = useMemo(() => {
    if (!activeExam || studyDaysForExam.length === 0) {
      return { totalPlanned: 0, totalActual: 0, percentComplete: 0, daysStudied: 0, avgHoursPerDay: 0 };
    }

    const totalPlanned = studyDaysForExam.reduce((sum, d) => sum + d.plannedHours, 0);
    const totalActual = studyDaysForExam.reduce((sum, d) => sum + d.actualHours, 0);
    const daysStudied = studyDaysForExam.filter((d) => d.actualHours > 0).length;
    const percentComplete = totalPlanned > 0 ? Math.min(100, Math.round((totalActual / totalPlanned) * 100)) : 0;
    const avgHoursPerDay = daysStudied > 0 ? Math.round((totalActual / daysStudied) * 10) / 10 : 0;

    return { totalPlanned, totalActual, percentComplete, daysStudied, avgHoursPerDay };
  }, [activeExam, studyDaysForExam]);

  // Weekly summary data
  const weeklySummaryData = useMemo(() => {
    if (!activeExam || studyDaysForExam.length === 0) return null;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    const startStr = startOfWeek.toISOString().split('T')[0];

    const thisWeekDays = studyDaysForExam.filter((d) => d.date >= startStr && d.date <= getTodayStr());
    const plannedThisWeek = thisWeekDays.reduce((s, d) => s + d.plannedHours, 0);
    const actualThisWeek = thisWeekDays.reduce((s, d) => s + d.actualHours, 0);
    const completedDaysThisWeek = thisWeekDays.filter((d) => d.actualHours > 0).length;

    return {
      plannedThisWeek: Math.round(plannedThisWeek * 10) / 10,
      actualThisWeek: Math.round(actualThisWeek * 10) / 10,
      completedDaysThisWeek,
      totalDaysThisWeek: thisWeekDays.length,
      weeklyProgress: plannedThisWeek > 0 ? Math.min(100, Math.round((actualThisWeek / plannedThisWeek) * 100)) : 0,
    };
  }, [activeExam, studyDaysForExam]);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleAddExam = useCallback(
    (data: Omit<ExamConfig, 'id' | 'createdAt'>) => {
      const newExam: ExamConfig = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };

      const subjects = EXAM_PRESETS[data.examType].subjects;
      const studyDays = generateStudyDays(newExam, subjects);
      const milestones = generateWeeklyMilestones(newExam, subjects);

      setState((prev) => ({
        ...prev,
        exams: [...prev.exams, newExam],
        studyDays: { ...prev.studyDays, [newExam.id]: studyDays },
        weeklyMilestones: { ...prev.weeklyMilestones, [newExam.id]: milestones },
        streaks: { ...prev.streaks, [newExam.id]: 0 },
        lastStudyDate: { ...prev.lastStudyDate, [newExam.id]: '' },
      }));

      setActiveExamId(newExam.id);
      setShowSetup(false);
    },
    []
  );

  const handleEditExam = useCallback(
    (data: Omit<ExamConfig, 'id' | 'createdAt'>) => {
      if (!editingExam) return;

      const updatedExam: ExamConfig = {
        ...editingExam,
        ...data,
      };

      const subjects = EXAM_PRESETS[data.examType].subjects;
      const studyDays = generateStudyDays(updatedExam, subjects);
      const milestones = generateWeeklyMilestones(updatedExam, subjects);

      setState((prev) => ({
        ...prev,
        exams: prev.exams.map((e) => (e.id === editingExam.id ? updatedExam : e)),
        studyDays: { ...prev.studyDays, [editingExam.id]: studyDays },
        weeklyMilestones: { ...prev.weeklyMilestones, [editingExam.id]: milestones },
      }));

      setEditingExam(null);
    },
    [editingExam]
  );

  const handleDeleteExam = useCallback(
    (examId: string) => {
      setState((prev) => {
        const newStudyDays = { ...prev.studyDays };
        const newMilestones = { ...prev.weeklyMilestones };
        const newStreaks = { ...prev.streaks };
        const newLastStudy = { ...prev.lastStudyDate };
        delete newStudyDays[examId];
        delete newMilestones[examId];
        delete newStreaks[examId];
        delete newLastStudy[examId];
        return {
          ...prev,
          exams: prev.exams.filter((e) => e.id !== examId),
          studyDays: newStudyDays,
          weeklyMilestones: newMilestones,
          streaks: newStreaks,
          lastStudyDate: newLastStudy,
        };
      });

      if (activeExamId === examId) {
        const remaining = state.exams.filter((e) => e.id !== examId);
        setActiveExamId(remaining.length > 0 ? remaining[0].id : null);
      }
    },
    [activeExamId, state.exams]
  );

  const handleToggleChecklist = useCallback(
    (examId: string, dayDate: string, itemId: string) => {
      setState((prev) => {
        const days = prev.studyDays[examId] ?? [];
        const updatedDays = days.map((d) => {
          if (d.date !== dayDate) return d;
          const updatedChecklist = d.checklist.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );
          const allComplete = updatedChecklist.every((item) => item.completed);
          return { ...d, checklist: updatedChecklist, completed: allComplete };
        });
        return {
          ...prev,
          studyDays: { ...prev.studyDays, [examId]: updatedDays },
        };
      });
    },
    []
  );

  const handleToggleMilestone = useCallback(
    (examId: string, weekNumber: number) => {
      setState((prev) => {
        const milestones = prev.weeklyMilestones[examId] ?? [];
        const updatedMilestones = milestones.map((m) =>
          m.weekNumber === weekNumber ? { ...m, completed: !m.completed } : m
        );
        return {
          ...prev,
          weeklyMilestones: { ...prev.weeklyMilestones, [examId]: updatedMilestones },
        };
      });
    },
    []
  );

  const handleSessionComplete = useCallback(
    (examId: string, seconds: number) => {
      const hoursLogged = Math.round((seconds / 3600) * 10) / 10;
      const today = getTodayStr();

      setState((prev) => {
        const days = prev.studyDays[examId] ?? [];
        const updatedDays = days.map((d) =>
          d.date === today ? { ...d, actualHours: Math.round((d.actualHours + hoursLogged) * 10) / 10 } : d
        );

        // Update streak
        const lastDate = prev.lastStudyDate[examId] ?? '';
        let currentStreak = prev.streaks[examId] ?? 0;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          currentStreak += 1;
        } else if (lastDate !== today) {
          currentStreak = 1;
        }

        return {
          ...prev,
          studyDays: { ...prev.studyDays, [examId]: updatedDays },
          streaks: { ...prev.streaks, [examId]: currentStreak },
          lastStudyDate: { ...prev.lastStudyDate, [examId]: today },
        };
      });
    },
    []
  );

  const handleRegenerateSchedule = useCallback(() => {
    if (!activeExam) return;
    const subjects = EXAM_PRESETS[activeExam.examType].subjects;
    const studyDays = generateStudyDays(activeExam, subjects);
    const milestones = generateWeeklyMilestones(activeExam, subjects);

    setState((prev) => ({
      ...prev,
      studyDays: { ...prev.studyDays, [activeExam.id]: studyDays },
      weeklyMilestones: { ...prev.weeklyMilestones, [activeExam.id]: milestones },
    }));
  }, [activeExam]);

  // ── Render: No Exams ────────────────────────────────────────────────────

  if (state.exams.length === 0 && !showSetup) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div
          className="rounded-2xl border p-8 sm:p-12 text-center max-w-md w-full"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
            style={{ background: 'rgba(0,229,160,0.1)' }}
          >
            <Clock className="w-8 h-8 text-[#00e5a0]" />
          </div>
          <h2 className="text-lg font-bold text-[#e8ecf4] mb-2">Exam Countdown</h2>
          <p className="text-sm text-[#8b95a8] mb-6">
            Set up your upcoming medical exam and get a personalized study schedule with countdown timer, daily plans, and progress tracking.
          </p>
          <button
            onClick={() => setShowSetup(true)}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
            style={{ background: '#00e5a0', color: '#0c0e14' }}
          >
            <Plus className="w-4 h-4" />
            Add Your First Exam
          </button>
        </div>
      </div>
    );
  }

  // ── Render: Setup Form ──────────────────────────────────────────────────

  if (showSetup) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <ExamSetupForm
          onSubmit={handleAddExam}
          onCancel={() => setShowSetup(false)}
        />
      </div>
    );
  }

  if (editingExam) {
    return (
      <div className="max-w-xl mx-auto px-4 py-6">
        <ExamSetupForm
          onSubmit={handleEditExam}
          onCancel={() => setEditingExam(null)}
          initialExam={editingExam}
        />
      </div>
    );
  }

  // ── Render: Main View ───────────────────────────────────────────────────

  return (
    <div className="space-y-4 pb-6">
      {/* ── Exam Tabs ── */}
      {state.exams.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {state.exams.map((exam) => {
            const days = getDaysUntil(exam.examDate);
            const color = getUrgencyColor(days);
            const isActive = exam.id === activeExamId;
            return (
              <button
                key={exam.id}
                onClick={() => setActiveExamId(exam.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: isActive ? `${color}15` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? `${color}33` : 'rgba(255,255,255,0.06)'}`,
                  color: isActive ? color : '#8b95a8',
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                {exam.name}
                <span
                  className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                  style={{ background: `${color}20`, color }}
                >
                  {days}d
                </span>
              </button>
            );
          })}
        </div>
      )}

      {activeExam && (
        <>
          {/* ── Countdown Header ── */}
          <div
            className="rounded-2xl border p-5 sm:p-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.06)',
            }}
          >
            {/* Top row: exam info + actions */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${urgencyColor}15` }}
                >
                  {EXAM_PRESETS[activeExam.examType].icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-[#e8ecf4] truncate">
                    {activeExam.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Calendar className="w-3 h-3 text-[#5a6478]" />
                    <span className="text-xs text-[#8b95a8]">{formatDate(activeExam.examDate)}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${urgencyColor}18`, color: urgencyColor }}
                    >
                      {urgencyLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setEditingExam(activeExam)}
                  className="p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all"
                  aria-label="Edit exam"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteExam(activeExam.id)}
                  className="p-2 rounded-lg text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-all"
                  aria-label="Delete exam"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Countdown flip cards */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-5">
              <FlipCard value={countdown.days} label="Days" color={urgencyColor} />
              <span className="text-2xl font-bold text-[#3a4055] mt-[-20px]">:</span>
              <FlipCard value={countdown.hours} label="Hours" color={urgencyColor} />
              <span className="text-2xl font-bold text-[#3a4055] mt-[-20px]">:</span>
              <FlipCard value={countdown.minutes} label="Mins" color={urgencyColor} />
              <span className="text-2xl font-bold text-[#3a4055] mt-[-20px]">:</span>
              <FlipCard value={countdown.seconds} label="Secs" color={urgencyColor} />
            </div>

            {/* Progress bar */}
            {daysLeft > 0 && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#5a6478]">Study progress</span>
                  <span style={{ color: urgencyColor }} className="font-semibold">
                    {progressData.percentComplete}%
                  </span>
                </div>
                <div
                  className="w-full h-2.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressData.percentComplete}%`,
                      background: `linear-gradient(90deg, ${urgencyColor}, ${urgencyColor}88)`,
                      boxShadow: `0 0 10px ${urgencyColor}40`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#5a6478]">
                  <span>{progressData.totalActual}h studied</span>
                  <span>{progressData.totalPlanned}h planned</span>
                </div>
              </div>
            )}

            {/* Motivational quote */}
            <div
              className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-3 h-3 text-[#f59e0b]" />
                <span className="text-[10px] font-semibold text-[#f59e0b] uppercase tracking-wider">Daily Motivation</span>
              </div>
              <p className="text-xs text-[#8b95a8] italic leading-relaxed">{dailyQuote}</p>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Streak */}
            <div
              className="rounded-xl border p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <Flame className="w-5 h-5 mx-auto mb-1" style={{ color: streak > 0 ? '#ff6b35' : '#3a4055' }} />
              <p className="text-lg font-bold text-[#e8ecf4]">{streak}</p>
              <p className="text-[10px] text-[#5a6478]">Day Streak</p>
            </div>

            {/* Days Studied */}
            <div
              className="rounded-xl border p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-[#4fc3f7]" />
              <p className="text-lg font-bold text-[#e8ecf4]">{progressData.daysStudied}</p>
              <p className="text-[10px] text-[#5a6478]">Days Studied</p>
            </div>

            {/* Avg Hours */}
            <div
              className="rounded-xl border p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-[#00e5a0]" />
              <p className="text-lg font-bold text-[#e8ecf4]">{progressData.avgHoursPerDay}h</p>
              <p className="text-[10px] text-[#5a6478]">Avg/Day</p>
            </div>

            {/* Milestones */}
            <div
              className="rounded-xl border p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <Trophy className="w-5 h-5 mx-auto mb-1 text-[#f59e0b]" />
              <p className="text-lg font-bold text-[#e8ecf4]">
                {milestonesForExam.filter((m) => m.completed).length}/{milestonesForExam.length}
              </p>
              <p className="text-[10px] text-[#5a6478]">Milestones</p>
            </div>
          </div>

          {/* ── Today's Plan + Study Timer ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Today's Plan */}
            <div
              className="rounded-xl border p-4 space-y-3"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#00e5a0]" />
                  <span className="text-xs font-semibold text-[#e8ecf4]">Today&apos;s Plan</span>
                </div>
                {todayPlan && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: todayPlan.completed ? 'rgba(0,229,160,0.15)' : 'rgba(255,255,255,0.06)',
                      color: todayPlan.completed ? '#00e5a0' : '#8b95a8',
                    }}
                  >
                    {todayPlan.completed ? 'Done!' : `${todayPlan.plannedHours}h planned`}
                  </span>
                )}
              </div>

              {todayPlan ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {todayPlan.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="text-[10px] px-2 py-1 rounded-lg font-medium"
                        style={{ background: 'rgba(79,195,247,0.1)', color: '#4fc3f7' }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  {todayPlan.checklist.length > 0 ? (
                    <div className="space-y-1.5">
                      {todayPlan.checklist.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleToggleChecklist(activeExam.id, todayPlan.date, item.id)}
                          className="flex items-center gap-2 w-full text-left group"
                        >
                          <div
                            className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                            style={{
                              background: item.completed ? '#00e5a0' : 'rgba(255,255,255,0.06)',
                              border: item.completed ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            {item.completed && <CheckCircle className="w-3 h-3 text-[#0c0e14]" />}
                          </div>
                          <span
                            className={`text-xs transition-all ${item.completed ? 'text-[#5a6478] line-through' : 'text-[#8b95a8] group-hover:text-[#e8ecf4]'}`}
                          >
                            {item.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#5a6478]">No tasks for today. Enjoy your rest!</p>
                  )}
                  {todayPlan.actualHours > 0 && (
                    <p className="text-[10px] text-[#00e5a0]">
                      <Zap className="w-3 h-3 inline mr-1" />
                      {todayPlan.actualHours}h logged today
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-[#5a6478]">No study plan for today. The exam may have passed or not started yet.</p>
              )}
            </div>

            {/* Study Session Timer */}
            <StudySessionTimer examId={activeExam.id} onSessionComplete={handleSessionComplete} />
          </div>

          {/* ── Study Schedule ── */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
              <button
                type="button"
                onClick={() => setShowSchedule(!showSchedule)}
                aria-expanded={showSchedule}
                aria-controls="exam-study-schedule"
                className="flex flex-1 items-center justify-between text-left"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#4fc3f7]" />
                  <span className="text-xs font-semibold text-[#e8ecf4]">Study Schedule</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#5a6478]">
                    {studyDaysForExam.length} days
                  </span>
                </span>
                {showSchedule ? (
                  <ChevronUp className="w-4 h-4 text-[#5a6478]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#5a6478]" />
                )}
              </button>
              <div className="flex items-center gap-2 ml-2">
                <button
                  type="button"
                  onClick={handleRegenerateSchedule}
                  className="p-1.5 rounded-lg text-[#5a6478] hover:text-[#4fc3f7] hover:bg-white/[0.06] transition-all"
                  aria-label="Regenerate schedule"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {showSchedule && (
              <div id="exam-study-schedule" className="px-4 pb-4 max-h-96 overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  {studyDaysForExam.slice(0, 30).map((day) => {
                    const isToday = day.date === getTodayStr();
                    const isPast = day.date < getTodayStr();
                    return (
                      <div
                        key={day.date}
                        className="flex items-center gap-3 p-2.5 rounded-lg transition-all"
                        style={{
                          background: isToday ? 'rgba(0,229,160,0.06)' : isPast && day.completed ? 'rgba(255,255,255,0.02)' : 'transparent',
                          borderLeft: isToday ? '2px solid #00e5a0' : '2px solid transparent',
                        }}
                      >
                        <div className="w-16 text-[10px] text-[#5a6478] flex-shrink-0">
                          {isToday ? (
                            <span className="text-[#00e5a0] font-semibold">Today</span>
                          ) : (
                            new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-1">
                            {day.subjects.map((s) => (
                              <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#8b95a8]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-[10px] text-[#5a6478]">
                              {day.actualHours > 0 ? (
                                <span className="text-[#00e5a0]">{day.actualHours}h</span>
                              ) : (
                                `${day.plannedHours}h`
                              )}
                            </p>
                          </div>
                          {day.completed && <CheckCircle className="w-3.5 h-3.5 text-[#00e5a0] flex-shrink-0" />}
                        </div>
                      </div>
                    );
                  })}
                  {studyDaysForExam.length > 30 && (
                    <p className="text-[10px] text-[#5a6478] text-center py-2">
                      Showing next 30 days of {studyDaysForExam.length} total
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Weekly Milestones ── */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <button
              onClick={() => setShowMilestones(!showMilestones)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-xs font-semibold text-[#e8ecf4]">Weekly Milestones</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#5a6478]">
                  {milestonesForExam.filter((m) => m.completed).length}/{milestonesForExam.length}
                </span>
              </div>
              {showMilestones ? (
                <ChevronUp className="w-4 h-4 text-[#5a6478]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#5a6478]" />
              )}
            </button>

            {showMilestones && (
              <div className="px-4 pb-4 max-h-72 overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  {milestonesForExam.map((milestone) => (
                    <button
                      key={milestone.weekNumber}
                      onClick={() => handleToggleMilestone(activeExam.id, milestone.weekNumber)}
                      className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-white/[0.02] transition-all text-left"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                        style={{
                          background: milestone.completed ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                          color: milestone.completed ? '#f59e0b' : '#5a6478',
                        }}
                      >
                        {milestone.completed ? <Star className="w-3.5 h-3.5" /> : milestone.weekNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${milestone.completed ? 'text-[#f59e0b] line-through' : 'text-[#e8ecf4]'}`}>
                          Week {milestone.weekNumber}: {milestone.target}
                        </p>
                        <p className="text-[10px] text-[#5a6478]">
                          {new Date(milestone.startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {' — '}
                          {new Date(milestone.endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      {milestone.completed && <CheckCircle className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Weekly Summary ── */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <button
              onClick={() => setShowWeeklySummary(!showWeeklySummary)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#b388ff]" />
                <span className="text-xs font-semibold text-[#e8ecf4]">Weekly Summary</span>
              </div>
              {showWeeklySummary ? (
                <ChevronUp className="w-4 h-4 text-[#5a6478]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#5a6478]" />
              )}
            </button>

            {showWeeklySummary && weeklySummaryData && (
              <div className="px-4 pb-4 space-y-3">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className="text-[#8b95a8]">This week&apos;s progress</span>
                    <span className="text-[#b388ff] font-semibold">{weeklySummaryData.weeklyProgress}%</span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${weeklySummaryData.weeklyProgress}%`,
                        background: weeklySummaryData.weeklyProgress >= 80 ? '#00e5a0' : weeklySummaryData.weeklyProgress >= 50 ? '#f59e0b' : '#ff5757',
                      }}
                    />
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="rounded-lg p-2.5 text-center"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <p className="text-sm font-bold text-[#00e5a0]">{weeklySummaryData.actualThisWeek}h</p>
                    <p className="text-[10px] text-[#5a6478]">Studied</p>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-center"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <p className="text-sm font-bold text-[#4fc3f7]">{weeklySummaryData.plannedThisWeek}h</p>
                    <p className="text-[10px] text-[#5a6478]">Planned</p>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-center"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <p className="text-sm font-bold text-[#f59e0b]">{weeklySummaryData.completedDaysThisWeek}</p>
                    <p className="text-[10px] text-[#5a6478]">Days Active</p>
                  </div>
                  <div
                    className="rounded-lg p-2.5 text-center"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <p className="text-sm font-bold text-[#b388ff]">
                      {weeklySummaryData.totalDaysThisWeek > 0
                        ? Math.round((weeklySummaryData.completedDaysThisWeek / weeklySummaryData.totalDaysThisWeek) * 100)
                        : 0}%
                    </p>
                    <p className="text-[10px] text-[#5a6478]">Consistency</p>
                  </div>
                </div>

                {/* Performance note */}
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <p className="text-[10px] text-[#8b95a8]">
                    {weeklySummaryData.weeklyProgress >= 80
                      ? '🔥 Excellent progress this week! Keep up the great work!'
                      : weeklySummaryData.weeklyProgress >= 50
                        ? '💪 Good progress! Try to squeeze in a few more study sessions.'
                        : '📚 Falling behind schedule. Consider increasing your daily study time.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Subject Distribution ── */}
          <div
            className="rounded-2xl border p-4 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#4fc3f7]" />
              <span className="text-xs font-semibold text-[#e8ecf4]">Subject Distribution</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAM_PRESETS[activeExam.examType].subjects.map((subject, idx) => {
                const colors = ['#00e5a0', '#4fc3f7', '#f59e0b', '#ff5757', '#b388ff', '#ff6b35', '#8b5cf6', '#06b6d4', '#ec4899'];
                const color = colors[idx % colors.length];
                const hoursAllocated = Math.round((activeExam.targetHoursPerDay / 2) * 10) / 10;
                return (
                  <div
                    key={subject}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium"
                    style={{ background: `${color}10`, color, border: `1px solid ${color}20` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    {subject}
                    <span className="opacity-60">~{hoursAllocated}h/wk</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ── Add Exam Button ── */}
      {state.exams.length > 0 && state.exams.length < MAX_EXAMS && (
        <button
          onClick={() => setShowSetup(true)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed text-xs font-medium text-[#5a6478] hover:text-[#00e5a0] hover:border-[#00e5a0]/30 transition-all"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}
        >
          <Plus className="w-4 h-4" />
          Add Another Exam ({MAX_EXAMS - state.exams.length} slot{MAX_EXAMS - state.exams.length !== 1 ? 's' : ''} left)
        </button>
      )}

      {/* ── Custom Scrollbar Styles ── */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
