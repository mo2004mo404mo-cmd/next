'use client';

/**
 * SharedQuestionCard — renders a question shared into a chat room as an
 * INTERACTIVE, self-contained card with its media intact:
 *
 *   - ECG strips / images display inline
 *   - audio recordings play inline (native player)
 *   - 3D models / videos link out to the interactive viewer
 *   - lab panels render as a compact table
 *   - recipients can answer the question right in the chat
 */

import { useMemo, useState } from 'react';
import { Activity, Play, Box, Video, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

export interface SharedQuestionPayload {
  questionId: string;
  type: string;
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  system: string;
  topic: string;
  difficulty: string;
  isAIGenerated?: boolean;
  reviewStatus?: string;
  blueprintOrgan?: string;
  media?: {
    isEcg?: boolean;
    imageUrl?: string;
    audioUrl?: string;
    videoUrl?: string;
    modelUrl?: string;
  };
  labPanel?: string;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export default function SharedQuestionCard({ payload, isOwn }: { payload: SharedQuestionPayload; isOwn?: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const options = useMemo(
    () => (Array.isArray(payload.options) ? payload.options : []).map((o) => String(o)),
    [payload.options],
  );

  const labPanels = useMemo<{ name: string; rows: Array<{ test: string; value: string; unit: string; flag: string }> }[]>(() => {
    if (!payload.labPanel) return [];
    try {
      const parsed = JSON.parse(payload.labPanel);
      return Array.isArray(parsed) ? parsed.filter((p) => p && p.rows?.length) : [];
    } catch {
      return [];
    }
  }, [payload.labPanel]);

  const plainText = useMemo(() => stripHtml(payload.text || ''), [payload.text]);
  const isCorrect = (opt: string) => {
    const norm = (s: string) => stripHtml(s).replace(/\s+/g, ' ').trim().toLowerCase();
    const a = norm(payload.answer || '');
    const o = norm(opt);
    return o === a || (a.length > 3 && o.startsWith(a)) || (o.length > 3 && a.startsWith(o));
  };

  const m = payload.media || {};
  const preview = plainText.length > 260 && !expanded ? `${plainText.slice(0, 260)}…` : plainText;

  return (
    <div
      className="px-3 py-3 min-w-[260px] max-w-[340px]"
      style={{
        background: isOwn ? 'linear-gradient(135deg, rgba(0,229,160,0.12), rgba(0,229,160,0.05))' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isOwn ? 'rgba(0,229,160,0.2)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 14,
      }}
    >
      {/* header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,229,160,0.12)', border: '1px solid rgba(0,229,160,0.25)' }}>
          <Activity className="w-4 h-4 text-[#00e5a0]" />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-bold text-[#e8ecf4] truncate">
            {payload.system || 'Medical'} question
          </p>
          <p className="text-[10px] text-[#5a6478]">
            {payload.difficulty || 'Moderate'} · {payload.type === 'tf' ? 'True/False' : payload.type === 'short' ? 'Short answer' : 'MCQ'}
            {payload.reviewStatus === 'approved' ? ' · ✓ reviewed' : ''}
            {payload.blueprintOrgan ? ` · ${payload.blueprintOrgan}` : ''}
          </p>
        </div>
      </div>

      {/* media: ECG / image */}
      {m.imageUrl && (
        <div className="mb-2 rounded-lg overflow-hidden border border-white/10 bg-white">
          <img src={m.imageUrl} alt={m.isEcg ? 'ECG rhythm strip' : 'Question image'} className="w-full block" style={{ maxHeight: 160, objectFit: 'contain' }} />
        </div>
      )}

      {/* media: audio — plays inline */}
      {m.audioUrl && (
        <div className="mb-2">
          <audio controls src={m.audioUrl} preload="metadata" className="w-full h-8">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* lab panel */}
      {labPanels.length > 0 && (
        <div className="mb-2 rounded-lg border border-white/10 overflow-hidden">
          {labPanels.slice(0, 1).map((panel, pi) => (
            <div key={pi}>
              <p className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#7cc7ff] bg-white/[0.04]">{panel.name}</p>
              <table className="w-full text-[10px]">
                <tbody>
                  {panel.rows.slice(0, 5).map((row, ri) => (
                    <tr key={ri} className="border-t border-white/[0.05]">
                      <td className="px-2 py-0.5 text-[#e8ecf4]">{row.test}</td>
                      <td className="px-2 py-0.5 text-right font-mono font-bold text-[#e8ecf4]">{row.value}</td>
                      <td className="px-2 py-0.5 text-[#8b95a8] w-12">{row.unit}</td>
                      <td className="px-1.5 py-0.5 text-center w-7">
                        {row.flag === 'H' ? <span className="text-[#ff8a8a] font-bold">H</span> : row.flag === 'L' ? <span className="text-[#7cc7ff] font-bold">L</span> : <span className="text-[#3a4055]">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* stem */}
      <p className="text-[12px] leading-relaxed text-[#e8ecf4] mb-2.5 whitespace-pre-line">
        {preview}
        {plainText.length > 260 && (
          <button type="button" onClick={() => setExpanded((e) => !e)} className="ml-1 text-[10px] text-[#00e5a0] underline underline-offset-2">
            {expanded ? 'less' : 'more'}
          </button>
        )}
      </p>

      {/* options — answerable in chat */}
      {options.length > 0 && (
        <div className="space-y-1.5 mb-2">
          {options.map((opt, i) => {
            const state = revealed ? (isCorrect(opt) ? 'correct' : selected && stripHtml(opt).trim().toLowerCase() === stripHtml(selected).trim().toLowerCase() ? 'wrong' : 'dimmed') : selected === opt ? 'selected' : null;
            return (
              <button
                key={i}
                type="button"
                disabled={revealed}
                onClick={() => { setSelected(opt); setRevealed(true); }}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] text-left border transition-all ${
                  state === 'correct'
                    ? 'bg-[#00e5a0]/[0.15] border-[#00e5a0]/50 text-[#00e5a0] font-bold'
                    : state === 'wrong'
                      ? 'bg-[#ff5757]/[0.12] border-[#ff5757]/40 text-[#ff8a8a]'
                      : state === 'selected'
                        ? 'bg-[#4fc3f7]/[0.12] border-[#4fc3f7]/50 text-[#7cc7ff]'
                        : state === 'dimmed'
                          ? 'bg-white/[0.02] border-white/[0.05] text-[#5a6478]'
                          : 'bg-white/[0.03] border-white/[0.08] text-[#e8ecf4] hover:border-[#00e5a0]/40 cursor-pointer'
                }`}
              >
                <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[8px] font-bold flex-shrink-0 ${state === 'correct' ? 'bg-[#00e5a0]/25 text-[#00e5a0]' : 'bg-white/[0.08] text-[#8b95a8]'}`}>
                  {LETTERS[i]}
                </span>
                <span className="flex-1 truncate">{stripHtml(opt)}</span>
                {state === 'correct' && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />}
                {state === 'wrong' && <XCircle className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* reveal: answer + explanation */}
      {revealed && (
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2 mb-2">
          <p className="text-[10px] font-bold text-[#00e5a0] mb-1 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> Answer: {stripHtml(payload.answer)}
          </p>
          {payload.explanation && (
            <p className="text-[10px] leading-relaxed text-[#8b95a8]">
              {stripHtml(payload.explanation).replace(/\s+/g, ' ').slice(0, 220)}
              {stripHtml(payload.explanation).length > 220 ? '…' : ''}
            </p>
          )}
        </div>
      )}

      {/* media links that open outside the bubble */}
      {(m.modelUrl || m.videoUrl) && (
        <div className="flex gap-2 flex-wrap">
          {m.modelUrl && (
            <a href={m.modelUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/25 hover:bg-[#00e5a0]/20">
              <Box className="w-3 h-3" /> Open 3D model
            </a>
          )}
          {m.videoUrl && (
            <a href={m.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-[#ff5757]/10 text-[#ff8a8a] border border-[#ff5757]/25 hover:bg-[#ff5757]/20">
              <Video className="w-3 h-3" /> Watch video
            </a>
          )}
        </div>
      )}

      <p className="mt-2 text-[9px] text-[#3a4055] flex items-center gap-1">
        <Play className="w-2.5 h-2.5" /> Interactive question card — shared via MedQ
      </p>
    </div>
  );
}
