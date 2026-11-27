/**
 * Study-intelligence tools: weakness detection + exam blueprint alignment.
 *
 * analyze_my_weaknesses — surfaces the learner's actual performance data
 * (QuestionAttempt history rolled up by topic AND organ system, plus overall
 * stats) so the agent can ground "what should I focus on?" answers in real
 * numbers instead of guesses, then offer targeted micro-drills via
 * run_question_generation_agent or a recurring schedule_task.
 *
 * get_exam_blueprint — returns the approximate published content
 * distribution for the major exams (USMLE Step 1/2CK/3, NCLEX-RN/PN) so
 * study plans allocate time by what the exam actually weighs, optionally
 * modulated by the learner's measured weak areas.
 */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { db } from '../../db';
import type { MedQToolContext } from '../types';
import { getWeakSystems, getWeakTopics, type WeakTopic } from '../weak-topics';

function formatWeakList(items: WeakTopic[]): string {
  return items
    .map((item) => `- ${item.topic}: ${item.correct}/${item.attempts} correct (${Math.round(item.accuracy * 100)}%)`)
    .join('\n');
}

export function createStudyInsightTools(ctx: MedQToolContext) {
  const analyzeWeaknessesTool = new DynamicStructuredTool({
    name: 'analyze_my_weaknesses',
    description:
      "Analyze the learner's REAL performance data: quiz-attempt history rolled up by topic and organ system (accuracy, attempt counts) plus overall stats. Use whenever they ask what to focus on, how they're doing, or for ANY personalized study plan — then offer targeted actions: a micro-drill via run_question_generation_agent on their worst topics, or a recurring schedule_task (e.g. weekly weak-topic quiz). Do not guess weaknesses from conversation alone when this tool can measure them.",
    schema: z.object({
      limit: z.number().int().min(3).max(10).optional().describe('Max weak topics/systems to return, default 6'),
    }),
    func: async ({ limit = 6 }) => {
      if (!ctx.userId || ctx.userId === 'guest') {
        return JSON.stringify({
          error: 'Weakness analysis requires a signed-in account with quiz history.',
          note: 'Ask the learner to sign in, or proceed with a balanced topic mix instead.',
        });
      }
      try {
        const [weakTopics, weakSystems, recentAttempts] = await Promise.all([
          getWeakTopics(ctx.userId, limit, 2),
          getWeakSystems(ctx.userId, Math.min(limit, 5), 2),
          db.questionAttempt.findMany({
            where: { userId: ctx.userId },
            select: { isCorrect: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 100,
          }),
        ]);
        const recentWindow = recentAttempts.slice(0, 30);
        const recentAccuracy = recentWindow.length > 0
          ? recentWindow.filter((a) => a.isCorrect).length / recentWindow.length
          : null;
        const hasHistory = recentAttempts.length > 0;
        return JSON.stringify({
          analyzed: true,
          hasHistory,
          overall: {
            totalAttempts: recentAttempts.length,
            last30AttemptsAccuracy: recentAccuracy === null ? null : Math.round(recentAccuracy * 100) / 100,
          },
          weakestTopics: weakTopics.map((t) => ({
            topic: t.topic,
            attempts: t.attempts,
            accuracy: Math.round(t.accuracy * 100) / 100,
          })),
          weakestSystems: weakSystems.map((t) => ({
            system: t.topic,
            attempts: t.attempts,
            accuracy: Math.round(t.accuracy * 100) / 100,
          })),
          note: hasHistory
            ? 'Grounded in real attempt data. Recommended follow-ups: (1) offer a micro-drill — run_question_generation_agent on the top 2-3 weakest topics; (2) offer a recurring weekly schedule_task on weak topics; (3) when building study plans, weight these areas heavier. Present the numbers to the learner transparently.'
            : 'The learner has no quiz attempts yet — there is nothing to measure. Recommend they take a diagnostic quiz first (offer to generate one on a broad topic mix), then re-analyze.',
          formatted: hasHistory
            ? `Weakest topics:\n${formatWeakList(weakTopics)}\nWeakest systems:\n${formatWeakList(weakSystems)}`
            : '',
        });
      } catch (error) {
        return JSON.stringify({ analyzed: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const blueprintTool = new DynamicStructuredTool({
    name: 'get_exam_blueprint',
    description:
      'Get the approximate published content distribution (what % of the exam each area carries) for USMLE Step 1 / Step 2 CK / Step 3, NCLEX-RN, or NCLEX-PN. Use for ANY exam-study-planning request: allocate study weeks proportional to these weights, boosted further for the learner\'s measured weak areas (combine with analyze_my_weaknesses when available).',
    schema: z.object({
      exam: z
        .enum(['usmle-step1', 'usmle-step2ck', 'usmle-step3', 'nclex-rn', 'nclex-pn'])
        .describe('Which exam blueprint to load'),
      weeksAvailable: z.number().int().min(1).max(104).optional().describe('Total study weeks — when given, the tool returns a suggested per-area week allocation'),
    }),
    func: async ({ exam, weeksAvailable }) => {
      const blueprint = EXAM_BLUEPRINTS[exam];
      if (!blueprint) {
        return JSON.stringify({ error: `Unknown exam "${exam}". Supported: usmle-step1, usmle-step2ck, usmle-step3, nclex-rn, nclex-pn.` });
      }
      const areas = blueprint.areas.map((area) => ({
        area: area.label,
        weightPercent: area.mid,
        rangePercent: area.range,
      }));
      let allocation: Array<{ area: string; weeks: number; reason: string }> | undefined;
      if (weeksAvailable && weeksAvailable > 0) {
        // Proportional allocation with a floor: no area gets less than 1 week
        // (rounds are largest-remainder so the total is exact).
        const rawShares = blueprint.areas.map((area) => area.mid / blueprint.totalMid);
        const floors = rawShares.map(() => 1);
        const remaining = weeksAvailable - blueprint.areas.length;
        if (remaining >= 0) {
          allocation = largestRemainderSplit(remaining, rawShares).map((extra, index) => ({
            area: blueprint.areas[index].label,
            weeks: floors[index] + extra,
            reason: `${blueprint.areas[index].mid}% of the exam`,
          }));
        } else {
          // Fewer weeks than areas: pure proportional split.
          allocation = largestRemainderSplit(weeksAvailable, rawShares).map((weeks, index) => ({
            area: blueprint.areas[index].label,
            weeks,
            reason: `${blueprint.areas[index].mid}% of the exam`,
          }));
        }
      }
      return JSON.stringify({
        exam: blueprint.name,
        areas,
        suggestedWeekAllocation: allocation,
        note:
          'Approximate published content distribution (midpoints of official ranges). ALWAYS tell the learner to verify against the current official test plan (USMLE.org / NCSBN) before committing weeks. When you also have weakness data (analyze_my_weaknesses), shift 1-2 weeks from their strongest high-weight areas toward weak high-weight areas. Sequence suggestion: foundational/high-weight areas early, weakest areas getting two passes (learn + revisit), final 1-2 weeks for review + practice questions.',
      });
    },
  });

  return [analyzeWeaknessesTool, blueprintTool];
}

/** Split `total` into integer parts proportional to `shares` (largest-remainder). */
function largestRemainderSplit(total: number, shares: number[]): number[] {
  const sum = shares.reduce((acc, share) => acc + share, 0);
  if (sum <= 0 || total <= 0) return shares.map(() => 0);
  const raw = shares.map((share) => (share / sum) * total);
  const base = raw.map((value) => Math.floor(value));
  let remainder = total - base.reduce((acc, value) => acc + value, 0);
  const order = raw
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac);
  let cursor = 0;
  while (remainder > 0 && order.length > 0) {
    base[order[cursor % order.length].index] += 1;
    remainder -= 1;
    cursor += 1;
  }
  return base;
}

// ── Exam blueprint data ─────────────────────────────────────────────────────
//
// Midpoints of the official published ranges. These are approximate and
// clearly labeled as such in the tool output — the tool instructs the agent
// to point the learner at the current official test plan for exact numbers.

interface BlueprintArea {
  label: string;
  mid: number;
  range: string;
}

interface ExamBlueprint {
  name: string;
  areas: BlueprintArea[];
  totalMid: number;
}

const EXAM_BLUEPRINTS: Record<string, ExamBlueprint> = {
  'usmle-step1': {
    name: 'USMLE Step 1',
    areas: [
      { label: 'General Principles of Foundational Science (biochem, cell bio, genetics, immunology basics)', mid: 14, range: '12-16%' },
      { label: 'Blood & Lymphoreticular / Immune Systems', mid: 9, range: '7-11%' },
      { label: 'Behavioral Health & Nervous System / Special Senses', mid: 13, range: '11-15%' },
      { label: 'Musculoskeletal, Skin & Subcutaneous Tissue', mid: 11, range: '9-13%' },
      { label: 'Cardiovascular System', mid: 10, range: '8-12%' },
      { label: 'Respiratory & Renal/Urinary Systems', mid: 17, range: '14-20%' },
      { label: 'Gastrointestinal System', mid: 9, range: '7-11%' },
      { label: 'Pregnancy, Childbirth & the Reproductive System', mid: 7, range: '5-9%' },
      { label: 'Endocrine System', mid: 8, range: '6-10%' },
      { label: 'Multisystem Processes & Disorders', mid: 8, range: '6-10%' },
    ],
    totalMid: 106,
  },
  'usmle-step2ck': {
    name: 'USMLE Step 2 CK',
    areas: [
      { label: 'Internal Medicine (incl. subspecialties)', mid: 55, range: '48-62%' },
      { label: 'Surgery', mid: 20, range: '15-25%' },
      { label: 'Pediatrics', mid: 12, range: '8-16%' },
      { label: 'Obstetrics & Gynecology', mid: 10, range: '6-14%' },
      { label: 'Psychiatry', mid: 8, range: '5-11%' },
    ],
    totalMid: 105,
  },
  'usmle-step3': {
    name: 'USMLE Step 3',
    areas: [
      { label: 'General Internal Medicine & subspecialties', mid: 60, range: '55-65%' },
      { label: 'Surgery & surgical subspecialties', mid: 10, range: '8-12%' },
      { label: 'Pediatrics', mid: 10, range: '8-12%' },
      { label: 'Obstetrics & Gynecology', mid: 10, range: '8-12%' },
      { label: 'Psychiatry', mid: 8, range: '5-10%' },
      { label: 'Preventive Medicine & Population Health', mid: 5, range: '3-7%' },
    ],
    totalMid: 103,
  },
  'nclex-rn': {
    name: 'NCLEX-RN (Client Need categories, 2023 test plan)',
    areas: [
      { label: 'Management of Care', mid: 18, range: '15-21%' },
      { label: 'Safety and Infection Control', mid: 13, range: '10-16%' },
      { label: 'Health Promotion and Maintenance', mid: 9, range: '6-12%' },
      { label: 'Psychosocial Integrity', mid: 10, range: '7-13%' },
      { label: 'Basic Care and Comfort', mid: 9, range: '6-12%' },
      { label: 'Pharmacological and Parenteral Therapies', mid: 15, range: '12-18%' },
      { label: 'Reduction of Risk Potential', mid: 12, range: '9-15%' },
      { label: 'Physiological Adaptation', mid: 14, range: '11-17%' },
    ],
    totalMid: 100,
  },
  'nclex-pn': {
    name: 'NCLEX-PN (Client Need categories, 2020 test plan)',
    areas: [
      { label: 'Coordinated Care', mid: 18, range: '14-22%' },
      { label: 'Safety and Infection Control', mid: 13, range: '10-16%' },
      { label: 'Health Promotion and Maintenance', mid: 9, range: '6-12%' },
      { label: 'Psychosocial Integrity', mid: 11, range: '8-14%' },
      { label: 'Basic Care and Comfort', mid: 10, range: '7-13%' },
      { label: 'Pharmacological Therapies', mid: 15, range: '11-19%' },
      { label: 'Reduction of Risk Potential', mid: 12, range: '9-15%' },
      { label: 'Physiological Adaptation', mid: 12, range: '9-15%' },
    ],
    totalMid: 100,
  },
};
