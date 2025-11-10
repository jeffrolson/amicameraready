# Am I Camera Ready?

Am I Camera Ready is a zero-install camera check that runs entirely in your browser. It helps you dial in framing, lighting, and
background without ever uploading video to a server.

## Repository Layout

```
.
├── public/
│   └── index.html   # Single-page interface, styling, and behaviour
├── worker.js        # Cloudflare Worker entry that serves the static assets
├── wrangler.toml    # Worker configuration and asset binding
└── README.md        # Project overview and deployment guidance
```

## Front-end Experience

The refreshed interface layers soft gradients, frosted glass panels, and animated accents to feel modern while keeping the contro
ls familiar. When you click **Open Camera Preview**, the stage now expands to a full-screen overlay that keeps the Reverse/Grid/S
top controls floating at the top-right of the frame. The controls are semi-transparent with a subtle blur so they remain accessib
le without obscuring your video.

### Interaction Flow

1. **Landing hero** – Introduces the tool, highlights privacy, and offers a single CTA to launch the preview.
2. **Full-screen stage** – Upon granting camera access, the video stretches edge-to-edge, the grid toggle overlays the feed, and
   zoom controls appear as a floating pill in the lower corner.
3. **Orientation labels** – Left/Right markers fade in briefly whenever you flip the camera, helping you reorient quickly.
4. **Tips grid** – Helpful reminders about framing, lighting, background, and audio remain visible beneath the hero for quick re
ference.

All controls are implemented with vanilla JavaScript and Tailwind CSS via CDN—there is no build step.

## Cloudflare Worker Deployment

This repository is ready to run on Cloudflare Workers using [Workers static assets](https://developers.cloudflare.com/workers/
frameworks/worker-sites/). The Worker simply proxies incoming requests to the bundled assets and adds caching hints for non-HTML
files.

### Prerequisites

- A Cloudflare account with Workers enabled
- [`wrangler`](https://developers.cloudflare.com/workers/wrangler/install-and-update/) CLI authenticated with your account

### Local development

```bash
# Install dependencies for Wrangler if you haven't already
npm install -g wrangler

# Start a local preview of the Worker and static assets
wrangler dev
```

The dev server proxies through the Worker so you can test the full-screen camera experience exactly as it will run in productio
n. Camera access requires HTTPS or `localhost`, which Wrangler provides automatically.

### Deploying

```bash
# Publish the Worker and static assets
wrangler publish
```

Publishing uploads the contents of `public/` to Cloudflare's asset storage and deploys `worker.js`. Point your domain (e.g., `am
icameraready.com`) to the created Worker route to complete the migration.

## Manual Preview Without Wrangler

If you only want to inspect the front-end locally without the Worker, open `public/index.html` in a modern browser. Browsers req
uire HTTPS for camera access, so use Wrangler or another HTTPS dev server when testing webcam features.

## Extending the Project

- **Brand customization:** Swap the accent gradients and iconography by editing the inline CSS in `public/index.html`.
- **Preference persistence:** Store mirror/grid/zoom values in `localStorage` so returning visitors keep their settings.
- **Telemetry:** If you need analytics, add privacy-conscious tooling (Plausible, Cloudflare Analytics) directly in the Worker r
esponse.
- **Accessibility:** Layer in keyboard shortcuts and enhanced focus states for the floating controls.
