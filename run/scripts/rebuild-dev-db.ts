/** Rebuild the dev database: create 'nextapp', push schema, restore the dump. */
import { SQL } from 'bun';
import { $ } from 'bun';

const URL = 'postgresql://postgres:postgres@127.0.0.1:5432';
const DUMP = process.argv[2] || 'db/medq-backup-20261004.sql';

const admin = new SQL(`${URL}/postgres`);
const exists = await admin`select 1 as x from pg_database where datname = 'nextapp'`;
if (exists.length === 0) {
  await admin.unsafe('CREATE DATABASE nextapp');
  console.log('database nextapp created');
} else {
  console.log('database nextapp already exists');
}
await admin.end();

// push current schema (includes the new ImportExtraction model)
await $`bunx prisma db push --accept-data-loss --url ${`${URL}/nextapp`}`.quiet();
console.log('schema pushed');

// restore the data dump
const file = await Bun.file(DUMP).text();
const sql = new SQL(`${URL}/nextapp`);
await sql.unsafe(file);
const q = await sql`select count(*)::int as n from "Question"`;
const u = await sql`select count(*)::int as n from "User"`;
console.log(`RESTORED — users: ${u[0].n}, questions: ${q[0].n}`);
await sql.end();
