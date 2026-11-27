#!/usr/bin/env python3
"""Verify every `@/` and relative import in src/ + freellmapi resolves to a file."""
import os, re, sys

ROOT = '/home/z/my-project'
# alias root per source tree: main app @ -> src/, freellmapi client @ -> its own src/
EXTS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '/index.ts', '/index.tsx', '/index.js', '.css']

import_re = re.compile(r'''(?:import\s[^'"]*?from\s*|import\s*\(\s*|require\s*\(\s*|export\s[^'"]*?from\s*)['"]([^'"]+)['"]''')

missing = []
scanned = 0

def resolves(spec: str, from_dir: str) -> bool:
    if spec.startswith('@/'):
        # freellmapi client files alias @ to their own src
        if 'freellmapi/client' in from_dir:
            base_dir = os.path.join(ROOT, 'freellmapi/client/src')
        elif 'freellmapi/server' in from_dir:
            base_dir = os.path.join(ROOT, 'freellmapi/server/src')
        else:
            base_dir = os.path.join(ROOT, 'src')
        paths = [os.path.join(base_dir, spec[2:])]
    elif spec.startswith('.'):
        paths = [os.path.normpath(os.path.join(from_dir, spec))]
    else:
        return True  # bare package spec — node_modules, skip
    for p in paths:
        for ext in ['', *EXTS]:
            cand = p + ext
            if os.path.isfile(cand):
                return True
        # compiled-import convention: foo.js may be emitted from foo.ts / foo.tsx
        if p.endswith('.js'):
            for alt in p[:-3] + '.ts', p[:-3] + '.tsx':
                if os.path.isfile(alt):
                    return True
    return False

for sub in ['src', 'freellmapi/client/src', 'freellmapi/server/src']:
    top = os.path.join(ROOT, sub)
    for dirpath, _dirs, files in os.walk(top):
        if 'node_modules' in dirpath or 'generated' in dirpath or dirpath.endswith('dist') or '__tests__' in dirpath:
            continue
        for fn in files:
            if not fn.endswith(('.ts', '.tsx', '.js', '.jsx', '.mjs')) or '.test.' in fn:
                continue
            path = os.path.join(dirpath, fn)
            scanned += 1
            try:
                text = open(path, encoding='utf-8', errors='ignore').read()
            except OSError:
                continue
            for m in import_re.finditer(text):
                spec = m.group(1)
                if spec.endswith('.css') or spec.startswith('virtual:'):
                    continue
                if not resolves(spec, dirpath):
                    missing.append((os.path.relpath(path, ROOT), spec))

print(f'scanned {scanned} files')
if missing:
    print(f'MISSING {len(missing)}:')
    for f, s in sorted(set(missing)):
        print(f'  {f}  ->  {s}')
    sys.exit(1)
print('all imports resolve OK')
