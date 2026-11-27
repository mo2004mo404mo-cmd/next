/** Compare the stored citation quote with the PDF text layer. */
import pg from 'pg';
import fs from 'fs';
const c = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await c.connect();
const { rows: [q] } = await c.query(`SELECT citations FROM "Question" WHERE id='citetest000001'`);
const quote = JSON.parse(q.citations)[0].quote;
console.log('QUOTE (first 200):', JSON.stringify(quote.slice(0, 200)));

const { rows: [src] } = await c.query(`SELECT id FROM "KnowledgeSource" WHERE name='prevention-of-transmission.pdf'`);
const buffer = fs.readFileSync(`upload/file-store/${src.id}.bin`);
const { getDocumentProxy, extractText } = await import('unpdf');
const pdf = await getDocumentProxy(new Uint8Array(buffer));
const norm = (s) => s.replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
const nq = norm(quote).slice(0, 60);
console.log('NORM QUOTE PREFIX:', JSON.stringify(nq));

// scan pages for the prefix
for (let p = 1; p <= pdf.numPages; p++) {
  const page = await pdf.getPage(p);
  const tc = await page.getTextContent();
  const items = (tc.items || []).filter(it => typeof it.str === 'string' && norm(it.str).length > 0);
  const joined = items.map(it => norm(it.str)).join(' ');
  if (joined.includes(nq.slice(0, 40))) {
    console.log(`MATCH candidate on page ${p}`);
    const i = joined.indexOf(nq.slice(0, 40));
    console.log('page text around:', JSON.stringify(joined.slice(Math.max(0, i - 60), i + 120)));
    break;
  }
}
await c.end();
