import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { createHash } from 'node:crypto';
import { executeVmSandbox } from './run-code';

/**
 * Productivity tools — deep-agent-platform parity (compare-and-integrate-4).
 *
 *   calculator     — math expressions evaluated in the VM sandbox (never
 *                    eval'd in the server process — deep-agent runs math in
 *                    its sandbox for the same reason)
 *   datetime       — now / convert / diff with IANA timezones
 *   text_transform — count / slugify / case / extract emails+urls / sha256
 *
 * Small deterministic utilities the model should NOT do mentally — the same
 * principle as the dose-calculation skill: verified computation only.
 */

// ─── calculator ─────────────────────────────────────────────────────────────

function evaluateMathExpression(expression: string): { ok: boolean; result?: string; error?: string } {
  // Allow numbers, operators, parentheses, whitespace, dots, and Math.<fn>
  // calls — reject everything else BEFORE the sandbox sees it.
  if (expression.length > 2000) return { ok: false, error: 'Expression too long' };
  const identifiers = expression.match(/[a-zA-Z_$][a-zA-Z0-9_$]*/g) ?? [];
  const banned = identifiers.filter(
    (id) => !id.match(/^(Math|E|LN2|LN10|LOG2E|LOG10E|PI|SQRT1_2|SQRT2|abs|acos|acosh|asin|asinh|atan|atan2|atanh|cbrt|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log1p|log2|log10|max|min|pow|round|sign|sin|sinh|sqrt|tan|tanh|trunc)$/),
  );
  if (banned.length > 0) return { ok: false, error: `Unsupported identifiers: ${banned.join(', ')}` };

  // Evaluate inside the hardened VM (whitelist globals, no eval, timeout).
  const outcome = executeVmSandbox(`return (${expression});`);
  if (!outcome.ok) return { ok: false, error: outcome.error ?? 'Evaluation failed' };
  const result = outcome.result ?? '';
  const numeric = Number(result);
  if (result === '' || Number.isNaN(numeric)) return { ok: false, error: `Expression did not evaluate to a number (got "${result.slice(0, 80)}")` };
  return { ok: true, result };
}

export function createCalculatorTool() {
  return new DynamicStructuredTool({
    name: 'calculator',
    description:
      'Evaluate a math expression exactly (arithmetic, percentages, ratios, Math.* functions like Math.sqrt, Math.pow, Math.log). Use for ANY numeric computation — never do dose math, unit conversions, or statistics mentally.',
    schema: z.object({
      expression: z.string().min(1).max(2000).describe('Math expression, e.g. "25 * 0.4" or "Math.sqrt(144) / 2"'),
    }),
    func: async ({ expression }) => {
      const { ok, result, error } = evaluateMathExpression(expression.trim());
      if (!ok) return JSON.stringify({ ok: false, error });
      return JSON.stringify({ ok: true, expression, result });
    },
  });
}

// ─── datetime ───────────────────────────────────────────────────────────────

interface DatetimeResult {
  iso: string;
  date: string;
  time: string;
  weekday: string;
  unixSeconds: number;
  timezone: string;
}

function renderDateTime(date: Date, timeZone: string): DatetimeResult {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    dateStyle: 'full',
    timeStyle: 'long',
  });
  const parts = fmt.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    iso: date.toISOString(),
    date: `${get('year')}-${get('month')}-${get('day')}`,
    time: `${get('hour')}:${get('minute')}:${get('second')} ${get('timeZoneName')}`,
    weekday: get('weekday'),
    unixSeconds: Math.floor(date.getTime() / 1000),
    timezone: timeZone,
  };
}

export function createDatetimeTool() {
  return new DynamicStructuredTool({
    name: 'datetime',
    description:
      'Get the current date/time in any IANA timezone, convert a time between timezones, or compute the difference between two dates. Use for scheduling study sessions, exam countdowns, and time zone conversions.',
    schema: z.object({
      operation: z.enum(['now', 'convert', 'diff']).describe('now = current time; convert = time between zones; diff = duration between two dates'),
      timezone: z.string().optional().describe('IANA timezone for "now" (default from context, e.g. Africa/Cairo, America/New_York)'),
      datetime: z.string().optional().describe('ISO datetime or "YYYY-MM-DD HH:mm" for convert/diff (interpreted in `timezone` when given)'),
      to_timezone: z.string().optional().describe('Target IANA timezone for convert'),
      end_datetime: z.string().optional().describe('Second datetime for diff'),
    }),
    func: async ({ operation, timezone, datetime, to_timezone, end_datetime }) => {
      const zone = timezone || 'UTC';
      try {
        if (operation === 'now') {
          const now = new Date();
          return JSON.stringify({ ok: true, operation, ...renderDateTime(now, zone) });
        }
        if (operation === 'convert') {
          if (!datetime || !to_timezone) return JSON.stringify({ ok: false, error: 'convert requires datetime and to_timezone' });
          const date = parseInZone(datetime, zone);
          return JSON.stringify({ ok: true, operation, source: renderDateTime(date, zone), target: renderDateTime(date, to_timezone) });
        }
        // diff
        if (!datetime || !end_datetime) return JSON.stringify({ ok: false, error: 'diff requires datetime and end_datetime' });
        const start = parseInZone(datetime, zone);
        const end = parseInZone(end_datetime, zone);
        const diffMs = end.getTime() - start.getTime();
        const absDays = Math.abs(diffMs) / 86_400_000;
        return JSON.stringify({
          ok: true,
          operation,
          direction: diffMs >= 0 ? 'future' : 'past',
          days: Number(absDays.toFixed(3)),
          hours: Number((Math.abs(diffMs) / 3_600_000).toFixed(2)),
          minutes: Math.round(Math.abs(diffMs) / 60_000),
        });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

function parseInZone(input: string, timeZone: string): Date {
  // Try plain parse first (ISO), then interpret naive wall-clock strings in the zone.
  const direct = new Date(input);
  if (!Number.isNaN(direct.getTime()) && (input.includes('T') || /^\d{4}-\d{2}-\d{2}$/.test(input.trim()))) return direct;

  const match = input.trim().match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (match) {
    const [, y, mo, d, h, mi, s] = match;
    // Interpret as wall-clock in `timeZone` via the offset trick.
    const naive = Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s ?? 0));
    const offsetMs = zoneOffsetMs(new Date(naive), timeZone);
    return new Date(naive - offsetMs);
  }
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) throw new Error(`Unrecognized datetime: ${input}`);
  return parsed;
}

function zoneOffsetMs(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', { timeZone, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const parts = dtf.formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
  return asUtc - date.getTime();
}

// ─── text_transform ─────────────────────────────────────────────────────────

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const URL_RE = /https?:\/\/[^\s<>"')\]]+/g;

export function createTextTransformTool() {
  return new DynamicStructuredTool({
    name: 'text_transform',
    description:
      'Deterministic text operations: count (words/chars/sentences), slugify, case conversions (upper/lower/title), extract emails or URLs, reverse, and sha256. Use instead of hand-modifying text in your answer.',
    schema: z.object({
      operation: z.enum(['count', 'slugify', 'uppercase', 'lowercase', 'titlecase', 'extract_emails', 'extract_urls', 'reverse', 'sha256']),
      text: z.string().min(1).max(100_000).describe('Input text'),
    }),
    func: async ({ operation, text }) => {
      switch (operation) {
        case 'count':
          return JSON.stringify({
            operation,
            characters: text.length,
            charactersNoWhitespace: text.replace(/\s/g, '').length,
            words: text.split(/\s+/).filter(Boolean).length,
            sentences: text.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim()).length,
            lines: text.split('\n').length,
          });
        case 'slugify':
          return JSON.stringify({ operation, result: text
            .toLowerCase()
            .normalize('NFKD')
            .replace(/[^\p{L}\p{N}]+/gu, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 200) });
        case 'uppercase':
          return JSON.stringify({ operation, result: text.toUpperCase() });
        case 'lowercase':
          return JSON.stringify({ operation, result: text.toLowerCase() });
        case 'titlecase':
          return JSON.stringify({ operation, result: text.replace(/\p{L}[\p{L}']*/gu, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()) });
        case 'extract_emails':
          return JSON.stringify({ operation, results: [...new Set(text.match(EMAIL_RE) ?? [])] });
        case 'extract_urls':
          return JSON.stringify({ operation, results: [...new Set(text.match(URL_RE) ?? [])] });
        case 'reverse':
          return JSON.stringify({ operation, result: [...text].reverse().join('') });
        case 'sha256':
          return JSON.stringify({ operation, result: createHash('sha256').update(text, 'utf8').digest('hex') });
      }
    },
  });
}
