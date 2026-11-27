/**
 * Restore a db/medq-backup-*.sql data dump into the running nextapp database.
 * Usage: node scripts/restore-db-latest.mjs [path-to-sql]
 * Default: db/medq-backup-20261018.sql (current-session state).
 * The dump is data-only (INSERT ... json_populate_record) and must be run
 * AFTER `bunx prisma db push` has created the schema.
 */
import pg from 'pg';
import fs from 'fs';

const file = process.argv[2] || 'db/medq-backup-20261018.sql';
let sql = fs.readFileSync(file, 'utf8');

const client = new pg.Client({
  connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp',
});
await client.connect();
try {
  await client.query('BEGIN');
  await client.query(sql);
  await client.query('COMMIT');
  const { rows } = await client.query('SELECT (SELECT COUNT(*) FROM "Question") AS questions, (SELECT COUNT(*) FROM "User") AS users, (SELECT COUNT(*) FROM "UserApiKey") AS apikeys');
  console.log('restore OK:', rows[0]);
} catch (e) {
  await client.query('ROLLBACK').catch(() => {});
  console.error('restore failed:', e.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
