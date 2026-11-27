// Task 25 cleanup #3: the runtime's thread UUID maps to a cuid PK via the
// message rows — find the thread whose messages mention the smoke test and
// delete it.
import { db } from '../src/lib/db';

async function main() {
  const msgs = await db.agentThreadMessage.findMany({
    where: { content: { contains: 'hyponatremia classification', mode: 'insensitive' } },
    select: { threadId: true, role: true },
    take: 10,
  });
  const ids = [...new Set(msgs.map((m) => m.threadId))];
  console.log('thread cuids:', JSON.stringify(ids));
  for (const id of ids) {
    const t = await db.agentThread.findUnique({ where: { id }, select: { id: true, title: true, userId: true } });
    if (!t) continue;
    await db.agentThread.delete({ where: { id: t.id } });
    console.log('deleted thread:', t.id, '—', t.title, '— user', t.userId);
  }
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
