# Lowercase Text Conversion Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert all spelling questions, answers, character generation, and UI feedback from uppercase to lowercase.

**Architecture:** Approach 1 - Update Source Data to Lowercase. This ensures the data matches the intended display and simplifies UI logic.

**Tech Stack:** React, TypeScript, Vite.

---

### Task 1: Update Source Data to Lowercase

**Files:**
- Modify: `src/data/words.ts`

**Step 1: Write a script or manual edit to lowercase all words**

Change:
```typescript
{ id: '1-1', word: 'CAT', image: '🐱', level: 1 },
```
To:
```typescript
{ id: '1-1', word: 'cat', image: '🐱', level: 1 },
```
*(Apply to all 180+ words in the file)*

**Step 2: Verify data structure**

Check that all `word` fields are now lowercase.

**Step 3: Commit**

```bash
git add src/data/words.ts
git commit -m "data: convert all words to lowercase"
```

---

### Task 2: Update Spelling Distractors Logic

**Files:**
- Modify: `src/utils/spellingDistractors.ts`

**Step 1: Update constants and character generation**

Modify:
- `vowels` -> `['a', 'e', 'i', 'o', 'u']`
- `phoneticSubstitutions` -> keys and values to lowercase
- `upperWord` variable name (change to `standardWord` or similar)
- `upperWord.toUpperCase()` -> `word.toLowerCase()` (or just use `word` if already lowercase)
- `String.fromCharCode(65 + ...)` -> `String.fromCharCode(97 + ...)`

**Step 2: Run existing tests (if any) or verify manually**

Ensure distractors are now generated in lowercase.

**Step 3: Commit**

```bash
git add src/utils/spellingDistractors.ts
git commit -m "utils: update distractor logic to use lowercase"
```

---

### Task 3: Update Missing Letter Character Generation

**Files:**
- Modify: `src/games/MissingLetter.tsx`

**Step 1: Update random character generation range**

Modify line (~31):
```typescript
const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
```
To:
```typescript
const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
```

**Step 2: Verify in UI**

Ensure missing letter options are lowercase.

**Step 3: Commit**

```bash
git add src/games/MissingLetter.tsx
git commit -m "fix(games): update MissingLetter to generate lowercase distractors"
```

---

### Task 4: Update Hangman Alphabet

**Files:**
- Modify: `src/games/Hangman.tsx`

**Step 1: Update ALPHABET constant**

Modify line (~8):
```typescript
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
```
To:
```typescript
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
```

**Step 2: Verify in UI**

Ensure the Hangman keyboard displays lowercase letters and matching still works.

**Step 3: Commit**

```bash
git add src/games/Hangman.tsx
git commit -m "fix(games): update Hangman alphabet to lowercase"
```

---

### Task 5: Update UI Feedback Messages

**Files:**
- Modify: `src/games/WordToPicture.tsx`
- Modify: `src/games/PictureToSpelling.tsx`
- Modify: `src/games/MissingLetter.tsx`
- Modify: `src/games/Hangman.tsx`

**Step 1: Update hardcoded feedback strings**

Example for `WordToPicture.tsx`:
Change:
```typescript
{feedback === 'correct' ? '🌟 AWESOME! 🌟' : '🍃 TRY AGAIN! 🍃'}
```
To:
```typescript
{feedback === 'correct' ? '🌟 Awesome! 🌟' : '🍃 Try again! 🍃'}
```
*(Apply similar changes to all game components as per the design)*

**Step 2: Verify UI consistency**

Check each game mode to ensure feedback is no longer all-caps.

**Step 3: Commit**

```bash
git add src/games/*.tsx
git commit -m "ui: update feedback messages to sentence case"
```
