/**
 * /api/osce/debrief — grade the encounter and close the session.
 *
 * POST /api/osce/debrief
 *   body: { sessionId }
 *   → { result: { score, coverage, missed, empathy, redFlags, soapNote, strengths, improvements }, closed: true }
 *
 * The grader LLM sees the FULL scenario (incl. hidden profile + checklist)
 * and the complete transcript. It scores:
 *   • coverage   — which checklist items the student's questions hit
 *   • missed     — checklist items never covered
 *   • empathy    — communication score 0-10 with a cited quote
 *   • redFlags   — dangerous misses ("never asked about the worst headache of her life")
 *   • soapNote   — a model SOAP note for the encounter
 *   • score      — 0-100 composite
 *
 * The result is persisted on the OsceSession (status → completed).
 */
import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { resolveMedQAgentConfig } from '@/lib/agent/deep-agent-runtime';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 120;

interface Turn { role: 'student' | 'patient'; text: string; ts: number }

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const { sessionId } = await req.json().catch(() => ({})) as { sessionId?: string };
  if (!sessionId) return badRequest('sessionId required');

  const session = await db.osceSession.findFirst({ where: { id: sessionId, userId } });
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  if (session.status === 'completed' && session.result) {
    return NextResponse.json({ result: JSON.parse(session.result), closed: true, alreadyCompleted: true });
  }

  const scenario = JSON.parse(session.scenario);
  const history: Turn[] = (() => {
    try { return JSON.parse(session.transcript); } catch { return []; }
  })();
  if (history.length < 2) return badRequest('Encounter has no turns to debrief');

  const config = resolveMedQAgentConfig();
  if (!config.apiKey) return NextResponse.json({ error: 'No AI provider configured' }, { status: 503 });

  const transcript = history
    .map((t) => `${t.role === 'student' ? 'STUDENT' : 'PATIENT'}: ${t.text}`)
    .join('\n')
    .slice(0, 30_000);

  const prompt = `Grade this OSCE encounter.

SCENARIO (ground truth — hidden from the student):
Diagnosis: ${scenario.hiddenProfile.diagnosis}
Checklist: ${scenario.checklist.map((c: string) => `- ${c}`).join('\n')}
Red flags: ${scenario.hiddenProfile.redFlags.join('; ')}
Distractor diagnoses weak students chase: ${scenario.hiddenProfile.distractors.join('; ')}

TRANSCRIPT:
${transcript}

Return ONLY JSON:
{
  "score": 0-100,
  "coverage": ["checklist items the student's questions actually covered"],
  "missed": ["checklist items never covered"],
  "empathy": {"score": 0-10, "evidence": "quote from transcript supporting the score"},
  "redFlags": ["dangerous omissions — things a real patient safety reviewer would flag"],
  "soapNote": {"subjective":"...","objective":"...","assessment":"...","plan":"..."},
  "strengths": ["2-3 things done well"],
  "improvements": ["2-3 concrete coaching points"]
}
Be a rigorous but fair examiner. The soapNote reflects the IDEAL note for this case.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90_000);
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2,
      max_tokens: 1800,
      messages: [
        { role: 'system', content: 'You are a rigorous OSCE examiner. You output only valid JSON.' },
        { role: 'user', content: prompt },
      ],
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) return NextResponse.json({ error: `Debrief LLM failed (${res.status})` }, { status: 502 });
  let content = (await res.json().catch(() => ({}))).choices?.[0]?.message?.content || '';
  content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  let result: any;
  try { result = JSON.parse(content); }
  catch { result = JSON.parse(content.replace(/,\s*([}\]])/g, '$1')); }

  const normalized = {
    score: Math.max(0, Math.min(100, Number(result.score) || 0)),
    coverage: (result.coverage ?? []).slice(0, 12).map(String),
    missed: (result.missed ?? []).slice(0, 12).map(String),
    empathy: {
      score: Math.max(0, Math.min(10, Number(result.empathy?.score) || 5)),
      evidence: String(result.empathy?.evidence || '').slice(0, 400),
    },
    redFlags: (result.redFlags ?? []).slice(0, 8).map(String),
    soapNote: {
      subjective: String(result.soapNote?.subjectual ?? result.soapNote?.subjective ?? '').slice(0, 1200),
      objective: String(result.soapNote?.objective ?? '').slice(0, 1200),
      assessment: String(result.soapNote?.assessment ?? '').slice(0, 1200),
      plan: String(result.soapNote?.plan ?? '').slice(0, 1200),
    },
    strengths: (result.strengths ?? []).slice(0, 5).map(String),
    improvements: (result.improvements ?? []).slice(0, 5).map(String),
  };

  await db.osceSession.update({
    where: { id: session.id },
    data: {
      result: JSON.stringify(normalized),
      status: 'completed',
      durationSec: Math.max(0, Math.round((Date.now() - session.createdAt.getTime()) / 1000)),
    },
  });

  return NextResponse.json({ result: normalized, closed: true });
});
