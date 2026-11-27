#!/usr/bin/env python3
"""
BFS the import graph from the OpenMAIC client entry files and report every
module that (transitively) imports a node builtin / the Vercel AI SDK —
the things that make Turbopack panic on browser chunk writes with
"does not support external modules (request: node:dns)".
"""
import os, re, sys

ROOT = '/tmp/my-project'
ENTRIES = [
    'src/app/ai-classroom/page.tsx',
]

IMPORT_RE = re.compile(r"""(?:import[^'"]*?from\s*|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]""")
BUILTIN = re.compile(r'^(node:|fs|path|os|dns|net|tls|crypto|http|https|child_process|utilTypes)$')

def resolve(spec, from_dir):
    # '@/x' → src/x ; relative → join ; bare → node_modules (not traced unless flagged)
    if spec.startswith('@/'):
        p = os.path.join('src', spec[2:])
    elif spec.startswith('./') or spec.startswith('../'):
        p = os.path.normpath(os.path.join(from_dir, spec))
    else:
        return None  # npm/bare — flag separately if it matches danger list
    for cand in (p, p + '.ts', p + '.tsx', p + '/index.ts', p + '/index.tsx', p + '.js'):
        if os.path.isfile(os.path.join(ROOT, cand)):
            return cand
    return None

DANGER_NPM = re.compile(r"^(@ai-sdk/|ai$|langchain|@langchain|z-ai-web-dev-sdk|@huggingface)")

bad_modules = {}   # module -> offending import spec
visited = set()
queue = [e for e in ENTRIES]
npm_hits = {}
while queue:
    mod = queue.pop(0)
    if mod in visited:
        continue
    visited.add(mod)
    try:
        src = open(os.path.join(ROOT, mod)).read()
    except OSError:
        continue
    for spec in IMPORT_RE.findall(src):
        if BUILTIN.match(spec):
            bad_modules.setdefault(mod, set()).add(spec)
        target = resolve(spec, os.path.dirname(mod))
        if target:
            queue.append(target)
        elif spec.startswith('@/') or spec.startswith('.'):
            print(f'!! UNRESOLVED {spec} in {mod}', file=sys.stderr)
        elif DANGER_NPM.match(spec):
            npm_hits.setdefault(mod, set()).add(spec)

print(f'graph: {len(visited)} modules from {ENTRIES}')
print()
print('=== modules importing node builtins ===')
for m, specs in sorted(bad_modules.items()):
    print(f'{m}: {sorted(specs)}')
print()
print('=== modules importing danger npm (ai / @ai-sdk / langchain / z-ai / transformers) ===')
for m, specs in sorted(npm_hits.items()):
    print(f'{m}: {sorted(specs)}')
print()
# Walk upward from each bad module to show the client path into it
def parents_of(target):
    rev = {}
    for m in visited:
        src = open(os.path.join(ROOT, m)).read()
        for spec in IMPORT_RE.findall(src):
            t = resolve(spec, os.path.dirname(m))
            if t:
                rev.setdefault(t, set()).add(m)
    return rev

def chain(rev, node, depth=0, seen=None):
    if seen is None: seen = set()
    if node in seen or depth > 8: return []
    seen.add(node)
    best = []
    for p in rev.get(node, []):
        c = [p] + chain(rev, p, depth + 1, seen)
        if len(c) > len(best): best = c
    return best

all_bad = list(bad_modules) + list(npm_hits)
if all_bad:
    rev = parents_of(None) if False else None
    # build reverse lazily
    rev = {}
    for m in visited:
        try: src = open(os.path.join(ROOT, m)).read()
        except OSError: continue
        for spec in IMPORT_RE.findall(src):
            t = resolve(spec, os.path.dirname(m))
            if t: rev.setdefault(t, set()).add(m)
    for b in all_bad:
        path = chain(rev, b)
        print(f'client path to {b}:')
        print('   ' + ' → '.join(reversed(path)))
else:
    print('CLEAN: no node builtins or danger npm imports reachable.')
