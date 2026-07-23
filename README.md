# FitFlexr

Swipe through exercises like a dating app. **Right = save it to your FitFlex Stack. Left = skip.**
Toggle the conditions your body needs you to respect (knees, lower back, shoulder, …)
and every exercise tagged as risky for them is filtered out of the Flexr Deck before you
ever see it.

Personal use, one person, one device. No accounts, no backend, no tracking — everything
runs in your browser and stays on your device.

## Install on your phone

**The app is live at <https://dirkragesmith.github.io/fitflexr/>** (GitHub Pages,
deployed from this repo). Open that URL on your phone, then:

**iPhone (Safari):** tap the **Share** button (square with an up arrow) → scroll down →
**Add to Home Screen** → **Add**. iOS doesn't show an install prompt on its own — this
is the official way.

**Android (Chrome):** tap the **⋮ menu** → **Add to Home screen** / **Install app**
(or accept the install banner if Chrome shows one).

After installing, the app works fully offline — deck, Stack, everything.

## Using it without hosting

You can double-click `index.html` and use the app directly from the file — swiping,
Stack, and saving all work. Browsers are inconsistent about *installing* PWAs from
local files though, and offline caching won't activate, so for the real
install-on-home-screen experience use a static host as above.

To test locally like a real site, run this from the folder and open
<http://localhost:8642>:

```
python -m http.server 8642
```

## Back up your data

Your Stack, notes, and filters live in browser storage on the device. Clearing the
browser's site data wipes them. **Settings → Export my data** downloads everything as
a JSON file — that's your backup. (Import is planned for a later phase.)

Note for iPhone: an installed home-screen app keeps its own separate storage from
Safari — a Stack built in Safari doesn't automatically appear in the installed app.
Export/import is the bridge.

## Not medical advice

FitFlexr is a personal filtering tool, not a medical device. The condition tags are
conservative common-sense defaults, not a professional assessment. Listen to your own
body and your own doctor.
