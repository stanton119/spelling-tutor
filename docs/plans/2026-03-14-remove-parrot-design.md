# Design: Remove Parrot Mascot

## Overview
The parrot mascot in the corner of the `JungleLayout` currently overlays buttons on mobile and is being removed entirely from the app to improve the user experience.

## Proposed Changes
1.  **`src/components/JungleLayout.tsx`**: Remove the `<div className="parrot-mascot">` block and its content (speech bubble and parrot emoji).
2.  **`src/components/JungleLayout.css`**: Remove all CSS rules associated with `.parrot-mascot`, `.bubble`, and `.parrot`.

## Constraints & Success Criteria
*   The parrot mascot should no longer be visible on any device (desktop or mobile).
*   The parrot emoji in the logo (`🌴 Spelling Tutor 🦜`) should remain untouched.
*   The layout should remain functional and visually appealing after the mascot is removed.

## Testing Strategy
*   Verify that the parrot mascot is no longer present in the DOM on both desktop and mobile viewports.
*   Ensure that no buttons are overlaid by the mascot anymore.
*   Confirm that the logo still contains the parrot emoji.
