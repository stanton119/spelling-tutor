import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MissingLetter from './MissingLetter';
import { TutorProvider } from '../context/TutorContext';
import { describe, test, expect, it } from 'vitest';
import { words } from '../data/words';

describe('MissingLetter Game', () => {
  test('renders an image and three letter options', () => {
    render(
      <TutorProvider>
        <MissingLetter />
      </TutorProvider>
    );
    
    // Check if an image is displayed
    const imageElement = screen.getByTestId('target-image');
    expect(imageElement).toBeDefined();

    // Check if 3 letter options are displayed
    const options = screen.getAllByRole('button');
    expect(options).toHaveLength(3);
  });

  it('does not repeat the same word back-to-back when multiple words are available', async () => {
    render(
      <TutorProvider>
        <MissingLetter />
      </TutorProvider>
    );
    
    // Get first image/word
    const firstImage = screen.getByTestId('target-image').textContent;
    
    // Find the word object that matches this emoji
    const wordObj = words.find(w => w.image === firstImage);
    expect(wordObj).toBeDefined();
    const word = wordObj!.word;
    
    // Find which letter is missing
    const wordDisplay = screen.getByTestId('target-image').parentElement?.nextElementSibling;
    const letterBoxes = wordDisplay?.querySelectorAll('.letter-box');
    let missingIndex = -1;
    letterBoxes?.forEach((box, i) => {
      if (box.textContent === '_') {
        missingIndex = i;
      }
    });
    
    expect(missingIndex).toBeGreaterThan(-1);
    const correctLetter = word[missingIndex];
    
    // Find the correct button
    const options = screen.getAllByRole('button');
    const correctButton = options.find(opt => opt.textContent === correctLetter);
    
    expect(correctButton).toBeDefined();
    fireEvent.click(correctButton!);
    
    // Wait for next round
    await waitFor(() => {
      const secondImage = screen.getByTestId('target-image').textContent;
      expect(secondImage).not.toBe(firstImage);
    }, { timeout: 3000 });
  });
});
