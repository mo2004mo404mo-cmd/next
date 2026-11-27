import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { saveBinaryArtifact } from '../artifacts/binary';
import { createZAI } from '../../zai';
import { stripMarkdownForTTS } from '@/lib/audio/tts-text';
import { createLogger } from '../../logger';
import { resolveAttachmentInput } from '../attachment-registry';
import { withGatewayResilience } from '@/lib/ai/resilience';
import { cacheRemoteImages } from './image-cache';

const log = createLogger('AgentMedia');

/**
 * Media tools — image editing, real-image search, audio transcription and
 * synthesis, and video analysis/generation.
 *
 * Ported from the reference Deep Agent platform's media tool suite
 * (edit_image / search_images / text_to_speech / speech_to_text /
 * analyze_video / generate_video), rebuilt on the z-ai-web-dev-sdk and
 * MedQ's durable-artifact pipeline.
 */

function artifactResult(artifact: {
  id: string;
  name: string;
  downloadUrl: string;
  url: string;
  mimeType: string;
  kind: string;
}, filename: string) {
  return JSON.stringify({
    created: true,
    artifact: {
      id: artifact.id,
      name: artifact.name,
      filename,
      downloadUrl: artifact.downloadUrl,
      previewUrl: artifact.url,
      mimeType: artifact.mimeType,
      kind: artifact.kind,
    },
    note: 'Media saved. Reference it in your final answer.',
  });
}

function errorResult(error: unknown) {
  return JSON.stringify({ created: false, error: error instanceof Error ? error.message : String(error) });
}

// ─── Image editing ────────────────────────────────────────────────────────

export function createImageEditTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'edit_medical_illustration',
    description:
      'Edit or transform an existing image with AI: recolor a diagram, add labels, simplify for slides, or adapt an illustration. The source image can be an attachment:// reference to an image the user uploaded, or a URL from a previous generate_medical_illustration result.',
    schema: z.object({
      prompt: z.string().min(10).describe('The edit to apply, e.g. "add English labels to each nephron segment"'),
      image_url: z.string().min(5).describe('Source image: an attachment:// reference to the user\'s uploaded image, or a URL from a previous generate_medical_illustration result'),
      filename: z.string().max(80).optional().describe('Output file base name'),
    }),
    func: async ({ prompt, image_url, filename }) => {
      // Resolve attachment:// refs (and reject stale bare filenames with a
      // helpful error instead of the gateway 400ing on "photo.png").
      let sourceUrl: string;
      try {
        sourceUrl = resolveAttachmentInput(image_url, 'image');
      } catch (error) {
        return errorResult(error);
      }
      try {
        const zai = await createZAI();
        const response = (await withGatewayResilience(
          () => zai.images.generations.edit({
            prompt,
            images: [{ url: sourceUrl }],
            size: '1024x1024',
          }) as Promise<unknown>,
          { label: 'edit_medical_illustration' },
        )) as { data?: Array<{ base64?: string }> };
        const base64 = response?.data?.[0]?.base64;
        if (!base64) return JSON.stringify({ created: false, error: 'Image editing returned no data' });
        const base = (filename ?? 'edited-illustration').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 60);
        const artifact = await saveBinaryArtifact({
          userId: ctx.userId,
          name: base,
          kind: 'image',
          mimeType: 'image/png',
          buffer: Buffer.from(base64, 'base64'),
          meta: { prompt, sourceUrl },
        });
        return artifactResult(artifact, `${base}.png`);
      } catch (error) {
        log.warn?.('edit_medical_illustration failed:', error);
        return errorResult(error);
      }
    },
  });
}

// ─── Real image search ────────────────────────────────────────────────────

export function createImageSearchTool() {
  return new DynamicStructuredTool({
    name: 'search_medical_images',
    description:
      'Search the web for REAL medical images (anatomy diagrams, histology slides, radiographs, clinical photos, atlases) — use this whenever the user wants to see, find, or search for actual images/pictures/photos online. Returns ranked results with direct image URLs (plus captions, sources, dimensions) — embed the best ones inline as ![caption](imageUrl) and cite the source page with each image you show.',
    schema: z.object({
      query: z.string().min(3).max(200).describe('What to find, e.g. "cardiac muscle histology slide"'),
      count: z.number().int().min(1).max(10).optional().describe('Number of images, default 5'),
    }),
    func: async ({ query, count = 5 }) => {
      try {
        const zai = await createZAI();
        const response = (await withGatewayResilience(
          () => zai.images.search.create({ query, count }) as Promise<unknown>,
          { label: 'search_medical_images' },
        )) as {
          results?: Array<{ original_url?: string; caption?: string; source?: string; original_width?: string; original_height?: string }>;
        };
        const results = response?.results ?? [];
        if (results.length === 0) return JSON.stringify({ found: false, query, note: 'No images found — try a different query.' });
        const items = results.map((item, index) => ({
          index: index + 1,
          imageUrl: item.original_url ?? '',
          caption: item.caption ?? 'Image',
          source: item.source ?? '',
          dimensions: item.original_width && item.original_height ? `${item.original_width}x${item.original_height}` : undefined,
        }));
        // Cache the top hits locally: external hotlinks rot (CDN token expiry,
        // hotlink protection, page moves) and would render as blank images in
        // the chat. When caching succeeds, imageUrl IS the local copy (the
        // model embeds it as-is — no instruction-following required) and the
        // original moves to sourceUrl for attribution/fallback.
        const cached = await cacheRemoteImages(items, 4);
        const cachedByUrl = new Map(cached.filter((c) => c.cachedUrl).map((c) => [c.imageUrl, c.cachedUrl as string]));
        const itemsWithCache = items.map((item) => {
          const local = cachedByUrl.get(item.imageUrl);
          return {
            ...item,
            imageUrl: local ?? item.imageUrl,
            ...(local ? { sourceUrl: item.imageUrl, cached: true } : { cached: false }),
          };
        });
        return JSON.stringify({
          found: true,
          query,
          images: itemsWithCache,
          note:
            'Show the most relevant images inline with their sources. Each imageUrl is a LOCAL copy that always loads — embed it directly as ![caption](imageUrl) and name the original source site next to it. sourceUrl (when present) is the original remote image for attribution; only embed sourceUrl if imageUrl somehow fails.',
        });
      } catch (error) {
        log.warn?.('search_medical_images failed:', error);
        return errorResult(error);
      }
    },
  });
}

// ─── Audio transcription (ASR) ────────────────────────────────────────────

export function createAudioTranscriptionTool() {
  return new DynamicStructuredTool({
    name: 'transcribe_audio',
    description:
      'Transcribe an audio recording to text (lecture recordings, dictations, patient handover audio). Provide the attachment:// reference to audio the user uploaded in this conversation, a direct audio URL (mp3/wav/m4a), or base64 audio data.',
    schema: z.object({
      audio_url: z.string().optional().describe('Audio source: an attachment:// reference to the user\'s uploaded audio, or a direct URL to the audio file'),
      audio_base64: z.string().optional().describe('Base64-encoded audio data'),
      filename: z.string().optional().describe('File name of the base64 audio (helps format detection)'),
    }),
    func: async ({ audio_url, audio_base64, filename }) => {
      // attachment:// refs resolve to data URLs — decode them straight to a
      // buffer instead of a pointless fetch(data:) round-trip.
      let resolvedName = filename;
      let sourceUrl: string | undefined = audio_url;
      if (audio_url) {
        try {
          sourceUrl = resolveAttachmentInput(audio_url, 'audio');
        } catch (error) {
          return errorResult(error);
        }
      }
      if (!sourceUrl && !audio_base64) {
        return JSON.stringify({ transcribed: false, error: 'Provide audio_url or audio_base64' });
      }
      try {
        // Materialize the audio bytes from whichever source we got.
        let buffer: Buffer;
        if (sourceUrl?.startsWith('data:')) {
          const match = /^data:([^;,]+)(;base64)?,([\s\S]*)$/.exec(sourceUrl);
          if (!match) throw new Error('Malformed audio data URL.');
          buffer = Buffer.from(match[3], 'base64');
          if (!resolvedName) {
            const mimeExt: Record<string, string> = { 'audio/wav': 'wav', 'audio/x-wav': 'wav', 'audio/mpeg': 'mp3', 'audio/mp4': 'm4a', 'audio/webm': 'webm', 'audio/ogg': 'ogg' };
            resolvedName = mimeExt[match[1]] ? `attachment.${mimeExt[match[1]]}` : 'attachment.wav';
          }
        } else if (sourceUrl) {
          const response = await fetch(sourceUrl);
          if (!response.ok) throw new Error(`Could not fetch audio: HTTP ${response.status}`);
          buffer = Buffer.from(await response.arrayBuffer());
        } else {
          buffer = Buffer.from(audio_base64 ?? '', 'base64');
        }
        if (buffer.length === 0) throw new Error('Audio payload is empty.');

        // Primary path: the advanced pipeline (knowledge/audio-pipeline.ts via
        // ingest-media) — loudnorm → VAD silence segmentation → per-segment
        // ASR → [mm:ss] timestamps. Required for anything over the gateway's
        // hard 30-second cap (lecture recordings are typically 30+ minutes)
        // and for non-WAV inputs (mp3/m4a are rejected by the raw gateway).
        try {
          const { transcribeAudio } = await import('../knowledge/ingest-media');
          const result = await transcribeAudio(buffer, { fileName: resolvedName });
          if (result.text.trim()) {
            return JSON.stringify({
              transcribed: true,
              text: result.text.slice(0, 20_000),
              durationSec: Math.round(result.durationSec),
              segments: result.segments.slice(0, 60).map((s) => ({
                offset: s.offsetSec,
                text: s.text.slice(0, 500),
              })),
              note: 'Timings [mm:ss] are embedded in the text; use them to cite moments in the lecture.',
            });
          }
        } catch (pipelineError) {
          log.warn?.('transcribe_audio advanced pipeline failed, trying direct ASR:', pipelineError);
        }

        // Fallback: one direct ASR call (works for short WAV/WebM clips).
        const zai = await createZAI();
        const result = (await withGatewayResilience(
          () => zai.audio.asr.create({
            file_base64: buffer.toString('base64'),
            ...(resolvedName ? { file: resolvedName } : {}),
          }) as Promise<unknown>,
          { label: 'transcribe_audio' },
        )) as unknown;
        // Response may be a raw Response object, plain text, or {text} JSON.
        let text: string;
        if (result instanceof Response) {
          const raw = await result.text();
          try {
            const parsed = JSON.parse(raw) as { text?: string; result?: string };
            text = parsed.text ?? parsed.result ?? raw;
          } catch {
            text = raw;
          }
        } else if (typeof result === 'string') {
          text = result;
        } else {
          const obj = result as { text?: string; result?: string };
          text = obj?.text ?? obj?.result ?? JSON.stringify(result);
        }
        return JSON.stringify({ transcribed: true, text: text.slice(0, 20_000) });
      } catch (error) {
        log.warn?.('transcribe_audio failed:', error);
        return errorResult(error);
      }
    },
  });
}

// ─── Speech synthesis (TTS) ───────────────────────────────────────────────

function splitTextChunks(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  let remaining = text.trim();
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let cut = remaining.lastIndexOf(' ', maxLen);
    if (cut <= 0) cut = maxLen;
    chunks.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut).trim();
  }
  return chunks;
}

/**
 * Normalize a TTS API response into an audio Buffer.
 *
 * The ZAI gateway rejects response_format "mp3" (error 1214) and returns
 * wav/pcm as a raw fetch Response object — this handles every shape the SDK
 * may return (Response, Buffer, base64 string, {audio} object).
 */
async function ttsResponseToBuffer(response: unknown): Promise<Buffer | null> {
  if (response == null) return null;
  // Raw fetch Response (wav / pcm formats on this gateway)
  if (typeof (response as Response).arrayBuffer === 'function' && (response as Response).status !== undefined) {
    const res = response as Response;
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    if (arrayBuffer.byteLength > 0) return Buffer.from(arrayBuffer);
    return null;
  }
  if (Buffer.isBuffer(response)) return response;
  if (typeof response === 'string') return Buffer.from(response, 'base64');
  if (response && typeof response === 'object') {
    const audio = (response as { audio?: unknown }).audio;
    if (typeof audio === 'string') return Buffer.from(audio, 'base64');
    if (Buffer.isBuffer(audio)) return audio;
  }
  return null;
}

export function createSpeechSynthesisTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'synthesize_speech',
    description:
      'Convert text into a spoken audio file (WAV) the user can play or download — pronunciation guides, audio summaries, or study podcasts. Long text is automatically split into chunks and stitched into one file.',
    schema: z.object({
      text: z.string().min(5).max(50_000).describe('The text to speak'),
      title: z.string().min(3).max(120).optional().describe('Audio title for the file name, e.g. "Atrial fibrillation audio summary"'),
      speed: z.number().min(0.5).max(2.0).optional().describe('Speech speed, default 1.0'),
    }),
    func: async ({ text, title, speed = 1.0 }) => {
      try {
        const zai = await createZAI();
        // The model often passes markdown (bold terms, headings, bullets) as
        // the "text to speak" — strip it so the narrator never SPEAKS the
        // syntax markers aloud.
        const speakable = stripMarkdownForTTS(text);
        if (!speakable.trim()) {
          return JSON.stringify({ created: false, error: 'No speakable text after removing markdown markers' });
        }
        const chunks = splitTextChunks(speakable, 1000);
        const buffers: Buffer[] = [];
        for (const chunk of chunks) {
          const response = (await withGatewayResilience(
            () => zai.audio.tts.create({
              input: chunk,
              response_format: 'wav',
              speed,
            }) as Promise<unknown>,
            { label: 'synthesize_speech' },
          )) as unknown;
          const buffer = await ttsResponseToBuffer(response);
          if (buffer && buffer.byteLength > 0) buffers.push(buffer);
        }
        if (buffers.length === 0) {
          return JSON.stringify({ created: false, error: 'Speech synthesis returned no audio' });
        }
        const combined = Buffer.concat(buffers);
        const base = (title ?? 'audio-summary').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60);
        const artifact = await saveBinaryArtifact({
          userId: ctx.userId,
          name: base,
          kind: 'audio',
          mimeType: 'audio/wav',
          buffer: combined,
          meta: { title, chunks: chunks.length, speed, format: 'wav' },
        });
        return artifactResult(artifact, `${base}.wav`);
      } catch (error) {
        log.warn?.('synthesize_speech failed:', error);
        return errorResult(error);
      }
    },
  });
}

// ─── Video analysis ───────────────────────────────────────────────────────

export function createVideoAnalysisTool(ctx?: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'analyze_video_material',
    description:
      'Analyze an educational video (clinical procedure recording, examination demonstration, lecture clip, surgical technique) and answer questions about its content. The video can be: (1) a direct public https URL to an mp4/mov/webm, OR (2) an attachment:// reference to a video the user uploaded in this chat. The vision model receives the video_url directly (for short clips ≤2 min) — longer uploaded videos are sampled at evenly-spaced frames and described individually so the agent can answer "what happens at 2:30?" style questions. Use this whenever the user shares a video and asks "what is shown", "describe the procedure", "what steps did they take", "what anatomical structure is being demonstrated", etc.',
    schema: z.object({
      video_url: z.string().min(5).describe(
        'Direct https URL to the video, OR an attachment:// reference from the user\'s uploaded video file (e.g. attachment://lectomy.mp4). Public URLs work for any short clip; uploads are downloaded server-side and frame-sampled for longer recordings.',
      ),
      prompt: z.string().min(5).describe('What to analyze, e.g. "describe the steps of this lumbar puncture", "what complications should I watch for in this technique", "identify the anatomical landmarks shown"'),
    }),
    func: async ({ video_url, prompt }) => {
      try {
        // ── Resolve attachment:// references to a fetchable URL or a local
        //    file path. For uploaded videos we fall back to the
        //    analyzeVideoFrames helper (ffmpeg → evenly-sampled frames →
        //    per-frame VLM description) which handles long recordings that
        //    the createVision API would reject on duration grounds. ──
        let resolvedUrl = video_url;
        let isAttachment = false;
        if (video_url.startsWith('attachment://')) {
          try {
            resolvedUrl = resolveAttachmentInput(video_url, 'video');
            isAttachment = true;
          } catch (error) {
            return errorResult(error);
          }
        }

        // Public URLs (https://) → send straight to createVision with a
        // video_url content item. This is the ZAI gateway's native path and
        // works for any short clip the gateway can fetch.
        if (!isAttachment && /^https?:\/\//i.test(resolvedUrl)) {
          const zai = await createZAI();
          const completion = (await withGatewayResilience(
            () => zai.chat.completions.createVision({
              model: 'glm-4.5v',
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: prompt },
                    { type: 'video_url', video_url: { url: resolvedUrl } },
                  ],
                },
              ],
              thinking: { type: 'disabled' },
            } as Parameters<typeof zai.chat.completions.createVision>[0]),
            { label: 'analyze_video_material' },
          )) as { choices?: Array<{ message?: { content?: string } }> };
          const text = completion?.choices?.[0]?.message?.content || '';
          if (text.trim()) {
            return JSON.stringify({ analyzed: true, source: 'video_url', summary: text.slice(0, 20_000) });
          }
          // Empty response — fall through to the frame-sampling path below
          // (which gives the agent at least SOMETHING to work with for long
          // videos the gateway's video_url path doesn't fully ingest).
          log.warn?.('analyze_video_material: createVision returned empty — falling back to frame sampling');
        }

        // Uploaded videos (attachment://) OR empty-createVision URLs → use
        // the analyzeVideoFrames helper from ingest-media, which:
        //   1. probes the video duration via ffprobe
        //   2. samples N evenly-spaced frames (6-10) with ffmpeg
        //   3. describes each frame individually via the VLM (glm-4.5v chain)
        //   4. returns { durationSec, frames: [{offsetSec, description}] }
        // The descriptions are stitched into a timestamped summary the agent
        // can answer "what's at 2:30?" questions against.
        //
        // For attachment:// refs, resolveAttachmentInput returned a file://
        // or tmp/ path — read it into a Buffer for analyzeVideoFrames.
        let videoBuffer: Buffer | null = null;
        if (isAttachment) {
          try {
            // resolveAttachmentInput may return a data: URL, a /tmp path, or
            // an https URL (for cached attachments). Handle each:
            if (resolvedUrl.startsWith('data:')) {
              const m = /^data:[^;]+;base64,([\s\S]*)$/.exec(resolvedUrl);
              if (m) videoBuffer = Buffer.from(m[1], 'base64');
            } else if (/^https?:\/\//i.test(resolvedUrl)) {
              const r = await fetch(resolvedUrl);
              if (r.ok) videoBuffer = Buffer.from(await r.arrayBuffer());
            } else {
              // Local file path
              const fs = await import('fs/promises');
              videoBuffer = await fs.readFile(resolvedUrl);
            }
          } catch (readErr) {
            log.warn?.('analyze_video_material: could not read attachment:', readErr);
            return errorResult(readErr);
          }
        }

        if (videoBuffer) {
          const { analyzeVideoFrames } = await import('../knowledge/ingest-media');
          const result = await analyzeVideoFrames(videoBuffer, prompt, { maxFrames: 8 });
          if (result && result.frames.length > 0) {
            const summary = result.frames
              .map((f: { offsetSec: number; description: string }) =>
                `[${Math.floor(f.offsetSec / 60)}:${String(Math.round(f.offsetSec % 60)).padStart(2, '0')}] ${f.description}`,
              )
              .join('\n\n');
            return JSON.stringify({
              analyzed: true,
              source: 'frame-sampling',
              durationSec: Math.round(result.durationSec),
              frameCount: result.frames.length,
              summary: `Video duration: ${Math.floor(result.durationSec / 60)}m ${Math.round(result.durationSec % 60)}s. Sampled ${result.frames.length} frames at evenly-spaced timestamps:\n\n${summary}`.slice(0, 20_000),
            });
          }
        }

        return JSON.stringify({
          analyzed: false,
          error: 'The video could not be analyzed — the vision model returned no content and frame sampling did not produce any descriptions. Try a shorter clip, a different URL, or describe what you want to know about the video in more detail.',
        });
      } catch (error) {
        log.warn?.('analyze_video_material failed:', error);
        return errorResult(error);
      }
    },
  });
}

/** Search the web for medical videos. ZAI's image-search is repurposed as a
 *  video-search proxy (it surfaces video thumbnails + source pages), then
 *  the source pages are inspected to extract the actual video URL. Returns
 *  ranked results the agent can pass back to analyze_video_material. */
export function createVideoSearchTool() {
  return new DynamicStructuredTool({
    name: 'search_medical_videos',
    description:
      'Search the web for REAL medical videos (clinical procedure demonstrations, surgical technique recordings, anatomy lectures, examination tutorials) — use this whenever the user wants to find, watch, or search for actual videos online. Returns ranked results with direct video URLs (plus captions, source pages) — pass the best video URL to analyze_video_material to extract its content.',
    schema: z.object({
      query: z.string().min(3).max(200).describe('What to search for, e.g. "lumbar puncture procedure", "cardiac auscultation tutorial", "histology slide preparation"'),
      count: z.number().int().min(1).max(10).default(5).describe('Number of results to return (default 5)'),
    }),
    func: async ({ query, count }) => {
      try {
        const zai = await createZAI();
        // ZAI's image-search API returns thumbnails + source pages for
        // video-related queries — we filter for ones whose source page is a
        // known video host (youtube, vimeo, medtube, etc.) and report those
        // back. For non-video-host results, we still include them but flag
        // them as "image — likely a thumbnail of an embedded video" so the
        // agent can decide whether to fetch the page for the actual URL.
        const response = (await withGatewayResilience(
          () => zai.images.search.create({ query: `${query} video`, count: Math.min(count * 2, 12) }) as Promise<unknown>,
          { label: 'search_medical_videos' },
        )) as { success?: boolean; results?: Array<{ original_url?: string; caption?: string; source?: string; original_width?: string; original_height?: string }> };
        const results = response?.results ?? [];
        if (!results.length) {
          return JSON.stringify({ results: [], note: 'No videos found for this query. Try broader or different keywords.' });
        }
        // Known video hosts — if the source URL matches, we trust it as a
        // real video page and pass it through. Otherwise the result is
        // reported as a thumbnail that the agent should fetch the source
        // page of to find the embedded video URL.
        const VIDEO_HOSTS = ['youtube.com', 'youtu.be', 'vimeo.com', 'medtube.net', 'bmj.com', 'medscape.com', 'kenhub.com', 'radiopaedia.org', 'mededconnect.net'];
        const ranked = results.slice(0, count).map((r, i) => {
          const source = r.source || '';
          const isVideoHost = VIDEO_HOSTS.some((h) => source.includes(h));
          return {
            rank: i + 1,
            title: r.caption || '(no caption)',
            videoUrl: isVideoHost ? source : null,
            thumbnailUrl: r.original_url || null,
            source,
            isVideoHost,
            note: isVideoHost
              ? 'Direct video page — pass videoUrl to analyze_video_material to extract content.'
              : 'Thumbnail of a likely video — fetch the source page to find the embedded video URL, then pass that to analyze_video_material.',
          };
        });
        return JSON.stringify({
          results: ranked,
          note: 'Cite video sources inline as [V1], [V2]… markers. To analyze a video\'s content, pass its videoUrl to the analyze_video_material tool. For results where isVideoHost=false, use fetch_medical_reference on the source page to find the embedded video URL first.',
        });
      } catch (error) {
        log.warn?.('search_medical_videos failed:', error);
        return errorResult(error);
      }
    },
  });
}

// ─── Video generation ─────────────────────────────────────────────────────

const VIDEO_POLL_INTERVAL_MS = 5_000;
const VIDEO_POLL_TIMEOUT_MS = 110_000;

export function createVideoGenerationTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'generate_medical_video',
    description:
      'Generate a short educational video clip from a text description (e.g. "blood flow through the heart, simplified animation"). Slower than images — use only when a moving visualization clearly beats a static illustration.',
    schema: z.object({
      prompt: z.string().min(15).max(2_000).describe('Detailed description of the desired video'),
      title: z.string().min(3).max(120).optional().describe('Title for the file name'),
    }),
    func: async ({ prompt, title }) => {
      try {
        const zai = await createZAI();
        const created = (await withGatewayResilience(
          () => zai.video.generations.create({ prompt }) as Promise<unknown>,
          { label: 'generate_medical_video' },
        )) as {
          url?: string;
          task_id?: string;
        };
        // Immediate result — done.
        if (created?.url) {
          return JSON.stringify({ created: true, videoUrl: created.url, note: 'Video generated. Share the URL in your final answer.' });
        }
        // Async task — poll with a bounded budget, then report the task id.
        const taskId = created?.task_id;
        if (!taskId) {
          return JSON.stringify({ created: false, error: 'Video generation returned neither a URL nor a task id' });
        }
        const deadline = Date.now() + VIDEO_POLL_TIMEOUT_MS;
        while (Date.now() < deadline) {
          await new Promise((resolve) => setTimeout(resolve, VIDEO_POLL_INTERVAL_MS));
          const status = (await zai.async.result.query(taskId)) as {
            status?: string;
            video_url?: string;
            video_result?: Array<{ video_url?: string }>;
          };
          const videoUrl = status?.video_url ?? status?.video_result?.[0]?.video_url;
          if (videoUrl) {
            return JSON.stringify({ created: true, videoUrl, taskId, note: 'Video generated. Share the URL in your final answer.' });
          }
          if (status?.status && /fail|error|cancel/i.test(status.status)) {
            return JSON.stringify({ created: false, error: `Video generation failed: ${status.status}` });
          }
        }
        return JSON.stringify({
          created: false,
          pending: true,
          taskId,
          note: 'Video is still rendering — it can take a few minutes. Tell the user it is queued and they can ask again shortly.',
        });
      } catch (error) {
        log.warn?.('generate_medical_video failed:', error);
        return errorResult(error);
      }
    },
  });
}
