# Design: Responsive Layout & Mobile Compatibility

**Date:** 2025-03-09
**Status:** Approved

## Goal
Optimize the Spelling Tutor application for smaller desktop screens (e.g., 13" MacBook Pro) and ensure full mobile compatibility by reclaiming vertical space and implementing a responsive design.

## Approach: Responsive Refinement
The application will maintain its jungle theme but use flexible units, media queries, and optimized paddings to fit within a single viewport without scrolling on 13" laptops and provide a seamless mobile experience.

### 1. Global Layout & Jungle Components
*   **Header (`JungleLayout.css`):**
    *   Reduce bottom padding from `60px` to `20px`.
    *   Shrink the jagged edge effect from `80px` to `40px`.
*   **Game Area (`App.css`):**
    *   Change `.game-wrapper` from `min-height: 500px` to `min-height: min(70vh, 500px)`.
    *   Update `.game-wrapper` padding to `clamp(15px, 5%, 40px)`.
    *   Add responsive padding to `.game-area` to reduce top space on mobile.
*   **Mascot & Foliage:**
    *   **Desktop:** Scale parrot from `6rem` to `4rem`.
    *   **Mobile (< 768px):** Hide the floating foliage (`.foliage`) and the parrot mascot (`.parrot-mascot`) to maximize space for gameplay.

### 2. Mobile Game Optimization
*   **Containers:**
    *   Remove `max-width: 900px` from `.game-wrapper` on screens smaller than 768px.
    *   Set `.game-wrapper` width to `100%` on mobile.
*   **Game Selector (`GameSelector.css`):**
    *   Implement `grid-template-columns: repeat(2, 1fr)` for mobile to create larger, easier-to-tap buttons.
    *   Use `flex-wrap` as a fallback.
*   **Interaction:**
    *   Ensure all buttons have a minimum hit target of `44x44px`.
    *   Add `:active` states for immediate touch feedback (e.g., `transform: scale(0.98)`).
*   **Typography:**
    *   Use `clamp()` for headings and labels to ensure they scale proportionally with the screen size.

## Success Criteria
*   The entire application (header, selector, game area) fits on a 13" MBP screen (approx. 1280x800) without vertical scrolling.
*   The application is fully functional and visually balanced on mobile devices (portrait and landscape).
*   No essential UI elements are obscured on small screens.
