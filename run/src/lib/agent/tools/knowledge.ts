import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { createAndIngestSource } from '../knowledge/pipeline';
import { retrieveKnowledgeHybrid, formatHybridContext } from '../knowledge/hybrid';
import { readWorkspaceFile, workspaceExists } from '../workspace/files';
import { audit } from '../audit';

/** Tool names exported for the registry (tools/index.ts). */
export const KNOWLEDGE_TOOL_NAMES = ['search_knowledge', 'add_knowledge'] as const;

/**
 * Knowledge-base tools.
 *
 *   search_knowledge — HYBRID retrieval over the user's ingested corpus
 *                      (dense + BM25 + RRF fusion + LLM rerank) with
 *                      [K#]-cited context
 *   add_knowledge    — ingest new material (pasted text, a URL, or a file
 *                      already in the workspace) so future runs can cite it
 */

export function createSearchKnowledgeTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'search_knowledge',
    description:
      'Hybrid (semantic + keyword + AI-reranked) search over the learner\'s personal knowledge base (their uploaded PDFs, lecture recordings, saved pages, pasted notes). Returns [K#]-cited excerpts — cite them as [K1], [K2] in the answer. Use BEFORE web search when the learner references "my notes/materials/lectures" or when course-specific content likely exists.',
    schema: z.object({
      query: z.string().min(2).max(2_000).describe('What to look for in the knowledge base'),
      top_k: z.number().int().min(1).max(20).optional().describe('Max chunks to return (default 8)'),
    }),
    func: async ({ query, top_k }) => {
      try {
        const { chunks, diagnostics } = await retrieveKnowledgeHybrid(ctx.userId, query, { topK: top_k ?? 8 });
        if (chunks.length === 0) {
          return JSON.stringify({
            ok: true,
            note: 'The knowledge base is empty or nothing matched. Suggest adding material with add_knowledge or the Knowledge settings tab, or fall back to web search.',
          });
        }
        const context = formatHybridContext(chunks);
        return JSON.stringify({
          ok: true,
          context,
          citations: chunks.map((chunk, i) => ({
            ref: `K${i + 1}`,
            title: chunk.documentTitle,
            sourceId: chunk.sourceId,
            relevance: Math.round(Math.min(Math.max(chunk.score / (chunk.rerankScore !== undefined ? 10 : 1), 0), 1) * 100),
          })),
          note:
            'Cite these excerpts using bracketed [K1], [K2] markers (one bracket per source, placed right after the claim it supports). '
            + 'Do NOT write bare K-numbers or raw passage text into the answer.',
          retrieval: {
            candidates: diagnostics.candidateCount,
            rerankUsed: diagnostics.rerankUsed,
            latencyMs: diagnostics.latencyMs,
          },
        });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

export function createAddKnowledgeTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'add_knowledge',
    description:
      'Save material to the learner\'s knowledge base so it becomes searchable (and citable as [K#]) in future conversations. Accepts pasted text, a URL (fetched and parsed), or a workspace file path (PDF/MD/TXT/CSV/JSON). Use when the learner says "remember this document / add this to my materials".',
    schema: z.object({
      type: z.enum(['text', 'url', 'file']).describe('Kind of material to ingest'),
      title: z.string().min(1).max(200).optional().describe('Short name (required for text, optional otherwise)'),
      content: z.string().max(200_000).optional().describe('The text content (for type=text)'),
      url: z.string().url().optional().describe('The URL to fetch and ingest (for type=url)'),
      path: z.string().max(500).optional().describe('Workspace-relative file path (for type=file)'),
    }),
    func: async ({ type, title, content, url, path }) => {
      try {
        let result: Awaited<ReturnType<typeof createAndIngestSource>>;
        if (type === 'text') {
          if (!content?.trim()) return JSON.stringify({ ok: false, error: 'type=text requires content' });
          result = await createAndIngestSource({
            userId: ctx.userId,
            name: title?.trim() || 'Pasted text',
            type: 'text',
            payload: { content, title },
          });
        } else if (type === 'url') {
          if (!url) return JSON.stringify({ ok: false, error: 'type=url requires url' });
          result = await createAndIngestSource({
            userId: ctx.userId,
            name: url,
            type: 'url',
            payload: { url },
          });
        } else {
          if (!path) return JSON.stringify({ ok: false, error: 'type=file requires path' });
          if (!workspaceExists(ctx.userId, path)) {
            return JSON.stringify({ ok: false, error: `Workspace file not found: ${path}` });
          }
          const fileContent = readWorkspaceFile(ctx.userId, path, 15 * 1024 * 1024);
          const buffer = Buffer.from(fileContent, 'utf8');
          const fileName = path.split('/').pop() ?? 'file';
          if (fileName.toLowerCase().endsWith('.pdf')) {
            return JSON.stringify({
              ok: false,
              error: 'PDF ingestion from the workspace is not supported by this tool yet — upload PDFs via the Knowledge settings tab.',
            });
          }
          result = await createAndIngestSource({
            userId: ctx.userId,
            name: fileName,
            type: 'file',
            payload: { buffer, fileName },
          });
        }
        await audit({
          userId: ctx.userId,
          action: 'tool.execute',
          target: 'add_knowledge',
          detail: { type, chunks: result.result.chunks, title: result.result.title },
        });
        return JSON.stringify({
          ok: true,
          sourceId: result.sourceId,
          title: result.result.title,
          chunks: result.result.chunks,
          note: 'Added to the knowledge base — future answers can cite it as [K#].',
        });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
