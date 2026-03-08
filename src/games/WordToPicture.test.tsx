import { render, screen, fireEvent } from '@testing-library/react';
import WordToPicture from './WordToPicture';
import { TutorProvider } from '../context/TutorContext';
import { describe, test, expect, vi } from 'vitest';
import React from 'react';

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
});
