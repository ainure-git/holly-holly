# Mobile Player HUD Anchor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Anchor the player HP/mana HUD to the bottom-right corner on compact mobile battle screens without changing desktop battle layout.

**Architecture:** Update only the compact mobile battle CSS so the player HUD uses bottom safe-area anchoring instead of elevated offsets. Reserve a right-side HUD lane in the hand area so cards do not render under the HUD, and verify the breakpoint rules with a small Node regression test.

**Tech Stack:** Single-file HTML app with inline CSS and vanilla JavaScript, plus a small Node-based regression check.

---

### Task 1: Add a failing regression check

**Files:**
- Test: `tests/mobile-player-hud-layout.test.js`
- Modify: `index.html`

**Step 1: Write the failing test**

Add a small parser-based test that reads the compact mobile battle media block and asserts:

- `.hp-orb--player` anchors to `calc(6px + env(safe-area-inset-bottom))`
- `.hand-area` reserves extra right padding for the HUD lane

**Step 2: Run test to verify it fails**

Run: `node tests/mobile-player-hud-layout.test.js`

Expected: FAIL because the current compact mobile CSS still uses `bottom: calc(100px + env(safe-area-inset-bottom))` and does not reserve the HUD lane.

### Task 2: Apply the compact mobile layout fix

**Files:**
- Modify: `index.html`

**Step 1: Anchor the player HUD to the lower safe area**

Replace the compact mobile player HUD `bottom` offset with a bottom-safe-area anchor.

**Step 2: Reserve a lower-right HUD lane**

Increase compact mobile hand padding on the right so player cards stay clear of the anchored HUD.

**Step 3: Keep desktop behavior untouched**

Scope the change strictly to the compact mobile battle media rules.

### Task 3: Verify and ship

**Files:**
- Modify: `index.html`

**Step 1: Run regression test**

Run: `node tests/mobile-player-hud-layout.test.js`

Expected: PASS

**Step 2: Run static boot verification**

Run headless Edge against `index.html` and confirm the DOM renders.

**Step 3: Commit and push**

Commit the CSS/test/docs changes and push to `origin/main`.
