/**
 * BrowserAIService — singleton service that wraps @mlc-ai/web-llm
 * for in-browser LLM inference powered by WebGPU.
 *
 * All WebLLM imports are dynamic (inside methods) because the library
 * references WebGPU APIs that are unavailable during SSR.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ModelInfo {
  id: string;
  name: string;
  size: string;
  description: string;
}

export interface ModelStatus {
  loaded: boolean;
  loading: boolean;
  progress: number;
  modelId: string | null;
  error: string | null;
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  keyPointsCovered: string[];
  keyPointsMissed: string[];
}

/** Minimal shape of the MLCEngine we use (avoids importing the type at top-level). */
interface MLCEngineLike {
  chat: {
    completions: {
      create: (params: {
        messages: { role: string; content: string }[];
        max_tokens: number;
        temperature: number;
      }) => Promise<{
        choices: Array<{ message?: { content?: string } }>;
      }>;
    };
  };
  unload: () => Promise<void>;
}

// ---------------------------------------------------------------------------
// Available models (hardcoded list)
// ---------------------------------------------------------------------------

const AVAILABLE_MODELS: ModelInfo[] = [
  {
    id: "SmolLM2-135M-Instruct-q4f16_1-MLC",
    name: "SmolLM2 135M",
    size: "~100MB",
    description: "Ultra-lightweight, fast but limited quality",
  },
  {
    id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    name: "Llama 3.2 1B",
    size: "~600MB",
    description: "Good balance of speed and quality (recommended)",
  },
  {
    id: "Phi-3.5-mini-instruct-q4f16_1-MLC",
    name: "Phi 3.5 Mini",
    size: "~2GB",
    description: "Best quality, slower and larger",
  },
];

// ---------------------------------------------------------------------------
// localStorage key
// ---------------------------------------------------------------------------

const STORAGE_KEY = "medq-browser-ai-model";

// ---------------------------------------------------------------------------
// BrowserAIService
// ---------------------------------------------------------------------------

export class BrowserAIService {
  private engine: MLCEngineLike | null = null;
  private status: ModelStatus = {
    loaded: false,
    loading: false,
    progress: 0,
    modelId: null,
    error: null,
  };

  /** Event system — React components can subscribe to status changes. */
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------

  /**
   * Check whether the browser supports WebGPU (required by WebLLM).
   * Safe to call during SSR — returns `false` when `navigator` is absent.
   */
  isSupported(): boolean {
    if (typeof navigator === "undefined") return false;
    return "gpu" in navigator;
  }

  /**
   * Download and initialise a model. If no `modelId` is provided the last
   * selected model (from localStorage) or the recommended default is used.
   */
  async loadModel(modelId?: string): Promise<void> {
    // Guard — no WebGPU
    if (!this.isSupported()) {
      this.status = {
        loaded: false,
        loading: false,
        progress: 0,
        modelId: null,
        error: "WebGPU is not available in this browser",
      };
      this.notify();
      return;
    }

    // Already loaded the same model → no-op
    if (this.status.loaded && this.status.modelId === modelId) {
      return;
    }

    // If a different model is currently loaded, unload first
    if (this.engine) {
      await this.unloadModel();
    }

    // Resolve which model to load
    const selectedId =
      modelId ??
      (typeof localStorage !== "undefined"
        ? localStorage.getItem(STORAGE_KEY)
        : null) ??
      "Llama-3.2-1B-Instruct-q4f16_1-MLC"; // recommended default

    // Mark as loading
    this.status = {
      loaded: false,
      loading: true,
      progress: 0,
      modelId: selectedId,
      error: null,
    };
    this.notify();

    try {
      // Dynamic import — keeps WebGPU code out of SSR bundle
      const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

      this.engine = (await CreateMLCEngine(selectedId, {
        initProgressCallback: (report: { progress: number; text?: string }) => {
          this.status = {
            ...this.status,
            progress: Math.round(report.progress * 100),
          };
          this.notify();
        },
      })) as unknown as MLCEngineLike;

      // Persist choice
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, selectedId);
      }

      this.status = {
        loaded: true,
        loading: false,
        progress: 100,
        modelId: selectedId,
        error: null,
      };
      this.notify();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      this.engine = null;
      this.status = {
        loaded: false,
        loading: false,
        progress: 0,
        modelId: selectedId,
        error: `Failed to load model: ${message}`,
      };
      this.notify();
    }
  }

  /** Whether a model is currently loaded and ready for inference. */
  isModelLoaded(): boolean {
    return this.status.loaded && this.engine !== null;
  }

  /** Snapshot of the current model status. */
  getModelStatus(): ModelStatus {
    return { ...this.status };
  }

  /**
   * Generate text from the loaded model.
   * @throws Error if no model is loaded.
   */
  async generate(prompt: string, maxTokens?: number): Promise<string> {
    if (!this.engine || !this.status.loaded) {
      throw new Error("No model is loaded. Call loadModel() first.");
    }

    const reply = await this.engine.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens ?? 512,
      temperature: 0.7,
    });

    return reply.choices[0]?.message?.content ?? "";
  }

  /** Unload the current model and free GPU memory. */
  unloadModel(): void {
    if (this.engine) {
      // Fire-and-forget — `unload` is async but we don't want to block the
      // caller. Errors are silently swallowed because there is no meaningful
      // recovery a consumer can do.
      this.engine
        .unload()
        .catch(() => {})
        .finally(() => {
          this.engine = null;
          this.status = {
            loaded: false,
            loading: false,
            progress: 0,
            modelId: null,
            error: null,
          };
          this.notify();
        });
    } else {
      this.status = {
        loaded: false,
        loading: false,
        progress: 0,
        modelId: null,
        error: null,
      };
      this.notify();
    }
  }

  /** Return the hardcoded list of available models. */
  getAvailableModels(): ModelInfo[] {
    return AVAILABLE_MODELS;
  }

  // -----------------------------------------------------------------------
  // Domain-specific: short-answer evaluation
  // -----------------------------------------------------------------------

  /**
   * Evaluate a student's short answer against the expected answer.
   *
   * Constructs a prompt that asks the AI to produce structured JSON feedback,
   * then parses the response into an `EvaluationResult`.
   */
  async evaluateShortAnswer(
    question: string,
    expectedAnswer: string,
    studentAnswer: string,
  ): Promise<EvaluationResult> {
    // If no model is loaded, fall back to simple keyword matching
    if (!this.engine || !this.status.loaded) {
      return this.keywordFallback(question, expectedAnswer, studentAnswer);
    }

    const systemPrompt = `You are an expert educational assessment AI. Evaluate the student's answer against the expected answer. You must respond ONLY with valid JSON in this exact format, no other text:
{
  "score": <number 0-100>,
  "feedback": "<brief feedback for the student>",
  "keyPointsCovered": ["<point 1>", "<point 2>"],
  "keyPointsMissed": ["<point 1>", "<point 2>"]
}`;

    const userPrompt = `Question: ${question}

Expected Answer: ${expectedAnswer}

Student Answer: ${studentAnswer}

Evaluate the student's answer. Respond only with the JSON object.`;

    const reply = await this.engine.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 512,
      temperature: 0.3,
    });

    const raw = reply.choices[0]?.message?.content ?? "";

    // Attempt to extract JSON from the response — the model may wrap it in
    // markdown code fences or add surrounding text.
    return this.parseEvaluationResponse(raw);
  }

  // -----------------------------------------------------------------------
  // Internal helpers
  // -----------------------------------------------------------------------

  /**
   * Simple keyword-based fallback evaluation when no AI model is loaded.
   * Extracts key terms from the expected answer and checks coverage in the student answer.
   */
  private keywordFallback(
    question: string,
    expectedAnswer: string,
    studentAnswer: string,
  ): EvaluationResult {
    // Strip HTML tags
    const strip = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
    const cleanExpected = strip(expectedAnswer);
    const cleanStudent = strip(studentAnswer);

    // Common stop words to ignore
    const stopWords = new Set([
      'a','an','the','is','are','was','were','be','been','being',
      'have','has','had','do','does','did','will','would','could',
      'should','may','might','can','shall','to','of','in','for',
      'on','with','at','by','from','as','into','through','during',
      'before','after','above','below','between','out','off','over',
      'under','again','further','then','once','here','there','when',
      'where','why','how','all','each','every','both','few','more',
      'most','other','some','such','no','nor','not','only','own',
      'same','so','than','too','very','just','because','but','and',
      'or','if','while','about','up','that','this','these','those',
      'it','its','which','what','who','whom','their','they','them',
      'we','our','you','your','he','she','him','her','his','also',
    ]);

    // Tokenize — split into meaningful words
    const tokenize = (text: string): string[] =>
      text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/)
        .filter(w => w.length > 1 && !stopWords.has(w));

    const expectedTokens = tokenize(cleanExpected);
    const studentTokens = new Set(tokenize(cleanStudent));

    // Identify key points (significant words from expected answer)
    const keyPoints = expectedTokens.filter(t => t.length > 2);
    const keyPointsCovered: string[] = [];
    const keyPointsMissed: string[] = [];

    for (const point of keyPoints) {
      if (studentTokens.has(point)) {
        keyPointsCovered.push(point);
      } else {
        keyPointsMissed.push(point);
      }
    }

    // Calculate score
    const total = keyPoints.length || 1;
    const score = Math.round((keyPointsCovered.length / total) * 100);

    // Generate feedback
    let feedback: string;
    if (score >= 90) {
      feedback = 'Excellent answer! You covered all the key points.';
    } else if (score >= 70) {
      feedback = `Good answer! Consider including: ${keyPointsMissed.slice(0, 3).join(', ')}.`;
    } else if (score >= 50) {
      feedback = `Partial answer. Key points covered: ${keyPointsCovered.slice(0, 3).join(', ') || 'none'}. Missing: ${keyPointsMissed.slice(0, 4).join(', ')}.`;
    } else {
      feedback = `Your answer is incomplete. Key points expected: ${keyPoints.slice(0, 5).join(', ')}.`;
    }

    return { score, feedback, keyPointsCovered, keyPointsMissed };
  }

  /**
   * Best-effort JSON extraction from a potentially messy model response.
   * Handles: raw JSON, ```json ... ``` blocks, and text surrounding the JSON.
   */
  private parseEvaluationResponse(raw: string): EvaluationResult {
    const fallback: EvaluationResult = {
      score: 0,
      feedback: "Could not parse evaluation result.",
      keyPointsCovered: [],
      keyPointsMissed: [],
    };

    try {
      // Strip markdown code fences if present
      let cleaned = raw.trim();
      const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (fenceMatch) {
        cleaned = fenceMatch[1].trim();
      }

      // Try to find the outermost JSON object
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
      if (firstBrace === -1 || lastBrace === -1) return fallback;

      const jsonStr = cleaned.slice(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(jsonStr);

      return {
        score:
          typeof parsed.score === "number"
            ? Math.max(0, Math.min(100, parsed.score))
            : fallback.score,
        feedback:
          typeof parsed.feedback === "string"
            ? parsed.feedback
            : fallback.feedback,
        keyPointsCovered: Array.isArray(parsed.keyPointsCovered)
          ? parsed.keyPointsCovered.filter(
              (p: unknown) => typeof p === "string",
            )
          : [],
        keyPointsMissed: Array.isArray(parsed.keyPointsMissed)
          ? parsed.keyPointsMissed.filter(
              (p: unknown) => typeof p === "string",
            )
          : [],
      };
    } catch {
      return fallback;
    }
  }
}

// ---------------------------------------------------------------------------
// Singleton instance
// ---------------------------------------------------------------------------

export const browserAI = new BrowserAIService();
