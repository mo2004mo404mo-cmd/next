// Full content of artifact-creating assistant messages
import { db } from '../src/lib/db';

async function main() {
  const targets = [
    'a93633c9-bb1f-43d6-9cc0-0762fa8bf42b', // anemia pdf-generation (admin)
    '02d4681f-cc85-4006-9f1f-2d5dd53a88c1', // poster (guest)
    'f8364e92-321f-4436-9504-2b892467ddf4', // pdf-cheat-sheet heart failure (guest)
  ];
  for (const tid of targets) {
    const msgs = await db.agentThreadMessage.findMany({
      where: { threadId: tid },
      orderBy: { createdAt: 'asc' },
    });
    console.log(`\n===== thread ${tid} (${msgs.length} msgs)`);
    for (const m of msgs) {
      if (m.role !== 'assistant') continue;
      console.log(`--- assistant @ ${m.createdAt.toISOString()} contentLen=${m.content.length}`);
      console.log(m.content.slice(-900));
      console.log('   [content has /api/medq-agent link?]', m.content.includes('/api/medq-agent'));
      console.log('   [content has generated/artifact link?]', m.content.includes('/generated/artifact'));
    }
  }
}

main().finally(() => db.$disconnect());
