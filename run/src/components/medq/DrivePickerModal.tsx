'use client';

/**
 * DrivePickerModal — browse + import files from the user's CONNECTED Google
 * Drive (OAuth), or walk through the one-time server setup when the OAuth
 * client isn't configured yet.
 *
 * Opened from the Knowledge Library panel's "Google Drive" button:
 *   - configured + connected  → search box + newest-first file list with
 *                               per-file Import buttons ("Added" state)
 *   - configured, no connection → "Connect Google Drive" (redirects to the
 *                               OAuth consent screen)
 *   - not configured           → step-by-step setup guide with the exact
 *                               redirect URI to register in Google Cloud.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  X,
  Search,
  Loader2,
  HardDrive,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileImage,
  FileAudio,
  FileVideo,
  CheckCircle2,
  Download,
  Unplug,
  ExternalLink,
  Copy,
} from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
}

interface DriveStatus {
  configured: boolean;
  connected: boolean;
  email?: string;
  name?: string;
  redirectUri: string;
}

function fileIcon(mime: string) {
  if (mime.includes('pdf')) return <FileText className="w-4 h-4 text-red-400" />;
  if (mime.includes('spreadsheet') || mime.includes('excel') || mime.includes('csv')) return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
  if (mime.includes('presentation') || mime.includes('powerpoint')) return <Presentation className="w-4 h-4 text-orange-400" />;
  if (mime.startsWith('image/')) return <FileImage className="w-4 h-4 text-cyan-400" />;
  if (mime.startsWith('audio/')) return <FileAudio className="w-4 h-4 text-purple-400" />;
  if (mime.startsWith('video/')) return <FileVideo className="w-4 h-4 text-orange-400" />;
  return <FileText className="w-4 h-4 text-[#8b95a8]" />;
}

function fmtSize(bytes?: string) {
  const n = Number(bytes);
  if (!bytes || Number.isNaN(n)) return '';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function fmtDate(iso?: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

const NATIVE_LABEL: Record<string, string> = {
  'application/vnd.google-apps.document': 'Google Doc → text',
  'application/vnd.google-apps.spreadsheet': 'Google Sheet → csv',
  'application/vnd.google-apps.presentation': 'Google Slides → pptx',
  'application/vnd.google-apps.drawing': 'Drawing → png',
};

export default function DrivePickerModal({
  onClose,
  onImported,
}: {
  onClose: () => void;
  /** Panel hook — refresh the source list after a successful import. */
  onImported?: () => void;
}) {
  const [status, setStatus] = useState<DriveStatus | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [importing, setImporting] = useState<Set<string>>(new Set());
  const [imported, setImported] = useState<Set<string>>(new Set());
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // ── status + first page on mount
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/knowledge/drive/status');
        const json = (await res.json()) as DriveStatus;
        if (!alive) return;
        setStatus(json);
        if (json.configured && json.connected) void loadFiles('');
      } catch {
        if (alive) setStatus({ configured: false, connected: false, redirectUri: '' });
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFiles = useCallback(async (q: string, pageToken?: string) => {
    setSearching(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (pageToken) params.set('pageToken', pageToken);
      const res = await fetch(`/api/knowledge/drive/files?${params.toString()}`);
      const json = (await res.json()) as { files?: DriveFile[]; nextPageToken?: string; error?: string };
      if (!res.ok) {
        toast.error(json.error || `HTTP ${res.status}`);
        return;
      }
      setFiles((prev) => (pageToken ? [...prev, ...(json.files || [])] : json.files || []));
      setNextPageToken(json.nextPageToken);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Drive request failed');
    } finally {
      setSearching(false);
    }
  }, []);

  const importFile = useCallback(async (file: DriveFile) => {
    if (importing.has(file.id) || imported.has(file.id)) return;
    setImporting((prev) => new Set(prev).add(file.id));
    try {
      const res = await fetch('/api/knowledge/drive/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: file.id, name: file.name, mimeType: file.mimeType }),
      });
      const json = (await res.json()) as { sourceId?: string; error?: string };
      if (!res.ok) {
        toast.error(json.error || `HTTP ${res.status}`);
        return;
      }
      setImported((prev) => new Set(prev).add(file.id));
      toast.info(`Importing "${file.name}" from Google Drive — watch the status in your library`);
      onImported?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Import failed');
    } finally {
      setImporting((prev) => {
        const next = new Set(prev);
        next.delete(file.id);
        return next;
      });
    }
  }, [importing, imported, onImported]);

  const disconnect = useCallback(async () => {
    try {
      const res = await fetch('/api/knowledge/drive/disconnect', { method: 'POST' });
      const json = (await res.json()) as { disconnected?: boolean; error?: string };
      if (!res.ok) {
        toast.error(json.error || `HTTP ${res.status}`);
        return;
      }
      toast.success('Google Drive disconnected — imported files stay in your library');
      setStatus((s) => (s ? { ...s, connected: false, email: undefined } : s));
      setFiles([]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Disconnect failed');
    }
  }, []);

  // ── keyboard: Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const copy = (text: string) => {
    void navigator.clipboard?.writeText(text).then(() => toast.success('Copied')).catch(() => {});
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-white/[0.1] bg-[#141926] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <HardDrive className="w-4 h-4 text-[#4fc3f7] shrink-0" />
            <span className="text-sm font-semibold text-[#c8d0e0] truncate">Google Drive</span>
            {status?.connected && status.email && (
              <span className="text-[10px] text-[#5a6478] truncate hidden sm:inline">{status.email}</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#5a6478] hover:text-[#c8d0e0] transition-colors p-1 shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-[#4fc3f7]" />
            </div>
          )}

          {/* ── Not configured: setup guide ── */}
          {!loading && status && !status.configured && (
            <div className="space-y-3">
              <p className="text-xs text-[#8b95a8] leading-relaxed">
                Importing from <span className="text-[#c8d0e0]">your own Drive</span> (private files, no link-sharing) needs a
                one-time Google OAuth setup. Public share links already work via the URL box — this is only for full Drive access.
              </p>
              <ol className="space-y-2 text-xs text-[#8b95a8] list-none">
                {[
                  <>Open <a className="text-[#4fc3f7] hover:underline" href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">console.cloud.google.com <ExternalLink className="w-3 h-3 inline" /></a> and create (or pick) a project.</>,
                  <>Enable the <span className="text-[#c8d0e0]">Google Drive API</span> (APIs &amp; Services → Library).</>,
                  <>Set up the <span className="text-[#c8d0e0]">OAuth consent screen</span> (External) and add your Google account as a test user.</>,
                  <>Create credentials → <span className="text-[#c8d0e0]">OAuth client ID</span> → Web application.</>,
                  <li>
                    Add this <span className="text-[#c8d0e0]">Authorized redirect URI</span>:
                    <div className="mt-1 flex items-center gap-2">
                      <code className="flex-1 px-2 py-1 rounded bg-[#0f1320] border border-white/[0.08] text-[10px] text-[#4fc3f7] break-all">{status.redirectUri || '(start the server to see it)'}</code>
                      <button type="button" onClick={() => copy(status.redirectUri)} className="p-1.5 rounded border border-white/10 text-[#8b95a8] hover:text-[#4fc3f7]" title="Copy">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>,
                  <>Put the Client ID / Secret in <code className="px-1 rounded bg-[#0f1320] text-[10px]">.env</code> as <code className="text-[#4fc3f7]">GOOGLE_CLIENT_ID</code> / <code className="text-[#4fc3f7]">GOOGLE_CLIENT_SECRET</code> and restart the server.</>,
                  <>Come back and click <span className="text-[#c8d0e0]">Connect Google Drive</span>.</>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ── Configured but not connected ── */}
          {!loading && status?.configured && !status.connected && (
            <div className="text-center py-10 space-y-4">
              <HardDrive className="w-8 h-8 mx-auto text-[#4fc3f7]/60" />
              <p className="text-xs text-[#8b95a8] max-w-sm mx-auto leading-relaxed">
                Connect once and you can import any file from your Google Drive — private ones too, no link-sharing needed.
              </p>
              <button
                type="button"
                onClick={() => { window.location.href = '/api/knowledge/drive/connect'; }}
                className="px-4 py-2 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold hover:bg-[#4fc3f7]/20 transition-colors"
              >
                Connect Google Drive
              </button>
            </div>
          )}

          {/* ── Connected: file browser ── */}
          {!loading && status?.configured && status.connected && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setFiles([]); setNextPageToken(undefined); void loadFiles(query); } }}
                  placeholder="Search your Drive by file name…"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#0f1320] border border-white/[0.08] text-xs text-[#c8d0e0] placeholder:text-[#5a6478] focus:outline-none focus:border-[#4fc3f7]/40"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => { setFiles([]); setNextPageToken(undefined); void loadFiles(query); }}
                  disabled={searching}
                  className="px-3 py-1.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 text-[#4fc3f7] text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 shrink-0"
                >
                  {searching ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                  Search
                </button>
              </div>

              <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-1">
                {files.length === 0 && !searching && (
                  <p className="text-xs text-[#5a6478] text-center py-8">No files found{query ? ` for “${query}”` : ''}.</p>
                )}
                {files.map((f) => {
                  const isImporting = importing.has(f.id);
                  const isImported = imported.has(f.id);
                  return (
                    <div key={f.id} className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/[0.07] bg-[#1a1e2b] hover:border-white/[0.14] transition-all">
                      <span className="shrink-0">{fileIcon(f.mimeType)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#c8d0e0] truncate font-medium" title={f.name}>{f.name}</p>
                        <p className="text-[10px] text-[#5a6478] truncate">
                          {[fmtSize(f.size), fmtDate(f.modifiedTime), NATIVE_LABEL[f.mimeType]].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void importFile(f)}
                        disabled={isImporting || isImported}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 shrink-0 border transition-colors ${
                          isImported
                            ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30 text-[#00e5a0]'
                            : 'bg-[#4fc3f7]/10 border-[#4fc3f7]/30 text-[#4fc3f7] hover:bg-[#4fc3f7]/20 disabled:opacity-40'
                        }`}
                      >
                        {isImporting ? <Loader2 className="w-3 h-3 animate-spin" /> : isImported ? <CheckCircle2 className="w-3 h-3" /> : <Download className="w-3 h-3" />}
                        {isImported ? 'Added' : 'Import'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {nextPageToken && (
                <button
                  type="button"
                  onClick={() => void loadFiles(query, nextPageToken)}
                  disabled={searching}
                  className="w-full py-2 rounded-lg border border-white/10 text-[#8b95a8] text-xs hover:border-[#4fc3f7]/30 hover:text-[#4fc3f7] disabled:opacity-40 transition-colors"
                >
                  Load more
                </button>
              )}

              <div className="flex items-center justify-between pt-1">
                <p className="text-[10px] text-[#5a6478]">
                  Files import privately into your library · native Docs/Sheets/Slides export as text/csv/pptx
                </p>
                <button
                  type="button"
                  onClick={() => void disconnect()}
                  className="text-[10px] text-[#5a6478] hover:text-red-400 transition-colors flex items-center gap-1 shrink-0"
                  title="Remove Drive access (imported files are kept)"
                >
                  <Unplug className="w-3 h-3" /> Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
