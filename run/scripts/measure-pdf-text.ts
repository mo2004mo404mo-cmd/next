/**
 * measure-pdf-text.ts — extract text from a PDF with the SAME logic as the
 * fixed file-extract.ts (hasEOL line structure) and report the text length +
 * question count, so E2E fixtures can be sized to exceed the old 80k cap.
 *
 * Usage: bun scripts/measure-pdf-text.ts <file.pdf>
 */
const path = process.argv[2];
if (!path) {
  console.error('usage: bun scripts/measure-pdf-text.ts <file.pdf>');
  process.exit(1);
}

const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
const fs = await import('node:fs');

const data = new Uint8Array(fs.readFileSync(path));
// Node: no worker — run on main thread
const pdfjs = pdfjsLib as unknown as {
  GlobalWorkerOptions: { workerSrc: string; workerPort: unknown };
  getDocument: (opts: unknown) => { promise: Awaited<ReturnType<typeof getPdf>> };
};
type PdfDoc = { numPages: number; getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: unknown[] }> }> };
async function getPdf(): Promise<PdfDoc> { throw new Error('unused'); }
pdfjs.GlobalWorkerOptions.workerSrc = 'data:text/javascript,';
pdfjs.GlobalWorkerOptions.workerPort = null as unknown as Worker;

const pdf = await pdfjs.getDocument({ data, useSystemFonts: false, isEvalSupported: false }).promise;
const parts: string[] = [];
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const textContent = await page.getTextContent();
  const pageText = (textContent.items as Array<{ str?: string; hasEOL?: boolean }>)
    .map((it) => (it.str || '') + (it.hasEOL ? '\n' : ''))
    .join('')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  if (pageText) parts.push(`--- Page ${i} ---\n${pageText}`);
}
const full = parts.join('\n\n');
const qmarks = (full.match(/\?/g) || []).length;
const numbered = (full.match(/(^|\n)\s*\d{1,3}[.)]\s/g) || []).length;
console.log(`pages: ${pdf.numPages}`);
console.log(`extracted text: ${full.length} chars (old cap: 80000 → ${full.length > 80000 ? 'WOULD TRUNCATE' : 'fits'})`);
console.log(`questions: ? marks=${qmarks}, numbered lines=${numbered}`);
console.log(`density: ${Math.round(full.length / Math.max(qmarks, 1))} chars/?`);
