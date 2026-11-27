/**
 * BYOK (Bring Your Own Key) encryption utilities — server-only.
 *
 * Stores user-supplied AI provider API keys encrypted with AES-256-GCM.
 *
 * Master key resolution:
 *   1. `BYOK_MASTER_KEY` env var (hex string, 64 chars = 32 bytes). RECOMMENDED
 *      for production — generate with `openssl rand -hex 32`.
 *   2. `NEXTAUTH_SECRET` env var (already required by the app). We derive a
 *      32-byte key from it with SHA-256. Lets dev "just work" without forcing
 *      the operator to set yet another env var, while still being cryptographically
 *      sound (SHA-256 of a high-entropy secret is a perfectly good KDF for this).
 *
 * The plaintext key NEVER lives in the database, never appears in logs, and
 * never crosses the wire back to the client. Only the encrypted ciphertext +
 * IV + authTag are persisted.
 *
 * Threat model:
 *   - Database leak (e.g. SQL injection, backup theft): attacker gets
 *     ciphertext only. Without the master key (env var, never in the DB) the
 *     keys are unrecoverable.
 *   - Server compromise: attacker can read the master key from env and
 *     decrypt. BYOK does not defend against full server compromise — no
 *     at-rest encryption can. (HSM/KMS would, but that's out of scope.)
 *   - Replay/tamper: AES-GCM's authTag detects any tampering with ciphertext
 *     or IV; decryption throws on mismatch.
 */

import crypto from 'crypto';

const KEY_BYTES = 32; // AES-256
const IV_BYTES = 12;  // GCM standard (96 bits)
const AUTH_TAG_BYTES = 16;

let _cachedKey: Buffer | null = null;

/**
 * Resolve the master encryption key. Cached for the lifetime of the process.
 * Throws if neither BYOK_MASTER_KEY nor NEXTAUTH_SECRET is set — we refuse to
 * run with a random ephemeral key because that would silently wipe every
 * stored key on the next restart.
 */
function getMasterKey(): Buffer {
  if (_cachedKey) return _cachedKey;

  const explicit = process.env.BYOK_MASTER_KEY?.trim();
  if (explicit) {
    if (!/^[0-9a-fA-F]{64}$/.test(explicit)) {
      throw new Error(
        'BYOK_MASTER_KEY must be 32 bytes expressed as 64 hex characters. ' +
          'Generate one with: openssl rand -hex 32',
      );
    }
    _cachedKey = Buffer.from(explicit, 'hex');
    return _cachedKey;
  }

  const fallback = process.env.NEXTAUTH_SECRET?.trim();
  if (!fallback) {
    throw new Error(
      'BYOK encryption requires either BYOK_MASTER_KEY (hex, 32 bytes) or ' +
        'NEXTAUTH_SECRET to be set. Refusing to run with an ephemeral key ' +
        'because stored keys would be unrecoverable after restart.',
    );
  }
  // Derive a stable 32-byte key from NEXTAUTH_SECRET via SHA-256.
  _cachedKey = crypto.createHash('sha256').update(fallback).digest();
  return _cachedKey;
}

export interface EncryptedKey {
  /** base64-encoded ciphertext */
  ciphertext: string;
  /** base64-encoded 12-byte GCM IV */
  iv: string;
  /** base64-encoded 16-byte GCM auth tag */
  authTag: string;
}

export function encryptApiKey(plaintext: string): EncryptedKey {
  if (!plaintext) throw new Error('encryptApiKey: plaintext must be non-empty');
  const key = getMasterKey();
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return {
    ciphertext: ct.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64'),
  };
}

export function decryptApiKey(encrypted: EncryptedKey): string {
  if (!encrypted?.ciphertext || !encrypted?.iv || !encrypted?.authTag) {
    throw new Error('decryptApiKey: missing encrypted payload fields');
  }
  const key = getMasterKey();
  const iv = Buffer.from(encrypted.iv, 'base64');
  if (iv.length !== IV_BYTES) {
    throw new Error(`decryptApiKey: IV must be ${IV_BYTES} bytes, got ${iv.length}`);
  }
  const authTag = Buffer.from(encrypted.authTag, 'base64');
  if (authTag.length !== AUTH_TAG_BYTES) {
    throw new Error(
      `decryptApiKey: authTag must be ${AUTH_TAG_BYTES} bytes, got ${authTag.length}`,
    );
  }
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  // setAuthTag + final() throws if the tag doesn't verify — i.e. on tamper or
  // wrong master key. This is the cryptographic guarantee.
  const pt = Buffer.concat([
    decipher.update(Buffer.from(encrypted.ciphertext, 'base64')),
    decipher.final(),
  ]);
  return pt.toString('utf8');
}

/**
 * Mask a key for display in the UI. Reveals only the first 4 and last 4 chars,
 * enough for the user to recognize "yes that's my key" without exposing the
 * middle. Empty input returns empty string.
 *
 * Example: "sk-proj-abc123...xyz789" → "sk-pr••••••••••••••789"
 */
export function maskApiKey(key: string): string {
  if (!key) return '';
  if (key.length <= 8) return '•'.repeat(key.length);
  return `${key.slice(0, 4)}${'•'.repeat(Math.min(key.length - 8, 24))}${key.slice(-4)}`;
}
