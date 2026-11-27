import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

const jobs = await sql`
  SELECT id, status, "fileName", LENGTH(text) AS text_len, "rawCount",
         "droppedChunks", "createdAt", "finishedAt"
  FROM "ImportExtraction" ORDER BY "createdAt" DESC LIMIT 5`;
console.log('Latest ImportExtraction rows:');
for (const j of jobs) console.log(JSON.stringify(j));

const q = await sql`SELECT COUNT(*)::int AS n FROM "Question"`;
console.log('\nQuestion total:', q[0].n);

const byHour = await sql`
  SELECT date_trunc('hour', "createdAt") AS h, COUNT(*)::int AS n
  FROM "Question" WHERE "createdAt" > NOW() - INTERVAL '3 hours'
  GROUP BY h ORDER BY h`;
console.log('Last 3h increments:', JSON.stringify(byHour));

await sql.end();
