export interface Question {
  id: string;
  type: 'mcq' | 'tf' | 'short';
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  mnemonic: string;
  clinicalPearl: string;
  distractorAnalysis: string;
  difficulty: 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert';
  difficultyLevel?: 1 | 2 | 3 | 4 | 5;
  system: string;
  topic: string;
  tags: string[];
  isAIGenerated: boolean;
  diagramSpec?: string;        // JSON string for DiagramRenderer
  molecularScenes?: string;    // JSON string for MolecularIllustrator
  sources?: string;            // JSON string: array of {type, title}
  illustrationDescription?: string;
  organInvolvement?: string;
  mechanismDiagram?: string;
  visualSummary?: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  modelUrl?: string;         // 3D model embed URL (Sketchfab) — "explore the model" questions
  videoTaskId?: string;
  // ── Enhanced media metadata (agent pipeline) ──
  /** JSON: [{name, rows:[{test, value, unit, flag}]}] — rendered as a styled lab table */
  labPanel?: string;
  /** JSON: {phase, shape, s1, s2, bestHeard} — phonocardiogram synced to the audio player */
  pcgSpec?: string;
  /** JSON: [{label, x, y}] percentage pins on the image / ECG strip — clicking selects the option */
  hotspots?: string;
  /** JSON: [{letter, name}] clickable structure chips beside the 3D model */
  structureTags?: string;
  // ── USMLE-style blueprint tagging ──
  blueprintOrgan?: string;   // organ system (Cardiovascular, Respiratory...)
  blueprintTask?: string;    // task/competency (Diagnosis, Mechanism, Management...)
  // ── Medical accuracy review pass ──
  reviewStatus?: string;     // pending | approved | flagged
  reviewNotes?: string;      // JSON: reviewer verdict details
  // ── Advanced citations: chunk-level provenance for "highlight in the source" ──
  /** JSON string: array of {sourceId, chunkId, documentId, title, fileKind, quote} */
  citations?: string;
  // ── Adaptive difficulty calibration (computed from real attempts) ──
  difficultyP?: number;      // p-value: proportion of users answering correctly (-1 = uncalibrated)
  discrimination?: number;   // point-biserial discrimination (-1 = uncalibrated)
  attemptsCount?: number;
  mediaRequirements?: Array<{
    type: 'image' | 'audio' | 'video';
    required: boolean;
    purpose: string;
    prompt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    questions: number;
    attempts: number;
  };
  questions?: ExamQuestion[];
  attempts?: ExamAttempt[];
}

export interface ExamQuestion {
  id: string;
  examId: string;
  questionId: string;
  order: number;
  question: Question;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  completedAt: string;
}

export interface ExamResult {
  attemptId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  results: {
    questionId: string;
    correct: boolean;
    selectedAnswer: string;
    correctAnswer: string;
    questionType: string;
    questionText: string;
    options: string[];
    partial?: boolean;
  }[];
}

export const MEDICAL_SYSTEMS = [
  'OBG',
  'Cardiovascular',
  'Respiratory',
  'Neurological',
  'Gastrointestinal',
  'Renal',
  'Endocrine',
  'Hematologic',
  'Musculoskeletal',
  'Integumentary',
  'Reproductive',
  'Immunologic',
  'Pharmacology',
  'Pathology',
  'Microbiology',
  'Biochemistry',
] as const;

export const TOPIC_MAP: Record<string, string[]> = {
  OBG: [
    'Operative Vaginal Delivery',
    'Malpresentation Malpositions Breech',
    'Abnormal Labour Patterns',
    'Multiple Multifetal Pregnancy',
    'Postpartum Hemorrhage PPH',
    'PROM Preterm Labour',
    'SGA Fetal Growth Restriction',
    'Rh Iso-immunization',
    'Cesarean Delivery',
    'Amenorrhea',
    'Hyperprolactinemia Hirsutism PCOS',
    'Puberty Menopause',
    'Physiology of Menstruation',
    'Anatomy Embryology',
  ],
  Cardiovascular: ['Hypertension', 'Heart Failure', 'Arrhythmias', 'Coronary Artery Disease', 'Valvular Heart Disease', 'Myocarditis', 'Aortic Dissection', 'Endocarditis'],
  Respiratory: ['COPD', 'Asthma', 'Pneumonia', 'Pulmonary Embolism', 'Interstitial Lung Disease', 'ARDS', 'Lung Cancer', 'Pleural Effusion'],
  Neurological: ['Stroke', 'Epilepsy', 'Parkinson Disease', 'Multiple Sclerosis', 'Meningitis', 'Myasthenia Gravis', 'Alzheimer Disease', 'Guillain-Barre'],
  Gastrointestinal: ['Peptic Ulcer Disease', 'Inflammatory Bowel Disease', 'Pancreatitis', 'Cirrhosis', 'Hepatitis', 'Celiac Disease', 'GI Bleeding', 'Appendicitis'],
  Renal: ['Acute Kidney Injury', 'Chronic Kidney Disease', 'Nephrotic Syndrome', 'Glomerulonephritis', 'Renal Stones', 'UTI', 'Polycystic Kidney Disease'],
  Endocrine: ['Diabetes Mellitus', 'Thyroid Disorders', 'Cushing Syndrome', 'Addison Disease', 'Pheochromocytoma', 'Hyperparathyroidism', 'SIADH', 'Diabetes Insipidus'],
  Hematologic: ['Anemia', 'Leukemia', 'Lymphoma', 'Coagulation Disorders', 'Sickle Cell Disease', 'Thrombocytopenia', 'Hemophilia', 'DIC'],
  Musculoskeletal: ['Rheumatoid Arthritis', 'Osteoarthritis', 'Osteoporosis', 'Gout', 'Lyme Disease', 'Osteomyelitis', 'Fractures', 'Lupus'],
  Integumentary: ['Melanoma', 'Psoriasis', 'Eczema', 'Burns', 'Cellulitis', 'Contact Dermatitis', 'Acne Vulgaris', 'Basal Cell Carcinoma'],
  Reproductive: ['Ectopic Pregnancy', 'PCOS', 'Endometriosis', 'Preeclampsia', 'Prostate Cancer', 'Cervical Cancer', 'Infertility', 'Menorrhagia'],
  Immunologic: ['HIV/AIDS', 'Autoimmune Diseases', 'Transplant Rejection', 'Primary Immunodeficiency', 'Anaphylaxis', 'SLE', 'Sarcoidosis', 'Vasculitis'],
  Pharmacology: ['ACE Inhibitors', 'Beta Blockers', 'Statins', 'Antibiotics', 'Anticoagulants', 'NSAIDs', 'Opioids', 'Antidepressants'],
  Pathology: ['Neoplasia', 'Inflammation', 'Infarction', 'Apoptosis', 'Necrosis', 'Amyloidosis', 'Hemochromatosis', 'Atherosclerosis'],
  Microbiology: ['Staphylococcus', 'Streptococcus', 'E. coli', 'TB', 'Malaria', 'HIV', 'Hepatitis Viruses', 'Fungal Infections'],
  Biochemistry: ['Glycolysis', 'TCA Cycle', 'Urea Cycle', 'Lipid Metabolism', 'Porphyrias', 'Glycogen Storage Diseases', 'Electron Transport Chain'],
};

export const DIFFICULTY_OPTIONS = ['Easy', 'Basic', 'Moderate', 'Hard', 'Expert'] as const;
export const DIFFICULTY_LEVELS: Record<string, number> = {
  'Easy': 1,
  'Basic': 2,
  'Moderate': 3,
  'Hard': 4,
  'Expert': 5,
};
export const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Easy',
  2: 'Basic',
  3: 'Moderate',
  4: 'Hard',
  5: 'Expert',
};
export const DIFFICULTY_COLORS: Record<number, string> = {
  1: '#22c55e',   // green
  2: '#4ade80',   // light green
  3: '#f59e0b',   // amber
  4: '#f97316',   // orange
  5: '#ef4444',   // red
};
export const DIFFICULTY_BG_COLORS: Record<number, string> = {
  1: 'rgba(34,197,94,0.10)',
  2: 'rgba(74,222,128,0.10)',
  3: 'rgba(245,158,11,0.10)',
  4: 'rgba(249,115,22,0.10)',
  5: 'rgba(239,68,68,0.10)',
};

/** Map legacy difficulty values to new 5-level system */
export function normalizeDifficulty(difficulty: string): 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert' {
  if (difficulty === 'Medium') return 'Moderate';
  const valid: Set<string> = new Set(['Easy', 'Basic', 'Moderate', 'Hard', 'Expert']);
  return valid.has(difficulty) ? (difficulty as 'Easy' | 'Basic' | 'Moderate' | 'Hard' | 'Expert') : 'Moderate';
}

/** Get numeric level from difficulty label */
export function getDifficultyLevel(difficulty: string): number {
  return DIFFICULTY_LEVELS[normalizeDifficulty(difficulty)] ?? 3;
}

export const QUESTION_TYPES = ['mcq', 'tf', 'short'] as const;
