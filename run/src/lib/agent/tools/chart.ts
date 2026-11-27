import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { saveBinaryArtifact } from '../artifacts/binary';
import { createLogger } from '../../logger';

const log = createLogger('AgentChart');

/**
 * create_chart — data visualization as a durable PNG artifact.
 *
 * Ported from the reference Deep Agent platform's create_chart (matplotlib via
 * python), reimplemented with echarts SSR → SVG → sharp → PNG so no python
 * runtime is needed. MedQ dark theme by default.
 */

type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'radar' | 'heatmap';

const THEME = {
  dark: {
    background: '#0d1117',
    text: '#e8ecf4',
    muted: '#9ca3b8',
    axis: '#30363d',
    palette: ['#00e5a0', '#8b5cf6', '#4fc3f7', '#fbbf24', '#f87171', '#34d399', '#e879f9'],
  },
  light: {
    background: '#ffffff',
    text: '#1a2332',
    muted: '#5a6478',
    axis: '#d0d7de',
    palette: ['#0e7c66', '#7c3aed', '#0284c7', '#d97706', '#dc2626', '#059669', '#c026d3'],
  },
};

interface ChartData {
  labels?: string[];
  values?: number[];
  series?: Array<{ name: string; data: number[] }>;
  /** For heatmap: rows × cols matrix. Each row: { name, data: number[] }. */
  heatmap?: Array<{ name: string; data: number[] }>;
  /** For heatmap: column labels. */
  xLabels?: string[];
}

function buildOption(chartType: ChartType, data: ChartData, title: string, xlabel: string, ylabel: string, theme: 'dark' | 'light') {
  const t = THEME[theme];
  const labels = Array.isArray(data.labels) ? data.labels : [];
  const seriesList = Array.isArray(data.series) && data.series.length > 0
    ? data.series
    : [{ name: 'Series 1', data: Array.isArray(data.values) ? data.values : [] }];

  const base: Record<string, unknown> = {
    backgroundColor: t.background,
    textStyle: { color: t.text, fontFamily: 'DejaVu Sans, Helvetica, Arial, sans-serif' },
    title: {
      text: title,
      left: 'center',
      top: 14,
      textStyle: { color: t.text, fontSize: 17, fontWeight: 600 },
    },
    tooltip: { show: false },
    animation: false,
    color: t.palette,
    grid: { left: 64, right: 32, top: 64, bottom: 56 },
  };

  const categoryAxis = {
    type: 'category',
    data: labels,
    axisLine: { lineStyle: { color: t.axis } },
    axisLabel: { color: t.muted, fontSize: 11, interval: 0, rotate: labels.length > 6 ? 30 : 0 },
  };
  const valueAxis = {
    type: 'value',
    axisLine: { lineStyle: { color: t.axis } },
    axisLabel: { color: t.muted, fontSize: 11 },
    splitLine: { lineStyle: { color: t.axis, type: 'dashed' as const } },
  };

  switch (chartType) {
    case 'bar':
      return {
        ...base,
        xAxis: { ...categoryAxis, name: xlabel || undefined, nameTextStyle: { color: t.muted } },
        yAxis: { ...valueAxis, name: ylabel || undefined, nameTextStyle: { color: t.muted } },
        series: seriesList.map((series) => ({ name: series.name, type: 'bar', data: series.data, barMaxWidth: 42 })),
      };
    case 'line':
      return {
        ...base,
        xAxis: { ...categoryAxis, name: xlabel || undefined, nameTextStyle: { color: t.muted } },
        yAxis: { ...valueAxis, name: ylabel || undefined, nameTextStyle: { color: t.muted } },
        series: seriesList.map((series) => ({ name: series.name, type: 'line', data: series.data, smooth: true, symbolSize: 7 })),
      };
    case 'area':
      return {
        ...base,
        xAxis: { ...categoryAxis, name: xlabel || undefined, nameTextStyle: { color: t.muted } },
        yAxis: { ...valueAxis, name: ylabel || undefined, nameTextStyle: { color: t.muted } },
        series: seriesList.map((series) => ({ name: series.name, type: 'line', data: series.data, areaStyle: { opacity: 0.28 }, smooth: true })),
      };
    case 'scatter':
      return {
        ...base,
        xAxis: { ...valueAxis, name: xlabel || undefined, nameTextStyle: { color: t.muted } },
        yAxis: { ...valueAxis, name: ylabel || undefined, nameTextStyle: { color: t.muted } },
        series: seriesList.map((series) => ({
          name: series.name,
          type: 'scatter',
          data: series.data.map((value, index) => [labels[index] ?? index, value]),
          symbolSize: 10,
        })),
      };
    case 'pie':
      return {
        ...base,
        legend: { bottom: 10, textStyle: { color: t.muted } },
        series: [{
          type: 'pie',
          radius: ['38%', '68%'],
          center: ['50%', '54%'],
          label: { color: t.muted, fontSize: 11 },
          data: (Array.isArray(data.values) ? data.values : []).map((value, index) => ({
            name: labels[index] ?? `#${index + 1}`,
            value,
          })),
        }],
      };
    case 'radar':
      return {
        ...base,
        radar: {
          indicator: labels.map((label) => ({ name: label, max: 100 })),
          axisName: { color: t.muted, fontSize: 11 },
          splitLine: { lineStyle: { color: t.axis } },
          splitArea: { show: false },
          axisLine: { lineStyle: { color: t.axis } },
        },
        series: [{
          type: 'radar',
          data: seriesList.map((series) => ({
            name: series.name,
            value: series.data.map((value) => Math.max(0, Math.min(100, value))),
            areaStyle: { opacity: 0.22 },
          })),
        }],
      };
    case 'heatmap': {
      const xLabels = Array.isArray(data.xLabels) ? data.xLabels : labels;
      const yLabels = (Array.isArray(data.heatmap) ? data.heatmap : seriesList).map((s) => s.name);
      const yData = Array.isArray(data.heatmap) && data.heatmap.length > 0 ? data.heatmap : seriesList;
      const allValues: number[] = [];
      const cellData: Array<[number, number, number]> = [];
      yData.forEach((row, yIdx) => {
        (row.data ?? []).forEach((value, xIdx) => {
          cellData.push([xIdx, yIdx, value]);
          allValues.push(value);
        });
      });
      const minVal = allValues.length ? Math.min(...allValues) : 0;
      const maxVal = allValues.length ? Math.max(...allValues) : 100;
      return {
        ...base,
        tooltip: { show: true, formatter: (p: { value: [number, number, number] }) => `${xLabels[p.value[0]] ?? ''} · ${yLabels[p.value[1]] ?? ''}: ${p.value[2]}` },
        grid: { left: 100, right: 60, top: 64, bottom: 80 },
        xAxis: {
          type: 'category',
          data: xLabels,
          axisLabel: { color: t.muted, fontSize: 11, rotate: xLabels.length > 6 ? 30 : 0 },
          splitArea: { show: false },
          axisLine: { lineStyle: { color: t.axis } },
        },
        yAxis: {
          type: 'category',
          data: yLabels,
          axisLabel: { color: t.muted, fontSize: 11 },
          splitArea: { show: false },
          axisLine: { lineStyle: { color: t.axis } },
        },
        visualMap: {
          min: minVal,
          max: maxVal,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: 10,
          textStyle: { color: t.muted, fontSize: 10 },
          inRange: { color: ['#0d1117', '#00e5a0', '#fbbf24', '#f87171'] },
        },
        series: [{
          type: 'heatmap',
          data: cellData,
          label: { show: cellData.length <= 80, color: t.text, fontSize: 10 },
          emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,0.5)' } },
        }],
      };
    }
  }
}

export function createChartTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'create_chart',
    description:
      'Create a data visualization chart as a downloadable PNG image: bar, line, pie, scatter, area, radar, or heatmap. Use bar for comparing drugs/lab values, line for trends over time, pie for proportions, scatter for correlations, radar for multi-axis profiles, heatmap for matrix data (e.g. symptom × disease likelihood, drug × side-effect frequency).',
    schema: z.object({
      chart_type: z.enum(['bar', 'line', 'pie', 'scatter', 'area', 'radar', 'heatmap']).describe('Chart type. Heatmap accepts data.heatmap rows + data.xLabels columns.'),
      data: z.string().min(8).max(100_000).describe('JSON: {"labels":["A","B"], "values":[1,2]} or {"labels":[...], "series":[{"name":"grp","data":[...]}]} or {"xLabels":["M","T","W"], "heatmap":[{"name":"drug-A","data":[1,4,2]},{"name":"drug-B","data":[2,1,5]}]}. Radar values are 0-100.'),
      title: z.string().min(2).max(120).describe('Chart title'),
      xlabel: z.string().max(60).optional().describe('X-axis label'),
      ylabel: z.string().max(60).optional().describe('Y-axis label'),
      theme: z.enum(['dark', 'light']).optional().describe('Color theme, default dark'),
      filename: z.string().max(80).optional().describe('File base name, default derived from title'),
    }),
    func: async ({ chart_type, data, title, xlabel, ylabel, theme = 'dark', filename }) => {
      try {
        let parsed: ChartData;
        try {
          const raw = JSON.parse(data) as ChartData;
          if (!raw || typeof raw !== 'object') throw new Error('data must be a JSON object');
          parsed = raw;
        } catch (parseError) {
          return JSON.stringify({ created: false, error: parseError instanceof Error ? `Invalid data: ${parseError.message}` : 'Invalid data' });
        }
        const hasValues = Array.isArray(parsed.values) && parsed.values.length > 0;
        const hasSeries = Array.isArray(parsed.series) && parsed.series.some((series) => Array.isArray(series.data) && series.data.length > 0);
        const hasHeatmap = Array.isArray(parsed.heatmap) && parsed.heatmap.some((row) => Array.isArray(row.data) && row.data.length > 0);
        if (!hasValues && !hasSeries && !hasHeatmap) {
          return JSON.stringify({ created: false, error: 'data must include values[], series[].data[], or heatmap[].data[]' });
        }

        const echarts = await import('echarts');
        const option = buildOption(chart_type, parsed, title, xlabel ?? '', ylabel ?? '', theme);
        // echarts SSR: init with no DOM container, render synchronously to SVG.
        const chart = echarts.init(null, null, { renderer: 'svg', ssr: true, width: 1000, height: 600 });
        try {
          chart.setOption(option);
          const svg = chart.renderToSVGString();
          const sharp = (await import('sharp')).default;
          const png = await sharp(Buffer.from(svg), { density: 144 }).png().toBuffer();
          const base = (filename ?? title).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60) || 'chart';
          const artifact = await saveBinaryArtifact({
            userId: ctx.userId,
            name: base,
            kind: 'chart',
            mimeType: 'image/png',
            buffer: png,
            meta: { title, chartType: chart_type, theme },
          });
          return JSON.stringify({
            created: true,
            artifact: {
              id: artifact.id,
              name: artifact.name,
              filename: `${base}.png`,
              downloadUrl: artifact.downloadUrl,
              previewUrl: artifact.url,
              mimeType: 'image/png',
              kind: 'chart',
            },
            note: 'Chart saved. Include the image in your final answer.',
          });
        } finally {
          chart.dispose();
        }
      } catch (error) {
        log.warn?.('create_chart failed:', error);
        return JSON.stringify({ created: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
