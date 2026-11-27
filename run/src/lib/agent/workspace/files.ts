import fs from 'node:fs';
import path from 'node:path';
import { sandboxRoot } from '../tools/sandbox';

/**
 * Workspace file service — the agent's per-user sandboxed filesystem.
 *
 * Ported from hermes (`lib/workspace.ts`): all operations are jailed to
 * `<workspaces>/<userId>/workspace/` with three layers of protection:
 *   1. NUL-byte rejection (path trickery)
 *   2. Lexical `..` escape rejection (resolve + prefix check)
 *   3. Symlink escape rejection (realpath of the nearest existing ancestor)
 *
 * The deepagents `read_file` FS middleware already reads through the same
 * user root (FilesystemBackend), so files written here are visible to
 * load_skill / read_file flows.
 */

export function workspaceFilesRoot(userId: string): string {
  const root = sandboxRoot(userId);
  fs.mkdirSync(root, { recursive: true });
  return root;
}

/** Resolve a relative path inside the user's workspace, safely. */
export function resolveSafe(userId: string, relPath: string): string {
  if (relPath.includes('\0')) throw new Error('Path contains NUL bytes');

  const root = workspaceFilesRoot(userId);
  const cleaned = relPath.replace(/^[./\\]+/, '').trim();
  const target = path.resolve(root, cleaned);
  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error('Path escapes the workspace');
  }

  // Symlink-escape check: realpath the nearest existing ancestor and make
  // sure it still resolves inside the root.
  let probe = target;
  while (!fs.existsSync(probe)) {
    const parent = path.dirname(probe);
    if (parent === probe) break;
    probe = parent;
  }
  try {
    const real = fs.realpathSync(probe);
    if (real !== root && !real.startsWith(root + path.sep)) {
      throw new Error('Path escapes the workspace (symlink)');
    }
  } catch (error) {
    if ((error as Error).message.includes('escapes')) throw error;
    // realpath failure on the root itself is fine (fresh dir)
  }
  return target;
}

export interface WorkspaceEntry {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  modified?: string;
}

export function listWorkspace(userId: string, relPath = ''): WorkspaceEntry[] {
  const dir = resolveSafe(userId, relPath);
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .map((e) => {
      const full = path.join(dir, e.name);
      const stat = fs.statSync(full);
      return {
        name: e.name,
        path: path.relative(workspaceFilesRoot(userId), full).split(path.sep).join('/'),
        type: e.isDirectory() ? ('dir' as const) : ('file' as const),
        size: e.isFile() ? stat.size : undefined,
        modified: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1))
    .slice(0, 500);
}

const READ_MAX_BYTES = 120_000;

export function readWorkspaceFile(userId: string, relPath: string, maxBytes = READ_MAX_BYTES): string {
  const target = resolveSafe(userId, relPath);
  const stat = fs.statSync(target);
  if (!stat.isFile()) throw new Error('Not a file');
  const fd = fs.openSync(target, 'r');
  try {
    const buf = Buffer.alloc(Math.min(stat.size, maxBytes));
    const bytes = fs.readSync(fd, buf, 0, buf.length, 0);
    const text = buf.subarray(0, bytes).toString('utf8');
    return stat.size > maxBytes ? `${text}\n… (truncated at ${maxBytes} bytes of ${stat.size})` : text;
  } finally {
    fs.closeSync(fd);
  }
}

const WRITE_MAX_BYTES = 512_000;

export function writeWorkspaceFile(userId: string, relPath: string, content: string): { path: string; bytes: number } {
  if (content.length > WRITE_MAX_BYTES) throw new Error(`Content exceeds ${WRITE_MAX_BYTES} bytes`);
  const target = resolveSafe(userId, relPath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
  return { path: relPath, bytes: Buffer.byteLength(content, 'utf8') };
}

export function workspaceExists(userId: string, relPath: string): boolean {
  try {
    resolveSafe(userId, relPath);
    return true;
  } catch {
    return false;
  }
}

export function moveWorkspacePath(userId: string, from: string, to: string): void {
  const src = resolveSafe(userId, from);
  const dst = resolveSafe(userId, to);
  if (!fs.existsSync(src)) throw new Error('Source does not exist');
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.renameSync(src, dst);
}

export function copyWorkspacePath(userId: string, from: string, to: string): void {
  const src = resolveSafe(userId, from);
  const dst = resolveSafe(userId, to);
  if (!fs.existsSync(src)) throw new Error('Source does not exist');
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.cpSync(src, dst, { recursive: true });
}

export function deleteWorkspacePath(userId: string, relPath: string): void {
  const root = workspaceFilesRoot(userId);
  const target = resolveSafe(userId, relPath);
  if (path.resolve(target) === path.resolve(root)) {
    throw new Error('Refusing to delete the workspace root');
  }
  fs.rmSync(target, { recursive: true, force: true });
}
