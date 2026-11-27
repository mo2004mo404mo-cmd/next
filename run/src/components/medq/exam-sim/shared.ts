'use client';

/**
 * Shared exam-simulator logic: voice (TTS + ASR), question picker,
 * instant-feedback check.
 *
 * Extracted from the standalone /exam-sim page and ExamSimulatorTab so both
 * surfaces (the standalone route and the in-app tab) get identical behavior
 * without copy-paste divergence.
 *
 * Voice: uses the browser-native Web Speech API (speechSynthesis for TTS,
 * SpeechRecognition for ASR) — no API keys, no audio leaves the device.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// ── Types ──

export interface VoiceSettings {
  rate: number;
  pitch: number;
  voiceURI: string | null;
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  rate: 0.95,
  pitch: 1,
  voiceURI: null,
};

const SETTINGS_KEY = 'voice-exam-settings-v1';

export interface PickerQuestion {
  id: string;
  type: string;
  text: string;
  optionsCount: number;
  difficulty?: string;
  system?: string;
  topic?: string;
  tags: string[];
  isAIGenerated?: boolean;
  reviewStatus?: string;
}

export interface InstantFeedback {
  correct: boolean;
  blank: boolean;
  correctAnswer: string;
  explanation: string;
  clinicalPearl?: string;
  mnemonic?: string;
  selectedAnswer: string;
}

type SpeechRecognitionResultLike = {
  0: { transcript: string };
  isFinal: boolean;
};

export function extractSpeechRecognitionText(
  resultIndex: number,
  results: ArrayLike<SpeechRecognitionResultLike>,
): { finalText: string; interimText: string } {
  let finalText = '';
  let interimText = '';
  for (let i = resultIndex; i < results.length; i++) {
    const result = results[i];
    if (result.isFinal) finalText += `${result[0].transcript} `;
    else interimText += result[0].transcript;
  }
  return { finalText: finalText.trim(), interimText };
}

// ── Web Speech API typings (loose — not in TS DOM lib yet) ──

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: {
    resultIndex: number;
    results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
  }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
};

declare global {
  interface Window {
    SpeechRecognition?: { new (): SpeechRecognitionLike };
    webkitSpeechRecognition?: { new (): SpeechRecognitionLike };
  }
}

// ── Capability flags ──

export const TTS_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;
export const ASR_SUPPORTED =
  typeof window !== 'undefined' && (!!window.SpeechRecognition || !!window.webkitSpeechRecognition);

// ── Helpers ──

export function stripHtml(s: string): string {
  return String(s ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function letterToIndex(letter: string): number {
  const l = letter.toUpperCase();
  if (l >= 'A' && l <= 'Z') return l.charCodeAt(0) - 'A'.charCodeAt(0);
  return -1;
}

export function indexToLetter(i: number): string {
  return String.fromCharCode('A'.charCodeAt(0) + i);
}

/**
 * Map a spoken transcript to a MCQ option index.
 * Handles: "B", "option B", "the answer is C", "second one", "third",
 * "1", "2", "the answer is the third option", etc.
 */
export function matchLetter(transcript: string): string | null {
  const t = transcript.toLowerCase().trim();
  if (!t) return null;

  const m1 = t.match(/\b([a-e])\b/);
  if (m1) return m1[1].toUpperCase();

  const m2 = t.match(/(?:option|answer|choice|letter)\s+([a-e])\b/);
  if (m2) return m2[1].toUpperCase();

  const ordMap: Record<string, string> = {
    first: 'A', second: 'B', third: 'C', fourth: 'D', fifth: 'E',
    '1st': 'A', '2nd': 'B', '3rd': 'C', '4th': 'D', '5th': 'E',
    one: 'A', two: 'B', three: 'C', four: 'D', five: 'E',
  };
  for (const [k, v] of Object.entries(ordMap)) {
    if (new RegExp(`\\b${k}\\b`).test(t)) return v;
  }

  const m3 = t.match(/\b([1-5])\b/);
  if (m3) return indexToLetter(parseInt(m3[1], 10) - 1);

  return null;
}

// ── useVoiceSettings hook ──

export function useVoiceSettings() {
  const [settings, setSettings] = useState<VoiceSettings>(DEFAULT_VOICE_SETTINGS);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) setSettings({ ...DEFAULT_VOICE_SETTINGS, ...JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* ignore */ }
  }, [settings]);

  useEffect(() => {
    if (!TTS_SUPPORTED) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      setSettings((s) => {
        if (s.voiceURI) return s;
        const en = v.find((x) => x.lang.startsWith('en'));
        return en ? { ...s, voiceURI: en.voiceURI } : s;
      });
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  return { settings, setSettings, voices };
}

// ── useSpeech hook (TTS) ──

export function useSpeech(settings: VoiceSettings, voices: SpeechSynthesisVoice[]) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const supported = TTS_SUPPORTED || (typeof window !== 'undefined' && 'speechSynthesis' in window);

  const speak = useCallback((text: string, onDone?: () => void) => {
    if (!text) { onDone?.(); return; }
    // Chrome fires no voiceschanged before first getVoices() in some
    // profiles; if no voice matches, still speak with the default voice
    // instead of silently dropping the line.
    if (!('speechSynthesis' in window)) { onDone?.(); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = settings.rate;
    u.pitch = settings.pitch;
    if (settings.voiceURI) {
      const v = voices.find((x) => x.voiceURI === settings.voiceURI);
      if (v) u.voice = v;
    }
    u.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    const done = () => { setIsSpeaking(false); setIsPaused(false); onDone?.(); };
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
    // Chrome long-utterance stall workaround: kick resume periodically
    // while the utterance is supposed to be speaking.
    const kick = setInterval(() => {
      if (!window.speechSynthesis.speaking) { clearInterval(kick); return; }
      try { window.speechSynthesis.resume(); } catch { clearInterval(kick); }
    }, 5000);
    const origEnd = u.onend;
    u.onend = () => { clearInterval(kick); origEnd?.call(u); };
    // Failsafe: if synthesis neither starts nor errors within 3s (headless
    // Chromium without voices), resolve the callback so callers unblock.
    setTimeout(() => {
      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        clearInterval(kick);
        setIsSpeaking(false);
        onDone?.();
      }
    }, 3000);
  }, [settings.rate, settings.pitch, settings.voiceURI, voices]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [supported]);

  const togglePause = useCallback(() => {
    if (!supported) return;
    if (isPaused) { window.speechSynthesis.resume(); setIsPaused(false); }
    else { window.speechSynthesis.pause(); setIsPaused(true); }
  }, [isPaused, supported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { if (TTS_SUPPORTED) window.speechSynthesis.cancel(); };
  }, []);

  return { isSpeaking, isPaused, speak, stop, togglePause };
}

// ── useSpeechRecognition hook (ASR) ──
//
// Final transcripts are delivered after a short pause, even if a continuous
// recognition session does not end between utterances.
// While `suppressWhileSpeaking` is set, results are ignored — that is how
// the caller keeps the mic from transcribing the device's own TTS output
// when headphones are not used.

export function useSpeechRecognition(
  onFinal: (transcript: string) => void,
  opts: { continuous?: boolean; lang?: string } = {},
) {
  const { continuous = false, lang = 'en-US' } = opts;
  const [isRecording, setIsRecording] = useState(false);
  const [interim, setInterim] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal;
  const activeRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Set while the caller asked us to ignore results (TTS playing). */
  const suppressRef = useRef(false);

  const setSuppress = useCallback((value: boolean) => { suppressRef.current = value; }, []);

  const start = useCallback(() => {
    if (!ASR_SUPPORTED) {
      toast.error('Voice input is not supported in this browser. Try Chrome, Edge, or Safari.');
      return;
    }
    activeRef.current = true;
    const launch = () => {
      const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition!;
      const rec = new Ctor();
      rec.lang = lang;
      rec.continuous = continuous;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      let finalText = '';
      const flushFinalText = () => {
        if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
        flushTimerRef.current = null;
        const transcript = finalText.trim();
        finalText = '';
        setInterim('');
        if (!transcript || suppressRef.current) return;
        onFinalRef.current(transcript);
      };

      rec.onstart = () => {
        setIsRecording(true);
        setInterim('');
        finalText = '';
      };
      rec.onerror = (e) => {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          // Permission gone — stop the loop, tell the user once.
          activeRef.current = false;
          setIsRecording(false);
          if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
          flushTimerRef.current = null;
          finalText = '';
          setInterim('');
          toast.error('Microphone access was blocked. Allow the mic in the browser to talk to the patient.');
          return;
        }
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          toast.error(`Voice error: ${e.error}`);
        }
      };
      rec.onend = () => {
        setIsRecording(false);
        flushFinalText();
        // Continuous mode: Chrome terminated the session — re-arm it while
        // the caller still wants the mic.
        if (activeRef.current) {
          if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
          restartTimerRef.current = setTimeout(() => { if (activeRef.current) launch(); }, 300);
        }
      };
      rec.onresult = (e) => {
        const { finalText: newFinalText, interimText } = extractSpeechRecognitionText(e.resultIndex, e.results);
        finalText += newFinalText ? `${newFinalText} ` : '';
        if (!suppressRef.current) {
          setInterim([finalText.trim(), interimText].filter(Boolean).join(' '));
        } else {
          setInterim('');
        }
        if (finalText.trim()) {
          if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
          flushTimerRef.current = setTimeout(flushFinalText, 750);
        }
      };

      recognitionRef.current = rec;
      try { rec.start(); } catch {
        // "already started" — the previous session hasn't torn down yet;
        // retry shortly instead of failing the whole mode.
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => { if (activeRef.current) launch(); }, 400);
      }
    };
    launch();
  }, [continuous, lang]);

  const stop = useCallback(() => {
    activeRef.current = false;
    if (restartTimerRef.current) { clearTimeout(restartTimerRef.current); restartTimerRef.current = null; }
    if (flushTimerRef.current) { clearTimeout(flushTimerRef.current); flushTimerRef.current = null; }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }
    setIsRecording(false);
  }, []);

  const abort = useCallback(() => {
    activeRef.current = false;
    if (restartTimerRef.current) { clearTimeout(restartTimerRef.current); restartTimerRef.current = null; }
    if (flushTimerRef.current) { clearTimeout(flushTimerRef.current); flushTimerRef.current = null; }
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ignore */ }
    }
    setIsRecording(false);
    setInterim('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      activeRef.current = false;
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
      if (recognitionRef.current) try { recognitionRef.current.abort(); } catch { /* ignore */ }
    };
  }, []);

  return { isRecording, interim, start, stop, abort, setSuppress };
}

// ── useQuestionPicker hook ──

export function useQuestionPicker() {
  const [query, setQuery] = useState('');
  const [system, setSystem] = useState('all');
  const [topic, setTopic] = useState('all');
  const [results, setResults] = useState<PickerQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searched, setSearched] = useState(false);

  const search = useCallback(async () => {
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (system !== 'all') params.set('system', system);
      if (topic !== 'all') params.set('topic', topic);
      params.set('limit', '100');
      const res = await fetch(`/api/exam-sim/search-questions?${params.toString()}`);
      const data = await res.json();
      if (res.ok) setResults(data.questions || []);
      else toast.error(data.error || 'Search failed');
    } catch {
      toast.error('Search failed — check your connection');
    } finally {
      setLoading(false);
    }
  }, [query, system, topic]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Select every ID in a given list (additive — keeps already-selected ones).
  // Used by the picker's "Select all N results" button.
  const selectAll = useCallback((ids: string[]) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.add(id);
      return next;
    });
  }, []);

  // Deselect every ID in a given list (used by "Deselect all N results").
  const deselectAll = useCallback((ids: string[]) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of ids) next.delete(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => setSelected(new Set()), []);
  const selectedIds = useCallback(() => [...selected], [selected]);

  return {
    query, setQuery,
    system, setSystem,
    topic, setTopic,
    results, loading, searched,
    selected, selectedCount: selected.size,
    search, toggle, selectAll, deselectAll, clear, selectedIds,
  };
}

// ── useInstantFeedback hook ──

export function useInstantFeedback(examId: string | null) {
  const [feedback, setFeedback] = useState<Record<string, InstantFeedback>>({});
  const [checking, setChecking] = useState<Set<string>>(new Set());

  const check = useCallback(async (questionId: string, answer: string) => {
    if (!examId || !answer) return;
    setChecking((prev) => new Set(prev).add(questionId));
    try {
      const res = await fetch(`/api/exam-sim/${examId}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answer }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback((prev) => ({ ...prev, [questionId]: data }));
      } else {
        toast.error(data.error || 'Could not check answer');
      }
    } catch {
      toast.error('Could not check answer — check your connection');
    } finally {
      setChecking((prev) => {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
    }
  }, [examId]);

  const clear = useCallback(() => setFeedback({}), []);

  return { feedback, checking, check, clear };
}
