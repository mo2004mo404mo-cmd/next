'use client';

/**
 * Reusable UI sub-components for the exam simulator:
 *   • VoicePanel      — mic button + transcript display + TTS controls
 *   • QuestionPicker  — search/filter/select UI for setup
 *   • InstantFeedbackPanel — shows correct/incorrect + explanation inline
 *
 * Used by both /exam-sim/page.tsx and ExamSimulatorTab.tsx.
 */

import { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle, CheckCircle2, ChevronRight, Headphones, Loader2, Mic, MicOff,
  Pause, Play, Plus, Search, Settings as SettingsIcon, Square, Trash2, Volume2, X, XCircle,
} from 'lucide-react';
import { MEDICAL_SYSTEMS } from '@/lib/medq-types';
import {
  ASR_SUPPORTED, TTS_SUPPORTED, indexToLetter, letterToIndex, matchLetter,
  stripHtml, useQuestionPicker, useSpeech, useSpeechRecognition, useVoiceSettings,
  type PickerQuestion, type VoiceSettings,
} from './shared';

// ── VoicePanel ──

interface VoicePanelProps {
  voiceMode: boolean;
  voiceSettings: VoiceSettings;
  setVoiceSettings: (s: VoiceSettings | ((p: VoiceSettings) => VoiceSettings)) => void;
  voices: SpeechSynthesisVoice[];
  questionText: string;
  options: string[];
  selectedLetter: string | undefined;
  onLetterSelected: (letter: string) => void;
  onTranscript: (transcript: string) => void;
  answerMode: 'mcq' | 'open';
  spokenText: string;
  setSpokenText: (s: string) => void;
  onOpenAnswerChange: (text: string) => void;
}

export function VoicePanel({
  voiceMode, voiceSettings, setVoiceSettings, voices,
  questionText, options, selectedLetter, onLetterSelected, onTranscript,
  answerMode, spokenText, setSpokenText, onOpenAnswerChange,
}: VoicePanelProps) {
  const { isSpeaking, isPaused, speak, stop, togglePause } = useSpeech(voiceSettings, voices);
  const { isRecording, interim, start, stop: stopRec } = useSpeechRecognition((transcript) => {
    onTranscript(transcript);
    setSpokenText(transcript);
    if (answerMode === 'mcq') {
      const letter = matchLetter(transcript);
      if (letter) {
        onLetterSelected(letter);
      }
    } else {
      onOpenAnswerChange(transcript);
    }
  });

  if (!voiceMode) return null;

  const fullText = `${stripHtml(questionText)}. ${options.map((o, i) => `Option ${indexToLetter(i)}: ${stripHtml(o)}`).join('. ')}`;

  return (
    <div className="mt-4 rounded-2xl border border-[#4fc3f7]/20 bg-[#4fc3f7]/[0.04] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Headphones className="w-4 h-4 text-[#4fc3f7]" />
        <h3 className="text-xs font-bold text-[#4fc3f7] uppercase tracking-wider">Voice mode</h3>
        {!TTS_SUPPORTED && <span className="text-[10px] text-amber-400">(TTS unavailable)</span>}
        {!ASR_SUPPORTED && <span className="text-[10px] text-amber-400">(mic unavailable)</span>}
      </div>

      {/* TTS controls */}
      {TTS_SUPPORTED && (
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => speak(fullText)}
            disabled={isSpeaking && !isPaused}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#4fc3f7]/15 text-[#4fc3f7] hover:bg-[#4fc3f7]/25 disabled:opacity-50"
          >
            <Volume2 className="w-3.5 h-3.5" /> Read aloud
          </button>
          {isSpeaking && (
            <button
              type="button"
              onClick={togglePause}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-white/5 text-[#e8ecf4] hover:bg-white/10"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          )}
          {isSpeaking && (
            <button
              type="button"
              onClick={stop}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs bg-white/5 text-[#e8ecf4] hover:bg-white/10"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[10px] text-[#5a6478] ml-auto">
            {isSpeaking ? (isPaused ? 'paused' : 'speaking…') : ''}
          </span>
        </div>
      )}

      {/* Mic */}
      <div className="flex flex-col items-center py-3">
        {!ASR_SUPPORTED ? (
          <div className="text-center text-[10px] text-[#5a6478]">
            <MicOff className="w-8 h-8 mx-auto mb-1 opacity-50" />
            Voice input needs Chrome, Edge, or Safari.
          </div>
        ) : (
          <button
            type="button"
            onClick={isRecording ? stopRec : start}
            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-red-500/30 text-red-300 ring-4 ring-red-500/40 animate-pulse'
                : 'bg-[#4fc3f7]/20 text-[#4fc3f7] hover:bg-[#4fc3f7]/30'
            }`}
            title={isRecording ? 'Stop' : 'Speak your answer'}
          >
            {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            {isRecording && (
              <span className="absolute inset-0 rounded-full border-2 border-red-400/60 animate-ping" />
            )}
          </button>
        )}
        <div className="mt-2 text-[10px] text-[#5a6478]">
          {isRecording ? 'Listening… tap to stop' : ASR_SUPPORTED ? (answerMode === 'mcq' ? 'Say "B" / "option C" / "second one"' : 'Tap to speak your answer') : ''}
        </div>
      </div>

      {/* Interim / captured transcript */}
      {(interim || spokenText) && (
        <div className="mt-2 p-2.5 rounded-lg bg-[#0a0e1a] border border-white/5">
          <div className="text-[10px] text-[#5a6478] uppercase tracking-wider mb-0.5">
            {interim ? 'Hearing…' : 'Last captured'}
          </div>
          <div className="text-xs text-[#e8ecf4]">{interim || spokenText}</div>
        </div>
      )}

      {/* Selected answer display (MCQ) */}
      {answerMode === 'mcq' && selectedLetter && (
        <div className="mt-2 p-2.5 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/30 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#4fc3f7] text-[#0a0e1a] flex items-center justify-center text-xs font-bold">
            {selectedLetter}
          </span>
          <span className="text-xs text-[#e8ecf4]">
            {options[letterToIndex(selectedLetter)] || '(no matching option)'}
          </span>
        </div>
      )}

      {/* Open mode transcript editor */}
      {answerMode === 'open' && (
        <textarea
          value={spokenText}
          onChange={(e) => {
            setSpokenText(e.target.value);
            onOpenAnswerChange(e.target.value);
          }}
          placeholder="Your spoken answer will appear here. You can also type to edit."
          className="mt-2 w-full p-2.5 rounded-lg bg-[#0a0e1a] border border-white/10 text-[#e8ecf4] text-xs min-h-20 resize-y focus:outline-none focus:border-[#4fc3f7]"
        />
      )}

      {/* Inline voice settings */}
      <details className="mt-3">
        <summary className="text-[10px] text-[#5a6478] cursor-pointer hover:text-[#e8ecf4] flex items-center gap-1">
          <SettingsIcon className="w-3 h-3" /> Voice settings
        </summary>
        <div className="mt-2 p-3 rounded-lg bg-[#0a0e1a] border border-white/5 space-y-3">
          <div>
            <label className="text-[10px] text-[#5a6478] block mb-1">Voice</label>
            <select
              value={voiceSettings.voiceURI || ''}
              onChange={(e) => setVoiceSettings((s) => ({ ...s, voiceURI: e.target.value || null }))}
              className="w-full p-1.5 rounded-md bg-white/5 border border-white/10 text-[#e8ecf4] text-xs"
            >
              <option value="">Default</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-[#5a6478] block mb-1">Speed: {voiceSettings.rate.toFixed(2)}×</label>
            <input
              type="range" min={0.5} max={2} step={0.05}
              value={voiceSettings.rate}
              onChange={(e) => setVoiceSettings((s) => ({ ...s, rate: parseFloat(e.target.value) }))}
              className="w-full accent-[#4fc3f7]"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#5a6478] block mb-1">Pitch: {voiceSettings.pitch.toFixed(2)}</label>
            <input
              type="range" min={0} max={2} step={0.1}
              value={voiceSettings.pitch}
              onChange={(e) => setVoiceSettings((s) => ({ ...s, pitch: parseFloat(e.target.value) }))}
              className="w-full accent-[#4fc3f7]"
            />
          </div>
        </div>
      </details>
    </div>
  );
}

// ── QuestionPicker ──

interface QuestionPickerProps {
  picker: ReturnType<typeof useQuestionPicker>;
}

export function QuestionPicker({ picker }: QuestionPickerProps) {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0a0e1a] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-[#e8ecf4] uppercase tracking-wider">Pick questions</h4>
        {picker.selectedCount > 0 && (
          <button
            type="button"
            onClick={picker.clear}
            className="text-[10px] text-[#ff8a8a] hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Clear ({picker.selectedCount})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          value={picker.query}
          onChange={(e) => picker.setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { picker.search(); setShowResults(true); } }}
          placeholder="Search question text…"
          className="sm:col-span-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-[#e8ecf4] focus:outline-none focus:border-[#4fc3f7]"
        />
        <select
          value={picker.system}
          onChange={(e) => picker.setSystem(e.target.value)}
          className="px-2 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-[#e8ecf4]"
        >
          <option value="all">All systems</option>
          {MEDICAL_SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          type="button"
          onClick={() => { picker.search(); setShowResults(true); }}
          disabled={picker.loading}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#4fc3f7]/15 text-[#4fc3f7] text-xs font-bold hover:bg-[#4fc3f7]/25 disabled:opacity-50"
        >
          {picker.loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
          Search
        </button>
      </div>

      {/* Selected count summary */}
      {picker.selectedCount > 0 && (
        <div className="text-[11px] text-[#00e5a0] font-semibold">
          ✓ {picker.selectedCount} question{picker.selectedCount !== 1 ? 's' : ''} selected — these will be used instead of random sampling
        </div>
      )}

      {/* Search results */}
      {showResults && (
        <div className="rounded-lg border border-white/[0.06] bg-[#0a0e1a] overflow-hidden">
          {picker.loading ? (
            <div className="p-4 text-center text-xs text-[#5a6478]">
              <Loader2 className="w-4 h-4 animate-spin mx-auto mb-1" /> Searching…
            </div>
          ) : picker.results.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#5a6478]">
              {picker.searched ? 'No questions match your filters.' : 'Click Search to find questions.'}
            </div>
          ) : (
            <>
              {/* Bulk-select toolbar — sticky at the top of the scroll area */}
              {(() => {
                const visibleIds = picker.results.map((q) => q.id);
                const allSelected = visibleIds.every((id) => picker.selected.has(id));
                const someSelected = visibleIds.some((id) => picker.selected.has(id));
                return (
                  <div className="sticky top-0 z-10 flex items-center gap-2 px-3 py-2 bg-[#151821] border-b border-white/[0.06] text-xs">
                    <button
                      type="button"
                      onClick={() => allSelected ? picker.deselectAll(visibleIds) : picker.selectAll(visibleIds)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold transition-all ${
                        allSelected
                          ? 'bg-[#ff5757]/15 text-[#ff8a8a] hover:bg-[#ff5757]/25'
                          : 'bg-[#00e5a0]/15 text-[#00e5a0] hover:bg-[#00e5a0]/25'
                      }`}
                      title={allSelected ? 'Deselect all visible results' : 'Select all visible results'}
                    >
                      {allSelected ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {allSelected ? 'Deselect all' : 'Select all'} ({visibleIds.length})
                    </button>
                    <span className="text-[#5a6478] text-[10px]">
                      {someSelected && !allSelected
                        ? `${visibleIds.filter((id) => picker.selected.has(id)).length} of ${visibleIds.length} visible selected`
                        : `· ${picker.selectedCount} total selected`}
                    </span>
                  </div>
                );
              })()}
              <div className="max-h-72 overflow-y-auto divide-y divide-white/[0.04]">
                {picker.results.map((q) => (
                  <PickerRow
                    key={q.id}
                    q={q}
                    selected={picker.selected.has(q.id)}
                    onToggle={() => picker.toggle(q.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function PickerRow({ q, selected, onToggle }: { q: PickerQuestion; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full text-left p-3 hover:bg-white/[0.03] transition-all flex items-start gap-2 ${
        selected ? 'bg-[#00e5a0]/[0.06]' : ''
      }`}
    >
      <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
        selected ? 'bg-[#00e5a0] border-[#00e5a0] text-[#0a0e1a]' : 'border-white/20 text-transparent'
      }`}>
        {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#e8ecf4] line-clamp-2">{q.text || '(empty question text)'}</p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1">
          {q.system && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#4fc3f7]/15 text-[#4fc3f7]">{q.system}</span>}
          {q.topic && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#8b95a8]">{q.topic}</span>}
          {q.difficulty && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#8b95a8]">{q.difficulty}</span>}
          <span className="text-[9px] text-[#5a6478]">{q.optionsCount} options</span>
          {q.isAIGenerated && <span className="text-[9px] text-[#a78bfa]">AI</span>}
        </div>
      </div>
    </button>
  );
}

// ── InstantFeedbackPanel ──

interface InstantFeedbackPanelProps {
  feedback?: {
    correct: boolean;
    blank: boolean;
    correctAnswer: string;
    explanation: string;
    clinicalPearl?: string;
    mnemonic?: string;
    selectedAnswer: string;
  };
  checking: boolean;
  onNext: () => void;
  isLast: boolean;
}

export function InstantFeedbackPanel({ feedback, checking, onNext, isLast }: InstantFeedbackPanelProps) {
  if (checking) {
    return (
      <div className="mt-4 p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#4fc3f7]" />
        <span className="text-xs text-[#8b95a8]">Checking your answer…</span>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className={`mt-4 rounded-xl border p-4 ${
      feedback.correct
        ? 'border-[#00e5a0]/40 bg-[#00e5a0]/[0.06]'
        : 'border-[#ff5757]/40 bg-[#ff5757]/[0.06]'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {feedback.correct ? (
          <CheckCircle2 className="w-5 h-5 text-[#00e5a0]" />
        ) : (
          <XCircle className="w-5 h-5 text-[#ff5757]" />
        )}
        <h4 className={`text-sm font-bold ${feedback.correct ? 'text-[#00e5a0]' : 'text-[#ff8a8a]'}`}>
          {feedback.correct ? 'Correct!' : feedback.blank ? 'No answer' : 'Not quite'}
        </h4>
      </div>

      {!feedback.correct && (
        <p className="text-xs text-[#8b95a8] mb-2">
          Correct answer: <span className="text-[#00e5a0] font-bold">{feedback.correctAnswer}</span>
        </p>
      )}

      {feedback.explanation && (
        <div className="text-xs text-[#e8ecf4] leading-relaxed whitespace-pre-wrap mb-2">
          {feedback.explanation}
        </div>
      )}

      {feedback.clinicalPearl && (
        <div className="text-[11px] text-[#f59e0b] mt-2 p-2 rounded-lg bg-[#f59e0b]/[0.06] border border-[#f59e0b]/20">
          <span className="font-bold">Clinical pearl: </span>{feedback.clinicalPearl}
        </div>
      )}

      {feedback.mnemonic && (
        <div className="text-[11px] text-[#a78bfa] mt-2 p-2 rounded-lg bg-[#a78bfa]/[0.06] border border-[#a78bfa]/20">
          <span className="font-bold">Mnemonic: </span>{feedback.mnemonic}
        </div>
      )}

      <button
        type="button"
        onClick={onNext}
        className="mt-3 w-full py-2 rounded-lg text-xs font-bold bg-[#4fc3f7] text-[#0a0e1a] hover:bg-[#4fc3f7]/90 flex items-center justify-center gap-1.5"
      >
        {isLast ? 'Finish & see report' : 'Next question'} <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
