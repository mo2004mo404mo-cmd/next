import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { execSandboxed } from './sandbox';
import { audit } from '../audit';

/**
 * terminal — bash execution in the user's sandboxed workspace.
 *
 * Ported from hermes (`tools/terminal.ts`, capability terminal.execute):
 * `bash -lc <command>` with a per-user cwd jail, scrubbed env, SIGKILL
 * timeout, and 256KB output caps. HITL-gated (ask by default) because it is
 * real process execution — the approval card shows the exact command.
 */

const RESULT_MAX_CHARS = 20_000;

export function createTerminalTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'terminal',
    description:
      'Run a bash command inside the user workspace sandbox (cwd = the workspace root; files persist between calls). Use for multi-step shell work: running python scripts, installing nothing, git operations are better via git_* tools, file pipes, and quick system checks. Commands are subject to a timeout and output cap; the user approves each run.',
    schema: z.object({
      command: z.string().min(1).max(8_000).describe('The bash command line to execute'),
      timeoutSeconds: z.number().int().min(1).max(120).optional().describe('Timeout in seconds (default 60, max 120)'),
      purpose: z.string().min(3).describe('One line: why this command is needed'),
    }),
    func: async ({ command, timeoutSeconds, purpose }) => {
      const result = await execSandboxed({
        userId: ctx.userId,
        argv: ['bash', '-lc', command],
        timeoutMs: (timeoutSeconds ?? 60) * 1000,
      });
      if (ctx.userId && ctx.userId !== 'guest') {
        void audit({
          userId: ctx.userId,
          action: 'tool.execute',
          target: 'terminal',
          detail: { command: command.slice(0, 120) },
        }).catch(() => {});
      }
      const payload = {
        purpose,
        command,
        exitCode: result.exitCode,
        timedOut: result.timedOut,
        durationMs: result.durationMs,
        stdout: result.stdout.slice(0, RESULT_MAX_CHARS),
        stderr: result.stderr.slice(0, RESULT_MAX_CHARS / 2),
      };
      return JSON.stringify(payload, null, 0);
    },
  });
}
