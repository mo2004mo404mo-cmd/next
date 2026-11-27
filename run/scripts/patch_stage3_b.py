#!/usr/bin/env python3
"""Fix-up patcher: (a) KnowledgeSource.scenes relation (spacing-safe anchor),
(b) line-based splice of the new extractVideoContent (lines 415-503)."""
import sys

PROJECT = "/tmp/my-project"

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def write(p, c):
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)

ok = True

# (a) KnowledgeSource.scenes relation — unique 2-line anchor
schema_path = PROJECT + "/prisma/schema.prisma"
schema = read(schema_path)
if "  scenes      VideoScene[]" in schema:
    print("  [skip] schema: KnowledgeSource.scenes relation")
elif "  documents   KnowledgeDocument[]\n  chunks      KnowledgeChunk[]" not in schema:
    print("  [FAIL] schema: KnowledgeSource anchor not found")
    ok = False
else:
    schema = schema.replace(
        "  documents   KnowledgeDocument[]\n  chunks      KnowledgeChunk[]",
        "  documents   KnowledgeDocument[]\n  chunks      KnowledgeChunk[]\n  scenes      VideoScene[]",
        1,
    )
    write(schema_path, schema)
    print("  [ ok ] schema: KnowledgeSource.scenes relation")

# (b) extractVideoContent line splice
im_path = PROJECT + "/src/lib/agent/knowledge/ingest-media.ts"
lines = read(im_path).split("\n")  # keep exact file content, 0-indexed
new_fn = read("/home/z/my-project/staging/new-extract-video-content.ts").rstrip("\n")

start = end = None
for i, line in enumerate(lines):
    if line.startswith("export async function extractVideoContent("):
        start = i
        break
if start is None:
    print("  [FAIL] extractVideoContent start not found")
    ok = False
else:
    for j in range(start, len(lines)):
        if lines[j] == "}":
            end = j  # first column-0 closing brace after the function start
            break
    if end is None:
        print("  [FAIL] extractVideoContent end not found")
        ok = False
    else:
        # sanity: the replaced region must contain the old signature's return type
        region = "\n".join(lines[start:end + 1])
        if "scenes: VideoSceneInput[]" in region:
            print("  [skip] extractVideoContent already replaced")
        else:
            lines[start:end + 1] = new_fn.split("\n")
            write(im_path, "\n".join(lines))
            print(f"  [ ok ] extractVideoContent replaced (lines {start+1}-{end+1} -> {len(new_fn.split(chr(10)))} lines)")

print("ALL OK" if ok else "FAILED")
sys.exit(0 if ok else 1)
