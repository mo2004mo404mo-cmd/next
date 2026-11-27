'use client';

/**
 * AudioRecorder — in-browser microphone recording → Knowledge Library.
 *
 * Flow: getUserMedia → MediaRecorder (webm/opus, mp4 on Safari) with a live
 * timer + Web-Audio level meter → on stop, wrap the blob in a File and hand
 * it to the parent, which POSTs it to /api/knowledge/upload. From there the
 * recorded audio follows the EXACT same pipeline as uploaded files:
 * ffmpeg → 25s WAV segments → ASR (timestamps) → chunk → embed → ready source.
 *
 * Graceful degradation: hidden when MediaRecorder/getUserMedia are unsupported;
 * friendly message on permission denial; hard 10-minute cap auto-stops.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Square, X, MicOff, Loader2 } from 'lucide-react';

const MAX_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const MIN_BYTES = 2048; // sub-2KB recordings are almost certainly accidental

/** Pick the best container/codec the browser can actually record. */
function pickRecorderMime(): { mimeType: string; ext: string } {
  const candidates: Array<{ mimeType: string; ext: string }> = [
    { mimeType: 'audio/webm;codecs=opus', ext: 'webm' },
    { mimeType: 'audio/webm', ext: 'webm' },
    { mimeType: 'audio/mp4', ext: 'm4a' }, // Safari
    { mimeType: 'audio/ogg;codecs=opus', ext: 'ogg' },
  ];
  for (const c of candidates) {
    try {
      if (MediaRecorder.isTypeSupported(c.mimeType)) return c;
    } catch {
      /* isTypeSupported can throw on exotic browsers — keep probing */
    }
  }
  return { mimeType: '', ext: 'webm' }; // let the browser choose the default
}

function recordingSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof MediaRecorder !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia
  );
}

function timestampName(ext: string): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `recording-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}.${ext}`;
}

function fmtTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

type Phase = 'idle' | 'requesting' | 'recording' | 'finishing';

export default function AudioRecorder({
  onRecorded,
}: {
  /** Receives the finished recording as a File — parent handles upload. */
  onRecorded: (file: File) => void;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [supported] = useState(recordingSupported);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef<number>(0);
  const cancelledRef = useRef(false);

  const teardown = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    recorderRef.current = null;
  }, []);

  // Unmount safety: release mic + timers.
  useEffect(() => teardown, [teardown]);

  const start = useCallback(async () => {
    if (!supported || phase !== 'idle') return;
    setError(null);
    setPhase('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = stream;

      const { mimeType, ext } = pickRecorderMime();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      recorderRef.current = recorder;
      (recorderRef as unknown as { _ext?: string })._ext = ext; // remember ext for naming
      chunksRef.current = [];
      cancelledRef.current = false;

      // Live level meter (RMS of the mic signal).
      try {
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        src.connect(analyser);
        const buf = new Uint8Array(analyser.fftSize);
        const loop = () => {
          analyser.getByteTimeDomainData(buf);
          let sum = 0;
          for (let i = 0; i < buf.length; i++) {
            const v = (buf[i] - 128) / 128;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / buf.length);
          setLevel((prev) => Math.max(rms, prev * 0.82)); // smooth decay
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      } catch {
        /* meter is cosmetic — recording continues without it */
      }

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const ext = (recorderRef as unknown as { _ext?: string })._ext || 'webm';
        const type = recorder.mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type });
        teardown();
        setPhase('idle');
        setLevel(0);
        setElapsed(0);
        if (cancelledRef.current) return; // discarded
        if (blob.size < MIN_BYTES) {
          setError('Recording too short — hold the mic a little longer.');
          return;
        }
        onRecorded(new File([blob], timestampName(ext), { type }));
      };

      recorder.start(1000); // 1s timeslices → progressive chunks
      startedAtRef.current = Date.now();
      setElapsed(0);
      setPhase('recording');

      timerRef.current = setInterval(() => {
        const ms = Date.now() - startedAtRef.current;
        setElapsed(ms);
        if (ms >= MAX_DURATION_MS) {
          recorderRef.current?.state === 'recording' && recorderRef.current.stop();
        }
      }, 250);
    } catch (e) {
      teardown();
      setPhase('idle');
      const name = e instanceof Error ? e.name : '';
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        setError('Microphone access denied — allow it in your browser settings, then try again.');
      } else if (name === 'NotFoundError') {
        setError('No microphone found on this device.');
      } else {
        setError(e instanceof Error ? e.message : 'Could not start recording.');
      }
    }
  }, [supported, phase, teardown, onRecorded]);

  const stop = useCallback(() => {
    const r = recorderRef.current;
    if (r && r.state === 'recording') {
      setPhase('finishing');
      r.stop();
    }
  }, []);

  const discard = useCallback(() => {
    cancelledRef.current = true;
    const r = recorderRef.current;
    if (r && r.state === 'recording') {
      setPhase('finishing');
      r.stop();
    } else {
      teardown();
      setPhase('idle');
      setLevel(0);
      setElapsed(0);
    }
  }, [teardown]);

  if (!supported) return null;

  const bars = 18;
  const activeBars = Math.round(Math.min(1, level * 3.2) * bars);

  return (
    <div>
      {phase === 'idle' && (
        <button
          type="button"
          onClick={start}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-purple-400/25 bg-purple-400/[0.07] text-purple-300 text-xs font-semibold hover:bg-purple-400/[0.14] hover:border-purple-400/45 transition-all cursor-pointer"
        >
          <Mic className="w-4 h-4" />
          Record from microphone
          <span className="text-[10px] font-normal text-[#5a6478]">— transcribed & indexed like an upload</span>
        </button>
      )}

      {phase === 'requesting' && (
        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/[0.08] bg-[#1a1e2b] text-xs text-[#8b95a8]">
          <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
          Waiting for microphone permission…
        </div>
      )}

      {phase === 'recording' && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-400/30 bg-red-400/[0.06]">
          <span className="flex items-center gap-2 shrink-0">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-red-500" />
            </span>
            <span className="text-xs font-bold text-red-300 tabular-nums">{fmtTime(elapsed)}</span>
          </span>

          {/* level meter */}
          <div className="flex-1 flex items-center justify-center gap-[3px] h-6 overflow-hidden" aria-hidden>
            {Array.from({ length: bars }).map((_, i) => (
              <span
                key={i}
                className={`w-[3px] rounded-full transition-all duration-100 ${
                  i < activeBars ? 'bg-red-400/80' : 'bg-white/[0.08]'
                }`}
                style={{ height: `${25 + (i / bars) * 55}%` }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={stop}
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00e5a0]/12 border border-[#00e5a0]/35 text-[#00e5a0] text-xs font-bold hover:bg-[#00e5a0]/20 transition-all cursor-pointer"
          >
            <Square className="w-3.5 h-3.5" /> Stop &amp; index
          </button>
          <button
            type="button"
            onClick={discard}
            className="shrink-0 p-2 rounded-lg text-[#5a6478] hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
            title="Discard recording"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {phase === 'finishing' && (
        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/[0.08] bg-[#1a1e2b] text-xs text-[#8b95a8]">
          <Loader2 className="w-4 h-4 animate-spin text-[#00e5a0]" />
          Finalizing recording…
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-[10px] text-red-400 flex items-center gap-1.5">
          <MicOff className="w-3 h-3 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
