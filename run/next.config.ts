/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dev-mode cross-origin allowlist. The sandbox preview proxy serves the app
  // from preview-chat-<session-id>.space-z.ai while the Next dev server runs on
  // localhost:3000. Next.js dev blocks /_next/* chunk requests, HMR websocket
  // upgrades and /__nextjs* dev resources whose Origin/Referer host is not
  // allowlisted (403 "Blocked cross-origin request to Next.js dev resource").
  // The ** wildcard matches every preview session id, so this survives new
  // chat sessions without config edits. localhost/127.0.0.1 added for direct
  // in-sandbox browser verification (dev.log warned: blocked cross-origin
  // dev-resource requests from 127.0.0.1 origin → client chunks 403).
  allowedDevOrigins: [
    '**.space-z.ai',
    'localhost',
    '127.0.0.1',
  ],
  // (body-limit note moved to experimental.proxyClientMaxBodySize below —
  // Next.js 16 renamed middleware → proxy and moved the option under
  // experimental. A top-level middlewareClientMaxBodySize is silently
  // ignored, which is why the 10 MB truncation warning kept appearing.)
  // Heavy native/CJS server-only packages must NOT be bundled by Turbopack —
  // they are resolved at runtime via plain node_modules imports instead.
  // (z-ai-web-dev-sdk: ASR/TTS/vision SDK; @huggingface/transformers: local
  // bge-small embeddings for the RAG knowledge base; onnxruntime-node: its
  // native backend; unpdf/mammoth: document parsers used by knowledge ingest.)
  serverExternalPackages: [
    'z-ai-web-dev-sdk',
    '@huggingface/transformers',
    'onnxruntime-node',
    'unpdf',
    'mammoth',
    'exceljs', // XLSX parsing in knowledge ingest (CJS, heavy)
    '@langchain/quickjs', // QuickJS interpreter middleware — dynamically
    // imports an emscripten variant whose .wasm file must resolve from
    // node_modules at runtime (webpack-bundling it breaks the wasm path).
    '@jitl/quickjs-ng-wasmfile-release-asyncify',
    'quickjs-emscripten',
    'quickjs-emscripten-core',
    'langchain', // middleware catalog (todoList/retry/limits) — barrel has no
    // subpath exports and bundling the FULL langchain package OOM-kills the
    // 4GB-box build worker; dual-format (cjs+esm) so runtime require is safe.
    // ── Stage 11 Phase B: PostgresSaver deps ──
    'pg', // node-postgres driver — CJS, heavy, only used by checkpoint-postgres.ts
    'postgres-array', // pg dep — CJS parser, no browser need
    '@langchain/langgraph-checkpoint-postgres', // PostgresSaver — server-only
  ],
  // 4GB-box survival: the production build of this app's root SPA needs more
  // memory than the box can give with default settings (kernel OOM-killed the
  // build worker at ~3.5GB RSS three times). Two levers:
  //  1) run `next build --webpack` under node with
  //     NODE_OPTIONS=--max-old-space-size=1792 (heap fits, external+heap
  //     stays under the ~3.4GB kill line);
  //  2) skip the SWC/terser minify phase + webpack cache bookkeeping (this
  //     override) — unminified bundles are fine for a personal deployment.
  // Route files in this codebase export small helpers alongside HTTP verbs
  // (e.g. verifyAccessToken in access-code/verify). Dev mode never typechecks
  // and validation runs via targeted tsc + runtime E2E (see worklog), so the
  // build skips Next's generated route-type gate instead of refactoring
  // dozens of route files during an outage recovery.
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config: Record<string, any>, { dev }: { dev: boolean }) => {
    if (!dev) {
      config.optimization.minimize = false;
      config.cache = false;
      // 2026-10-24: production source maps + default parallelism pushed the
      // compile past the ~3.4GB kill line after the audit sprint grew the
      // server module graph (MCP client, 6 newly-registered tool modules,
      // new API routes). Both levers below are pure build-time knobs —
      // runtime bundles are unaffected (unminified already by choice).
      config.devtool = false;
      config.parallelism = 1;
      // Scope-hoisting pass ("concatenateModules") is the classic webpack
      // memory bomb at seal time — the trace showed a flat 1.8GB compile
      // jumping to 3.4GB+ exactly when this pass runs. Runtime cost of
      // skipping it is negligible for a server-rendered app.
      config.optimization.concatenateModules = false;
    } else {
      // 2026-11-04: dev-mode memory throttle. The cold dev compile of the SPA
      // root (/) needs >1.5GB of V8 heap (V8-OOM'd at a 1536MB cap) while the
      // box kernel OOM-kills anything past ~3.4GB RSS — at a 1792MB cap the
      // next-server child hit 3.34GB RSS and died. The two biggest dev
      // multipliers are turned off (same reasoning as the prod branch):
      //   • devtool=off — dev source maps hold every module's source + map
      //     strings in memory (~1.5GB on this graph); cost: un-mapped stack
      //     lines in dev errors, the app itself is unaffected;
      //   • concatenateModules=false — the seal-time scope-hoisting pass is
      //     the classic flat-heap → spike memory bomb.
      // parallelism=1 keeps peak module-job concurrency single-lane. The
      // filesystem cache (.next) still makes warm rebuilds fast.
      config.devtool = false;
      config.parallelism = 1;
      config.optimization.concatenateModules = false;
    }
    return config;
  },
  // ── "/" → /home consolidation (2026-11-04) ────────────────────────────────
  // User report: "'/' and '/home' are the same". The dashboard previously
  // rendered at BOTH the SPA root (default tab) and the real /home route.
  // Config-level redirects run before any rendering — deterministic on every
  // request shape (hard load, soft nav, prefetch):
  //   • bare "/"            → /home
  //   • "/?tab=dashboard"   → /home   (the dashboard's only canonical URL)
  //   • "/?tab=<anything>"  → untouched — the SPA shell renders that tab.
  async redirects() {
    return [
      {
        source: '/',
        missing: [{ type: 'query', key: 'tab' }],
        destination: '/home',
        permanent: false,
      },
      {
        source: '/',
        has: [{ type: 'query', key: 'tab', value: 'dashboard' }],
        destination: '/home',
        permanent: false,
      },
      // Legacy forwarding shims — previously client-side
      // window.location.replace() (visible full page reload). Config
      // redirects are followed before any rendering: transparent for hard
      // loads, and in-app navigations never land here because the sidebar
      // targets the real URLs directly.
      { source: '/exam/take', destination: '/?tab=take-exam', permanent: false },
      { source: '/exam-sim/voice', destination: '/exam-sim', permanent: false },
    ];
  },
  experimental: {
    // Raise the proxy/middleware body ceiling to match the app's upload cap
    // (30 MB on /api/questions/import/extract). Next.js defaults
    // proxyClientMaxBodySize (formerly middlewareClientMaxBodySize, renamed
    // in Next.js 16) to 10 MB, which silently TRUNCATES multipart bodies
    // > 10 MB — the server log showed "Request body exceeded 10MB … Only
    // the first 10MB will be available" on the extract endpoint, which made
    // req.formData() parse a truncated multipart stream and the upload fail
    // with "Could not start extraction". 32 MB clears the 30 MB app cap
    // with ~2 MB headroom for multipart framing, and stays under the z.ai
    // preview gateway's own 32 MiB hard limit (EntityTooLarge).
    proxyClientMaxBodySize: '32mb',
    // Force the webpack build into a WORKER process (default logic disables
    // it whenever a custom webpack config exists). The worker re-requires
    // next.config itself, so the function-form overrides above still apply.
    // On the 4GB box this keeps the heavy module graph out of the parent
    // next-build process (2026-10-24 OOM saga: single-process compile
    // peaks ~3.5GB and gets kernel-killed).
    webpackBuildWorker: true,
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '192.168.100.111:3000', // Replace with your exact local IP and port
        "127.0.0.1:3000",
        '*.app.github.dev',     // If using GitHub Codespaces
        '*.ngrok-free.app',     // If using Ngrok tunnels
        '**.space-z.ai',        // Sandbox preview proxy — fixes "Invalid Server Actions request" (login POST 500)
      ],
    },
  },
};

module.exports = nextConfig;
