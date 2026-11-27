'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings,
  Minimize2,
  Maximize2,
  Coffee,
  Brain,
  Zap,
  Timer,
  X,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface ModeConfig {
  label: string;
  icon: React.ReactNode;
  duration: number; // seconds
  color: string;
  bgClass: string;
  ringClass: string;
}

interface PomodoroTimerProps {
  compact?: boolean; // If true, render as a small inline widget
  onClose?: () => void; // Called when user closes the widget from minimized state
}

// ── Default durations ────────────────────────────────────────────────────────

const DEFAULT_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const MODE_CONFIG: Record<TimerMode, (durations: Record<TimerMode, number>) => ModeConfig> = {
  focus: (d) => ({
    label: 'Focus',
    icon: <Brain className="w-4 h-4" />,
    duration: d.focus,
    color: '#00e5a0',
    bgClass: 'bg-[#00e5a0]/10 text-[#00e5a0]',
    ringClass: 'stroke-[#00e5a0]',
  }),
  shortBreak: (d) => ({
    label: 'Short Break',
    icon: <Coffee className="w-4 h-4" />,
    duration: d.shortBreak,
    color: '#f59e0b',
    bgClass: 'bg-[#f59e0b]/10 text-[#f59e0b]',
    ringClass: 'stroke-[#f59e0b]',
  }),
  longBreak: (d) => ({
    label: 'Long Break',
    icon: <Zap className="w-4 h-4" />,
    duration: d.longBreak,
    color: '#8b5cf6',
    bgClass: 'bg-[#8b5cf6]/10 text-[#8b5cf6]',
    ringClass: 'stroke-[#8b5cf6]',
  }),
};

// ── Web Audio Chime ──────────────────────────────────────────────────────────

function playChime() {
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);

    // Second tone for a pleasant double-chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1000, ctx.currentTime + 0.2);

    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(ctx.currentTime + 0.2);
    osc2.stop(ctx.currentTime + 0.6);

    // Cleanup
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // Web Audio not available — silently ignore
  }
}

// ── Format helpers ───────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatMinutes(seconds: number): string {
  const m = Math.round(seconds / 60);
  return `${m} min`;
}

// ── SVG Circle Constants ─────────────────────────────────────────────────────

const RING_SIZE = 200;
const RING_STROKE = 6;
const RING_RADIUS = (RING_SIZE - RING_STROKE * 2) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const RING_CENTER = RING_SIZE / 2;

// ── Component ────────────────────────────────────────────────────────────────

export default function PomodoroTimer({ compact = false, onClose }: PomodoroTimerProps) {
  // ── State ────────────────────────────────────────────────────────────────

  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [focusSession, setFocusSession] = useState(1); // 1-4
  const [minimized, setMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [durations, setDurations] = useState<Record<TimerMode, number>>({
    ...DEFAULT_DURATIONS,
  });
  const [tempDurations, setTempDurations] = useState<Record<TimerMode, number>>({
    ...DEFAULT_DURATIONS,
  });
  const [completedNotification, setCompletedNotification] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeLeftRef = useRef<number>(DEFAULT_DURATIONS.focus);

  // Keep ref in sync via effect (avoid accessing ref during render)
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const config = MODE_CONFIG[mode](durations);
  const totalDuration = durations[mode];
  const progress = 1 - timeLeft / totalDuration;
  const isLast30Seconds = timeLeft <= 30 && timeLeft > 0 && isRunning;

  // ── Determine ring color ─────────────────────────────────────────────────

  const getRingColor = useCallback(() => {
    if (isLast30Seconds) return '#ff5757';
    return config.color;
  }, [isLast30Seconds, config.color]);

  // ── Timer Tick ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      const startLeft = timeLeftRef.current;

      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newTimeLeft = Math.max(0, startLeft - elapsed);
        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
          setIsRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          playChime();
          setCompletedNotification(true);
          setTimeout(() => setCompletedNotification(false), 4000);
        }
      }, 250); // Update 4x/sec for smoother ring
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // ── Title sync (show timer in browser tab) ───────────────────────────────

  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(timeLeft)} — ${config.label} | MedQ`;
    } else {
      document.title = 'MedQ — Medical Question Generator';
    }
    return () => {
      document.title = 'MedQ — Medical Question Generator';
    };
  }, [timeLeft, isRunning, config.label]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleStartPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  }, [durations, mode]);

  const handleSkip = useCallback(() => {
    setIsRunning(false);

    if (mode === 'focus') {
      if (focusSession >= 4) {
        // After 4 focus sessions, suggest long break
        setMode('longBreak');
        setTimeLeft(durations.longBreak);
        setFocusSession(1);
      } else {
        setMode('shortBreak');
        setTimeLeft(durations.shortBreak);
        setFocusSession((prev) => prev + 1);
      }
    } else {
      // After any break, go to focus
      setMode('focus');
      setTimeLeft(durations.focus);
    }
  }, [mode, focusSession, durations]);

  const handleModeChange = useCallback(
    (newMode: TimerMode) => {
      setIsRunning(false);
      setMode(newMode);
      setTimeLeft(durations[newMode]);
    },
    [durations],
  );

  const handleSaveSettings = useCallback(() => {
    setDurations({ ...tempDurations });
    // If timer is not running, update current timeLeft
    if (!isRunning) {
      setTimeLeft(tempDurations[mode]);
    }
    setShowSettings(false);
  }, [tempDurations, isRunning, mode]);

  const openSettings = useCallback(() => {
    setTempDurations({ ...durations });
    setShowSettings(true);
  }, [durations]);

  // ── SVG Ring ─────────────────────────────────────────────────────────────

  const ringColor = getRingColor();
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);

  // ── Minimized Bar ────────────────────────────────────────────────────────

  if (minimized) {
    return (
      <div
        className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        {/* Pulsing dot when running */}
        {isRunning && (
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: config.color, boxShadow: `0 0 8px ${config.color}60` }}
          />
        )}

        <span className="text-xs font-medium text-[#5a6478]">{config.label}</span>
        <span
          className="text-lg font-bold font-mono tracking-wider"
          style={{ color: ringColor }}
        >
          {formatTime(timeLeft)}
        </span>

        {mode === 'focus' && (
          <span className="text-[10px] text-[#5a6478]">
            #{focusSession}/4
          </span>
        )}

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={handleStartPause}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? (
              <Pause className="w-3.5 h-3.5" style={{ color: config.color }} />
            ) : (
              <Play className="w-3.5 h-3.5" style={{ color: config.color }} />
            )}
          </button>
          <button
            onClick={() => setMinimized(false)}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Expand"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#5a6478]" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5 text-[#5a6478]" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Compact Inline Widget ────────────────────────────────────────────────

  if (compact) {
    return (
      <div
        className="relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        {/* Mode tabs */}
        <div className="flex items-center gap-1">
          {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => {
            const mc = MODE_CONFIG[m](durations);
            const isActive = mode === m;
            return (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${isActive ? mc.bgClass + ' border border-current/20' : 'text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.04]'}
                `}
                style={isActive ? { borderColor: mc.color + '33' } : {}}
              >
                {mc.icon}
                <span className="hidden sm:inline">{mc.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mini ring + time */}
        <div className="relative">
          <svg width={80} height={80} className="-rotate-90">
            <circle
              cx={40}
              cy={40}
              r={34}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={4}
            />
            <circle
              cx={40}
              cy={40}
              r={34}
              fill="none"
              stroke={ringColor}
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - progress)}
              className="transition-all duration-300 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-base font-bold font-mono"
              style={{ color: ringColor }}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleStartPause}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
            style={{
              background: ringColor + '18',
              color: ringColor,
            }}
            aria-label={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleSkip}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all"
            aria-label="Skip"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {mode === 'focus' && (
          <span className="text-[10px] text-[#5a6478]">
            Session {focusSession} of 4
          </span>
        )}
      </div>
    );
  }

  // ── Full Widget ──────────────────────────────────────────────────────────

  return (
    <div
      className="relative flex flex-col items-center gap-5 p-6 sm:p-8 rounded-2xl border transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.06)',
        minWidth: 300,
      }}
    >
      {/* ── Completion notification ── */}
      {completedNotification && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold z-20 pomo-animate-slide-up"
          style={{
            background: config.color + '22',
            color: config.color,
            border: `1px solid ${config.color}44`,
            boxShadow: `0 4px 20px ${config.color}22`,
          }}
        >
          {mode === 'focus' ? '🎯 Focus session complete!' : '☕ Break is over — back to focus!'}
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5" style={{ color: config.color }} />
          <h3 className="text-sm font-semibold text-[#e8ecf4]">Pomodoro Timer</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={openSettings}
            className="p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMinimized(true)}
            className="p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all"
            aria-label="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Mode Tabs ── */}
      <div className="flex items-center gap-1.5">
        {(['focus', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => {
          const mc = MODE_CONFIG[m](durations);
          const isActive = mode === m;
          return (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all
                ${isActive ? mc.bgClass : 'text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.04]'}
              `}
              style={isActive ? { boxShadow: `0 0 12px ${mc.color}15` } : {}}
            >
              {mc.icon}
              <span>{mc.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Circular Progress Ring ── */}
      <div className="relative">
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-500"
          style={{ background: ringColor }}
        />

        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          className="-rotate-90 relative z-10"
        >
          {/* Background ring */}
          <circle
            cx={RING_CENTER}
            cy={RING_CENTER}
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={RING_STROKE}
          />

          {/* Progress ring */}
          <circle
            cx={RING_CENTER}
            cy={RING_CENTER}
            r={RING_RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            className="transition-all duration-300 ease-linear"
            style={{
              filter: `drop-shadow(0 0 6px ${ringColor}66)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {/* Mode icon */}
          <div
            className="mb-1.5 transition-all duration-300"
            style={{ color: ringColor }}
          >
            {config.icon}
          </div>

          {/* Time display */}
          <span
            className="text-4xl sm:text-5xl font-bold font-mono tracking-wider transition-colors duration-300"
            style={{ color: isLast30Seconds ? '#ff5757' : '#e8ecf4' }}
          >
            {formatTime(timeLeft)}
          </span>

          {/* Session counter */}
          {mode === 'focus' && (
            <span className="text-[11px] text-[#5a6478] mt-1.5">
              Session {focusSession} of 4
            </span>
          )}
          {mode === 'shortBreak' && (
            <span className="text-[11px] text-[#5a6478] mt-1.5">
              After focus #{focusSession}
            </span>
          )}
          {mode === 'longBreak' && (
            <span className="text-[11px] text-[#5a6478] mt-1.5">
              Great work — you earned this!
            </span>
          )}
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center gap-3">
        {/* Reset */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all active:scale-95"
          aria-label="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Start/Pause */}
        <button
          onClick={handleStartPause}
          className="flex items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-95"
          style={{
            background: ringColor + '20',
            color: ringColor,
            boxShadow: `0 0 20px ${ringColor}15`,
          }}
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.04] text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.08] transition-all active:scale-95"
          aria-label="Skip to next"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* ── Session Dots ── */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((session) => (
          <div
            key={session}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background:
                session < focusSession
                  ? '#00e5a0'
                  : session === focusSession && mode === 'focus'
                    ? '#00e5a0'
                    : 'rgba(255,255,255,0.08)',
              boxShadow:
                session === focusSession && mode === 'focus'
                  ? '0 0 8px #00e5a040'
                  : 'none',
            }}
          />
        ))}
        <span className="text-[10px] text-[#5a6478] ml-1">
          {focusSession < 4
            ? `${4 - focusSession} more to long break`
            : 'Long break next!'}
        </span>
      </div>

      {/* ── Settings Popup ── */}
      {showSettings && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center rounded-2xl"
          style={{ background: 'rgba(12,14,20,0.95)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex flex-col gap-5 w-full max-w-xs px-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#e8ecf4]">Timer Settings</h4>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1.5 rounded-lg text-[#5a6478] hover:text-[#c8d0e0] hover:bg-white/[0.06] transition-all"
                aria-label="Close settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Focus duration */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#5a6478] flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-[#00e5a0]" />
                Focus Duration
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={Math.round(tempDurations.focus / 60)}
                  onChange={(e) =>
                    setTempDurations((prev) => ({
                      ...prev,
                      focus: Number(e.target.value) * 60,
                    }))
                  }
                  className="flex-1 accent-[#00e5a0] h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00e5a0 0%, #00e5a0 ${((Math.round(tempDurations.focus / 60) - 5) / 55) * 100}%, rgba(255,255,255,0.06) ${((Math.round(tempDurations.focus / 60) - 5) / 55) * 100}%, rgba(255,255,255,0.06) 100%)`,
                  }}
                />
                <span className="text-sm font-mono text-[#e8ecf4] w-14 text-right">
                  {formatMinutes(tempDurations.focus)}
                </span>
              </div>
            </div>

            {/* Short break duration */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#5a6478] flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#f59e0b]" />
                Short Break
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={Math.round(tempDurations.shortBreak / 60)}
                  onChange={(e) =>
                    setTempDurations((prev) => ({
                      ...prev,
                      shortBreak: Number(e.target.value) * 60,
                    }))
                  }
                  className="flex-1 accent-[#f59e0b] h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((Math.round(tempDurations.shortBreak / 60) - 1) / 14) * 100}%, rgba(255,255,255,0.06) ${((Math.round(tempDurations.shortBreak / 60) - 1) / 14) * 100}%, rgba(255,255,255,0.06) 100%)`,
                  }}
                />
                <span className="text-sm font-mono text-[#e8ecf4] w-14 text-right">
                  {formatMinutes(tempDurations.shortBreak)}
                </span>
              </div>
            </div>

            {/* Long break duration */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-[#5a6478] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#8b5cf6]" />
                Long Break
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={5}
                  value={Math.round(tempDurations.longBreak / 60)}
                  onChange={(e) =>
                    setTempDurations((prev) => ({
                      ...prev,
                      longBreak: Number(e.target.value) * 60,
                    }))
                  }
                  className="flex-1 accent-[#8b5cf6] h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((Math.round(tempDurations.longBreak / 60) - 5) / 25) * 100}%, rgba(255,255,255,0.06) ${((Math.round(tempDurations.longBreak / 60) - 5) / 25) * 100}%, rgba(255,255,255,0.06) 100%)`,
                  }}
                />
                <span className="text-sm font-mono text-[#e8ecf4] w-14 text-right">
                  {formatMinutes(tempDurations.longBreak)}
                </span>
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSaveSettings}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
              style={{
                background: '#00e5a0',
                color: '#0c0e14',
              }}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Animations are in globals.css */}
    </div>
  );
}
