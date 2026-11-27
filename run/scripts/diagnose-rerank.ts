// diagnose-rerank.ts — what does the LLM reranker actually do on the citation path?
//
// 1. RagQueryLog audit: recent queries → did rerank run? which chunks got
//    which rerank scores? did a rerank verdict move a chunk into/out of top-K?
// 2. Live replay on a real cited question: run the reranker on the SAME fused
//    pool with (a) the topic/stem-only query (the old answer-blind mode) and
//    (b) the enriched QUESTION+ANSWER+RATIONALE query (the corrective mode) —
//    measure whether answer-bearing chunks outrank decorative ones.
import { SQL } from 'bun';

const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

console.log('══ 1. RagQueryLog audit — recent hybrid retrievals ══\n');
const logs = await sql`
  SELECT id, query, "retrievedJson", "latencyMs", "createdAt"
  FROM "RagQueryLog"
  ORDER BY "createdAt" DESC LIMIT 15`;

for (const row of logs) {
  let retrieved: any[] = [];
  try { retrieved = JSON.parse(row.retrievedJson ?? '[]'); } catch {}
  const withRerank = retrieved.filter((c) => c?.stages?.rerank !== undefined);
  const stem = String(row.query ?? '').replace(/\s+/g, ' ').slice(0, 70);
  const mode = /CORRECT ANSWER:/i.test(row.query) ? 'CORRECTIVE(answer-aware)' : 'topic';
  console.log(`• [${mode}] "${stem}${String(row.query ?? '').length > 70 ? '…' : ''}"`);
  console.log(`  chunks=${retrieved.length} rerankScored=${withRerank.length} latency=${row.latencyMs}ms`);
  for (const c of retrieved.slice(0, 6)) {
    const st = c.stages ?? {};
    console.log(
      `    ${c.chunkId.slice(-6)} score=${c.score} dense=${st.dense ?? '–'} bm25=${st.lexical ?? '–'} rerank=${st.rerank ?? '–'}`
    );
  }
  console.log('');
}

console.log('══ 2. Chunk-rank stability (rerank verdicts vs RRF order) ══');
let moved = 0, total = 0;
for (const row of logs) {
  let retrieved: any[] = [];
  try { retrieved = JSON.parse(row.retrievedJson ?? '[]'); } catch {}
  const scored = retrieved.filter((c) => c?.stages?.rerank !== undefined);
  total += scored.length;
  // chunks the reranker scored >=4 are "reranked-in" (flag in code: rs >= 4)
  moved += scored.filter((c) => c.stages.rerank >= 4).length;
}
console.log(`  ${total} rerank-scored chunks across last ${logs.length} queries; ${(total ? Math.round(100 * moved / total) : 0)}% scored >= 4 (relevant per rubric)\n`);

await sql.close();
