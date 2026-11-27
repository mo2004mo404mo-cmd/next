'use client';

/**
 * AddKeyDialog — FreeLLMAPI's 3-pane add-key pattern, MedQ-flavored.
 *
 * Panes (SegmentedControl):
 *   Provider : pick a known provider → paste key (+ optional baseUrl/label)
 *   Custom   : any OpenAI-compatible endpoint (baseUrl + optional key)
 *
 * After a successful provider-pane add, offers to discover models from the
 * endpoint's /models (the freellmapi "post-add scope picker" hand-off).
 */

import { useEffect, useMemo, useState } from 'react';
import { Search, Eye, EyeOff, Loader2, ExternalLink, KeyRound, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { BYOK_PROVIDERS, type ByokProviderMeta } from '@/lib/ai/byok-providers';
import { ProviderAvatar, SegmentedControl } from './shared';

export interface AddKeyDialogProps {
  open: boolean;
  onClose: () => void;
  initialProvider?: ByokProviderMeta | null;
  /** Providers the user already has endpoints for (shown as hints). */
  existingProviderIds: Set<string>;
  onAdded: (providerId: string, keyId?: string) => void;
  saveKey: (params: {
    id?: string;
    providerId: string;
    apiKey?: string;
    baseUrl?: string | null;
    label?: string | null;
    test?: boolean;
  }) => Promise<{ ok: boolean; error?: string; keyId?: string }>;
}

type Pane = 'provider' | 'custom';

export default function AddKeyDialog({
  open, onClose, initialProvider, existingProviderIds, onAdded, saveKey,
}: AddKeyDialogProps) {
  const [pane, setPane] = useState<Pane>('provider');
  const [providerId, setProviderId] = useState<string>('');
  const [providerQuery, setProviderQuery] = useState('');
  const [providerListOpen, setProviderListOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [label, setLabel] = useState('');
  const [saving, setSaving] = useState(false);
  const [attempted, setAttempted] = useState(false);
  // Custom pane: which registry provider to save the custom endpoint under.
  // "openai" is the generic OpenAI-compatible bucket; the baseUrl override
  // is what makes the row a custom endpoint.
  const [customProviderId, setCustomProviderId] = useState('openai');

  const provider = useMemo(
    () => BYOK_PROVIDERS.find((p) => p.id === providerId) ?? null,
    [providerId],
  );

  // Reset on open; jump straight to a preselected provider when given.
  useEffect(() => {
    if (open) {
      setPane('provider');
      setProviderId(initialProvider?.id ?? '');
      setProviderQuery('');
      setProviderListOpen(false);
      setApiKey('');
      setShowKey(false);
      setBaseUrl(initialProvider?.defaultBaseUrl ?? '');
      setLabel('');
      setCustomProviderId('openai');
      setSaving(false);
      setAttempted(false);
    }
  }, [open, initialProvider]);

  const filteredProviders = useMemo(() => {
    const q = providerQuery.trim().toLowerCase();
    if (!q) return BYOK_PROVIDERS;
    return BYOK_PROVIDERS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.id.includes(q),
    );
  }, [providerQuery]);

  const keyOptional = provider?.requiresKey === false;

  const submit = async (mode: 'test' | 'only') => {
    setAttempted(true);
    if (pane === 'provider' && !provider) {
      toast.error('Pick a provider first');
      return;
    }
    // Both panes save under a REGISTRY provider id — the data model stores
    // custom endpoints as (providerId + baseUrl override) rows.
    const pid = pane === 'provider' ? provider!.id : customProviderId;
    const keyRequired = pane === 'provider' && provider?.requiresKey === true;
    if (keyRequired && !apiKey.trim()) {
      toast.error('Paste your API key first');
      return;
    }
    if (pane === 'custom' && !baseUrl.trim()) {
      toast.error('Enter the endpoint base URL');
      return;
    }
    setSaving(true);
    try {
      const res = await saveKey({
        providerId: pid,
        apiKey: apiKey.trim() || undefined,
        baseUrl: baseUrl.trim() || null,
        label: label.trim() || null,
        ...(mode === 'test' ? { test: true } : {}),
      });
      if (!res.ok) {
        toast.error(res.error || 'Could not save the key');
        return;
      }
      toast.success(mode === 'test' ? 'Key saved & verified' : 'Key saved');
      onAdded(pid, res.keyId);
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save the key');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-lg bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden">
        <div className="px-5 pt-5 pb-3 space-y-2">
          <DialogTitle className="text-sm font-bold text-[#e8ecf4]">Add AI provider</DialogTitle>
          <DialogDescription className="text-[10px] text-[#8b95a8] leading-relaxed">
            Keys are encrypted (AES-256-GCM) on the server and sync across your devices.
          </DialogDescription>
          <SegmentedControl<Pane>
            options={[
              { value: 'provider', label: 'Known provider' },
              { value: 'custom', label: 'Custom endpoint' },
            ]}
            value={pane}
            onChange={setPane}
          />
        </div>

        <div className="px-5 pb-5 space-y-3">
          {pane === 'provider' ? (
            <>
              {/* Provider combobox */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-semibold text-[#8b95a8]">Provider</Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProviderListOpen((o) => !o)}
                    className="w-full flex items-center gap-2 h-9 rounded-lg border border-white/[0.08] bg-[#08090f] px-2.5 text-left hover:border-[#00e5a0]/30 transition-colors"
                  >
                    {provider ? (
                      <>
                        <ProviderAvatar provider={provider} size="sm" />
                        <span className="text-[11px] font-medium text-[#e8ecf4]">{provider.name}</span>
                        {existingProviderIds.has(provider.id) && (
                          <span className="text-[9px] text-[#00e5a0]">· added</span>
                        )}
                      </>
                    ) : (
                      <span className="text-[11px] text-[#5a6478]">Select a provider…</span>
                    )}
                    <Search className="size-3.5 text-[#5a6478] ml-auto" />
                  </button>
                  {providerListOpen && (
                    <div className="absolute z-20 mt-1 w-full rounded-lg border border-white/[0.08] bg-[#0c0e14] shadow-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-2.5 h-9 border-b border-white/[0.06]">
                        <Search className="size-3.5 text-[#5a6478]" />
                        <input
                          autoFocus
                          value={providerQuery}
                          onChange={(e) => setProviderQuery(e.target.value)}
                          placeholder="Search providers…"
                          className="flex-1 bg-transparent text-[11px] text-[#e8ecf4] placeholder:text-[#5a6478] outline-none"
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto py-1">
                        {filteredProviders.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setProviderId(p.id);
                              setBaseUrl(p.defaultBaseUrl);
                              setProviderListOpen(false);
                            }}
                            className={cn(
                              'w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-white/[0.04] text-left',
                              providerId === p.id && 'bg-[#00e5a0]/[0.06]',
                            )}
                          >
                            <ProviderAvatar provider={p} size="sm" />
                            <span className="min-w-0 flex-1">
                              <span className="block text-[11px] font-medium text-[#e8ecf4] truncate">{p.name}</span>
                              {!p.requiresKey && (
                                <span className="block text-[9px] text-[#5a6478]">keyless — just needs the URL</span>
                              )}
                            </span>
                            {existingProviderIds.has(p.id) && (
                              <span className="text-[8px] rounded-full px-1.5 py-px bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/15 shrink-0">
                                added
                              </span>
                            )}
                          </button>
                        ))}
                        {!filteredProviders.length && (
                          <p className="px-3 py-4 text-center text-[10px] text-[#5a6478]">No match</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {attempted && !provider && (
                  <p className="text-[9px] text-[#ff5757]">Pick a provider to continue.</p>
                )}
              </div>

              {/* API key */}
              {provider && (
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-semibold text-[#8b95a8]">
                    API key {keyOptional && <span className="text-[#5a6478] font-normal">(optional — keyless)</span>}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showKey ? 'text' : 'password'}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={provider.keyHint}
                      className="h-9 pr-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey((s) => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#e8ecf4]"
                      aria-label={showKey ? 'Hide key' : 'Show key'}
                    >
                      {showKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>
                  </div>
                  {attempted && !keyOptional && !apiKey.trim() && (
                    <p className="text-[9px] text-[#ff5757]">The API key is required for this provider.</p>
                  )}
                  <p className="text-[9px] text-[#5a6478]">
                    The key never appears in browser storage — it is encrypted server-side.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold text-[#8b95a8]">Base URL</Label>
              <div className="relative">
                <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6478]" />
                <Input
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://your-gateway.example.com/v1"
                  className="h-9 pl-8 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                />
              </div>
              <p className="text-[9px] text-[#5a6478] leading-relaxed">
                Any OpenAI-compatible endpoint (vLLM, LM Studio, llama.cpp, a relay, FreeLLMAPI…).
                Save it as the <span className="font-mono text-[#8b95a8]">openai</span> provider
                override below or as a custom provider id.
              </p>
              <div className="space-y-1.5 pt-1">
                <Label className="text-[10px] font-semibold text-[#8b95a8]">
                  API key <span className="text-[#5a6478] font-normal">(optional)</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-… (leave empty for keyless gateways)"
                    className="h-9 pr-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey((s) => !s)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#e8ecf4]"
                  >
                    {showKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5 pt-1">
                <Label className="text-[10px] font-semibold text-[#8b95a8]">
                  Save under provider <span className="text-[#5a6478] font-normal">(how it talks to the endpoint)</span>
                </Label>
                <select
                  value={customProviderId}
                  onChange={(e) => setCustomProviderId(e.target.value)}
                  className="h-9 w-full rounded-lg border border-white/[0.08] bg-[#08090f] px-2.5 text-[11px] text-[#e8ecf4] outline-none focus:border-[#00e5a0]/30"
                >
                  {BYOK_PROVIDERS.filter((p) => p.id !== 'ollama' && p.id !== 'lemonade').map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0c0e14]">
                      {p.name}
                    </option>
                  ))}
                </select>
                <p className="text-[9px] text-[#5a6478]">
                  Pick the API dialect the endpoint speaks — most gateways are OpenAI-compatible.
                </p>
              </div>
            </div>
          )}

          {/* Shared: baseUrl override (provider pane) + label */}
          {pane === 'provider' && provider && (
            <div className="space-y-1.5">
              <Label className="text-[10px] font-semibold text-[#8b95a8]">
                Base URL <span className="text-[#5a6478] font-normal">(optional override)</span>
              </Label>
              <Input
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder={provider.defaultBaseUrl}
                className="h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold text-[#8b95a8]">
              Label <span className="text-[#5a6478] font-normal">(optional)</span>
            </Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Work key, Personal, Local Ollama…"
              className="h-9 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
            />
          </div>

          {/* Provider signup link */}
          {pane === 'provider' && provider && providerSignupUrl(provider.id) && (
            <a
              href={providerSignupUrl(provider.id)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[9px] text-[#00e5a0] hover:underline"
            >
              <ExternalLink className="size-3" /> Get an API key from {provider.name}
            </a>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              onClick={() => submit('test')}
              disabled={saving}
              className="h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg"
            >
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : <KeyRound className="size-3.5" />}
              {saving ? 'Saving…' : 'Add & test'}
            </Button>
            <Button
              variant="outline"
              onClick={() => submit('only')}
              disabled={saving}
              className="h-8 px-3.5 text-[11px] border-white/[0.1] text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04] rounded-lg"
            >
              Add only
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={saving}
              className="h-8 px-3 ml-auto text-[11px] text-[#5a6478] hover:text-[#e8ecf4] rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Signup-page URL per provider for the "Get API key" link. */
export function providerSignupUrl(providerId: string): string {
  const urls: Record<string, string> = {
    openai: 'https://platform.openai.com/api-keys',
    anthropic: 'https://console.anthropic.com/settings/keys',
    google: 'https://aistudio.google.com/app/apikey',
    deepseek: 'https://platform.deepseek.com/api_keys',
    glm: 'https://open.bigmodel.cn/usercenter/apikeys',
    qwen: 'https://dashscope.console.aliyun.com/apiKey',
    kimi: 'https://platform.moonshot.cn/console/api-keys',
    siliconflow: 'https://cloud.siliconflow.cn/account/ak',
    openrouter: 'https://openrouter.ai/settings/keys',
    grok: 'https://console.x.ai',
    minimax: 'https://platform.minimaxi.com/',
    doubao: 'https://console.volcengine.com/ark',
    xiaomi: 'https://xiaomimimo.com/',
    freellmapi: 'https://freellmapi.co',
  };
  return urls[providerId] ?? '';
}
