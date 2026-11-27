/**
 * Flashcard tools — the bridge between the chat agent and MedQ's EXISTING
 * spaced-repetition system.
 *
 * The app already has a complete SM-2 pipeline (FlashcardProgress: interval /
 * repetition / efactor / nextReview, the /api/flashcard due-new-all queue,
 * streaks + XP on review) — but until now nothing let the AGENT create or
 * inspect flashcards. Students asked "make flashcards from this lecture" and
 * the agent could only write text into the chat; the cards never entered the
 * review queue.
 *
 * These tools close that loop:
 *   • create_flashcards        — writes cards as Question rows (type
 *     "flashcard") and enrolls each into FlashcardProgress with nextReview =
 *     now, so they appear in the due queue immediately. The bank listing
 *     route excludes type "flashcard" by default, so MCQ banks stay clean.
 *   • flashcard_review_status  — due counts + upcoming schedule so the agent
 *     can answer "how many cards do I owe today?" and nudge the learner.
 */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { db } from '../../db';
import type { MedQToolContext } from '../types';

function guestResult() {
  return JSON.stringify({
    created: false,
    error: 'Flashcards require a signed-in account (guest chat cannot own saved study material).',
  });
}

export function createFlashcardTools(ctx: MedQToolContext) {
  const createFlashcardsTool = new DynamicStructuredTool({
    name: 'create_flashcards',
    description:
      'Save flashcards to the learner\'s spaced-repetition review queue (SM-2 scheduling — cards resurface at expanding intervals). Use whenever the user asks to make/create/build flashcards from anything: a lecture transcript, a summary you just gave, an uploaded document, a topic. Each card is a concise front (prompt/cue) and back (answer). Cards become due for review immediately and show up in the Flashcards page. Do NOT use this for multiple-choice questions the user wants in their question bank — that is run_question_generation_agent / save_question.',
    schema: z.object({
      cards: z
        .array(
          z.object({
            front: z.string().min(3).max(500).describe('The prompt side: a question, cue, or term'),
            back: z.string().min(1).max(1000).describe('The answer side: concise, self-contained'),
            system: z.string().max(80).optional().describe('Organ system, e.g. "Cardiovascular"'),
            topic: z.string().max(120).optional().describe('Specific topic, e.g. "Starling forces"'),
          }),
        )
        .min(1)
        .max(30)
        .describe('The flashcards to create (1-30 per call)'),
      deckLabel: z.string().max(120).optional().describe('Short label grouping this batch, e.g. "ACS lecture 2026-10-23"'),
    }),
    func: async ({ cards, deckLabel }) => {
      if (!ctx.userId || ctx.userId === 'guest') return guestResult();
      try {
        const now = new Date();
        const tags = JSON.stringify(['flashcard', ...(deckLabel ? [deckLabel] : [])]);
        const created: Array<{ id: string; front: string }> = [];
        // Sequential creates keep the DB happy and keep card order stable.
        for (const card of cards) {
          const question = await db.question.create({
            data: {
              type: 'flashcard',
              text: card.front,
              answer: card.back,
              explanation: card.back,
              options: JSON.stringify([]),
              system: card.system ?? '',
              topic: card.topic ?? '',
              tags,
              isAIGenerated: true,
              reviewStatus: 'approved',
              createdAt: now,
              updatedAt: now,
            },
            select: { id: true, text: true },
          });
          // Enroll into SM-2: first repetition due immediately (nextReview =
          // now → shows in the "due" queue on the Flashcards page).
          await db.flashcardProgress.create({
            data: {
              userId: ctx.userId,
              questionId: question.id,
              interval: 1,
              repetition: 0,
              efactor: 2.5,
              nextReview: now,
              lastReview: now,
            },
          }).catch(() => undefined); // progress row may exist only on races; enrollment is idempotent enough
          created.push({ id: question.id, front: question.text.slice(0, 80) });
        }
        // How much is due in total right after this batch?
        const dueCount = await db.flashcardProgress.count({
          where: { userId: ctx.userId, nextReview: { lte: now } },
        }).catch(() => 0);
        return JSON.stringify({
          created: true,
          count: created.length,
          cards: created,
          totalDueNow: dueCount,
          note:
            `Saved ${created.length} flashcard${created.length === 1 ? '' : 's'} to the learner's review queue. ` +
            `Tell them the cards are due NOW (${dueCount} total due) on the Flashcards page, and SM-2 will resurface ` +
            `each card at expanding intervals as they rate their recall.`,
        });
      } catch (error) {
        return JSON.stringify({
          created: false,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });

  const reviewStatusTool = new DynamicStructuredTool({
    name: 'flashcard_review_status',
    description:
      "Check the learner's spaced-repetition backlog: how many flashcards are due right now, due within the next 24h/7d, total enrolled, and recent review accuracy. Use when they ask about their review queue, whether they have cards to do today, or their flashcard progress — and proactively when planning a study session.",
    schema: z.object({}),
    func: async () => {
      if (!ctx.userId || ctx.userId === 'guest') {
        return JSON.stringify({ error: 'Review status requires a signed-in account.' });
      }
      try {
        const now = new Date();
        const in24h = new Date(now.getTime() + 24 * 3600_000);
        const in7d = new Date(now.getTime() + 7 * 24 * 3600_000);
        const [dueNow, due24h, due7d, total, recent] = await Promise.all([
          db.flashcardProgress.count({ where: { userId: ctx.userId, nextReview: { lte: now } } }),
          db.flashcardProgress.count({ where: { userId: ctx.userId, nextReview: { lte: in24h } } }),
          db.flashcardProgress.count({ where: { userId: ctx.userId, nextReview: { lte: in7d } } }),
          db.flashcardProgress.count({ where: { userId: ctx.userId } }),
          db.studySession.count({
            where: { userId: ctx.userId, type: 'flashcard', createdAt: { gte: new Date(now.getTime() - 7 * 24 * 3600_000) } },
          }),
        ]);
        return JSON.stringify({
          dueNow,
          dueWithin24h: due24h,
          dueWithin7d: due7d,
          totalCards: total,
          reviewsLast7d: recent,
          note:
            dueNow > 0
              ? `${dueNow} card${dueNow === 1 ? ' is' : 's are'} due RIGHT NOW — suggest starting the review session (Flashcards page), and offer to generate more cards on weak topics if the queue is light.`
              : 'Nothing is due right now. Suggest creating new flashcards from recent material, or reviewing again when the next batch matures.',
        });
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  return [createFlashcardsTool, reviewStatusTool];
}
