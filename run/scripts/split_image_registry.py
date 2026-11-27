#!/usr/bin/env python3
"""Split image-providers.ts into image-provider-registry.ts (pure data,
browser-safe) + dispatchers. Mirror of split_video_registry.py."""
import re

SRC = '/tmp/my-project/src/lib/media/image-providers.ts'
DST = '/tmp/my-project/src/lib/media/image-provider-registry.ts'

lines = open(SRC).read().split('\n')
assert 'export const IMAGE_PROVIDERS' in lines[33], lines[33]
assert 'export async function testImageConnectivity(' in lines[152], lines[152]

# find '};' end of IMAGE_PROVIDERS (scan back from 152)
end = None
for i in range(151, 33, -1):
    if lines[i].startswith('};'):
        end = i
        break
assert end is not None
data_block = '\n'.join(lines[33:end + 1])
assert 'ssrf' not in data_block and 'adapter' not in data_block.replace('adapters/', '')

registry = f"""/**
 * Image provider REGISTRY — pure data, browser-safe.
 *
 * The client-safe half of src/lib/media/image-providers.ts: the
 * IMAGE_PROVIDERS config table, with ZERO adapter imports. The dispatchers
 * that call the provider adapters stay in image-providers.ts — the adapters
 * use server-only helpers (openai-image-adapter imports @/lib/server/ssrf-guard,
 * which needs node:dns / node:net for DNS-rebinding protection), and importing
 * them from client modules drags node builtins into browser chunks, which
 * Turbopack refuses to write
 * ("chunking context does not support external modules (request: node:dns)").
 *
 * Client code imports from './image-provider-registry'; server code can use
 * either (image-providers.ts re-exports this registry).
 */

import type {{ ImageProviderId, ImageProviderConfig }} from './types';

{data_block}
"""
open(DST, 'w').write(registry)

# Get type names needed by dispatchers + the import block (lines 5-11 → types) + adapters (12-32)
type_import = '\n'.join(lines[4:11])   # lines 5..11
adapter_imports = '\n'.join(lines[11:33])  # lines 12..33 (up to line before IMAGE_PROVIDERS at 34)
test_fn = '\n'.join(lines[152:185])   # testImageConnectivity 153..185
gen_fn = '\n'.join(lines[185:])       # generateImage to EOF

new_src = f"""/**
 * Image Generation Service — routes to provider adapters
 *
 * 2026-11-04: the pure registry (IMAGE_PROVIDERS) moved to
 * ./image-provider-registry — a browser-safe module with ZERO adapter
 * imports. The dispatchers below import the provider adapters, which use
 * server-only helpers (ssrf-guard → node:dns/node:net), so THIS file must
 * never be imported from client code. Server consumers can import from
 * either module (the registry is re-exported below for compat).
 */

{type_import}
// Re-exported for backward compatibility — existing server imports of
// IMAGE_PROVIDERS from './image-providers' keep working.
export {{ IMAGE_PROVIDERS }} from './image-provider-registry';
{adapter_imports}

{test_fn}

{gen_fn}
"""
open(SRC, 'w').write(new_src)
print(f'image-provider-registry.ts: {len(registry.splitlines())} lines; image-providers.ts: {len(new_src.splitlines())} lines (was {len(lines)})')
