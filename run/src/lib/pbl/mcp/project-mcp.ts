/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pbl/mcp/project-mcp.ts
 *
 * Verbatim port — pure TypeScript.
 */

import type { PBLProjectConfig, PBLToolResult } from '../types';

export class ProjectMCP {
  private config: PBLProjectConfig;

  constructor(config: PBLProjectConfig) {
    this.config = config;
  }

  getProjectInfo(): PBLToolResult {
    return {
      success: true,
      title: this.config.projectInfo.title,
      description: this.config.projectInfo.description,
    };
  }

  updateTitle(title: string): PBLToolResult {
    if (!title?.trim()) {
      return { success: false, error: 'Title cannot be empty.' };
    }
    this.config.projectInfo.title = title;
    return { success: true, message: 'Title updated successfully.' };
  }

  updateDescription(description: string): PBLToolResult {
    if (description === null || description === undefined) {
      return { success: false, error: 'Description cannot be null.' };
    }
    this.config.projectInfo.description = description;
    return { success: true, message: 'Description updated successfully.' };
  }
}
