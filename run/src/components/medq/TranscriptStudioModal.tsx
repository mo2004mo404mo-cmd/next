'use client';

/**
 * TranscriptStudioModal — the ADVANCED audio transcription viewer.
 *
 * Opens for audio sources in the Knowledge Library (replaces the plain-text
 * SourceViewerModal for that kind). Everything the old viewer could not do:
 *
 *   - Waveform (decoded client-side via Web Audio) with click-to-seek and a
 *     live playhead; silences are visible as flat regions.
 *   - Synced playback of the ORIGINAL retained audio (served owner-gated
 *     with Range support from /api/knowledge/sources/[id]/audio).
 *   - Sentence-level timestamps (VAD-accurate): click any sentence or its
 *     [mm:ss] chip to jump there; the active sentence highlights while
 *     playing (karaoke mode) and auto-scrolls.
 *   - Three views: Sentences (synced), Paragraphs (readable), Raw (exactly
 *     what was indexed for RAG).
 *   - In-transcript search with match navigation (Enter / arrows).
 *   - Insights from the ingestion pipeline: LLM title, summary, keyword and
 *     topic chips (click a chip to search it).
 *   - Speech analytics: words, sentences, WPM, speech coverage.
 *   - Export: Copy, TXT, SRT (subtitles), VTT, JSON (full structure).
 *   - Keyboard: Space play/pause, arrows ±5s, Escape close.
 *
 * Graceful degradation: source has no structured transcript (pre-upgrade or
 * video) → raw text view; audio not retained → transcript without playback.
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  X, Loader2, Copy, Check, AlertTriangle, Play, Pause, RotateCcw,
  RotateCw, Search, ChevronUp, ChevronDown, FileText, AlignLeft,
  Braces, Download, Lightbulb, Anchor, Gauge, Type, Timer,
} from 'lucide-react';

// ─── Types (mirror audio-pipeline.ts) ──────────────────────────────────────

interface Sentence { id: number; start: number; end: number; text: string; seg: number }
interface Paragraph { from: number; to: number }
interface Insights {
  title: string; summary: string; keywords: string[]; topics: string[]; entities: string[];
}
interface Stats {
  words: number; sentences: number; segments: number;
  speechSec: number; silenceSec: number; wpm: number; coverage: number;
  dropped?: number;
}
interface Transcript {
  version: number; fileName: string; durationSec: number; stats: Stats;
  segments: Array<{ id: number; start: number; end: number; text: string }>;
  sentences: Sentence[];
  paragraphs: Paragraph[];
  insights: Insights;
}

interface SourceDetail {
  source: {
    id: string; name: string; type: string; fileKind: string;
    status: 'pending' | 'processing' | 'ready' | 'failed';
    error?: string | null;
    meta?: Record<string, unknown> | null;
    createdAt: string;
    documents?: Array<{ id: string; title: string; mimeType: string; sizeBytes: number; chunkCount: number }>;
  };
  content: string;
  chunkTotal?: number;
  preview: string;
}

// ─── Formatting helpers ────────────────────────────────────────────────────

function fmtTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
    : `${m}:${String(r).padStart(2, '0')}`;
}

function srtTime(sec: number): string {
  const ms = Math.floor((sec % 1) * 1000);
  const s = Math.floor(sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

function vttTime(sec: number): string {
  return srtTime(sec).replace(',', '.');
}

function buildSrt(sentences: Sentence[]): string {
  return sentences
    .map((s, i) => `${i + 1}\n${srtTime(s.start)} --> ${srtTime(Math.max(s.end, s.start + 0.4))}\n${s.text}\n`)
    .join('\n');
}

function buildVtt(sentences: Sentence[]): string {
  return `WEBVTT\n\n${sentences
    .map((s) => `${vttTime(s.start)} --> ${vttTime(Math.max(s.end, s.start + 0.4))}\n${s.text}\n`)
    .join('\n')}`;
}

function buildTxt(transcript: Transcript): string {
  return transcript.paragraphs
    .map((p) => transcript.sentences.slice(p.from, p.to + 1).map((s) => s.text).join(' '))
    .join('\n\n');
}

function downloadBlob(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ─── Component ─────────────────────────────────────────────────────────────

const WAVEFORM_MAX_SEC = 1800; // beyond ~30 min skip the waveform decode (memory)

export default function TranscriptStudioModal({
  sourceId,
  onClose,
  kindBadge,
}: {
  sourceId: string;
  onClose: () => void;
  kindBadge: (kind: string) => ReactNode;
}) {
  const [detail, setDetail] = useState<SourceDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [audioOk, setAudioOk] = useState<boolean | null>(null); // null = probing
  const [peaks, setPeaks] = useState<Float32Array | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [rate, setRate] = useState(1);
  const [follow, setFollow] = useState(true);

  const [mode, setMode] = useState<'sentences' | 'paragraphs' | 'raw'>('sentences');
  const [query, setQuery] = useState('');
  const [matchIdx, setMatchIdx] = useState(0);
  const [showInsights, setShowInsights] = useState(true);
  const [copied, setCopied] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const drawWaveRef = useRef<(time: number) => void>(() => {});
  const lastTimeRef = useRef(0);
  const lastActiveRef = useRef<number>(-1);

  const transcript = useMemo(() => {
    const t = detail?.source?.meta?.transcript as Transcript | undefined;
    return t && Array.isArray(t.sentences) && t.sentences.length > 0 ? t : null;
  }, [detail]);

  const duration = transcript?.durationSec ?? 0;

  // ── Load source detail ──
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/knowledge/sources/${sourceId}?full=1&chunks=all`);
        const json = await res.json();
        if (!alive) return;
        if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
        setDetail(json as SourceDetail);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : 'Failed to load file');
      }
    })();
    return () => { alive = false; };
  }, [sourceId]);

  // ── Probe retained audio (Range probe; 206 = available) ──
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/knowledge/sources/${sourceId}/audio`, {
          headers: { Range: 'bytes=0-1' },
        });
        if (!alive) return;
        setAudioOk(res.status === 206 || res.status === 200);
        if ((res.status === 206 || res.status === 200) && res.body) void res.body.cancel();
      } catch {
        if (alive) setAudioOk(false);
      }
    })();
    return () => { alive = false; };
  }, [sourceId]);

  // ── Decode waveform peaks (only for retained audio ≤ 30 min) ──
  useEffect(() => {
    if (audioOk !== true || !duration || duration > WAVEFORM_MAX_SEC) return;
    let alive = true;
    let ctx: AudioContext | null = null;
    (async () => {
      try {
        const res = await fetch(`/api/knowledge/sources/${sourceId}/audio`);
        if (!res.ok || !alive) return;
        const buf = await res.arrayBuffer();
        const AudioCtx = window.AudioContext
          || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AudioCtx();
        const decoded = await ctx.decodeAudioData(buf.slice(0));
        void ctx.close().catch(() => {});
        ctx = null;
        if (!alive) return;
        const ch = decoded.getChannelData(0);
        const buckets = Math.min(900, Math.max(240, Math.floor(decoded.duration * 10)));
        const out = new Float32Array(buckets);
        const per = Math.max(1, Math.floor(ch.length / buckets));
        const step = Math.max(1, Math.floor(per / 60));
        for (let i = 0; i < buckets; i++) {
          let max = 0;
          const off = i * per;
          const lim = Math.min(off + per, ch.length);
          for (let j = off; j < lim; j += step) {
            const v = Math.abs(ch[j]);
            if (v > max) max = v;
          }
          out[i] = max;
        }
        if (alive) setPeaks(out);
      } catch {
        // decode failure (exotic codec) → waveform off, playback still fine
      } finally {
        if (ctx) void ctx.close().catch(() => {});
      }
    })();
    return () => {
      alive = false;
      if (ctx) void ctx.close().catch(() => {});
    };
  }, [audioOk, sourceId, duration]);

  // ── (keyboard shortcuts registered AFTER the handlers they call — see
  //    the "Keyboard shortcuts" effect further down, past seekBy/jumpMatch) ──

  // ── Playback loop: canvas at 60fps, React state throttled to ~8fps ──
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let lastState = 0;
    const tick = () => {
      const a = audioRef.current;
      if (a) {
        drawWaveRef.current(a.currentTime);
        const now = performance.now();
        if (now - lastState > 120) {
          lastState = now;
          setCurrentTime(a.currentTime);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // ── Waveform drawing (time is a PARAMETER so rAF can drive it at 60fps
  //    without re-rendering React; state changes redraw via the effect below) ──
  const drawWaveform = useCallback((time: number) => {
    lastTimeRef.current = time; // remembered for the ResizeObserver redraw
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrap = canvasWrapRef.current;
    const w = wrap ? wrap.clientWidth : 600;
    if (w <= 0) return;
    const dpr = window.devicePixelRatio || 1;
    const h = 64;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx2d.clearRect(0, 0, w, h);

    const ratio = duration > 0 ? Math.min(1, Math.max(0, time / duration)) : 0;

    if (!peaks) {
      // fallback: slim progress bar (exotic codec or >30 min audio)
      ctx2d.fillStyle = '#232b3d';
      ctx2d.fillRect(0, h / 2 - 2, w, 4);
      ctx2d.fillStyle = '#4fc3f7';
      ctx2d.fillRect(0, h / 2 - 2, w * ratio, 4);
      ctx2d.fillStyle = 'rgba(255,255,255,0.85)';
      ctx2d.fillRect(Math.max(0, w * ratio - 0.5), 4, 1, h - 8);
      return;
    }

    const n = peaks.length;
    const barW = Math.max(1, w / n - 0.4);
    const mid = h / 2;
    for (let i = 0; i < n; i++) {
      const x = (i / n) * w;
      const v = Math.pow(peaks[i], 0.75); // perceptual lift for quiet speech
      const barH = Math.max(1.2, v * (h - 10));
      ctx2d.fillStyle = i / n <= ratio ? 'rgba(79,195,247,0.95)' : '#2b3448';
      ctx2d.fillRect(x, mid - barH / 2, barW, barH);
    }
    // playhead
    const px = Math.max(0, Math.min(w - 1.5, w * ratio));
    ctx2d.fillStyle = 'rgba(255,255,255,0.9)';
    ctx2d.fillRect(px, 2, 1.5, h - 4);
  }, [peaks, duration]);

  // keep a ref to the LATEST draw fn (avoids stale closures in the rAF loop)
  useEffect(() => { drawWaveRef.current = drawWaveform; }, [drawWaveform]);

  // redraw whenever inputs change (peaks load, seek, resize, pause state)
  useEffect(() => { drawWaveform(currentTime); }, [drawWaveform, currentTime]);

  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => drawWaveRef.current(lastTimeRef.current));
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // ── Active sentence + follow-scroll ──
  const activeSentenceId = useMemo(() => {
    if (!transcript) return -1;
    const ss = transcript.sentences;
    let lo = 0, hi = ss.length - 1, ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (ss[mid].start <= currentTime) { ans = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    if (ans >= 0 && currentTime > ss[ans].end + 2.5) return -1; // in a long gap
    return ans;
  }, [transcript, currentTime]);

  useEffect(() => {
    if (!follow || !playing || activeSentenceId < 0) return;
    if (activeSentenceId === lastActiveRef.current) return;
    lastActiveRef.current = activeSentenceId;
    const el = listRef.current?.querySelector(`[data-sid="${activeSentenceId}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeSentenceId, follow, playing]);

  // ── Controls ──
  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => {});
    else a.pause();
  }, []);

  const seekTo = useCallback((sec: number) => {
    const a = audioRef.current;
    if (!a || !isFinite(sec)) return;
    a.currentTime = Math.max(0, Math.min(sec, duration || a.duration || sec));
    setCurrentTime(a.currentTime);
    if (!transcript) return;
    // snap to the sentence that covers this time for a tidier highlight
    const ss = transcript.sentences;
    let lo = 0, hi = ss.length - 1, ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (ss[mid].start <= sec) { ans = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    lastActiveRef.current = ans;
  }, [duration, transcript]);

  const seekBy = useCallback((delta: number) => {
    const a = audioRef.current;
    if (!a) return;
    seekTo(a.currentTime + delta);
  }, [seekTo]);

  const onWaveformClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(ratio * duration);
  }, [duration, seekTo]);

  // ── Search ──
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !transcript) return [] as number[];
    return transcript.sentences.filter((s) => s.text.toLowerCase().includes(q)).map((s) => s.id);
  }, [query, transcript]);

  const jumpMatch = useCallback((dir: 1 | -1) => {
    if (matches.length === 0) return;
    const next = (matchIdx + dir + matches.length) % matches.length;
    setMatchIdx(next);
    const sid = matches[next];
    const s = transcript?.sentences[sid];
    if (s) {
      seekTo(s.start);
      lastActiveRef.current = sid;
      const el = listRef.current?.querySelector(`[data-sid="${sid}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [matches, matchIdx, transcript, seekTo]);

  // ── Keyboard shortcuts (defined AFTER the handlers so deps are fresh) ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      const target = e.target as HTMLElement | null;
      const inInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
      if (inInput && e.key !== 'Enter') return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft' && !inInput) {
        e.preventDefault();
        seekBy(-5);
      } else if (e.key === 'ArrowRight' && !inInput) {
        e.preventDefault();
        seekBy(5);
      } else if (e.key === 'Enter' && inInput) {
        e.preventDefault();
        jumpMatch(e.shiftKey ? -1 : 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, togglePlay, seekBy, jumpMatch]);

  const highlight = useCallback((text: string) => {
    const q = query.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx < 0) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-[#4fc3f7]/30 text-[#e8f4ff] rounded-[2px] px-0.5">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  }, [query]);

  // ── Exports ──
  const copyTxt = useCallback(async () => {
    if (!transcript) return;
    try {
      await navigator.clipboard.writeText(buildTxt(transcript));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable */ }
  }, [transcript]);

  const baseName = (detail?.source.name || 'transcript').replace(/\.[a-z0-9]+$/i, '') || 'transcript';

  const exportAs = useCallback((kind: 'txt' | 'srt' | 'vtt' | 'json') => {
    if (!transcript) return;
    if (kind === 'txt') downloadBlob(`${baseName}.txt`, buildTxt(transcript), 'text/plain');
    if (kind === 'srt') downloadBlob(`${baseName}.srt`, buildSrt(transcript.sentences), 'application/x-subrip');
    if (kind === 'vtt') downloadBlob(`${baseName}.vtt`, buildVtt(transcript.sentences), 'text/vtt');
    if (kind === 'json') downloadBlob(`${baseName}.json`, JSON.stringify(transcript, null, 2), 'application/json');
  }, [transcript, baseName]);

  // ── Render ──
  const s = detail?.source;
  const st = transcript?.stats;
  const insights = transcript?.insights;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Transcript studio"
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] rounded-2xl border border-white/[0.1] bg-[#141926] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => { e.stopPropagation(); }}
      >
        {/* Hidden audio element */}
        {audioOk === true && (
          <audio
            ref={audioRef}
            src={`/api/knowledge/sources/${sourceId}/audio`}
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={(e) => { if (!playing) setCurrentTime(e.currentTarget.currentTime); }}
            onRateChange={(e) => setRate(e.currentTarget.playbackRate)}
          />
        )}

        {/* Header */}
        <div className="flex items-start gap-3 px-5 py-3.5 border-b border-white/[0.08] shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {s ? kindBadge(s.meta?.fileKind || s.fileKind) : null}
              <p className="text-sm font-semibold text-[#c8d0e0] truncate">{s?.name ?? 'Loading…'}</p>
              {s && (
                <span className={`px-1.5 py-0.5 rounded-md border text-[10px] font-semibold ${
                  s.status === 'ready'
                    ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
                    : s.status === 'failed'
                      ? 'text-red-400 bg-red-400/10 border-red-400/30'
                      : 'text-amber-400 bg-amber-400/10 border-amber-400/30'
                }`}>
                  {s.status}
                </span>
              )}
            </div>
            {/* Stats line */}
            {transcript && (
              <div className="mt-1.5 flex items-center gap-1.5 flex-wrap text-[10px] text-[#5a6478]">
                <span className="inline-flex items-center gap-1"><Timer className="w-3 h-3" />{fmtTime(transcript.durationSec)}</span>
                <span className="inline-flex items-center gap-1"><Type className="w-3 h-3" />{st?.words ?? 0} words</span>
                <span className="inline-flex items-center gap-1"><AlignLeft className="w-3 h-3" />{st?.sentences ?? 0} sentences</span>
                <span className="inline-flex items-center gap-1"><Gauge className="w-3 h-3" />{st?.wpm ?? 0} wpm</span>
                <span className="inline-flex items-center gap-1"><Anchor className="w-3 h-3" />{Math.round((st?.coverage ?? 0) * 100)}% speech</span>
                <span className="inline-flex items-center gap-1"><Braces className="w-3 h-3" />{st?.segments ?? 0} ASR segments</span>
                {(st?.dropped ?? 0) > 0 && (
                  <span
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300"
                    title="Some speech windows could not be transcribed (provider limits). Re-upload later for a complete transcript."
                  >
                    <AlertTriangle className="w-3 h-3" />{st?.dropped} segment{st?.dropped === 1 ? '' : 's'} skipped — re-upload later for a full transcript
                  </span>
                )}
              </div>
            )}
          </div>
          <button type="button" onClick={onClose} className="text-[#5a6478] hover:text-[#c8d0e0] transition-colors p-1 shrink-0" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {error && (
          <div className="px-5 py-8 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        {!error && !detail && (
          <div className="px-5 py-16 flex flex-col items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[#4fc3f7]" />
            <p className="text-xs text-[#5a6478]">Loading transcript…</p>
          </div>
        )}

        {!error && detail && s && (
          <>
            {s.status === 'failed' && (
              <div className="mx-5 mt-3 px-3 py-2.5 rounded-lg border border-red-400/30 bg-red-400/10 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-red-400 leading-relaxed">Indexing failed: {s.error || 'unknown error'}</p>
              </div>
            )}

            {/* Insights */}
            {insights && showInsights && (
              <div className="mx-5 mt-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-[#0f1320] shrink-0">
                <button type="button" className="w-full flex items-center gap-2 text-left" onClick={() => setShowInsights(false)}>
                  <Lightbulb className="w-3.5 h-3.5 text-[#4fc3f7] shrink-0" />
                  <p className="text-[11px] font-semibold text-[#c8d0e0] truncate">{insights.title}</p>
                  <ChevronUp className="w-3.5 h-3.5 text-[#5a6478] ml-auto shrink-0" />
                </button>
                {insights.summary && (
                  <p className="text-[11px] leading-relaxed text-[#8b95a8] mt-2">{insights.summary}</p>
                )}
                {(insights.keywords.length > 0 || insights.topics.length > 0 || insights.entities.length > 0) && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {insights.keywords.slice(0, 10).map((k) => (
                      <button key={`kw-${k}`} type="button" onClick={() => setQuery(k)}
                        className="px-2 py-0.5 rounded-md bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] hover:bg-[#4fc3f7]/20 transition-colors">
                        {k}
                      </button>
                    ))}
                    {insights.topics.slice(0, 5).map((t) => (
                      <span key={`tp-${t}`} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[#8b95a8] text-[10px]">
                        {t}
                      </span>
                    ))}
                    {insights.entities.slice(0, 8).map((t) => (
                      <span key={`en-${t}`} className="px-2 py-0.5 rounded-md bg-emerald-400/[0.07] border border-emerald-400/20 text-emerald-300/80 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {insights && !showInsights && (
              <button type="button" onClick={() => setShowInsights(true)}
                className="mx-5 mt-3 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-[#5a6478] hover:text-[#8b95a8] flex items-center gap-1.5 self-start">
                <Lightbulb className="w-3 h-3" /> Show insights
                <ChevronDown className="w-3 h-3" />
              </button>
            )}

            {/* Player + waveform */}
            {transcript && (
              <div className="mx-5 mt-3 rounded-xl border border-white/[0.06] bg-[#0f1320] p-3 shrink-0">
                <div ref={canvasWrapRef} className="w-full">
                  <canvas
                    ref={canvasRef}
                    onClick={onWaveformClick}
                    className={audioOk ? 'cursor-pointer block' : 'block opacity-60'}
                    aria-label="Waveform — click to seek"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  {audioOk ? (
                    <>
                      <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}
                        className="w-8 h-8 rounded-lg bg-[#4fc3f7]/15 border border-[#4fc3f7]/40 text-[#4fc3f7] flex items-center justify-center hover:bg-[#4fc3f7]/25 transition-colors">
                        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <button type="button" onClick={() => seekBy(-5)} aria-label="Back 5 seconds"
                        className="w-8 h-8 rounded-lg border border-white/10 text-[#8b95a8] flex items-center justify-center hover:text-[#c8d0e0] hover:border-white/20 transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => seekBy(5)} aria-label="Forward 5 seconds"
                        className="w-8 h-8 rounded-lg border border-white/10 text-[#8b95a8] flex items-center justify-center hover:text-[#c8d0e0] hover:border-white/20 transition-colors">
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-mono text-[#8b95a8] tabular-nums">
                        {fmtTime(currentTime)} <span className="text-[#5a6478]">/ {fmtTime(transcript.durationSec)}</span>
                      </span>
                      <label className="ml-auto flex items-center gap-1.5 text-[10px] text-[#5a6478]">
                        <input
                          type="checkbox"
                          checked={follow}
                          onChange={(e) => setFollow(e.target.checked)}
                          className="accent-[#4fc3f7] w-3 h-3"
                        />
                        follow playback
                      </label>
                      <select
                        value={rate}
                        onChange={(e) => {
                          const r = Number.parseFloat(e.target.value) || 1;
                          setRate(r);
                          if (audioRef.current) audioRef.current.playbackRate = r;
                        }}
                        aria-label="Playback speed"
                        className="bg-[#141926] border border-white/10 rounded-md text-[10px] text-[#8b95a8] px-1.5 py-1"
                      >
                        {[0.75, 1, 1.25, 1.5, 2].map((r) => (
                          <option key={r} value={r}>{r === 1 ? '1×' : `${r}×`}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <p className="text-[10px] text-[#5a6478] flex items-center gap-1.5 py-1">
                      {audioOk === null ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                      {audioOk === false
                        ? 'Original audio was not retained (uploaded before this upgrade) — timestamps are shown without playback.'
                        : 'Checking for audio…'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Search + view switch */}
            {transcript && (
              <div className="flex items-center gap-2 px-5 pt-3 shrink-0 flex-wrap">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-[#5a6478] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setMatchIdx(0); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); jumpMatch(e.shiftKey ? -1 : 1); } }}
                    placeholder="Search the transcript…"
                    className="w-full pl-8 pr-20 py-1.5 rounded-lg bg-[#0f1320] border border-white/10 text-[11px] text-[#c8d0e0] placeholder:text-[#5a6478] focus:border-[#4fc3f7]/40 focus:outline-none"
                  />
                  {query.trim() && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <span className="text-[10px] text-[#5a6478] tabular-nums">
                        {matches.length === 0 ? '0' : `${((matchIdx % Math.max(1, matches.length)) + 1)}/${matches.length}`}
                      </span>
                      <button type="button" aria-label="Previous match" onClick={() => jumpMatch(-1)}
                        className="w-5 h-5 rounded border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] flex items-center justify-center">
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button type="button" aria-label="Next match" onClick={() => jumpMatch(1)}
                        className="w-5 h-5 rounded border border-white/10 text-[#8b95a8] hover:text-[#c8d0e0] flex items-center justify-center">
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  {(['sentences', 'paragraphs', 'raw'] as const).map((m) => (
                    <button key={m} type="button" onClick={() => setMode(m)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold capitalize transition-colors ${
                        mode === m
                          ? 'bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7]'
                          : 'border border-transparent text-[#5a6478] hover:text-[#8b95a8]'
                      }`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Transcript area */}
            {transcript ? (
              <div ref={listRef} className="px-5 py-3 overflow-y-auto flex-1 min-h-0 space-y-1">
                {mode === 'sentences' && transcript.sentences.map((sen) => {
                  const isActive = sen.id === activeSentenceId;
                  const isMatch = query.trim() && matches.includes(sen.id);
                  const isCurrentMatch = query.trim() && matches.length > 0 && matches[matchIdx % matches.length] === sen.id;
                  return (
                    <button
                      key={sen.id}
                      data-sid={sen.id}
                      type="button"
                      onClick={() => { seekTo(sen.start); lastActiveRef.current = sen.id; }}
                      className={`w-full text-left flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors ${
                        isCurrentMatch
                          ? 'bg-[#4fc3f7]/15 border border-[#4fc3f7]/40'
                          : isActive
                            ? 'bg-[#4fc3f7]/[0.08] border border-[#4fc3f7]/25'
                            : isMatch
                              ? 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06]'
                              : 'border border-transparent hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className={`shrink-0 font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded-md border ${
                        isActive
                          ? 'text-[#4fc3f7] bg-[#4fc3f7]/10 border-[#4fc3f7]/30'
                          : 'text-[#5a6478] bg-white/[0.03] border-white/[0.06]'
                      }`}>
                        {fmtTime(sen.start)}
                      </span>
                      <span className={`text-[12px] leading-relaxed ${
                        isActive ? 'text-[#e8f4ff]' : 'text-[#a8b3c5]'
                      }`}>
                        {highlight(sen.text)}
                      </span>
                    </button>
                  );
                })}

                {mode === 'paragraphs' && transcript.paragraphs.map((p, pi) => {
                  const sentences = transcript.sentences.slice(p.from, p.to + 1);
                  const pStart = sentences[0]?.start ?? 0;
                  const pEnd = sentences[sentences.length - 1]?.end ?? 0;
                  const isActive = currentTime >= pStart && currentTime <= pEnd + 1;
                  return (
                    <button
                      key={pi}
                      data-sid={p.from}
                      type="button"
                      onClick={() => { seekTo(pStart); lastActiveRef.current = p.from; }}
                      className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors border ${
                        isActive
                          ? 'bg-[#4fc3f7]/[0.08] border-[#4fc3f7]/25'
                          : 'border-transparent hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className={`inline-block font-mono text-[10px] tabular-nums mb-1 px-1.5 py-0.5 rounded-md border ${
                        isActive
                          ? 'text-[#4fc3f7] bg-[#4fc3f7]/10 border-[#4fc3f7]/30'
                          : 'text-[#5a6478] bg-white/[0.03] border-white/[0.06]'
                      }`}>
                        {fmtTime(pStart)}
                      </span>
                      <p className="text-[12px] leading-relaxed text-[#a8b3c5]">
                        {highlight(sentences.map((x) => x.text).join(' '))}
                      </p>
                    </button>
                  );
                })}

                {mode === 'raw' && (
                  <pre className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#8b95a8] font-normal rounded-xl border border-white/[0.06] bg-[#0f1320] p-4">
                    {detail.content}
                  </pre>
                )}
              </div>
            ) : (
              <div className="px-5 py-3 overflow-y-auto flex-1 min-h-0">
                <div className="rounded-xl border border-white/[0.06] bg-[#0f1320] p-4">
                  <p className="text-[10px] text-[#5a6478] uppercase tracking-widest mb-2">
                    {s.meta?.transcription || s.meta?.ocr || s.fileKind === 'audio' || s.fileKind === 'video' ? 'transcript' : 'extracted text'}
                  </p>
                  <pre className="whitespace-pre-wrap break-words text-[11px] leading-relaxed text-[#a8b3c5] font-normal max-h-[52vh] overflow-y-auto">
                    {detail.content}
                  </pre>
                </div>
                {(s.fileKind === 'audio' || s.meta?.fileKind === 'audio') && s.status === 'ready' && (
                  <p className="text-[10px] text-[#5a6478] mt-2 flex items-start gap-1.5">
                    <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                    Uploaded before the advanced transcription upgrade — re-upload the file to unlock the interactive studio (waveform, synced playback, sentence search, exports).
                  </p>
                )}
              </div>
            )}

            {/* Export footer */}
            {transcript && (
              <div className="px-5 py-3 border-t border-white/[0.08] flex items-center gap-2 flex-wrap shrink-0">
                <span className="text-[10px] text-[#5a6478] uppercase tracking-widest flex items-center gap-1">
                  <Download className="w-3 h-3" /> Export
                </span>
                <button type="button" onClick={copyTxt}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-white/10 text-[10px] text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/20 transition-colors">
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                {(['txt', 'srt', 'vtt', 'json'] as const).map((k) => (
                  <button key={k} type="button" onClick={() => exportAs(k)}
                    className="px-2.5 py-1.5 rounded-md border border-white/10 text-[10px] uppercase text-[#8b95a8] hover:text-[#c8d0e0] hover:border-white/20 transition-colors">
                    .{k}
                  </button>
                ))}
                <span className="ml-auto text-[10px] text-[#5a6478] hidden sm:inline">
                  Space play/pause · ←/→ ±5s · Enter next match
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
