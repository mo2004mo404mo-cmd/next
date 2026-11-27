/**
 * Debug the exact paragraph that produces the mid-sentence cut.
 */
import pg from 'pg';
import fs from 'fs';

const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await client.connect();
const { rows } = await client.query(
  `SELECT id, name FROM "KnowledgeSource" WHERE name LIKE '%prevention%' LIMIT 1`,
);
const buffer = fs.readFileSync(`upload/file-store/${rows[0].id}.bin`);
const { getDocumentProxy, extractText } = await import('unpdf');
const pdf = await getDocumentProxy(new Uint8Array(buffer));
const { text } = await extractText(pdf, { mergePages: true });

// Reproduce normalizeExtractedText exactly (from text-quality.ts)
const HYPHEN_PARTICLES = new Set(['to','of','in','on','and','or','up','out','by','for','non','pre','post','anti','self','counter','cross','over','under','semi','pseudo','half','well','wide','open','full','high','low','new','old','long','short','free','fat','feed','back','ground','water','birth','side']);
const SOFT_WRAP_MIN_LINE = 50;
function normalizeExtractedText(text) {
  if (!text) return '';
  let t = text.replace(/\r\n?/g, '\n').replace(/\u00ad/g, '').replace(/[\u200b\u200e\u200f\ufeff]/g, '').replace(/\u00a0/g, ' ');
  t = t.replace(/([a-z]{2,})-\n([a-z])/g, (match, before, after) => HYPHEN_PARTICLES.has(before) ? `${before}-${after}` : `${before}${after}`);
  t = t.replace(/-\n(?=[A-Za-z0-9])/g, '-');
  const lines = t.split('\n');
  const rebuilt = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) { rebuilt.push('\n'); continue; }
    const next = i + 1 < lines.length ? lines[i + 1].trim() : '';
    const isSoftWrap = next.length > 0 && line.length >= SOFT_WRAP_MIN_LINE && !/[.!?;:]$/.test(line) && /^[\p{L}\p{N}([{"'“‘–—-]/u.test(next);
    rebuilt.push(isSoftWrap ? `${line} ` : `${line}\n`);
  }
  t = rebuilt.join('');
  t = t.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  return t;
}

const normalized = normalizeExtractedText(text);
// find the paragraph containing "immunosuppressed persons"
const idx = normalized.indexOf('immunosuppressed persons');
console.log('--- normalized text around target (400 chars) ---');
console.log(JSON.stringify(normalized.slice(idx - 260, idx + 200)));
await client.end();
