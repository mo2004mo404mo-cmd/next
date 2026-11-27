'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Brain, ChevronDown, ChevronRight, AlertTriangle, Stethoscope,
  Lightbulb, ArrowRight, BookOpen, Shield, Zap, Target,
  Sparkles, Info, GraduationCap, Eye, EyeOff, RotateCcw,
  TrendingUp, AlertOctagon, CheckCircle2, XCircle, HelpCircle,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ReasoningStep {
  step: string;
  finding: string;
  significance: string;
  clinicalTip: string;
}

export interface RedFlag {
  flag: string;
  why: string;
  action: string;
}

export interface AlternativeDiagnosis {
  diagnosis: string;
  likelihood: 'high' | 'moderate' | 'low';
  distinguishingFeatures: string;
}

export interface ClinicalReasoningResult {
  reasoning: ReasoningStep[];
  redFlags: RedFlag[];
  alternativeDiagnoses: AlternativeDiagnosis[];
  keyTakeaway: string;
  attendingTip: string;
}

export interface AIClinicalReasoningProps {
  /** The user's submitted answer */
  userAnswer: string;
  /** The correct answer */
  correctAnswer: string;
  /** Context about the question/case */
  questionContext: {
    question: string;
    options?: string[];
    system?: string;
    topic?: string;
    difficulty?: string;
    type?: 'question' | 'case';
  };
  /** Additional case data (for case simulations) */
  caseData?: string;
  /** Whether the user answered correctly */
  isCorrect: boolean;
  /** Whether to start expanded (default: false) */
  defaultExpanded?: boolean;
  /** Compact mode for inline hints (case simulations) */
  compact?: boolean;
  /** Callback when reasoning is loaded */
  onReasoningLoaded?: (result: ClinicalReasoningResult) => void;
}

// ─── Color Constants ─────────────────────────────────────────────────────────

const C = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, #151821)',
  input: 'var(--medq-surface, #1a1e2b)',
  green: 'var(--medq-accent-green, #00e5a0)',
  greenDark: 'var(--medq-accent-green, #00b87a)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  orange: 'var(--medq-accent-amber, #f59e0b)',
  orangeAccent: 'var(--medq-accent-amber, #ff6b35)',
  purple: 'var(--medq-accent-purple, #8b5cf6)',
  cyan: 'var(--medq-accent-cyan, #4fc3f7)',
  teal: 'var(--medq-accent-cyan, #22d3ee)',
  blue: '#3b82f6',
  pink: '#ec4899',
  yellow: 'var(--medq-accent-amber, #ffb347)',
  lightGreen: 'var(--medq-accent-green, #4ade80)',
  text: 'var(--medq-text, #e8ecf4)',
  textSec: 'var(--medq-muted-2, #8b95a8)',
  textMuted: 'var(--medq-muted, #5a6478)',
  textDim: 'var(--medq-dimmed, #3a4055)',
  border: 'var(--medq-card-border, rgba(255,255,255,0.06))',
};

const LIKELIHOOD_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  high: { bg: 'rgba(239,68,68,0.10)', text: '#ff5757', border: 'rgba(239,68,68,0.20)' },
  moderate: { bg: 'rgba(245,158,11,0.10)', text: '#f59e0b', border: 'rgba(245,158,11,0.20)' },
  low: { bg: 'rgba(74,222,128,0.10)', text: '#4ade80', border: 'rgba(74,222,128,0.20)' },
};

const STEP_COLORS = [
  { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.20)', accent: '#3b82f6' },
  { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.20)', accent: '#8b5cf6' },
  { bg: 'rgba(0,229,160,0.08)', border: 'rgba(0,229,160,0.20)', accent: '#00e5a0' },
  { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.20)', accent: '#f59e0b' },
  { bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.20)', accent: '#22d3ee' },
  { bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.20)', accent: '#ec4899' },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AIClinicalReasoning({
  userAnswer,
  correctAnswer,
  questionContext,
  caseData,
  isCorrect,
  defaultExpanded = false,
  compact = false,
  onReasoningLoaded,
}: AIClinicalReasoningProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClinicalReasoningResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [showDeeper, setShowDeeper] = useState(false);
  const [deeperLoading, setDeeperLoading] = useState(false);
  const [deeperContent, setDeeperContent] = useState<string | null>(null);
  const [visibleSteps, setVisibleSteps] = useState(0);

  // Fetch clinical reasoning
  const fetchReasoning = useCallback(async () => {
    if (result) return; // Already loaded
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/clinical-reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer,
          correctAnswer,
          questionContext,
          caseData,
        }),
      });

      if (res.ok) {
        const data: ClinicalReasoningResult = await res.json();
        setResult(data);
        onReasoningLoaded?.(data);
      } else {
        setError('Failed to load clinical reasoning');
      }
    } catch {
      setError('Network error — could not load clinical reasoning');
    } finally {
      setLoading(false);
    }
  }, [userAnswer, correctAnswer, questionContext, caseData, result, onReasoningLoaded]);

  // Auto-fetch when expanded for the first time
  useEffect(() => {
    if (expanded && !result && !loading && !error) {
      fetchReasoning();
    }
  }, [expanded, result, loading, error, fetchReasoning]);

  // Animate steps appearing one by one
  useEffect(() => {
    if (!result || !expanded) return;
    if (visibleSteps < result.reasoning.length) {
      const timer = setTimeout(() => setVisibleSteps(v => v + 1), 120);
      return () => clearTimeout(timer);
    }
  }, [result, expanded, visibleSteps]);

  // Explain Further — deeper dive
  const handleExplainFurther = async () => {
    if (deeperLoading || deeperContent) return;
    setDeeperLoading(true);
    try {
      const res = await fetch('/api/ai/clinical-reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer,
          correctAnswer,
          questionContext: {
            ...questionContext,
            difficulty: 'expert',
          },
          caseData: `${caseData || ''}\n\nDEEPER ANALYSIS REQUESTED: Provide an in-depth analysis with pathophysiology mechanisms, evidence-based references, and clinical decision thresholds.`,
        }),
      });

      if (res.ok) {
        const data: ClinicalReasoningResult = await res.json();
        // Combine the original with the deeper analysis
        setDeeperContent(data.attendingTip + '\n\n' + data.keyTakeaway);
      } else {
        setDeeperContent('Unable to load deeper analysis at this time.');
      }
    } catch {
      setDeeperContent('Network error — could not load deeper analysis.');
    } finally {
      setDeeperLoading(false);
    }
  };

  // ─── Render: Compact Mode (for case simulation inline hints) ────────────

  if (compact) {
    return (
      <div style={{
        borderRadius: 10,
        border: `1px solid ${isCorrect ? 'rgba(0,229,160,0.15)' : 'rgba(255,87,87,0.15)'}`,
        background: isCorrect ? 'rgba(0,229,160,0.04)' : 'rgba(255,87,87,0.04)',
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 14px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: C.textSec,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <Brain size={14} style={{ color: C.purple }} />
          <span style={{ flex: 1, textAlign: 'left', color: C.text }}>Clinical Reasoning</span>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {expanded && (
          <div style={{ padding: '0 14px 14px' }}>
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                <div style={{ width: 14, height: 14, border: `2px solid ${C.purple}30`, borderTopColor: C.purple, borderRadius: '50%', animation: 'crSpin 0.8s linear infinite' }} />
                <span style={{ fontSize: 11, color: C.textMuted }}>Analyzing clinical reasoning...</span>
              </div>
            )}
            {error && <p style={{ fontSize: 11, color: C.danger, margin: 0 }}>{error}</p>}
            {result && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {result.reasoning.slice(0, 3).map((step, i) => (
                  <div key={i} style={{
                    padding: '6px 8px',
                    borderRadius: 6,
                    background: STEP_COLORS[i % STEP_COLORS.length].bg,
                    borderLeft: `2px solid ${STEP_COLORS[i % STEP_COLORS.length].accent}`,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: STEP_COLORS[i % STEP_COLORS.length].accent }}>{step.step}</span>
                    <p style={{ fontSize: 11, color: C.textSec, margin: '2px 0 0' }}>{step.finding}</p>
                  </div>
                ))}
                {result.redFlags.length > 0 && (
                  <div style={{
                    padding: '6px 8px',
                    borderRadius: 6,
                    background: 'rgba(255,87,87,0.08)',
                    borderLeft: `2px solid ${C.danger}`,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: C.danger }}>Red Flag: {result.redFlags[0].flag}</span>
                    <p style={{ fontSize: 10, color: C.textMuted, margin: '2px 0 0' }}>{result.redFlags[0].action}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── Render: Full Mode ──────────────────────────────────────────────────

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.card,
      overflow: 'hidden',
      marginTop: 12,
    }}>
      <style>{`
        @keyframes crSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes crFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes crPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Header - Collapsible Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 18px',
          background: expanded ? `${C.purple}06` : 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s ease',
          borderBottom: expanded ? `1px solid ${C.border}` : 'none',
        }}
      >
        <div style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: `${C.purple}12`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Brain size={15} style={{ color: C.purple }} />
        </div>
        <span style={{ flex: 1, textAlign: 'left', color: C.text, fontSize: 13, fontWeight: 600 }}>
          Clinical Reasoning
        </span>
        <span style={{
          fontSize: 9,
          padding: '2px 8px',
          borderRadius: 8,
          background: `${C.purple}15`,
          color: C.purple,
          fontWeight: 700,
          letterSpacing: '0.5px',
        }}>
          AI
        </span>
        {expanded ? (
          <ChevronDown size={16} style={{ color: C.textMuted }} />
        ) : (
          <ChevronRight size={16} style={{ color: C.textMuted }} />
        )}
      </button>

      {/* Content */}
      {expanded && (
        <div style={{ padding: 16 }}>
          {/* Loading State */}
          {loading && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              padding: '24px 0',
            }}>
              <div style={{
                width: 32,
                height: 32,
                border: `3px solid ${C.purple}25`,
                borderTopColor: C.purple,
                borderRadius: '50%',
                animation: 'crSpin 0.8s linear infinite',
              }} />
              <span style={{ fontSize: 12, color: C.textMuted }}>Analyzing clinical reasoning pathway...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 10,
              background: 'rgba(255,87,87,0.06)',
              border: '1px solid rgba(255,87,87,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <AlertTriangle size={14} style={{ color: C.danger }} />
              <span style={{ fontSize: 12, color: C.danger }}>{error}</span>
              <button
                onClick={fetchReasoning}
                style={{
                  marginLeft: 'auto',
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: `1px solid rgba(255,87,87,0.25)`,
                  background: 'transparent',
                  color: C.danger,
                  fontSize: 11,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <RotateCcw size={10} /> Retry
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Step-by-Step Reasoning */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <TrendingUp size={14} style={{ color: C.blue }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Reasoning Pathway</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.reasoning.slice(0, visibleSteps).map((step, i) => {
                    const colors = STEP_COLORS[i % STEP_COLORS.length];
                    const isActive = activeStepIndex === i;
                    return (
                      <div
                        key={i}
                        onClick={() => setActiveStepIndex(isActive ? null : i)}
                        style={{
                          borderRadius: 10,
                          background: colors.bg,
                          border: `1px solid ${isActive ? colors.border : 'transparent'}`,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          animation: 'crFadeIn 0.3s ease forwards',
                          transition: 'border-color 0.2s ease',
                        }}
                      >
                        {/* Step header */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 12px',
                        }}>
                          <div style={{
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            background: `${colors.accent}18`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 11,
                            fontWeight: 700,
                            color: colors.accent,
                          }}>
                            {i + 1}
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: colors.accent, flex: 1 }}>
                            {step.step}
                          </span>
                          {isActive ? (
                            <ChevronDown size={12} style={{ color: C.textMuted }} />
                          ) : (
                            <ChevronRight size={12} style={{ color: C.textMuted }} />
                          )}
                        </div>

                        {/* Step content - always show finding */}
                        <div style={{ padding: '0 12px 8px 42px' }}>
                          <p style={{ fontSize: 12, color: C.text, margin: 0, lineHeight: 1.5 }}>
                            {step.finding}
                          </p>
                        </div>

                        {/* Expanded details */}
                        {isActive && (
                          <div style={{
                            padding: '8px 12px 12px 42px',
                            borderTop: `1px solid ${colors.border}`,
                            background: `${colors.accent}04`,
                          }}>
                            <div style={{ marginBottom: 8 }}>
                              <span style={{ fontSize: 10, fontWeight: 600, color: C.textSec, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Significance</span>
                              <p style={{ fontSize: 12, color: C.textSec, margin: '4px 0 0', lineHeight: 1.5 }}>{step.significance}</p>
                            </div>
                            <div style={{
                              padding: '8px 10px',
                              borderRadius: 6,
                              background: `${C.green}08`,
                              borderLeft: `2px solid ${C.green}`,
                            }}>
                              <span style={{ fontSize: 10, fontWeight: 600, color: C.green, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Lightbulb size={10} /> Clinical Tip
                              </span>
                              <p style={{ fontSize: 11, color: C.textSec, margin: '3px 0 0', lineHeight: 1.5 }}>{step.clinicalTip}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Attending Tip Callout */}
              {result.attendingTip && (
                <div style={{
                  padding: 14,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${C.purple}08, ${C.teal}06)`,
                  border: `1px solid ${C.purple}18`,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 3,
                    height: '100%',
                    background: `linear-gradient(180deg, ${C.purple}, ${C.teal})`,
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, paddingLeft: 8 }}>
                    <GraduationCap size={15} style={{ color: C.purple }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>Attending Tip</span>
                    <span style={{
                      fontSize: 9,
                      padding: '1px 6px',
                      borderRadius: 4,
                      background: `${C.purple}15`,
                      color: C.purple,
                    }}>How a specialist thinks</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.textSec, margin: 0, lineHeight: 1.6, paddingLeft: 8 }}>
                    {result.attendingTip}
                  </p>
                </div>
              )}

              {/* Red Flags */}
              {result.redFlags.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <AlertOctagon size={14} style={{ color: C.danger }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.danger }}>Red Flags</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {result.redFlags.map((rf, i) => (
                      <div key={i} style={{
                        padding: '10px 12px',
                        borderRadius: 8,
                        background: 'rgba(255,87,87,0.06)',
                        border: `1px solid rgba(255,87,87,0.15)`,
                        borderLeft: `3px solid ${C.danger}`,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <AlertTriangle size={12} style={{ color: C.danger }} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{rf.flag}</span>
                        </div>
                        <p style={{ fontSize: 11, color: C.textSec, margin: '0 0 4px 18px', lineHeight: 1.5 }}>{rf.why}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 18 }}>
                          <Zap size={10} style={{ color: C.orange }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: C.orange }}>{rf.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alternative Diagnoses / Differential Diagnosis Table */}
              {result.alternativeDiagnoses.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Stethoscope size={14} style={{ color: C.teal }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Differential Diagnosis</span>
                  </div>
                  <div style={{
                    borderRadius: 10,
                    border: `1px solid ${C.border}`,
                    overflow: 'hidden',
                  }}>
                    {/* Table header */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 2fr',
                      gap: 0,
                      padding: '8px 12px',
                      background: C.input,
                      borderBottom: `1px solid ${C.border}`,
                    }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase' }}>Diagnosis</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase' }}>Likelihood</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase' }}>Distinguishing Features</span>
                    </div>
                    {/* Table rows */}
                    {result.alternativeDiagnoses.map((dx, i) => {
                      const lc = LIKELIHOOD_COLORS[dx.likelihood] || LIKELIHOOD_COLORS.moderate;
                      return (
                        <div key={i} style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 80px 2fr',
                          gap: 0,
                          padding: '10px 12px',
                          borderBottom: i < result.alternativeDiagnoses.length - 1 ? `1px solid ${C.border}` : 'none',
                          background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: lc.text,
                            }} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{dx.diagnosis}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{
                              fontSize: 10,
                              padding: '2px 6px',
                              borderRadius: 4,
                              background: lc.bg,
                              color: lc.text,
                              border: `1px solid ${lc.border}`,
                              fontWeight: 600,
                              textTransform: 'capitalize',
                            }}>
                              {dx.likelihood}
                            </span>
                          </div>
                          <span style={{ fontSize: 11, color: C.textSec, lineHeight: 1.5 }}>{dx.distinguishingFeatures}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Takeaway */}
              {result.keyTakeaway && (
                <div style={{
                  padding: 14,
                  borderRadius: 10,
                  background: `${C.green}06`,
                  border: `1px solid ${C.green}15`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}>
                  <Target size={16} style={{ color: C.green, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Takeaway</span>
                    <p style={{ fontSize: 12, color: C.textSec, margin: '4px 0 0', lineHeight: 1.6 }}>{result.keyTakeaway}</p>
                  </div>
                </div>
              )}

              {/* Deeper Analysis Section */}
              {showDeeper && deeperContent && (
                <div style={{
                  padding: 14,
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${C.cyan}06, ${C.blue}06)`,
                  border: `1px solid ${C.cyan}15`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Eye size={14} style={{ color: C.cyan }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.cyan }}>Deeper Analysis</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.textSec, margin: 0, lineHeight: 1.6 }}>{deeperContent}</p>
                </div>
              )}

              {/* Explain Further Button */}
              {!showDeeper && (
                <button
                  onClick={() => { setShowDeeper(true); handleExplainFurther(); }}
                  disabled={deeperLoading}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: 10,
                    border: `1px solid ${C.purple}25`,
                    background: `${C.purple}08`,
                    color: C.purple,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: deeperLoading ? 'wait' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {deeperLoading ? (
                    <>
                      <div style={{ width: 12, height: 12, border: `2px solid ${C.purple}30`, borderTopColor: C.purple, borderRadius: '50%', animation: 'crSpin 0.8s linear infinite' }} />
                      Analyzing deeper...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} />
                      Explain Further
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
