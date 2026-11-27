/**
 * agent/attachment-registry.ts — turn-scoped binary attachment registry.
 *
 * Problem it fixes: the floating assistant uploads images/audio as base64
 * data URLs alongside a chat turn, but the LLM must never be asked to echo
 * megabytes of base64 back through a tool-call argument (token explosion +
 * provider arg limits). Instead, the chat route registers the data URL here
 * and tells the agent a short, stable reference:
 *
 *     attachment://<id>
 *
 * Tools that consume images/audio (analyze_visual_material,
 * edit_medical_illustration, transcribe_audio, …) resolve that reference
 * back to the full data URL at execution time via `resolveAttachmentInput`.
 *
 * Lifecycle: entries live for TTL_MS (default 30 min — long enough for a
 * multi-step agent turn plus follow-ups, short enough that raw image bytes
 * don't linger in memory). Pruning is lazy: on every register and read,
 * expired entries are dropped. The registry is per-server-process (single
 * Next.js server — fine for this deployment).
 */

type AttachmentEntry = {
  /** Full data URL (data:<mime>;base64,<payload>) or http(s) URL. */
  dataUrl: string;
  /** Original file name (for logs / format detection). */
  name: string;
  /** Detected MIME type from the data URL prefix, if any. */
  mimeType: string;
  expiresAt: number;
};

const registry = new Map<string, AttachmentEntry>();

export const ATTACHMENT_REF_PREFIX = 'attachment://';

/** Default entry TTL: 30 minutes. */
const DEFAULT_TTL_MS = 30 * 60 * 1000;

/** Hard cap on a single data URL we are willing to keep (≈ 12 MB binary). */
export const MAX_DATAURL_LENGTH = 16 * 1024 * 1024;

function prune(): void {
  const now = Date.now();
  for (const [key, entry] of registry) {
    if (entry.expiresAt <= now) registry.delete(key);
  }
}

/**
 * Register a data URL (or plain URL) under an attachment id and return the
 * `attachment://<id>` reference the agent can safely echo into tool calls.
 * Returns null when the payload is missing/too large (caller should fall
 * back to describing the file by name only).
 */
export function registerAttachment(
  id: string,
  dataUrl: string,
  name: string,
  ttlMs: number = DEFAULT_TTL_MS,
): string | null {
  if (!id || typeof dataUrl !== 'string' || dataUrl.length === 0) return null;
  if (dataUrl.length > MAX_DATAURL_LENGTH) return null;
  prune();
  const safeId = id.replace(/[^a-zA-Z0-9._-]/g, '');
  if (!safeId) return null;
  const mimeType = /^data:([^;,]+)/.exec(dataUrl)?.[1] ?? '';
  registry.set(safeId, { dataUrl, name, mimeType, expiresAt: Date.now() + ttlMs });
  return `${ATTACHMENT_REF_PREFIX}${safeId}`;
}

/** Does this string look like an attachment reference? */
export function isAttachmentReference(value: string): boolean {
  return typeof value === 'string' && value.startsWith(ATTACHMENT_REF_PREFIX);
}

export type ResolvedAttachment = AttachmentEntry & { id: string };

/**
 * Resolve an agent-supplied input value — which may be an `attachment://`
 * reference, a raw attachment id, a data URL, or a plain http(s) URL — to
 * the stored entry. Returns null when the reference is unknown or expired.
 */
export function resolveAttachmentReference(value: string): ResolvedAttachment | null {
  if (!value || typeof value !== 'string') return null;
  const id = value.startsWith(ATTACHMENT_REF_PREFIX)
    ? value.slice(ATTACHMENT_REF_PREFIX.length)
    : value;
  if (!id || id.includes('://')) return null; // http(s)://, data: — not ours
  prune();
  const entry = registry.get(id);
  if (!entry) return null;
  // Reading refreshes nothing — TTL is fixed from registration; a read of an
  // expired entry already got pruned above.
  return { ...entry, id };
}

/**
 * Shared tool-input normalizer: given whatever the LLM passed for an image /
 * audio / video input field, return the direct URL the tool should use.
 * Handles:
 *   - attachment://<id>  → registered data URL (throws a helpful error if
 *     the reference is unknown/expired so the agent can tell the user to
 *     re-attach the file)
 *   - attachment id without the scheme → same
 *   - data: / http(s):// → passed through untouched
 *   - bare file name like "photo.png" → treated as a stale reference and
 *     rejected with guidance (this is the old failure mode we're fixing)
 */
export function resolveAttachmentInput(value: string, kind: 'image' | 'audio' | 'video'): string {
  const v = value?.trim();
  if (!v) throw new Error(`No ${kind} provided.`);
  if (v.startsWith('data:') || /^https?:\/\//i.test(v)) return v;
  if (isAttachmentReference(v) || !v.includes(' ') ) {
    const entry = resolveAttachmentReference(v);
    if (entry) return entry.dataUrl;
  }
  throw new Error(
    `"${v.slice(0, 80)}" is not a usable ${kind} reference. ` +
    'Ask the user to re-attach the file, or use a direct https:// URL or an attachment:// reference from the current conversation.',
  );
}
