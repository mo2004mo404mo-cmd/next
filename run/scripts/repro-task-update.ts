/** Reproduce the task_update failure: invalid enum status through the gate. */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { withApprovalGate, TOOL_CAPABILITIES } from '../src/lib/agent/approvals/service';

const spec = TOOL_CAPABILITIES.task_update;
console.log('task_update spec exists:', !!spec);

const inner = new DynamicStructuredTool({
  name: 'task_update',
  description: 'test',
  schema: z.object({
    taskId: z.string().min(1),
    status: z.enum(['pending', 'in_progress', 'done', 'blocked']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
  }),
  func: async (i) => JSON.stringify({ updated: true, taskId: i.taskId }),
});

const gated = withApprovalGate(inner, { userId: 'test-user', threadId: 't' });

console.log('── invalid status via .invoke ──');
try {
  const r = await gated.invoke({ taskId: '1', status: 'completed' } as never);
  console.log('invoke returned:', String(r).slice(0, 200));
} catch (e) {
  console.log('invoke THREW:', (e as Error).name, (e as Error).message.slice(0, 200));
  console.log('has .output?', 'output' in (e as object));
  console.log('full keys:', Object.keys(e as object));
  console.log('String(e):', String(e).slice(0, 300));
}

console.log('── valid status via .invoke ──');
try {
  const r = await gated.invoke({ taskId: '1', status: 'done' } as never);
  console.log('invoke returned:', String(r).slice(0, 200));
} catch (e) {
  console.log('invoke THREW:', (e as Error).name, (e as Error).message.slice(0, 200));
}
process.exit(0);
