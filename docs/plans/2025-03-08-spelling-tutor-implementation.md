# Spelling Tutor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a vibrant, adaptive jungle-themed spelling tutor web app with 4 games and persistent local progress.

**Architecture:** React SPA with a centralized `TutorProvider` context for state and progress. Games are modular components that consume and update this state based on performance.

**Tech Stack:** React (Vite), TypeScript, Vanilla CSS, Vitest (for testing).

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`

**Step 1: Scaffold Vite project**
Run: `npm create vite@latest . -- --template react-ts`
Expected: Project structure created.

**Step 2: Install dependencies**
Run: `npm install && npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
Expected: Dependencies installed successfully.

**Step 3: Setup Vitest config**
Modify: `vite.config.ts` to include `test: { environment: 'jsdom' }`.

**Step 4: Verify initial build**
Run: `npm run build`
Expected: Build passes.

**Step 5: Commit**
Run: `git add . && git commit -m "chore: initial project scaffold with Vite and React"`

---

### Task 2: Core State & Progress Logic (TutorProvider)

**Files:**
- Create: `src/context/TutorContext.tsx`
- Test: `src/context/TutorContext.test.tsx`

**Step 1: Write failing test for state initialization**
```typescript
import { renderHook } from '@testing-library/react';
import { useTutorStats, TutorProvider } from './TutorContext';

test('initializes with default levels', () => {
  const { result } = renderHook(() => useTutorStats(), { wrapper: TutorProvider });
  expect(result.current.stats.games.hangman.level).toBe(1);
});
```

**Step 2: Run test to verify it fails**
Run: `npx vitest src/context/TutorContext.test.tsx`
Expected: FAIL (Module not found).

**Step 3: Implement TutorProvider with localStorage**
Implement the context and hook with the schema defined in the design doc.

**Step 4: Run test to verify it passes**
Run: `npx vitest src/context/TutorContext.test.tsx`
Expected: PASS.

**Step 5: Commit**
Run: `git add src/context/ && git commit -m "feat: add TutorProvider for persistent game stats"`

---

### Task 3: Word Dataset & Filtering Logic

**Files:**
- Create: `src/data/words.ts`
- Create: `src/utils/wordSelector.ts`
- Test: `src/utils/wordSelector.test.ts`

**Step 1: Define initial word set**
Add at least 10 words per level (1-5) with metadata (word, image placeholder, level).

**Step 2: Write failing test for word filtering**
```typescript
import { getWordsForLevel } from './wordSelector';
test('returns only level 1 words', () => {
  const words = getWordsForLevel(1);
  expect(words.every(w => w.level === 1)).toBe(true);
});
```

**Step 3: Implement getWordsForLevel**
Filter the word list based on the level parameter.

**Step 4: Run test to verify it passes**
Run: `npx vitest src/utils/wordSelector.test.ts`
Expected: PASS.

**Step 5: Commit**
Run: `git add src/data/ src/utils/ && git commit -m "feat: add word dataset and level-based filtering"`

---

### Task 4: Game 1 - Word to Picture

**Files:**
- Create: `src/games/WordToPicture.tsx`
- Create: `src/games/WordToPicture.css`
- Test: `src/games/WordToPicture.test.tsx`

**Step 1: Write test for matching logic**
Verify that clicking the correct image triggers a "correct" callback.

**Step 2: Implement Game UI**
Create a 2x2 grid of images with a prominent word display. Apply "Jungle" styling (wooden frames).

**Step 3: Connect to TutorProvider**
Ensure correct/incorrect answers update the global streak and level.

**Step 4: Run tests**
Run: `npx vitest src/games/WordToPicture.test.tsx`
Expected: PASS.

**Step 5: Commit**
Run: `git add src/games/ && git commit -m "feat: implement WordToPicture game with jungle theme"`

---

### Task 5: Game 2 - Picture to Spelling

**Files:**
- Create: `src/games/PictureToSpelling.tsx`
- Create: `src/games/PictureToSpelling.css`

**Step 1: Implement UI**
One large image and 3 spelling buttons (1 correct, 2 distractors). Distractors should be similar (e.g., CAT vs KAT).

**Step 2: Implement distracter logic**
Function to generate plausible misspellings for a given word.

**Step 3: Validate & Commit**
Verify game updates state correctly and commit.

---

### Task 6: Game 3 - Missing Letter

**Files:**
- Create: `src/games/MissingLetter.tsx`
- Create: `src/games/MissingLetter.css`

**Step 1: Implement UI**
Display word with one random letter replaced by an underscore. Show 3 letter bubbles below.

**Step 2: Logic**
Ensure the missing letter is always one that is characteristic of the level.

**Step 3: Validate & Commit**
Verify game updates state correctly and commit.

---

### Task 7: Game 4 - Hangman (Jungle Bridge)

**Files:**
- Create: `src/games/Hangman.tsx`
- Create: `src/games/Hangman.css`

**Step 1: Visual Design**
Instead of a gallows, use a wooden bridge over a river. Each wrong letter removes a plank.

**Step 2: Game Logic**
Track guessed letters and remaining lives.

**Step 3: Validate & Commit**
Verify game updates state correctly and commit.

---

### Task 8: Jungle Shell & Navigation

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/JungleLayout.tsx`, `src/components/GameSelector.tsx`

**Step 1: Layout**
Add the vibrant jungle background, "vines" for progress, and a parrot mascot for guidance.

**Step 2: Game Switching**
Implement a simple menu to swap between the 4 games.

**Step 3: Final Integration & Commit**
Ensure all games are accessible and progress is visually reflected in the UI.
