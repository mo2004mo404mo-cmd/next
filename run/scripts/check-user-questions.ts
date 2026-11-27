import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

// Questions from the user's latest import (03:38 window = Job 2's import)
const rows = await sql`
  SELECT text, options, "answer", type, LENGTH(text) AS tlen
  FROM "Question"
  WHERE "createdAt" BETWEEN '2026-10-04T03:30:00Z' AND '2026-10-04T03:45:00Z'
  ORDER BY "createdAt" LIMIT 8`;
console.log('=== Sample of latest import (03:38) ===');
for (const r of rows) {
  console.log(`[len=${r.tlen} type=${r.type} opts=${r.options?.length}] ${r.text.slice(0, 110)}`);
  console.log(`   options: ${JSON.stringify(r.options).slice(0, 180)}`);
}

// Text-length distribution of today's user imports
const stats = await sql`
  SELECT MIN(LENGTH(text)) AS min_l, ROUND(AVG(LENGTH(text))) AS avg_l, MAX(LENGTH(text)) AS max_l, COUNT(*) AS n
  FROM "Question" WHERE "createdAt" > '2026-10-04T00:50:00Z'`;
console.log('\n=== Text-length stats (user imports today) ===', JSON.stringify(stats[0]));

// How many have qmark?
const qm = await sql`
  SELECT COUNT(*) FILTER (WHERE text LIKE '%?%') AS with_q, COUNT(*) AS total
  FROM "Question" WHERE "createdAt" > '2026-10-04T00:50:00Z'`;
console.log('Question-marks in stems:', JSON.stringify(qm[0]));

await sql.end();
