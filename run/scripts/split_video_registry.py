#!/usr/bin/env python3
"""
Split src/lib/media/video-providers.ts into:
  - video-provider-registry.ts — pure data (VIDEO_PROVIDERS) + the pure
    normalizeVideoOptions() helper. ZERO adapter imports → browser-safe.
  - video-providers.ts — keeps the dispatchers (testVideoConnectivity,
    generateVideo) that import the crypto-signing adapters, re-exports the
    registry for backward compat.

Why: kling-adapter imports node 'crypto' (HMAC signing) and video-providers
imported it at module level, so every CLIENT consumer of VIDEO_PROVIDERS
(OpenMAIC settings store + components) pulled node:crypto into the browser
chunk graph — same Turbopack browser-chunk panic class as node:dns.
"""

SRC = '/tmp/my-project/src/lib/media/video-providers.ts'
DST = '/tmp/my-project/src/lib/media/video-provider-registry.ts'

with open(SRC) as f:
    lines = f.read().split('\n')

def expect(idx0, needle):
    assert needle in lines[idx0], f"line {idx0+1}: expected {needle!r}, got {lines[idx0][:80]!r}"

# 1-indexed map (verified):
#  22: export const VIDEO_PROVIDERS ... = {
#  ~123: closing '};' of VIDEO_PROVIDERS — find it
# 124: export async function testVideoConnectivity(
# 153: export function normalizeVideoOptions(
# 189/190: export async function generateVideo(
expect(21, 'export const VIDEO_PROVIDERS')
expect(123, 'export async function testVideoConnectivity(')
expect(152, 'export function normalizeVideoOptions(')
expect(189, 'export async function generateVideo(')

# VIDEO_PROVIDERS block = 22 .. (start of testVideoConnectivity minus its jsdoc)
# find the '};' end of VIDEO_PROVIDERS: scan from line 124 backwards for the jsdoc start
providers_end = None
for i in range(122, 21, -1):  # 0-indexed lines[121]..lines[22]
    if lines[i].startswith('};'):
        providers_end = i  # 0-indexed line with '};'
        break
assert providers_end is not None, 'VIDEO_PROVIDERS end not found'
providers_block = '\n'.join(lines[21:providers_end + 1])
assert '@' not in providers_block.replace('@id', '').replace("'@'", ''), 'unexpected decorator in data block'

registry = f"""/**
 * Video provider REGISTRY — pure data, browser-safe.
 *
 * The client-safe half of src/lib/media/video-providers.ts: the
 * VIDEO_PROVIDERS config table and the pure normalizeVideoOptions() helper,
 * with ZERO adapter imports. The dispatchers that call the provider adapters
 * (which import node 'crypto' for HMAC signing etc.) stay in
 * video-providers.ts — importing them here would drag node builtins into
 * browser chunks, which Turbopack refuses to write
 * ("chunking context does not support external modules").
 *
 * Client code imports from './video-provider-registry'; server code can use
 * either (video-providers.ts re-exports this registry).
 */

import type {{
  VideoProviderId,
  VideoGenerationOptions,
  VideoProviderConfig,
}} from './types';

{providers_block}

/**
 * Normalize video generation options against provider capabilities.
 * Ensures duration, aspectRatio, and resolution are valid for the given provider.
 * Falls back to the first supported value when the requested value is unsupported.
 */
{chr(10).join(lines[152:188])}
"""

with open(DST, 'w') as f:
    f.write(registry)

print(f'registry written: {len(registry.splitlines())} lines')
print('verify by hand: tail of registry should end with normalizeVideoOptions return;')
