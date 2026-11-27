import { db } from '../src/lib/db';
async function main() {
  const q = await db.question.findFirst({ orderBy: { createdAt: 'desc' }, select: { id: true } });
  console.log('QID:' + (q?.id || ''));
  await db.$disconnect();
}
main();
