/**
 * Delete E2E test questions (rows containing the "E2E" marker text).
 * Usage: bunx tsx scripts/cleanup-e2e-questions.ts
 */
import { db } from '../src/lib/db';

async function main() {
  const deleted = await db.question.deleteMany({
    where: {
      OR: [
        { text: { contains: 'E2E' } },
        { text: { contains: 'phenylketonuria' } },
        { text: { contains: 'Amoxicillin is a broad-spectrum' } },
        { text: { contains: 'adrenal medulla' } },
        { text: { contains: 'lateral rectus' } },
        { text: { contains: 'spleen filters blood' } },
        { text: { contains: 'JSON-TEST' } },
      ],
    },
  });
  console.log(`Deleted ${deleted.count} E2E test question(s)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
