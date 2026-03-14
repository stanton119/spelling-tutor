# Design: Prevent Back-to-Back Question Repeats

## Overview
Currently, the spelling tutor games select words randomly from the available word pool for each level. This occasionally results in the same word appearing twice in a row, which can be repetitive and less engaging for the user. This design aims to prevent immediate repetitions within each game.

## Goals
- Ensure the same word does not appear twice in a row in any given game.
- Maintain simplicity in implementation and avoid over-engineering.
- Handle edge cases (e.g., levels with only one word).

## Architecture & Component Changes
Each game component (`WordToPicture`, `PictureToSpelling`, `MissingLetter`, and `Hangman`) will be updated to include local state to track the ID of the word from the previous round.

### Component State
A new piece of state will be added to each game component:
```typescript
const [lastWordId, setLastWordId] = useState<string | null>(null);
```

### Word Selection Logic
The `setupRound` function in each component will be modified to filter out the `lastWordId` when selecting the next target word.

**Revised `setupRound` Flow:**
1.  Get all available words for the current level: `const availableWords = getWordsForLevel(currentLevel);`
2.  Filter out the word matching `lastWordId` if more than one word is available:
    ```typescript
    const filteredWords = availableWords.length > 1 
      ? availableWords.filter(w => w.id !== lastWordId)
      : availableWords;
    ```
3.  Randomly select a word from `filteredWords`.
4.  Update `targetWord` and `lastWordId` state.

## Edge Case Handling
- **Single Word Levels:** If a level has only one word, the logic will gracefully allow it to repeat as there are no alternatives.
- **Level Changes:** When `currentLevel` changes (via `useEffect`), `lastWordId` will be reset to `null` to ensure the first word of the new level is selected from the full pool.

## Testing Strategy
- **Unit Tests:** Update or add tests for each game component to verify that calling `setupRound` twice results in different words (when multiple words are available).
- **Manual Verification:** Play through each game type to confirm no immediate repeats occur.

## Alternatives Considered
- **Global Constraint:** Prevented "apple" in one game from appearing immediately in another. Rejected as "within each game" was deemed sufficient and simpler.
- **Queue-Based Selection:** Shuffling all words into a deck. Rejected as more complex than necessary for simple back-to-back prevention.
