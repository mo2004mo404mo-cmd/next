import { db } from '../src/lib/db';
async function main() {
  const c = await db.mediaSearchCache.count();
  const a = await db.questionAttempt.count();
  const q = await db.question.findFirst({ select: { labPanel: true, hotspots: true, blueprintOrgan: true, reviewStatus: true } });
  const fp = await db.flashcardProgress.findFirst({ select: { stability: true, fsrsDifficulty: true, state: true } });
  console.log('mediaSearchCache rows:', c, '| questionAttempt rows:', a);
  console.log('question new fields:', JSON.stringify(q));
  console.log('flashcard FSRS fields:', JSON.stringify(fp));
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
