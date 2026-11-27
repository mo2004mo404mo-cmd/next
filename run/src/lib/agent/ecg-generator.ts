/**
 * ECG Rhythm Strip Generator
 *
 * Renders clinically-accurate ECG rhythm strips as SVG (standard ECG paper:
 * 25 mm/s, 10 mm/mV, pink minor / red major grid) so the agent pipeline can
 * embed crisp, printable, license-free ECGs in questions.
 *
 * Supported rhythms: normal sinus, sinus tachy/brady, atrial fibrillation,
 * atrial flutter, AV block 1° / Mobitz-I / Mobitz-II / complete (3°), SVT,
 * VT, VF, asystole, LBBB, hyperkalemia, STEMI (ST elevation), sinus w/ ST
 * depression. The beat morphology is parameterized (P/PR/QRS/ST/T) and RR
 * intervals can be irregular (AF) or patterned (blocks).
 *
 * Also emits REGION metadata (P wave / QRS / T wave / ST segment / PR
 * interval) as percentage coordinates — used by QuestionCard to render
 * interactive "click on the wave" hotspots that map to answer options.
 */

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EcgSpec {
  rhythm: string;
  rate?: number;
  findings?: string[];
  caption?: string;
}

export interface EcgRegion {
  label: string;
  /** Percentage of the SVG width/height (0-100) for a clickable hotspot pin. */
  x: number;
  y: number;
}

export interface EcgResult {
  svg: string;
  regions: EcgRegion[];
}

// ---------------------------------------------------------------------------
// Geometry constants (half-scale paper: 1s = 125px, 1mV = 50px)
// ---------------------------------------------------------------------------

const PX_PER_MS = 0.125; // 125 px per second
const PX_PER_MV = 50;
const SECONDS_PER_ROW = 8;
const ROWS = 2;
const W = SECONDS_PER_ROW * 1000 * PX_PER_MS; // 1000 px per row
const VIEW_W = W;
const ROW_H = 3 * PX_PER_MV; // 3 mV per row
const VIEW_H = ROWS * ROW_H + 46; // + caption strip
const BASELINE_MV = 0.0; // lead II baseline

/** Morphology of ONE beat, all in ms / mV. */
interface BeatMorph {
  pAmp: number; // P amplitude (mV); 0 = absent
  prMs: number; // PR interval (P start → Q start)
  qAmp: number; // Q depth (negative mV)
  qrsMs: number; // QRS duration
  rAmp: number; // R amplitude (mV)
  sAmp: number; // S depth (mV)
  stShift: number; // ST segment shift (mV)
  tAmp: number; // T amplitude (mV); 0 = absent
  tMs: number; // T wave duration
  /** Extra slurring width for bundle-branch-style QRS (ms). */
  slurMs?: number;
}

const NORMAL_BEAT: BeatMorph = {
  pAmp: 0.15, prMs: 160, qAmp: 0.08, qrsMs: 80, rAmp: 1.0, sAmp: 0.2,
  stShift: 0, tAmp: 0.3, tMs: 160,
};

/** Rhythm template: beat morphology + RR pattern generator. */
interface RhythmTemplate {
  label: string;
  defaults: Partial<BeatMorph>;
  /** Returns the RR interval (ms) before beat i, or null to DROP the beat (no QRS). */
  rr?: (i: number, rate: number, seed: number) => number | null;
  /** Baseline wiggle between beats (F waves / fibrillatory waves), as px offsets. */
  baseline?: (xMs: number, seed: number) => number;
  noP?: boolean;
  fixedRate?: number;
}

function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RHYTHMS: Record<string, RhythmTemplate> = {
  'normal-sinus': { label: 'Sinus rhythm', defaults: {} },
  'sinus-tachycardia': { label: 'Sinus tachycardia', defaults: {} },
  'sinus-bradycardia': { label: 'Sinus bradycardia', defaults: {} },
  'sinus-st-depression': { label: 'Sinus rhythm with ST depression', defaults: { stShift: -0.15 } },
  'atrial-fibrillation': {
    label: 'Atrial fibrillation',
    defaults: { pAmp: 0 },
    noP: true,
    rr: (_i, _rate, seed) => {
      const rnd = mulberry(seed + _i * 31)();
      return 360 + rnd * 520; // irregularly irregular 60-160 effective
    },
    baseline: (xMs, seed) => {
      const rnd = mulberry(seed + Math.floor(xMs / 40))();
      return (rnd - 0.5) * 3.2; // fine fibrillatory oscillation
    },
  },
  'atrial-flutter': {
    label: 'Atrial flutter',
    defaults: { pAmp: 0 },
    noP: true,
    rr: (i) => (i % 2 === 0 ? 400 : 400), // 2:1 conduction
    baseline: (xMs) => {
      // sawtooth flutter waves ~300/min (200 ms period)
      const phase = (xMs % 200) / 200;
      return phase < 0.7 ? phase * 4 : (1 - phase) * 9.3;
    },
  },
  'av-block-1': { label: 'First-degree AV block', defaults: { prMs: 280 } },
  'av-block-2-mobitz1': {
    label: 'Second-degree AV block (Mobitz I / Wenckebach)',
    defaults: {},
    rr: (i) => (i % 4 === 3 ? null : 1), // progressive PR handled below
  },
  'av-block-2-mobitz2': {
    label: 'Second-degree AV block (Mobitz II)',
    defaults: {},
    rr: (i) => (i % 3 === 2 ? null : 800), // constant PR, sudden dropped QRS
  },
  'av-block-3-complete': {
    label: 'Complete (third-degree) AV block',
    defaults: { qrsMs: 140, rAmp: 0.9, sAmp: 0.25, pAmp: 0.12 },
    rr: () => 1500, // wide QRS escape ~40
    baseline: (xMs, seed) => {
      // independent marching P waves at ~75
      const pPhase = (xMs % 800) / 800;
      const rnd = mulberry(seed)();
      if (pPhase > 0.86) return -6 * (1 - rnd * 0.2);
      return 0;
    },
  },
  svt: { label: 'Supraventricular tachycardia', defaults: { pAmp: 0, tAmp: 0.2, prMs: 70 }, fixedRate: 185 },
  vt: { label: 'Ventricular tachycardia', defaults: { pAmp: 0, prMs: 30, qrsMs: 160, rAmp: 1.1, sAmp: 0.9, tAmp: 0 }, fixedRate: 165 },
  vf: { label: 'Ventricular fibrillation', defaults: { pAmp: 0, rAmp: 0, tAmp: 0, qAmp: 0, sAmp: 0 } },
  asystole: { label: 'Asystole', defaults: { pAmp: 0, qAmp: 0, rAmp: 0, sAmp: 0, tAmp: 0 } },
  lbbb: { label: 'Left bundle branch block', defaults: { qAmp: 0, qrsMs: 140, sAmp: 0.05, slurMs: 60, tAmp: -0.25 } },
  hyperkalemia: { label: 'Hyperkalemia changes', defaults: { pAmp: 0.05, qrsMs: 130, tAmp: 0.85, tMs: 130, slurMs: 40, sAmp: 0.3 } },
  stemi: { label: 'ST-elevation (STEMI pattern)', defaults: { stShift: 0.35, tAmp: 0.55, qAmp: 0.04, sAmp: 0.12 } },
};

const RHYTHM_ALIASES: Record<string, string> = {
  sinus: 'normal-sinus', 'sinus-rhythm': 'normal-sinus', nsr: 'normal-sinus',
  'sinus-tach': 'sinus-tachycardia', tachycardia: 'sinus-tachycardia',
  'sinus-brady': 'sinus-bradycardia', bradycardia: 'sinus-bradycardia',
  af: 'atrial-fibrillation', afib: 'atrial-fibrillation', 'atrial-fib': 'atrial-fibrillation',
  flutter: 'atrial-flutter', 'a-flutter': 'atrial-flutter',
  'first-degree-av-block': 'av-block-1', '1st-degree': 'av-block-1', 'av-block-1-degree': 'av-block-1',
  'wenckebach': 'av-block-2-mobitz1', mobitz1: 'av-block-2-mobitz1', 'mobitz-i': 'av-block-2-mobitz1',
  mobitz2: 'av-block-2-mobitz2', 'mobitz-ii': 'av-block-2-mobitz2',
  'complete-heart-block': 'av-block-3-complete', chb: 'av-block-3-complete', 'third-degree': 'av-block-3-complete', '3rd-degree': 'av-block-3-complete',
  'svt': 'svt', 'supraventricular': 'svt',
  'vtach': 'vt', 'ventricular-tachycardia': 'vt',
  'vfib': 'vf', 'ventricular-fibrillation': 'vf', 'v-fib': 'vf',
  'flat-line': 'asystole', 'flatline': 'asystole',
  'stemmi': 'stemi', 'st-elevation': 'stemi', 'st-elev': 'stemi',
  'st-depression': 'sinus-st-depression',
  'lbbb': 'lbbb', 'left-bundle-branch-block': 'lbbb', 'bundle-branch': 'lbbb',
  'hyperkalemia': 'hyperkalemia', 'peaked-t': 'hyperkalemia', 'peaked-t-waves': 'hyperkalemia',
};

function resolveRhythm(rhythm: string): string {
  const key = (rhythm || '').trim().toLowerCase().replace(/\s+/g, '-');
  if (RHYTHMS[key]) return key;
  if (RHYTHM_ALIASES[key]) return RHYTHM_ALIASES[key];
  // Fuzzy: contains match
  for (const alias of Object.keys(RHYTHM_ALIASES)) {
    if (key.includes(alias) || alias.includes(key)) return RHYTHM_ALIASES[alias];
  }
  for (const name of Object.keys(RHYTHMS)) {
    if (key.includes(name) || name.includes(key)) return name;
  }
  return 'normal-sinus';
}

// ---------------------------------------------------------------------------
// Beat path generation
// ---------------------------------------------------------------------------

interface Point { x: number; y: number }

function beatPoints(morph: BeatMorph, startMs: number, dropQrs: boolean): { pts: Point[]; waveMs: number } {
  const pts: Point[] = [];
  const x = (ms: number) => (startMs + ms) * PX_PER_MS;
  const mV = (v: number) => -v * PX_PER_MV; // SVG y grows downward

  const { pAmp, prMs, qAmp, qrsMs, rAmp, sAmp, stShift, tAmp, tMs, slurMs = 0 } = morph;

  // P wave (or PR flat when absent)
  if (pAmp > 0.005) {
    const pStart = 0;
    const pDur = 90;
    for (let t = 0; t <= pDur; t += 10) {
      const s = t / pDur;
      pts.push({ x: x(pStart + t), y: mV(BASELINE_MV + pAmp * Math.sin(Math.PI * s)) });
    }
    pts.push({ x: x(pDur), y: mV(BASELINE_MV) });
  }

  const qStart = prMs;
  if (dropQrs) {
    // Dropped beat: only P + flat baseline (blocks)
    pts.push({ x: x(qStart + 260), y: mV(BASELINE_MV) });
    return { pts, waveMs: qStart + 260 };
  }

  // QRS complex
  const ptsMv: Array<[number, number]> = [];
  // Q dip
  if (qAmp > 0.005) ptsMv.push([qStart, -qAmp]);
  else ptsMv.push([qStart, 0]);
  // R upstroke
  const rPeak = qStart + qrsMs * 0.4;
  ptsMv.push([rPeak, rAmp]);
  // S downstroke (with slur for BBB-style wide complexes)
  const sEnd = qStart + qrsMs + (slurMs || 0);
  ptsMv.push([sEnd, -sAmp]);
  for (const [ms, mv] of ptsMv) pts.push({ x: x(ms), y: mV(BASELINE_MV + mv) });

  // ST segment (shifted)
  const stStart = sEnd + 8;
  const tStart = stStart + 70;
  pts.push({ x: x(stStart), y: mV(BASELINE_MV + stShift) });
  pts.push({ x: x(tStart), y: mV(BASELINE_MV + stShift) });

  // T wave
  if (Math.abs(tAmp) > 0.005) {
    for (let t = 0; t <= tMs; t += 10) {
      const s = t / tMs;
      const sin = Math.sin(Math.PI * s);
      pts.push({ x: x(tStart + t), y: mV(BASELINE_MV + stShift + tAmp * sin) });
    }
  }
  const tEnd = tStart + tMs + 40;
  pts.push({ x: x(tEnd), y: mV(BASELINE_MV) });
  return { pts, waveMs: tEnd };
}

function flatPoints(fromMs: number, toMs: number, baselineFn?: (xMs: number, seed: number) => number, seed = 7): Point[] {
  const pts: Point[] = [];
  for (let t = fromMs; t < toMs; t += 12) {
    const wobble = baselineFn ? baselineFn(t, seed) : 0;
    // Gentle respiration-style baseline wander for realism
    const wander = 1.8 * Math.sin(t / 1700 + seed);
    pts.push({ x: t * PX_PER_MS, y: -(wobble + wander) });
  }
  return pts;
}

// ---------------------------------------------------------------------------
// SVG assembly
// ---------------------------------------------------------------------------

function gridDefs(): string {
  return `
  <defs>
    <pattern id="small" width="5" height="5" patternUnits="userSpaceOnUse">
      <rect width="5" height="5" fill="#ffffff"/>
      <path d="M5 0 L0 0 0 5" fill="none" stroke="#f6c8c8" stroke-width="0.6"/>
    </pattern>
    <pattern id="big" width="25" height="25" patternUnits="userSpaceOnUse">
      <rect width="25" height="25" fill="url(#small)"/>
      <path d="M25 0 L0 0 0 25" fill="none" stroke="#e48b8b" stroke-width="1.1"/>
    </pattern>
  </defs>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderEcgStrip(spec: EcgSpec): EcgResult {
  const key = resolveRhythm(spec.rhythm);
  const tpl = RHYTHMS[key];
  const seed = 41;

  let rate = spec.rate && spec.rate >= 20 && spec.rate <= 300 ? spec.rate : 75;
  if (tpl.fixedRate) rate = tpl.fixedRate;
  if (key === 'sinus-tachycardia' && (!spec.rate || spec.rate < 100)) rate = 125;
  if (key === 'sinus-bradycardia' && (!spec.rate || spec.rate > 60)) rate = 50;
  if (key === 'sinus-st-depression' && !spec.rate) rate = 88;

  const morph: BeatMorph = { ...NORMAL_BEAT, ...tpl.defaults };
  const totalMs = ROWS * SECONDS_PER_ROW * 1000;
  const tracePts: Point[] = [];
  const beatMarkers: Array<{ beatStartMs: number; qrsMs: number; morph: BeatMorph }> = [];

  // VF: full-chaos trace, no beats
  if (key === 'vf') {
    const rnd = mulberry(seed);
    let y = 0;
    for (let t = 0; t < totalMs; t += 8) {
      y += (rnd() - 0.5) * 14;
      y = Math.max(-44, Math.min(44, y));
      tracePts.push({ x: t * PX_PER_MS, y: y - 0 });
    }
  } else if (key === 'asystole') {
    // Flat line across both rows — dense points so the row-splitting logic
    // keeps a full polyline segment per row (a single 2-point line would be
    // split at the row boundary and both halves dropped).
    for (let t = 0; t <= totalMs; t += 100) {
      tracePts.push({ x: t * PX_PER_MS, y: 0 });
    }
  } else {
    let t = 200; // small initial offset
    let beatIndex = 0;
    let wenckebachPr = 160;
    while (t < totalMs - 600) {
      const rrRaw = tpl.rr ? tpl.rr(beatIndex, rate, seed) : 60000 / rate;
      if (rrRaw === null) {
        // Dropped QRS: emit P + flat, then continue
        const beatMorph: BeatMorph = { ...morph };
        if (key === 'av-block-2-mobitz1') { /* PR would have lengthened; P only */ }
        const { pts, waveMs } = beatPoints(beatMorph, t, true);
        for (const p of pts) tracePts.push(shift(p, 0, 0));
        const nextT = t + waveMs + 420;
        for (const p of flatPoints(t + waveMs, nextT, tpl.baseline, seed + beatIndex)) tracePts.push(p);
        t = nextT;
        beatIndex++;
        continue;
      }
      const rr = Math.max(240, rrRaw);
      const beatMorph: BeatMorph = { ...morph };
      if (key === 'av-block-2-mobitz1') {
        // Progressive PR lengthening: 160 → 200 → 250 → 310 → drop
        const cycle = beatIndex % 4;
        wenckebachPr = 160 + cycle * 55;
        beatMorph.prMs = wenckebachPr;
      }
      if (tpl.baseline) {
        // pre-beat baseline with flutter/fib waves
        for (const p of flatPoints(t - Math.min(rr, 420) + 200, t, tpl.baseline, seed + beatIndex)) tracePts.push(p);
      }
      const { pts, waveMs } = beatPoints(beatMorph, t, false);
      for (const p of pts) tracePts.push(p);
      beatMarkers.push({ beatStartMs: t, qrsMs: t + beatMorph.prMs, morph: beatMorph });
      const nextT = t + waveMs + (rr - waveMs > 0 ? rr - waveMs : 40);
      for (const p of flatPoints(t + waveMs, nextT, tpl.baseline, seed + beatIndex)) {
        tracePts.push(p);
      }
      t = nextT;
      beatIndex++;
    }
  }

  // Split the trace into PER-ROW polylines so the row wrap never draws a
  // connecting line across the strip (diagonal artifact).
  const rowsPolys: string[] = [];
  {
    let current: Point[] = [];
    let currentRow = 0;
    const flush = () => {
      if (current.length > 1) {
        rowsPolys.push(
          current.map((p) => `${p.x.toFixed(1)},${(p.y + ROW_H * 0.62).toFixed(1)}`).join(' '),
        );
      }
      current = [];
    };
    for (const p of tracePts) {
      const row = Math.floor(p.x / W);
      const x = p.x - row * W;
      const y = p.y + row * ROW_H;
      if (row !== currentRow || x < (current.length ? current[current.length - 1].x - 1 : -1)) {
        flush();
        currentRow = row;
      }
      current.push({ x, y });
    }
    flush();
  }

  const findings = (spec.findings || []).slice(0, 4);
  const caption = spec.caption || `${tpl.label}${rate && !tpl.fixedRate && key !== 'vf' && key !== 'asystole' && key !== 'av-block-3-complete' ? ` (~${Math.round(rate)} bpm)` : ''}`;
  const captionLine = [caption, ...findings].join('  ·  ');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" font-family="ui-sans-serif, system-ui, sans-serif">
${gridDefs()}
  <rect x="0" y="0" width="${W}" height="${ROWS * ROW_H}" fill="url(#big)"/>
  ${rowsPolys.map((pts) => `<polyline points="${pts}" fill="none" stroke="#0b1220" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/>`).join('\n  ')}
  <text x="8" y="18" font-size="13" font-weight="700" fill="#0b1220">II</text>
  <text x="30" y="18" font-size="11" fill="#6b7280">25 mm/s · 10 mm/mV · continuous rhythm strip</text>
  <rect x="0" y="${ROWS * ROW_H}" width="${VIEW_W}" height="40" fill="#ffffff"/>
  <line x1="0" y1="${ROWS * ROW_H}" x2="${VIEW_W}" y2="${ROWS * ROW_H}" stroke="#e5e7eb" stroke-width="1"/>
  <text x="10" y="${ROWS * ROW_H + 26}" font-size="14" font-weight="700" fill="#111827">${escapeXml(captionLine.slice(0, 120))}</text>
</svg>`;

  // Hotspot regions from a clean mid trace beat (use beat 2 when present)
  const regions: EcgRegion[] = [];
  if (key !== 'vf' && key !== 'asystole' && beatMarkers.length >= 2) {
    const b = beatMarkers[1];
    const mk = (label: string, ms: number) => {
      const row = Math.floor((ms * PX_PER_MS) / W);
      const xPct = ((ms * PX_PER_MS) % W) / (W / 100);
      const yPct = ((row * ROW_H + ROW_H * 0.62 - 30) / VIEW_H) * 100;
      return {
        label,
        x: Math.max(3, Math.min(97, xPct)),
        y: Math.max(6, Math.min(88, yPct)),
      };
    };
    regions.push(mk('P wave', b.beatStartMs + 45));
    regions.push(mk('PR interval', b.beatStartMs + b.morph.prMs * 0.55));
    regions.push(mk('QRS complex', b.qrsMs + b.morph.qrsMs * 0.5));
    regions.push(mk('ST segment', b.qrsMs + b.morph.qrsMs + 45));
    regions.push(mk('T wave', b.qrsMs + b.morph.qrsMs + 140));
  }
  return { svg, regions };
}

function shift(p: Point, dx: number, dy: number): Point {
  return { x: p.x + dx, y: p.y + dy };
}

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

const ECG_DIR = path.join(process.cwd(), 'public', 'generated', 'agent', 'ecg');

export function saveEcgSvg(spec: EcgSpec): { url: string; regions: EcgRegion[]; caption: string } | null {
  try {
    const { svg, regions } = renderEcgStrip(spec);
    fs.mkdirSync(ECG_DIR, { recursive: true });
    const id = `ecg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const file = path.join(ECG_DIR, `${id}.svg`);
    fs.writeFileSync(file, svg, 'utf-8');
    const tpl = RHYTHMS[resolveRhythm(spec.rhythm)];
    return { url: `/generated/agent/ecg/${id}.svg`, regions, caption: tpl.label };
  } catch (err) {
    console.error('[ecg-generator] failed:', err instanceof Error ? err.message : err);
    return null;
  }
}

export const ECG_REGION_LABELS = ['P wave', 'PR interval', 'QRS complex', 'ST segment', 'T wave'];

export const SUPPORTED_ECG_RHYTHMS = Object.values(RHYTHMS).map((r) => r.label);
