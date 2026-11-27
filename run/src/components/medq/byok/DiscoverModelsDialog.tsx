'use client';

/**
 * DiscoverModelsDialog — FreeLLMAPI's discover-models pattern.
 *
 * Fires a live /models probe against the endpoint and shows the discovered
 * models as selectable rows. Distinguishes:
 *   - already registered (checked + disabled + tag)
 *   - new (selectable)
 * "Add N models" registers the genuinely-new picks into the provider's
 * modelsConfig — after which they're visible in every ModelPicker.
 */

import { useEffect, useMemo, useState } from 'react';
import { Loader2, RefreshCw, Check, CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import type { SavedKey, ByokModelConfig } from './useByokData';

export interface DiscoverModelsDialogProps {
  /** The endpoint to probe — null closes the dialog. */
  target: SavedKey | null;
  onClose: () => void;
  testKey: (keyId: string, providerId: string) => Promise<{ ok: boolean; error?: string; models?: string[] }>;
  saveModels: (providerId: string, models: ByokModelConfig[] | null) => Promise<void>;
}

export default function DiscoverModelsDialog({
  target, onClose, testKey, saveModels,
}: DiscoverModelsDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [registering, setRegistering] = useState(false);

  // Probe whenever a new target mounts (dialog mounts only-while-open).
  useEffect(() => {
    if (!target) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setDiscovered([]);
    setSelected(new Set());
    (async () => {
      const res = await testKey(target.id, target.providerId);
      if (cancelled) return;
      setLoading(false);
      if (!res.ok) {
        setError(res.error || 'The endpoint could not be reached');
        return;
      }
      const models = res.models ?? [];
      if (!models.length) {
        setError('The endpoint responded but did not list any models (no /models support).');
        return;
      }
      setDiscovered(models);
      // Pre-select models that are NOT already registered.
      const existing = new Set((target.modelsConfig ?? []).map((m) => m.id));
      setSelected(new Set(models.filter((m) => !existing.has(m))));
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.id]);

  const existing = useMemo(
    () => new Set((target?.modelsConfig ?? []).map((m) => m.id)),
    [target],
  );

  const newCount = [...selected].filter((id) => !existing.has(id)).length;

  const register = async () => {
    if (!target || newCount === 0) return;
    setRegistering(true);
    try {
      const merged = new Map((target.modelsConfig ?? []).map((m) => [m.id, m]));
      for (const id of selected) {
        if (!merged.has(id)) merged.set(id, { id, name: id });
      }
      await saveModels(target.providerId, [...merged.values()]);
      toast.success(`Added ${newCount} model${newCount === 1 ? '' : 's'} — now visible in every picker`);
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not register models');
    } finally {
      setRegistering(false);
    }
  };

  if (!target) return null;

  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-xl bg-[#0c0e14] border-white/[0.08] p-0 overflow-hidden">
        <div className="px-5 pt-5 pb-3 space-y-1.5">
          <DialogTitle className="text-sm font-bold text-[#e8ecf4]">
            Discover models · {target.label || target.maskedKey}
          </DialogTitle>
          <DialogDescription className="text-[10px] text-[#8b95a8] leading-relaxed">
            Probes the endpoint&apos;s <code className="font-mono">/models</code> list. Registering a model
            makes it selectable app-wide.
          </DialogDescription>
        </div>

        <div className="px-5 pb-5 space-y-3">
          {loading && (
            <div className="py-10 flex flex-col items-center gap-2.5">
              <Loader2 className="size-5 animate-spin text-[#00e5a0]" />
              <p className="text-[10px] text-[#8b95a8]">Probing the endpoint…</p>
            </div>
          )}

          {error && !loading && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-[#ff5757]/[0.06] border border-[#ff5757]/15">
              <CircleAlert className="size-3.5 text-[#ff5757] shrink-0 mt-0.5" />
              <div className="space-y-2 min-w-0">
                <p className="text-[10px] text-[#ff5757]/90 break-all leading-relaxed">{error}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[9px] font-semibold text-[#00e5a0] hover:underline"
                >
                  Close and check the endpoint settings
                </button>
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Select all header */}
              <div className="flex items-center gap-2 text-[10px] text-[#5a6478]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCount === 0 ? false : newCount === [...discovered].filter((d) => !existing.has(d)).length}
                    onChange={(e) => {
                      const next = new Set(selected);
                      for (const m of discovered) {
                        if (existing.has(m)) continue;
                        if (e.target.checked) next.add(m);
                        else next.delete(m);
                      }
                      setSelected(next);
                    }}
                    className="accent-[#00e5a0]"
                  />
                  Select new
                </label>
                <span className="tabular-nums">
                  {discovered.length} found · {existing.size} already added
                </span>
              </div>

              {/* Model rows */}
              <div className="max-h-[45vh] overflow-y-auto rounded-xl border border-white/[0.06] divide-y divide-white/[0.04]">
                {discovered.map((m) => {
                  const isExisting = existing.has(m);
                  const isSelected = selected.has(m);
                  return (
                    <label
                      key={m}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-white/[0.03]',
                        isExisting && 'opacity-50 cursor-not-allowed',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isExisting || isSelected}
                        disabled={isExisting}
                        onChange={(e) => {
                          const next = new Set(selected);
                          if (e.target.checked) next.add(m);
                          else next.delete(m);
                          setSelected(next);
                        }}
                        className="accent-[#00e5a0]"
                      />
                      <code className="text-[10px] font-mono text-[#e8ecf4] truncate">{m}</code>
                      {isExisting && (
                        <span className="ml-auto text-[8px] rounded-full px-1.5 py-px bg-white/[0.06] text-[#8b95a8] border border-white/[0.06] shrink-0">
                          already added
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={register}
                  disabled={registering || newCount === 0}
                  className="h-8 px-3.5 text-[11px] font-semibold bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] rounded-lg disabled:opacity-40"
                >
                  {registering ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                  {newCount > 0 ? `Add ${newCount} model${newCount === 1 ? '' : 's'}` : 'Nothing new selected'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="h-8 px-3 ml-auto text-[11px] text-[#5a6478] hover:text-[#e8ecf4] rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
