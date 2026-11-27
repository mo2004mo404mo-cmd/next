export const TAB_SUGGESTIONS: Record<string, string[]> = {
  dashboard: ['What should I study today?', 'Show my progress', 'Start a daily challenge', 'Review weak areas'],
  bank: ['Quiz me on cardiology', 'Search for diabetes questions', 'Show me easy questions', 'Filter by anatomy'],
  flashcards: ['Start flashcard review', 'Create new flashcards', 'Study pharmacology cards', 'Shuffle my deck'],
  generate: ['Generate cardiology questions', 'Make 10 hard pharmacology MCQs', 'Generate anatomy questions', 'Create a mixed-topic quiz'],
  tutor: ['Explain heart failure pathophysiology', 'Teach me about antibiotic classes', 'Help me understand ECG rhythms', 'Quiz me on neuroanatomy'],
  'drug-interactions': ['Check Aspirin interactions', 'Look up Metformin', 'Compare ACE inhibitors', 'Drug interaction with Warfarin'],
  'speed-quiz': ['Start speed quiz on surgery', 'Quick 5-question quiz', 'Begin timed challenge', 'Quiz me on pediatrics'],
  insights: ['Show my weak areas', 'How am I doing this week?', 'What topics should I review?', 'Compare my performance'],
  review: ['Start spaced repetition', 'Review missed questions', 'Show flagged items', 'Begin review session'],
  'lab-values': ['Show complete blood count ranges', 'Look up liver function tests', 'Renal panel normal values', 'ABG interpretation guide'],
  exams: ['Create a mock exam', 'Start timed practice test', 'Show exam results', 'Board-style questions'],
  'medical-dictionary': ['Define arrhythmia', 'What is polymyositis?', 'Explain kyphosis', 'Look up Stevens-Johnson syndrome'],
  default: ['Generate questions', 'Start a quiz', 'Look up a drug', 'Open flashcards', 'Check my progress'],
};

export const SKILL_CATALOG = [
  { id: 'pdf', name: 'PDF cheat sheet', category: 'Documents', prompt: 'Make me a PDF cheat sheet about ' },
  { id: 'pptx', name: 'Presentation', category: 'Documents', prompt: 'Create a 5-slide presentation about ' },
  { id: 'docx', name: 'Word document', category: 'Documents', prompt: 'Make a Word document about ' },
  { id: 'xlsx', name: 'Spreadsheet', category: 'Data', prompt: 'Build an Excel spreadsheet for ' },
  { id: 'charts', name: 'Chart', category: 'Data', prompt: 'Create a chart comparing ' },
  { id: 'image-generation', name: 'Medical illustration', category: 'Images', prompt: 'Generate a medical illustration of ' },
  { id: 'image-search', name: 'Image search', category: 'Images', prompt: 'Find real medical images of ' },
  { id: 'vlm', name: 'Image analysis', category: 'Images', prompt: 'Analyze the uploaded image and explain ' },
  { id: 'tts', name: 'Text to speech', category: 'Audio', prompt: 'Read this aloud and save an audio file: ' },
  { id: 'web-search', name: 'Web search', category: 'Web', prompt: 'Search the web for ' },
  { id: 'lecture-summarizer', name: 'Lecture summarizer', category: 'Study', prompt: 'Summarize my uploaded lecture and create flashcards about ' },
  { id: 'osce-simulator', name: 'OSCE simulator', category: 'Study', prompt: 'Set up an OSCE station about ' },
  { id: 'exam-planner', name: 'Exam planner', category: 'Study', prompt: 'Plan my study schedule for ' },
  { id: 'guidelines-library', name: 'Guidelines library', category: 'Study', prompt: 'Compare the latest guidelines for ' },
];

export const ANIMATION_STYLES = `
@keyframes agentOrbPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(0,229,160,0.3); } 50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(0,229,160,0.5); } }
@keyframes agentOrbListening { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(0,229,160,0.4); } 25% { transform: scale(1.15); box-shadow: 0 0 50px rgba(0,229,160,0.7); } 50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(0,229,160,0.5); } 75% { transform: scale(1.2); box-shadow: 0 0 60px rgba(0,229,160,0.8); } }
@keyframes agentOrbSpeaking { 0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(139,92,246,0.4); } 33% { transform: scale(1.1); box-shadow: 0 0 40px rgba(139,92,246,0.6); } 66% { transform: scale(1.02); box-shadow: 0 0 25px rgba(139,92,246,0.3); } }
@keyframes agentSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes agentExpandIn { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes agentThinkingDot { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1.2); } }
@keyframes agentCardIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
@keyframes agentPlanStep { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
@keyframes agentRowIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes agentCaretBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
@keyframes agentBorderFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes agentPulseGlow { 0% { box-shadow: 0 2px 10px rgba(0,229,160,0.25), 0 0 0 0 rgba(0,229,160,0.35); } 70% { box-shadow: 0 2px 10px rgba(0,229,160,0.25), 0 0 0 7px rgba(0,229,160,0); } 100% { box-shadow: 0 2px 10px rgba(0,229,160,0.25), 0 0 0 0 rgba(0,229,160,0); } }
@keyframes agentSheen { from { transform: translateX(-100%); } to { transform: translateX(200%); } }
@keyframes agentPulseGlowRed { 0% { box-shadow: 0 0 0 0 rgba(255,87,87,0.45); } 70% { box-shadow: 0 0 0 8px rgba(255,87,87,0); } 100% { box-shadow: 0 0 0 0 rgba(255,87,87,0); } }
`;
