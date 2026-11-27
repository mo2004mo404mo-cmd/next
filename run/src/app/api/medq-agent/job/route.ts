import { NextRequest, NextResponse } from 'next/server';
import { createAgentJob, runAgentJob } from '@/lib/medq-agent-backend';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { message?: unknown; history?: Array<{ role: string; content: string }>; uiContext?: string };
  if (typeof body.message !== 'string' || !body.message.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }
  const job = createAgentJob(body.message.trim());
  void runAgentJob(job, body.history, body.uiContext);
  return NextResponse.json({ jobId: job.id, status: job.status });
}