import { NextRequest, NextResponse } from 'next/server';
import { callChat } from '@/lib/ai/unified-llm';
import { MEDICAL_SYSTEMS, TOPIC_MAP } from '@/lib/medq-types';

/**
 * POST /api/micro-lessons/generate
 *
 * Generates 3-5 personalized micro-lessons for the day based on
 * user's study history, weak areas, and trending topics.
 *
 * Request body:
 *   { count?: number, includeWeakAreas?: boolean, includeTrending?: boolean, includeReview?: boolean }
 *
 * Response:
 *   { lessons: MicroLesson[] }
 */

const SYSTEM_PROMPT = `You are a medical education content generator. Create concise, high-yield micro-lessons for medical students. Each micro-lesson must be clinically relevant, memorable, and include a self-test question.

Return ONLY a valid JSON array of 3-5 micro-lesson objects. Each object must have these exact fields:
- "fact": string — A concise, memorable clinical fact (1-2 sentences). Be specific with numbers, thresholds, and criteria where possible.
- "clinicalRelevance": string — Why this fact matters in clinical practice (1-2 sentences)
- "selfTest": object with:
  - "question": string — A focused MCQ question testing the fact
  - "options": array of exactly 4 strings — answer choices
  - "answer": string — The correct answer (must match one option exactly)
  - "explanation": string — 1-sentence explanation of why the answer is correct
- "relatedContent": object with:
  - "title": string — Title of related study material
  - "type": "flashcard" | "question" | "case" | "topic"
  - "system": string — Medical system category
  - "topic": string — Specific topic
- "system": string — Medical system (e.g., Cardiovascular, Neurological)
- "topic": string — Specific topic (e.g., Hypertension, Stroke)
- "difficulty": number — 1-5 scale

IMPORTANT RULES:
- Return ONLY a valid JSON array. No markdown, no commentary.
- Each fact should be different and cover distinct topics.
- Self-test questions should be challenging but fair.
- Include a mix of basic science and clinical application.
- Prioritize high-yield board exam content.`;

function parseAIJSON(content: string): any[] | null {
  // Strip markdown code block markers
  const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*)```/);
  if (codeBlockMatch) content = codeBlockMatch[1].trim();

  try { return JSON.parse(content); } catch {}

  const first = content.indexOf('[');
  const last = content.lastIndexOf(']');
  if (first >= 0 && last > first) {
    try { return JSON.parse(content.substring(first, last + 1)); } catch {}
  }

  // Try as single object
  const objFirst = content.indexOf('{');
  const objLast = content.lastIndexOf('}');
  if (objFirst >= 0 && objLast > objFirst) {
    try {
      const obj = JSON.parse(content.substring(objFirst, objLast + 1));
      return [obj];
    } catch {}
  }

  return null;
}

function generateFallbackLessons(count: number): any[] {
  const fallbackData = [
    {
      fact: 'The most common cause of acute pancreatitis is gallstones, followed by alcohol. Serum lipase is more specific than amylase for diagnosis, with levels >3x upper limit of normal being diagnostic.',
      clinicalRelevance: 'Distinguishing gallstone vs. alcoholic pancreatitis changes management — gallstone pancreatitis requires cholecystectomy to prevent recurrence.',
      selfTest: {
        question: 'A 45-year-old woman presents with severe epigastric pain radiating to the back, nausea, and vomiting. Lipase is 1,200 U/L (normal: 0-60). What is the most likely etiology?',
        options: ['Alcohol', 'Gallstones', 'Hypertriglyceridemia', 'Drug-induced'],
        answer: 'Gallstones',
        explanation: 'In a middle-aged woman, gallstones are the most common cause of acute pancreatitis.',
      },
      relatedContent: { title: 'Pancreatitis Review', type: 'question', system: 'Gastrointestinal', topic: 'Pancreatitis' },
      system: 'Gastrointestinal',
      topic: 'Pancreatitis',
      difficulty: 3,
    },
    {
      fact: 'In COPD, the FEV1/FVC ratio is <0.7 on spirometry. The GOLD classification stages COPD severity based on FEV1: Stage 1 (≥80%), Stage 2 (50-79%), Stage 3 (30-49%), Stage 4 (<30% predicted).',
      clinicalRelevance: 'GOLD staging guides therapy — Stage 1 requires only short-acting bronchodilators as needed, while Stage 4 may require oxygen therapy and lung transplant evaluation.',
      selfTest: {
        question: 'A patient has FEV1 of 35% predicted and FEV1/FVC of 0.55. What GOLD stage is this?',
        options: ['GOLD 1', 'GOLD 2', 'GOLD 3', 'GOLD 4'],
        answer: 'GOLD 3',
        explanation: 'FEV1 30-49% predicted with FEV1/FVC <0.7 classifies as GOLD Stage 3 (severe) COPD.',
      },
      relatedContent: { title: 'COPD Management', type: 'flashcard', system: 'Respiratory', topic: 'COPD' },
      system: 'Respiratory',
      topic: 'COPD',
      difficulty: 2,
    },
    {
      fact: 'The most common cause of community-acquired pneumonia (CAP) is Streptococcus pneumoniae. CURB-65 score (Confusion, Uremia, RR≥30, BP<90/60, Age≥65) guides disposition: score 0-1 outpatient, 2 short hospitalization, 3-5 ICU consideration.',
      clinicalRelevance: 'Incorrect disposition of CAP patients increases mortality — ICU admission for severe CAP reduces 30-day mortality by 20-30%.',
      selfTest: {
        question: 'A 70-year-old man with CAP has BUN 25 mg/dL, RR 32, BP 85/50, and is oriented. What is his CURB-65 score and recommended disposition?',
        options: ['Score 2 — short hospitalization', 'Score 3 — ICU consideration', 'Score 4 — ICU consideration', 'Score 1 — outpatient'],
        answer: 'Score 3 — ICU consideration',
        explanation: 'Age≥65 (+1), BUN>19 (+1), RR≥30 (+1) = CURB-65 score of 3, warranting ICU consideration.',
      },
      relatedContent: { title: 'Pneumonia Guidelines', type: 'case', system: 'Respiratory', topic: 'Pneumonia' },
      system: 'Respiratory',
      topic: 'Pneumonia',
      difficulty: 3,
    },
    {
      fact: 'Type 2 MI is caused by supply-demand mismatch (not plaque rupture). Common causes include severe anemia, sepsis, tachyarrhythmias, and hypotension. Troponin is elevated but coronary angiography may show no obstructive disease.',
      clinicalRelevance: 'Treating Type 2 MI requires addressing the underlying cause, not coronary intervention. Misdiagnosing as Type 1 leads to unnecessary catheterization and anticoagulation.',
      selfTest: {
        question: 'A 65-year-old woman with GI bleeding develops chest pain. Troponin is elevated. ECG shows sinus tachycardia with diffuse ST depressions. What type of MI is most likely?',
        options: ['Type 1 MI', 'Type 2 MI', 'Myocarditis', 'Takotsubo cardiomyopathy'],
        answer: 'Type 2 MI',
        explanation: 'Supply-demand mismatch from anemia due to GI bleeding causes Type 2 MI. Treatment focuses on the underlying cause.',
      },
      relatedContent: { title: 'MI Classification', type: 'topic', system: 'Cardiovascular', topic: 'Coronary Artery Disease' },
      system: 'Cardiovascular',
      topic: 'Coronary Artery Disease',
      difficulty: 4,
    },
    {
      fact: 'In bacterial meningitis, the classic triad of fever, neck stiffness, and altered mental status is present in only ~44% of cases. However, 95% have at least two of: fever, neck stiffness, altered mental status, or headache. CSF shows: WBC >1000, PMN predominance, low glucose, high protein.',
      clinicalRelevance: 'Delayed antibiotic administration in bacterial meningitis increases mortality by 10-15% per hour delay. Empiric antibiotics should be given immediately when meningitis is suspected, before LP results.',
      selfTest: {
        question: 'A 30-year-old presents with fever, severe headache, and photophobia. What finding on LP would most strongly suggest bacterial rather than viral meningitis?',
        options: ['WBC 200 with lymphocytic predominance', 'Normal glucose', 'WBC 3000 with PMN predominance and glucose 20 mg/dL', 'Protein 60 mg/dL'],
        answer: 'WBC 3000 with PMN predominance and glucose 20 mg/dL',
        explanation: 'Very high WBC with PMN predominance and significantly low glucose is characteristic of bacterial meningitis.',
      },
      relatedContent: { title: 'Meningitis Review', type: 'flashcard', system: 'Neurological', topic: 'Meningitis' },
      system: 'Neurological',
      topic: 'Meningitis',
      difficulty: 3,
    },
  ];

  return fallbackData.slice(0, count);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      count = 4,
      includeWeakAreas = true,
      includeTrending = true,
      includeReview = true,
    } = body;

    const lessonCount = Math.max(3, Math.min(5, count));

    // Try AI generation
    let lessons: any[] | null = null;
    try {
      const userPrompt = `Generate ${lessonCount} micro-lessons for a medical student studying for board exams.${includeWeakAreas ? ' Include at least one lesson on a commonly weak area.' : ''}${includeTrending ? ' Include at least one lesson on a high-yield trending topic.' : ''}${includeReview ? ' Include at least one lesson that reviews a fundamental concept.' : ''}

Cover these medical systems (pick diverse topics): ${MEDICAL_SYSTEMS.slice(0, 8).join(', ')}

Return a JSON array of ${lessonCount} micro-lesson objects with fields: fact, clinicalRelevance, selfTest (question, options, answer, explanation), relatedContent (title, type, system, topic), system, topic, difficulty.`;

      const content = await callChat(request, {
        stage: 'chat-adapter',
        system: SYSTEM_PROMPT,
        prompt: userPrompt,
      });
      if (content.trim()) {
        lessons = parseAIJSON(content);
      }
    } catch (aiError) {
      console.error('[Micro-Lessons Generate] AI failed, using fallback:', aiError);
    }

    // Validate and normalize
    if (lessons && Array.isArray(lessons) && lessons.length > 0) {
      const normalized = lessons.slice(0, lessonCount).map((l: any, i: number) => ({
        id: `ml-${new Date().toISOString().split('T')[0]}-${i}`,
        fact: typeof l.fact === 'string' ? l.fact : '',
        clinicalRelevance: typeof l.clinicalRelevance === 'string' ? l.clinicalRelevance : '',
        selfTest: {
          question: l.selfTest?.question || '',
          options: Array.isArray(l.selfTest?.options) ? l.selfTest.options.slice(0, 4) : ['', '', '', ''],
          answer: l.selfTest?.answer || '',
          explanation: l.selfTest?.explanation || '',
        },
        relatedContent: {
          title: l.relatedContent?.title || '',
          type: ['flashcard', 'question', 'case', 'topic'].includes(l.relatedContent?.type) ? l.relatedContent.type : 'topic',
          system: l.relatedContent?.system || l.system || 'General',
          topic: l.relatedContent?.topic || l.topic || 'General',
        },
        system: l.system || 'General',
        topic: l.topic || 'General',
        difficulty: typeof l.difficulty === 'number' ? Math.max(1, Math.min(5, l.difficulty)) : 3,
      }));

      return NextResponse.json({ lessons: normalized });
    }

    // Fallback
    return NextResponse.json({ lessons: generateFallbackLessons(lessonCount) });
  } catch (error) {
    console.error('[Micro-Lessons Generate] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate micro-lessons' },
      { status: 500 }
    );
  }
}
