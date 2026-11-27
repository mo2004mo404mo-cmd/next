/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: components/scene-renderers/pbl/use-pbl-chat.ts
 *
 * Verbatim port.
 */

'use client';

import { useState, useCallback } from 'react';
import type { PBLProjectConfig, PBLChatMessage, PBLAgent, PBLIssue } from '@/lib/pbl/types';
import { getCurrentModelConfig } from '@/lib/utils/model-config';
import { useI18n } from '@/lib/hooks/use-i18n';
import { createLogger } from '@/lib/logger';

const log = createLogger('PBLChat');

interface UsePBLChatOptions {
  projectConfig: PBLProjectConfig;
  userRole: string;
  onConfigUpdate: (config: PBLProjectConfig) => void;
}

export function usePBLChat({ projectConfig, userRole, onConfigUpdate }: UsePBLChatOptions) {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);

  const messages = projectConfig.chat.messages;

  const currentIssue = projectConfig.issueboard.issues.find((i) => i.is_active) || null;

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const updatedConfig: PBLProjectConfig = {
        ...projectConfig,
        chat: {
          ...projectConfig.chat,
          messages: [...projectConfig.chat.messages],
        },
      };

      const userMsg: PBLChatMessage = {
        id: `msg_${Date.now()}_user`,
        agent_name: userRole,
        message: text,
        timestamp: Date.now(),
        read_by: [userRole],
      };
      updatedConfig.chat.messages.push(userMsg);
      onConfigUpdate(updatedConfig);

      const targetAgent = resolveTargetAgent(text, currentIssue, projectConfig.agents);
      if (!targetAgent) return;

      setIsLoading(true);

      try {
        const modelConfig = getCurrentModelConfig();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'x-model': modelConfig.modelString,
          'x-api-key': modelConfig.apiKey,
        };
        if (modelConfig.baseUrl) headers['x-base-url'] = modelConfig.baseUrl;
        if (modelConfig.providerType) headers['x-provider-type'] = modelConfig.providerType;

        const cleanMessage = text.replace(/^@\w+\s*/i, '').trim() || text;

        const isJudgeAgent = currentIssue && targetAgent.name === currentIssue.judge_agent_name;

        const response = await fetch('/api/pbl/chat', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: cleanMessage,
            agent: targetAgent,
            currentIssue,
            recentMessages: updatedConfig.chat.messages.slice(-10).map((m) => ({
              agent_name: m.agent_name,
              message: m.message,
            })),
            userRole,
            agentType: isJudgeAgent ? 'judge' : 'question',
          }),
        });

        const data = await response.json();

        if (data.success) {
          const agentMsg: PBLChatMessage = {
            id: `msg_${Date.now()}_agent`,
            agent_name: targetAgent.name,
            message: data.message,
            timestamp: Date.now(),
            read_by: [],
          };

          const afterConfig: PBLProjectConfig = {
            ...updatedConfig,
            chat: { messages: [...updatedConfig.chat.messages, agentMsg] },
          };

          const msgUpper = data.message.toUpperCase();
          if (
            currentIssue &&
            isJudgeAgent &&
            msgUpper.includes('COMPLETE') &&
            !msgUpper.includes('NEEDS_REVISION')
          ) {
            await handleIssueComplete(afterConfig, currentIssue, headers, t);
          }

          onConfigUpdate(afterConfig);
        }
      } catch (error) {
        log.error('[usePBLChat] Error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [projectConfig, userRole, currentIssue, isLoading, onConfigUpdate, t],
  );

  return { messages, isLoading, sendMessage, currentIssue };
}

function resolveTargetAgent(
  text: string,
  currentIssue: PBLIssue | null,
  agents: PBLAgent[],
): PBLAgent | null {
  if (!currentIssue) return null;

  const mentionMatch = text.match(/^@(\w+)/i);
  if (mentionMatch) {
    const mentionType = mentionMatch[1].toLowerCase();

    if (mentionType === 'question') {
      return agents.find((a) => a.name === currentIssue.question_agent_name) || null;
    }
    if (mentionType === 'judge') {
      return agents.find((a) => a.name === currentIssue.judge_agent_name) || null;
    }

    const matched = agents.find((a) => a.name.toLowerCase().includes(mentionType));
    if (matched) return matched;
  }

  return agents.find((a) => a.name === currentIssue.question_agent_name) || null;
}

async function handleIssueComplete(
  config: PBLProjectConfig,
  completedIssue: PBLIssue,
  headers: Record<string, string>,
  t: (key: string, options?: Record<string, unknown>) => string,
) {
  const issue = config.issueboard.issues.find((i) => i.id === completedIssue.id);
  if (issue) {
    issue.is_done = true;
    issue.is_active = false;
  }
  config.issueboard.current_issue_id = null;

  const nextIssue = config.issueboard.issues
    .filter((i) => !i.is_done)
    .sort((a, b) => a.index - b.index)[0];

  if (nextIssue) {
    nextIssue.is_active = true;
    config.issueboard.current_issue_id = nextIssue.id;

    const questionAgent = config.agents.find((a) => a.name === nextIssue.question_agent_name);
    if (questionAgent && !nextIssue.generated_questions) {
      try {
        const questionPrompt = [
          `## Issue Information`,
          ``,
          `**Title**: ${nextIssue.title}`,
          `**Description**: ${nextIssue.description}`,
          `**Person in Charge**: ${nextIssue.person_in_charge}`,
          nextIssue.participants.length > 0
            ? `**Participants**: ${nextIssue.participants.join(', ')}`
            : '',
          nextIssue.notes ? `**Notes**: ${nextIssue.notes}` : '',
          ``,
          `## Your Task`,
          ``,
          `Based on the issue information above, generate 1-3 specific, actionable questions that will help students understand and complete this issue. Format your response as a numbered list.`,
        ]
          .filter(Boolean)
          .join('\n');

        const resp = await fetch('/api/pbl/chat', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            message: questionPrompt,
            agent: questionAgent,
            currentIssue: nextIssue,
            recentMessages: [],
            userRole: '',
          }),
        });

        const data = await resp.json();
        if (data.success && data.message) {
          nextIssue.generated_questions = data.message;

          config.chat.messages.push({
            id: `msg_${Date.now()}_welcome`,
            agent_name: nextIssue.question_agent_name,
            message: data.message,
            timestamp: Date.now(),
            read_by: [],
          });
        }
      } catch (error) {
        log.error('[usePBLChat] Failed to generate questions for next issue:', error);
      }
    } else if (questionAgent && nextIssue.generated_questions) {
      config.chat.messages.push({
        id: `msg_${Date.now()}_welcome`,
        agent_name: nextIssue.question_agent_name,
        message: nextIssue.generated_questions,
        timestamp: Date.now(),
        read_by: [],
      });
    }

    config.chat.messages.push({
      id: `msg_${Date.now()}_system`,
      agent_name: 'System',
      message: t('pbl.chat.issueCompleteMessage', {
        completed: completedIssue.title,
        next: nextIssue.title,
      }),
      timestamp: Date.now(),
      read_by: [],
    });
  } else {
    config.chat.messages.push({
      id: `msg_${Date.now()}_system`,
      agent_name: 'System',
      message: t('pbl.chat.allCompleteMessage'),
      timestamp: Date.now(),
      read_by: [],
    });
  }
}
