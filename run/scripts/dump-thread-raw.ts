// Dump raw toolCalls/toolResults JSON for threads that created artifacts
import { db } from '../src/lib/db';

async function main() {
  const threads = await db.agentThread.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 6,
    select: { id: true, title: true, userId: true, updatedAt: true, messages: { orderBy: { createdAt: 'asc' } } },
  });
  for (const t of threads) {
    console.log(`\n=== thread ${t.id} "${t.title}" owner=${t.userId} updated=${t.updatedAt.toISOString()} msgs=${t.messages.length}`);
    for (const m of t.messages.slice(-6)) {
      const tc = m.toolCalls ? m.toolCalls.slice(0, 150) : 'none';
      const tr = m.toolResults ? m.toolResults.slice(0, 300) : 'none';
      console.log(`  [${m.role}] ${m.createdAt.toISOString()} content=${m.content.slice(0, 80).replace(/\n/g, ' ')}`);
      console.log(`    toolCalls: ${tc}`);
      console.log(`    toolResults: ${tr}`);
    }
  }
}

main().finally(() => db.$disconnect());
