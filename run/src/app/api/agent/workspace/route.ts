/**
 * Workspace files API — the REST layer behind the assistant's Files drawer.
 *
 * GET     /api/agent/workspace?path=<dir>    — list a directory (jailed)
 * GET     /api/agent/workspace?path=<file>   — read a file (text, capped)
 * DELETE  /api/agent/workspace?path=<file>   — delete a file/dir in the jail
 *
 * The same jail the agent's file tools run in (resolveSafe: NUL/lexical/
 * symlink checks), so the drawer shows EXACTLY what the agent sees.
 */
import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { audit } from '@/lib/agent/audit';
import { listWorkspace, readWorkspaceFile, deleteWorkspacePath } from '@/lib/agent/workspace/files';
import fs from 'node:fs';
import path from 'node:path';
import { workspaceFilesRoot } from '@/lib/agent/workspace/files';

export const runtime = 'nodejs';

export const GET = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const relPath = (new URL(req.url).searchParams.get('path') ?? '').slice(0, 500);
  try {
    const root = workspaceFilesRoot(userId);
    const target = path.resolve(root, relPath.replace(/^[./\\]+/, ''));
    if (target !== root && !target.startsWith(root + path.sep)) {
      return badRequest('Path escapes the workspace');
    }
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      return NextResponse.json({ type: 'dir', path: relPath, entries: listWorkspace(userId, relPath) });
    }
    return NextResponse.json({
      type: 'file',
      path: relPath,
      size: stat.size,
      modified: stat.mtime.toISOString(),
      content: readWorkspaceFile(userId, relPath),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: message.includes('escapes') ? 400 : 404 });
  }
});

export const DELETE = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized();

  const relPath = (new URL(req.url).searchParams.get('path') ?? '').slice(0, 500);
  if (!relPath || relPath === '.' || relPath === '/') return badRequest('path is required');
  try {
    deleteWorkspacePath(userId, relPath);
    await audit({ userId, action: 'workspace.delete', target: relPath });
    return NextResponse.json({ deleted: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
});
