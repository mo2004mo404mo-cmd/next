"""c3: production-gated safeFetch migration for BYOK-exposed adapters.

1. Add `httpFetch(url, init)` to ssrf-guard.ts — production-gated:
   NODE_ENV=production → safeFetch (pre-flight + connect-time DNS pin);
   otherwise → global fetch (dev keeps working with local gateways like
   localhost Ollama/Lemonade, mirroring the existing route-level gating
   `if (clientBaseUrl && process.env.NODE_ENV === 'production')`).

2. Swap the fetch calls in the two BYOK-exposed files:
   - src/lib/media/adapters/openai-image-adapter.ts (2 sites: connectivity
     test + generation) — the generic OpenAI-compatible image path.
   - src/lib/audio/tts-providers.ts (2 sites: openai-tts + lemonade-tts —
     the OpenAI-compatible TTS paths).

Other adapters (seedream/qwen/kling/minimax/veo/happyhorse/seedance) are
managed-provider paths with operator-pinned baseUrls — left on global
fetch (documented in the runbook).

Idempotent.
"""
from pathlib import Path

PROJECT = Path("/tmp/my-project")
SSRF = PROJECT / "src/lib/server/ssrf-guard.ts"
IMG_ADAPTER = PROJECT / "src/lib/media/adapters/openai-image-adapter.ts"
TTS = PROJECT / "src/lib/audio/tts-providers.ts"

# ── 1. httpFetch helper in ssrf-guard.ts ──
ssrf_src = SSRF.read_text()
HELPER = """

/**
 * Production-gated fetch for provider adapter code.
 *
 *   NODE_ENV=production → safeFetch (pre-flight + connect-time DNS pin —
 *                          full DNS-rebinding defense)
 *   otherwise (dev)     → global fetch (local gateways like localhost
 *                          Ollama/Lemonade keep working, exactly mirroring
 *                          the route-level gating that only SSRF-checks
 *                          client baseUrls in production)
 *
 * Use this in adapter modules that fetch a config.baseUrl which may be
 * client-supplied (BYOK). Managed-provider adapters with operator-pinned
 * baseUrls can keep using global fetch.
 */
export async function httpFetch(url: string, init?: RequestInit): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return safeFetch(url, init);
  }
  return fetch(url, init);
}
"""
if "httpFetch" in ssrf_src:
    print("[ssrf-guard.ts] httpFetch already present, skipping")
else:
    SSRF.write_text(ssrf_src.rstrip() + "\n" + HELPER + "\n")
    print("[ssrf-guard.ts] added httpFetch helper")

# ── 2a. openai-image-adapter.ts ──
img_src = IMG_ADAPTER.read_text()
if "httpFetch" in img_src:
    print("[openai-image-adapter.ts] already migrated, skipping")
else:
    new_src = img_src
    # Add the import after the types import block.
    IMPORT_ANCHOR = "} from '../types';"
    if IMPORT_ANCHOR in new_src:
        new_src = new_src.replace(
            IMPORT_ANCHOR,
            IMPORT_ANCHOR + "\n\nimport { httpFetch } from '@/lib/server/ssrf-guard';",
            1,
        )
        print("[openai-image-adapter.ts] added httpFetch import")
    else:
        raise SystemExit("[openai-image-adapter.ts] FATAL: import anchor not found")

    # Swap the two fetch sites.
    OLD1 = """    const response = await fetch(
      `${baseUrl}/models/${encodeURIComponent(config.model || DEFAULT_MODEL)}`,"""
    NEW1 = """    const response = await httpFetch(
      `${baseUrl}/models/${encodeURIComponent(config.model || DEFAULT_MODEL)}`,"""
    OLD2 = """  const response = await fetch(`${baseUrl}/images/generations`, {"""
    NEW2 = """  const response = await httpFetch(`${baseUrl}/images/generations`, {"""
    count = 0
    if OLD1 in new_src:
        new_src = new_src.replace(OLD1, NEW1, 1); count += 1
    if OLD2 in new_src:
        new_src = new_src.replace(OLD2, NEW2, 1); count += 1
    print(f"[openai-image-adapter.ts] swapped {count} fetch sites")
    IMG_ADAPTER.write_text(new_src)

# ── 2b. tts-providers.ts (openai-tts + lemonade-tts) ──
tts_src = TTS.read_text()
if "httpFetch" in tts_src:
    print("[tts-providers.ts] already migrated, skipping")
else:
    new_src = tts_src
    # Add the import at the top — after the first existing import line.
    lines = new_src.split("\n")
    # Find the first import statement to append after.
    for i, line in enumerate(lines):
        if line.startswith("import "):
            # Insert after the LAST contiguous import (scan forward).
            j = i
            while j + 1 < len(lines) and (lines[j + 1].startswith("import ") or lines[j + 1].startswith("  ") or lines[j + 1].rstrip().endswith(";")):
                j += 1
            lines.insert(j + 1, "import { httpFetch } from '@/lib/server/ssrf-guard';")
            break
    new_src = "\n".join(lines)
    print("[tts-providers.ts] added httpFetch import")

    # Swap the openai-tts + lemonade-tts fetch sites.
    OLD_OAI = """  const response = await fetch(`${baseUrl}/audio/speech`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json; charset=utf-8',
    },"""
    NEW_OAI = """  const response = await httpFetch(`${baseUrl}/audio/speech`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json; charset=utf-8',
    },"""
    OLD_LEM = """  const response = await fetch(`${baseUrl}/audio/speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...getBackendAuthHeaders(config.apiKey),
    },"""
    NEW_LEM = """  const response = await httpFetch(`${baseUrl}/audio/speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...getBackendAuthHeaders(config.apiKey),
    },"""
    count = 0
    if OLD_OAI in new_src:
        new_src = new_src.replace(OLD_OAI, NEW_OAI, 1); count += 1
    if OLD_LEM in new_src:
        new_src = new_src.replace(OLD_LEM, NEW_LEM, 1); count += 1
    print(f"[tts-providers.ts] swapped {count} fetch sites")
    TTS.write_text(new_src)
