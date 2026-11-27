// Restore the MedQ SQL backup using bun + pg (no psql binary needed).
//
// The backup is a hand-rolled Postgres dump: SET statements, DELETE+INSERT
// pairs per table, all semicolon-terminated, no COPY blocks. We split on
// ";\n" at the end of statements (the dump's canonical separator) and send
// each non-empty statement through pg in a single transaction per batch.
//
// Multi-statement queries via pg's query() are supported as long as no
// parameter binding is involved — which is the case here (everything is
// inline literals).

import pg from 'pg';
import { readFileSync } from 'node:fs';

const SQL_PATH = process.argv[2] ?? '/home/z/my-project/db/medq-backup.sql';
const DSN = 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp';

const client = new pg.Client({ connectionString: DSN });
await client.connect();

console.log(`[restore] reading ${SQL_PATH}`);
const sql = readFileSync(SQL_PATH, 'utf8');
console.log(`[restore] SQL size: ${(sql.length / 1024).toFixed(1)} KB`);

// Split into statements. The dump uses ";\n" as the canonical terminator.
// We keep it simple: split on /\n$/ after ; — but that's fragile if a
// string literal contains ";\n". Use a tiny state machine that respects
// single quotes and dollar-quotes.
function splitStatements(sql) {
  const out = [];
  let buf = '';
  let inSingle = false;
  let dollarTag = null; // current $$...$$ tag, or null
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i];
    // Dollar-quote handling: $$ or $tag$ ... $tag$
    if (!inSingle && ch === '$') {
      // Try to match a dollar-quote open or close tag
      const m = sql.slice(i).match(/^\$([A-Za-z_][A-Za-z0-9_]*)?\$/);
      if (m) {
        const tag = m[0]; // e.g. "$$" or "$body$"
        if (dollarTag === null) {
          dollarTag = tag;
          buf += tag;
          i += tag.length;
          continue;
        } else if (dollarTag === tag) {
          dollarTag = null;
          buf += tag;
          i += tag.length;
          continue;
        }
      }
    }
    if (!dollarTag) {
      if (ch === "'" && sql[i - 1] !== '\\') {
        inSingle = !inSingle;
      }
      // Statement terminator: ";" at end of line (outside string)
      if (!inSingle && ch === ';') {
        buf += ch;
        // peek: is next non-whitespace a newline or EOF?
        const rest = sql.slice(i + 1);
        if (/^\s*(?:\n|$)/.test(rest) || i + 1 === sql.length) {
          // Only push if the statement isn't just whitespace/comments
          const stmt = buf.trim();
          if (stmt && !stmt.startsWith('--')) {
            out.push(stmt);
          }
          buf = '';
          i++;
          // skip trailing whitespace/newlines
          while (i < sql.length && /\s/.test(sql[i])) i++;
          continue;
        }
      }
    }
    buf += ch;
    i++;
  }
  // Trailing buffer (shouldn't be a full statement but push anyway)
  const tail = buf.trim();
  if (tail && !tail.startsWith('--')) out.push(tail);
  return out;
}

const statements = splitStatements(sql);
console.log(`[restore] parsed ${statements.length} statements`);

// Filter: skip pure SET session_replication_role etc — actually KEEP them,
// they're needed to disable FK checks during restore.
let count = 0;
let skipped = 0;
let errors = 0;
const errorSamples = [];
const BATCH = 25;
for (let i = 0; i < statements.length; i += BATCH) {
  const chunk = statements.slice(i, i + BATCH).join('\n;\n');
  try {
    await client.query(chunk);
    count += Math.min(BATCH, statements.length - i);
    if (count % 250 < BATCH) {
      console.log(`[restore] ${count}/${statements.length} statements OK (${((count / statements.length) * 100).toFixed(1)}%)`);
    }
  } catch (err) {
    // Some statements (e.g. DELETE on a table with FK to a not-yet-restored
    // table) can fail; the dump's session_replication_role=replica should
    // disable triggers, but type/permission errors can still happen. Log
    // and continue so a partial restore still lands the Question rows.
    errors++;
    if (errorSamples.length < 5) {
      errorSamples.push({ idx: i, msg: err.message, preview: chunk.slice(0, 120) });
    }
    skipped += Math.min(BATCH, statements.length - i);
  }
}

console.log('');
console.log(`[restore] done: ${count} OK, ${skipped} skipped on error, ${errors} error batches`);
if (errorSamples.length) {
  console.log('[restore] first error samples:');
  for (const s of errorSamples) {
    console.log(`  #${s.idx}: ${s.msg}`);
    console.log(`    stmt: ${s.preview}…`);
  }
}

// Verify Question rows landed
const qCount = await client.query('SELECT COUNT(*)::int AS n FROM "Question"').catch(() => ({ rows: [{ n: -1 }] }));
const qbCount = await client.query('SELECT COUNT(*)::int AS n FROM "QuestionBank"').catch(() => ({ rows: [{ n: -1 }] }));
const uCount = await client.query('SELECT COUNT(*)::int AS n FROM "User"').catch(() => ({ rows: [{ n: -1 }] }));
console.log(`[restore] verify: Question=${qCount.rows[0].n}  QuestionBank=${qbCount.rows[0].n}  User=${uCount.rows[0].n}`);

await client.end();
console.log('[restore] connection closed');
