/**
 * /api/osce/turn — one encounter turn: the student speaks, the patient replies.
 *
 * POST /api/osce/turn
 *   body: { sessionId, text }
 *   → { reply, ts, turns }
 *
 * The LLM prompt carries the scenario persona + hidden profile but is
 * instructed to stay strictly in character: volunteer information ONLY if
 * the student's question actually asks for it (a weak question gets a
 * vague, deflecting answer; a targeted question unlocks the finding). This
 * is what makes the trainer work — the student must ask well, not guess.
 *
 * Transcript rows are appended to OsceSession.transcript.
 */
import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { resolveMedQAgentConfig } from '@/lib/agent/deep-agent-runtime';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 60;

interface Turn { role: 'student' | 'patient'; text: string; ts: number }

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const { sessionId, text } = await req.json().catch(() => ({})) as {
    sessionId?: string; text?: string;
  };
  if (!sessionId) return badRequest('sessionId required');
  const studentLine = typeof text === 'string' ? text.trim().slice(0, 1000) : '';
  if (!studentLine) return badRequest('text required');

  const session = await db.osceSession.findFirst({
    where: { id: sessionId, userId, status: 'active' },
  });
  if (!session) return NextResponse.json({ error: 'Session not found or completed' }, { status: 404 });

  const config = resolveMedQAgentConfig();
  if (!config.apiKey) return NextResponse.json({ error: 'No AI provider configured' }, { status: 503 });

  const scenario = JSON.parse(session.scenario);
  const history: Turn[] = (() => {
    try { return JSON.parse(session.transcript); } catch { return []; }
  })();

  const persona = scenario.persona;
  const hidden = scenario.hiddenProfile;

  const systemPrompt = `You are a standardized patient in an OSCE practice encounter. STAY IN CHARACTER at all times — you are the patient, never a doctor or tutor.

Patient character:
- Name: ${persona.name}, ${persona.age}yo ${persona.sex}. Affect: ${persona.affect}.
- Chief complaint: ${persona.chiefComplaint}.

Facts about your illness you KNOW but volunteer ONLY IF ASKED DIRECTLY (in natural patient language, not medical jargon):
${hidden.keyFindings.map((f: string) => `- ${f}`).join('\n')}

Serious symptoms you are worried about (mention only if asked about them, or if your character would blurt them out under direct questioning):
${hidden.redFlags.map((f: string) => `- ${f}`).join('\n')}

RULES:
1. Reply ONLY as the patient, in 1-4 sentences of natural speech. Never list symptoms like a textbook.
2. If the student asks a vague question, give a vague answer ("I don't know, it just hurts"). If they ask a specific, well-formed clinical question, reveal the corresponding fact.
3. Never diagnose yourself, never use medical terminology the patient wouldn't know.
4. If asked something irrelevant to your illness, respond naturally ("No, that's never happened to me").
5. Show your affect (${persona.affect}) in tone — but keep it subtle.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);
  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.7,
      max_tokens: 250,
      messages: [
        { role: 'system', content: systemPrompt },
        // Opening statement seeds the persona voice.
        { role: 'assistant', content: persona.openingStatement },
        ...history.slice(-12).map((t) => ({
          role: t.role === 'student' ? 'user' : 'assistant',
          content: t.text,
        })),
        { role: 'user', content: studentLine },
      ],
    }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    return NextResponse.json({ error: `Patient LLM failed (${res.status}): ${errText.slice(0, 140)}` }, { status: 502 });
  }
  const data = await res.json().catch(() => ({}));
  const reply: string = (data.choices?.[0]?.message?.content || '…').trim().slice(0, 600);

  const now = Date.now();
  const updated: Turn[] = [
    ...history,
    { role: 'student', text: studentLine, ts: now },
    { role: 'patient', text: reply, ts: now + 1 },
  ];

  await db.osceSession.update({
    where: { id: session.id },
    data: {
      transcript: JSON.stringify(updated),
      durationSec: Math.max(0, Math.round((now - session.createdAt.getTime()) / 1000)),
    },
  });

  return NextResponse.json({ reply, ts: now + 1, turns: updated.length });
});
