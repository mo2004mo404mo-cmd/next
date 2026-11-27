/** Delete Task-24 E2E test questions. Usage: bun scripts/cleanup-e2e-v3.ts */
import { db } from '../src/lib/db';

async function main() {
  const deleted = await db.question.deleteMany({
    where: {
      OR: [
        { text: { contains: '50S ribosomal subunit' } },
        { text: { contains: 'Vancomycin is orally absorbed' } },
        { text: { contains: 'electrolyte abnormality does thiazide' } },
        { text: { contains: 'Test import guest Q' } },
        { text: { contains: 'Duplicate check new question' } },
      ],
    },
  });
  const total = await db.question.count();
  console.log(`deleted ${deleted.count}, bank now has ${total} questions`);
}
main().finally(() => db.$disconnect());
