import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PictureToSpelling from './PictureToSpelling';
import { TutorProvider } from '../context/TutorContext';
import { describe, test, expect, it } from 'vitest';
import { words } from '../data/words';

describe('PictureToSpelling Game', () => {
  test('renders an image and three spelling options', () => {
    render(
      <TutorProvider>
        <PictureToSpelling />
      </TutorProvider>
    );
    
    // Check if an image is displayed
    const imageElement = screen.getByTestId('target-image');
    expect(imageElement).toBeDefined();
    expect(imageElement.textContent).not.toBe('');

    // Check if 3 spelling options are displayed
    const options = screen.getAllByRole('button');
    expect(options).toHaveLength(3);
  });

  it('does not repeat the same word back-to-back when multiple words are available', async () => {
    render(
      <TutorProvider>
        <PictureToSpelling />
      </TutorProvider>
    );
    
    // Get first image/word
    const firstImage = screen.getByTestId('target-image').textContent;
    
    // Find the word object that matches this emoji
    const wordObj = words.find(w => w.image === firstImage);
    expect(wordObj).toBeDefined();
    const correctWord = wordObj!.word;
    
    // Find the correct spelling option and click it
    const correctButton = screen.getByRole('button', { name: correctWord });
    fireEvent.click(correctButton);
    
    // Wait for next round (1500ms timeout in component)
    await waitFor(() => {
      const secondImage = screen.getByTestId('target-image').textContent;
      expect(secondImage).not.toBe(firstImage);
    }, { timeout: 3000 });
  });
});
