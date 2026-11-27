'use client';

/**
 * ModelEditDialog — add or edit one model entry in a provider's curated
 * catalog (freellmapi add-model-dialog pattern: id, name, capability
 * switches in bordered tiles, context window).
 *
 * This is where "the model I add" gets its metadata — and thanks to the
 * catalog fix, it immediately shows up in every ModelPicker.
 */

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import type { ByokModelConfig } from './useByokData';

export interface ModelEditDialogProps {
  open: boolean;
  onClose: () => void;
  /** null = add a new model; object = edit an existing one. */
  model: ByokModelConfig | null;
  providerName: string;
  existingIds: string[];
  onSave: (model: ByokModelConfig) => void;
}

export default function ModelEditDialog({
  open, onClose, model, providerName, existingIds, onSave,
}: ModelEditDialogProps) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [vision, setVision] = useState(false);
  const [tools, setTools] = useState(true);
  const [streaming, setStreaming] = useState(true);
  const [contextWindow, setContextWindow] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setId(model?.id ?? '');
      setName(model?.name ?? '');
      setVision(model?.capabilities?.vision ?? false);
      setTools(model?.capabilities?.tools ?? true);
      setStreaming(model?.capabilities?.streaming ?? true);
      setContextWindow(model?.contextWindow ? String(model.contextWindow) : '');
      setSaving(false);
    }
  }, [open, model]);

  const idTaken = id.trim() && !model && existingIds.includes(id.trim());

  const save = () => {
    if (!id.trim()) {
      toast.error('Model ID is required (e.g. gpt-4o, llama3.3:70b)');
      return;
    }
    if (idTaken) {
      toast.error('A model with this ID already exists on this provider');
      return;
    }
    setSaving(true);
    onSave({
      id: id.trim(),
      name: name.trim() || id.trim(),
      capabilities: { vision, tools, streaming },
      ...(contextWindow.trim() && Number(contextWindow) > 0
        ? { contextWindow: Number(contextWindow) }
        : {}),
    });
    setSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-md bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden">
        <div className="px-5 pt-5 pb-3 space-y-1.5">
          <DialogTitle className="text-sm font-bold text-[#e8ecf4]">
            {model ? 'Edit model' : 'Add model'} · {providerName}
          </DialogTitle>
          <DialogDescription className="text-[10px] text-[#8b95a8] leading-relaxed">
            The model becomes available in every model picker across the app — question
            explanations, tutor, generation.
          </DialogDescription>
        </div>

        <div className="px-5 pb-5 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold text-[#8b95a8]">Model ID</Label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={!!model}
              placeholder="meta-llama/llama-3.3-70b-instruct"
              className="h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg disabled:opacity-60"
            />
            {idTaken && <p className="text-[9px] text-[#ff5757]">This ID is already on this provider.</p>}
            <p className="text-[9px] text-[#5a6478]">Exactly as the API expects it in the `model` field.</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold text-[#8b95a8]">
              Display name <span className="text-[#5a6478] font-normal">(optional)</span>
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Llama 3.3 70B"
              className="h-9 text-[11px] bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold text-[#8b95a8]">
              Context window <span className="text-[#5a6478] font-normal">(tokens, optional)</span>
            </Label>
            <Input
              value={contextWindow}
              onChange={(e) => setContextWindow(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="128000"
              className="h-9 text-[11px] font-mono bg-[#08090f] border-white/[0.08] placeholder:text-[#5a6478] placeholder:font-sans rounded-lg"
            />
          </div>

          {/* Capability tiles (freellmapi bordered-tile switches) */}
          <div className="grid grid-cols-3 gap-2">
            <CapabilityTile label="Vision" hint="accepts images" checked={vision} onChange={setVision} />
            <CapabilityTile label="Tools" hint="function calling" checked={tools} onChange={setTools} />
            <CapabilityTile label="Stream" hint="token streaming" checked={streaming} onChange={setStreaming} />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Button
              onClick={save}
              disabled={saving}
              className="h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg"
            >
              {saving && <Loader2 className="size-3.5 animate-spin" />}
              {model ? 'Save model' : 'Add model'}
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

function CapabilityTile({
  label, hint, checked, onChange,
}: {
  label: string; hint: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 rounded-xl border border-white/[0.06] bg-[#08090f]/60 p-2.5 cursor-pointer hover:border-white/[0.12] transition-colors">
      <span className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-[#e8ecf4]">{label}</span>
        <Switch checked={checked} onCheckedChange={onChange} className="scale-[0.7]" />
      </span>
      <span className="text-[9px] text-[#5a6478]">{hint}</span>
    </label>
  );
}
