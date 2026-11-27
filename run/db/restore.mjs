#!/usr/bin/env node
/**
 * Restore the MedQ database from db/medq-backup.sql.
 * Uses the `pg` package from .pg-embed/node_modules (already installed).
 *
 * Usage:  node db/restore.mjs
 *
 * Connects to postgresql://postgres:postgres@127.0.0.1:5432/nextapp
 * and runs the backup SQL statement-by-statement.
 */
import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlFile = path.join(__dirname, 'medq-backup.sql');

if (!fs.existsSync(sqlFile)) {
  console.error(`Backup file not found: ${sqlFile}`);
  process.exit(1);
}

const connectionString = process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@127.0.0.1:5432/nextapp';

console.log(`Restoring from ${sqlFile}...`);
console.log(`Target: ${connectionString.replace(/:[^:@]+@/, ':***@')}`);

const client = new pg.Client({ connectionString });
await client.connect();

const sql = fs.readFileSync(sqlFile, 'utf8');
// Split on semicolons followed by newline (statement boundary)
const statements = sql
  .split(/;\n/)
  .map(s => s.trim())
  .filter(s => s && !s.startsWith('--'));

console.log(`Executing ${statements.length} statements...`);
let count = 0;
let errors = 0;
for (const stmt of statements) {
  try {
    await client.query(stmt);
    count++;
    if (count % 500 === 0) console.log(`  ${count} statements done...`);
  } catch (e) {
    errors++;
    if (errors <= 5) console.warn(`  WARN: ${e.message.slice(0, 100)}`);
  }
}

console.log(`\nDone: ${count} statements executed, ${errors} errors`);
await client.end();
