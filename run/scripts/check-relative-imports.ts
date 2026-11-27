/** Verify all relative imports in src/ resolve to real files (skip src/generated). */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/home/z/my-project/src';
const EXTS = ['', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.css'];
const SKIP_DIRS = new Set(['generated', 'node_modules']);

const files: string[] = [];
(function walk(dir: string) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name));
    } else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(e.name)) {
      files.push(path.join(dir, e.name));
    }
  }
})(ROOT);

const importRe = /(?:import|export)\s+[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
const typeImportRe = /^\s*import\s+type\b/;

// Strip line + block comments so commented-out imports don't count.
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:'"\\])\/\/[^\n]*/g, '$1');
}

let missing = 0;
let checked = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const src = stripComments(raw);
  const lines = src.split('\n');
  let m: RegExpExecArray | null;
  const re = new RegExp(importRe.source, 'g');
  while ((m = re.exec(src)) !== null) {
    const spec = m[1] || m[2] || m[3];
    if (!spec) continue;
    if (spec.startsWith('.')) {
      // skip type-only imports (erased at runtime)
      const lineStart = src.lastIndexOf('\n', m.index) + 1;
      const line = lines[src.slice(0, m.index).split('\n').length - 1] ?? '';
      if (typeImportRe.test(line) || /^import\s+type\b/.test(src.slice(lineStart, m.index))) continue;
    }
    checked++;
    let base: string;
    if (spec.startsWith('@/')) {
      base = path.join(ROOT, spec.slice(2));
    } else if (spec.startsWith('.')) {
      base = path.resolve(path.dirname(f), spec);
    } else {
      continue; // bare package specifier — bun resolves it
    }
    const ok = EXTS.some((e) => {
      const p = base + e;
      if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
      const idx = base + '/index' + e;
      return fs.existsSync(idx) && fs.statSync(idx).isFile();
    });
    if (!ok) {
      missing++;
      console.log(`MISSING: ${path.relative(ROOT, f)} -> ${spec}`);
    }
  }
}
console.log(`\nchecked ${checked} imports across ${files.length} files — ${missing} missing`);
