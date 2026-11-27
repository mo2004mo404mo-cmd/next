import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { createMiroTalkJoinUrl } from '../src/lib/mirotalk-server';

async function withApiServer(
  respond: (request: IncomingMessage, body: string, response: ServerResponse) => void,
  run: () => Promise<void>,
) {
  const server = createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.on('end', () => respond(request, Buffer.concat(chunks).toString('utf8'), response));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address() as AddressInfo;
  vi.stubEnv('MIROTALK_API_URL', `http://127.0.0.1:${address.port}`);
  try {
    await run();
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

describe('createMiroTalkJoinUrl', () => {
  beforeEach(() => {
    vi.stubEnv('MIROTALK_URL', 'https://meet.example');
    vi.stubEnv('MIROTALK_API_URL', '');
    vi.stubEnv('MIROTALK_API_KEY_SECRET', 'test-secret');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('creates a protected join link using the configured public host', async () => {
    await withApiServer((request, body, response) => {
      const payload = JSON.parse(body) as { room: string; roomPassword: string };
      expect(request.url).toBe('/api/v1/join');
      expect(request.headers.authorization).toBe('test-secret');
      expect(request.headers.host).toBe('meet.example');
      expect(payload.room).toBe('study-room');
      expect(payload.roomPassword).toHaveLength(36);
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ join: `https://${request.headers.host}/join?room=study-room` }));
    }, async () => {
      const result = await createMiroTalkJoinUrl({
        room: 'study room',
        name: 'Student',
        audio: true,
        video: false,
      });

      expect(result).toEqual({
        ok: true,
        room: 'study-room',
        url: 'https://meet.example/join?room=study-room',
      });
    });
  });

  it('rejects join links outside the configured MiroTalk join route', async () => {
    await withApiServer((_request, _body, response) => {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ join: 'https://meet.example/other' }));
    }, async () => {
      const result = await createMiroTalkJoinUrl({
        room: 'room',
        name: 'Student',
        audio: true,
        video: false,
      });

      expect(result).toEqual({
        ok: false,
        status: 502,
        error: 'MiroTalk returned an unexpected meeting URL.',
      });
    });
  });

  it('reports missing server configuration without calling MiroTalk', async () => {
    vi.stubEnv('MIROTALK_URL', '');
    vi.stubEnv('MIROTALK_API_KEY_SECRET', '');

    const result = await createMiroTalkJoinUrl({
      room: 'room',
      name: 'Student',
      audio: true,
      video: false,
    });

    expect(result).toMatchObject({ ok: false, status: 503 });
  });

  it('uses a loopback API URL while returning the configured public meeting URL', async () => {
    await withApiServer((_request, _body, response) => {
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ join: 'https://meet.example/join?room=room' }));
    }, async () => {
      const result = await createMiroTalkJoinUrl({
        room: 'room',
        name: 'Student',
        audio: true,
        video: false,
      });

      expect(result).toMatchObject({ ok: true, url: 'https://meet.example/join?room=room' });
    });
  });

  it('rejects a non-HTTPS API endpoint unless it is loopback', async () => {
    vi.stubEnv('MIROTALK_API_URL', 'http://meet.example');

    const result = await createMiroTalkJoinUrl({
      room: 'room',
      name: 'Student',
      audio: true,
      video: false,
    });

    expect(result).toMatchObject({ ok: false, status: 500 });
  });
});
