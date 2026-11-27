/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/types/web-search.ts
 */

export interface WebSearchSource {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface WebSearchResult {
  answer: string;
  sources: WebSearchSource[];
  query: string;
  responseTime: number;
}
