/** Restore the MedQ data backup into the nextapp database (Bun SQL, no psql needed). */
import { SQL } from 'bun';

const TARGET = 'nextapp';
const fileArg = process.argv[2] ?? 'db/medq-backup-20261004.sql';

const sql = new SQL(`postgresql://postgres:postgres@127.0.0.1:5432/${TARGET}`);

try {
  const file = await Bun.file(fileArg).text();
  console.log(`executing ${fileArg} (${(file.length / 1024).toFixed(0)} KB) ...`);
  await sql.unsafe(file);

  const q = await sql`select count(*)::int as n from "Question"`;
  const u = await sql`select count(*)::int as n from "User"`;
  const fp = await sql`select count(*)::int as n from "FlashcardProgress"`;
  const c = await sql`select count(*)::int as n from "ChatMessage"`;
  const users = await sql`select email, role from "User" where email is not null order by role limit 10`;
  console.log(`RESTORE OK — users: ${u[0].n}, questions: ${q[0].n}, flashcardProgress: ${fp[0].n}, chat messages: ${c[0].n}`);
  console.log('accounts:', users.map((x: any) => `${x.email} (${x.role})`).join(' | '));
} catch (e) {
  console.log('RESTORE FAILED:', (e as Error).message.slice(0, 600));
  process.exitCode = 1;
} finally {
  await sql.end();
}
