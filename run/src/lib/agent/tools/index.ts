import { createMedicalWebSearchTool } from './web-search';
import { createMedicalFetchTool } from './web-fetch';
import { createMedicalIllustrationTool } from './illustration';
import { createVisualMaterialAnalysisTool } from './visual-analysis';
import { createMemoryTools } from './memory';
import { createArtifactTool } from './artifacts';
import { createDocumentTool } from './documents';
import { createWordDocumentTool, createSpreadsheetTool, createPresentationTool } from './office';
import { createChartTool } from './chart';
import {
  createImageEditTool,
  createImageSearchTool,
  createAudioTranscriptionTool,
  createSpeechSynthesisTool,
  createVideoAnalysisTool,
  createVideoGenerationTool,
} from './media';
import { createArtifactSearchTool, createScreenshotTool } from './discovery';
import { createTaskTools } from './tasks';
import { createSearchKnowledgeTool, createAddKnowledgeTool, KNOWLEDGE_TOOL_NAMES } from './knowledge';

// Re-export tool factories so subagents and future consumers can build
// their own scoped instances.
export {
  createMedicalWebSearchTool,
  createMedicalFetchTool,
  createMedicalIllustrationTool,
  createVisualMaterialAnalysisTool,
  createMemoryTools,
  createArtifactTool,
  createDocumentTool,
  createWordDocumentTool,
  createSpreadsheetTool,
  createPresentationTool,
  createChartTool,
  createImageEditTool,
  createImageSearchTool,
  createAudioTranscriptionTool,
  createSpeechSynthesisTool,
  createVideoAnalysisTool,
  createVideoGenerationTool,
  createArtifactSearchTool,
  createScreenshotTool,
  createTaskTools,
};

/**
 * ── Registry note (2026-10-23 consolidation) ──
 *
 * This file previously exported buildMedQTools + MEDQ_TOOL_NAMES — a SECOND
 * tool registry that no code ever imported. The live chat agent assembled its
 * tools inline in deep-agent-runtime.ts instead, and the split caused the
 * image-search bug (search_medical_images was registered here, invisible to
 * the chat agent). That dead registry was removed.
 *
 * The canonical chat-agent registry now lives in ./chat-registry.ts
 * (buildChatAgentTools) — a single source of truth that also wires
 * AgentToolExecution telemetry around every tool it returns.
 */
export { buildChatAgentTools } from './chat-registry';
export type { ChatAgentToolOptions } from './chat-registry';
export { createFlashcardTools } from './flashcards';
export { createStudyInsightTools } from './study-insights';
export { createVideoSceneSearchTool, VIDEO_SCENE_TOOL_NAMES } from './video-search';
export { createQuerySpreadsheetTool, SPREADSHEET_TOOL_NAMES } from './spreadsheet';

// Kept for compatibility with older imports that list the full tool surface.
export { KNOWLEDGE_TOOL_NAMES };
