/**
 * Check what unpdf mergePages puts BETWEEN pages, and find the exact
 * text around the known cut "…(e.g. those with" | "meat, or close contact…"
 */
import pg from 'pg';
import fs from 'fs';

const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await client.connect();
const { rows } = await client.query(
  `SELECT id, name FROM "KnowledgeSource" WHERE name LIKE '%prevention%' LIMIT 1`,
);
const s = rows[0];
const buffer = fs.readFileSync(`upload/file-store/${s.id}.bin`);
const { getDocumentProxy, extractText } = await import('unpdf');
const pdf = await getDocumentProxy(new Uint8Array(buffer));
const { text } = await extractText(pdf, { mergePages: true });

// 1) What's between pages? Print the raw junction of page 1 and 2.
const { text: pages } = await extractText(pdf, { mergePages: false });
if (Array.isArray(pages) && pages.length >= 2) {
  const end1 = pages[0].slice(-80).replace(/\n/g, '⏎');
  const start2 = pages[1].slice(0, 80).replace(/\n/g, '⏎');
  console.log('PAGE1 END  :', JSON.stringify(end1));
  console.log('PAGE2 START:', JSON.stringify(start2));
}

// 2) Find the junction around "those with" + "meat"
const i = text.indexOf('those with');
if (i >= 0) {
  console.log('\nRAW JUNCTION:', JSON.stringify(text.slice(i - 40, i + 60)));
}
await client.end();
