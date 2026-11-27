/**
 * MedQ Offline AI Question Engine
 *
 * Generates medical questions entirely client-side using:
 * 1. A built-in knowledge base of medical templates per system/topic
 * 2. Cached questions from previous online AI generations
 * 3. Template-based question construction with randomized variations
 *
 * This runs 100% in the browser — no API calls needed.
 */

import { Question, MEDICAL_SYSTEMS, TOPIC_MAP } from './medq-types';

// ─── localStorage keys ───
const CACHE_KEY = 'medq-question-cache';
const CACHE_MAX = 500; // max cached questions

// ─── Medical knowledge templates ───
// Each entry: [questionTextTemplate, options (for MCQ), correctAnswer, explanation, mnemonic, clinicalPearl, distractorAnalysis, difficulty]
// Templates use {topic} placeholder for dynamic topic insertion

interface QTemplate {
  type: 'mcq' | 'tf' | 'short';
  textTemplate: string;
  options?: string[];
  answer: string;
  explanationTemplate: string;
  mnemonicTemplate: string;
  clinicalPearlTemplate: string;
  distractorAnalysisTemplate: string;
  difficulty: 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert';
  keywords: string[]; // topics this template matches
}

const TEMPLATES: QTemplate[] = [
  // ── Cardiovascular ──
  {
    type: 'mcq',
    textTemplate: "A 58-year-old male presents with {symptom1} and {symptom2}. Blood pressure is {bp}. ECG shows {ecgFinding}. Which of the following is the most appropriate initial management?",
    options: ['Administer IV thrombolytics', 'Start beta-blocker therapy', 'Give sublingual nitroglycerin', 'Order echocardiography'],
    answer: 'Give sublingual nitroglycerin',
    explanationTemplate: "This patient presents with findings consistent with {topic}. The initial management should focus on symptom relief and stabilization. Sublingual nitroglycerin reduces myocardial oxygen demand through vasodilation, decreasing preload and afterload. This is the standard first-line intervention before further diagnostic workup or definitive treatment.",
    mnemonicTemplate: "MONA-B: Morphine, Oxygen, Nitrates, Aspirin, Beta-blockers — initial management of acute coronary syndrome",
    clinicalPearlTemplate: "Clinical Pearl: Nitroglycerin is contraindicated in right ventricular infarction and systolic BP <90 mmHg. Always check BP before administration.",
    distractorAnalysisTemplate: "Correct: Nitroglycerin is first-line for acute chest pain. IV thrombolytics require confirmation of STEMI first. Beta-blockers are added after initial stabilization. Echocardiography is diagnostic, not therapeutic.",
    difficulty: 'Moderate',
    keywords: ['Hypertension', 'Heart Failure', 'Coronary Artery Disease', 'Arrhythmias', 'ACE inhibitors', 'Beta Blockers', 'ACE Inhibitors'],
  },
  {
    type: 'mcq',
    textTemplate: "A 45-year-old patient is started on {drug} for {topic}. At follow-up, the patient reports {sideEffect}. Which mechanism best explains this adverse effect?",
    options: ['Inhibition of angiotensin-converting enzyme', 'Blockade of beta-1 adrenergic receptors', 'Inhibition of HMG-CoA reductase', 'Antagonism of aldosterone receptors'],
    answer: 'Inhibition of angiotensin-converting enzyme',
    explanationTemplate: "{drug} works by inhibiting the angiotensin-converting enzyme, which prevents conversion of angiotensin I to angiotensin II. This leads to decreased aldosterone secretion, resulting in potassium retention. The reported {sideEffect} is a known adverse effect of this mechanism.",
    mnemonicTemplate: "ACE: Angiotensin Converting Enzyme — CAPTOPRIL: Cough, Angioedema, Proteinuria, Taste changes, Orthostatic hypotension, Pregnancy risk, Renal impairment, Increased K+, Liver toxicity",
    clinicalPearlTemplate: "Clinical Pearl: ACE inhibitors are first-line in diabetic nephropathy. Monitor K+ and creatinine within 1-2 weeks of initiation. Contraindicated in bilateral renal artery stenosis.",
    distractorAnalysisTemplate: "Correct: ACE inhibition explains the side effect profile. Beta-blockade causes bradycardia and fatigue. HMG-CoA reductase inhibition causes myopathy. Aldosterone antagonism causes hyperkalemia but through a different mechanism.",
    difficulty: 'Moderate',
    keywords: ['ACE inhibitors', 'ACE Inhibitors', 'Pharmacology', 'Hypertension', 'Heart Failure'],
  },
  {
    type: 'tf',
    textTemplate: "In {topic}, the primary pathophysiological mechanism involves autoimmune destruction of the target organ tissue.",
    answer: 'False',
    explanationTemplate: "While autoimmune mechanisms may play a role in some aspects of {topic}, the primary pathophysiology typically involves a combination of metabolic, hemodynamic, and structural changes rather than direct autoimmune destruction. Understanding the dominant mechanism is crucial for targeted therapy.",
    mnemonicTemplate: "PATH: Pressure, Anatomy, Turbulence, Hemodynamics — think structural and functional, not just immune",
    clinicalPearlTemplate: "Clinical Pearl: Distinguishing autoimmune from metabolic etiologies changes management significantly. Always check autoimmune markers when clinical presentation is atypical.",
    distractorAnalysisTemplate: "Correct: Autoimmune destruction is not the primary mechanism. The dominant processes are metabolic and hemodynamic. Immune involvement is secondary in most cases.",
    difficulty: 'Easy',
    keywords: ['Cardiovascular', 'Respiratory', 'Endocrine', 'Renal', 'Gastrointestinal', 'Hypertension', 'COPD', 'Diabetes Mellitus'],
  },
  {
    type: 'short',
    textTemplate: "A 62-year-old patient with {topic} presents with acute worsening of symptoms. Name two immediate investigations you would order and justify each.",
    answer: 'ECG (to rule out acute cardiac events) and Chest X-ray (to evaluate for pulmonary congestion or effusion)',
    explanationTemplate: "In acute decompensation of {topic}, the priority is identifying life-threatening complications. ECG is essential to exclude acute myocardial infarction or arrhythmias as triggers. Chest X-ray evaluates pulmonary congestion, cardiomegaly, and pleural effusions, which guide acute management decisions including diuretic therapy.",
    mnemonicTemplate: "ABC: Always Be Checking — ECG and CXR first in any acute cardiopulmonary decompensation",
    clinicalPearlTemplate: "Clinical Pearl: In acute settings, BNP/NT-proBNP can rapidly distinguish cardiac from pulmonary causes of dyspnea. BNP >400 pg/mL strongly suggests heart failure.",
    distractorAnalysisTemplate: "ECG is mandatory first-line. CXR provides immediate visual assessment. Blood tests (troponin, BNP) are complementary. Echocardiography is definitive but not always immediately available.",
    difficulty: 'Hard',
    keywords: ['Heart Failure', 'Coronary Artery Disease', 'Pulmonary Embolism', 'Arrhythmias', 'COPD', 'Pneumonia'],
  },
  // ── Respiratory ──
  {
    type: 'mcq',
    textTemplate: "A 65-year-old smoker with {topic} presents with increased dyspnea, productive cough, and {finding}. Spirometry shows FEV1/FVC ratio of {ratio}. What is the most likely classification of this patient's condition?",
    options: ['Mild (GOLD 1)', 'Moderate (GOLD 2)', 'Severe (GOLD 3)', 'Very Severe (GOLD 4)'],
    answer: 'Moderate (GOLD 2)',
    explanationTemplate: "Based on the FEV1/FVC ratio <0.7 confirming obstructive pattern and the FEV1 percentage predicted, this patient falls into the moderate category (GOLD 2). {topic} classification depends on spirometric severity, symptom assessment, and exacerbation history.",
    mnemonicTemplate: "GOLD: Grade Obstructive Lung Disease — FEV1% predicted: Mild >80%, Moderate 50-80%, Severe 30-50%, Very Severe <30%",
    clinicalPearlTemplate: "Clinical Pearl: The ABCD assessment tool in GOLD guidelines combines symptom scores (mMRC/CAT) with exacerbation history to guide therapy, beyond just spirometry.",
    distractorAnalysisTemplate: "Correct: FEV1 50-80% predicted = GOLD 2 Moderate. Mild requires FEV1 >80%. Severe requires FEV1 30-50%. Very severe requires FEV1 <30%.",
    difficulty: 'Moderate',
    keywords: ['COPD', 'Asthma', 'Respiratory'],
  },
  // ── Neurological ──
  {
    type: 'mcq',
    textTemplate: "A 55-year-old patient presents with sudden onset of {neuroSymptom}. MRI shows {mriFinding}. The most likely diagnosis is:",
    options: ['Ischemic stroke', 'Hemorrhagic stroke', 'Transient ischemic attack', 'Migraine with aura'],
    answer: 'Ischemic stroke',
    explanationTemplate: "The sudden onset focal neurological deficit with corresponding MRI findings is most consistent with ischemic stroke. {topic} requires rapid assessment as time is brain — thrombolytic therapy must be considered within the therapeutic window.",
    mnemonicTemplate: "BE-FAST: Balance, Eyes, Face, Arms, Speech, Time — stroke recognition and action",
    clinicalPearlTemplate: "Clinical Pearl: The therapeutic window for IV tPA is up to 4.5 hours from symptom onset. Earlier treatment correlates with better outcomes — every minute counts, with 1.9 million neurons lost per minute.",
    distractorAnalysisTemplate: "Correct: Ischemic stroke matches the clinical and imaging presentation. Hemorrhagic stroke would show hyperdense lesion on CT. TIA resolves within 24 hours. Migraine typically has preceding aura and gradual onset.",
    difficulty: 'Moderate',
    keywords: ['Stroke', 'Epilepsy', 'Multiple Sclerosis', 'Neurological', 'Parkinson Disease'],
  },
  // ── Endocrine ──
  {
    type: 'mcq',
    textTemplate: "A 40-year-old patient with {topic} presents with {endocrineSymptom}. Laboratory findings show {labFinding}. Which of the following is the most appropriate next step in management?",
    options: ['Start insulin therapy', 'Initiate lifestyle modifications and metformin', 'Order imaging studies', 'Refer for surgical evaluation'],
    answer: 'Initiate lifestyle modifications and metformin',
    explanationTemplate: "For newly diagnosed {topic} without acute complications, first-line management includes lifestyle modifications (diet, exercise, weight management) combined with metformin as the preferred initial pharmacotherapy. This approach targets the underlying insulin resistance and metabolic dysfunction.",
    mnemonicTemplate: "Diabetes treatment steps: 1) Lifestyle, 2) Metformin, 3) Add second agent, 4) Insulin — step up therapy as needed",
    clinicalPearlTemplate: "Clinical Pearl: Metformin is contraindicated with eGFR <30 mL/min. Hold before IV contrast procedures. B12 deficiency can occur with long-term use — monitor periodically.",
    distractorAnalysisTemplate: "Correct: Lifestyle + metformin is first-line per guidelines. Insulin is reserved for severe hyperglycemia or type 1 DM. Imaging is not the next step for routine management. Surgery is for bariatric candidates only.",
    difficulty: 'Easy',
    keywords: ['Diabetes Mellitus', 'Endocrine', 'Thyroid Disorders', 'Metabolic syndrome'],
  },
  // ── Gastrointestinal ──
  {
    type: 'mcq',
    textTemplate: "A 50-year-old patient presents with {giSymptom}. Endoscopy reveals {endoscopyFinding}. Biopsy confirms {biopsyResult}. What is the most likely diagnosis?",
    options: ['Peptic ulcer disease', 'Gastric carcinoma', 'Chronic gastritis', 'Gastroesophageal reflux disease'],
    answer: 'Peptic ulcer disease',
    explanationTemplate: "The combination of clinical presentation, endoscopic findings, and biopsy results is consistent with {topic}. H. pylori infection is the most common cause, present in approximately 90% of duodenal ulcers and 70% of gastric ulcers.",
    mnemonicTemplate: "ULCER: Upper pain, Loss of weight (in gastric), Coffee-ground emesis, Early satiety, Risk factors (NSAIDs, H. pylori)",
    clinicalPearlTemplate: "Clinical Pearl: Always test for H. pylori in peptic ulcer disease. Triple therapy (PPI + clarithromycin + amoxicillin) for 14 days has ~85% eradication rate. Confirm eradication 4 weeks after treatment.",
    distractorAnalysisTemplate: "Correct: PUD matches endoscopy and biopsy findings. Gastric carcinoma would show malignant cells on biopsy. Chronic gastritis shows inflammation without ulceration. GERD doesn't cause ulceration on endoscopy typically.",
    difficulty: 'Moderate',
    keywords: ['Peptic Ulcer Disease', 'Gastrointestinal', 'Inflammatory Bowel Disease', 'Hepatitis'],
  },
  // ── Renal ──
  {
    type: 'tf',
    textTemplate: "In acute kidney injury secondary to {topic}, the urine sodium concentration is typically less than 20 mEq/L, consistent with a pre-renal etiology.",
    answer: 'True',
    explanationTemplate: "In pre-renal AKI, the kidneys attempt to conserve sodium and water in response to decreased effective circulating volume. This results in urine sodium <20 mEq/L, fractional excretion of sodium (FENa) <1%, and concentrated urine. This is in contrast to intrinsic renal AKI where FENa >2%.",
    mnemonicTemplate: "Pre-renal vs Intrinsic: Pre-renal = FENa <1%, Urine Na <20, BUN/Cr >20:1. Intrinsic = FENa >2%, Urine Na >40, BUN/Cr <15:1",
    clinicalPearlTemplate: "Clinical Pearl: FENa can be misleading if diuretics were given. Use FEUrea (urea fractional excretion) instead — <35% suggests pre-renal, even on diuretics.",
    distractorAnalysisTemplate: "Correct: Low urine sodium (<20) indicates appropriate sodium conservation in pre-renal AKI. In intrinsic AKI, urine sodium is elevated (>40) due to tubular dysfunction.",
    difficulty: 'Hard',
    keywords: ['Acute Kidney Injury', 'Chronic Kidney Disease', 'Renal', 'Nephrotic Syndrome'],
  },
  // ── Pharmacology ──
  {
    type: 'mcq',
    textTemplate: "A patient taking {drug} for {topic} presents with {adverseEffect}. Which of the following is the most appropriate management?",
    options: ['Discontinue the medication immediately', 'Reduce the dose and monitor', 'Switch to an alternative medication', 'Add a second medication to counteract the side effect'],
    answer: 'Reduce the dose and monitor',
    explanationTemplate: "When a patient on {drug} develops {adverseEffect}, the recommended approach is dose reduction with close monitoring rather than abrupt discontinuation, which could lead to rebound effects or disease worsening. This balances therapeutic benefit with adverse effect management.",
    mnemonicTemplate: "Dose adjustment steps: Reduce → Monitor → Substitute if needed — never stop abruptly without tapering",
    clinicalPearlTemplate: "Clinical Pearl: Always check for drug-drug interactions when adverse effects appear, as they may be due to CYP450 enzyme inhibition or displacement from protein binding sites.",
    distractorAnalysisTemplate: "Correct: Dose reduction with monitoring is the standard approach. Immediate discontinuation risks rebound. Switching is premature without trying dose adjustment. Adding another medication increases polypharmacy risk.",
    difficulty: 'Easy',
    keywords: ['Pharmacology', 'ACE Inhibitors', 'Beta Blockers', 'Statins', 'Antibiotics', 'Anticoagulants', 'NSAIDs', 'Antidepressants'],
  },
  // ── More general templates ──
  {
    type: 'mcq',
    textTemplate: "Which of the following is the most sensitive diagnostic test for {topic}?",
    options: ['Serum biomarker assay', 'Imaging with contrast enhancement', 'Tissue biopsy with histopathology', 'Functional stimulation test'],
    answer: 'Serum biomarker assay',
    explanationTemplate: "For {topic}, serum biomarker assays typically offer the highest sensitivity for initial screening, though they may lack specificity. The combination of high-sensitivity screening with confirmatory testing provides the optimal diagnostic approach.",
    mnemonicTemplate: "SNOUT: Sensitivity — Negative result rules OUT. SPIN: Specificity — Positive result rules IN. Use sensitive tests for screening.",
    clinicalPearlTemplate: "Clinical Pearl: No single test is perfect. Pre-test probability affects predictive values. Always interpret test results in the clinical context of the individual patient.",
    distractorAnalysisTemplate: "Correct: Biomarkers offer highest sensitivity for screening. Imaging provides specificity but may miss early disease. Biopsy is gold standard but invasive. Functional tests are variable.",
    difficulty: 'Easy',
    keywords: ['Cardiovascular', 'Respiratory', 'Endocrine', 'Renal', 'Gastrointestinal', 'Neurological', 'Hematologic', 'Immunologic'],
  },
  {
    type: 'tf',
    textTemplate: "Early initiation of treatment for {topic} has been shown to significantly improve long-term outcomes and reduce mortality.",
    answer: 'True',
    explanationTemplate: "Evidence consistently demonstrates that early intervention in {topic} leads to better outcomes. Delayed treatment allows disease progression, irreversible organ damage, and complications that become increasingly difficult to manage. The therapeutic window is often narrow.",
    mnemonicTemplate: "TIME: Timely Intervention Maximizes Efficacy — treat early, treat aggressively, treat appropriately",
    clinicalPearlTemplate: "Clinical Pearl: The concept of 'therapeutic window' applies to most medical conditions. Earlier diagnosis through screening programs has been one of the greatest advances in modern medicine.",
    distractorAnalysisTemplate: "Correct: Early treatment is consistently associated with better outcomes across most medical conditions. Watchful waiting has a role but should not delay indicated treatment.",
    difficulty: 'Easy',
    keywords: ['Cardiovascular', 'Respiratory', 'Neurological', 'Endocrine', 'Gastrointestinal', 'Renal', 'Hematologic', 'Musculoskeletal', 'Immunologic', 'Pharmacology', 'Pathology', 'Microbiology'],
  },
];

// ─── Symptom/findings pools for template randomization ───
const SYMPTOMS_1 = ['crushing chest pain', 'progressive dyspnea', 'acute severe headache', 'bilateral leg edema', 'recurrent syncope', 'persistent cough', 'acute abdominal pain', 'generalized fatigue'];
const SYMPTOMS_2 = ['radiating to the left arm', 'worse on exertion', 'associated with diaphoresis', 'accompanied by nausea', 'with orthostatic intolerance', 'with hemoptysis', 'with melena', 'with unexplained weight loss'];
const BP_READINGS = ['165/95 mmHg', '148/92 mmHg', '180/110 mmHg', '155/98 mmHg', '140/90 mmHg', '172/105 mmHg'];
const ECG_FINDINGS = ['ST elevation in leads V1-V4', 'ST depression in the lateral leads', 'T wave inversions', 'left bundle branch block', 'atrial fibrillation with rapid ventricular response', 'sinus tachycardia'];
const DRUGS = ['lisinopril', 'metoprolol', 'atorvastatin', 'amoxicillin', 'warfarin', 'omeprazole', 'metformin', 'amlodipine'];
const SIDE_EFFECTS = ['persistent dry cough', 'bradycardia', 'myalgia', 'gastrointestinal upset', 'skin rash', 'dizziness', 'fatigue', 'headache'];
const NEURO_SYMPTOMS = ['left-sided weakness', 'speech difficulty', 'visual field deficit', 'right hemiparesis', 'facial droop', 'ataxia'];
const MRI_FINDINGS = ['diffusion restriction in the MCA territory', 'acute infarct in the basal ganglia', 'small vessel ischemic changes', 'hyperintense lesion in the pons', 'acute left MCA territory infarct'];
const ENDOCRINE_SYMPTOMS = ['polyuria and polydipsia', 'unexplained weight gain', 'heat intolerance', 'cold intolerance', 'galactorrhea', 'amenorrhea'];
const LAB_FINDINGS = ['HbA1c of 8.2%', 'TSH of 12.5 mIU/L', 'random glucose of 220 mg/dL', 'cortisol of 28 mcg/dL', 'prolactin of 85 ng/mL', 'fasting glucose of 145 mg/dL'];
const GI_SYMPTOMS = ['epigastric pain worsened by meals', 'recurrent vomiting', 'chronic diarrhea', 'dysphagia', 'early satiety', 'hematemesis'];
const ENDOSCOPY_FINDINGS = ['a 2cm duodenal ulcer', 'gastric ulceration with clean base', 'esophageal erosion', 'diffuse gastric inflammation', 'a 1.5cm gastric ulcer'];
const BIOPSY_RESULTS = ['H. pylori-positive ulceration', 'chronic active gastritis', 'benign ulcer with no dysplasia', 'intestinal metaplasia', 'reactive gastropathy'];
const ADVERSE_EFFECTS = ['new-onset cough', 'symptomatic bradycardia', 'elevated liver enzymes', 'hyperkalemia', 'angioedema', 'photosensitivity'];
const RATIOS = ['0.55', '0.60', '0.65', '0.50', '0.58'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function fillTemplate(template: string, topic: string): string {
  return template
    .replace(/\{topic\}/g, topic)
    .replace(/\{symptom1\}/g, pick(SYMPTOMS_1))
    .replace(/\{symptom2\}/g, pick(SYMPTOMS_2))
    .replace(/\{bp\}/g, pick(BP_READINGS))
    .replace(/\{ecgFinding\}/g, pick(ECG_FINDINGS))
    .replace(/\{drug\}/g, pick(DRUGS))
    .replace(/\{sideEffect\}/g, pick(SIDE_EFFECTS))
    .replace(/\{finding\}/g, pick(['wheezing on auscultation', 'decreased breath sounds', 'crackles bilaterally', 'prolonged expiration']))
    .replace(/\{ratio\}/g, pick(RATIOS))
    .replace(/\{neuroSymptom\}/g, pick(NEURO_SYMPTOMS))
    .replace(/\{mriFinding\}/g, pick(MRI_FINDINGS))
    .replace(/\{endocrineSymptom\}/g, pick(ENDOCRINE_SYMPTOMS))
    .replace(/\{labFinding\}/g, pick(LAB_FINDINGS))
    .replace(/\{giSymptom\}/g, pick(GI_SYMPTOMS))
    .replace(/\{endoscopyFinding\}/g, pick(ENDOSCOPY_FINDINGS))
    .replace(/\{biopsyResult\}/g, pick(BIOPSY_RESULTS))
    .replace(/\{adverseEffect\}/g, pick(ADVERSE_EFFECTS));
}

function generateId(): string {
  return 'local-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
}

/**
 * Generate questions offline using templates + cached questions
 */
export function generateOfflineQuestions(
  topic: string,
  system: string,
  types: string[],
  difficulties: string[],
  count: number
): Question[] {
  const questions: Question[] = [];

  // 1. Try to use cached questions that match the criteria
  const cached = getCachedQuestions();
  const matchingCached = cached.filter((q) => {
    const typeMatch = types.includes(q.type);
    const diffMatch = difficulties.includes(q.difficulty);
    const topicMatch = q.topic.toLowerCase().includes(topic.toLowerCase()) ||
      q.system.toLowerCase() === system.toLowerCase() ||
      (q.tags && q.tags.some((t: string) => t.toLowerCase().includes(topic.toLowerCase())));
    return typeMatch && diffMatch && topicMatch;
  });

  // Shuffle matching cached questions and take up to half the count
  const cachedToUse = shuffle(matchingCached).slice(0, Math.ceil(count / 2));
  questions.push(...cachedToUse);

  // 2. Fill remaining with template-generated questions
  const remaining = count - questions.length;
  const matchingTemplates = TEMPLATES.filter((t) => {
    const typeMatch = types.includes(t.type);
    const diffMatch = difficulties.includes(t.difficulty);
    const keywordMatch = t.keywords.some(
      (k) => k.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase() === system.toLowerCase()
    );
    return typeMatch && diffMatch && keywordMatch;
  });

  // If no exact match, fall back to broader match
  const templates = matchingTemplates.length > 0 ? matchingTemplates : TEMPLATES.filter((t) => {
    const typeMatch = types.includes(t.type);
    const diffMatch = difficulties.includes(t.difficulty);
    return typeMatch && diffMatch;
  });

  // If still no match, use any template with matching type
  const finalTemplates = templates.length > 0 ? templates : TEMPLATES.filter((t) => types.includes(t.type));

  for (let i = 0; i < remaining; i++) {
    const template = finalTemplates[i % finalTemplates.length];
    const q = createQuestionFromTemplate(template, topic, system);
    questions.push(q);
  }

  return questions.slice(0, count);
}

function createQuestionFromTemplate(template: QTemplate, topic: string, system: string): Question {
  const text = fillTemplate(template.textTemplate, topic);
  const explanation = fillTemplate(template.explanationTemplate, topic);
  const mnemonic = fillTemplate(template.mnemonicTemplate, topic);
  const clinicalPearl = fillTemplate(template.clinicalPearlTemplate, topic);
  const distractorAnalysis = fillTemplate(template.distractorAnalysisTemplate, topic);

  // Shuffle options for MCQ to randomize correct answer position
  let options = template.options ? shuffle(template.options) : [];
  let answer = template.answer;

  // If the answer was in the original options, find it in the shuffled list
  if (template.options && template.answer) {
    const foundInShuffled = options.find(o => o === template.answer);
    if (foundInShuffled) {
      answer = foundInShuffled;
    }
  }

  if (template.type === 'tf') {
    options = ['True', 'False'];
    answer = template.answer;
  }

  if (template.type === 'short') {
    answer = fillTemplate(template.answer, topic);
  }

  // Add some variation to difficulty
  const difficulties: ('Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert')[] = ['Easy', 'Basic', 'Moderate', 'Hard', 'Expert'];
  const difficulty = Math.random() > 0.7 ? pick(difficulties) : template.difficulty;

  return {
    id: generateId(),
    type: template.type,
    text: `<span class='q-hl-red'>${topic}</span>: ${text}`,
    options,
    answer,
    explanation: `<div class='q-callout q-callout-blue'>💡 <strong>Key Concept:</strong> ${explanation}</div>`,
    mnemonic: `<div class='q-mnemo'><div><div class='q-letter' style='background:linear-gradient(135deg,#22c55e,#16a34a)'>⚡</div><div class='q-letter-text'>Offline Generated</div></div></div><div class='q-callout q-callout-red'>🚨 ${mnemonic}</div>`,
    clinicalPearl: `<div class='q-callout q-callout-amber'>💎 <strong>Clinical Pearl:</strong> ${clinicalPearl}</div>`,
    distractorAnalysis: `<div class='q-grid q-grid-2'>${distractorAnalysis}</div>`,
    difficulty,
    system,
    topic,
    tags: [topic, system, 'offline-generated'],
    isAIGenerated: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ─── Cache management ───

export function cacheQuestions(questions: Question[]): void {
  try {
    const existing = getCachedQuestions();
    const merged = [...questions, ...existing];

    // Deduplicate by id
    const seen = new Set<string>();
    const unique = merged.filter((q) => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });

    // Keep only the most recent CACHE_MAX questions
    const trimmed = unique.slice(0, CACHE_MAX);

    localStorage.setItem(CACHE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('[MedQ] Failed to cache questions:', e);
  }
}

export function getCachedQuestions(): Question[] {
  try {
    const data = localStorage.getItem(CACHE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Question[];
  } catch {
    return [];
  }
}

export function getCachedQuestionCount(): number {
  return getCachedQuestions().length;
}

export function clearQuestionCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

/**
 * Get count of cached questions matching a specific system
 */
export function getCachedCountBySystem(system: string): number {
  return getCachedQuestions().filter((q) => q.system === system).length;
}

/**
 * Check how many offline-generated questions are available for a topic/system
 */
export function getOfflineAvailability(topic: string, system: string): {
  cached: number;
  templates: number;
  total: number;
} {
  const cached = getCachedQuestions().filter((q) => {
    return q.topic.toLowerCase().includes(topic.toLowerCase()) ||
      q.system.toLowerCase() === system.toLowerCase();
  }).length;

  const templates = TEMPLATES.filter((t) => {
    return t.keywords.some(
      (k) => k.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase() === system.toLowerCase()
    );
  }).length;

  return {
    cached,
    templates,
    total: cached + templates,
  };
}

// ─── Short Answer Evaluation (keyword-based, works 100% offline) ───

export interface OfflineEvaluationResult {
  score: number;           // 0-100
  feedback: string;
  keyPointsCovered: string[];
  keyPointsMissed: string[];
  method: 'keyword';      // indicates this was keyword-based, not AI
}

// Common medical stop words to ignore when comparing
const MEDICAL_STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'just', 'because', 'but', 'and',
  'or', 'if', 'while', 'about', 'up', 'that', 'this', 'these', 'those',
  'it', 'its', 'which', 'what', 'who', 'whom', 'their', 'they', 'them',
  'we', 'our', 'you', 'your', 'he', 'she', 'him', 'her', 'his',
  'also', 'include', 'includes', 'including', 'patient', 'presents',
  'present', 'presents', 'presents', 'would', 'following', 'following',
  'seen', 'found', 'given', 'known', 'described', 'reported',
]);

// Medical synonyms map — treat these terms as equivalent
const MEDICAL_SYNONYMS: Record<string, string[]> = {
  'myocardial infarction': ['mi', 'heart attack', 'cardiac infarction'],
  'heart failure': ['cardiac failure', 'hf', 'chf', 'congestive heart failure'],
  'hypertension': ['high blood pressure', 'htn', 'elevated blood pressure'],
  'diabetes': ['dm', 'diabetes mellitus'],
  'copd': ['chronic obstructive pulmonary disease', 'chronic obstructive airway disease'],
  'ekg': ['ecg', 'electrocardiogram', 'electrocardiography'],
  'chest x-ray': ['cxr', 'chest radiograph', 'chest radiography'],
  'blood pressure': ['bp'],
  'complete blood count': ['cbc', 'full blood count', 'fbc'],
  'renal': ['kidney'],
  'hepatic': ['liver'],
  'cardiac': ['heart'],
  'pulmonary': ['lung'],
  'cerebrovascular': ['cv'],
  'sublingual': ['under the tongue', 'sl'],
  'iv': ['intravenous'],
  'po': ['oral', 'by mouth'],
  'im': ['intramuscular'],
  'prn': ['as needed', 'as required'],
  'stat': ['immediately', 'urgently'],
};

/**
 * Tokenize text into meaningful words, removing stop words and normalizing.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !MEDICAL_STOP_WORDS.has(w));
}

/**
 * Extract key phrases from text — multi-word medical terms that should be
 * treated as atomic units.
 */
function extractKeyPhrases(text: string): string[] {
  const phrases: string[] = [];
  const lower = text.toLowerCase();

  // Check for known medical phrases
  const medicalPhrases = [
    'myocardial infarction', 'heart failure', 'congestive heart failure',
    'acute kidney injury', 'chronic kidney disease',
    'chronic obstructive pulmonary disease',
    'deep vein thrombosis', 'pulmonary embolism',
    'coronary artery disease', 'atrial fibrillation',
    'systemic lupus erythematosus',
    'inflammatory bowel disease',
    'non-steroidal anti-inflammatory',
    'angiotensin converting enzyme',
    'angiotensin receptor blocker',
    'blood pressure', 'chest x-ray', 'complete blood count',
    'cardiac output', 'systemic vascular resistance',
    'end-stage renal disease',
    'transient ischemic attack',
  ];

  for (const phrase of medicalPhrases) {
    if (lower.includes(phrase)) {
      phrases.push(phrase);
    }
  }

  return phrases;
}

/**
 * Check if two terms are considered equivalent using the synonym map.
 */
function areSynonyms(term1: string, term2: string): boolean {
  const t1 = term1.toLowerCase().trim();
  const t2 = term2.toLowerCase().trim();
  if (t1 === t2) return true;

  for (const [, syns] of Object.entries(MEDICAL_SYNONYMS)) {
    const allTerms = [...syns, t1];
    if (allTerms.includes(t1) && allTerms.includes(t2)) return true;
    // Also check if both are in the synonym list
    const mainEntry = Object.keys(MEDICAL_SYNONYMS).find(k => k === t1 || MEDICAL_SYNONYMS[k]?.includes(t1));
    if (mainEntry) {
      const allSyns = [mainEntry, ...(MEDICAL_SYNONYMS[mainEntry] || [])];
      if (allSyns.includes(t2)) return true;
    }
  }

  return false;
}

/**
 * Evaluate a student's short answer against the expected answer using keyword matching.
 * Works 100% offline — no AI model required.
 */
export function evaluateShortAnswerOffline(
  question: string,
  expectedAnswer: string,
  studentAnswer: string,
): OfflineEvaluationResult {
  // Strip HTML from inputs
  const stripTags = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
  const cleanExpected = stripTags(expectedAnswer);
  const cleanStudent = stripTags(studentAnswer);
  const cleanQuestion = stripTags(question);

  // Extract key phrases (multi-word medical terms)
  const expectedPhrases = extractKeyPhrases(cleanExpected);
  const studentPhrases = extractKeyPhrases(cleanStudent);

  // Tokenize
  const expectedTokens = tokenize(cleanExpected);
  const studentTokens = new Set(tokenize(cleanStudent));

  // Identify key points from the expected answer
  const keyPoints: string[] = [];

  // Add key phrases as points
  for (const phrase of expectedPhrases) {
    keyPoints.push(phrase);
  }

  // Add significant single tokens that aren't part of phrases
  const phraseWords = new Set(expectedPhrases.flatMap(p => p.split(' ')));
  for (const token of expectedTokens) {
    if (!phraseWords.has(token) && token.length > 2) {
      keyPoints.push(token);
    }
  }

  // If no key points extracted, use raw tokens
  if (keyPoints.length === 0) {
    keyPoints.push(...expectedTokens.filter(t => t.length > 2).slice(0, 10));
  }

  // Evaluate which key points are covered
  const keyPointsCovered: string[] = [];
  const keyPointsMissed: string[] = [];

  for (const point of keyPoints) {
    const pointTokens = tokenize(point);
    let covered = false;

    // Check if all tokens of the key point are in the student answer
    if (pointTokens.every((t) => studentTokens.has(t))) {
      covered = true;
    }

    // Check phrase match
    if (!covered && studentPhrases.some(sp => areSynonyms(sp, point))) {
      covered = true;
    }

    // Check if any synonym matches
    if (!covered) {
      for (const studentToken of studentTokens) {
        if (areSynonyms(studentToken, point) || pointTokens.some(pt => areSynonyms(pt, studentToken))) {
          covered = true;
          break;
        }
      }
    }

    // Partial match — at least half the tokens match
    if (!covered && pointTokens.length > 1) {
      const matchCount = pointTokens.filter(t => studentTokens.has(t)).length;
      if (matchCount >= Math.ceil(pointTokens.length / 2)) {
        covered = true;
      }
    }

    if (covered) {
      keyPointsCovered.push(point);
    } else {
      keyPointsMissed.push(point);
    }
  }

  // Calculate score
  const totalPoints = keyPoints.length;
  const coveredCount = keyPointsCovered.length;
  let score = totalPoints > 0 ? Math.round((coveredCount / totalPoints) * 100) : 0;

  // Bonus for completeness — if student mentions important extra points
  const extraTokens = [...studentTokens].filter(t => !expectedTokens.includes(t) && t.length > 4);
  if (extraTokens.length > 0 && score < 100) {
    score = Math.min(100, score + 5); // small bonus for extra detail
  }

  // Penalty for very short answers
  if (cleanStudent.split(/\s+/).length < 3 && score > 20) {
    score = Math.max(0, score - 20);
  }

  // Generate feedback
  let feedback = '';
  if (score >= 90) {
    feedback = 'Excellent answer! You covered all the key points.';
  } else if (score >= 70) {
    feedback = `Good answer! You covered most key points. Consider including: ${keyPointsMissed.slice(0, 3).join(', ')}.`;
  } else if (score >= 50) {
    feedback = `Partial answer. Key points covered: ${keyPointsCovered.slice(0, 3).join(', ') || 'none'}. Missing: ${keyPointsMissed.slice(0, 4).join(', ')}.`;
  } else if (score >= 25) {
    feedback = `Your answer is incomplete. The expected answer covers: ${keyPoints.slice(0, 5).join(', ')}. You mentioned: ${keyPointsCovered.slice(0, 3).join(', ') || 'few key points'}.`;
  } else {
    feedback = `Your answer doesn't address the key concepts. The question asks about: ${cleanQuestion.slice(0, 100)}. Key points expected: ${keyPoints.slice(0, 5).join(', ')}.`;
  }

  return {
    score,
    feedback,
    keyPointsCovered,
    keyPointsMissed,
    method: 'keyword',
  };
}
