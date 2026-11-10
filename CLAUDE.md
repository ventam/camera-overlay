# CLAUDE.md

## Language

- Write all code, code comments, commit messages and documentation in English.
- The user interface (labels, buttons, aria-labels, messages) is in English.
- The user may write to you in Finnish; reply in the language they use, but keep everything committed to the repository in English.

## Purpose

The app is for making quick sketches from a reference image: the phone is held or propped over the paper, the image is overlaid on the camera view to block in outlines and check proportions, and image only mode is used to look at the reference. Favor speed and few taps: the common actions (overlay on/off, image only) must be one tap, and new features should not slow down that loop or add steps to it.

## Project

- The app is one file, `index.html` (HTML, CSS and JS inline, no dependencies, no build step). Keep it that way. The only other files are for installing it to the home screen: `manifest.webmanifest`, `sw.js` (offline cache, network first with a 3 s timeout) and `icons/`. When adding a file the app needs offline, add it to `FILES` in `sw.js`.
- Deployed with GitHub Pages from `main` / root: every push to `main` goes live at https://ventam.github.io/camera-overlay/.
- Target is the phone browser, mainly iPhone Safari. Check layouts at narrow widths (320, 375 and 430 px) so nothing wraps or overflows. Also check phone landscape (e.g. 844×390 and 667×375), where the slider is horizontal along the bottom.
- Saved state lives in IndexedDB under the database name `kamera-overlay` (kept from the original Finnish version so existing data still loads). New persisted settings go in the `KEYS` list.
- Keep the README feature list in sync with user-visible changes.
- Memory: iOS reloads the page when it runs out of memory. The working image is capped at `MAXPX` and the 3D-transformed overlay frame at `FRAME` CSS pixels (`s.scale` is relative to the frame). Avoid full-resolution canvases, data URLs and large transformed layers; use blob URLs and revoke the old ones.

## Testing

- No test suite. Verify changes with headless Chromium via Playwright, using
  `--use-fake-ui-for-media-stream --use-fake-device-for-media-stream` for a fake camera.
- The fake camera has no hardware zoom and only one lens, so lens switching (0.5×) and hardware zoom can only be checked on a real iPhone; say so when reporting.
