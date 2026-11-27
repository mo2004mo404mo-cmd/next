'use client';

/**
 * AiModelsGuide — the "how models & providers work" explainer.
 *
 * WHY THIS EXISTS: MedQ has TWO places to add AI capacity, and both have
 * providers, custom endpoints, models and custom models — which reads as
 * four overlapping concepts unless the two layers are told apart first:
 *
 *   1. AI Providers (Settings → AI Providers)  — your DIRECT keys.
 *      One key/endpoint, one provider, MedQ calls it straight.
 *   2. MedQ AI Router (sidebar tab)            — a POOL of many provider
 *      keys + custom endpoints behind one unified key, with routing and
 *      failover. "Link with MedQ" makes its whole model list appear in
 *      every MedQ picker as  medq-router:<model>.
 *
 * This dialog gives: the mental model, a "where do I add what" decision
 * list, the glossary of the four words, and the not-visible troubleshooting
 * path. Mounted from BOTH entry points (AI Providers hub header, AI Router
 * tab header) so the same explanation lives everywhere.
 */

import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Link2,
  Search,
  Server,
  Wrench,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';

export function AiModelsGuideButton({
  variant = 'chip',
  label = 'Guide',
}: {
  variant?: 'chip' | 'icon';
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {variant === 'chip' ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-[11px] font-medium text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white"
          title="How providers, models and the AI Router work"
        >
          <HelpCircle className="size-3.5" />
          {label}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
          title="How providers, models and the AI Router work"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      )}
      <AiModelsGuideDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function AiModelsGuideDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/[0.06] px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-sm font-bold text-[#e8ecf4]">
            <HelpCircle className="size-4 text-[#00e5a0]" />
            How models &amp; providers work
          </DialogTitle>
          <DialogDescription className="mt-1 text-xs leading-relaxed text-[#8b95a8]">
            Two places to add AI power — <span className="text-white/80">AI Providers</span> for your
            direct keys, the <span className="text-white/80">AI Router</span> for a pooled,
            failover-protected key hub. Both feed the same model pickers everywhere in MedQ.
          </DialogDescription>
        </div>

        <div className="max-h-[calc(85vh-5.5rem)] overflow-y-auto px-5 py-4" style={{ scrollbarWidth: 'thin' }}>
          {/* ── 1. Mental model ── */}
          <Section n={1} title="The mental model — two layers, one picker">
            <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
              <FlowDiagram />
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <LayerCard
                icon={<KeyRound className="size-3.5 text-[#4fc3f7]" />}
                title="AI Providers · direct keys"
                body={
                  <>
                    You paste <b>a key</b> for a provider (OpenAI, Claude, Gemini, DeepSeek…) or point
                    MedQ at <b>any OpenAI-compatible URL</b>. MedQ calls that endpoint directly.
                    Best when: you have one key and want the simplest path.
                  </>
                }
                where="Settings → AI Providers"
              />
              <LayerCard
                icon={<Bot className="size-3.5 text-[#00e5a0]" />}
                title="MedQ AI Router · pooled keys"
                body={
                  <>
                    A separate key hub (70+ free-tier providers + your custom endpoints) behind
                    <b> one unified key</b>, with automatic routing and failover. Link it once and
                    its whole model list appears in MedQ as <span className="font-mono text-[#00e5a0]">medq-router:</span> models.
                  </>
                }
                where="Sidebar → AI Router tab"
              />
            </div>
          </Section>

          {/* ── 2. Decision list ── */}
          <Section n={2} title="Where do I add what?">
            <p className="mb-3 text-[11px] leading-relaxed text-[#8b95a8]">
              Find your situation on the left; the right side is the exact click path.
            </p>
            <div className="space-y-2">
              <Case
                situation="I have an API key from OpenAI / Claude / Gemini / DeepSeek…"
                path={['Settings', 'AI Providers', 'Add key', 'Known provider pane']}
                note="Pick the provider, paste the key. Discover models after adding, or use its built-in list."
              />
              <Case
                situation="I want free models and don't have any keys"
                path={['Sidebar', 'AI Router', 'Keys', 'Add key']}
                note="Add free-tier provider keys (Google, GLM, Groq…). Then Overview → Link with MedQ generation."
              />
              <Case
                situation="I run my own models — Ollama, vLLM, LM Studio, or a gateway URL"
                path={['Either place', 'Add key', 'Custom endpoint pane']}
                note="AI Providers = MedQ calls it directly (simplest). AI Router = it joins the routing pool with failover + analytics. Both accept a Base URL like http://127.0.0.1:11434/v1."
              />
              <Case
                situation="I want one endpoint that serves many models"
                path={['Sidebar', 'AI Router', 'Keys', 'Add key', 'Custom endpoint']}
                note="Discover models pulls the live list from the endpoint — pick the ones you want, they register in bulk."
              />
              <Case
                situation="The model exists on the server but isn't in my model picker"
                path={['Discover models', 'or', 'Add model by hand']}
                note="Model pickers only show models you registered on an endpoint (or the provider's known list). Discover = fetched from the endpoint; Add model = typed by you."
              />
            </div>
          </Section>

          {/* ── 3. Glossary ── */}
          <Section n={3} title="The four words">
            <div className="space-y-2">
              <Term
                icon={<Server className="size-3.5" />}
                term="Provider"
                def="A known AI company in the registry (OpenAI, Google, Groq…). Known providers come with presets: base URL, key format, icon, default model list."
              />
              <Term
                icon={<Wrench className="size-3.5" />}
                term="Custom provider / custom endpoint"
                def="Any OpenAI-compatible server URL you bring — local Ollama, vLLM, LM Studio, a relay. It works exactly like a provider; you just supply the Base URL (and optionally a key + label)."
              />
              <Term
                icon={<Bot className="size-3.5" />}
                term="Model"
                def="The thing you actually call — e.g. gpt-4o-mini or zai-llm. Model pickers show provider:model. Known providers ship a catalog; everything else you add per endpoint."
              />
              <Term
                icon={<Search className="size-3.5" />}
                term="Custom model"
                def="A model id you register on an endpoint. Either discovered (fetched live from the endpoint's /models list) or added by hand (you type the id). Both behave identically afterwards."
              />
            </div>
          </Section>

          {/* ── 4. Troubleshooting ── */}
          <Section n={4} title="Added a model but don't see it?">
            <ol className="space-y-2">
              <Checklist item="The key/endpoint is enabled (toggle is on) and healthy — run Test/Check on it." />
              <Checklist item="The model is registered on that endpoint — Discover models, or Add model by hand." />
              <Checklist item={
                <>
                  Router models: the <b>Link with MedQ generation</b> card on the AI Router Overview
                  shows linked (click it once after adding models — it refreshes the model list).
                </>
              } />
              <Checklist item="Reopen the model picker — it re-reads the catalog on open; set your default in AI Providers → Default model." />
            </ol>
          </Section>
        </div>

        <div className="border-t border-white/[0.06] px-5 py-3">
          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-[#8b95a8]">
            <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-[#f5b73d]" />
            <span>
              Rule of thumb: <b className="text-white/80">one key, one job → AI Providers.</b>{' '}
              <b className="text-white/80">Many keys, routing and analytics → AI Router.</b> Keys in
              both places are encrypted at rest and never leave the server unencrypted.
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className={n > 1 ? 'mt-6 border-t border-white/[0.05] pt-5' : undefined}>
      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e8ecf4]">
        <span className="flex size-5 items-center justify-center rounded-md bg-[#00e5a0]/10 font-mono text-[10px] text-[#00e5a0]">
          {n}
        </span>
        {title}
      </h4>
      {children}
    </section>
  );
}

function LayerCard({
  icon, title, body, where,
}: { icon: React.ReactNode; title: string; body: React.ReactNode; where: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#e8ecf4]">
        {icon}
        {title}
      </div>
      <p className="mt-1.5 text-[11px] leading-relaxed text-[#8b95a8]">{body}</p>
      <p className="mt-2 inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-[#5a6478]">
        {where}
      </p>
    </div>
  );
}

function Case({
  situation, path, note,
}: { situation: string; path: string[]; note: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/25 p-3.5">
      <div className="text-[12px] font-medium text-[#e8ecf4]">{situation}</div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {path.map((p, i) => (
          <span key={`${p}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <ArrowRight className="size-3 text-[#5a6478]" /> : null}
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${i === path.length - 1 || p === 'or' ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'bg-white/[0.06] text-white/80'}`}>
              {p}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-[#8b95a8]">{note}</p>
    </div>
  );
}

function Term({ icon, term, def }: { icon: React.ReactNode; term: string; def: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#00e5a0]/10 text-[#00e5a0]">
        {icon}
      </span>
      <div>
        <div className="text-[12px] font-semibold text-[#e8ecf4]">{term}</div>
        <p className="mt-0.5 text-[11px] leading-relaxed text-[#8b95a8]">{def}</p>
      </div>
    </div>
  );
}

function Checklist({ item }: { item: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[11px] leading-relaxed text-[#8b95a8]">
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#00e5a0]/10">
        <Check className="size-2.5 text-[#00e5a0]" />
      </span>
      <span>{item}</span>
    </li>
  );
}

function FlowDiagram() {
  const box = 'rounded-lg border px-2.5 py-1.5 text-center text-[10px] font-medium';
  return (
    <div className="flex flex-col items-stretch gap-2 text-white/85">
      {/* pickers */}
      <div className={`${box} mx-auto w-64 border-[#4fc3f7]/30 bg-[#4fc3f7]/10 text-[#4fc3f7]`}>
        Every MedQ model picker
        <div className="mt-0.5 font-mono text-[9px] text-[#4fc3f7]/70">generation · tutor · chat · explain</div>
      </div>
      <ArrowDown />
      {/* two branches */}
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-2">
          <div className={`${box} border-white/[0.1] bg-white/[0.04]`}>
            <span className="inline-flex items-center gap-1.5"><KeyRound className="size-3 text-[#4fc3f7]" /> AI Providers</span>
            <div className="mt-0.5 font-mono text-[9px] text-[#8b95a8]">provider : model</div>
          </div>
          <div className={`${box} border-dashed border-white/[0.08] bg-black/20 text-[#8b95a8]`}>
            your direct keys &amp; custom endpoints
          </div>
        </div>
        <div className="space-y-2">
          <div className={`${box} border-[#00e5a0]/30 bg-[#00e5a0]/10 text-[#00e5a0]`}>
            <span className="inline-flex items-center gap-1.5"><Bot className="size-3" /> MedQ AI Router</span>
            <div className="mt-0.5 font-mono text-[9px] text-[#00e5a0]/70">medq-router : model</div>
          </div>
          <div className={`${box} border-dashed border-[#00e5a0]/20 bg-black/20 text-[#8b95a8]`}>
            <span className="inline-flex items-center gap-1"><Link2 className="size-3" /> linked once via unified key</span>
            <div className="mt-0.5 text-[9px]">70+ provider keys · custom endpoints · failover</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex justify-center">
      <svg width="14" height="10" viewBox="0 0 14 10" className="text-[#5a6478]" aria-hidden>
        <path d="M7 0v6M7 6l-3-3M7 6l3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
