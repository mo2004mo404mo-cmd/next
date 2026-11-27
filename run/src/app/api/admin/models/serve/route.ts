import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';

// GET: Serve a custom model file by model ID
export async function GET(request: NextRequest) {
  const modelId = request.nextUrl.searchParams.get('id');

  if (!modelId) {
    return NextResponse.json({ error: 'Model ID required' }, { status: 400 });
  }

  try {
    const model = await db.customModel.findUnique({ where: { id: modelId } });
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    const fullPath = path.join(process.cwd(), model.filePath);
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Security check
    const resolved = path.resolve(fullPath);
    if (!resolved.startsWith(path.resolve(process.cwd()))) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const content = fs.readFileSync(fullPath);

    const contentTypes: Record<string, string> = {
      obj: 'text/plain',
      stl: 'application/octet-stream',
      glb: 'model/gltf-binary',
    };

    return new NextResponse(content, {
      headers: {
        'Content-Type': contentTypes[model.fileType] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to serve model' }, { status: 500 });
  }
}
