/**
 * Follow-up suggestion chips — what the learner can do NEXT after an answer.
 *
 * Skill discoverability was the problem: most students never open the skills
 * browser, so the assistant's capabilities (flashcards, drills, artifacts,
 * scheduling) went unseen. These chips surface the 2-4 most relevant next
 * actions directly under the latest assistant message.
 *
 * Deliberately heuristic (zero extra LLM calls, zero latency): the generator
 * inspects which tools the last turn used and what the answer contains, then
 * maps to high-value follow-ups. Rules are cheap, deterministic, and testable.
 */
import type { ToolCall } from './useAgentV2Stream';

export interface FollowUpContext {
  /** Tool calls from the latest assistant turn (agentSnapshot.toolCalls). */
  toolCalls: ToolCall[];
  /** The assistant's final answer text. */
  content: string;
  /** Number of files the user attached with their last message. */
  attachmentCount?: number;
}

/** Build 2-4 contextual follow-up prompts for the latest assistant answer. */
export function buildFollowUps({ toolCalls, content, attachmentCount = 0 }: FollowUpContext): string[] {
  const usedTools = new Set(toolCalls.map((call) => call.toolName));
  const has = (name: string) => usedTools.has(name);
  const any = (...names: string[]) => names.some((name) => usedTools.has(name));

  const suggestions: string[] = [];

  // ── Tool-driven follow-ups (highest signal) ──
  if (any('run_question_generation_agent', 'save_question')) {
    suggestions.push('Quiz me on these questions', 'Turn them into flashcards');
  }
  if (has('create_flashcards')) {
    suggestions.push('How many flashcards are due right now?', 'Quiz me on these topics');
  }
  if (any('create_presentation', 'create_word_document', 'create_spreadsheet', 'generate_document', 'create_chart')) {
    suggestions.push('Summarize the key takeaways', 'Make flashcards from this');
  }
  if (has('synthesize_speech')) {
    suggestions.push('Play it again as a slower walkthrough');
  }
  if (has('transcribe_audio')) {
    suggestions.push('Make flashcards from the key points', 'Summarize this in 5 bullet points');
  }
  if (has('analyze_visual_material')) {
    suggestions.push('Quiz me on this image', 'Explain the relevant pathology simply');
  }
  if (has('search_medical_images')) {
    suggestions.push('Label the key structures in these images', 'Quiz me on this anatomy');
  }
  if (has('search_medical_references')) {
    suggestions.push('Make flashcards from this', 'What are the biggest exam points here?');
  }
  if (has('analyze_my_weaknesses')) {
    suggestions.push('Generate a micro-drill on my weakest topic', 'Plan a study week around my weak areas');
  }
  if (has('get_exam_blueprint')) {
    suggestions.push('Analyze my weak areas to weight the plan', 'Add daily practice questions to this plan');
  }
  if (has('search_knowledge')) {
    suggestions.push('Turn my notes into flashcards', 'Quiz me from my library');
  }

  // ── Content-driven fallbacks (fill to at least 3) ──
  const lower = content.toLowerCase();
  if (suggestions.length < 3) {
    if (/\bflashcard/.test(lower)) suggestions.push('Review my due flashcards');
    if (/guideline|threshold|dosage|diagnos/.test(lower) && !suggestions.some((s) => s.includes('exam points'))) {
      suggestions.push('What are the biggest exam points here?');
    }
  }
  // Universal useful defaults, deduped.
  const defaults = [
    'Explain this more simply',
    'Give me a clinical vignette example',
    'Quiz me on this topic',
    'Make flashcards from this',
  ];
  for (const fallback of defaults) {
    if (suggestions.length >= 3) break;
    if (!suggestions.includes(fallback)) suggestions.push(fallback);
  }

  // Multi-file turns → offer the combined artifact.
  if (attachmentCount > 1) {
    suggestions.unshift('Combine everything into one study guide');
  }

  // De-dup, cap at 4, keep order.
  return [...new Set(suggestions)].slice(0, 4);
}
