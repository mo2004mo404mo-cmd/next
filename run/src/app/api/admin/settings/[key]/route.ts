import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PUT /api/admin/settings/[key] — Update a specific setting
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const body = await request.json();
    const { value, type, label } = body;

    const existing = await db.appSetting.findUnique({ where: { key } });
    if (!existing) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
    }

    const setting = await db.appSetting.update({
      where: { key },
      data: {
        ...(value !== undefined && { value }),
        ...(type !== undefined && { type }),
        ...(label !== undefined && { label }),
      },
    });

    return NextResponse.json({ setting });
  } catch (error) {
    console.error('Setting PUT error:', error);
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 });
  }
}

// DELETE /api/admin/settings/[key] — Delete a specific setting
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;

    await db.appSetting.delete({ where: { key } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Setting DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete setting' }, { status: 500 });
  }
}
