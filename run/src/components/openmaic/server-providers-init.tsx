/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/server-providers-init.tsx
 *
 * Verbatim port.
 */

'use client';

import { useEffect } from 'react';
import { useSettingsStore } from '@/lib/store/settings';

export function ServerProvidersInit() {
  const fetchServerProviders = useSettingsStore((state) => state.fetchServerProviders);

  useEffect(() => {
    fetchServerProviders();
  }, [fetchServerProviders]);

  return null;
}
