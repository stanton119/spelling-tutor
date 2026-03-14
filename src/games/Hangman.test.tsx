import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Hangman from './Hangman';
import { TutorProvider } from '../context/TutorContext';
import { describe, test, expect, it } from 'vitest';

describe('Hangman Game', () => {
  test('renders word slots and keyboard', () => {
    render(
      <TutorProvider>
        <Hangman />
      </TutorProvider>
    );
    
    // Check if word slots are displayed
    const wordSlots = screen.getByTestId('word-slots');
    expect(wordSlots).toBeDefined();

    // Check if keyboard is displayed (26 letters)
    const keys = screen.getAllByRole('button');
    expect(keys).toHaveLength(26);
  });

  it('does not repeat the same word back-to-back when multiple words are available', async () => {
    render(
      <TutorProvider>
        <Hangman />
      </TutorProvider>
    );
    
    // Get first target word (hidden in DOM)
    const firstWord = screen.getByTestId('target-word').textContent;
    expect(firstWord).not.toBe('');
    
    // Guess all letters of the first word
    const uniqueLetters = Array.from(new Set(firstWord!.split('')));
    for (const letter of uniqueLetters) {
      const key = screen.getByRole('button', { name: letter });
      fireEvent.click(key);
    }
    
    // Check if it's won
    await waitFor(() => {
      const overlay = screen.queryByText(/Banana-tastic!/i);
      expect(overlay).toBeInTheDocument();
    });
    
    // Wait for next round (3000ms timeout in component)
    await waitFor(() => {
      const secondWord = screen.getByTestId('target-word').textContent;
      expect(secondWord).not.toBe(firstWord);
    }, { timeout: 5000 });
  });
});
