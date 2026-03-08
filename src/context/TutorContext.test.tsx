import { renderHook } from '@testing-library/react';
import { useTutorStats, TutorProvider } from './TutorContext';
import { describe, test, expect } from 'vitest';
import React from 'react';

describe('TutorProvider', () => {
  test('initializes with default levels', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TutorProvider>{children}</TutorProvider>
    );
    const { result } = renderHook(() => useTutorStats(), { wrapper });
    expect(result.current.stats.games.hangman.level).toBe(1);
  });
});
