import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Clapperboard, Download, RotateCcw, Sparkles, TriangleAlert, X } from 'lucide-react'
import { apiFetch } from '@/lib/api'
import {
  b64ToDataUrl, dataUrlExt, downloadName, formatElapsed,
  loadRecentPrompts, pushRecentPrompt, recentPromptLabel, saveRecentPrompts,
} from '@/lib/media-studio'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { EmptyState } from '@/components/empty-state'
import { PageHeader } from '@/components/page-header'
import type { MediaModel } from '@/components/media-models'
import { useI18n } from '@/i18n'

// The Media Studio: a prompt-to-media surface for the router's generative
// endpoints — /v1/images/generations, /v1/videos/generations and
// /v1/audio/speech. The Model management tabs (Models → Image/Video/Audio)
// decide WHAT is routable; this page is the try-it surface, the same
// relationship Playground has to the chat model table. Everything goes
// through the MedQ origin (the embedded router), authenticated with the
// unified API key exactly like the Playground's chat calls.

type StudioTab = 'image' | 'video' | 'speech'

interface MediaRows { models: MediaModel[] }
interface KeyResponse { apiKey: string }

const IMAGE_SIZES = [
  { value: '1024x1024', label: '1024 × 1024' },
  { value: '1280x720', label: '1280 × 720' },
  { value: '720x1280', label: '720 × 1280' },
  { value: '1024x768', label: '1024 × 768' },
  { value: '768x1024', label: '768 × 1024' },
] as const

const VIDEO_DURATIONS = ['5', '10', '15', '30'] as const
const VIDEO_ASPECTS = [
  { value: '16:9', label: '16:9' },
  { value: '9:16', label: '9:16' },
] as const

interface BaseResult {
  id: number
  prompt: string
  provider: string
  model: string
  ms: number
}
interface ImageResult extends BaseResult { kind: 'image'; src: string }
interface BlobResult extends BaseResult { kind: 'blob'; url: string; contentType: string }
interface FailedResult { id: number; kind: 'error'; prompt: string; message: string }
type StudioResult = ImageResult | BlobResult | FailedResult

let resultSeq = 0
const nextId = () => ++resultSeq

/** Extract the server's error message from a non-2xx /v1 response. */
async function wireError(res: Response): Promise<string> {
  const text = await res.text().catch(() => '')
  try {
    const j = JSON.parse(text) as { error?: { message?: string }; message?: string }
    return j.error?.message ?? j.message ?? `HTTP ${res.status}`
  } catch {
    return text.slice(0, 300) || `HTTP ${res.status}`
  }
}

/** One-second ticker while a generation runs — video jobs run for minutes. */
function useElapsed(active: boolean): number {
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    if (!active) return
    const started = Date.now()
    setElapsed(0)
    const timer = window.setInterval(() => setElapsed(Date.now() - started), 1000)
    return () => window.clearInterval(timer)
  }, [active])
  return elapsed
}

function ProviderLine({ r }: { r: StudioResult }) {
  if (r.kind === 'error') return null
  return (
    <span className="font-mono text-[11px] text-muted-foreground">
      {r.provider} · {r.model} · {formatElapsed(r.ms)}
    </span>
  )
}

function DownloadButton({ href, download, label }: { href: string; download: string; label: string }) {
  return (
    <a href={href} download={download} className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={label} title={label}>
      <Download className="size-3.5" />
    </a>
  )
}

export default function MediaStudioPage() {
  const { t } = useI18n()
  const [tab, setTab] = useState<StudioTab>('image')

  const { data: mediaRows, isLoading: mediaLoading } = useQuery<MediaRows>({
    queryKey: ['media-models'],
    queryFn: () => apiFetch('/api/media'),
  })
  const { data: keyData } = useQuery<KeyResponse>({
    queryKey: ['api-key'],
    queryFn: () => apiFetch('/api/settings/api-key'),
  })

  const byModality = (modality: StudioTab) =>
    (mediaRows?.models ?? []).filter(m => m.enabled && m.modality === (modality === 'speech' ? 'audio' : modality))

  return (
    <div>
      <PageHeader
        title={t('studio.title')}
        description={t('studio.description')}
        actions={
          <SegmentedControl<StudioTab>
            value={tab}
            onValueChange={setTab}
            ariaLabel={t('studio.title')}
            options={[
              { value: 'image', label: t('studio.tabImage') },
              { value: 'video', label: t('studio.tabVideo') },
              { value: 'speech', label: t('studio.tabSpeech') },
            ]}
          />
        }
        divider={false}
      />
      {tab === 'image' && <ImageStudio models={byModality('image')} loading={mediaLoading} apiKey={keyData?.apiKey} />}
      {tab === 'video' && <VideoStudio models={byModality('video')} loading={mediaLoading} apiKey={keyData?.apiKey} />}
      {tab === 'speech' && <SpeechStudio models={byModality('speech')} loading={mediaLoading} apiKey={keyData?.apiKey} />}
    </div>
  )
}

/** Shared left-rail model picker: Auto first, then one option per provider row
 *  (a pinned row skips failover; Auto tries every enabled provider in order).
 *  Rows without a usable key carry the same amber badge as the model tables. */
function ModelPicker({
  models, value, onChange, autoLabel, modelLabel,
}: {
  models: MediaModel[]
  value: string
  onChange: (v: string) => void
  autoLabel: string
  modelLabel: string
}) {
  const { t } = useI18n()
  return (
    <div className="space-y-2">
      <Label className="text-xs">{modelLabel}</Label>
      <Select value={value} onValueChange={v => { if (v !== null) onChange(v) }}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">{autoLabel}</SelectItem>
          {models.map(m => (
            <SelectItem key={`${m.platform}:${m.modelId}`} value={m.modelId}>
              <span className="flex items-center gap-2">
                <span className="truncate">{m.displayName}</span>
                <span className="text-[10px] text-muted-foreground">{m.platform}</span>
                {m.keyCount === 0 && (
                  <span className="rounded-full bg-amber-600/15 px-1.5 py-0.5 text-[10px] text-amber-700 dark:bg-amber-400/15 dark:text-amber-400">
                    {t('models.noKey')}
                  </span>
                )}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ResultsPanel({
  results, onClear, onReuse, clearLabel, reuseLabel, emptyTitle, emptyDescription, downloadLabel, failedTitle,
}: {
  results: StudioResult[]
  onClear: () => void
  /** Reloads a result's prompt (and model, when known) back into the form. */
  onReuse?: (r: StudioResult) => void
  clearLabel: string
  reuseLabel: string
  emptyTitle: string
  emptyDescription: string
  downloadLabel: string
  failedTitle: string
}) {
  const { t } = useI18n()
  const reuseButton = onReuse ? (r: StudioResult) => (
    <button
      type="button"
      onClick={() => onReuse(r)}
      aria-label={reuseLabel}
      title={reuseLabel}
      className="flex h-6 items-center gap-1 rounded-md px-1.5 text-[11px] text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <RotateCcw className="size-3" />
      <span className="hidden sm:inline">{reuseLabel}</span>
    </button>
  ) : undefined
  return (
    <Card className="min-h-[300px]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm">{t('studio.resultsTitle')}</CardTitle>
        {results.length > 0 && (
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground" onClick={onClear}>
            {clearLabel}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <EmptyState icon={Sparkles} title={emptyTitle} description={emptyDescription} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map(r => (
              <div key={r.id} className="overflow-hidden rounded-2xl border">
                {r.kind === 'image' && (
                  <>
                    <img src={r.src} alt={r.prompt} className="aspect-square w-full bg-muted object-contain" />
                    <div className="flex items-center justify-between gap-2 px-3 py-2">
                      <ProviderLine r={r} />
                      <div className="flex items-center gap-1">
                        {reuseButton?.(r)}
                        <DownloadButton href={r.src} download={downloadName(r.model, dataUrlExt(r.src))} label={downloadLabel} />
                      </div>
                    </div>
                  </>
                )}
                {r.kind === 'blob' && (
                  <>
                    {r.contentType.startsWith('video/') ? (
                      <video src={r.url} controls playsInline className="w-full bg-black" />
                    ) : (
                      <audio src={r.url} controls className="w-full px-3 py-3" />
                    )}
                    <div className="flex items-center justify-between gap-2 px-3 py-2">
                      <ProviderLine r={r} />
                      <div className="flex items-center gap-1">
                        {reuseButton?.(r)}
                        <DownloadButton href={r.url} download={downloadName(r.model, r.contentType.startsWith('video/') ? 'mp4' : r.contentType.includes('wav') ? 'wav' : 'mp3')} label={downloadLabel} />
                      </div>
                    </div>
                  </>
                )}
                {r.kind === 'error' && (
                  <div className="flex items-start gap-2 p-3">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-destructive">{failedTitle}</p>
                      <p className="mt-0.5 break-words text-xs text-muted-foreground">{r.message}</p>
                      {reuseButton && (
                        <div className="mt-1.5">
                          {reuseButton(r)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/** Per-tab recent-prompt memory: remembers on generate, restores on click.
 *  localStorage-backed so a refresh never costs the prompts you already
 *  perfected — the companion to the Reuse button on every result card. */
function useRecentPrompts(storageKey: string) {
  const [recent, setRecent] = useState<string[]>(() => loadRecentPrompts(storageKey))
  const remember = (text: string) => {
    setRecent(prev => {
      const next = pushRecentPrompt(prev, text)
      saveRecentPrompts(storageKey, next)
      return next
    })
  }
  return { recent, remember }
}

/** Clickable one-line chips of past prompts, shown while the textarea is
 *  empty — out of the way when writing, one click away when starting over. */
function RecentPrompts({ prompts, label, onPick }: { prompts: string[]; label: string; onPick: (p: string) => void }) {
  if (prompts.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      {prompts.slice(0, 6).map((p, i) => (
        <button
          key={`${i}-${p.slice(0, 12)}`}
          type="button"
          title={p}
          onClick={() => onPick(p)}
          className="max-w-[220px] truncate rounded-full border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {recentPromptLabel(p)}
        </button>
      ))}
    </div>
  )
}

function NoModelsState({ modality, manageLabel }: { modality: string; manageLabel: string }) {
  const { t } = useI18n()
  return (
    <EmptyState
      icon={Clapperboard}
      title={t('studio.noModels', { modality })}
      description={t('studio.noModelsHint')}
      action={<Link to={modality === 'speech' ? '/models/audio' : `/models/${modality}`} className={buttonVariants({ variant: 'outline', size: 'sm' })}>{manageLabel}</Link>}
    />
  )
}

/** Blob results need their object URLs revoked exactly once each — when the
 *  studio unmounts, or when the user clears the gallery. Revoking on every
 *  results change would kill still-visible videos the moment a new generation
 *  lands, so the registry is a ref, not an effect dependency. */
function useBlobRegistry() {
  const urls = useRef<Set<string>>(new Set())
  useEffect(() => () => { urls.current.forEach(u => URL.revokeObjectURL(u)) }, [])
  return {
    register(url: string) { urls.current.add(url) },
    revokeAll() {
      urls.current.forEach(u => URL.revokeObjectURL(u))
      urls.current.clear()
    },
  }
}

// ─────────────────────────── Image ───────────────────────────

function ImageStudio({ models, loading, apiKey }: { models: MediaModel[]; loading: boolean; apiKey?: string }) {
  const { t } = useI18n()
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('auto')
  const [size, setSize] = useState<string>('1024x1024')
  const [count, setCount] = useState('1')
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState<StudioResult[]>([])
  const elapsed = useElapsed(busy)
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const { recent, remember } = useRecentPrompts('studio.recent.image')

  // Reload a past generation's prompt (and the model that served it, when it
  // is still enabled) — the no-retyping path for iterating on a prompt.
  const reuse = (r: StudioResult) => {
    setPrompt(r.prompt)
    if (r.kind !== 'error' && r.model && r.model !== 'auto' && models.some(m => String(m.id) === r.model)) setModel(r.model)
    promptRef.current?.focus()
  }

  async function generate() {
    if (!prompt.trim() || busy) return
    remember(prompt)
    setBusy(true)
    const started = Date.now()
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (apiKey) headers.Authorization = `Bearer ${apiKey}`
      const base = import.meta.env.BASE_URL.replace(/\/$/, '')
      const body: Record<string, unknown> = { prompt: prompt.trim(), size, n: Number(count) }
      if (model !== 'auto') body.model = model
      const res = await fetch(`${base}/v1/images/generations`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })
      const ms = Date.now() - started
      if (!res.ok) throw new Error(await wireError(res))
      const j = await res.json() as { data?: { b64_json?: string; url?: string }[]; provider?: string; model?: string }
      const images = (j.data ?? []).map(i => (i.b64_json ? b64ToDataUrl(i.b64_json) : i.url ?? '')).filter(Boolean)
      if (images.length === 0) throw new Error(t('studio.noImageData'))
      setResults(prev => [
        ...images.map(src => ({
          id: nextId(), kind: 'image' as const, src, prompt: prompt.trim(),
          provider: j.provider ?? '?', model: j.model ?? model, ms,
        })),
        ...prev,
      ])
    } catch (err) {
      setResults(prev => [{ id: nextId(), kind: 'error', prompt: prompt.trim(), message: err instanceof Error ? err.message : String(err) }, ...prev])
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <div className="space-y-4"><Skeleton className="h-64 w-full rounded-3xl" /><Skeleton className="h-40 w-full rounded-3xl" /></div>
  if (models.length === 0) return <NoModelsState modality="image" manageLabel={t('studio.manageModels')} />

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="studio-image-prompt">{t('studio.promptLabel')}</Label>
            <Textarea
              id="studio-image-prompt"
              ref={promptRef}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={t('studio.promptImagePlaceholder')}
              rows={4}
              onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate() }}
            />
          </div>
          <RecentPrompts prompts={recent} label={t('studio.recentPrompts')} onPick={p => { setPrompt(p); promptRef.current?.focus() }} />
          <ModelPicker models={models} value={model} onChange={setModel} autoLabel={t('studio.autoModel')} modelLabel={t('studio.modelLabel')} />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">{t('studio.sizeLabel')}</Label>
              <Select value={size} onValueChange={v => { if (v !== null) setSize(v) }}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {IMAGE_SIZES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('studio.countLabel')}</Label>
              <Select value={count} onValueChange={v => { if (v !== null) setCount(v) }}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['1', '2', '3', '4'].map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full" onClick={generate} disabled={busy || !prompt.trim()}>
            {busy ? t('studio.generating') : t('studio.generate')}
          </Button>
          {busy && <p className="text-center text-xs text-muted-foreground">{formatElapsed(elapsed)}</p>}
          <p className="text-[11px] leading-relaxed text-muted-foreground">{t('studio.imageNote')}</p>
        </CardContent>
      </Card>
      <ResultsPanel
        results={results}
        onReuse={reuse}
        reuseLabel={t('studio.reusePrompt')}
        onClear={() => { setResults([]) }}
        clearLabel={t('studio.clearResults')}
        emptyTitle={t('studio.resultsEmptyTitle')}
        emptyDescription={t('studio.resultsEmptyDescription')}
        downloadLabel={t('studio.download')}
        failedTitle={t('studio.failed')}
      />
    </div>
  )
}

// ─────────────────────────── Video ───────────────────────────

function VideoStudio({ models, loading, apiKey }: { models: MediaModel[]; loading: boolean; apiKey?: string }) {
  const { t } = useI18n()
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('auto')
  const [duration, setDuration] = useState<string>('10')
  const [aspect, setAspect] = useState<string>('16:9')
  const [withAudio, setWithAudio] = useState(false)
  const [seed, setSeed] = useState('')
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState<StudioResult[]>([])
  const abortRef = useRef<AbortController | null>(null)
  const elapsed = useElapsed(busy)
  const blobs = useBlobRegistry()
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const { recent, remember } = useRecentPrompts('studio.recent.video')

  const reuse = (r: StudioResult) => {
    setPrompt(r.prompt)
    if (r.kind !== 'error' && r.model && r.model !== 'auto' && models.some(m => String(m.id) === r.model)) setModel(r.model)
    promptRef.current?.focus()
  }

  function abort() {
    abortRef.current?.abort()
  }

  async function generate() {
    if (!prompt.trim() || busy) return
    remember(prompt)
    setBusy(true)
    const started = Date.now()
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (apiKey) headers.Authorization = `Bearer ${apiKey}`
      const base = import.meta.env.BASE_URL.replace(/\/$/, '')
      const body: Record<string, unknown> = {
        prompt: prompt.trim(),
        duration: Number(duration),
        aspect_ratio: aspect,
        audio: withAudio,
      }
      if (model !== 'auto') body.model = model
      const seedNum = Number(seed)
      if (seed.trim() !== '' && Number.isInteger(seedNum)) body.seed = seedNum
      const res = await fetch(`${base}/v1/videos/generations`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      })
      const ms = Date.now() - started
      if (!res.ok) throw new Error(await wireError(res))
      const blob = await res.blob()
      if (blob.size === 0) throw new Error(t('studio.noVideoData'))
      const url = URL.createObjectURL(blob)
      blobs.register(url)
      setResults(prev => [{
        id: nextId(),
        kind: 'blob',
        url,
        contentType: blob.type || res.headers.get('content-type') || 'video/mp4',
        prompt: prompt.trim(),
        provider: res.headers.get('X-Provider') ?? '?',
        model: res.headers.get('X-Model') ?? model,
        ms,
      }, ...prev])
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setResults(prev => [{ id: nextId(), kind: 'error', prompt: prompt.trim(), message: t('studio.aborted') }, ...prev])
      } else {
        setResults(prev => [{ id: nextId(), kind: 'error', prompt: prompt.trim(), message: err instanceof Error ? err.message : String(err) }, ...prev])
      }
    } finally {
      setBusy(false)
      abortRef.current = null
    }
  }

  if (loading) return <div className="space-y-4"><Skeleton className="h-64 w-full rounded-3xl" /><Skeleton className="h-40 w-full rounded-3xl" /></div>
  if (models.length === 0) return <NoModelsState modality="video" manageLabel={t('studio.manageModels')} />

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="studio-video-prompt">{t('studio.promptLabel')}</Label>
            <Textarea
              id="studio-video-prompt"
              ref={promptRef}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={t('studio.promptVideoPlaceholder')}
              rows={4}
            />
          </div>
          <RecentPrompts prompts={recent} label={t('studio.recentPrompts')} onPick={p => { setPrompt(p); promptRef.current?.focus() }} />
          <ModelPicker models={models} value={model} onChange={setModel} autoLabel={t('studio.autoModel')} modelLabel={t('studio.modelLabel')} />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">{t('studio.durationLabel')}</Label>
              <Select value={duration} onValueChange={v => { if (v !== null) setDuration(v) }}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {VIDEO_DURATIONS.map(d => <SelectItem key={d} value={d}>{d}s</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">{t('studio.aspectLabel')}</Label>
              <Select value={aspect} onValueChange={v => { if (v !== null) setAspect(v) }}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {VIDEO_ASPECTS.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="studio-video-seed">{t('studio.seedLabel')}</Label>
              <Input id="studio-video-seed" value={seed} onChange={e => setSeed(e.target.value)} placeholder={t('studio.seedPlaceholder')} inputMode="numeric" />
            </div>
            <div className="flex items-center justify-between rounded-xl border px-3 py-2">
              <Label className="text-xs">{t('studio.audioLabel')}</Label>
              <Switch checked={withAudio} onCheckedChange={setWithAudio} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={generate} disabled={busy || !prompt.trim()}>
              {busy ? t('studio.generating') : t('studio.generate')}
            </Button>
            {busy && (
              <Button variant="outline" onClick={abort} aria-label={t('studio.abort')} title={t('studio.abort')}>
                <X className="size-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {busy ? `${formatElapsed(elapsed)} — ` : ''}{t('studio.videoNote')}
          </p>
        </CardContent>
      </Card>
      <ResultsPanel
        results={results}
        onReuse={reuse}
        reuseLabel={t('studio.reusePrompt')}
        onClear={() => { blobs.revokeAll(); setResults([]) }}
        clearLabel={t('studio.clearResults')}
        emptyTitle={t('studio.resultsEmptyTitle')}
        emptyDescription={t('studio.resultsEmptyDescription')}
        downloadLabel={t('studio.download')}
        failedTitle={t('studio.failed')}
      />
    </div>
  )
}

// ─────────────────────────── Speech ───────────────────────────

function SpeechStudio({ models, loading, apiKey }: { models: MediaModel[]; loading: boolean; apiKey?: string }) {
  const { t } = useI18n()
  const [text, setText] = useState('')
  const [model, setModel] = useState('auto')
  const [voice, setVoice] = useState('')
  const [busy, setBusy] = useState(false)
  const [results, setResults] = useState<StudioResult[]>([])
  const abortRef = useRef<AbortController | null>(null)
  const elapsed = useElapsed(busy)
  const blobs = useBlobRegistry()
  const textRef = useRef<HTMLTextAreaElement>(null)
  const { recent, remember } = useRecentPrompts('studio.recent.speech')

  const reuse = (r: StudioResult) => {
    setText(r.prompt)
    if (r.kind !== 'error' && r.model && r.model !== 'auto' && models.some(m => String(m.id) === r.model)) setModel(r.model)
    textRef.current?.focus()
  }

  function abort() {
    abortRef.current?.abort()
  }

  async function generate() {
    if (!text.trim() || busy) return
    remember(text)
    setBusy(true)
    const started = Date.now()
    const controller = new AbortController()
    abortRef.current = controller
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (apiKey) headers.Authorization = `Bearer ${apiKey}`
      const base = import.meta.env.BASE_URL.replace(/\/$/, '')
      // No response_format: some OpenAI-compatible gateways (including the
      // Z.AI one this install registers) reject the field outright; the
      // response's own Content-Type says what came back.
      const body: Record<string, unknown> = { input: text.trim() }
      if (model !== 'auto') body.model = model
      if (voice.trim()) body.voice = voice.trim()
      const res = await fetch(`${base}/v1/audio/speech`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      })
      const ms = Date.now() - started
      if (!res.ok) throw new Error(await wireError(res))
      const blob = await res.blob()
      if (blob.size === 0) throw new Error(t('studio.noAudioData'))
      const url = URL.createObjectURL(blob)
      blobs.register(url)
      setResults(prev => [{
        id: nextId(),
        kind: 'blob',
        url,
        contentType: blob.type || res.headers.get('content-type') || 'audio/mpeg',
        prompt: text.trim(),
        provider: res.headers.get('X-Provider') ?? '?',
        model,
        ms,
      }, ...prev])
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setResults(prev => [{ id: nextId(), kind: 'error', prompt: text.trim(), message: t('studio.aborted') }, ...prev])
      } else {
        setResults(prev => [{ id: nextId(), kind: 'error', prompt: text.trim(), message: err instanceof Error ? err.message : String(err) }, ...prev])
      }
    } finally {
      setBusy(false)
      abortRef.current = null
    }
  }

  if (loading) return <div className="space-y-4"><Skeleton className="h-64 w-full rounded-3xl" /><Skeleton className="h-40 w-full rounded-3xl" /></div>
  if (models.length === 0) return <NoModelsState modality="speech" manageLabel={t('studio.manageModels')} />

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="studio-speech-text">{t('studio.textLabel')}</Label>
            <Textarea
              id="studio-speech-text"
              ref={textRef}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={t('studio.textPlaceholder')}
              rows={5}
            />
          </div>
          <RecentPrompts prompts={recent} label={t('studio.recentPrompts')} onPick={p => { setText(p); textRef.current?.focus() }} />
          <ModelPicker models={models} value={model} onChange={setModel} autoLabel={t('studio.autoModel')} modelLabel={t('studio.modelLabel')} />
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="studio-speech-voice">{t('studio.voiceLabel')}</Label>
            <Input id="studio-speech-voice" value={voice} onChange={e => setVoice(e.target.value)} placeholder={t('studio.voicePlaceholder')} />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={generate} disabled={busy || !text.trim()}>
              {busy ? t('studio.generating') : t('studio.generate')}
            </Button>
            {busy && (
              <Button variant="outline" onClick={abort} aria-label={t('studio.abort')} title={t('studio.abort')}>
                <X className="size-4" />
              </Button>
            )}
          </div>
          {busy && <p className="text-center text-xs text-muted-foreground">{formatElapsed(elapsed)}</p>}
          <p className="text-[11px] leading-relaxed text-muted-foreground">{t('studio.speechNote')}</p>
        </CardContent>
      </Card>
      <ResultsPanel
        results={results}
        onReuse={reuse}
        reuseLabel={t('studio.reusePrompt')}
        onClear={() => { blobs.revokeAll(); setResults([]) }}
        clearLabel={t('studio.clearResults')}
        emptyTitle={t('studio.resultsEmptyTitle')}
        emptyDescription={t('studio.resultsEmptyDescription')}
        downloadLabel={t('studio.download')}
        failedTitle={t('studio.failed')}
      />
    </div>
  )
}
