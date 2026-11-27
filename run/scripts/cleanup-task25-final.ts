import { db } from '../src/lib/db';
async function main() {
  const t = await db.agentThread.deleteMany({ where: { id: '81540824-76d4-46a3-b822-8869c1c00815' } });
  console.log('typo-guard:', t.count);
  const real = await db.agentThread.deleteMany({ where: { id: '81540824-76d4-46a3-b3a7-deaffc487d0d' } });
  console.log('test thread deleted:', real.count);
  const remaining = await db.agentThread.findMany({
    where: { userId: 'cmuser2vb0000scr8wuwwi596', updatedAt: { gte: new Date('2026-10-25T00:00:00Z') } },
    select: { id: true, title: true },
  });
  console.log('student threads touched today remaining:', remaining.length);
  await db.$disconnect();
}
main();
