/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/export/use-export-classroom.ts, lib/export/use-export-pptx.ts
 *
 * Stubs: export pipelines are not yet wired in medq (would require pptxgenjs
 * and @napi-rs/canvas). Provide no-op hooks so ported components that call
 * them (header-controls etc.) compile.
 */

import { useCallback } from 'react';

export interface UseExportClassroomReturn {
  exportClassroom: (stageId: string) => Promise<void>;
  isExporting: boolean;
}

export function useExportClassroom(): UseExportClassroomReturn {
  const exportClassroom = useCallback(async (_stageId: string) => {
    console.warn('[medq] useExportClassroom: not yet implemented');
  }, []);
  return { exportClassroom, isExporting: false };
}

export interface UseExportPptxReturn {
  exportPptx: (stageId: string) => Promise<void>;
  isExporting: boolean;
}

export function useExportPptx(): UseExportPptxReturn {
  const exportPptx = useCallback(async (_stageId: string) => {
    console.warn('[medq] useExportPptx: not yet implemented (requires pptxgenjs)');
  }, []);
  return { exportPptx, isExporting: false };
}
