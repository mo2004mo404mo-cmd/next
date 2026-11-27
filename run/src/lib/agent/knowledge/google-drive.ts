/**
 * knowledge/google-drive.ts — OAuth connection to the user's OWN Google Drive.
 *
 * Lets a user "Connect Google Drive" once (Google consent screen) and then
 * browse/import PRIVATE files straight from their Drive — no per-file
 * "anyone with the link" sharing needed. Public share links keep working
 * through url-source.ts; this module is the authenticated path.
 *
 * Storage: tokens live in the existing Prisma `Account` table (the Auth.js
 * adapter schema) as provider='google-drive' — access_token, refresh_token,
 * expires_at — so no schema migration is needed. One connection per app user
 * (re-connecting replaces the previous Google account).
 *
 * Setup (server operator): create an OAuth client in Google Cloud Console
 * (Drive API enabled), set GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET in .env,
 * and register the redirect URI reported by /api/knowledge/drive/status.
 * Everything below degrades to clear "not configured" errors without them.
 */

import { db } from '../../db';
import { createLogger } from '../../logger';

const log = createLogger('GoogleDrive');

const DRIVE_PROVIDER = 'google-drive';
const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const DRIVE_API = 'https://www.googleapis.com/drive/v3';
export const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
export const STATE_COOKIE = 'medq_drive_state';

/** Hard download cap — matches the URL import route's streaming cap. */
const MAX_DRIVE_BYTES = 200 * 1024 * 1024;

// ─── Configuration ──────────────────────────────────────────────────────────

export function isDriveConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

/**
 * The redirect URI registered in Google Cloud Console. Env override wins
 * (GOOGLE_DRIVE_REDIRECT_URI); otherwise derived from the request host so it
 * is correct both on localhost and behind the sandbox preview proxy.
 */
export function deriveRedirectUri(req: Request): string {
  const envUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
  if (envUri) return envUri;
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
  if (host) return `${proto}://${host}/api/knowledge/drive/callback`;
  return new URL(req.url).origin + '/api/knowledge/drive/callback';
}

export function buildAuthUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: `${DRIVE_SCOPE} openid email profile`,
    access_type: 'offline',
    prompt: 'consent',
    state,
    include_granted_scopes: 'false',
  });
  return `${AUTH_ENDPOINT}?${params.toString()}`;
}

// ─── Token plumbing ─────────────────────────────────────────────────────────

interface TokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  id_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

/** Decode the id_token payload (JWT) for the connected user's email/name/sub. */
function decodeIdToken(idToken?: string): { sub?: string; email?: string; name?: string } {
  if (!idToken) return {};
  try {
    const payload = idToken.split('.')[1];
    const json = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      sub?: string; email?: string; name?: string;
    };
    return { sub: json.sub, email: json.email, name: json.name };
  } catch {
    return {};
  }
}

export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
): Promise<TokenResponse> {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
    signal: AbortSignal.timeout(30_000),
  });
  const json = (await res.json().catch(() => ({}))) as TokenResponse;
  if (!res.ok || json.error) {
    throw new Error(`Google token exchange failed: ${json.error || res.status}${json.error_description ? ` — ${json.error_description}` : ''}`);
  }
  return json;
}

/** Persist the connection as an Account row (one per app user). */
export async function saveDriveConnection(userId: string, tokens: TokenResponse): Promise<{ email?: string; name?: string }> {
  const { sub, email, name } = decodeIdToken(tokens.id_token);
  // one connection per user — replace any previous Google account
  await db.account.deleteMany({ where: { userId, provider: DRIVE_PROVIDER } });
  await db.account.create({
    data: {
      userId,
      type: 'oauth',
      provider: DRIVE_PROVIDER,
      providerAccountId: sub || email || 'google-user',
      access_token: tokens.access_token || null,
      refresh_token: tokens.refresh_token || null,
      expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
      token_type: tokens.token_type || 'Bearer',
      scope: tokens.scope || DRIVE_SCOPE,
      id_token: tokens.id_token || null,
    },
  });
  log.info?.(`Drive connected for user ${userId}${email ? ` (${email})` : ''}`);
  return { email, name };
}

export interface DriveConnectionInfo {
  email?: string;
  name?: string;
}

export async function getDriveConnection(userId: string): Promise<DriveConnectionInfo | null> {
  const account = await db.account.findFirst({ where: { userId, provider: DRIVE_PROVIDER } });
  if (!account) return null;
  const { email, name } = decodeIdToken(account.id_token || undefined);
  return {
    email: email || (account.providerAccountId?.includes('@') ? account.providerAccountId : undefined),
    name,
  };
}

export async function disconnectDrive(userId: string): Promise<number> {
  const deleted = await db.account.deleteMany({ where: { userId, provider: DRIVE_PROVIDER } });
  return deleted.count;
}

/**
 * A valid access token for the user, refreshing when close to expiry.
 * Returns null when the user has no connection; throws on refresh failure
 * (revoked consent / network) with an actionable message.
 */
async function getAccessToken(userId: string): Promise<string | null> {
  const account = await db.account.findFirst({ where: { userId, provider: DRIVE_PROVIDER } });
  if (!account) return null;

  const expiresIn = (account.expires_at || 0) - Math.floor(Date.now() / 1000);
  if (account.access_token && expiresIn > 60) return account.access_token;

  if (!account.refresh_token) {
    if (account.access_token) return account.access_token; // last-known token
    throw new Error('Google Drive connection has no refresh token — disconnect and connect again.');
  }
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: account.refresh_token,
      grant_type: 'refresh_token',
    }),
    signal: AbortSignal.timeout(30_000),
  });
  const json = (await res.json().catch(() => ({}))) as TokenResponse;
  if (!res.ok || json.error || !json.access_token) {
    const invalid = json.error === 'invalid_grant';
    await db.account.deleteMany({ where: { userId, provider: DRIVE_PROVIDER } }).catch(() => {});
    throw new Error(
      invalid
        ? 'Google Drive access was revoked — connect Google Drive again.'
        : `Could not refresh Google Drive access (${json.error || res.status}).`,
    );
  }
  await db.account.update({
    where: { id: account.id },
    data: {
      access_token: json.access_token,
      expires_at: json.expires_in ? Math.floor(Date.now() / 1000) + json.expires_in : null,
    },
  });
  return json.access_token;
}

/** Get a token for API calls; throws a clean error when not connected. */
export async function requireAccessToken(userId: string): Promise<string> {
  const token = await getAccessToken(userId);
  if (!token) throw new Error('Google Drive is not connected — click "Connect Google Drive" first.');
  return token;
}

// ─── Drive API: list + download ─────────────────────────────────────────────

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
}

/** Native Google editors → export format that our parsers understand. */
const GOOGLE_EXPORTS: Record<string, { ext: string; mimeType: string }> = {
  'application/vnd.google-apps.document': { ext: 'txt', mimeType: 'text/plain' },
  'application/vnd.google-apps.spreadsheet': { ext: 'csv', mimeType: 'text/csv' },
  'application/vnd.google-apps.presentation': { ext: 'pptx', mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
  'application/vnd.google-apps.drawing': { ext: 'png', mimeType: 'image/png' },
};

export function isNativeGoogleDoc(mimeType: string): boolean {
  return mimeType in GOOGLE_EXPORTS;
}

export function isImportable(file: { mimeType: string }): boolean {
  if (file.mimeType === 'application/vnd.google-apps.folder') return false;
  if (file.mimeType.startsWith('application/vnd.google-apps.')) return isNativeGoogleDoc(file.mimeType);
  return true;
}

export async function listDriveFiles(
  userId: string,
  query: string,
  pageToken?: string,
): Promise<{ files: DriveFile[]; nextPageToken?: string }> {
  const token = await requireAccessToken(userId);
  const conditions = ["trashed = false", "mimeType != 'application/vnd.google-apps.folder'"];
  if (query.trim()) conditions.push(`name contains '${query.replace(/'/g, "\\'")}'`);
  const params = new URLSearchParams({
    pageSize: '40',
    q: conditions.join(' and '),
    orderBy: 'modifiedTime desc',
    fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime)',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true',
  });
  if (pageToken) params.set('pageToken', pageToken);

  const res = await fetch(`${DRIVE_API}/files?${params}`, {
    headers: { authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(30_000),
  });
  const json = (await res.json().catch(() => ({}))) as { files?: DriveFile[]; nextPageToken?: string; error?: { message?: string } };
  if (!res.ok) throw new Error(`Google Drive list failed: ${json.error?.message || res.status}`);
  return { files: (json.files || []).map((f) => ({ ...f, size: f.size || undefined, modifiedTime: f.modifiedTime || undefined })), nextPageToken: json.nextPageToken || undefined };
}

export interface DriveDownload {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
}

/** Download any file (binary alt=media, or native docs via export). */
export async function downloadDriveFile(userId: string, file: { id: string; name: string; mimeType: string }): Promise<DriveDownload> {
  const token = await requireAccessToken(userId);

  const native = GOOGLE_EXPORTS[file.mimeType];
  const url = native
    ? `${DRIVE_API}/files/${encodeURIComponent(file.id)}/export?mimeType=${encodeURIComponent(native.mimeType)}`
    : `${DRIVE_API}/files/${encodeURIComponent(file.id)}?alt=media&supportsAllDrives=true`;
  const safeName = file.name.replace(/[\\/:*?"<>|]/g, '_').slice(0, 150) || 'drive-file';
  const fileName = native ? `${safeName}.${native.ext}` : safeName;

  const res = await fetch(url, {
    headers: { authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(600_000),
  });
  if (!res.ok) {
    const message = await res.text().catch(() => '');
    throw new Error(`Google Drive download failed (HTTP ${res.status})${message ? `: ${message.slice(0, 160)}` : ''}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error('Google Drive returned an unreadable stream');
  const chunks: Buffer[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_DRIVE_BYTES) {
      await reader.cancel().catch(() => {});
      throw new Error(`Drive file exceeds the ${Math.round(MAX_DRIVE_BYTES / 1024 / 1024)}MB import limit`);
    }
    chunks.push(Buffer.from(value));
  }
  const buffer = Buffer.concat(chunks);
  if (buffer.length < 64) throw new Error('Google Drive returned an empty file');

  const contentType = res.headers.get('content-type') || '';
  const mimeType = native ? native.mimeType : contentType.split(';')[0] || 'application/octet-stream';
  return { buffer, fileName, mimeType };
}
