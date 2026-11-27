'use client';

/**
 * IOSInstallPrompt — shows iOS Safari users instructions for "Add to Home Screen".
 *
 * iOS Safari is the only major browser that does NOT fire `beforeinstallprompt`.
 * Instead we have to detect:
 *   - iOS Safari (iPhone|iPad|iPod, but NOT iPadOS 13+ which reports as Mac)
 *   - Not already in standalone mode (window.navigator.standalone)
 *
 * When both conditions are met, we show a dismissible banner the first time
 * the user logs in. Dismissal is persisted for 30 days in localStorage so
 * we don't nag.
 */

import { useState, useEffect } from 'react';
import { Share, Plus, X } from 'lucide-react';

const DISMISS_KEY = 'medq-ios-install-dismissed';
const DISMISS_DAYS = 30;

export default function IOSInstallPrompt() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect iOS Safari (covers iPhone, iPod, and iPad < iOS 13).
    // iPadOS 13+ reports as Macintosh but still has no beforeinstallprompt.
    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua) ||
      (ua.includes('Mac') && 'ontouchend' in document);
    if (!isIOS) return;

    // Already installed (PWA running in standalone mode)?
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      // iOS Safari (pre-13) uses navigator.standalone
      (window.navigator as any).standalone === true;
    if (standalone) return;

    // Recently dismissed?
    try {
      const dismissedAt = localStorage.getItem(DISMISS_KEY);
      if (dismissedAt) {
        const ageDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
        if (ageDays < DISMISS_DAYS) return;
      }
    } catch {
      // localStorage unavailable — proceed to show
    }

    // Only show if user is signed in (avoid showing on landing page)
    // We rely on the absence of an anonymous session cookie — but a simple
    // heuristic is to wait 8 seconds so the auth provider has settled.
    const timer = setTimeout(() => setShouldShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShouldShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch {
      // ignore
    }
  };

  if (!shouldShow) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-2xl p-4 shadow-2xl shadow-black/50 animate-slide-up"
      role="dialog"
      aria-labelledby="ios-install-title"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center flex-shrink-0">
          <Plus className="w-5 h-5 text-[#00e5a0]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 id="ios-install-title" className="text-sm font-bold text-[#e8ecf4]">
            Install MedQ on your Home Screen
          </h3>
          <ol className="text-xs text-[#5a6478] mt-2 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#00e5a0] flex-shrink-0">1.</span>
              <span>Tap the <Share className="inline w-3 h-3 mx-0.5 -mt-0.5" /> Share button in Safari&apos;s toolbar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#00e5a0] flex-shrink-0">2.</span>
              <span>Scroll down and tap <strong className="text-[#e8ecf4]">Add to Home Screen</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-[#00e5a0] flex-shrink-0">3.</span>
              <span>Tap <strong className="text-[#e8ecf4]">Add</strong> — you&apos;ll get offline access &amp; push notifications</span>
            </li>
          </ol>
        </div>
        <button
          onClick={handleDismiss}
          className="text-[#5a6478] hover:text-[#e8ecf4] transition-colors p-1 flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
