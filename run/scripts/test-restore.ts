/** Verify medq-backup .sql restores cleanly into a scratch DB (schema pushed first). */
import { SQL } from 'bun';
import { $ } from 'bun';

const SCRATCH = 'medq_restore_test';
const ADMIN = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/postgres');
await ADMIN.unsafe(`DROP DATABASE IF EXISTS ${SCRATCH}`);
await ADMIN.unsafe(`CREATE DATABASE ${SCRATCH}`);
await ADMIN.end();

try {
  // push schema to scratch db (prisma 7: no --skip-generate; --url overrides config)
  await $`bunx prisma db push --accept-data-loss --url postgresql://postgres:postgres@127.0.0.1:5432/${SCRATCH}`.quiet();

  // run the dump
  const file = await Bun.file(process.argv[2]).text();
  const sql = new SQL(`postgresql://postgres:postgres@127.0.0.1:5432/${SCRATCH}`);
  await sql.unsafe(file);
  const q = await sql`select count(*)::int as n from "Question"`;
  const u = await sql`select count(*)::int as n from "User"`;
  const gd = await sql`select count(*)::int as n from "Question" where "system" = 'Growth & Development'`;
  console.log(`RESTORE OK — users: ${u[0].n}, questions: ${q[0].n}, growth-dev: ${gd[0].n}`);
  await sql.end();
} catch (e) {
  console.log('RESTORE FAILED:', (e as Error).message.slice(0, 400));
} finally {
  const a = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/postgres');
  await a.unsafe(`DROP DATABASE IF EXISTS ${SCRATCH}`);
  await a.end();
}
