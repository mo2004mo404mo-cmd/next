import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// POST /api/groups/[id]/live-quiz — build a quiz payload from one or more
// question sources.
//
// Body: {
//   count?,         // 1-50, default 10
//   source?,        // 'group' | 'global' | 'both'  (default 'group')
//   category?,      // GroupQuestion.category filter (group source only)
//   difficulty?,    // Easy | Medium | Hard | Moderate — normalized across both
//   system?,        // e.g. 'Cardiology' — applied to both sources
//   topic?,         // optional topic filter
// }
//
// Returns: {
//   questions: [{ id, text, options, correctIndex, explanation, durationSec, source }],
//   sourceCount: number,             // total available before sampling
//   sourceBreakdown?: { group: number, global: number }
//   warning?: string,                // shown if no questions found
// }
//
// The client sends these to socket quiz:create.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getAuthenticatedUserId(request);
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const body = await request.json().catch(() => ({}));
    const count = Math.min(Math.max(body.count || 10, 1), 50);
    const source: 'group' | 'global' | 'both' = ['group', 'global', 'both'].includes(body.source)
      ? body.source
      : 'group';
    const { category, difficulty, system, topic } = body;

    // ── Normalize difficulty filter ──
    // GroupQuestion.difficulty: Easy | Medium | Hard | Moderate
    // Question.difficulty:      Easy | Basic | Moderate | Hard | Expert
    // For filtering, treat Medium ≈ Moderate (both sources).
    const difficultyVariants: string[] | undefined = difficulty
      ? (() => {
          const d = String(difficulty).trim();
          // Match exact + case-insensitive; map Medium↔Moderate
          const variants = new Set<string>([d, d.toLowerCase()]);
          if (d.toLowerCase() === 'medium') { variants.add('Moderate'); variants.add('moderate'); }
          if (d.toLowerCase() === 'moderate') { variants.add('Medium'); variants.add('medium'); }
          return Array.from(variants);
        })()
      : undefined;

    // ── Fetch from group bank ──
    let groupQuestions: any[] = [];
    if (source === 'group' || source === 'both') {
      const where: any = { groupId: id };
      if (category) where.category = category;
      if (difficultyVariants) where.difficulty = { in: difficultyVariants };
      if (system) where.system = system;
      if (topic) where.topic = topic;
      groupQuestions = await db.groupQuestion.findMany({ where });
    }

    // ── Fetch from global bank ──
    let globalQuestions: any[] = [];
    if (source === 'global' || source === 'both') {
      const where: any = {};
      if (difficultyVariants) where.difficulty = { in: difficultyVariants };
      if (system) where.system = system;
      if (topic) where.topic = topic;
      // Filter out questions with no options or empty text — they'd break the quiz UI
      globalQuestions = await db.question.findMany({ where });
      globalQuestions = globalQuestions.filter(q => {
        const text = (q.text || '').trim();
        let options: string[] = [];
        try { options = q.options ? JSON.parse(q.options) : []; } catch {}
        return text.length > 0 && options.length >= 2;
      });
    }

    const totalAvailable = groupQuestions.length + globalQuestions.length;

    if (totalAvailable === 0) {
      const hint = source === 'group'
        ? "This group's question bank is empty. Try pulling from the global question bank (toggle source)."
        : source === 'global'
        ? "No questions in the global bank match your filters."
        : "No questions match your filters in either the group or global bank.";
      return Response.json({
        questions: [],
        sourceCount: 0,
        warning: hint,
      });
    }

    // ── Sampling strategy ──
    // For source='both', distribute `count` proportionally between the two
    // sources so neither is over- or under-represented.
    let groupSample: any[] = [];
    let globalSample: any[] = [];

    if (source === 'group') {
      groupSample = sampleShuffle(groupQuestions, count);
    } else if (source === 'global') {
      globalSample = sampleShuffle(globalQuestions, count);
    } else {
      // both — proportional split
      const groupShare = groupQuestions.length / totalAvailable;
      const groupTarget = Math.round(count * groupShare);
      const globalTarget = count - groupTarget;
      groupSample = sampleShuffle(groupQuestions, groupTarget);
      globalSample = sampleShuffle(globalQuestions, globalTarget);
      // If one source couldn't fill its quota, top up from the other
      const filled = groupSample.length + globalSample.length;
      if (filled < count) {
        const shortfall = count - filled;
        if (groupSample.length < groupTarget) {
          // group ran out — take more from global
          globalSample = globalSample.concat(
            sampleShuffle(globalQuestions.filter(g => !globalSample.includes(g)), shortfall)
          );
        } else {
          groupSample = groupSample.concat(
            sampleShuffle(groupQuestions.filter(g => !groupSample.includes(g)), shortfall)
          );
        }
      }
    }

    // ── Normalize to the quiz payload format ──
    const normalize = (q: any, src: 'group' | 'global') => {
      let options: string[] = [];
      try { options = q.options ? JSON.parse(q.options) : []; } catch { options = []; }
      // Find correct index by matching answer text
      let correctIndex = -1;
      if (q.answer) {
        correctIndex = options.findIndex((o: string) =>
          o === q.answer || o.trim() === q.answer.trim()
        );
        if (correctIndex === -1 && options.length > 0) correctIndex = 0;
      }
      return {
        id: q.id,
        // Prefix the id with source so group + global IDs never collide
        // (cuids are unique, but prefixing makes the source visible to clients)
        // — we keep the raw id; clients use {id, source} for tracking.
        text: q.text || q.question || '',
        options,
        correctIndex,
        explanation: q.explanation || q.clinicalPearl || '',
        durationSec: 30,
        source: src,
        system: q.system || '',
        topic: q.topic || '',
        difficulty: q.difficulty || '',
      };
    };

    const quizQuestions = [
      ...groupSample.map(q => normalize(q, 'group')),
      ...globalSample.map(q => normalize(q, 'global')),
    ];

    // Shuffle the final list so questions from the two sources are interleaved
    // (otherwise all group questions come first, then all global — predictable)
    for (let i = quizQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
    }

    return Response.json({
      questions: quizQuestions,
      sourceCount: totalAvailable,
      sourceBreakdown: {
        group: groupQuestions.length,
        global: globalQuestions.length,
      },
    });
  } catch (error) {
    console.error('Error building live quiz:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Fisher-Yates shuffle + take N
function sampleShuffle<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
