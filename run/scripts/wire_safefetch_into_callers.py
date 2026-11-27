"""Wire safeFetch into existing SSRF caller routes.

byok-test.ts is the only caller where the user-supplied URL fetch site is
co-located with the validateUrlForSSRF pre-flight. Swap fetch -> safeFetch
in fetchWithTimeout so the connect-time DNS pin actually runs.

The other 6 callers (resolve-model.ts x2, voice/video/tts/image routes x4)
only do pre-flight; their actual fetches are in adapter code that takes
baseUrl as a string. For those, add a forward-reference comment pointing
at safeFetch + the runbook, but leave the validateUrlForSSRF call (the
pre-flight is still valuable — it gives the user a clean error message
before the adapter even starts).

Idempotent.
"""
from pathlib import Path

PROJECT = Path("/tmp/my-project")

# ── byok-test.ts: swap fetch -> safeFetch ──
BYOK = PROJECT / "src/lib/server/byok-test.ts"
byok_src = BYOK.read_text()

OLD_BYOK_IMPORT = "import { validateUrlForSSRF } from '@/lib/server/ssrf-guard';"
NEW_BYOK_IMPORT = "import { validateUrlForSSRF, safeFetch } from '@/lib/server/ssrf-guard';"

OLD_FETCH = """async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}"""

NEW_FETCH = """async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Stage 9: safeFetch pre-flights the URL AND pins the connect-time DNS
    // lookup through an undici Agent with a custom lookup that re-validates
    // IPs at connect time. This closes the DNS-rebinding TOCTOU gap between
    // the validateUrlForSSRF pre-flight (line 77) and the actual fetch.
    // See docs/runbook.md#ssrf-blocked.
    return await safeFetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}"""

if "safeFetch" in byok_src and NEW_FETCH.split("\n", 1)[0] in byok_src:
    print("[byok-test.ts] already patched, skipping")
else:
    if OLD_BYOK_IMPORT in byok_src:
        byok_src = byok_src.replace(OLD_BYOK_IMPORT, NEW_BYOK_IMPORT, 1)
        print("[byok-test.ts] added safeFetch import")
    if OLD_FETCH in byok_src:
        byok_src = byok_src.replace(OLD_FETCH, NEW_FETCH, 1)
        print("[byok-test.ts] swapped fetch -> safeFetch in fetchWithTimeout")
    else:
        print("[byok-test.ts] WARNING: fetchWithTimeout anchor not found")
    BYOK.write_text(byok_src)

# ── Other 6 callers: add forward-reference comment ──
COMMENT = (
    "    // NOTE: validateUrlForSSRF is the PRE-FLIGHT check. The actual fetch\n"
    "    // happens downstream in the provider adapter (which takes `baseUrl`\n"
    "    // as a string and does its own fetch). For full DNS-rebinding defense\n"
    "    // (connect-time pinning), the adapter should be migrated to use\n"
    "    // safeFetch from '@/lib/server/ssrf-guard'. See docs/runbook.md#ssrf-blocked.\n"
)

# Pattern: insert the comment BEFORE the line `const ssrfError = await validateUrlForSSRF(...);`
import re
PAT = re.compile(r"^(\s*)const ssrfError = await validateUrlForSSRF\(", re.MULTILINE)

FILES = [
    PROJECT / "src/lib/server/resolve-model.ts",
    PROJECT / "src/app/api/generate/voice/route.ts",
    PROJECT / "src/app/api/generate/video/route.ts",
    PROJECT / "src/app/api/generate/tts/route.ts",
    PROJECT / "src/app/api/generate/image/route.ts",
]

for f in FILES:
    if not f.exists():
        print(f"[{f.name}] file not found, skipping")
        continue
    src = f.read_text()
    if "safeFetch from '@/lib/server/ssrf-guard'" in src:
        print(f"[{f.name}] already has forward-reference comment, skipping")
        continue
    # Find each validateUrlForSSRF call and insert the comment before it.
    # Use a substitution that preserves indentation.
    def add_comment(m):
        indent = m.group(1)
        return COMMENT + indent + "const ssrfError = await validateUrlForSSRF("
    new_src = PAT.sub(add_comment, src)
    if new_src != src:
        f.write_text(new_src)
        # Count insertions
        count = len(PAT.findall(src))
        print(f"[{f.name}] inserted {count} forward-reference comment(s)")
    else:
        print(f"[{f.name}] WARNING: no validateUrlForSSRF call found")
