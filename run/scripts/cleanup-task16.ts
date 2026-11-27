/**
 * Task 16 E2E cleanup:
 *   1. Delete the seeded digest-e2e group messages (3 seed runs, metadata.e2e)
 *   2. Delete the agent-sent ECG test message (metadata.via = medq-agent, today)
 *   3. Delete the test chat_mention notifications created during the E2E
 *   4. Delete the guest's heart-failure PDF artifact row + its /generated file
 *   5. Reset the student's lastReadAt to now in the Cardiology room
 *
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/cleanup-task16.ts
 */
import fs from 'node:fs';
import { db } from '../src/lib/db';

async function main() {
  // 1. Seeded digest messages
  const seeded = await db.chatMessage.deleteMany({ where: { metadata: { contains: 'digest-e2e' } } });
  console.log('deleted seeded digest messages:', seeded.count);

  // 2. Agent-sent ECG test message (today only — keep any older agent sends)
  const today = new Date(Date.now() - 6 * 60 * 60 * 1000);
  const agentSent = await db.chatMessage.deleteMany({
    where: {
      metadata: { contains: 'medq-agent' },
      content: { contains: 'ECG workshop on Wednesday' },
      createdAt: { gte: today },
    },
  });
  console.log('deleted agent-sent test message:', agentSent.count);

  // 3. Test notifications (chat_mention type created today by the digest E2E)
  const notifs = await db.notification.deleteMany({
    where: {
      type: 'chat_mention',
      createdAt: { gte: today },
    },
  });
  console.log('deleted test notifications:', notifs.count);

  // 4. Guest's test PDF artifact + file
  const artifacts = await db.agentArtifact.findMany({
    where: { kind: 'document', mimeType: 'application/pdf', name: { contains: 'heart' } },
    select: { id: true, url: true },
  });
  for (const artifact of artifacts) {
    if (artifact.url?.startsWith('/generated/')) {
      try {
        fs.rmSync(`public${artifact.url}`, { force: true });
      } catch { /* best-effort */ }
    }
    await db.agentArtifact.delete({ where: { id: artifact.id } });
  }
  console.log('deleted test PDF artifacts:', artifacts.length);

  // 5. Reset unread state
  const student = await db.user.findFirst({ where: { email: 'student@medq.com' }, select: { id: true } });
  if (student) {
    await db.chatRoomMember.updateMany({
      where: { userId: student.id },
      data: { lastReadAt: new Date() },
    });
    console.log('reset lastReadAt for student memberships');
  }

  await db.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
