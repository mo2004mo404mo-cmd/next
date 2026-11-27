/**
 * 5-field cron parsing + next-run computation for scheduled agent tasks.
 *
 * Supports: "min hour dom month dow" with "*", "x/step" wildcards, ranges
 * "a-b", lists "a,b,c", and day-of-week names (MON-SUN, MONDAY, etc.).
 * Times interpret in an IANA timezone (via Intl offset math — no tz
 * database dependency).
 *
 * Ported shape from hermes "scheduler/cron.ts" (revived for the scheduled
 * agent jobs feature).
 */
import { z } from 'zod';

export const cronExpressionSchema = z
  .string()
  .trim()
  .regex(/^(\S+ ){4}\S+$/, 'expected a 5-field cron expression')
  .refine((value) => value.split(/\s+/).every((field, i) => parseField(field, FIELD_RANGES[i].min, FIELD_RANGES[i].max, i === 4) !== null), {
    message: 'invalid cron field',
  });

interface FieldRange {
  min: number;
  max: number;
}

// minute, hour, day-of-month, month, day-of-week
const FIELD_RANGES: FieldRange[] = [
  { min: 0, max: 59 },
  { min: 0, max: 23 },
  { min: 1, max: 31 },
  { min: 1, max: 12 },
  { min: 0, max: 6 }, // 0 = Sunday
];

const DOW_NAMES: Record<string, number> = {
  SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6,
  SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6,
};

/** Parse one cron field into a sorted list of matching integers. */
function parseField(
  raw: string,
  min: number,
  max: number,
  isDow: boolean,
): number[] | null {
  const field = raw.toUpperCase();
  const out = new Set<number>();

  for (const part of field.split(',')) {
    // day-of-week names: MON, MON-FRI, SAT,SUN
    let token = part;
    if (isDow) token = token.replace(/\b([A-Z]+)\b/g, (m) => (m in DOW_NAMES ? String(DOW_NAMES[m]) : m));
    if (!/^[0-9*/-]+$/.test(token)) return null;

    let step = 1;
    const stepIdx = token.indexOf('/');
    if (stepIdx !== -1) {
      const stepRaw = token.slice(stepIdx + 1);
      if (!/^\d+$/.test(stepRaw)) return null;
      step = Number(stepRaw);
      if (step < 1) return null;
      token = token.slice(0, stepIdx);
    }

    let lo = min;
    let hi = max;
    if (token === '*' || token === '') {
      // full range (with step)
    } else if (token.includes('-')) {
      const [a, b] = token.split('-');
      if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) return null;
      lo = Number(a);
      hi = Number(b);
    } else {
      if (!/^\d+$/.test(token)) return null;
      lo = Number(token);
      hi = stepIdx !== -1 ? max : lo; // "N/step" means N..max
    }

    if (lo < min || hi > max || lo > hi) return null;
    for (let v = lo; v <= hi; v += step) out.add(v);
  }

  return out.size > 0 ? [...out].sort((a, b) => a - b) : null;
}

/** Parse a 5-field cron expression into its matched integer sets. */
export function parseCron(expression: string): {
  minutes: number[];
  hours: number[];
  daysOfMonth: number[];
  months: number[];
  daysOfWeek: number[];
} | null {
  const fields = expression.trim().split(/\s+/);
  if (fields.length !== 5) return null;
  const [minutes, hours, daysOfMonth, months, daysOfWeek] = fields.map((f, i) =>
    parseField(f, FIELD_RANGES[i].min, FIELD_RANGES[i].max, i === 4),
  );
  if (!minutes || !hours || !daysOfMonth || !months || !daysOfWeek) return null;
  return { minutes, hours, daysOfMonth, months, daysOfWeek };
}

// ── Timezone helpers ───────────────────────────────────────────────────────

/** Millisecond offset of `tz` from UTC at the given instant. */
function tzOffsetMs(date: Date, tz: string): number {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour12: false,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    const parts = dtf.formatToParts(date);
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? '0');
    const asUTC = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour') % 24, get('minute'), get('second'));
    return asUTC - date.getTime();
  } catch {
    return 0; // unknown tz → UTC
  }
}

/** Wall-clock components of an instant in `tz`. */
function wallClock(date: Date, tz: string): { y: number; m: number; d: number; hh: number; mm: number; dow: number } {
  const shifted = new Date(date.getTime() + tzOffsetMs(date, tz));
  return {
    y: shifted.getUTCFullYear(),
    m: shifted.getUTCMonth() + 1,
    d: shifted.getUTCDate(),
    hh: shifted.getUTCHours(),
    mm: shifted.getUTCMinutes(),
    dow: shifted.getUTCDay(),
  };
}

function matches(
  c: ReturnType<typeof parseCron>,
  w: { m: number; d: number; hh: number; mm: number; dow: number },
): boolean {
  if (!c) return false;
  // cron treats DOM/DOW as OR when both are restricted
  const domRestricted = c.daysOfMonth.length < 31;
  const dowRestricted = c.daysOfWeek.length < 7;
  const domMatch = c.daysOfMonth.includes(w.d);
  const dowMatch = c.daysOfWeek.includes(w.dow);
  const dayOk = domRestricted && dowRestricted ? domMatch || dowMatch : domMatch && dowMatch;
  return c.minutes.includes(w.mm) && c.hours.includes(w.hh) && c.months.includes(w.m) && dayOk;
}

/**
 * Compute the next run strictly after `from` (default: now).
 * `cron === null` + `runAt` → the one-shot time itself.
 * Returns null when no next run can be found within ~1 year.
 */
export function computeNextRun(
  cron: string | null,
  runAt: Date | null,
  timezone = 'UTC',
  from: Date = new Date(),
): Date | null {
  if (!cron) return runAt;
  const c = parseCron(cron);
  if (!c) return null;

  // Start from the next whole minute after `from`, expressed in tz wall-clock.
  const cursor = new Date(Math.floor(from.getTime() / 60_000) * 60_000 + 60_000);
  const limit = cursor.getTime() + 366 * 24 * 3600 * 1000;

  while (cursor.getTime() <= limit) {
    const w = wallClock(cursor, timezone);
    if (matches(c, w)) return new Date(cursor.getTime());
    cursor.setUTCMinutes(cursor.getUTCMinutes() + 1);
  }
  return null;
}

/**
 * Advance a recurring schedule after a fire: strictly after the previous
 * nextRunAt (so a missed window fires once, not repeatedly).
 */
export function advanceCron(cron: string, previous: Date, timezone = 'UTC'): Date | null {
  return computeNextRun(cron, null, timezone, previous);
}

/** Human-readable summary, e.g. "every Monday at 09:00 (Africa/Cairo)". */
export function describeCron(cron: string, timezone = 'UTC'): string {
  const c = parseCron(cron);
  if (!c) return cron;
  const time = `${String(c.hours[0] ?? 0).padStart(2, '0')}:${String(c.minutes[0] ?? 0).padStart(2, '0')}`;
  const dowAll = c.daysOfWeek.length === 7;
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let when: string;
  if (dowAll && c.daysOfMonth.length === 31 && c.months.length === 12) {
    when = 'every day';
  } else if (!dowAll) {
    when = c.daysOfWeek.length === 1 ? `every ${names[c.daysOfWeek[0]]}` : `on ${c.daysOfWeek.map((d) => names[d]).join(', ')}`;
  } else {
    when = `on day ${c.daysOfMonth.join(', ')} of the month`;
  }
  return `${when} at ${time} (${timezone})`;
}
