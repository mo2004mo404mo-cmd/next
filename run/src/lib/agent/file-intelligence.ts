/**
 * File Intelligence — Types, processing, and analysis for the MedQ AI Agent.
 *
 * Capabilities:
 * - OCR: Extract text from images and scanned PDFs via VLM
 * - PDF Understanding: Parse structure, tables, figures from PDFs
 * - Image Analysis: Medical image interpretation (X-ray, CT, ECG, histology, etc.)
 * - Metadata Extraction: File metadata, page count, word count, creation date
 * - Classification: Auto-classify document type (clinical guideline, textbook, lab report, etc.)
 * - Summarization: Generate concise summaries of extracted content
 * - Organization: Tag, categorize, and suggest filing in collections
 */

// ─── Types ────────────────────────────────────────────────────────────

export type FileType = 'pdf' | 'docx' | 'txt' | 'md' | 'csv' | 'tsv' | 'xlsx'
  | 'png' | 'jpg' | 'jpeg' | 'webp' | 'bmp' | 'gif' | 'svg'
  | 'mp3' | 'wav' | 'm4a' | 'aac' | 'ogg' | 'oga' | 'webm' | 'flac'
  | 'mp4' | 'pptx' | 'zip';

export type MedicalDocumentCategory =
  | 'clinical-guideline'
  | 'textbook-chapter'
  | 'lab-report'
  | 'imaging-report'
  | 'prescription'
  | 'discharge-summary'
  | 'research-paper'
  | 'case-study'
  | 'exam-paper'
  | 'lecture-notes'
  | 'drug-monograph'
  | 'protocol'
  | 'patient-record'
  | 'anatomy-diagram'
  | 'ecg-tracing'
  | 'histology-slide'
  | 'radiology-image'
  | 'other';

export interface FileMetadata {
  fileName: string;
  fileType: FileType;
  fileSize: number;
  pageCount?: number;
  wordCount?: number;
  charCount?: number;
  language?: string;
  createdAt?: string;
  modifiedAt?: string;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  dpi?: number;
  dimensions?: { width: number; height: number };
  duration?: number; // seconds, for audio/video
}

export interface FileClassification {
  category: MedicalDocumentCategory;
  confidence: number; // 0-1
  subCategories: string[];
  tags: string[];
  medicalSpecialty?: string;
  organSystem?: string;
}

export interface FileSummary {
  brief: string;       // 1-2 sentence overview
  detailed: string;    // 3-5 sentence summary
  keyPoints: string[]; // 5-10 key points
  entities: {
    drugs: string[];
    diseases: string[];
    procedures: string[];
    anatomicalTerms: string[];
    abbreviations: string[];
  };
}

export interface FileOrganization {
  suggestedCollection: string;
  suggestedTags: string[];
  suggestedFolder: string;
  relatedTopics: string[];
  studyRelevance: {
    forExam: string[];    // e.g., ['USMLE Step 1', 'PLAB']
    forSubject: string[]; // e.g., ['Cardiology', 'Pharmacology']
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
}

export interface FileAnalysisResult {
  id: string;
  metadata: FileMetadata;
  extractedText: string;
  imageUrls?: string[];     // base64 data URLs for pages/images needing VLM
  classification: FileClassification;
  summary: FileSummary;
  organization: FileOrganization;
  ocrConfidence?: number;   // 0-1 for OCR quality
  processingTimeMs: number;
}

  /** Resumable-upload phase snapshot (Stage 13 UX) — populated only
   *  on the chunked path (files > RESUMABLE_THRESHOLD_BYTES). Small
   *  files take the instant single-request path and leave this undefined. */
  export interface UploadProgressSnapshot {
    phase: 'preparing' | 'uploading' | 'paused' | 'retrying' | 'assembling' | 'done' | 'error' | 'cancelled';
    /** Confirmed bytes on the server (incl. resumed bytes). */
    uploadedBytes: number;
    /** Declared total file size. */
    totalBytes: number;
    /** Sliding-window speed, bytes/second (0 = unknown). */
    bytesPerSecond: number;
    /** Seconds remaining, or null while unknown. */
    etaSeconds: number | null;
    /** Bytes already on the server when this upload started (resume). */
    resumedBytes: number;
    /** Attempt number of the in-flight chunk (1 = first try). */
    attempt: number;
  }

export interface FileAttachment {
  id: string;
  name: string;
  type: FileType;
  size: number;
  dataUrl?: string;        // base64 data URL (for images, PDF pages)
  extractedText?: string;
  analysis?: FileAnalysisResult;
  status: 'pending' | 'extracting' | 'analyzing' | 'complete' | 'error';
  progress: number;        // 0-100
  /** Stage 13 UX: resumable-upload phase snapshot. Present only while a
   *  large file is uploading / paused / retrying / cancelled / failed.
   *  Undefined for small files (instant single-request path) and after
   *  the upload completes (the chip falls back to status + progress). */
  upload?: UploadProgressSnapshot;
  error?: string;
  /** Set when the document was auto-ingested into the knowledge library —
   *  the agent then grounds answers on it via search_knowledge_base. */
  knowledge?: {
    sourceId: string;
    chunks: number;
    title: string;
  };
}

// ─── Classification Helper ────────────────────────────────────────────

const CLASSIFICATION_KEYWORDS: Record<MedicalDocumentCategory, string[]> = {
  'clinical-guideline': ['guideline', 'recommendation', 'protocol', 'ACCF/AHA', 'NICE', 'ESC', 'standard of care', 'clinical practice'],
  'textbook-chapter': ['chapter', 'pathophysiology', 'anatomy', 'physiology', 'histology', 'embryology', 'biochemistry'],
  'lab-report': ['lab report', 'results', 'reference range', 'WBC', 'Hb', 'HCT', 'creatinine', 'BUN', 'LFT', 'CMP', 'CBC'],
  'imaging-report': ['radiology', 'CT scan', 'MRI', 'X-ray', 'ultrasound', 'findings', 'impression', 'comparison'],
  'prescription': ['prescription', 'Rx', 'sig', 'dispense', 'refill', 'directions for use'],
  'discharge-summary': ['discharge', 'admission', 'hospital course', 'follow-up', 'condition on discharge'],
  'research-paper': ['abstract', 'methods', 'results', 'discussion', 'conclusion', 'references', 'PMID', 'DOI', 'randomized', 'double-blind'],
  'case-study': ['case', 'patient presents', 'chief complaint', 'history of present illness', 'HPI', 'differential diagnosis'],
  'exam-paper': ['question', 'answer', 'MCQ', 'multiple choice', 'USMLE', 'PLAB', 'examination', 'choose the correct'],
  'lecture-notes': ['lecture', 'slide', 'learning objectives', 'key concepts', 'summary points'],
  'drug-monograph': ['mechanism of action', 'pharmacokinetics', 'adverse effects', 'contraindications', 'drug interactions', 'dosage', 'indication'],
  'protocol': ['protocol', 'algorithm', 'step-by-step', 'treatment plan', 'management algorithm'],
  'patient-record': ['patient', 'medical history', 'vitals', 'physical exam', 'assessment', 'plan'],
  'anatomy-diagram': ['anatomy', 'diagram', 'labeled', 'structure', 'landmark'],
  'ecg-tracing': ['ECG', 'EKG', 'lead', 'QRS', 'ST segment', 'PR interval', 'rhythm', 'arrhythmia'],
  'histology-slide': ['histology', 'stain', 'H&E', 'tissue', 'microscopy', 'cell', 'microscope'],
  'radiology-image': ['X-ray', 'radiograph', 'chest film', 'bone', 'fracture', 'opacity'],
  'other': [],
};

/**
 * Classify extracted text content into a medical document category.
 */
export function classifyContent(text: string): FileClassification {
  const lowerText = text.toLowerCase();
  const scores: Record<string, number> = {};

  for (const [category, keywords] of Object.entries(CLASSIFICATION_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      const regex = new RegExp(kw.toLowerCase(), 'gi');
      const matches = lowerText.match(regex);
      if (matches) score += matches.length;
    }
    scores[category] = score;
  }

  // Sort by score descending
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topCategory = (sorted[0]?.[1] || 0) > 0 ? sorted[0][0] as MedicalDocumentCategory : 'other';
  const confidence = Math.min((sorted[0]?.[1] || 0) / 20, 1);
  const subCategories = sorted.slice(1, 4).filter(([, s]) => s > 0).map(([c]) => c);

  // Extract tags from text
  const tags = extractMedicalTags(text);

  // Determine specialty and organ system
  const { specialty, organSystem } = extractSpecialtyAndOrganSystem(text);

  return {
    category: topCategory,
    confidence,
    subCategories,
    tags,
    medicalSpecialty: specialty,
    organSystem,
  };
}

// ─── Medical Tag Extraction ───────────────────────────────────────────

const DRUG_PATTERN = /\b(?:metformin|aspirin|lisinopril|amlodipine|omeprazole|losartan|metoprolol|atorvastatin|simvastatin|warfarin|heparin|enoxaparin|clopidogrel|prednisone|amoxicillin|azithromycin|ciprofloxacin|vancomycin|meropenem|insulin|glipizide|sitagliptin|dabigatran|rivaroxaban|apixaban|furosemide|hydrochlorothiazide|spironolactone|digoxin|adenosine|amiodarone|dobutamine|dopamine|norepinephrine|phenylephrine|epinephrine|albuterol|ipratropium|montelukast|fluticasone|sumatriptan|acetaminophen|ibuprofen|naproxen|morphine|fentanyl|ketorolac|tramadol|cetirizine|loratadine|diphenhydramine|ranitidine|pantoprazole|ondansetron|promethazine|dexamethasone|methylprednisolone|levothyroxine|propylthiouracil|methimazole)\b/gi;

const DISEASE_PATTERN = /\b(?:myocardial infarction|heart failure|atrial fibrillation|pneumonia|COPD|asthma|diabetes mellitus|hypertension|stroke|sepsis|DVT|pulmonary embolism|cirrhosis|hepatitis|renal failure|acute kidney injury|anemia|leukemia|lymphoma|meningitis|appendicitis|pancreatitis|cholecystitis|diverticulitis|osteoporosis|rheumatoid arthritis|lupus|HIV|COVID|tuberculosis|malaria|hyperthyroidism|hypothyroidism|Cushing|Addison|pheochromocytoma|SIADH|DI|ARDS|DIC|PE|MI|CHF|AFib|VTE|IBD|Crohn|ulcerative colitis)\b/gi;

const PROCEDURE_PATTERN = /\b(?:intubation|thoracentesis|paracentesis|lumbar puncture|central line|arterial line|chest tube|CPR|cardioversion|defibrillation|biopsy|endoscopy|colonoscopy|bronchoscopy|ECMO|dialysis|herniorrhaphy|cholecystectomy|appendectomy|thrombectomy|angioplasty|stenting|CABG|valve replacement|laparoscopy|arthroscopy|craniotomy|laminectomy)\b/gi;

const ANATOMY_PATTERN = /\b(?:heart|lung|liver|kidney|brain|stomach|intestine|colon|pancreas|spleen|gallbladder|thyroid|adrenal|aorta|vena cava|coronary artery|pulmonary artery|femoral|carotid|subclavian|jugular|spinal cord|cerebellum|cerebrum|hypothalamus|pituitary|hippocampus|basal ganglia)\b/gi;

const ABBREVIATION_PATTERN = /\b(?:ABC|ACE|ACL|ACS|ADH|AF|ALS|AMI|ARDS|AV|BID|BMP|BP|BUN|CAD|CBC|CHF|CMP|COPD|CPK|CPR|CRP|CSF|CT|CVA|CVP|DKA|DM|DVT|ECG|EEG|EMG|ERCP|ESR|FDP|FFP|GI|GCS|GFR|Hb|HCT|HPI|HR|ICP|ICU|INR|IV|JVP|KUB|LDH|LFT|LP|MAP|MCV|MRA|MRI|NPO|NS|OTC|PCWP|PE|PEEP|PO|PR|PRN|PT|PTT|QRS|RR|SAH|SBP|SC|SIADH|SIRS|SOB|SPF|STD|SVC|TIA|TID|TSH|TT|TXA|UA|UGI|UTI|VF|VT|WBC)\b/g;

function extractMedicalTags(text: string): string[] {
  const tags = new Set<string>();

  const drugMatches = text.match(DRUG_PATTERN) || [];
  drugMatches.forEach(d => tags.add(d.toLowerCase()));

  const diseaseMatches = text.match(DISEASE_PATTERN) || [];
  diseaseMatches.forEach(d => tags.add(d.toLowerCase()));

  const procedureMatches = text.match(PROCEDURE_PATTERN) || [];
  procedureMatches.forEach(p => tags.add(p.toLowerCase()));

  const anatomyMatches = text.match(ANATOMY_PATTERN) || [];
  anatomyMatches.forEach(a => tags.add(a.toLowerCase()));

  return Array.from(tags).slice(0, 30);
}

function extractSpecialtyAndOrganSystem(text: string): { specialty?: string; organSystem?: string } {
  const lower = text.toLowerCase();

  const specialtyMap: Record<string, string[]> = {
    'Cardiology': ['heart', 'cardiac', 'coronary', 'myocardial', 'ecg', 'echocardiogra', 'arrhythmia', 'hypertension', 'heart failure'],
    'Pulmonology': ['lung', 'pulmonary', 'respiratory', 'pneumonia', 'copd', 'asthma', 'ventilator', 'oxygen saturation'],
    'Gastroenterology': ['stomach', 'intestinal', 'liver', 'hepat', 'pancrea', 'biliary', 'GI', 'bowel', 'colon', 'esophag'],
    'Nephrology': ['kidney', 'renal', 'nephro', 'creatinine', 'dialysis', 'BUN', 'GFR', 'proteinuria'],
    'Neurology': ['brain', 'neuro', 'stroke', 'seizure', 'mening', 'dementia', 'neuropathy', 'CNS'],
    'Endocrinology': ['thyroid', 'diabetes', 'insulin', 'adrenal', 'pituitary', 'hormone', 'glucocorticoid'],
    'Hematology': ['anemia', 'leukem', 'lymphom', 'coagul', 'platelet', 'hemorrhag', 'thrombocy'],
    'Infectious Disease': ['sepsis', 'infection', 'antibiotic', 'fever', 'WBC', 'culture', 'HIV', 'tuberculosis'],
    'Orthopedics': ['bone', 'fracture', 'joint', 'arthro', 'spine', 'ligament', 'tendon', 'orthopedic'],
    'Obstetrics/Gynecology': ['pregnancy', 'gestational', 'uterus', 'ovarian', 'cervical', 'obstetric', 'maternal'],
    'Pharmacology': ['drug', 'dose', 'pharmacokinetic', 'metabolism', 'adverse effect', 'interaction', 'mechanism of action'],
  };

  const organMap: Record<string, string[]> = {
    'Cardiovascular': ['heart', 'cardiac', 'coronary', 'vessel', 'artery', 'vein', 'aort', 'circulation'],
    'Respiratory': ['lung', 'airway', 'bronch', 'alveol', 'pulmonary', 'pleur', 'diaphragm'],
    'Gastrointestinal': ['esophag', 'stomach', 'intestin', 'colon', 'rectum', 'liver', 'pancreas', 'gallbladder'],
    'Renal': ['kidney', 'renal', 'ureter', 'bladder', 'nephron', 'glomerul'],
    'Nervous': ['brain', 'spinal', 'nerve', 'neuro', 'cerebr', 'synaps', 'mening'],
    'Endocrine': ['thyroid', 'adrenal', 'pituitary', 'pancreas', 'gonad', 'hormone'],
    'Musculoskeletal': ['bone', 'muscle', 'joint', 'cartilage', 'ligament', 'tendon'],
    'Integumentary': ['skin', 'derm', 'wound', 'rash', 'eczema', 'psoriasis'],
    'Immune': ['immune', 'lymph', 'antibody', 'antigen', 'vaccin', 'autoimmune'],
  };

  let bestSpecialty = '';
  let bestSpecialtyScore = 0;
  for (const [specialty, keywords] of Object.entries(specialtyMap)) {
    let score = 0;
    for (const kw of keywords) {
      const matches = lower.match(new RegExp(kw, 'gi'));
      if (matches) score += matches.length;
    }
    if (score > bestSpecialtyScore) {
      bestSpecialtyScore = score;
      bestSpecialty = specialty;
    }
  }

  let bestOrgan = '';
  let bestOrganScore = 0;
  for (const [organ, keywords] of Object.entries(organMap)) {
    let score = 0;
    for (const kw of keywords) {
      const matches = lower.match(new RegExp(kw, 'gi'));
      if (matches) score += matches.length;
    }
    if (score > bestOrganScore) {
      bestOrganScore = score;
      bestOrgan = organ;
    }
  }

  return {
    specialty: bestSpecialtyScore > 2 ? bestSpecialty : undefined,
    organSystem: bestOrganScore > 2 ? bestOrgan : undefined,
  };
}

// ─── Summary Generation ───────────────────────────────────────────────

/**
 * Generate a structured summary from extracted text.
 * This is a heuristic pre-processing step — the LLM will do the actual deep summarization.
 */
export function generatePreliminarySummary(text: string): FileSummary {
  const words = text.split(/\s+/);
  const wordCount = words.length;

  // Extract entities
  const drugs = (text.match(DRUG_PATTERN) || []).map(d => d.toLowerCase());
  const diseases = (text.match(DISEASE_PATTERN) || []).map(d => d.toLowerCase());
  const procedures = (text.match(PROCEDURE_PATTERN) || []).map(p => p.toLowerCase());
  const anatomy = (text.match(ANATOMY_PATTERN) || []).map(a => a.toLowerCase());
  const abbreviations = (text.match(ABBREVIATION_PATTERN) || []);

  // Deduplicate
  const uniqueDrugs = [...new Set(drugs)].slice(0, 15);
  const uniqueDiseases = [...new Set(diseases)].slice(0, 15);
  const uniqueProcedures = [...new Set(procedures)].slice(0, 10);
  const uniqueAnatomy = [...new Set(anatomy)].slice(0, 10);
  const uniqueAbbr = [...new Set(abbreviations)].slice(0, 20);

  // Extract key points (heuristic: sentences with medical terms)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const keySentences = sentences.filter(s => {
    const lower = s.toLowerCase();
    return uniqueDrugs.some(d => lower.includes(d)) ||
           uniqueDiseases.some(d => lower.includes(d)) ||
           uniqueProcedures.some(p => lower.includes(p));
  }).map(s => s.trim()).slice(0, 8);

  // Brief overview (first meaningful sentences)
  const briefSentences = sentences.slice(0, 3).map(s => s.trim()).join('. ');
  const brief = briefSentences.length > 200 ? briefSentences.slice(0, 200) + '...' : briefSentences;

  // Detailed summary
  const detailedSentences = sentences.slice(0, 8).map(s => s.trim()).join('. ');
  const detailed = detailedSentences.length > 500 ? detailedSentences.slice(0, 500) + '...' : detailedSentences;

  return {
    brief: brief || `Document with ${wordCount} words containing medical content.`,
    detailed: detailed || `Medical document covering ${uniqueDiseases.slice(0, 3).join(', ') || 'various topics'}.`,
    keyPoints: keySentences.length > 0 ? keySentences : ['Content extracted from uploaded file'],
    entities: {
      drugs: uniqueDrugs,
      diseases: uniqueDiseases,
      procedures: uniqueProcedures,
      anatomicalTerms: uniqueAnatomy,
      abbreviations: uniqueAbbr,
    },
  };
}

// ─── Organization Suggestion ──────────────────────────────────────────

export function suggestOrganization(
  classification: FileClassification,
  summary: FileSummary,
): FileOrganization {
  const { category, medicalSpecialty, tags } = classification;
  const { entities } = summary;

  // Suggested collection based on category
  const categoryToCollection: Record<string, string> = {
    'clinical-guideline': 'Clinical Guidelines',
    'textbook-chapter': 'Textbook Notes',
    'lab-report': 'Lab Reports',
    'imaging-report': 'Imaging Reports',
    'prescription': 'Pharmacology',
    'discharge-summary': 'Clinical Cases',
    'research-paper': 'Research Papers',
    'case-study': 'Clinical Cases',
    'exam-paper': 'Practice Exams',
    'lecture-notes': 'Lecture Notes',
    'drug-monograph': 'Pharmacology',
    'protocol': 'Clinical Guidelines',
    'patient-record': 'Clinical Cases',
    'anatomy-diagram': 'Anatomy',
    'ecg-tracing': 'ECG Practice',
    'histology-slide': 'Histology',
    'radiology-image': 'Radiology',
    'other': 'Study Materials',
  };

  // Suggested folder
  const folder = medicalSpecialty || categoryToCollection[category] || 'Study Materials';

  // Related exam topics
  const specialtyToExams: Record<string, string[]> = {
    'Cardiology': ['USMLE Step 1', 'USMLE Step 2 CK', 'PLAB 1', 'MRCP'],
    'Pulmonology': ['USMLE Step 1', 'USMLE Step 2 CK', 'PLAB 1'],
    'Gastroenterology': ['USMLE Step 1', 'USMLE Step 2 CK'],
    'Nephrology': ['USMLE Step 1', 'USMLE Step 2 CK'],
    'Neurology': ['USMLE Step 1', 'USMLE Step 2 CK', 'MRCP'],
    'Endocrinology': ['USMLE Step 1', 'USMLE Step 2 CK'],
    'Hematology': ['USMLE Step 1'],
    'Infectious Disease': ['USMLE Step 1', 'USMLE Step 2 CK'],
    'Pharmacology': ['USMLE Step 1', 'PLAB 1'],
  };

  const difficultyMap: Record<string, 'beginner' | 'intermediate' | 'advanced'> = {
    'textbook-chapter': 'beginner',
    'lecture-notes': 'beginner',
    'exam-paper': 'intermediate',
    'case-study': 'intermediate',
    'clinical-guideline': 'advanced',
    'research-paper': 'advanced',
    'drug-monograph': 'intermediate',
  };

  return {
    suggestedCollection: categoryToCollection[category] || 'Study Materials',
    suggestedTags: [...tags.slice(0, 10), ...entities.drugs.slice(0, 5), ...entities.diseases.slice(0, 5)].slice(0, 15),
    suggestedFolder: folder,
    relatedTopics: [...entities.diseases, ...entities.drugs, ...tags].slice(0, 10),
    studyRelevance: {
      forExam: specialtyToExams[medicalSpecialty || ''] || ['USMLE Step 1'],
      forSubject: medicalSpecialty ? [medicalSpecialty] : [],
      difficulty: difficultyMap[category] || 'intermediate',
    },
  };
}

// ─── Full Analysis Pipeline ───────────────────────────────────────────

/**
 * Run the full file intelligence pipeline on extracted text.
 * This is a client-side pre-processing step; the LLM does deep analysis.
 */
export function analyzeExtractedContent(
  text: string,
  metadata: FileMetadata,
): FileAnalysisResult {
  const startTime = Date.now();

  const classification = classifyContent(text);
  const summary = generatePreliminarySummary(text);
  const organization = suggestOrganization(classification, summary);

  return {
    id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    metadata: {
      ...metadata,
      wordCount: text.split(/\s+/).length,
      charCount: text.length,
    },
    extractedText: text,
    classification,
    summary,
    organization,
    ocrConfidence: text.length > 100 ? 0.9 : text.length > 20 ? 0.6 : 0.3,
    processingTimeMs: Date.now() - startTime,
  };
}

// ─── File Type Utilities ──────────────────────────────────────────────

export function getFileType(fileName: string): FileType {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const typeMap: Record<string, FileType> = {
    pdf: 'pdf', docx: 'docx', doc: 'docx',
    txt: 'txt', md: 'md', csv: 'csv', tsv: 'tsv', xlsx: 'xlsx',
    png: 'png', jpg: 'jpg', jpeg: 'jpeg', webp: 'webp', bmp: 'bmp', gif: 'gif', svg: 'svg',
    mp3: 'mp3', wav: 'wav', m4a: 'm4a', aac: 'aac', ogg: 'ogg', oga: 'oga', webm: 'webm', flac: 'flac',
    mp4: 'mp4', pptx: 'pptx', zip: 'zip',
  };
  return typeMap[ext] || 'txt';
}

export function isImageFile(type: FileType): boolean {
  return ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'svg'].includes(type);
}

export function isDocumentFile(type: FileType): boolean {
  return ['pdf', 'docx', 'txt', 'md', 'csv', 'tsv', 'xlsx', 'pptx'].includes(type);
}

export function isAudioFile(type: FileType): boolean {
  return ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'oga', 'webm', 'flac'].includes(type);
}

export function getSupportedFileTypes(): string {
  return 'PDF, DOCX, TXT, MD, CSV, TSV, XLSX, PNG, JPG, JPEG, WEBP, BMP, GIF, SVG, MP3, WAV, M4A, AAC, OGG, WEBM, FLAC, MP4, PPTX';
}
