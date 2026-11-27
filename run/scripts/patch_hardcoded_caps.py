#!/usr/bin/env python3
"""Raise the three hardcoded 15 MB caps to 100 MB (= ABSOLUTE_MAX_BYTES).

These caps predate the tier-aware matrix (Stage 10) and the resumable path
(Stage 13). They were the only guard when every upload was a single multipart
POST. Now the tier matrix (visitor 2 / free 50 / premium 80 / pro 100 MB) is
the single source of truth for per-user file-size limits, enforced at
POST /api/uploads when a session opens. These hardcoded caps are redundant
defenses that accidentally re-block files the tier matrix already accepted.

Raising them to the absolute 100 MB ceiling (parity with ABSOLUTE_MAX_BYTES in
/api/extract and /api/uploads) makes the tier matrix authoritative everywhere.
The route-level ABSOLUTE_MAX_BYTES (100 MB) remains the hard ceiling; these
internal constants now match it instead of duplicating a tighter, stale value.

Files:
  1. src/app/api/knowledge/upload/route.ts      — MAX_FILE_BYTES 15 -> 100 MB
  2. src/lib/agent/knowledge/pipeline.ts        — MAX_FILE_BYTES 15 -> 100 MB
  3. src/app/api/questions/import/extract/route.ts — 15 MB literal -> 100 MB"""
import re

def patch(path, old, new, label):
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()
    if old not in s:
        print(f'  [skip] {label} — anchor not found (already patched?)')
        return False
    s = s.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)
    print(f'  [ok]   {label}')
    return True

# 1. knowledge/upload route
patch(
    '/tmp/my-project/src/app/api/knowledge/upload/route.ts',
    old="const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB (pipeline parity)",
    new=("const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB (= ABSOLUTE cap).\n"
         "// Was 15 MB (pipeline parity) — raised 2026-11-03: the tier matrix\n"
         "// (visitor/free/premium/pro) is now the single source of truth for\n"
         "// per-user file-size limits, enforced at POST /api/uploads. This\n"
         "// constant is the direct-multipart backstop only; the resumable\n"
         "// uploadId path skips it (session was tier-capped at open)."),
    label='knowledge/upload MAX_FILE_BYTES 15 -> 100',
)

# 2. knowledge pipeline
patch(
    '/tmp/my-project/src/lib/agent/knowledge/pipeline.ts',
    old="const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB upload cap (deep-agent parity)",
    new=("const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB (= ABSOLUTE cap).\n"
         "// Was 15 MB — raised 2026-11-03: matches the route + tier ceiling so\n"
         "// the resumable uploadId path isn't re-blocked here after the tier\n"
         "// matrix already accepted the file. The tier matrix (Stage 10) is the\n"
         "// per-user limit; this is just the processing ceiling."),
    label='pipeline MAX_FILE_BYTES 15 -> 100',
)

# 3. import/extract route (literal 15 MB, not a named constant)
patch(
    '/tmp/my-project/src/app/api/questions/import/extract/route.ts',
    old="    // 15 MB cap (matches the knowledge pipeline's MAX_FILE_BYTES)\n    if (file.size > 15 * 1024 * 1024) {\n        { error: `File is too large (${Math.round(file.size / 1024 / 1024)} MB — the limit is 15 MB). Split it into smaller files.` },",
    new=("    // 100 MB cap (the absolute ceiling; the per-tier limit is enforced\n"
         "    // by the visitor-strategy matrix where applicable). Was 15 MB —\n"
         "    // raised 2026-11-03 for parity with /api/uploads + /api/extract.\n"
         "    if (file.size > 100 * 1024 * 1024) {\n"
         "        { error: `File is too large (${Math.round(file.size / 1024 / 1024)} MB — the limit is 100 MB). Split it into smaller files.` },"),
    label='import/extract 15 -> 100',
)

print('patch_hardcoded_caps done')
