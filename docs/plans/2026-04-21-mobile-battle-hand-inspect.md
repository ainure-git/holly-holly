# Mobile Battle Hand And Inspect Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the battle UI usable on short mobile landscape screens by centering the player's hand and showing inspected cards fully on screen without scroll.

**Architecture:** Keep the existing battle screen and card modal, but add a compact-mobile mode triggered by short landscape viewports. In that mode, lay out the player's hand with JS-calculated centered spacing and fit the inspect modal to the viewport with a measured scale instead of relying on a scrollable panel.

**Tech Stack:** Single-file HTML app with inline CSS and vanilla JavaScript.

---

### Task 1: Define compact-mobile battle behavior

**Files:**
- Modify: `index.html`

**Step 1: Document the compact viewport rule**

Use a short-landscape check so the mobile layout responds to height pressure, not only width.

**Step 2: Isolate compact hand styling**

Keep desktop and tablet behavior untouched; only apply centered/fanned hand layout in compact-mobile mode.

**Step 3: Isolate compact inspect modal behavior**

Keep desktop inspect modal unchanged; add a fit-to-screen behavior for compact-mobile mode.

### Task 2: Center the player hand

**Files:**
- Modify: `index.html`

**Step 1: Add compact-hand CSS hooks**

Prepare CSS classes for a centered hand rail and absolutely-positioned cards.

**Step 2: Compute card spacing in JS**

Measure the hand width, then place cards symmetrically around center with bounded spacing and slight rotation.

**Step 3: Re-run the hand layout on render and resize**

Ensure the hand re-centers after redraws and viewport changes.

### Task 3: Fit the inspect modal to screen

**Files:**
- Modify: `index.html`

**Step 1: Add compact inspect modal wrapper styles**

Allow the card to be scaled as a whole instead of using internal scroll.

**Step 2: Measure and scale the inspect card after opening**

Compute a viewport-safe scale from the rendered card dimensions and apply it to the inspect card.

**Step 3: Re-fit on resize/orientation changes**

If the viewport changes while the inspect modal is open, recompute the fit.

### Task 4: Verify

**Files:**
- Modify: `index.html`

**Step 1: Run a static load check**

Load `index.html` in headless Chrome and confirm the page initializes without syntax errors.

**Step 2: Review the diff**

Confirm that only the intended mobile battle and inspect behavior changed.
