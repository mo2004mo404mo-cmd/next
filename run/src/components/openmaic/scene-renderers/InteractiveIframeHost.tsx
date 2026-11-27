/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/scene-renderers/InteractiveIframeHost.tsx
 *
 * Verbatim port.
 */

'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useWidgetIframeStore } from '@/lib/store/widget-iframe';
import {
  useInteractiveIframePool,
  type IframePoolEntry,
} from '@/lib/store/interactive-iframe-pool';
import { useSceneRuntimeErrors } from '@/lib/store/scene-runtime-errors';

export function InteractiveIframeHost() {
  const entries = useInteractiveIframePool((s) => s.entries);
  const activeSceneId = useInteractiveIframePool((s) => s.activeSceneId);
  const reset = useInteractiveIframePool((s) => s.reset);
  const setActiveScene = useWidgetIframeStore((s) => s.setActiveScene);

  const [portalTarget, setPortalTarget] = useState<Element | null>(null);
  useEffect(() => {
    const sync = () => setPortalTarget(document.fullscreenElement ?? document.body);
    sync();
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  useEffect(() => {
    setActiveScene(activeSceneId);
  }, [activeSceneId, setActiveScene]);

  useEffect(() => reset, [reset]);

  if (!portalTarget) return null;

  return createPortal(
    <>
      {Object.entries(entries).map(([sceneId, entry]) => (
        <PooledIframe
          key={sceneId}
          sceneId={sceneId}
          entry={entry}
          visible={entry.owner !== null && sceneId === activeSceneId}
        />
      ))}
    </>,
    portalTarget,
  );
}

interface PooledIframeProps {
  readonly sceneId: string;
  readonly entry: IframePoolEntry;
  readonly visible: boolean;
}

function PooledIframe({ sceneId, entry, visible }: PooledIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const registerIframe = useWidgetIframeStore((s) => s.registerIframe);

  useEffect(() => {
    const send = (type: string, payload: Record<string, unknown>) => {
      iframeRef.current?.contentWindow?.postMessage({ type, ...payload }, '*');
    };
    registerIframe(sceneId, send);
    return () => registerIframe(sceneId, null);
  }, [sceneId, registerIframe]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframeRef.current?.contentWindow) return;
      const d = e.data as
        | { __maicInteractive?: boolean; kind?: string; errorKind?: string; message?: unknown }
        | undefined;
      if (!d || d.__maicInteractive !== true || d.kind !== 'runtime-error') return;
      const kind = typeof d.errorKind === 'string' ? d.errorKind : 'error';
      const msg = typeof d.message === 'string' ? d.message : String(d.message ?? '');
      useSceneRuntimeErrors.getState().addError(sceneId, `[${kind}] ${msg}`);
    };
    window.addEventListener('message', onMessage);
    iframeRef.current?.contentWindow?.postMessage({ __maicErrorReplayRequest: true }, '*');
    return () => window.removeEventListener('message', onMessage);
  }, [sceneId, entry.srcDoc]);

  useEffect(() => {
    useSceneRuntimeErrors.getState().clearScene(sceneId);
  }, [sceneId, entry.srcDoc]);

  const rect = entry.rect;
  const shown = visible && rect !== null && rect.width > 0 && rect.height > 0;
  const style: CSSProperties = {
    position: 'fixed',
    left: rect?.left ?? 0,
    top: rect?.top ?? 0,
    width: rect?.width ?? 0,
    height: rect?.height ?? 0,
    border: 0,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    zIndex: 1,
    visibility: shown ? 'visible' : 'hidden',
    pointerEvents: shown ? 'auto' : 'none',
  };

  return (
    <iframe
      ref={iframeRef}
      srcDoc={entry.srcDoc}
      src={entry.srcDoc ? undefined : entry.src}
      style={style}
      title={`Interactive Scene ${sceneId}`}
      sandbox="allow-scripts allow-forms allow-popups"
    />
  );
}
