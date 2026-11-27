'use client';

import { useState } from 'react';
import { Download, X, Share, PlusSquare, Check, Smartphone } from 'lucide-react';
import type { InstallInstructions } from '@/components/medq/useInstallApp';

interface InstallModalProps {
  open: boolean;
  onClose: () => void;
  instructions: InstallInstructions;
  /** True while the native install prompt is showing */
  installing?: boolean;
}

/**
 * InstallModal — full-screen modal that shows platform-specific install
 * instructions. Used by:
 *   - SettingsDialog → "Install App" button
 *   - InstallPrompt → iOS automatic prompt (3s after page load)
 *
 * The modal is self-contained — no external chunks, works even when most
 * of the app fails to load.
 */
export default function InstallModal({ open, onClose, instructions, installing }: InstallModalProps) {
  if (!open) return null;

  const isIOS = instructions.platform === 'ios';
  const isInstalled = instructions.platform === 'installed';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#1a1e2b] border border-[#00e5a0]/20 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00e5a0]/10 flex items-center justify-center">
              {isInstalled ? (
                <Check className="w-5 h-5 text-[#00e5a0]" />
              ) : (
                <Download className="w-5 h-5 text-[#00e5a0]" />
              )}
            </div>
            <h3 className="text-base font-bold text-[#e8ecf4]">
              {instructions.heading}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#3a4055] hover:text-[#8b95a8] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#8b95a8] mb-5 leading-relaxed">
          {instructions.intro}
        </p>

        {installing && (
          <div className="mb-4 p-3 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#00e5a0] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#00e5a0] font-medium">
              Waiting for you to confirm in the browser dialog…
            </p>
          </div>
        )}

        {instructions.steps.length > 0 && (
          <ol className="space-y-3 mb-5">
            {instructions.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#e8ecf4] font-medium">{step.title}</p>
                  <p className="text-xs text-[#5a6478] mt-0.5 leading-relaxed">{step.detail}</p>
                  {isIOS && i === 0 && <Share className="w-4 h-4 text-[#00e5a0] mt-1.5" />}
                  {isIOS && i === 1 && <PlusSquare className="w-4 h-4 text-[#00e5a0] mt-1.5" />}
                </div>
              </li>
            ))}
          </ol>
        )}

        {isInstalled && (
          <div className="mb-5 p-4 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone className="w-4 h-4 text-[#00e5a0]" />
              <p className="text-sm font-semibold text-[#00e5a0]">Installed & Running</p>
            </div>
            <p className="text-xs text-[#8b95a8]">
              You&apos;re using the installed PWA right now. Look for the MedQ icon on your
              Home Screen or app drawer to launch it directly next time.
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!isInstalled && (
            <a
              href="/sw-debug"
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/[0.06] text-[#8b95a8] text-xs font-medium hover:bg-white/[0.04] transition-colors text-center"
            >
              Debug SW
            </a>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#00e5a0] text-[#0c0e14] text-sm font-bold hover:bg-[#00e5a0]/90 transition-colors"
          >
            {isInstalled ? 'Close' : 'Got it'}
          </button>
        </div>

        {!isInstalled && instructions.platform === 'chromium' && (
          <p className="text-[10px] text-[#5a6478] mt-3 text-center leading-relaxed">
            Tip: If you dismissed the install prompt before, Chrome won&apos;t show it
            again automatically. Use the browser menu (⋮) → &ldquo;Install MedQ&rdquo;
            instead.
          </p>
        )}
      </div>
    </div>
  );
}

/** Convenience hook to drive the modal from a button */
export function useInstallModal() {
  const [open, setOpen] = useState(false);
  return {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  };
}
