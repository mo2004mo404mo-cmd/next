import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { execSandboxed, gitEnv, sandboxRoot } from './sandbox';

/**
 * Git tools — version control inside the user's workspace.
 *
 * Ported from hermes (`tools/git.ts`): nine operations executed as argv
 * arrays through the sandbox (never shell-interpolated) with a hardened git
 * environment (no global/system config, no terminal prompts, fixed agent
 * identity). Read-only ops are allowed; commits/checkouts ask; push asks
 * separately under its own git.push capability.
 */

interface GitSpec {
  name: string;
  description: string;
  schema: z.ZodObject<Record<string, z.ZodTypeAny>>;
  build: (args: Record<string, unknown>) => { argv: string[]; timeoutMs?: number };
}

function runGit(ctx: MedQToolContext, argv: string[], timeoutMs = 30_000) {
  const home = sandboxRoot(ctx.userId);
  return execSandboxed({
    userId: ctx.userId,
    argv: ['git', ...argv],
    env: gitEnv(home),
    timeoutMs,
  });
}

const gitSpecs: GitSpec[] = [
  {
    name: 'git_status',
    description: 'Show the working-tree status of the user workspace (branch + changed files).',
    schema: z.object({}),
    build: () => ({ argv: ['status', '--porcelain=v1', '-b'] }),
  },
  {
    name: 'git_diff',
    description: 'Show diff statistics of uncommitted changes against HEAD.',
    schema: z.object({ path: z.string().max(300).optional().describe('Limit the diff to this path') }),
    build: (args) => ({ argv: ['diff', '--stat', 'HEAD', ...(typeof args.path === 'string' && args.path ? ['--', args.path] : [])] }),
  },
  {
    name: 'git_log',
    description: 'List recent commits (oneline).',
    schema: z.object({ limit: z.number().int().min(1).max(50).optional().describe('Max commits (default 10)') }),
    build: (args) => ({ argv: ['log', '--oneline', '-n', String(Math.min(Number(args.limit) || 10, 50))] }),
  },
  {
    name: 'git_branch',
    description: 'List local branches.',
    schema: z.object({}),
    build: () => ({ argv: ['branch', '--list'] }),
  },
  {
    name: 'git_checkout',
    description: 'Switch to an existing branch.',
    schema: z.object({ branch: z.string().min(1).max(200) }),
    build: (args) => ({ argv: ['checkout', String(args.branch)] }),
  },
  {
    name: 'git_commit',
    description: 'Stage all changes and create a commit with the given message.',
    schema: z.object({ message: z.string().min(3).max(500) }),
    build: (args) => ({ argv: ['add', '-A'] }),
  },
  {
    name: 'git_pull',
    description: 'Pull from the tracked remote (fast-forward only).',
    schema: z.object({ remote: z.string().max(200).optional().describe('Remote name (default origin)') }),
    build: (args) => ({ argv: ['pull', '--ff-only', typeof args.remote === 'string' && args.remote ? args.remote : 'origin'] }),
  },
  {
    name: 'git_push',
    description: 'Push a branch to its remote (user approval required).',
    schema: z.object({
      remote: z.string().max(200).optional().describe('Remote name (default origin)'),
      branch: z.string().max(200).optional().describe('Branch to push (default current)'),
    }),
    build: (args) => ({
      argv: ['push', typeof args.remote === 'string' && args.remote ? args.remote : 'origin', ...(typeof args.branch === 'string' && args.branch ? [args.branch] : [])],
      timeoutMs: 120_000,
    }),
  },
  {
    name: 'git_init',
    description: 'Initialize a git repository in the user workspace.',
    schema: z.object({}),
    build: () => ({ argv: ['init'] }),
  },
];

export function createGitTools(ctx: MedQToolContext) {
  const tools: DynamicStructuredTool[] = [];

  for (const spec of gitSpecs) {
    tools.push(new DynamicStructuredTool({
      name: spec.name,
      description: spec.description,
      schema: spec.schema as never,
      func: async (args: Record<string, unknown>) => {
        try {
          const { argv, timeoutMs } = spec.build(args ?? {});
          // git_commit is a two-step op: add -A then commit
          if (spec.name === 'git_commit') {
            const addResult = await runGit(ctx, argv, timeoutMs);
            if (addResult.exitCode !== 0) {
              return JSON.stringify({ ok: false, step: 'git add', stderr: addResult.stderr.slice(0, 2000) });
            }
            const commitResult = await runGit(ctx, ['commit', '-m', String((args as { message?: string }).message ?? 'update')], timeoutMs);
            return JSON.stringify({
              ok: commitResult.exitCode === 0,
              exitCode: commitResult.exitCode,
              stdout: commitResult.stdout.slice(0, 4000),
              stderr: commitResult.stderr.slice(0, 2000),
            });
          }
          const result = await runGit(ctx, argv, timeoutMs);
          return JSON.stringify({
            ok: result.exitCode === 0,
            exitCode: result.exitCode,
            stdout: result.stdout.slice(0, 12_000),
            stderr: result.stderr.slice(0, 4_000),
            durationMs: result.durationMs,
          });
        } catch (error) {
          return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
        }
      },
    }));
  }

  return tools;
}

export const GIT_TOOL_NAMES = gitSpecs.map((s) => s.name);
