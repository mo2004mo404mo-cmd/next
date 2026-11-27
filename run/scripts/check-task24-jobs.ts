/* Task 24 diagnostic part 2: scheduled/background jobs around 21:00-21:12 */
import { db } from '../src/lib/db';

async function main() {
  const since = new Date(Date.now() - 120 * 60_000);
  const jobs = await db.agentJob.findMany({
    where: { createdAt: { gte: since } },
    select: { id: true, kind: true, status: true, createdAt: true, startedAt: true, finishedAt: true, payloadJson: true, lastError: true },
    orderBy: { createdAt: 'asc' },
    take: 20,
  });
  for (const j of jobs) {
    console.log(JSON.stringify({
      id: j.id.slice(0, 8),
      kind: j.kind,
      status: j.status,
      created: j.createdAt?.toISOString().slice(11, 19),
      started: j.startedAt?.toISOString().slice(11, 19),
      finished: j.finishedAt?.toISOString().slice(11, 19),
      payload: j.payloadJson?.slice(0, 120),
      err: j.lastError?.slice(0, 60),
    }));
  }
  const counts = await db.agentJob.groupBy({ by: ['status'], _count: true });
  console.log('job status counts:', JSON.stringify(counts));
}

main().catch((e) => { console.error(e); process.exit(1); });
