# Mobile Player HUD Anchor Design

**Date:** 2026-04-23

**Problem:** In short mobile battle viewports, the player HP/mana card is intentionally lifted above the hand using large `bottom` offsets. That keeps it away from the lower edge, but it also lets the HUD drift upward into the right-side action stack and cover important battle buttons.

**Goal:** Keep the player HP/mana HUD anchored to the bottom-right corner on mobile only, while preserving the existing desktop composition.

## Recommended Approach

Limit the change to the compact mobile battle breakpoint. In that mode, pin the player HUD to the bottom-right safe area and reserve a dedicated HUD lane in the lower battle layout so the hand does not render underneath it.

Do not change desktop or tablet layout. Keep the current compact styling for the HUD, but stop using the extra mobile `bottom` lift that pushes it into the controls column.

## Behavior

On compact mobile battle viewports:

- The player HP/mana HUD stays flush to the bottom-right safe area.
- The HUD remains visually compact.
- The player hand leaves space on the right so cards do not slide under the HUD.
- The right-side battle buttons remain unobstructed.

On larger screens:

- No behavior change.

## Why This Approach

- It fixes the reported overlap at the actual cause: the mobile-only upward offset.
- It avoids redesigning battle controls or desktop layout.
- It keeps the player HUD in a predictable place across mobile sizes.
- It is small enough to verify with a CSS-focused regression test plus a static load check.

## Validation

- Add a regression test that checks the compact mobile CSS anchors the player HUD to the bottom safe area and reserves right-side hand space.
- Load `index.html` in headless Edge to confirm the page still boots.
