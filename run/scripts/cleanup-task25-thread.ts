// Task 25 cleanup #2: remove the leftover smoke-test thread (find by title
// pattern) from the student account.
import { db } from '../src/lib/db';

async function main() {
  const threads = await db.agentThread.findMany({
    where: { title: { contains: 'hyponatremia', mode: 'insensitive' } },
    select: { id: true, title: true, userId: true },
  });
  console.log('candidates:', JSON.stringify(threads));
  for (const t of threads) {
    await db.agentThread.delete({ where: { id: t.id } });
    console.log('deleted:', t.id, '-', t.title);
  }
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
