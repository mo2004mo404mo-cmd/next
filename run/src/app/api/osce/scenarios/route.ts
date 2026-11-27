/**
 * /api/osce/scenarios — OSCE standardized-patient scenario catalog.
 *
 * GET /api/osce/scenarios
 *   → { scenarios: [{ id, title, system, difficulty, caseType, description }] }
 *
 * POST /api/osce/scenarios
 *   body: { system?, difficulty?, customBrief? }
 *   → { scenario } — generates a NEW scenario via the MedQ AI router:
 *     persona (age, sex, affect, chief complaint), hidden profile (real dx,
 *     key positives the student must elicit, red flags), and a coverage
 *     checklist for scoring. The hidden profile is stored server-side and
 *     NEVER sent to the student client — only /api/osce/turn and /debrief
 *     read it.
 *
 * POST { action: 'start', scenarioId } — clones a catalog scenario into a
 *   new OsceSession row and returns { sessionId, opening } (the patient's
 *   first line, in character).
 */
import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { resolveMedQAgentConfig } from '@/lib/agent/deep-agent-runtime';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 90;

export interface OsceScenario {
  title: string;
  system: string;
  caseType: string; // history | diagnostic | counseling | emergency
  difficulty: string;
  persona: {
    name: string; age: number; sex: string; affect: string;
    chiefComplaint: string;
    /** Persona-visible facts — what the patient volunteers if asked. */
    openingStatement: string;
  };
  /** Server-only — the real diagnosis + what a strong student must cover. */
  hiddenProfile: {
    diagnosis: string;
    keyFindings: string[]; // must be elicited by good questions
    redFlags: string[];    // must NOT be missed
    distractors: string[]; // plausible but wrong dx a weak student chases
  };
  checklist: string[]; // coverage items scored at debrief
}

/** Seeded starter catalog (used verbatim when no AI provider is configured). */
const SEED_SCENARIOS: OsceScenario[] = [
  {
    title: 'Chest pain in a 55-year-old smoker',
    system: 'cardiology',
    caseType: 'history',
    difficulty: 'Medium',
    persona: {
      name: 'Mr. Roberts', age: 55, sex: 'male', affect: 'anxious, mildly short of breath',
      chiefComplaint: 'Chest pain for the last 2 hours',
      openingStatement: "Doctor, I've got this crushing pain in my chest… it started about two hours ago while I was watching TV. It goes into my left arm. I feel sick to my stomach.",
    },
    hiddenProfile: {
      diagnosis: 'Acute coronary syndrome (STEMI)',
      keyFindings: [
        'Substernal crushing pain radiating to left arm/jaw',
        'Associated diaphoresis and nausea',
        'Exertional angina for the past 2 weeks (prodrome)',
        'Risk factors: 30 pack-years, hypertension, hyperlipidemia',
      ],
      redFlags: ['Ongoing pain at rest > 20 min', 'Diaphoresis', 'Dyspnea'],
      distractors: ['GERD', 'Costochondritis', 'Panic attack', 'Aortic dissection'],
    },
    checklist: [
      'Onset, character, radiation, severity of pain (OPQRST)',
      'Cardiac risk factors (smoking, HTN, lipids, family history)',
      'Screen for dissection red flags (tearing pain, syncope)',
      'Immediate management: ECG within 10 min, aspirin, call for help',
    ],
  },
  {
    title: 'Weight gain and fatigue in a young woman',
    system: 'endocrinology',
    caseType: 'diagnostic',
    difficulty: 'Easy',
    persona: {
      name: 'Ms. Chen', age: 28, sex: 'female', affect: 'tired, a bit down',
      chiefComplaint: 'Gained 8 kg over 6 months, always cold and tired',
      openingStatement: "I've gained a lot of weight even though I eat the same, I'm freezing all the time, and my periods are irregular. I just feel so sluggish.",
    },
    hiddenProfile: {
      diagnosis: 'Hypothyroidism (Hashimoto thyroiditis)',
      keyFindings: [
        'Cold intolerance + weight gain + fatigue triad',
        'Irregular menses / menorrhagia',
        'Family history of autoimmune disease (mother: vitiligo)',
        'Dry skin, bradycardia on exam',
      ],
      redFlags: ['Pregnancy must be ruled out', 'Periorbital puffiness / myxedema signs'],
      distractors: ['Depression', 'PCOS', 'Cushing syndrome'],
    },
    checklist: [
      'Thyroid symptom cluster (cold intolerance, constipation, hair changes)',
      'Menstrual history + pregnancy screen',
      'Autoimmune family history',
      'First-line workup: TSH + free T4, thyroid antibodies',
    ],
  },
  {
    title: 'Fever and stiff neck in a college student',
    system: 'neurology',
    caseType: 'emergency',
    difficulty: 'Hard',
    persona: {
      name: 'Alex', age: 21, sex: 'male', affect: 'confused, photophobic, in pain',
      chiefComplaint: 'Severe headache and fever since last night',
      openingStatement: "My head is killing me — the worst headache of my life. The light hurts my eyes and I threw up twice. I feel burning hot.",
    },
    hiddenProfile: {
      diagnosis: 'Bacterial meningitis',
      keyFindings: [
        'Sudden severe headache + fever + vomiting',
        'Photophobia and neck stiffness',
        'Living in a dorm (close-contact exposure)',
        'Cannot flex neck to chest',
      ],
      redFlags: ['Altered mental status', 'Petechial rash (sepsis)', 'Kernig/Brudzinski signs'],
      distractors: ['Migraine', 'Viral syndrome', 'Subarachnoid hemorrhage'],
    },
    checklist: [
      'Meningism screen (neck stiffness, photophobia, vomiting)',
      'Mental status assessment',
      'Skin check for petechiae',
      'Urgency: blood cultures + empiric antibiotics BEFORE CT/LP if no focal signs',
    ],
  },
];

/** Catalog GET — scenarios already started as sessions also count. */
export const GET = withErrorHandler(async () => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();
  // List seeded + AI-generated catalog (stored as ClinicalCase rows with
  // caseType osce-*), filtered to what the student can see (no hiddenProfile).
  const aiCases = await db.clinicalCase.findMany({
    where: { caseType: { startsWith: 'osce-' } },
    select: { id: true, title: true, system: true, difficulty: true, caseType: true },
    take: 20,
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);
  return NextResponse.json({
    scenarios: [
      ...SEED_SCENARIOS.map((s, i) => ({
        id: `seed-${i}`,
        title: s.title,
        system: s.system,
        difficulty: s.difficulty,
        caseType: s.caseType,
        description: s.persona.openingStatement.slice(0, 140),
      })),
      ...aiCases.map((c) => ({
        id: c.id,
        title: c.title,
        system: c.system,
        difficulty: c.difficulty,
        caseType: c.caseType.replace('osce-', ''),
        description: '',
      })),
    ],
  });
});

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const body = await req.json().catch(() => ({})) as {
    action?: string;
    scenarioId?: string;
    system?: string;
    difficulty?: string;
    customBrief?: string;
  };

  // ── Start a session from a catalog scenario ──
  if (body.action === 'start') {
    const id = body.scenarioId || '';
    let scenario: OsceScenario;

    if (id.startsWith('seed-')) {
      scenario = SEED_SCENARIOS[Number(id.slice(5))] ?? SEED_SCENARIOS[0];
    } else {
      const row = await db.clinicalCase.findUnique({ where: { id } }).catch(() => null);
      if (!row) return badRequest('scenario not found');
      try {
        scenario = JSON.parse(row.stages)[0] as OsceScenario;
      } catch { return badRequest('scenario data corrupted'); }
    }

    const session = await db.osceSession.create({
      data: {
        userId,
        scenario: JSON.stringify(scenario),
        status: 'active',
      },
    });
    return NextResponse.json({
      sessionId: session.id,
      scenario: {
        // Student-visible subset only — hiddenProfile + checklist stay server-side.
        title: scenario.title,
        system: scenario.system,
        caseType: scenario.caseType,
        difficulty: scenario.difficulty,
        persona: scenario.persona,
      },
      opening: scenario.persona.openingStatement,
    });
  }

  // ── Generate a NEW scenario ──
  const system = typeof body.system === 'string' && body.system.trim() ? body.system.trim().slice(0, 60) : 'general medicine';
  const difficulty = ['Easy', 'Medium', 'Hard'].includes(String(body.difficulty)) ? String(body.difficulty) : 'Medium';
  const brief = typeof body.customBrief === 'string' ? body.customBrief.trim().slice(0, 500) : '';

  const config = resolveMedQAgentConfig();
  if (!config.apiKey) {
    // No provider → fall back to a random seed scenario (still a usable trainer).
    const scenario = SEED_SCENARIOS[Math.floor(Math.random() * SEED_SCENARIOS.length)];
    const session = await db.osceSession.create({
      data: { userId, scenario: JSON.stringify(scenario), status: 'active' },
    });
    return NextResponse.json({
      sessionId: session.id,
      scenario: { title: scenario.title, system: scenario.system, caseType: scenario.caseType, difficulty: scenario.difficulty, persona: scenario.persona },
      opening: scenario.persona.openingStatement,
      generated: false,
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 75_000);
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.7,
      max_tokens: 1600,
      messages: [
        { role: 'system', content: 'You output only valid JSON.' },
        {
          role: 'user',
          content: `Design an OSCE standardized-patient scenario for medical students.
System: ${system}. Difficulty: ${difficulty}.${brief ? ` Custom brief: ${brief}` : ''}
Return ONLY:
{"title":"...","system":"...","caseType":"history|diagnostic|counseling|emergency","difficulty":"${difficulty}",
 "persona":{"name":"...","age":0,"sex":"male|female","affect":"...","chiefComplaint":"...","openingStatement":"patient's first line, in character, <= 60 words"},
 "hiddenProfile":{"diagnosis":"...","keyFindings":["..."],"redFlags":["..."],"distractors":["..."]},
 "checklist":["coverage items a strong student must hit, 4-8 items"]}
Clinically realistic; keyFindings are what good questions elicit; redFlags must not be missed; distractors are plausible wrong diagnoses.`,
        },
      ],
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) return NextResponse.json({ error: `Scenario LLM failed (${res.status})` }, { status: 502 });
  let content = (await res.json().catch(() => ({}))).choices?.[0]?.message?.content || '';
  content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  let parsed: any;
  try { parsed = JSON.parse(content); }
  catch { parsed = JSON.parse(content.replace(/,\s*([}\]])/g, '$1')); }

  const scenario: OsceScenario = {
    title: String(parsed.title || `${system} case`).slice(0, 160),
    system: String(parsed.system || system).slice(0, 60),
    caseType: String(parsed.caseType || 'history').slice(0, 30),
    difficulty: String(parsed.difficulty || difficulty).slice(0, 10),
    persona: {
      name: String(parsed.persona?.name || 'Patient').slice(0, 80),
      age: Number(parsed.persona?.age) || 45,
      sex: String(parsed.persona?.sex || 'female').slice(0, 10),
      affect: String(parsed.persona?.affect || 'calm').slice(0, 120),
      chiefComplaint: String(parsed.persona?.chiefComplaint || 'presenting complaint').slice(0, 200),
      openingStatement: String(parsed.persona?.openingStatement || 'Hello, doctor.').slice(0, 400),
    },
    hiddenProfile: {
      diagnosis: String(parsed.hiddenProfile?.diagnosis || 'Undetermined').slice(0, 200),
      keyFindings: (parsed.hiddenProfile?.keyFindings ?? []).slice(0, 8).map(String),
      redFlags: (parsed.hiddenProfile?.redFlags ?? []).slice(0, 6).map(String),
      distractors: (parsed.hiddenProfile?.distractors ?? []).slice(0, 5).map(String),
    },
    checklist: (parsed.checklist ?? []).slice(0, 10).map(String),
  };

  const session = await db.osceSession.create({
    data: { userId, scenario: JSON.stringify(scenario), status: 'active' },
  });

  return NextResponse.json({
    sessionId: session.id,
    scenario: {
      title: scenario.title,
      system: scenario.system,
      caseType: scenario.caseType,
      difficulty: scenario.difficulty,
      persona: scenario.persona,
    },
    opening: scenario.persona.openingStatement,
    generated: true,
  });
});
