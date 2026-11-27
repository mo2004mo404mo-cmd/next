'use client';

/**
 * Question media components — the enhanced media layer for agent-generated
 * questions:
 *
 *   - LabPanelTable      — styled laboratory panel tables (H/L flags)
 *   - EcgStrip           — ECG rhythm strip frame + interactive wave hotspots
 *   - HotspotImage       — question image with clickable structure pins
 *   - StructureTagChips  — clickable structure chips beside 3D models
 *   - WaveformAudioPlayer— waveform visualizer + 0.5×–2× speed + phonocardiogram
 *                           synced to playback (murmur timing)
 *   - ConfidenceBar      — metacognition prompt before the answer is revealed
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Activity, Play, Pause, Gauge, Stethoscope, HelpCircle, CheckCircle2, X, MousePointerClick } from 'lucide-react';

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export interface Hotspot {
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface StructureTag {
  letter: string;
  name: string;
}

export interface PcgSpec {
  phase: 'systolic' | 'diastolic' | 'holosystolic' | 'continuous';
  shape: 'crescendo-decrescendo' | 'plateau' | 'decrescendo' | 'musical';
  s1?: boolean;
  s2?: boolean;
  bestHeard?: string;
}

export interface LabRow {
  test: string;
  value: string;
  unit: string;
  flag: string; // 'H' | 'L' | ''
}

export interface LabPanelData {
  name: string;
  rows: LabRow[];
}

/** Safely parse a JSON string field of the question record. */
export function parseQuestionJson<T>(raw: string | undefined | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Lab panel table
// ---------------------------------------------------------------------------

export function LabPanelTable({ panels }: { panels: LabPanelData[] }) {
  if (!panels.length) return null;
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {panels.map((panel, pi) => (
        <div
          key={pi}
          className="rounded-xl border border-white/[0.08] bg-[#0f1118]/70 overflow-hidden"
        >
          <div className="px-3.5 py-2.5 border-b border-white/[0.06] flex items-center gap-2 bg-white/[0.02]">
            <Activity className="w-3.5 h-3.5 text-[#4fc3f7]" />
            <span className="text-[11px] font-bold text-[#7cc7ff] uppercase tracking-wider">{panel.name}</span>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-[#5a6478] text-[10px] uppercase tracking-wider">
                <th className="text-left font-semibold px-3.5 pt-2 pb-1">Test</th>
                <th className="text-right font-semibold px-2 pt-2 pb-1">Result</th>
                <th className="text-left font-semibold px-2 pt-2 pb-1 w-14">Units</th>
                <th className="text-center font-semibold px-3 pt-2 pb-1 w-10">Flag</th>
              </tr>
            </thead>
            <tbody>
              {panel.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="px-3.5 py-1.5 text-[#e8ecf4] font-medium">{row.test}</td>
                  <td className="px-2 py-1.5 text-right font-mono font-bold text-[#e8ecf4]">{row.value}</td>
                  <td className="px-2 py-1.5 text-[#8b95a8]">{row.unit}</td>
                  <td className="px-3 py-1.5 text-center">
                    {row.flag === 'H' ? (
                      <span className="inline-block px-1.5 py-0.5 rounded-md bg-[#ff5757]/[0.15] text-[#ff8a8a] text-[10px] font-bold">H</span>
                    ) : row.flag === 'L' ? (
                      <span className="inline-block px-1.5 py-0.5 rounded-md bg-[#4fc3f7]/[0.15] text-[#7cc7ff] text-[10px] font-bold">L</span>
                    ) : (
                      <span className="text-[#3a4055] text-[10px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ECG rhythm strip + interactive wave hotspots
// ---------------------------------------------------------------------------

interface EcgStripProps {
  url: string;
  hotspots?: Hotspot[];
  selectedAnswer?: string | null;
  revealed?: boolean;
  isCorrectOption?: (label: string) => boolean;
  onSelect?: (label: string) => void;
}

export function EcgStrip({ url, hotspots, selectedAnswer, revealed, isCorrectOption, onSelect }: EcgStripProps) {
  const pins = hotspots || [];
  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50">
      <div className="px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
        <Activity className="w-4 h-4 text-[#ff8a8a]" />
        <span className="text-xs font-bold text-[#ff8a8a]">ECG · Lead II rhythm strip</span>
        {pins.length > 0 && !revealed && (
          <span className="ml-auto flex items-center gap-1 text-[10px] text-[#5a6478]">
            <MousePointerClick className="w-3 h-3" />
            click a wave to answer
          </span>
        )}
      </div>
      <div className="relative bg-white">
        <img src={url} alt="ECG rhythm strip" className="w-full max-w-full block" />
        {pins.map((pin, i) => {
          const isSelected = selectedAnswer != null && pin.label.trim().toLowerCase() === String(selectedAnswer).trim().toLowerCase();
          const isCorrect = revealed && isCorrectOption ? isCorrectOption(pin.label) : false;
          const isWrongPick = revealed && isSelected && !isCorrect;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect?.(pin.label)}
              disabled={revealed}
              title={pin.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <span
                className={[
                  'flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border-2 transition-all',
                  isCorrect
                    ? 'bg-[#00e5a0] border-[#00e5a0] text-[#06251a] scale-110 shadow-[0_0_12px_rgba(0,229,160,0.6)]'
                    : isWrongPick
                      ? 'bg-[#ff5757] border-[#ff5757] text-white scale-110'
                      : isSelected
                        ? 'bg-[#4fc3f7] border-[#4fc3f7] text-[#0a1a24] scale-110'
                        : revealed
                          ? 'bg-white/70 border-[#8b95a8] text-[#3a4055]'
                          : 'bg-white/85 border-[#3a4055] text-[#0b1220] hover:border-[#4fc3f7] hover:bg-[#4fc3f7] hover:text-[#0a1a24] cursor-pointer hover:scale-110',
                ].join(' ')}
              >
                {pin.label.charAt(0)}
              </span>
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5 whitespace-nowrap text-[9px] font-semibold text-[#3a4055] bg-white/85 px-1 py-0.5 rounded group-hover:bg-[#e6f6ff] pointer-events-none">
                {pin.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Question image with clickable structure pins
// ---------------------------------------------------------------------------

interface HotspotImageProps {
  url: string;
  alt: string;
  hotspots?: Hotspot[];
  selectedAnswer?: string | null;
  revealed?: boolean;
  isCorrectOption?: (label: string) => boolean;
  onSelect?: (label: string) => void;
}

export function HotspotImage({ url, alt, hotspots, selectedAnswer, revealed, isCorrectOption, onSelect }: HotspotImageProps) {
  const pins = hotspots || [];
  return (
    <div className="relative mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0f1118]/50">
      <img src={url} alt={alt} className="w-full max-w-full block" style={{ maxHeight: 420, objectFit: 'contain' }} />
      {pins.map((pin, i) => {
        const isSelected = selectedAnswer != null && pin.label.trim().toLowerCase() === String(selectedAnswer).trim().toLowerCase();
        const isCorrect = revealed && isCorrectOption ? isCorrectOption(pin.label) : false;
        const isWrongPick = revealed && isSelected && !isCorrect;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect?.(pin.label)}
            disabled={revealed}
            title={pin.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span
              className={[
                'flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-[10px] font-bold border-2 transition-all backdrop-blur-sm',
                isCorrect
                  ? 'bg-[#00e5a0] border-[#00e5a0] text-[#06251a] shadow-[0_0_12px_rgba(0,229,160,0.6)]'
                  : isWrongPick
                    ? 'bg-[#ff5757] border-[#ff5757] text-white'
                    : isSelected
                      ? 'bg-[#4fc3f7] border-[#4fc3f7] text-[#0a1a24]'
                      : revealed
                        ? 'bg-black/60 border-white/40 text-white'
                        : 'bg-black/60 border-white/70 text-white hover:bg-[#4fc3f7] hover:border-[#4fc3f7] cursor-pointer',
              ].join(' ')}
            >
              {pin.label.length > 14 ? `${pin.label.slice(0, 13)}…` : pin.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3D model structure chips
// ---------------------------------------------------------------------------

interface StructureTagChipsProps {
  tags: StructureTag[];
  selectedAnswer?: string | null;
  revealed?: boolean;
  isCorrectOption?: (label: string) => boolean;
  onSelect?: (label: string) => void;
}

export function StructureTagChips({ tags, selectedAnswer, revealed, isCorrectOption, onSelect }: StructureTagChipsProps) {
  if (!tags.length) return null;
  return (
    <div className="px-4 py-3 border-t border-white/[0.06]">
      <p className="text-[10px] text-[#5a6478] mb-2 flex items-center gap-1.5">
        <MousePointerClick className="w-3 h-3" />
        Click a structure to identify it — drag the model to explore first
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => {
          const isSelected = selectedAnswer != null && tag.name.trim().toLowerCase() === String(selectedAnswer).trim().toLowerCase();
          const isCorrect = revealed && isCorrectOption ? isCorrectOption(tag.name) : false;
          const isWrongPick = revealed && isSelected && !isCorrect;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect?.(tag.name)}
              disabled={revealed}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold border transition-all',
                isCorrect
                  ? 'bg-[#00e5a0]/[0.15] border-[#00e5a0]/50 text-[#00e5a0]'
                  : isWrongPick
                    ? 'bg-[#ff5757]/[0.12] border-[#ff5757]/40 text-[#ff8a8a]'
                    : isSelected
                      ? 'bg-[#4fc3f7]/[0.12] border-[#4fc3f7]/50 text-[#7cc7ff]'
                      : revealed
                        ? 'bg-white/[0.03] border-white/[0.06] text-[#5a6478]'
                        : 'bg-white/[0.04] border-white/[0.08] text-[#e8ecf4] hover:border-[#00e5a0]/40 hover:text-[#00e5a0] cursor-pointer',
              ].join(' ')}
            >
              <span className={`w-4.5 h-4.5 w-[18px] h-[18px] flex items-center justify-center rounded-md text-[9px] font-bold ${
                isCorrect ? 'bg-[#00e5a0]/20 text-[#00e5a0]' : 'bg-white/[0.06] text-[#8b95a8]'
              }`}>
                {tag.letter}
              </span>
              {tag.name}
              {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5a0]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Phonocardiogram — cardiac cycle diagram synced to audio playback
// ---------------------------------------------------------------------------

const PHASE_BOUNDS: Record<string, [number, number]> = {
  systolic: [0.08, 0.34],
  holosystolic: [0.05, 0.35],
  diastolic: [0.44, 0.94],
  continuous: [0.05, 0.94],
};

function murmurAmplitude(shape: string, t: number): number {
  // t in [0,1] across the murmur envelope
  switch (shape) {
    case 'plateau':
      return Math.min(1, t * 14, (1 - t) * 14) * 0.85;
    case 'decrescendo':
      return Math.pow(1 - t, 1.4) * 0.95;
    case 'musical':
      return (0.4 + 0.28 * Math.sin(t * 46)) * Math.sin(Math.PI * Math.min(1, Math.max(0, t * 8))) * 0.8;
    case 'crescendo-decrescendo':
    default:
      return Math.sin(Math.PI * t) * 0.95;
  }
}

interface PhonocardiogramProps {
  spec: PcgSpec;
  /** Current playback position in seconds. */
  currentTime: number;
  /** Total audio duration in seconds. */
  duration: number;
  /** Whether audio is currently playing (drives the playhead animation). */
  playing: boolean;
}

export function Phonocardiogram({ spec, currentTime, duration, playing }: PhonocardiogramProps) {
  const W = 600;
  const H = 132;
  const BASE = 84; // baseline y of the trace
  const AMP = 46; // max murmur amplitude px

  const bounds = PHASE_BOUNDS[spec.phase] || PHASE_BOUNDS.systolic;
  const [x0, x1] = bounds;

  // Murmur trace points
  const murmurPts: string[] = [];
  const N = 60;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = (x0 + (x1 - x0) * t) * W;
    const amp = murmurAmplitude(spec.shape, t);
    // oscillating fine structure (frequency ~ 4 cycles per envelope quarter)
    const osc = Math.sin(t * Math.PI * 24) * 0.18 + 1;
    const y = BASE - amp * AMP * osc * 0.55;
    murmurPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // Heart sound spikes: S1 at 0.04, S2 at 0.38
  const s1x = 0.04 * W;
  const s2x = 0.38 * W;
  const spike = (x: number, h: number, w: number) =>
    `M ${(x - w).toFixed(1)} ${BASE} L ${x.toFixed(1)} ${(BASE - h).toFixed(1)} L ${(x + w).toFixed(1)} ${BASE}`;

  // Playhead: sweeps one cardiac cycle per beat; cycle derived from the audio's
  // implied heart rate (~0.8s per beat at rest).
  const beats = Math.max(1, Math.round((duration || 4) / 0.8));
  const cycleDur = (duration || 4) / beats;
  const cyclePos = ((currentTime || 0) % cycleDur) / cycleDur;
  const playheadX = cyclePos * W;
  const inMurmur = cyclePos >= x0 && cyclePos <= x1;

  const phaseLabel =
    spec.phase === 'systolic' ? 'SYSTOLIC' :
    spec.phase === 'holosystolic' ? 'HOLOSYSTOLIC' :
    spec.phase === 'diastolic' ? 'DIASTOLIC' : 'CONTINUOUS';

  return (
    <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#0f1118]/70 overflow-hidden">
      <div className="px-3.5 py-2 flex items-center gap-2 border-b border-white/[0.06]">
        <Stethoscope className="w-3.5 h-3.5 text-[#ff8a8a]" />
        <span className="text-[11px] font-bold text-[#ff8a8a] uppercase tracking-wider">Phonocardiogram</span>
        <span
          className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
            playing && inMurmur ? 'bg-[#ff5757]/20 text-[#ff8a8a] animate-pulse' : 'bg-white/[0.04] text-[#5a6478]'
          }`}
        >
          {phaseLabel} murmur
        </span>
      </div>
      <div className="px-2 py-1">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ background: '#0b0e15' }}>
          {/* phase bands */}
          <rect x={0} y={0} width={s1x} height={BASE + 8} fill="rgba(255,255,255,0.015)" />
          <rect x={s1x} y={0} width={s2x - s1x} height={BASE + 8} fill="rgba(255,138,138,0.05)" />
          <rect x={s2x} y={0} width={W - s2x} height={BASE + 8} fill="rgba(79,195,247,0.04)" />

          {/* baseline */}
          <line x1={0} y1={BASE} x2={W} y2={BASE} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

          {/* S1 / S2 spikes */}
          {spec.s1 !== false && (
            <path d={spike(s1x, 30, 4)} fill="none" stroke="#ff8a8a" strokeWidth={2.2} strokeLinejoin="round" />
          )}
          {spec.s2 !== false && (
            <path d={spike(s2x, 22, 4)} fill="none" stroke="#ff8a8a" strokeWidth={2.2} strokeLinejoin="round" />
          )}

          {/* murmur envelope */}
          <polyline
            points={murmurPts.join(' ')}
            fill="none"
            stroke={inMurmur && playing ? '#ff5757' : 'rgba(255,87,87,0.55)'}
            strokeWidth={inMurmur && playing ? 2.2 : 1.6}
            strokeLinejoin="round"
          />
          <polygon
            points={`${(x0 * W).toFixed(1)},${BASE} ${murmurPts.join(' ')} ${(x1 * W).toFixed(1)},${BASE}`}
            fill={inMurmur && playing ? 'rgba(255,87,87,0.16)' : 'rgba(255,87,87,0.07)'}
          />

          {/* playhead */}
          {playing && (
            <line x1={playheadX} y1={6} x2={playheadX} y2={BASE + 8} stroke="#00e5a0" strokeWidth={1.6} opacity={0.9}>
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.8s" repeatCount="indefinite" />
            </line>
          )}

          {/* labels */}
          <text x={s1x} y={BASE + 20} textAnchor="middle" fontSize={10} fontWeight={700} fill="#ff8a8a">S1</text>
          <text x={(s1x + s2x) / 2} y={BASE + 20} textAnchor="middle" fontSize={9} letterSpacing={2} fill="#8b95a8">SYSTOLE</text>
          <text x={s2x} y={BASE + 20} textAnchor="middle" fontSize={10} fontWeight={700} fill="#ff8a8a">S2</text>
          <text x={(s2x + W) / 2} y={BASE + 20} textAnchor="middle" fontSize={9} letterSpacing={2} fill="#8b95a8">DIASTOLE</text>
          <text x={8} y={16} fontSize={9} fill="#5a6478">
            one cardiac cycle {spec.bestHeard ? `· best heard: ${spec.bestHeard}` : ''}
          </text>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Waveform audio player — waveform + speed + phonocardiogram sync
// ---------------------------------------------------------------------------

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

interface WaveformAudioPlayerProps {
  src: string;
  pcgSpec?: PcgSpec | null;
  title?: string;
}

export function WaveformAudioPlayer({ src, pcgSpec, title }: WaveformAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [peaks, setPeaks] = useState<number[] | null>(null);
  const [peaksFailed, setPeaksFailed] = useState(false);

  // Decode the audio buffer into peak amplitudes for the waveform
  useEffect(() => {
    let cancelled = false;
    let ctx: AudioContext | null = null;
    (async () => {
      try {
        const res = await fetch(src);
        const buf = await res.arrayBuffer();
        const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctx = new AudioCtor();
        const decoded = await ctx.decodeAudioData(buf.slice(0));
        const ch = decoded.getChannelData(0);
        const BARS = 110;
        const step = Math.floor(ch.length / BARS) || 1;
        const p: number[] = [];
        for (let i = 0; i < BARS; i++) {
          let max = 0;
          // sparse sampling keeps this fast for long files
          for (let j = 0; j < step; j += Math.max(1, Math.floor(step / 220))) {
            const v = Math.abs(ch[i * step + j] || 0);
            if (v > max) max = v;
          }
          p.push(max);
        }
        ctx.close().catch(() => {});
        if (!cancelled) setPeaks(p);
      } catch {
        if (!cancelled) setPeaksFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      ctx?.close().catch(() => {});
    };
  }, [src]);

  // Normalize peaks to 0..1
  const normalizedPeaks = peaks
    ? (() => {
        const max = Math.max(...peaks, 0.01);
        return peaks.map((p) => p / max);
      })()
    : null;

  // Draw waveform with progress
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx2d.clearRect(0, 0, w, h);

    const p = normalizedPeaks;
    const progress = duration > 0 ? current / duration : 0;
    const BARS = 110;
    const gap = 2;
    const barW = (w - gap * (BARS - 1)) / BARS;
    const midY = h / 2;

    for (let i = 0; i < BARS; i++) {
      const amp = p ? Math.max(0.06, p[i]) : Math.abs(Math.sin(i * 0.35) * 0.5) + 0.08; // placeholder bars while decoding
      const barH = amp * (h * 0.86);
      const x = i * (barW + gap);
      const played = i / BARS <= progress;
      if (played) {
        const grad = ctx2d.createLinearGradient(0, midY - barH / 2, 0, midY + barH / 2);
        grad.addColorStop(0, '#00e5a0');
        grad.addColorStop(1, 'rgba(0,229,160,0.45)');
        ctx2d.fillStyle = grad;
      } else {
        ctx2d.fillStyle = 'rgba(139,149,168,0.35)';
      }
      const r = Math.min(barW / 2, 1.5);
      ctx2d.beginPath();
      ctx2d.roundRect(x, midY - barH / 2, barW, barH, r);
      ctx2d.fill();
    }

    // progress playhead
    if (duration > 0) {
      const px = progress * w;
      ctx2d.fillStyle = '#00e5a0';
      ctx2d.beginPath();
      ctx2d.arc(px, midY, 3, 0, Math.PI * 2);
      ctx2d.fill();
    }
  }, [normalizedPeaks, current, duration]);

  useEffect(() => {
    draw();
  }, [draw]);

  // rAF loop for smooth progress + PCG sync while playing
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }
    const tick = () => {
      const a = audioRef.current;
      if (a) setCurrent(a.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [playing]);

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const a = audioRef.current;
    const canvas = canvasRef.current;
    if (!a || !canvas || !duration) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * duration;
    setCurrent(ratio * duration);
  }, [duration]);

  const changeSpeed = useCallback((s: number) => {
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
  }, []);

  const fmt = (t: number) => {
    if (!Number.isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#0f1118]/50 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0">
          <Stethoscope className="w-5 h-5 text-[#8b5cf6]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#e8ecf4] flex items-center gap-1.5">
            {title || 'Listen to the audio, then answer'}
          </p>
          <p className="text-[10px] text-[#5a6478]">
            {playing ? 'Playing' : peaks ? 'Ready' : 'Loading waveform…'}
            {pcgSpec ? ' · phonocardiogram below tracks the cardiac cycle' : ''}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="w-11 h-11 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#b388ff] flex items-center justify-center hover:bg-[#8b5cf6]/25 hover:border-[#8b5cf6]/50 transition-all flex-shrink-0"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        <canvas
          ref={canvasRef}
          onClick={seek}
          className="flex-1 h-14 rounded-lg cursor-pointer min-w-0"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        />
        <span className="text-[10px] font-mono text-[#8b95a8] tabular-nums flex-shrink-0 w-20 text-right">
          {fmt(current)} / {fmt(duration)}
        </span>
      </div>

      {/* speed control */}
      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
        <Gauge className="w-3.5 h-3.5 text-[#5a6478] mr-0.5" />
        {SPEEDS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => changeSpeed(s)}
            className={[
              'px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all',
              speed === s
                ? 'bg-[#8b5cf6]/[0.15] border-[#8b5cf6]/40 text-[#b388ff]'
                : 'bg-white/[0.03] border-white/[0.06] text-[#5a6478] hover:text-[#b388ff] hover:border-[#8b5cf6]/30',
            ].join(' ')}
          >
            {s}×
          </button>
        ))}
        {peaksFailed && <span className="text-[10px] text-[#5a6478] ml-1">waveform unavailable for this source</span>}
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => { if (!playing) setCurrent(e.currentTarget.currentTime); }}
        className="hidden"
      />

      {pcgSpec && (
        <Phonocardiogram spec={pcgSpec} currentTime={current} duration={duration} playing={playing} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Confidence rating bar — metacognition prompt before reveal
// ---------------------------------------------------------------------------

export type ConfidenceLevel = 'sure' | 'probably' | 'guessing';

interface ConfidenceBarProps {
  onChoose: (level: ConfidenceLevel) => void;
  onSkip: () => void;
  disabled?: boolean;
}

const CONFIDENCE_OPTIONS: Array<{ level: ConfidenceLevel; label: string; hint: string; icon: typeof CheckCircle2; color: string; bg: string; border: string }> = [
  { level: 'sure', label: "I'm sure", hint: 'committed answer', icon: CheckCircle2, color: '#00e5a0', bg: 'rgba(0,229,160,0.08)', border: 'rgba(0,229,160,0.25)' },
  { level: 'probably', label: 'Probably', hint: 'leaning answer', icon: HelpCircle, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  { level: 'guessing', label: 'Guessing', hint: 'uncertain answer', icon: X, color: '#ff8a8a', bg: 'rgba(255,87,87,0.08)', border: 'rgba(255,87,87,0.25)' },
];

export function ConfidenceBar({ onChoose, onSkip, disabled }: ConfidenceBarProps) {
  return (
    <div className="mb-3 rounded-xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.05] p-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-[11px] font-bold text-[#b388ff] mb-2.5 flex items-center gap-1.5">
        🧠 Before the reveal — how confident are you?
        <span className="ml-1 text-[9px] font-medium text-[#5a6478] normal-case">rating your confidence strengthens memory</span>
      </p>
      <div className="flex gap-2 flex-wrap items-center">
        {CONFIDENCE_OPTIONS.map((opt) => (
          <button
            key={opt.level}
            type="button"
            disabled={disabled}
            onClick={() => onChoose(opt.level)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11.5px] font-bold border transition-all hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: opt.bg, borderColor: opt.border, color: opt.color }}
          >
            <opt.icon className="w-3.5 h-3.5" />
            {opt.label}
            <span className="text-[9px] font-medium opacity-60">{opt.hint}</span>
          </button>
        ))}
        <button
          type="button"
          disabled={disabled}
          onClick={onSkip}
          className="ml-auto text-[10.5px] text-[#5a6478] hover:text-[#8b95a8] underline underline-offset-2 disabled:opacity-50 cursor-pointer"
        >
          skip &amp; reveal
        </button>
      </div>
    </div>
  );
}
