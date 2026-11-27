'use client';

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';
import { stripMarkdownForTTS } from '@/lib/audio/tts-text';

type SpeechResultEvent = {
  resultIndex: number;
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type VoiceWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type UseAgentVoiceOptions = {
  mutedRef: MutableRefObject<boolean>;
  inputTextRef: MutableRefObject<string>;
  transcriptHandlerRef: MutableRefObject<(text: string, submit: boolean) => void>;
};

/**
 * Hands-free voice loop for the MedQ assistant.
 *
 * The contract: while hands-free mode is ON, the mic and the assistant's
 * voice alternate — the mic re-opens AUTOMATICALLY once the assistant
 * finishes speaking (or when its reply resolves with no speech at all).
 * Previously the mic closed after the first auto-send and never came back,
 * which is what made "talk hands-free" feel dead after one exchange.
 *
 * Robustness rules baked in:
 *   - Chrome ends a `continuous` session on its own after silence; the
 *     accumulated finals are flushed on `onend` (not lost).
 *   - An auto-send sets a one-shot guard so a later `stopListening()` tap
 *     cannot re-send the same transcript (double-send bug).
 *   - Restarting recognition is retried with a short backoff — Chrome
 *     throws "already started" if the previous session hasn't fully torn
 *     down yet.
 */
export function useAgentVoice({ mutedRef, inputTextRef, transcriptHandlerRef }: UseAgentVoiceOptions) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  /** Hands-free mode: keep the listen → speak → listen loop running. */
  const [handsFree, setHandsFree] = useState(false);
  const [asrSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    const voiceWindow = window as VoiceWindow;
    return Boolean(voiceWindow.SpeechRecognition || voiceWindow.webkitSpeechRecognition);
  });
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const ttsAbortRef = useRef<AbortController | null>(null);
  /** True when the pending MediaRecorder stop should be discarded (mode off). */
  const cancelRecorderRef = useRef(false);
  /** Ref mirrors so stable closures always read the latest values. */
  const handsFreeRef = useRef(false);
  const isListeningRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const submittedRef = useRef(false);
  /** Set while the mic is (re)starting after TTS — prevents double starts. */
  const restartingRef = useRef(false);
  useEffect(() => { handsFreeRef.current = handsFree; }, [handsFree]);
  useEffect(() => { isListeningRef.current = isListening; }, [isListening]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);

  const startMediaRecorderFallback = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      audioChunksRef.current = [];

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        setIsListening(false);
        if (cancelRecorderRef.current) {
          // Voice mode switched off mid-recording — drop the capture.
          cancelRecorderRef.current = false;
          return;
        }
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          if (!base64) return;
          try {
            const response = await fetch('/api/agent/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audio: base64, mode: 'asr' }),
            });
            const data = (await response.json()) as { text?: string };
            if (data.text?.trim()) transcriptHandlerRef.current(data.text, true);
          } catch {
            console.warn('[Agent V3] ASR failed');
          }
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, 10000);
    } catch {
      setIsListening(false);
    }
  }, [transcriptHandlerRef]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    audioRef.current?.pause();
    audioRef.current = null;
    ttsAbortRef.current?.abort();
    setIsSpeaking(false);
  }, []);

  const stopListeningInternal = useCallback((discard: boolean) => {
    try { recognitionRef.current?.stop(); } catch { /* not started */ }
    recognitionRef.current = null;
    if (mediaRecorderRef.current?.state === 'recording') {
      if (discard) cancelRecorderRef.current = true;
      mediaRecorderRef.current.stop();
    }
    setIsListening(false);
  }, []);

  /**
   * Open the mic. `fromHandsFree` marks automatic (loop-driven) starts so a
   * Chrome self-reset doesn't flip the user-visible mode off.
   */
  const openMic = useCallback(async (fromHandsFree = false) => {
    if (isListeningRef.current || restartingRef.current) return;
    if (!fromHandsFree && handsFreeRef.current) {
      // Manual tap inside hands-free mode — keep the loop flag.
    }
    const voiceWindow = window as VoiceWindow;
    const SpeechRecognition = voiceWindow.SpeechRecognition || voiceWindow.webkitSpeechRecognition;

    if (SpeechRecognition) {
      restartingRef.current = true;
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;
        let finalTranscript = '';
        let silenceTimer: ReturnType<typeof setTimeout> | null = null;
        // Before the first word: give the learner a moment to start talking
        // (8s). Once speech is detected, a 2s end-of-utterance pause
        // auto-sends — voice input requires no further taps.
        let heardSpeech = false;
        let sentThisSession = false;

        const clearSilenceTimer = () => {
          if (silenceTimer) { clearTimeout(silenceTimer); silenceTimer = null; }
        };
        const resetSilenceTimer = () => {
          clearSilenceTimer();
          silenceTimer = setTimeout(() => {
            if (finalTranscript.trim() && !sentThisSession) {
              sentThisSession = true;
              submittedRef.current = true;
              transcriptHandlerRef.current(finalTranscript.trim(), true);
            }
            try { recognition.stop(); } catch { /* already stopped */ }
            setIsListening(false);
          }, heardSpeech ? 2_000 : 8_000);
        };
        recognition.onresult = (event: SpeechResultEvent) => {
          heardSpeech = true;
          resetSilenceTimer();
          let interim = '';
          for (let index = event.resultIndex; index < event.results.length; index += 1) {
            const result = event.results[index];
            if (result.isFinal) finalTranscript += `${result[0].transcript} `;
            else interim += result[0].transcript;
          }
          transcriptHandlerRef.current(finalTranscript + interim, false);
        };
        recognition.onerror = (event) => {
          clearSilenceTimer();
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            // Permission denied — hands-free cannot work; drop the mode.
            setHandsFree(false);
            handsFreeRef.current = false;
          }
        };
        recognition.onend = () => {
          // Chrome ends the session by itself after silence/timeout. Flush
          // anything accumulated that the silence timer did not send yet
          // (previously this text was silently dropped).
          clearSilenceTimer();
          setIsListening(false);
          recognitionRef.current = null;
          if (finalTranscript.trim() && !sentThisSession) {
            sentThisSession = true;
            submittedRef.current = true;
            transcriptHandlerRef.current(finalTranscript.trim(), true);
          }
          // Hands-free loop: the mic re-opens right away when the assistant
          // is NOT speaking; if it is, speak()'s onend will re-open it.
          if (handsFreeRef.current && !isSpeakingRef.current && !sentThisSession) {
            setTimeout(() => { void openMic(true); }, 350);
          } else if (handsFreeRef.current && !isSpeakingRef.current && sentThisSession) {
            // The reply pipeline takes over; reply TTS end re-opens the mic.
            // If the reply resolves without speaking (muted), re-open after
            // a grace period so the loop never stalls.
            setTimeout(() => {
              if (handsFreeRef.current && !isListeningRef.current && !isSpeakingRef.current) {
                void openMic(true);
              }
            }, 4000);
          }
        };
        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
        resetSilenceTimer();
      } catch {
        // Chrome throws "already started" if the previous session hasn't
        // fully torn down — retry once after a beat before falling back.
        setTimeout(() => {
          if (!isListeningRef.current && handsFreeRef.current) void openMic(fromHandsFree);
          else restartingRef.current = false;
        }, 400);
        return;
      } finally {
        setTimeout(() => { restartingRef.current = false; }, 500);
      }
      return;
    }
    await startMediaRecorderFallback();
  }, [startMediaRecorderFallback]);

  /** User-facing toggle: starts hands-free conversation mode. */
  const startHandsFree = useCallback(async () => {
    setHandsFree(true);
    handsFreeRef.current = true;
    stopSpeaking();
    submittedRef.current = false;
    await openMic(false);
  }, [openMic, stopSpeaking]);

  const startListening = useCallback(async () => {
    // Legacy single-shot dictation entry — treat as hands-free start so the
    // mic keeps cycling until the user stops it.
    await startHandsFree();
  }, [startHandsFree]);

  const stopListening = useCallback(() => {
    // Manual stop: send whatever was captured — unless the silence timer /
    // onend already auto-submitted it this turn (double-send guard).
    const alreadySent = submittedRef.current;
    stopListeningInternal(false);
    if (!alreadySent) {
      transcriptHandlerRef.current(inputTextRef.current, true);
    }
    submittedRef.current = false;
  }, [inputTextRef, stopListeningInternal, transcriptHandlerRef]);

  /** Fully stop the mic WITHOUT submitting (mode switch off / panel close). */
  const cancelListening = useCallback(() => {
    setHandsFree(false);
    handsFreeRef.current = false;
    stopListeningInternal(true);
  }, [stopListeningInternal]);

  /** Explicitly end hands-free mode but keep any pending text in the composer. */
  const stopHandsFree = useCallback(() => {
    setHandsFree(false);
    handsFreeRef.current = false;
    stopListeningInternal(false);
    submittedRef.current = false;
  }, [stopListeningInternal]);

  const serverTTS = useCallback(async (text: string, abortController: AbortController) => {
    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode: 'tts' }),
        signal: abortController.signal,
      });
      if (!response.ok) throw new Error('TTS failed');
      const url = URL.createObjectURL(await response.blob());
      const audio = new Audio(url);
      audioRef.current = audio;
      // Playback end re-opens the mic for the hands-free loop — server TTS
      // has no utterance.onend, so the loop must be driven from here.
      audio.onended = () => {
        URL.revokeObjectURL(url);
        reopenMicAfterSpeechRef.current();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
      };
      await audio.play();
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.warn('[Agent V3] Server TTS failed:', error);
      }
      setIsSpeaking(false);
    }
  }, []);

  /** Ref indirection so serverTTS can call reopenMicAfterSpeech without a
   * circular dependency (reopenMicAfterSpeech → openMic is heavy). */
  const reopenMicAfterSpeechRef = useRef<() => void>(() => undefined);

  /** Re-open the mic once the assistant's voice finishes (hands-free loop). */
  const reopenMicAfterSpeech = useCallback(() => {
    setIsSpeaking(false);
    if (handsFreeRef.current && !isListeningRef.current) {
      setTimeout(() => {
        if (handsFreeRef.current && !isListeningRef.current && !isSpeakingRef.current) {
          void openMic(true);
        }
      }, 300);
    }
  }, [openMic]);
  useEffect(() => { reopenMicAfterSpeechRef.current = reopenMicAfterSpeech; }, [reopenMicAfterSpeech]);

  const speak = useCallback(async (rawText: string) => {
    // Agent replies are markdown (headings, bold, lists, links) — never speak
    // the syntax markers. Stripped once here so BOTH the browser utterance
    // and the serverTTS fallback speak clean text.
    const text = stripMarkdownForTTS(rawText ?? '');
    if (mutedRef.current || !text.trim()) {
      // Nothing will be spoken — if hands-free is waiting on speech, the
      // mic must re-open now or the loop stalls.
      if (handsFreeRef.current && !isListeningRef.current) reopenMicAfterSpeech();
      return;
    }
    stopSpeaking();
    const abortController = new AbortController();
    ttsAbortRef.current = abortController;
    setIsSpeaking(true);

    // Barge-in: the user talking interrupts the assistant's speech — that
    // is the entire point of a spoken conversation. openMic cancels TTS.
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.1;
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find((voice) => voice.lang.startsWith('en') && voice.name.includes('Google'))
          || voices.find((voice) => voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('espeak'))
          || voices.find((voice) => voice.lang === 'en-US')
          || voices.find((voice) => voice.lang.startsWith('en'));
        if (preferred) {
          utterance.voice = preferred;
          utterance.onend = () => reopenMicAfterSpeech();
          utterance.onerror = () => { void serverTTS(text, abortController); };
          window.speechSynthesis.speak(utterance);
          // Chrome quirk: speechSynthesis can stall on long utterances —
          // resume it periodically (classic workaround, guarded).
          const resumeKick = setInterval(() => {
            if (!window.speechSynthesis.speaking) { clearInterval(resumeKick); return; }
            try { window.speechSynthesis.resume(); } catch { clearInterval(resumeKick); }
          }, 5000);
          const clearKick = () => clearInterval(resumeKick);
          utterance.onend = () => { clearKick(); reopenMicAfterSpeech(); };
          utterance.onerror = () => { clearKick(); void serverTTS(text, abortController); };
          return;
        }
      }
      await serverTTS(text, abortController);
    } catch {
      setIsSpeaking(false);
    }
  }, [mutedRef, reopenMicAfterSpeech, serverTTS, stopSpeaking]);

  // serverTTS's audio.onended drives the hands-free loop via
  // reopenMicAfterSpeechRef — see serverTTS above.

  useEffect(() => () => {
    audioRef.current?.pause();
    try { recognitionRef.current?.stop(); } catch {}
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    ttsAbortRef.current?.abort();
  }, []);

  return {
    asrSupported, isListening, isSpeaking, handsFree,
    startListening, stopListening, cancelListening,
    stopHandsFree, speak, stopSpeaking,
  };
}
