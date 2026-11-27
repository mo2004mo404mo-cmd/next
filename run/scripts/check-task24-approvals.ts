/* Task 24 diagnostic: trace the two mystery approval rows */
import { db } from '../src/lib/db';

async function main() {
  const ids = ['2c7043cd-c20e-4b37-bc4b-10b352fb30dc', 'fef437df-0d1b-4360-b63c-4e442a75fa76', 'e334d68c-d114-4e21-b6c8-d26e91f036ec'];
  const rows = await db.agentApproval.findMany({
    where: { id: { in: ids } },
    select: { id: true, userId: true, threadId: true, toolName: true, status: true, createdAt: true, argsJson: true, description: true },
    orderBy: { createdAt: 'asc' },
  });
  for (const r of rows) {
    console.log(JSON.stringify({
      id: r.id.slice(0, 8),
      user: r.userId?.slice(-8),
      thread: r.threadId ? r.threadId.slice(0, 8) : '(empty)',
      tool: r.toolName,
      status: r.status,
      at: r.createdAt.toISOString(),
      args: r.argsJson?.slice(0, 140),
      desc: r.description?.slice(0, 80),
    }));
  }
  // Any OTHER pending approvals in the DB right now?
  const pending = await db.agentApproval.count({ where: { status: 'pending' } });
  console.log('DB pending approval rows total:', pending);
  const recent = await db.agentApproval.findMany({
    where: { createdAt: { gte: new Date(Date.now() - 90 * 60_000) } },
    select: { id: true, threadId: true, toolName: true, status: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
    take: 15,
  });
  console.log('--- last 90 min of approval rows ---');
  for (const r of recent) {
    console.log(r.createdAt.toISOString(), r.id.slice(0, 8), r.toolName, r.status, r.threadId ? r.threadId.slice(0, 8) : '(empty)');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
