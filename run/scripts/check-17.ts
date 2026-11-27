import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
const rows = await sql`
  SELECT MIN("createdAt") AS a, MAX("createdAt") AS b, COUNT(*)::int AS n
  FROM "Question" WHERE "createdAt" > '2026-10-04T03:50:00Z'`;
console.log('Post-03:50 imports:', JSON.stringify(rows[0]));
const sample = await sql`
  SELECT text, "answer", LENGTH(text) AS tlen FROM "Question"
  WHERE "createdAt" > '2026-10-04T03:50:00Z' ORDER BY "createdAt" LIMIT 6`;
for (const r of sample) console.log(`[${r.tlen}ch] ${r.text.slice(0,80)} → ${r.answer.slice(0,40)}`);
await sql.end();
