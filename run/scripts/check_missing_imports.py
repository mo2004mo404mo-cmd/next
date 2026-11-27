#!/usr/bin/env python3
"""Find genuinely-missing @/ imports (ignoring comments) and map them to
the app routes (src/app/**) that transitively depend on them."""
import os
import re

ROOT = "/home/z/my-project"
SRC = os.path.join(ROOT, "src")

import_re = re.compile(r"from\s+['\"]@/([^'\"]+)['\"]|import\s*\(\s*['\"]@/([^'\"]+)['\"]\s*\)|import\s+['\"]@/([^'\"]+)['\"]")
extensions = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx", "/index.js"]

def strip_comments(text: str) -> str:
    # remove /* */ blocks and // line comments (good enough for import scanning)
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    text = re.sub(r"^\s*//.*$", "", text, flags=re.M)
    return text

def resolve(spec: str) -> bool:
    target = os.path.join(SRC, spec)
    return any(os.path.isfile(target + e) for e in extensions)

# build file -> set of imported specs (only @/ alias, active code only)
graph = {}
for dirpath, _dirs, files in os.walk(SRC):
    for fn in files:
        if not fn.endswith((".ts", ".tsx")):
            continue
        path = os.path.join(dirpath, fn)
        rel = os.path.relpath(path, ROOT)
        try:
            text = strip_comments(open(path, encoding="utf-8", errors="replace").read())
        except OSError:
            continue
        specs = set()
        for m in import_re.finditer(text):
            spec = m.group(1) or m.group(2) or m.group(3)
            if spec:
                specs.add(spec)
        graph[rel] = specs

missing = {}
for rel, specs in graph.items():
    for spec in specs:
        if not resolve(spec):
            missing.setdefault(spec, set()).add(rel)

print(f"GENUINELY MISSING ({len(missing)}):")
for spec in sorted(missing):
    print(f"  @{spec}")

# reverse-dependency BFS: for each missing module, find route files that reach it
route_re = re.compile(r"^src/app/(api/)?")
print("\n=== ROUTES AFFECTED ===")
for spec in sorted(missing):
    # BFS backwards: who imports spec (directly or transitively)
    reach = {frozenset()}
    # invert graph
    importers = {f for f, s in graph.items() if spec in s}
    frontier = set(importers)
    seen = set(importers)
    while frontier:
        f = frontier.pop()
        for g, s in graph.items():
            if f in s and g not in seen:
                seen.add(g)
                frontier.add(g)
    routes = sorted(f for f in seen if route_re.match(f))
    if routes:
        print(f"\n@{spec}:")
        for r in routes[:8]:
            print(f"    {r}")
        if len(routes) > 8:
            print(f"    ... +{len(routes)-8} more")
    else:
        print(f"\n@{spec}: (no route reaches it — dead code only)")
