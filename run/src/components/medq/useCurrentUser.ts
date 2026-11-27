'use client';

import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

export function useCurrentUser() {
  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  const userId = (user as { id?: string } | null)?.id;

  const authHeaders = useCallback((extra?: Record<string, string>) => ({
    ...(userId ? { 'x-user-id': userId } : {}),
    ...extra,
  }), [userId]);

  return {
    user,
    userId,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    authHeaders,
  };
}
