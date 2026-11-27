import { NextRequest, NextResponse } from 'next/server';
import { seedAdCampaigns } from '@/lib/freemium-store';

export async function POST() {
  try {
    await seedAdCampaigns();
    return NextResponse.json({ success: true, message: 'Ad campaigns seeded' });
  } catch (error) {
    console.error('Seed POST error:', error);
    return NextResponse.json({ error: 'Failed to seed campaigns' }, { status: 500 });
  }
}
