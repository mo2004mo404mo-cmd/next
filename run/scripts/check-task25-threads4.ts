import { db } from '../src/lib/db';
async function main() {
  const threads = await db.agentThread.findMany({
    where: { userId: 'cmuser2vb0000scr8wuwwi596' },
    orderBy: { updatedAt: 'desc' },
    take: 5,
    select: { id: true, title: true, updatedAt: true },
  });
  console.log(JSON.stringify(threads, null, 2));
  await db.$disconnect();
}
main();
