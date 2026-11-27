/**
 * /v1/* — the OpenAI-compatible wire endpoint of the FreeLLMAPI sidecar,
 * exposed at MedQ's origin root.
 *
 * The dashboard's Keys page displays `${origin}/v1` as the base URL for
 * curl, CLIs and coding agents (Claude Code, Codex CLI, Cline, …). This
 * route makes that URL real through MedQ's public origin, streaming SSE
 * included: /v1/chat/completions, /v1/models, /v1/messages (Anthropic
 * format), /v1/embeddings, /v1/images/generations, … all route across the
 * user's BYOK pool exactly like a local freellmapi install.
 *
 * Auth is freellmapi's own unified key (Bearer) — nothing is shared with
 * MedQ sessions.
 */

import { proxyToFreellmapi } from '@/lib/freellmapi-proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ path?: string[] }> };

async function handle(req: Request): Promise<Response> {
  // No prefix to strip: /v1/... upstream path === /v1/... sidecar path.
  return proxyToFreellmapi(req, '');
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
