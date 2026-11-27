'use client';

/**
 * OfflineAIManager — settings card for the on-device AI engine.
 *
 * Auto-detects WebGPU on mount. Shows GPU models (web-llm) when WebGPU is
 * available, otherwise falls back to CPU models (wllama). Both backends
 * share the same UI surface — only the model list and labels change.
 *
 * Surfaces:
 *   - Backend badge: "WebGPU (GPU)" or "CPU only (WASM)"
 *   - Online/offline status
 *   - Model picker (catalog adapts to detected backend)
 *   - Download button with progress bar
 *   - Live status text
 *   - Test-prompt input
 *   - "How this works" explainer
 */

import { useState, useEffect } from 'react';
import { useOfflineAI } from './useOfflineAI';

// ── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ online }: { online: boolean }) {
  const color = online ? 'bg-emerald-500' : 'bg-amber-500';
  const label = online ? 'Online' : 'Offline';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${color}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      {label}
    </span>
  );
}

function BackendBadge({ backend }: { backend: 'gpu' | 'cpu' | null }) {
  if (!backend) {
    return (
      <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
        Detecting…
      </span>
    );
  }
  if (backend === 'gpu') {
    return (
      <span className="inline-block rounded bg-gradient-to-r from-fuchsia-100 to-violet-100 px-2 py-0.5 text-xs font-semibold text-fuchsia-700">
        ⚡ WebGPU (GPU)
      </span>
    );
  }
  return (
    <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
      🐢 CPU only (WASM)
    </span>
  );
}

function TierBadge({ tier }: { tier: 'tiny' | 'small' | 'medium' }) {
  const colors: Record<string, string> = {
    tiny: 'bg-blue-100 text-blue-700',
    small: 'bg-indigo-100 text-indigo-700',
    medium: 'bg-purple-100 text-purple-700',
  };
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${colors[tier]}`}
    >
      {tier}
    </span>
  );
}

function DomainBadge({ domain }: { domain?: 'general' | 'medical' }) {
  if (domain === 'medical') {
    return (
      <span className="inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
        Medical
      </span>
    );
  }
  return null;
}

function DraftBadge({ hasDraft }: { hasDraft?: boolean }) {
  if (!hasDraft) return null;
  return (
    <span
      title="Uses speculative decoding (draft model) for ~2× speed"
      className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700"
    >
      ⚡ Draft
    </span>
  );
}

function ModelRow({
  id,
  name,
  description,
  sizeMb,
  tokPerSec,
  tier,
  domain,
  hasDraft,
  selected,
  disabled,
  onSelect,
}: {
  id: string;
  name: string;
  description: string;
  sizeMb: number;
  tokPerSec: number;
  tier: 'tiny' | 'small' | 'medium';
  domain?: 'general' | 'medical';
  hasDraft?: boolean;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left rounded-lg border p-3 transition-colors ${
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-slate-900">{name}</span>
          <TierBadge tier={tier} />
          <DomainBadge domain={domain} />
          <DraftBadge hasDraft={hasDraft} />
        </div>
        <div className="text-xs text-slate-500">
          ~{sizeMb} MB · ~{tokPerSec} tok/s
        </div>
      </div>
      <p className="mt-1 text-xs text-slate-600">{description}</p>
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export function OfflineAIManager() {
  const {
    models,
    backend,
    selectedModel,
    isReady,
    status,
    downloadProgress,
    statusText,
    isOnline,
    selectModel,
    download,
    chat,
  } = useOfflineAI();

  const [testInput, setTestInput] = useState('What is the function of the mitral valve?');
  const [testOutput, setTestOutput] = useState('');
  const [testRunning, setTestRunning] = useState(false);

  // RAG index management state
  const [ragCount, setRagCount] = useState<number | null>(null);
  const [ragIndexing, setRagIndexing] = useState(false);
  const [ragProgress, setRagProgress] = useState<{ done: number; total: number } | null>(null);
  const [ragStatus, setRagStatus] = useState<string>('');

  const refreshRagCount = async () => {
    try {
      const { countChunks } = await import('@/lib/offline-ai/rag');
      const c = await countChunks();
      setRagCount(c);
    } catch {
      setRagCount(null);
    }
  };

  // Refresh chunk count on mount
  useEffect(() => {
    refreshRagCount();
  }, []);

  const handleIndexQuestionBank = async () => {
    setRagIndexing(true);
    setRagStatus('Fetching question bank…');
    setRagProgress(null);
    try {
      const { indexChunks } = await import('@/lib/offline-ai/rag');
      // Fetch the user's question bank (questions they've created or that are
      // shared with them). Limit to 500 chunks to keep the initial index
      // reasonable — the user can re-index later if needed.
      const res = await fetch('/api/bank?limit=500', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error(`Failed to fetch qbank: ${res.status}`);
      const data = await res.json();
      const questions = (data.questions || data || []) as Array<{
        id: string;
        question?: string;
        stem?: string;
        options?: string[];
        explanation?: string;
        topic?: string;
        category?: string;
      }>;
      if (questions.length === 0) {
        setRagStatus('No questions found in your bank.');
        return;
      }
      setRagStatus(`Embedding ${questions.length} questions…`);
      const chunks = questions.map((q) => {
        const stem = q.question || q.stem || '';
        const opts = q.options ? `\nOptions: ${q.options.join(' | ')}` : '';
        const expl = q.explanation ? `\nExplanation: ${q.explanation}` : '';
        const topic = q.topic || q.category || '';
        return {
          id: `qbank:${q.id}`,
          source: 'qbank',
          text: `${stem}${opts}${expl}`,
          title: topic ? `Question: ${topic}` : 'Question',
          tags: topic ? [topic] : undefined,
        };
      });
      const result = await indexChunks(chunks, (done, total) => {
        setRagProgress({ done, total });
      });
      setRagStatus(`Indexed ${result.indexed} questions.`);
      await refreshRagCount();
    } catch (err) {
      setRagStatus(`Indexing failed: ${err instanceof Error ? err.message : 'unknown error'}`);
    } finally {
      setRagIndexing(false);
      setRagProgress(null);
    }
  };

  const handleClearRag = async () => {
    setRagIndexing(true);
    setRagStatus('Clearing RAG index…');
    try {
      const { clearAll } = await import('@/lib/offline-ai/rag');
      await clearAll();
      setRagStatus('RAG index cleared.');
      await refreshRagCount();
    } catch (err) {
      setRagStatus(`Clear failed: ${err instanceof Error ? err.message : 'unknown error'}`);
    } finally {
      setRagIndexing(false);
    }
  };

  const handleTest = async () => {
    if (!isReady || !testInput.trim()) return;
    setTestRunning(true);
    setTestOutput('');
    try {
      await chat(
        [
          {
            role: 'system',
            content:
              'You are MedQ Offline, a study assistant for medical students. Be concise. Answer in 2-3 sentences.',
          },
          { role: 'user', content: testInput },
        ],
        {
          maxTokens: 200,
          onToken: (chunk) => setTestOutput((prev) => prev + chunk),
        },
      );
    } catch (err) {
      setTestOutput(
        `Error: ${err instanceof Error ? err.message : 'unknown error'}`,
      );
    } finally {
      setTestRunning(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Offline AI Engine
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Optional: install a small medical assistant model to keep AI features
            working when you're offline. Auto-detects GPU for 10–50× speedup.
            Nothing downloads until you pick a model and click "Download".
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge online={isOnline} />
          <BackendBadge backend={backend} />
        </div>
      </div>

      {/* Backend explainer when GPU is detected */}
      {backend === 'gpu' && (
        <div className="mb-4 rounded-md bg-fuchsia-50 border border-fuchsia-200 p-2.5 text-xs text-fuchsia-900">
          <strong>GPU detected.</strong> Showing WebGPU-optimized models (web-llm).
          These run on your GPU and are 10–50× faster than CPU models of the same size.
        </div>
      )}
      {backend === 'cpu' && (
        <div className="mb-4 rounded-md bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-700">
          <strong>No WebGPU detected.</strong> Showing CPU models (wllama, WASM).
          These work on any device but are slower. To enable GPU acceleration,
          use a WebGPU-capable browser (Chrome 113+, Edge 113+, Safari 17+).
        </div>
      )}

      {/* Model picker (shown only after backend detection completes) */}
      {backend && (
        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Choose a model {backend === 'gpu' ? '(WebGPU)' : '(CPU/WASM)'}
          </label>
          {!selectedModel && (
            <div className="rounded-md bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900">
              <strong>No model selected.</strong> Pick a model below, then click
              "Download" to install it. Models are 400 MB – 2.6 GB and are cached
              in your browser for offline use. Nothing is downloaded until you
              explicitly click the button.
            </div>
          )}
          {models.map((m) => (
            <ModelRow
              key={m.id}
              id={m.id}
              name={m.name}
              description={m.description}
              sizeMb={m.sizeMb}
              tokPerSec={m.tokPerSec}
              tier={m.tier}
              domain={(m as { domain?: 'general' | 'medical' }).domain}
              hasDraft={!!(m as { draftModel?: unknown }).draftModel}
              selected={selectedModel?.id === m.id}
              disabled={status === 'downloading' || status === 'loading'}
              onSelect={() => selectModel(m.id)}
            />
          ))}
        </div>
      )}

      {/* Download button + progress */}
      {selectedModel && (
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 mb-4">
          {status === 'idle' && !isReady && (
            <button
              type="button"
              onClick={() => download()}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Download {selectedModel.name} (~{selectedModel.sizeMb} MB)
            </button>
          )}

          {(status === 'downloading' || status === 'loading') && (
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>{statusText}</span>
                <span>{Math.round(downloadProgress * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${Math.max(2, downloadProgress * 100)}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                {status === 'downloading'
                  ? 'Downloading model file… (cached for future use)'
                  : backend === 'gpu'
                    ? 'Compiling shaders + uploading to GPU memory…'
                    : 'Loading model into memory…'}
              </p>
            </div>
          )}

          {status === 'failed' && (
            <div>
              <p className="text-sm text-red-700 mb-2">{statusText}</p>
              <button
                type="button"
                onClick={() => download()}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Retry
              </button>
            </div>
          )}

          {isReady && (
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-medium">{selectedModel.name} ready</span>
              <span className="text-slate-500 text-xs">
                · {backend === 'gpu' ? 'GPU' : 'CPU'} backend
                · {isOnline ? 'Will work offline once disconnected' : 'Running offline now'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Test prompt */}
      {isReady && (
        <div className="rounded-lg border border-slate-200 p-3">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5 block">
            Test the model
          </label>
          <textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            disabled={testRunning}
            rows={2}
            className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleTest}
            disabled={testRunning || !testInput.trim()}
            className="mt-2 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {testRunning ? 'Generating…' : 'Run test'}
          </button>
          {testOutput && (
            <div className="mt-2 rounded-md bg-slate-50 p-2.5 text-sm text-slate-800 whitespace-pre-wrap">
              {testOutput}
            </div>
          )}
        </div>
      )}

      {/* RAG index management */}
      <div className="mt-4 rounded-lg border border-slate-200 p-3">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Knowledge Base (RAG)
          </label>
          <span className="text-xs text-slate-500">
            {ragCount !== null ? `${ragCount} chunks indexed` : 'Loading…'}
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
          Build a local vector index of your question bank. When offline, the AI
          retrieves relevant chunks before answering — dramatically improving
          accuracy on medical Q&amp;A. Uses{' '}
          <code className="bg-slate-100 px-1 rounded">all-MiniLM-L6-v2</code>{' '}
          (~23 MB, downloaded once).
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleIndexQuestionBank}
            disabled={ragIndexing}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {ragIndexing ? 'Indexing…' : 'Index Question Bank'}
          </button>
          {ragCount !== null && ragCount > 0 && (
            <button
              type="button"
              onClick={handleClearRag}
              disabled={ragIndexing}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Clear Index
            </button>
          )}
        </div>
        {ragProgress && (
          <div className="mt-2">
            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{
                  width: `${ragProgress.total > 0 ? (ragProgress.done / ragProgress.total) * 100 : 0}%`,
                }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {ragProgress.done} / {ragProgress.total} chunks embedded
            </p>
          </div>
        )}
        {ragStatus && (
          <p className="mt-2 text-xs text-slate-700">{ragStatus}</p>
        )}
      </div>

      {/* Explainer */}
      <details className="mt-4 text-xs text-slate-600">
        <summary className="cursor-pointer font-medium text-slate-700">
          How this works
        </summary>
        <div className="mt-2 space-y-1.5 leading-relaxed">
          <p>
            • <strong>Opt-in only.</strong> No model is downloaded until you
            pick one from the list above and click "Download". You can ignore
            this section entirely if you don't need offline AI.
          </p>
          <p>
            • The app probes for <strong>WebGPU</strong> on first load.
            If available (Chrome 113+, Edge 113+, Safari 17+), it uses{' '}
            <code className="bg-slate-100 px-1 rounded">web-llm</code> to run
            models on the GPU — 10–50× faster than CPU.
          </p>
          <p>
            • If no GPU is available, it falls back to{' '}
            <code className="bg-slate-100 px-1 rounded">wllama</code> — a
            WebAssembly port of llama.cpp that runs on pure CPU.
          </p>
          <p>
            • The model file (400 MB – 2.6 GB depending on size) is downloaded
            once and cached in your browser for future offline use. You can
            switch models at any time — the old one is unloaded and the new
            one is downloaded on demand.
          </p>
          <p>
            • When you go offline AND a model is loaded, the app automatically
            routes AI requests (chat, exam generation, term lookup, performance
            analysis) to this local model and shows a "less accurate" warning
            banner. If no model is loaded, AI features simply won't work
            offline.
          </p>
          <p>
            • On GPU: try <strong>Llama 3.2 3B</strong> or{' '}
            <strong>Qwen2.5 3B</strong> for best quality (~25–30 tok/s).
            On CPU: stick with <strong>Qwen2.5 0.5B</strong> (~8 tok/s).
          </p>
        </div>
      </details>
    </div>
  );
}

export default OfflineAIManager;
