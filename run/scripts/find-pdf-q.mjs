import pg from 'pg';
const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await client.connect();
// Find questions with citations whose sources are retained PDFs
const { rows } = await client.query(`
  SELECT q.id, q.stem, q.citations,
         ks.name AS source_name, ks.id AS source_id,
         (SELECT COUNT(*) FROM "KnowledgeChunk" kc WHERE kc."sourceId" = ks.id) AS chunks
  FROM "Question" q,
       jsonb_to_recordset(q.citations::jsonb) AS c(sourceId text, quote text)
  JOIN "KnowledgeSource" ks ON ks.id = c."sourceId"
  WHERE ks."metaJson"->>'originalMime' = 'application/pdf' OR ks."metaJson"->>'originalMime' LIKE 'application%'
  ORDER BY q."createdAt" DESC
  LIMIT 5
`);
for (const r of rows) {
  const cits = JSON.parse(r.citations).filter(c => c.sourceId === r.source_id);
  console.log(`Q ${r.id.slice(-6)} [${r.source_name}] chunks=${r.chunks}`);
  console.log(`  stem: ${r.stem?.slice(0, 80)}`);
  console.log(`  quote: ${cits[0]?.quote?.slice(0, 90)}`);
}
await client.end();
