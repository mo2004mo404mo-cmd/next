// Inspect thread snapshots: do persisted messages keep artifact tool results?
import { db } from '../src/lib/db';

async function main() {
  const msgs = await db.agentThreadMessage.findMany({
    where: { role: 'assistant' },
    orderBy: { createdAt: 'desc' },
    take: 300,
    select: {
      id: true, createdAt: true, threadId: true,
      toolResults: true, toolCalls: true,
      thread: { select: { userId: true, title: true, updatedAt: true } },
    },
  });
  const withArtifacts = msgs.filter((m) => (m.toolResults ?? '').includes('"created"'));
  console.log(`assistant msgs scanned: ${msgs.length}, with artifact results: ${withArtifacts.length}`);
  for (const m of withArtifacts.slice(0, 10)) {
    console.log(`\n- msg ${m.id} at ${m.createdAt.toISOString()} thread=${m.threadId} (owner=${m.thread?.userId}, title=${m.thread?.title})`);
    try {
      const results = JSON.parse(m.toolResults ?? '[]') as Array<{ toolName?: string; content?: string; isError?: boolean }>;
      for (const r of results) {
        if ((r.content ?? '').includes('"created"')) {
          console.log(`    tool ${r.toolName} err=${r.isError}: ${r.content?.slice(0, 200)}`);
        }
      }
    } catch (e) {
      console.log(`    toolResults JSON parse failed: ${String(e)}`);
    }
  }
}

main().finally(() => db.$disconnect());
