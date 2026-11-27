import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

// Sample across the user's four import waves
const rows = await sql`
  SELECT text, "answer", options, explanation, LENGTH(text) AS tlen
  FROM "Question"
  WHERE "createdAt" > '2026-10-04T00:50:00Z'
  ORDER BY RANDOM() LIMIT 20`;

let withQ = 0, withColon = 0, single = 0, four = 0, hasExpl = 0;
for (const r of rows) {
  const opts = typeof r.options === 'string' ? JSON.parse(r.options) : r.options;
  const n = Array.isArray(opts) ? opts.length : 0;
  if (r.text.includes('?')) withQ++;
  if (/:\s*$/.test(r.text.trim())) withColon++;
  if (n === 0 || n === 1) single++; else if (n >= 3) four++;
  if (r.explanation && r.explanation.length > 10) hasExpl++;
  console.log(`[${r.tlen}ch opts=${n}${r.explanation ? ' expl' : ''}] ${r.text.slice(0, 70)} ==> ${r.answer.slice(0, 30)}`);
}
console.log(`\nof 20: with ?=${withQ}, ends-with-colon=${withColon}, single/no-option=${single}, multi-option=${four}, has-explanation=${hasExpl}`);

// length stats of stems+answers for density reconstruction
const stats = await sql`
  SELECT ROUND(AVG(LENGTH(text))) AS stem, ROUND(AVG(LENGTH("answer"))) AS ans,
         ROUND(AVG(LENGTH(COALESCE(explanation,'')))) AS expl, COUNT(*)::int AS n
  FROM "Question" WHERE "createdAt" > '2026-10-04T00:50:00Z'`;
console.log('avg lengths:', JSON.stringify(stats[0]));
await sql.end();
