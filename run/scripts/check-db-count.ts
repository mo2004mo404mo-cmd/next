import { SQL } from 'bun';

const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

const total = await sql`SELECT COUNT(*)::int AS n FROM "Question"`;
console.log('Question total:', total[0].n);

const byDate = await sql`SELECT DATE("createdAt") AS d, COUNT(*)::int AS n FROM "Question" GROUP BY DATE("createdAt") ORDER BY d DESC LIMIT 5`;
console.log('By createdAt:', JSON.stringify(byDate));

const recent = await sql`SELECT "createdAt", COUNT(*)::int AS n FROM "Question" WHERE "createdAt" > NOW() - INTERVAL '6 hours' GROUP BY "createdAt" ORDER BY "createdAt" LIMIT 10`;
console.log('Last 6h groups:', JSON.stringify(recent));

const imp = await sql`SELECT COUNT(*)::int AS n FROM "ImportExtraction"`;
console.log('ImportExtraction rows:', imp[0].n);

const dupes = await sql`
  SELECT LOWER(REPLACE(TRIM("text"), ' ', '')) AS norm, COUNT(*)::int AS n
  FROM "Question"
  GROUP BY norm HAVING COUNT(*) > 1
  ORDER BY n DESC LIMIT 10`;
console.log('Exact-duplicate normalized texts:', JSON.stringify(dupes));

await sql.end();
