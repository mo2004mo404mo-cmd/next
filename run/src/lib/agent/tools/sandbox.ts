import { spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { agentWorkspaceRoot } from '../skills/workspace';
import { createLogger } from '../../logger';

const log = createLogger('AgentSandbox');

/**
 * Sandbox backend — isolated process execution for terminal / git / python.
 *
 * Ported from hermes (`lib/tools/sandbox.ts` + `mini-services/agent-worker`),
 * adapted to MedQ's per-user isolation model:
 *
 *   - Default backend is LOCAL-RESTRICTED: spawn with a per-user cwd jail
 *     (`<agent-workspaces>/<userId>/workspace`), scrubbed environment (no
 *     secrets, no Next internals), SIGKILL on timeout, hard output caps.
 *   - REMOTE backend (optional, production path): POSTs to an HTTP sandbox
 *     sidecar when MEDQ_SANDBOX_URL is set — same contract as hermes'
 *     agent-worker (`POST /exec` NDJSON stdout/stderr/exit).
 *
 * Process-level isolation is NOT VM-level; dangerous operations remain behind
 * HITL gates (see permissions.ts: terminal.execute, git.commit, git.push).
 */

export interface ExecOptions {
  /** MedQ user id — the execution root is jailed to this user's workspace. */
  userId: string;
  /** argv to execute (never shell-interpolated for the remote/local spawn path). */
  argv: string[];
  /** Working directory RELATIVE to the user's workspace root (default: ''). */
  cwdRel?: string;
  /** Hard timeout in ms (default 60_000, capped at 120_000). */
  timeoutMs?: number;
  /** Extra environment entries (merged over the scrubbed base). */
  env?: Record<string, string>;
}

export interface ExecResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  durationMs: number;
  killed: boolean;
}

export const MAX_OUTPUT_BYTES = 256_000;
export const MAX_TIMEOUT_MS = 120_000;
const DEFAULT_TIMEOUT_MS = 60_000;

/** The per-user sandbox root: <workspaces>/<userId>/workspace. */
export function sandboxRoot(userId: string): string {
  return path.join(agentWorkspaceRoot(userId), 'workspace');
}

/** Scrubbed environment — no secrets, no Next.js internals, no DATABASE_URL. */
function scrubbedEnv(home: string): Record<string, string> {
  return {
    PATH: '/usr/local/bin:/usr/bin:/bin',
    HOME: home,
    LANG: 'C.UTF-8',
    TERM: 'dumb',
  };
}

/** Resolve + validate a cwd relative to the jail root (mkdir on demand). */
function resolveJailCwd(userId: string, cwdRel?: string): string {
  const root = sandboxRoot(userId);
  const rel = (cwdRel ?? '').replace(/^[/\\]+/, '');
  const target = path.resolve(root, rel);
  if (target !== root && !target.startsWith(root + path.sep)) {
    throw new Error('cwd escapes the workspace jail');
  }
  fs.mkdirSync(target, { recursive: true });
  return target;
}

/** Local-restricted backend: in-process spawn, cwd jail, env scrub, caps. */
export function execLocalRestricted(opts: ExecOptions): Promise<ExecResult> {
  const cwd = resolveJailCwd(opts.userId, opts.cwdRel);
  const timeoutMs = Math.min(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS, MAX_TIMEOUT_MS);
  const started = Date.now();

  return new Promise<ExecResult>((resolve) => {
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    let settled = false;

    const child: ChildProcess = spawn(opts.argv[0], opts.argv.slice(1), {
      cwd,
      env: { ...scrubbedEnv(cwd), ...(opts.env ?? {}) } as NodeJS.ProcessEnv,
      stdio: ['ignore', 'pipe', 'pipe'] as const,
    });

    const cap = (chunk: Buffer): string => {
      const remaining = MAX_OUTPUT_BYTES - stdout.length - stderr.length;
      if (remaining <= 0) return '';
      return chunk.toString('utf8').slice(0, remaining);
    };

    child.stdout?.on('data', (chunk: Buffer) => { stdout += cap(chunk); });
    child.stderr?.on('data', (chunk: Buffer) => { stderr += cap(chunk); });

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeoutMs);
    timer.unref?.();

    const finish = (code: number | null, killed: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({
        stdout: stdout.slice(0, MAX_OUTPUT_BYTES),
        stderr: stderr.slice(0, MAX_OUTPUT_BYTES),
        exitCode: code,
        timedOut,
        durationMs: Date.now() - started,
        killed,
      });
    };

    child.on('close', (code) => finish(code, false));
    child.on('error', (err) => {
      stderr += String(err);
      finish(null, false);
    });
  });
}

/** Remote backend: hermes agent-worker contract (POST /exec, NDJSON stream). */
export async function execRemoteSandbox(baseUrl: string, token: string, opts: ExecOptions): Promise<ExecResult> {
  const started = Date.now();
  const controller = new AbortController();
  const timeoutMs = Math.min(opts.timeoutMs ?? DEFAULT_TIMEOUT_MS, MAX_TIMEOUT_MS);
  const timer = setTimeout(() => controller.abort(), timeoutMs + 5_000);
  timer.unref?.();

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/exec`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-sandbox-token': token },
      body: JSON.stringify({
        workspaceId: opts.userId,
        argv: opts.argv,
        cwdRel: opts.cwdRel ?? '',
        timeoutMs,
        env: opts.env ?? {},
      }),
      signal: controller.signal,
    });
    if (!response.ok || !response.body) {
      return {
        stdout: '', stderr: `Sandbox HTTP ${response.status}`,
        exitCode: null, timedOut: false, durationMs: Date.now() - started, killed: false,
      };
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let stdout = '';
    let stderr = '';
    let result: Partial<ExecResult> = {};

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let idx: number;
      while ((idx = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, idx).trim();
        buffer = buffer.slice(idx + 1);
        if (!line) continue;
        try {
          const evt = JSON.parse(line) as { type: string; data?: string; exitCode?: number; timedOut?: boolean; durationMs?: number };
          if (evt.type === 'stdout' && evt.data) stdout = (stdout + evt.data).slice(0, MAX_OUTPUT_BYTES);
          else if (evt.type === 'stderr' && evt.data) stderr = (stderr + evt.data).slice(0, MAX_OUTPUT_BYTES);
          else if (evt.type === 'exit') {
            result = {
              exitCode: evt.exitCode ?? null,
              timedOut: Boolean(evt.timedOut),
              durationMs: evt.durationMs ?? Date.now() - started,
            };
          }
        } catch { /* skip malformed line */ }
      }
    }
    return {
      stdout, stderr,
      exitCode: result.exitCode ?? null,
      timedOut: result.timedOut ?? false,
      durationMs: result.durationMs ?? Date.now() - started,
      killed: false,
    };
  } catch (error) {
    return {
      stdout: '', stderr: error instanceof Error ? error.message : String(error),
      exitCode: null, timedOut: false, durationMs: Date.now() - started, killed: false,
    };
  } finally {
    clearTimeout(timer);
  }
}

/** Dispatch to the configured backend (remote when MEDQ_SANDBOX_URL is set). */
export function execSandboxed(opts: ExecOptions): Promise<ExecResult> {
  const url = process.env.MEDQ_SANDBOX_URL;
  if (url) {
    return execRemoteSandbox(url, process.env.MEDQ_SANDBOX_TOKEN || 'dev-sandbox-token', opts);
  }
  return execLocalRestricted(opts);
}

/** Hardened git environment (hermes git tool posture). */
export function gitEnv(workspaceHome: string): Record<string, string> {
  return {
    GIT_TERMINAL_PROMPT: '0',
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_SYSTEM: '/dev/null',
    GIT_AUTHOR_NAME: 'MedQ Agent',
    GIT_AUTHOR_EMAIL: 'agent@medq.local',
    GIT_COMMITTER_NAME: 'MedQ Agent',
    GIT_COMMITTER_EMAIL: 'agent@medq.local',
    HOME: workspaceHome,
  };
}
