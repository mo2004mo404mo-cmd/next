import { db } from '../src/lib/db';
async function main() {
  const msgs = await db.agentThreadMessage.findMany({
    where: { threadId: '81540824-76d4-46a3-b3a7-deaffc487d0d' },
    select: { role: true, content: true, createdAt: true },
  });
  console.log('count:', msgs.length);
  for (const m of msgs) console.log(m.createdAt.toISOString(), m.role, JSON.stringify(m.content.slice(0, 70)));
  const t = await db.agentThread.findUnique({ where: { id: '81540824-76d4-46a3-b3a7-deaffc487d0d' }, select: { id: true, title: true, userId: true } });
  console.log('thread row:', JSON.stringify(t));
  await db.$disconnect();
}
main();
