/**
 * Seed demo flashcard decks for the two study groups.
 *
 * Idempotent — safe to re-run.
 *
 * Run with:  bunx tsx prisma/seed-flashcards.ts
 */
import { db } from '../src/lib/db';

async function main() {
  console.log('\n🃏 Seeding flashcard decks...\n');

  const groups = await db.group.findMany({ select: { id: true, name: true } });
  if (groups.length === 0) {
    console.log('No groups found. Run seed-study-group.ts first.');
    return;
  }

  // Pick an admin user to be the "creator"
  const admin = await db.user.findFirst({ where: { email: 'sarah@medq.test' } })
              ?? await db.user.findFirst({ where: { email: 'student@medq.com' } });
  if (!admin) {
    console.log('No user found to assign as deck creator.');
    return;
  }

  type CardSeed = { front: string; back: string; hint?: string; tags?: string[] };
  type DeckSeed = { name: string; description: string; subject: string; cards: CardSeed[] };

  const decksByGroup: Record<string, DeckSeed[]> = {
    'Cardiology Study Group': [
      {
        name: 'Heart Failure High-Yield',
        description: 'Must-know facts for HFrEF/HFpEF — definitions, GDMT four pillars, acute decompensation profiles.',
        subject: 'Cardiology',
        cards: [
          { front: 'Define HFrEF vs HFpEF by ejection fraction.', back: 'HFrEF: EF ≤ 40%\nHFmrEF: EF 41-49%\nHFpEF: EF ≥ 50%', tags: ['definitions', 'high-yield'] },
          { front: 'List the four pillars of GDMT for HFrEF.', back: '1. ARNI (or ACEi/ARB)\n2. β-blocker (carvedilol, metoprolol succinate, bisoprolol)\n3. MRA (spironolactone, eplerenone)\n4. SGLT2 inhibitor (dapagliflozin, empagliflozin)', hint: 'All four reduce mortality.', tags: ['pharmacology', 'high-yield'] },
          { front: 'Which Stevenson profile is "cold & wet"? What\'s the treatment?', back: 'Profile C (cardiogenic shock risk).\nTreatment: IV inotrope (dobutamine or milrinone) + IV loop diuretic.', tags: ['emergency'] },
          { front: 'Which drugs are CONTRAINDICATED in pregnancy for HTN?', back: 'ACEi and ARBs — teratogenic (fetal renal agenesis). Use labetalol, nifedipine, or methyldopa instead.', tags: ['pharmacology', 'contraindications'] },
          { front: 'NYHA Class III definition?', back: 'Marked limitation of physical activity. Less-than-ordinary activity causes symptoms (e.g., walking one block causes dyspnea). Asymptomatic at rest.', tags: ['definitions'] },
          { front: 'What is the first-line diuretic for acute decompensated HF?', back: 'IV loop diuretic (furosemide, torsemide, bumetanide). Thiazides can be added for "sequential nephron blockade" in diuretic resistance.', tags: ['pharmacology'] },
          { front: 'Name 3 causes of high-output heart failure.', back: 'Anemia, thyrotoxicosis, AV fistula, Paget disease, beriberi (thiamine deficiency), sepsis.', hint: 'Think: anything that chronically ↑ CO.', tags: ['etiology'] },
          { front: 'BNP cutoff suggesting HF in acute dyspnea?', back: 'BNP > 400 pg/mL strongly supports HF.\nBNP < 100 pg/mL: HF unlikely.\n100-400: grey zone (consider PE, renal failure, COPD exacerbation).', tags: ['diagnostics'] },
        ],
      },
      {
        name: 'ACS / STEMI Quick Recall',
        description: 'Time-critical facts for acute coronary syndrome recognition and management.',
        subject: 'Cardiology',
        cards: [
          { front: 'STEMI ECG criteria in limb leads?', back: 'ST elevation ≥ 1 mm in 2 contiguous limb leads (I, II, III, aVF, aVL, aVR).', tags: ['ECG'] },
          { front: 'STEMI ECG criteria in chest leads?', back: 'ST elevation ≥ 2 mm in 2 contiguous chest leads (V1-V6) for men; ≥ 1.5 mm for women.', tags: ['ECG'] },
          { front: 'ECG territory → culprit artery: V1-V4?', back: 'LAD (anterior wall).', tags: ['ECG'] },
          { front: 'ECG territory → culprit artery: II, III, aVF?', back: 'RCA (inferior wall).', tags: ['ECG'] },
          { front: 'Door-to-balloon time goal for primary PCI?', back: '≤ 90 minutes from first medical contact to balloon inflation.', tags: ['guidelines'] },
          { front: 'tPA absolute contraindications (list 4)?', back: '1. Prior intracerebral hemorrhage\n2. Known cerebral vascular lesion (AVM, aneurysm)\n3. Active internal bleeding\n4. Intracranial/intraspinal surgery within 3 months\n5. Ischemic stroke within 3 months\n6. Suspected aortic dissection', tags: ['contraindications'] },
          { front: 'Name 3 STEMI equivalents (NOT standard ST elevation).', back: '1. New LBBB with chest pain\n2. Posterior MI (V1-V2 ST depression + tall R)\n3. Hyperacute T waves\n4. De Winter T waves\n5. Wellens syndrome', tags: ['ECG', 'high-yield'] },
          { front: 'Drug acronym for ACS initial management: MONA-B', back: 'M — Morphine (pain, anxiety)\nO — Oxygen (only if SpO2 < 90%)\nN — Nitrates (SL NTG)\nA — Aspirin 162-325 mg chewed\nB — Beta blocker (unless acute HF, hypotension, bradycardia, severe COPD)', tags: ['emergency'] },
        ],
      },
      {
        name: 'Antihypertensive Cheat Sheet',
        description: 'First-line HTN drugs, compelling indications, and key side effects.',
        subject: 'Pharmacology',
        cards: [
          { front: 'Three first-line antihypertensive classes (JNC8)?', back: '1. ACEi or ARB\n2. Calcium channel blocker (CCB)\n3. Thiazide diuretic', tags: ['pharmacology'] },
          { front: 'ACEi side effects (list 4)?', back: '1. Dry cough (bradykinin)\n2. Hyperkalemia\n3. Acute kidney injury (initial Cr bump up to 30% is OK)\n4. Angioedema (life-threatening, more common in Black patients)', tags: ['pharmacology', 'side-effects'] },
          { front: 'Thiazide side effects (list 4)?', back: '1. Hypokalemia\n2. Hyponatremia\n3. Hyperuricemia (gout)\n4. Hyperglycemia\n5. Hyperlipidemia\n6. Hypercalcemia (could be useful in osteoporosis)', tags: ['pharmacology', 'side-effects'] },
          { front: 'Which HTN drug is contraindicated in gout?', back: 'Thiazide diuretic — causes hyperuricemia. Use CCB or ACEi/ARB instead.', tags: ['contraindications'] },
          { front: 'Resistant HTN = BP uncontrolled on how many drugs?', back: '≥ 3 antihypertensives at max tolerated doses (including a diuretic). Add spironolactone as 4th agent.', tags: ['definitions'] },
        ],
      },
    ],
    'Exam Prep Team': [
      {
        name: 'Shock States Quick Recall',
        description: 'Hemodynamic profiles of the four shock types — high-yield for board exams.',
        subject: 'Emergency Medicine',
        cards: [
          { front: 'Cardiac output and SVR pattern in septic shock?', back: 'CO: ↑↑ (high)\nSVR: ↓↓ (low)\nPCWP: normal or low', tags: ['hemodynamics', 'high-yield'] },
          { front: 'Cardiac output and SVR pattern in cardiogenic shock?', back: 'CO: ↓↓ (low)\nSVR: ↑↑ (high, compensatory vasoconstriction)\nPCWP: ↑↑ (backup from failing LV)', tags: ['hemodynamics'] },
          { front: 'Beck triad = ?', back: 'Cardiac tamponade:\n1. Hypotension\n2. JVD\n3. Muffled heart sounds', tags: ['clinical', 'emergency'] },
          { front: 'Surviving Sepsis 1-hour bundle (list 4)?', back: '1. Measure lactate (recheck at 2-4h if > 2)\n2. Blood cultures × 2 BEFORE antibiotics\n3. Broad-spectrum antibiotics\n4. Crystalloid 30 mL/kg bolus\n5. Norepinephrine if MAP < 65 after fluids', tags: ['emergency', 'guidelines'] },
          { front: 'Mixed venous saturation (SvO2) in septic shock?', back: '↑↑ (> 75%) — tissues cannot extract O2 due to mitochondrial dysfunction. Normal is 65-75%.', tags: ['diagnostics'] },
        ],
      },
      {
        name: 'Acute Stroke Essentials',
        description: 'tPA window, contraindications, and thrombectomy criteria.',
        subject: 'Neurology',
        cards: [
          { front: 'IV alteplase (tPA) window from last known well?', back: '≤ 4.5 hours.', tags: ['guidelines', 'high-yield'] },
          { front: 'tPA dose for acute ischemic stroke?', back: '0.9 mg/kg (max 90 mg). 10% bolus over 1 minute, remaining 90% over 60 minutes.', tags: ['pharmacology'] },
          { front: 'Mechanical thrombectomy window for large vessel occlusion?', back: '≤ 24 hours from last known well (anterior circulation, LVO with favorable CT perfusion mismatch — DAWN/DEFUSE-3 criteria).', tags: ['guidelines'] },
          { front: 'NIHSS threshold typically used for thrombectomy?', back: 'NIHSS ≥ 6 (moderate-to-severe deficit) with LVO on CTA (ICA, M1, M2).', tags: ['guidelines'] },
          { front: 'Blood pressure target before tPA?', back: 'SBP < 185 mmHg AND DBP < 110 mmHg. Lower with labetalol or nicardipine if needed.', tags: ['guidelines'] },
          { front: 'Blood pressure target AFTER tPA (24h)?', back: 'SBP < 180 mmHg AND DBP < 105 mmHg (to prevent hemorrhagic transformation).', tags: ['guidelines'] },
        ],
      },
    ],
  };

  let totalDecks = 0;
  let totalCards = 0;
  for (const group of groups) {
    const seedDecks = decksByGroup[group.name];
    if (!seedDecks) continue;
    for (const deck of seedDecks) {
      // Skip if deck with this name already exists in this group
      const existing = await db.groupFlashcardDeck.findFirst({
        where: { groupId: group.id, name: deck.name },
      });
      if (existing) {
        console.log(`  = Deck exists: ${deck.name} (skipping)`);
        continue;
      }
      const created = await db.groupFlashcardDeck.create({
        data: {
          groupId: group.id,
          name: deck.name,
          description: deck.description,
          subject: deck.subject,
          createdBy: admin.id,
          flashcards: {
            create: deck.cards.map((c, i) => ({
              front: c.front,
              back: c.back,
              hint: c.hint || '',
              tags: JSON.stringify(c.tags || []),
              order: i,
              createdBy: admin.id,
            })),
          },
        },
      });
      console.log(`  + Deck: ${deck.name} (${deck.cards.length} cards)`);
      totalDecks++;
      totalCards += deck.cards.length;
    }
  }

  console.log('\n─────────────────────────────────────────────────');
  console.log('✅ Flashcard seed complete!');
  console.log('─────────────────────────────────────────────────');
  console.log(`  Created decks:    ${totalDecks}`);
  console.log(`  Created cards:    ${totalCards}`);

  const finalDecks = await db.groupFlashcardDeck.count();
  const finalCards = await db.groupFlashcard.count();
  console.log(`  Total decks in DB: ${finalDecks}`);
  console.log(`  Total cards in DB: ${finalCards}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  });
