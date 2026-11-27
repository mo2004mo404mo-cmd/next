import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { db } from '@/lib/db';
import { readRetainedOriginal } from '../knowledge/file-store';
import { retrieveKnowledgeHybrid } from '../knowledge/hybrid';
import type { HybridChunk } from '../knowledge/hybrid';

/**
 * query_spreadsheet — ask structured questions of the learner's UPLOADED
 * spreadsheets (lab datasets, drug lists, study trackers) WITHOUT any SQL.
 *
 * The retained .xlsx original (upload/file-store/<sourceId>.bin — retained
 * for spreadsheets since Stage 10) is parsed in-process with exceljs; the
 * pure filter/aggregate engine below does the rest. There is no SQL
 * anywhere in this path and no cell content is ever executed.
 *
 * Fallback for legacy uploads (no retained original): hybrid retrieval
 * over the sheet text that was ingested at upload time.
 */

export const SPREADSHEET_TOOL_NAMES = ['query_spreadsheet'] as const;

// ─── Pure query engine (unit-tested in test/spreadsheet-query.test.ts) ────

export type FilterOp = 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains';
export type AggregateFn = 'count' | 'sum' | 'avg' | 'min' | 'max';

export interface SpreadsheetQuery {
  filter?: { column: string; op: FilterOp; value: string | number };
  aggregate?: { fn: AggregateFn; column?: string };
  limit?: number;
}

export interface SpreadsheetQueryResult {
  rows: Array<Record<string, unknown>>;
  totalMatched: number;
  aggregate?: { fn: AggregateFn; column?: string; value: number | string };
  columns: string[];
  notes: string[];
}

const asNumber = (v: unknown): number | null => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    const cleaned = v.replace(/[, ]/g, '');
    if (/^-?\d+(\.\d+)?$/.test(cleaned)) return Number.parseFloat(cleaned);
  }
  return null;
};

const cellText = (v: unknown): string =>
  v === null || v === undefined ? '' : String(v);

/** Apply filter + aggregation + limit to parsed sheet rows. Pure. */
export function applySpreadsheetQuery(
  allRows: Array<Record<string, unknown>>,
  query: SpreadsheetQuery,
): SpreadsheetQueryResult {
  const notes: string[] = [];
  const columns = [...new Set(allRows.flatMap((r) => Object.keys(r)))].filter(Boolean);

  let rows = allRows;

  // ── filter ──
  if (query.filter) {
    const { column, op, value } = query.filter;
    if (column && !columns.includes(column)) {
      notes.push(`Column "${column}" not found. Available: ${columns.join(', ') || '(none)'}`);
      rows = [];
    } else if (column) {
      const numValue = asNumber(value);
      rows = rows.filter((row) => {
        const cell = row[column];
        if (op === 'contains') {
          return cellText(cell).toLowerCase().includes(cellText(value).toLowerCase());
        }
        const cellNum = asNumber(cell);
        if (numValue !== null && cellNum !== null) {
          switch (op) {
            case 'eq': return cellNum === numValue;
            case 'ne': return cellNum !== numValue;
            case 'gt': return cellNum > numValue;
            case 'lt': return cellNum < numValue;
            case 'gte': return cellNum >= numValue;
            case 'lte': return cellNum <= numValue;
          }
        }
        const cellStr = cellText(cell).toLowerCase();
        const valStr = cellText(value).toLowerCase();
        switch (op) {
          case 'eq': return cellStr === valStr;
          case 'ne': return cellStr !== valStr;
          default:
            return false; // ordering ops on non-numeric cells never match
        }
      });
    }
  }

  // ── aggregate ──
  let aggregate: SpreadsheetQueryResult['aggregate'];
  if (query.aggregate) {
    const { fn, column } = query.aggregate;
    const needsColumn = fn !== 'count';
    if (needsColumn && (!column || !columns.includes(column))) {
      notes.push(
        `Aggregate "${fn}" needs a numeric column${column ? ` — "${column}" not found` : ''}. Available: ${columns.join(', ') || '(none)'}`,
      );
    } else if (fn === 'count') {
      aggregate = { fn, column, value: rows.length };
    } else {
      const nums = rows.map((r) => asNumber(r[column as string])).filter((n): n is number => n !== null);
      if (nums.length === 0) {
        aggregate = { fn, column, value: 'no numeric cells in range' };
      } else {
        const value =
          fn === 'sum' ? nums.reduce((a, b) => a + b, 0)
          : fn === 'avg' ? nums.reduce((a, b) => a + b, 0) / nums.length
          : fn === 'min' ? Math.min(...nums)
          : Math.max(...nums);
        aggregate = { fn, column, value: Math.round(value * 1000) / 1000 };
      }
    }
  }

  const limit = Math.min(Math.max(query.limit ?? 25, 1), 100);
  return {
    rows: rows.slice(0, limit),
    totalMatched: rows.length,
    aggregate,
    columns,
    notes,
  };
}

// ─── Tool ──────────────────────────────────────────────────────────────────

export function createQuerySpreadsheetTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'query_spreadsheet',
    description:
      'Query one of the learner\'s UPLOADED spreadsheets (.xlsx in their Knowledge Library) with a filter and/or aggregate — no SQL, just structured reads. Use it when the learner asks things like "what was the average sodium in my lab sheet", "list drugs where the class is beta blocker", "how many rows mention anemia". First call without filter/aggregate to list sheets and columns, then refine.',
    schema: z.object({
      sourceId: z.string().min(5).describe('The knowledge-source id of the uploaded spreadsheet (from search_knowledge results or the Knowledge Library)'),
      sheet: z.string().max(120).optional().describe('Sheet name (omit to use the first sheet; the response lists all sheet names)'),
      filter: z.object({
        column: z.string().max(120).describe('Column header to filter on (must match exactly)'),
        op: z.enum(['eq', 'ne', 'gt', 'lt', 'gte', 'lte', 'contains']).describe('Comparison'),
        value: z.union([z.string().max(500), z.number()]).describe('Value to compare against'),
      }).optional().describe('Optional row filter'),
      aggregate: z.object({
        fn: z.enum(['count', 'sum', 'avg', 'min', 'max']).describe('Aggregation over the filtered rows'),
        column: z.string().max(120).optional().describe('Numeric column (required except for count)'),
      }).optional().describe('Optional aggregate'),
      limit: z.number().int().min(1).max(100).optional().describe('Max rows to return (default 25)'),
    }),
    func: async ({ sourceId, sheet, filter, aggregate, limit }) => {
      try {
        // Owner-gate + kind check
        const source = await db.knowledgeSource.findFirst({
          where: { id: sourceId, userId: ctx.userId },
          select: { id: true, name: true, fileKind: true, metaJson: true },
        });
        if (!source) {
          return JSON.stringify({ ok: false, error: `Spreadsheet source "${sourceId}" not found in the learner's library.` });
        }
        const meta = source.metaJson ? (JSON.parse(source.metaJson) as Record<string, unknown>) : {};
        const originalName = typeof meta.originalName === 'string' ? meta.originalName.toLowerCase() : '';
        if (!originalName.endsWith('.xlsx')) {
          return JSON.stringify({
            ok: false,
            error: `"${source.name}" is not a retained .xlsx spreadsheet (found: ${originalName || 'no retained original'}). Only uploaded .xlsx files can be queried structurally.`,
          });
        }

        const retained = readRetainedOriginal(sourceId);
        if (!retained) {
          // Legacy upload (pre-retention): fall back to text retrieval over
          // the ingested sheet rows.
          const chunks: HybridChunk[] = [];
          try {
            const res = await retrieveKnowledgeHybrid(ctx.userId, filter
              ? `${filter.column} ${filter.value}`
              : String(meta.title || source.name), { sourceIds: [sourceId], topK: 6, skipLog: true });
            chunks.push(...res.chunks);
          } catch { /* best-effort */ }
          return JSON.stringify({
            ok: true,
            fallback: 'text',
            note: 'The original spreadsheet bytes were not retained for this upload (legacy row). These are the ingested sheet-text excerpts — suggest re-uploading the .xlsx for structural queries.',
            excerpts: chunks.map((c) => c.content.slice(0, 600)),
          });
        }

        // Parse with exceljs (in-process — no SQL, no eval, no formulas executed;
        // same import pattern as the ingestion-side parseXlsx)
        const ExcelJS = await import('exceljs');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(retained.buffer as unknown as Parameters<typeof workbook.xlsx.load>[0]);
        const sheetNames = workbook.worksheets.map((ws) => ws.name);
        const target = workbook.worksheets.find(
          (ws) => (sheet ? ws.name === sheet : true),
        );
        if (!target) {
          return JSON.stringify({
            ok: false,
            error: `Sheet "${sheet || '(first)'}" not found. Sheets: ${sheetNames.join(', ') || '(none)'}`,
          });
        }

        // First row = headers; rest = data rows (same convention as the
        // ingestion parser in ingest-media parseXlsx).
        const rows: Array<Record<string, unknown>> = [];
        let headers: string[] = [];
        target.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          const values = (row.values as unknown[]).slice(1); // index 0 is a hole in exceljs
          if (rowNumber === 1) {
            headers = values.map((v, i) => (v === null || v === undefined ? `Column ${i + 1}` : String(v).trim()));
            return;
          }
          const record: Record<string, unknown> = {};
          values.forEach((v, i) => {
            if (i < headers.length) record[headers[i]] = v ?? '';
          });
          if (Object.values(record).some((v) => v !== '' && v !== null && v !== undefined)) rows.push(record);
        });
        if (rows.length > 20_000) rows.length = 20_000; // memory guard

        const result = applySpreadsheetQuery(rows, { filter, aggregate, limit });
        return JSON.stringify({
          ok: true,
          source: source.name,
          sheet: target.name,
          sheets: sheetNames,
          columns: result.columns,
          totalRows: rows.length,
          totalMatched: result.totalMatched,
          ...(result.aggregate ? { aggregate: result.aggregate } : {}),
          rows: result.rows,
          ...(result.notes.length ? { notes: result.notes } : {}),
        });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message.slice(0, 300) : String(error) });
      }
    },
  });
}
