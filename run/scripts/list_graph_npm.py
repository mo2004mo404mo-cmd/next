#!/usr/bin/env python3
"""
Trace the /ai-classroom client graph and list EVERY reachable npm package,
so each can be checked for node:dns / node builtin imports. Catches
import-from, dynamic import, require, AND re-export (`export ... from`).
"""
import os, re, sys

ROOT = '/tmp/my-project'
ENTRY = sys.argv[1] if len(sys.argv) > 1 else 'src/app/ai-classroom/page.tsx'

IMPORT_RE = re.compile(r"""(?:import[^'"()]*?from\s*|import\s*\(\s*|require\s*\(\s*|export\s+(?:type\s+)?\{[^}]*\}\s*from\s*)['"]([^'"]+)['"]""")

def resolve(spec, from_dir):
    if spec.startswith('@/'):
        p = os.path.join('src', spec[2:])
    elif spec.startswith('./') or spec.startswith('../'):
        p = os.path.normpath(os.path.join(from_dir, spec))
    else:
        return None
    for cand in (p, p + '.ts', p + '.tsx', p + '.js', p + '/index.ts', p + '/index.tsx', p + '/index.js'):
        if os.path.isfile(os.path.join(ROOT, cand)):
            return cand
    return None

visited, npm = set(), {}
queue = [ENTRY]
typeonly_edges = []
while queue:
    mod = queue.pop(0)
    if mod in visited: continue
    visited.add(mod)
    src = open(os.path.join(ROOT, mod)).read()
    for spec in IMPORT_RE.findall(src):
        target = resolve(spec, os.path.dirname(mod))
        if target:
            queue.append(target)
        elif not spec.startswith(('@/', './', '../')):
            npm.setdefault(spec.split('/')[0] if not spec.startswith('@') else '/'.join(spec.split('/')[:2]), set()).add(spec)
        else:
            print(f'UNRESOLVED {spec} in {mod}', file=sys.stderr)

print(f'graph: {len(visited)} modules')
print('=== reachable npm packages ===')
for pkg in sorted(npm):
    print(f'  {pkg}  (specs: {", ".join(sorted(npm[pkg]))})')
