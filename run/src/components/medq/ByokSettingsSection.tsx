'use client';
/**
 * BYOK (Bring Your Own Key) settings section — complete OpenMAIC-style
 * "Set up model" experience.
 *
 * Layout (mirrors OpenMAIC's settings Dialog):
 *   ┌─────────────┬───────────────────────────────────┐
 *   │ Provider    │  Provider header (logo + chips)    │
 *   │ sidebar     │  API key input                     │
 *   │ (scroll)    │  Base URL                          │
 *   │             │  ─────────────────────────────    │
 *   │             │  Models list (capabilities, ctx)   │
 *   │             │    • model card [edit] [delete]    │
 *   │             │    • model card [edit] [delete]    │
 *   │             │  [+ Add New Model] [↻ Refresh]     │
 *   │             │  ─────────────────────────────    │
 *   │             │  [Save & Test] [Delete]            │
 *   └─────────────┴───────────────────────────────────┘
 *
 * Plus a ModelEditDialog (opened by [edit]/[+ Add New Model]) with:
 *   - Model ID + display name inputs
 *   - Capabilities checkboxes (vision / tools / streaming)
 *   - Advanced: context window + output window
 *   - Test connection button
 *
 * Backend:
 *   GET    /api/user/api-keys                → list saved keys (with modelsConfig)
 *   POST   /api/user/api-keys                → save (upsert) key + modelsConfig
 *   PATCH  /api/user/api-keys                → update modelsConfig only
 *   DELETE /api/user/api-keys/[providerId]   → delete a saved key
 *   POST   /api/user/api-keys/test           → test a key (returns models[])
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Key, Check, Loader2, Trash2, AlertCircle, Shield, ShieldOff,
  ExternalLink, RefreshCw, Server, Eye, EyeOff, Box,
  Plus, Sparkles, Wrench, Zap, FileText, Send, Settings2,
  RotateCcw, X, ChevronUp, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import {
  BYOK_PROVIDERS,
  BYOK_PROVIDER_BY_ID,
  BYOK_MONO_LOGO_IDS,
  type ByokProviderMeta,
} from '@/lib/ai/byok-providers';
import { openAuthModal } from '@/lib/utils/app-events';

// ── Types ──

interface ByokModelConfig {
  id: string;
  name: string;
  capabilities?: { vision?: boolean; tools?: boolean; streaming?: boolean };
  contextWindow?: number;
  outputWindow?: number;
}

interface SavedKey {
  /** Row id — the endpoint handle (a user may have several per provider). */
  id: string;
  providerId: string;
  baseUrl: string | null;
  label: string | null;
  maskedKey: string;
  enabled: boolean;
  priority: number;
  lastUsedAt: string | null;
  lastVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  isServerManaged?: boolean;
  modelsConfig: ByokModelConfig[] | null;
}

interface ByokSettingsSectionProps {
  onKeysChanged?: () => void;
}

export default function ByokSettingsSection({ onKeysChanged }: ByokSettingsSectionProps) {
  // const { isAuthenticated, signOutUser, user } = useAuth();
  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user;
  // Multi-endpoint BYOK: each provider may have SEVERAL saved endpoints
  // (e.g. remote Ollama + local Ollama, or two OpenAI keys).
  const [savedKeys, setSavedKeys] = useState<Record<string, SavedKey[]>>({});
  const [loading, setLoading] = useState(true);
  // Three error states: null | '__unauthenticated__' (no session at all) |
  // '__session_expired__' (client thinks user is logged in, but server
  // returned 401 — typically a stale JWT cookie from a previous
  // NEXTAUTH_SECRET rotation; the fix is to sign out and back in).
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string>(
    BYOK_PROVIDERS[0]?.id ?? '',
  );

  const reload = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/user/api-keys', { cache: 'no-store' });
      if (res.status === 401) {
        // Special-cased so the UI can render a sign-in / sign-out CTA
        // instead of a plain error message. Keys are per-user, so auth is
        // required. Distinguish two cases:
        //   - Client thinks user is logged in (isAuthenticated=true) →
        //     the JWT cookie is stale (e.g. NEXTAUTH_SECRET rotated).
        //     Show "session expired" + sign-out-and-back-in flow.
        //   - Client agrees user is not logged in → show the normal
        //     "Sign in to manage your API keys" CTA.
        setLoadError(sessionStatus === 'authenticated' ? '__session_expired__' : '__unauthenticated__');
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const byId: Record<string, SavedKey[]> = {};
      for (const k of data.keys ?? []) {
        (byId[k.providerId] ??= []).push(k);
      }
      setSavedKeys(byId);
      setSelectedProviderId((prev) => {
        if (prev && byId[prev]?.length) return prev;
        const firstSaved = Object.keys(byId)[0];
        return firstSaved ?? prev;
      });
    } catch (e: any) {
      setLoadError(e?.message || 'Failed to load API keys');
    } finally {
      setLoading(false);
    }
  }, [sessionStatus]);

  // Auto-reload when the user signs in (e.g. they hit the "Sign in" CTA
  // below, completed auth in the AuthModal, and the session propagated).
  // Without this, the section stays stuck on the "Sign in to manage your
  // API keys" prompt until the user manually closes/reopens Settings.
  useEffect(() => {
    if (sessionStatus === 'loading') return;
    const reloadTimer = setTimeout(() => {
      void reload();
    }, 0);
    return () => clearTimeout(reloadTimer);
  }, [sessionStatus, reload]);

  const handleChanged = useCallback(() => {
    reload();
    onKeysChanged?.();
  }, [reload, onKeysChanged]);

  const sortedProviders = [...BYOK_PROVIDERS].sort((a, b) => {
    const aSaved = !!savedKeys[a.id];
    const bSaved = !!savedKeys[b.id];
    if (aSaved !== bSaved) return aSaved ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const selectedProvider = BYOK_PROVIDER_BY_ID[selectedProviderId] ?? sortedProviders[0];
  const selectedSavedList = selectedProvider ? savedKeys[selectedProvider.id] : undefined;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Key className="w-4 h-4 text-[#00e5a0]" />
        <h3 className="text-xs font-bold text-[#8b95a8] uppercase tracking-wider">
          AI Providers (Bring Your Own Key)
        </h3>
      </div>

      <div className="ml-1 mb-3 pl-4 border-l border-white/[0.04]">
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#00e5a0]/[0.04] border border-[#00e5a0]/10">
          <Shield className="w-3.5 h-3.5 text-[#00e5a0] flex-shrink-0 mt-0.5" />
          <p className="text-[10px] leading-relaxed text-[#8b95a8]">
            Add your own API keys to use any AI provider across the whole app — chat,
            tutor, classroom, flashcards, and more. Keys are{' '}
            <span className="text-[#e8ecf4] font-semibold">encrypted (AES-256-GCM)</span>{' '}
            and stored on the server, so they{' '}
            <span className="text-[#e8ecf4] font-semibold">sync across your devices</span>{' '}
            and never appear in browser storage.
          </p>
        </div>
      </div>

      {loading && (
        <div className="ml-1 pl-4 border-l border-white/[0.04] flex items-center gap-2 py-3">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5a6478]" />
          <span className="text-[10px] text-[#5a6478]">Loading your keys…</span>
        </div>
      )}

      {!loading && loadError && (
        <div className="ml-1 pl-4 border-l border-white/[0.04]">
          {loadError === '__unauthenticated__' ? (
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#00e5a0]/[0.04] border border-[#00e5a0]/10">
                <Shield className="w-3.5 h-3.5 text-[#00e5a0] flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5 min-w-0">
                  <p className="text-[10px] leading-relaxed text-[#8b95a8]">
                    Sign in to manage your API keys. Keys are encrypted
                    (AES-256-GCM) and stored on the server so they sync
                    across your devices.
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      onClick={() => openAuthModal('signin')}
                      className="h-7 px-3 text-[10px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-md"
                    >
                      Sign in
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openAuthModal('signup')}
                      className="h-7 px-2 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-md"
                    >
                      Create account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : loadError === '__session_expired__' ? (
            /* Client thinks user is logged in but server returned 401.
               This is the "stale JWT cookie" case — typically caused by
               NEXTAUTH_SECRET being rotated (or the dev server restarting
               with an auto-generated secret). The fix is to sign out
               (clears the bad cookie) and sign back in. */
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/[0.06] border border-amber-500/20">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5 min-w-0">
                  <p className="text-[10px] leading-relaxed text-[#e8ecf4]">
                    <span className="font-semibold">Your session has expired.</span>{' '}
                    {user?.email ? (
                      <>
                        You&apos;re signed in as{' '}
                        <span className="font-mono text-amber-300">{user.email}</span>, but the
                        server can&apos;t verify your session cookie.
                      </>
                    ) : null}{' '}
                    Sign out and sign back in to manage your API keys.
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      onClick={() => {
                        // Sign out (clears the stale cookie), then open
                        // the AuthModal so the user can re-authenticate.
                        // signOutUser();
                        // Small delay so signOut's redirect/callback
                        // doesn't race the modal open.
                        setTimeout(() => openAuthModal('signin'), 400);
                      }}
                      className="h-7 px-3 text-[10px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-md"
                    >
                      Sign out & sign back in
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Just retry — sometimes the cookie refreshes on
                        // its own (e.g. on next session poll).
                        reload();
                      }}
                      className="h-7 px-2 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-md"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" /> Retry
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#ff5757]/[0.06] border border-[#ff5757]/15">
                <AlertCircle className="w-3.5 h-3.5 text-[#ff5757] flex-shrink-0" />
                <span className="text-[10px] text-[#ff5757]">{loadError}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={reload}
                className="h-6 px-2 mt-2 text-[9px] text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Retry
              </Button>
            </>
          )}
        </div>
      )}

      {!loading && !loadError && selectedProvider && (
        <div className="ml-1 pl-4 border-l border-white/[0.04]">
          <div className="flex flex-col sm:flex-row rounded-xl border border-white/[0.06] bg-[#0c0e14]/40 overflow-hidden h-[620px] sm:h-[520px]">
            {/* ── Left: provider sidebar ── */}
            <div className="flex-shrink-0 w-full h-[150px] sm:w-[180px] sm:h-auto flex flex-col border-b sm:border-b-0 sm:border-r border-white/[0.06] bg-[#0c0e14]/60">
              <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {sortedProviders.map((provider) => {
                  const saved = savedKeys[provider.id];
                  const isSelected = selectedProvider.id === provider.id;
                  return (
                    <button
                      key={provider.id}
                      onClick={() => setSelectedProviderId(provider.id)}
                      className={[
                        'w-full flex items-center gap-2 px-2.5 py-2 rounded-md transition-all text-left',
                        isSelected
                          ? 'bg-[#00e5a0]/10 ring-1 ring-[#00e5a0]/40 shadow-sm'
                          : 'hover:bg-white/[0.03]',
                      ].join(' ')}
                    >
                      <ProviderLogo provider={provider} size="sm" />
                      <span
                        className={[
                          'font-medium text-[11px] flex-1 truncate',
                          isSelected ? 'text-[#e8ecf4]' : 'text-[#8b95a8]',
                        ].join(' ')}
                      >
                        {provider.name}
                      </span>
                      {saved && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] flex-shrink-0"
                          title={`${saved.length} endpoint${saved.length === 1 ? '' : 's'} saved`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="p-2 border-t border-white/[0.06]">
                <p className="text-[9px] text-[#5a6478] leading-relaxed px-1">
                  {Object.keys(savedKeys).length} of {BYOK_PROVIDERS.length} providers configured
                </p>
              </div>
            </div>

            {/* ── Right: config panel ── */}
            <div className="flex-1 min-w-0 overflow-y-auto">
              <ProviderConfigPanel
                key={selectedProvider.id}
                provider={selectedProvider}
                savedList={selectedSavedList}
                onChanged={handleChanged}
              />
            </div>
          </div>

          <p className="text-[9px] text-[#5a6478] pt-2 leading-relaxed">
            Keys are tested against each provider&apos;s{' '}
            <code className="text-[#8b95a8]">/models</code> endpoint before being saved.
            Server-managed providers (operator-configured) take precedence over your saved keys.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Provider logo ──

function ProviderLogo({
  provider,
  size = 'md',
}: {
  provider: ByokProviderMeta;
  size?: 'sm' | 'md';
}) {
  const dim = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
  const inner = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  if (!provider.icon) {
    return (
      <div className={`${dim} rounded bg-[#1a1e2b] border border-white/[0.04] flex items-center justify-center flex-shrink-0`}>
        <Box className={`${inner} text-[#5a6478]`} />
      </div>
    );
  }
  return (
    <div
      className={[
        `${dim} rounded bg-white/95 border border-white/[0.04] flex items-center justify-center flex-shrink-0 overflow-hidden`,
        BYOK_MONO_LOGO_IDS.has(provider.id) ? 'bg-[#0c0e14]' : '',
      ].join(' ')}
    >
      <img src={provider.icon} alt={provider.name} className={`${inner} object-contain`} />
    </div>
  );
}

// ── Provider config panel (right pane) — multi-endpoint BYOK ──

interface ProviderConfigPanelProps {
  provider: ByokProviderMeta;
  savedList: SavedKey[] | undefined;
  onChanged: () => void;
}

function ProviderConfigPanel({ provider, savedList, onChanged }: ProviderConfigPanelProps) {
  const saved = savedList?.[0]; // first endpoint — kept for header/managed hints
  const savedCount = savedList?.length ?? 0;
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState(provider.defaultBaseUrl);
  const [label, setLabel] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [discoveredModels, setDiscoveredModels] = useState<string[] | null>(null);
  // Editing an existing endpoint (row id) vs adding a new one.
  const [editingId, setEditingId] = useState<string | null>(null);
  // Per-endpoint busy state (testing / moving / deleting rows).
  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});

  // Models config (per-provider — read from whichever endpoint row carries it)
  // + editing state
  const [models, setModels] = useState<ByokModelConfig[]>([]);
  const [editingModel, setEditingModel] = useState<ByokModelConfig | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showModelDialog, setShowModelDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setApiKey('');
    setBaseUrl(provider.defaultBaseUrl);
    setLabel('');
    setShowKey(false);
    setTestStatus('idle');
    setTestMessage('');
    setDiscoveredModels(null);
    setEditingId(null);
    setRowBusy({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider.id]);

  useEffect(() => {
    if (!saved?.isServerManaged) {
      inputRef.current?.focus();
    }
  }, [provider.id, saved?.isServerManaged]);

  const trimmedKey = apiKey.trim();
  const isReplace = editingId !== null;
  // Keyless providers (Ollama, Lemonade) may save an endpoint that is just a
  // base URL — "my local Ollama" needs no key.
  const keyless = !provider.requiresKey;
  const canSave = (trimmedKey.length > 0 || (keyless && baseUrl.trim().length > 0)) && !saving && !testing;
  const isServerManaged = !!saved?.isServerManaged;

  // Keep the local models list in sync with the saved provider catalog.
  useEffect(() => {
    setModels(savedList?.find((s) => s.modelsConfig)?.modelsConfig ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider.id, savedList]);

  // ── Save (with optional test) — creates a NEW endpoint, or updates the
  // one being edited (editingId). ──
  const handleSave = async (withTest: boolean) => {
    if (!canSave) return;
    setSaving(true);
    setTesting(withTest);
    setTestStatus('idle');
    setTestMessage('');
    try {
      const res = await fetch('/api/user/api-keys', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          providerId: provider.id,
          ...(editingId ? { id: editingId } : {}),
          apiKey: trimmedKey,
          baseUrl: baseUrl.trim() || null,
          label: label.trim() || null,
          test: withTest,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = withTest && data.tested
          ? `Key test failed: ${data.error}`
          : data.error || `HTTP ${res.status}`;
        toast.error(msg);
        setTestStatus('error');
        setTestMessage(msg);
        return;
      }
      toast.success(
        withTest
          ? `Endpoint verified & saved for ${provider.name}`
          : `Endpoint saved for ${provider.name}`,
      );
      setApiKey('');
      setShowKey(false);
      setEditingId(null);
      setTestStatus('success');
      setTestMessage(withTest ? 'Connection verified and endpoint saved.' : 'Endpoint saved.');
      onChanged();
    } catch (e: any) {
      toast.error(e?.message || 'Network error while saving key');
      setTestStatus('error');
      setTestMessage(e?.message || 'Network error');
    } finally {
      setSaving(false);
      setTesting(false);
    }
  };

  // ── Test saved endpoint (per-row Test button) ──
  const handleTestSaved = async (keyId?: string) => {
    if (savedCount === 0) return;
    const targetId = keyId ?? savedList?.[0]?.id;
    if (!targetId) return;
    setRowBusy((prev) => ({ ...prev, [targetId]: true }));
    setTestStatus('idle');
    setTestMessage('');
    try {
      const res = await fetch('/api/user/api-keys/test', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ providerId: provider.id, keyId: targetId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        toast.success(`Endpoint works!${data.model && data.model !== provider.id ? ` Saw model: ${data.model}` : ''}`);
        if (data.models?.length) setDiscoveredModels(data.models);
        onChanged();
      } else {
        toast.error(data.error || 'Endpoint test failed');
      }
    } catch (e: any) {
      toast.error(e?.message || 'Network error');
    } finally {
      setRowBusy((prev) => ({ ...prev, [targetId]: false }));
    }
  };

  // ── Test ad-hoc key (or, for keyless providers, just the base URL) ──
  const handleTestAdhoc = async () => {
    if (!trimmedKey && !(keyless && baseUrl.trim())) return;
    setTesting(true);
    setTestStatus('idle');
    setTestMessage('');
    try {
      const res = await fetch('/api/user/api-keys/test', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          providerId: provider.id,
          ...(trimmedKey ? { apiKey: trimmedKey } : {}),
          baseUrl: baseUrl.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        toast.success(`Key works!${data.model ? ` Saw model: ${data.model}` : ''}`);
        setTestStatus('success');
        setTestMessage('Connection verified.');
        if (data.models?.length) setDiscoveredModels(data.models);
      } else {
        toast.error(data.error || 'Key test failed');
        setTestStatus('error');
        setTestMessage(data.error || 'Key test failed');
      }
    } catch (e: any) {
      toast.error(e?.message || 'Network error');
      setTestStatus('error');
      setTestMessage(e?.message || 'Network error');
    } finally {
      setTesting(false);
    }
  };

  // ── Refresh model list from upstream ──
  const handleRefreshModels = async () => {
    if (!saved) {
      toast.error('Save an endpoint first to discover models');
      return;
    }
    setRefreshing(true);
    try {
      const res = await fetch('/api/user/api-keys/test', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ providerId: provider.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok && data.models?.length) {
        setDiscoveredModels(data.models);
        // Merge discovered models into the config (don't overwrite existing edits)
        const existing = new Set(models.map((m) => m.id));
        const newOnes: ByokModelConfig[] = data.models
          .filter((id: string) => !existing.has(id))
          .map((id: string) => ({
            id,
            name: id,
            capabilities: { streaming: true, tools: false },
          }));
        if (newOnes.length > 0) {
          const merged = [...models, ...newOnes];
          setModels(merged);
          await saveModelsConfig(merged);
          toast.success(`Discovered ${newOnes.length} new model${newOnes.length === 1 ? '' : 's'}`);
        } else {
          toast.success(`All ${data.models.length} models already in your list`);
        }
      } else if (res.ok && data.ok && !data.models?.length) {
        toast.info('Provider is reachable but returned no model list');
      } else {
        toast.error(data.error || 'Failed to refresh models');
      }
    } catch (e: any) {
      toast.error(e?.message || 'Network error');
    } finally {
      setRefreshing(false);
    }
  };

  // ── Save modelsConfig only (PATCH) ──
  const saveModelsConfig = async (newModels: ByokModelConfig[]) => {
    try {
      const res = await fetch('/api/user/api-keys', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          providerId: provider.id,
          modelsConfig: newModels.length > 0 ? newModels : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Failed to save model config');
        return false;
      }
      onChanged();
      return true;
    } catch (e: any) {
      toast.error(e?.message || 'Network error');
      return false;
    }
  };

  // ── Add/Edit/Delete model ──
  const handleAddModel = () => {
    setEditingModel({ id: '', name: '', capabilities: { streaming: true, tools: false } });
    setEditingIndex(null);
    setShowModelDialog(true);
  };

  const handleEditModel = (index: number) => {
    const m = models[index];
    if (!m) return;
    setEditingModel({ ...m, capabilities: { ...m.capabilities } });
    setEditingIndex(index);
    setShowModelDialog(true);
  };

  const handleDeleteModel = async (index: number) => {
    const m = models[index];
    if (!m) return;
    if (!confirm(`Delete model "${m.name || m.id}"?`)) return;
    const next = models.filter((_, i) => i !== index);
    setModels(next);
    await saveModelsConfig(next);
    toast.success(`Deleted ${m.name || m.id}`);
  };

  const handleSaveModel = async (model: ByokModelConfig) => {
    if (!model.id.trim()) {
      toast.error('Model ID is required');
      return;
    }
    let next: ByokModelConfig[];
    if (editingIndex !== null) {
      next = models.map((m, i) => (i === editingIndex ? model : m));
    } else {
      // Check for duplicate
      if (models.some((m) => m.id === model.id)) {
        toast.error(`Model "${model.id}" already exists`);
        return;
      }
      next = [...models, model];
    }
    setModels(next);
    setShowModelDialog(false);
    setEditingModel(null);
    setEditingIndex(null);
    await saveModelsConfig(next);
    toast.success(editingIndex !== null ? 'Model updated' : 'Model added');
  };

  // ── Delete ONE endpoint (or all, when keyId omitted) ──
  const handleDelete = async (keyId?: string) => {
    if (keyId) {
      const row = savedList?.find((s) => s.id === keyId);
      const name = row?.label || row?.maskedKey || 'this endpoint';
      if (!confirm(`Delete endpoint "${name}"? This cannot be undone.`)) return;
    } else {
      if (!confirm(`Delete ALL ${savedCount} ${provider.name} endpoint${savedCount === 1 ? '' : 's'}? This cannot be undone.`)) return;
    }
    setDeleting(true);
    try {
      const url = keyId
        ? `/api/user/api-keys/${encodeURIComponent(provider.id)}?keyId=${encodeURIComponent(keyId)}`
        : `/api/user/api-keys/${encodeURIComponent(provider.id)}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || `HTTP ${res.status}`);
        return;
      }
      toast.success(keyId ? 'Endpoint deleted' : `Deleted all ${provider.name} endpoints`);
      setEditingId(null);
      onChanged();
    } catch (e: any) {
      toast.error(e?.message || 'Network error');
    } finally {
      setDeleting(false);
    }
  };

  // ── Enable / disable an endpoint ──
  const handleToggleEnabled = async (keyId: string, enabled: boolean) => {
    setRowBusy((prev) => ({ ...prev, [keyId]: true }));
    try {
      const res = await fetch(`/api/user/api-keys/${encodeURIComponent(provider.id)}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ keyId, enabled }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || `HTTP ${res.status}`);
        return;
      }
      onChanged();
    } catch (e: any) {
      toast.error(e?.message || 'Network error');
    } finally {
      setRowBusy((prev) => ({ ...prev, [keyId]: false }));
    }
  };

  // ── Reorder an endpoint ──
  const handleMove = async (keyId: string, move: 'up' | 'down') => {
    setRowBusy((prev) => ({ ...prev, [keyId]: true }));
    try {
      const res = await fetch(`/api/user/api-keys/${encodeURIComponent(provider.id)}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ keyId, move }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || `HTTP ${res.status}`);
        return;
      }
      onChanged();
    } catch (e: any) {
      toast.error(e?.message || 'Network error');
    } finally {
      setRowBusy((prev) => ({ ...prev, [keyId]: false }));
    }
  };

  // ── Edit an endpoint in place (fills the form) ──
  const handleEditEndpoint = (row: SavedKey) => {
    setEditingId(row.id);
    setApiKey(''); // leave blank to keep the stored key
    setBaseUrl(row.baseUrl ?? provider.defaultBaseUrl);
    setLabel(row.label ?? '');
    setTestStatus('idle');
    setTestMessage('');
    inputRef.current?.focus();
  };

  // ── Reset models to discovered/default ──
  const handleResetModels = async () => {
    setShowResetDialog(false);
    setModels([]);
    await saveModelsConfig([]);
    toast.success('Models reset — will use auto-discovered list');
  };

  return (
    <div className="p-4 space-y-4">
      {/* ── Provider header ── */}
      <div className="flex items-start gap-3 pb-3 border-b border-white/[0.06]">
        <ProviderLogo provider={provider} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-[#e8ecf4]">{provider.name}</h4>
            {savedCount > 0 && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#00e5a0]/15 text-[#00e5a0]">
                <Check className="w-2.5 h-2.5" /> {savedCount} ENDPOINT{savedCount === 1 ? '' : 'S'}
              </span>
            )}
            {isServerManaged && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#f59e0b]/15 text-[#f59e0b]">
                <Server className="w-2.5 h-2.5" /> SERVER-MANAGED
              </span>
            )}
          </div>
          {savedCount > 0 ? (
            <p className="text-[10px] text-[#5a6478] mt-1">
              Requests spread across enabled endpoints (round-robin) and fail over
              automatically when one is down.
            </p>
          ) : (
            <p className="text-[10px] text-[#5a6478] mt-1">{provider.keyHint}</p>
          )}
        </div>
      </div>

      {/* ── Server-managed notice ── */}
      {isServerManaged && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f59e0b]/[0.06] border border-[#f59e0b]/15">
          <Server className="w-3.5 h-3.5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
          <p className="text-[10px] leading-relaxed text-[#f59e0b]/90">
            The operator has configured <span className="font-semibold">{provider.name}</span> server-side
            (its key takes precedence). Your saved endpoints still control which{' '}
            <span className="font-semibold">base URL</span> is used per request — e.g. saving a local
            Ollama endpoint routes your requests to it.
          </p>
        </div>
      )}

      {/* ── Saved endpoints list (multi-endpoint BYOK) ── */}
      {savedCount > 0 && (
        <div className="space-y-1.5">
          <Label className="text-[10px] font-medium text-[#8b95a8]">
            Endpoints <span className="text-[#5a6478] font-normal">· tried top-to-bottom, load-balanced</span>
          </Label>
          <div className="space-y-1.5">
            {(savedList ?? []).map((row, idx) => (
              <div
                key={row.id}
                className={[
                  'flex items-center gap-2 p-2 rounded-lg border transition-all',
                  row.enabled
                    ? 'border-white/[0.08] bg-[#0c0e14]/60'
                    : 'border-white/[0.05] bg-transparent opacity-60',
                  editingId === row.id ? 'ring-1 ring-[#00e5a0]/40' : '',
                ].join(' ')}
              >
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => !rowBusy[row.id] && handleMove(row.id, 'up')}
                    disabled={idx === 0 || rowBusy[row.id]}
                    className="p-0.5 text-[#5a6478] hover:text-[#e8ecf4] disabled:opacity-25"
                    title="Move up (tried earlier)"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => !rowBusy[row.id] && handleMove(row.id, 'down')}
                    disabled={idx === savedCount - 1 || rowBusy[row.id]}
                    className="p-0.5 text-[#5a6478] hover:text-[#e8ecf4] disabled:opacity-25"
                    title="Move down (tried later)"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-medium text-[#e8ecf4] truncate">
                      {row.label || `Endpoint ${idx + 1}`}
                    </span>
                    <code className="text-[9px] text-[#5a6478] font-mono">{row.maskedKey}</code>
                    {row.lastVerifiedAt && (
                      <span className="text-[9px] text-[#00e5a0]/70">
                        · verified {formatRelative(row.lastVerifiedAt)}
                      </span>
                    )}
                  </div>
                  {row.baseUrl && (
                    <p className="text-[9px] text-[#5a6478] font-mono truncate mt-0.5" title={row.baseUrl}>
                      {row.baseUrl}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTestSaved(row.id)}
                    disabled={rowBusy[row.id]}
                    className="p-1.5 rounded text-[#5a6478] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 disabled:opacity-40"
                    title="Test this endpoint"
                  >
                    {rowBusy[row.id] ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditEndpoint(row)}
                    disabled={rowBusy[row.id]}
                    className="p-1.5 rounded text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.06] disabled:opacity-40"
                    title="Edit endpoint"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleEnabled(row.id, !row.enabled)}
                    disabled={rowBusy[row.id]}
                    className={[
                      'p-1.5 rounded disabled:opacity-40',
                      row.enabled
                        ? 'text-[#00e5a0]/70 hover:text-[#00e5a0] hover:bg-[#00e5a0]/10'
                        : 'text-[#5a6478] hover:text-[#8b95a8] hover:bg-white/[0.06]',
                    ].join(' ')}
                    title={row.enabled ? 'Disable (keep on file, unused)' : 'Enable'}
                  >
                    {row.enabled ? <Shield className="w-3.5 h-3.5" /> : <ShieldOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(row.id)}
                    disabled={rowBusy[row.id] || deleting}
                    className="p-1.5 rounded text-[#5a6478] hover:text-[#ff5757] hover:bg-[#ff5757]/10 disabled:opacity-40"
                    title="Delete endpoint"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Add / update endpoint form (visible even for server-managed
          providers: the user's endpoints still route the base URL — e.g. a
          local Ollama — and supply the key when the operator set none) ── */}
      <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <Label className="text-[10px] font-medium text-[#8b95a8]">
              {editingId ? (
                <>
                  <Wrench className="w-3 h-3 inline mr-1 -mt-0.5" />
                  Update endpoint
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3 inline mr-1 -mt-0.5" />
                  Add another endpoint
                  <span className="text-[#5a6478] font-normal ml-1">
                    (e.g. a second key, or a local server)
                  </span>
                </>
              )}
            </Label>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setApiKey('');
                  setBaseUrl(provider.defaultBaseUrl);
                  setLabel('');
                }}
                className="text-[9px] text-[#5a6478] hover:text-[#e8ecf4]"
              >
                cancel
              </button>
            )}
          </div>

          {/* API key */}
          <div>
            <Label className="text-[10px] font-medium text-[#8b95a8] mb-1.5 flex items-center gap-1.5">
              API Key {!isReplace && !keyless && <span className="text-[#ff5757]">*</span>}
              {keyless && (
                <span className="text-[9px] text-[#5a6478] font-normal">
                  · optional for {provider.name} (a base URL is enough)
                </span>
              )}
              {isReplace && (
                <span className="text-[9px] text-[#5a6478] font-normal">· leave blank to keep current</span>
              )}
            </Label>
            <div className="relative">
              <Input
                ref={inputRef}
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestStatus('idle');
                  setTestMessage('');
                }}
                placeholder={
                  isReplace
                    ? 'Enter new key to replace (blank = keep current)'
                    : keyless
                      ? '(optional — local server needs no key)'
                      : provider.keyHint
                }
                className="h-9 pr-9 text-[11px] font-mono rounded-md border-white/[0.06] bg-[#0c0e14]/70 text-[#e8ecf4] placeholder:text-[#5a6478]/70 placeholder:font-sans"
                autoComplete="off"
                spellCheck={false}
                disabled={saving || deleting}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
                tabIndex={-1}
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ── Base URL ── */}
          <div>
            <Label className="text-[10px] font-medium text-[#8b95a8] mb-1.5 block">
              Base URL{' '}
              <span className="text-[#5a6478] font-normal">
                {keyless ? '(the server address, e.g. http://localhost:11434)' : '(optional — override the default)'}
              </span>
            </Label>
            <Input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder={provider.defaultBaseUrl}
              className="h-9 text-[11px] font-mono rounded-md border-white/[0.06] bg-[#0c0e14]/70 text-[#e8ecf4] placeholder:text-[#5a6478]/70"
              spellCheck={false}
              disabled={saving || deleting}
            />
          </div>

          {/* ── Label ── */}
          <div>
            <Label className="text-[10px] font-medium text-[#8b95a8] mb-1.5 block">
              Label <span className="text-[#5a6478] font-normal">(optional)</span>
            </Label>
            <Input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Remote gateway, Local server, Work key"
              className="h-9 text-[11px] rounded-md border-white/[0.06] bg-[#0c0e14]/70 text-[#e8ecf4] placeholder:text-[#5a6478]/70"
              maxLength={64}
              disabled={saving || deleting}
            />
          </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── Models section (OpenMAIC-faithful) ──                     */}
      {/* ──────────────────────────────────────────────────────────── */}
      {!isServerManaged && (
        <div className="space-y-3 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-[11px] font-medium text-[#8b95a8]">Models</Label>
              {discoveredModels && discoveredModels.length > 0 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00e5a0]/10 text-[#00e5a0]">
                  {discoveredModels.length} discovered
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {models.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowResetDialog(true)}
                  className="h-7 px-2 text-[10px] gap-1 border-white/[0.08] bg-transparent text-[#8b95a8] hover:bg-white/[0.04] hover:text-[#e8ecf4]"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshModels}
                disabled={savedCount === 0 || refreshing}
                className="h-7 px-2 text-[10px] gap-1 border-white/[0.08] bg-transparent text-[#8b95a8] hover:bg-white/[0.04] hover:text-[#e8ecf4] disabled:opacity-40"
                title={savedCount === 0 ? 'Save an endpoint first to discover models' : 'Fetch model list from the first enabled endpoint'}
              >
                {refreshing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddModel}
                className="h-7 px-2 text-[10px] gap-1 border-[#00e5a0]/30 bg-[#00e5a0]/[0.06] text-[#00e5a0] hover:bg-[#00e5a0]/15 hover:border-[#00e5a0]/50"
              >
                <Plus className="w-3 h-3" />
                Add Model
              </Button>
            </div>
          </div>

          {/* Models list */}
          <div className="space-y-1.5">
            {models.length === 0 && (
              <div className="text-center py-6 px-3 rounded-lg border border-dashed border-white/[0.08] bg-[#0c0e14]/40">
                <p className="text-[10px] text-[#5a6478] mb-1">No models configured</p>
                <p className="text-[9px] text-[#5a6478]/70 leading-relaxed">
                  Click <span className="text-[#00e5a0]">Refresh</span> to auto-discover from the provider,
                  or <span className="text-[#00e5a0]">Add Model</span> to enter one manually.
                </p>
              </div>
            )}
            {models.map((model, index) => (
              <ModelCard
                key={model.id + index}
                model={model}
                onEdit={() => handleEditModel(index)}
                onDelete={() => handleDeleteModel(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Test result banner ── */}
      {testMessage && (
        <div
          className={[
            'flex items-start gap-2 p-2.5 rounded-lg text-[10px] leading-relaxed',
            testStatus === 'success'
              ? 'bg-[#00e5a0]/[0.08] border border-[#00e5a0]/20 text-[#00e5a0]'
              : 'bg-[#ff5757]/[0.06] border border-[#ff5757]/20 text-[#ff5757]',
          ].join(' ')}
        >
          {testStatus === 'success' ? (
            <Check className="w-3 h-3 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          )}
          <p className="flex-1 break-words">{testMessage}</p>
        </div>
      )}

      {/* ── Actions ── */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button
            onClick={() => handleSave(true)}
            disabled={!canSave}
            className="h-8 px-3 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-[10px] rounded-md disabled:opacity-40"
          >
            {saving ? (
              <><Loader2 className="w-3 h-3 animate-spin mr-1.5" />{testing ? 'Testing…' : 'Saving…'}</>
            ) : (
              <><Check className="w-3 h-3 mr-1.5" />{isReplace ? 'Update & Test' : 'Add & Test'}</>
            )}
          </Button>
          <Button
            onClick={() => handleSave(false)}
            disabled={!canSave}
            variant="ghost"
            className="h-8 px-2.5 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04]"
          >
            {isReplace ? 'Update Only' : 'Add Only'}
          </Button>
          {(trimmedKey || (keyless && baseUrl.trim())) && !saving && (
            <Button
              onClick={handleTestAdhoc}
              disabled={testing}
              variant="ghost"
              className="h-8 px-2.5 text-[10px] text-[#8b95a8] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10"
            >
              {testing ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : null}
              Test
            </Button>
          )}
          {savedCount > 0 && (
            <Button
              onClick={() => handleDelete()}
              disabled={deleting}
              variant="ghost"
              className="h-8 px-2.5 ml-auto text-[10px] text-[#ff5757] hover:bg-[#ff5757]/10"
              title={`Delete ALL ${savedCount} endpoint${savedCount === 1 ? '' : 's'} for ${provider.name}`}
            >
              {deleting ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Trash2 className="w-3 h-3 mr-1.5" />}
              Delete all
            </Button>
          )}
      </div>

      {/* ── Help link ── */}
      <div className="pt-2 border-t border-white/[0.04]">
        <ProviderHelpLink provider={provider} />
      </div>

      {/* ── Model edit dialog ── */}
      {showModelDialog && editingModel && (
        <ModelEditDialog
          open={showModelDialog}
          onOpenChange={(o) => {
            setShowModelDialog(o);
            if (!o) {
              setEditingModel(null);
              setEditingIndex(null);
            }
          }}
          model={editingModel}
          onChange={setEditingModel}
          onSave={handleSaveModel}
          isEdit={editingIndex !== null}
        />
      )}

      {/* ── Reset confirmation ── */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent className="bg-[#1a1e2b] border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#e8ecf4] text-sm">Reset models?</AlertDialogTitle>
            <AlertDialogDescription className="text-[10px] text-[#8b95a8]">
              This clears your custom model list. The provider will use its auto-discovered
              model list instead. Your API key is not affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-[10px] bg-transparent border-white/[0.08] text-[#8b95a8] hover:bg-white/[0.04]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetModels}
              className="h-8 text-[10px] bg-[#f59e0b] hover:bg-[#d97f0a] text-[#0c0e14]"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Model card (one row in the models list) ──

function ModelCard({
  model,
  onEdit,
  onDelete,
}: {
  model: ByokModelConfig;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg border border-white/[0.06] bg-[#0c0e14]/60 hover:border-white/[0.1] transition-colors">
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[11px] font-medium text-[#e8ecf4] mb-1 truncate">
          {model.name || model.id}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#5a6478] flex-wrap">
          {/* Capabilities */}
          <div className="flex items-center gap-1">
            {model.capabilities?.vision && (
              <span title="Vision" className="text-[#a78bfa]">
                <Sparkles className="w-3 h-3" />
              </span>
            )}
            {model.capabilities?.tools && (
              <span title="Tools" className="text-[#00e5a0]">
                <Wrench className="w-3 h-3" />
              </span>
            )}
            {model.capabilities?.streaming && (
              <span title="Streaming" className="text-[#fbbf24]">
                <Zap className="w-3 h-3" />
              </span>
            )}
            {!model.capabilities?.vision && !model.capabilities?.tools && !model.capabilities?.streaming && (
              <span className="text-[#5a6478]/60 text-[9px]">no capabilities set</span>
            )}
          </div>
          {/* Context window */}
          {model.contextWindow && (
            <span className="flex items-center gap-0.5">
              <FileText className="w-2.5 h-2.5" />
              <span className="text-[9px]">{formatContextWindow(model.contextWindow)}</span>
            </span>
          )}
          {/* Output window */}
          {model.outputWindow && (
            <span className="flex items-center gap-0.5">
              <Send className="w-2.5 h-2.5" />
              <span className="text-[9px]">{formatContextWindow(model.outputWindow)}</span>
            </span>
          )}
          {/* Model ID (if different from name) */}
          {model.name && model.name !== model.id && (
            <code className="text-[9px] text-[#5a6478]/70 font-mono">{model.id}</code>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 ml-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7 p-0 border-white/[0.06] bg-transparent text-[#8b95a8] hover:bg-white/[0.04] hover:text-[#e8ecf4]"
          onClick={onEdit}
          title="Edit model"
        >
          <Settings2 className="w-3 h-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7 p-0 border-white/[0.06] bg-transparent text-[#ff5757] hover:bg-[#ff5757]/10"
          onClick={onDelete}
          title="Delete model"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

// ── Model edit dialog — OpenMAIC ModelEditDialog faithful port ──

interface ModelEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  model: ByokModelConfig;
  onChange: (model: ByokModelConfig) => void;
  onSave: (model: ByokModelConfig) => void;
  isEdit: boolean;
}

function ModelEditDialog({
  open,
  onOpenChange,
  model,
  onChange,
  onSave,
  isEdit,
}: ModelEditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-[#1a1e2b] border-white/[0.08] text-[#e8ecf4]">
        <DialogTitle className="sr-only">
          {isEdit ? 'Edit model' : 'Add new model'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {isEdit ? 'Edit model configuration' : 'Add a new model to the catalog'}
        </DialogDescription>
        <div className="space-y-4">
          <div className="pb-3 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-[#e8ecf4]">
              {isEdit ? 'Edit model' : 'Add new model'}
            </h2>
          </div>

          {/* Model ID */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium text-[#8b95a8]">Model ID</Label>
            <Input
              placeholder="e.g. gpt-4o, claude-haiku-4-5, gemini-2.5-flash"
              value={model.id}
              onChange={(e) => {
                const newId = e.target.value;
                const currentName = model.name;
                // Auto-sync name if it's empty or matches the old ID
                const shouldSyncName = !currentName || currentName === model.id;
                onChange({
                  ...model,
                  id: newId,
                  name: shouldSyncName ? newId : currentName,
                });
              }}
              className="h-9 text-[11px] font-mono rounded-md border-white/[0.06] bg-[#0c0e14]/70 text-[#e8ecf4] placeholder:text-[#5a6478]/70"
              spellCheck={false}
            />
            <p className="text-[9px] text-[#5a6478]">
              The exact model identifier the provider&apos;s API expects.
            </p>
          </div>

          {/* Display name */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium text-[#8b95a8]">Display name</Label>
            <Input
              placeholder="Human-friendly name (defaults to model ID)"
              value={model.name}
              onChange={(e) => onChange({ ...model, name: e.target.value })}
              className="h-9 text-[11px] rounded-md border-white/[0.06] bg-[#0c0e14]/70 text-[#e8ecf4] placeholder:text-[#5a6478]/70"
            />
          </div>

          {/* Capabilities */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-medium text-[#8b95a8]">Capabilities</Label>
            <div className="flex gap-3 flex-wrap">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={!!model.capabilities?.vision}
                  onCheckedChange={(checked) =>
                    onChange({
                      ...model,
                      capabilities: { ...model.capabilities, vision: !!checked },
                    })
                  }
                />
                <span className="text-[11px] flex items-center gap-1 text-[#e8ecf4]">
                  <Sparkles className="w-3 h-3 text-[#a78bfa]" />
                  Vision
                </span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={!!model.capabilities?.tools}
                  onCheckedChange={(checked) =>
                    onChange({
                      ...model,
                      capabilities: { ...model.capabilities, tools: !!checked },
                    })
                  }
                />
                <span className="text-[11px] flex items-center gap-1 text-[#e8ecf4]">
                  <Wrench className="w-3 h-3 text-[#00e5a0]" />
                  Tools
                </span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <Checkbox
                  checked={!!model.capabilities?.streaming}
                  onCheckedChange={(checked) =>
                    onChange({
                      ...model,
                      capabilities: { ...model.capabilities, streaming: !!checked },
                    })
                  }
                />
                <span className="text-[11px] flex items-center gap-1 text-[#e8ecf4]">
                  <Zap className="w-3 h-3 text-[#fbbf24]" />
                  Streaming
                </span>
              </label>
            </div>
          </div>

          {/* Advanced settings */}
          <div className="space-y-3 pt-3 border-t border-white/[0.06]">
            <Label className="text-[10px] font-medium text-[#8b95a8]">Advanced settings</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] text-[#8b95a8]">Context window</Label>
                <Input
                  type="number"
                  placeholder="e.g. 128000"
                  value={model.contextWindow ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...model,
                      contextWindow: e.target.value ? parseInt(e.target.value, 10) : undefined,
                    })
                  }
                  className="h-8 text-[11px] rounded-md border-white/[0.06] bg-[#0c0e14]/70 text-[#e8ecf4] placeholder:text-[#5a6478]/70"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] text-[#8b95a8]">Output window</Label>
                <Input
                  type="number"
                  placeholder="e.g. 16384"
                  value={model.outputWindow ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...model,
                      outputWindow: e.target.value ? parseInt(e.target.value, 10) : undefined,
                    })
                  }
                  className="h-8 text-[11px] rounded-md border-white/[0.06] bg-[#0c0e14]/70 text-[#e8ecf4] placeholder:text-[#5a6478]/70"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 text-[10px] bg-transparent border-white/[0.08] text-[#8b95a8] hover:bg-white/[0.04]"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => onSave(model)}
              disabled={!model.id.trim()}
              className="h-8 text-[10px] bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold disabled:opacity-40"
            >
              {isEdit ? 'Save changes' : 'Add model'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Help link ──

function ProviderHelpLink({ provider }: { provider: ByokProviderMeta }) {
  const HELP_URLS: Record<string, string> = {
    openai: 'https://platform.openai.com/api-keys',
    anthropic: 'https://console.anthropic.com/settings/keys',
    google: 'https://aistudio.google.com/apikey',
    deepseek: 'https://platform.deepseek.com/api_keys',
    glm: 'https://open.bigmodel.cn/usercenter/apikeys',
    qwen: 'https://dashscope.console.aliyun.com/apiKey',
    kimi: 'https://platform.moonshot.cn/console/api-keys',
    minimax: 'https://platform.minimaxi.com/user-center/basic-information/interface-key',
    siliconflow: 'https://cloud.siliconflow.cn/account/ak',
    doubao: 'https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey',
    openrouter: 'https://openrouter.ai/keys',
    grok: 'https://console.x.ai',
    xiaomi: 'https://platform.xiaomimimo.com/console/apikey',
  };
  const url = HELP_URLS[provider.id];
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[10px] text-[#5a6478] hover:text-[#00e5a0] transition-colors"
    >
      <ExternalLink className="w-3 h-3" />
      Get a {provider.name} API key
    </a>
  );
}

// ── Utils ──

function formatRelative(iso: string): string {
  try {
    const d = new Date(iso);
    const diffMs = Date.now() - d.getTime();
    const min = Math.floor(diffMs / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 30) return `${day}d ago`;
    return d.toLocaleDateString();
  } catch {
    return '';
  }
}

function formatContextWindow(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(0)}K`;
  return String(tokens);
}
