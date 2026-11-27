// Check: does the corpus actually contain the answer fact for the lead question?
import { db } from '../src/lib/db';

const src = await db.knowledgeSource.findFirst({ where: { name: { contains: 'Peditric' } }, select: { id: true } });
if (!src) throw new Error('source not found');

// 1. Search the whole corpus for the lead-absorption fact
const hits = await db.knowledgeChunk.findMany({
  where: { sourceId: src.id, content: { contains: 'lead', mode: 'insensitive' } },
  select: { id: true, idx: true, content: true },
});

console.log(`chunks mentioning "lead": ${hits.length}\n`);
for (const h of hits) {
  const c = h.content;
  const absorption = /absorb|absorption|uptake|iron def/i.exec(c);
  console.log(`── ${h.id.slice(-6)} (passage ${h.idx + 1}, ${c.length} chars) ` +
    `${absorption ? '⚡ mentions absorption/uptake/iron-def @' + absorption.index : ''}`);
  if (absorption) {
    // show the sentence around the match
    const start = Math.max(0, absorption.index - 200);
    console.log('   …' + c.slice(start, absorption.index + 300).replace(/\s+/g, ' ') + '…\n');
  }
}

// 2. The stored citation for the question — what does it actually say?
const recent = await db.question.findMany({
  orderBy: { updatedAt: 'desc' },
  select: { id: true, text: true, answer: true, explanation: true, citations: true },
  take: 40,
});
const q = recent.find((r) => { try { return JSON.parse(r.citations ?? '[]').length > 0 && /lead/i.test(r.text); } catch { return false; } });
if (q) {
  const cits = JSON.parse(q.citations ?? '[]');
  console.log('\n══ The lead question ══');
  console.log('A:', String(q.answer).slice(0, 140));
  console.log('E:', String(q.explanation).slice(0, 300));
  for (const c of cits) {
    const chunk = await db.knowledgeChunk.findUnique({ where: { id: c.chunkId }, select: { content: true, idx: true } });
    console.log(`\n── cited ${c.chunkId?.slice(-6)} (passage ${chunk ? chunk.idx + 1 : '?'}) quote: ${String(c.quote).slice(0, 120)}…`);
    if (chunk) console.log('   content: ' + chunk.content.replace(/\s+/g, ' ').slice(0, 400) + '…');
  }
}

await db.$disconnect();
