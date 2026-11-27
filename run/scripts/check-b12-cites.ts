import { db } from '../src/lib/db';
const q = await db.question.findUnique({ where: { id: 'cmv7lh3eb000i57q8u17prdc9' }, select: { citations: true } });
const cits = JSON.parse(q?.citations ?? '[]');
for (const c of cits) {
  console.log(`── ${String(c.chunkId).slice(-6)} quote(${String(c.quote).length}ch): ${String(c.quote).slice(0, 100).replace(/\n/g, ' ')}…`);
  console.log(`   chunkContent ${String(c.chunkContent ?? '').length} chars present: ${Boolean(c.chunkContent)}`);
}
await db.$disconnect();
