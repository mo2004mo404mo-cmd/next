/**
 * Restore MEDQ_AGENT_API_KEY in the MedQ .env from the FreeLLM sidecar's
 * unified key (settings.unified_api_key in freeapi.db).
 *
 * Background: the .env was rebuilt from the sanitized delivery-zip template,
 * which blanks MEDQ_AGENT_API_KEY by design. That silently killed the Deep
 * Agent env chain (MEDQ_AGENT_BASE_URL=http://127.0.0.1:3000/v1 +
 * MEDQ_AGENT_MODEL=zai-llm stayed, the key went empty), so the floating
 * assistant's "Auto" mode threw "Configure MEDQ_AGENT_API_KEY or
 * OPENAI_API_KEY to use the Deep Agent backend."
 *
 * Prints only non-secret diagnostics (length + prefix). Idempotent.
 */
import { Database } from 'bun:sqlite';
import { readFileSync, writeFileSync } from 'node:fs';

const ENV_PATH = '/home/z/my-project/.env';
const DB_PATH = '/home/z/my-project/freellmapi/server/data/freeapi.db';

const db = new Database(DB_PATH, { readonly: true });
const row = db.query("SELECT value FROM settings WHERE key = 'unified_api_key'").get() as { value: string } | undefined;
db.close();

const key = row?.value?.trim();
if (!key) {
  console.error('FAIL: no unified_api_key in freeapi.db settings table');
  process.exit(1);
}

let env = readFileSync(ENV_PATH, 'utf-8');
const line = `MEDQ_AGENT_API_KEY=${key}`;
if (/^MEDQ_AGENT_API_KEY=.*$/m.test(env)) {
  env = env.replace(/^MEDQ_AGENT_API_KEY=.*$/m, line);
} else {
  env = env.replace(/(^OPENAI_API_KEY=.*$)/m, `${line}\n$1`);
}
writeFileSync(ENV_PATH, env);

console.log(`OK: MEDQ_AGENT_API_KEY written (len=${key.length}, prefix=${key.slice(0, 7)}…)`);
