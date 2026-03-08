# Design: Feedback Sounds (Web Audio API)

## 1. Overview
Add immediate audio feedback for correct and incorrect answers in all games using synthesized tones via the Web Audio API. This avoids external assets and ensures instant, reliable playback.

## 2. Architecture
- **`src/utils/audio.ts`**: A centralized utility for generating sounds.
  - `playCorrect()`: High-pitched "success" tone (sine wave, frequency slide).
  - `playIncorrect()`: Low-pitched "error" tone (square/triangle wave, rapid decay).
- **Game Components**: Import and call audio functions during state updates for `feedback`.

## 3. Components & Data Flow
- **Games affected**: `Hangman`, `MissingLetter`, `PictureToSpelling`, `WordToPicture`.
- **Trigger**: The same logic that sets `feedback` to `'correct'` or `'incorrect'` will trigger the corresponding sound.

## 4. Implementation Details
- Use a singleton `AudioContext` to manage audio state.
- Handle browser autoplay restrictions by resuming the context on the first user interaction (first answer click).

## 5. Testing
- Manual verification in-browser for sound quality and responsiveness.
- Unit tests for the utility functions (mocking `AudioContext` if possible).
