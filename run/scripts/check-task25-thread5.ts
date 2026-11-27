import { db } from '../src/lib/db';
async function main() {
  const t = await db.agentThread.findUnique({ where: { id: '81540824-76d4-46a3-b3a7-deaffc487d0d' }, select: { id: true, userId: true, title: true, updatedAt: true } });
  console.log('thread 81540824:', JSON.stringify(t));
  if (t) {
    const n = await db.agentThreadMessage.count({ where: { threadId: t.id } });
    console.log('messages:', n);
  }
  await db.$disconnect();
}
main();
