# Tactile Paper-Cut Jungle Theme Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the existing spelling tutor UI into a tactile, paper-cut jungle theme with layered depth, organic shapes, and physics-based interactions.

**Architecture:** Use CSS Variables for theme consistency, SVG components for organic shapes, and layered `box-shadow` techniques for depth. Implement spring-based transitions for a physical feel.

**Tech Stack:** React, TypeScript, Vanilla CSS.

---

### Task 1: Theme Foundation & Global CSS Variables

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css`

**Step 1: Define CSS Variables in `index.css`**
Add the core palette and shadow configurations.

```css
:root {
  --color-green-base: #4CAF50;
  --color-green-dark: #2E7D32;
  --color-yellow-sun: #FFD54F;
  --color-blue-sky: #E3F2FD;
  --color-brown-earth: #795548;
  --color-white: #FFFFFF;
  
  --shadow-paper-edge: 4px 4px 0px var(--color-green-dark);
  --shadow-paper-lift: 8px 8px 15px rgba(0, 0, 0, 0.1);
  --shadow-inset: inset 4px 4px 10px rgba(0, 0, 0, 0.1);
  
  --font-display: 'Fredoka One', cursive;
  --font-body: 'Quicksand', sans-serif;
}
```

**Step 2: Update `index.html` with Google Fonts**
Add the font imports to the head.

```html
<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Quicksand:wght@500;700&display=swap" rel="stylesheet">
```

**Step 3: Verify style updates**
Ensure the basic background color of the app changes to `--color-blue-sky`.

**Step 4: Commit**
Run: `git add src/index.css src/App.css index.html && git commit -m "style: add global theme variables and fonts"`

---

### Task 2: Layered Jungle Canopy (Header)

**Files:**
- Modify: `src/components/JungleLayout.tsx`
- Modify: `src/components/JungleLayout.css`

**Step 1: Implement Wavy SVG Edge in CSS**
Use `clip-path` or an inline SVG background to create the wavy paper-cut edge for the header.

**Step 2: Apply Paper-Cut Shadow**
Apply `--shadow-paper-edge` and `--shadow-paper-lift` to the `.jungle-header`.

**Step 3: Update Typography**
Apply `font-family: var(--font-display)` to the logo and header elements.

**Step 4: Commit**
Run: `git add src/components/JungleLayout.* && git commit -m "style: implement tactile paper-cut header"`

---

### Task 3: Wooden Signpost Navigation (GameSelector)

**Files:**
- Modify: `src/components/GameSelector.tsx`
- Modify: `src/components/GameSelector.css`

**Step 1: Style Buttons as Signposts**
Apply earth-brown backgrounds and thick "edge" shadows to the game selection buttons.

**Step 2: Add "Pressed" Animation**
Implement the `:active` state with `transform: translateY(4px)` and reduced shadow to simulate physical pressing.

**Step 3: Commit**
Run: `git add src/components/GameSelector.* && git commit -m "style: transform game selector into wooden signposts"`

---

### Task 4: Shadowbox Game Container

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`

**Step 1: Style the `.game-wrapper`**
Apply the `inset` shadow and a rounded paper-white background to create the "shadowbox" effect.

**Step 2: Add Entrance Animation**
Create a "slide-up" animation for the game container to simulate it being placed on a stage.

**Step 3: Commit**
Run: `git add src/App.* && git commit -m "style: add shadowbox effect to the game container"`

---

### Task 5: Component Refinement (Game Elements)

**Files:**
- Modify: `src/games/WordToPicture.css`
- Modify: `src/games/PictureToSpelling.css`
- Modify: `src/games/MissingLetter.css`
- Modify: `src/games/Hangman.css`

**Step 1: Apply Paper-Cut Styling to Game Cards**
Iterate through each game and apply the standard paper-cut shadows to all interactive tiles and images.

**Step 2: Add Shake Animation for Errors**
Define a `shake` keyframe animation and apply it to incorrect choices.

**Step 3: Commit**
Run: `git add src/games/ && git commit -m "style: apply paper-cut theme to all game components"`

---

### Task 6: Final Polish & Mascot Peek

**Files:**
- Modify: `src/components/JungleLayout.tsx`
- Modify: `src/components/JungleLayout.css`

**Step 1: Refine the Parrot Mascot**
Position the parrot so it appears to be "peeking" from behind the shadowbox.

**Step 2: Add Background Parallax**
Implement a simple mouse-tracking effect for the background "foliage" elements using CSS `transform` and a small amount of inline React state if necessary.

**Step 3: Final Verification**
Run `npm run build` and manually verify all interactions feel tactile.

**Step 4: Commit**
Run: `git commit -am "style: final polish and parallax effects for jungle theme"`
