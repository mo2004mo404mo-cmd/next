/**
 * Cross-surface prefill for the Generate Questions tab.
 *
 * Three surfaces ask the app to "generate questions about X":
 *   • the AI agent's generate_questions UI action (MedQAppShell),
 *   • the pricing page's upsell CTA,
 *   • the agent's UIActionEngine.
 *
 * All of them navigate to /generate and then dispatch a
 * 'medq-generate-questions' CustomEvent ~500 ms later. When the generate tab
 * lived inside the SPA shell this worked: PersistentTab mounted on pushState
 * within ~100 ms, so the listener was ready before the event fired. Since the
 * tab became a real App-Router route, the page can take longer than 500 ms
 * to mount (a cold dev compile of /generate measured 35–67 s on this box), so
 * the event fires into the void and the topic is lost.
 *
 * Fix: every dispatcher STASHES the payload in sessionStorage right before
 * dispatching; the generate page drains the stash on mount AND listens for
 * the live event. Whichever arrives first wins.
 */

export const GENERATE_PREFILL_KEY = 'medq:generate-prefill';

export type GeneratePrefill = {
  topic?: string;
  count?: number;
  difficulty?: string;
};

/** Persist the prefill payload (survives however long the page takes to mount). */
export function stageGeneratePrefill(detail: GeneratePrefill | Record<string, unknown>) {
  try { sessionStorage.setItem(GENERATE_PREFILL_KEY, JSON.stringify(detail)); } catch { /* private mode / quota — ignore */ }
}

/** Read-and-remove the stashed payload (call once on mount). */
export function drainGeneratePrefill(): GeneratePrefill | null {
  try {
    const raw = sessionStorage.getItem(GENERATE_PREFILL_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(GENERATE_PREFILL_KEY);
    return JSON.parse(raw) as GeneratePrefill;
  } catch { return null; }
}

/** Drop the stash (live event already consumed it). */
export function clearGeneratePrefill() {
  try { sessionStorage.removeItem(GENERATE_PREFILL_KEY); } catch { /* ignore */ }
}
