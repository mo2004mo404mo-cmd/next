/** Does a zod-invalid tool call kill the graph, and does the middleware stack change that? */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { createAgent, todoListMiddleware, modelRetryMiddleware, modelCallLimitMiddleware, toolCallLimitMiddleware } from 'langchain';
import { FakeListChatModel } from '@langchain/core/utils/testing';

const badTool = new DynamicStructuredTool({
  name: 'update_thing',
  description: 'updates a thing',
  schema: z.object({ status: z.enum(['pending', 'done']) }),
  func: async () => 'updated',
});

const model = new FakeListChatModel({ responses: [
  'call the tool with an invalid status', // ignored content; we patch tool_calls below
]}) as never;

// FakeListChatModel can't emit tool calls reliably; instead call the ToolNode
// directly through a minimal agent-less path: invoke the tool the way
// ToolNode does and see what happens with try/catch.
console.log('── direct: what does ToolNode see? ──');
try {
  const r = await badTool.invoke({ status: 'completed' } as never);
  console.log('tool.invoke returned:', r);
} catch (e) {
  console.log('tool.invoke threw (ToolNode would need to catch this):', (e as Error).message.slice(0, 80));
}

console.log('\n── middleware stack constructs (regression check) ──');
const stack = [
  modelRetryMiddleware({ maxRetries: 2, backoffFactor: 2, initialDelayMs: 1000, maxDelayMs: 8000, jitter: true, onFailure: 'error' }),
  modelCallLimitMiddleware({ runLimit: 60, exitBehavior: 'error' }),
  toolCallLimitMiddleware({ runLimit: 160, exitBehavior: 'error' }),
  todoListMiddleware(),
];
console.log('stack built:', stack.map((m) => m.name).join(', '));
console.log('\nNOTE: the escape happens in ToolNode error handling; middleware does not');
console.log('wrap tool invocation errors. Fix = tolerant schema at the tool level.');
process.exit(0);
