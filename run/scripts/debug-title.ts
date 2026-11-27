import { HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { config as dotenv } from 'dotenv';
dotenv();

const fastModel = (process.env.MEDQ_AGENT_FAST_MODEL ?? 'off').trim();
const model = new ChatOpenAI({
  apiKey: process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '',
  model: fastModel,
  temperature: 0.3,
  maxTokens: 200,
  configuration: { baseURL: process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1' },
  maxRetries: 1,
});

const seed = `Explain the difference between Duchenne and Becker muscular dystrophy genetics

Duchenne and Becker muscular dystrophy are both X-linked recessive disorders caused by mutations in the DMD gene...`;

const res = await model.invoke([
  new HumanMessage(
    'Write a short title (3-6 words) for this conversation between a medical learner and their study assistant. ' +
    'You may think briefly, but you MUST end your reply with exactly one line in this format:\n' +
    'TITLE: Your Title\n' +
    'Nothing after that line.\n\n' +
    'Conversation:\n' + seed.slice(0, 800),
  ),
]);
console.log('=== RAW ===');
console.log(JSON.stringify((res as { content?: unknown }).content));
process.exit(0);
