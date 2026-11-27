'use client';

/**
 * ByokHub — the FreeLLMAPI-style BYOK center (replaces ByokSettingsSection).
 *
 * Layout:
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │ header: title · default-model picker · [+ Add key]           │
 *   │ tabs:   Providers | Models | Analytics                        │
 *   ├──────────────────────────────────────────────────────────────┤
 *   │ Providers: search + filter + provider cards (keys, models)    │
 *   │ Models:    unified table of every model the user can use      │
 *   │ Analytics: stat cards + charts + recent calls                 │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * The default-model picker in the header is THE fix for "I can't see the
 * model I added": it lists everything from /api/providers, whose byok
 * section is built from the user's modelsConfig.
 */

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, KeyRound, AlertCircle, Shield, RefreshCw, Layers, BarChart3, Server, User } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { openAuthModal } from '@/lib/utils/app-events';
import type { ByokProviderMeta } from '@/lib/ai/byok-providers';
import { parseModelString } from '@/lib/ai/model-catalog';
import { SegmentedControl, PlatformDot, CapabilityChip, ContextChip } from './shared';
import { useByokData, type SavedKey, type ByokModelConfig } from './useByokData';
import { ModelPicker } from './ModelPicker';
import ProviderList from './ProviderList';
import AddKeyDialog from './AddKeyDialog';
import EditKeyDialog from './EditKeyDialog';
import ModelEditDialog from './ModelEditDialog';
import DiscoverModelsDialog from './DiscoverModelsDialog';
import AnalyticsPanel from './AnalyticsPanel';
import { AiModelsGuideButton } from '@/components/medq/AiModelsGuide';

type Tab = 'providers' | 'models' | 'analytics';

export interface ByokHubProps {
  onKeysChanged?: () => void;
}

export default function ByokHub({ onKeysChanged }: ByokHubProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const b = useByokData();

  const [tab, setTab] = useState<Tab>('providers');
  const [addOpen, setAddOpen] = useState(false);
  const [addPreset, setAddPreset] = useState<ByokProviderMeta | null>(null);
  const [editingKey, setEditingKey] = useState<SavedKey | null>(null);
  const [discoverTarget, setDiscoverTarget] = useState<SavedKey | null>(null);
  const [modelEdit, setModelEdit] = useState<{
    provider: ByokProviderMeta;
    key: SavedKey;
    model: ByokModelConfig | null;
  } | null>(null);
  const [testingKeyId, setTestingKeyId] = useState<string | null>(null);
  const [discoveringKeyId, setDiscoveringKeyId] = useState<string | null>(null);
  // After AddKeyDialog succeeds, offer model discovery for the new endpoint
  // once the refreshed keys list lands (state updates async after reload).
  const [pendingDiscoverKeyId, setPendingDiscoverKeyId] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingDiscoverKeyId) return;
    const k = b.keys.find((x) => x.id === pendingDiscoverKeyId);
    if (k) {
      setPendingDiscoverKeyId(null);
      setDiscoverTarget(k);
    }
  }, [pendingDiscoverKeyId, b.keys]);

  const existingProviderIds = useMemo(
    () => new Set(b.keys.map((k) => k.providerId)),
    [b.keys],
  );

  // ── Handlers ──

  const handleToggle = async (k: SavedKey, enabled: boolean) => {
    try {
      await b.toggleKey(k.id, k.providerId, enabled);
      onKeysChanged?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not update the endpoint');
    }
  };

  const handleDelete = async (k: SavedKey) => {
    try {
      await b.deleteKey(k.id, k.providerId);
      toast.success('Endpoint deleted');
      onKeysChanged?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not delete the endpoint');
    }
  };

  const handleMove = async (k: SavedKey, move: 'up' | 'down') => {
    try {
      await b.moveKey(k.id, k.providerId, move);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not reorder');
    }
  };

  const handleTest = async (k: SavedKey) => {
    setTestingKeyId(k.id);
    try {
      const res = await b.testKey(k.id, k.providerId);
      if (res.ok) {
        toast.success(`Key works${res.models?.length ? ` — ${res.models.length} models available` : ''}`);
      } else {
        toast.error(res.error || 'Key test failed');
      }
    } finally {
      setTestingKeyId(null);
    }
  };

  const handleDiscover = async (k: SavedKey) => {
    // The dialog does its own live probe; opening it is all we do here.
    setDiscoverTarget(k);
  };

  const handleAddModel = (provider: ByokProviderMeta, key: SavedKey) => {
    setModelEdit({ provider, key, model: null });
  };

  const handleEditModel = (provider: ByokProviderMeta, key: SavedKey, model: ByokModelConfig) => {
    setModelEdit({ provider, key, model });
  };

  const handleSaveModel = async (provider: ByokProviderMeta, key: SavedKey, model: ByokModelConfig) => {
    try {
      const existing = key.modelsConfig ?? [];
      const next = existing.some((m) => m.id === model.id)
        ? existing.map((m) => (m.id === model.id ? model : m))
        : [...existing, model];
      await b.saveModels(key.providerId, next);
      toast.success(`${model.id} saved — visible in every model picker`);
      onKeysChanged?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save the model');
    }
  };

  const handleDeleteModel = async (provider: ByokProviderMeta, key: SavedKey, modelId: string) => {
    try {
      const next = (key.modelsConfig ?? []).filter((m) => m.id !== modelId);
      await b.saveModels(key.providerId, next.length ? next : null);
      toast.success(`${modelId} removed`);
      onKeysChanged?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not remove the model');
    }
  };

  const handleSetDefault = async (model: string | null) => {
    try {
      await b.setDefaultModel(model);
      toast.success(model ? `Default model set to ${model}` : 'Default model cleared — back to Auto');
    } catch {
      toast.error('Could not save the default model');
    }
  };

  // ── Models tab data: every model the user can use, from the live catalog ──
  const modelRows = useMemo(() => {
    if (!b.catalog) return [];
    const rows: Array<{
      value: string; providerId: string; providerName: string; section: 'server' | 'byok' | 'local';
      name: string; contextWindow?: number; vision?: boolean; tools?: boolean;
    }> = [];
    const sections = [
      ['server', b.catalog.server] as const,
      ['byok', b.catalog.byok] as const,
      ['local', b.catalog.local] as const,
    ];
    for (const [section, providers] of sections) {
      for (const p of providers) {
        for (const m of p.models) {
          rows.push({
            value: `${p.id}:${m.id}`,
            providerId: p.id,
            providerName: p.name,
            section,
            name: m.name,
            contextWindow: m.contextWindow,
            vision: m.capabilities?.vision,
            tools: m.capabilities?.tools,
          });
        }
      }
    }
    return rows;
  }, [b.catalog]);

  const userDefault = b.catalog?.userDefault ?? null;
  const defaultParsed = userDefault ? parseModelString(userDefault) : null;
  const totalModels = modelRows.length;
  const byokModels = modelRows.filter((r) => r.section === 'byok').length;

  // ── Error states (auth) ──
  if (!b.loading && b.loadError) {
    return (
      <div className="space-y-3">
        <Header
          tab={tab} setTab={setTab}
          totalModels={totalModels}
          onAddKey={() => setAddOpen(true)}
          defaultModel={userDefault}
          onSetDefault={handleSetDefault}
          catalogLoading={b.catalogLoading}
        />
        {b.loadError === '__unauthenticated__' && (
          <AuthNotice
            icon={<Shield className="w-3.5 h-3.5 text-[#00e5a0]" />}
            text="Sign in to manage your API keys. Keys are encrypted (AES-256-GCM) and stored on the server so they sync across your devices."
            action={(
              <>
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
              </>
            )}
          />
        )}
        {b.loadError === '__session_expired__' && (
          <AuthNotice
            icon={<AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
            text={
              <>
                <span className="font-semibold text-[#e8ecf4]">Your session has expired.</span>{' '}
                {user?.email ? (
                  <>You&apos;re signed in as <span className="font-mono text-amber-300">{user.email}</span>, but the server can&apos;t verify the session cookie.</>
                ) : null}{' '}
                Sign out and back in to manage your keys.
              </>
            }
            action={(
              <>
                <Button
                  size="sm"
                  onClick={() => setTimeout(() => openAuthModal('signin'), 400)}
                  className="h-7 px-3 text-[10px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-md"
                >
                  Sign out & back in
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => b.reload()}
                  className="h-7 px-2 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-md"
                >
                  <RefreshCw className="w-3 h-3 mr-1" /> Retry
                </Button>
              </>
            )}
            tone="amber"
          />
        )}
        {b.loadError !== '__unauthenticated__' && b.loadError !== '__session_expired__' && (
          <AuthNotice
            icon={<AlertCircle className="w-3.5 h-3.5 text-[#ff5757]" />}
            text={b.loadError}
            tone="red"
            action={(
              <Button
                variant="ghost"
                size="sm"
                onClick={() => b.reload()}
                className="h-7 px-2 text-[10px] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-md"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Retry
              </Button>
            )}
          />
        )}
      </div>
    );
  }

  // ── Main render ──
  return (
    <div className="space-y-4">
      <Header
        tab={tab} setTab={setTab}
        totalModels={totalModels}
        onAddKey={() => { setAddPreset(null); setAddOpen(true); }}
        defaultModel={userDefault}
        onSetDefault={handleSetDefault}
        catalogLoading={b.catalogLoading}
      />

      {tab === 'providers' && (
        <ProviderList
          keys={b.keys}
          testResults={b.testResults}
          loading={b.loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onMove={handleMove}
          onTest={handleTest}
          onDiscover={handleDiscover}
          onEdit={(k) => setEditingKey(k)}
          onAddModel={handleAddModel}
          onEditModel={handleEditModel}
          onDeleteModel={handleDeleteModel}
          onAddKey={(p) => { setAddPreset(p ?? null); setAddOpen(true); }}
          testingKeyId={testingKeyId}
          discoveringKeyId={discoveringKeyId}
        />
      )}

      {tab === 'models' && (
        <ModelsTable
          rows={modelRows}
          loading={b.catalogLoading}
          defaultModel={userDefault}
          onSetDefault={handleSetDefault}
          byokModels={byokModels}
        />
      )}

      {tab === 'analytics' && <AnalyticsPanel />}

      {/* Dialogs (mounted only-while-open) */}
      {addOpen && (
        <AddKeyDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          initialProvider={addPreset}
          existingProviderIds={existingProviderIds}
          onAdded={(_providerId, keyId) => {
            onKeysChanged?.();
            // Offer discovery right away for the endpoint just added.
            if (keyId) setPendingDiscoverKeyId(keyId);
          }}
          saveKey={b.saveKey}
        />
      )}

      {editingKey && (
        <EditKeyDialog
          key={editingKey.id}
          keyData={editingKey}
          onClose={() => setEditingKey(null)}
          onSave={async (p) => {
            const res = await b.saveKey(p);
            if (res.ok) onKeysChanged?.();
            return res;
          }}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )}

      {modelEdit && (
        <ModelEditDialog
          open
          onClose={() => setModelEdit(null)}
          model={modelEdit.model}
          providerName={modelEdit.provider.name}
          existingIds={(modelEdit.key.modelsConfig ?? []).map((m) => m.id)}
          onSave={(m) => handleSaveModel(modelEdit.provider, modelEdit.key, m)}
        />
      )}

      {discoverTarget && (
        <DiscoverModelsDialog
          target={discoverTarget}
          onClose={() => setDiscoverTarget(null)}
          testKey={async (keyId, providerId) => {
            setDiscoveringKeyId(keyId ?? null);
            try {
              return await b.testKey(keyId, providerId);
            } finally {
              setDiscoveringKeyId(null);
            }
          }}
          saveModels={async (providerId, models) => {
            await b.saveModels(providerId, models);
            onKeysChanged?.();
          }}
        />
      )}
    </div>
  );
}

// ── Header (title + default-model picker + tabs + add button) ──

function Header({
  tab, setTab, totalModels, onAddKey, defaultModel, onSetDefault, catalogLoading,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  totalModels: number;
  onAddKey: () => void;
  defaultModel: string | null;
  onSetDefault: (m: string | null) => void;
  catalogLoading: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 flex-wrap">
        <div className="min-w-0">
          <h3 className="text-xs font-bold text-[#8b95a8] uppercase tracking-wider flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#00e5a0]" />
            AI Providers (Bring Your Own Key)
          </h3>
          <p className="mt-1 text-[10px] text-[#5a6478] leading-relaxed max-w-lg">
            Keys are encrypted (AES-256-GCM) server-side and sync across devices. Multiple
            endpoints per provider get round-robin load spreading with automatic failover.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          {/* THE model switcher — reads the live catalog (models I added are here) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[#5a6478] hidden sm:inline">
              Default model
            </span>
            <ModelPicker
              value={defaultModel}
              onChange={onSetDefault}
              compact
              placeholder="Auto (server decides)"
            />
          </div>
          <AiModelsGuideButton label="How it works" />
          <Button
            size="sm"
            onClick={onAddKey}
            className="h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg gap-1.5"
          >
            <Plus className="size-3.5" /> Add key
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <SegmentedControl<Tab>
          options={[
            { value: 'providers', label: 'Providers' },
            { value: 'models', label: 'Models', count: catalogLoading ? undefined : totalModels },
            { value: 'analytics', label: 'Analytics' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>
    </div>
  );
}

// ── Models tab: unified searchable table ──

function ModelsTable({
  rows, loading, defaultModel, onSetDefault, byokModels,
}: {
  rows: Array<{
    value: string; providerId: string; providerName: string; section: 'server' | 'byok' | 'local';
    name: string; contextWindow?: number; vision?: boolean; tools?: boolean;
  }>;
  loading: boolean;
  defaultModel: string | null;
  onSetDefault: (m: string | null) => void;
  byokModels: number;
}) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const lq = q.trim().toLowerCase();
    if (!lq) return rows;
    return rows.filter(
      (r) => r.name.toLowerCase().includes(lq) || r.value.toLowerCase().includes(lq),
    );
  }, [rows, q]);

  if (loading) {
    return <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] h-40 animate-pulse" />;
  }

  if (!rows.length) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] px-6 py-10 text-center space-y-2">
        <Layers className="mx-auto size-5 text-[#00e5a0]" />
        <p className="text-xs font-semibold text-[#e8ecf4]">No models yet</p>
        <p className="text-[10px] text-[#8b95a8] max-w-xs mx-auto leading-relaxed">
          Add a provider key on the Providers tab, then use Discover (lists models from the
          endpoint) or Add model by hand.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search models…"
            className="h-8 w-56 rounded-lg bg-[#08090f] border border-white/[0.08] pl-8 pr-3 text-[11px] text-[#e8ecf4] placeholder:text-[#5a6478] outline-none focus:border-[#00e5a0]/30"
          />
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6478]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <span className="text-[10px] text-[#5a6478] tabular-nums ml-auto">
          {byokModels} yours · {rows.length - byokModels} server/local
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14] overflow-hidden">
        <div className="max-h-[50vh] overflow-y-auto divide-y divide-white/[0.04]">
          {filtered.map((r) => {
            const isDefault = defaultModel === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => onSetDefault(isDefault ? null : r.value)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-white/[0.03] text-left transition-colors',
                  isDefault && 'bg-[#00e5a0]/[0.05]',
                )}
              >
                <PlatformDot providerId={r.providerId} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[#e8ecf4] truncate">{r.name}</span>
                    {r.vision && <CapabilityChip kind="vision" />}
                    {r.tools && <CapabilityChip kind="tools" />}
                    <ContextChip tokens={r.contextWindow} />
                  </span>
                  <span className="block text-[9px] text-[#5a6478] font-mono truncate">{r.value}</span>
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <SectionBadge section={r.section} />
                  {isDefault && (
                    <span className="text-[9px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15 font-semibold">
                      default
                    </span>
                  )}
                </span>
              </button>
            );
          })}
          {!filtered.length && (
            <p className="px-4 py-8 text-center text-[10px] text-[#5a6478]">
              No models match “{q}”
            </p>
          )}
        </div>
      </div>
      <p className="text-[9px] text-[#5a6478]">
        Click a model to make it your app-wide default (used for explanations, tutor, and
        generation). The server default applies when nothing is selected.
      </p>
    </div>
  );
}

function SectionBadge({ section }: { section: 'server' | 'byok' | 'local' }) {
  const meta = {
    server: { label: 'server', cls: 'text-[#8b95a8] bg-white/[0.04] border-white/[0.06]', icon: Server },
    byok: { label: 'yours', cls: 'text-[#00e5a0] bg-[#00e5a0]/10 border-[#00e5a0]/15', icon: User },
    local: { label: 'local', cls: 'text-[#8b95a8] bg-white/[0.04] border-white/[0.06]', icon: BarChart3 },
  }[section];
  const Icon = meta.icon;
  return (
    <span className={cn('inline-flex items-center gap-1 text-[8px] rounded-full px-1.5 py-px border', meta.cls)}>
      <Icon className="size-2.5" /> {meta.label}
    </span>
  );
}

// ── Auth notice (shared with old section's pattern) ──

function AuthNotice({
  icon, text, action, tone = 'green',
}: {
  icon: React.ReactNode; text: React.ReactNode; action?: React.ReactNode;
  tone?: 'green' | 'amber' | 'red';
}) {
  const cls = {
    green: 'bg-[#00e5a0]/[0.04] border-[#00e5a0]/10',
    amber: 'bg-amber-500/[0.06] border-amber-500/20',
    red: 'bg-[#ff5757]/[0.06] border-[#ff5757]/15',
  }[tone];
  return (
    <div className={cn('flex items-start gap-2 p-2.5 rounded-lg border', cls)}>
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      <div className="space-y-1.5 min-w-0">
        <p className="text-[10px] leading-relaxed text-[#8b95a8]">{text}</p>
        {action && <div className="flex items-center gap-1.5">{action}</div>}
      </div>
    </div>
  );
}
