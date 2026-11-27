/**
 * Restore db/medq-backup-20261008.sql into the fresh nextapp database.
 * Patches schema drift: JSON rows written before a column existed lack the
 * key — json_populate_record yields NULL and violates NOT NULL. Inject
 * defaults for known post-backup columns (duplicate keys: LAST value wins,
 * so real values are preserved).
 */
import pg from 'pg';
import fs from 'fs';

let sql = fs.readFileSync('db/medq-backup-20261008.sql', 'utf8');

// Question: citations / knowledgeSourceIds / reviewStatus / reviewNotes added after this backup
sql = sql.replace(
  /(json_populate_record\(NULL::"Question", \$\w+\$)\{/g,
  '$1{"citations":"[]","knowledgeSourceIds":"[]","reviewStatus":"pending","reviewNotes":"",',
);
// KnowledgeChunk: contextSummary may be missing on legacy rows
sql = sql.replace(
  /(json_populate_record\(NULL::"KnowledgeChunk", \$\w+\$)\{/g,
  '$1{"contextSummary":"",',
);

const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await client.connect();
try {
  await client.query(sql);
  console.log('restore OK');
} catch (e) {
  console.error('restore failed:', e.message);
} finally {
  await client.end();
}
