/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/orchestration/registry/agent-selection.ts
 *
 * Agent selection logic for restoring per-classroom agent selections.
 *
 * MedQ note: OpenMAIC uses this on the client (AgentBar component) to decide
 * which agents participate in a classroom. MedQ currently uses a simpler
 * server-side `pickAgentsForScene()` in `store.ts`, but the ported file is
 * kept verbatim for future use if a client-side agent bar is added.
 */

export interface AgentSelection {
  mode: 'preset' | 'auto';
  selectedAgentIds: string[];
}

export interface RestoredAgentSelection {
  selection: AgentSelection;
  /** Whether `selection` is the user's explicit choice (vs stage-derived defaults). */
  isUserSet: boolean;
}

/**
 * Decide the agent mode/selection to apply when a classroom loads.
 *
 * Only an explicit user choice (made in the AgentBar, `persistedIsUserSet`)
 * may carry across classrooms — and only while it is still valid for the
 * loaded stage: a preset selection of known non-generated agents, or an auto
 * selection drawn from this stage's generated agents. Stage-derived defaults
 * written by previous classroom loads are NOT user choices and must never be
 * re-read as one, or visiting a preset classroom would permanently downgrade
 * every auto classroom to preset agents.
 *
 * The fallback reproduces the previous unconditional behavior: auto with all
 * generated agents when the stage has them, else the stage's preset agents,
 * else the default trio.
 */
export function restoreAgentSelection(params: {
  persisted: AgentSelection;
  persistedIsUserSet: boolean;
  generatedAgentIds: string[];
  stageAgentIds?: string[];
  isPresetAgent: (id: string) => boolean;
}): RestoredAgentSelection {
  const { persisted, persistedIsUserSet, generatedAgentIds, stageAgentIds, isPresetAgent } = params;

  if (persistedIsUserSet && persisted.selectedAgentIds.length > 0) {
    if (persisted.mode === 'auto') {
      const generated = new Set(generatedAgentIds);
      if (persisted.selectedAgentIds.every((id) => generated.has(id))) {
        return { selection: persisted, isUserSet: true };
      }
    } else if (persisted.selectedAgentIds.every(isPresetAgent)) {
      return { selection: persisted, isUserSet: true };
    }
  }

  if (generatedAgentIds.length > 0) {
    return { selection: { mode: 'auto', selectedAgentIds: generatedAgentIds }, isUserSet: false };
  }
  const cleanIds = stageAgentIds?.filter(isPresetAgent) ?? [];
  return {
    selection: {
      mode: 'preset',
      selectedAgentIds: cleanIds.length > 0 ? cleanIds : ['default-1', 'default-2', 'default-3'],
    },
    isUserSet: false,
  };
}
