/** Insert a test question whose citation targets a mid-document chunk of the prevention PDF. */
import pg from 'pg';
const c = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await c.connect();

const { rows: [src] } = await c.query(`SELECT id, name FROM "KnowledgeSource" WHERE name='prevention-of-transmission.pdf'`);
const { rows: [doc] } = await c.query(`SELECT id FROM "KnowledgeDocument" WHERE "sourceId"=$1`, [src.id]);
const { rows: chunks } = await c.query(
  `SELECT id, idx, content FROM "KnowledgeChunk" WHERE "sourceId"=$1 AND idx IN (15,16) ORDER BY idx`, [src.id]);

const chunk = chunks[0];
console.log('citing chunk idx', chunk.idx, 'id', chunk.id);

await c.query(`DELETE FROM "Question" WHERE id='citetest000001'`);
await c.query(`
  INSERT INTO "Question" (
    id, type, system, topic, difficulty, text, options, answer,
    explanation, tags, sources, "knowledgeSourceIds", citations,
    "reviewStatus", "createdAt", "updatedAt"
  ) VALUES (
    'citetest000001', 'mcq', 'Infectious Disease', 'Hepatitis E epidemiology', 'Medium',
    'In areas of LOW endemicity, which patient group is most typically affected by sporadic cases of hepatitis E?',
    $1, 'Elderly persons with other diseases, including immunosuppressed persons',
    'In low-endemicity regions (Europe, North America, Japan), sporadic HEV cases occur mostly in elderly persons and those with other diseases, including immunosuppressed persons — a zoonotic pattern distinct from the waterborne outbreaks of hyperendemic regions.',
    $2, $3, $4, $5,
    'approved', NOW(), NOW()
  )`, [
  JSON.stringify([
    'Young children in rural areas with poor sanitation',
    'Pregnant women in hyperendemic regions',
    'Elderly persons with other diseases, including immunosuppressed persons',
    'Healthcare workers after needlestick exposure',
  ]),
  JSON.stringify(['hepatitis E', 'epidemiology', 'HEV']),
  JSON.stringify([{ type: 'library', title: 'prevention-of-transmission.pdf' }]),
  JSON.stringify([src.id]),
  JSON.stringify([{
    sourceId: src.id, chunkId: chunk.id, documentId: doc.id,
    title: 'prevention-of-transmission.pdf', fileKind: 'document',
    quote: chunk.content.slice(0, 400),
  }]),
]);
console.log('question inserted (citetest000001)');
await c.end();
