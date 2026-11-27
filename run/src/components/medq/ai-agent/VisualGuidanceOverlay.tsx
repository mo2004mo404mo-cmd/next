'use client';

/**
 * MedQ Visual Guidance Overlay — Renders highlights, tooltips, and guided tours
 * over existing UI elements. This component is rendered by the AI agent
 * and positions itself relative to target DOM elements.
 *
 * Features:
 * - Highlight: Pulsing border + overlay around target element
 * - Tooltip: Speech bubble with contextual message
 * - Tour: Multi-step guided walkthrough with navigation
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useUIState } from './UIStateContext';
import type { TourStep } from './UIActionEngine';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface OverlayPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function VisualGuidanceOverlay() {
  const { state, updateState } = useUIState();
  const { guidance } = state;
  const [position, setPosition] = useState<OverlayPosition | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; position: string } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update position when guidance target changes
  const updatePosition = useCallback(() => {
    if (!guidance.active || !guidance.targetSelector) {
      setPosition(null);
      setTooltipPos(null);
      return;
    }

    const target = document.querySelector(guidance.targetSelector);
    if (!target) {
      setPosition(null);
      setTooltipPos(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    const newPos = {
      top: rect.top - 4,
      left: rect.left - 4,
      width: rect.width + 8,
      height: rect.height + 8,
    };
    setPosition(newPos);

    // Calculate tooltip position
    if (guidance.message) {
      const tipOffset = 12;
      let tipTop = rect.bottom + tipOffset;
      let tipLeft = rect.left + rect.width / 2;
      let tipPosition = 'bottom';

      // Adjust if tooltip would go off screen
      if (tipTop + 100 > window.innerHeight) {
        tipTop = rect.top - tipOffset;
        tipPosition = 'top';
      }
      if (tipLeft + 200 > window.innerWidth) {
        tipLeft = window.innerWidth - 220;
      }
      if (tipLeft < 20) {
        tipLeft = 20;
      }

      setTooltipPos({ top: tipTop, left: tipLeft, position: tipPosition });
    }
  }, [guidance.active, guidance.targetSelector, guidance.message]);

  // Update position on changes and on scroll/resize
  useEffect(() => {
    const handleUpdate = () => {
      if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
      updateTimerRef.current = setTimeout(() => {
        updatePosition();
      }, 50);
    };

    const initialTimer = setTimeout(() => {
      updatePosition();
    }, 0);

    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);
    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
      if (updateTimerRef.current) clearTimeout(updateTimerRef.current);
      clearTimeout(initialTimer);
    };
  }, [updatePosition]);

  // Tour navigation
  const handleNextStep = useCallback(() => {
    type TourWindow = Window & { __medqTourSteps?: TourStep[]; __medqTourId?: string };
    const win = window as TourWindow;
    window.dispatchEvent(new CustomEvent('medq-agent-action', {
      detail: { actionId: 'tour_next' },
    }));
    // Also use the UIActionEngine pattern
    const steps: TourStep[] = win.__medqTourSteps || [];
    const currentStep: number = guidance.tourStep ?? -1;
    const nextStep = currentStep + 1;
    if (nextStep >= steps.length) {
      updateState({ guidance: { active: false } });
      delete win.__medqTourSteps;
    } else {
      updateState({
        guidance: {
          active: true,
          targetType: 'tour-step',
          tourId: guidance.tourId,
          tourStep: nextStep,
          tourTotalSteps: steps.length,
          targetSelector: steps[nextStep].selector,
          message: steps[nextStep].message,
        },
      });
    }
  }, [guidance, updateState]);

  const handlePrevStep = useCallback(() => {
    type TourWindow = Window & { __medqTourSteps?: TourStep[]; __medqTourId?: string };
    const win = window as TourWindow;
    const currentStep: number = guidance.tourStep ?? 1;
    const prevStep = currentStep - 1;
    if (prevStep < 0) return;
    const steps: TourStep[] = win.__medqTourSteps || [];
    updateState({
      guidance: {
        active: true,
        targetType: 'tour-step',
        tourId: guidance.tourId,
        tourStep: prevStep,
        tourTotalSteps: steps.length,
        targetSelector: steps[prevStep].selector,
        message: steps[prevStep].message,
      },
    });
  }, [guidance, updateState]);

  const handleEndTour = useCallback(() => {
    type TourWindow = Window & { __medqTourSteps?: TourStep[]; __medqTourId?: string };
    const win = window as TourWindow;
    updateState({ guidance: { active: false } });
    delete win.__medqTourSteps;
  }, [updateState]);

  if (!guidance.active || !position) return null;

  const isTour = guidance.targetType === 'tour-step';
  const isHighlight = guidance.targetType === 'highlight';

  return (
    <>
      {/* Dimming overlay for tours */}
      {isTour && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99990,
            background: 'rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}
        >
          {/* Cutout for the target element */}
          <div
            style={{
              position: 'absolute',
              top: position.top - 4,
              left: position.left - 4,
              width: position.width + 8,
              height: position.height + 8,
              background: 'transparent',
              borderRadius: '8px',
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
            }}
          />
        </div>
      )}

      {/* Highlight border */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height,
          zIndex: 99991,
          pointerEvents: 'none',
          borderRadius: '8px',
          border: isHighlight ? '3px solid #00e5a0' : isTour ? '3px solid #00e5a0' : '2px dashed #8b5cf6',
          boxShadow: isHighlight
            ? '0 0 20px rgba(0,229,160,0.4), inset 0 0 20px rgba(0,229,160,0.1)'
            : isTour
            ? '0 0 20px rgba(0,229,160,0.4), inset 0 0 20px rgba(0,229,160,0.1)'
            : '0 0 10px rgba(139,92,246,0.3)',
          animation: 'agentPulseHighlight 2s ease-in-out infinite',
        }}
      />

      {/* Tooltip / Tour Step Bubble */}
      {guidance.message && tooltipPos && (
        <div
          style={{
            position: 'fixed',
            top: tooltipPos.top,
            left: tooltipPos.left,
            zIndex: 99992,
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            maxWidth: '340px',
            minWidth: '200px',
          }}
        >
          <div
            style={{
              background: 'rgba(12,14,20,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,229,160,0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(0,229,160,0.15)',
              color: '#e8ecf4',
              fontSize: '13px',
              lineHeight: '1.5',
            }}
          >
            {/* Arrow */}
            {tooltipPos.position === 'bottom' && (
              <div style={{
                position: 'absolute',
                top: '-6px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                background: 'rgba(12,14,20,0.97)',
                borderLeft: '1px solid rgba(0,229,160,0.3)',
                borderTop: '1px solid rgba(0,229,160,0.3)',
              }} />
            )}
            {tooltipPos.position === 'top' && (
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                background: 'rgba(12,14,20,0.97)',
                borderRight: '1px solid rgba(0,229,160,0.3)',
                borderBottom: '1px solid rgba(0,229,160,0.3)',
              }} />
            )}

            {/* Content */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <Sparkles style={{ width: '16px', height: '16px', color: '#00e5a0', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                {isTour && guidance.tourStep !== undefined && (
                  <div style={{ fontSize: '10px', color: '#00e5a0', fontWeight: 600, marginBottom: '4px' }}>
                    Step {guidance.tourStep + 1} of {guidance.tourTotalSteps}
                  </div>
                )}
                <div>{guidance.message}</div>
              </div>
              {!isTour && (
                <button
                  onClick={() => updateState({ guidance: { active: false } })}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#5a6478',
                    cursor: 'pointer',
                    padding: '2px',
                    flexShrink: 0,
                  }}
                >
                  <X style={{ width: '14px', height: '14px' }} />
                </button>
              )}
            </div>

            {/* Tour Navigation */}
            {isTour && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '10px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}>
                <button
                  onClick={handleEndTour}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#5a6478',
                    cursor: 'pointer',
                    fontSize: '11px',
                  }}
                >
                  End tour
                </button>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(guidance.tourStep ?? 0) > 0 && (
                    <button
                      onClick={handlePrevStep}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.04)',
                        color: '#9ca3b8',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                    >
                      <ChevronLeft style={{ width: '12px', height: '12px' }} />
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleNextStep}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
                      color: '#0c0e14',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    {(guidance.tourStep ?? 0) >= (guidance.tourTotalSteps ?? 0) - 1 ? 'Finish' : 'Next'}
                    <ChevronRight style={{ width: '12px', height: '12px' }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes agentPulseHighlight {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </>
  );
}
