import { NextRequest, NextResponse } from 'next/server';
import { callChat } from '@/lib/ai/unified-llm';

/**
 * POST /api/ai/clinical-reasoning
 *
 * Accepts clinical case data, user answer, correct answer, and question context,
 * then returns structured clinical reasoning with step-by-step breakdown,
 * attending tips, red flags, alternative diagnoses, and key takeaway.
 *
 * Request body:
 *   { caseData?, userAnswer, correctAnswer, questionContext: { question, options, system, topic, difficulty, type } }
 *
 * Response:
 *   { reasoning: [{ step, finding, significance, clinicalTip }], redFlags: [{ flag, why, action }],
 *     alternativeDiagnoses: [{ diagnosis, likelihood, distinguishingFeatures }],
 *     keyTakeaway, attendingTip }
 */

const SYSTEM_PROMPT = `You are an expert clinical reasoning educator — a senior attending physician who excels at teaching diagnostic thinking. Given a clinical question or case scenario with the user's answer and the correct answer, produce a structured clinical reasoning breakdown.

You MUST return ONLY a valid JSON object (no markdown fences, no commentary) with these exact keys:

1. "reasoning" — Array of 4-6 step-by-step reasoning objects, each with:
   - "step": string — The step number and name (e.g., "Step 1: Identify Key Presentation Features")
   - "finding": string — What the clinical finding or data point is
   - "significance": string — Why this finding matters diagnostically
   - "clinicalTip": string — A practical clinical tip related to this step

2. "redFlags" — Array of 0-4 red flag objects, each with:
   - "flag": string — The red flag sign/symptom/finding
   - "why": string — Why this is concerning
   - "action": string — What clinical action to take

3. "alternativeDiagnoses" — Array of 2-4 differential diagnosis objects, each with:
   - "diagnosis": string — The alternative diagnosis name
   - "likelihood": "high" | "moderate" | "low" — Relative likelihood
   - "distinguishingFeatures": string — Key features that differentiate this from the correct answer

4. "keyTakeaway" — string — A single, powerful sentence summarizing the core learning point

5. "attendingTip" — string — How a specialist would approach this case (2-3 sentences of expert perspective)

CRITICAL RULES:
- Return ONLY valid JSON. No markdown fences, no extra text.
- All string values should be plain text (no HTML).
- Be specific: include actual values, thresholds, and criteria where relevant.
- The reasoning steps should follow a logical diagnostic pathway (presentation → data gathering → pattern recognition → diagnosis → management).
- If the user answered incorrectly, explain WHERE their reasoning went wrong and redirect them.
- If the user answered correctly, affirm their thinking and add depth they may not have considered.`;

function buildUserPrompt(body: {
  caseData?: string;
  userAnswer: string;
  correctAnswer: string;
  questionContext: {
    question: string;
    options?: string[];
    system?: string;
    topic?: string;
    difficulty?: string;
    type?: 'question' | 'case';
  };
}): string {
  const { caseData, userAnswer, correctAnswer, questionContext } = body;
  const parts: string[] = [];

  parts.push(`Clinical Scenario/Question: ${questionContext.question}`);

  if (questionContext.options?.length) {
    parts.push(`\nOptions:\n${questionContext.options.map((o, i) => `  ${String.fromCharCode(65 + i)}. ${o}`).join('\n')}`);
  }

  if (caseData) {
    parts.push(`\nCase Data: ${caseData}`);
  }

  parts.push(`\nUser's Answer: ${userAnswer}`);
  parts.push(`Correct Answer: ${correctAnswer}`);

  if (questionContext.system) parts.push(`Medical System: ${questionContext.system}`);
  if (questionContext.topic) parts.push(`Topic: ${questionContext.topic}`);
  if (questionContext.difficulty) parts.push(`Difficulty: ${questionContext.difficulty}`);

  const isCase = questionContext.type === 'case';
  parts.push(`\nContext Type: ${isCase ? 'Clinical case simulation' : 'Question bank'}`);

  parts.push(`\nProvide structured clinical reasoning for this scenario. ${userAnswer !== correctAnswer ? 'The user answered INCORRECTLY — explain where their reasoning diverged and provide the correct diagnostic pathway.' : 'The user answered correctly — validate their reasoning and add expert depth.'}`);

  return parts.join('\n');
}

/** Robust JSON parser with fallbacks */
function parseAIJSON(content: string): any {
  // Strip markdown code block markers
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*)```/);
  if (codeBlockMatch) content = codeBlockMatch[1].trim();

  // Try direct parse
  try { return JSON.parse(content); } catch {}

  // Try extracting JSON boundaries
  const first = content.indexOf('{');
  const last = content.lastIndexOf('}');
  if (first >= 0 && last > first) {
    try { return JSON.parse(content.substring(first, last + 1)); } catch {}
  }

  // Try replacing smart quotes and common AI artifacts
  try {
    const cleaned = content
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/,\s*([}\]])/g, '$1');
    return JSON.parse(cleaned);
  } catch {}

  return null;
}

/** Generate fallback reasoning when AI is unavailable */
function generateFallbackReasoning(body: {
  userAnswer: string;
  correctAnswer: string;
  questionContext: { question: string; system?: string; topic?: string };
}) {
  const isWrong = body.userAnswer !== body.correctAnswer;
  return {
    reasoning: [
      {
        step: 'Step 1: Analyze the Presentation',
        finding: 'Review the key clinical features described in the question',
        significance: 'The presentation pattern guides the initial differential diagnosis',
        clinicalTip: 'Always identify the most specific or unusual feature first — it narrows the differential most efficiently',
      },
      {
        step: 'Step 2: Generate Differential',
        finding: `The correct answer is ${body.correctAnswer}`,
        significance: isWrong
          ? `Your answer (${body.userAnswer}) does not fully account for the key clinical features`
          : 'Your answer correctly identifies the primary diagnosis',
        clinicalTip: 'Start with common conditions, then consider life-threatening differentials using the "worst-first" approach',
      },
      {
        step: 'Step 3: Apply Clinical Criteria',
        finding: 'Diagnostic criteria and clinical guidelines support the correct answer',
        significance: 'Evidence-based criteria provide the most reliable diagnostic framework',
        clinicalTip: 'Memorize major diagnostic criteria (e.g., Modified Jones, CURB-65, Wells Score) — they appear frequently on exams',
      },
      {
        step: 'Step 4: Confirm and Manage',
        finding: 'The clinical picture is most consistent with the correct diagnosis',
        significance: isWrong
          ? 'Reconsider the diagnostic pathway when your initial impression does not match the key findings'
          : 'Your diagnostic reasoning aligned with the key findings',
        clinicalTip: isWrong
          ? 'When you choose a wrong answer, trace back to identify which finding you underweighted or misinterpreted'
          : 'For correct answers, consider what additional testing or management steps would follow',
      },
    ],
    redFlags: [
      {
        flag: 'Inconsistent clinical features',
        why: 'If the presentation does not fit your primary diagnosis, broaden the differential',
        action: 'Re-review the case for findings you may have overlooked',
      },
    ],
    alternativeDiagnoses: [
      {
        diagnosis: body.userAnswer !== body.correctAnswer ? body.userAnswer : 'Similar condition in differential',
        likelihood: 'moderate' as const,
        distinguishingFeatures: 'Review the key differentiating features between this and the correct diagnosis',
      },
    ],
    keyTakeaway: isWrong
      ? `The correct answer is ${body.correctAnswer}. Focus on the key discriminating features that distinguish it from ${body.userAnswer}.`
      : `Your answer of ${body.correctAnswer} is correct. Remember the key discriminating features that support this diagnosis.`,
    attendingTip: isWrong
      ? 'When you encounter this type of presentation, systematically work through the diagnostic criteria before committing to an answer. The finding that seems most unusual is often the key to the correct diagnosis.'
      : 'Good diagnostic thinking. To deepen your expertise, consider the next steps: what complications to watch for, when to escalate, and how co-morbidities might modify your management plan.',
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { caseData, userAnswer, correctAnswer, questionContext } = body;

    // Validate required fields
    if (!userAnswer || typeof userAnswer !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "userAnswer" field' },
        { status: 400 }
      );
    }
    if (!correctAnswer || typeof correctAnswer !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "correctAnswer" field' },
        { status: 400 }
      );
    }
    if (!questionContext || typeof questionContext !== 'object' || !questionContext.question) {
      return NextResponse.json(
        { error: 'Missing or invalid "questionContext" — must include "question" field' },
        { status: 400 }
      );
    }

    // Try AI generation
    let result: Record<string, any> | null = null;
    try {
      const userPrompt = buildUserPrompt(body);
      const content = await callChat(request, {
        system: SYSTEM_PROMPT,
        prompt: userPrompt,
        stage: 'chat-adapter',
        maxOutputTokens: 1800,
        temperature: 0.4,
      });

      if (content.trim()) {
        result = parseAIJSON(content);
      }
    } catch (aiError) {
      console.error('[Clinical Reasoning API] AI generation failed, using fallback:', aiError);
    }

    // Validate and normalize the result
    if (result && typeof result === 'object') {
      // Ensure reasoning array
      if (!Array.isArray(result.reasoning)) {
        result.reasoning = generateFallbackReasoning(body).reasoning;
      } else {
        result.reasoning = result.reasoning.map((r: any, i: number) => ({
          step: r.step || `Step ${i + 1}`,
          finding: r.finding || '',
          significance: r.significance || '',
          clinicalTip: r.clinicalTip || '',
        }));
      }

      // Ensure redFlags array
      if (!Array.isArray(result.redFlags)) {
        result.redFlags = [];
      } else {
        result.redFlags = result.redFlags.map((r: any) => ({
          flag: r.flag || '',
          why: r.why || '',
          action: r.action || '',
        }));
      }

      // Ensure alternativeDiagnoses array
      if (!Array.isArray(result.alternativeDiagnoses)) {
        result.alternativeDiagnoses = [];
      } else {
        result.alternativeDiagnoses = result.alternativeDiagnoses.map((d: any) => ({
          diagnosis: d.diagnosis || '',
          likelihood: ['high', 'moderate', 'low'].includes(d.likelihood) ? d.likelihood : 'moderate',
          distinguishingFeatures: d.distinguishingFeatures || '',
        }));
      }

      // Ensure strings
      if (typeof result.keyTakeaway !== 'string') result.keyTakeaway = '';
      if (typeof result.attendingTip !== 'string') result.attendingTip = '';

      return NextResponse.json(result);
    }

    // Fallback: generate locally
    return NextResponse.json(generateFallbackReasoning(body));
  } catch (error) {
    console.error('[Clinical Reasoning API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate clinical reasoning' },
      { status: 500 }
    );
  }
}
