// Scan all TS/TSX files under src/ for @/ imports and report ones that don't
// resolve to a file on disk (missing .ts/.tsx/.js/.jsx/index.*).
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = '/home/z/my-project';
const SRC = join(ROOT, 'src');
const missing = new Map(); // module -> [importers]

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(p);
  }
  return out;
}

function resolvesTo(absNoExt) {
  for (const ext of ['.ts', '.tsx', '.js', '.jsx', '.mjs']) {
    if (existsSync(absNoExt + ext)) return true;
  }
  for (const idx of ['index.ts', 'index.tsx', 'index.js']) {
    if (existsSync(join(absNoExt, idx))) return true;
  }
  return false;
}

const files = walk(SRC);
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const re = /['"](@\/[^'"]+)['"]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const module = m[1];
    const abs = resolve(SRC, '.' + module.slice(1));
    if (!resolvesTo(abs)) {
      if (!missing.has(module)) missing.set(module, []);
      missing.get(module).push(f.replace(ROOT + '/', ''));
    }
  }
}

if (missing.size === 0) {
  console.log('ALL @/ IMPORTS RESOLVE — no missing modules');
} else {
  for (const [mod, importers] of missing) {
    console.log(`MISSING ${mod}`);
    for (const imp of [...new Set(importers)].slice(0, 5)) console.log(`   imported by ${imp}`);
  }
}
console.log(`scanned ${files.length} files`);
