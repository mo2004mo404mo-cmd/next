/** E2E verification helper — inspect notifications + agent-sent chat messages. */
import { db } from '../src/lib/db';

async function main() {
  const student = await db.user.findFirst({ where: { email: 'student@medq.com' }, select: { id: true } });
  const notifs = await db.notification.findMany({
    where: { userId: student!.id },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
  console.log('--- Latest notifications ---');
  for (const n of notifs) {
    console.log(`${n.type} | ${n.title.slice(0, 55)} | ref: ${n.referenceId.slice(0, 42)}`);
  }
  const agentMessages = await db.chatMessage.findMany({
    where: { senderId: student!.id, metadata: { contains: 'medq-agent' } },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });
  console.log('--- Agent-sent chat messages ---');
  for (const m of agentMessages) {
    console.log(`${m.roomId.slice(-8)} | ${m.content.slice(0, 60)}`);
  }
  await db.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
