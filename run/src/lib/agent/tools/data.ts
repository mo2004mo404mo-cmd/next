import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import fs from 'node:fs';
import type { MedQToolContext } from '../types';
import { executeVmSandbox } from './run-code';
import { execSandboxed } from './sandbox';
import { writeWorkspaceFile, resolveSafe } from '../workspace/files';
import { createLogger } from '../../logger';

const log = createLogger('AgentDataTools');

/**
 * Data tools — deep-agent-platform parity (compare-and-integrate-4).
 *
 *   process_json / process_csv — structured data wrangling; model-supplied
 *       filter/map expressions are evaluated inside the hardened VM sandbox
 *       (the reference platform runs them in ITS sandbox for the same
 *       injection-containment reason).
 *   sql_query / sql_execute — per-user SQLite analytics database
 *       (workspace/analytics.db). Reads are SELECT/WITH-only (regex-guarded,
 *       opened mode=ro); writes (CREATE/INSERT/UPDATE) run behind the
 *       sql.write approval gate. Execution goes through the process sandbox
 *       as an ephemeral python3 script (python's sqlite3 stdlib).
 *   extract_links — all hyperlinks on a page (deduped, absolute).
 */

const JSON_INPUT_MAX = 500_000;
const OUTPUT_CAP = 20_000;

// ─── process_json ───────────────────────────────────────────────────────────

export function createProcessJsonTool() {
  return new DynamicStructuredTool({
    name: 'process_json',
    description:
      'Operate on JSON data without writing code: get a dot-path value, filter/map an array with a JS expression over `x` (e.g. "x.age > 40"), list keys, or summarize the structure. Prefer this over run_code for quick JSON inspection.',
    schema: z.object({
      operation: z.enum(['get', 'filter', 'map', 'keys', 'summarize']).describe('Operation to apply'),
      json: z.string().min(1).max(JSON_INPUT_MAX).describe('The JSON text'),
      path: z.string().optional().describe('Dot path for get (e.g. "results.0.title")'),
      expression: z.string().max(2_000).optional().describe('JS expression over `x` for filter/map (e.g. "x.age > 40" or "x.title.toUpperCase()")'),
    }),
    func: async ({ operation, json, path, expression }) => {
      let data: unknown;
      try {
        data = JSON.parse(json);
      } catch (error) {
        return JSON.stringify({ ok: false, error: `Invalid JSON: ${error instanceof Error ? error.message : error}` });
      }

      if (operation === 'get') {
        if (!path) return JSON.stringify({ ok: false, error: 'get requires path' });
        const outcome = executeVmSandbox(`const data = ${json}; return JSON.stringify(${renderPath(path)});`, {});
        if (!outcome.ok) return JSON.stringify({ ok: false, error: outcome.error });
        return JSON.stringify({ ok: true, operation, value: outcome.result?.slice(0, OUTPUT_CAP) });
      }
      if (operation === 'keys') {
        if (typeof data !== 'object' || data === null) return JSON.stringify({ ok: false, error: 'keys requires a JSON object' });
        return JSON.stringify({ ok: true, operation, keys: Object.keys(data as object).slice(0, 200) });
      }
      if (operation === 'summarize') {
        return JSON.stringify({ ok: true, operation, summary: summarizeJson(data) });
      }
      // filter / map — expression evaluated in the VM with `x` bound
      if (!expression) return JSON.stringify({ ok: false, error: `${operation} requires expression` });
      if (!Array.isArray(data)) return JSON.stringify({ ok: false, error: `${operation} requires a JSON array at the top level` });
      if (expression.length > 2_000) return JSON.stringify({ ok: false, error: 'Expression too long' });
      // Identifier whitelist: x (+ property access on x) plus safe globals —
      // mirrors the calculator guard; member accesses AND string literals are
      // stripped first so quoted words never trip the identifier scan.
      const strippedExpr = expression
        .replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '""')
        .replace(/\bx\.[A-Za-z_$][\w$]*/g, '0');
      const identifiers = strippedExpr.match(/[a-zA-Z_$][a-zA-Z0-9_$]*/g) ?? [];
      const banned = identifiers.filter((id) => id !== 'x' && !id.startsWith('Math') && !/^(true|false|null|undefined|JSON|Number|String|Boolean|Array|Object|isNaN|isFinite|parseInt|parseFloat|Date|abs|ceil|floor|round|max|min|pow|sqrt|log|exp|sign|trunc)$/.test(id));
      if (banned.length > 0) return JSON.stringify({ ok: false, error: `Unsupported identifiers: ${banned.join(', ')}` });

      const code = `const items = ${json};\nconst out = items.${operation === 'filter' ? 'filter' : 'map'}((x) => (${expression}));\nreturn JSON.stringify(out);`;
      const outcome = executeVmSandbox(code);
      if (!outcome.ok) return JSON.stringify({ ok: false, error: outcome.error });
      const result = outcome.result ?? '[]';
      return JSON.stringify({ ok: true, operation, expression, count: result.startsWith('[') ? (JSON.parse(result) as unknown[]).length : undefined, result: result.slice(0, OUTPUT_CAP) });
    },
  });
}

function renderPath(path: string): string {
  const parts = path.split('.').filter(Boolean);
  return `data${parts.map((p) => (/^\d+$/.test(p) ? `[${p}]` : `["${p.replace(/"/g, '')}"]`)).join('')}`;
}

function summarizeJson(data: unknown, depth = 0): string {
  if (depth > 3) return '…';
  if (Array.isArray(data)) {
    const head = data.slice(0, 3).map((item) => summarizeJson(item, depth + 1));
    return `array(${data.length}) [${head.join(', ')}${data.length > 3 ? ', …' : ''}]`;
  }
  if (typeof data === 'object' && data !== null) {
    const entries = Object.entries(data as Record<string, unknown>).slice(0, 12);
    return `object(${Object.keys(data as object).length}) {${entries.map(([k, v]) => `${k}: ${summarizeJson(v, depth + 1)}`).join(', ')}}`;
  }
  return typeof data === 'string' ? `"${data.slice(0, 40)}"` : String(data);
}

// ─── process_csv ────────────────────────────────────────────────────────────

/** Quote-aware CSV parser (single pass, tolerates quoted commas + newlines). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else inQuotes = false;
      } else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows;
}

export function createProcessCsvTool() {
  return new DynamicStructuredTool({
    name: 'process_csv',
    description:
      'Operate on CSV text: to_json (rows as objects), columns (header list), stats (min/max/mean per numeric column), head (first N rows), filter (rows matching a JS expression over the row object `r`). Prefer over run_code for quick tabular inspection.',
    schema: z.object({
      operation: z.enum(['to_json', 'columns', 'stats', 'head', 'filter']).describe('Operation to apply'),
      csv: z.string().min(1).max(JSON_INPUT_MAX).describe('The CSV text (first row = header)'),
      limit: z.number().int().min(1).max(100).optional().describe('Row cap for head/to_json (default 20)'),
      expression: z.string().max(2_000).optional().describe('JS expression over `r` (row object) for filter, e.g. "r.age > 40"'),
    }),
    func: async ({ operation, csv, limit, expression }) => {
      const rows = parseCsv(csv.trim());
      if (rows.length < 1) return JSON.stringify({ ok: false, error: 'No rows found' });
      const header = rows[0].map((h) => h.trim());
      const records = rows.slice(1).map((row) => {
        const obj: Record<string, string> = {};
        header.forEach((key, i) => { obj[key] = (row[i] ?? '').trim(); });
        return obj;
      });

      if (operation === 'columns') return JSON.stringify({ ok: true, operation, columns: header, rowCount: records.length });
      if (operation === 'head') {
        const n = limit ?? 20;
        return JSON.stringify({ ok: true, operation, rows: records.slice(0, n) });
      }
      if (operation === 'to_json') {
        const n = limit ?? 20;
        return JSON.stringify({ ok: true, operation, rowCount: records.length, rows: records.slice(0, n) });
      }
      if (operation === 'stats') {
        const stats: Record<string, { count: number; min: number; max: number; mean: number }> = {};
        for (const column of header) {
          const values = records.map((r) => Number(r[column])).filter((v) => Number.isFinite(v));
          if (values.length === 0 || records.every((r) => r[column] === '')) continue;
          if (values.length < records.length * 0.5) continue; // mostly non-numeric → skip
          stats[column] = {
            count: values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            mean: Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(4)),
          };
        }
        return JSON.stringify({ ok: true, operation, rowCount: records.length, stats });
      }
      // filter
      if (!expression) return JSON.stringify({ ok: false, error: 'filter requires expression' });
      const strippedExpr = expression
        .replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '""')
        .replace(/\br\.[A-Za-z_$][\w$]*/g, '0');
      const identifiers = strippedExpr.match(/[a-zA-Z_$][a-zA-Z0-9_$]*/g) ?? [];
      const banned = identifiers.filter((id) => id !== 'r' && !id.startsWith('Math') && !/^(true|false|null|undefined|Number|String|Boolean|isNaN|isFinite|parseFloat|parseInt|abs|ceil|floor|round|max|min|pow|sqrt|log|exp|sign|trunc)$/.test(id));
      if (banned.length > 0) return JSON.stringify({ ok: false, error: `Unsupported identifiers: ${banned.join(', ')}` });
      const json = JSON.stringify(records);
      const code = `const rows = ${json};\nconst out = rows.filter((r) => (${expression}));\nreturn JSON.stringify(out);`;
      const outcome = executeVmSandbox(code);
      if (!outcome.ok) return JSON.stringify({ ok: false, error: outcome.error });
      const result = outcome.result ?? '[]';
      return JSON.stringify({ ok: true, operation, expression, matched: (JSON.parse(result) as unknown[]).length, rows: result.slice(0, 30_000) });
    },
  });
}

// ─── sql_query / sql_execute (per-user SQLite analytics DB) ────────────────

const READ_ONLY_SQL = /^\s*(select|with)\b/i;
const FORBIDDEN_SQL = /\b(insert|update|delete|drop|alter|create|attach|detach|pragma|vacuum|reindex)\b/i;

function analyticsDbPath(ctx: MedQToolContext): string {
  return resolveSafe(ctx.userId, 'analytics.db');
}

/** Run SQL against the user's SQLite analytics DB via the process sandbox. */
async function runSqlite(
  ctx: MedQToolContext,
  sql: string,
  mode: 'ro' | 'rw',
): Promise<{ ok: boolean; rows?: unknown[]; error?: string; changes?: number }> {
  const dbPath = analyticsDbPath(ctx);
  // Note: workspaceExists() only validates path safety — check the disk.
  if (mode === 'ro' && !fs.existsSync(dbPath)) {
    return {
      ok: false,
      error: 'The analytics database (analytics.db) does not exist yet — create tables and load data with sql_execute first (e.g. CREATE TABLE …, then INSERT …).',
    };
  }
  // SQL travels base64-embedded in the script — zero quoting/injection risk.
  // rw uses rwc so the FIRST write creates the database file.
  const sqlB64 = Buffer.from(sql, 'utf8').toString('base64');
  const uriMode = mode === 'ro' ? 'ro' : 'rwc';
  const script = [
    'import json, sqlite3, base64',
    `sql = base64.b64decode("${sqlB64}").decode("utf-8")`,
    `db = sqlite3.connect("file:${dbPath}?mode=${uriMode}", uri=True)`,
    'db.row_factory = sqlite3.Row',
    'try:',
    '    cur = db.execute(sql)',
    '    if cur.description:',
    '        print(json.dumps([dict(r) for r in cur.fetchmany(200)]))',
    '    else:',
    '        print(json.dumps({"changes": cur.rowcount}))',
    '        db.commit()',
    'finally:',
    '    db.close()',
  ].join('\n');

  const scriptRel = `scripts/sql-${Date.now()}.py`;
  writeWorkspaceFile(ctx.userId, scriptRel, script);

  const result = await execSandboxed({
    userId: ctx.userId,
    argv: ['python3', scriptRel],
    timeoutMs: 30_000,
  });

  if (result.exitCode !== 0) {
    return { ok: false, error: result.stderr.slice(0, 800) || 'SQL execution failed' };
  }
  try {
    const parsed = JSON.parse(result.stdout.trim().split('\n').pop() ?? '') as unknown;
    return Array.isArray(parsed) ? { ok: true, rows: parsed } : { ok: true, changes: (parsed as { changes?: number }).changes };
  } catch {
    return { ok: true, rows: [] };
  }
}

export function createSqlQueryTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'sql_query',
    description:
      'Run a READ-ONLY SQL query (SELECT / WITH only) against your personal SQLite analytics database (analytics.db in the agent workspace). Load CSV data with sql_execute or run_code first, then analyze with joins/aggregations here. Max 200 rows returned.',
    schema: z.object({
      query: z.string().min(4).max(20_000).describe('SELECT or WITH query'),
    }),
    func: async ({ query }) => {
      if (!READ_ONLY_SQL.test(query)) return JSON.stringify({ ok: false, error: 'Only SELECT / WITH queries are allowed in sql_query (use sql_execute for writes)' });
      if (FORBIDDEN_SQL.test(query)) return JSON.stringify({ ok: false, error: 'Write/DDL keywords are not allowed in sql_query' });
      try {
        const result = await runSqlite(ctx, query, 'ro');
        if (!result.ok) return JSON.stringify({ ok: false, error: result.error });
        return JSON.stringify({ ok: true, rowCount: result.rows?.length ?? 0, rows: (result.rows ?? []).slice(0, 200) }).slice(0, 40_000);
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

export function createSqlExecuteTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'sql_execute',
    description:
      'Execute a write/DDL statement (CREATE TABLE, INSERT, UPDATE) against your personal SQLite analytics database. Builds schema and loads data so sql_query can analyze it. Destructive — requires approval.',
    schema: z.object({
      statement: z.string().min(4).max(20_000).describe('DDL or DML statement'),
    }),
    func: async ({ statement }) => {
      if (/\b(attach|detach|pragma)\b/i.test(statement)) {
        return JSON.stringify({ ok: false, error: 'ATTACH / DETACH / PRAGMA are not allowed' });
      }
      try {
        const result = await runSqlite(ctx, statement, 'rw');
        if (!result.ok) return JSON.stringify({ ok: false, error: result.error });
        log.info?.(`sql_execute for ${ctx.userId}: changes=${result.changes ?? 'n/a'}`);
        return JSON.stringify({ ok: true, changes: result.changes ?? 0 });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

// ─── extract_links ──────────────────────────────────────────────────────────

export function createExtractLinksTool() {
  return new DynamicStructuredTool({
    name: 'extract_links',
    description:
      'Extract all hyperlinks from a web page (resolved to absolute URLs, deduplicated). Use for finding guideline PDFs, related articles, or navigation targets before fetching individual pages.',
    schema: z.object({
      url: z.string().url().describe('The page to scan'),
      limit: z.number().int().min(1).max(100).optional().describe('Max links to return (default 30)'),
    }),
    func: async ({ url, limit }) => {
      const cap = limit ?? 30;
      try {
        const { fetchPageText } = await import('./web-fetch');
        // fetchPageText strips HTML — we need raw HTML for link extraction, so
        // re-fetch is not ideal; reuse the SSRF-guarded fetch path via the
        // gateway reader when possible.
        const { createZAI } = await import('../../zai');
        let html = '';
        try {
          const zai = await createZAI();
          if (zai?.functions?.invoke) {
            const page = (await zai.functions.invoke('page_reader', { url })) as { data?: { html?: string } };
            html = page?.data?.html ?? '';
          }
        } catch { /* fall through */ }
        if (!html) {
          const fetched = await fetchPageText(url);
          if (!fetched.content) return JSON.stringify({ ok: false, error: 'No content at URL' });
          html = fetched.content;
        }

        const base = new URL(url);
        const links = new Set<string>();
        const hrefRegex = /href\s*=\s*["']([^"']+)["']/gi;
        let match: RegExpExecArray | null;
        while ((match = hrefRegex.exec(html)) !== null && links.size < cap) {
          try {
            const resolved = new URL(match[1], base);
            if (resolved.protocol === 'http:' || resolved.protocol === 'https:') links.add(resolved.toString());
          } catch { /* skip malformed */ }
        }
        return JSON.stringify({ ok: true, url, count: links.size, links: [...links].slice(0, cap) });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
