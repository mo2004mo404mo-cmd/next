'use client';

/**
 * EditKeyDialog — edit an existing endpoint (freellmapi edit-key pattern).
 *
 * Platform is LOCKED (endpoint identity is stable — same rule as freellmapi:
 * "platform is locked" so resolution keeps working). Credential field starts
 * EMPTY because the server never returns plaintext; leaving it empty keeps
 * the stored key.
 */

import { useEffect, useState } from 'react';
import { Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { BYOK_PROVIDER_BY_ID } from '@/lib/ai/byok-providers';
import { ProviderAvatar, formatRelativeTime } from './shared';
import type { SavedKey } from './useByokData';

export interface EditKeyDialogProps {
  /** The endpoint being edited (null = closed). Named keyData — `key` is reserved by React. */
  keyData: SavedKey | null;
  onClose: () => void;
  onSave: (params: {
    id: string;
    providerId: string;
    apiKey?: string;
    baseUrl?: string | null;
    label?: string | null;
  }) => Promise<{ ok: boolean; error?: string }>;
  onDelete: (key: SavedKey) => void;
  onToggle: (key: SavedKey, enabled: boolean) => void;
}

export default function EditKeyDialog({ keyData: k, onClose, onSave, onDelete, onToggle }: EditKeyDialogProps) {
  const [label, setLabel] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (k) {
      setLabel(k.label ?? '');
      setBaseUrl(k.baseUrl ?? '');
      setSaving(false);
    }
  }, [k]);

  if (!k) return null;
  const provider = BYOK_PROVIDER_BY_ID[k.providerId];

  const hasChanges = (label !== (k.label ?? '')) || (baseUrl.trim() || null) !== k.baseUrl;

  const save = async () => {
    if (!k) return;
    setSaving(true);
    try {
      const res = await onSave({
        id: k.id,
        providerId: k.providerId,
        baseUrl: baseUrl.trim() || null,
        label: label.trim() || null,
      });
      if (!res.ok) {
        toast.error(res.error || 'Could not save changes');
        return;
      }
      toast.success('Endpoint updated');
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={!!k} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-md bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden">
        <div className="px-5 pt-5 pb-3 space-y-2">
          <DialogTitle className="text-sm font-bold text-[#e8ecf4] flex items-center gap-2">
            {provider && <ProviderAvatar provider={provider} size="sm" />}
            Edit endpoint
          </DialogTitle>
          <DialogDescription className="text-[10px] text-[#8b95a8]">
            <code className="font-mono text-[#8b95a8]">{k.maskedKey}</code>
            {k.lastVerifiedAt ? ` · verified ${formatRelativeTime(k.lastVerifiedAt)}` : ' · never verified'}
          </DialogDescription>
        </div>

        <div className="px-5 pb-5 space-y-3">
          {/* Locked provider */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold text-[#8b95a8]">Provider</Label>
            <div className="flex items-center gap-2 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] px-2.5">
              <Lock className="size-3 text-[#5a6478]" />
              <span className="text-[11px] text-[#8b95a8]">{provider?.name ?? k.providerId}</span>
              <span className="text-[9px] text-[#5a6478] ml-auto">locked — endpoint identity</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold text-[#8b95a8]">Label</Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Work key, Local Ollama…"
              className="h-9 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold text-[#8b95a8]">
              Base URL <span className="text-[#5a6478] font-normal">(empty = provider default)</span>
            </Label>
            <Input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder={provider?.defaultBaseUrl ?? 'https://…'}
              className="h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
            />
          </div>

          {/* Enabled toggle */}
          <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#08090f]/60 px-3 py-2.5">
            <div>
              <p className="text-[11px] font-medium text-[#e8ecf4]">Enabled</p>
              <p className="text-[9px] text-[#5a6478]">Disabled endpoints are skipped by routing & failover</p>
            </div>
            <Switch checked={k.enabled} onCheckedChange={(v) => onToggle(k, v)} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              onClick={save}
              disabled={saving || !hasChanges}
              className="h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg disabled:opacity-40"
            >
              {saving && <Loader2 className="size-3.5 animate-spin" />} Save changes
            </Button>
            <Button
              variant="ghost"
              onClick={() => { onDelete(k); onClose(); }}
              className="h-8 px-3 text-[11px] text-[#ff5757] hover:bg-[#ff5757]/10 rounded-lg"
            >
              Delete endpoint
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
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
