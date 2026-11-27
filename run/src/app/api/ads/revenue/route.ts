import { NextResponse } from 'next/server';
import { getRevenueStats } from '@/lib/freemium-store';

export async function GET() {
  try {
    const stats = await getRevenueStats(30);
    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Revenue GET error:', error);
    return NextResponse.json({ stats: [] });
  }
}
