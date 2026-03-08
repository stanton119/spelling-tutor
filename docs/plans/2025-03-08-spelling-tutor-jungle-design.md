# Spelling Tutor - Tactile Paper-Cut Jungle Design
**Date:** 2025-03-08
**Topic:** Visual Refinement of the Jungle Theme

## 1. Aesthetic Direction: "Tactile Paper-Cut Jungle"
The interface will be transformed into a playful, toy-like world that mimics layered paper-craft. This approach uses depth, organic shapes, and a specific "z-stacking" technique to create an immersive experience for young children.

## 2. Visual Palette & Typography
### Colors
- **Base Green:** `#4CAF50` (Primary surfaces/foliage)
- **Deep Shadow Green:** `#2E7D32` (Thickness shadows and text)
- **Sunlight Yellow:** `#FFD54F` (Primary action buttons/highlights)
- **Sky Blue:** `#E3F2FD` (Background/negative space)
- **Earth Brown:** `#795548` (Secondary accents/tree elements)

### Typography
- **Headings:** `Fredoka One` (Google Font) - Chunky, rounded, and friendly.
- **Body/Instructions:** `Quicksand` (Google Font) - Highly legible with rounded terminals.

## 3. UI Components & Layout
### The Paper-Cut Effect
- All major components (cards, buttons, headers) will use multiple CSS `box-shadow` layers to simulate physical thickness:
  - `4px 4px 0px var(--shadow-color)` for the "edge"
  - `8px 8px 15px rgba(0,0,0,0.1)` for the "lift"
- **The Canopy (Header):** A layered SVG with wavy edges and a 4px shadow to look like a thick piece of cardstock.
- **The Signpost (GameSelector):** Buttons styled as wooden signposts with "pressed" states that shift the element 4px down.
- **The Shadowbox (Game Area):** An inset-shadow container (`box-shadow: inset ...`) to make the game feel like it's happening inside a cutout box.

## 4. Interaction & Motion
- **Spring-Based Clicks:** Buttons use `transform: translateY(4px)` on `:active` with a spring transition.
- **Stage Scenery Transitions:** New game elements "slide in" with staggered delays (`animation-delay`) to emphasize depth.
- **Tactile Feedback:**
  - **Correct:** Paper-leaf "confetti" animation.
  - **Incorrect:** Horizontal "loose paper" shake animation.
- **Parallax Depth:** Background foliage shifts slightly based on mouse position to enhance the 3D paper-cut effect.

## 5. Technical Implementation Notes
- **CSS Variables:** Centralize the palette and shadow configurations.
- **SVG Masking:** Use SVGs for the organic wavy edges of the header and footer.
- **React Motion (Optional):** If available, use for smoother spring animations; otherwise, use optimized CSS transitions.
