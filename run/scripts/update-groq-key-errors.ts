// Task 25: update the two region-blocked Groq keys with the honest error
// message (the old "key validation failed (HTTP 403): Forbidden" lied — the
// key was never evaluated; Groq blocks this server's network at the edge).
// Also re-enable key #21 (the most recent one) so the next health pass
// re-validates it with the patched provider and parks it at status='error'
// with the honest reason instead of 'invalid'.
import { DatabaseSync } from 'node:sqlite';

const HONEST =
  'Groq refused the request at the network edge (HTTP 403 Forbidden, no key-specific error). ' +
  'Groq appears to block this server\'s region or IP, so the key itself was never evaluated ' +
  '(a genuinely invalid Groq key would answer 401 instead). The key may be perfectly valid, ' +
  'but it cannot be validated or used from this server\'s network unless routed through a proxy ' +
  'in a supported region (set a per-key proxy when adding the key).';

const db = new DatabaseSync('/home/z/my-project/freellmapi/server/data/freeapi.db');
db.exec('PRAGMA busy_timeout = 8000;');

const before = db.prepare("SELECT id, platform, status, enabled FROM api_keys WHERE platform = 'groq'").all();
console.log('BEFORE:', JSON.stringify(before));

const upd = db.prepare("UPDATE api_keys SET last_health_error = ?, status = 'error' WHERE platform = 'groq'");
const info = upd.run(HONEST);
console.log(`updated ${info.changes} groq rows with the honest region-block message + status='error'`);

// Re-enable the most recent key so the health pass keeps probing it (the
// user says the key is correct; if Groq ever unblocks this network it will
// self-heal to healthy automatically).
const enable = db.prepare("UPDATE api_keys SET enabled = 1 WHERE id = (SELECT MAX(id) FROM api_keys WHERE platform = 'groq')");
const e = enable.run();
console.log(`re-enabled ${e.changes} most-recent groq key for continued probing`);

const after = db.prepare("SELECT id, platform, status, enabled, substr(last_health_error, 1, 80) as err FROM api_keys WHERE platform = 'groq'").all();
console.log('AFTER:', JSON.stringify(after, null, 2));
