#!/usr/bin/env python3
"""Patch the import/extract 15MB cap (exact whitespace from file read)."""
P = '/tmp/my-project/src/app/api/questions/import/extract/route.ts'
with open(P, 'r', encoding='utf-8') as f:
    s = f.read()

old = (
    "    // 15 MB cap (matches the knowledge pipeline's MAX_FILE_BYTES)\n"
    "    if (file.size > 15 * 1024 * 1024) {\n"
    "      return NextResponse.json(\n"
    "        { error: `File is too large (${Math.round(file.size / 1024 / 1024)} MB — the limit is 15 MB). Split it into smaller files.` },\n"
    "        { status: 413 },\n"
    "      );\n"
    "    }\n"
)
new = (
    "    // 100 MB cap (the absolute ceiling; per-tier limits are enforced by\n"
    "    // the visitor-strategy matrix where applicable). Was 15 MB — raised\n"
    "    // 2026-11-03 for parity with /api/uploads + /api/extract + the\n"
    "    // knowledge pipeline. The tier matrix (Stage 10) is the per-user\n"
    "    // limit; this is the processing ceiling.\n"
    "    if (file.size > 100 * 1024 * 1024) {\n"
    "      return NextResponse.json(\n"
    "        { error: `File is too large (${Math.round(file.size / 1024 / 1024)} MB — the limit is 100 MB). Split it into smaller files.` },\n"
    "        { status: 413 },\n"
    "      );\n"
    "    }\n"
)
if old not in s:
    print('  [fail] anchor not found')
    raise SystemExit(1)
s = s.replace(old, new, 1)
with open(P, 'w', encoding='utf-8') as f:
    f.write(s)
print('  [ok] import/extract 15 -> 100')
