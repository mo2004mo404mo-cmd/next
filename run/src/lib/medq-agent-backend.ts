import { randomUUID } from 'node:crypto';

export interface SkillCatalogEntry {
  id: string;
  name: string;
  category: string;
  outputKind: 'file' | 'image' | 'text' | 'search-results' | 'audio';
  description: string;
  prompt: string;
}

export const SKILL_CATALOG: SkillCatalogEntry[] = [
  { id: 'pdf', name: 'PDF cheat sheet', category: 'Documents', outputKind: 'file', description: 'Create a downloadable study guide or cheat sheet.', prompt: 'Make me a PDF cheat sheet about ' },
  { id: 'pptx', name: 'Presentation', category: 'Documents', outputKind: 'file', description: 'Create a slide deck for a medical topic.', prompt: 'Create a 5-slide presentation about ' },
  { id: 'docx', name: 'Word document', category: 'Documents', outputKind: 'file', description: 'Draft a structured Word document.', prompt: 'Make a Word document about ' },
  { id: 'xlsx', name: 'Spreadsheet', category: 'Data', outputKind: 'file', description: 'Build a workbook with organized study data.', prompt: 'Build an Excel spreadsheet for ' },
  { id: 'charts', name: 'Chart', category: 'Data', outputKind: 'image', description: 'Create a chart or graph for comparison.', prompt: 'Create a chart comparing ' },
  { id: 'image-generation', name: 'Medical illustration', category: 'Images', outputKind: 'image', description: 'Generate an educational medical illustration.', prompt: 'Generate a medical illustration of ' },
  { id: 'image-search', name: 'Image search', category: 'Images', outputKind: 'search-results', description: 'Find real medical images and references.', prompt: 'Find real medical images of ' },
  { id: 'vlm', name: 'Image analysis', category: 'Images', outputKind: 'text', description: 'Analyze an uploaded image.', prompt: 'Analyze the uploaded image and explain ' },
  { id: 'tts', name: 'Text to speech', category: 'Audio', outputKind: 'audio', description: 'Read study material aloud.', prompt: 'Read this aloud and save an audio file: ' },
  { id: 'web-search', name: 'Web search', category: 'Web', outputKind: 'search-results', description: 'Search current medical references.', prompt: 'Search the web for ' },
  { id: 'lecture-summarizer', name: 'Lecture summarizer', category: 'Study', outputKind: 'text', description: 'Summarize a lecture and create flashcards.', prompt: 'Summarize my uploaded lecture and create flashcards about ' },
  { id: 'osce-simulator', name: 'OSCE simulator', category: 'Study', outputKind: 'text', description: 'Practice a structured clinical station.', prompt: 'Set up an OSCE station about ' },
  { id: 'exam-planner', name: 'Exam planner', category: 'Study', outputKind: 'text', description: 'Create a personalized revision schedule.', prompt: 'Plan my study schedule for ' },
  { id: 'guidelines-library', name: 'Guidelines library', category: 'Study', outputKind: 'search-results', description: 'Compare current clinical guidelines.', prompt: 'Compare the latest guidelines for ' },
];

export interface AgentJobEvent {
  type: 'progress' | 'text' | 'done' | 'error';
  ts: number;
  text?: string;
}

export interface AgentJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  message: string;
  events: AgentJobEvent[];
  finalText: string;
  error: string | null;
  createdAt: number;
  updatedAt: number;
}

const runtime = globalThis as typeof globalThis & {
  __medqAgentJobs?: Map<string, AgentJob>;
};
const jobs = runtime.__medqAgentJobs ??= new Map<string, AgentJob>();

function providerConfig() {
  return {
    baseUrl: (process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, ''),
    apiKey: process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY,
    model: process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini',
  };
}

export async function completeAgentMessage(
  message: string,
  history: Array<{ role: string; content: string }> = [],
  context?: string,
): Promise<string> {
  const config = providerConfig();
  if (!config.apiKey) {
    return `I received your request: “${message}”\n\nConfigure MEDQ_AGENT_API_KEY (and optionally MEDQ_AGENT_BASE_URL / MEDQ_AGENT_MODEL) to enable the connected agent provider. Your uploaded context and selected skill are ready to be sent once the provider is configured.`;
  }

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.4,
      messages: [
        { role: 'system', content: 'You are MedQ Agent, a rigorous medical study assistant. Provide educational information, mention when current guidelines should be checked, and do not present medical advice as diagnosis or treatment.' },
        ...history.slice(-20).map((item) => ({ role: item.role === 'assistant' ? 'assistant' : 'user', content: item.content })),
        { role: 'user', content: context ? `${message}\n\nCurrent app context:\n${context}` : message },
      ],
    }),
  });
  if (!response.ok) throw new Error(`Agent provider returned HTTP ${response.status}`);
  const payload = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return payload.choices?.[0]?.message?.content?.trim() || 'The agent returned an empty response.';
}

export function createAgentJob(message: string): AgentJob {
  const now = Date.now();
  const job: AgentJob = { id: `agent_${now}_${randomUUID().slice(0, 8)}`, status: 'pending', message, events: [], finalText: '', error: null, createdAt: now, updatedAt: now };
  jobs.set(job.id, job);
  return job;
}

export function getAgentJob(id: string) {
  return jobs.get(id) ?? null;
}

export async function runAgentJob(job: AgentJob, history: Array<{ role: string; content: string }> = [], context?: string) {
  job.status = 'processing';
  job.updatedAt = Date.now();
  job.events.push({ type: 'progress', ts: Date.now(), text: 'Agent is working...' });
  try {
    job.finalText = await completeAgentMessage(job.message, history, context);
    job.events.push({ type: 'text', ts: Date.now(), text: job.finalText });
    job.events.push({ type: 'done', ts: Date.now() });
    job.status = 'completed';
  } catch (error) {
    job.error = error instanceof Error ? error.message : String(error);
    job.events.push({ type: 'error', ts: Date.now(), text: job.error });
    job.status = 'failed';
  } finally {
    job.updatedAt = Date.now();
  }
}