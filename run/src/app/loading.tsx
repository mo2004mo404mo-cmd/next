import { Loader2 } from 'lucide-react';

// src/app/loading.tsx — Next.js App Router root loading UI.
//
// This file is automatically rendered by Next.js whenever a route segment
// beneath src/app/ is loading (server component streaming, dynamic params,
// or suspense boundaries without their own loading.tsx). Without this file,
// Next.js shows a blank white screen during navigation — this file replaces
// that with the branded MedQ loading shell.
//
// IMPORTANT: This MUST be a server component (no 'use client') and must not
// import anything heavy. It renders synchronously on the server before the
// real page chunk arrives, so it should be tiny (just inline SVG + CSS).
//
// Visual design matches:
//   - src/app/page.tsx LoadingShell (the initial app-load spinner)
//   - the inline CSS variables in src/app/layout.tsx
// so the user sees a consistent loading state regardless of whether the
// load is the initial SPA boot OR a subsequent route transition.

export default function RootLoading() {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#0c0e14' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00e5a0] to-[#00b87a] flex items-center justify-center shadow-lg shadow-[#00e5a0]/25">
          <Loader2 className="w-7 h-7 text-[#0c0e14] animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#e8ecf4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Loading Med<span className="text-[#00e5a0]">Q</span>
          </p>
          <p className="text-[10px] text-[#5a6478] mt-1">Preparing your study environment...</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
