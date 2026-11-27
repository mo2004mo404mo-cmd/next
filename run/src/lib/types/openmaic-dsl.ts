/**
 * OpenMAIC DSL — ported from @openmaic/dsl (https://github.com/THU-MAIC/OpenMAIC)
 * Source: packages/@openmaic/dsl/src/{stage,slides}.ts · MIT-licensed.
 *
 * Pure, dependency-free types + type-guards for the MAIC lesson skeleton.
 * MedQ uses only the subset needed by the AI Classroom feature: Stage, Scene,
 * SlideContent, QuizContent, and the universal SceneContent union.
 */

import type { Slide } from './slides';

/** All scene kinds the contract is aware of. */
export type SceneType = 'slide' | 'quiz' | 'interactive' | 'pbl';

/** Lifecycle / interaction mode a Stage can be operated in. */
export type StageMode = 'autonomous' | 'playback' | 'edit';

/** A whiteboard slide (structural Slide minus canvas-only fields). */
export type Whiteboard = Omit<Slide, 'theme' | 'turningMode' | 'sectionTag' | 'type'>;

/** Server-generated agent configuration embedded in persisted classroom JSON. */
export interface GeneratedAgentConfig {
  id: string;
  name: string;
  role: string;
  persona: string;
  avatar: string;
  color: string;
  priority: number;
}

/** Multi-agent discussion configuration for a single scene. */
export interface MultiAgentConfig {
  enabled: boolean;
  agentIds: string[];
  directorPrompt?: string;
}

/** Stage — the entire classroom/course. */
export interface Stage {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  languageDirective?: string;
  style?: string;
  whiteboard?: Whiteboard[];
  agentIds?: string[];
  generatedAgentConfigs?: GeneratedAgentConfig[];
  interactiveMode?: boolean;
  taskEngineMode?: boolean;
}

/** Slide content — wraps a Slide canvas. */
export interface SlideContent {
  type: 'slide';
  schemaVersion?: number;
  canvas: Slide;
}

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple' | 'short_answer';
  question: string;
  options?: QuizOption[];
  answer?: string[];
  analysis?: string;
  commentPrompt?: string;
  hasAnswer?: boolean;
  points?: number;
}

export interface QuizContent {
  type: 'quiz';
  questions: QuizQuestion[];
}

/** The universal scene-content kinds owned by the contract. */
export type SceneContent = SlideContent | QuizContent;

/** Scene — a single page/scene in the course. */
export interface Scene<
  TAction = never,
  TContent extends { type: SceneType } = SlideContent | QuizContent,
> {
  id: string;
  stageId: string;
  type: SceneType;
  title: string;
  order: number;
  content: TContent;
  actions?: TAction[];
  whiteboards?: Slide[];
  multiAgent?: MultiAgentConfig;
  createdAt?: number;
  updatedAt?: number;
}

/* ──────────────── Pure discriminant guards ──────────────── */

export function isSlideContent<T extends { type: SceneType }>(
  content: T,
): content is T & SlideContent {
  return content.type === 'slide';
}

export function isQuizContent<T extends { type: SceneType }>(
  content: T,
): content is T & QuizContent {
  return content.type === 'quiz';
}
