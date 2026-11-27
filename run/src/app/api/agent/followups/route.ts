/**
 * Chat-specific follow-up suggestions.
 *
 * POST /api/agent/followups   { messages: [{ role, content }] }
 *   → { suggestions: string[] }
 *
 * The chat panel's recommendation chips under the latest answer used to be
 * purely heuristic (tool-name → canned follow-ups + generic defaults like
 * "Explain this more simply") — useful, but not SPECIFIC to the
 * conversation. This endpoint asks the same auto model the agent runs on
 * (see provider/fast-model.ts — per-task routing was reverted 2026-10-25)
 * to propose 3-4 concrete next steps grounded in the actual exchange.
 *
 * Contract with the client: ALWAYS 200 — a failure, timeout, or unparsable
 * reply yields `suggestions: []`, and the caller keeps its instant
 * heuristic chips instead (progressive enhancement, never a dead end).
 */

import { NextRequest, NextResponse } from 'next/server';
import { HumanMessage } from '@langchain/core/messages';
import { resolveUserId } from '@/lib/auth-helpers';
import { buildAuxModel } from '@/lib/agent/provider/fast-model';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 40;

interface ExchangeEntry {
  role: string;
  content: string;
}

const MAX_MESSAGES = 12;
const MAX_CONTENT_CHARS = 3000;
const GENERATION_TIMEOUT_MS = 25_000;

const SYSTEM_PROMPT = [
  'You propose follow-up actions for a medical-education chat between a learner and their AI study assistant.',
  'Read the recent exchange, then propose 3-4 SPECIFIC next steps the learner could realistically ask next.',
  'Rules:',
  '- Each suggestion must be anchored in THIS conversation (its topics, questions, artifacts, or stated goals) — never generic filler like "Explain this more simply" or "Quiz me on this topic" unless the conversation gives no anchor at all.',
  '- Prefer concrete, actionable study actions (drill a named subtopic, compare the two things discussed, make flashcards of the listed items, deepen the hardest part, generate practice questions in the same style).',
  '- Each suggestion: 8-90 characters, starts with a verb, no quotes, no numbering, no trailing period.',
  '- Do NOT repeat an already-answered question.',
  'Return ONLY a JSON array of 3-4 strings. Nothing else.',
].join('\n');

function normalizeExchanges(raw: unknown): ExchangeEntry[] | null {
  if (!Array.isArray(raw)) return null;
  const entries: ExchangeEntry[] = [];
  for (const item of raw.slice(0, MAX_MESSAGES)) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as Record<string, unknown>).role;
    const content = (item as Record<string, unknown>).content;
    if (typeof role !== 'string' || typeof content !== 'string') continue;
    if (role !== 'user' && role !== 'assistant') continue;
    const text = content.trim();
    if (!text) continue;
    entries.push({ role, content: text.slice(0, MAX_CONTENT_CHARS) });
  }
  // Need at least one user message and one assistant reply to be "specific
  // to the chat"; otherwise the caller's heuristics are a better fit.
  if (!entries.some((e) => e.role === 'user') || !entries.some((e) => e.role === 'assistant')) return null;
  return entries;
}

/** Tolerant JSON-array-of-strings extraction (models add fences/prose). */
function parseSuggestions(raw: string): string[] {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(raw);
  const candidate = fenced ? fenced[1] : raw;
  const start = candidate.indexOf('[');
  const end = candidate.lastIndexOf(']');
  if (start < 0 || end <= start) return [];
  try {
    const parsed = JSON.parse(candidate.slice(start, end + 1));
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    const suggestions: string[] = [];
    for (const item of parsed) {
      if (typeof item !== 'string') continue;
      const text = item.trim().replace(/^["'\s]+|["'\s.]+$/g, '');
      if (text.length < 8 || text.length > 90) continue;
      const key = text.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      suggestions.push(text);
      if (suggestions.length >= 4) break;
    }
    return suggestions;
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const userId = await resolveUserId().catch(() => null);
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({})) as { messages?: unknown };
  const exchanges = normalizeExchanges(body.messages);
  if (!exchanges) {
    return NextResponse.json({ suggestions: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const model = buildAuxModel();
  if (!model) {
    return NextResponse.json({ suggestions: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const transcript = exchanges
    .map((entry) => `${entry.role === 'user' ? 'Learner' : 'Assistant'}: ${entry.content}`)
    .join('\n\n');

  const ask = async (): Promise<string> => {
    const response = await Promise.race([
      model.invoke([new HumanMessage(`${SYSTEM_PROMPT}\n\nRecent exchange:\n\n${transcript}`)]),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('followup-generation timeout')), GENERATION_TIMEOUT_MS)),
    ]);
    return String((response as { content?: unknown }).content ?? '');
  };

  let raw = '';
  try {
    raw = await ask();
  } catch {
    // One 429-aware retry — the shared gateway storms transiently.
    try {
      await new Promise((resolve) => setTimeout(resolve, 4_000));
      raw = await ask();
    } catch {
      return NextResponse.json({ suggestions: [] }, { headers: { 'Cache-Control': 'no-store' } });
    }
  }

  return NextResponse.json(
    { suggestions: parseSuggestions(raw) },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
