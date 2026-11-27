import { db } from '../src/lib/db';
import { appendUserMessage } from '../src/lib/agent/threads/service';

async function main() {
  const tid = 'test-thread-task25-' + Date.now().toString(36);
  try {
    await appendUserMessage(tid, 'cmuser2vb0000scr8wuwwi596', 'persistence probe message');
    const t = await db.agentThread.findUnique({ where: { id: tid }, select: { id: true, title: true } });
    console.log('RESULT:', t ? `thread created: ${t.title}` : 'THREAD NOT CREATED');
    if (t) {
      await db.agentThread.delete({ where: { id: tid } });
      console.log('cleaned up probe thread');
    }
  } catch (e) {
    console.log('THREW:', e instanceof Error ? e.message : String(e));
  }
  await db.$disconnect();
}
main();
