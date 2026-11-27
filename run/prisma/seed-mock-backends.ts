/**
 * Seed script for the mock-backend wiring project.
 *
 * Populates three new tables from the static content that was previously
 * inlined in API route files:
 *   - MedicalTriviaQuestion  (25 rows from medical-trivia-questions.ts)
 *   - EcgPattern              (14 rows from ecg-patterns.ts)
 *   - FlashcardArenaResult    (10 leaderboard rows from /api/flashcard-arena route)
 *
 * Also defines a daily Achievement catalog that the new study-streaks API
 * surface will surface (each Achievement is unique on `type`).
 *
 * Idempotent — uses upsert on the natural key (`legacyId` for patterns,
 * `question` text for trivia). Safe to re-run.
 *
 * Usage:
 *   bunx tsx prisma/seed-mock-backends.ts
 */

import { db as prisma } from '../src/lib/db';
import { TRIVIA_QUESTIONS_SEED } from '../src/lib/mock-data/medical-trivia-questions';
import { ECG_PATTERNS_SEED } from '../src/lib/mock-data/ecg-patterns';

// `prisma` is the shared singleton from src/lib/db so that the same connection
// pool is reused. The PrismaClient import is kept only for type inference.

// Same hardcoded leaderboard that was inlined in src/app/api/flashcard-arena/route.ts.
// We re-seed it so the arena is never empty on first deploy.
const SEED_LEADERBOARD: Array<{
  username: string;
  avatar: string;
  mode: string;
  score: number;
  accuracy: number;
  streak: number;
  timePerCard: number;
}> = [
  { username: 'DrAceMed', avatar: '🩺', mode: 'speed', score: 9850, accuracy: 94, streak: 28, timePerCard: 3.2 },
  { username: 'MedNinja42', avatar: '💊', mode: 'speed', score: 9420, accuracy: 91, streak: 22, timePerCard: 3.5 },
  { username: 'AnatomyKing', avatar: '🧠', mode: 'speed', score: 9100, accuracy: 89, streak: 19, timePerCard: 3.8 },
  { username: 'PharmWhiz', avatar: '💉', mode: 'accuracy', score: 8750, accuracy: 97, streak: 35, timePerCard: 8.4 },
  { username: 'PathPro', avatar: '🔬', mode: 'accuracy', score: 8500, accuracy: 96, streak: 31, timePerCard: 9.1 },
  { username: 'NeuroStar', avatar: '⚡', mode: 'accuracy', score: 8200, accuracy: 95, streak: 27, timePerCard: 9.5 },
  { username: 'CardioQueen', avatar: '❤️', mode: 'marathon', score: 15800, accuracy: 82, streak: 45, timePerCard: 5.6 },
  { username: 'SurgMaster', avatar: '🏥', mode: 'marathon', score: 14200, accuracy: 79, streak: 38, timePerCard: 6.1 },
  { username: 'BiochemBoss', avatar: '🧬', mode: 'marathon', score: 13500, accuracy: 77, streak: 33, timePerCard: 6.8 },
  { username: 'ImmunoGuru', avatar: '🛡️', mode: 'marathon', score: 12100, accuracy: 75, streak: 29, timePerCard: 7.2 },
];

// Achievement catalog used by the streak tab. Each entry is unique on `type`.
const SEED_ACHIEVEMENTS: Array<{ type: string; title: string; description: string; icon: string }> = [
  { type: 'first_question', title: 'First Steps', description: 'Study your first question', icon: '🌱' },
  { type: 'streak_7', title: 'Week Warrior', description: '7-day study streak', icon: '🔥' },
  { type: 'streak_30', title: 'Monthly Master', description: '30-day study streak', icon: '🏆' },
  { type: 'streak_60', title: 'Supernova', description: '60-day study streak', icon: '🌟' },
  { type: 'streak_100', title: 'Eternal Flame', description: '100-day study streak', icon: '💫' },
  { type: 'quiz_master', title: 'Quiz Master', description: 'Study 100 questions', icon: '🧠' },
  { type: 'scholar', title: 'Scholar', description: 'Study 500 questions', icon: '📚' },
  { type: 'marathon', title: 'Marathon Mind', description: 'Study for 60+ minutes in one day', icon: '⏱️' },
  { type: 'ecg_expert', title: 'ECG Expert', description: 'Correctly interpret 50 ECGs', icon: '💖' },
  { type: 'freeze_defender', title: 'Freeze Defender', description: 'Use 3 streak freezes', icon: '🛡️' },
];

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  seed-mock-backends: populating trivia, ECG, leaderboard  ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  // ── Trivia questions ──────────────────────────────────────────
  let triviaCount = 0;
  for (const q of TRIVIA_QUESTIONS_SEED) {
    // Look up by question text (natural key) — avoids duplicates on re-run.
    const existing = await prisma.medicalTriviaQuestion.findFirst({
      where: { question: q.question },
      select: { id: true },
    });
    if (existing) continue;
    await prisma.medicalTriviaQuestion.create({
      data: {
        question: q.question,
        options: JSON.stringify(q.options),
        correctIndex: q.correctIndex,
        category: q.category,
        difficulty: q.difficulty,
        funFact: q.funFact,
        type: q.type,
      },
    });
    triviaCount++;
  }
  console.log(`  ✓ Trivia:    +${triviaCount} new (total in DB: ${TRIVIA_QUESTIONS_SEED.length})`);

  // ── ECG patterns ──────────────────────────────────────────────
  let ecgCount = 0;
  for (const p of ECG_PATTERNS_SEED) {
    const existing = await prisma.ecgPattern.findUnique({
      where: { legacyId: p.legacyId },
      select: { id: true },
    });
    if (existing) {
      // Update in place in case content changed — keeps the static library in sync.
      await prisma.ecgPattern.update({
        where: { id: existing.id },
        data: {
          name: p.name,
          category: p.category,
          difficulty: p.difficulty,
          description: p.description,
          keyFeatures: JSON.stringify(p.keyFeatures),
          svgPath: p.svgPath,
          svgWidth: p.svgWidth,
          rate: p.rate,
          rhythm: p.rhythm,
          axis: p.axis,
          intervals: p.intervals,
          morphology: p.morphology,
          interpretation: p.interpretation,
          clinicalSignificance: p.clinicalSignificance,
          options: JSON.stringify(p.options),
          correctOptionIndex: p.correctOptionIndex,
        },
      });
      continue;
    }
    await prisma.ecgPattern.create({
      data: {
        legacyId: p.legacyId,
        name: p.name,
        category: p.category,
        difficulty: p.difficulty,
        description: p.description,
        keyFeatures: JSON.stringify(p.keyFeatures),
        svgPath: p.svgPath,
        svgWidth: p.svgWidth,
        rate: p.rate,
        rhythm: p.rhythm,
        axis: p.axis,
        intervals: p.intervals,
        morphology: p.morphology,
        interpretation: p.interpretation,
        clinicalSignificance: p.clinicalSignificance,
        options: JSON.stringify(p.options),
        correctOptionIndex: p.correctOptionIndex,
      },
    });
    ecgCount++;
  }
  console.log(`  ✓ ECG:       +${ecgCount} new (total in DB: ${ECG_PATTERNS_SEED.length})`);

  // ── Flashcard Arena leaderboard ──────────────────────────────
  let lbCount = 0;
  for (const e of SEED_LEADERBOARD) {
    // Skip if any entry with the same username+mode+score already exists.
    const existing = await prisma.flashcardArenaResult.findFirst({
      where: { username: e.username, mode: e.mode, score: e.score },
      select: { id: true },
    });
    if (existing) continue;
    await prisma.flashcardArenaResult.create({
      data: {
        username: e.username,
        avatar: e.avatar,
        mode: e.mode,
        score: e.score,
        accuracy: e.accuracy,
        streak: e.streak,
        timePerCard: e.timePerCard,
        totalCards: e.mode === 'marathon' ? 100 : e.mode === 'accuracy' ? 50 : 30,
        correctCards: Math.round((e.accuracy / 100) * (e.mode === 'marathon' ? 100 : e.mode === 'accuracy' ? 50 : 30)),
      },
    });
    lbCount++;
  }
  console.log(`  ✓ Arena LB:  +${lbCount} new (total in DB: ${SEED_LEADERBOARD.length})`);

  // ── Achievement catalog ───────────────────────────────────────
  let achCount = 0;
  for (const a of SEED_ACHIEVEMENTS) {
    const existing = await prisma.achievement.findUnique({ where: { type: a.type } });
    if (existing) {
      // Keep title/description/icon in sync with the seed definition.
      await prisma.achievement.update({
        where: { type: a.type },
        data: { title: a.title, description: a.description, icon: a.icon },
      });
      continue;
    }
    await prisma.achievement.create({ data: a });
    achCount++;
  }
  console.log(`  ✓ Achieves:  +${achCount} new (total in DB: ${SEED_ACHIEVEMENTS.length})`);

  // ── Final counts ──────────────────────────────────────────────
  const counts = {
    trivia: await prisma.medicalTriviaQuestion.count(),
    ecg: await prisma.ecgPattern.count(),
    arenaResults: await prisma.flashcardArenaResult.count(),
    achievements: await prisma.achievement.count(),
    triviaAttempts: await prisma.triviaAttempt.count(),
    ecgAttempts: await prisma.ecgAttempt.count(),
  };
  console.log('');
  console.log('  Final DB counts:');
  for (const [k, v] of Object.entries(counts)) {
    console.log(`    ${k.padEnd(20)} ${v}`);
  }
  console.log('');
  console.log('  Done. The mock-backed tabs (StudyStreaks, MedicalTrivia,');
  console.log('  FlashcardArena, ECGChallenge) can now read real data.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
