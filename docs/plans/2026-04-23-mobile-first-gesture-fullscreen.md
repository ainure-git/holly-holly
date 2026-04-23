# Mobile First-Gesture Fullscreen Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Request fullscreen on the first mobile user gesture, alongside music bootstrap, so battle starts with less browser chrome overhead.

**Architecture:** Reuse the existing global first-interaction bootstrap as the primary fullscreen entry point, while keeping the current orientation-based retry path as a fallback. Add a small verification harness that exercises the fullscreen bootstrap helpers without changing app architecture.

**Tech Stack:** Single-file HTML app with inline CSS and vanilla JavaScript.

---

### Task 1: Add a reproducible bootstrap check

**Files:**
- Modify: `index.html`

**Step 1: Write a small failing verification harness**

Expose or add a tiny pure helper that describes when the first interaction should attempt fullscreen, and reference the current behavior gap in the test harness.

**Step 2: Run the verification and confirm the pre-change behavior is missing**

Run a script or headless browser check that fails until the first-gesture fullscreen behavior is wired in.

### Task 2: Move fullscreen bootstrap to the first gesture

**Files:**
- Modify: `index.html`

**Step 1: Update the music bootstrap handler**

Ensure the same first trusted mobile gesture that initializes audio also attempts fullscreen.

**Step 2: Preserve retry behavior**

Keep pending fullscreen retries for later gestures and landscape changes when the first attempt is denied or ignored.

**Step 3: Avoid redundant requests**

Prevent extra fullscreen attempts after fullscreen is already active or after desktop/non-mobile startup.

### Task 3: Verify and ship

**Files:**
- Modify: `index.html`

**Step 1: Run static verification**

Load `index.html` in a headless browser and confirm the app initializes without syntax errors.

**Step 2: Review the diff**

Confirm only the intended bootstrap/fullscreen behavior and planning docs changed.

**Step 3: Commit and push**

Create a non-interactive git commit and push to `origin/main`.
