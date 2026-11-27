import type { DynamicStructuredTool } from '@langchain/core/tools';
import { db } from '../../db';
import type { MedQToolContext } from '../types';
import { maybeOffload } from './offload';

/**
 * Tool-execution telemetry — deep-agent-platform parity
 * (compare-and-integrate-4). Wraps every builtin tool's execute function so
 * each invocation persists a best-effort AgentToolExecution row (status,
 * latency, capped input/output). Never throws and never alters the tool's
 * result — telemetry is strictly observational (the reference platform's
 * ToolExecution rows power its usage dashboard; ours power the Usage tab's
 * tool-stats rollup).
 */

const INPUT_CAP = 4_000;
const OUTPUT_CAP = 4_000;

export function withExecutionTelemetry(tool: DynamicStructuredTool, ctx: MedQToolContext): DynamicStructuredTool {
  const original = tool.func.bind(tool);
  const name = tool.name;
  const userId = ctx.userId;
  const threadId = ctx.threadId;

  const wrapped = async (input: unknown, runManager?: unknown, config?: unknown, ...rest: unknown[]) => {
    const startedAt = Date.now();
    let inputSnapshot: string | null = null;
    try {
      inputSnapshot = JSON.stringify(input)?.slice(0, INPUT_CAP) ?? null;
    } catch {
      inputSnapshot = null;
    }
    let rowId: string | null = null;
    try {
      const row = await db.agentToolExecution.create({
        data: { userId, ...(threadId ? { threadId } : {}), toolName: name, status: 'running', inputJson: inputSnapshot },
      });
      rowId = row.id;
    } catch {
      // Telemetry must never break the tool.
    }

    try {
      const output = (await (original as (...args: unknown[]) => Promise<string>)(input, runManager, config, ...rest)) as string;
      // Context protection at the choke point: huge textual results (>8K
      // chars) are offloaded to a downloadable artifact and the value handed
      // to the model becomes a preview + pointer (docs' offloading pattern).
      // Best-effort — maybeOffload returns the original on any failure.
      const modelValue = typeof output === 'string' ? await maybeOffload(ctx, name, output) : output;
      if (rowId) {
        void db.agentToolExecution
          .update({
            where: { id: rowId },
            data: {
              status: 'completed',
              latencyMs: Date.now() - startedAt,
              outputJson: typeof output === 'string' ? output.slice(0, OUTPUT_CAP) : null,
            },
          })
          .catch(() => {});
      }
      return modelValue;
    } catch (error) {
      if (rowId) {
        void db.agentToolExecution
          .update({
            where: { id: rowId },
            data: {
              status: 'failed',
              latencyMs: Date.now() - startedAt,
              error: (error instanceof Error ? error.message : String(error)).slice(0, 2_000),
            },
          })
          .catch(() => {});
      }
      throw error;
    }
  };

  // Preserve tool identity; only swap the execution path.
  const clone = Object.create(tool);
  clone.func = wrapped;
  return clone as DynamicStructuredTool;
}
