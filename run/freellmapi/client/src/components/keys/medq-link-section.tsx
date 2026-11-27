import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Link2, Link2Off, Loader2, RefreshCw } from 'lucide-react'
import { apiFetch } from '@/lib/api'
import { Button } from '@/components/ui/button'
import type { Model } from '../../../../shared/types'

// ── MedQ integration ─────────────────────────────────────────────────────────
// This dashboard is the "MedQ AI Router", mounted inside the MedQ app. MedQ
// itself has a BYOK store (/api/user/api-keys, session-cookie authenticated on
// the same origin): registering the router's unified key there exposes every
// enabled router model (medq-router:<modelId>) in ALL of MedQ's model pickers
// — question generation, explanations, the tutor — routed through this
// dashboard's failover engine.
//
// The section talks to MedQ directly with plain origin-absolute fetches (NOT
// apiFetch, which prefixes this dashboard's own BASE). When MedQ's endpoint
// is unreachable — a standalone (non-MedQ) install of freellmapi — the section
// renders nothing at all.
//
// Labels are hardcoded English on purpose: this is a MedQ-build-only section,
// and MedQ's own UI is English-first; adding keys to all 60 locale files for
// an integration that only exists in the MedQ fork would be churn.

const ROUTER_PROVIDER_ID = 'medq-router'
const ROUTER_LABEL = 'MedQ AI Router (this app)'
/** MedQ caps a modelsConfig payload at 40 entries — same bound as the tab it replaces. */
const MAX_LINKED_MODELS = 40

interface MedqEndpointMeta {
  id: number
  providerId: string
  label: string
  baseUrl: string
  modelsConfig: { id: string; name: string; contextWindow?: number }[] | null
}

async function medqFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(path, { ...init, credentials: 'same-origin' })
}

export function MedqLinkSection() {
  const queryClient = useQueryClient()
  const [available, setAvailable] = useState<boolean | null>(null)
  const [medqKeys, setMedqKeys] = useState<MedqEndpointMeta[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const { data: models = [] } = useQuery<Model[]>({
    queryKey: ['models'],
    queryFn: () => apiFetch('/api/models'),
  })
  const { data: unifiedKey } = useQuery<{ apiKey: string }>({
    queryKey: ['unified-key'],
    queryFn: () => apiFetch('/api/settings/api-key'),
  })

  async function loadMedq(): Promise<boolean> {
    try {
      const res = await medqFetch('/api/user/api-keys')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const body = await res.json() as { keys: MedqEndpointMeta[] }
      setMedqKeys(body.keys ?? [])
      setAvailable(true)
      return true
    } catch {
      // Not running inside MedQ (or signed out of it) — hide the section.
      setAvailable(false)
      return false
    }
  }

  useEffect(() => {
    void loadMedq()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = (medqKeys ?? []).find(
    (k) => k.providerId === ROUTER_PROVIDER_ID || k.label === ROUTER_LABEL,
  )
  const linkedCount = router?.modelsConfig?.length ?? 0
  const enabledModels = models.filter((m) => m.enabled)

  async function link() {
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const apiKey = unifiedKey?.apiKey
      if (!apiKey) throw new Error('Unified key not loaded yet — retry in a moment.')
      const picked = enabledModels.slice(0, MAX_LINKED_MODELS).map((m) => ({
        id: m.modelId,
        name: m.displayName,
        ...(m.contextWindow != null ? { contextWindow: m.contextWindow } : {}),
      }))
      const res = await medqFetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(router ? { id: router.id } : {}),
          providerId: ROUTER_PROVIDER_ID,
          apiKey,
          baseUrl: `${window.location.origin}/v1`,
          label: ROUTER_LABEL,
          modelsConfig: picked.length > 0 ? picked : null,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null) as { error?: string } | null
        throw new Error(body?.error ?? `HTTP ${res.status}`)
      }
      await loadMedq()
      setNotice(
        picked.length > 0
          ? `Linked — ${picked.length} router models are now available in every MedQ model picker.`
          : 'Linked — enable models on the Models page, then refresh the link to expose them to MedQ.',
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  async function unlink() {
    if (!router) return
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      const res = await medqFetch(
        `/api/user/api-keys/${encodeURIComponent(router.providerId)}?keyId=${encodeURIComponent(router.id)}`,
        { method: 'DELETE' },
      )
      if (!res.ok) {
        const body = await res.json().catch(() => null) as { error?: string } | null
        throw new Error(body?.error ?? `HTTP ${res.status}`)
      }
      await loadMedq()
      setNotice('Unlinked — the router endpoint was removed from MedQ.')
      // MedQ's model pickers re-read their provider catalog; nudge the local
      // cache of the router's own state so a re-link starts clean.
      queryClient.invalidateQueries({ queryKey: ['models'] })
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  if (available === false) return null

  return (
    <section className="rounded-3xl border bg-card p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="text-sm font-medium flex items-center gap-1.5">
            <Link2 className="size-3.5" />
            Link with MedQ generation
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Register this router as a MedQ endpoint — its models appear in every MedQ model picker
            (question generation, explanations, the tutor).
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          disabled={busy}
          onClick={() => { void loadMedq() }}
          title="Re-read the MedQ endpoint list"
        >
          <RefreshCw className="size-3.5" />
        </Button>
      </div>

      {router ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400 mb-3">
          <Check className="size-3.5 shrink-0" />
          <span>
            Linked as <span className="font-medium">{ROUTER_LABEL}</span> — {linkedCount} models
            available to MedQ generation.
          </span>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground mb-3">
          The router exposes one OpenAI-compatible endpoint. Link it and MedQ routes generation
          through your keys — with automatic failover across every model you enable.
        </p>
      )}

      {notice && <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-3">{notice}</p>}
      {error && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive mb-3">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button size="sm" disabled={busy} onClick={() => void link()}>
          {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Link2 className="size-3.5" />}
          {router ? 'Refresh linked models' : 'Link router to MedQ'}
        </Button>
        {router && (
          <Button variant="outline" size="sm" disabled={busy} onClick={() => void unlink()}>
            <Link2Off className="size-3.5" />
            Unlink
          </Button>
        )}
      </div>
    </section>
  )
}
