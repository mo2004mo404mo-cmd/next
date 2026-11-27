'use client';

/**
 * useInstallApp — exposes a callable install() function so users can trigger
 * the PWA install flow on demand, not just when the browser fires
 * `beforeinstallprompt` (which only happens once and never again if the
 * user dismissed it).
 *
 * State machine:
 *   - platform: 'chromium' | 'ios' | 'installed' | 'other'
 *   - canPrompt: true when chromium has a captured beforeinstallprompt event
 *   - isInstalled: true when running in standalone mode
 *
 * install() returns:
 *   - { ok: true, method: 'native' }    — chromium native prompt shown
 *   - { ok: true, method: 'instructions' } — fallback instructions shown
 *                                            (caller should display a modal)
 *   - { ok: false, reason: 'unsupported' }
 *   - { ok: false, reason: 'installed' }
 *
 * The hook also exposes `instructions` — a structured object with platform-
 * specific step-by-step instructions, so callers can render their own UI
 * instead of using the default modal.
 */

import { useState, useEffect, useCallback } from 'react';

export type InstallPlatform = 'chromium' | 'ios' | 'installed' | 'other';

export interface InstallInstructions {
  platform: InstallPlatform;
  heading: string;
  intro: string;
  steps: { title: string; detail: string }[];
  /** A label for the "open this menu" affordance, e.g. "⋮ menu" or "Share sheet" */
  menuLabel: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let capturedPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<(p: BeforeInstallPromptEvent | null) => void>();

function detectPlatform(): InstallPlatform {
  if (typeof window === 'undefined') return 'other';
  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;
  if (standalone) return 'installed';

  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes('Mac') && 'ontouchend' in document);
  const isChromium =
    /Chrome|Edg|SamsungBrowser|Brave/.test(ua) && !/Firefox|Safari/.test(ua);
  if (isIOS) return 'ios';
  if (isChromium) return 'chromium';
  return 'other';
}

function buildInstructions(platform: InstallPlatform): InstallInstructions {
  switch (platform) {
    case 'ios':
      return {
        platform,
        heading: 'Install MedQ on iPhone',
        intro:
          "iOS Safari doesn't support one-tap install. Add MedQ to your Home Screen manually — it then runs full-screen like a native app, with offline access and push notifications.",
        menuLabel: 'Share button',
        steps: [
          {
            title: 'Tap the Share button',
            detail:
              "It's at the bottom of Safari on iPhone, or in the top address bar on iPad.",
          },
          {
            title: 'Choose "Add to Home Screen"',
            detail:
              'Scroll down the share sheet and tap the option with the "+" icon.',
          },
          {
            title: 'Tap "Add"',
            detail:
              'MedQ will appear on your Home Screen. Launch it from there to get the full-screen, app-like experience.',
          },
        ],
      };
    case 'chromium':
      return {
        platform,
        heading: 'Install MedQ',
        intro:
          "If the Install button didn't work, you can still install MedQ from your browser's menu:",
        menuLabel: '⋮ menu',
        steps: [
          {
            title: 'Open the browser menu',
            detail:
              'Tap the ⋮ icon (top-right on Chrome Android, top-right on Chrome desktop).',
          },
          {
            title: 'Select "Install MedQ" or "Add to Home Screen"',
            detail:
              'On desktop, look for "Install MedQ…" or "Install app". On Android, look for "Add to Home screen" or "Install app".',
          },
          {
            title: 'Confirm the install',
            detail:
              'A dialog will appear — click Install / Add. MedQ will open in its own window.',
          },
        ],
      };
    case 'installed':
      return {
        platform,
        heading: 'MedQ is already installed',
        intro:
          "You're running MedQ as an installed app right now. Look for the MedQ icon on your Home Screen or in your app drawer to launch it directly.",
        menuLabel: '',
        steps: [],
      };
    case 'other':
    default:
      return {
        platform,
        heading: 'Install MedQ',
        intro:
          "Your browser doesn't support automatic PWA install. Try opening this page in Chrome, Edge, or Safari, then follow the manual install instructions below.",
        menuLabel: 'Browser menu',
        steps: [
          {
            title: 'Open your browser menu',
            detail:
              'Look for a menu icon (⋮, ≡, or "Share") in your browser.',
          },
          {
            title: 'Choose "Add to Home Screen" or "Install"',
            detail:
              'The exact label varies by browser — try "Add to Home screen", "Install MedQ", "Save to Home Screen", or "Create Shortcut".',
          },
          {
            title: 'Launch from your Home Screen',
            detail:
              'After install, MedQ appears alongside your other apps and opens in its own window.',
          },
        ],
      };
  }
}

export function useInstallApp() {
  const [platform, setPlatform] = useState<InstallPlatform>('other');
  const [canPrompt, setCanPrompt] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());

    // Listen for beforeinstallprompt (chromium only)
    const handler = (e: Event) => {
      e.preventDefault();
      capturedPrompt = e as BeforeInstallPromptEvent;
      setCanPrompt(true);
      listeners.forEach((l) => l(capturedPrompt));
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Listen for appinstalled
    const onInstalled = () => {
      capturedPrompt = null;
      setCanPrompt(false);
      setPlatform('installed');
    };
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = useCallback(async (): Promise<{
    ok: boolean;
    method?: 'native' | 'instructions';
    reason?: 'unsupported' | 'installed' | 'no-prompt' | 'dismissed';
    instructions?: InstallInstructions;
  }> => {
    // Already installed
    if (platform === 'installed') {
      return { ok: false, reason: 'installed' };
    }

    // Chromium with captured prompt — call native install
    if (capturedPrompt) {
      setInstalling(true);
      try {
        await capturedPrompt.prompt();
        const choice = await capturedPrompt.userChoice;
        capturedPrompt = null;
        setCanPrompt(false);
        listeners.forEach((l) => l(null));
        if (choice.outcome === 'accepted') {
          return { ok: true, method: 'native' };
        }
        return { ok: false, reason: 'dismissed', instructions: buildInstructions(platform) };
      } finally {
        setInstalling(false);
      }
    }

    // No captured prompt — return instructions for fallback UI
    return {
      ok: true,
      method: 'instructions',
      instructions: buildInstructions(platform),
    };
  }, [platform]);

  const instructions = buildInstructions(platform);
  const isInstalled = platform === 'installed';

  return {
    platform,
    canPrompt,
    isInstalled,
    installing,
    install,
    instructions,
  };
}
