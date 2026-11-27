import { NextRequest, NextResponse } from 'next/server';
import { trackAdClick } from '@/lib/freemium-store';

export async function POST(request: NextRequest) {
  try {
    const { impressionId } = await request.json();
    if (!impressionId) return NextResponse.json({ error: 'impressionId required' }, { status: 400 });
    const impression = await trackAdClick(impressionId);
    return NextResponse.json(impression);
  } catch (error) {
    console.error('Click POST error:', error);
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 });
  }
}
