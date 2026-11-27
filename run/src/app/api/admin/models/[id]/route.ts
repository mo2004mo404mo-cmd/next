import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';

// GET: Get a specific custom model
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const model = await db.customModel.findUnique({ where: { id } });
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
    return NextResponse.json({ model });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch model' }, { status: 500 });
  }
}

// PUT: Update a custom model
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const model = await db.customModel.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        color: body.color,
        tags: body.tags,
        isPublic: body.isPublic,
      },
    });

    return NextResponse.json({ model });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update model' }, { status: 500 });
  }
}

// DELETE: Delete a custom model and its file
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const model = await db.customModel.findUnique({ where: { id } });
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    // Delete file from disk
    const fullPath = path.join(process.cwd(), model.filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // Delete from database
    await db.customModel.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete model' }, { status: 500 });
  }
}
