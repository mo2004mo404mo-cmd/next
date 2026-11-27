#!/usr/bin/env python3
"""Route the Bank extractor's VLM calls through FreeLLM (preferred) with
Z.AI SDK fallback.

Why: the extractor historically called z-ai-web-dev-sdk's createVision()
directly. That works on a fresh sandbox but the Z.AI gateway rate-limits
hard under load — image-heavy PPTX/DOCX/PDF imports die at pass 1 with
"Extraction did not complete (rate-limited for too long)".

The FreeLLM Router has 33 vision-capable models in its pool (Gemini,
Claude, Aya-Vision, GLM-4.5V, ...) with per-key health checking and
automatic failover. Routing the VLM pass through it means:
  - when a paid vision provider (OpenAI/Anthropic/Google) is configured in
    the dashboard, extraction uses it with proper failover;
  - when no vision key is configured in the Router (fresh install), we fall
    back to the Z.AI SDK so extraction still works out-of-the-box.

The patch:
  1. Adds a freellmVisionExtract() helper that POSTs an OpenAI-format
     vision request to /v1/chat/completions using MEDQ_AGENT_API_KEY.
  2. Rewrites visionExtractImage() to try FreeLLM first, then Z.AI.
  3. Caches the working backend (per-process) so successful calls don't
     re-probe the dead one on every image.
"""
import sys

P = "/tmp/my-project/src/app/api/questions/import/extract/route.ts"
ok = True


def patch(old, new, count=1):
    global ok
    text = open(P, "r", encoding="utf-8").read()
    n = text.count(old)
    if n != count:
        print(f"  !! expected {count}, found {n}: {old[:70]}...")
        ok = False
        return
    open(P, "w", encoding="utf-8").write(text.replace(old, new))
    print(f"  + patched: {old[:70]}...")


# 1. Add a global "which backend worked last" cache + the FreeLLM helper,
#    inserted right BEFORE the existing visionExtractImage function.
PATCH_HELPERS = '''// ── FreeLLM-first VLM routing ──────────────────────────────────────────────
// The FreeLLM Router (in-process sidecar at /v1) pools 30+ vision-capable
// models with per-key health checking and automatic failover. When a paid
// vision provider is configured in the dashboard, the extractor's VLM pass
// goes through it instead of the bare Z.AI gateway — so image-heavy imports
// no longer die on Z.AI rate limits. When the Router has no usable vision
// key (fresh install / all keys rate-limited), we transparently fall back
// to the Z.AI SDK so extraction still works out-of-the-box.
type VisionBackend = 'freellm' | 'zai';
const visionGlobal2 = globalThis as typeof globalThis & {
  __qExtractVisionBackend?: VisionBackend;
};

/** Try the FreeLLM Router's vision capability. Returns the raw text response
 *  or '' if the Router has no vision-capable key configured (so the caller
 *  falls through to the Z.AI SDK). Throws on transient errors so the caller
 *  can decide whether to retry. */
async function freellmVisionExtract(dataUrl: string, instruction: string): Promise<string> {
  const baseUrl = process.env.MEDQ_AGENT_BASE_URL || 'http://127.0.0.1:3000/v1';
  const apiKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
  if (!apiKey) return ''; // Router not configured — fall through to ZAI
  const models = ['gemini-2.5-flash', 'glm-4.5v', 'claude-haiku-4.5', 'aya-vision-32b'];
  let lastErr = '';
  for (const model of models) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), FALLBACK_TIMEOUT_MS);
      const res = await fetch(`${baseUrl.replace(/\\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: 1800,
          messages: [{
            role: 'user',
            content: [
              { type: 'text', text: instruction },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          }],
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) {
        // 4xx with "no candidate model" => Router has no vision key for this
        // model; try the next one. Don't abort the whole pass on a 4xx — the
        // next model in the list might be configured.
        const body = await res.text().catch(() => '');
        if (/no candidate model|not configured|no .* key/i.test(body)) {
          lastErr = `model ${model}: no key`;
          continue;
        }
        lastErr = `model ${model}: HTTP ${res.status}`;
        continue;
      }
      const json = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
      const text = json?.choices?.[0]?.message?.content || '';
      if (text.trim()) return text.trim();
      lastErr = `model ${model}: empty`;
    } catch (err) {
      lastErr = `model ${model}: ${(err instanceof Error ? err.message : String(err)).slice(0, 80)}`;
    }
  }
  // No model worked — return empty so the caller falls through to ZAI.
  if (lastErr) console.warn(`[Question Extract] FreeLLM vision: ${lastErr}`);
  return '';
}

'''

patch(
    "/** Run the VLM on ONE image's data URL; returns the raw text response or ''\n"
    " *  on failure. Uses the same ZAI client + adaptive gate as text extraction\n"
    " *  so they share the rate-limit budget. `imageUrl` is the public URL the\n"
    " *  image was saved to — substituted into the instruction so the VLM can\n"
    " *  include it on extracted questions. */\n"
    "async function visionExtractImage(dataUrl: string, imageUrl: string): Promise<string> {",
    PATCH_HELPERS + "/** Run the VLM on ONE image's data URL; returns the raw text response or ''\n"
    " *  on failure. Tries the FreeLLM Router first (30+ vision models with\n"
    "  *  per-key health checking + failover) so a configured paid vision\n"
    " *  provider supersedes the bare Z.AI gateway. Falls back to the Z.AI SDK\n"
    " *  when the Router has no vision key configured (fresh install) so\n"
    " *  extraction still works out-of-the-box. */\n"
    "async function visionExtractImage(dataUrl: string, imageUrl: string): Promise<string> {",
)

# 2. Insert the FreeLLM-first dispatch at the top of visionExtractImage's
#    body (before the Z.AI acquire/release block).
patch(
    "async function visionExtractImage(dataUrl: string, imageUrl: string): Promise<string> {\n"
    "  const release = await zaiAcquire();\n"
    "  try {\n"
    "    const zai = await getZaiClient();\n"
    "    const cached = visionGlobal.__qExtractVisionModel;\n"
    "    const candidates = cached\n"
    "      ? [cached, ...VISION_MODELS.filter((m) => m !== cached)]\n"
    "      : VISION_MODELS;\n"
    "    for (const model of candidates) {\n"
    "      try {\n"
    "        const completion = await withTimeout(\n"
    "          (async () => {\n"
    "            return zai.chat.completions.createVision({\n"
    "              model,\n"
    "              messages: [\n"
    "                {\n"
    "                  role: 'user',\n"
    "                  content: [\n"
    "                    { type: 'text', text: instruction },\n"
    "                    { type: 'image_url', image_url: { url: dataUrl } },\n"
    "                  ],\n"
    "                },\n"
    "              ],\n"
    "              thinking: { type: 'disabled' },\n"
    "            } as Parameters<typeof zai.chat.completions.createVision>[0]);\n"
    "          })(),\n"
    "          FALLBACK_TIMEOUT_MS,\n"
    "          `VLM ${model}`,",
    "async function visionExtractImage(dataUrl: string, imageUrl: string): Promise<string> {\n"
    "  const instruction = VISION_INSTRUCTION_TEMPLATE.replace('{imageUrl}', imageUrl);\n\n"
    "  // ── FreeLLM Router first (preferred) ──\n"
    "  // The Router pools 30+ vision models with health checking + failover.\n"
    "  // Cache the working backend so successful calls don't re-probe the\n"
    "  // dead one on every image.\n"
    "  if (visionGlobal2.__qExtractVisionBackend !== 'zai') {\n"
    "    try {\n"
    "      const text = await freellmVisionExtract(dataUrl, instruction);\n"
    "      if (text.trim()) {\n"
    "        visionGlobal2.__qExtractVisionBackend = 'freellm';\n"
    "        return text;\n"
    "      }\n"
    "      // Empty => Router has no vision key configured (or all vision keys\n"
    "      // rate-limited). Fall through to Z.AI SDK below.\n"
    "      visionGlobal2.__qExtractVisionBackend = 'zai';\n"
    "    } catch (err) {\n"
    "      console.warn(`[Question Extract] FreeLLM vision threw (falling back to ZAI): ${(err instanceof Error ? err.message : String(err)).slice(0, 120)}`);\n"
    "      visionGlobal2.__qExtractVisionBackend = 'zai';\n"
    "    }\n"
    "  }\n\n"
    "  // ── Z.AI SDK fallback (always available in the sandbox) ──\n"
    "  const release = await zaiAcquire();\n"
    "  try {\n"
    "    const zai = await getZaiClient();\n"
    "    const cached = visionGlobal.__qExtractVisionModel;\n"
    "    const candidates = cached\n"
    "      ? [cached, ...VISION_MODELS.filter((m) => m !== cached)]\n"
    "      : VISION_MODELS;\n"
    "    for (const model of candidates) {\n"
    "      try {\n"
    "        const completion = await withTimeout(\n"
    "          (async () => {\n"
    "            return zai.chat.completions.createVision({\n"
    "              model,\n"
    "              messages: [\n"
    "                {\n"
    "                  role: 'user',\n"
    "                  content: [\n"
    "                    { type: 'text', text: instruction },\n"
    "                    { type: 'image_url', image_url: { url: dataUrl } },\n"
    "                  ],\n"
    "                },\n"
    "              ],\n"
    "              thinking: { type: 'disabled' },\n"
    "            } as Parameters<typeof zai.chat.completions.createVision>[0]);\n"
    "          })(),\n"
    "          FALLBACK_TIMEOUT_MS,\n"
    "          `VLM ${model}`,",
)

# 3. The existing visionExtractImage builds the instruction from the template
#    AFTER the acquire. Since we now build it earlier (above), remove the
#    duplicate instruction line in the ZAI branch.
patch(
    "    const instruction = VISION_INSTRUCTION_TEMPLATE.replace('{imageUrl}', imageUrl);\n"
    "    for (const model of candidates) {",
    "    for (const model of candidates) {",
)

print("\nPASS: VLM-routed-through-FreeLLM patch applied" if ok else "\nFAIL: some patches did not apply")
sys.exit(0 if ok else 1)
