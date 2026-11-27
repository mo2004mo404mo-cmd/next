import { renderEcgStrip, saveEcgSvg, SUPPORTED_ECG_RHYTHMS } from '../src/lib/agent/ecg-generator';

const cases = [
  { rhythm: 'normal-sinus' },
  { rhythm: 'atrial-fibrillation' },
  { rhythm: 'vt' },
  { rhythm: 'av-block-2-mobitz1' },
  { rhythm: 'stemi' },
  { rhythm: 'vf' },
  { rhythm: 'hyperkalemia' },
  { rhythm: 'atrial-flutter' },
];

for (const c of cases) {
  const r = renderEcgStrip(c as never);
  const ok = r.svg.startsWith('<svg') && r.svg.endsWith('</svg>');
  const pts = (r.svg.match(/[\d.]+,[\d.]+/g) || []).length;
  console.log(`${ok ? 'OK ' : 'BAD'} ${c.rhythm.padEnd(24)} svg=${(r.svg.length / 1024).toFixed(1)}KB points=${pts} regions=${r.regions.length}`);
}

const saved = saveEcgSvg({ rhythm: 'atrial-fibrillation' });
console.log('saved:', JSON.stringify(saved?.url), 'regions:', saved?.regions.length);
console.log('rhythm library size:', SUPPORTED_ECG_RHYTHMS.length);
