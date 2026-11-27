/**
 * Anti-fabrication guard for agent final answers.
 *
 * WHY: the fast model occasionally pattern-matches an earlier successful
 * turn and produces a complete "✅ Infographic Created Successfully!" report
 * with a plausible-looking image embed — WITHOUT having called any tool this
 * turn (observed live in the "Medical Image Creation Skill" chat, twice in a
 * row: fabricated /generated/agent-*.jpg paths that never existed on disk,
 * while zero tool calls ran). A prompt-level rule ("never claim a deliverable
 * without a tool call") demonstrably does not stop it.
 *
 * This module is the deterministic backstop. At done-time it cross-checks
 * every deliverable reference in the final text:
 *
 *   1. `/generated/<file>` embeds/links — real only if the file EXISTS on
 *      disk (public/generated) or the path appears verbatim in this turn's
 *      tool results.
 *   2. `/api/medq-agent/artifacts/<id>` links — real only if the artifact
 *      row exists (getArtifact — covers legitimate cross-turn references to
 *      earlier artifacts) or the id appears in this turn's tool results.
 *
 * Fabricated references are stripped (label text kept) and a visible
 * correction note is appended, so the learner never clicks a dead link that
 * was presented as a finished deliverable. The check FAILS OPEN: any error
 * while verifying (DB hiccup, fs failure) keeps the text unchanged — a
 * verifier glitch must never eat legitimate content.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getArtifact } from './artifacts/service';

/** Shape the chat v2 route already collects per run (name + result text). */
export interface ToolResultLike {
  toolName: string;
  content: string;
}

export interface FabricationCheck {
  /** The (possibly rewritten) final text. */
  text: string;
  /** References that were removed as fabricated. */
  removed: Array<{ ref: string; kind: 'generated-file' | 'artifact' }>;
}

/** `/generated/<name>` — name charset excludes slashes/backslashes, so it
 * cannot escape the public/generated directory. */
const GENERATED_REF = /\/generated\/([A-Za-z0-9][A-Za-z0-9._-]*)/g;

/** `/api/medq-agent/artifacts/<id>` — MedQ cuid ids. */
const ARTIFACT_REF = /\/api\/medq-agent\/artifacts\/([A-Za-z0-9][A-Za-z0-9-]*)/g;

const CORRECTION_NOTE =
  '\n\n---\n> ⚠️ **Correction:** parts of this reply claimed deliverables that were never actually created ' +
  '(the required tool never ran, so the links pointed at nothing). The invalid references were removed. ' +
  'Send the request again if you want the real deliverable generated.';

/** Directory that serves /generated/* — <project>/public/generated. */
function generatedDir(): string {
  return path.join(process.cwd(), 'public', 'generated');
}

/** A name is rejected if it could traverse out of the directory. */
function isSafeFileName(name: string): boolean {
  return name !== '.' && name !== '..' && !name.includes('..');
}

/**
 * Verify and clean the final answer text. Pure rewrite + note — never throws
 * into the caller (every verification step is individually try/caught and
 * fails open: unverifiable ⇒ kept).
 */
export async function stripFabricatedDeliverableClaims(
  text: string,
  toolResults: ToolResultLike[],
  userId?: string | null,
): Promise<FabricationCheck> {
  const result: FabricationCheck = { text, removed: [] };
  if (!text) return result;
  // NOTE: empty toolResults must NOT early-return — a no-tool turn claiming
  // tool-made deliverables is exactly the fabrication pattern this guards
  // (files/artifacts from earlier turns legitimately exist and stay).

  const toolBlob = toolResults.map((t) => `${t.content ?? ''}`).join('\n');

  // ── /generated/<file> claims ──
  const generatedClaims = new Map<string, boolean>();
  for (const m of text.matchAll(GENERATED_REF)) {
    const name = m[1];
    if (!isSafeFileName(name) || generatedClaims.has(name)) continue;
    let real = toolBlob.includes(`/generated/${name}`);
    if (!real) {
      try {
        real = fs.existsSync(path.join(generatedDir(), name));
      } catch {
        real = true; // fail open
      }
    }
    generatedClaims.set(name, real);
  }

  // ── /api/medq-agent/artifacts/<id> claims ──
  const artifactClaims = new Map<string, boolean>();
  for (const m of text.matchAll(ARTIFACT_REF)) {
    const id = m[1];
    if (artifactClaims.has(id)) continue;
    let real = toolBlob.includes(`/api/medq-agent/artifacts/${id}`);
    if (!real) {
      try {
        real = (await getArtifact(userId, id)) != null;
      } catch {
        real = true; // fail open
      }
    }
    artifactClaims.set(id, real);
  }

  const fabricatedGenerated = [...generatedClaims.entries()]
    .filter(([, real]) => !real)
    .map(([name]) => name);
  const fabricatedArtifacts = [...artifactClaims.entries()]
    .filter(([, real]) => !real)
    .map(([id]) => id);

  if (fabricatedGenerated.length === 0 && fabricatedArtifacts.length === 0) {
    return result;
  }

  // ── Rewrite: strip fabricated embeds/links, keep the human label ──
  let rewritten = text;

  for (const name of fabricatedGenerated) {
    const ref = `/generated/${name}`;
    // Image embed: ![label](ref) → label (kept) + inline marker
    rewritten = rewritten.replace(
      new RegExp(`!\\[([^\\]]*)\\]\\(${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
      '*[$1 — not actually created, link removed]*',
    );
    // Plain link: [label](ref) → label + inline marker
    rewritten = rewritten.replace(
      new RegExp(`\\[([^\\]]*)\\]\\(${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
      '*[$1 — not actually created, link removed]*',
    );
    // Bare reference (no markup) → marker
    rewritten = rewritten.split(ref).join('*[link removed — never actually created]*');
    result.removed.push({ ref, kind: 'generated-file' });
  }

  for (const id of fabricatedArtifacts) {
    const ref = `/api/medq-agent/artifacts/${id}`;
    rewritten = rewritten.replace(
      new RegExp(`\\[([^\\]]*)\\]\\(${ref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
      '*[$1 — not actually created, link removed]*',
    );
    rewritten = rewritten.split(ref).join('*[link removed — never actually created]*');
    result.removed.push({ ref, kind: 'artifact' });
  }

  result.text = rewritten.trimEnd() + CORRECTION_NOTE;
  return result;
}
