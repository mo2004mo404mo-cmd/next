/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/scene-renderers/pbl-renderer.tsx
 *
 * Verbatim port.
 */

'use client';

import { useCallback } from 'react';
import type { PBLContent, StageMode } from '@/lib/types/stage';
import type { PBLProjectConfig } from '@/lib/pbl/types';
import { useStageStore } from '@/lib/store/stage';
import { PBLRoleSelection } from '@/components/openmaic/scene-renderers/pbl/role-selection';
import { PBLWorkspace } from '@/components/openmaic/scene-renderers/pbl/workspace';
import { useI18n } from '@/lib/hooks/use-i18n';

interface PBLRendererProps {
  readonly content: PBLContent;
  readonly mode: StageMode;
  readonly sceneId: string;
}

export function PBLRenderer({ content, mode: _mode, sceneId }: PBLRendererProps) {
  const { t } = useI18n();

  const { projectConfig } = content;
  const selectedRole = projectConfig?.selectedRole ?? null;

  const updateConfig = useCallback(
    (updatedConfig: PBLProjectConfig) => {
      const scenes = useStageStore.getState().scenes;
      const updatedScenes = scenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              content: { type: 'pbl' as const, projectConfig: updatedConfig },
            }
          : scene,
      );
      useStageStore.setState({ scenes: updatedScenes });
    },
    [sceneId],
  );

  const handleSelectRole = useCallback(
    (roleName: string) => {
      if (!projectConfig) return;
      const newConfig = { ...projectConfig, selectedRole: roleName };

      const activeIssue = newConfig.issueboard.issues.find((i) => i.is_active);
      if (activeIssue?.generated_questions && newConfig.chat.messages.length === 0) {
        newConfig.chat = {
          messages: [
            {
              id: `msg_welcome_${Date.now()}`,
              agent_name: activeIssue.question_agent_name,
              message: activeIssue.generated_questions,
              timestamp: Date.now(),
              read_by: [],
            },
          ],
        };
      }

      updateConfig(newConfig);
    },
    [projectConfig, updateConfig, t],
  );

  const handleReset = useCallback(() => {
    if (!projectConfig) return;
    const resetIssues = projectConfig.issueboard.issues
      .map((i) => ({ ...i, is_done: false, is_active: false }))
      .sort((a, b) => a.index - b.index);
    if (resetIssues.length > 0) {
      resetIssues[0].is_active = true;
    }

    updateConfig({
      ...projectConfig,
      selectedRole: null,
      chat: { messages: [] },
      issueboard: {
        ...projectConfig.issueboard,
        issues: resetIssues,
        current_issue_id: resetIssues.length > 0 ? resetIssues[0].id : null,
      },
    });
  }, [projectConfig, updateConfig]);

  if (!projectConfig) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>{t('pbl.legacyFormat')}</p>
      </div>
    );
  }

  if (projectConfig.agents.length === 0 && projectConfig.projectInfo.title === '') {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>{t('pbl.emptyProject')}</p>
      </div>
    );
  }

  if (!selectedRole) {
    return (
      <PBLRoleSelection
        projectInfo={projectConfig.projectInfo}
        agents={projectConfig.agents}
        onSelectRole={handleSelectRole}
      />
    );
  }

  return (
    <PBLWorkspace
      projectConfig={projectConfig}
      userRole={selectedRole}
      onConfigUpdate={updateConfig}
      onReset={handleReset}
    />
  );
}
