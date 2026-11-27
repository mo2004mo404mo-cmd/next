import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';
import { callChat } from '@/lib/ai/unified-llm';

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { text, targetLang } = await req.json();
    if (!text) return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    const translation = await callChat(req, {
      stage: 'chat-adapter',
      system: `You are a translator. Translate the following text to ${targetLang || 'English'}. Return ONLY the translation, nothing else.`,
      prompt: text,
    });
    return NextResponse.json({ translation: translation || text });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
