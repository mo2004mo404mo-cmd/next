'use client';

/**
 * CallOverlayBoundary — a React error boundary scoped to the call overlay.
 *
 * Why: a render error anywhere inside the call overlay (e.g. a missing import,
 * like the `Calendar is not defined` crash that shipped because
 * `next.config.ts` sets `typescript.ignoreBuildErrors: true`) unmounts the
 * component tree up to the NEAREST error boundary. Without this boundary
 * the nearest one is at the app root, so one bad icon reference blanked the
 * whole messages page.
 *
 * With it, the blast radius is the overlay itself: the chat keeps working,
 * and the user sees a dismissible notice explaining the call UI failed.
 */
import React, { Component, type ReactNode } from 'react';
import { PhoneOff } from 'lucide-react';

interface Props {
  children: ReactNode;
  /** Called when the user dismisses the fallback (same as ending the call). */
  onFallbackClose: () => void;
  /** Changing this key resets the boundary so the next call starts fresh. */
  resetKey?: string;
}

interface State {
  hasError: boolean;
  message: string | null;
}

export default class CallOverlayBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message || String(error) };
  }

  componentDidCatch(error: Error) {
    // Surface it in the console for debugging, same prefix as the call overlay's
    // own logging so the two read as one stream.
    console.error('[Call overlay] Call UI crashed:', error);
  }

  // Reset the boundary when a new call starts (resetKey changed) or when the
  // parent remounts children after dismissing the fallback.
  componentDidUpdate(prev: Props) {
    if (this.state.hasError && prev.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, message: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0d12]/95 p-6">
          <div className="max-w-md w-full rounded-2xl border border-[#ff5757]/30 bg-[#151821] p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5757]/15">
              <PhoneOff className="h-6 w-6 text-[#ff5757]" />
            </div>
            <h3 className="text-base font-semibold text-[#e8ecf4]">Call interface error</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#8b95a8]">
              The call window hit an unexpected error and was closed to protect your chat.
              Messaging is unaffected. Details:{' '}
              <span className="break-all text-[#ff5757]/80">{this.state.message}</span>
            </p>
            <button
              onClick={this.props.onFallbackClose}
              className="mt-5 w-full rounded-xl bg-[#00e5a0] px-4 py-2.5 text-sm font-medium text-[#0c0e14] hover:brightness-110"
            >
              Back to chat
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
