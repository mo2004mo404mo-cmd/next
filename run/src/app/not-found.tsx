// src/app/not-found.tsx — Next.js App Router root 404 page.
//
// Rendered automatically by Next.js when:
//   1. A user navigates to a URL that doesn't match any route in src/app/,
//      AND the next.config.ts `fallback` rewrite doesn't catch it.
//   2. A notFound() function is called from any server component / route handler.
//
// WITHOUT this file, Next.js renders its default 404 page (a plain white page
// with "404: This page could not be found." text) — which breaks the dark
// theme of MedQ and offers no path forward for the user.
//
// IMPORTANT NOTES ON THE CATCH-ALL REWRITE:
//   next.config.ts has a `fallback` rewrite that sends almost every unknown
//   path to '/' (the SPA shell). So in practice, MOST unknown URLs go to the
//   SPA, not to this file. This file only fires for:
//     - Paths explicitly excluded from the fallback regex (api, _next,
//       classroom, openmaic-generation-preview, offline, favicon, icon,
//       apple-icon, manifest, sw, robots, sitemap, openmaic, logo-horizontal)
//       that don't actually have a matching file.
//     - Routes where a server component explicitly calls notFound().
//
//   That's still a meaningful improvement over the default Next.js 404 page
//   — and when the SPA eventually migrates to real App Router routes, this
//   file will automatically become the fallback for all of them.
//
//   Server component (no 'use client') so it can be statically rendered
//   and cached at the edge. The only interactivity is a plain <a> link,
//   which works without JS enabled.

import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--medq-bg-deep, #0a0e1a)',
        color: 'var(--medq-text, #e8ecf4)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        flexDirection: 'column',
        gap: 20,
        padding: 24,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: 'rgba(0, 229, 160, 0.08)',
          border: '1px solid rgba(0, 229, 160, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--medq-accent, #00e5a0)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <div
        style={{
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--medq-accent, #00e5a0)',
          lineHeight: 1,
        }}
      >
        404
      </div>

      <div style={{ fontSize: 18, fontWeight: 700 }}>Page not found</div>

      <div
        style={{
          fontSize: 14,
          color: 'var(--medq-text-muted, #8b95a8)',
          textAlign: 'center',
          maxWidth: 420,
          lineHeight: 1.5,
        }}
      >
        The page you're looking for doesn't exist or may have been moved.
        Head back to MedQ to continue studying.
      </div>

      <Link
        href="/"
        style={{
          marginTop: 8,
          background: 'var(--medq-accent, #00e5a0)',
          color: '#0c0e14',
          border: 'none',
          padding: '12px 28px',
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        Back to MedQ
      </Link>

      <div
        style={{
          fontSize: 12,
          color: 'var(--medq-text-faint, #5a6478)',
          marginTop: 12,
        }}
      >
        Tip: use the search bar at the top of MedQ to find what you need.
      </div>
    </div>
  );
}
