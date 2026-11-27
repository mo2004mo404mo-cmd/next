import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { callChat } from '@/lib/ai/unified-llm';

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { messages } = await req.json();
    if (!messages || typeof messages !== 'string' || !messages.trim()) {
      return NextResponse.json({ error: 'Messages text is required' }, { status: 400 });
    }

    const summary = await callChat(req, {
      stage: 'chat-adapter',
      system: `You are a medical study chat summarizer. Analyze the following chat messages and provide a concise summary with:
1. Main topics discussed (as a brief list)
2. Any action items or tasks mentioned
3. Key takeaways

Keep the summary brief (3-5 sentences max) and focused on medical/study content. Use clear, professional language.`,
      prompt: `Summarize this chat conversation:\n\n${messages}`,
    });

    return NextResponse.json({ summary: summary || 'Unable to generate summary.' });
  } catch (error) {
    console.error('Chat summary error:', error);
    return NextResponse.json({ error: 'Summary generation failed' }, { status: 500 });
  }
}
