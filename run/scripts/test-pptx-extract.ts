// End-to-end test of the PPTX text extraction added to src/lib/file-extract.ts
// Replicates the exact logic (regexes in lockstep) and runs it against a real
// .pptx built in-memory with jszip — same shape PowerPoint writes.

import JSZip from 'jszip';

// ── The logic under test (mirror of file-extract.ts) ──────────────────────
function slideNumber(name: string): number {
  const m = name.match(/(\d+)\.xml$/);
  return m ? parseInt(m[1], 10) : 0;
}
function decodeXmlEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, '&');
}
function textFromSlideXml(xml: string): string {
  const withBreaks = xml
    .replace(/<a:br\s*\/?>/gi, '\n')
    .replace(/<a:p[^>]*>/gi, '')
    .replace(/<\/a:p>/gi, '\n');
  const withoutRuns = withBreaks.replace(/<a:r>([\s\S]*?)<\/a:r>/gi, (_m, inner) => {
    const ts = [...inner.matchAll(/<a:t>([\s\S]*?)<\/a:t>/gi)].map((x) => x[1]);
    return ts.join('');
  });
  const text = withoutRuns.replace(/<a:t>([\s\S]*?)<\/a:t>/gi, '$1');
  return decodeXmlEntities(text.replace(/<[^>]*>/g, ''));
}
// ── /logic ────────────────────────────────────────────────────────────────

const SLIDE1 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:sp><p:txBody><a:bodyPr/><a:lstStyle/>
    <a:p><a:r><a:rPr lang="en-US" dirty="0"/><a:t>Which of the following is the antidote for warfarin?</a:t></a:r></a:p>
    <a:p><a:r><a:rPr lang="en-US"/><a:t>A. Vitamin K</a:t></a:r></a:p>
    <a:p><a:r><a:t>B. Protamine &amp;</a:t></a:r><a:r><a:t> sulfate</a:t></a:r></a:p>
    <a:p><a:r><a:t>C. N-acetylcysteine</a:t></a:r></a:p>
    <a:p><a:r><a:t>D. Flumazenil — check &quot;airway&quot; &amp; &#946;-blockers</a:t></a:r></a:p>
  </p:txBody></p:sp></p:spTree></p:cSld>
</p:sld>`;

const SLIDE2 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:sp><p:txBody><a:bodyPr/>
    <a:p><a:r><a:t>Treatment goal in DKA: close the anion gap</a:t></a:r></a:p>
  </p:txBody></p:sp></p:spTree></p:cSld>
</p:sld>`;

const NOTES1 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:sp><p:txBody>
    <a:p><a:r><a:t>Answer: A. Vitamin K reverses warfarin&apos;s inhibition of II, VII, IX, X.</a:t></a:r></a:p>
  </p:txBody></p:sp></p:spTree></p:cSld>
</p:notes>`;

// Build a real .pptx (ZIP) in memory
const zip = new JSZip();
zip.file('[Content_Types].xml', '<?xml version="1.0"?><Types/>');
zip.file('ppt/slides/slide1.xml', SLIDE1);
zip.file('ppt/slides/slide2.xml', SLIDE2);
zip.file('ppt/slides/_rels/slide1.xml.rels', '<?xml version="1.0"?>');
zip.file('ppt/notesSlides/notesSlide1.xml', NOTES1);
// Also plant slide10 to prove numeric ordering (slide2 must come before slide10)
zip.file('ppt/slides/slide10.xml', SLIDE2.replace('DKA', 'slide-ten-DKA'));

const buf = await zip.generateAsync({ type: 'nodebuffer' });
console.log(`built test.pptx: ${buf.length} bytes`);

// Re-open it exactly the way extractFromPptx does
const reopened = await JSZip.loadAsync(buf);
const slideNames = Object.keys(reopened.files)
  .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
  .sort((a, b) => slideNumber(a) - slideNumber(b));
console.log('slide order:', slideNames.join('  '));
if (slideNames.join(',') !== 'ppt/slides/slide1.xml,ppt/slides/slide2.xml,ppt/slides/slide10.xml') {
  console.error('✗ ORDER FAIL');
  process.exit(1);
}

const notesByName = new Map();
for (const n of Object.keys(reopened.files)) {
  const m = n.match(/^ppt\/notesSlides\/notesSlide(\d+)\.xml$/);
  if (m) notesByName.set(parseInt(m[1], 10), n);
}

const parts = [];
for (let i = 0; i < slideNames.length; i++) {
  const name = slideNames[i];
  const xml = await reopened.file(name).async('string');
  const slideText = textFromSlideXml(xml).trim();
  let notesText = '';
  const notesName = notesByName.get(slideNumber(name));
  if (notesName && reopened.file(notesName)) {
    notesText = textFromSlideXml(await reopened.file(notesName).async('string')).trim();
  }
  if (slideText || notesText) {
    let part = `── Slide ${i + 1} ──\n${slideText}`;
    if (notesText) part += `\n[Speaker notes]: ${notesText}`;
    parts.push(part);
  }
}
const text = parts.join('\n\n');

console.log('');
console.log('===== extracted text =====');
console.log(text);
console.log('===== /extracted =====');
console.log('');

// Assertions
const checks = [
  ['antidote for warfarin?', text.includes('antidote for warfarin?')],
  ['A. Vitamin K', text.includes('A. Vitamin K')],
  ['split run joined', text.includes('B. Protamine & sulfate')],
  ['&quot; decoded', text.includes('"airway"')],
  ['&#946; decoded', text.includes('β')],
  ['notes attached', text.includes('[Speaker notes]: Answer: A. Vitamin K')],
  ['notes &apos; decoded', text.includes("warfarin's")],
  ['slide ten ordered last', text.indexOf('slide-ten-DKA') > text.indexOf('anion gap')],
  ['no <p: leaked tags', !text.includes('<p:') && !text.includes('<?xml')],
  ['no <a: leaked tags', !text.includes('<a:')],
];
let fail = 0;
for (const [label, ok] of checks) {
  console.log(`${ok ? '✓' : '✗'} ${label}`);
  if (!ok) fail++;
}
console.log('');
console.log(fail === 0 ? 'ALL CHECKS PASSED ✓' : `${fail} CHECKS FAILED ✗`);
process.exit(fail === 0 ? 0 : 1);
