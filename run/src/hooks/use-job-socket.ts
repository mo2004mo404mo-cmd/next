/**
 * useJobSocket — React hook for real-time job progress via socket.io.
 * Falls back to polling if socket connection fails or drops.
 */
'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface JobProgress {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: string;
  attempt: number;
  result?: unknown[];
  partialResult?: unknown | null;  // Latest question saved during progress
  error?: string | null;
}

interface UseJobSocketOptions {
  /** Called on every progress update */
  onProgress?: (data: JobProgress) => void;
  /** Called when job completes successfully */
  onCompleted?: (data: JobProgress) => void;
  /** Called when job fails */
  onFailed?: (data: JobProgress) => void;
  /** Polling URL for fallback (e.g., '/api/generate') */
  pollUrl?: string;
  /** Poll interval in ms (default 3000) */
  pollIntervalMs?: number;
}

export function useJobSocket(options: UseJobSocketOptions = {}) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const currentJobRef = useRef<string | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Store callbacks in refs so they can be used in effects without causing re-renders
  const callbacksRef = useRef(options);
  // Update ref inside effect to avoid React "Cannot update ref during render" error
  useEffect(() => {
    callbacksRef.current = options;
  });

  // Start polling for a specific job (used as fallback when socket is down)
  const startPolling = useCallback((jobId: string) => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);

    const pollUrl = callbacksRef.current.pollUrl;
    if (!pollUrl) return;

    const pollInterval = callbacksRef.current.pollIntervalMs || 3000;

    // Do an immediate first poll
    const doPoll = async () => {
      try {
        const res = await fetch(`${pollUrl}?jobId=${encodeURIComponent(jobId)}`);
        if (!res.ok) return;

        const data: JobProgress = await res.json();

        if (data.status === 'completed') {
          callbacksRef.current.onCompleted?.(data);
          // Cleanup will be handled by the callback
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
          }
          currentJobRef.current = null;
        } else if (data.status === 'failed') {
          callbacksRef.current.onFailed?.(data);
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
          }
          currentJobRef.current = null;
        } else {
          callbacksRef.current.onProgress?.(data);
        }
      } catch {
        // Poll error — next poll will retry
      }
    };

    doPoll(); // Immediate first poll
    pollTimerRef.current = setInterval(doPoll, pollInterval);
  }, []);

  // Stop polling
  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  // Cleanup a job: leave socket room, stop polling
  const cleanupJob = useCallback((jobId: string) => {
    if (currentJobRef.current === jobId) {
      socketRef.current?.emit('leave:job', jobId);
      currentJobRef.current = null;
    }
    stopPolling();
  }, [stopPolling]);

  // Connect to socket service
  useEffect(() => {
    const socket = io('/?XTransformPort=3003', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 15,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('[useJobSocket] Connected:', socket.id);
      setConnected(true);

      // Re-join the current job room if we reconnect
      if (currentJobRef.current) {
        socket.emit('join:job', currentJobRef.current);
        // Socket is back — stop polling fallback
        stopPolling();
      }
    });

    socket.on('disconnect', () => {
      console.log('[useJobSocket] Disconnected');
      setConnected(false);

      // Socket dropped — start polling as fallback if we're tracking a job
      if (currentJobRef.current && callbacksRef.current.pollUrl) {
        startPolling(currentJobRef.current);
      }
    });

    socket.on('job:progress', (data: JobProgress) => {
      callbacksRef.current.onProgress?.(data);
    });

    socket.on('job:completed', (data: JobProgress) => {
      callbacksRef.current.onCompleted?.(data);
      cleanupJob(data.jobId);
    });

    socket.on('job:failed', (data: JobProgress) => {
      callbacksRef.current.onFailed?.(data);
      cleanupJob(data.jobId);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
      stopPolling();
    };
  }, [cleanupJob, startPolling, stopPolling]);

  /**
   * Start listening for a job's progress.
   * Joins the socket room and optionally starts polling as fallback.
   */
  const listenToJob = useCallback((jobId: string) => {
    // Leave previous job room
    if (currentJobRef.current && currentJobRef.current !== jobId) {
      socketRef.current?.emit('leave:job', currentJobRef.current);
    }

    currentJobRef.current = jobId;

    // Join socket room
    if (socketRef.current?.connected) {
      socketRef.current.emit('join:job', jobId);
      // Socket is connected — no need for polling
      stopPolling();
    } else if (callbacksRef.current.pollUrl) {
      // Socket not connected — start polling as fallback
      startPolling(jobId);
    }
  }, [startPolling, stopPolling]);

  /**
   * Stop listening to a job.
   */
  const stopListening = useCallback(() => {
    if (currentJobRef.current) {
      cleanupJob(currentJobRef.current);
    }
  }, [cleanupJob]);

  return {
    connected,
    listenToJob,
    stopListening,
  };
}
