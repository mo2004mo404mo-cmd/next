/**
 * Seed GroupQuestion entries for both study groups so the Live Quiz has source material.
 *
 * Idempotent — safe to re-run.
 *
 * Run with:  bunx tsx prisma/seed-group-questions.ts
 */
import { db } from '../src/lib/db';

async function main() {
  console.log('\n❓ Seeding group questions...\n');

  const groups = await db.group.findMany({ select: { id: true, name: true } });
  if (groups.length === 0) {
    console.log('No groups found. Run seed-study-group.ts first.');
    return;
  }

  const admin = await db.user.findFirst({ where: { email: 'sarah@medq.test' } })
              ?? await db.user.findFirst({});
  if (!admin) {
    console.log('No user found.');
    return;
  }

  type QuestionSeed = {
    text: string;
    options: string[];
    answer: string;
    explanation: string;
    difficulty: string;
    system: string;
    topic: string;
    category: string;
    tags?: string[];
  };

  const questionsByGroup: Record<string, QuestionSeed[]> = {
    'Cardiology Study Group': [
      {
        text: 'A 65-year-old man presents with crushing substernal chest pain. ECG shows ST elevation in V1-V4. Which artery is most likely occluded?',
        options: ['Right coronary artery', 'Left anterior descending', 'Circumflex', 'Posterior descending'],
        answer: 'Left anterior descending',
        explanation: 'V1-V4 = anterior wall, supplied by the LAD. "Widowmaker" = proximal LAD occlusion.',
        difficulty: 'Easy',
        system: 'Cardiology',
        topic: 'ACS',
        category: 'high_yield',
        tags: ['ECG', 'STEMI', 'high-yield'],
      },
      {
        text: 'Which of the following is NOT one of the four pillars of GDMT for HFrEF?',
        options: ['ARNI (sacubitril/valsartan)', 'Beta-blocker', 'Calcium channel blocker', 'SGLT2 inhibitor'],
        answer: 'Calcium channel blocker',
        explanation: 'CCBs (especially non-dihydropyridines like verapamil/diltiazem) are CONTRAINDICATED in HFrEF — they reduce contractility. The four pillars are ARNI, β-blocker, MRA, SGLT2i.',
        difficulty: 'Medium',
        system: 'Cardiology',
        topic: 'Heart Failure',
        category: 'high_yield',
        tags: ['pharmacology', 'guidelines'],
      },
      {
        text: 'A patient presents with hypotension, JVD, and muffled heart sounds. What is the diagnosis?',
        options: ['Tension pneumothorax', 'Cardiac tamponade', 'Massive PE', 'Cardiogenic shock from MI'],
        answer: 'Cardiac tamponade',
        explanation: 'Beck triad: hypotension + JVD + muffled heart sounds = cardiac tamponade. Treatment: emergent pericardiocentesis.',
        difficulty: 'Easy',
        system: 'Cardiology',
        topic: 'Pericardial Disease',
        category: 'high_yield',
        tags: ['clinical', 'emergency'],
      },
      {
        text: 'A 70-year-old with septic shock has BP 80/40 after 30 mL/kg fluids. What is the first-line vasopressor?',
        options: ['Epinephrine', 'Norepinephrine', 'Dopamine', 'Phenylephrine'],
        answer: 'Norepinephrine',
        explanation: 'Norepinephrine is first-line for septic shock — α-agonist vasoconstriction + mild β1 effect. Dopamine has higher arrhythmia risk. Add vasopressin if NE insufficient.',
        difficulty: 'Medium',
        system: 'Cardiology',
        topic: 'Shock',
        category: 'high_yield',
        tags: ['emergency', 'pharmacology'],
      },
      {
        text: 'Which antihypertensive is preferred for a pregnant patient with chronic HTN?',
        options: ['Lisinopril', 'Losartan', 'Labetalol', 'Spironolactone'],
        answer: 'Labetalol',
        explanation: 'ACEi and ARBs are teratogenic (fetal renal agenesis). Safe options in pregnancy: labetalol, nifedipine, methyldopa.',
        difficulty: 'Medium',
        system: 'Pharmacology',
        topic: 'Antihypertensives',
        category: 'high_yield',
        tags: ['pregnancy', 'contraindications'],
      },
      {
        text: 'ST elevation in II, III, aVF corresponds to which wall of the heart?',
        options: ['Anterior', 'Inferior', 'Lateral', 'Posterior'],
        answer: 'Inferior',
        explanation: 'II, III, aVF = inferior wall, supplied by RCA in 85% of patients (right-dominant circulation).',
        difficulty: 'Easy',
        system: 'Cardiology',
        topic: 'ECG',
        category: 'high_yield',
        tags: ['ECG'],
      },
      {
        text: 'A patient with HFrEF (EF 30%) has persistent symptoms despite ARNI + β-blocker + MRA. What is the next addition?',
        options: ['Hydralazine + nitrate', 'SGLT2 inhibitor', 'Digoxin', 'Loop diuretic only'],
        answer: 'SGLT2 inhibitor',
        explanation: 'SGLT2 inhibitors (dapagliflozin, empagliflozin) reduce mortality in HFrEF regardless of diabetes status and are now considered the 4th pillar of GDMT.',
        difficulty: 'Hard',
        system: 'Cardiology',
        topic: 'Heart Failure',
        category: 'high_yield',
        tags: ['pharmacology', 'guidelines'],
      },
      {
        text: 'A patient has SBP 185 after tPA was given. What is the BP target for the next 24 hours?',
        options: ['SBP < 140', 'SBP < 180', 'SBP < 200', 'No target — let it autoregulate'],
        answer: 'SBP < 180',
        explanation: 'Post-tPA: strict BP control < 180/105 for 24 hours to prevent hemorrhagic transformation. Use IV labetalol or nicardipine infusion.',
        difficulty: 'Medium',
        system: 'Cardiology',
        topic: 'Stroke',
        category: 'lecture',
        tags: ['guidelines'],
      },
    ],
    'Exam Prep Team': [
      {
        text: 'A shocked patient has warm extremities, low BP, and SvO2 of 80%. What type of shock?',
        options: ['Cardiogenic', 'Hypovolemic', 'Distributive (septic)', 'Obstructive'],
        answer: 'Distributive (septic)',
        explanation: 'Warm extremities + low SVR + HIGH SvO2 (>75%) = distributive shock. Tissues cannot extract O2 properly.',
        difficulty: 'Medium',
        system: 'Emergency Medicine',
        topic: 'Shock',
        category: 'high_yield',
        tags: ['hemodynamics', 'high-yield'],
      },
      {
        text: 'IV alteplase (tPA) for ischemic stroke must be given within how many hours of last known well?',
        options: ['3 hours', '4.5 hours', '6 hours', '12 hours'],
        answer: '4.5 hours',
        explanation: 'IV tPA window is 4.5 hours from last known well. Mechanical thrombectomy extends to 24 hours for LVO with favorable imaging.',
        difficulty: 'Easy',
        system: 'Neurology',
        topic: 'Stroke',
        category: 'high_yield',
        tags: ['guidelines', 'emergency'],
      },
      {
        text: 'Which of these is an ABSOLUTE contraindication to IV tPA?',
        options: ['Age 82', 'NIHSS 22', 'Prior intracerebral hemorrhage', 'History of migraine'],
        answer: 'Prior intracerebral hemorrhage',
        explanation: 'Prior ICH is an absolute contraindication. Age > 80, high NIHSS, and recent surgery are relative — weigh risks.',
        difficulty: 'Medium',
        system: 'Neurology',
        topic: 'Stroke',
        category: 'high_yield',
        tags: ['contraindications'],
      },
      {
        text: 'A patient with suspected PE has hypotension, hypoxia, and right heart strain on ECG (S1Q3T3). Best initial action?',
        options: ['CT pulmonary angiogram', 'Start empiric anticoagulation + bedside echo', 'Administer tPA', 'V/Q scan'],
        answer: 'Start empiric anticoagulation + bedside echo',
        explanation: 'In hemodynamically unstable suspected PE, do not delay for CTPA — start heparin, get bedside echo (RV strain supports diagnosis), consider systemic thrombolysis if hypotension persists.',
        difficulty: 'Hard',
        system: 'Emergency Medicine',
        topic: 'PE',
        category: 'high_yield',
        tags: ['emergency', 'guidelines'],
      },
      {
        text: 'A patient with anaphylaxis has wheezing, hypotension, and urticaria after a bee sting. First-line treatment?',
        options: ['IV diphenhydramine', 'IM epinephrine (anterolateral thigh)', 'IV hydrocortisone', 'Nebulized albuterol'],
        answer: 'IM epinephrine (anterolateral thigh)',
        explanation: 'IM epinephrine 0.3-0.5 mg (1:1000) is FIRST-LINE for anaphylaxis — give immediately. Antihistamines and steroids are adjuncts, not life-saving.',
        difficulty: 'Easy',
        system: 'Emergency Medicine',
        topic: 'Anaphylaxis',
        category: 'high_yield',
        tags: ['emergency', 'pharmacology'],
      },
      {
        text: 'In DKA, which electrolyte must you monitor most closely during insulin therapy?',
        options: ['Sodium', 'Potassium', 'Calcium', 'Magnesium'],
        answer: 'Potassium',
        explanation: 'Insulin drives K+ into cells. DKA patients have total-body K+ depletion despite normal/high serum K+ initially. Once insulin starts, K+ can drop dangerously → monitor q2h, replace when K+ < 5.2.',
        difficulty: 'Medium',
        system: 'Endocrinology',
        topic: 'DKA',
        category: 'high_yield',
        tags: ['electrolytes', 'emergency'],
      },
    ],
  };

  let totalQ = 0;
  for (const group of groups) {
    const seedQs = questionsByGroup[group.name];
    if (!seedQs) continue;
    for (const q of seedQs) {
      // Skip if a question with the same text already exists
      const existing = await db.groupQuestion.findFirst({
        where: { groupId: group.id, text: q.text },
      });
      if (existing) continue;

      await db.groupQuestion.create({
        data: {
          groupId: group.id,
          authorId: admin.id,
          category: q.category,
          type: 'mcq',
          text: q.text,
          options: JSON.stringify(q.options),
          answer: q.answer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          system: q.system,
          topic: q.topic,
          tags: JSON.stringify(q.tags || []),
        },
      });
      totalQ++;
    }
    console.log(`  + ${group.name}: ${seedQs.length} questions seeded`);
  }

  console.log('\n─────────────────────────────────────────────────');
  console.log('✅ Group question seed complete!');
  console.log('─────────────────────────────────────────────────');
  console.log(`  Total questions created: ${totalQ}`);
  console.log(`  Total GroupQuestion rows: ${await db.groupQuestion.count()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  });
