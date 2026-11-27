import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'models');
const BUILTIN_OVERRIDES_FILE = path.join(process.cwd(), 'data', 'builtin-model-overrides.json');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Read built-in model overrides
function getBuiltInOverrides(): Record<string, { name?: string; category?: string; tags?: string }> {
  try {
    if (fs.existsSync(BUILTIN_OVERRIDES_FILE)) {
      return JSON.parse(fs.readFileSync(BUILTIN_OVERRIDES_FILE, 'utf-8'));
    }
  } catch {}
  return {};
}

// Write built-in model overrides
function saveBuiltInOverrides(overrides: Record<string, { name?: string; category?: string; tags?: string }>) {
  fs.writeFileSync(BUILTIN_OVERRIDES_FILE, JSON.stringify(overrides, null, 2));
}

// GET: List all custom models
export async function GET(request: NextRequest) {
  try {
    const models = await db.customModel.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ models });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}

// POST: Create a new custom model with file upload
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string || '';
    const description = formData.get('description') as string || '';
    const category = formData.get('category') as string || 'custom';
    const color = formData.get('color') as string || '#c0c0c0';
    const tags = formData.get('tags') as string || '[]';
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Determine file type
    const ext = path.extname(file.name).toLowerCase().replace('.', '');
    if (!['obj', 'stl', 'glb'].includes(ext)) {
      return NextResponse.json({ error: 'Unsupported file type. Use OBJ, STL, or GLB.' }, { status: 400 });
    }

    // Generate unique filename
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const storedFileName = `${uniqueId}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, storedFileName);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Save to database
    const model = await db.customModel.create({
      data: {
        name: name || file.name,
        description,
        category,
        fileName: file.name,
        filePath: `uploads/models/${storedFileName}`,
        fileType: ext,
        fileSize: file.size,
        color,
        tags,
        createdBy: 'admin',
      },
    });

    return NextResponse.json({ model });
  } catch (err) {
    console.error('Model upload error:', err);
    return NextResponse.json({ error: 'Failed to create model' }, { status: 500 });
  }
}

// PATCH: Update a built-in model's override properties (name, category, tags)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, fjId, name, category, tags, isBuiltIn } = body;

    if (isBuiltIn) {
      // For built-in models, we save overrides to a JSON file
      const overrides = getBuiltInOverrides();
      const key = fjId || id;
      overrides[key] = {
        ...(name && { name }),
        ...(category && { category }),
        ...(tags && { tags }),
      };
      saveBuiltInOverrides(overrides);
      return NextResponse.json({ success: true, override: overrides[key] });
    }

    // For custom models, update the database
    if (!id) {
      return NextResponse.json({ error: 'Model ID required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;

    const model = await db.customModel.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ model });
  } catch (err) {
    console.error('Model update error:', err);
    return NextResponse.json({ error: 'Failed to update model' }, { status: 500 });
  }
}
