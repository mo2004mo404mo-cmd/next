import { describe, expect, it } from 'vitest';
import { extractSpeechRecognitionText } from '../src/components/medq/exam-sim/shared';

describe('extractSpeechRecognitionText', () => {
  it('keeps final speech separate from the current interim result', () => {
    const results = [
      { 0: { transcript: 'What brings you in today?' }, isFinal: true },
      { 0: { transcript: 'I have a pain' }, isFinal: false },
    ];

    expect(extractSpeechRecognitionText(0, results)).toEqual({
      finalText: 'What brings you in today?',
      interimText: 'I have a pain',
    });
  });

  it('ignores unchanged results before the result index', () => {
    const results = [
      { 0: { transcript: 'Already handled' }, isFinal: true },
      { 0: { transcript: 'New question' }, isFinal: true },
    ];

    expect(extractSpeechRecognitionText(1, results)).toEqual({
      finalText: 'New question',
      interimText: '',
    });
  });
});
