'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export interface AppSettings {
  notifications: boolean;
  soundEffects: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  language: string;
  theme: 'dark' | 'light';
  autoPlayAudio: boolean;
  compactMode: boolean;
  showUsageMeters: boolean;
  adPersonalization: boolean;
  highYieldMode: boolean;
  pronunciationEnabled: boolean;
  pronunciationSpeed: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  notifications: true,
  soundEffects: true,
  dailyReminder: true,
  reminderTime: '08:00',
  language: 'en',
  theme: 'dark',
  autoPlayAudio: false,
  compactMode: false,
  showUsageMeters: true,
  adPersonalization: true,
  highYieldMode: false,
  pronunciationEnabled: true,
  pronunciationSpeed: 0.8,
};

export const SETTINGS_KEY = 'medq-settings';

export function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/* ── Sound Utility ── */
const audioCache = new Map<string, HTMLAudioElement>();

function getAudio(type: 'correct' | 'wrong' | 'achievement' | 'click' | 'notification'): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;

  // Use Web Audio API to generate synthetic sounds (no external files needed)
  const cacheKey = type;
  if (audioCache.has(cacheKey)) return audioCache.get(cacheKey)!;

  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    // Different sound profiles
    switch (type) {
      case 'correct': {
        // Pleasant ascending tone
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
        break;
      }
      case 'wrong': {
        // Descending buzz
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
      }
      case 'achievement': {
        // Triumphant ascending arpeggio
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        oscillator.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.6);
        break;
      }
      case 'click': {
        // Short click
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
        break;
      }
      case 'notification': {
        // Gentle chime
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
        oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.15); // C#6
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
        break;
      }
    }

    return null; // Web Audio API doesn't return an HTMLAudioElement, but we play immediately
  } catch {
    return null;
  }
}

// Simple sound player using Web Audio API
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function playSound(type: 'correct' | 'wrong' | 'achievement' | 'click' | 'notification') {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'correct': {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.35);
        break;
      }
      case 'wrong': {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.25);
        break;
      }
      case 'achievement': {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
        oscillator.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.55);
        break;
      }
      case 'click': {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.04);
        break;
      }
      case 'notification': {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime);
        oscillator.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.35);
        break;
      }
    }
  } catch (e) {
    // Silent fail - sounds are optional
  }
}

/* ── Context ── */
interface SettingsContextValue {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
  playSoundIfEnabled: (type: 'correct' | 'wrong' | 'achievement' | 'click' | 'notification') => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  updateSetting: () => {},
  resetSettings: () => {},
  playSoundIfEnabled: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== 'undefined') {
      return loadSettings();
    }
    return DEFAULT_SETTINGS;
  });
  const initialized = useRef(true);

  // Listen for settings changes from other tabs/components
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === SETTINGS_KEY && e.newValue) {
        try {
          setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(e.newValue) });
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Apply theme to document
  // NOTE: Theme toggling is now driven by `useTheme` (from @/lib/hooks/use-theme)
  // which toggles the `.dark` class on <html>. The legacy `medq-light` / `medq-dark`
  // classes are kept as no-op markers for backwards compatibility with any code
  // that reads them — they don't drive styling. The `settings.theme` field is
  // preserved so the Settings dialog can still display the user's preference,
  // but the actual DOM class is owned by useTheme.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (settings.theme === 'light') {
      root.classList.add('medq-light');
      root.classList.remove('medq-dark');
    } else {
      root.classList.add('medq-dark');
      root.classList.remove('medq-light');
    }
  }, [settings.theme]);

  // Apply compact mode class
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (settings.compactMode) {
      root.classList.add('medq-compact');
    } else {
      root.classList.remove('medq-compact');
    }
  }, [settings.compactMode]);

  // Daily Study Reminder - schedule browser notifications
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!settings.dailyReminder) return;

    // Request notification permission
    const requestNotifPermission = async () => {
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    };
    requestNotifPermission();

    // Track the last reminder date to avoid duplicate notifications
    const LAST_REMINDER_KEY = 'medq-last-reminder-date';

    // Check every 30 seconds if it's time for the reminder
    const interval = setInterval(() => {
      try {
        const now = new Date();
        const [hours, minutes] = settings.reminderTime.split(':').map(Number);
        const isTime = now.getHours() === hours && now.getMinutes() === minutes;
        const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
        const lastReminder = localStorage.getItem(LAST_REMINDER_KEY);

        if (isTime && lastReminder !== todayStr) {
          localStorage.setItem(LAST_REMINDER_KEY, todayStr);

          // Try browser notification first
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('MedQ Study Reminder 📚', {
              body: 'Time for your daily study session! Keep your streak going.',
              icon: '/favicon.ico',
              tag: 'medq-daily-reminder',
            });
          }

          // Also play notification sound if enabled
          if (settings.soundEffects) {
            playSound('notification');
          }
        }
      } catch {}
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [settings.dailyReminder, settings.reminderTime, settings.soundEffects]);

  const updateSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
  }, []);

  const playSoundIfEnabled = useCallback((type: 'correct' | 'wrong' | 'achievement' | 'click' | 'notification') => {
    if (settings.soundEffects) {
      playSound(type);
    }
  }, [settings.soundEffects]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings, playSoundIfEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
}
