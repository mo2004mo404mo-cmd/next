// inspect-b12.ts — what does the cited chunk actually contain vs what would answer-support look like
import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

async function main() {
  const q0 = await sql`SELECT id, text, answer, explanation, options, citations FROM "Question" WHERE id = 'cmv7lh3eb000i57q8u17prdc9'`;
  const q = q0[0];
  console.log('=== QUESTION ===');
  console.log('text:', q.text.slice(0, 250));
  console.log('answer:', q.answer);
  console.log('explanation:', (q.explanation || '').slice(0, 500));
  const cites = (typeof q.citations === 'string' ? JSON.parse(q.citations) : q.citations) || [];
  for (const c of cites) {
    console.log(`\ncitation chunkId=${c.chunkId} quote="${(c.quote || '').slice(0, 100)}..." chunkContentLen=${(c.chunkContent || '').length}`);
  }

  for (const c of cites) {
    const rows = await sql`SELECT id, "sourceId", content, "metaJson" FROM "KnowledgeChunk" WHERE id = ${c.chunkId}`;
    if (!rows.length) { console.log(`chunk ${c.chunkId} NOT FOUND`); continue; }
    const r = rows[0];
    const m = r.metaJson ? JSON.parse(r.metaJson) : {};
    console.log(`\n=== FULL CHUNK ${r.id} (p${m.pageStart ?? '?'}-${m.pageEnd ?? '?'}, len=${r.content.length}) ===`);
    console.log(r.content.slice(0, 1300));
    console.log('---tail---');
    console.log(r.content.slice(-300));
  }

  const candidates = await sql`SELECT id, "metaJson", content FROM "KnowledgeChunk" WHERE content ILIKE '%B12%' OR content ILIKE '%cobalamin%' OR content ILIKE '%intrinsic factor%'`;
  console.log(`\n=== ${candidates.length} chunks mention B12/cobalamin/intrinsic-factor ===`);
  for (const c of candidates) {
    const m = c.metaJson ? JSON.parse(c.metaJson) : {};
    const hasIntrinsic = /intrinsic factor/i.test(c.content);
    const hasGastric = /gastrectom|gastric surgery|gastric resection/i.test(c.content);
    const hasGlossitis = /glossitis/i.test(c.content);
    const hasMegaloblastic = /megaloblastic/i.test(c.content);
    const hasB12 = /B12|cobalamin/i.test(c.content);
    const hasNeuro = /neurologic|neuropathy|paresthesia/i.test(c.content);
    console.log(`chunk ${c.id} p${m.pageStart ?? '?'}-${m.pageEnd ?? '?'} b12=${hasB12} intrinsic=${hasIntrinsic} gastric=${hasGastric} glossitis=${hasGlossitis} megaloblastic=${hasMegaloblastic} neuro=${hasNeuro}`);
  }
  await sql.end();
}
main();
