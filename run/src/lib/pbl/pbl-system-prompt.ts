/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/pbl-system-prompt.ts
 *
 * Verbatim port — `@/lib/prompts` already exists.
 */

/**
 * PBL Generation System Prompt
 *
 * Uses languageDirective for multi-language support.
 */

import { buildPrompt, PROMPT_IDS } from '@/lib/prompts';

export interface PBLSystemPromptConfig {
  projectTopic: string;
  projectDescription: string;
  targetSkills: string[];
  issueCount?: number;
  languageDirective: string;
}

export function buildPBLSystemPrompt(config: PBLSystemPromptConfig): string {
  const prompt = buildPrompt(PROMPT_IDS.PBL_DESIGN, {
    projectTopic: config.projectTopic,
    projectDescription: config.projectDescription,
    targetSkills: config.targetSkills.join(', '),
    issueCount: config.issueCount ?? 3,
    languageDirective: config.languageDirective,
  });
  if (!prompt) {
    throw new Error('pbl-design prompt template failed to load');
  }
  return prompt.system;
}
