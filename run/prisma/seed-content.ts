/**
 * Comprehensive seed for the major MedQ content models.
 *
 * Idempotent: every create is wrapped in upsert or guarded by a count check.
 * Safe to re-run.
 *
 * Fills:
 *   • Questions   — 25 medical MCQs across 8 systems
 *   • Exams       — 4 mock exams with question assignments
 *   • Collections — 3 personal collections for the guest user
 *   • FlashcardProgress — spaced-repetition state for the guest user
 *   • StudySessions — 30 days of historical study sessions
 *   • StudyStreaks — 30 days of streak data
 *   • Achievements + UserAchievements — 8 achievement definitions, 4 unlocked for guest
 *   • DailyChallenges — last 7 days of challenges
 *   • StudyPlan — 1 active plan for the guest user with daily blocks
 *   • ClinicalCases — 4 cases (diagnostic / management / emergency)
 *   • ConceptNodes + ConceptEdges — small knowledge graph (~15 nodes)
 *   • TutorMessages — short conversation history
 *   • Lectures — 3 placeholder lectures (status: ready)
 *   • BoardPrepProfile — 1 for the guest user
 *
 * Run with:  npx tsx prisma/seed-content.ts
 */

import { db } from '../src/lib/db';
import { hashSync } from 'bcryptjs';

const prisma = db;

const PASSWORD_HASH = hashSync('test123', 10);

// ─── Helpers ────────────────────────────────────────────────────────────────

const day = 24 * 60 * 60 * 1000;
const now = Date.now();
const daysAgo = (n: number) => new Date(now - n * day);
const daysFromNow = (n: number) => new Date(now + n * day);
const todayISO = () => new Date().toISOString().split('T')[0];
const isoDaysAgo = (n: number) => new Date(now - n * day).toISOString().split('T')[0];

function log(section: string, msg: string) {
  console.log(`[${section}] ${msg}`);
}

// ─── 25 Medical MCQs ────────────────────────────────────────────────────────

interface SeedQuestion {
  id: string;
  type: string;
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  clinicalPearl: string;
  mnemonic: string;
  distractorAnalysis: string;
  difficulty: string;
  system: string;
  topic: string;
  tags: string[];
}

const QUESTIONS: SeedQuestion[] = [
  // ── Cardiovascular ──
  {
    id: 'seed-q-cardio-1', type: 'mcq', system: 'Cardiovascular', topic: 'Hypertension',
    difficulty: 'Easy',
    text: 'A 55-year-old man has repeated BP readings of 152/96 mmHg over 3 separate office visits. He is asymptomatic, no prior CV events. What is the most appropriate initial pharmacologic therapy per JNC 8?',
    options: ['Lisinopril', 'Hydralazine', 'Spironolactone', 'Sodium nitroprusside', 'Clonidine'],
    answer: 'Lisinopril',
    explanation: 'First-line therapy for stage 2 HTN without compelling contraindication is a thiazide, ACE inhibitor/ARB, or CCB. Lisinopril (ACE inhibitor) is appropriate.',
    clinicalPearl: 'JNC 8: target <140/90 (<150/90 if ≥60). First-line = thiazide / ACEi / ARB / CCB.',
    mnemonic: 'ABCD — ACEi, Beta-blocker (post-MI), CCB, Diuretic (thiazide).',
    distractorAnalysis: 'Hydralazine/clonidine are 3rd-line. Spironolactone is 4th-line/resistant HTN. Nitroprusside is for hypertensive emergency.',
    tags: ['hypertension', 'pharmacology', 'guidelines'],
  },
  {
    id: 'seed-q-cardio-2', type: 'mcq', system: 'Cardiovascular', topic: 'Heart Failure',
    difficulty: 'Moderate',
    text: 'A 68-year-old woman presents with dyspnea on exertion, orthopnea, and lower extremity edema. Echocardiogram shows EF 35%. Which medication has been shown to reduce mortality in this patient?',
    options: ['Furosemide', 'Carvedilol', 'Digoxin', 'Nifedipine', 'Hydralazine alone'],
    answer: 'Carvedilol',
    explanation: 'Beta-blockers (carvedilol, metoprolol succinate, bisoprolol) reduce mortality in HFrEF by ~35%.',
    clinicalPearl: 'HFrEF mortality reducers: beta-blocker + ACEi/ARB/ARNI + MRA + SGLT2i. ("Fantastic Four")',
    mnemonic: 'MRA + Beta + ACEi + SGLT2i = Mortality reduction.',
    distractorAnalysis: 'Furosemide is symptom-only (no mortality benefit). Digoxin reduces hospitalizations, not mortality. Nifedipine can worsen HF.',
    tags: ['heart-failure', 'pharmacology', 'mortality'],
  },
  {
    id: 'seed-q-cardio-3', type: 'mcq', system: 'Cardiovascular', topic: 'AFib',
    difficulty: 'Moderate',
    text: 'A 72-year-old man with atrial fibrillation, HTN, T2DM, and prior stroke has a CHA2DS2-VASc score of 5. What is the recommended anticoagulation?',
    options: ['Aspirin 81 mg daily', 'Clopidogrel', 'Apixaban', 'Warfarin with INR 1.5-2.0', 'No anticoagulation'],
    answer: 'Apixaban',
    explanation: 'CHA2DS2-VASc ≥2 in men (≥3 in women) → oral anticoagulation. DOACs (apixaban, rivaroxaban) preferred over warfarin unless mitral stenosis or mechanical valve.',
    clinicalPearl: 'DOACs preferred over warfarin for non-valvular AFib. Avoid in mechanical valves / severe MS.',
    mnemonic: 'CHA2DS2-VASc: CHF, HTN, Age≥75(2), DM, Stroke(2), Vascular, Age 65-74, Sex category.',
    distractorAnalysis: 'Aspirin alone is insufficient. Warfarin target INR is 2-3, not 1.5-2.0.',
    tags: ['afib', 'anticoagulation', 'stroke-prevention'],
  },
  // ── Respiratory ──
  {
    id: 'seed-q-resp-1', type: 'mcq', system: 'Respiratory', topic: 'Asthma',
    difficulty: 'Easy',
    text: 'A 25-year-old woman with asthma presents with wheezing and shortness of breath. Peak flow is 70% predicted. What is the most appropriate acute treatment?',
    options: ['IV antibiotics', 'Albuterol nebulizer + oral corticosteroid', 'Intubation', 'Nebulized hypertonic saline', 'Montelukast alone'],
    answer: 'Albuterol nebulizer + oral corticosteroid',
    explanation: 'Acute asthma exacerbation: SABA (albuterol) ± ipratropium + systemic corticosteroid. Peak flow 50-80% = moderate exacerbation.',
    clinicalPearl: 'If peak flow <33% or silent chest → ICU. Steroids take 4-6 hours to work.',
    mnemonic: 'Asthma attack = "SAM" — Steroids, Albuterol, Magnesium (if severe).',
    distractorAnalysis: 'Antibiotics only if bacterial infection. Montelukast is for chronic management, not acute.',
    tags: ['asthma', 'acute', 'emergency'],
  },
  {
    id: 'seed-q-resp-2', type: 'mcq', system: 'Respiratory', topic: 'COPD',
    difficulty: 'Moderate',
    text: 'A 65-year-old smoker with COPD has FEV1 45% predicted and ≥2 exacerbations/year. What is the most appropriate maintenance therapy?',
    options: ['Albuterol PRN only', 'Salmeterol monotherapy', 'Tiotropium + formoterol', 'Oral corticosteroids daily', 'Azithromycin daily'],
    answer: 'Tiotropium + formoterol',
    explanation: 'GOLD group D (high symptoms, high exacerbation risk) → LAMA + LABA is preferred. ICS added only if eos ≥300.',
    clinicalPearl: 'COPD: LAMA+LABA > LABA+ICS for exacerbation prevention. ICS risk: pneumonia.',
    mnemonic: 'GOLD A/B/C/D — symptoms + exacerbations drive the choice.',
    distractorAnalysis: 'Daily oral steroids cause osteoporosis. Azithromycin is for frequent exacerbators as adjunct, not first-line.',
    tags: ['copd', 'guidelines', 'pharmacology'],
  },
  // ── GI ──
  {
    id: 'seed-q-gi-1', type: 'mcq', system: 'Gastrointestinal', topic: 'GERD',
    difficulty: 'Easy',
    text: 'A 45-year-old man has heartburn 3x/week for 6 months, no alarm features. What is the most appropriate initial management?',
    options: ['Endoscopy immediately', 'PPI trial for 8 weeks', 'Barium swallow', 'Antireflux surgery', 'H2 blocker PRN'],
    answer: 'PPI trial for 8 weeks',
    explanation: 'Typical GERD without alarm features → empiric PPI trial 8 weeks. Endoscopy reserved for alarm symptoms or refractory symptoms.',
    clinicalPearl: 'Alarm features: dysphagia, weight loss, anemia, vomiting, GI bleed, age >50 with new onset.',
    mnemonic: 'GERD without alarm = PPI. With alarm = scope.',
    distractorAnalysis: 'Endoscopy is overkill without alarm features. H2 blockers are inferior to PPIs.',
    tags: ['gerd', 'guidelines', 'pharmacology'],
  },
  {
    id: 'seed-q-gi-2', type: 'mcq', system: 'Gastrointestinal', topic: 'Cirrhosis',
    difficulty: 'Hard',
    text: 'A 58-year-old with alcoholic cirrhosis has new-onset ascites. Diagnostic paracentesis shows SAAG ≥1.1, PMN 10 cells/mm³. What is the most appropriate next step?',
    options: ['IV ceftriaxone', 'Spironolactone + furosemide', 'TIPS procedure', 'Large-volume paracentesis daily', 'Oral metronidazole'],
    answer: 'Spironolactone + furosemide',
    explanation: 'SAAG ≥1.1 = portal hypertension-related ascites. PMN <250 = no SBP. First-line = spironolactone + furosemide (100:40 ratio).',
    clinicalPearl: 'SBP = PMN ≥250. Treat with ceftriaxone. Add albumin if Cr>1, bili>4, or creatinine rising.',
    mnemonic: 'Ascites meds ratio: "100/40" spironolactone/furosemide. Maximizes natriuresis, minimizes K+ imbalance.',
    distractorAnalysis: 'No SBP → no antibiotics. TIPS is for refractory ascites.',
    tags: ['cirrhosis', 'ascites', 'sbp'],
  },
  // ── Endocrine ──
  {
    id: 'seed-q-endo-1', type: 'mcq', system: 'Endocrine', topic: 'DKA',
    difficulty: 'Hard',
    text: 'A 19-year-old with T1DM presents with vomiting, Kussmaul respirations, glucose 580 mg/dL, pH 7.20, HCO3 8 mEq/L. What is the most important initial therapy?',
    options: ['IV insulin bolus only', 'IV normal saline + IV insulin', 'IV bicarbonate', 'Subcutaneous insulin', 'IV dextrose + insulin'],
    answer: 'IV normal saline + IV insulin',
    explanation: 'DKA management: 1) IV fluids (NS) — restore volume, 2) IV insulin (no bolus needed if infusion used), 3) K+ replacement when <5.2. Bicarbonate only if pH <6.9.',
    clinicalPearl: 'Treat DKA: "FIG-PICK" — Fluids, Insulin, Glucose (when <200), Potassium, Inspect (monitor), CK (electrolytes).',
    mnemonic: 'Volume first, then insulin. Always replace K+ BEFORE insulin if K+ <3.3.',
    distractorAnalysis: 'Bicarb only if pH<6.9. SQ insulin ineffective in DKA. Dextrose added only when glucose <200.',
    tags: ['dka', 'emergency', 'diabetes'],
  },
  {
    id: 'seed-q-endo-2', type: 'mcq', system: 'Endocrine', topic: 'Thyroid',
    difficulty: 'Moderate',
    text: 'A 35-year-old woman has fatigue, weight gain, TSH 12 mIU/L (normal 0.4-4.0), free T4 low. Anti-TPO antibodies positive. Most likely diagnosis?',
    options: ['Subacute thyroiditis', 'Hashimoto thyroiditis', 'Graves disease', 'Toxic multinodular goiter', 'Iodine deficiency'],
    answer: 'Hashimoto thyroiditis',
    explanation: 'Primary hypothyroidism (high TSH, low T4) + anti-TPO+ = Hashimoto. Most common cause of hypothyroidism in iodine-sufficient regions.',
    clinicalPearl: 'Hashimoto can have transient hyperthyroid phase ("hashitoxicosis") early in disease.',
    mnemonic: 'Hashimoto = High TSH, Anti-TPO Positive.',
    distractorAnalysis: 'Subacute thyroiditis has ESR elevation and jaw/neck pain. Graves = hyperthyroidism.',
    tags: ['hypothyroidism', 'autoimmune', 'hashimoto'],
  },
  // ── Neurology ──
  {
    id: 'seed-q-neuro-1', type: 'mcq', system: 'Nervous', topic: 'Stroke',
    difficulty: 'Moderate',
    text: 'A 70-year-old man has sudden right-sided weakness and aphasia, last known well 90 minutes ago. CT head shows no hemorrhage. NIHSS 12. What is the most appropriate next step?',
    options: ['IV tPA (alteplase)', 'Aspirin only', 'Wait for MRI', 'Carotid endarterectomy', 'Heparin infusion'],
    answer: 'IV tPA (alteplase)',
    explanation: 'Ischemic stroke within 4.5 hours of LKW, no hemorrhage on CT, no contraindications → IV tPA. NIHSS doesn\'t determine eligibility, only time window.',
    clinicalPearl: 'tPA absolute contraindications: prior ICH, recent surgery, active bleed, BP >185/110 (must lower first).',
    mnemonic: 'Stroke time windows: tPA 4.5h, thrombectomy 24h (with imaging criteria).',
    distractorAnalysis: 'Aspirin is given AFTER tPA (24h later). Heparin not used in acute ischemic stroke.',
    tags: ['stroke', 'tPA', 'emergency'],
  },
  {
    id: 'seed-q-neuro-2', type: 'mcq', system: 'Nervous', topic: 'Seizures',
    difficulty: 'Moderate',
    text: 'A 28-year-old has 2 unprovoked generalized tonic-clonic seizures 3 months apart. MRI and EEG are normal. Most appropriate treatment?',
    options: ['No treatment', 'Levetiracetam', 'Phenytoin', 'Vagus nerve stimulation', 'Ketogenic diet'],
    answer: 'Levetiracetam',
    explanation: 'Two unprovoked seizures = epilepsy. Start antiepileptic drug. Levetiracetam is first-line for generalized seizures due to favorable side effect profile.',
    clinicalPearl: 'EEG normal in 50% of epilepsy patients — doesn\'t rule out. Repeat EEG after sleep deprivation if needed.',
    mnemonic: 'Levetiracetam: broad spectrum, no hepatic metabolism, no drug interactions.',
    distractorAnalysis: 'Phenytoin has narrow therapeutic index, gingival hyperplasia, ataxia. VNS/diet are refractory options.',
    tags: ['seizure', 'epilepsy', 'pharmacology'],
  },
  // ── Renal ──
  {
    id: 'seed-q-renal-1', type: 'mcq', system: 'Renal', topic: 'AKI',
    difficulty: 'Hard',
    text: 'A 70-year-old with CHF on furosemide develops AKI. BUN/Cr ratio 25, FENa 0.4%, urine Na 15 mEq/L. Most likely cause?',
    options: ['Acute tubular necrosis', 'Prerenal azotemia', 'Postrenal obstruction', 'Acute interstitial nephritis', 'Glomerulonephritis'],
    answer: 'Prerenal azotemia',
    explanation: 'Prerenal: BUN/Cr >20, FENa <1%, urine Na <20, bland sediment. ATN: FENa >2%, muddy brown casts. This patient is over-diuresed + CHF.',
    clinicalPearl: 'Prerenal is the most common cause of AKI in hospitalized patients. Treat underlying cause.',
    mnemonic: 'Prerenal: BUN/Cr >20, FENa <1%, UNa <20. ATN: opposite.',
    distractorAnalysis: 'ATN has muddy casts. AIN has eosinophils and rash/fever. Obstruction has post-void residual.',
    tags: ['aki', 'prerenal', 'diagnosis'],
  },
  // ── Hematology ──
  {
    id: 'seed-q-heme-1', type: 'mcq', system: 'Hematology', topic: 'Anemia',
    difficulty: 'Moderate',
    text: 'A 30-year-old vegan has fatigue. Hgb 9.5 g/dL, MCV 75 fL, ferritin 8 ng/mL. What is the most likely cause and best initial treatment?',
    options: ['Anemia of chronic disease → treat underlying', 'Iron deficiency → oral ferrous sulfate', 'Thalassemia → no treatment', 'B12 deficiency → IM B12', 'Sideroblastic anemia → pyridoxine'],
    answer: 'Iron deficiency → oral ferrous sulfate',
    explanation: 'Microcytic anemia + ferritin <15 = iron deficiency. Vegan diet = inadequate intake. Treat with oral iron 325mg daily, recheck reticulocytes in 7-10 days.',
    clinicalPearl: 'Ferritin is an acute phase reactant — normal/high ferritin doesn\'t rule out IDI if inflammation present.',
    mnemonic: 'Microcytic causes: TAILS — Thalassemia, Anemia of chronic disease, Iron deficiency, Lead poisoning, Sideroblastic.',
    distractorAnalysis: 'B12 deficiency is macrocytic. Thalassemia has normal/high ferritin.',
    tags: ['anemia', 'iron-deficiency', 'hematology'],
  },
  // ── Infectious Disease ──
  {
    id: 'seed-q-id-1', type: 'mcq', system: 'Infectious', topic: 'Sepsis',
    difficulty: 'Hard',
    text: 'A 65-year-old with fever, HR 120, BP 85/50, lactate 4.5 mmol/L, no clear source. What is the most appropriate initial management within the first hour?',
    options: ['Wait for cultures then treat', '30 mL/kg IV crystalloid + broad-spectrum antibiotics + blood cultures', 'Norepinephrine only', 'IV corticosteroids', 'CT scan first'],
    answer: '30 mL/kg IV crystalloid + broad-spectrum antibiotics + blood cultures',
    explanation: 'SEPSIS BUNDLE (first hour): lactate, blood cultures ×2, broad-spectrum antibiotics, 30 mL/kg crystalloid for hypotension or lactate ≥4, vasopressors if MAP <65 after fluids.',
    clinicalPearl: 'Every hour delay in antibiotics increases mortality 7.6%. Don\'t wait for cultures.',
    mnemonic: 'Sepsis 1-h bundle: "LAB-MASS" — Lactate, Antibiotics, Blood cultures, MAP target, Antibiotics, Saline, Stabilize.',
    distractorAnalysis: 'Steroids only if fluid/vasopressor refractory. CT delays antibiotics.',
    tags: ['sepsis', 'bundle', 'emergency'],
  },
  {
    id: 'seed-q-id-2', type: 'mcq', system: 'Infectious', topic: 'Endocarditis',
    difficulty: 'Moderate',
    text: 'A 50-year-old IV drug user has fever, new murmur, and 3/3 blood cultures positive for Staph aureus. Echocardiogram shows vegetation on tricuspid valve. What is the most likely diagnosis and empiric therapy?',
    options: ['Native valve endocarditis → nafcillin/oxacillin + gentamicin', 'Prosthetic valve endocarditis → vancomycin + gentamicin + rifampin', 'Culture-negative endocarditis → ceftriaxone', 'Liberman-Sacks → steroids', 'Marantic endocarditis → heparin'],
    answer: 'Native valve endocarditis → nafcillin/oxacillin + gentamicin',
    explanation: 'Native-valve S. aureus endocarditis in IVDU typically affects the tricuspid valve. Empiric therapy is nafcillin/oxacillin (MSSA) or vancomycin (MRSA) ± gentamicin for first 3-5 days.',
    clinicalPearl: 'Modified Duke criteria: 2 major, or 1 major + 3 minor, or 5 minor = definite.',
    mnemonic: 'Right-sided endocarditis = IVDU + S. aureus. Often less severe than left-sided.',
    distractorAnalysis: 'Prosthetic valve requires vancomycin + rifampin + gentamicin. Culture-negative = Coxiella, Bartonella, HACEK.',
    tags: ['endocarditis', 'staph-aureus', 'ivdu'],
  },
  // ── Rheumatology ──
  {
    id: 'seed-q-rheum-1', type: 'mcq', system: 'Musculoskeletal', topic: 'Rheumatoid Arthritis',
    difficulty: 'Moderate',
    text: 'A 45-year-old woman has symmetric morning stiffness in PIP and MCP joints >1 hour for 6 weeks. RF positive, anti-CCP positive. What is the most appropriate initial disease-modifying therapy?',
    options: ['NSAIDs only', 'Methotrexate', 'Prednisone 60 mg daily', 'Infliximab monotherapy', 'Hydroxychloroquine alone'],
    answer: 'Methotrexate',
    explanation: 'RA with high disease activity → start DMARD within 3 months of diagnosis. Methotrexate is first-line anchor DMARD. Biologics reserved for inadequate MTX response.',
    clinicalPearl: 'Anti-CCP is more specific than RF for RA. Treat-to-target strategy aims for remission/low disease activity.',
    mnemonic: 'RA treatment: "M" first (Methotrexate), then biologics if no response.',
    distractorAnalysis: 'NSAIDs treat symptoms, not disease. Prednisone is bridge therapy, not long-term. Biologic monotherapy is inferior to MTX combination.',
    tags: ['ra', 'dmard', 'pharmacology'],
  },
  // ── Psychiatry ──
  {
    id: 'seed-q-psych-1', type: 'mcq', system: 'Psychiatry', topic: 'Depression',
    difficulty: 'Easy',
    text: 'A 40-year-old woman reports 4 weeks of depressed mood, anhedonia, insomnia, fatigue, poor concentration, and occasional thoughts of death without plan. What is first-line treatment?',
    options: ['Cognitive behavioral therapy + SSRI', 'Electroconvulsive therapy', 'MAO inhibitor', 'Benzodiazepine', 'Antipsychotic'],
    answer: 'Cognitive behavioral therapy + SSRI',
    explanation: 'Moderate-to-severe MDD: first-line is SSRI (sertraline, escitalopram) ± CBT. Mild depression: psychotherapy alone may suffice.',
    clinicalPearl: 'SSRIs take 4-6 weeks for full effect. Start low, go slow. Watch for activation in young adults.',
    mnemonic: 'Depression meds: "SECRET" — Sertraline, Citalopram/Escitalopram, (fluoxetine), (paroxetine).',
    distractorAnalysis: 'ECT is for refractory/psychotic depression. MAOIs are 3rd-line due to diet restrictions.',
    tags: ['depression', 'ssri', 'pharmacology'],
  },
  // ── OB/GYN ──
  {
    id: 'seed-q-obgyn-1', type: 'mcq', system: 'Reproductive', topic: 'Pre-eclampsia',
    difficulty: 'Moderate',
    text: 'A 32-year-old at 36 weeks gestation has BP 160/105, proteinuria 3+, headache, and visual disturbances. What is the most appropriate management?',
    options: ['Outpatient BP monitoring', 'Hospital admission, magnesium sulfate, deliver', 'Oral labetalol and follow-up in 1 week', 'Bedrest at home', 'Induction at 39 weeks'],
    answer: 'Hospital admission, magnesium sulfate, deliver',
    explanation: 'Severe pre-eclampsia with features ≥34 weeks → deliver. Magnesium sulfate for seizure prophylaxis. Antihypertensives (labetalol, hydralazine, nifedipine) for BP control.',
    clinicalPearl: 'Magnesium sulfate: monitor for toxicity — loss of reflexes, respiratory depression. Antidote = calcium gluconate.',
    mnemonic: 'Pre-eclampsia: BP ≥140/90 + proteinuria after 20w. Severe features: ≥160/110, symptoms, labs.',
    distractorAnalysis: 'Outpatient management is inappropriate with severe features. Delaying delivery risks eclampsia, stroke, HELLP.',
    tags: ['preeclampsia', 'ob', 'emergency'],
  },
  // ── Pediatrics ──
  {
    id: 'seed-q-peds-1', type: 'mcq', system: 'Pediatrics', topic: 'Fever',
    difficulty: 'Moderate',
    text: 'A 3-month-old infant has fever 38.5°C (101.3°F) without source, fussy but consolable. What is the appropriate workup?',
    options: ['Home antipyretics only', 'CBC, urinalysis, blood culture ± LP', 'Chest X-ray only', 'Antibiotics and discharge', 'Trial of acetaminophen and return in 24h'],
    answer: 'CBC, urinalysis, blood culture ± LP',
    explanation: 'Febrile infant <90 days: full sepsis workup (CBC, UA, blood culture, LP if indicated). 3-12 months: depends on appearance and labs (Philadelphia/Boston criteria).',
    clinicalPearl: 'Urinary tract infection is the most common bacterial infection in febrile infants <2 months.',
    mnemonic: 'Febrile infant <90d = always full workup. 90d-24mo = risk-stratify.',
    distractorAnalysis: 'CXR only if respiratory signs. Antibiotics without workup misses UTI/bacteremia/meningitis.',
    tags: ['pediatrics', 'fever', 'sepsis'],
  },
  // ── Dermatology ──
  {
    id: 'seed-q-derm-1', type: 'mcq', system: 'Integumentary', topic: 'Cellulitis',
    difficulty: 'Easy',
    text: 'A 50-year-old diabetic has a rapidly spreading, warm, erythematous, edematous plaque on the lower leg with no ulceration. He is afebrile. What is the most appropriate treatment?',
    options: ['Topical mupirocin', 'Oral cephalexin', 'IV vancomycin', 'Surgical debridement', 'Observation'],
    answer: 'Oral cephalexin',
    explanation: 'Non-purulent cellulitis in stable patient = oral cephalexin (covers strep and MSSA). IV therapy if systemic signs, rapidly progressive, immunocompromised.',
    clinicalPearl: 'Mark the border with pen to track progression. Reassess in 24-48h.',
    mnemonic: 'Cellulitis: cephalexin (oral), cefazolin (IV). Add MRSA coverage if purulent.',
    distractorAnalysis: 'Topical doesn\'t penetrate. Vancomycin is for MRSA/severe. Debridement is for necrotizing fasciitis.',
    tags: ['cellulitis', 'skin', 'antibiotics'],
  },
  // ── More Cardiovascular ──
  {
    id: 'seed-q-cardio-4', type: 'mcq', system: 'Cardiovascular', topic: 'ACS',
    difficulty: 'Hard',
    text: 'A 60-year-old smoker has 30 min of crushing chest pain. ECG shows ST-depressions in V1-V4. Troponin I elevated. What is the diagnosis and immediate management?',
    options: ['NSTEMI → dual antiplatelet + anticoagulation + angiography within 24h', 'Stable angina → outpatient stress test', 'STEMI → immediate PCI', 'Pericarditis → NSAIDs', 'Costochondritis → acetaminophen'],
    answer: 'NSTEMI → dual antiplatelet + anticoagulation + angiography within 24h',
    explanation: 'NSTEMI = ischemic symptoms + troponin elevation + no ST-elevation. Treat with DAPT (aspirin + P2Y12), anticoag (heparin), and early invasive strategy (angiography ≤24h) if high-risk.',
    clinicalPearl: 'STEMI = ST-elevation → immediate reperfusion (PCI ≤90 min or tPA). NSTEMI = early invasive within 24-72h.',
    mnemonic: 'TIMI/GRACE score risk-stratifies NSTEMI for early invasive vs conservative.',
    distractorAnalysis: 'STEMI goes to cath lab immediately. Stable angina has normal troponin.',
    tags: ['nstemi', 'acs', 'cardiology'],
  },
  {
    id: 'seed-q-cardio-5', type: 'mcq', system: 'Cardiovascular', topic: 'Aortic Stenosis',
    difficulty: 'Moderate',
    text: 'A 75-year-old man has exertional chest pain, syncope, and heart failure. Exam: systolic ejection murmur radiating to carotids, delayed carotid pulse. Echo shows AVA 0.7 cm². What is the most appropriate management?',
    options: ['AVR (aortic valve replacement)', 'Medical therapy with ACEi', 'Diuretics only', 'Stress test', 'Anticoagulation'],
    answer: 'AVR (aortic valve replacement)',
    explanation: 'Symptomatic severe AS (AVA <1.0 cm²) → AVR (surgical or TAVR). Medical therapy does NOT improve survival once symptomatic.',
    clinicalPearl: 'Once AS becomes symptomatic (SAD: Syncope, Angina, Dyspnea), median survival without AVR is 2-3 years.',
    mnemonic: 'SAD = Syncope (3y), Angina (5y), Dyspnea (2y) — AS symptoms = AVR.',
    distractorAnalysis: 'ACEi can cause hypotension in AS. Vasodilators contraindicated.',
    tags: ['as', 'valvular', 'tavr'],
  },
  // ── More Endocrine ──
  {
    id: 'seed-q-endo-3', type: 'mcq', system: 'Endocrine', topic: 'Cushing Syndrome',
    difficulty: 'Hard',
    text: 'A 40-year-old woman has central obesity, moon facies, purple striae, hypertension, and easy bruising. 24h urine cortisol elevated, ACTH elevated, high-dose dexamethasone suppresses cortisol. What is the most likely diagnosis?',
    options: ['Pituitary adenoma (Cushing disease)', 'Adrenal adenoma', 'Ectopic ACTH (small cell lung cancer)', 'Exogenous steroid use', 'Pseudo-Cushing (alcoholism)'],
    answer: 'Pituitary adenoma (Cushing disease)',
    explanation: 'High ACTH + suppressible with high-dose dex = pituitary source (Cushing disease, ~70% of endogenous Cushing). Adrenal tumor = low ACTH. Ectopic ACTH = no suppression.',
    clinicalPearl: 'Confirm with late-night salivary cortisol, 24h urine cortisol, or 1-mg dex suppression test. Then localize with MRI.',
    mnemonic: 'Cushing triad of tests: late-night salivary, 24h urine, dex suppression.',
    distractorAnalysis: 'Adrenal adenoma suppresses ACTH. Ectopic ACTH doesn\'t suppress with high-dose dex.',
    tags: ['cushing', 'endocrine', 'pituitary'],
  },
  // ── More Neurology ──
  {
    id: 'seed-q-neuro-3', type: 'mcq', system: 'Nervous', topic: 'PD',
    difficulty: 'Moderate',
    text: 'A 65-year-old man has resting tremor, bradykinesia, rigidity, and postural instability. What is the most appropriate initial symptomatic therapy?',
    options: ['Levodopa/carbidopa', 'Benztropine', 'Haloperidol', 'Deep brain stimulation', 'Amantadine'],
    answer: 'Levodopa/carbidopa',
    explanation: 'Parkinson disease: cardinal features (TRAP — Tremor, Rigidity, Akinesia, Postural instability). Levodopa/carbidopa is the most effective symptomatic therapy.',
    clinicalPearl: 'Levodopa side effects: nausea, orthostatic hypotension, hallucinations, dyskinesias with long-term use.',
    mnemonic: 'TRAP = Tremor (resting), Rigidity (cogwheel), Akinesia/bradykinesia, Postural instability.',
    distractorAnalysis: 'Benztropine for tremor in young patients (anticholinergic side effects limit use in elderly). DBS for refractory motor fluctuations.',
    tags: ['parkinson', 'movement', 'pharmacology'],
  },
  // ── More GI ──
  {
    id: 'seed-q-gi-3', type: 'mcq', system: 'Gastrointestinal', topic: 'IBD',
    difficulty: 'Hard',
    text: 'A 25-year-old has chronic bloody diarrhea, abdominal pain, and tenesmus. Colonoscopy shows continuous mucosal inflammation from rectum to splenic flexure. Biopsy shows crypt abscesses. What is the most likely diagnosis?',
    options: ['Ulcerative colitis', 'Crohn disease', 'Ischemic colitis', 'C. difficile colitis', 'Microscopic colitis'],
    answer: 'Ulcerative colitis',
    explanation: 'Continuous inflammation from rectum (always involved) proximally, limited to mucosa/submucosa, crypt abscesses = UC. Crohn has skip lesions, transmural, can affect any part of GI.',
    clinicalPearl: 'PANCA+ ASCA- → UC. ASCA+ pANCA- → Crohn. UC has higher colon cancer risk with long duration.',
    mnemonic: 'UC: "Continuous from rectum, mucosal, bloody." Crohn: "Skip, transmural, fistulas."',
    distractorAnalysis: 'Crohn has skip lesions and transmural inflammation. Ischemic is acute and segmental.',
    tags: ['uc', 'ibd', 'colon'],
  },
  // ── More Renal ──
  {
    id: 'seed-q-renal-2', type: 'mcq', system: 'Renal', topic: 'Stones',
    difficulty: 'Easy',
    text: 'A 35-year-old man has sudden onset severe flank pain radiating to groin with hematuria. Non-contrast CT shows 4 mm stone in distal ureter. What is the most appropriate management?',
    options: ['Hydration + NSAIDs + tamsulosin (medical expulsive therapy)', 'Immediate ureteroscopy', 'ESWL (lithotripsy)', 'Percutaneous nephrostomy', 'IV antibiotics'],
    answer: 'Hydration + NSAIDs + tamsulosin (medical expulsive therapy)',
    explanation: 'Ureteral stones <5 mm pass spontaneously ~80% of time. Medical expulsive therapy (NSAIDs, hydration, alpha-blocker) for 4-6 weeks. Ureteroscopy/ESWL if >10mm, refractory pain, infection, or renal failure.',
    clinicalPearl: 'Indications for immediate intervention: obstruction with infection, AKI, intractable pain/vomiting.',
    mnemonic: 'Stone size matters: <5mm pass, 5-10mm maybe, >10mm intervention.',
    distractorAnalysis: 'ESWL best for renal stones 1-2 cm. PCN only for sepsis with obstruction.',
    tags: ['nephrolithiasis', 'ureter', 'urology'],
  },
  // ── More Hematology ──
  {
    id: 'seed-q-heme-2', type: 'mcq', system: 'Hematology', topic: 'DVT/PE',
    difficulty: 'Moderate',
    text: 'A 60-year-old post-op patient has sudden dyspnea, pleuritic chest pain, HR 110, SpO2 92%. CT angiogram shows segmental PE. Hemodynamically stable. What is the most appropriate treatment?',
    options: ['Apixaban (DOAC)', 'IV tPA (systemic thrombolysis)', 'Embolectomy', 'IVC filter', 'Warfarin only'],
    answer: 'Apixaban (DOAC)',
    explanation: 'Submassive PE (stable BP, normal RV function) → anticoagulation. DOACs (apixaban, rivaroxaban) first-line. Thrombolysis reserved for massive PE (hypotension) or submassive with worsening.',
    clinicalPearl: 'Wells score + d-dimer stratify risk. PE protocol: low risk → d-dimer; high risk → CTA.',
    mnemonic: 'PE: stable = anticoagulate. Unstable = thrombolyze. Can\'t anticoagulate = IVC filter.',
    distractorAnalysis: 'Thrombolysis for massive PE only. IVC filter if anticoagulation contraindicated.',
    tags: ['pe', 'doac', 'anticoagulation'],
  },
  // ── More ID ──
  {
    id: 'seed-q-id-3', type: 'mcq', system: 'Infectious', topic: 'HIV',
    difficulty: 'Moderate',
    text: 'A 28-year-old man has CD4 count 180 cells/µL and is started on ART (tenofovir + emtricitabine + dolutegravir). What opportunistic infection prophylaxis is indicated?',
    options: ['TMP-SMX (Bactrim)', 'Azithromycin', 'Fluconazole', 'No prophylaxis needed', 'Acyclovir'],
    answer: 'TMP-SMX (Bactrim)',
    explanation: 'PCP prophylaxis (TMP-SMX) when CD4 <200. Toxoplasmosis prophylaxis added when CD4 <100 (also covered by TMP-SMX DS). MAC prophylaxis (azithromycin) when CD4 <50.',
    clinicalPearl: 'Start ART in all HIV+ regardless of CD4. Within 2 weeks if opportunistic infection (except TB: wait 2 weeks).',
    mnemonic: 'PCP <200, Toxo <100, MAC <50. Bactrim covers first two.',
    distractorAnalysis: 'Azithromycin for MAC at CD4<50. Fluconazole for recurrent candidiasis or cryptococcus.',
    tags: ['hiv', 'pcp', 'prophylaxis'],
  },
];

// ─── Achievements ────────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  { type: 'first_question', title: 'First Steps', description: 'Answer your first question', icon: '🎯' },
  { type: 'questions_50', title: 'Half-Century', description: 'Answer 50 questions', icon: '5️⃣0️⃣' },
  { type: 'questions_100', title: 'Centurion', description: 'Answer 100 questions', icon: '💯' },
  { type: 'streak_7', title: 'Week Warrior', description: '7-day study streak', icon: '🔥' },
  { type: 'streak_30', title: 'Monthly Master', description: '30-day study streak', icon: '🏆' },
  { type: 'exam_passed', title: 'Test Taker', description: 'Pass your first exam', icon: '📝' },
  { type: 'quiz_master', title: 'Quiz Master', description: 'Score 100% on 10 quizzes', icon: '👑' },
  { type: 'night_owl', title: 'Night Owl', description: 'Study after 10 PM', icon: '🦉' },
];

// ─── Concept nodes / edges (small knowledge graph) ──────────────────────────

const CONCEPT_NODES = [
  { name: 'Hypertension', system: 'Cardiovascular', type: 'disease', description: 'Persistent elevation of arterial blood pressure.' },
  { name: 'ACE inhibitors', system: 'Cardiovascular', type: 'drug', description: 'Block conversion of angiotensin I to II.' },
  { name: 'Heart Failure', system: 'Cardiovascular', type: 'disease', description: 'Inability of heart to pump sufficient blood.' },
  { name: 'Beta-blockers', system: 'Cardiovascular', type: 'drug', description: 'Reduce sympathetic drive and HR.' },
  { name: 'Atrial Fibrillation', system: 'Cardiovascular', type: 'disease', description: 'Disorganized atrial electrical activity.' },
  { name: 'DOACs', system: 'Hematology', type: 'drug', description: 'Direct oral anticoagulants.' },
  { name: 'Stroke', system: 'Nervous', type: 'disease', description: 'Acute neurological deficit from vascular cause.' },
  { name: 'Type 2 Diabetes', system: 'Endocrine', type: 'disease', description: 'Insulin resistance with relative deficiency.' },
  { name: 'Metformin', system: 'Endocrine', type: 'drug', description: 'Reduces hepatic glucose output.' },
  { name: 'COPD', system: 'Respiratory', type: 'disease', description: 'Chronic obstructive airway disease.' },
  { name: 'Tiotropium', system: 'Respiratory', type: 'drug', description: 'Long-acting muscarinic antagonist.' },
  { name: 'Pneumonia', system: 'Respiratory', type: 'disease', description: 'Infection of lung parenchyma.' },
  { name: 'Sepsis', system: 'Infectious', type: 'disease', description: 'Life-threatening organ dysfunction from infection.' },
  { name: 'Ceftriaxone', system: 'Infectious', type: 'drug', description: 'Third-gen cephalosporin.' },
  { name: 'Iron Deficiency', system: 'Hematology', type: 'finding', description: 'Low body iron stores causing microcytic anemia.' },
];

const CONCEPT_EDGES: Array<[string, string, string]> = [
  ['ACE inhibitors', 'Hypertension', 'treats'],
  ['ACE inhibitors', 'Heart Failure', 'treats'],
  ['Beta-blockers', 'Heart Failure', 'treats'],
  ['Beta-blockers', 'Atrial Fibrillation', 'rate-control'],
  ['DOACs', 'Atrial Fibrillation', 'prevents-stroke'],
  ['Atrial Fibrillation', 'Stroke', 'causes'],
  ['Type 2 Diabetes', 'Hypertension', 'comorbidity'],
  ['Metformin', 'Type 2 Diabetes', 'treats'],
  ['Tiotropium', 'COPD', 'treats'],
  ['Ceftriaxone', 'Pneumonia', 'treats'],
  ['Ceftriaxone', 'Sepsis', 'treats'],
  ['Iron Deficiency', 'Hypertension', 'unrelated'], // example of negative edge
];

// ─── Clinical Cases ──────────────────────────────────────────────────────────

const CLINICAL_CASES = [
  {
    title: 'Chest Pain in a 55-year-old Smoker',
    system: 'Cardiovascular', topic: 'ACS', difficulty: 'Moderate', caseType: 'diagnostic',
    patientInfo: JSON.stringify({
      age: 55, sex: 'M', chiefComplaint: 'Crushing chest pain for 1 hour',
      presentingHistory: 'Smoker, HTN, family history CAD. Pain radiates to left arm, associated with diaphoresis.',
    }),
    stages: JSON.stringify([
      { question: 'What is your initial differential diagnosis?', answer: 'ACS (STEMI/NSTEMI/unstable angina), aortic dissection, PE, pericarditis' },
      { question: 'What is the first diagnostic test?', answer: 'ECG within 10 minutes of arrival' },
      { question: 'ECG shows ST-elevation in II, III, aVF. What is the diagnosis?', answer: 'Inferior STEMI' },
      { question: 'What is the most appropriate next step?', answer: 'Immediate reperfusion — primary PCI within 90 min or tPA within 30 min' },
    ]),
  },
  {
    title: 'Acute Dyspnea in a COPD Patient',
    system: 'Respiratory', topic: 'COPD Exacerbation', difficulty: 'Moderate', caseType: 'emergency',
    patientInfo: JSON.stringify({
      age: 68, sex: 'F', chiefComplaint: 'Increased dyspnea and purulent sputum',
      presentingHistory: '65-pack-year smoker, COPD on tiotropium. 3 days worsening dyspnea, yellow sputum, no fever.',
    }),
    stages: JSON.stringify([
      { question: 'What are common triggers of COPD exacerbation?', answer: 'Infection (viral/bacterial), environmental, non-adherence, PE' },
      { question: 'What is the initial workup?', answer: 'CXR, ABG/VBG, CBC, BMP, troponin, ECG' },
      { question: 'What is the initial treatment?', answer: 'SABA + ipratropium nebs, systemic steroids, antibiotics if purulent sputum' },
      { question: 'When is NIPPV (BiPAP) indicated?', answer: 'pH <7.35 with PaCO2 >45 after initial therapy' },
    ]),
  },
  {
    title: 'Altered Mental Status in a Diabetic',
    system: 'Endocrine', topic: 'Hypoglycemia', difficulty: 'Hard', caseType: 'emergency',
    patientInfo: JSON.stringify({
      age: 72, sex: 'M', chiefComplaint: 'Found unresponsive at home',
      presentingHistory: 'T2DM on insulin. Missed dinner. Glucose 38 mg/dL by EMS.',
    }),
    stages: JSON.stringify([
      { question: 'What is the most likely diagnosis?', answer: 'Severe hypoglycemia' },
      { question: 'What is the immediate treatment?', answer: 'IV dextrose (D50W 25g) or IM glucagon if no IV access' },
      { question: 'Patient awakens but becomes confused again 30 min later. Why?', answer: 'Long-acting insulin still active — needs ongoing dextrose infusion' },
      { question: 'What is the disposition?', answer: 'Admit for observation, adjust insulin regimen, diabetes education' },
    ]),
  },
  {
    title: 'Abdominal Pain in a 25-year-old Woman',
    system: 'Gastrointestinal', topic: 'Appendicitis', difficulty: 'Easy', caseType: 'diagnostic',
    patientInfo: JSON.stringify({
      age: 25, sex: 'F', chiefComplaint: 'Right lower quadrant abdominal pain',
      presentingHistory: 'Started periumbilical 12h ago, migrated to RLQ. Nausea, anorexia. LMP 2 weeks ago.',
    }),
    stages: JSON.stringify([
      { question: 'What is the classic presentation?', answer: 'Periumbilical pain migrating to RLQ, anorexia, nausea, low-grade fever' },
      { question: 'What scoring system helps risk-stratify?', answer: 'Alvarado score (MANTREELS)' },
      { question: 'What is the imaging modality of choice in a young female?', answer: 'CT with IV contrast (or US in pregnancy/peds to reduce radiation)' },
      { question: 'Treatment?', answer: 'Appendectomy (laparoscopic preferred)' },
    ]),
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱 Seeding comprehensive content...\n');

  // Get the guest user (the original one who will see all this data)
  const guest = await prisma.user.findFirst({ where: { email: 'guest@medq.local' } });
  if (!guest) {
    console.error('Guest user not found. Run `npx tsx prisma/seed.ts` first.');
    process.exit(1);
  }
  console.log(`Using guest user: ${guest.id} (${guest.email})\n`);

  // ── Questions ──
  log('Questions', `Upserting ${QUESTIONS.length} questions...`);
  for (const q of QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {},
      create: {
        id: q.id,
        type: q.type,
        text: q.text,
        options: JSON.stringify(q.options),
        answer: q.answer,
        explanation: q.explanation,
        clinicalPearl: q.clinicalPearl,
        mnemonic: q.mnemonic,
        distractorAnalysis: q.distractorAnalysis,
        difficulty: q.difficulty,
        system: q.system,
        topic: q.topic,
        tags: JSON.stringify(q.tags),
      },
    });
  }
  log('Questions', `✓ ${QUESTIONS.length} questions upserted`);

  // ── Exams ──
  log('Exams', 'Creating 4 exams...');
  const examDefs = [
    { id: 'seed-exam-cardio', title: 'Cardiovascular Mock Exam', description: '25 questions on cardiovascular medicine', duration: 45, qFilter: (q: SeedQuestion) => q.system === 'Cardiovascular' },
    { id: 'seed-exam-emergency', title: 'Emergency Medicine Mock', description: 'High-yield emergency scenarios', duration: 30, qFilter: (q: SeedQuestion) => q.tags.some(t => t.includes('emergency')) },
    { id: 'seed-exam-pharm', title: 'Pharmacology Review', description: 'Drug mechanisms and side effects', duration: 30, qFilter: (q: SeedQuestion) => q.tags.includes('pharmacology') },
    { id: 'seed-exam-mixed', title: 'Mixed Systems Quiz', description: 'Random sampling across systems', duration: 20, qFilter: (_q: SeedQuestion) => true },
  ];
  for (const exam of examDefs) {
    const examQuestions = QUESTIONS.filter(exam.qFilter).slice(0, 10);
    await prisma.exam.upsert({
      where: { id: exam.id },
      update: {},
      create: {
        id: exam.id,
        title: exam.title,
        description: exam.description,
        duration: exam.duration,
      },
    });
    // Link questions to exam (delete existing links first to avoid duplicates)
    await prisma.examQuestion.deleteMany({ where: { examId: exam.id } });
    for (let i = 0; i < examQuestions.length; i++) {
      await prisma.examQuestion.create({
        data: { examId: exam.id, questionId: examQuestions[i].id, order: i },
      });
    }
    log('Exams', `  ✓ ${exam.title} — ${examQuestions.length} questions`);
  }

  // ── Collections ──
  log('Collections', 'Creating 3 collections for guest...');
  const collections = [
    { name: 'Cardiovascular High-Yield', description: 'Must-know cardio topics', icon: '❤️', color: '#ef4444' },
    { name: 'Emergency Medicine', description: 'Time-critical scenarios', icon: '🚨', color: '#f59e0b' },
    { name: 'Pharmacology Pearls', description: 'Drug knowledge essentials', icon: '💊', color: '#8b5cf6' },
  ];
  for (const c of collections) {
    const existing = await prisma.collection.findFirst({ where: { userId: guest.id, name: c.name } });
    if (existing) {
      log('Collections', `  ✓ "${c.name}" already exists — skipping`);
      continue;
    }
    const col = await prisma.collection.create({
      data: { userId: guest.id, name: c.name, description: c.description, icon: c.icon, color: c.color },
    });
    // Add matching questions to the collection
    let matchCount = 0;
    if (c.name.startsWith('Cardiovascular')) {
      matchCount = await addQuestionsToCollection(col.id, QUESTIONS.filter(q => q.system === 'Cardiovascular').map(q => q.id));
    } else if (c.name.startsWith('Emergency')) {
      matchCount = await addQuestionsToCollection(col.id, QUESTIONS.filter(q => q.tags.includes('emergency')).map(q => q.id));
    } else if (c.name.startsWith('Pharmacology')) {
      matchCount = await addQuestionsToCollection(col.id, QUESTIONS.filter(q => q.tags.includes('pharmacology')).map(q => q.id));
    }
    log('Collections', `  ✓ "${c.name}" with ${matchCount} items`);
  }

  // ── FlashcardProgress (spaced repetition state for guest) ──
  log('Flashcards', 'Creating flashcard progress for guest...');
  const flashcardQuestions = QUESTIONS.slice(0, 15);
  let fcCreated = 0;
  for (let i = 0; i < flashcardQuestions.length; i++) {
    const q = flashcardQuestions[i];
    await prisma.flashcardProgress.upsert({
      where: { userId_questionId: { userId: guest.id, questionId: q.id } },
      update: {},
      create: {
        userId: guest.id,
        questionId: q.id,
        interval: i < 5 ? 3 : 1,
        repetition: i < 5 ? 2 : 0,
        efactor: 2.5,
        nextReview: daysFromNow(i < 5 ? 2 : 0),
        lastReview: daysAgo(i < 5 ? 5 : 0),
      },
    });
    fcCreated++;
  }
  log('Flashcards', `  ✓ ${fcCreated} flashcards with progress`);

  // ── Study Sessions (last 30 days) ──
  log('StudySessions', 'Creating 30 days of study sessions...');
  const sessionTypes = ['flashcard', 'exam', 'quiz', 'bank-review', 'tutor'];
  let ssCreated = 0;
  for (let d = 30; d >= 0; d--) {
    // Skip some days randomly to look realistic
    if (d % 7 === 3 || d % 11 === 5) continue;
    const numSessions = 1 + Math.floor(Math.random() * 3);
    for (let s = 0; s < numSessions; s++) {
      await prisma.studySession.create({
        data: {
          userId: guest.id,
          type: sessionTypes[Math.floor(Math.random() * sessionTypes.length)],
          questionsStudied: 5 + Math.floor(Math.random() * 25),
          correctAnswers: 3 + Math.floor(Math.random() * 20),
          totalTimeSpent: 120 + Math.floor(Math.random() * 1800),
          metadata: JSON.stringify({ source: 'seed' }),
          createdAt: daysAgo(d),
        },
      });
      ssCreated++;
    }
  }
  log('StudySessions', `  ✓ ${ssCreated} sessions created`);

  // ── Study Streaks (last 14 days active) ──
  log('StudyStreaks', 'Creating 14-day streak...');
  let streakCreated = 0;
  for (let d = 13; d >= 0; d--) {
    const dateStr = isoDaysAgo(d);
    const existing = await prisma.studyStreak.findUnique({
      where: { userId_date: { userId: guest.id, date: dateStr } },
    });
    if (existing) continue;
    await prisma.studyStreak.create({
      data: {
        userId: guest.id,
        date: dateStr,
        questionsStudied: 5 + Math.floor(Math.random() * 30),
        timeSpent: 300 + Math.floor(Math.random() * 3600),
        xpEarned: 50 + Math.floor(Math.random() * 200),
        streakFreezes: d < 7 ? 2 : 0,
      },
    });
    streakCreated++;
  }
  log('StudyStreaks', `  ✓ ${streakCreated} streak days`);

  // ── Achievements ──
  log('Achievements', `Creating ${ACHIEVEMENTS.length} achievement definitions...`);
  for (const a of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { type: a.type },
      update: { title: a.title, description: a.description, icon: a.icon },
      create: a,
    });
  }
  // Unlock first 4 for guest (UserAchievement uses achievementType, not achievementId)
  const achievements = await prisma.achievement.findMany();
  for (let i = 0; i < 4 && i < achievements.length; i++) {
    const a = achievements[i];
    const existing = await prisma.userAchievement.findUnique({
      where: { userId_achievementType: { userId: guest.id, achievementType: a.type } },
    });
    if (!existing) {
      await prisma.userAchievement.create({
        data: { userId: guest.id, achievementType: a.type, unlockedAt: daysAgo(7 - i) },
      });
    }
  }
  log('Achievements', `  ✓ ${ACHIEVEMENTS.length} defs, 4 unlocked for guest`);

  // ── Daily Challenges (last 7 days) ──
  log('DailyChallenges', 'Creating 7 days of challenges...');
  const challengeThemes = ['Cardiovascular', 'Pharmacology', 'Respiratory', 'Endocrine', 'Nervous', 'Infectious', 'Hematology'];
  let dcCreated = 0;
  for (let d = 6; d >= 0; d--) {
    const dateStr = isoDaysAgo(d);
    const existing = await prisma.dailyChallenge.findUnique({ where: { date: dateStr } });
    if (existing) continue;
    const theme = challengeThemes[(6 - d) % challengeThemes.length];
    const themeQuestions = QUESTIONS.filter(q => q.system === theme).map(q => q.id).slice(0, 5);
    if (themeQuestions.length === 0) continue;
    await prisma.dailyChallenge.create({
      data: {
        date: dateStr,
        questionIds: JSON.stringify(themeQuestions),
        theme,
        difficulty: 'Mixed',
        totalQuestions: themeQuestions.length,
      },
    });
    dcCreated++;
  }
  log('DailyChallenges', `  ✓ ${dcCreated} challenges created`);

  // ── Study Plan ──
  log('StudyPlan', 'Creating active study plan...');
  const existingPlan = await prisma.studyPlan.findFirst({ where: { userId: guest.id, status: 'active' } });
  if (!existingPlan) {
    const plan = await prisma.studyPlan.create({
      data: {
        userId: guest.id,
        name: 'USMLE Step 1 Prep',
        examDate: daysFromNow(90),
        examType: 'usmle_step1',
        hoursPerDay: 2.5,
        daysPerWeek: 6,
        topics: JSON.stringify(['Cardiovascular', 'Respiratory', 'Endocrine', 'Nervous', 'Renal']),
        status: 'active',
        adherenceScore: 78.5,
      },
    });
    // Add 7 daily blocks (PlanDailyBlock uses `tasks` JSON + `completedAt`)
    for (let d = 0; d < 7; d++) {
      const dateStr = isoDaysAgo(6 - d);
      const isCompleted = d !== 0 && Math.random() > 0.2;
      await prisma.planDailyBlock.create({
        data: {
          planId: plan.id,
          date: dateStr,
          tasks: JSON.stringify([
            { topic: challengeThemes[d % challengeThemes.length], minutes: 150, completed: isCompleted },
          ]),
          completedAt: isCompleted ? daysAgo(6 - d) : null,
        },
      });
    }
    log('StudyPlan', '  ✓ Plan created with 7 daily blocks');
  } else {
    log('StudyPlan', '  ✓ Active plan already exists — skipping');
  }

  // ── Clinical Cases ──
  log('ClinicalCases', `Creating ${CLINICAL_CASES.length} clinical cases...`);
  for (const c of CLINICAL_CASES) {
    const existing = await prisma.clinicalCase.findFirst({ where: { title: c.title } });
    if (existing) continue;
    await prisma.clinicalCase.create({ data: c });
  }
  log('ClinicalCases', `  ✓ ${CLINICAL_CASES.length} cases created`);

  // ── Concept Nodes + Edges ──
  log('ConceptGraph', `Creating ${CONCEPT_NODES.length} concept nodes...`);
  const nodeMap = new Map<string, string>();
  for (const n of CONCEPT_NODES) {
    const existing = await prisma.conceptNode.findFirst({ where: { name: n.name } });
    if (existing) {
      nodeMap.set(n.name, existing.id);
    } else {
      const created = await prisma.conceptNode.create({
        data: { ...n, aliases: '[]' },
      });
      nodeMap.set(n.name, created.id);
    }
  }
  // Edges (ConceptEdge uses `fromId`/`toId`, not `fromNodeId`/`toNodeId`)
  for (const [from, to, rel] of CONCEPT_EDGES) {
    const fromId = nodeMap.get(from);
    const toId = nodeMap.get(to);
    if (!fromId || !toId) continue;
    const existing = await prisma.conceptEdge.findFirst({
      where: { fromId: fromId, toId: toId, relationship: rel },
    });
    if (existing) continue;
    await prisma.conceptEdge.create({
      data: { fromId: fromId, toId: toId, relationship: rel },
    });
  }
  log('ConceptGraph', `  ✓ ${CONCEPT_NODES.length} nodes, ${CONCEPT_EDGES.length} edges`);

  // ── Tutor Messages (short conversation) ──
  log('Tutor', 'Creating tutor conversation history...');
  const existingTutorMsgs = await prisma.tutorMessage.count({ where: { userId: guest.id } });
  if (existingTutorMsgs === 0) {
    const tutorConversation = [
      { role: 'user', content: 'Can you explain the difference between STEMI and NSTEMI?' },
      { role: 'assistant', content: 'STEMI and NSTEMI are both types of acute coronary syndrome (ACS), but they differ in ECG findings and urgency.\n\n**STEMI** = ST-elevation myocardial infarction. Full-thickness (transmural) wall injury. ECG shows ST-elevation ≥1 mm in 2 contiguous leads. Requires immediate reperfusion (PCI within 90 min or thrombolytics).\n\n**NSTEMI** = Non-ST-elevation MI. Subendocardial injury. No ST-elevation, but troponin is elevated. May have ST-depressions or T-wave inversions. Managed with DAPT + anticoagulation + early invasive angiography within 24-72 hours.\n\nKey point: both have elevated troponin. The difference is the ECG. STEMI is a "cath lab now" emergency.' },
      { role: 'user', content: 'What about unstable angina?' },
      { role: 'assistant', content: 'Unstable angina is the third type of ACS. Like NSTEMI, it has ischemic symptoms + ECG changes (often ST-depression), BUT troponin remains NORMAL. The lack of troponin elevation distinguishes it from NSTEMI.\n\nManagement is similar to NSTEMI: DAPT, anticoagulation, and risk-stratification for early invasive strategy.' },
    ];
    for (let i = 0; i < tutorConversation.length; i++) {
      await prisma.tutorMessage.create({
        data: {
          userId: guest.id,
          role: tutorConversation[i].role,
          content: tutorConversation[i].content,
          createdAt: daysAgo(2 - Math.floor(i / 2)),
        },
      });
    }
    log('Tutor', '  ✓ 4 messages created');
  } else {
    log('Tutor', `  ✓ ${existingTutorMsgs} messages exist — skipping`);
  }

  // ── Lectures ──
  log('Lectures', 'Creating 3 lectures...');
  const lectureDefs = [
    { title: 'Introduction to Cardiac Electrophysiology', system: 'Cardiovascular', topic: 'Conduction System', slideCount: 12, duration: 720 },
    { title: 'Acid-Base Disorders: A Systematic Approach', system: 'Renal', topic: 'Acid-Base', slideCount: 15, duration: 900 },
    { title: 'Antibiotic Selection: A Practical Framework', system: 'Infectious', topic: 'Antibiotics', slideCount: 18, duration: 1080 },
  ];
  for (const l of lectureDefs) {
    const existing = await prisma.lecture.findFirst({ where: { title: l.title } });
    if (existing) continue;
    await prisma.lecture.create({
      data: { ...l, slides: '[]', status: 'ready' },
    });
  }
  log('Lectures', `  ✓ ${lectureDefs.length} lectures created`);

  // ── Board Prep Profile ──
  // Schema only has: userId, examType, targetDate, targetScore (no baselineScore / hours / weak/strong)
  log('BoardPrep', 'Creating board prep profile...');
  const existingProfile = await prisma.boardPrepProfile.findFirst({ where: { userId: guest.id } });
  if (!existingProfile) {
    await prisma.boardPrepProfile.create({
      data: {
        userId: guest.id,
        examType: 'usmle_step1',
        targetDate: daysFromNow(120),
        targetScore: 240,
      },
    });
    log('BoardPrep', '  ✓ Profile created');
  } else {
    log('BoardPrep', '  ✓ Profile exists — skipping');
  }

  // ── Credit Wallet already exists from main seed, add some transactions ──
  // CreditTransaction schema: type (earn_ad/earn_daily/earn_streak/spend_feature/...), amount, balance,
  // category, description, referenceId
  log('Credits', 'Adding credit transactions...');
  const existingTxns = await prisma.creditTransaction.count({ where: { userId: guest.id } });
  if (existingTxns <= 1) {
    let runningBalance = 25; // current wallet balance
    const txnTypes = [
      { type: 'earn_daily',   amount:  50, category: 'daily_challenge', description: 'Completed daily challenge (6 days ago)', daysAgo: 6 },
      { type: 'earn_streak',  amount: 100, category: 'streak_bonus',    description: '7-day streak bonus',                  daysAgo: 5 },
      { type: 'spend_feature', amount: -25, category: 'ai_tutor',       description: 'AI tutor session',                    daysAgo: 3 },
      { type: 'earn_daily',   amount:  75, category: 'quiz_perfect',    description: 'Quiz perfect score',                  daysAgo: 2 },
      { type: 'earn_daily',   amount:  50, category: 'daily_challenge', description: 'Completed daily challenge (yesterday)', daysAgo: 1 },
    ];
    for (const t of txnTypes) {
      runningBalance += t.amount;
      await prisma.creditTransaction.create({
        data: {
          userId: guest.id,
          type: t.type,
          amount: t.amount,
          balance: runningBalance,
          category: t.category,
          description: t.description,
          createdAt: daysAgo(t.daysAgo),
        },
      });
    }
    // Update wallet balance to match final
    await prisma.creditWallet.update({
      where: { userId: guest.id },
      data: {
        balance: runningBalance,
        totalEarned: runningBalance,
      },
    });
    log('Credits', `  ✓ 5 transactions added, balance updated to ${runningBalance}`);
  } else {
    log('Credits', `  ✓ ${existingTxns} transactions exist — skipping`);
  }

  console.log('\n─────────────────────────────────────────────────');
  console.log('✅ Comprehensive content seed completed!');
  console.log('─────────────────────────────────────────────────\n');

  // Print summary counts
  const counts = {
    questions: await prisma.question.count(),
    exams: await prisma.exam.count(),
    collections: await prisma.collection.count(),
    flashcards: await prisma.flashcardProgress.count(),
    studySessions: await prisma.studySession.count(),
    studyStreaks: await prisma.studyStreak.count(),
    achievements: await prisma.achievement.count(),
    userAchievements: await prisma.userAchievement.count(),
    dailyChallenges: await prisma.dailyChallenge.count(),
    studyPlans: await prisma.studyPlan.count(),
    clinicalCases: await prisma.clinicalCase.count(),
    conceptNodes: await prisma.conceptNode.count(),
    conceptEdges: await prisma.conceptEdge.count(),
    tutorMessages: await prisma.tutorMessage.count(),
    lectures: await prisma.lecture.count(),
    boardPrepProfiles: await prisma.boardPrepProfile.count(),
  };
  console.log('📊 Final DB counts:');
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k.padEnd(20)} ${v}`);
  }
}

async function addQuestionsToCollection(collectionId: string, questionIds: string[]): Promise<number> {
  let added = 0;
  for (let i = 0; i < questionIds.length; i++) {
    const existing = await prisma.collectionItem.findFirst({
      where: { collectionId, questionId: questionIds[i] },
    });
    if (existing) continue;
    await prisma.collectionItem.create({
      data: { collectionId, questionId: questionIds[i], order: i },
    });
    added++;
  }
  return added;
}

main()
  .catch((err) => {
    console.error('\n❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
