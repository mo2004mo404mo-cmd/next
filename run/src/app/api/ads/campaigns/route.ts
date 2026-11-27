import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdCampaign } from '@/lib/freemium-store';

// GET /api/ads/campaigns — List all campaigns or get by placement
export async function GET(request: NextRequest) {
  try {
    const placement = request.nextUrl.searchParams.get('placement');
    const all = request.nextUrl.searchParams.get('all');

    // If "all" param, return all campaigns for admin
    if (all === 'true') {
      const campaigns = await db.adCampaign.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ campaigns });
    }

    // If placement, return matching active campaign
    if (placement) {
      const campaign = await getAdCampaign(placement);
      return NextResponse.json({ campaign });
    }

    // Default: return all campaigns
    const campaigns = await db.adCampaign.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Campaigns GET error:', error);
    return NextResponse.json({ campaigns: [], campaign: null });
  }
}

// POST /api/ads/campaigns — Create a new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      advertiser,
      adType,
      placement,
      status,
      cpm,
      cpc,
      targetUrl,
      imageUrl,
      title,
      subtitle,
      ctaText,
      priority,
      startDate,
      endDate,
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'Campaign name is required' }, { status: 400 });
    }

    const campaign = await db.adCampaign.create({
      data: {
        name: name || '',
        advertiser: advertiser || '',
        adType: adType || 'banner',
        placement: placement || '',
        status: status || 'active',
        cpm: cpm ?? 0,
        cpc: cpc ?? 0,
        targetUrl: targetUrl || '',
        imageUrl: imageUrl || '',
        title: title || '',
        subtitle: subtitle || '',
        ctaText: ctaText || '',
        priority: priority ?? 0,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error('Campaign POST error:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
