/**
 * Audit round 3 cleanup — reset E2E test artifacts:
 *   1. Delete the e2e-audit3-test-skill AgentSkill row (created via the UI test)
 *   2. Delete AgentTask rows created by the study-coach E2E (chat-agent tasks)
 *   3. Fix the thread whose title captured the model's preamble
 *
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/cleanup-audit3.ts
 */
import { db } from '../src/lib/db';

async function main() {
  // 1. Test skill
  const skills = await db.agentSkill.deleteMany({ where: { name: 'e2e-audit3-test-skill' } });
  console.log(`deleted test skills: ${skills.count}`);

  // 2. Study-coach E2E tasks (source 'agent', created in the last 2 hours
  //    during this E2E session, Week-titled)
  const cutoff = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const tasks = await db.agentTask.deleteMany({
    where: {
      title: { contains: 'Week' },
      source: 'agent',
      createdAt: { gte: cutoff },
    },
  });
  console.log(`deleted agent tasks: ${tasks.count}`);

  // 3. Bad title thread — find threads whose title looks like the preamble echo
  const threads = await db.agentThread.findMany({
    where: { title: { startsWith: 'Okay, the user wants' } },
    select: { id: true, title: true },
  });
  for (const t of threads) {
    const first = await db.agentThreadMessage.findFirst({
      where: { threadId: t.id, role: 'user' },
      orderBy: { createdAt: 'asc' },
      select: { content: true },
    });
    const derived = first?.content.slice(0, 80).replace(/\s+/g, ' ').trim() || 'New conversation';
    await db.agentThread.update({ where: { id: t.id }, data: { title: derived } });
    console.log(`reset bad title on thread ${t.id} -> "${derived.slice(0, 50)}"`);
  }
  console.log('cleanup done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
