import { db } from '../src/lib/db';
async function main() {
  const attempts = await db.questionAttempt.findMany({ orderBy: { createdAt: 'desc' }, take: 3, include: { question: { select: { id: true, text: true, difficultyP: true, discrimination: true, attemptsCount: true, reviewStatus: true, blueprintOrgan: true, blueprintTask: true, imageUrl: true, hotspots: true, pcgSpec: true } } } });
  for (const a of attempts) {
    console.log(JSON.stringify({
      id: a.id.slice(-8),
      isCorrect: a.isCorrect,
      confidence: a.confidence,
      mode: a.mode,
      timeSpent: a.timeSpent,
      q: {
        ecg: a.question.imageUrl?.startsWith('/generated/agent/ecg/') || false,
        reviewStatus: a.question.reviewStatus,
        blueprint: `${a.question.blueprintOrgan}/${a.question.blueprintTask}`,
        hotspots: (a.question.hotspots || '').slice(0, 80),
        difficultyP: a.question.difficultyP,
        attemptsCount: a.question.attemptsCount,
      },
    }, null, 1));
  }
  await db.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
