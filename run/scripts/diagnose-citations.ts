// diagnose-citations.ts — do cited chunks actually contain the answer?
//
// For each recent question with citations:
//   - extract stem / answer / explanation / options
//   - load each cited chunk's full content
//   - measure answer-grounding with the PRODUCTION scorer
//     (scoreCitationGrounding, IDF-weighted over the cited sources' chunks):
//     answerCoverage (names the answer) + mechanismCoverage (carries the
//     "why" vocabulary) + explanation/stem coverage
//   - flag citations that merely MENTION the answer label
//     (answerCoverage high, mechanismCoverage low) — the user-visible
//     "cited chunks only contain some words like vitamin b12" failure
import { SQL } from 'bun';
import {
  scoreCitationGrounding,
  makeCitationIdf,
  type CitationIdf,
} from '../src/lib/agent/knowledge/text-quality';

const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

const LIMIT = 12;
const questions = await sql`
  SELECT id, text, options, answer, explanation, citations, "createdAt"
  FROM "Question"
  WHERE citations IS NOT NULL AND citations != '[]' AND citations != 'null'
  ORDER BY "createdAt" DESC LIMIT ${LIMIT}`;

// IDF over ALL chunks of every source that shows up in a citation (the same
// signal the production path uses, scoped per cited source set).
const idfBySource = new Map<string, CitationIdf>();
async function idfFor(sourceId: string): Promise<CitationIdf | undefined> {
  if (sourceId === '(missing)') return undefined;
  if (idfBySource.has(sourceId)) return idfBySource.get(sourceId);
  const rows = await sql`SELECT content FROM "KnowledgeChunk" WHERE "sourceId" = ${sourceId}`;
  const idf = rows.length >= 8 ? makeCitationIdf(rows.map((r) => r.content)) : undefined;
  idfBySource.set(sourceId, idf);
  return idf;
}

console.log(`\n=== ${questions.length} recent cited questions ===\n`);
for (const q of questions) {
  let cits: Array<{ sourceId: string; chunkId: string; quote?: string }> = [];
  try { cits = JSON.parse(q.citations); } catch { continue; }
  if (!Array.isArray(cits) || cits.length === 0) continue;
  console.log('─'.repeat(90));
  console.log(`Q ${q.id} (${q.createdAt})`);
  console.log(`stem: ${String(q.text).replace(/\s+/g, ' ').slice(0, 140)}…`);
  console.log(`answer: ${String(q.answer).replace(/\s+/g, ' ').slice(0, 120)}`);
  for (const c of cits.slice(0, 4)) {
    const chunks = await sql`SELECT content, "sourceId" FROM "KnowledgeChunk" WHERE id = ${c.chunkId} LIMIT 1`;
    const content = chunks[0]?.content ?? '(chunk missing)';
    const idf = chunks[0] ? await idfFor(chunks[0].sourceId) : undefined;
    const g = scoreCitationGrounding(content, String(q.text), String(q.answer), String(q.explanation ?? ''), idf);
    // OK = names AND explains; LABEL = mentions the answer words without the
    // mechanism (the complaint this tool polices); WEAK/BAD = not grounded.
    const names = g.answerCoverage >= 0.5;
    const explains = g.mechanismCoverage >= 0.35 || g.explanationCoverage >= 0.7;
    const flag = names && explains ? 'OK  '
      : names && g.answerCoverage >= 0.7 ? 'LABEL'
      : g.score >= 0.3 ? 'WEAK' : 'BAD ';
    console.log(`  [${flag}] chunk ${c.chunkId.slice(-8)} len=${content.length} answerCov=${g.answerCoverage.toFixed(2)} mechCov=${g.mechanismCoverage.toFixed(2)} explCov=${g.explanationCoverage.toFixed(2)} score=${g.score.toFixed(2)}`);
    if (flag !== 'OK  ') {
      console.log(`       answer: ${String(q.answer).replace(/\s+/g, ' ').slice(0, 100)}`);
      console.log(`       chunk : ${content.replace(/\s+/g, ' ').slice(0, 160)}…`);
    }
  }
}
await sql.close();
