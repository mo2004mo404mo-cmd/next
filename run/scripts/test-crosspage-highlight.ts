/**
 * test-crosspage-highlight.ts — unit-test the PDF citation-highlight
 * FULL-EXTENT + CROSS-PAGE continuation algorithm against the REAL textbook
 * PDF (the same norm/squeeze/walk logic PdfCanvasViewer runs in the browser).
 *
 * Builds synthetic "chunks" that straddle page boundaries exactly like the
 * ingestion pipeline would (tail of page N + head of page N+1, minus page
 * furniture), then runs the walk and asserts:
 *   - both pages receive highlight boxes
 *   - the covered character count equals the full chunk length
 *   - the covered text equals the chunk text
 */
import fs from 'node:fs';

const PDF_PATH = '/home/z/my-project/upload/file-store/cmv6xgvop0000xurml1w3mzsy.bin';

// ── Algorithm under test (mirrored from PdfCanvasViewer.tsx) ────────────────
const norm = (s: string) => s.replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
const squeeze = (s: string): { out: string; removals: number[] } => {
  let out = '';
  const removals: number[] = [];
  for (let i = 0; i < s.length; ) {
    if (
      s[i] === '-' && s[i + 1] === ' ' && out.length > 0 &&
      /[a-z0-9]/.test(out[out.length - 1]) && /[a-z0-9]/.test(s[i + 2] ?? '')
    ) {
      removals.push(out.length);
      i += 2;
    } else {
      out += s[i];
      i += 1;
    }
  }
  return { out, removals };
};
const toJoinedIdx = (squeezedIdx: number, removals: number[]) =>
  squeezedIdx + 2 * removals.filter((r) => r <= squeezedIdx).length;

interface Item { str: string; }
interface PageText { items: Item[]; normStrs: string[]; joined: string; }

interface Span { page: number; rects: Array<[number, number, number, number]>; covered: string }

function fullExtentWalk(
  pageTexts: Map<number, PageText>,
  quoteSrc: string,
  startPage: number,
  matchIdx: number,
  squeezed: boolean,
): Span[] {
  const spans: Span[] = [];
  let consumed = 0;
  const fullLen = quoteSrc.length;
  let curPage = startPage;
  let curStart = matchIdx;
  let curJoined = pageTexts.get(startPage)!.joined;
  let curRemovals: number[] = [];
  if (squeezed) {
    const sq = squeeze(curJoined);
    curJoined = sq.out;
    curRemovals = sq.removals;
  }
  for (let guard = 0; guard < 6; guard++) {
    const remaining = fullLen - consumed;
    if (remaining <= 0) break;
    const available = curJoined.length - curStart;
    if (available <= 0) break;
    const extent = Math.min(remaining, available);
    const startJoined = squeezed ? toJoinedIdx(curStart, curRemovals) : curStart;
    const endJoined = squeezed ? toJoinedIdx(curStart + extent, curRemovals) : curStart + extent;
    // covered text (for assertion)
    const covered = curJoined.slice(curStart, curStart + extent);
    spans.push({ page: curPage, rects: [[startJoined, endJoined, 0, 0]], covered });
    consumed += extent;
    if (consumed >= fullLen) break;
    const nextPage = curPage + 1;
    const npt = pageTexts.get(nextPage);
    if (!npt) break;
    let nJoined = npt.joined;
    let nRemovals: number[] = [];
    if (squeezed) {
      const sq = squeeze(nJoined);
      nJoined = sq.out;
      nRemovals = sq.removals;
    }
    const rawRemainder = quoteSrc.slice(consumed, consumed + 60);
    const lead = rawRemainder.length - rawRemainder.replace(/^\s+/, '').length;
    const remainder = rawRemainder.slice(lead);
    consumed += lead;
    if (remainder.trim().length < 10) break;
    let nIdx = nJoined.indexOf(remainder);
    if (nIdx === -1) {
      const nsp = nJoined.indexOf(' ');
      if (nsp > 0 && nsp <= 4 && /^\d+[.:-]?$/.test(nJoined.slice(0, nsp))) {
        nIdx = nJoined.indexOf(remainder, nsp + 1);
      }
    }
    if (nIdx === -1) break;
    curPage = nextPage;
    curStart = nIdx;
    curJoined = nJoined;
    curRemovals = nRemovals;
  }
  return spans;
}

// ── Load the PDF's per-page text ────────────────────────────────────────────
async function main() {
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs').catch(() => import('pdfjs-dist'));
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  // Pages around a text-heavy region (84-90 held citations).
  const pageTexts = new Map<number, PageText>();
  for (let p = 80; p <= 95; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    const items = (tc.items as Item[]).filter((it) => norm(it.str).length > 0);
    const normStrs = items.map((it) => norm(it.str));
    pageTexts.set(p, { items, normStrs, joined: normStrs.join(' ') });
  }

  // ── Build synthetic cross-page chunks from REAL page text ──
  // Take the last ~700 chars of page N and first ~500 of page N+1 (skipping a
  // leading page number, like the ingestion extraction does).
  const results: Array<{ pageN: number; ok: boolean; detail: string }> = [];
  for (const pageN of [83, 84, 86, 87]) {
    const a = pageTexts.get(pageN)!;
    const b = pageTexts.get(pageN + 1)!;
    let bText = b.joined;
    // strip a leading bare page number from the continuation page
    const bsp = bText.indexOf(' ');
    if (bsp > 0 && bsp <= 4 && /^\d+[.:-]?$/.test(bText.slice(0, bsp))) bText = bText.slice(bsp + 1);
    const tail = a.joined.slice(-700);
    const quote = norm(`${tail} ${bText.slice(0, 500)}`);
    if (quote.length < 600) continue;

    // locate the quote's start on page N the way the viewer does (prefix hit)
    const prefix = quote.slice(0, 200);
    const idx = a.joined.indexOf(prefix);
    if (idx === -1) { results.push({ pageN, ok: false, detail: 'prefix not found' }); continue; }

    const spans = fullExtentWalk(pageTexts, quote, pageN, idx, false);
    const coveredChars = spans.reduce((n, s) => n + s.covered.length, 0);
    const coveredText = spans.map((s) => s.covered).join(' ');
    const pagesHit = [...new Set(spans.map((s) => s.page))].sort((x, y) => x - y);
    const ok =
      pagesHit.length === 2 &&
      coveredChars >= quote.length - 2 && // joiner whitespace may be unaccounted
      coveredText.replace(/\s+/g, '') === quote.replace(/\s+/g, '');
    results.push({
      pageN,
      ok,
      detail: `pages [${pagesHit}] covered ${coveredChars}/${quote.length} chars${ok ? '' : ' — MISMATCH: ' + coveredText.slice(0, 80) + ' vs ' + quote.slice(0, 80)}`,
    });
  }

  console.log('\nCross-page full-extent walk vs real PDF text:');
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'} page ${r.pageN} → ${r.detail}`);
  const fails = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - fails}/${results.length} passed`);
  process.exit(fails ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
