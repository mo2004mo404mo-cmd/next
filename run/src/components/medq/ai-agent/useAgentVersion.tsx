'use client';

/**
 * Feature flag for switching between MedQAgent v1 and v2.
 *
 * Activation precedence (highest first):
 *   1. localStorage.getItem('medq:useV2Agent') === '1'  (user override)
 *   2. process.env.NEXT_PUBLIC_AGENT_V2 === '1'         (deploy-time flag)
 *   3. default: false (v1 still active)
 *
 * The toggle is also exposed on window for dev console access:
 *   window.__setAgentV2(true)  → forces v2
 *   window.__setAgentV2(false) → forces v1
 *   window.__getAgentV2()      → returns current state
 */

import { useEffect, useState } from 'react';

const LS_KEY = 'medq:useV2Agent';

type AgentVersionWindow = Window & {
  __setAgentV2?: (v: boolean) => void;
  __getAgentV2?: () => boolean;
};

// Read env at module load. NEXT_PUBLIC_ prefix ensures it's inlined at build
// time, so this works in the browser bundle.
const ENV_FLAG = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_AGENT_V2 === '1') || false;

function readFlag(): boolean {
  if (typeof window === 'undefined') {
    return ENV_FLAG;
  }
  try {
    const v = window.localStorage.getItem(LS_KEY);
    if (v === '1') return true;
    if (v === '0') return false;
  } catch {}
  return ENV_FLAG;
}

export function useAgentVersion(): { v2: boolean; setV2: (v: boolean) => void } {
  const [v2, setV2State] = useState<boolean>(() => readFlag());

  // Hydrate from localStorage/env on mount
  useEffect(() => {
    const win = window as AgentVersionWindow;

    // Expose window globals for dev console
    win.__setAgentV2 = (v: boolean) => {
      try { window.localStorage.setItem(LS_KEY, v ? '1' : '0'); } catch {}
      setV2State(v);
      // Reload so the new component mounts cleanly
      window.location.reload();
    };
    win.__getAgentV2 = () => readFlag();

    // Listen for cross-tab sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) setV2State(readFlag());
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      delete win.__setAgentV2;
      delete win.__getAgentV2;
    };
  }, []);

  const setV2 = (v: boolean) => {
    try { window.localStorage.setItem(LS_KEY, v ? '1' : '0'); } catch {}
    setV2State(v);
    // Reload to swap component cleanly
    window.location.reload();
  };

  return { v2, setV2 };
}
