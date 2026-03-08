# Feedback Sounds Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add synthesized audio feedback for correct and incorrect answers across all games using the Web Audio API.

**Architecture:** A central `audio.ts` utility will manage a singleton `AudioContext` and provide `playCorrect()` and `playIncorrect()` functions. Game components will trigger these sounds when providing visual feedback.

**Tech Stack:** TypeScript, Web Audio API, React (Vite).

---

### Task 1: Create Audio Utility

**Files:**
- Create: `src/utils/audio.ts`

**Step 1: Write the implementation**

```typescript
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
};

export const playCorrect = () => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
};

export const playIncorrect = () => {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.3);
};
```

**Step 2: Commit**

```bash
git add src/utils/audio.ts
git commit -m "feat: add audio utility for synthesized feedback sounds"
```

---

### Task 2: Integrate into WordToPicture Game

**Files:**
- Modify: `src/games/WordToPicture.tsx`

**Step 1: Update implementation**

Import `playCorrect` and `playIncorrect` and call them in `handleOptionClick`.

```typescript
// ... existing imports
import { playCorrect, playIncorrect } from '../utils/audio';

// ... inside handleOptionClick
    const isCorrect = word.id === targetWord?.id;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
// ...
```

**Step 2: Commit**

```bash
git add src/games/WordToPicture.tsx
git commit -m "feat: add audio feedback to WordToPicture game"
```

---

### Task 3: Integrate into PictureToSpelling Game

**Files:**
- Modify: `src/games/PictureToSpelling.tsx`

**Step 1: Update implementation**

```typescript
// ... existing imports
import { playCorrect, playIncorrect } from '../utils/audio';

// ... inside handleOptionClick
    const isCorrect = word === targetWord?.word;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
// ...
```

**Step 2: Commit**

```bash
git add src/games/PictureToSpelling.tsx
git commit -m "feat: add audio feedback to PictureToSpelling game"
```

---

### Task 4: Integrate into MissingLetter Game

**Files:**
- Modify: `src/games/MissingLetter.tsx`

**Step 1: Update implementation**

```typescript
// ... existing imports
import { playCorrect, playIncorrect } from '../utils/audio';

// ... inside handleOptionClick
    const isCorrect = letter === targetWord?.word[missingIndex];
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
// ...
```

**Step 2: Commit**

```bash
git add src/games/MissingLetter.tsx
git commit -m "feat: add audio feedback to MissingLetter game"
```

---

### Task 5: Integrate into Hangman Game

**Files:**
- Modify: `src/games/Hangman.tsx`

**Step 1: Update implementation**

Add audio for both individual letter guesses (correct/incorrect) and the game win/loss states.

```typescript
// ... existing imports
import { playCorrect, playIncorrect } from '../utils/audio';

// ... inside handleKeyClick
    if (targetWord.word.includes(letter)) {
      playCorrect();
    } else {
      playIncorrect();
      const newWrong = wrongGuesses + 1;
// ...
```

**Step 2: Commit**

```bash
git add src/games/Hangman.tsx
git commit -m "feat: add audio feedback to Hangman game"
```
