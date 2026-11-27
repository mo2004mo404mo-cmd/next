'use client';

/**
 * ShareQuestionDialog — lets the user share a question card into a chat room,
 * a study group, or the public feed. The shared card keeps its media intact
 * (ECG strip / image / audio / 3D model) — see /api/questions/share.
 */

import { useCallback, useEffect, useState } from 'react';
import { Share2, Users, MessageCircle, Globe, Loader2, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareTarget {
  id: string;
  name: string;
  kind: 'chat' | 'group';
  avatar?: string;
  memberHint?: string;
}

export default function ShareQuestionDialog({
  questionId,
  open,
  onClose,
}: {
  questionId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [targets, setTargets] = useState<ShareTarget[]>([]);
  // Starts true — flips false once the first load settles (avoids setState-in-effect)
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState<string | null>(null);
  const [shared, setShared] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open || targets.length > 0) return;
    let cancelled = false;
    (async () => {
      try {
        const [chatRes, groupRes] = await Promise.all([
          fetch('/api/chat/rooms').catch(() => null),
          fetch('/api/groups/my').catch(() => null),
        ]);
        const chatData = chatRes?.ok ? await chatRes.json() : { rooms: [] };
        const groupData = groupRes?.ok ? await groupRes.json() : { groups: [] };

        const chatTargets: ShareTarget[] = (chatData.rooms || []).slice(0, 30).map((r: { id: string; name?: string; avatar?: string; type?: string }) => ({
          id: r.id,
          name: r.name || 'Chat',
          kind: 'chat',
          avatar: typeof r.avatar === 'string' && r.avatar.length <= 3 ? r.avatar : r.type === 'direct' ? '💬' : '👥',
        }));
        const groupTargets: ShareTarget[] = (groupData.groups || []).slice(0, 30).map((g: { id: string; name?: string; avatar?: string; previewMembers?: Array<{ user?: { name?: string } }> }) => ({
          id: g.id,
          name: g.name || 'Group',
          kind: 'group',
          avatar: g.avatar || '🎓',
          memberHint: g.previewMembers?.length ? `${g.previewMembers.length}+ members` : undefined,
        }));
        if (!cancelled) setTargets([...chatTargets, ...groupTargets]);
      } catch {
        // leave the empty-targets fallback UI
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [open, targets.length]);

  const share = useCallback(
    async (target: 'chat' | 'group' | 'feed', targetId?: string) => {
      setSharing(targetId || 'feed');
      try {
        const res = await fetch('/api/questions/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId, target, targetId }),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error || 'Share failed');
          return;
        }
        setShared((prev) => ({ ...prev, [targetId || 'feed']: true }));
        toast.success(
          target === 'chat' ? 'Question card sent to chat — media intact' :
          target === 'group' ? 'Question card posted to the group' :
          'Question card shared to your feed',
        );
      } catch {
        toast.error('Share failed — check your connection');
      } finally {
        setSharing(null);
      }
    },
    [questionId],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="max-w-md w-full rounded-2xl border border-white/[0.08] bg-[#151821] overflow-hidden max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center justify-center">
            <Share2 className="w-4.5 h-4.5 w-[18px] h-[18px] text-[#00e5a0]" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-[#e8ecf4]">Share this question</h2>
            <p className="text-[10px] text-[#5a6478]">the card keeps its ECG, audio, images and 3D model</p>
          </div>
          <button type="button" onClick={onClose} className="text-[#5a6478] hover:text-[#e8ecf4]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-10 gap-2 text-[#5a6478] text-xs">
              <Loader2 className="w-4 h-4 animate-spin" /> loading your chats and groups…
            </div>
          ) : targets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xs text-[#5a6478] mb-4">No chats or groups yet — share to your public feed instead:</p>
              <button
                type="button"
                onClick={() => share('feed')}
                disabled={sharing === 'feed'}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#4fc3f7]/10 text-[#7cc7ff] border border-[#4fc3f7]/30 hover:bg-[#4fc3f7]/20"
              >
                {sharing === 'feed' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                Share to feed
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {targets.map((t) => (
                <button
                  key={`${t.kind}-${t.id}`}
                  type="button"
                  onClick={() => share(t.kind, t.id)}
                  disabled={sharing === t.id || Boolean(shared[`${t.kind}-${t.id}`]) || shared[t.id]}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#00e5a0]/30 hover:bg-white/[0.04] transition-all text-left disabled:opacity-60"
                >
                  <span className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-base flex-shrink-0">
                    {t.avatar || (t.kind === 'chat' ? '💬' : '🎓')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#e8ecf4] truncate">
                      {t.kind === 'chat' ? <MessageCircle className="w-3 h-3 text-[#4fc3f7] flex-shrink-0" /> : <Users className="w-3 h-3 text-[#00e5a0] flex-shrink-0" />}
                      {t.name}
                    </span>
                    {t.memberHint && <span className="block text-[10px] text-[#5a6478]">{t.memberHint}</span>}
                  </span>
                  {sharing === t.id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#00e5a0]" />
                  ) : shared[t.id] ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00e5a0]" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5 text-[#3a4055]" />
                  )}
                </button>
              ))}

              <div className="pt-2 border-t border-white/[0.05] mt-2">
                <button
                  type="button"
                  onClick={() => share('feed')}
                  disabled={sharing === 'feed'}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#4fc3f7]/[0.06] border border-[#4fc3f7]/20 hover:bg-[#4fc3f7]/[0.12] transition-all text-left disabled:opacity-60"
                >
                  <span className="w-9 h-9 rounded-lg bg-[#4fc3f7]/10 border border-[#4fc3f7]/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-[#7cc7ff]" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold text-[#e8ecf4]">Public feed</span>
                    <span className="block text-[10px] text-[#5a6478]">everyone can try the question</span>
                  </span>
                  {sharing === 'feed' ? <Loader2 className="w-4 h-4 animate-spin text-[#7cc7ff]" /> : shared['feed'] ? <CheckCircle2 className="w-4 h-4 text-[#7cc7ff]" /> : null}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
