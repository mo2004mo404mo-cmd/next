/** End-to-end API tests for the new routes (run with the dev server's DB). */
import { db } from '../src/lib/db';

async function main() {
  const student = await db.user.findFirst({ where: { email: 'student@medq.com' }, select: { id: true } });
  if (!student) throw new Error('no student user');
  const STUDENT_ID = student.id;
  // 1. Pick a real question to test the attempt + calibration + FSRS flows
  const q = await db.question.findFirst({ where: { system: 'General' }, select: { id: true, answer: true } });
  if (!q) throw new Error('no questions in bank');

  // 2. FSRS review-hub POST simulation — call the scheduler the way the route does
  const { fsrsReview, cardFromProgress, ratingFromAction, sm2Compat, NEW_CARD } = await import('../src/lib/fsrs');
  const fp0 = await db.flashcardProgress.findUnique({ where: { userId_questionId: { userId: STUDENT_ID, questionId: q.id } } });
  if (fp0) await db.flashcardProgress.delete({ where: { id: fp0.id } });

  const now = new Date();
  const result = fsrsReview(NEW_CARD, ratingFromAction('got_it'), 0);
  const compat = sm2Compat(result.state, result.intervalDays);
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + result.intervalDays);
  const upserted = await db.flashcardProgress.create({
    data: {
      userId: STUDENT_ID, questionId: q.id,
      interval: compat.interval, repetition: compat.repetition, efactor: compat.efactor,
      nextReview, lastReview: now,
      stability: result.state.stability, fsrsDifficulty: result.state.difficulty,
      reps: result.state.reps, lapses: result.state.lapses, lastRating: result.state.lastRating, state: result.state.state,
    },
  });
  console.log('FSRS progress row created:', JSON.stringify({
    interval: upserted.interval, stability: upserted.stability, difficulty: upserted.fsrsDifficulty,
    reps: upserted.reps, state: upserted.state, nextReview: upserted.nextReview.toISOString().slice(0, 10),
  }));

  // simulate 3 more good reviews
  let card = result.state;
  for (let i = 0; i < 3; i++) {
    const elapsed = card.stability;
    const r = fsrsReview(card, 3, elapsed);
    card = r.state;
    await db.flashcardProgress.update({
      where: { id: upserted.id },
      data: { stability: r.state.stability, fsrsDifficulty: r.state.difficulty, reps: r.state.reps, interval: r.intervalDays, nextReview: new Date(Date.now() + r.intervalDays * 864e5) },
    });
  }
  const after = await db.flashcardProgress.findUnique({ where: { id: upserted.id } });
  console.log('After 4 Good reviews:', JSON.stringify({ S: after?.stability.toFixed(1), D: after?.fsrsDifficulty.toFixed(1), interval: after?.interval }));
  await db.flashcardProgress.delete({ where: { id: upserted.id } });

  // 3. MediaSearchCache — verify the self-healing cache table is queryable
  const cacheCount = await db.mediaSearchCache.count();
  console.log('MediaSearchCache rows:', cacheCount);

  // 4. Question new fields present
  const full = await db.question.findFirst({ where: { id: q.id }, select: { labPanel: true, pcgSpec: true, hotspots: true, structureTags: true, blueprintOrgan: true, reviewStatus: true, difficultyP: true, discrimination: true, attemptsCount: true } });
  console.log('New question fields on sample row:', JSON.stringify(full));

  await db.$disconnect();
}
main().catch((e) => { console.error(e); process.exit(1); });
