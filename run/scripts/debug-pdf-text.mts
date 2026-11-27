/**
 * Debug: inspect pdf.js getTextContent items for the test PDF — why does the
 * citation quote not match? Prints item types, transform types, and the
 * normalized joined page text vs the quote.
 */
import fs from 'fs';

const COOKIE = fs.readFileSync('/home/z/my-project/tmp/e2e-t55-cookies.txt', 'utf8')
  .split('\n').filter((l) => l.includes('authjs.session-token')).map((l) => {
    const parts = l.trim().split(/\s+/);
    return `${parts[5]}=${parts[6]}`;
  }).join('; ');

const SRC = process.argv[2] || 'cmv3or9k10003vfnlauzkv2xw';

async function main() {
  const res = await fetch(`http://127.0.0.1:3000/api/knowledge/sources/${SRC}/file`, {
    headers: { cookie: COOKIE },
  });
  if (!res.ok) { console.error('fetch failed', res.status); process.exit(1); }
  const buf = new Uint8Array(await res.arrayBuffer());
  console.log('pdf bytes:', buf.length, '| content-type:', res.headers.get('content-type'));

  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs').catch(() => import('pdfjs-dist'));
  const task = pdfjs.getDocument({ data: buf, useSystemFonts: true });
  const doc = await task.promise;
  console.log('numPages:', doc.numPages);
  const page = await doc.getPage(1);
  const tc = await page.getTextContent();
  const items = tc.items || [];
  console.log('items:', items.length);
  console.log('first item keys:', items[0] ? Object.keys(items[0]).join(',') : 'none');
  console.log('transform type:', items[0] ? (items[0].transform?.constructor?.name) : 'none');
  console.log('transform isArray:', items[0] ? Array.isArray(items[0].transform) : 'none');

  const norm = (s) => s.replace(/\u00ad/g, '').replace(/\s+/g, ' ').toLowerCase();
  const strs = items.filter((it) => typeof it.str === 'string').map((it) => norm(it.str));
  const joined = strs.join(' ');
  console.log('joined page text (first 500):', joined.slice(0, 500));

  const quote = norm('Chest X-ray Interpretation Primer Cardiomegaly on chest radiograph is suggested by a cardiothoracic ratio above 0.5 on a PA film. A globular heart silhouette wi');
  console.log('quote (first 120):', quote.slice(0, 120));
  const idx = joined.indexOf(quote.slice(0, 60));
  console.log('indexOf 60-char prefix:', idx);
  const idx2 = joined.indexOf(quote.slice(0, 30));
  console.log('indexOf 30-char prefix:', idx2);

  // show a few raw items
  for (const it of items.slice(0, 8)) {
    console.log(' item:', JSON.stringify(it.str?.slice(0, 40)), '| w:', it.width, '| h:', it.height, '| t:', it.transform ? [...it.transform].map((n) => Math.round(n * 10) / 10).join(',') : null);
  }
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
