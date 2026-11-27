import { defineConfig } from 'vitest/config';
import path from 'node:path';

/**
 * Minimal unit-test scaffold (Stage 1 of the RAG roadmap).
 *
 * Scope on purpose: PURE modules only (no DB, no network, no env-dependent
 * singletons) so `npm test` runs in seconds anywhere — CI or laptop. The
 * FreeLLM sidecar keeps its own richer vitest suite (freellmapi/server).
 *
 * Integration/E2E (DB-backed retrieval, upload→ingest, deep-agent runs) is
 * NOT covered here — that lives in scripts/ smoke checks and the Stage 12
 * eval harness.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    // Default Node globals off: tests import { describe, it, expect } from 'vitest'
    // explicitly, so `next build`'s typecheck stays happy without a global
    // types reference.
    globals: false,
  },
});
