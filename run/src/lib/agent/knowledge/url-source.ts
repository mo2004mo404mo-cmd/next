/**
 * knowledge/url-source.ts — ingest cloud-hosted sources into the RAG library.
 *
 * Supported URL shapes:
 *   - YouTube (watch / youtu.be / shorts / embed): the VIDEO is downloaded
 *     with yt-dlp (node as its JS runtime) — ≤480p for videos up to 20 min,
 *     ≤240p beyond (bandwidth/memory) — so the ingest pipeline captures BOTH
 *     the spoken audio (ASR) and the on-screen slides (frame VLM OCR).
 *     Falls back to audio-only when no video stream fits. Requires the
 *     `yt-dlp` binary on PATH (plus ffmpeg, already required for uploads).
 *     Hard cap: 60 minutes (ASR pipeline limit).
 *   - Google Drive share links (file/d/<id>, open?id=): resolved to a direct
 *     download (drive.usercontent.google.com, confirm=t) and parsed as a
 *     regular file. Must be shared "Anyone with the link".
 *   - Google Docs / Sheets (docs.google.com): exported as txt / csv.
 *   - Dropbox share links: dl=1 direct download.
 *   - Any direct file URL (arxiv PDF, hosted mp3 …): downloaded and parsed
 *     by kind (content-type + extension + magic bytes).
 *   - Anything else: falls back to the webpage text extractor.
 *
 * Everything returns a uniform `ExternalSourcePlan` so the API route can run
 * the standard ingest pipeline (parseMediaFile / ingestSource) in the
 * background after responding "pending" to the client.
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import type { MediaFileKind } from './ingest-media';
import { createLogger } from '../../logger';

const execFileAsync = promisify(execFile);
const log = createLogger('UrlSource');

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/** Hard download cap for URL-sourced files (matches the upload route's audio/video cap). */
const MAX_DOWNLOAD_BYTES = 200 * 1024 * 1024;
/** ASR pipeline caps at 144 × 25 s = 3600 s — reject longer videos up front. */
const MAX_VIDEO_SEC = 3600;

export interface ExternalSourcePlan {
  /** 'media' → binary file for parseMediaFile; 'text' → extracted text directly. */
  kind: 'media' | 'text';
  title: string;
  /** media */
  fileName?: string;
  buffer?: Buffer;
  mimeType?: string;
  /** text */
  text?: string;
  /** What the source row should show (audio / document / url …). */
  displayKind: MediaFileKind | 'url' | 'text';
  meta?: Record<string, unknown>;
}

// ─── URL classifiers ───────────────────────────────────────────────────────

function parseYouTubeId(u: URL): string | null {
  const host = u.hostname.replace(/^www\.|^m\./, '');
  if (host !== 'youtube.com' && host !== 'youtube-nocookie.com' && host !== 'youtu.be') return null;
  if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null;
  if (u.pathname === '/watch') return u.searchParams.get('v');
  const m = u.pathname.match(/^\/(shorts|embed|live|v)\/([^/?]+)/);
  return m ? m[2] : null;
}

function parseGoogleDriveId(u: URL): string | null {
  const host = u.hostname.replace(/^www\./, '');
  if (host !== 'drive.google.com' && host !== 'docs.google.com') return null;
  const m = u.pathname.match(/^\/(?:file\/d|open|uc)\/?([^/?]+)/);
  if (m) return m[1];
  if (u.pathname.startsWith('/file/d/')) return null;
  return u.searchParams.get('id');
}

function isGoogleDocs(u: URL): 'document' | 'spreadsheets' | null {
  const host = u.hostname.replace(/^www\./, '');
  if (host !== 'docs.google.com') return null;
  if (u.pathname.startsWith('/document/d/')) return 'document';
  if (u.pathname.startsWith('/spreadsheets/d/')) return 'spreadsheets';
  return null;
}

function isDropbox(u: URL): boolean {
  return u.hostname.replace(/^www\./, '') === 'dropbox.com';
}

function isYouTubePlaylistOnly(u: URL): boolean {
  return u.hostname.includes('youtube.com') && u.pathname === '/playlist' && !u.searchParams.get('v');
}

// ─── HTTP helpers ──────────────────────────────────────────────────────────

async function fetchWithCap(url: string, opts: RequestInit & { capBytes?: number } = {}): Promise<Response> {
  const res = await fetch(url, {
    redirect: 'follow',
    ...opts,
    headers: { 'user-agent': BROWSER_UA, ...(opts.headers || {}) },
  });
  if (!res.ok && res.status >= 400 && res.status !== 416) {
    throw new Error(`Download failed (HTTP ${res.status} from ${new URL(url).hostname})`);
  }
  return res;
}

async function readBodyCapped(res: Response, capBytes = MAX_DOWNLOAD_BYTES): Promise<Buffer> {
  const reader = res.body?.getReader();
  if (!reader) return Buffer.from(await res.arrayBuffer());
  const chunks: Buffer[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > capBytes) {
      await reader.cancel().catch(() => {});
      throw new Error(`Remote file exceeds the ${Math.round(capBytes / 1024 / 1024)}MB limit`);
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

function fileNameFromDisposition(res: Response): string | null {
  const cd = res.headers.get('content-disposition');
  if (!cd) return null;
  const star = cd.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
  if (star) {
    try {
      return decodeURIComponent(star[1].trim().replace(/^"|"$/g, ''));
    } catch {
      /* fall through */
    }
  }
  const plain = cd.match(/filename="?([^";]+)"?/i);
  return plain ? plain[1] : null;
}

/** Sniff a usable extension for extension-less downloads (magic bytes). */
function sniffExtension(buf: Buffer, res: Response): string | null {
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  if (buf.length >= 5 && buf.slice(0, 5).toString('latin1') === '%PDF-') return 'pdf';
  if (buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) {
    // zip container: docx/xlsx/pptx/odt — refine with content-type
    if (ct.includes('wordprocessing')) return 'docx';
    if (ct.includes('spreadsheet')) return 'xlsx';
    if (ct.includes('presentation')) return 'pptx';
    return 'docx';
  }
  if (buf.length >= 3 && (buf.slice(0, 3).toString('latin1') === 'ID3' || (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0))) return 'mp3';
  if (buf.length >= 12 && buf.slice(4, 8).toString('latin1') === 'ftyp') return 'mp4';
  if (ct.startsWith('audio/')) return ct.includes('wav') ? 'wav' : 'mp3';
  if (ct.startsWith('video/')) return 'mp4';
  if (ct === 'image/png') return 'png';
  if (ct === 'image/jpeg') return 'jpg';
  return null;
}

function sanitizeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim().slice(0, 120) || 'download';
}

// ─── YouTube via yt-dlp ────────────────────────────────────────────────────

interface YtMeta {
  title: string;
  durationSec: number | null;
  channel: string | null;
}

async function ytDlp(args: string[], timeoutMs: number): Promise<{ stdout: string; stderr: string }> {
  // Optional escape hatches for datacenter IPs that YouTube bot-checks:
  //   YOUTUBE_COOKIES=/path/to/cookies.txt  — a logged-in cookie jar
  //   YOUTUBE_PROXY=http://host:port         — route yt-dlp through a proxy
  const extra: string[] = [];
  if (process.env.YOUTUBE_COOKIES) extra.push('--cookies', process.env.YOUTUBE_COOKIES);
  if (process.env.YOUTUBE_PROXY) extra.push('--proxy', process.env.YOUTUBE_PROXY);
  return execFileAsync('yt-dlp', [...extra, ...args], { timeout: timeoutMs, maxBuffer: 1024 * 1024 * 8 });
}

/** Map raw yt-dlp failures to actionable messages. */
function describeYouTubeError(e: Error): string {
  const msg = (e.message || '').toString();
  if (msg.includes('ENOENT')) {
    return 'yt-dlp is not installed on the server — YouTube ingestion needs the yt-dlp binary on PATH (ffmpeg is already used for uploads).';
  }
  if (msg.includes('Sign in to confirm') || msg.includes('not a bot')) {
    return 'YouTube is asking for bot verification on this video right now — the check is temporary and lifts after a cooldown. Wait a few minutes and press the Retry button on this row (no need to re-paste the link), or try a different video.';
  }
  if (msg.includes('Private video')) {
    return 'This YouTube video is private.';
  }
  if (msg.includes('Video unavailable') || msg.includes('removed by the uploader')) {
    return 'This YouTube video is unavailable (deleted or region-locked).';
  }
  if (msg.includes('age') && msg.includes('confirm')) {
    return 'Age-restricted videos cannot be downloaded without an account.';
  }
  if (msg.includes('members-only') || msg.includes('Join this channel')) {
    return 'Members-only videos cannot be downloaded.';
  }
  if (msg.includes('Playback on other websites has been disabled')) {
    return 'The uploader has disabled downloads for this video.';
  }
  return `Could not read video info — is the video public? (${msg.slice(0, 160)})`;
}

async function downloadYouTube(videoId: string, pageUrl: string): Promise<ExternalSourcePlan> {
  const metaLine = await ytDlp(
    [
      '--js-runtimes', 'node',
      '--no-playlist', '--skip-download',
      '--print', '%(title)s\u001f%(duration)s\u001f%(channel)s',
      pageUrl,
    ],
    60_000,
  ).catch((e: Error) => {
    throw new Error(describeYouTubeError(e));
  });

  const [rawTitle, rawDur, rawChannel] = metaLine.stdout.trim().split('\u001f');
  const title = (rawTitle || `YouTube ${videoId}`).slice(0, 200);
  const durationSec = rawDur && rawDur !== 'NA' && !Number.isNaN(Number(rawDur)) ? Math.round(Number(rawDur)) : null;
  const channel = rawChannel && rawChannel !== 'NA' ? rawChannel.slice(0, 120) : null;

  if (durationSec != null && durationSec > MAX_VIDEO_SEC) {
    throw new Error(
      `Video is ${Math.floor(durationSec / 60)} min — transcription currently caps at 60 minutes.`,
    );
  }
  if (durationSec != null && durationSec < 5) {
    throw new Error('Video is shorter than 5 seconds — nothing to transcribe.');
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'medq-ytdl-'));
  try {
    // 1) VIDEO download — the ingest pipeline then transcribes the audio AND
    //    VLM-OCRs evenly-sampled frames (slide text, diagrams, on-screen
    //    labels). ≤480p for ≤20 min, ≤240p beyond (keeps ≤60 min within
    //    ~150 MB). Any failure falls back to audio-only (step 2).
    const maxHeight = durationSec != null && durationSec > 1200 ? 240 : 480;
    const videoArgs = [
      '--js-runtimes', 'node',
      '--no-playlist',
      '-f', `best[height<=${maxHeight}][ext=mp4]/best[height<=${maxHeight}]/bv*[height<=${maxHeight}]+ba[ext=m4a]/bv*[height<=${maxHeight}]+ba`,
      '--merge-output-format', 'mp4',
      '--max-filesize', '150M',
      '--no-progress', '--retries', '2',
      '-o', path.join(dir, 'media.%(ext)s'),
      pageUrl,
    ];
    await ytDlp(videoArgs, 300_000).catch((e: Error) => {
      log.warn?.(`yt-dlp video download fell back to audio-only: ${e.message.slice(0, 120)}`);
    });
    const videoFile = fs.readdirSync(dir).find((f) => f.startsWith('media.'));

    // 2) AUDIO-only fallback (long video with no small stream, merge failure …)
    let audioFile: string | null = null;
    if (!videoFile) {
      await ytDlp(
        [
          '--js-runtimes', 'node',
          '--no-playlist',
          '-f', 'bestaudio[ext=m4a]/bestaudio/worstaudio',
          '--no-progress', '--retries', '2',
          '-o', path.join(dir, 'audio.%(ext)s'),
          pageUrl,
        ],
        300_000,
      ).catch((e: Error) => {
        throw new Error(describeYouTubeError(e));
      });
      audioFile = fs.readdirSync(dir).find((f) => f.startsWith('audio.')) || null;
    }

    const file = videoFile || audioFile;
    if (!file) throw new Error('yt-dlp finished but produced no media file');
    const buffer = fs.readFileSync(path.join(dir, file));
    if (buffer.length < 2048) throw new Error('Downloaded media is suspiciously small — try again or use a direct file URL');

    const ext = file.split('.').pop() || 'mp4';
    const fileName = `${sanitizeFileName(title)}.${ext}`;
    const isVideo = Boolean(videoFile);
    log.info?.(
      `yt-dlp: ${title} (${durationSec ?? '?'}s, ${(buffer.length / 1024 / 1024).toFixed(1)}MB, .${ext}${isVideo ? ', video+audio' : ', audio-only'})`,
    );
    return {
      kind: 'media',
      title,
      fileName,
      buffer,
      mimeType: isVideo
        ? ext === 'webm' ? 'video/webm' : ext === 'mkv' ? 'video/x-matroska' : 'video/mp4'
        : ext === 'm4a' ? 'audio/mp4' : ext === 'webm' ? 'audio/webm' : 'audio/mpeg',
      displayKind: isVideo ? 'video' : 'audio',
      meta: {
        platform: 'youtube',
        sourceUrl: pageUrl,
        videoId,
        ...(channel ? { channel } : {}),
        ...(durationSec ? { durationSec } : {}),
        visual: isVideo ? 'audio+frames' : 'audio-only',
      },
    };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// ─── Google Drive / Docs ───────────────────────────────────────────────────

async function downloadGoogleDrive(fileId: string, pageUrl: string): Promise<ExternalSourcePlan> {
  const direct = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`;
  let res: Response;
  try {
    res = await fetchWithCap(direct, { headers: { cookie: '' } });
  } catch (e) {
    const status = e instanceof Error && e.message.includes('404') ? 404 : null;
    if (status === 404) {
      throw new Error('Google Drive file not found — check the link and that sharing is set to "Anyone with the link".');
    }
    throw e;
  }
  const ct = (res.headers.get('content-type') || '').toLowerCase();

  if (ct.includes('text/html')) {
    const body = (await res.text()).slice(0, 4000).toLowerCase();
    if (body.includes('not found') || body.includes('sorry, this file')) {
      throw new Error('Google Drive file not found — check the link.');
    }
    if (body.includes('virus scan warning') || body.includes('too large')) {
      throw new Error('Google Drive refused the direct download for this file size — download it and upload the file instead.');
    }
    if (body.includes('sign in') || body.includes('accounts.google.com')) {
      throw new Error('This Google Drive file is private — share it as "Anyone with the link" first.');
    }
    throw new Error('Google Drive returned a page instead of the file — make sure sharing is set to "Anyone with the link".');
  }

  const buffer = await readBodyCapped(res);
  if (buffer.length < 64) throw new Error('Google Drive returned an empty file');

  let fileName = fileNameFromDisposition(res) || '';
  if (!fileName || !fileName.includes('.')) {
    const sniff = sniffExtension(buffer, res);
    fileName = fileName ? sanitizeFileName(fileName) : `google-drive-${fileId.slice(0, 8)}`;
    if (sniff && !fileName.includes('.')) fileName += `.${sniff}`;
  }
  return {
    kind: 'media',
    title: fileName,
    fileName,
    buffer,
    mimeType: res.headers.get('content-type') || 'application/octet-stream',
    displayKind: 'url',
    meta: { platform: 'google-drive', sourceUrl: pageUrl },
  };
}

async function exportGoogleDoc(kind: 'document' | 'spreadsheets', pageUrl: URL): Promise<ExternalSourcePlan> {
  const id = pageUrl.pathname.match(/^\/(?:document|spreadsheets)\/d\/([^/?]+)/)?.[1];
  if (!id) throw new Error('Could not parse the Google Docs id from the link');
  const format = kind === 'document' ? 'txt' : 'csv';
  const url = `https://docs.google.com/${kind}/d/${id}/export?format=${format}`;
  const res = await fetchWithCap(url);
  if (!res.ok) {
    throw new Error(
      `Google ${kind === 'document' ? 'Doc' : 'Sheet'} export failed (HTTP ${res.status}) — is it shared "Anyone with the link"?`,
    );
  }
  const text = await res.text();
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    throw new Error('Google returned a login page — share the doc as "Anyone with the link" first.');
  }
  if (!text.trim()) throw new Error('Google Doc exported empty content');
  return {
    kind: 'text',
    title: `Google ${kind === 'document' ? 'Doc' : 'Sheet'} ${id.slice(0, 8)}`,
    text: kind === 'document' ? text : `# Google Sheet (CSV)\n\n${text}`,
    displayKind: 'url',
    meta: { platform: 'google-docs', sourceUrl: pageUrl.toString(), mimeType: kind === 'document' ? 'text/plain' : 'text/csv' },
  };
}

// ─── Main router ───────────────────────────────────────────────────────────

export async function fetchExternalSource(rawUrl: string): Promise<ExternalSourcePlan> {
  let u: URL;
  try {
    u = new URL(rawUrl);
  } catch {
    throw new Error('That does not look like a valid URL');
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new Error('Only http(s) URLs are supported');
  }

  // YouTube
  const ytId = parseYouTubeId(u);
  if (ytId) {
    return downloadYouTube(ytId, `https://www.youtube.com/watch?v=${ytId}`);
  }
  if (isYouTubePlaylistOnly(u)) {
    throw new Error('Playlists are not supported — paste the URL of a single video');
  }

  // Google Docs / Sheets export
  const gdocs = isGoogleDocs(u);
  if (gdocs) return exportGoogleDoc(gdocs, u);

  // Google Drive file
  const gdId = parseGoogleDriveId(u);
  if (gdId) return downloadGoogleDrive(gdId, rawUrl);

  // Dropbox → force direct download
  if (isDropbox(u)) {
    u.searchParams.set('dl', '1');
    if (u.hostname === 'www.dropbox.com') u.hostname = 'dl.dropboxusercontent.com';
  }

  // Everything else: fetch and decide (file vs webpage).
  // The probe may itself fail (403 anti-bot, 429 …) — that must NOT kill the
  // request, because the page-reader fallback (parseUrl) can still succeed
  // via the gateway reader from a different egress.
  let res: Response | null = null;
  try {
    res = await fetchWithCap(u.toString());
  } catch {
    res = null;
  }
  const ct = res ? (res.headers.get('content-type') || '').toLowerCase() : '';

  if (res && !ct.includes('text/html')) {
    // Direct binary file (arxiv PDF, hosted mp3, raw github …)
    const buffer = await readBodyCapped(res);
    if (buffer.length < 64) throw new Error('The URL returned an empty file');
    let fileName =
      fileNameFromDisposition(res) ||
      decodeURIComponent(u.pathname.split('/').filter(Boolean).pop() || '') ||
      'download';
    fileName = sanitizeFileName(fileName);
    const sniff = sniffExtension(buffer, res);
    if (!fileName.includes('.') && sniff) fileName += `.${sniff}`;
    return {
      kind: 'media',
      title: fileName,
      fileName,
      buffer,
      mimeType: ct || 'application/octet-stream',
      displayKind: 'url',
      meta: { platform: 'direct-url', sourceUrl: rawUrl },
    };
  }

  // Webpage (or the probe was blocked) → let the pipeline's reader extract
  // text (ZAI gateway page reader first, then plain fetch).
  // NOTE: the probe body must be released WITHOUT awaiting — Next's patched
  // fetch can deadlock .cancel() in background tasks (dev instrumentation),
  // which froze every webpage import at this exact await.
  try { void res?.body?.cancel?.(); } catch { /* already released */ }
  const { parseUrl } = await import('./pipeline');
  const parsed = await parseUrl(rawUrl);
  return {
    kind: 'text',
    title: parsed.title || u.hostname,
    text: parsed.text,
    displayKind: 'url',
    meta: { platform: 'web', sourceUrl: rawUrl, mimeType: parsed.mimeType },
  };
}
