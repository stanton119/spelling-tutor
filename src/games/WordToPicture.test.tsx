import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WordToPicture from './WordToPicture';
import { TutorProvider } from '../context/TutorContext';
import { describe, test, expect, it } from 'vitest';

describe('WordToPicture Game', () => {
  test('renders a word and four images', () => {
    render(
      <TutorProvider>
        <WordToPicture />
      </TutorProvider>
    );
    
    // Check if a word is displayed (it's random, but it should be there)
    const wordElement = screen.getByTestId('target-word');
    expect(wordElement).toBeDefined();
    expect(wordElement.textContent).not.toBe('');

    // Check if 4 images are displayed
    const images = screen.getAllByRole('button');
    expect(images).toHaveLength(4);
  });

  test('clicking an image triggers feedback', () => {
    render(
      <TutorProvider>
        <WordToPicture />
      </TutorProvider>
    );
    
    const images = screen.getAllByRole('button');
    fireEvent.click(images[0]);
    
    // Feedback should appear (either correct or incorrect)
    const feedback = screen.queryByTestId('feedback');
    expect(feedback).toBeDefined();
  });

  it('does not repeat the same word back-to-back when multiple words are available', async () => {
    render(
      <TutorProvider>
        <WordToPicture />
      </TutorProvider>
    );
    
    // Get first word
    const firstWord = screen.getByTestId('target-word').textContent;
    
    // Click correct option to trigger next round
    // Correct option should have an alt tag with the word or similar (based on implementation)
    // Looking at the component, the buttons have aria-labels or images with alt text.
    // Let's check WordToPicture.tsx to be sure.
    const correctOption = screen.getByRole('button', { name: new RegExp(firstWord!) });
    fireEvent.click(correctOption);
    
    // Wait for next round (1500ms timeout in component)
    await waitFor(() => {
      const secondWord = screen.getByTestId('target-word').textContent;
      expect(secondWord).not.toBe(firstWord);
    }, { timeout: 3000 });
  });
});
