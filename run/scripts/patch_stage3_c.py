#!/usr/bin/env python3
"""Patch set C — upload route (xlsx retention + scene persistence),
process-url (scene persistence), question-deep-agent (search_video_scenes
tool, save_question videoScene, analyze_library_video fast path),
chat-registry + tools/index registration."""
import sys

PROJECT = "/tmp/my-project"

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def write(p, c):
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)

def patch(path, old, new, label):
    full = PROJECT + path
    content = read(full)
    if new in content and old not in content:
        print(f"  [skip] {label}")
        return True
    if old not in content:
        print(f"  [FAIL] {label} — anchor not found")
        return False
    write(full, content.replace(old, new, 1))
    print(f"  [ ok ] {label}")
    return True

ok = True

# ─────────────────────────────────────────────────────────────────────────
# 1. upload route — xlsx retention (documents branch) + scene persistence (video)
# ─────────────────────────────────────────────────────────────────────────
UP = "/src/app/api/knowledge/upload/route.ts"

ok &= patch(
    UP,
    """      await ingestSource({
        userId,
        sourceId: source.id,
        type: 'file',
        name: title || fileName,
        fileKind: parsed.fileKind,
        meta: { origin, ...(parsed.meta || {}) },
        parsed: { title: parsedTitle, mimeType: parsedMime, text: parsedText },
        payload: { fileName, mimeType },
        onProgress: report,
      });
    } else {""",
    """      // Stage 3: persist the temporal scene index for videos (mediaTimeSec
      // navigation + search_video_scenes). Best-effort — never fails the
      // upload; the flattened transcript document is already indexed.
      if (parsed.fileKind === 'video' && parsed.scenes?.length) {
        try {
          const { persistVideoScenes } = await import('@/lib/agent/knowledge/video-scenes');
          const persisted = await persistVideoScenes(source.id, parsed.scenes);
          if (persisted) log.info?.(`scene index: ${persisted} scenes for ${source.id}`);
        } catch { /* best-effort */ }
      }

      await ingestSource({
        userId,
        sourceId: source.id,
        type: 'file',
        name: title || fileName,
        fileKind: parsed.fileKind,
        meta: { origin, ...(parsed.meta || {}) },
        parsed: { title: parsedTitle, mimeType: parsedMime, text: parsedText },
        payload: { fileName, mimeType },
        onProgress: report,
      });
    } else {""",
    "upload: persist video scenes",
)

ok &= patch(
    UP,
    """      await ingestSource({
        userId,
        sourceId: source.id,
        type: 'file',
        name: title || fileName,
        fileKind: 'document',
        meta: { origin, originalName: fileName.slice(0, 200) },
        payload: { fileName, buffer, mimeType },
        onProgress: report,
      });""",
    """      // Stage 10: retain .xlsx originals so query_spreadsheet can read
      // them structurally (same file-store the media kinds use; bounded by
      // the 15 MB upload cap). Other documents stay text-only.
      let docMeta: Record<string, unknown> = { origin, originalName: fileName.slice(0, 200) };
      if ((fileName.split('.').pop() || '').toLowerCase() === 'xlsx') {
        const retained = retainOriginalFile(source.id, buffer, mimeType || undefined);
        if (retained.retained) {
          docMeta = { ...docMeta, originalMime: retained.mime, originalBytes: retained.bytes };
        }
      }

      await ingestSource({
        userId,
        sourceId: source.id,
        type: 'file',
        name: title || fileName,
        fileKind: 'document',
        meta: docMeta,
        payload: { fileName, buffer, mimeType },
        onProgress: report,
      });""",
    "upload: retain xlsx originals",
)

# ─────────────────────────────────────────────────────────────────────────
# 2. process-url.ts — persist scenes after video URL ingestion
# ─────────────────────────────────────────────────────────────────────────
ok &= patch(
    "/src/lib/agent/knowledge/process-url.ts",
    """    await ingestSource({
      userId,
      sourceId,
      type: 'file',
      name: plan.title,
      fileKind: parsed.fileKind,
      meta: { ...(plan.meta || {}), ...(parsed.meta || {}), ...audioMeta },
      parsed: { title: plan.title, mimeType: parsed.mimeType, text },
      payload: {},
      onProgress: (stage, percent, note) => void updateSourceProgress(sourceId, stage, percent, note),
    });""",
    """    // Stage 3: persist the video scene index (mediaTimeSec navigation).
    if (parsed.fileKind === 'video' && parsed.scenes?.length) {
      try {
        const { persistVideoScenes } = await import('@/lib/agent/knowledge/video-scenes');
        await persistVideoScenes(sourceId, parsed.scenes);
      } catch { /* best-effort — ingestion already succeeded */ }
    }

    await ingestSource({
      userId,
      sourceId,
      type: 'file',
      name: plan.title,
      fileKind: parsed.fileKind,
      meta: { ...(plan.meta || {}), ...(parsed.meta || {}), ...audioMeta },
      parsed: { title: plan.title, mimeType: parsed.mimeType, text },
      payload: {},
      onProgress: (stage, percent, note) => void updateSourceProgress(sourceId, stage, percent, note),
    });""",
    "process-url: persist video scenes",
)

# ─────────────────────────────────────────────────────────────────────────
# 3. question-deep-agent.ts
# ─────────────────────────────────────────────────────────────────────────
QD = "/src/lib/agent/question-deep-agent.ts"

# 3a. imports
ok &= patch(
    QD,
    "import { retainedOriginalPath, readRetainedOriginal } from './knowledge/file-store';",
    "import { retainedOriginalPath, readRetainedOriginal } from './knowledge/file-store';\n"
    "import { searchVideoScenes, listVideoScenes, formatVideoSceneContext } from './knowledge/video-scenes';",
    "deep-agent: video-scenes imports",
)

# 3b. new tool factory after createKnowledgeSearchTool's closing (anchor on
#     the start of createAnalyzeLibraryImageTool)
ok &= patch(
    QD,
    "function createAnalyzeLibraryImageTool(userId?: string, libraryMedia: LibraryMediaEntry[] = []) {",
    """function createVideoSceneSearchTool(userId?: string, sourceIds?: string[]) {
  return new DynamicStructuredTool({
    name: 'search_video_scenes',
    description: [
      'Semantic search over the user\\'s UPLOADED videos (MEDIA LIBRARY) at SCENE granularity.',
      'Each hit is a timestamped span (mediaTimeSec) with what was SHOWN (frame description) and what was SAID (transcript) in that span.',
      'Use for "what happens at 12:34", "find the segment where they demonstrate intubation", "what was on screen during the explanation of X".',
      'When a question targets a specific video moment, pass the scene\\'s sourceId + startSec/endSec into save_question.videoScene so the player can deep-link to it.',
      'NOT for finding videos online (use web search).',
    ].join(' '),
    schema: z.object({
      query: z.string().min(2).max(2_000).describe('What to look for in the video library'),
      top_k: z.number().int().min(1).max(20).optional().describe('Max scenes to return (default 6)'),
    }),
    func: async ({ query, top_k }) => {
      if (!userId) {
        return JSON.stringify({ ok: true, note: 'No user context — no video library available.' });
      }
      try {
        const hits = await searchVideoScenes(userId, query, {
          ...(sourceIds?.length ? { sourceIds } : {}),
          topK: top_k ?? 6,
        });
        if (hits.length === 0) {
          return JSON.stringify({
            ok: true,
            note: 'No video scenes matched. Check the MEDIA LIBRARY list — only uploaded/imported videos have scene indexes.',
          });
        }
        return JSON.stringify({
          ok: true,
          context: formatVideoSceneContext(hits),
          scenes: hits.map((hit, i) => ({
            ref: `V${i + 1}`,
            sourceId: hit.sourceId,
            sourceName: hit.sourceName,
            sceneIdx: hit.sceneIdx,
            mediaTimeSec: Math.round(hit.startSec),
            startSec: hit.startSec,
            endSec: hit.endSec,
            relevance: Math.round(Math.max(hit.score, 0) * 100),
          })),
        });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message.slice(0, 200) : String(error) });
      }
    },
  });
}

function createAnalyzeLibraryImageTool(userId?: string, libraryMedia: LibraryMediaEntry[] = []) {""",
    "deep-agent: createVideoSceneSearchTool factory",
)

# 3c. register in the generation agent's tool list
ok &= patch(
    QD,
    "  const tools = [\n    saveTool,\n    createKnowledgeSearchTool(params.userId, params.knowledgeSourceIds),",
    "  const tools = [\n    saveTool,\n    createKnowledgeSearchTool(params.userId, params.knowledgeSourceIds),\n    createVideoSceneSearchTool(params.userId, params.knowledgeSourceIds),",
    "deep-agent: register search_video_scenes",
)

# 3d. save_question schema — videoScene field (after citations)
ok &= patch(
    QD,
    """      citations: z.array(z.object({
        sourceId: z.string().describe('Knowledge source id (from the grounding material or search results)'),
        chunkId: z.string().describe('The chunk id (K# id) of the exact passage used'),
      })).default([]).describe('Passages that grounded this question — enables highlight-in-source verification'),
    }),""",
    """      citations: z.array(z.object({
        sourceId: z.string().describe('Knowledge source id (from the grounding material or search results)'),
        chunkId: z.string().describe('The chunk id (K# id) of the exact passage used'),
      })).default([]).describe('Passages that grounded this question — enables highlight-in-source verification'),
      videoScene: z.object({
        sourceId: z.string().min(5).describe('sourceId of the cited video (must be in the MEDIA LIBRARY)'),
        startSec: z.number().min(0).describe('Scene span start in seconds (from search_video_scenes / analyze_library_video)'),
        endSec: z.number().min(0).describe('Scene span end in seconds'),
      }).optional().describe('Timestamped video citation — the player deep-links to this exact span (mediaTimeSec)'),
    }),""",
    "deep-agent: save_question videoScene schema",
)

# 3e. save_question func — validate + carry videoScene (before record creation)
ok &= patch(
    QD,
    """      const sourcesJson = citations.length
        ? citations.map((c) => ({ type: 'library', title: String(c.title) }))
        : [];""",
    """      // ── Timestamped video citation (Stage 3 mediaTimeSec) ──
      let videoSourceId = '';
      let videoSceneStart = 0;
      let videoSceneEnd = 0;
      if (q.videoScene?.sourceId) {
        const media = attachable.get(q.videoScene.sourceId);
        if (media && media.kind === 'video') {
          let sStart = Math.max(0, Number(q.videoScene.startSec) || 0);
          let sEnd = Math.max(0, Number(q.videoScene.endSec) || 0);
          if (sEnd < sStart) [sStart, sEnd] = [sEnd, sStart];
          videoSourceId = q.videoScene.sourceId;
          videoSceneStart = sStart;
          videoSceneEnd = sEnd;
          // A scene citation implies the video should display with the question.
          if (!videoUrl && !attachId) videoUrl = mediaUrlFor(q.videoScene.sourceId);
        }
      }

      const sourcesJson = citations.length
        ? citations.map((c) => ({ type: 'library', title: String(c.title) }))
        : [];""",
    "deep-agent: save_question videoScene handling",
)

# 3f. record creation — carry the new fields
ok &= patch(
    QD,
    """          imageUrl,
          audioUrl,
          videoUrl,
          illustrationDescription: String(q.illustrationDescription || '').slice(0, 1000),""",
    """          imageUrl,
          audioUrl,
          videoUrl,
          videoSourceId,
          videoSceneStart,
          videoSceneEnd,
          illustrationDescription: String(q.illustrationDescription || '').slice(0, 1000),""",
    "deep-agent: record carries video citation fields",
)

# 3g. analyze_library_video — stored-scene fast path before the live VLM pass
ok &= patch(
    QD,
    """        const transcriptExcerpt = trimToSentence(doc?.content ?? '', 3500);
        const frames = await analyzeVideoFrames(""",
    """        const transcriptExcerpt = trimToSentence(doc?.content ?? '', 3500);

        // Stage 3 fast path: the stored scene timeline (ingestion-time VLM +
        // ASR, per scene) answers most "what happens in this video" questions
        // WITHOUT re-running ffmpeg + frame VLM. Only fall back to a live
        // analyzeVideoFrames pass when no scene index was persisted.
        const storedScenes = await listVideoScenes(userId, sourceId);
        if (storedScenes.length > 0) {
          return JSON.stringify({
            sourceId,
            name: media.name,
            durationSec: Math.round(storedScenes[storedScenes.length - 1].endSec),
            sceneTimeline: storedScenes.map((s) =>
              `[${fmtVideoTimestamp(s.startSec)}–${fmtVideoTimestamp(s.endSec)}] ` +
              [s.description, s.transcript].filter(Boolean).join(' — ') || '(no content extracted)',
            ),
            note: 'Stored scene timeline from ingestion. For save_question.videoScene use sourceId ' + sourceId + ' and the scene startSec/endSec that matches your focus.',
            ...(transcriptExcerpt ? { transcriptExcerpt } : {}),
          });
        }

        const frames = await analyzeVideoFrames(""",
    "deep-agent: analyze_library_video scene fast path",
)

# ─────────────────────────────────────────────────────────────────────────
# 4. chat-registry.ts — register the two new tools
# ─────────────────────────────────────────────────────────────────────────
CR = "/src/lib/agent/tools/chat-registry.ts"

ok &= patch(
    CR,
    "import { createSearchKnowledgeTool } from './knowledge';",
    "import { createSearchKnowledgeTool } from './knowledge';\n"
    "import { createVideoSceneSearchTool } from './video-search';\n"
    "import { createQuerySpreadsheetTool } from './spreadsheet';",
    "chat-registry: new tool imports",
)

ok &= patch(
    CR,
    """    // ── Knowledge library retrieval ([K#] citations) ──
    ...(userId ? [createSearchKnowledgeTool(ctx)] : []),""",
    """    // ── Knowledge library retrieval ([K#] citations) ──
    ...(userId ? [createSearchKnowledgeTool(ctx)] : []),
    // ── Video scene search ([V#] timestamped scenes, Stage 3) + structured
    //    spreadsheet queries over retained .xlsx uploads (Stage 10) ──
    ...(userId ? [createVideoSceneSearchTool(ctx), createQuerySpreadsheetTool(ctx)] : []),""",
    "chat-registry: register search_video_scenes + query_spreadsheet",
)

# ─────────────────────────────────────────────────────────────────────────
# 5. tools/index.ts — re-exports
# ─────────────────────────────────────────────────────────────────────────
ok &= patch(
    "/src/lib/agent/tools/index.ts",
    "export { createFlashcardTools } from './flashcards';\nexport { createStudyInsightTools } from './study-insights';",
    "export { createFlashcardTools } from './flashcards';\nexport { createStudyInsightTools } from './study-insights';\n"
    "export { createVideoSceneSearchTool, VIDEO_SCENE_TOOL_NAMES } from './video-search';\n"
    "export { createQuerySpreadsheetTool, SPREADSHEET_TOOL_NAMES } from './spreadsheet';",
    "tools/index: re-export new tool factories",
)

print()
print("ALL OK" if ok else "SOME PATCHES FAILED")
sys.exit(0 if ok else 1)
