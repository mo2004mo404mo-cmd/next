/* Task 24 cleanup: orphaned pending approval rows (their in-process waits
 * died with restarts — they can never be resumed) → mark superseded so the
 * DB is honest. The listPendingApprovals age filter also now excludes them,
 * but the rows themselves shouldn't linger as 'pending' forever. */
import { db } from '../src/lib/db';

async function main() {
  const cutoff = new Date(Date.now() - 10 * 60_000); // older than the 5-min gate timeout + margin
  const res = await db.agentApproval.updateMany({
    where: { status: 'pending', createdAt: { lt: cutoff } },
    data: { status: 'rejected', decidedAt: new Date() },
  });
  console.log('orphaned pending rows marked rejected:', res.count);
  const still = await db.agentApproval.count({ where: { status: 'pending' } });
  console.log('rows still pending (young):', still);
}

main().catch((e) => { console.error(e); process.exit(1); });
