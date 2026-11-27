import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/admin/settings — Return all settings
export async function GET() {
  try {
    const settings = await db.appSetting.findMany({
      orderBy: { key: 'asc' },
    });
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST /api/admin/settings — Create or update a setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, type, label } = body;

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const setting = await db.appSetting.upsert({
      where: { key },
      update: {
        value: value ?? '',
        type: type ?? 'text',
        label: label ?? '',
      },
      create: {
        key,
        value: value ?? '',
        type: type ?? 'text',
        label: label ?? '',
      },
    });

    return NextResponse.json({ setting });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ error: 'Failed to create/update setting' }, { status: 500 });
  }
}

// DELETE /api/admin/settings — Delete a setting by key (query param)
export async function DELETE(request: NextRequest) {
  try {
    const key = request.nextUrl.searchParams.get('key');
    if (!key) {
      return NextResponse.json({ error: 'Key query parameter is required' }, { status: 400 });
    }

    await db.appSetting.delete({ where: { key } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete setting' }, { status: 500 });
  }
}
