import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { db } from '../../db';
import type { MedQToolContext } from '../types';
import { audit } from '../audit';

/**
 * manage_skills — runtime skill authoring tool (capability skill.write).
 *
 * The agent's LEARNING LOOP over its own skill library:
 *   - CREATE: persist a reusable workflow as a SKILL.md pack (source "user").
 *   - IMPROVE: enhance a skill the agent has used — rewrite the body with the
 *     lessons learned from this run (gaps hit, wrong tool references, missing
 *     steps, output-format fixes). The PRIOR version is snapshotted to
 *     AgentSkillRevision first, so every improvement is reversible from the
 *     skills viewer. This is what makes skills self-enhancing: the next turn
 *     loads the improved version.
 *   - DELETE: remove by skill id.
 *
 * Writes go through the AgentSkill model, which the skills workspace sync
 * renders into SKILL.md packs on the next agent build.
 */

/** Revisions kept per skill — history stays bounded and the UI list light. */
const MAX_REVISIONS = 20;

/**
 * Snapshot the CURRENT row into revision history (called before any content
 * overwrite). The revision's editedBy records WHO AUTHORED the archived
 * content (the skill's lastEditedBy) — authorship travels with content, so a
 * later restore of this revision restores the authorship badge too. Also
 * trims to the newest MAX_REVISIONS entries.
 */
async function snapshotRevision(
  skillId: string,
  reason: string | null,
): Promise<number> {
  const skill = await db.agentSkill.findUnique({ where: { id: skillId } });
  if (!skill) return 0;
  await db.agentSkillRevision.create({
    data: {
      skillId: skill.id,
      name: skill.name,
      description: skill.description,
      content: skill.content,
      reason,
      editedBy: skill.lastEditedBy || 'user',
    },
  });
  // Trim oldest beyond the cap (keep the newest MAX_REVISIONS).
  const oldest = await db.agentSkillRevision.findMany({
    where: { skillId: skill.id },
    orderBy: { createdAt: 'desc' },
    skip: MAX_REVISIONS,
    select: { id: true },
  });
  if (oldest.length > 0) {
    await db.agentSkillRevision.deleteMany({ where: { id: { in: oldest.map((r) => r.id) } } });
  }
  const total = await db.agentSkillRevision.count({ where: { skillId: skill.id } });
  return total;
}

function toKebab(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function createManageSkillsTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'manage_skills',
    description:
      'Manage the learner\'s personal skill library (reusable SKILL.md workflows you load via load_skill). CREATE: write a focused, step-by-step body (when to use, workflow, output format) — use when the learner asks to save a workflow as a skill. IMPROVE: enhance a skill you already used — pass the skill name, a short "findings" note describing the gaps you hit this run, and the FULL rewritten body incorporating the lessons. The previous version is saved to history the learner can restore, and the improved version loads on your next turn. Use IMPROVE whenever the learner asks you to improve/refine a skill, and proactively after a run where a skill needed corrections (missing steps, wrong tool names, unclear format). DELETE: remove by skill id.',
    schema: z.object({
      action: z.enum(['create', 'improve', 'delete']).describe('create a new skill, improve (rewrite) an existing one, or delete one'),
      name: z.string().min(3).max(60).optional().describe('kebab-case skill name, e.g. "renal-diagnostics-drill"'),
      description: z.string().min(10).max(1024).optional().describe('What the skill does and when to use it (create requires it; improve may update it)'),
      body: z.string().max(100_000).optional().describe('The full SKILL.md markdown body (required for create and improve): when to use, workflow steps, output format'),
      findings: z.string().max(2000).optional().describe('improve only: 1-3 sentences on what gaps you hit and what the rewrite fixes — shown to the learner in the version history'),
      skillId: z.string().optional().describe('The skill id (delete; or improve as an alternative to name)'),
    }),
    func: async ({ action, name, description, body, findings, skillId }) => {
      try {
        if (action === 'create') {
          if (!name || !description || !body) {
            return JSON.stringify({ ok: false, error: 'create requires name, description, and body' });
          }
          const kebab = toKebab(name);
          if (kebab.length < 3) {
            return JSON.stringify({ ok: false, error: 'name must contain at least 3 letters/digits' });
          }
          // Builtin names are reserved — the workspace sync owns those packs.
          const builtinClash = await db.agentSkill.findFirst({ where: { userId: null, name: kebab } });
          if (builtinClash) {
            return JSON.stringify({ ok: false, error: `"${kebab}" is a reserved built-in skill name (built-ins are operator-managed — create a personal variant like "${kebab}-v2" instead)` });
          }
          const existing = await db.agentSkill.findFirst({ where: { userId: ctx.userId, name: kebab } });
          if (existing) {
            // Re-creating an existing name overwrites it — snapshot first so
            // the rewrite is reversible, exactly like improve.
            const revisionCount = await snapshotRevision(existing.id, 're-authored via manage_skills create');
            const updated = await db.agentSkill.update({
              where: { id: existing.id },
              data: { description, content: body, enabled: true, lastEditedBy: 'agent' },
            });
            return JSON.stringify({ ok: true, updated: true, skillId: updated.id, name: kebab, revisionCount, note: 'previous version saved to history' });
          }
          const created = await db.agentSkill.create({
            data: {
              userId: ctx.userId,
              name: kebab,
              description,
              content: body,
              category: 'Custom',
              source: 'user',
              enabled: true,
              lastEditedBy: 'agent',
            },
          });
          await audit({ userId: ctx.userId, action: 'tool.execute', target: 'manage_skills', detail: { created: kebab } });
          return JSON.stringify({ ok: true, created: true, skillId: created.id, name: kebab });
        }

        if (action === 'improve') {
          if (!body) {
            return JSON.stringify({ ok: false, error: 'improve requires the full rewritten body (and name or skillId to identify the skill)' });
          }
          if (!name && !skillId) {
            return JSON.stringify({ ok: false, error: 'improve requires the skill name (or skillId)' });
          }
          // Scope to the user's own library — builtins are operator-managed.
          const target = skillId
            ? await db.agentSkill.findFirst({ where: { id: skillId, userId: ctx.userId } })
            : await db.agentSkill.findFirst({ where: { userId: ctx.userId, name: toKebab(name ?? '') } });
          if (!target) {
            return JSON.stringify({ ok: false, error: 'no such skill in the learner\'s personal library (built-in skills cannot be improved in place — create a personal variant with your enhancements instead)' });
          }
          const revisionCount = await snapshotRevision(
            target.id,
            findings?.trim() || 'improved by the agent',
          );
          const updated = await db.agentSkill.update({
            where: { id: target.id },
            data: {
              content: body,
              ...(description && description.trim().length >= 10 ? { description: description.trim() } : {}),
              lastEditedBy: 'agent',
            },
          });
          await audit({ userId: ctx.userId, action: 'tool.execute', target: 'manage_skills', detail: { improved: updated.name, findings: findings?.slice(0, 200) } });
          return JSON.stringify({
            ok: true,
            improved: true,
            skillId: updated.id,
            name: updated.name,
            revisionCount,
            note: 'the improved version loads on the next turn; the previous one is restorable from history',
          });
        }

        // delete
        if (!skillId) return JSON.stringify({ ok: false, error: 'delete requires skillId' });
        const removed = await db.agentSkill.deleteMany({ where: { id: skillId, userId: ctx.userId } });
        return JSON.stringify({ ok: removed.count > 0, deleted: removed.count > 0, skillId });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
