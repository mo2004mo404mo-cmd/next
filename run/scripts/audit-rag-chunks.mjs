/**
 * Audit stored KnowledgeChunks for mid-word / mid-sentence cuts.
 * Uses raw pg (no Prisma client resolution issues).
 * Run: node scripts/audit-rag-chunks.mjs
 */
import pg from 'pg';

const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });

/** Heuristic: does this chunk text start or end mid-word / mid-sentence? */
function detectCuts(content) {
  const t = (content || '').trim();
  if (!t) return { startCut: false, endCut: false };
  const startCut = /^[a-z]/.test(t);
  const endsWithTerminator = /[.!?…:"')\]]$/.test(t);
  const endCut = !endsWithTerminator && t.length > 80;
  return { startCut, endCut };
}

async function main() {
  await client.connect();
  const { rows: sources } = await client.query(
    `SELECT id, name, type, "createdAt", "metaJson" FROM "KnowledgeSource" WHERE status='ready' ORDER BY "createdAt" ASC`,
  );
  console.log(`Ready sources: ${sources.length}\n`);

  let totalLegacy = 0;
  for (const s of sources) {
    const { rows: chunks } = await client.query(
      `SELECT idx, content, "contextSummary", "embeddingModel" FROM "KnowledgeChunk" WHERE "sourceId"=$1 ORDER BY idx ASC`,
      [s.id],
    );
    if (!chunks.length) continue;
    let meta = {};
    try { meta = s.metaJson ? JSON.parse(s.metaJson) : {}; } catch {}

    let startCuts = 0, endCuts = 0;
    const samples = [];
    for (const c of chunks) {
      const { startCut, endCut } = detectCuts(c.content);
      if (startCut) startCuts++;
      if (endCut) {
        endCuts++;
        if (samples.length < 2) samples.push(`   chunk#${c.idx} tail: …${c.content.slice(-90).replace(/\n/g, '⏎')}`);
      }
    }
    const legacy = startCuts + endCuts > 0;
    if (legacy) totalLegacy++;
    const enriched = chunks.some((c) => c.contextSummary && !c.contextSummary.startsWith('From "'));
    console.log(`${legacy ? 'WARN' : ' OK '} ${String(s.name).slice(0, 50)} (${chunks.length} chunks, model=${chunks[0].embeddingModel}, enriched=${enriched}, reindexed=${meta.reindexedAt ? 'yes' : 'no'})`);
    if (legacy) {
      console.log(`      -> startCuts=${startCuts} endCuts(no terminator)=${endCuts}`);
      samples.forEach((x) => console.log(x));
    }
  }
  console.log(`\nSources with suspected legacy cuts: ${totalLegacy}/${sources.length}`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => client.end());
