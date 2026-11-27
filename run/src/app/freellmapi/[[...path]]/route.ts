/**
 * /freellmapi/* — the complete FreeLLMAPI BYOK suite, mounted in MedQ.
 *
 * Everything the dashboard needs flows through here: the SPA
 * (index.html + content-hashed assets), its /api admin surface (keys,
 * models, analytics, logs, settings — Bearer-authenticated by the dashboard
 * itself) and its own /freellmapi/v1/* wire calls (e.g. the playground's
 * streaming chat). The client bundle is built with VITE_BASE=/freellmapi/
 * so all of its URLs already carry this prefix; the proxy just strips it
 * before forwarding to the embedded in-process AI Router.
 *
 * Optional catch-all [[...path]] so bare /freellmapi serves the SPA root.
 */

import { proxyToFreellmapi } from '@/lib/freellmapi-proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ path?: string[] }> };

async function handle(req: Request): Promise<Response> {
  return proxyToFreellmapi(req, '/freellmapi');
}

export async function GET(req: Request, _ctx: Ctx) {
  return handle(req);
}
export async function POST(req: Request, _ctx: Ctx) {
  return handle(req);
}
export async function PUT(req: Request, _ctx: Ctx) {
  return handle(req);
}
export async function PATCH(req: Request, _ctx: Ctx) {
  return handle(req);
}
export async function DELETE(req: Request, _ctx: Ctx) {
  return handle(req);
}
export async function HEAD(req: Request, _ctx: Ctx) {
  return handle(req);
}
export async function OPTIONS(req: Request, _ctx: Ctx) {
  return handle(req);
}
