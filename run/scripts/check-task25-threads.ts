import { db } from '../src/lib/db';
async function main() {
  const msgs = await db.agentThreadMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
    select: { threadId: true, role: true, content: true, createdAt: true },
  });
  for (const m of msgs) console.log(m.createdAt.toISOString(), m.threadId, m.role, JSON.stringify(m.content.slice(0, 60)));
  await db.$disconnect();
}
main();
