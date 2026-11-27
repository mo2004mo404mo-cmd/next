import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InstallPrompt from '@/components/medq/InstallPrompt'
import IOSInstallPrompt from '@/components/medq/IOSInstallPrompt'
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/lib/hooks/use-theme';
import { CallProvider } from '@/components/medq/calls/CallProvider';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#00e5a0",
  width: "device-width",
  initialScale: 1,
  // maximumScale/userScalable intentionally omitted — WCAG 1.4.4 (AA) requires
  // users be able to zoom. Removing the cap lets low-vision users pinch-zoom.
};

export const metadata: Metadata = {
  title: "MedQ — Medical Question Generator",
  description: "Generate visually rich, exam-ready medical questions powered by AI",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MedQ",
  },
};

export default function RootLayout({
  children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/apple-icon-120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/apple-icon-152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/apple-icon-167.png" sizes="167x167" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MedQ" />
        {/* ─── No-flash theme init ────────────────────────────────────
            The <html> element starts with className="dark" (set above) so
            that the SSR HTML matches what useTheme() will default to if no
            localStorage preference exists. BUT if the user has previously
            chosen 'light', we need to remove the .dark class BEFORE the
            body renders — otherwise the user sees a flash of dark mode
            (or, worse, dark mode permanently if hydration fails).

            This script runs synchronously in <head> before <body> is
            parsed, so the .dark class is removed before any body styles
            are evaluated. No CSS variable fallback to dark hexes occurs.

            The script reads the same 'theme' localStorage key that
            useTheme() uses, so they stay in sync. */}
        <script src="/scripts/theme-init.js" />
        {/* ─── Critical CSS variables (inlined for no-flash) ────────
            The external globals.css file may take 100-500ms to load,
            especially on slow connections or when the dev server is
            compiling. During that window, inline styles like
            `background: var(--medq-bg, #0c0e14)` would fall back to
            the dark hex value, causing a flash of dark mode even when
            the user has chosen light mode.

            By inlining the critical MedQ CSS variables here, they're
            available immediately when the <body> is parsed. The external
            globals.css can override them later (with !important if
            needed), but the initial paint will be correct.

            We define variables for BOTH light and dark so the inline
            style fallbacks in components like LoadingShell resolve
            correctly regardless of theme. */}
        <style dangerouslySetInnerHTML={{
          __html: `
          :root:not(.dark) {
            --medq-bg: #f5f7fb;
            --medq-bg-deep: #eef1f6;
            --medq-surface: #ffffff;
            --medq-surface-2: #f8fafc;
            --medq-surface-3: #eef2f7;
            --medq-card-bg: #ffffff;
            --medq-card-border: rgba(15, 23, 42, 0.08);
            --medq-border: rgba(15, 23, 42, 0.08);
            --medq-border-strong: rgba(15, 23, 42, 0.14);
            --medq-text: #0f172a;
            --medq-text-2: #1e293b;
            --medq-text-muted: #64748b;
            --medq-text-faint: #94a3b8;
            --medq-accent: #00b27e;
            --medq-accent-2: #0284c7;
            --medq-header-bg: rgba(255, 255, 255, 0.92);
            --medq-shadow: 0 4px 24px rgba(15, 23, 42, 0.06);
            --medq-shadow-lg: 0 12px 48px rgba(15, 23, 42, 0.12);
          }
          :root.dark, :root {
            /* Dark defaults — also apply to bare :root so that if .dark
               is removed by the no-flash script but the CSS file hasn't
               loaded yet, we still have dark values (better than no values).
               The :root:not(.dark) block above overrides these for light. */
            --medq-bg: #0c0e14;
            --medq-bg-deep: #0a0e1a;
            --medq-surface: #1a1e2b;
            --medq-surface-2: #151821;
            --medq-surface-3: #1e2130;
            --medq-card-bg: #151821;
            --medq-card-border: rgba(255, 255, 255, 0.06);
            --medq-border: rgba(255, 255, 255, 0.06);
            --medq-border-strong: rgba(255, 255, 255, 0.1);
            --medq-text: #e8ecf4;
            --medq-text-2: #c8d0e0;
            --medq-text-muted: #8b95a8;
            --medq-text-faint: #5a6478;
            --medq-accent: #00e5a0;
            --medq-accent-2: #0ea5e9;
            --medq-header-bg: rgba(12, 14, 20, 0.92);
            --medq-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
            --medq-shadow-lg: 0 12px 48px rgba(0, 0, 0, 0.6);
          }
          /* Light-mode body bg override — beats the inline style on <body> */
          :root:not(.dark) body {
            background: #f5f7fb !important;
            color: #0f172a !important;
          }
        `}} />
        {/* iOS splash screens — one per device class. Safari picks the right
            one based on device pixel ratio + screen size. */}
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1668x2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1170x2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-828x1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        {/* Global resilience script: handles chunk-load failures and Auth.js fetch errors when the dev server OOMs and restarts.
            - Intercepts fetch to Next static chunks → retries with cache-bust
            - Intercepts <script> tag errors for chunk URLs → retry or reload
            - Catches ChunkLoadError from dynamic import() → reload page
            - Catches auth JSON parse failures → retry after short delay

            OFFLINE SAFETY (added v13):
              All auto-reload paths check navigator.onLine FIRST. If the user
              is offline, we DO NOT reload — the page would just try to fetch
              the same chunks, fail again, and reload again → infinite storm.
              The SW will serve cached chunks if available; if not, the
              ChunkErrorBoundary in AppEntry shows a "You're offline" panel
              with a Retry button (auto-retries when `online` fires).

              We also post `medq:client-online` to the SW as soon as the
              browser fires the `online` event — this resets the SW's
              _lastFetchFailAt flag immediately, so the SW starts trying
              the network again instead of skipping it for 30s. This matters
              because ServiceWorkerRegistrar (which normally sends this
              message) is itself dynamically imported and may not be ready
              yet when the `online` event fires.

            RELOAD-STORM GUARD (added v15):
              The v13 `navigator.onLine` check is unreliable on flaky Wi-Fi,
              captive portals, and non-DevTools offline simulations (Charles
              Proxy, hosts file blocking, Windows Firewall, mobile data with
              DNS-only failures). In those cases `navigator.onLine === true`
              even though actual fetches hang → the 2s/3s reload setTimeouts
              fire repeatedly → reload storm every ~2s.

              Fix: a sessionStorage-based throttle. The FIRST chunk-failure
              reload is allowed (and timestamped in sessionStorage). Any
              subsequent chunk-failure reload attempt within 60s is BLOCKED
              — we let the ChunkErrorBoundary in AppEntry show its offline
              panel with a Retry button instead. The user can still tap
              "Retry" manually; the throttle just prevents the storm.
              The 60s window is long enough to break any tight reload loop
              but short enough that a real server recovery (e.g. dev server
              restart) is picked up on the next manual retry. */}
        <script src="/scripts/resilience.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: 'var(--medq-bg, #0c0e14)', color: 'var(--medq-text, #e8ecf4)' }}
      >
        <SessionProvider>
          <ThemeProvider>
            {/* App-wide call orchestration: keeps one socket to the chat
                service connected on every page, rings incoming calls anywhere
                in the app, hosts the MiroTalk overlay + minimized call pill,
                and fires browser/web-push notifications for out-of-app rings. */}
            <CallProvider>
              {children}
              <InstallPrompt />
              <IOSInstallPrompt />
            </CallProvider>
          </ThemeProvider>

        </SessionProvider>



      </body>
    </html>
  );
}
