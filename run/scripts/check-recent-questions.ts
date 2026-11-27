// Verify the agent-generated questions landed in the bank.
import { SQL } from 'bun';

const sql = new SQL(process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/nextapp');

const q = await sql`SELECT id, text, difficulty, system, "createdAt"
                    FROM "Question"
                    WHERE "createdAt" > now() - interval '25 minutes'
                    ORDER BY "createdAt" DESC LIMIT 6`;
if (q.length === 0) console.log('NO NEW QUESTIONS in last 25 minutes');
for (const r of q) {
  console.log(`${r.id.slice(0, 10)} [${r.difficulty ?? '?'}] ${r.system?.slice(0, 20) ?? '?'} :: ${r.text.slice(0, 65)}`);
}

await sql.end();
