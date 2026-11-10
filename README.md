# Camera Overlay

A browser app for making quick sketches from a reference image. It shows the image semi-transparently on top of the camera view, so you can block in the outlines and check proportions on paper, then switch to the image alone to look at the reference. Built for phones.

## Features

- Vertical slider on the right edge, below the view toggles (in landscape on a phone it runs horizontally along the bottom). The button at its top opens a grouped menu: Visibility (opacity; image style Normal, Contrast or Outline; outline detail and line color), Camera (zoom) and Overlay image (size, rotation, tilt vertical/horizontal, mirror). Each group has its own color on the slider (visibility lavender, camera orange, overlay green) and its own lock (in the group header or at the bottom of the slider); a locked group cannot be adjusted. Rotation and tilts snap to zero, and the 0° button centers them
- One finger moves the image, two fingers pinch (size and rotation)
- Camera zoom: presets (0.5× · 1× · 2× · 3× · 5×) are shown while the Zoom adjustment is selected; 0.5× uses the iPhone ultra wide camera
- Alignment grid (grid button): the grid tilts, rotates and scales with the image, so it can be used to set the perspective. Works without an image and while the overlay is hidden
- Outline style: the image is turned into edge lines (dark, white or red) on a transparent background, which are easier to trace than a full photo; Contrast shows it in high-contrast grayscale
- Reference marks: in image only mode tap ✎ Edit. The marks button in the image only toolbar cycles Marks + ratios → Marks (no ratio numbers) → Marks off; hiding is separate from the overlay, the ratio numbers setting applies to both. The tool button switches between points and circles. Points: tap to add; points form chains (A, B, C…, each in its own color) and + Chain starts a new parallel chain; tap a point to make its chain active, drag to move a point. Circles: drag to draw one from its center, drag the center dot to move it, drag the rim dot to resize it. 🗑 Delete turns on a separate delete mode (red): tap a point to remove it, tap a circle's ring or center to remove the circle, tap a line to remove its whole chain, or Clear all; nothing can be added or moved by accident while it is on. Lines join the points of each chain and show each segment's length relative to the first segment of chain A (no ratios until chain A has two points); circles show their diameter (⌀) relative to the same segment, so proportions can be compared. Undo removes the last point or circle. The marks button in the tool column shows them on the overlay too, following its size, rotation and tilt; with the overlay image hidden and only the marks shown, the overlay can still be moved, pinched and adjusted
- Crop: after choosing an image a crop screen opens (drag the corners, drag inside to move, drag outside to draw a new box; Full image / Cancel / Done). ✂ Crop in image only mode changes it later. The original is kept, so the crop can be widened again; marks stay on the same image content and the overlay keeps its size on screen
- Overlay button: switch between the plain camera view and the overlay without losing any settings
- Image only mode as a drawing reference: the original image straight (never the overlay's rotation or tilt), with its own zoom: pinch to zoom, drag to pan, ⤢ Fit resets. Its own Style button cycles Normal, Contrast and Outline (dark lines on white, like a sketch), independent of the overlay style. The zoom is remembered. Overlay adjustments are kept and a tap returns to the overlay
- The image and all adjustments (position, size, rotation, tilt, opacity, zoom) are saved automatically and restored next time
- Two button groups. In the top corner above the slider, big: show/hide slider, overlay on/off and image only. The tools form a column in the opposite corner, in spaced subgroups: ⋯ menu (Choose image, Close/Open camera to save battery, Settings: slider side, buttons at top/bottom, Clear all… which removes the image, marks and settings after a confirmation), grid lines, reference points and flashlight (shown only when the camera supports it), overlay lock (the image cannot be moved, resized, rotated, tilted or mirrored; same as the Overlay image group lock). Both groups move to the bottom via Settings and swap sides with the slider; the back camera is always on. All buttons use consistent inline SVG line icons
- The screen stays on while in use (Wake Lock)
- Installable to the home screen: opens full screen without Safari's bars and works offline. When camera access is already granted, the camera starts right away without the start screen

## Privacy

Everything stays on the phone. The camera picture is only shown on screen, never recorded or sent anywhere, and the chosen image and settings are stored in the browser's own storage on the device. The app has no server, accounts, analytics or tracking.

## Usage

The camera requires https. The easiest way is GitHub Pages:

1. Repository Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`
2. Open `https://ventam.github.io/camera-overlay/` on the phone
3. Allow the camera and choose an image

Locally: `npx serve .` and open `http://localhost:3000` (localhost works without https).

## Install on the home screen

In Safari open the page, tap Share, then **Add to Home Screen**. The installed app opens full screen and keeps working offline. When it opens online, the newest version is used; on a slow connection (over 3 seconds) the saved copy opens instead and the new version is stored for the next launch.

## Structure

The app itself is a single file, `index.html` (HTML, CSS and JS, no dependencies). `manifest.webmanifest`, `sw.js` and `icons/` make it installable and available offline.

## License

[MIT](LICENSE)
