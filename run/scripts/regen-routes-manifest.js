/**
 * Regenerate .next/routes-manifest.json from an interrupted build's
 * artifacts — without re-running the full (OOM-prone) `next build`.
 *
 * When `next build --webpack` is killed during "Collecting page data",
 * everything the server needs is already on disk EXCEPT the manifests that
 * phase writes: routes-manifest.json (and BUILD_ID / prerender-manifest,
 * which are trivial — see scripts/fix-next-manifests.sh).
 *
 * This script reconstructs routes-manifest.json the same way Next does
 * (build/index.js:870-900):
 *   1. loadConfig() + loadCustomRoutes()           (Next's own loaders)
 *   2. pageKeys from the compiled app-paths-manifest / pages-manifest
 *   3. generateRoutesManifest()                    (Next's own generator)
 *   4. write .next/routes-manifest.json
 *
 * Usage: node scripts/regen-routes-manifest.js
 */

const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, '.next');
const SERVER = path.join(DIST, 'server');

async function main() {
  // 1. Load the real Next config (resolves next.config.ts defaults).
  const { default: loadConfig } = require(path.join(ROOT, 'node_modules/next/dist/server/config'));
  const { PHASE_PRODUCTION_BUILD } = require(
    path.join(ROOT, 'node_modules/next/dist/shared/lib/constants'),
  );

  const config = await loadConfig(PHASE_PRODUCTION_BUILD, ROOT, {});
  console.log('config loaded, basePath:', JSON.stringify(config.basePath));

  // 2. Custom routes (headers/redirects/rewrites from next.config.ts).
  const { default: loadCustomRoutes } = require(
    path.join(ROOT, 'node_modules/next/dist/lib/load-custom-routes'),
  );
  const customRoutes = await loadCustomRoutes(config);
  const { headers, onMatchHeaders, rewrites, redirects } = customRoutes;
  console.log(
    'custom routes — headers:', headers.length,
    'redirects:', redirects.length,
    'rewrites:', rewrites.beforeFiles.length + rewrites.afterFiles.length + rewrites.fallback.length,
  );

  // 3. pageKeys from compiled manifests.
  const appPathsManifest = JSON.parse(fs.readFileSync(path.join(SERVER, 'app-paths-manifest.json'), 'utf-8'));
  // Normalize the raw manifest keys exactly like the build does: strip the
  // file-kind suffix ('/route' for route handlers, '/page' for pages) and
  // the optional '/_rsc' RSC variant prefix, and drop parallel-route
  // entries (interception '@'/'(...)' paths are not routable endpoints).
  let appPaths = Object.keys(appPathsManifest)
    .map((k) => k.replace(/^\/_rsc/, ''))
    .filter((k) => !k.includes('@') && !/\(\.\.\./.test(k))
    .map((k) => k.replace(/\/route$/, '').replace(/\/page$/, ''))
    .map((k) => (k === '' ? '/' : k));
  appPaths = Array.from(new Set(appPaths));
  let pagesPageKeys = [];
  try {
    const pagesManifest = JSON.parse(fs.readFileSync(path.join(SERVER, 'pages-manifest.json'), 'utf-8'));
    pagesPageKeys = Object.keys(pagesManifest);
  } catch { /* no pages dir — app-router only */ }
  console.log('pageKeys — app:', appPaths.length, 'pages:', pagesPageKeys.length);

  // Interception routes become beforeFiles rewrites (mirrors build/index.js).
  const { generateInterceptionRoutesRewrites } = require(
    path.join(ROOT, 'node_modules/next/dist/lib/generate-interception-routes-rewrites'),
  );
  rewrites.beforeFiles.push(...generateInterceptionRoutesRewrites(appPaths, config.basePath));

  // 4. Generate + write the manifest with Next's own generator.
  const { generateRoutesManifest } = require(
    path.join(ROOT, 'node_modules/next/dist/build/generate-routes-manifest'),
  );
  const { checkIsAppPPREnabled } = require(path.join(ROOT, 'node_modules/next/dist/server/lib/experimental/ppr'));
  const { isInterceptionRouteAppPath } = require(
    path.join(ROOT, 'node_modules/next/dist/shared/lib/router/utils/interception-routes'),
  );

  const { routesManifest } = generateRoutesManifest({
    appType: pagesPageKeys.length ? 'hybrid' : 'app',
    pageKeys: {
      pages: pagesPageKeys,
      app: appPaths.length > 0 ? appPaths : undefined,
    },
    config,
    redirects,
    headers,
    onMatchHeaders,
    rewrites,
    restrictedRedirectPaths: ['/_next'].map((p) => (config.basePath ? `${config.basePath}${p}` : p)),
    isAppPPREnabled: checkIsAppPPREnabled(config.experimental.ppr),
    deploymentId: config.deploymentId,
  });

  const out = path.join(DIST, 'routes-manifest.json');
  fs.writeFileSync(out, JSON.stringify(routesManifest, null, 2));
  console.log('WROTE', out);
  console.log(
    'summary — static:', routesManifest.staticRoutes.length,
    'dynamic:', routesManifest.dynamicRoutes.length,
    'redirects:', routesManifest.redirects.length,
    'rewrites(before/after/fallback):',
    routesManifest.rewrites.beforeFiles.length + '/' +
    routesManifest.rewrites.afterFiles.length + '/' +
    routesManifest.rewrites.fallback.length,
  );
}

main().catch((e) => { console.error('FAILED:', e); process.exit(1); });
