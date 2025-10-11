# Am I Camera Ready?

Am I Camera Ready is a single-page web tool that helps you preview how you and your background will look on camera. It never saves or uploads your video; everything runs locally in the browser.

## Repository Layout

```
.
├── index.html   # All markup, styling helpers, and JavaScript behaviour
└── README.md    # Project overview and onboarding guidance
```

The application is intentionally lightweight. All of the UI and logic lives inside `index.html`, which uses Tailwind CSS via the CDN for styling and vanilla JavaScript for behaviour.

## Application Flow (`index.html`)

1. **Intro modal** – A welcoming screen that explains the privacy stance and asks the user to proceed. Pressing **Continue** triggers camera access via `navigator.mediaDevices.getUserMedia`.
2. **Stage section** – Once permission is granted, the intro is hidden and the full-screen video stage becomes visible. The video element mirrors the camera feed by default and applies zoom transformations with smooth transitions.
3. **Controls** – The header buttons let the user:
   - **Reverse** the video (`mirror` CSS class) to mimic a mirror or show the true orientation.
   - Toggle a rule-of-thirds **grid overlay** to help with framing.
   - **Stop** the camera, which also resets the UI back to the intro state.
4. **Zoom + labels** – Floating controls allow zooming between 1x and 3x. When you flip orientation the left/right labels briefly fade in so you can re-orient yourself.
5. **Tips section** – Helpful reminders for positioning, lighting, and background readiness complete the page.

## Important Implementation Details

- **No external build step:** Everything runs as a static HTML file. You can open `index.html` in a browser or host it from any static server.
- **Tailwind via CDN:** Styling depends on the Tailwind CDN script. If you need offline or production-grade hosting, consider replacing it with a compiled Tailwind bundle.
- **Camera permissions:** All camera usage is wrapped in `startCamera()`/`stopCamera()` helpers that start and stop media tracks cleanly, including on page unload.
- **Accessibility touches:** Buttons have labels (e.g., zoom controls use `aria-label`), and transitions respect `prefers-reduced-motion`.

## Getting Started

1. Open `index.html` in a modern browser (Chrome, Edge, or Firefox). Safari works but may require HTTPS for camera permissions.
2. Click **Continue** when prompted so the browser can access your webcam.
3. Experiment with the reverse/grid/zoom controls to learn the interface.

## Next Steps to Explore

- **Modularization:** If the project grows, consider extracting the JavaScript into separate modules and adding a bundler (Vite, Parcel) for better structure.
- **State persistence:** Remembering mirror/grid/zoom preferences in `localStorage` would improve user experience.
- **Accessibility and i18n:** Add keyboard shortcuts, focus states, and support for multiple languages.
- **Testing:** Introduce automated tests (e.g., Playwright) to verify that camera permissions, toggles, and zoom behave as expected.
- **Design polish:** Swap in your own branding assets and experiment with Tailwind themes to match your organization.

