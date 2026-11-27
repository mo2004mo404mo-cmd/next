import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { searchWeb } from '../../web-search';
import { resolveWebSearchApiKey, resolveWebSearchBaseUrl } from '../../server/provider-config';
import { createZAI } from '../../zai';
import { createLogger } from '../../logger';
import { withGatewayResilience } from '@/lib/ai/resilience';

const log = createLogger('AgentWebSearch');

/**
 * search_medical_references — web search with a provider → ZAI fallback chain.
 *
 * Resolution order (pattern from the reference platforms — every tool has a
 * zero-config built-in provider as last resort):
 *   1. The configured search provider (tavily/bocha/brave/baidu/minimax) when
 *      its API key resolves — errors return a graceful JSON result, never a
 *      thrown exception (a dead provider must not kill the stream).
 *   2. ZAI gateway web_search (z-ai-web-dev-sdk) — zero-config on ZAI
 *      deployments.
 *   3. A clear "search unavailable" JSON payload so the model can tell the
 *      user honestly instead of crashing the run.
 */

interface NormalizedSearchResult {
  title: string;
  url: string;
  snippet: string;
  host?: string;
  date?: string;
}

function formatResults(results: NormalizedSearchResult[]): string {
  if (results.length === 0) {
    return JSON.stringify({ results: [], note: 'No results found for this query.' });
  }
  const numbered = results.map(
    (result, index) =>
      `[S${index + 1}] ${result.title}${result.date ? ` (${result.date})` : ''}\n    ${result.url}${result.host ? ` (${result.host})` : ''}\n    ${result.snippet}`,
  );
  return JSON.stringify({
    results,
    formatted: numbered.join('\n'),
    note:
      'Cite these inline as [S1], [S2]… markers placed right after the claim each source supports. '
      + 'NEVER paste raw URLs into the answer text — the interface renders [S#] markers as clickable '
      + 'source cards and lists every URL in a Web sources panel automatically. '
      + 'Results are re-ranked for recency (freshest first): when a source carries a date, mention the '
      + 'year the moment you cite it (e.g. "per the 2024 ESC guideline [S1]"), and prefer the most '
      + 'recent guidance when sources conflict — flag older sources as superseded where relevant.',
  });
}

async function searchViaZai(query: string, num: number): Promise<NormalizedSearchResult[] | null> {
  try {
    const zai = await createZAI();
    if (!zai?.functions?.invoke) return null;
    // Fetch a couple extra beyond the requested count so the freshness
    // re-rank below still leaves `num` usable results after demoting stale
    // entries.
    const fetchCount = Math.min(num + 2, 8);
    const items = (await withGatewayResilience(
      () => zai.functions.invoke('web_search', { query, num: fetchCount }) as Promise<unknown>,
      { label: 'search_medical_references' },
    )) as Array<{
      url: string;
      name: string;
      snippet: string;
      host_name?: string;
      date?: string;
    }>;
    if (!Array.isArray(items)) return null;
    const mapped = items.map((item) => ({
      title: item.name,
      url: item.url,
      snippet: item.snippet,
      host: item.host_name,
      date: item.date,
    }));
    return rankForFreshness(mapped).slice(0, num);
  } catch (error) {
    log.warn?.('ZAI web_search fallback failed:', error);
    return null;
  }
}

// ── Guideline freshness ──────────────────────────────────────────────────────
//
// Clinical guidance moves: guidelines get revised (ESC 2024 vs 2018,
// ACC/AHA cycles, WHO updates), and a stale top hit can mislead a student
// quoting an outdated threshold. Results carrying a parseable date are
// grouped FRESH (>= FRESH_YEAR) → UNDATED → STALE; original order is kept
// inside each group (stable sort — the engine's relevance ranking survives).

const FRESH_YEAR = new Date().getFullYear() - 3;

function resultYear(result: NormalizedSearchResult): number | null {
  if (!result.date) return null;
  const iso = /(\d{4})-\d{2}-\d{2}/.exec(result.date) ?? /^\s*(\d{4})/.exec(result.date);
  if (iso) {
    const year = parseInt(iso[1], 10);
    if (year >= 1990 && year <= new Date().getFullYear() + 1) return year;
  }
  const monthName = new Date(result.date).getTime();
  if (!Number.isNaN(monthName)) {
    const year = new Date(monthName).getFullYear();
    if (year >= 1990 && year <= new Date().getFullYear() + 1) return year;
  }
  return null;
}

/** Stable re-rank: fresh (dated within 3y) first, undated next, stale last. */
function rankForFreshness(results: NormalizedSearchResult[]): NormalizedSearchResult[] {
  const bucket = (result: NormalizedSearchResult): 0 | 1 | 2 => {
    const year = resultYear(result);
    if (year === null) return 1;
    return year >= FRESH_YEAR ? 0 : 2;
  };
  return results
    .map((result, index) => ({ result, index, bucket: bucket(result) }))
    .sort((a, b) => a.bucket - b.bucket || a.index - b.index)
    .map((entry) => entry.result);
}

// Image-finding intent in a search_medical_references query. When matched,
// the tool still runs (the text results may be useful reading) but its payload
// gains a redirect note pointing the model at search_medical_images — the tool
// that returns actual picture URLs the chat can render inline.
const IMAGE_INTENT_RE = /\b(images?|photos?|photographs?|pictures?|diagrams?|slides?|radiographs?|x-?rays?|micrographs?|histolog(?:y|ical)|scans?|imaging|atlas\b.{0,12}\bimages?|illustrations?|figures?)\b/i;
const FINDING_RE = /\b(find|search|show|look\s+for|get|see|view|browse|images?\s+of)\b/i;

/** True when a query reads like "show me pictures of X" rather than "evidence about X". */
function looksLikeImageRequest(query: string): boolean {
  return IMAGE_INTENT_RE.test(query) && (FINDING_RE.test(query) || /\b(images?|photos?|pictures?|diagrams?)\s+(of|for|showing)\b/i.test(query));
}

/** Append the image-tool redirect hint to a formatted search payload. */
function withImageRedirectHint(query: string, payload: string): string {
  if (!looksLikeImageRequest(query)) return payload;
  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;
    parsed.imageRedirect =
      'This query reads like the user wants to SEE actual images. These text results are website links only — '
      + 'the user cannot see pictures from them. Call search_medical_images with the same subject next, '
      + 'then embed 2-4 of its images in your final reply as ![short caption](imageUrl) with the source site named. '
      + 'Only fall back to listing these text sources if search_medical_images fails.';
    return JSON.stringify(parsed);
  } catch {
    return payload;
  }
}

export function createMedicalWebSearchTool() {
  return new DynamicStructuredTool({
    name: 'search_medical_references',
    description:
      'Search configured web sources for current medical guidelines, evidence, statistics, or articles — textual evidence the user can READ. Cite sources as [S#] markers. If the user wants to SEE actual images (find/show/search for pictures, photos, diagrams, slides, radiographs of X), do NOT use this tool — call search_medical_images instead and embed its images inline as ![caption](imageUrl).',
    schema: z.object({
      query: z.string().min(3).describe('Focused medical search query'),
      maxResults: z.number().int().min(1).max(5).default(3),
    }),
    func: async ({ query, maxResults }) => {
      // 1. Configured provider (only when its key resolves).
      // NOTE: resolveWebSearchApiKey MUST be called with two arguments —
      // the single-argument overload treats the first arg as a CLIENT key,
      // so resolveWebSearchApiKey('tavily') returned the literal string
      // 'tavily' as the API key → "Bearer tavily" → 401 on every search.
      const configuredProvider = process.env.MEDQ_AGENT_SEARCH_PROVIDER || 'tavily';
      // 'zai' means "use the built-in managed ZAI gateway" — skip the remote-provider step.
      if (configuredProvider !== 'zai') {
        const providerId = configuredProvider as 'tavily' | 'bocha' | 'brave' | 'baidu' | 'minimax';
        const apiKey = resolveWebSearchApiKey(providerId, undefined);
        if (apiKey) {
          try {
            const result = await searchWeb({
              providerId,
              query,
              maxResults,
              apiKey,
              baseUrl: resolveWebSearchBaseUrl(providerId),
            });
            const sources = (result.sources ?? []).slice(0, maxResults).map((source) => {
              const record = source as unknown as Record<string, unknown>;
              return {
                title: String(record.title ?? record.name ?? 'Result'),
                url: String(record.url ?? record.link ?? ''),
                snippet: String(record.snippet ?? record.description ?? '').slice(0, 400),
                host: typeof record.host === 'string' ? record.host : undefined,
              };
            });
            if (sources.length > 0) return withImageRedirectHint(query, formatResults(sources));
            // Provider succeeded but empty — fall through to ZAI
          } catch (error) {
            log.warn?.(`Search provider ${providerId} failed, falling back to ZAI:`, error);
          }
        }
      }

      // 2. ZAI gateway fallback (zero-config)
      const zaiResults = await searchViaZai(query, maxResults);
      if (zaiResults && zaiResults.length > 0) return withImageRedirectHint(query, formatResults(zaiResults));

      // 3. Honest unavailability — never throw (kills the whole stream)
      return JSON.stringify({
        results: [],
        note: 'Web search is temporarily unavailable (no search provider reachable). Answer from your own knowledge, state that live references could not be retrieved, and suggest the user verify current guidance.',
      });
    },
  });
}
