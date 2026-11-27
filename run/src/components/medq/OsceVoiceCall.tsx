'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ExternalLink, Loader2, Mic, MicOff, Send } from 'lucide-react';

export interface OsceVoiceTurn {
  role: 'student' | 'patient';
  text: string;
  ts: number;
}

export interface OsceVoiceCallProps {
  url: string;
  scenarioTitle: string;
  turns: OsceVoiceTurn[];
  handsFree: boolean;
  isRecording: boolean;
  isBusy: boolean;
  isSpeaking: boolean;
  interim: string;
  onToggleHandsFree: () => void;
  onSendText: (text: string) => void;
  onClose: () => void;
}

export default function OsceVoiceCall({
  url,
  scenarioTitle,
  turns,
  handsFree,
  isRecording,
  isBusy,
  isSpeaking,
  interim,
  onToggleHandsFree,
  onSendText,
  onClose,
}: OsceVoiceCallProps) {
  const [draft, setDraft] = useState('');
  const meetingWindowRef = useRef<Window | null>(null);

  const send = () => {
    const text = draft.trim();
    if (!text || isBusy) return;
    setDraft('');
    onSendText(text);
  };

  const openMiroTalk = (event: MouseEvent<HTMLAnchorElement>) => {
    const meetingWindow = window.open(url, '_blank');
    if (meetingWindow) {
      event.preventDefault();
      meetingWindow.opener = null;
      meetingWindowRef.current = meetingWindow;
    }
  };

  const closeRoom = () => {
    if (meetingWindowRef.current && !meetingWindowRef.current.closed) {
      meetingWindowRef.current.close();
    }
    meetingWindowRef.current = null;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background p-3 sm:p-5">
      <section className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl">
        <header className="flex flex-wrap items-center gap-3 border-b p-4">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-semibold">{scenarioTitle} — OSCE voice room</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Speak to the AI patient using this MedQ tab. MiroTalk opens separately for a practice partner or screen sharing.
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            onClick={openMiroTalk}
            className={buttonVariants({ size: 'sm', variant: 'outline' })}
          >
            <ExternalLink className="h-4 w-4" />
            Open MiroTalk
          </a>
          <Button size="sm" variant="outline" onClick={closeRoom}>
            <ArrowLeft className="h-4 w-4" />
            Return to encounter
          </Button>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
          <ExternalLink className="h-8 w-8 text-muted-foreground" />
          <p className="max-w-lg text-sm text-muted-foreground">
            MiroTalk runs in a separate tab and does not send its audio to the AI patient. Keep this tab active
            and use the microphone below to speak with the patient; use MiroTalk for your human practice partner
            or screen sharing.
          </p>
        </div>
        <section className="grid gap-3 border-t bg-muted/20 p-3 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
          <div
            className="max-h-28 min-h-12 space-y-1 overflow-y-auto text-sm"
            aria-live="polite"
            aria-label="OSCE patient conversation"
          >
            {turns.slice(-4).map((turn, index) => (
              <p key={`${turn.ts}-${index}`} className={turn.role === 'patient' ? 'text-foreground' : 'text-muted-foreground'}>
                <span className="font-medium">{turn.role === 'patient' ? 'Patient:' : 'You:'}</span> {turn.text}
              </p>
            ))}
            {interim && <p className="italic text-muted-foreground">{interim}</p>}
            {(isBusy || isSpeaking) && (
              <p className="inline-flex items-center gap-1 text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                {isSpeaking ? 'Patient speaking…' : 'Patient thinking…'}
              </p>
            )}
          </div>
          <form
            className="flex min-w-0 items-end gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <Button
              type="button"
              size="icon"
              variant={handsFree ? 'default' : 'secondary'}
              onClick={onToggleHandsFree}
              title={handsFree ? 'Turn hands-free off' : 'Talk to the AI patient'}
              aria-label={handsFree ? 'Turn hands-free off' : 'Talk to the AI patient'}
            >
              {handsFree && isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Speak or type to the patient…"
              aria-label="Ask the AI patient"
              className="min-h-10 flex-1 resize-none bg-background"
            />
            <Button type="submit" size="icon" disabled={!draft.trim() || isBusy} aria-label="Send to patient">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      </section>
    </div>
  );
}
