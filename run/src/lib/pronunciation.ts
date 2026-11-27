/**
 * Pronunciation Utility — Medical term detection, TTS caching, and audio playback.
 *
 * Features:
 * - localStorage cache for TTS audio blobs (avoids repeated API calls)
 * - Medical term detection using the built-in dictionary
 * - Batch pre-generation of pronunciations
 * - Audio playback with speed control
 */

import { MEDICAL_DICTIONARY } from './medical-dictionary';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

export interface PronunciationCacheEntry {
  term: string;
  audioUrl: string;       // blob URL or server URL
  cachedAt: number;       // timestamp
  expiresAt: number;      // expiration timestamp
  phonetic?: string;      // phonetic spelling
}

export interface PronunciationResult {
  term: string;
  audioUrl?: string;
  phonetic?: string;
  error?: string;
}

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const CACHE_KEY = 'medq-pronunciation-cache';
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_CACHE_ENTRIES = 500;

// Common medical term suffixes for detection
const MEDICAL_SUFFIXES = [
  'itis', 'osis', 'oma', 'pathy', 'emia', 'algia', 'penia',
  'plegia', 'ectomy', 'ostomy', 'otomy', 'scopy', 'graphy',
  'logy', 'gram', 'meter', 'scopy', 'plasty', 'rrhaphy',
  'rrhea', 'rrhage', 'rrhagia', 'stasis', 'stenosis', 'trophy',
  'trophy', 'penia', 'phobia', 'phil', 'phobia', 'genesis',
  'lysis', 'lytic', 'cyte', 'blast', 'clast', 'blast',
];

// Common medical prefixes for detection
const MEDICAL_PREFIXES = [
  'hypo', 'hyper', 'endo', 'exo', 'intra', 'inter', 'sub',
  'supra', 'peri', 'para', 'meta', 'dys', 'tachy', 'brady',
  'poly', 'oligo', 'macro', 'micro', 'mega', 'anti', 'pro',
  'neo', 'pre', 'post', 'retro', 'antero', 'latero',
];

/* ═══════════════════════════════════════════════════════════════
   CACHE MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */

/**
 * Load the pronunciation cache from localStorage.
 */
export function loadPronunciationCache(): Map<string, PronunciationCacheEntry> {
  if (typeof window === 'undefined') return new Map();
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return new Map();
    const parsed = JSON.parse(raw) as PronunciationCacheEntry[];
    const now = Date.now();
    const map = new Map<string, PronunciationCacheEntry>();
    for (const entry of parsed) {
      // Skip expired entries while loading
      if (entry.expiresAt > now) {
        map.set(entry.term.toLowerCase(), entry);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

/**
 * Save the pronunciation cache to localStorage.
 */
export function savePronunciationCache(cache: Map<string, PronunciationCacheEntry>): void {
  if (typeof window === 'undefined') return;
  try {
    // Enforce max entries — remove oldest first
    const entries = Array.from(cache.values());
    if (entries.length > MAX_CACHE_ENTRIES) {
      entries.sort((a, b) => a.cachedAt - b.cachedAt);
      const toRemove = entries.slice(0, entries.length - MAX_CACHE_ENTRIES);
      for (const entry of toRemove) {
        cache.delete(entry.term.toLowerCase());
      }
    }
    const serializable = Array.from(cache.values());
    localStorage.setItem(CACHE_KEY, JSON.stringify(serializable));
  } catch {
    // localStorage might be full — clear old entries
    try {
      const entries = Array.from(cache.values())
        .sort((a, b) => b.cachedAt - a.cachedAt)
        .slice(0, MAX_CACHE_ENTRIES / 2);
      localStorage.setItem(CACHE_KEY, JSON.stringify(entries));
    } catch {
      // Give up silently
    }
  }
}

/**
 * Get a cached pronunciation entry.
 */
export function getCachedPronunciation(term: string): PronunciationCacheEntry | null {
  const cache = loadPronunciationCache();
  const entry = cache.get(term.toLowerCase());
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) {
    // Expired — remove it
    cache.delete(term.toLowerCase());
    savePronunciationCache(cache);
    return null;
  }
  return entry;
}

/**
 * Add a pronunciation entry to the cache.
 */
export function setCachedPronunciation(entry: PronunciationCacheEntry): void {
  const cache = loadPronunciationCache();
  cache.set(entry.term.toLowerCase(), entry);
  savePronunciationCache(cache);
}

/**
 * Clear the entire pronunciation cache.
 */
export function clearPronunciationCache(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // silent
  }
}

/* ═══════════════════════════════════════════════════════════════
   MEDICAL TERM DETECTION
   ═══════════════════════════════════════════════════════════════ */

/**
 * Check if a word looks like a medical term based on suffixes, prefixes,
 * or presence in the dictionary.
 */
export function isMedicalTerm(word: string): boolean {
  const lower = word.toLowerCase().trim();

  // Check exact dictionary match
  if (MEDICAL_DICTIONARY[lower]) return true;

  // Check multi-word dictionary terms
  for (const key of Object.keys(MEDICAL_DICTIONARY)) {
    if (key.includes(' ') && lower.includes(key)) return true;
  }

  // Check medical suffixes (word must be long enough to be meaningful)
  if (lower.length >= 5) {
    for (const suffix of MEDICAL_SUFFIXES) {
      if (lower.endsWith(suffix)) return true;
    }
  }

  // Check medical prefixes (word must be long enough)
  if (lower.length >= 7) {
    for (const prefix of MEDICAL_PREFIXES) {
      if (lower.startsWith(prefix)) return true;
    }
  }

  // Check for common medical word patterns
  const medicalPatterns = [
    /^[A-Z][a-z]+[A-Z]/,           // CamelCase (e.g., MyocardialInfarction)
    /^\w+(itis|osis|oma|emia|pathy)$/i,  // Classic medical endings
  ];
  for (const pattern of medicalPatterns) {
    if (pattern.test(word)) return true;
  }

  return false;
}

/**
 * Extract medical terms from a text string.
 * Returns an array of { term, startIndex, endIndex }.
 */
export interface DetectedTerm {
  term: string;
  startIndex: number;
  endIndex: number;
  isDictionaryTerm: boolean;
}

export function detectMedicalTerms(text: string): DetectedTerm[] {
  const results: DetectedTerm[] = [];
  const seen = new Set<string>();

  // First, check multi-word dictionary terms (longer matches first)
  const multiWordTerms = Object.keys(MEDICAL_DICTIONARY)
    .filter(k => k.includes(' '))
    .sort((a, b) => b.length - a.length); // longest first for greedy matching

  const textLower = text.toLowerCase();
  const usedRanges: Array<[number, number]> = [];

  for (const dictTerm of multiWordTerms) {
    let searchFrom = 0;
    while (searchFrom < textLower.length) {
      const idx = textLower.indexOf(dictTerm, searchFrom);
      if (idx === -1) break;

      const endIdx = idx + dictTerm.length;
      // Check if this range overlaps with an already-detected term
      const overlaps = usedRanges.some(
        ([s, e]) => (idx >= s && idx < e) || (endIdx > s && endIdx <= e)
      );
      if (!overlaps) {
        results.push({
          term: text.slice(idx, endIdx),
          startIndex: idx,
          endIndex: endIdx,
          isDictionaryTerm: true,
        });
        usedRanges.push([idx, endIdx]);
      }
      searchFrom = endIdx;
    }
  }

  // Then check single words
  const wordRegex = /\b[A-Za-z][a-zA-Z]*(?:'[a-z]+)?\b/g;
  let match: RegExpExecArray | null;
  while ((match = wordRegex.exec(text)) !== null) {
    const word = match[0];
    const startIdx = match.index;
    const endIdx = startIdx + word.length;

    // Skip if already covered by a multi-word match
    const covered = usedRanges.some(
      ([s, e]) => startIdx >= s && endIdx <= e
    );
    if (covered) continue;

    const key = word.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    const isInDictionary = key in MEDICAL_DICTIONARY;
    const looksMedical = isMedicalTerm(word);

    if (isInDictionary || looksMedical) {
      results.push({
        term: word,
        startIndex: startIdx,
        endIndex: endIdx,
        isDictionaryTerm: isInDictionary,
      });
      usedRanges.push([startIdx, endIdx]);
    }
  }

  // Sort by position in text
  results.sort((a, b) => a.startIndex - b.startIndex);
  return results;
}

/* ═══════════════════════════════════════════════════════════════
   TTS API CALLS
   ═══════════════════════════════════════════════════════════════ */

/**
 * Fetch TTS audio for a single term. Returns a blob URL for the audio.
 */
export async function fetchPronunciationAudio(
  term: string,
  speed: number = 0.8
): Promise<string> {
  // Check cache first
  const cached = getCachedPronunciation(term);
  if (cached?.audioUrl) {
    // Verify the blob URL is still valid
    try {
      const response = await fetch(cached.audioUrl, { method: 'HEAD' });
      if (response.ok) return cached.audioUrl;
    } catch {
      // Blob URL expired, need to re-fetch
    }
  }

  // Call the TTS API
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: term,
      voice: 'tongtong',
      speed,
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS API failed: ${response.status}`);
  }

  const data = await response.json();
  const audioUrl: string = data.audioUrl;

  // Cache the result
  setCachedPronunciation({
    term: term.toLowerCase(),
    audioUrl,
    cachedAt: Date.now(),
    expiresAt: Date.now() + CACHE_DURATION_MS,
  });

  return audioUrl;
}

/**
 * Batch pre-generate pronunciations for an array of terms.
 * Calls POST /api/tts/pronunciations and caches all results.
 */
export async function batchPregeneratePronunciations(
  terms: string[],
  speed: number = 0.8
): Promise<PronunciationResult[]> {
  if (terms.length === 0) return [];

  // Filter out already-cached terms
  const uncachedTerms = terms.filter(t => !getCachedPronunciation(t));

  if (uncachedTerms.length === 0) {
    // All terms are cached — return cached results
    return terms.map(term => {
      const cached = getCachedPronunciation(term);
      return {
        term,
        audioUrl: cached?.audioUrl,
        phonetic: cached?.phonetic,
      };
    });
  }

  try {
    const response = await fetch('/api/tts/pronunciations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terms: uncachedTerms, speed }),
    });

    if (!response.ok) {
      throw new Error(`Batch TTS API failed: ${response.status}`);
    }

    const data = await response.json();
    const results: PronunciationResult[] = data.results || [];

    // Cache all successful results
    for (const result of results) {
      if (result.audioUrl) {
        setCachedPronunciation({
          term: result.term.toLowerCase(),
          audioUrl: result.audioUrl,
          cachedAt: Date.now(),
          expiresAt: Date.now() + CACHE_DURATION_MS,
          phonetic: result.phonetic,
        });
      }
    }

    // Merge with cached results
    return terms.map(term => {
      const fromBatch = results.find(
        r => r.term.toLowerCase() === term.toLowerCase()
      );
      if (fromBatch) return fromBatch;
      const cached = getCachedPronunciation(term);
      return {
        term,
        audioUrl: cached?.audioUrl,
        phonetic: cached?.phonetic,
      };
    });
  } catch (error) {
    console.error('Batch pronunciation pre-generation failed:', error);
    // Return cached results for whatever we have
    return terms.map(term => {
      const cached = getCachedPronunciation(term);
      return {
        term,
        audioUrl: cached?.audioUrl,
        phonetic: cached?.phonetic,
        error: 'Batch generation failed',
      };
    });
  }
}

/* ═══════════════════════════════════════════════════════════════
   AUDIO PLAYBACK
   ═══════════════════════════════════════════════════════════════ */

let currentAudio: HTMLAudioElement | null = null;
let currentPlaybackCallback: ((playing: boolean) => void) | null = null;

/**
 * Play pronunciation audio for a term.
 * Handles fetching, caching, and playback.
 */
export async function playPronunciation(
  term: string,
  speed: number = 0.8,
  onPlaybackStateChange?: (playing: boolean) => void
): Promise<void> {
  // Stop any currently playing audio
  stopPronunciation();

  if (onPlaybackStateChange) {
    currentPlaybackCallback = onPlaybackStateChange;
    onPlaybackStateChange(true);
  }

  try {
    const audioUrl = await fetchPronunciationAudio(term, speed);
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onended = () => {
      currentAudio = null;
      currentPlaybackCallback?.(false);
      currentPlaybackCallback = null;
    };

    audio.onerror = () => {
      currentAudio = null;
      currentPlaybackCallback?.(false);
      currentPlaybackCallback = null;
    };

    await audio.play();
  } catch (error) {
    console.error('Failed to play pronunciation:', error);
    currentAudio = null;
    currentPlaybackCallback?.(false);
    currentPlaybackCallback = null;
  }
}

/**
 * Stop the currently playing pronunciation audio.
 */
export function stopPronunciation(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentPlaybackCallback) {
    currentPlaybackCallback(false);
    currentPlaybackCallback = null;
  }
}

/**
 * Check if audio is currently playing.
 */
export function isPronunciationPlaying(): boolean {
  return currentAudio !== null && !currentAudio.paused;
}
