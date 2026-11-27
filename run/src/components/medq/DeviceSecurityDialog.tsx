'use client';

// ─────────────────────────────────────────────────────────────────────────
// DeviceSecurityDialog — device security panel.
// ─────────────────────────────────────────────────────────────────────────
// Opened from the "Device Security" item in UserMenu. Shows:
//
//   1. Current device summary (browser · OS · location · last IP)
//      with a trust score progress bar + "Log out from this device" button.
//   2. All known devices for this account, with revoke buttons for any
//      device that is NOT the current one.
//
// CRITICAL — how "this device" is identified:
// The current device is identified by matching the LOCAL fingerprint hash
// (collected in this browser via collectFingerprint()) against the
// fingerprintHash field of each row returned by /api/security/devices.
//
// Previous implementation used `devices[0]` (the most recently seen row,
// since the API sorts by lastSeenAt DESC). That was WRONG because it
// assumed the current browser was always the most recent verifier. When
// device B just signed in, B's lastSeenAt > A's, so A's dialog would
// incorrectly label B as "This device" — confusing and dangerous.
//
// The local fingerprint is collected by DeviceSessionTracker on app boot
// (and cached in fingerprint-client.ts), so calling getFingerprintHash()
// here is essentially free after the first call.
//
// Location ("Cairo, Egypt" style, like Telegram) comes from server-side
// IP geolocation performed in /api/security/verify — see lookupIpGeo in
// src/lib/security/fingerprint-server.ts. The browser is never asked to
// report its own IP.
//
// The dialog polls /api/security/devices every 30s while open so the user
// sees live updates. It also listens for `medq:device-verified` so it
// refreshes immediately when DeviceSessionTracker fires.
//
// Privacy note: this dialog deliberately does NOT expose the raw fingerprint
// hash or its component signals (canvas / WebGL / audio / fonts) to the
// user. Those are internal identifiers — exposing them would not help the
// user audit their devices, and could aid an attacker who has read access
// to the user's screen. We only show user-meaningful fields: browser name,
// OS name, location, last IP, trust score, sign-in count.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useCallback, useMemo } from 'react';
import { signOut } from 'next-auth/react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  ShieldCheck, ShieldAlert, Smartphone, Monitor, RefreshCw,
  Trash2, Clock, Globe, Fingerprint, MapPin, Loader2, LogOut,
  Radio,
} from 'lucide-react';
import { getFingerprintHash } from '@/lib/security/fingerprint-client';

interface DeviceSecurityDialogProps {
  open: boolean;
  onClose: () => void;
}

interface DeviceRow {
  id: string;
  fingerprintHash: string;
  label: string | null;
  userAgent: string;
  platform: string;
  osGuess: string;
  browserGuess: string;
  // screenSummary + timezone are still returned by the API but intentionally
  // not displayed in the UI — they're internal diagnostic fields. Location
  // (lastGeo) is the user-meaningful signal and is resolved server-side
  // from the request IP via /api/security/verify → lookupIpGeo().
  trustScore: number;
  revoked: boolean;
  revokedAt: string | null;
  revokedReason: string | null;
  firstSeenAt: string;
  lastSeenAt: string;
  lastIp: string;
  lastGeo: string;
  loginCount: number;
}

// A device is considered "active now" if its lastSeenAt is within this window.
// DeviceSessionTracker re-verifies every 30 min + on focus after 5 min away,
// so any device seen within the last 5 min is almost certainly still using
// the app right now.
const ACTIVE_NOW_WINDOW_MS = 5 * 60 * 1000;

export default function DeviceSecurityDialog({ open, onClose }: DeviceSecurityDialogProps) {
  const [devices, setDevices] = useState<DeviceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [revokingHash, setRevokingHash] = useState<string | null>(null);
  const [lastRefreshAt, setLastRefreshAt] = useState<number>(0);
  // Local fingerprint hash of THIS browser — used to identify which row
  // in the devices list corresponds to the current device. Collected
  // client-side (canvas/webgl/audio/fonts hash, no IP, no PII).
  const [localFpHash, setLocalFpHash] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const devRes = await fetch('/api/security/devices');
      if (devRes.ok) {
        const body = await devRes.json();
        setDevices(body?.devices ?? []);
      }
      setLastRefreshAt(Date.now());
    } catch (e) {
      console.warn('[DeviceSecurityDialog] refresh failed:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Collect THIS browser's fingerprint hash on dialog open.
  // getFingerprintHash() is memoized in fingerprint-client.ts — after the
  // first call (which DeviceSessionTracker already made on boot), this is
  // a synchronous cache hit. We still treat it as async to be safe.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    getFingerprintHash()
      .then((hash) => {
        if (!cancelled) setLocalFpHash(hash);
      })
      .catch((e) => {
        console.warn('[DeviceSecurityDialog] could not collect local fingerprint:', e);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  // ── Fetch devices when the dialog opens, then poll every 30s while it
  // stays open. Also listen for the device-verified window event so we
  // refresh the instant DeviceSessionTracker finishes a verify.
  useEffect(() => {
    if (!open) return;
    refresh();
    const interval = setInterval(refresh, 30_000);
    const onVerified = () => refresh();
    if (typeof window !== 'undefined') {
      window.addEventListener('medq:device-verified', onVerified);
    }
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('medq:device-verified', onVerified);
      }
    };
  }, [open, refresh]);

  const handleRevoke = async (hash: string, label: string | null) => {
    if (!confirm(
      `Revoke this device?\n\n${label || 'Unknown device'}\n\n` +
      `The next time someone tries to sign in from this device, they will be ` +
      `blocked and you'll get a critical security alert. This cannot be undone.`
    )) return;
    setRevokingHash(hash);
    try {
      const res = await fetch('/api/security/devices', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprintHash: hash, reason: 'Revoked by user from Device Security panel' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast.error(body?.error || `Failed to revoke device (HTTP ${res.status})`);
        return;
      }
      toast.success('Device revoked', {
        description: 'Future sign-in attempts from this device will be blocked.',
      });
      await refresh();
    } catch (e) {
      console.warn('[DeviceSecurityDialog] revoke failed:', e);
      toast.error('Network error while revoking device');
    } finally {
      setRevokingHash(null);
    }
  };

  // ── "Log out from this device" — ends the current session via Auth.js v5.
  // This is the Telegram-style "Log Out" button. It does NOT revoke the
  // device (the row stays in the list with its trust score intact, so the
  // next sign-in from this device is recognized as a returning device).
  // If the user wants to fully forget this device, they can use the
  // "Revoke" action from the All Known Devices list.
  const handleSignOutThisDevice = async () => {
    if (!confirm(
      'Log out from this device?\n\n' +
      'You will be signed out and redirected to the home page. ' +
      'The device will remain in your trusted list — your trust score ' +
      'is preserved for the next sign-in.'
    )) return;
    setSigningOut(true);
    try {
      await signOut({ redirect: false });
      toast.success('Logged out', {
        description: 'You have been signed out from this device.',
      });
      onClose();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (e) {
      console.warn('[DeviceSecurityDialog] sign out failed:', e);
      toast.error('Could not log out — please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  // ── Derived state ──
  // Match the LOCAL fingerprint hash against the rows returned by the API.
  // If we haven't collected the local hash yet (rare — getFingerprintHash
  // is async), we show a "Identifying this device…" placeholder instead of
  // guessing.
  const currentDevice: DeviceRow | undefined = useMemo(() => {
    if (!localFpHash) return undefined;
    return devices.find((d) => d.fingerprintHash === localFpHash);
  }, [devices, localFpHash]);

  // Sort: current device first (if identified), then the rest by lastSeenAt
  // desc (server already sorts by lastSeenAt desc, so we just need to
  // surface the current device to the top).
  const sortedDevices = useMemo(() => {
    if (!currentDevice) return devices;
    const rest = devices.filter((d) => d.id !== currentDevice.id);
    return [currentDevice, ...rest];
  }, [devices, currentDevice]);

  // Active session = device seen within the last 5 min. This counts the
  // current device (which re-verifies every 30 min) plus any other device
  // that's actively using the app right now.
  const activeCount = useMemo(() => {
    const now = Date.now();
    return devices.filter((d) => !d.revoked && (now - Date.parse(d.lastSeenAt)) < ACTIVE_NOW_WINDOW_MS).length;
  }, [devices]);

  // True while we're waiting for either: (a) the device list to load for
  // the first time, or (b) the local fingerprint hash to be collected.
  const isInitializing = (loading && devices.length === 0) || !localFpHash;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-white/[0.06] p-0"
        style={{ background: '#0f1117', color: '#e8ecf4' }}
      >
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-white/[0.04] sticky top-0 z-10" style={{ background: '#0f1117' }}>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Fingerprint className="w-4 h-4" style={{ color: '#00e5a0' }} />
            Device Security
            {activeCount > 0 && (
              <span
                className="ml-1 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(0,229,160,0.10)', color: '#00e5a0' }}
                title={`${activeCount} device${activeCount === 1 ? '' : 's'} active in the last 5 minutes`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background: '#00e5a0',
                    boxShadow: '0 0 0 0 rgba(0,229,160,0.6)',
                    animation: 'medq-pulse 2s infinite',
                  }}
                />
                {activeCount} active
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="text-[11px] text-[#5a6478] mt-1">
            Review the devices signed in to your account. If you see one you don't
            recognize, revoke it — future sign-in attempts from that device will be
            blocked and you'll get a security alert.
          </DialogDescription>
        </DialogHeader>

        {/* Keyframes for the pulsing "active" dot. Injected once. */}
        <style>{`
          @keyframes medq-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(0,229,160,0.6); }
            70%  { box-shadow: 0 0 0 6px rgba(0,229,160,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,229,160,0); }
          }
        `}</style>

        <div className="px-6 py-5 space-y-6">
          {/* ── Current device summary ── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5a6478] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#00e5a0' }} />
                This Device
              </h3>
              <button
                onClick={refresh}
                disabled={loading}
                className="text-[10px] text-[#5a6478] hover:text-[#e8ecf4] flex items-center gap-1 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                {lastRefreshAt ? `Updated ${formatRelative(lastRefreshAt)}` : 'Refresh'}
              </button>
            </div>

            {isInitializing ? (
              <div className="flex items-center gap-2 text-xs text-[#8b95a8] py-6 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                {devices.length === 0 ? 'Loading devices…' : 'Identifying this device…'}
              </div>
            ) : currentDevice ? (
              <CurrentDeviceCard
                device={currentDevice}
                onSignOut={handleSignOutThisDevice}
                signingOut={signingOut}
              />
            ) : (
              <div className="text-xs text-[#5a6478] py-6 text-center border border-dashed border-white/[0.06] rounded-lg">
                No device record for this browser yet.
                <div className="mt-2 text-[10px] text-[#5a6478]">
                  DeviceSessionTracker will register it on the next verify cycle.
                </div>
              </div>
            )}
          </section>

          {/* ── All known devices ── */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5a6478] mb-3 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" style={{ color: '#a78bfa' }} />
              All Known Devices ({devices.length})
              {activeCount > 0 && activeCount < devices.length && (
                <span className="ml-1 text-[#00e5a0] font-normal normal-case tracking-normal">
                  · {activeCount} active
                </span>
              )}
            </h3>
            {devices.length === 0 ? (
              <div className="text-xs text-[#5a6478] py-4 text-center border border-dashed border-white/[0.06] rounded-lg">
                No devices registered yet.
              </div>
            ) : (
              <div className="space-y-2">
                {sortedDevices.map((d) => {
                  const isCurrent = currentDevice?.id === d.id;
                  const isRevoking = revokingHash === d.fingerprintHash;
                  return (
                    <DeviceRowCard
                      key={d.id}
                      device={d}
                      isCurrent={isCurrent}
                      onRevoke={isCurrent ? undefined : () => handleRevoke(d.fingerprintHash, d.label)}
                      revoking={isRevoking}
                    />
                  );
                })}
              </div>
            )}
          </section>

          <div className="text-[10px] text-[#5a6478] text-center pt-2 border-t border-white/[0.04]">
            Trust score grows with each successful sign-in from the same browser.
            New devices start at 50; trusted devices reach 70+ after repeated use.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────

function CurrentDeviceCard({
  device, onSignOut, signingOut,
}: {
  device: DeviceRow;
  onSignOut: () => void;
  signingOut: boolean;
}) {
  const trustColor = device.trustScore >= 70 ? '#00e5a0' : device.trustScore >= 40 ? '#f59e0b' : '#ff5757';
  const trustLabel = device.trustScore >= 70 ? 'Trusted' : device.trustScore >= 40 ? 'Building trust' : 'Low trust';
  const isMobile = /iOS|Android/i.test(device.osGuess);
  const isActiveNow = (Date.now() - Date.parse(device.lastSeenAt)) < ACTIVE_NOW_WINDOW_MS;

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: 'rgba(0,229,160,0.04)', border: '1px solid rgba(0,229,160,0.12)' }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 relative"
          style={{ background: 'rgba(0,229,160,0.10)', border: '1px solid rgba(0,229,160,0.20)' }}
        >
          {isMobile ? (
            <Smartphone className="w-5 h-5" style={{ color: '#00e5a0' }} />
          ) : (
            <Monitor className="w-5 h-5" style={{ color: '#00e5a0' }} />
          )}
          {isActiveNow && (
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
              style={{
                background: '#00e5a0',
                border: '2px solid #0f1117',
              }}
              title="Active now"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-[#e8ecf4] flex items-center gap-1.5 flex-wrap">
            <span className="truncate">
              {device.label || `${device.browserGuess} on ${device.osGuess}`}
            </span>
            {isActiveNow && (
              <span
                className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded inline-flex items-center gap-1"
                style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}
              >
                <Radio className="w-2.5 h-2.5" />
                Active
              </span>
            )}
          </div>
          <div className="text-[11px] text-[#8b95a8] mt-0.5">
            {device.browserGuess} · {device.osGuess}
          </div>
          {device.revoked && (
            <div className="text-[10px] mt-1 flex items-center gap-1 font-bold" style={{ color: '#ff5757' }}>
              <ShieldAlert className="w-3 h-3" />
              Revoked — sign-in blocked
            </div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-[10px] uppercase tracking-wider text-[#5a6478]">Trust</div>
          <div className="text-lg font-bold" style={{ color: trustColor }}>{device.trustScore}</div>
          <div className="text-[9px]" style={{ color: trustColor }}>{trustLabel}</div>
        </div>
      </div>

      {/* Trust progress bar */}
      <div className="h-1.5 rounded-full mb-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, device.trustScore)}%`, background: trustColor }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <DetailRow icon={<MapPin className="w-3 h-3" />} label="Location" value={device.lastGeo || 'Unknown'} />
        <DetailRow icon={<Globe className="w-3 h-3" />} label="Last IP" value={device.lastIp || '—'} />
        <DetailRow icon={<Clock className="w-3 h-3" />} label="First seen" value={formatRelative(Date.parse(device.firstSeenAt))} />
        <DetailRow icon={<Clock className="w-3 h-3" />} label="Last seen" value={formatRelative(Date.parse(device.lastSeenAt))} />
      </div>

      {device.lastGeo && (
        <div className="text-[9px] text-[#5a6478] mt-2 italic">
          Location is approximate — resolved by the server from your sign-in IP.
        </div>
      )}

      {/* Sign out button */}
      <div className="mt-3 pt-3 border-t border-white/[0.04]">
        <button
          onClick={onSignOut}
          disabled={signingOut}
          className="w-full text-[11px] font-bold py-2 px-3 rounded-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#e8ecf4',
          }}
          onMouseEnter={(e) => {
            if (!signingOut) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          }}
        >
          {signingOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-3.5 h-3.5" />
          )}
          {signingOut ? 'Logging out…' : 'Log out from this device'}
        </button>
      </div>
    </div>
  );
}

function DeviceRowCard({
  device, isCurrent, onRevoke, revoking,
}: {
  device: DeviceRow;
  isCurrent: boolean;
  onRevoke?: () => void;
  revoking?: boolean;
}) {
  const isMobile = /iOS|Android/i.test(device.osGuess);
  const trustColor = device.trustScore >= 70 ? '#00e5a0' : device.trustScore >= 40 ? '#f59e0b' : '#ff5757';
  const isActiveNow = !device.revoked && (Date.now() - Date.parse(device.lastSeenAt)) < ACTIVE_NOW_WINDOW_MS;

  return (
    <div
      className="rounded-lg p-3 flex items-center gap-3"
      style={{
        background: isCurrent ? 'rgba(0,229,160,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isCurrent ? 'rgba(0,229,160,0.10)' : 'rgba(255,255,255,0.04)'}`,
        opacity: device.revoked ? 0.55 : 1,
      }}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 relative"
        style={{ background: 'rgba(255,255,255,0.04)' }}
      >
        {isMobile ? (
          <Smartphone className="w-4 h-4 text-[#8b95a8]" />
        ) : (
          <Monitor className="w-4 h-4 text-[#8b95a8]" />
        )}
        {isActiveNow && (
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
            style={{
              background: '#00e5a0',
              border: '1.5px solid #0f1117',
            }}
            title="Active now"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-xs font-bold text-[#e8ecf4] truncate flex items-center gap-1.5">
          <span className="truncate">
            {device.label || `${device.browserGuess} · ${device.osGuess}`}
          </span>
          {isCurrent && (
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: 'rgba(0,229,160,0.15)', color: '#00e5a0' }}>
              This device
            </span>
          )}
          {isActiveNow && !isCurrent && (
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: 'rgba(0,229,160,0.10)', color: '#00e5a0' }}>
              Active
            </span>
          )}
          {device.revoked && !isCurrent && (
            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: 'rgba(255,87,87,0.15)', color: '#ff5757' }}>
              Revoked
            </span>
          )}
        </div>
        <div className="text-[10px] text-[#5a6478] mt-0.5 truncate">
          {device.browserGuess} · {device.osGuess}
          {device.lastGeo ? ` · ${device.lastGeo}` : ''}
        </div>
        <div className="text-[10px] text-[#5a6478] mt-0.5">
          Last seen {formatRelative(Date.parse(device.lastSeenAt))} · Trust {device.trustScore}/100 · {device.loginCount} sign-ins
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center gap-2">
        <div className="w-12 text-right">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(100, device.trustScore)}%`, background: trustColor }} />
          </div>
        </div>
        {!isCurrent && !device.revoked && onRevoke && (
          <button
            onClick={onRevoke}
            disabled={revoking}
            className="p-1.5 rounded-md text-[#ff5757] hover:bg-[#ff5757]/10 disabled:opacity-50 cursor-pointer transition-colors"
            title="Revoke this device"
          >
            {revoking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <span className="text-[#5a6478] flex-shrink-0">{icon}</span>
      <span className="text-[#5a6478] flex-shrink-0">{label}:</span>
      <span className="text-[#e8ecf4] truncate" title={value}>{value}</span>
    </div>
  );
}

// ── helpers ──

function formatRelative(ms: number): string {
  if (!ms || Number.isNaN(ms)) return 'unknown';
  const diffSec = Math.max(0, Math.floor((Date.now() - ms) / 1000));
  if (diffSec < 60) return 'just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)}d ago`;
  return new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
