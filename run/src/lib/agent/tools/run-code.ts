import vm from 'node:vm';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { execSandboxed } from './sandbox';
import { writeWorkspaceFile } from '../workspace/files';

/**
 * run_code — sandboxed code execution for verified computation.
 *
 * JavaScript runs in a fresh V8 context (node:vm) with a strict global
 * whitelist — no eval/require/process/network, hard timeout, output caps.
 *
 * Python and Bash (hermes-parity) run as ephemeral scripts inside the user's
 * process sandbox: the code is written to `scripts/exec-<ts>.<ext>` in the
 * workspace, then executed (`python3` / `bash`) with a scrubbed environment,
 * cwd jail, SIGKILL timeout, and output caps. Python is the tool for
 * statistics the VM cannot do (scipy-style math via pure-python fallbacks,
 * table wrangling); bash covers tiny shell pipelines.
 */

const CODE_MAX_CHARS = 20_000;
const OUTPUT_MAX_CHARS = 8_000;
const TIMEOUT_MS = 15_000;
const MAX_LOG_LINES = 200;

interface SandboxResult {
  ok: boolean;
  result?: string;
  logs: string[];
  error?: string;
  timedOut?: boolean;
}

/**
 * Execute untrusted JavaScript in the hardened VM (exported for the
 * calculator / process_json tools — compare-and-integrate-4; shared so ALL
 * model-supplied JS evaluation goes through the same whitelist jail).
 */
export function executeVmSandbox(code: string, extraGlobals: Record<string, unknown> = {}): SandboxResult {
  return executeInSandbox(code, extraGlobals);
}

function executeInSandbox(code: string, extraGlobals: Record<string, unknown> = {}): SandboxResult {
  const logs: string[] = [];
  const pushLog = (level: 'log' | 'warn' | 'error', args: unknown[]) => {
    if (logs.length >= MAX_LOG_LINES) return;
    const rendered = args
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      })
      .join(' ');
    logs.push(level === 'error' ? `[error] ${rendered}` : level === 'warn' ? `[warn] ${rendered}` : rendered);
  };

  const sandbox: Record<string, unknown> = {
    // Whitelisted globals only — no process, require, fetch, timers, Buffer
    console: {
      log: (...args: unknown[]) => pushLog('log', args),
      warn: (...args: unknown[]) => pushLog('warn', args),
      error: (...args: unknown[]) => pushLog('error', args),
      info: (...args: unknown[]) => pushLog('log', args),
    },
    Math,
    JSON,
    Date,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Map,
    Set,
    RegExp,
    Error,
    TypeError,
    RangeError,
    isNaN,
    isFinite,
    parseInt,
    parseFloat,
    encodeURIComponent,
    decodeURIComponent,
  };
  sandbox.globalThis = sandbox;
  for (const [key, value] of Object.entries(extraGlobals)) sandbox[key] = value;

  const context = vm.createContext(sandbox, {
    codeGeneration: { strings: false, wasm: false }, // no eval / new Function
  });

  try {
    const script = new vm.Script(`(function(){\n${code}\n})()`);
    const raw = script.runInContext(context, { timeout: TIMEOUT_MS, breakOnSigint: true });
    let result: string | undefined;
    if (raw !== undefined) {
      try {
        result = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2);
      } catch {
        result = String(raw);
      }
    }
    return { ok: true, result, logs };
  } catch (error) {
    const timedOut = error instanceof Error && /timed out|Script execution/i.test(error.message);
    return {
      ok: false,
      logs,
      error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
      timedOut,
    };
  }
}

/** Execute python/bash as an ephemeral workspace script through the sandbox. */
async function executeScript(ctx: MedQToolContext, language: 'python' | 'bash', code: string): Promise<Record<string, unknown>> {
  const ext = language === 'python' ? 'py' : 'sh';
  const scriptRel = `scripts/exec-${Date.now()}.${ext}`;
  writeWorkspaceFile(ctx.userId, scriptRel, code);

  const argv = language === 'python'
    ? ['python3', scriptRel]
    : ['bash', scriptRel];

  const result = await execSandboxed({
    userId: ctx.userId,
    argv,
    timeoutMs: 60_000,
  });

  return {
    ok: result.exitCode === 0,
    language,
    script: scriptRel,
    exitCode: result.exitCode,
    stdout: result.stdout.slice(0, OUTPUT_MAX_CHARS),
    stderr: result.stderr.slice(0, OUTPUT_MAX_CHARS / 2),
    timedOut: result.timedOut,
    durationMs: result.durationMs,
  };
}

export function createRunCodeTool(ctx?: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'run_code',
    description:
      'Run sandboxed code to compute an exact answer. JavaScript (default): pure computation only — dose calculations, unit conversions, biostatistics (sensitivity/specificity/NNT, confidence intervals). End with `return value;`, log with console.log; no network, filesystem, or imports. Python: ephemeral script in the user workspace — use for statistics, algorithms, or text/table processing beyond plain arithmetic. Bash: tiny shell pipelines over workspace files. Always use this instead of mental math for numeric medical calculations.',
    schema: z.object({
      code: z.string().min(1).max(CODE_MAX_CHARS).describe('The code to execute'),
      language: z.enum(['javascript', 'python', 'bash']).optional().describe('Execution language (default javascript)'),
      purpose: z.string().min(3).describe('One line: what this computation answers'),
    }),
    func: async ({ code, language, purpose }) => {
      const started = Date.now();

      // Python / bash need a user context for the workspace jail
      if ((language === 'python' || language === 'bash') && ctx) {
        try {
          const payload = await executeScript(ctx, language, code);
          return JSON.stringify({ purpose, ...payload }, null, 0);
        } catch (error) {
          return JSON.stringify({ purpose, ok: false, error: error instanceof Error ? error.message : String(error) }, null, 0);
        }
      }

      const effectiveLanguage = language ?? 'javascript';
      if (effectiveLanguage !== 'javascript') {
        return JSON.stringify({
          purpose,
          ok: false,
          error: `${effectiveLanguage} execution requires a user workspace; use JavaScript instead.`,
        }, null, 0);
      }

      const outcome = executeInSandbox(code);
      const durationMs = Date.now() - started;
      const payload = {
        purpose,
        ok: outcome.ok,
        result: outcome.result?.slice(0, OUTPUT_MAX_CHARS),
        logs: outcome.logs.slice(0, 50),
        error: outcome.error,
        timedOut: outcome.timedOut,
        durationMs,
      };
      return JSON.stringify(payload, null, 0);
    },
  });
}
