// Task 25 cleanup: remove the E2E smoke-test thread + its 2 hyponatremia
// flashcards from the student account (cmuser2vb...) so the learner's data
// stays clean. Test thread: 81540824-76d4-46a3-b3a7-deaffc487d0d.
import { db } from '../src/lib/db';

async function main() {
  const THREAD = '81540824-76d4-46a3-b3a7-deaffc487d0d';
  const USER = 'cmuser2vb0000scr8wuwwi596';
  const FRONTS = [
    'Hyponatremia classification by serum sodium level',
    'Hyponatremia classification by volume status',
  ];

  const thread = await db.agentThread.deleteMany({ where: { id: THREAD } });
  console.log('threads deleted:', thread.count);

  const cards = await db.question.deleteMany({ where: { text: { in: FRONTS } } });
  console.log('test flashcards deleted:', cards.count);

  const prog = await db.flashcardProgress.deleteMany({
    where: { userId: USER, question: { text: { in: FRONTS } } },
  });
  console.log('progress rows deleted:', prog.count);
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
