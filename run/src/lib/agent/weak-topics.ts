/**
 * Weak-topic detection from the user's quiz attempt history.
 *
 * Groups QuestionAttempt rows by question topic, computes per-topic accuracy,
 * and returns the worst-performing topics (minimum 2 attempts so a single
 * lucky/unlucky answer doesn't drive the schedule). Used by scheduled agent
 * jobs ("every Sunday, generate 20 MCQs on my weak topics") and available as
 * a chat tool so the agent can answer "what are my weak areas?".
 */
import { db } from '../db';
import { createLogger } from '../logger';

const log = createLogger('WeakTopics');

export interface WeakTopic {
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number; // 0..1
}

interface WeakTopicRow {
  topic: string;
  attempts: number | bigint;
  correct: number | bigint;
}

/**
 * Top weak topics by accuracy (ascending), limited to `limit`.
 * Topics with fewer than `minAttempts` attempts are skipped.
 */
export async function getWeakTopics(userId: string, limit = 5, minAttempts = 2): Promise<WeakTopic[]> {
  return getWeaknessByDimension(userId, 'topic', limit, minAttempts);
}

/** Same weakness rollup by organ SYSTEM (Cardiovascular, Renal, …). */
export async function getWeakSystems(userId: string, limit = 5, minAttempts = 2): Promise<WeakTopic[]> {
  return getWeaknessByDimension(userId, 'system', limit, minAttempts);
}

/** Shared rollup: accuracy per `topic` or `system` value, worst first. */
async function getWeaknessByDimension(
  userId: string,
  dimension: 'topic' | 'system',
  limit: number,
  minAttempts: number,
): Promise<WeakTopic[]> {
  try {
    // Parameterized SQL ($1 userId, $2 minAttempts, $3 limit) — the dimension
    // switches between two fixed query strings, never user input.
    const sql = dimension === 'topic'
      ? `SELECT q.topic AS label, COUNT(*)::int AS attempts,
                SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::int AS correct
         FROM "QuestionAttempt" qa JOIN "Question" q ON q.id = qa."questionId"
         WHERE qa."userId" = $1 AND q.topic IS NOT NULL AND q.topic <> ''
         GROUP BY q.topic HAVING COUNT(*) >= $2
         ORDER BY (SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::float / COUNT(*)) ASC, COUNT(*) DESC
         LIMIT $3`
      : `SELECT q.system AS label, COUNT(*)::int AS attempts,
                SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::int AS correct
         FROM "QuestionAttempt" qa JOIN "Question" q ON q.id = qa."questionId"
         WHERE qa."userId" = $1 AND q.system IS NOT NULL AND q.system <> ''
         GROUP BY q.system HAVING COUNT(*) >= $2
         ORDER BY (SUM(CASE WHEN qa."isCorrect" THEN 1 ELSE 0 END)::float / COUNT(*)) ASC, COUNT(*) DESC
         LIMIT $3`;
    const rows = await db.$queryRawUnsafe<{ label: string; attempts: number | bigint; correct: number | bigint }[]>(
      sql,
      userId,
      minAttempts,
      limit,
    );
    return rows.map((r) => {
      const attempts = Number(r.attempts);
      const correct = Number(r.correct);
      return {
        topic: String(r.label),
        attempts,
        correct,
        accuracy: correct / Math.max(1, attempts),
      };
    });
  } catch (error) {
    log.warn?.(`weak-${dimension} query failed:`, error);
    return [];
  }
}

/** Render the weak-topic list as a compact context block for agent prompts. */
export function formatWeakTopics(topics: WeakTopic[]): string {
  if (topics.length === 0) {
    return 'No attempt history yet — the learner has no measurable weak areas. Cover a balanced mix of core topics instead.';
  }
  const lines = topics.map(
    (t) => `- ${t.topic}: ${t.correct}/${t.attempts} correct (${Math.round(t.accuracy * 100)}% accuracy)`,
  );
  return `The learner's weakest topics (from their quiz attempt history):\n${lines.join('\n')}`;
}
