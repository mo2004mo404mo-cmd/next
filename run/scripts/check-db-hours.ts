import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

const byHour = await sql`
  SELECT date_trunc('hour', "createdAt") AS h, COUNT(*)::int AS n
  FROM "Question" GROUP BY h ORDER BY h`;
console.log('Questions by hour (UTC):');
for (const r of byHour) console.log(`  ${r.h.toISOString()}  ${r.n}`);

const lastHour = await sql`
  SELECT MIN("createdAt") AS a, MAX("createdAt") AS b, COUNT(*)::int AS n
  FROM "Question" WHERE "createdAt" > NOW() - INTERVAL '4 hours'`;
console.log('Last 4h window:', JSON.stringify(lastHour[0]));

await sql.end();
