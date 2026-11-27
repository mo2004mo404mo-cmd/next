#!/bin/bash
# Production build for the 4GB box — THE MEMORY RECIPE (do not deviate):
#
#   bunx/turbopack builds OOM-die at ~3.4GB (native Rust, uncappable).
#   `next build --webpack` under bun ignores NODE_OPTIONS (JSC runtime).
#   `next build --webpack` under NODE with --max-old-space-size=2048+ gets
#   kernel-OOM-killed (~3.5GB RSS); 1536 aborts (heap too small).
#   The sweet spot: 1792MB V8 heap (+ webpack overrides in next.config.ts:
#   minimize off, cache off) -> ~3.0GB peak, completes in ~4 min.
#
#   2026-10-22: the "Collecting page data using 1 worker" phase became a
#   hard OOM (main process + page-data worker, each capped at 1792MB heap,
#   transiently exceed the ~3.4GB kill line; no swap on the box). Fallback
#   that now ships by default: --experimental-build-mode compile — skips
#   page-data collection + static prerendering entirely. Every route in this
#   app is dynamic anyway (all API routes force-dynamic, SPA root renders
#   client-side), so nothing is lost and the build completes in ~100s.
#   If a full default build is ever needed again, drop the flag and retry
#   the plain recipe 2-3 times with zombie cleanup between attempts.
#
# Also required (fixed 2026-10-08):
#   - web-push installed (src/lib/server/push.ts imports it; was missing)
#   - instrumentation split: src/instrumentation.ts guards a dynamic import
#     of src/instrumentation-nodejs.ts so the edge compile drops the agent
#     worker graph (sharp/dotenv are node-only)
set -e
# Portable: resolve project root from this script's location.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$APP_ROOT"

# Default: compile-only build (fast, never OOMs). CAVEAT discovered
# 2026-10-22: compile mode emits .next/server but NOT .next/static (client
# chunks) or the page-data manifests (BUILD_ID, prerender-manifest,
# routes-manifest). If .next/static already exists it is NOT preserved —
# compile mode wipes .next minus cache. Recipe for a COMPLETE build on this
# box:
#
#   1. Stop the prod server first (scripts/restart-prod.sh stops it; or
#      pkill -f "next start") — its ~700MB RSS is what pushes page-data
#      over the 4GB cgroup line.
#   2. Run the FULL build inside ONE tool/shell call with a long timeout:
#        NODE_OPTIONS="--max-old-space-size=1792 --max-semi-space-size=32" \
#          node_modules/.bin/next build --webpack
#      It needs >590s total (compile ~5min + page-data). If it is killed
#      mid-page-data, artifacts survive: server/ + static/ + build-manifests
#      are already on disk. The .next/lock must be removed before retrying
#      (a killed build leaves it and the next run exits instantly with an
#      empty log).
#   3. Finish the page-data artifacts by hand (all three are deterministic):
#        - echo <id> > .next/BUILD_ID            # <id> = the dir name under .next/static/
#        - minimal .next/prerender-manifest.json  # empty routes — every route here is dynamic
#        - node scripts/regen-routes-manifest.js  # rebuilds routes-manifest.json with
#                                                 # Next's own generator from the compiled
#                                                 # app-paths-manifest
#   4. node_modules/.bin/next start -p 3000
#
# Verify: / 200, /sw.js 200, /_next/static/chunks/<any> 200, and a known
# API route 200. See scripts/regen-routes-manifest.js for details.

NODE_OPTIONS="--max-old-space-size=1792 --max-semi-space-size=32" \
  node_modules/.bin/next build --webpack --experimental-build-mode compile
