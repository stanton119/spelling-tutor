# Design: Lowercase Text for Question and Answers

## Goal
Convert all spelling questions, answers, character generation, and UI feedback from uppercase to lowercase to provide a more consistent and user-friendly experience.

## Strategy: Approach 1 - Update Source Data to Lowercase
Update the "source of truth" in the word data and all supporting logic to use lowercase as the standard format.

## Proposed Changes

### 1. Data Layer: `src/data/words.ts`
- Convert all `word` values in the `words` array to lowercase (e.g., `'CAT'` -> `'cat'`).

### 2. Logic Layer: Character Generation & Distractors
- **`src/games/MissingLetter.tsx`**: Update `String.fromCharCode(65 + ...)` to `97` for lowercase 'a'-'z'.
- **`src/games/Hangman.tsx`**: Update `ALPHABET` constant to `'abcdefghijklmnopqrstuvwxyz'`.
- **`src/utils/spellingDistractors.ts`**:
    - Update `vowels` to `['a', 'e', 'i', 'o', 'u']`.
    - Update `phoneticSubstitutions` keys and values to lowercase.
    - Change random char fallback from `fromCharCode(65 + ...)` to `97`.
    - Remove `.toUpperCase()` calls to maintain lowercase format.

### 3. UI Layer: Feedback & Overlays
- Update hardcoded feedback text in game components (e.g., `WordToPicture`, `PictureToSpelling`, `MissingLetter`, `Hangman`) to use sentence case (e.g., `Awesome!`) or lowercase.

## Validation Plan
- Verify all game modes display lowercase words.
- Ensure distractors in `MissingLetter` and `PictureToSpelling` are generated in lowercase.
- Verify the Hangman keyboard displays lowercase letters and correctly matches guesses.
- Confirm all feedback messages are updated.
