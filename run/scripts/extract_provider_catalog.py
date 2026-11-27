#!/usr/bin/env python3
"""
Extract the pure provider CATALOG out of src/lib/ai/providers.ts into a new
dependency-free module src/lib/ai/provider-catalog.ts.

Why: providers.ts imports the Vercel AI SDK ('ai' + @ai-sdk/{openai,anthropic,
google}) for server-side model factories. @ai-sdk/provider-utils (reached via
'ai') imports node:dns in its safe-node-fetch.ts. OpenMAIC's client settings
panels import the PROVIDERS / MONO_LOGO_PROVIDERS constants from providers.ts,
which drags the whole SDK — and its node:dns — into the BROWSER chunk graph.
Turbopack refuses to write browser chunks containing external node modules
("the chunking context does not support external modules (request: node:dns)")
→ GET /ai-classroom panicked with a 500, and any / route graph containing the
openmaic subtree would panic the same way.

Fix: move the pure data (PROVIDERS, MONO_LOGO_PROVIDERS) + type re-exports
into provider-catalog.ts with ZERO npm runtime deps. providers.ts imports and
re-exports them (backward compat for all server consumers), and the openmaic
client files switch their import specifier to the catalog module (done in a
separate edit step).
"""

SRC = '/tmp/my-project/src/lib/ai/providers.ts'
DST = '/tmp/my-project/src/lib/ai/provider-catalog.ts'

with open(SRC) as f:
    lines = f.read().split('\n')  # 0-indexed: line N (1-indexed) = lines[N-1]

def expect(idx0, needle):
    assert needle in lines[idx0], f"line {idx0+1}: expected {needle!r}, got: {lines[idx0][:80]!r}"

# 1-indexed boundaries (verified against the file map):
#   55  : export const MONO_LOGO_PROVIDERS ...
#   60  : export const PROVIDERS: Record<ProviderId, ProviderConfig> = {
#   1317: };          (closing brace of PROVIDERS)
expect(54, 'export const MONO_LOGO_PROVIDERS')
expect(59, 'export const PROVIDERS')
expect(1316, '};')

mono_line = lines[54]                       # MONO_LOGO_PROVIDERS (1 line)
providers_block = '\n'.join(lines[59:1317])  # lines 60..1317 inclusive
assert providers_block.rstrip().endswith('};'), 'PROVIDERS block must end with };'
assert 'from \'ai\'' not in providers_block and '@ai-sdk' not in providers_block, \
    'PROVIDERS block must be pure data (no SDK imports)'

catalog = f"""/**
 * Pure AI provider CATALOG — client-safe provider/mode data.
 *
 * This module is the dependency-free half of src/lib/ai/providers.ts: the
 * PROVIDERS registry (ids, names, base URLs, logos, model catalogs) and
 * MONO_LOGO_PROVIDERS, plus the shared provider types. It deliberately has
 * ZERO npm runtime imports so browser chunks can use it safely.
 *
 * Why the split exists (2026-11-04): providers.ts imports the Vercel AI SDK
 * ('ai' + the @ai-sdk/* provider packages) for server-side model factories,
 * and @ai-sdk/provider-utils (reached via 'ai') imports node:dns in its
 * safe-node-fetch.ts. OpenMAIC's client settings panels need the provider
 * CATALOG, and importing it from providers.ts dragged the whole SDK — and its
 * node:dns — into the browser chunk graph, which Turbopack refuses to write
 * ("chunking context does not support external modules (request: node:dns)")
 * → GET /ai-classroom panicked with a 500. Client code MUST import from
 * './provider-catalog', never from './providers'; server code can use either
 * (providers.ts re-exports this catalog for backward compatibility).
 */

import type {{ ProviderId, ProviderConfig, ModelInfo, ModelConfig }} from '@/lib/types/provider';

// Re-export types for backward compatibility
export type {{ ProviderId, ProviderConfig, ModelInfo, ModelConfig }};

{mono_line}

/**
 * Provider registry
 */
{providers_block}
"""

with open(DST, 'w') as f:
    f.write(catalog)

# ── Now cut the moved blocks out of providers.ts ──
# Replace MONO_LOGO_PROVIDERS (line 55) and the PROVIDERS block (60-1317)
# with a compact import + re-export of the new catalog module.
replacement = (
    "// 2026-11-04: the pure catalog (PROVIDERS, MONO_LOGO_PROVIDERS) moved to\n"
    "// ./provider-catalog — a dependency-free module safe for browser chunks\n"
    "// (this file pulls in the Vercel AI SDK, whose @ai-sdk/provider-utils\n"
    "// imports node:dns — a browser-chunk panic under Turbopack). Re-exported\n"
    "// here so server consumers keep working unchanged.\n"
    "import {{ PROVIDERS, MONO_LOGO_PROVIDERS }} from './provider-catalog';\n"
    "export {{ PROVIDERS, MONO_LOGO_PROVIDERS }} from './provider-catalog';"
)
# lines[54] is MONO; lines[59:1317] is the PROVIDERS block (incl. '};')
new_lines = lines[:54] + [replacement] + lines[55:59] + lines[1317:]
with open(SRC, 'w') as f:
    f.write('\n'.join(new_lines))

print(f"provider-catalog.ts written ({len(catalog.splitlines())} lines)")
print(f"providers.ts now {len(new_lines)} lines (was {len(lines)})")
