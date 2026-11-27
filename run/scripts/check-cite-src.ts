import { db } from '../src/lib/db';
const q = await db.question.findUnique({ where: { id: 'cmv7lh3eb000i57q8u17prdc9' }, select: { citations: true } });
const cits = JSON.parse(q?.citations ?? '[]');
for (const c of cits) console.log(c.chunkId, '| src:', c.sourceId, '| title:', c.title);
// verify sources exist
for (const c of cits) {
  const s = await db.knowledgeSource.findUnique({ where: { id: String(c.sourceId) }, select: { id: true, name: true, userId: true, status: true } });
  console.log('  →', s ? `${s.name} (${s.status})` : 'MISSING SOURCE');
}
await db.$disconnect();
