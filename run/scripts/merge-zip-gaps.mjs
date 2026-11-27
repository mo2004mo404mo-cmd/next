// Merge the 07:36 delivery zip into the restored project WITHOUT overwriting
// any file that already exists (the /tmp/my-project overlay is newer — it
// carries the 502-recovery fix and the agent-UI work). Only fills gaps.
import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = '/home/z/my-project';
const ZIP = join(ROOT, 'public/medq-app-full-20261021.zip');

// All zip entries (paths only)
const listing = execSync(`unzip -Z1 '${ZIP}'`, { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 })
  .split('\n').map(s => s.trim()).filter(s => s.length > 0 && !s.endsWith('/'));

const missing = [];
const skippedExisting = 0;
for (const entry of listing) {
  if (entry === '.env' || entry === 'freellmapi/.env') continue; // keep real env files
  if (entry.startsWith('freellmapi/server/data/')) continue;     // keep keys DB from tmp
  const target = join(ROOT, entry);
  if (!existsSync(target)) missing.push(entry);
}
console.log(`zip entries: ${listing.length}, gaps to fill: ${missing.length}`);

// Extract in batches through a command file list (arg-length safe)
const BATCH = 300;
for (let i = 0; i < missing.length; i += BATCH) {
  const batch = missing.slice(i, i + BATCH);
  const args = batch.map(p => `'${p.replace(/'/g, "'\\''")}'`).join(' ');
  execSync(`unzip -q -o '${ZIP}' ${args} -d '${ROOT}'`, { maxBuffer: 1024 * 1024 * 64 });
}
console.log('extracted all gap files');

// Report what got filled by area
const areas = {};
for (const p of missing) {
  const top = p.split('/').slice(0, 2).join('/');
  areas[top] = (areas[top] ?? 0) + 1;
}
console.log('filled by area:', JSON.stringify(areas, null, 0));
