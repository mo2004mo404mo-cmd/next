'use client';

import { useMemo, useRef, type MouseEvent } from 'react';
import { ArrowLeft, ExternalLink, Loader2, Minimize2, PhoneOff, Share2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';

interface MiroTalkCallProps {
  roomId: string;
  url?: string;
  userName?: string;
  callType: 'voice' | 'video';
  role: 'caller' | 'callee';
  peerName?: string;
  onConnected: () => void;
  onMinimize: () => void;
  onEnd: () => void;
}

export default function MiroTalkCall({
  roomId,
  url,
  userName,
  callType,
  role,
  peerName,
  onConnected,
  onMinimize,
  onEnd,
}: MiroTalkCallProps) {
  const meetingWindowRef = useRef<Window | null>(null);
  const meetingUrl = useMemo(() => {
    if (!url) return null;
    try {
      const target = new URL(url);
      const configured = process.env.NEXT_PUBLIC_MIROTALK_URL;
      if (!configured) return null;
      const allowed = new URL(configured);
      if (target.protocol !== 'https:' || target.origin !== allowed.origin || target.pathname !== '/join') {
        return null;
      }
      if (userName) target.searchParams.set('name', userName.slice(0, 80));
      return target.toString();
    } catch {
      return null;
    }
  }, [url, userName]);

  const joinMeeting = (event: MouseEvent<HTMLAnchorElement>) => {
    if (meetingUrl) {
      const meetingWindow = window.open(meetingUrl, '_blank');
      if (meetingWindow) {
        event.preventDefault();
        meetingWindow.opener = null;
        meetingWindowRef.current = meetingWindow;
      }
    }
    onConnected();
  };

  const leaveCall = () => {
    if (meetingWindowRef.current && !meetingWindowRef.current.closed) {
      meetingWindowRef.current.close();
    }
    meetingWindowRef.current = null;
    onEnd();
  };

  return (
    <div className="fixed inset-0 z-[300] bg-background p-3 sm:p-5" data-room-id={roomId}>
      <section className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl">
        <header className="flex items-center gap-3 border-b p-3 sm:p-4">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-semibold">
              {callType === 'video' ? 'Video' : 'Voice'} call{peerName ? ` · ${peerName}` : ''}
            </h2>
            <p className="text-xs text-muted-foreground">
              {meetingUrl
                ? role === 'caller' ? 'MiroTalk room ready' : 'Ready to join the MiroTalk room'
                : 'Preparing secure meeting link…'}
            </p>
          </div>
          {meetingUrl && (
            <a
              href={meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              onClick={joinMeeting}
              className={`${buttonVariants({ size: 'sm', variant: 'outline' })} hidden sm:inline-flex`}
              aria-label={`Join ${callType} call in a new tab`}
            >
              <ExternalLink className="h-4 w-4" />
              Join call
            </a>
          )}
          <Button size="sm" variant="outline" onClick={onMinimize} aria-label="Minimize call">
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={leaveCall}>
            <PhoneOff className="h-4 w-4" />
            Leave
          </Button>
        </header>
        {meetingUrl ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Share2 className="h-6 w-6" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="font-semibold">Your call opens in MiroTalk</h3>
              <p className="text-sm text-muted-foreground">
                Join from the new tab. MiroTalk provides camera, microphone, and screen sharing there.
                Keep this tab open to manage or leave the call.
              </p>
            </div>
            <a
              href={meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              onClick={joinMeeting}
              className={buttonVariants({ size: 'lg' })}
            >
              <ExternalLink className="h-4 w-4" />
              Join {callType} call
            </a>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {url ? 'Meeting link is invalid or does not match the configured MiroTalk host.' : 'Creating the meeting room…'}
            </p>
            <Button size="sm" variant="outline" onClick={leaveCall}>
              <ArrowLeft className="h-4 w-4" />
              End call
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
