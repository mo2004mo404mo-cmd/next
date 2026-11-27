/** Remove the 2 test questions generated during the audit-2 E2E regression. */
import { db } from '../src/lib/db';
async function main() {
  const testQs = await db.question.findMany({
    where: { OR: [{ topic: { contains: 'pediatric asthma' } }, { text: { contains: 'asthma' }, createdAt: { gte: new Date(Date.now() - 30 * 60 * 1000) } }] },
    select: { id: true, text: true, createdAt: true },
    take: 10,
  });
  console.log('candidates:', testQs.map(q => ({ id: q.id, snippet: q.text.slice(0, 50), at: q.createdAt })));
  const recent = testQs.filter(q => Date.now() - q.createdAt.getTime() < 30 * 60 * 1000);
  for (const q of recent) {
    await db.question.delete({ where: { id: q.id } }).catch(() => {});
    console.log('deleted', q.id);
  }
  const tasks = await db.agentTask.count();
  console.log('agentTask rows (test leftovers?):', tasks);
  process.exit(0);
}
main();
