'use client';
// ─── agent-ui — public surface ───────────────────────────────────────────────
// The MedQ agent component library, organized after the product taxonomy:
//
//   A. Conversation   conversation.tsx
//   B. Agent execution execution.tsx
//   C. Rich output    (feedback.tsx: CitationList, FormCard, DiffViewer,
//                      ActionReceipt — structured results inside the thread;
//                      tables/charts/files keep flowing through the existing
//                      MultimodalRenderer blocks)
//   D. Feedback & recovery feedback.tsx + conversation.tsx (ConnectionStatus)
//
// Import from this barrel in feature code. Within the library, import the
// concrete module instead (avoids circular imports with MedQAgentMessageParts).

export * from './types';
export * from './primitives';
export * from './execution';
export * from './conversation';
export * from './feedback';
