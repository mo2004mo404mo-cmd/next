#!/usr/bin/env python3
"""
Stage 1+3+10 patcher — applies surgical edits to /tmp/my-project files.
Idempotent: every hunk checks whether it's already applied before writing.
"""
import sys, re

PROJECT = "/tmp/my-project"

def read(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def write(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def patch(path, old, new, label):
    full = PROJECT + path
    content = read(full)
    if new in content and old not in content:
        print(f"  [skip] {label} (already applied)")
        return True
    if old not in content:
        print(f"  [FAIL] {label} — anchor not found")
        return False
    content = content.replace(old, new, 1)
    write(full, content)
    print(f"  [ ok ] {label}")
    return True

def regex_patch(path, pattern, repl, label, flags=0):
    full = PROJECT + path
    content = read(full)
    if re.search(pattern, content, flags):
        new_content, n = re.subn(pattern, repl, content, count=1, flags=flags)
        write(full, new_content)
        print(f"  [ ok ] {label} (regex, {n} sub)")
        return True
    print(f"  [FAIL] {label} — regex not found")
    return False

ok = True

# ─────────────────────────────────────────────────────────────────────────
# 1. ImportQuestionsModal — remove dead client-extractor import
# ─────────────────────────────────────────────────────────────────────────
ok &= patch(
    "/src/components/medq/ImportQuestionsModal.tsx",
    "import { extractFromFile } from '@/lib/file-extract';\n",
    "",
    "modal: drop dead extractFromFile import",
)

# ─────────────────────────────────────────────────────────────────────────
# 2. package.json — add test script (vitest devDep installed by npm later)
# ─────────────────────────────────────────────────────────────────────────
ok &= patch(
    "/package.json",
    '    "lint": "eslint .",\n',
    '    "lint": "eslint .",\n    "test": "vitest run",\n',
    "package.json: test script",
)

# ─────────────────────────────────────────────────────────────────────────
# 3. prisma/schema.prisma — VideoScene model + KnowledgeSource relation
#    + Question video citation fields
# ─────────────────────────────────────────────────────────────────────────
SCHEMA = "/prisma/schema.prisma"

# 3a. relation on KnowledgeSource
ok &= patch(
    SCHEMA,
    "  documents   KnowledgeDocument[]\n  chunks      KnowledgeChunk[]\n  createdAt   DateTime @default(now())",
    "  documents   KnowledgeDocument[]\n  chunks      KnowledgeChunk[]\n  scenes      VideoScene[]\n  createdAt   DateTime @default(now())",
    "schema: KnowledgeSource.scenes relation",
)

# 3b. VideoScene model after KnowledgeChunk (before the RagQueryLog comment)
ok &= patch(
    SCHEMA,
    '  @@index([sourceId])\n  @@index([documentId])\n}\n\n// ─────────────────────────────────────────────────────────────────────────\n// MedQ Agent — RAG query observability.',
    '''  @@index([sourceId])
  @@index([documentId])
}

// ─────────────────────────────────────────────────────────────────────────
// MedQ Agent — Video scene index (Stage 3 temporal RAG). One row per scene
// (ffmpeg scene-cut boundary, or an even time window when no cuts fire):
// VLM description of the representative frame + the [mm:ss]-stamped ASR
// segments inside the span + an embedding of both. Powers search_video_scenes
// and timestamp-deep-linked question citations (mediaTimeSec).
// ─────────────────────────────────────────────────────────────────────────

model VideoScene {
  id             String   @id @default(cuid())
  sourceId       String
  source         KnowledgeSource @relation(fields: [sourceId], references: [id], onDelete: Cascade)
  sceneIdx       Int
  startSec       Float
  endSec         Float
  detection      String   @default("scene-cut") // scene-cut | even-window
  description    String   @default("")          // VLM description of the representative frame
  transcript     String   @default("")          // ASR segments within the span
  embedding      Bytes?
  embeddingModel String   @default("")
  createdAt      DateTime @default(now())

  @@index([sourceId, sceneIdx])
  @@index([sourceId, startSec])
}

// ─────────────────────────────────────────────────────────────────────────
// MedQ Agent — RAG query observability.''',
    "schema: VideoScene model",
)

# 3c. Question: video citation fields (after videoTaskId)
ok &= patch(
    SCHEMA,
    '  videoTaskId            String   @default("")\n',
    '''  videoTaskId            String   @default("")
  // ── Stage 3: timestamped video citation (mediaTimeSec deep-link) ──
  videoSourceId          String   @default("")   // KnowledgeSource id of the cited video
  videoSceneStart        Float    @default(0)    // cited scene span start (seconds)
  videoSceneEnd          Float    @default(0)    // cited scene span end (seconds)
''',
    "schema: Question video citation fields",
)

# ─────────────────────────────────────────────────────────────────────────
# 4. ingest-media.ts — scene-aware extractVideoContent + parseMediaFile passthrough
# ─────────────────────────────────────────────────────────────────────────
IM = "/src/lib/agent/knowledge/ingest-media.ts"

# 4a. imports
ok &= patch(
    IM,
    "import { getZai, probeDuration, tmpDir, fmtTimestamp } from './asr-provider';",
    "import { getZai, probeDuration, tmpDir, fmtTimestamp } from './asr-provider';\n"
    "import {\n"
    "  detectSceneCuts,\n"
    "  buildScenes,\n"
    "  buildEvenWindows,\n"
    "  pickVlmScenes,\n"
    "  assignTranscriptToScenes,\n"
    "  assignDescriptionsToScenes,\n"
    "  fmtSec,\n"
    "  type SceneSpanWithMeta,\n"
    "} from './scene-detect';\n"
    "import type { VideoSceneInput } from './video-scenes';",
    "ingest-media: scene-detect + video-scenes imports",
)

# 4b. extractVideoContent — full replacement. Anchor: the whole function
# from its docstring-less signature down to the closing of the finally.
old_extract = '''export async function extractVideoContent(
  input: Buffer,
  opts: { fileName?: string } = {},
): Promise<{ text: string; durationSec: number; transcript: string }> {
  const dir = tmpDir();
  const inputPath = path.join(dir, 'input.bin');
  fs.writeFileSync(inputPath, input);
  try {
    const durationSec = await probeDuration(inputPath);

    // 1. Audio track → transcription (write a single wav, then segment).
    //    NON-FATAL: plenty of valid videos have NO audio stream at all
    //    (screen recordings, microscope camera exports, muted demo clips) —
    //    ffmpeg then exits non-zero ("does not contain any stream"), which
    //    used to fail the WHOLE ingestion. Skip audio and keep the frames.
    const wavPath = path.join(dir, 'audio.wav');
    try {
      await execFileAsync('ffmpeg', ['-y', '-i', inputPath, '-vn', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wavPath], { timeout: 300_000, maxBuffer: 1024 * 1024 * 64 });
    } catch {
      log.info?.(`no audio stream in "${opts.fileName || 'video'}" — continuing with visual frames only`);
    }
    let transcript = '';
    let audioSegments: Array<{ offsetSec: number; text: string }> = [];
    if (fs.existsSync(wavPath) && fs.statSync(wavPath).size > 1024) {
      const wavBuf = fs.readFileSync(wavPath);
      try {
        const result = await transcribeAudio(wavBuf, opts);
        transcript = result.text;
        audioSegments = result.segments;
      } catch (e) {
        log.warn?.(`video audio transcription failed: ${e instanceof Error ? e.message : e}`);
      }
    }

    // 2. Sampled frames → VLM descriptions. EVEN coverage across the whole
    //    duration: N keyframe-seeks spread from start to end (the old
    //    fps-filter approach only ever covered the first ~15 min of long
    //    videos). N scales 6 (≤10 min) … 12 (≥40 min).
    const frameCount = Math.max(1, 6 + Math.max(0, Math.min(6, Math.floor(durationSec / 600))));
    const frameTs = (i: number): number =>
      durationSec > 0
        ? Math.min(Math.floor(((i + 0.5) * durationSec) / frameCount), Math.max(0, Math.floor(durationSec - 0.5)))
        : 0;
    const frameDir = path.join(dir, 'frames');
    fs.mkdirSync(frameDir, { recursive: true });
    for (let i = 0; i < frameCount; i++) {
      try {
        await execFileAsync('ffmpeg', [
          '-y', '-ss', String(frameTs(i)), '-i', inputPath,
          '-frames:v', '1', '-an',
          '-vf', 'scale=960:-2', '-q:v', '4',
          path.join(frameDir, `frame_${String(i).padStart(2, '0')}.jpg`),
        ], { timeout: 90_000, maxBuffer: 1024 * 1024 * 16 });
      } catch {
        // unreadable timestamp (corrupt/odd seek) — skip that frame
      }
    }
    const frameFiles = fs.existsSync(frameDir)
      ? fs.readdirSync(frameDir).filter((f) => f.endsWith('.jpg')).sort()
      : [];
    const zai = await getZai();
    const visionNotes: string[] = [];
    if (frameFiles.length && zai) {
      for (let i = 0; i < frameFiles.length; i++) {
        const buf = fs.readFileSync(path.join(frameDir, frameFiles[i]));
        const offsetSec = frameTs(Number.parseInt(frameFiles[i].replace(/\\D/g, ''), 10) || 0);
        const desc = await describeImage(
          buf,
          'image/jpeg',
          'This is a frame from an educational video. Extract ALL visible text (slides, diagrams, labels, titles) verbatim, then describe the medical/educational content shown in 1-2 sentences. Be specific and factual.',
        );
        if (desc) visionNotes.push(`[${fmtTimestamp(offsetSec)}] (visual) ${desc}`);
      }
    }

    const parts: string[] = [];
    if (transcript.trim()) parts.push('# Spoken content\\n' + transcript);
    if (visionNotes.length) parts.push('# On-screen visuals\\n' + visionNotes.join('\\n'));
    if (parts.length === 0) {
      throw new Error(
        `No audio or visual content could be extracted from "${opts.fileName || 'video'}" ` +
        `(audio segments: ${audioSegments.length}, frames: ${frameFiles.length}).`,
      );
    }
    return { text: parts.join('\\n\\n'), durationSec, transcript };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}'''

new_extract = '''export async function extractVideoContent(
  input: Buffer,
  opts: { fileName?: string } = {},
): Promise<{ text: string; durationSec: number; transcript: string; scenes: VideoSceneInput[] }> {
  const dir = tmpDir();
  const inputPath = path.join(dir, 'input.bin');
  fs.writeFileSync(inputPath, input);
  try {
    const durationSec = await probeDuration(inputPath);

    // 0. Scene boundaries (Stage 3): ffmpeg scene-cut detection, falling
    //    back to even time windows when nothing crosses the threshold
    //    (single-set lectures, screencasts). Either way the video gets a
    //    temporal scene index with mediaTimeSec navigation; scenes beyond
    //    the VLM budget persist transcript-only instead of vanishing.
    let sceneSpans: SceneSpanWithMeta[] = [];
    try {
      const cuts = await detectSceneCuts(inputPath);
      if (cuts.length > 0) {
        sceneSpans = buildScenes(cuts.map((c) => c.atSec), durationSec, { minSceneSec: 5, maxScenes: 60 })
          .map((s) => ({ ...s, detection: 'scene-cut' as const }));
      }
    } catch {
      log.info?.(`scene detection failed for "${opts.fileName || 'video'}" — using even time windows`);
    }
    if (sceneSpans.length === 0) {
      sceneSpans = buildEvenWindows(durationSec, { minWindowSec: 60, maxScenes: 60, targetScenes: 24 })
        .map((s) => ({ ...s, detection: 'even-window' as const }));
    }

    // 1. Audio track → transcription (write a single wav, then segment).
    //    NON-FATAL: plenty of valid videos have NO audio stream at all
    //    (screen recordings, microscope camera exports, muted demo clips) —
    //    ffmpeg then exits non-zero ("does not contain any stream"), which
    //    used to fail the WHOLE ingestion. Skip audio and keep the frames.
    const wavPath = path.join(dir, 'audio.wav');
    try {
      await execFileAsync('ffmpeg', ['-y', '-i', inputPath, '-vn', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wavPath], { timeout: 300_000, maxBuffer: 1024 * 1024 * 64 });
    } catch {
      log.info?.(`no audio stream in "${opts.fileName || 'video'}" — continuing with visual frames only`);
    }
    let transcript = '';
    let audioSegments: Array<{ offsetSec: number; text: string }> = [];
    if (fs.existsSync(wavPath) && fs.statSync(wavPath).size > 1024) {
      const wavBuf = fs.readFileSync(wavPath);
      try {
        const result = await transcribeAudio(wavBuf, opts);
        transcript = result.text;
        audioSegments = result.segments;
      } catch (e) {
        log.warn?.(`video audio transcription failed: ${e instanceof Error ? e.message : e}`);
      }
    }

    // 2. Frame sampling at SCENE midpoints (≤ MAX_VLM_SCENES evenly-picked
    //    scenes when there are more) — replaces the old blind even-spread:
    //    each analyzed frame now represents a real content segment, and its
    //    description lands on the scene that contains it.
    const vlmScenes = pickVlmScenes(sceneSpans, MAX_VLM_SCENES);
    const frameTsList: number[] = vlmScenes.map((s) => s.midSec);
    const frameDir = path.join(dir, 'frames');
    fs.mkdirSync(frameDir, { recursive: true });
    for (let i = 0; i < frameTsList.length; i++) {
      try {
        await execFileAsync('ffmpeg', [
          '-y', '-ss', String(frameTsList[i]), '-i', inputPath,
          '-frames:v', '1', '-an',
          '-vf', 'scale=960:-2', '-q:v', '4',
          path.join(frameDir, `frame_${String(i).padStart(2, '0')}.jpg`),
        ], { timeout: 90_000, maxBuffer: 1024 * 1024 * 16 });
      } catch {
        // unreadable timestamp (corrupt/odd seek) — skip that frame
      }
    }
    const frameFiles = fs.existsSync(frameDir)
      ? fs.readdirSync(frameDir).filter((f) => f.endsWith('.jpg')).sort()
      : [];
    const zai = await getZai();
    const visionNotes: string[] = [];
    const analyzedFrames: Array<{ offsetSec: number; description: string }> = [];
    if (frameFiles.length && zai) {
      for (let i = 0; i < frameFiles.length; i++) {
        const offsetSec = frameTsList[i] ?? 0;
        const buf = fs.readFileSync(path.join(frameDir, frameFiles[i]));
        const desc = await describeImage(
          buf,
          'image/jpeg',
          'This is a frame from an educational video. Extract ALL visible text (slides, diagrams, labels, titles) verbatim, then describe the medical/educational content shown in 1-2 sentences. Be specific and factual.',
        );
        if (desc) {
          analyzedFrames.push({ offsetSec, description: desc });
          visionNotes.push(`[${fmtTimestamp(offsetSec)}] (visual) ${desc}`);
        }
      }
    }

    // 3. Assemble per-scene payloads: transcript segments by containment,
    //    frame descriptions by containment (nearest scene wins at edges).
    const sceneTranscripts = assignTranscriptToScenes(audioSegments, sceneSpans);
    const sceneDescriptions = assignDescriptionsToScenes(analyzedFrames, sceneSpans);
    const scenes: VideoSceneInput[] = sceneSpans.map((s, i) => ({
      sceneIdx: s.sceneIdx,
      startSec: s.startSec,
      endSec: s.endSec,
      detection: s.detection,
      description: sceneDescriptions[i] ?? '',
      transcript: sceneTranscripts[i] ?? '',
    }));

    // 4. Flattened document text (backward-compatible chunks) — the scene
    //    timeline section is capped + trimmed so it orients retrieval
    //    without doubling the transcript's token weight.
    const parts: string[] = [];
    if (transcript.trim()) parts.push('# Spoken content\\n' + transcript);
    if (visionNotes.length) parts.push('# On-screen visuals\\n' + visionNotes.join('\\n'));
    if (scenes.length) {
      const timeline = scenes.slice(0, 40).map((s) =>
        `[${fmtSec(s.startSec)}–${fmtSec(s.endSec)}] (scene ${s.sceneIdx + 1}${s.detection === 'even-window' ? ', time window' : ''}) ` +
        [s.description.slice(0, 300), s.transcript.slice(0, 300)].filter(Boolean).join(' — ') || '(no content extracted)',
      );
      parts.push('# Scene timeline\\n' + timeline.join('\\n'));
    }
    if (parts.length === 0) {
      throw new Error(
        `No audio or visual content could be extracted from "${opts.fileName || 'video'}" ` +
        `(audio segments: ${audioSegments.length}, frames: ${frameFiles.length}).`,
      );
    }
    return { text: parts.join('\\n\\n'), durationSec, transcript, scenes };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}'''

ok &= patch(IM, old_extract, new_extract, "ingest-media: scene-aware extractVideoContent")

# 4c. ParsedMediaContent gains scenes
ok &= patch(
    IM,
    "export interface ParsedMediaContent {\n  title: string;\n  mimeType: string;\n  text: string;\n  fileKind: MediaFileKind;\n  meta?: Record<string, unknown>;\n}",
    "export interface ParsedMediaContent {\n  title: string;\n  mimeType: string;\n  text: string;\n  fileKind: MediaFileKind;\n  meta?: Record<string, unknown>;\n  /** Stage 3: temporal scene index for videos (persisted by the callers). */\n  scenes?: VideoSceneInput[];\n}",
    "ingest-media: ParsedMediaContent.scenes",
)

# 4d. parseMediaFile video branch — pass scenes through
ok &= patch(
    IM,
    '''  if (kind === 'video') {
    const result = await extractVideoContent(buffer, { fileName });
    return {
      title: fileName,
      mimeType: mimeType || 'video/*',
      text: `# Transcript of "${fileName}" (video, ${Math.round(result.durationSec)}s)\\n\\n${result.text}`,
      fileKind: kind,
      meta: { durationSec: Math.round(result.durationSec), transcription: 'asr+vlm-frames' },
    };
  }''',
    '''  if (kind === 'video') {
    const result = await extractVideoContent(buffer, { fileName });
    return {
      title: fileName,
      mimeType: mimeType || 'video/*',
      text: `# Transcript of "${fileName}" (video, ${Math.round(result.durationSec)}s)\\n\\n${result.text}`,
      fileKind: kind,
      meta: {
        durationSec: Math.round(result.durationSec),
        transcription: 'asr+vlm-frames',
        ...(result.scenes.length ? { scenes: result.scenes.length } : {}),
      },
      ...(result.scenes.length ? { scenes: result.scenes } : {}),
    };
  }''',
    "ingest-media: parseMediaFile passes scenes",
)

# 4e. MAX_VLM_SCENES constant — add near the VISION_MODELS declaration
ok &= patch(
    IM,
    "const visionGlobal = globalThis as typeof globalThis & { __medqZaiVisionModel?: string };\nconst VISION_MODELS = ['glm-4.5v', 'glm-4.6v', 'glm-4v'];",
    "const visionGlobal = globalThis as typeof globalThis & { __medqZaiVisionModel?: string };\nconst VISION_MODELS = ['glm-4.5v', 'glm-4.6v', 'glm-4v'];\n\n/** Stage 3: VLM budget for video scene analysis (scenes beyond this persist transcript-only). */\nconst MAX_VLM_SCENES = 12;",
    "ingest-media: MAX_VLM_SCENES constant",
)

print()
print("ALL OK" if ok else "SOME PATCHES FAILED — inspect output above")
sys.exit(0 if ok else 1)
