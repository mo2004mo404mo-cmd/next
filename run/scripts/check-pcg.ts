import { db } from '../src/lib/db';
async function main() {
  const q = await db.question.findFirst({
    where: { audioUrl: { not: '' }, pcgSpec: { not: '' } },
    orderBy: { createdAt: 'desc' },
    select: { id: true, pcgSpec: true, audioUrl: true, modelUrl: true, reviewStatus: true, blueprintOrgan: true, sources: true },
  });
  console.log('PCG question:', JSON.stringify(q, null, 1));
  await db.$disconnect();
}
main();
