import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/ads/campaigns/[id] — Get a specific campaign
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaign = await db.adCampaign.findUnique({ where: { id } });
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    return NextResponse.json({ campaign });
  } catch (error) {
    console.error('Campaign GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
  }
}

// PUT /api/ads/campaigns/[id] — Update a specific campaign
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.adCampaign.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const campaign = await db.adCampaign.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.advertiser !== undefined && { advertiser: body.advertiser }),
        ...(body.adType !== undefined && { adType: body.adType }),
        ...(body.placement !== undefined && { placement: body.placement }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.cpm !== undefined && { cpm: body.cpm }),
        ...(body.cpc !== undefined && { cpc: body.cpc }),
        ...(body.targetUrl !== undefined && { targetUrl: body.targetUrl }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.subtitle !== undefined && { subtitle: body.subtitle }),
        ...(body.ctaText !== undefined && { ctaText: body.ctaText }),
        ...(body.priority !== undefined && { priority: body.priority }),
        ...(body.startDate !== undefined && { startDate: new Date(body.startDate) }),
        ...(body.endDate !== undefined && { endDate: body.endDate ? new Date(body.endDate) : null }),
      },
    });

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error('Campaign PUT error:', error);
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}

// DELETE /api/ads/campaigns/[id] — Delete a specific campaign
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.adCampaign.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Campaign DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 });
  }
}
