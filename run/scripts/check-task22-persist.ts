// Task 22 verification: the persisted assistant message for the ask_user
// (form-only) turn carries the new placeholder instead of the old
// "(tool run interrupted — no text was produced)".
import { db } from '../src/lib/db';

async function main() {
  const msgs = await db.agentThreadMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
    select: {
      role: true,
      content: true,
      createdAt: true,
      toolCalls: true,
    },
  });
  for (const m of msgs) {
    const tc = Array.isArray(m.toolCalls) ? (m.toolCalls as Array<{ name?: string }>) : [];
    const ask = tc.some((c) => c?.name === 'ask_user');
    console.log(
      `[${m.createdAt?.toISOString().slice(11, 19)}] ${m.role}${ask ? ' (ask_user)' : ''}: ${String(m.content).slice(0, 90).replace(/\n/g, ' ')}`
    );
  }
  const bad = msgs.some((m) => String(m.content).includes('tool run interrupted'));
  console.log(bad ? 'FAIL: old interrupted placeholder found' : 'OK: no old placeholder');
}

main().finally(() => db.$disconnect());
