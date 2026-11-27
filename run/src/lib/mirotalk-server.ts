import 'server-only';

import { randomBytes } from 'node:crypto';
import { request as httpRequest } from 'node:http';
import { request as httpsRequest } from 'node:https';

function requestJoinUrl(
  apiUrl: URL,
  publicHost: string,
  apiKeySecret: string,
  body: string,
): Promise<{ status: number; text: string }> {
  const request = apiUrl.protocol === 'https:' ? httpsRequest : httpRequest;
  return new Promise((resolve, reject) => {
    const req = request(new URL('/api/v1/join', apiUrl), {
      method: 'POST',
      headers: {
        authorization: apiKeySecret,
        'content-type': 'application/json',
        host: publicHost,
      },
      signal: AbortSignal.timeout(10_000),
    }, (response) => {
      const chunks: Buffer[] = [];
      response.on('data', (chunk: Buffer) => chunks.push(chunk));
      response.on('end', () => {
        resolve({
          status: response.statusCode ?? 502,
          text: Buffer.concat(chunks).toString('utf8'),
        });
      });
    });
    req.on('error', reject);
    req.end(body);
  });
}

export interface MiroTalkJoinOptions {
  room: string;
  name: string;
  audio: boolean;
  video: boolean;
}

export type MiroTalkJoinResult =
  | { ok: true; url: string; room: string }
  | { ok: false; status: 500 | 502 | 503; error: string };

export async function createMiroTalkJoinUrl(
  options: MiroTalkJoinOptions,
): Promise<MiroTalkJoinResult> {
  const configuredUrl = process.env.MIROTALK_URL?.trim();
  const configuredApiUrl = process.env.MIROTALK_API_URL?.trim() || configuredUrl;
  const apiKeySecret = process.env.MIROTALK_API_KEY_SECRET?.trim();
  if (!configuredUrl || !configuredApiUrl || !apiKeySecret) {
    return {
      ok: false,
      status: 503,
      error: 'MiroTalk is not configured. Set MIROTALK_URL and MIROTALK_API_KEY_SECRET.',
    };
  }

  let baseUrl: URL;
  try {
    baseUrl = new URL(configuredUrl);
  } catch {
    return { ok: false, status: 500, error: 'MIROTALK_URL must be a valid absolute URL.' };
  }
  if (baseUrl.protocol !== 'https:') {
    return { ok: false, status: 500, error: 'MIROTALK_URL must use HTTPS.' };
  }

  let apiBaseUrl: URL;
  try {
    apiBaseUrl = new URL(configuredApiUrl);
  } catch {
    return { ok: false, status: 500, error: 'MIROTALK_API_URL must be a valid absolute URL.' };
  }
  const isLoopback =
    apiBaseUrl.hostname === 'localhost' ||
    apiBaseUrl.hostname === '127.0.0.1' ||
    apiBaseUrl.hostname === '[::1]';
  if (apiBaseUrl.protocol !== 'https:' && !(apiBaseUrl.protocol === 'http:' && isLoopback)) {
    return { ok: false, status: 500, error: 'MIROTALK_API_URL must use HTTPS unless it targets loopback.' };
  }

  const room = options.room.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 128);
  if (!room) {
    return { ok: false, status: 500, error: 'A valid MiroTalk room ID is required.' };
  }

  let response: { status: number; text: string };
  try {
    response = await requestJoinUrl(
      apiBaseUrl,
      baseUrl.host,
      apiKeySecret,
      JSON.stringify({
        room,
        roomPassword: randomBytes(18).toString('hex'),
        name: options.name.slice(0, 80),
        audio: options.audio,
        video: options.video,
        screen: false,
        chat: false,
        hide: false,
        notify: false,
        duration: '03:00:00',
      }),
    );
  } catch (error) {
    const reason = error instanceof Error && error.name === 'TimeoutError' ? 'timed out' : 'could not be reached';
    return {
      ok: false,
      status: 502,
      error: `MiroTalk API ${reason}. Check MIROTALK_URL and the deployment network.`,
    };
  }

  let result: { join?: unknown } | null = null;
  try {
    result = JSON.parse(response.text) as { join?: unknown };
  } catch {
    // The API may return a proxy error page instead of JSON.
  }
  if (response.status < 200 || response.status >= 300 || !result || typeof result.join !== 'string') {
    return {
      ok: false,
      status: 502,
      error: `MiroTalk could not create the meeting link (HTTP ${response.status}).`,
    };
  }

  let joinUrl: URL;
  try {
    joinUrl = new URL(result.join);
  } catch {
    return { ok: false, status: 502, error: 'MiroTalk returned an invalid meeting URL.' };
  }
  if (
    joinUrl.protocol !== 'https:' ||
    joinUrl.origin !== baseUrl.origin ||
    joinUrl.pathname !== '/join'
  ) {
    return { ok: false, status: 502, error: 'MiroTalk returned an unexpected meeting URL.' };
  }

  return { ok: true, url: joinUrl.toString(), room };
}
