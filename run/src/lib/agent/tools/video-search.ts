import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { searchVideoScenes, formatVideoSceneContext } from '../knowledge/video-scenes';

/**
 * search_video_scenes — semantic search over the learner's ingested VIDEO
 * library at scene granularity (Stage 3 / Stage 10 roadmap).
 *
 * Unlike search_medical_videos (finds videos ONLINE) and analyze_video
 * material (frame-analyzes ONE clip), this queries the temporal scene
 * index built at ingestion: each hit is a timestamped span
 * (startSec–endSec, mediaTimeSec) with the VLM frame description and the
 * spoken transcript inside that span — so answers can say "at 12:34 the
 * surgeon performs X" and cite the exact moment.
 */

export const VIDEO_SCENE_TOOL_NAMES = ['search_video_scenes'] as const;

export function createVideoSceneSearchTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'search_video_scenes',
    description:
      'Semantic search over the learner\'s UPLOADED/IMPORTED videos (lectures, procedure recordings, screencasts) at SCENE granularity. Each hit is a timestamped span with what was SHOWN (frame description) and what was SAID (transcript) in that span. Use for "what did the video show at 12:34", "find the segment where they intubate", "what was on screen while she explained X". Returns [V#]-cited scenes with mediaTimeSec timestamps. NOT for finding new videos online (use web search for that).',
    schema: z.object({
      query: z.string().min(2).max(2_000).describe('What to look for in the video library'),
      source_id: z.string().min(5).optional().describe('Restrict the search to one video source id'),
      top_k: z.number().int().min(1).max(20).optional().describe('Max scenes to return (default 6)'),
    }),
    func: async ({ query, source_id, top_k }) => {
      try {
        const hits = await searchVideoScenes(ctx.userId, query, {
          ...(source_id ? { sourceIds: [source_id] } : {}),
          topK: top_k ?? 6,
        });
        if (hits.length === 0) {
          return JSON.stringify({
            ok: true,
            note: 'No video scenes matched. The learner may not have uploaded videos yet — suggest adding one via the Knowledge Library (upload or YouTube link), or fall back to search_knowledge.',
          });
        }
        const context = formatVideoSceneContext(hits);
        return JSON.stringify({
          ok: true,
          context,
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
          note:
            'Cite these as [V1], [V2] in the answer. When saving a question about a specific moment, pass the scene\'s sourceId + startSec/endSec into save_question.videoScene so the player can deep-link to it.',
        });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
