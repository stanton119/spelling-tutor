import { describe, test, expect } from 'vitest';
import { getWordsForLevel } from './wordSelector';

describe('wordSelector', () => {
  test('returns only level 1 words', () => {
    const words = getWordsForLevel(1);
    expect(words.length).toBeGreaterThan(0);
    expect(words.every(w => w.level === 1)).toBe(true);
  });

  test('returns words for level 5', () => {
    const words = getWordsForLevel(5);
    expect(words.length).toBeGreaterThan(0);
    expect(words.every(w => w.level === 5)).toBe(true);
  });
});
