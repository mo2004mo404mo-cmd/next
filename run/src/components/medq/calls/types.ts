/**
 * Shared types for the global call system (CallProvider + MiroTalkCall +
 * IncomingCallModal + MinimizedCallBar).
 */

export type CallType = 'voice' | 'video';
export type CallRole = 'caller' | 'callee';

/**
 * Call phases:
 *   ringing    — caller waiting for pickup (ringback) / callee being rung
 *   connecting — accepted, MiroTalk room joining
 *   connected  — media flowing
 *   ended      — terminal splash ("Call ended / Declined / No answer / Busy")
 */
export type CallPhase = 'ringing' | 'connecting' | 'connected' | 'ended';

export type CallEndReason = 'completed' | 'declined' | 'no-answer' | 'busy' | 'failed';

/** A call invite we are ringing on (set by `call:invite` socket events). */
export interface IncomingCall {
  roomId: string;
  joinUrl: string;
  callerUserId: string;
  callerName: string;
  callType: CallType;
  receivedAt: number;
}

/** The call we are currently in (or dialing). */
export interface ActiveCall {
  roomId: string;
  joinUrl?: string;
  roomName?: string;
  callType: CallType;
  role: CallRole;
  peerId?: string;
  peerName?: string;
  phase: CallPhase;
  startedAt: number;
  connectedAt?: number;
  endReason?: CallEndReason;
}

export interface StartCallOptions {
  roomId: string;
  roomName?: string;
  callType: CallType;
  /** Direct-room peer (so hangup/cancel events can be targeted). */
  peerId?: string;
  peerName?: string;
}

export interface CallContextValue {
  activeCall: ActiveCall | null;
  incoming: IncomingCall | null;
  minimized: boolean;
  /** True while a call session exists (any phase). */
  inCall: boolean;
  startCall(opts: StartCallOptions): void;
  openMeeting(opts: { roomId: string; roomName: string; joinUrl: string }): void;
  acceptIncoming(): void;
  declineIncoming(): void;
  endActiveCall(): void;
  toggleMinimize(): void;
}

/** mm:ss (or h:mm:ss for long calls) — used by the timer chips. */
export function formatCallDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

/** Initials for avatar circles ("Dr. Sarah Chen" → "SC"). */
export function initialsOf(name: string | undefined): string {
  const parts = String(name ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
