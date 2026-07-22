# SwipeFit — Product Roadmap & Shared Spec

**Purpose:** one document that keeps two collaborators in sync — the *Claude Code*
sessions that build against the real repo, and the *ChatGPT* sessions Matt uses for
product brainstorming and bulk content. If you are an AI reading this: this file is the
contract. Follow the schema in §5 exactly; don't invent fields or relax the safety
rules in §9.

**Status as of 2026-07-17:** live PWA at <https://dirkragesmith.github.io/swipefit/>,
170 exercises (Bodyweight + Dumbbell), muscle/gear/condition filters, My Routine, dark
theme, offline service worker. Vanilla HTML/CSS/JS, no build step, no backend,
`localStorage` only. See `CLAUDE.md` for ground rules and the smoke-test checklist.

---

## 1. Product thesis (the thing we protect)

The swipe-first interaction is the moat, **not** the exercise database. Anyone can list
exercises; almost nobody rethinks how a workout is *navigated*. Card-stack + swipe =
zero learning curve. Every decision below is judged against one question: **does it keep
the app feeling like "Tinder meets Duolingo for training," or does it drift toward
spreadsheet-syndrome (Strong/Jefit)?** When in doubt, cut it.

Minimalism is the strength. New capability should hide until it's needed, not add
clutter to the first screen.

---

## 2. The Tier line (read this before planning anything)

Everything in the vision sorts into two tiers by **what it costs the architecture.**

- **Tier 1 — fits what already exists.** Client-side only, works offline, free to host,
  no rewrite. This is ~80% of the vision. **We build this now.**
- **Tier 2 — a real architectural leap.** Needs a backend / accounts / cloud / real LLM
  calls / payments. Breaks the offline-only rule and costs money. **Do not start until
  50–100 real users have validated demand** (friends, Reddit, a gym, closed testing).

If a proposed feature can't be done in the browser with `localStorage`, it's Tier 2 by
definition — park it in §8, don't sneak it into Tier 1.

---

## 3. Where each collaborator adds value (workflow + token economics)

- **ChatGPT** (separate token budget; good at divergent thinking): product ideation,
  prioritization, market/positioning, and **bulk content drafting** — see §6, the
  500-exercise deck. It cannot see this repo, so **do not ask it for technical
  architecture**; its plans come back generic and sometimes suggest things already built.
- **Claude Code** (this repo, sees the real files): code-grounded planning, schema
  design, integration, app logic, UI, and the `validate.js` gate. Turns ChatGPT's
  *ideas* into plans against the actual code, then builds.
- **Rule of thumb:** round-trip *intentions*, not specs. Brainstorm anywhere; let Claude
  write the plan that touches code; hand ChatGPT the high-volume, low-judgment data work.

---

## 4. Current architecture (what a plan must build on)

| File | Holds |
|---|---|
| `index.html` | App shell, four screens, inline theme boot |
| `styles.css` | All styling; theme via `html[data-theme]` |
| `app.js` | State (localStorage, `schemaVersion`), deck engine, swipe (pointer events), routine, settings. Filters live in `state.filters = { groups, equipment, conditions }`. `eligiblePool()` and `matchesFilters()` are where filtering happens. |
| `exercises.js` | `MUSCLE_GROUPS` (11), `EQUIPMENT`, `CONDITIONS` (9), `EXERCISES`. Also `module.exports` for Node. |
| `validate.js` | Scripted contract gate — `node validate.js`. |
| `sw.js` | Service worker; bump `CACHE_VERSION` on any app-file change. |

Key facts a feature plan must respect: filter UIs are **generated** from the data arrays
(never hardcoded); user data references exercises by permanent `id` only; unknown
exercise fields are safely ignored by today's `app.js` (so new metadata is additive).

---

## 5. Schema evolution (the contract GPT and Claude both target)

The dataset grows from 170 → ~500 and gains metadata for goal/time/pattern-based
generation. Two structural changes plus additive fields:

### 5a. `equipment` becomes an array of required items

Today it's a single string and a bench is *assumed*. For a real gear filter, an exercise
is doable **iff the user owns every item it requires**. So:

- `equipment: ["dumbbell", "bench"]` — needs both.
- `equipment: ["bodyweight"]` — needs nothing, do it anywhere.
- The gear filter becomes a **superset test**: show an exercise only if the user's
  selected gear ⊇ the exercise's `equipment`. (Claude updates `eligiblePool()`,
  `matchesFilters()`, migration, and the setup UI when the deck lands — schema bumps to v3.)

**Canonical `EQUIPMENT` ids (use these exact strings):**

`bodyweight`, `bench`, `dumbbell`, `barbell`, `ez-bar`, `kettlebell`, `pull-up-bar`,
`resistance-band`, `cable`, `machine`, `trx`, `box`, `medicine-ball`, `ab-wheel`,
`jump-rope`

Notes: a floor/`wall`/`mat` is always available — **don't** gate on those. "Home gym /
hotel / Planet Fitness" are **locations, not equipment** — they become one-tap *presets*
that select an equipment bundle (Phase B), never per-exercise tags. Split today's
over-broad "Bodyweight": true floor moves = `["bodyweight"]`, but pull-ups/chin-ups/
hanging raises = `["pull-up-bar"]`.

### 5b. Additive metadata (fill for ALL exercises, including the existing 170)

Today's app ignores these; Phases C–F switch them on. Keep them honest and taggable:

- `mechanic`: `"Compound"` | `"Isolation"`
- `pattern`: one of `"Horizontal Push"`, `"Vertical Push"`, `"Horizontal Pull"`,
  `"Vertical Pull"`, `"Squat"`, `"Hinge"`, `"Lunge"`, `"Carry"`, `"Rotation"`,
  `"Core"`, `"Conditioning"`
- `force`: `"Push"` | `"Pull"` | `"Static"` | `"Explosive"`
- `unilateral`: `true` | `false` (one side at a time?)
- `focus`: array, subset of `["strength","hypertrophy","endurance","power","mobility"]`
- `homeFriendly`: `true` | `false` (doable with dumbbells/bench/bodyweight only)

**Deliberately NOT tagged** (fake precision — keep the data trustworthy): calories,
exact setup time, range-of-motion degrees, "strength curve." If we ever want workout
duration we'll estimate it from set/rep/rest at generation time, not per-exercise guesses.

### 5c. Unchanged contracts

- `MUSCLE_GROUPS` stays the 11 existing names. `muscleGroup` = one; `secondaryMuscles` =
  array, all from the 11.
- `CONDITIONS` stays the 9 existing ids (`lower-back`, `knee`, `shoulder`, `wrist`,
  `neck`, `hip`, `high-impact`, `balance`, `pregnancy`). `avoidIf` = array of these.
- `difficulty` ∈ `Beginner` | `Intermediate` | `Advanced`.
- `id`: permanent, unique, kebab-case `^[a-z0-9-]+$`.

---

## 6. ⭐ DELEGATED TASK — the ~500-exercise deck (copy this section to ChatGPT)

> **Brief for ChatGPT.** Generate a fresh SwipeFit exercise library of **~500 real,
> common exercises** as one JavaScript array literal named `EXERCISES`, ready to paste
> into `exercises.js`. Every object must have **exactly these keys** and obey every rule.
> Output only the array (plus, if you like, the `MUSCLE_GROUPS`/`EQUIPMENT`/`CONDITIONS`
> arrays above it). Do not add prose between objects.
>
> **Object shape (all keys required):**
> ```js
> {
>   id: "db-incline-bench-press",         // permanent, unique, kebab-case ^[a-z0-9-]+$
>   name: "Incline Dumbbell Bench Press",
>   muscleGroup: "Chest",                 // exactly one of the 11 groups
>   secondaryMuscles: ["Shoulders", "Triceps"], // subset of the 11 groups (may be [])
>   equipment: ["dumbbell", "bench"],     // array of EQUIPMENT ids; ["bodyweight"] if none
>   difficulty: "Intermediate",           // Beginner | Intermediate | Advanced
>   cue: "Set the bench to 30°; press up and slightly back over your collarbones.", // 1 line
>   description: "Two sentences: setup/execution, then the most common mistake.",
>   avoidIf: ["shoulder"],                // subset of the 9 condition ids (may be [])
>   icon: "🏋️",                           // one emoji
>   mechanic: "Compound",                 // Compound | Isolation
>   pattern: "Horizontal Push",           // one of the 12 patterns in §5b
>   force: "Push",                        // Push | Pull | Static | Explosive
>   unilateral: false,
>   focus: ["strength", "hypertrophy"],   // subset of the 5 focuses in §5b
>   homeFriendly: false                   // true iff doable with only dumbbell/bench/bodyweight
> }
> ```
>
> **The 11 muscle groups:** Chest, Back, Shoulders, Biceps, Triceps, Core/Abs, Glutes,
> Quads, Hamstrings, Calves, Full Body/Cardio.
>
> **The EQUIPMENT ids:** bodyweight, bench, dumbbell, barbell, ez-bar, kettlebell,
> pull-up-bar, resistance-band, cable, machine, trx, box, medicine-ball, ab-wheel,
> jump-rope. (Never use a location like "gym"/"hotel" as equipment.)
>
> **The 9 condition ids (avoidIf may only use these):** lower-back, knee, shoulder,
> wrist, neck, hip, high-impact, balance, pregnancy.
>
> **avoidIf tagging = the app's safety feature. Be conservative — over-tag.** Examples:
> crunches/sit-ups → `lower-back`, `neck`, `pregnancy`; deadlifts/RDLs/good-mornings/
> swings → `lower-back`; overhead presses → `shoulder`, `neck`; floor push-ups &
> plank-hand work → `wrist`; jump squats/burpees/box jumps → `knee`, `high-impact`;
> single-leg/standing-balance moves → `balance`; deep loaded squats/lunges → `knee`
> (+`hip` if deep hip flexion). Planks are generally safe (no tags).
>
> **Coverage — aim ~500, roughly this spread (never fewer than the number shown):**
>
> | Group | Target | Group | Target |
> |---|---|---|---|
> | Chest | 48 | Glutes | 48 |
> | Back | 58 | Quads | 52 |
> | Shoulders | 52 | Hamstrings | 36 |
> | Biceps | 36 | Calves | 26 |
> | Triceps | 36 | Full Body/Cardio | 48 |
> | Core/Abs | 58 | | |
>
> Spread across ALL the equipment types (not just dumbbells) and all three difficulties.
> Include real variations: grips, angles, tempos, unilateral versions, banded/cable/
> machine/kettlebell/TRX variants. No duplicate ids. Keep `cue` to one line and
> `description` to ~two sentences. **Do not invent calories, setup time, ROM degrees, or
> "strength curve" — those keys are intentionally absent.** Produce the whole array in one
> go (or clearly numbered batches by muscle group that concatenate cleanly).

### Handback → integration (Claude does this)

1. Drop GPT's array into `exercises.js`; extend `EQUIPMENT` to the §5a list; add the
   metadata fields to the exports.
2. Update `validate.js`: `equipment` is now an array (each ∈ EQUIPMENT), validate the new
   enum fields, raise the size bound to ~400–600, keep the ≥5-per-group and
   avoidIf-∈-conditions checks. Run it — **data doesn't ship until `node validate.js` is
   green.**
3. Migrate the filter to the superset test (§5a); bump `schemaVersion` → 3 with a
   migration; rebuild the gear filter UI from the new `EQUIPMENT` (+ location presets in
   Phase B). Reconcile the user's saved routine by matching old ids/names where possible;
   anything unmatched uses the existing "No longer in the library" graceful fallback.
4. Bump `sw.js` `CACHE_VERSION`; run the full smoke-test checklist; deploy
   (`git push origin main main:gh-pages`).

---

## 7. Tier 1 roadmap (sequenced — build in this order)

**Phase A — Data & schema (unblocks everything).**
GPT delivers the ~500 deck (§6); Claude integrates (§5, §6 handback). Ships the richer
library + array-based gear model. *Do this first.*

**Phase B — Onboarding & personalization axes.**
Turn setup into a short, swipe-friendly questionnaire that sets the filters we already
have plus new ones — all client-side:
- **Equipment** as multi-select + **location presets** (Bodyweight-only / Dumbbells+Bench
  / Full Gym / Hotel) that each select an equipment bundle.
- **Goal** (lose fat / build muscle / strength / athletic / general / mobility / rehab /
  beginner) → biases `focus` + difficulty.
- **Time available** (15/30/45/60/90 min) → sizes generated sessions.
- **Injuries** → this is the existing conditions system; just surface it in onboarding
  and expand tags as the library grows.
Remember answers in `localStorage`; editable anytime.

**Phase C — Workout generation + swipe-to-learn.**
- From (goal + time + gear + injuries) build a balanced session (pattern coverage, sane
  set/rep defaults). Present it as a swipeable stack.
- **The differentiator (GPT's 9.5 idea):** onboarding *is* the swipe — "like incline
  bench / no cables today / love supersets / no squats" — after ~30 swipes the app has
  learned a taste profile (stored locally) that seeds future decks. This is the feature
  to get right; it's pure client-side and maximally on-brand.

**Phase D — In-workout mode.**
Step through today's session one card at a time: mark set done, **rest timer**, and
**smart substitution** — swipe to swap the current move for an equivalent one (same
pattern/muscle, allowed gear, respects injuries). "Bench occupied? Swipe." No backend.

**Phase E — Progress & motivation.**
Log completed workouts with dates; history/calendar; **PRs**, **streaks**,
**progressive-overload suggestions** (track weight → recommend increases), simple
hand-rolled SVG charts (no chart CDNs). Keep motivation subtle, not cheesy.

**Phase F — Rule-based "smart" adjustments (the honest kind of AI).**
"Slept 5h / have DOMS / low energy / traveling / skipped yesterday" → **deterministic
if/then adjustments** to volume, intensity, or equipment. These *feel* like an AI coach
but are plain rules over the metadata — **no LLM, no network, still offline.** This
captures most of the "AI features" value at zero cost and zero privacy risk.

Every phase above holds the offline/no-backend/no-CDN rules and ends with the
smoke-test + a `CACHE_VERSION` bump.

---

## 8. Tier 2 — parked until validated (backend required)

Only after real usage proves demand:
- Accounts + **cloud sync** (the first real backend; also the bridge for the iOS
  separate-storage problem noted in `CLAUDE.md`).
- Wearable / health-app integration.
- **Freemium** (free: limited workouts + history + basic plans; ~$4.99–7.99/mo:
  unlimited programs, adaptive plans, advanced analytics, sync). Sell *reduced friction*,
  not workout plans (those are free everywhere) — friction is the hard-to-copy moat.
- A **genuine LLM coach** ("you've benched 185 for 3 weeks — try 190"). Purpose-built,
  not a chat box. Needs server-side inference or a paid API → Tier 2 cost.
- **Publishing path:** modest Google Play registration; keep hosting cheap (static)
  until accounts/sync/AI actually require a backend.
- **Naming/branding note:** the obvious name/domain is taken — `swipefit.app` is an
  existing (Brazilian) fitness swipe app. If this ever goes public, pick a distinct
  name + domain. No action needed while it's personal.

---

## 9. Guardrails that never change

- Plain HTML/CSS/JS. No frameworks, no build step, no backend, no external network calls,
  no CDN. Everything vendored locally. (Tier 2 is the only thing that may revisit this,
  and only after §2's validation bar.)
- All user data in `localStorage` under `schemaVersion`; migrate, never clobber. User data
  references exercises by permanent `id`.
- `avoidIf` ∈ the 9 condition ids; `equipment` ∈ EQUIPMENT; every filter UI generated from
  its data array. `node validate.js` is the gate — nothing ships red.
- No HTML5 drag-and-drop (mobile-first, touch). Bump `sw.js` `CACHE_VERSION` on any
  app-file change. Keep the file tree small and flat (zippable onto any static host).
- Protect the swipe-first feel (§1). Features hide until needed.
