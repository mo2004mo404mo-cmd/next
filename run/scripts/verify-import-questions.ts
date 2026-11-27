/**
 * Verify imported UI-test questions in the DB.
 * Usage: bunx tsx scripts/verify-import-questions.ts
 */
import { db } from '../src/lib/db';

async function main() {
  const rows = await db.question.findMany({
    where: {
      OR: [
        { text: { contains: 'phenylketonuria' } },
        { text: { contains: 'Amoxicillin' } },
        { text: { contains: 'adrenal medulla' } },
      ],
    },
    select: { text: true, type: true, answer: true, options: true, difficulty: true, system: true, isAIGenerated: true },
    orderBy: { createdAt: 'desc' },
  });
  console.log(`Found ${rows.length} imported question(s):`);
  for (const q of rows) {
    console.log('-', JSON.stringify({ text: q.text.slice(0, 55), type: q.type, answer: q.answer, options: JSON.parse(q.options).length, difficulty: q.difficulty, system: q.system, isAIGenerated: q.isAIGenerated }));
  }
  const total = await db.question.count();
  console.log('Total questions in bank:', total);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
