# SwipeFit

A personal, offline-first PWA for swiping through exercises (right = save to My Routine,
left = skip). The core safety feature: "conditions to avoid" filters remove risky
exercises from the deck before the user ever sees them.

## Ground rules (don't relitigate these in any session)

- Plain HTML/CSS/JS, no frameworks, no build step, no backend, no login, no external network calls.
- All user data lives in `localStorage` on-device, under a `schemaVersion` key. User data references exercises only by their permanent `id`.
- Exercise data and the conditions list live in `exercises.js`, separate from app logic in `app.js`.
- Every `avoidIf` tag must exactly match a condition id; the filter UI is generated from the conditions array.
- Every feature must keep working fully offline once installed. Anything added must be vendored locally, never pulled from a CDN.
- No HTML5 drag-and-drop API — this app is mobile-first and it doesn't work on touch.
- Bump the cache version string in `sw.js` in ANY session that changes app files, or installed users never receive updates.
- Keep the file count small and flat — always zippable onto a static host.
- Run the smoke-test checklist below at the end of every session.

## File layout

| File | Purpose |
|---|---|
| `index.html` | App shell, all four screens, inline theme bootstrap |
| `styles.css` | All styling (light/dark via `html[data-theme]`) |
| `app.js` | All logic (state, deck, swipe, routine, settings) |
| `exercises.js` | `MUSCLE_GROUPS`, `CONDITIONS`, `EXERCISES` data (also `module.exports` for Node) |
| `sw.js` | Service worker — bump `CACHE_VERSION` on any change |
| `manifest.json` | PWA manifest |
| `validate.js` | Dataset integrity check — run `node validate.js` |
| `icon-192.png` / `icon-512.png` | App icons (volt/ink dumbbell) |

## Dev commands

- Validate dataset: `node validate.js`
- Serve locally (service worker needs HTTP): `python -m http.server 8642` from this folder
- Deploy: drag the folder onto Netlify Drop, or push to GitHub Pages. All paths are relative, so subpath hosting works.

## Smoke-test checklist (run at the end of every session)

1. Filters exclude correctly: toggle "Knee Issues," confirm no `knee`-tagged exercise appears in the deck.
2. Right swipe adds to My Routine; left swipe skips; skipped items don't reappear this session.
3. Routine, notes, sets/reps, and filters survive a page reload.
4. `avoidIf` tags all match the conditions array (`node validate.js`, not eyeball).
5. Export button downloads valid JSON.
6. Serve locally over HTTP: service worker registers, then app loads offline on refresh.
7. Open via `file://`: app still works, no thrown errors from SW registration.

## Roadmap

Phase 1 — MVP: **done** (initial commit). Swipe deck, filter/condition safety system,
My Routine with reorder/sets/notes, settings with theme + JSON export, PWA shell
(manifest + service worker + icons), 99-exercise seed library.

Phase 2 — Real PWA install experience:

- Verify install works on Android Chrome (native prompt via manifest + SW). On iOS there is NO native install prompt — the deliverable is correct `apple-touch-icon` / `apple-mobile-web-app-*` meta tags plus a short in-app hint telling iOS users to use Share → Add to Home Screen.
- Splash/theme colors (iOS startup images require per-device `apple-touch-startup-image` tags — a themed background color is an acceptable simpler alternative).
- Full offline test: install, airplane mode, confirm app opens and swiping works.
- "Update available" banner when the service worker detects a new version.
- Note: an installed iOS PWA gets its own localStorage, separate from Safari's — data doesn't carry over from browser to installed app. Export/import is the bridge; mention it in the README.

Phase 3 — Routine builder upgrades:

- Organize My Routine into named workout days ("Day A – Push," etc.) by tap-to-assign (tap exercise → pick a day from a small sheet). No drag-and-drop.
- "Start Workout" mode: step through today's routine one exercise at a time with a checkbox/simple timer per exercise.

Phase 4 — Personalization & data portability:

- Add custom exercises (name, muscle group, avoidIf tags, cue) via a form, stored in localStorage alongside the seed data.
- Let the user edit/re-tag seed exercises. Store user edits as OVERRIDES keyed by exercise id, merged over the seed data at load time — never mutate `exercises.js` — so the seed dataset can grow without clobbering user edits.
- JSON import to complement the Phase 1 export (routine + custom exercises + overrides).

Phase 5 — Progress tracking & polish:

- Log completed workouts with date stamps; simple history/calendar view.
- Optional bodyweight/measurement tracker with a hand-rolled SVG line chart (no chart libraries from CDNs).
- Streaks / "days since last workout" indicator.
- Accessibility pass: font-size control, high-contrast mode, full keyboard navigation as an alternative to swiping. (Phase 1 already has ArrowLeft/ArrowRight/U/F keys on the deck.)
- Visual polish: refined animations, haptics via `navigator.vibrate` as progressive enhancement (Android only — iOS doesn't support it), tightened dark mode.

Parking lot (no assigned phase):

- Per-exercise illustration/GIF support. Note: images can't be referenced by local filename in an installed PWA and are too big for localStorage — the real implementation is a file-input upload stored in IndexedDB, which amends the localStorage-only rule when the time comes.
- "Superset" swipe-up gesture to pair two exercises.
- Multiple saved profiles/routines ("Home," "Gym," "Travel").

## How to resume a session

State which phase you're starting. The code and this file are already in the repo —
build on the real code, don't regenerate from scratch. Commit at the end of the phase
and bump the `sw.js` cache version if any app file changed.
