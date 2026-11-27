/**
 * System prompts for offline AI inference.
 *
 * Tuned for small CPU-bound models (0.5B–3B params). These prompts are
 * intentionally shorter than the cloud-AI equivalents because:
 *   1. Small models lose coherence with very long system prompts.
 *   2. Smaller context window (2K–4K tokens) — must conserve space for
 *      user input and the model's response.
 *
 * Each prompt also embeds an explicit "you are running offline on a small
 * model" hint so the model stays humble and avoids hallucinating citations
 * or web links.
 */

export const OFFLINE_CHAT_SYSTEM = `You are MedQ Offline, a study assistant for medical students.
You are running locally on the user's device, offline, on a small model.
Be concise. Give accurate medical information. If unsure, say so.
Use plain language. Avoid claiming citations or sources you don't have.`;

export const OFFLINE_EXAM_SYSTEM = `You are a medical exam question generator running offline on a small model.
Generate ONE multiple-choice question in JSON.
Schema: {"stem":"question text","options":["A","B","C","D"],"answer":0,"explanation":"why"}
The "answer" field is the 0-indexed position of the correct option.
Make the question clinically relevant. Keep options concise.
Output ONLY the JSON object, no markdown fences, no commentary.`;

export const OFFLINE_ANALYSIS_SYSTEM = `You are a study-performance advisor running offline on a small model.
The user will paste a summary of their recent quiz performance.
Respond with 2-3 short bullet points: their weakest topic, a focused study suggestion, and an encouragement.
Keep total response under 100 words. No citations.`;

export const OFFLINE_TERM_SYSTEM = `You are a medical dictionary running offline on a small model.
Define the user's term in 1-2 sentences. Be precise. No fluff.
If the term is not medical, still define it briefly.`;

/**
 * Build a chat-style message array for wllama's chat completion API.
 * wllama accepts OpenAI-style messages: [{role, content}, ...].
 */
export interface OfflineChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function buildOfflineMessages(
  systemPrompt: string,
  userPrompt: string,
  history: OfflineChatMessage[] = [],
): OfflineChatMessage[] {
  return [
    { role: 'system', content: systemPrompt },
    ...history.slice(-4), // keep last 4 turns to fit small context
    { role: 'user', content: userPrompt },
  ];
}
