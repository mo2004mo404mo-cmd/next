#!/usr/bin/env python3
"""Modify the extract route to accept file uploads (multipart/form-data)
and parse them server-side, eliminating the fragile client-side extraction.

The route now accepts TWO content types:
  1. application/json { text, fileName, images } — paste/text mode (unchanged)
  2. multipart/form-data { file } — file upload mode (NEW: server-side parsing)

In file-upload mode, the server:
  - Reads the uploaded file into a Buffer
  - Calls extractFromFileServer() to get text + images
  - Proceeds with the existing AI extraction flow (unchanged)

This removes all client-side file parsing (FileReader, pdfjs worker,
mammoth in browser) — more reliable, no OOM, no reload loss.
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


# 1. Add the server-file-extract import at the top (after the existing imports)
patch(
    "import { withErrorHandler } from '@/lib/api-handler';",
    "import { withErrorHandler } from '@/lib/api-handler';\n"
    "import { extractFromFileServer } from '@/lib/server-file-extract';",
)

# 2. Replace the body-parsing section of the POST handler to detect
#    multipart/form-data (file upload) vs JSON (text paste).
patch(
    "export const POST = withErrorHandler(async (req: Request) => {\n"
    "  const userId = await resolveUserId();\n"
    "  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 401 });\n\n"
    "  const body = await req.json().catch(() => null);\n"
    "  if (!body || typeof body.text !== 'string' || !body.text.trim()) {\n"
    "    return NextResponse.json({ error: 'No text provided' }, { status: 400 });\n"
    "  }\n\n"
    "  // Explicit, honest rejection instead of a silent slice: losing half a\n"
    "  // question bank with no warning is the worst possible failure mode.\n"
    "  if (body.text.length > MAX_INPUT_CHARS) {\n"
    "    return NextResponse.json(\n"
    "      {\n"
    "        error: `That content is too large (${Math.round(body.text.length / 1000)}k characters — the limit is ${Math.round(MAX_INPUT_CHARS / 1000)}k). Split it into two or three smaller files and import them one by one — duplicates are skipped automatically.`,\n"
    "      },\n"
    "      { status: 413 },\n"
    "    );\n"
    "  }\n"
    "  const text = body.text;",
    "export const POST = withErrorHandler(async (req: Request) => {\n"
    "  const userId = await resolveUserId();\n"
    "  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 401 });\n\n"
    "  // ── Detect upload mode: multipart/form-data (file) vs JSON (text) ──\n"
    "  // File uploads are parsed SERVER-SIDE (extractFromFileServer) — no\n"
    "  // client-side FileReader/pdfjs/mammoth. More reliable: no browser OOM,\n"
    "  // no pdfjs worker version mismatch, no reload loss.\n"
    "  const contentType = req.headers.get('content-type') || '';\n"
    "  let text: string;\n"
    "  let uploadFileName: string | undefined;\n"
    "  let uploadImages: Array<{ dataUrl: string; caption: string }> = [];\n\n"
    "  if (contentType.includes('multipart/form-data')) {\n"
    "    // ── File upload mode: parse the file server-side ──\n"
    "    const formData = await req.formData();\n"
    "    const file = formData.get('file');\n"
    "    if (!(file instanceof File)) {\n"
    "      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });\n"
    "    }\n"
    "    uploadFileName = file.name;\n"
    "    // 15 MB cap (matches the knowledge pipeline's MAX_FILE_BYTES)\n"
    "    if (file.size > 15 * 1024 * 1024) {\n"
    "      return NextResponse.json(\n"
    "        { error: `File is too large (${Math.round(file.size / 1024 / 1024)} MB — the limit is 15 MB). Split it into smaller files.` },\n"
    "        { status: 413 },\n"
    "      );\n"
    "    }\n"
    "    const arrayBuffer = await file.arrayBuffer();\n"
    "    const buffer = Buffer.from(arrayBuffer);\n"
    "    try {\n"
    "      const extracted = await extractFromFileServer(buffer, file.name);\n"
    "      text = extracted.text;\n"
    "      uploadImages = extracted.images ?? [];\n"
    "    } catch (err) {\n"
    "      return NextResponse.json(\n"
    "        { error: err instanceof Error ? err.message : 'Could not parse the uploaded file' },\n"
    "        { status: 400 },\n"
    "      );\n"
    "    }\n"
    "    if (text.length > MAX_INPUT_CHARS) {\n"
    "      return NextResponse.json(\n"
    "        {\n"
    "          error: `Extracted content is too large (${Math.round(text.length / 1000)}k characters — the limit is ${Math.round(MAX_INPUT_CHARS / 1000)}k). Split the file into smaller parts.`,\n"
    "        },\n"
    "        { status: 413 },\n"
    "      );\n"
    "    }\n"
    "  } else {\n"
    "    // ── Text paste mode (JSON body) — unchanged ──\n"
    "    const body = await req.json().catch(() => null);\n"
    "    if (!body || typeof body.text !== 'string' || !body.text.trim()) {\n"
    "      return NextResponse.json({ error: 'No text provided' }, { status: 400 });\n"
    "    }\n"
    "    if (body.text.length > MAX_INPUT_CHARS) {\n"
    "      return NextResponse.json(\n"
    "        {\n"
    "          error: `That content is too large (${Math.round(body.text.length / 1000)}k characters — the limit is ${Math.round(MAX_INPUT_CHARS / 1000)}k). Split it into two or three smaller files and import them one by one — duplicates are skipped automatically.`,\n"
    "        },\n"
    "        { status: 413 },\n"
    "      );\n"
    "    }\n"
    "    text = body.text;\n"
    "    uploadFileName = typeof body.fileName === 'string' ? body.fileName : 'pasted text';\n"
    "    if (Array.isArray(body.images)) {\n"
    "      uploadImages = body.images;\n"
    "    }\n"
    "  }",
)

# 3. Now the rest of the handler uses `body.text`, `body.fileName`, `body.images`
#    but we've renamed them to `text`, `uploadFileName`, `uploadImages`.
#    Update the references:
#    - body.text → text (already done above — `text` is the variable)
#    - body.fileName → uploadFileName (used in the job creation below)
#    - body.images → uploadImages

# Find where body.images is used and replace with uploadImages
patch(
    "  let images: ExtractedImage[] = [];\n"
    "  if (Array.isArray(body.images)) {\n"
    "    let totalBytes = 0;\n"
    "    for (const img of body.images) {\n"
    "      if (images.length >= MAX_IMAGES) break;\n"
    "      if (!img || typeof img.dataUrl !== 'string' || !/^data:/i.test(img.dataUrl)) continue;\n"
    "      if (typeof img.caption !== 'string' || !img.caption.trim()) continue;\n"
    "      // Approximate decoded size (base64 → 0.75× the original bytes).\n"
    "      const approxBytes = Math.round(img.dataUrl.length * 0.75);\n"
    "      if (totalBytes + approxBytes > MAX_IMAGES_BYTES) break;\n"
    "      totalBytes += approxBytes;\n"
    "      images.push({ dataUrl: img.dataUrl, caption: img.caption.slice(0, 80) });\n"
    "    }\n"
    "  }",
    "  let images: ExtractedImage[] = [];\n"
    "  // uploadImages comes from either the JSON body (paste mode) or the\n"
    "  // server-side file parser (upload mode). Same shape either way.\n"
    "  if (Array.isArray(uploadImages)) {\n"
    "    let totalBytes = 0;\n"
    "    for (const img of uploadImages) {\n"
    "      if (images.length >= MAX_IMAGES) break;\n"
    "      if (!img || typeof img.dataUrl !== 'string' || !/^data:/i.test(img.dataUrl)) continue;\n"
    "      if (typeof img.caption !== 'string' || !img.caption.trim()) continue;\n"
    "      const approxBytes = Math.round(img.dataUrl.length * 0.75);\n"
    "      if (totalBytes + approxBytes > MAX_IMAGES_BYTES) break;\n"
    "      totalBytes += approxBytes;\n"
    "      images.push({ dataUrl: img.dataUrl, caption: img.caption.slice(0, 80) });\n"
    "    }\n"
    "  }",
)

# 4. Find where the job is created with body.fileName and replace with uploadFileName
patch(
    "      fileName: typeof body.fileName === 'string' && body.fileName.trim() ? body.fileName.trim().slice(0, 200) : 'pasted text',",
    "      fileName: (uploadFileName && uploadFileName.trim() ? uploadFileName.trim().slice(0, 200) : 'pasted text'),",
)

# 5. maxQuestions still uses body.maxQuestions — keep that for the JSON path.
#    For file uploads, default to DEFAULT_MAX_QUESTIONS.
patch(
    "  const maxQuestions = Math.min(\n"
    "    Math.max(Number(body.maxQuestions) || DEFAULT_MAX_QUESTIONS, 1),\n"
    "    MAX_MAX_QUESTIONS,\n"
    "  );",
    "  // maxQuestions only comes from the JSON body (paste mode). File uploads\n"
    "  // use the server default.\n"
    "  const maxQuestions = Math.min(\n"
    "    Math.max(Number(typeof body !== 'undefined' && body?.maxQuestions) || DEFAULT_MAX_QUESTIONS, 1),\n"
    "    MAX_MAX_QUESTIONS,\n"
    "  );",
)

print("\nPASS: route updated for server-side file extraction" if ok else "\nFAIL")
sys.exit(0 if ok else 1)
