#!/usr/bin/env node
/**
 * sync-pdf-worker.mjs — keep public/pdf.worker.min.mjs in lockstep with the
 * installed pdfjs-dist version.
 *
 * Why: the client-side PDF viewer (src/components/medq/PdfCanvasViewer.tsx)
 * loads the pdf.js worker from /pdf.worker.min.mjs in public/. If pdfjs-dist
 * is bumped in package.json without refreshing that copy, the browser gets
 * "The API version X does not match the Worker version Y" and every PDF
 * fails to render. This script runs on postinstall so the public copy can
 * never silently drift from node_modules again.
 *
 * Always exits 0 — a warning is printed on failure so a broken environment
 * can never fail `npm install`.
 */
import { createRequire } from 'node:module';
import { existsSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distPkgPath = path.join(root, 'node_modules', 'pdfjs-dist', 'package.json');
const distWorker = path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const publicWorker = path.join(root, 'public', 'pdf.worker.min.mjs');
const stampPath = path.join(root, 'public', 'pdf.worker.version.txt');

function versionInWorker(file) {
  try {
    // pdf.js embeds its version string near the top of the bundle as "6.4.299"
    const head = readFileSync(file, 'utf8').slice(0, 4000);
    const m = head.match(/(\d+\.\d+\.\d+)/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

try {
  if (!existsSync(distPkgPath) || !existsSync(distWorker)) {
    console.warn('[sync-pdf-worker] pdfjs-dist not installed yet — skipping (public copy left untouched).');
    process.exit(0);
  }

  const require = createRequire(import.meta.url);
  const installed = require(distPkgPath).version;
  const publicVersion = existsSync(publicWorker) ? versionInWorker(publicWorker) : null;

  if (publicVersion === installed) {
    console.log(`[sync-pdf-worker] OK — public worker already ${installed}.`);
    process.exit(0);
  }

  copyFileSync(distWorker, publicWorker);
  // Version stamp: makes the shipped worker version auditable at a glance and
  // lets ops verify the copy without grepping a 1.2MB minified bundle.
  writeFileSync(stampPath, `${installed}\n`);
  console.log(
    `[sync-pdf-worker] Updated public/pdf.worker.min.mjs ${publicVersion ?? '(missing)'} → ${installed}.`,
  );
} catch (err) {
  console.warn(`[sync-pdf-worker] WARNING: sync failed (${err.message}). Run manually if PDFs fail to open.`);
}
process.exit(0);
