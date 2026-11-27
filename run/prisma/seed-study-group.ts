/**
 * Seed a real study Group + courses + lectures + chunks.
 *
 * Links to the existing seeded chat room "Cardiology Study Group"
 * (created by prisma/seed-chat.ts) so the user can open that chat room,
 * click the 📖 Study button, and immediately see courses & lectures.
 *
 * Idempotent: safe to re-run.
 *
 * Run with:  bunx tsx prisma/seed-study-group.ts
 */
import { db } from '../src/lib/db';

async function main() {
  console.log('\n🎓 Seeding study group + courses + lectures...\n');

  // 1) Find the "Cardiology Study Group" chat room (from seed-chat.ts)
  const cardiologyRoom = await db.chatRoom.findFirst({
    where: { name: 'Cardiology Study Group', type: 'group' },
    include: { members: true },
  });
  if (!cardiologyRoom) {
    throw new Error('Chat room "Cardiology Study Group" not found. Run seed-chat.ts first.');
  }
  console.log(`[Room] Found "${cardiologyRoom.name}" (${cardiologyRoom.id}) with ${cardiologyRoom.members.length} members`);

  // Find an admin member to be the group admin / lecture author
  const roomAdmin = cardiologyRoom.members.find(m => m.role === 'admin') ?? cardiologyRoom.members[0];
  if (!roomAdmin) throw new Error('No members in chat room');

  // 2) Find-or-create the linked Group record
  let group = await db.group.findUnique({
    where: { chatRoomId: cardiologyRoom.id },
    include: { members: true },
  });

  if (!group) {
    group = await db.group.create({
      data: {
        name: 'Cardiology Study Group',
        description: 'Collaborative cardiology study group — lectures, cases, and question bank for medical students preparing for board exams.',
        avatar: '🫀',
        type: 'study_group',
        isPublic: false,
        inviteCode: 'CARDS2026',
        chatRoomId: cardiologyRoom.id,
        createdBy: roomAdmin.userId,
        memberCount: cardiologyRoom.members.length,
        members: {
          create: cardiologyRoom.members.map(m => ({
            userId: m.userId,
            role: m.role === 'admin' ? 'admin' : 'member',
          })),
        },
      },
      include: { members: true },
    });
    console.log(`[Group] Created "${group.name}" (${group.id})`);
  } else {
    console.log(`[Group] Already exists "${group.name}" (${group.id}) — reusing`);
  }

  // 3) Create a second study group linked to "Exam Prep Team"
  const examRoom = await db.chatRoom.findFirst({
    where: { name: 'Exam Prep Team', type: 'group' },
    include: { members: true },
  });

  let examGroup: { id: string; name: string } | null = null;
  if (examRoom) {
    const examAdmin = examRoom.members.find(m => m.role === 'admin') ?? examRoom.members[0];
    let g2 = await db.group.findUnique({ where: { chatRoomId: examRoom.id } });
    if (!g2 && examAdmin) {
      g2 = await db.group.create({
        data: {
          name: 'Exam Prep Team',
          description: 'Multi-system board exam preparation — high-yield lectures and self-tests across all major subjects.',
          avatar: '📚',
          type: 'study_group',
          isPublic: false,
          inviteCode: 'EXAMPREP',
          chatRoomId: examRoom.id,
          createdBy: examAdmin.userId,
          memberCount: examRoom.members.length,
          members: {
            create: examRoom.members.map(m => ({
              userId: m.userId,
              role: m.role === 'admin' ? 'admin' : 'member',
            })),
          },
        },
      });
      console.log(`[Group] Created "${g2.name}" (${g2.id})`);
      examGroup = { id: g2.id, name: g2.name };
    } else if (g2) {
      console.log(`[Group] Already exists "${g2.name}" (${g2.id}) — reusing`);
      examGroup = { id: g2.id, name: g2.name };
    }
  }

  // 4) Helper: upsert a course (GroupCourseMeta) + lectures with chunks
  type LectureInput = {
    title: string;
    description: string;
    system: string;       // course/subject name
    topic: string;
    coverUrl?: string;
    order: number;
    sections: {
      title: string;
      sectionDescription: string;
      sectionObjectives: string[];   // JSON-encoded
      sectionTags: string[];
      estimatedMinutes: number;
      sources: {
        sourceTitle: string;
        sourceDescription: string;
        type: 'text' | 'video' | 'link';
        textContent?: string;
        url?: string;
      }[];
    }[];
  };

  async function seedLecture(input: LectureInput, groupId: string, authorId: string) {
    // Find-or-create by (groupId, title)
    let lecture = await db.groupLecture.findFirst({
      where: { groupId, title: input.title },
      include: { chunks: true },
    });

    if (!lecture) {
      lecture = await db.groupLecture.create({
        data: {
          groupId,
          authorId,
          title: input.title,
          description: input.description,
          system: input.system,
          topic: input.topic,
          coverUrl: input.coverUrl ?? '',
          order: input.order,
        },
        include: { chunks: true },
      });
      console.log(`  + Lecture: ${input.title}`);
    } else {
      console.log(`  = Lecture exists: ${input.title}`);
      // Wipe chunks so we can re-create (idempotent re-run)
      if (lecture.chunks.length > 0) {
        await db.groupLectureChunk.deleteMany({ where: { lectureId: lecture.id } });
      }
    }

    let chunkOrder = 0;
    for (const section of input.sections) {
      for (const source of section.sources) {
        await db.groupLectureChunk.create({
          data: {
            lectureId: lecture.id,
            title: section.title,
            sourceTitle: source.sourceTitle,
            sourceDescription: source.sourceDescription,
            type: source.type,
            url: source.url ?? '',
            textContent: source.textContent ?? '',
            duration: source.type === 'video' ? 720 : 0,
            order: chunkOrder++,
            sectionDescription: section.sectionDescription,
            sectionObjectives: JSON.stringify(section.sectionObjectives),
            sectionTags: JSON.stringify(section.sectionTags),
            estimatedMinutes: section.estimatedMinutes,
          },
        });
      }
    }
  }

  async function seedCourseMeta(groupId: string, subject: string, coverUrl: string, description: string) {
    await db.groupCourseMeta.upsert({
      where: { groupId_subject: { groupId, subject } },
      create: { groupId, subject, coverUrl, description },
      update: { coverUrl, description },
    });
    console.log(`  + Course meta: ${subject}`);
  }

  // ─── COURSES & LECTURES for Cardiology Study Group ───────────────────────
  console.log('\n[Cardiology Group] Seeding courses & lectures...');
  await seedCourseMeta(group.id, 'Cardiology', 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800', 'Heart anatomy, physiology, pathology, and pharmacology — from basic science to clinical management.');
  await seedCourseMeta(group.id, 'Pharmacology', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800', 'High-yield cardiovascular pharmacology — antihypertensives, antiarrhythmics, and anticoagulants.');

  await seedLecture({
    title: 'Heart Failure — Pathophysiology & Management',
    description: 'Comprehensive overview of heart failure: definitions, NYHA classification, neurohormonal activation, GDMT (Guideline-Directed Medical Therapy), and acute decompensation management.',
    system: 'Cardiology',
    topic: 'Heart Failure',
    coverUrl: 'https://images.unsplash.com/photo-1559757175-08fda86d0b0b?w=800',
    order: 1,
    sections: [
      {
        title: '1. Definitions & Classification',
        sectionDescription: 'Heart failure definitions, NYHA classes, and ACC/AHA stages — the foundation for understanding disease progression.',
        sectionObjectives: ['Define heart failure with reduced vs preserved EF', 'Distinguish NYHA class from ACC/AHA stage', 'Identify the four ACC/AHA stages'],
        sectionTags: ['high-yield', 'definitions'],
        estimatedMinutes: 15,
        sources: [
          {
            sourceTitle: 'Short Intro',
            sourceDescription: '5-minute high-yield overview',
            type: 'text',
            textContent: 'Heart failure is a clinical syndrome characterized by the heart\'s inability to pump sufficient blood to meet metabolic demands, OR doing so only at elevated filling pressures.\n\nTwo key classifications:\n• HFrEF (reduced EF ≤ 40%): systolic dysfunction\n• HFpEF (preserved EF ≥ 50%): diastolic dysfunction\n• HFmEF (mid-range 41-49%): grey zone\n\nNYHA Functional Classification (symptoms):\n• Class I — no limitation\n• Class II — slight limitation, ordinary activity causes symptoms\n• Class III — marked limitation, less-than-ordinary activity causes symptoms\n• Class IV — symptoms at rest\n\nACC/AHA Stages (structural progression):\n• A — at risk, no structural change, no symptoms\n• B — structural change, no symptoms\n• C — structural change + current/past symptoms\n• D — advanced disease, refractory to GDMT',
          },
          {
            sourceTitle: 'Deep Dive',
            sourceDescription: 'Detailed 20-min lecture',
            type: 'text',
            textContent: 'The NYHA and ACC/AHA systems are complementary — NYHA tracks CURRENT symptomatic burden (changes day-to-day with treatment), while ACC/AHA tracks DISEASE PROGRESSION (one-way: once you are Stage C, you never go back).\n\nKey pearls:\n1. A patient can be Stage C with NYHA class II today and NYHA class III tomorrow after a salty meal\n2. The "dangling modifier" trap: HFrEF and HFpEF describe EF category; Stage A-D describes disease stage; NYHA I-IV describes functional status — NEVER mix these\n3. Mortality at 5 years is ~50% after hospitalization for HF — worse than many cancers',
          },
        ],
      },
      {
        title: '2. Neurohormonal Activation',
        sectionDescription: 'The RAAS and sympathetic nervous system in heart failure — both adaptive short-term, maladaptive long-term.',
        sectionObjectives: ['Explain why RAAS activation initially helps but ultimately worsens HF', 'Trace the renin-angiotensin-aldosterone cascade', 'Identify the four pillars of GDMT by mechanism'],
        sectionTags: ['high-yield', 'mechanism', 'pharmacology'],
        estimatedMinutes: 20,
        sources: [
          {
            sourceTitle: 'Core Concept',
            sourceDescription: 'RAAS + SNS pathophysiology',
            type: 'text',
            textContent: 'Decreased cardiac output → decreased renal perfusion → juxtaglomerular apparatus releases renin → angiotensinogen → angiotensin I → angiotensin II (via ACE in lungs).\n\nAngiotensin II effects (all maladaptive long-term in HF):\n• Potent vasoconstriction (↑ afterload)\n• Aldosterone release (Na+ retention, K+ wasting, ↑ preload)\n• ADH release (water retention)\n• Cardiac remodeling (hypertrophy, fibrosis)\n• Sympathetic activation\n\nSympathetic Nervous System (SNS):\n• Initially compensatory — ↑ HR, ↑ contractility\n• Chronic activation → myocyte apoptosis, β-receptor downregulation, arrhythmias\n\nTHE FOUR PILLARS of GDMT for HFrEF (each targets a different neurohormonal pathway):\n1. ARNI (sacubitril/valsartan) or ACEi/ARB — block angiotensin II\n2. β-blocker (carvedilol, metoprolol succinate, bisoprolol) — block SNS\n3. MRA (spironolactone, eplerenone) — block aldosterone\n4. SGLT2 inhibitor (dapagliflozin, empagliflozin) — glycemic control independent of EF benefit\n\nAll four reduce mortality — start ALL four (low dose, titrate up).',
          },
        ],
      },
      {
        title: '3. Acute Decompensation',
        sectionDescription: 'Recognition and management of acute decompensated heart failure — a common board and clinical scenario.',
        sectionObjectives: ['Identify the four clinical profiles (wet/dry, warm/cold)', 'Choose correct initial therapy by profile', 'Recognize indications for mechanical circulatory support'],
        sectionTags: ['emergency', 'high-yield'],
        estimatedMinutes: 25,
        sources: [
          {
            sourceTitle: 'Clinical Algorithm',
            sourceDescription: 'Stevenson profile + treatment',
            type: 'text',
            textContent: 'Acute HF classification (Stevenson profiles):\n\n              | Congested (wet)        | Not congested (dry)\n───────────┼────────────────────────┼─────────────────────────\nPerfused   | Profile B (warm & wet) | Profile A (warm & dry)\n(warm)     | Most common             | Goal state\n───────────┼────────────────────────┼─────────────────────────\nHypoperfused| Profile C (cold & wet) | Profile L (cold & dry)\n(cold)     | Cardiogenic shock risk  | Over-diuresed\n\nTreatment by profile:\n• Warm & wet (B): IV loop diuretic ± vasodilator (NTG) if BP allows\n• Cold & wet (C): IV inotrope (dobutamine, milrinone) + diuretic — this is the dangerous one\n• Warm & dry (A): oral GDMT, watch for over-diuresis\n• Cold & dry (L): cautious fluids, reduce diuretics\n\nRed flags → ICU + consider mechanical support (IABP, Impella, ECMO):\n• Lactate > 2 mmol/L\n• SBP < 90 mmHg\n• End-organ dysfunction (creatinine ↑, LFTs ↑, altered mental status)\n• Cold extremities with poor urine output',
          },
        ],
      },
    ],
  }, group.id, roomAdmin.userId);

  await seedLecture({
    title: 'Acute Coronary Syndromes — STEMI vs NSTEMI',
    description: 'Differentiating STEMI, NSTEMI, and unstable angina. ECG interpretation, biomarkers, and the reperfusion ladder.',
    system: 'Cardiology',
    topic: 'Acute Coronary Syndrome',
    coverUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    order: 2,
    sections: [
      {
        title: '1. ECG Recognition',
        sectionDescription: 'STEMI equivalents, territory localization, and pitfalls.',
        sectionObjectives: ['Identify ST elevation with proper MI criteria', 'Localize occluded artery by ECG territory', 'Recognize STEMI equivalents (LBBB, posterior MI, hyperacute T)'],
        sectionTags: ['ECG', 'emergency', 'high-yield'],
        estimatedMinutes: 20,
        sources: [
          {
            sourceTitle: 'ECG Pearls',
            sourceDescription: 'High-yield ECG for ACS',
            type: 'text',
            textContent: 'STEMI diagnostic criteria (in adults):\n• ST elevation ≥ 1 mm in 2 contiguous limb leads (I, II, III, aVF, aVL, aVR)\n• ST elevation ≥ 2 mm in 2 contiguous chest leads (V1-V6) for men, ≥ 1.5 mm for women\n• New LBBB with appropriate clinical picture = STEMI equivalent\n\nTerritory → culprit artery:\n• V1-V4 → LAD (anterior)\n• II, III, aVF → RCA (inferior)\n• I, aVL, V5-V6 → LCx/OM (lateral)\n• V7-V9 (posterior leads) → LCx or RCA (posterior)\n• V1-V2 ST depression with tall R waves → posterior STEMI (mirror image)\n\nSTEMI equivalents (don\'t miss these):\n1. New LBBB with chest pain\n2. Posterior MI: V1-V2 ST depression + tall R waves (use V7-V9 to confirm)\n3. Hyperacute T waves (early, before ST elevation)\n4. De Winter T waves (upsloping ST depression in precordial leads)\n5. Wellens syndrome (deep biphasic T waves in V2-V3, critical LAD)',
          },
        ],
      },
      {
        title: '2. Reperfusion Strategy',
        sectionDescription: 'Primary PCI vs fibrinolysis — when and how.',
        sectionObjectives: ['Identify door-to-balloon time targets', 'List absolute contraindications to fibrinolysis', 'Differentiate STEMI from NSTEMI management'],
        sectionTags: ['emergency', 'guidelines'],
        estimatedMinutes: 18,
        sources: [
          {
            sourceTitle: 'Reperfusion Ladder',
            sourceDescription: 'PCI vs lysis decision tree',
            type: 'text',
            textContent: 'STEMI (ST-elevation MI): immediate reperfusion is the priority.\n• First 12 hours: primary PCI preferred if available within 120 min of first medical contact\n• Door-to-balloon time goal: ≤ 90 min\n• If PCI not available within 120 min: fibrinolysis (tenecteplase, alteplase) within 30 min of arrival\n• Fibrinolysis contraindications: prior ICH, known cerebral vascular lesion, malignant intracranial neoplasm, ischemic stroke < 3 months, suspected aortic dissection, active bleeding, significant closed-head/facial trauma < 3 months\n\nNSTEMI (non-ST elevation MI): no immediate reperfusion — risk-stratify instead.\n• High-risk features (refractory angina, hemodynamic instability, sustained VT, dynamic ST changes) → urgent angiography (< 2 hours)\n• Intermediate-risk (TIMI ≥ 3, GRACE 109-140, renal dysfunction) → early invasive (< 24 hours)\n• Low-risk → selective angiography after non-invasive testing\n\nPharmacotherapy for ALL ACS (MONA-B + dual antiplatelet + anticoagulation):\nM — Morphine (pain, anxiety, preload reduction) — but may delay antiplatelet absorption\nO — Oxygen (only if SpO2 < 90%)\nN — Nitrates (SL NTG, IV NTG for ongoing pain)\nA — Aspirin 162-325 mg chewed\nB — Beta blocker (carvedilol, metoprolol) — UNLESS acute HF, hypotension, bradycardia, severe COPD\n+ P2Y12 inhibitor (ticagrelor preferred, clopidogrel if high bleed risk)\n+ Anticoagulation (UFH, enoxaparin, bivalirudin)\n+ High-intensity statin (atorvastatin 80 mg)',
          },
        ],
      },
    ],
  }, group.id, roomAdmin.userId);

  await seedLecture({
    title: 'Antihypertensive Pharmacology',
    description: 'First-line antihypertensive classes, indications, contraindications, and the J-curve concept.',
    system: 'Pharmacology',
    topic: 'Antihypertensives',
    coverUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
    order: 3,
    sections: [
      {
        title: '1. First-Line Agents',
        sectionDescription: 'ACEi/ARB, CCB, thiazide — when to choose each.',
        sectionObjectives: ['List the three first-line antihypertensive classes', 'Match compelling indications to specific drug classes', 'Identify contraindications for each class'],
        sectionTags: ['pharmacology', 'guidelines', 'high-yield'],
        estimatedMinutes: 22,
        sources: [
          {
            sourceTitle: 'Drug Class Cheat Sheet',
            sourceDescription: 'First-line agents with compelling indications',
            type: 'text',
            textContent: 'First-line antihypertensive classes (per JNC8 / ACC-AHA 2017):\n\n1. ACEi (Lisinopril) / ARB (Losartan)\n   • Compelling indications: diabetes, CKD, heart failure, post-MI\n   • Side effects: dry cough (ACEi), hyperkalemia, ↑ Cr (initial 30% bump is OK), angioedema (ACEi > ARB)\n   • CONTRAINDICATED in pregnancy (teratogenic — fetal renal agenesis)\n   • NEVER combine ACEi + ARB (no added benefit, ↑ harm)\n\n2. Calcium Channel Blockers\n   • Dihydropyridines (amlodipine, nifedipine): vasodilators → peripheral edema, headache, reflex tachycardia\n   • Non-dihydropyridines (diltiazem, verapamil): HR & contractility ↓ → constipation (verapamil), avoid in HFrEF\n   • Compelling indication: older adults, African-American patients, angina\n\n3. Thiazide diuretics (chlorthalidone > HCTZ)\n   • Compelling indication: older adults, African-American patients, osteoporosis (thiazides retain Ca)\n   • Side effects: hypokalemia, hyponatremia, hyperuricemia (precipitates gout), hyperglycemia, hyperlipidemia\n   • Avoid: gout, severe hyponatremia\n\nSecond-line (only if ≥ 3 first-line agents at max dose fail):\n• Spironolactone (resistant HTN — block aldosterone escape)\n• Beta-blockers (NOT first-line for HTN alone unless compelling indication: post-MI, HF, AFib)\n• Alpha-blockers (BPH + HTN)\n• Direct vasodilators (hydralazine, minoxidil) — last resort; cause reflex tachycardia + fluid retention\n\nRace caveat (population-level, not absolute): African-American patients often respond better to CCB + thiazide than to ACEi/ARB monotherapy. Guidelines recommend CCB or thiazide as first-line.',
          },
        ],
      },
    ],
  }, group.id, roomAdmin.userId);

  // ─── COURSES & LECTURES for Exam Prep Team (second group) ────────────────
  if (examGroup) {
    console.log('\n[Exam Prep Group] Seeding courses & lectures...');
    const examAdmin = examRoom?.members.find(m => m.role === 'admin')?.userId ?? roomAdmin.userId;
    await seedCourseMeta(examGroup.id, 'Emergency Medicine', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800', 'High-yield emergencies: ABCDE assessment, shock states, toxicology, and trauma.');
    await seedCourseMeta(examGroup.id, 'Neurology', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800', 'Cerebrovascular disease, seizures, and altered mental status.');

    await seedLecture({
      title: 'Shock States — Recognition & Resuscitation',
      description: 'Differentiating distributive, cardiogenic, hypovolemic, and obstructive shock. Hemodynamic profiles and early goal-directed therapy.',
      system: 'Emergency Medicine',
      topic: 'Shock',
      coverUrl: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800',
      order: 1,
      sections: [
        {
          title: '1. Classification by Hemodynamics',
          sectionDescription: 'The four shock types distinguished by cardiac output and systemic vascular resistance.',
          sectionObjectives: ['Classify shock by SVR/CO profile', 'Identify the most likely type from clinical vignette', 'Predict mixed venous saturation patterns'],
          sectionTags: ['emergency', 'high-yield'],
          estimatedMinutes: 18,
          sources: [
            {
              sourceTitle: 'Hemodynamic Profiles',
              sourceDescription: 'The 4 shock types compared',
              type: 'text',
              textContent: 'Four types of shock, distinguished by cardiac output (CO) and systemic vascular resistance (SVR):\n\nType                    | CO      | SVR     | PCWP    | Typical cause\n────────────────────────┼─────────┼─────────┼─────────┼──────────────────\nHypovolemic             | ↓↓      | ↑↑      | ↓↓      | Hemorrhage, dehydration\nCardiogenic             | ↓↓      | ↑↑      | ↑↑      | MI, cardiomyopathy\nObstructive             | ↓       | ↑       | ↓ or ↑  | PE, tamponade, tension PTX\nDistributive (septic)   | ↑↑      | ↓↓      | ↓ or NL | Sepsis, anaphylaxis, neurogenic\n\nMixed venous saturation (SvO2) helps identify septic shock early:\n• Normal SvO2: 65-75%\n• Septic shock: ↑ SvO2 (> 75%) — tissues can\'t extract O2 (mitochondrial dysfunction)\n• Cardiogenic shock: ↓ SvO2 (< 65%) — tissues extracting maximally to compensate\n\nKey clinical clues:\n• Warm extremities + hypotension = distributive (vasodilated)\n• Cold extremities + hypotension = cardiogenic / hypovolemic (vasoconstricted)\n• JVD + hypotension + muffled heart sounds (Beck triad) = tamponade\n• JVD + hypotension + unilateral decreased breath sounds = tension pneumothorax\n• Sudden hypotension + hypoxia + recent surgery or immobility = pulmonary embolism\n\nEarly goal-directed therapy (EGDT) — surviving sepsis 1-hour bundle:\n1. Lactate > 2 mmol/L → measure again at 2-4 hours\n2. Blood cultures × 2 BEFORE antibiotics\n3. Broad-spectrum antibiotics within 1 hour\n4. Crystalloid 30 mL/kg bolus\n5. Norepinephrine first-line if MAP < 65 after fluids\n6. Reassess lactate clearance and MAP',
            },
          ],
        },
      ],
    }, examGroup.id, examAdmin);

    await seedLecture({
      title: 'Acute Stroke — Time is Brain',
      description: 'Ischemic vs hemorrhagic stroke, NIHSS, tPA inclusion/exclusion, and thrombectomy windows.',
      system: 'Neurology',
      topic: 'Stroke',
      coverUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
      order: 2,
      sections: [
        {
          title: '1. Acute Stroke Evaluation',
          sectionDescription: 'The first 60 minutes — recognition, imaging, and treatment decisions.',
          sectionObjectives: ['List tPA inclusion and exclusion criteria', 'Identify thrombectomy-eligible patients', 'Differentiate stroke mimics'],
          sectionTags: ['emergency', 'neurology', 'high-yield'],
          estimatedMinutes: 25,
          sources: [
            {
              sourceTitle: 'tPA Decision Tree',
              sourceDescription: 'Alteplase criteria + thrombectomy',
              type: 'text',
              textContent: 'Acute stroke pathway:\n\n1. Recognize — sudden focal neurologic deficit (FAST: Face, Arm, Speech, Time). Use NIHSS to quantify severity (0 = normal, 21+ = severe).\n\n2. Last known well (LKW) — critical timestamp. Treatment windows are from LKW, not from arrival.\n\n3. Non-contrast CT head FIRST — rule out hemorrhage (blood is bright on CT). Do NOT give tPA before CT.\n\n4. Ischemic stroke treatment options:\n\n   A. IV Alteplase (tPA) — 0.9 mg/kg (max 90 mg), 10% bolus over 1 min, rest over 60 min\n      • Window: within 4.5 hours of LKW\n      • Absolute contraindications:\n        - Prior ICH\n        - Known cerebral vascular lesion (AVM, aneurysm)\n        - Intracranial neoplasm\n        - Active internal bleeding\n        - Recent intracranial/intraspinal surgery (< 3 mo)\n        - Ischemic stroke within 3 months\n        - Suspected aortic dissection\n        - Platelets < 100k, INR > 1.7, anticoagulant use with elevated levels\n      • Relative contraindications (weigh risks):\n        - Severe neurologic deficit (NIHSS > 25 — low benefit, high bleed risk)\n        - Seizure at onset (was it really a stroke?)\n        - Pregnancy\n        - Age > 80 (still treat, but acknowledge higher bleed risk)\n\n   B. Mechanical thrombectomy (MT)\n      • Window: within 24 hours of LKW for large vessel occlusion (LVO) in anterior circulation\n      • Selection: NIHSS ≥ 6 + LVO on CTA (ICA, M1, M2) + ASPECTS ≥ 6 on CT\n      • Even after tPA, MT candidates proceed to thrombectomy (tPA doesn\'t dissolve large clots well)\n      • Mismatch between CT perfusion (core vs penumbra) guides extended window 6-24h (DAWN/DEFUSE-3 criteria)\n\n5. Hemorrhagic stroke management:\n   • Reverse anticoagulation (PCC for warfarin, andexanet for DOACs, protamine for heparin)\n   • BP control: SBP 140-160 mmHg (don\'t drop too fast)\n   • Neurosurgery consult — ICH > 30 mL or cerebellar hemorrhage > 3 cm may need evacuation\n   • Monitor ICP — head of bed 30°, sedation, osmotic therapy (mannitol or hypertonic saline)',
            },
          ],
        },
      ],
    }, examGroup.id, examAdmin);
  }

  // ─── Final counts ────────────────────────────────────────────────────────
  console.log('\n─────────────────────────────────────────────────');
  console.log('✅ Study group seed completed!');
  console.log('─────────────────────────────────────────────────');
  const groups = await db.group.count();
  const groupMembers = await db.groupMember.count();
  const courses = await db.groupCourseMeta.count();
  const lectures = await db.groupLecture.count();
  const chunks = await db.groupLectureChunk.count();
  console.log(`  Groups:           ${groups}`);
  console.log(`  Group members:    ${groupMembers}`);
  console.log(`  Courses (meta):   ${courses}`);
  console.log(`  Lectures:         ${lectures}`);
  console.log(`  Lecture chunks:   ${chunks}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  });
