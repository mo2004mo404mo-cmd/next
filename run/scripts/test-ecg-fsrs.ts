/**
 * Direct tests: ECG generator (SVG render + hotspots) and FSRS scheduler.
 * Run: bunx tsx scripts/test-ecg-fsrs.ts
 */
import { renderEcgStrip, saveEcgSvg, SUPPORTED_ECG_RHYTHMS, ECG_REGION_LABELS } from '../src/lib/agent/ecg-generator';
import { fsrsReview, NEW_CARD, ratingFromAction, retrievability, cardFromProgress } from '../src/lib/fsrs';

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean, detail?: string) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`); }
}

console.log('── ECG generator ──');
const rhythms = [
  'atrial-fibrillation', 'vt', 'stemi', 'av-block-2-mobitz1', 'asystole',
  'hyperkalemia', 'normal-sinus', 'vf', 'lbbb', 'svt', 'sinus-tachycardia',
];
for (const r of rhythms) {
  const { svg, regions } = renderEcgStrip({ rhythm: r, rate: 80, findings: ['test finding'] });
  check(`${r}: renders SVG`, svg.startsWith('<svg') && svg.includes('</svg>'), svg.slice(0, 40));
  check(`${r}: grid + trace`, svg.includes('url(#big)') && svg.includes('polyline'));
  if (!['vf', 'asystole'].includes(r)) {
    check(`${r}: 5 wave regions`, regions.length === 5, `got ${regions.length}`);
    check(`${r}: region labels`, JSON.stringify(regions.map((x) => x.label)) === JSON.stringify(ECG_REGION_LABELS));
    const inBounds = regions.every((x) => x.x >= 0 && x.x <= 100 && x.y >= 0 && x.y <= 100);
    check(`${r}: regions in % bounds`, inBounds);
  }
}
check('alias resolution: afib', renderEcgStrip({ rhythm: 'afib' }).svg.includes('polyline'));
check('alias resolution: wenckebach', renderEcgStrip({ rhythm: 'wenckebach' }).svg.length > 500);
check('rhythm list non-empty', SUPPORTED_ECG_RHYTHMS.length >= 15, `${SUPPORTED_ECG_RHYTHMS.length} rhythms`);
const saved = saveEcgSvg({ rhythm: 'atrial-fibrillation', rate: 110, findings: ['irregularly irregular'] });
check('saveEcgSvg persists file', Boolean(saved && saved.url.startsWith('/generated/agent/ecg/')), saved?.url);
console.log(`  saved: ${saved?.url} (caption: ${saved?.caption})`);

console.log('── FSRS scheduler ──');
// First review: Good
const r1 = fsrsReview(NEW_CARD, 3, 0);
check('first Good: stability = w[2]', Math.abs(r1.state.stability - 3.173) < 0.01, `S=${r1.state.stability}`);
check('first Good: interval ≈ stability (90% retention)', r1.intervalDays === Math.round(r1.state.stability), `I=${r1.intervalDays}`);
check('first Good: state → review', r1.state.state === 2);
check('first Good: reps=1 lapses=0', r1.state.reps === 1 && r1.state.lapses === 0);

// Sequence of successful reviews grows stability/interval
let card = r1.state;
let lastInterval = r1.intervalDays;
let monotonic = true;
for (let i = 0; i < 6; i++) {
  const res = fsrsReview(card, 3, lastInterval);
  if (res.intervalDays < lastInterval) monotonic = false;
  card = res.state;
  lastInterval = res.intervalDays;
}
check('successive Good reviews: intervals never shrink', monotonic, `last I=${lastInterval}`);
check('stability grows past 20d', card.stability > 20, `S=${card.stability.toFixed(1)}`);
check('interval reaches weeks', lastInterval >= 14, `I=${lastInterval}`);

// Hard rating → shorter interval than Good at the same state (uncapped state)
let midCard = r1.state;
let midInterval = r1.intervalDays;
for (let i = 0; i < 3; i++) {
  const res = fsrsReview(midCard, 3, midInterval);
  midCard = res.state;
  midInterval = res.intervalDays;
}
const goodNext = fsrsReview(midCard, 3, midInterval);
const hardNext = fsrsReview(midCard, 2, midInterval);
check('Hard < Good interval', hardNext.intervalDays < goodNext.intervalDays, `hard=${hardNext.intervalDays} good=${goodNext.intervalDays}`);
const easyNext = fsrsReview(midCard, 4, midInterval);
check('Easy > Good interval', easyNext.intervalDays > goodNext.intervalDays, `easy=${easyNext.intervalDays}`);
check('Good interval uncapped for test', goodNext.intervalDays < 365, `I=${goodNext.intervalDays}`);

// Lapse: post-lapse stability < pre-lapse stability, state → relearning, lapses++
const lapsed = fsrsReview(card, 1, lastInterval);
check('lapse: stability drops', lapsed.state.stability < card.stability, `S=${lapsed.state.stability.toFixed(1)} < ${card.stability.toFixed(1)}`);
check('lapse: state → relearning', lapsed.state.state === 3);
check('lapse: lapses increments', lapsed.state.lapses === card.lapses + 1);
check('lapse: short interval', lapsed.intervalDays <= 10, `I=${lapsed.intervalDays}`);
// ...but a MATURE card after lapse comes back sooner than a new card (post-lapse stability > initial-again stability)
check('mature lapse: post-lapse S > new-card S', lapsed.state.stability > 3.173 * 0.9, `S=${lapsed.state.stability.toFixed(2)}`);

// Retrievability curve sanity
check('R(0) = 1', Math.abs(retrievability(0, 10) - 1) < 1e-9);
check('R(S) ≈ 0.9 at t=S', Math.abs(retrievability(10, 10) - 0.9) < 0.01, `R=${retrievability(10, 10)}`);
check('R(2S) < R(S)', retrievability(20, 10) < retrievability(10, 10));
check('R decays monotonically', retrievability(15, 10) > retrievability(30, 10));

// rating map
check('rating map', ratingFromAction('forgot') === 1 && ratingFromAction('almost') === 2 && ratingFromAction('got_it') === 3 && ratingFromAction('easy') === 4);

// legacy row → card
const legacy = cardFromProgress({ stability: 0, fsrsDifficulty: 0, reps: 5, lapses: 1, lastRating: 3, state: 2 });
check('legacy row: default S/D for pre-FSRS rows', legacy.stability === 0 && legacy.difficulty === 5 && legacy.reps === 5);

// difficulty bounds over many reviews
let dCard = r1.state;
for (let i = 0; i < 30; i++) dCard = fsrsReview(dCard, i % 3 === 0 ? 1 : 2, 1).state;
check('difficulty stays in [1,10]', dCard.difficulty >= 1 && dCard.difficulty <= 10, `D=${dCard.difficulty.toFixed(2)}`);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
