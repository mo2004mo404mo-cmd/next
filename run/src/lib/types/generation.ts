/**
 * Generation Types — ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * Source: lib/types/generation.ts · MIT-licensed.
 *
 * MedQ originally shipped only the subset needed by the AI Classroom feature
 * (UserRequirements / SceneOutline / WidgetOutline / OutlineResponse — see the
 * first section below). The full OpenMAIC file's additional exports
 * (PdfImage, UploadedDocument, GeneratedSlideContent, GeneratedQuizContent,
 * GeneratedPBLContent, GeneratedInteractiveContent, ScientificModel,
 * SuggestedSlideElement / SuggestedQuizQuestion / SuggestedAction,
 * GenerationProgress, GenerationSession) are appended in the second section so
 * ported OpenMAIC code that imports these symbols compiles unchanged.
 *
 * Where both medq and OpenMAIC defined the same export (UserRequirements,
 * WidgetOutline, SceneOutline), medq's existing definitions are kept — they
 * use extracted sub-interfaces (QuizOutlineConfig / PblOutlineConfig) and add
 * extra optional fields (e.g. `PblOutlineConfig.language`). OpenMAIC's
 * inline-typed versions of these are equivalent; replacing them would only
 * churn existing call sites. Two OpenMAIC-only optional fields on SceneOutline
 * (`mediaGenerations`, deprecated `interactiveConfig`) are merged in so ported
 * OpenMAIC code that populates those fields type-checks.
 */

import type { ActionType } from './action';
import type { MediaGenerationRequest } from '@/lib/media/types';
import type { PPTElement, SlideBackground } from '@/lib/dsl';
import type { QuizQuestion } from './stage';
import type { PBLProjectConfig } from '@/lib/pbl/types';
import type { WidgetConfig, TeacherAction, WidgetType } from './widgets';

// ==================== MedQ-original subset (kept verbatim) ====================

/** Simplified user requirements for course generation. */
export interface UserRequirements {
  /** Single free-form text for all user input (topic, duration, style, etc.) */
  requirement: string;
  userNickname?: string;
  userBio?: string;
  webSearch?: boolean;
  interactiveMode?: boolean;
  taskEngineMode?: boolean;
}

/** Widget outline configuration for interactive scenes. */
export interface WidgetOutline {
  concept?: string;
  keyVariables?: string[];
  diagramType?: 'flowchart' | 'mindmap' | 'hierarchy' | 'system';
  language?: 'python' | 'javascript' | 'typescript' | 'java' | 'cpp';
  gameType?: 'quiz' | 'puzzle' | 'strategy' | 'card' | 'action';
  visualizationType?: 'molecular' | 'solar' | 'anatomy' | 'geometry' | 'physics' | 'custom';
  objects?: string[];
  interactions?: string[];
  procedureType?: 'repair' | 'assembly' | 'inspection' | 'operation' | 'custom';
  task?: string;
  tools?: string[];
  steps?: string[];
  successCriteria?: string[];
  errorConsequences?: string[];
  challenge?: string;
  playerControls?: string[];
  nodeCount?: number;
  challengeType?: string;
}

/** Quiz-specific configuration on a quiz-type scene outline. */
export interface QuizOutlineConfig {
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionTypes: ('single' | 'multiple' | 'short_answer')[];
}

/** PBL-specific configuration on a pbl-type scene outline. */
export interface PblOutlineConfig {
  projectTopic: string;
  projectDescription: string;
  targetSkills: string[];
  issueCount?: number;
  language?: string;
}

/** Simplified scene outline (stage 1 output). */
export interface SceneOutline {
  id: string;
  type: 'slide' | 'quiz' | 'interactive' | 'pbl';
  title: string;
  /** 1-2 sentences describing the purpose. */
  description: string;
  /** 3-5 core key points. */
  keyPoints: string[];
  teachingObjective?: string;
  estimatedDuration?: number;
  order: number;
  languageNote?: string;
  suggestedImageIds?: string[];
  quizConfig?: QuizOutlineConfig;
  /** Preferred: widgetType + widgetOutline. */
  widgetType?: WidgetType;
  widgetOutline?: WidgetOutline;
  pblConfig?: PblOutlineConfig;
  /** AI-generated media requests (when PDF images are insufficient). Ported from OpenMAIC. */
  mediaGenerations?: MediaGenerationRequest[];
  /**
   * @deprecated Use widgetType + widgetOutline instead.
   * Legacy interactive config — kept for backward compatibility with OpenMAIC payloads.
   */
  interactiveConfig?: {
    conceptName: string;
    conceptOverview: string;
    designIdea: string;
    subject?: string;
  };
}

/** Top-level outline response from the LLM. */
export interface OutlineResponse {
  languageDirective: string;
  courseTitle?: string;
  outlines: SceneOutline[];
}

// ==================== OpenMAIC-ported additions ====================
//
// The exports below are ported verbatim from OpenMAIC's `lib/types/generation.ts`
// so that ported OpenMAIC code importing these symbols compiles unchanged.

// -------------------- PDF Image Types --------------------

/**
 * Image extracted from PDF with metadata.
 */
export interface PdfImage {
  id: string; // e.g., "img_1", "img_2"
  src: string; // base64 data URL (empty when stored in IndexedDB)
  pageNumber: number; // Page number in PDF
  description?: string; // Optional description for AI context
  storageId?: string; // Reference to IndexedDB (session_xxx_img_1)
  width?: number; // Image width (px or normalized)
  height?: number; // Image height (px or normalized)
}

/**
 * Image mapping for post-processing: image_id → base64 URL.
 */
export type ImageMapping = Record<string, string>;

// -------------------- Stage 1 Input --------------------

export interface UploadedDocument {
  id: string;
  name: string; // Original filename
  type: 'pdf' | 'docx' | 'pptx' | 'txt' | 'md' | 'image' | 'other';
  size: number; // Bytes
  uploadedAt: Date;
  contentSummary?: string; // Placeholder for parsing
  extractedTopics?: string[]; // Placeholder for parsing
  pageCount?: number;
  storageRef?: string;
}

// -------------------- Stage 3 Output: Generated Content --------------------

/**
 * AI-generated slide content.
 */
export interface GeneratedSlideContent {
  elements: PPTElement[];
  background?: SlideBackground;
  remark?: string;
}

/**
 * AI-generated quiz content.
 */
export interface GeneratedQuizContent {
  questions: QuizQuestion[];
}

// -------------------- PBL Generation Types --------------------

/**
 * AI-generated PBL content.
 */
export interface GeneratedPBLContent {
  projectConfig: PBLProjectConfig;
}

// -------------------- Interactive Generation Types --------------------

/**
 * Scientific model output from scientific modeling stage.
 */
export interface ScientificModel {
  core_formulas: string[];
  mechanism: string[];
  constraints: string[];
  forbidden_errors: string[];
}

/**
 * AI-generated interactive content.
 */
export interface GeneratedInteractiveContent {
  html: string;
  scientificModel?: ScientificModel;
  widgetType?: WidgetType;
  widgetConfig?: WidgetConfig;
  teacherActions?: TeacherAction[];
}

// -------------------- Legacy Types (for compatibility) --------------------

export interface SuggestedSlideElement {
  type: 'text' | 'image' | 'shape' | 'chart' | 'latex' | 'line';
  purpose: 'title' | 'subtitle' | 'content' | 'example' | 'diagram' | 'formula' | 'highlight';
  contentHint: string;
  position?: 'top' | 'center' | 'bottom' | 'left' | 'right';
  chartType?: 'bar' | 'line' | 'pie' | 'radar';
  textOutline?: string[];
}

export interface SuggestedQuizQuestion {
  type: 'single' | 'multiple' | 'short_answer';
  questionOutline: string;
  suggestedOptions?: string[];
  targetConceptId?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SuggestedAction {
  type: ActionType;
  description: string;
  timing?: 'start' | 'middle' | 'end' | 'after-content';
}

// -------------------- Generation Session --------------------

export interface GenerationProgress {
  currentStage: 1 | 2 | 3;
  overallProgress: number; // 0-100
  stageProgress: number; // 0-100
  statusMessage: string;
  scenesGenerated: number;
  totalScenes: number;
  errors?: string[];
}

export interface GenerationSession {
  id: string;
  requirements: UserRequirements;
  sceneOutlines?: SceneOutline[];
  progress: GenerationProgress;
  startedAt: Date;
  completedAt?: Date;
  generatedStageId?: string;
}
