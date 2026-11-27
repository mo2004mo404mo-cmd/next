#!/usr/bin/env python3
"""Rewrite video-providers.ts: drop the moved registry/normalize blocks,
import + re-export them from video-provider-registry.ts, keep dispatchers."""
SRC = '/tmp/my-project/src/lib/media/video-providers.ts'
with open(SRC) as f:
    lines = f.read().split('\n')

# 1-indexed: imports 1-20 (types 5-11, adapters 12-20), VIDEO_PROVIDERS 22-121,
# blank 122-123, testVideoConnectivity 124-147, blank 148,
# normalizeVideoOptions jsdoc+fn 149-188, blank 189, generateVideo 190-211.
assert 'export const VIDEO_PROVIDERS' in lines[21]
assert 'export async function testVideoConnectivity(' in lines[123]
assert 'export async function generateVideo(' in lines[189]

adapter_imports = '\n'.join(lines[11:20])  # lines 12-20 (adapter imports)
test_fn = '\n'.join(lines[123:147])        # testVideoConnectivity body 124-147
gen_fn = '\n'.join(lines[189:])            # generateVideo to EOF

new = f"""/**
 * Video Generation Service -- routes to provider adapters
 *
 * 2026-11-04: the pure registry (VIDEO_PROVIDERS) and normalizeVideoOptions
 * moved to ./video-provider-registry — a browser-safe module with ZERO
 * adapter imports. The dispatchers below import the provider adapters, which
 * use node builtins (crypto for HMAC signing, safeFetch/DNS checks), so THIS
 * file must never be imported from client code. Server consumers can import
 * from either module (the registry is re-exported below for compat).
 */

import type {{
  VideoGenerationConfig,
  VideoGenerationOptions,
  VideoGenerationResult,
}} from './types';
import {{ VIDEO_PROVIDERS }} from './video-provider-registry';
// Re-exported for backward compatibility — existing server imports of
// VIDEO_PROVIDERS / normalizeVideoOptions from './video-providers' keep working.
export {{ VIDEO_PROVIDERS, normalizeVideoOptions }} from './video-provider-registry';
{adapter_imports}

{test_fn}

{gen_fn}
"""

with open(SRC, 'w') as f:
    f.write(new)
print(f'video-providers.ts rewritten: {len(new.splitlines())} lines (was {len(lines)})')
