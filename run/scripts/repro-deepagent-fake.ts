/**
 * Repro 2: fake model — isolate whether the framework mangles a proper
 * AIMessage. Scenarios:
 *   A) plain text response (no tool calls)      → expect: works
 *   B) text + task tool_call (mirrors zai-llm)  → expect: reproduces the bug?
 * Run: bun scripts/repro-deepagent-fake.ts
 */
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { createDeepAgent, type SubAgent } from 'deepagents';

function fakeModel(name: string, responseFactory: () => AIMessage) {
  const bound: Record<string, unknown> = {
    invoke: async (_input: unknown, _opts?: unknown) => {
      console.log(`[${name}] bound.invoke called`);
      return responseFactory();
    },
    stream: async function* (_input: unknown, _opts?: unknown) {
      console.log(`[${name}] bound.stream called`);
      yield responseFactory();
    },
  };
  const model: Record<string, unknown> = {
    getName: () => 'ChatOpenAI',
    get modelName() { return 'fake-model'; },
    invoke: async (_input: unknown, _opts?: unknown) => {
      console.log(`[${name}] invoke called`);
      return responseFactory();
    },
    _streamResponseChunks: async function* () { /* not used */ },
    bindTools: (_tools: unknown, _opts?: unknown) => {
      console.log(`[${name}] bindTools called`);
      return bound;
    },
  };
  return model;
}

function textResponse(text: string) {
  return new AIMessage({ content: text });
}

function taskToolCallResponse() {
  // Mirrors zai-llm's actual shape: content text + a tool call for `task`
  return new AIMessage({
    content: "I'll delegate this to the question-author subagent.",
    tool_calls: [
      {
        name: 'task',
        args: { description: 'Write a question about hand hygiene.', subagent_type: 'question-author' },
        id: 'call_repro_1',
      },
    ],
  });
}

const author: SubAgent = {
  name: 'question-author',
  description: 'Writes one short exam question.',
  systemPrompt: 'You write tiny exam questions. Return only the question text.',
};

async function runScenario(label: string, model: Record<string, unknown>) {
  console.log(`\n=== Scenario ${label} ===`);
  const agent = createDeepAgent({
    name: `repro-${label}`,
    model: model as never,
    systemPrompt: 'You are a repro agent. Delegate question writing to the question-author subagent.',
    subagents: [author],
    tools: [],
  });
  try {
    const stream = await agent.stream(
      { messages: [new HumanMessage('Create one trivial question about hand hygiene.')] },
      { streamMode: ['updates', 'messages'] } as never,
    );
    let n = 0;
    for await (const item of stream as AsyncIterable<[string, unknown]>) {
      n++;
      const [mode, payload] = item;
      if (mode === 'messages') {
        const [chunk] = payload as [{ content?: unknown }, unknown];
        if (chunk?.content) console.log(`  msg#${n}:`, String(chunk.content).slice(0, 60));
      } else {
        console.log(`  update#${n}:`, JSON.stringify(payload).slice(0, 100));
      }
      if (n > 40) break;
    }
    console.log(`  → COMPLETED without middleware error`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`  → FAILED: ${msg.slice(0, 160)}`);
  }
}

// Scenario A: model answers with plain text only
await runScenario('A-plain-text', fakeModel('A', () => textResponse('Here is a question: what is hand hygiene?')));

// Scenario B: model calls the task tool (subagent delegation)
await runScenario('B-task-toolcall', fakeModel('B', taskToolCallResponse));
