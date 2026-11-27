// Task 30 — one-time backfill: align models.supports_vision / supports_tools
// with the upstream-declared capability on every custom row.
//   capability 'vision'                  → vision 1, tools 0 (chat-served, no tool calls)
//   capability any non-chat label        → vision 0, tools 0 (tool model, never chat)
//   capability 'chat'                    → untouched (defaults truthful: tools 1, vision 0)
//   capability NULL                      → id heuristic only (glm-4v family etc.): vision 1
// Idempotent: only rows whose booleans differ are UPDATEd.
import { createRequire } from 'node:module';
const require = createRequire('/home/z/my-project/freellmapi/package.json');
const Database = require('better-sqlite3');

const db = new Database('freellmapi/server/data/freeapi.db');
db.pragma('busy_timeout = 4000');

const NON_CHAT = new Set(['web-search', 'web-reader', 'image-gen', 'image-edit', 'tts', 'asr', 'embedding', 'video', 'transcription']);

// Same heuristic as model-discovery.visionFromId (tokens, not substrings).
function visionFromId(id) {
  for (const token of id.toLowerCase().split(/[^a-z0-9]+/)) {
    if (/^vlm?\d*$/.test(token)) return true;
    if (['llava', 'internvl', 'pixtral', 'moondream', 'cogvlm', 'vision'].some(m => token.includes(m))) return true;
    if (/^\d+v$/.test(token)) return true;
  }
  return false;
}

const rows = db.prepare("SELECT id, model_id, upstream_capability, supports_vision, supports_tools FROM models WHERE platform='custom'").all();
const stats = { visionFixed: 0, toolModelFixed: 0, idHeuristicVision: 0, untouched: 0 };
const changes = [];

const setUpd = db.prepare('UPDATE models SET supports_vision = 1, supports_tools = 0 WHERE id = ?');
const tUpd = db.prepare('UPDATE models SET supports_tools = 0, supports_vision = 0 WHERE id = ?');
const vUpd = db.prepare('UPDATE models SET supports_vision = 1 WHERE id = ?');

for (const r of rows) {
  const cap = r.upstream_capability;
  if (cap === 'vision') {
    if (r.supports_vision !== 1 || r.supports_tools !== 0) {
      setUpd.run(r.id);
      changes.push([r.id, r.model_id, cap, `vision ${r.supports_vision}->1, tools ${r.supports_tools}->0`]);
      stats.visionFixed++;
    } else stats.untouched++;
  } else if (cap != null && NON_CHAT.has(cap)) {
    if (r.supports_tools !== 0 || r.supports_vision !== 0) {
      tUpd.run(r.id);
      changes.push([r.id, r.model_id, cap, `tools ${r.supports_tools}->0, vision ${r.supports_vision}->0`]);
      stats.toolModelFixed++;
    } else stats.untouched++;
  } else if (cap == null && visionFromId(r.model_id)) {
    if (r.supports_vision !== 1) {
      vUpd.run(r.id);
      changes.push([r.id, r.model_id, '(id heuristic)', `vision ${r.supports_vision}->1`]);
      stats.idHeuristicVision++;
    } else stats.untouched++;
  } else {
    stats.untouched++;
  }
}

console.log('custom rows:', rows.length, '| stats:', JSON.stringify(stats));
if (changes.length) {
  console.table(changes.map(([id, model, cap, chg]) => ({ id, model, cap, change: chg })));
} else {
  console.log('nothing to change — already aligned');
}
