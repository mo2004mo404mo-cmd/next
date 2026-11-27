#!/usr/bin/env node
/**
 * configure-agent-provider.mjs — point the MedQ deep agent at the embedded
 * FreeLLM AI Router (in-process sidecar, OpenAI-wire endpoint at /v1).
 *
 * Reads the router's unified API key from freellmapi/server/data/freeapi.db
 * (settings.unified_api_key) and writes the three MEDQ_AGENT_* variables into
 * .env.local so `next start` picks them up at boot. Never prints the key.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const ROOT = '/tmp/my-project';
const DB = path.join(ROOT, 'freellmapi', 'server', 'data', 'freeapi.db');
const ENV_LOCAL = path.join(ROOT, '.env.local');

const MODEL = process.argv[2] || 'zai-llm';

if (!existsSync(DB)) {
  console.error('router DB not found — start the app once so the sidecar initializes it');
  process.exit(1);
}

// better-sqlite3 ships with the sidecar's node_modules
const require2 = createRequire(path.join(ROOT, 'freellmapi', 'server', 'package.json'));
const Database = require2('better-sqlite3');
const db = new Database(DB, { readonly: true });
const row = db.prepare("SELECT value FROM settings WHERE key = 'unified_api_key'").get();
db.close();
const key = row?.value;
if (!key || !key.startsWith('freellmapi-')) {
  console.error('unified_api_key missing/invalid in router settings');
  process.exit(1);
}

const lines = [
  // Deep-agent path (resolveMedQAgentConfig reads these directly)
  `MEDQ_AGENT_BASE_URL=http://127.0.0.1:3000/v1`,
  `MEDQ_AGENT_API_KEY=${key}`,
  `MEDQ_AGENT_MODEL=${MODEL}`,
  // Non-deep-agent path (resolveModel → resolveApiKey('openai') reads these).
  // Point the OpenAI provider at the router so /api/generate, /api/generate/agent
  // and every other callChat() caller can reach it without a per-user defaultModel.
  `DEFAULT_MODEL=openai:${MODEL}`,
  `OPENAI_API_KEY=${key}`,
  `OPENAI_BASE_URL=http://127.0.0.1:3000/v1`,
];

let env = existsSync(ENV_LOCAL) ? readFileSync(ENV_LOCAL, 'utf8') : '';
const names = new Set(lines.map((l) => l.split('=')[0]));
env = env
  .split('\n')
  .filter((l) => !names.has(l.split('=')[0]))
  .join('\n')
  .replace(/\n{3,}$/, '\n\n');
env = env.endsWith('\n') ? env : env + '\n';
env += lines.join('\n') + '\n';
writeFileSync(ENV_LOCAL, env);

console.log(`✓ .env.local updated (key values masked):`);
for (const l of lines) {
  console.log('  ' + (l.includes('freellmapi-') ? l.split('=')[0] + '=freellmapi-••••••••' : l));
}
