import { useState, type ReactNode } from 'react'
import { ArrowRight, Bot, Check, HelpCircle, KeyRound, Search, Server, Wrench, X } from 'lucide-react'
import { Dialog, DialogClose, DialogPopup, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

// The "how models & providers work" explainer, scoped to this dashboard.
//
// MedQ has two places to add AI capacity and both speak of providers, custom
// endpoints, models and custom models — which reads as four overlapping
// concepts unless the two layers are told apart first:
//   • MedQ Settings → "AI Providers" — your DIRECT keys (one key, one provider,
//     MedQ calls it straight).
//   • This dashboard (MedQ AI Router) — a POOL of provider keys + custom
//     endpoints behind one unified API key, with routing and failover. The
//     "Link with MedQ generation" card (Keys → Unified API key tab) makes the
//     whole model list appear in every MedQ picker as medq-router:<model>.
//
// en.json carries the strings; every other locale falls back to English (see
// I18nProvider — English is the always-available fallback bundle).
export function ConceptsGuideButton() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <HelpCircle className="size-3.5" />
        {t('guide.openButton')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPopup maxWidth="max-w-3xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <DialogTitle>{t('guide.title')}</DialogTitle>
            <DialogClose
              aria-label={t('common.dismiss')}
              className="-mr-1 rounded-lg p-1 text-muted-foreground/70 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <X className="size-4" />
            </DialogClose>
          </div>

          <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-1 text-sm">
            {/* ── 1. Mental model ── */}
            <GuideSection n={1} title={t('guide.s1Title')}>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('guide.s1Intro')}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <LayerCard
                  icon={<Bot className="size-4 text-[#00e5a0]" />}
                  title={t('guide.layerRouterTitle')}
                  body={t('guide.layerRouterBody')}
                  where={t('guide.layerRouterWhere')}
                />
                <LayerCard
                  icon={<KeyRound className="size-4 text-[#4fc3f7]" />}
                  title={t('guide.layerDirectTitle')}
                  body={t('guide.layerDirectBody')}
                  where={t('guide.layerDirectWhere')}
                />
              </div>
            </GuideSection>

            {/* ── 2. Decision list ── */}
            <GuideSection n={2} title={t('guide.s2Title')}>
              <div className="space-y-2">
                <Case
                  situation={t('guide.case1')}
                  path={[t('guide.navKeys'), t('guide.addKey'), t('guide.paneProvider')]}
                  note={t('guide.case1Note')}
                />
                <Case
                  situation={t('guide.case2')}
                  path={[t('guide.navKeys'), t('guide.addKey'), t('guide.paneCustom')]}
                  note={t('guide.case2Note')}
                />
                <Case
                  situation={t('guide.case3')}
                  path={[t('guide.navKeys'), t('guide.tabApiKey'), t('guide.linkCard')]}
                  note={t('guide.case3Note')}
                />
                <Case
                  situation={t('guide.case4')}
                  path={[t('guide.navKeys'), t('guide.editModels')]}
                  note={t('guide.case4Note')}
                />
              </div>
            </GuideSection>

            {/* ── 3. The four words ── */}
            <GuideSection n={3} title={t('guide.s3Title')}>
              <div className="space-y-2">
                <Term icon={<Server className="size-4" />} term={t('guide.termProvider')} def={t('guide.termProviderDef')} />
                <Term icon={<Wrench className="size-4" />} term={t('guide.termCustom')} def={t('guide.termCustomDef')} />
                <Term icon={<Bot className="size-4" />} term={t('guide.termModel')} def={t('guide.termModelDef')} />
                <Term icon={<Search className="size-4" />} term={t('guide.termCustomModel')} def={t('guide.termCustomModelDef')} />
              </div>
            </GuideSection>

            {/* ── 4. Troubleshooting ── */}
            <GuideSection n={4} title={t('guide.s4Title')}>
              <ol className="space-y-2">
                <Checklist item={t('guide.check1')} />
                <Checklist item={t('guide.check2')} />
                <Checklist item={t('guide.check3')} />
                <Checklist item={t('guide.check4')} />
              </ol>
            </GuideSection>
          </div>

          <p className="mt-4 border-t pt-3 text-xs leading-relaxed text-muted-foreground">
            {t('guide.ruleOfThumb')}
          </p>
        </DialogPopup>
      </Dialog>
    </>
  )
}

/* ── Pieces ── */

function GuideSection({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
        <span className="flex size-5 items-center justify-center rounded-md bg-[#00e5a0]/10 font-mono text-[10px] text-[#00e5a0]">
          {n}
        </span>
        {title}
      </h4>
      {children}
    </section>
  )
}

function LayerCard({ icon, title, body, where }: { icon: ReactNode; title: string; body: string; where: string }) {
  return (
    <div className="rounded-xl border bg-card/50 p-3.5">
      <div className="flex items-center gap-2 text-sm font-medium">{icon}{title}</div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
      <p className="mt-2 inline-flex rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{where}</p>
    </div>
  )
}

function Case({ situation, path, note }: { situation: string; path: string[]; note: string }) {
  return (
    <div className="rounded-xl border bg-card/40 p-3.5">
      <div className="text-sm font-medium">{situation}</div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {path.map((p, i) => (
          <span key={`${p}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <ArrowRight className="size-3 text-muted-foreground/60" /> : null}
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${i === path.length - 1 ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'bg-muted text-foreground/80'}`}>
              {p}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{note}</p>
    </div>
  )
}

function Term({ icon, term, def }: { icon: ReactNode; term: string; def: string }) {
  return (
    <div className="flex gap-3 rounded-xl border bg-card/40 p-3">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#00e5a0]/10 text-[#00e5a0]">
        {icon}
      </span>
      <div>
        <div className="text-sm font-medium">{term}</div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{def}</p>
      </div>
    </div>
  )
}

function Checklist({ item }: { item: string }) {
  return (
    <li className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#00e5a0]/10">
        <Check className="size-2.5 text-[#00e5a0]" />
      </span>
      <span>{item}</span>
    </li>
  )
}
