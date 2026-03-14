# Remove Parrot Mascot Implementation Plan

> **For Gemini:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the parrot mascot and speech bubble from the `JungleLayout` while preserving the parrot emoji in the logo.

**Architecture:** Surgical removal of the mascot's TSX structure and its associated CSS rules.

**Tech Stack:** React (TypeScript), CSS

---

### Task 1: Remove Parrot Mascot TSX

**Files:**
- Modify: `src/components/JungleLayout.tsx`

**Step 1: Write the failing test**
*Note: Since this is a UI removal, we'll verify the element is no longer in the DOM.*
Create: `src/components/JungleLayout.test.tsx` if it doesn't exist, or add to it.

```tsx
import { render, screen } from '@testing-library/react';
import JungleLayout from './JungleLayout';
import { TutorProvider } from '../context/TutorContext';

test('parrot mascot is not rendered', () => {
  render(
    <TutorProvider>
      <JungleLayout><div>Test</div></JungleLayout>
    </TutorProvider>
  );
  const parrotMascot = document.querySelector('.parrot-mascot');
  expect(parrotMascot).toBeNull();
});
```

**Step 2: Run test to verify it fails**
Run: `npm test src/components/JungleLayout.test.tsx`
Expected: FAIL (parrot-mascot is found)

**Step 3: Remove the mascot from TSX**
Remove lines 56-59 in `src/components/JungleLayout.tsx`:
```tsx
      <div className="parrot-mascot">
        <div className="bubble">Keep going! You're doing great!</div>
        <span className="parrot" style={{ transform: `translateY(${mousePos.y * 0.1}px) rotate(${mousePos.x * 0.2}deg)` }}>🦜</span>
      </div>
```

**Step 4: Run test to verify it passes**
Run: `npm test src/components/JungleLayout.test.tsx`
Expected: PASS

**Step 5: Commit**
```bash
git add src/components/JungleLayout.tsx src/components/JungleLayout.test.tsx
git commit -m "feat: remove parrot mascot from JungleLayout"
```

### Task 2: Remove Parrot Mascot CSS

**Files:**
- Modify: `src/components/JungleLayout.css`

**Step 1: Identify and remove CSS rules**
Remove the following blocks:
1.  Lines 90-92 (partially): Remove `.parrot-mascot` from the selector.
2.  Lines 103-112: Remove the `.parrot-mascot` rule.
3.  Lines 114-131: Remove the `.bubble` and `.bubble::after` rules.
4.  Lines 133-137: Remove the `.parrot` rule.

**Step 2: Verify visual integrity**
Check that the layout still looks correct and no "ghost" elements or broken styles remain.
Run: `npm run build` to ensure no CSS errors.

**Step 3: Commit**
```bash
git add src/components/JungleLayout.css
git commit -m "style: remove parrot mascot CSS"
```
