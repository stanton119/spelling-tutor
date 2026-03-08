# Spelling Tutor - Design Document
**Date:** 2025-03-08
**Topic:** Educational Spelling Web App for Children

## 1. Overview
A vibrant, jungle-themed web application designed to help young children improve their spelling through four interactive games. The app adapts to the child's skill level individually for each game.

## 2. Core Features
- **Four Games:** 
    1. **Word to Picture:** Match a word to its image.
    2. **Picture to Spelling:** Choose the correct spelling for an image.
    3. **Missing Letter:** Fill in the blank for an image-assisted word.
    4. **Hangman:** Classic word-guessing with a jungle twist.
- **Adaptive Difficulty:** Each game tracks its own skill level. 3 correct answers increase difficulty; 1 incorrect answer decreases it.
- **Progress Persistence:** All data is stored in `localStorage`.
- **Theme:** Jungle-inspired aesthetic (vibrant greens, wood textures, animal mascots, interactive animations).

## 3. Architecture
- **Framework:** React (Vite) + TypeScript.
- **Styling:** Vanilla CSS (for custom, organic jungle shapes and animations).
- **State Management:** Custom React Context/Hooks (`useTutorStats`) managing a unified persistent state object.

### State Schema
```json
{
  "games": {
    "wordToPicture": { "level": 1, "streak": 0, "history": [] },
    "pictureToSpelling": { "level": 1, "streak": 0, "history": [] },
    "missingLetter": { "level": 1, "streak": 0, "history": [] },
    "hangman": { "level": 1, "streak": 0, "history": [] }
  }
}
```

## 4. Components
- `TutorProvider`: Context manager for stats and word data.
- `JungleLayout`: Main layout with background, sounds, and progress-tracking "vines."
- `GameSelector`: Jungle map or treehouse menu to pick a game.
- `GameEngine`: Base component handling difficulty logic and feedback overlays.
- `FeedbackSystem`: High-energy animations (monkey/tiger) for rewards.

## 5. Difficulty Levels
- **Level 1-2:** 3-letter CVC words (CAT, DOG, BAT).
- **Level 3-4:** 4-letter words with blends (FROG, BIRD).
- **Level 5-6:** 5-6 letter common objects (TIGER, JUNGLE, MONKEY).
- **Level 7+:** Multi-syllable or complex spelling patterns.

## 6. Success Criteria
- Independent progress tracking for each game.
- No questions served that are "too easy" or "too hard" for the current level.
- Visually engaging "Jungle" aesthetic that feels "alive" (animations/feedback).
