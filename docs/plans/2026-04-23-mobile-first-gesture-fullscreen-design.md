# Mobile First-Gesture Fullscreen Design

**Date:** 2026-04-23

**Problem:** On mobile browsers, especially iOS Safari, the browser chrome can remain visible during battle and consume too much vertical space. The current app already tries to enter fullscreen on landscape rotation, but that attempt happens too late and is not tied strongly enough to the first trusted user gesture.

**Goal:** Use the first tap on the page to start music and request fullscreen together, so mobile players enter the app in the best available visual mode before reaching battle.

## Recommended Approach

Reuse the existing global music bootstrap gesture as the primary fullscreen entry point on mobile. The same first `click`/`touchstart` that calls `music.init()` and `music.play('intro')` should also arm and consume a fullscreen request.

Keep the current landscape/orientation listeners as a fallback only. They remain useful when the browser rejects the first fullscreen request or when the player rotates after the first interaction, but they should no longer be the primary path.

## Behavior

On mobile:

- The first trusted gesture on the page initializes music.
- That same gesture attempts `requestFullscreenSafe()`.
- If fullscreen succeeds, the app continues normally.
- If fullscreen fails or the browser ignores the request, the app still continues normally.
- A pending fullscreen retry remains available for the next useful gesture and for later landscape rotation changes.

On desktop:

- No behavior change.

## Why This Approach

- It removes the need to block battle or show a fullscreen gate.
- It aligns fullscreen with the browser rule that privileged APIs must come from a user gesture.
- It preserves the current mobile fallback logic instead of replacing it with a brittle one-shot request.
- It keeps the implementation small and localized to the global bootstrap code in `index.html`.

## Edge Cases

- iOS Safari may still refuse fullscreen in some contexts. The app must not pause or trap the player if that happens.
- Devices that load directly in landscape should still queue a retry when needed.
- Repeated gestures should not restart music bootstrapping or spam fullscreen requests after fullscreen is already active.

## Validation

- Static load check in a headless browser to catch syntax/runtime boot errors.
- Diff review to confirm the change is limited to mobile gesture/fullscreen bootstrap behavior plus the new planning docs.
