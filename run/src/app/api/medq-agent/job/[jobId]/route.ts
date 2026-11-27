import { NextRequest, NextResponse } from 'next/server';
import { getAgentJob } from '@/lib/medq-agent-backend';

export const runtime = 'nodejs';

export async function GET(request: NextRequest, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = getAgentJob(jobId);
  if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  const since = Number(request.nextUrl.searchParams.get('since') || 0);
  return NextResponse.json({ ...job, events: job.events.filter((event) => event.ts > since), allEvents: job.events, since: job.updatedAt });
}