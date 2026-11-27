// Restore MedQ backup (line-oriented INSERT statements) into PostgreSQL
// without psql — streams the SQL file over node-postgres in batches.
import fs from 'node:fs';
import path from 'node:path';
import pg from 'pg';

const BACKUP = '/home/z/my-project/tmp_download/extracted/db/medq-backup-20261025.sql';

// Resolve DATABASE_URL (prefer postgres:// from process env, else .env file)
let url = process.env.DATABASE_URL || '';
if (!url.startsWith('postgres')) {
  const envText = fs.readFileSync('/home/z/my-project/.env', 'utf8');
  const m = envText.match(/^DATABASE_URL="?([^"\n]+)"?/m);
  if (m) url = m[1];
}

const client = new pg.Client({ connectionString: url });
await client.connect();
console.log('[restore] connected to', url.replace(/:[^:@]+@/, ':***@'));

const MAX_BATCH_BYTES = 4 * 1024 * 1024;
const MAX_BATCH_ROWS = 400;

let batch = [];
let batchBytes = 0;
let total = 0;
let errors = 0;
const t0 = Date.now();

async function flush() {
  if (batch.length === 0) return;
  const text = batch.join('\n');
  batch = [];
  batchBytes = 0;
  try {
    await client.query(text);
  } catch (err) {
    errors++;
    const first = text.slice(0, 120).replace(/\n/g, ' ');
    console.error(`[restore] BATCH ERROR (#${errors}): ${err.message}\n  batch head: ${first}`);
    if (errors > 20) {
      console.error('[restore] too many errors, aborting');
      process.exit(1);
    }
  }
}

const stream = fs.createReadStream(BACKUP, { encoding: 'utf8' });
let leftover = '';
for await (const chunk of stream) {
  const lines = (leftover + chunk).split('\n');
  leftover = lines.pop() ?? '';
  for (const line of lines) {
    if (line === '' || line.startsWith('--')) continue;
    if (line.startsWith('INSERT INTO')) {
      if (batch.length >= MAX_BATCH_ROWS || batchBytes + line.length > MAX_BATCH_BYTES) {
        await flush();
      }
      batch.push(line);
      batchBytes += line.length + 1;
      total++;
      if (total % 1000 === 0) {
        const s = ((Date.now() - t0) / 1000).toFixed(0);
        console.log(`[restore] ${total} rows (${s}s, errs=${errors})`);
      }
    } else {
      // BEGIN;/COMMIT;/SET ... — send standalone (flush batch first)
      await flush();
      try {
        await client.query(line);
      } catch (err) {
        console.error(`[restore] STMT ERROR on "${line.slice(0, 80)}": ${err.message}`);
      }
    }
  }
}
if (leftover !== '' && leftover.startsWith('INSERT INTO')) {
  batch.push(leftover);
  total++;
}
await flush();

const s = ((Date.now() - t0) / 1000).toFixed(0);
console.log(`[restore] DONE: ${total} rows in ${s}s, batch errors=${errors}`);

// Sanity check: row counts of a few key tables
for (const t of ['User', 'Question', 'Flashcard', 'ChatSession', 'AgentThread']) {
  try {
    const r = await client.query(`SELECT COUNT(*)::int AS c FROM "${t}"`);
    console.log(`[restore] ${t}: ${r.rows[0].c} rows`);
  } catch { /* table may not exist */ }
}
await client.end();
