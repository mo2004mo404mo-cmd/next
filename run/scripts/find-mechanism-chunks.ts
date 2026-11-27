// Find the TRUE mechanism chunks for the B12 (gastric surgery) and lead questions.
import { db } from '../src/lib/db';

const src = await db.knowledgeSource.findFirst({ where: { name: { contains: 'Peditric' } }, select: { id: true } });
if (!src) throw new Error('source not found');

const patterns: Array<{ label: string; re: RegExp }> = [
  { label: 'intrinsic factor', re: /intrinsic\s+factor/i },
  { label: 'gastric surgery / gastrectomy', re: /gastric\s+(surgery|resection)|gastrectomy/i },
  { label: 'B12 absorption mechanism', re: /B12\s+absorption|absorption\s+of\s+(vitamin\s+)?B12/i },
  { label: 'lead absorption mechanism', re: /lead\s+absorption|absorption\s+of\s+lead/i },
];

const all = await db.knowledgeChunk.findMany({
  where: { sourceId: src.id },
  select: { id: true, idx: true, content: true },
});
console.log(`corpus: ${all.length} chunks\n`);

for (const p of patterns) {
  const hits = all.filter((c) => p.re.test(c.content));
  console.log(`══ ${p.label}: ${hits.length} chunks ══`);
  for (const h of hits.slice(0, 5)) {
    const m = p.re.exec(h.content)!;
    const start = Math.max(0, m.index - 180);
    console.log(`  ${h.id.slice(-6)} (passage ${h.idx + 1}):`);
    console.log(`    …${h.content.slice(start, m.index + 320).replace(/\s+/g, ' ')}…\n`);
  }
}

await db.$disconnect();
