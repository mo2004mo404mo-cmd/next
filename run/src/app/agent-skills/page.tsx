'use client';

/**
 * MedQ Agent Skills — Enhanced UI
 *
 * Three tabs:
 *   1. CHAT  — Conversation with the MedQ agent. Uses the JOB-BASED endpoint
 *              (/api/medq-agent/job) so long tool chains never time out.
 *              Renders markdown, shows tool-call cards inline, polls for
 *              progress every 800ms.
 *   2. SKILLS — Searchable, categorized grid of all 18 skill tools. Each
 *               card has a "Use this skill" button that drops a prompt
 *               template into the chat tab.
 *   3. UPLOAD — Embedded file-upload widget (links to /skills-playground for
 *               the full VLM / image-edit / video-understand flow).
 *
 * Replaces the previous SSE-only /agent-skills page.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Presentation,
  BarChart3,
  Image as ImageIcon,
  Search,
  Globe,
  FileEdit,
  Send,
  Loader2,
  Download,
  ExternalLink,
  Sparkles,
  Wrench,
  Table2,
  Eye,
  Volume2,
  Mic,
  ImagePlay,
  Video,
  ArrowLeft,
  Check,
  AlertCircle,
  Clock,
  Copy,
  Box,
  Upload,
  Lightbulb,
  Headphones,
  Stethoscope,
  CalendarClock,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { MultimodalRenderer } from '@/components/medq/ai-agent/MultimodalRenderer';

// ─── Types ─────────────────────────────────────────────────────────

interface SkillEntry {
  id: string;
  name: string;
  description: string;
  outputKind: 'file' | 'image' | 'text' | 'search-results' | 'audio';
  extensions?: string[];
  estimatedRuntimeSeconds?: number;
  requiresCredentials?: boolean;
}

interface ToolCall {
  name: string;
  args: Record<string, unknown>;
  result?: {
    description: string;
    artifact?: Record<string, unknown>;
    actions?: Array<{ id: string; label: string; type: string; target: string }>;
    /** Rich inline blocks (3D models, tables, …) sent by the skills route. */
    multimodalContent?: unknown[];
  };
  status: 'running' | 'done' | 'failed';
  iteration?: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: ToolCall[];
  status?: 'running' | 'completed' | 'failed';
  jobId?: string;
  progressText?: string;
  timestamp: number;
}

// ─── Skill metadata (icon + category + sample prompts) ─────────────

interface SkillMeta {
  icon: LucideIcon;
  category: 'Documents' | 'Images' | 'Audio & Video' | 'Web' | 'Data' | 'Study' | '3D';
  color: string;        // tailwind gradient classes
  solidBg: string;      // solid background tint (hex) for accents
  ring: string;         // border ring color
  samplePrompt: string;
}

const SKILL_META: Record<string, SkillMeta> = {
  pdf: {
    icon: FileText,
    category: 'Documents',
    color: 'from-rose-500 to-red-600',
    solidBg: '#e11d48',
    ring: 'ring-rose-200',
    samplePrompt: 'Make me a PDF cheat sheet of the cranial nerves with mnemonics',
  },
  pptx: {
    icon: Presentation,
    category: 'Documents',
    color: 'from-orange-500 to-amber-600',
    solidBg: '#ea580c',
    ring: 'ring-orange-200',
    samplePrompt: 'Generate a PowerPoint deck on the cardiac cycle (5 slides)',
  },
  docx: {
    icon: FileEdit,
    category: 'Documents',
    color: 'from-blue-500 to-indigo-600',
    solidBg: '#2563eb',
    ring: 'ring-blue-200',
    samplePrompt: 'Make me a Word document template for SOAP notes',
  },
  xlsx: {
    icon: Table2,
    category: 'Documents',
    color: 'from-emerald-500 to-green-600',
    solidBg: '#059669',
    ring: 'ring-emerald-200',
    samplePrompt: 'Build me an Excel sheet of common lab reference ranges by age',
  },
  charts: {
    icon: BarChart3,
    category: 'Data',
    color: 'from-cyan-500 to-teal-600',
    solidBg: '#0891b2',
    ring: 'ring-cyan-200',
    samplePrompt: 'Create a bar chart comparing the efficacy of common antihypertensives',
  },
  'image-generation': {
    icon: ImageIcon,
    category: 'Images',
    color: 'from-violet-500 to-purple-600',
    solidBg: '#7c3aed',
    ring: 'ring-violet-200',
    samplePrompt: 'Generate a medical illustration of the nephron',
  },
  'image-search': {
    icon: ImageIcon,
    category: 'Images',
    color: 'from-fuchsia-500 to-pink-600',
    solidBg: '#c026d3',
    ring: 'ring-fuchsia-200',
    samplePrompt: 'Find me 3 real histology slides of cardiac muscle tissue',
  },
  'image-edit': {
    icon: ImagePlay,
    category: 'Images',
    color: 'from-pink-500 to-rose-600',
    solidBg: '#db2777',
    ring: 'ring-pink-200',
    samplePrompt: '(Use the Upload tab to upload an image to edit)',
  },
  vlm: {
    icon: Eye,
    category: 'Images',
    color: 'from-sky-500 to-cyan-600',
    solidBg: '#0284c7',
    ring: 'ring-sky-200',
    samplePrompt: '(Use the Upload tab to upload an image to analyze)',
  },
  tts: {
    icon: Volume2,
    category: 'Audio & Video',
    color: 'from-amber-500 to-yellow-600',
    solidBg: '#d97706',
    ring: 'ring-amber-200',
    samplePrompt: 'Pronounce "onychocryptosis" and save it as an audio file',
  },
  asr: {
    icon: Mic,
    category: 'Audio & Video',
    color: 'from-yellow-500 to-orange-600',
    solidBg: '#ca8a04',
    ring: 'ring-yellow-200',
    samplePrompt: '(Use the Upload tab to upload audio for transcription)',
  },
  'video-understand': {
    icon: Video,
    category: 'Audio & Video',
    color: 'from-red-500 to-pink-600',
    solidBg: '#dc2626',
    ring: 'ring-red-200',
    samplePrompt: '(Use the Upload tab to upload a video to analyze)',
  },
  'web-search': {
    icon: Search,
    category: 'Web',
    color: 'from-indigo-500 to-blue-600',
    solidBg: '#4f46e5',
    ring: 'ring-indigo-200',
    samplePrompt: 'Search the web for the latest 2023 ACC/AHA heart failure guidelines and summarize',
  },
  'web-reader': {
    icon: Globe,
    category: 'Web',
    color: 'from-blue-500 to-sky-600',
    solidBg: '#2563eb',
    ring: 'ring-blue-200',
    samplePrompt: 'Read https://www.who.int/news-room/fact-sheets/detail/hypertension and summarize',
  },
  'lecture-summarizer': {
    icon: Headphones,
    category: 'Study',
    color: 'from-purple-500 to-indigo-600',
    solidBg: '#7c3aed',
    ring: 'ring-purple-200',
    samplePrompt: 'I uploaded a 45-minute lecture audio on acute coronary syndromes — transcribe it and give me a summary, key points, and 10 flashcards',
  },
  'osce-simulator': {
    icon: Stethoscope,
    category: 'Study',
    color: 'from-teal-500 to-emerald-600',
    solidBg: '#0d9488',
    ring: 'ring-teal-200',
    samplePrompt: 'Set up an OSCE station: 57-year-old male with crushing chest pain radiating to the left arm — I want to practice by speaking my questions aloud',
  },
  'exam-planner': {
    icon: CalendarClock,
    category: 'Study',
    color: 'from-rose-500 to-pink-600',
    solidBg: '#e11d48',
    ring: 'ring-rose-200',
    samplePrompt: 'Plan a 12-week USMLE Step 1 study schedule starting Jan 1 — subjects: Cardiology (mastery 40), Respiratory (mastery 60), Renal (mastery 30)',
  },
  'guidelines-library': {
    icon: BookOpen,
    category: 'Study',
    color: 'from-amber-500 to-orange-600',
    solidBg: '#d97706',
    ring: 'ring-amber-200',
    samplePrompt: 'What do the latest ACC/AHA and ESC guidelines say about hypertension management? Focus on pharmacologic therapy.',
  },
  '3d-models': {
    icon: Box,
    category: '3D',
    color: 'from-violet-500 to-fuchsia-600',
    solidBg: '#8b5cf6',
    ring: 'ring-violet-200',
    samplePrompt: '(Opens the 3D Models tab — search Sketchfab for interactive anatomy models)',
  },
};

const CATEGORIES: Array<SkillMeta['category']> = ['Documents', 'Data', 'Images', 'Audio & Video', 'Web', 'Study', '3D'];

// ── 3D Models tab (lazy-loaded — uses client-only anatomy search) ──
const AnatomyDiscover = dynamic(() => import('@/components/medq/AnatomyDiscover'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-20 text-slate-500">
      <Loader2 className="size-6 animate-spin mr-2" /> Loading 3D model search…
    </div>
  ),
});

const SAMPLE_PROMPTS = [
  'Make me a PDF cheat sheet of the cranial nerves with mnemonics',
  'Generate a PowerPoint deck on the cardiac cycle (5 slides)',
  'Create a bar chart comparing the efficacy of common antihypertensives',
  'Generate a medical illustration of the nephron',
  'Search the web for the latest 2023 ACC/AHA heart failure guidelines and summarize',
  'Make me a Word document template for SOAP notes',
  'Build me an Excel sheet of common lab reference ranges by age',
  'Pronounce "onychocryptosis" and save it as an audio file',
  'Build me a cardiology study pack: guidelines library → cheat sheet PDF → hemodynamics chart → review slides',
  'Plan a 12-week USMLE Step 1 study schedule — Cardiology (mastery 40), Respiratory (60), Renal (30)',
  'Set up an OSCE station: 57-year-old male with crushing chest pain radiating to the left arm',
  'What do the ACC/AHA and ESC guidelines say about atrial fibrillation management?',
  'I uploaded a lecture audio — transcribe it and turn it into flashcards',
  'Practice an OSCE station with voice — I\'ll speak my questions, you respond out loud as the patient',
];

// ─── Component ─────────────────────────────────────────────────────

export default function AgentSkillsPage() {
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [search, setSearch] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const pollTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/medq-agent/skills')
      .then((r) => r.json())
      .then((data) => setSkills(data.skills || []))
      .catch((err) => console.error('Failed to load skills', err));
  }, []);

  // Force light mode on this page — the page was designed with light theme
  // (white cards, slate text, teal accents). Dark mode would invert the
  // shadcn semantic tokens (Card, Button, Input) and break contrast.
  // We restore the previous theme on unmount so navigation elsewhere
  // respects the user's preference.
  useEffect(() => {
    const html = document.documentElement;
    const wasDark = html.classList.contains('dark');
    if (wasDark) html.classList.remove('dark');
    return () => {
      if (wasDark) html.classList.add('dark');
    };
  }, []);

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ─── Job polling ────────────────────────────────────────────────

  // Bounded polling: retry up to MAX_POLL_RETRIES on transient errors (5xx /
  // network), with exponential backoff. 404 means the job is gone — stop.
  // After max retries, mark the assistant message as failed so the UI
  // doesn't hammer a dead server forever (this was the HTTP 502 console
  // error storm seen previously).
  const MAX_POLL_RETRIES = 6;
  const pollRetryCounts = useRef<Map<string, number>>(new Map());

  const pollJob = useCallback(async (jobId: string, msgId: string, since: number = 0) => {
    try {
      const resp = await fetch(`/api/medq-agent/job/${jobId}?since=${since}`);
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }
      const data = await resp.json();

      // Success — reset retry counter for this message.
      pollRetryCounts.current.delete(msgId);

      // Update the assistant message with new events.
      setMessages((prev) => prev.map((m) => {
        if (m.id !== msgId) return m;

        // Rebuild toolCalls + content + progressText from the events we've seen.
        // We pull from `allEvents` so we always have the complete picture.
        const allEvents = data.allEvents || [];
        const toolCalls: ToolCall[] = [];
        let content = '';
        let progressText = '';

        for (const evt of allEvents) {
          if (evt.type === 'text' && evt.text) {
            content += evt.text;
          } else if (evt.type === 'tool_call' && evt.name) {
            toolCalls.push({
              name: evt.name,
              args: evt.args || {},
              status: 'running',
              iteration: evt.iteration,
            });
          } else if (evt.type === 'tool_result' && evt.name) {
            // Find the matching running tool call and update it.
            for (let i = toolCalls.length - 1; i >= 0; i--) {
              if (toolCalls[i].name === evt.name && toolCalls[i].status === 'running') {
                toolCalls[i].result = evt.result;
                // Use the explicit `failed` flag when present (set by the
                // route handler based on CapabilityResult.ok). Fall back to
                // the old `!evt.result` heuristic for legacy callers.
                toolCalls[i].status = evt.failed
                  ? 'failed'
                  : evt.result
                  ? 'done'
                  : 'failed';
                break;
              }
            }
          } else if (evt.type === 'progress' && evt.text) {
            progressText = evt.text;
          }
        }

        return {
          ...m,
          content,
          toolCalls,
          progressText,
          status: data.status === 'completed' ? 'completed' : data.status === 'failed' ? 'failed' : 'running',
        };
      }));

      // If not done, schedule next poll.
      if (data.status === 'pending' || data.status === 'processing') {
        const nextSince = data.since || Date.now();
        const timer = setTimeout(() => pollJob(jobId, msgId, nextSince), 800);
        pollTimers.current.set(msgId, timer);
      } else {
        // Done — clear timer.
        const timer = pollTimers.current.get(msgId);
        if (timer) {
          clearTimeout(timer);
          pollTimers.current.delete(msgId);
        }
      }
    } catch (err) {
      const errStr = (err as Error).message || String(err);
      const is404 = /HTTP 404/.test(errStr);
      const retries = (pollRetryCounts.current.get(msgId) || 0) + 1;

      // 404 = job genuinely gone (server restart cleared the in-memory store,
      // or the job expired). Don't retry — mark as failed.
      if (is404) {
        console.warn('[pollJob] job not found (404), stopping:', jobId);
        pollRetryCounts.current.delete(msgId);
        pollTimers.current.delete(msgId);
        setMessages((prev) => prev.map((m) => {
          if (m.id !== msgId) return m;
          return {
            ...m,
            status: 'failed',
            content: '⚠️ This agent session was lost (server may have restarted). Please send your request again.',
            progressText: undefined,
          };
        }));
        return;
      }

      // Transient error (5xx, network). Exponential backoff: 2s, 4s, 8s, 16s, 32s, 64s.
      if (retries > MAX_POLL_RETRIES) {
        console.error('[pollJob] giving up after', retries, 'retries for job', jobId, err);
        pollRetryCounts.current.delete(msgId);
        pollTimers.current.delete(msgId);
        setMessages((prev) => prev.map((m) => {
          if (m.id !== msgId) return m;
          return {
            ...m,
            status: 'failed',
            content: `⚠️ Lost connection to the agent after ${retries - 1} retries. The server may be busy or restarting. Please try again in a moment.\n\nError: ${errStr}`,
            progressText: undefined,
          };
        }));
        return;
      }

      pollRetryCounts.current.set(msgId, retries);
      // Exponential backoff capped at 30s.
      const delay = Math.min(2000 * Math.pow(2, retries - 1), 30000);
      console.warn(`[pollJob] retry ${retries}/${MAX_POLL_RETRIES} in ${delay}ms for job ${jobId}: ${errStr}`);
      const timer = setTimeout(() => pollJob(jobId, msgId, since), delay);
      pollTimers.current.set(msgId, timer);
    }
  }, []);

  // ─── Send message (job-based) ───────────────────────────────────

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setInput('');
    const msgId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    const userMsg: ChatMessage = {
      id: `user_${msgId}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    const assistantMsg: ChatMessage = {
      id: `asst_${msgId}`,
      role: 'assistant',
      content: '',
      toolCalls: [],
      status: 'running',
      progressText: 'Starting…',
      timestamp: Date.now() + 1,
    };
    setMessages((m) => [...m, userMsg, assistantMsg]);

    try {
      const resp = await fetch('/api/medq-agent/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, mode: 'study' }),
      });
      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${errText}`);
      }
      const data = await resp.json();
      const jobId = data.jobId;

      // Attach jobId to the assistant message.
      setMessages((prev) => prev.map((m) => m.id === assistantMsg.id ? { ...m, jobId } : m));

      // Start polling.
      pollJob(jobId, assistantMsg.id, 0);
    } catch (err) {
      setMessages((prev) => prev.map((m) => {
        if (m.id !== assistantMsg.id) return m;
        return {
          ...m,
          status: 'failed',
          content: `⚠️ Failed to start agent job: ${(err as Error).message}`,
          progressText: undefined,
        };
      }));
    }
  }, [pollJob]);

  const handleStop = () => {
    // Note: the job continues running in the background; we just stop polling.
    // The user can refresh the page later and the result will still be there.
    for (const [, timer] of pollTimers.current) clearTimeout(timer);
    pollTimers.current.clear();
    pollRetryCounts.current.clear();
    setMessages((prev) => prev.map((m) =>
      m.status === 'running' ? { ...m, status: 'completed' as const, progressText: undefined } : m
    ));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const useSkillPrompt = (prompt: string) => {
    setInput(prompt);
    setActiveTab('chat');
  };

  // Special handling for skills that don't fit the chat-prompt model:
  // 3D Models opens its own dedicated tab (it's a search UI, not an LLM tool).
  const useSkill = (skillId: string) => {
    if (skillId === '3d-models') {
      setActiveTab('models');
      return;
    }
    const meta = SKILL_META[skillId as keyof typeof SKILL_META];
    if (meta?.samplePrompt) {
      useSkillPrompt(meta.samplePrompt);
    }
  };

  // Filter skills by search.
  const filteredSkills = skills.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  });

  const isRunning = messages.some((m) => m.status === 'running');

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70">
      {/* Decorative top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-sky-500 to-cyan-500" />

      <header className="border-b border-slate-200 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">MedQ Agent</h1>
              <p className="text-xs text-slate-600 font-medium">
                AI medical study buddy · {skills.length} skills · background-job mode (no timeouts)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 hidden sm:flex border-slate-300 text-slate-700 bg-white">
              <Wrench className="size-3" />
              {skills.length} skills
            </Badge>
            {isRunning && (
              <Badge className="gap-1.5 bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100">
                <Loader2 className="size-3 animate-spin" />
                running
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-slate-200/60 p-1">
            <TabsTrigger value="chat" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">
              <Sparkles className="size-3.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">
              <Wrench className="size-3.5" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="models" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">
              <Box className="size-3.5" />
              3D Models
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm">
              <Upload className="size-3.5" />
              Upload
            </TabsTrigger>
          </TabsList>

          {/* ─── CHAT TAB ─────────────────────────────────────── */}
          <TabsContent value="chat" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
              {/* Chat column */}
              <Card className="flex flex-col h-[calc(100vh-220px)] border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-teal-50/40 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2 text-slate-900">
                        <Sparkles className="size-4 text-teal-600" />
                        Conversation
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5 text-slate-600">
                        Runs in background · polls every 800ms · no timeout errors
                      </CardDescription>
                    </div>
                    {isRunning && (
                      <Button onClick={handleStop} variant="outline" size="sm" className="gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50">
                        <span className="size-2.5 bg-rose-500 rounded-sm" />
                        Stop polling
                      </Button>
                    )}
                  </div>
                </CardHeader>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
                  {messages.length === 0 && (
                    <div className="text-center py-10 space-y-5">
                      <div className="size-14 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                        <Sparkles className="size-7" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-base">Try one of these prompts</p>
                        <p className="text-sm text-slate-600 mt-1">Or write your own below</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                        {SAMPLE_PROMPTS.map((prompt) => (
                          <button
                            key={prompt}
                            className="text-xs text-left px-3 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 hover:shadow-sm transition-all text-slate-700 hover:text-slate-900"
                            onClick={() => sendMessage(prompt)}
                          >
                            <span className="block leading-relaxed">{prompt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                </div>

                {/* Input */}
                <div className="border-t border-slate-200 p-3 bg-white">
                  <div className="flex gap-2 items-end">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask the agent to make something... (e.g., 'Make me a PDF cheat sheet on ECG interpretation')"
                      className="min-h-[52px] max-h-[200px] resize-none border-slate-300 focus-visible:ring-teal-500/30 focus-visible:border-teal-500"
                      disabled={isRunning}
                    />
                    <Button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || isRunning}
                      size="icon"
                      className="bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-md shadow-teal-500/20"
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
                    Press <kbd className="px-1 py-0.5 rounded border border-slate-300 bg-slate-50 text-[10px] font-mono">Enter</kbd> to send,
                    <kbd className="ml-1 px-1 py-0.5 rounded border border-slate-300 bg-slate-50 text-[10px] font-mono">Shift+Enter</kbd> for newline · runs as background job
                  </p>
                </div>
              </Card>

              {/* Sidebar: quick skill prompts */}
              <aside className="space-y-3">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="py-3 border-b border-slate-100">
                    <CardTitle className="text-sm flex items-center gap-2 text-slate-800">
                      <Lightbulb className="size-4 text-amber-500" />
                      Quick prompts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5 pt-3">
                    {SAMPLE_PROMPTS.slice(0, 5).map((p) => (
                      <button
                        key={p}
                        onClick={() => useSkillPrompt(p)}
                        className="w-full text-left text-xs px-2.5 py-2 rounded-md border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50 text-slate-700 hover:text-slate-900 transition-colors leading-relaxed"
                      >
                        {p}
                      </button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 shadow-sm">
                  <CardContent className="p-3.5 text-xs text-teal-900 space-y-1.5">
                    <p className="font-semibold flex items-center gap-1.5 text-sm">
                      <Sparkles className="size-4 text-teal-600" />
                      Pro tip
                    </p>
                    <p className="leading-relaxed text-teal-800/90">
                      Chain skills: ask for a "cardiology study pack" and the agent will
                      web-search, generate a PDF cheat sheet, build a chart, and create review
                      slides — all in one job.
                    </p>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </TabsContent>

          {/* ─── SKILLS TAB ──────────────────────────────────── */}
          <TabsContent value="skills" className="mt-4">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input
                    placeholder="Search skills by name, description, or ID…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 border-slate-300 focus-visible:ring-teal-500/30 focus-visible:border-teal-500"
                  />
                </div>
                <Badge variant="outline" className="text-xs border-slate-300 text-slate-700 bg-white">
                  {filteredSkills.length} of {skills.length}
                </Badge>
              </div>

              {CATEGORIES.map((cat) => {
                const catSkills = filteredSkills.filter((s) => SKILL_META[s.id]?.category === cat);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat} className="space-y-2.5">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-teal-500" />
                      {cat}
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-slate-300 text-slate-600">{catSkills.length}</Badge>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {catSkills.map((skill) => (
                        <SkillCard key={skill.id} skill={skill} onUse={useSkill} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ─── 3D MODELS TAB ─────────────────────────────── */}
          <TabsContent value="models" className="mt-4">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-teal-50/30 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2 text-slate-900">
                      <Box className="size-4 text-teal-600" />
                      3D Anatomy Models
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5 text-slate-600">
                      Search Sketchfab for 3D models + reference images by topic — all inline, no app exit.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-1 border-slate-300 text-slate-700 bg-white hidden sm:flex">
                    <Box className="size-3" />
                    Sketchfab + ZAI
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/*
                  AnatomyDiscover uses its own dark theme (CSS custom properties
                  --medq-app-bg, etc.). Wrap it in a dark surface so it blends
                  with the rest of the agent-skills light theme.
                */}
                <div className="bg-[#0c0e14] text-white rounded-b-lg">
                  <AnatomyDiscover />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ─── UPLOAD TAB ──────────────────────────────────── */}
          <TabsContent value="upload" className="mt-4">
            <Card className="max-w-3xl mx-auto border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-teal-50/30">
                <CardTitle className="text-base flex items-center gap-2 text-slate-900">
                  <Upload className="size-4 text-teal-600" />
                  Upload a file to analyze
                </CardTitle>
                <CardDescription className="text-slate-600">
                  VLM, image-edit, and video-understand skills need a public image/video URL as input.
                  Use the dedicated playground to upload a file, then run a skill on it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <UploadSkillCard
                    icon={Eye}
                    title="VLM"
                    description="Analyze an image — describe, identify, extract text."
                    color="from-sky-500 to-cyan-600"
                  />
                  <UploadSkillCard
                    icon={ImagePlay}
                    title="Image Edit"
                    description="Transform an image via a text prompt."
                    color="from-violet-500 to-purple-600"
                  />
                  <UploadSkillCard
                    icon={Video}
                    title="Video Understanding"
                    description="Summarize or analyze a short video clip."
                    color="from-emerald-500 to-teal-600"
                  />
                </div>
                <Separator className="bg-slate-200" />
                <div className="text-center py-4">
                  {/* base-ui Button has no asChild/Slot — apply the button
                      variant classes directly on the anchor instead. */}
                  <a
                    href="/skills-playground"
                    className={buttonVariants({
                      size: 'lg',
                      className: 'gap-2 bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-md shadow-teal-500/20',
                    })}
                  >
                    <Upload className="size-4" />
                    Open Upload Playground
                    <ArrowLeft className="size-3 rotate-180" />
                  </a>
                  <p className="text-xs text-slate-600 mt-2">
                    Opens /skills-playground in the same tab — drag-drop upload, run skill, view result.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Message Bubble ────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const isRunning = message.status === 'running';
  const isFailed = message.status === 'failed';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-500/20 rounded-br-md'
              : isFailed
              ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-bl-md'
              : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-bl-md'
          }`}
        >
          {message.content ? (
            <div className={`whitespace-pre-wrap leading-relaxed prose prose-sm max-w-none ${
              isUser
                ? 'prose-invert prose-headings:text-white prose-strong:text-white prose-code:bg-white/20 prose-code:text-white prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-a:text-white prose-a:underline'
                : 'prose-slate prose-headings:font-semibold prose-headings:text-slate-900 prose-headings:mt-2 prose-headings:mb-1 prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-code:text-pink-700 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-teal-700 prose-a:underline'
            }`}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ) : isRunning ? (
            <div className={`flex items-center gap-2 text-xs italic ${isUser ? 'text-white/80' : 'text-slate-600'}`}>
              <Loader2 className="size-3.5 animate-spin" />
              {message.progressText || 'Working…'}
            </div>
          ) : message.toolCalls && message.toolCalls.length > 0 ? (
            <div className="text-xs text-slate-600 italic">Calling tools…</div>
          ) : null}
        </div>

        {/* Tool calls */}
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {message.toolCalls.map((tc, i) => (
              <ToolCallCard key={i} toolCall={tc} />
            ))}
          </div>
        )}

        {/* Job ID footer */}
        {message.jobId && !isUser && (
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-600 font-medium">
            <Clock className="size-3" />
            <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{message.jobId.slice(0, 24)}…</code>
            {isRunning && <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">· polling</span>}
            {message.status === 'completed' && <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">· done</span>}
            {isFailed && <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">· failed</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tool Call Card ────────────────────────────────────────────────

function ToolCallCard({ toolCall }: { toolCall: ToolCall }) {
  const skillId = toolCall.name.replace('skill_generate_', '').replace('skill_', '').replace('_', '-');
  const meta = SKILL_META[skillId];
  const Icon = meta?.icon || Wrench;
  // artifactCard emits actions with type 'external' (link/view/download actions).
  // The old code looked for type 'link' — that was a typo, never matched, so
  // download buttons never rendered in the UI.
  const downloadAction = toolCall.result?.actions?.find((a) => a.type === 'external' || a.type === 'link');
  // For image results, also surface a 'View image' action so we can render an inline preview.
  const viewAction = toolCall.result?.actions?.find((a) => a.type === 'external' && a.id === 'view');
  const isImageResult = viewAction && /\.(png|jpg|jpeg|webp|gif)$/i.test(viewAction.target);
  const [copied, setCopied] = useState(false);

  // Pull multimodalContent (3D models, tables, etc.) from the result.
  // The route sends the full array so we can render inline visual blocks.
  const multimodalContent = toolCall.result?.multimodalContent as any[] | undefined;
  const hasRichContent = multimodalContent && multimodalContent.length > 0;

  const copyArgs = async () => {
    await navigator.clipboard.writeText(JSON.stringify(toolCall.args, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`rounded-lg border bg-white p-2.5 text-xs shadow-sm ${meta?.ring ? `ring-1 ${meta.ring}` : 'border-slate-200'}`}>
      <div className="flex items-center gap-2">
        <div
          className={`size-5 rounded bg-gradient-to-br ${meta?.color || 'from-slate-500 to-slate-600'} flex items-center justify-center text-white shrink-0`}
        >
          <Icon className="size-3" />
        </div>
        <code className="font-mono text-[11px] font-semibold text-slate-800">{toolCall.name}</code>
        {toolCall.iteration !== undefined && (
          <Badge variant="outline" className="text-[9px] py-0 px-1 border-slate-300 text-slate-600">iter {toolCall.iteration + 1}</Badge>
        )}
        <Badge
          variant={toolCall.status === 'done' ? 'default' : toolCall.status === 'failed' ? 'destructive' : 'secondary'}
          className={`text-[10px] py-0 px-1.5 ml-auto font-medium ${
            toolCall.status === 'done'
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              : toolCall.status === 'failed'
              ? 'bg-rose-100 text-rose-800 border border-rose-200 hover:bg-rose-100'
              : 'bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          {toolCall.status === 'running' && <Loader2 className="size-2.5 mr-1 animate-spin" />}
          {toolCall.status}
        </Badge>
      </div>

      {/* Args (collapsible-style summary) */}
      {Object.keys(toolCall.args).length > 0 && (
        <div className="mt-1.5 flex items-start gap-1.5">
          <pre className="flex-1 text-[10px] text-slate-700 font-mono bg-slate-50 border border-slate-200 rounded p-1.5 overflow-auto max-h-32 leading-relaxed">
{JSON.stringify(toolCall.args, null, 2).slice(0, 500)}
{JSON.stringify(toolCall.args).length > 500 ? '\n…' : ''}
          </pre>
          <button
            onClick={copyArgs}
            className="text-slate-400 hover:text-teal-600 mt-1 p-1 rounded hover:bg-teal-50 transition-colors"
            title="Copy args"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          </button>
        </div>
      )}

      {/* Result */}
      {toolCall.result && (
        <>
          <Separator className="my-2 bg-slate-200" />
          <p className="text-slate-800 leading-relaxed">{toolCall.result.description}</p>
          {toolCall.result.artifact && (
            <div className="mt-1.5 space-y-0.5">
              {Object.entries(toolCall.result.artifact).slice(0, 5).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-slate-600 font-medium">{k}:</span>
                  <span className="font-mono text-[10px] text-slate-800">{String(v).slice(0, 60)}</span>
                </div>
              ))}
            </div>
          )}
          {/* Rich multimodal content (3D models, tables, charts, etc.) */}
          {hasRichContent && (
            <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 bg-[#0c0e14]">
              <MultimodalRenderer content={multimodalContent!} />
            </div>
          )}
          {/* Inline image preview for image-generation results */}
          {isImageResult && (
            <a href={viewAction.target} target="_blank" rel="noopener noreferrer" className="block mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={viewAction.target}
                alt={toolCall.result.description || 'Generated image'}
                className="rounded-md border border-slate-200 max-w-full max-h-64 object-contain bg-white"
              />
            </a>
          )}
          {downloadAction && (
            <a
              href={downloadAction.target}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-2 py-1 rounded transition-colors"
            >
              <Download className="size-3" />
              {downloadAction.label}
              <ExternalLink className="size-2.5" />
            </a>
          )}
        </>
      )}
    </div>
  );
}

// ─── Skill Card (Skills tab) ───────────────────────────────────────

function SkillCard({ skill, onUse }: { skill: SkillEntry; onUse: (skillId: string) => void }) {
  const meta = SKILL_META[skill.id];
  const Icon = meta?.icon || FileText;
  const prompt = meta?.samplePrompt || `Use the ${skill.name} skill`;
  const isUploadSkill = prompt.startsWith('(Use the Upload tab');
  const isModelsSkill = skill.id === '3d-models';

  return (
    <Card className={`p-3 hover:shadow-md transition-all flex flex-col border-slate-200 bg-white ${meta ? `hover:${meta.ring}` : ''}`}>
      <div className="flex items-start gap-2.5">
        <div className={`size-10 rounded-lg bg-gradient-to-br ${meta?.color || 'from-slate-500 to-slate-600'} flex items-center justify-center text-white shrink-0 shadow-sm`}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-tight text-slate-900">{skill.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{skill.id}</p>
        </div>
      </div>
      <p className="text-xs text-slate-700 mt-2 line-clamp-3 flex-1 leading-relaxed">
        {skill.description}
      </p>
      <div className="flex items-center gap-1 mt-2 flex-wrap">
        <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-slate-300 text-slate-700 bg-slate-50">{skill.outputKind}</Badge>
        {skill.extensions?.map((ext) => (
          <Badge key={ext} variant="outline" className="text-[10px] py-0 px-1.5 uppercase border-slate-300 text-slate-700 bg-slate-50">.{ext}</Badge>
        ))}
        {skill.estimatedRuntimeSeconds && (
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-slate-300 text-slate-700 bg-slate-50">
            <Clock className="size-2.5 mr-0.5" />
            ~{skill.estimatedRuntimeSeconds}s
          </Badge>
        )}
        {skill.requiresCredentials && (
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-amber-800 border-amber-300 bg-amber-50">
            key
          </Badge>
        )}
      </div>
      <Button
        size="sm"
        variant={isModelsSkill ? 'default' : 'outline'}
        className={`mt-2.5 w-full text-xs gap-1.5 ${isModelsSkill ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white hover:from-violet-600 hover:to-fuchsia-700' : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900'}`}
        disabled={isUploadSkill}
        onClick={() => onUse(skill.id)}
      >
        {isUploadSkill ? (
          <>
            <Upload className="size-3" />
            See Upload tab
          </>
        ) : isModelsSkill ? (
          <>
            <Box className="size-3" />
            Open 3D Models
          </>
        ) : (
          <>
            <Sparkles className="size-3" />
            Use this skill
          </>
        )}
      </Button>
    </Card>
  );
}

// ─── Upload Skill Card (Upload tab) ────────────────────────────────

function UploadSkillCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2.5">
        <div className={`size-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
          <Icon className="size-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
