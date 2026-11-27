import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  b64ToDataUrl, dataUrlExt, downloadName, formatElapsed,
  loadRecentPrompts, pushRecentPrompt, recentPromptLabel, saveRecentPrompts,
} from './media-studio'

describe('b64ToDataUrl', () => {
  it('sniffs JPEG magic bytes', () => {
    expect(b64ToDataUrl('/9j/4AAQSkZJRgABAQ')).toBe('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ')
  })
  it('sniffs PNG magic bytes', () => {
    expect(b64ToDataUrl('iVBORw0KGgoAAAANSU')).toBe('data:image/png;base64,iVBORw0KGgoAAAANSU')
  })
  it('falls back to JPEG for unknown formats', () => {
    expect(b64ToDataUrl('AAAA')).toBe('data:image/jpeg;base64,AAAA')
  })
})

describe('dataUrlExt', () => {
  it('maps mime types to extensions', () => {
    expect(dataUrlExt('data:image/png;base64,x')).toBe('png')
    expect(dataUrlExt('data:image/jpeg;base64,x')).toBe('jpg')
    expect(dataUrlExt('data:image/gif;base64,x')).toBe('gif')
    expect(dataUrlExt('data:image/webp;base64,x')).toBe('webp')
  })
})

describe('formatElapsed', () => {
  it('renders seconds under a minute', () => {
    expect(formatElapsed(0)).toBe('0s')
    expect(formatElapsed(25_678)).toBe('25s')
  })
  it('renders minutes with zero-padded seconds past a minute', () => {
    expect(formatElapsed(124_000)).toBe('2m 04s')
    expect(formatElapsed(60_000)).toBe('1m 00s')
  })
})

describe('downloadName', () => {
  it('builds a sanitized, timestamped filename', () => {
    const name = downloadName('cogview-4 plus/model!', 'jpg')
    expect(name).toMatch(/^studio-cogview-4-plus-model-\d{10}\.jpg$/)
  })
  it('handles empty model names', () => {
    expect(downloadName('///', 'png')).toMatch(/^studio-media-\d{10}\.png$/)
  })
})

describe('pushRecentPrompt', () => {
  it('prepends and de-duplicates', () => {
    expect(pushRecentPrompt(['b', 'a'], 'a')).toEqual(['a', 'b'])
  })
  it('caps the list at the maximum', () => {
    const list = pushRecentPrompt(['1', '2', '3', '4'], 'new', 4)
    expect(list).toEqual(['new', '1', '2', '3'])
  })
  it('ignores whitespace-only prompts', () => {
    expect(pushRecentPrompt(['a'], '   ')).toEqual(['a'])
  })
})

describe('recentPromptLabel', () => {
  it('takes the first line and squeezes whitespace', () => {
    expect(recentPromptLabel('a  stethoscope\nsecond line')).toBe('a stethoscope')
  })
  it('truncates long prompts with an ellipsis', () => {
    expect(recentPromptLabel('x'.repeat(50)).length).toBe(42)
    expect(recentPromptLabel('x'.repeat(50)).endsWith('…')).toBe(true)
  })
})

describe('recent prompt storage', () => {
  // The lib test config runs in a plain Node environment: install a minimal
  // in-memory localStorage stand-in so the storage paths are exercised for
  // real (the guards themselves must still tolerate its absence — see below).
  const store = new Map<string, string>()
  const localStorageStub: Storage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => { store.set(k, String(v)) },
    removeItem: (k: string) => { store.delete(k) },
    clear: () => { store.clear() },
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() { return store.size },
  }
  vi.stubGlobal('localStorage', localStorageStub)

  afterEach(() => {
    store.clear()
  })
  it('round-trips through localStorage', () => {
    saveRecentPrompts('k', ['a', 'b'])
    expect(loadRecentPrompts('k')).toEqual(['a', 'b'])
  })
  it('reads a missing key as empty', () => {
    expect(loadRecentPrompts('nope')).toEqual([])
  })
  it('drops corrupted JSON and non-string entries', () => {
    localStorageStub.setItem('bad', '{not json')
    expect(loadRecentPrompts('bad')).toEqual([])
    localStorageStub.setItem('mixed', JSON.stringify(['ok', 42, null, '  ']))
    expect(loadRecentPrompts('mixed')).toEqual(['ok'])
  })
})
