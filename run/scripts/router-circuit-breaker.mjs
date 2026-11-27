#!/usr/bin/env node
/**
 * Router circuit breaker — protects the embedded freellmapi key pool from
 * flaky upstreams WITHOUT restarting or rebuilding the router.
 *
 * Why: the router's own health pass (every 5 min) marks a key healthy/error
 * per check but never disables persistently-bad keys, so a dead upstream gets
 * re-selected every request and users eat timeouts until an admin intervenes.
 * This watchdog sits beside the DB and:
 *
 *   1. Tracks consecutive error observations per key (state file, since
 *      api_keys only stores the LATEST status).
 *   2. After N consecutive errors (~N x 5 min of sustained failure) sets
 *      enabled=0 — the router skips disabled keys immediately (live, no
 *      restart needed).
 *   3. After a cooldown period, re-enables the key (edge nodes recover;
 *      "dead" is often "temporarily unreachable from this host").
 *
 * Usage:
 *   node scripts/router-circuit-breaker.mjs            # daemon loop (60s tick)
 *   node scripts/router-circuit-breaker.mjs --once     # single pass (cron mode)
 *   node scripts/router-circuit-breaker.mjs --dry-run  # report, never write
 *
 * Knobs via env: CB_FAIL_THRESHOLD (default 3), CB_COOLDOWN_MIN (default 30),
 * CB_TICK_SEC (default 60), CB_STATE_FILE, ROUTER_DB.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const ROOT = resolve(import.meta.dirname, '..');
const DB_PATH = process.env.ROUTER_DB || resolve(ROOT, 'freellmapi/server/data/freeapi.db');
const STATE_FILE = process.env.CB_STATE_FILE || resolve(ROOT, 'tmp/circuit-breaker-state.json');
const FAIL_THRESHOLD = parseInt(process.env.CB_FAIL_THRESHOLD || '3', 10);
const COOLDOWN_MIN = parseInt(process.env.CB_COOLDOWN_MIN || '30', 10);
const TICK_SEC = parseInt(process.env.CB_TICK_SEC || '60', 10);
const DRY_RUN = process.argv.includes('--dry-run');
const ONCE = process.argv.includes('--once') || DRY_RUN;

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveState(state) {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function log(...args) {
  console.log(`[circuit-breaker ${new Date().toISOString()}]`, ...args);
}

function pass() {
  if (!existsSync(DB_PATH)) {
    log(`router db not found at ${DB_PATH}`);
    return;
  }
  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA busy_timeout=10000');
  let rows;
  try {
    rows = db
      .prepare('SELECT id, label, base_url, status, enabled, last_health_error, last_checked_at FROM api_keys')
      .all();
  } finally {
    db.close();
  }

  const state = loadState();
  const now = Date.now();
  const cooldownMs = COOLDOWN_MIN * 60_000;
  const actions = [];

  for (const key of rows) {
    const id = String(key.id);
    const label = key.label || `key#${id}`;
    const entry = (state[id] ??= { failures: 0, disabledAt: null });

    // ── Cooldown elapsed → re-enable and give the key a fresh chance ──
    if (!key.enabled && entry.disabledAt && now - entry.disabledAt >= cooldownMs) {
      actions.push({ id, label, action: 'REENABLE', reason: `cooldown of ${COOLDOWN_MIN}min elapsed` });
      entry.failures = 0;
      entry.disabledAt = null;
      continue;
    }

    // ── Track consecutive error observations ──
    if (key.status === 'error') {
      entry.failures += 1;
      if (key.enabled && entry.failures >= FAIL_THRESHOLD) {
        actions.push({
          id,
          label,
          action: 'DISABLE',
          reason: `${entry.failures} consecutive failed health checks (last: ${String(key.last_health_error || 'unknown').slice(0, 80)})`,
        });
        entry.disabledAt = now;
      }
    } else if (key.status === 'healthy') {
      entry.failures = 0;
    }
    // status 'disabled'/'unknown' → leave counters untouched.
  }

  // ── Apply actions ──
  if (actions.length > 0) {
    const db2 = new DatabaseSync(DB_PATH);
    db2.exec('PRAGMA busy_timeout=10000');
    try {
      const update = db2.prepare('UPDATE api_keys SET enabled = ? WHERE id = ?');
      const apply = db2.transaction((acts) => {
        for (const act of acts) update.run(act.action === 'DISABLE' ? 0 : 1, act.id);
      });
      if (DRY_RUN) {
        log('DRY RUN — would apply:');
        for (const act of actions) log(`  ${act.action} ${act.label} (key#${act.id}): ${act.reason}`);
      } else {
        apply(actions);
        for (const act of actions) log(`${act.action} ${act.label} (key#${act.id}): ${act.reason}`);
      }
    } finally {
      db2.close();
    }
  } else {
    log(
      `all clear — ${rows.length} keys, ${rows.filter((r) => r.enabled).length} enabled, no streak actions ` +
        `(streaks: ${Object.entries(state)
          .filter(([, v]) => v.failures > 0)
          .map(([id, v]) => `#${id}:${v.failures}`)
          .join(', ') || 'none'})`,
    );
  }

  if (!DRY_RUN) saveState(state);
}

if (ONCE) {
  pass();
} else {
  log(`daemon starting — tick ${TICK_SEC}s, threshold ${FAIL_THRESHOLD} consecutive errors, cooldown ${COOLDOWN_MIN}min, db ${DB_PATH}`);
  pass();
  setInterval(pass, TICK_SEC * 1000);
}
