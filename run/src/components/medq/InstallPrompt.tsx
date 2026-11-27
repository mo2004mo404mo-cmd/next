'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, X, Share, PlusSquare } from 'lucide-react';

type Platform = 'chromium' | 'ios' | 'installed' | 'other';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

const DISMISS_KEY = 'medq-install-prompt-dismissed';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000;

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = window.navigator.userAgent;

  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function getIOSBrowser(): 'safari' | 'chrome' | 'firefox' | 'other' {
  if (typeof window === 'undefined') return 'other';

  const ua = navigator.userAgent;

  if (/CriOS/.test(ua)) return 'chrome';
  if (/FxiOS/.test(ua)) return 'firefox';
  if (/Safari/.test(ua) && !/CriOS|FxiOS/.test(ua)) return 'safari';

  return 'other';
}

function wasRecentlyDismissed(): boolean {
  if (typeof window === 'undefined') return false;

  const raw = localStorage.getItem(DISMISS_KEY);

  if (!raw) return false;

  const timestamp = Number(raw);

  if (!Number.isFinite(timestamp)) {
    localStorage.removeItem(DISMISS_KEY);
    return false;
  }

  if (Date.now() - timestamp < DISMISS_DURATION) {
    return true;
  }

  localStorage.removeItem(DISMISS_KEY);
  return false;
}

export default function InstallPrompt() {
  const [platform, setPlatform] = useState<Platform>('other');
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installing, setInstalling] = useState(false);

  const iosBrowser = useRef(getIOSBrowser());

  /*
   * Detect the environment immediately.
   */
  useEffect(() => {
    if (isStandalone()) {
      setPlatform('installed');
      return;
    }

    if (isIOS()) {
      setPlatform('ios');
    }
  }, []);

  /*
   * Listen for beforeinstallprompt immediately.
   *
   * Important:
   * We don't wait for platform detection because the event
   * can fire before React finishes another effect.
   */
  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      const installEvent = event as BeforeInstallPromptEvent;

      setDeferredPrompt(installEvent);
      setPlatform('chromium');

      if (!wasRecentlyDismissed()) {
        setDismissed(false);
      }
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowBanner(false);
      setShowIOSModal(false);
      setPlatform('installed');
      setInstalling(false);

      // Installation succeeded, so an old dismissal is no longer relevant.
      localStorage.removeItem(DISMISS_KEY);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt
    );

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );

      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  /*
   * Load dismissal state.
   */
  useEffect(() => {
    if (wasRecentlyDismissed()) {
      setDismissed(true);
    }
  }, []);

  /*
   * Hide installation UI whenever the app becomes standalone.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(
      '(display-mode: standalone)'
    );

    const handleDisplayModeChange = () => {
      if (isStandalone()) {
        setPlatform('installed');
        setShowBanner(false);
        setShowIOSModal(false);
      }
    };

    mediaQuery.addEventListener?.(
      'change',
      handleDisplayModeChange
    );

    return () => {
      mediaQuery.removeEventListener?.(
        'change',
        handleDisplayModeChange
      );
    };
  }, []);

  /*
   * Chromium:
   *
   * Wait until the user has had time to interact with the app.
   * This is less annoying than immediately showing the banner.
   */
  useEffect(() => {
    if (!deferredPrompt || dismissed) return;

    const timer = window.setTimeout(() => {
      if (!isStandalone()) {
        setShowBanner(true);
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [deferredPrompt, dismissed]);

  /*
   * iOS:
   * Give the user some time before showing installation instructions.
   */
  useEffect(() => {
    if (platform !== 'ios' || dismissed || isStandalone()) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowIOSModal(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [platform, dismissed]);

  /*
   * Chromium: auto-dismiss the banner after 7s if the user hasn't
   * interacted — it should never linger over content indefinitely.
   */
  useEffect(() => {
    if (!showBanner) return;

    const timer = window.setTimeout(() => {
      setShowBanner(false);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [showBanner]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt || installing) return;

    setInstalling(true);

    try {
      await deferredPrompt.prompt();

      const result = await deferredPrompt.userChoice;

      if (result.outcome === 'accepted') {
        setShowBanner(false);
      }
    } catch {
      // Native prompt may have been dismissed or become unavailable.
    } finally {
      setDeferredPrompt(null);
      setInstalling(false);
    }
  }, [deferredPrompt, installing]);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
    setShowIOSModal(false);
    setDismissed(true);

    localStorage.setItem(
      DISMISS_KEY,
      Date.now().toString()
    );
  }, []);

  /*
   * Don't render anything when installation isn't relevant.
   */
  if (
    platform === 'installed' ||
    platform === 'other' ||
    dismissed
  ) {
    return null;
  }

  /*
   * Chromium install banner.
   */
  if (
    platform === 'chromium' &&
    showBanner &&
    deferredPrompt
  ) {
    return (
      <div className="fixed bottom-20 left-4 right-4 sm:bottom-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-2xl p-4 shadow-2xl shadow-black/50 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5 text-[#00e5a0]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#e8ecf4]">
              Install MedQ
            </h3>

            <p className="text-xs text-[#5a6478] mt-0.5">
              Add MedQ to your home screen for faster access.
            </p>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleInstall}
                disabled={installing}
                className="px-4 py-1.5 rounded-lg bg-[#00e5a0] text-[#0c0e14] text-xs font-bold hover:bg-[#00e5a0]/90 disabled:opacity-50 transition-colors"
              >
                {installing ? 'Installing…' : 'Install'}
              </button>

              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-lg text-xs text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-colors"
              >
                Not now
              </button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-[#8b95a8] hover:text-[#e8ecf4] transition-colors flex-shrink-0 flex min-h-[44px] min-w-[44px] items-center justify-center -m-2"
            aria-label="Dismiss installation prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  /*
   * iOS installation instructions.
   */
  if (
    platform === 'ios' &&
    showIOSModal
  ) {
    const browserName =
      iosBrowser.current === 'chrome'
        ? 'Chrome'
        : iosBrowser.current === 'firefox'
          ? 'Firefox'
          : 'Safari';

    return (
      <div
        className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleDismiss}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          className="w-full sm:max-w-md bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-[#00e5a0]" />
              </div>

              <h3
                id="ios-install-title"
                className="text-base font-bold text-[#e8ecf4]"
              >
                Add MedQ to your Home Screen
              </h3>
            </div>

            <button
              onClick={handleDismiss}
              className="text-[#8b95a8] hover:text-[#e8ecf4] transition-colors flex min-h-[44px] min-w-[44px] items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-[#5a6478] mb-5 leading-relaxed">
            {browserName} on iPhone/iPad doesn't provide the same
            one-tap installation flow as Chromium browsers.
            Add MedQ to your Home Screen using the Share menu.
          </p>

          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center">
                1
              </span>

              <div>
                <p className="text-sm text-[#e8ecf4] font-medium">
                  Tap the Share button
                </p>

                <p className="text-xs text-[#5a6478] mt-0.5">
                  In your browser's toolbar.
                </p>

                <Share className="w-4 h-4 text-[#00e5a0] mt-1.5" />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center">
                2
              </span>

              <div>
                <p className="text-sm text-[#e8ecf4] font-medium">
                  Select "Add to Home Screen"
                </p>

                <p className="text-xs text-[#5a6478] mt-0.5">
                  Scroll through the Share menu if necessary.
                </p>

                <PlusSquare className="w-4 h-4 text-[#00e5a0] mt-1.5" />
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center">
                3
              </span>

              <div>
                <p className="text-sm text-[#e8ecf4] font-medium">
                  Tap "Add"
                </p>

                <p className="text-xs text-[#5a6478] mt-0.5">
                  Launch MedQ from your Home Screen for the
                  installed app experience.
                </p>
              </div>
            </li>
          </ol>

          <button
            onClick={handleDismiss}
            className="w-full mt-6 px-4 py-2.5 rounded-xl bg-[#00e5a0] text-[#0c0e14] text-sm font-bold hover:bg-[#00e5a0]/90 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  return null;
}