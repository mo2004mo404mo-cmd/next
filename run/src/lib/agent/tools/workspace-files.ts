import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import {
  listWorkspace,
  readWorkspaceFile,
  writeWorkspaceFile,
  workspaceExists,
  moveWorkspacePath,
  copyWorkspacePath,
  deleteWorkspacePath,
} from '../workspace/files';

/**
 * Workspace file tools — the agent's managed file operations, ported from
 * hermes (`tools/workspace.ts`): list / read / write / exists / move / copy /
 * delete over the per-user sandbox root. Every path is jailed and checked
 * for traversal + symlink escapes (see workspace/files.ts). Deletion is
 * HITL-gated (filesystem.delete).
 */

export function createWorkspaceTools(ctx: MedQToolContext) {
  const listTool = new DynamicStructuredTool({
    name: 'workspace_list',
    description: 'List files and folders in the user workspace (optionally a subfolder). Paths returned are relative to the workspace root.',
    schema: z.object({ path: z.string().max(500).optional().describe('Subfolder path, default the workspace root') }),
    func: async ({ path: relPath }) => {
      try {
        const entries = listWorkspace(ctx.userId, relPath ?? '');
        return JSON.stringify({ ok: true, entries });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const readTool = new DynamicStructuredTool({
    name: 'workspace_read',
    description: 'Read a text file from the user workspace (up to 120KB). Use for files you or the user placed there earlier.',
    schema: z.object({ path: z.string().min(1).max(500).describe('File path relative to the workspace root') }),
    func: async ({ path: relPath }) => {
      try {
        const content = readWorkspaceFile(ctx.userId, relPath);
        return JSON.stringify({ ok: true, path: relPath, content: content.slice(0, 60_000) });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const writeTool = new DynamicStructuredTool({
    name: 'workspace_write',
    description: 'Write (or overwrite) a text file in the user workspace. Folders are created as needed. Use for saving scripts, notes, datasets, and drafts the user should keep.',
    schema: z.object({
      path: z.string().min(1).max(500).describe('File path relative to the workspace root'),
      content: z.string().min(1).max(512_000).describe('Full file content'),
    }),
    func: async ({ path: relPath, content }) => {
      try {
        const result = writeWorkspaceFile(ctx.userId, relPath, content);
        return JSON.stringify({ ok: true, ...result });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const existsTool = new DynamicStructuredTool({
    name: 'workspace_exists',
    description: 'Check whether a file or folder exists in the user workspace.',
    schema: z.object({ path: z.string().min(1).max(500) }),
    func: async ({ path: relPath }) => {
      try {
        return JSON.stringify({ ok: true, exists: workspaceExists(ctx.userId, relPath) });
      } catch (error) {
        return JSON.stringify({ ok: true, exists: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const moveTool = new DynamicStructuredTool({
    name: 'workspace_move',
    description: 'Move or rename a file/folder inside the user workspace.',
    schema: z.object({
      from: z.string().min(1).max(500),
      to: z.string().min(1).max(500),
    }),
    func: async ({ from, to }) => {
      try {
        moveWorkspacePath(ctx.userId, from, to);
        return JSON.stringify({ ok: true, from, to });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const copyTool = new DynamicStructuredTool({
    name: 'workspace_copy',
    description: 'Copy a file/folder to a new location inside the user workspace.',
    schema: z.object({
      from: z.string().min(1).max(500),
      to: z.string().min(1).max(500),
    }),
    func: async ({ from, to }) => {
      try {
        copyWorkspacePath(ctx.userId, from, to);
        return JSON.stringify({ ok: true, from, to });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const deleteTool = new DynamicStructuredTool({
    name: 'workspace_delete',
    description: 'Delete a file or folder in the user workspace (recursive, permanent — user approval required).',
    schema: z.object({ path: z.string().min(1).max(500) }),
    func: async ({ path: relPath }) => {
      try {
        deleteWorkspacePath(ctx.userId, relPath);
        return JSON.stringify({ ok: true, deleted: relPath });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  return [listTool, readTool, writeTool, existsTool, moveTool, copyTool, deleteTool];
}

export const WORKSPACE_TOOL_NAMES = [
  'workspace_list',
  'workspace_read',
  'workspace_write',
  'workspace_exists',
  'workspace_move',
  'workspace_copy',
  'workspace_delete',
] as const;
