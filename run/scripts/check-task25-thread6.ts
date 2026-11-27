import { db } from '../src/lib/db';
async function main() {
  const threads = await db.agentThread.findMany({
    where: { createdAt: { gte: new Date('2026-10-25T00:00:00Z') } },
    select: { id: true, userId: true, title: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  console.log('threads created today:', threads.length);
  console.log(JSON.stringify(threads.slice(0, 5), null, 2));
  const memories = await db.agentMemory.findMany({
    where: { createdAt: { gte: new Date('2026-10-25T03:01:00Z') } },
    select: { id: true, createdAt: true },
    take: 3,
  }).catch(() => null);
  console.log('memories after 03:01:', memories === null ? '(model name differs)' : JSON.stringify(memories));
  await db.$disconnect();
}
main();
