/**
 * useTabVisible — Returns true when the tab with the given ID becomes visible.
 * Listens for the custom 'medq-tab-visible' event dispatched by page.tsx
 * when switching tabs. Also respects document visibility (browser tab hidden).
 */
'use client';

import { useState, useEffect } from 'react';

export function useTabVisible(tabId: string): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Listen for app-level tab visibility changes
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === tabId) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('medq-tab-visible', handler as EventListener);

    // Also listen for browser-level visibility changes
    const docHandler = () => {
      if (document.hidden) setVisible(false);
    };
    document.addEventListener('visibilitychange', docHandler);

    return () => {
      window.removeEventListener('medq-tab-visible', handler as EventListener);
      document.removeEventListener('visibilitychange', docHandler);
    };
  }, [tabId]);

  return visible;
}
