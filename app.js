/*
 * FitFlexr app logic. Data (MUSCLE_GROUPS, CONDITIONS, EXERCISES) comes from
 * exercises.js, loaded before this file. No frameworks, no network calls.
 */
"use strict";

(function () {
  // ── Tiny DOM helpers ─────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  // ── Data lookups ─────────────────────────────────────────
  const GROUP_BY_NAME = {};
  MUSCLE_GROUPS.forEach((g) => { GROUP_BY_NAME[g.name] = g; });
  const CONDITION_IDS = new Set(CONDITIONS.map((c) => c.id));
  const CONDITION_BY_ID = {};
  CONDITIONS.forEach((c) => { CONDITION_BY_ID[c.id] = c; });
  const EX_BY_ID = {};
  EXERCISES.forEach((ex) => { EX_BY_ID[ex.id] = ex; });
  const EQUIP_LABEL = {};
  EQUIPMENT.forEach((e) => { EQUIP_LABEL[e.id] = e.label; });
  const ALL_EQUIP_IDS = EQUIPMENT.map((e) => e.id);

  // Equipment array of an exercise, defensively coerced to a lowercased array.
  const equipOf = (ex) =>
    Array.isArray(ex.equipment) ? ex.equipment : [String(ex.equipment).toLowerCase()];

  // One-tap gear presets for the setup screen (locations map to equipment bundles).
  const GEAR_PRESETS = [
    { label: "Bodyweight", gear: ["bodyweight"] },
    { label: "Home", gear: ["bodyweight", "dumbbell", "bench"] },
    { label: "Home+", gear: ["bodyweight", "dumbbell", "bench", "resistance-band", "kettlebell", "pull-up-bar"] },
    { label: "Full gym", gear: ALL_EQUIP_IDS.slice() },
  ];

  // Onboarding personalization axes (Phase B). Stored in state.onboarding; Phase C
  // will use them to bias generation. For now they're collected, shown, and editable.
  const GOALS = [
    { id: "lose-fat", label: "Lose fat", icon: "🔥" },
    { id: "build-muscle", label: "Build muscle", icon: "💪" },
    { id: "strength", label: "Get stronger", icon: "🏋️" },
    { id: "athletic", label: "Athletic / power", icon: "⚡" },
    { id: "general", label: "General fitness", icon: "✨" },
    { id: "mobility", label: "Mobility", icon: "🧘" },
    { id: "rehab", label: "Rehab / careful", icon: "🩹" },
    { id: "beginner", label: "Just starting", icon: "🌱" },
  ];
  const GOAL_BY_ID = {};
  GOALS.forEach((g) => { GOAL_BY_ID[g.id] = g; });
  const TIME_OPTIONS = [15, 30, 45, 60, 90]; // minutes

  // Phase C generation: how each goal biases exercise selection + a default set/rep
  // scheme, and how many exercises fit a session length. All heuristics, all local.
  const GOAL_CONFIG = {
    "lose-fat":     { focus: ["endurance", "power"], setsReps: "3 × 15" },
    "build-muscle": { focus: ["hypertrophy"], setsReps: "4 × 10" },
    "strength":     { focus: ["strength"], setsReps: "5 × 5", preferMechanic: "Compound" },
    "athletic":     { focus: ["power"], setsReps: "5 × 3" },
    "general":      { focus: ["strength", "hypertrophy"], setsReps: "3 × 12" },
    "mobility":     { focus: ["mobility"], setsReps: "2 × 10" },
    "rehab":        { focus: ["mobility", "endurance"], setsReps: "2 × 12", maxDifficulty: "Beginner" },
    "beginner":     { focus: ["strength"], setsReps: "3 × 10", maxDifficulty: "Beginner" },
  };
  const TIME_COUNT = { 15: 3, 30: 5, 45: 7, 60: 9, 90: 12 };

  // ── Persistent state (localStorage, schema-versioned) ────
  const STORAGE_KEY = "fitflexr";
  const SCHEMA_VERSION = 5;
  const EQUIPMENT_SET = new Set(ALL_EQUIP_IDS);
  // Sensible starting gear (Matt's home setup); also the fallback when none is stored.
  const DEFAULT_GEAR = ["bodyweight", "dumbbell", "bench"];

  const defaultState = () => ({
    schemaVersion: SCHEMA_VERSION,
    // equipment = the gear you own. An exercise shows only if you own ALL it needs
    // (superset test). Unlike groups, empty here means "nothing shows" — presets fix that.
    filters: { groups: [], equipment: DEFAULT_GEAR.slice(), conditions: [] },
    routine: [], // [{ id, sets, notes }] — references exercises by permanent id only
    theme: "dark",
    // Phase B onboarding profile. completed gates the first-run flow; goal/time are
    // the personalization axes Phase C uses to bias generated sessions.
    onboarding: { completed: false, goal: null, timeAvailable: null },
    // Phase C swipe-to-learn taste profile: attribute weights nudged by every swipe.
    taste: { swipes: 0, weights: {} },
  });

  function migrate(data) {
    if (!data || typeof data !== "object") return defaultState();
    const out = defaultState();
    const fromVersion = typeof data.schemaVersion === "number" ? data.schemaVersion : 1;
    const filters = data.filters || {};
    out.filters.groups = Array.isArray(filters.groups)
      ? filters.groups.filter((g) => GROUP_BY_NAME[g]) : [];
    // Equipment: lowercase-map old values to the new id taxonomy, keep valid ones.
    let eq = Array.isArray(filters.equipment)
      ? filters.equipment.map((e) => String(e).toLowerCase()).filter((e) => EQUIPMENT_SET.has(e))
      : [];
    // v2→v3 (one-time): old app was Bodyweight/Dumbbell with a bench always assumed, and
    // its default meant "all". Bring those users onto an equivalent explicit gear set.
    if (fromVersion < 3) {
      if (!eq.length) eq = DEFAULT_GEAR.slice();
      else {
        if (!eq.includes("bodyweight")) eq.unshift("bodyweight");
        if (!eq.includes("bench")) eq.push("bench");
      }
    }
    out.filters.equipment = eq.length ? eq : DEFAULT_GEAR.slice();
    out.filters.conditions = Array.isArray(filters.conditions)
      ? filters.conditions.filter((c) => CONDITION_IDS.has(c)) : [];
    out.routine = Array.isArray(data.routine)
      ? data.routine
          .filter((r) => r && typeof r.id === "string")
          .map((r) => ({ id: r.id, sets: String(r.sets || ""), notes: String(r.notes || "") }))
      : [];
    out.theme = ["system", "light", "dark"].includes(data.theme) ? data.theme : "dark";
    // v1→v2 (one-time): the app now defaults to a black theme. Flip the old "system"
    // default to dark once. Guarded on version so a later deliberate "System" pick sticks.
    if (fromVersion < 2 && out.theme === "system") out.theme = "dark";
    // v3→v4: onboarding profile added. Carry over any valid saved values; pre-v4 users
    // land with completed=false so the first-run flow runs once.
    const ob = data.onboarding && typeof data.onboarding === "object" ? data.onboarding : {};
    out.onboarding = {
      completed: ob.completed === true,
      goal: GOAL_BY_ID[ob.goal] ? ob.goal : null,
      timeAvailable: TIME_OPTIONS.includes(ob.timeAvailable) ? ob.timeAvailable : null,
    };
    // v4→v5: taste profile added. Carry over a valid weights map + swipe count.
    const t = data.taste && typeof data.taste === "object" ? data.taste : {};
    out.taste = {
      swipes: Number.isFinite(t.swipes) ? t.swipes : 0,
      weights: t.weights && typeof t.weights === "object" ? t.weights : {},
    };
    return out;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const migrated = migrate(parsed);
      // Persist right away if we bumped the schema, so one-time migrations (e.g. the
      // v1 "system"→dark flip) can't re-run on later loads. Inlined because the shared
      // `state`/saveState aren't defined until after loadState() returns.
      const wasVersion = typeof parsed.schemaVersion === "number" ? parsed.schemaVersion : 1;
      if (wasVersion !== SCHEMA_VERSION) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated)); } catch (_) {}
      }
      return migrated;
    } catch (err) {
      console.warn("FitFlexr: couldn't read saved data, starting fresh.", err);
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("FitFlexr: couldn't save data.", err);
    }
  }

  let saveTimer = null;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 250);
  }

  const state = loadState();

  // ── Session state (in-memory on purpose: skips reset next visit) ──
  let deck = [];
  let deckIndex = 0;
  let deckBuilt = false;
  let deckMode = "browse"; // "browse" | "generated"
  let sessionSetsDefault = ""; // set/rep scheme prefilled when saving a generated card
  const sessionSkipped = new Set();
  let swipeHistory = []; // [{ id, action: "save" | "skip" }]
  let currentScreen = "filters";

  // ── Dataset sanity check (dev aid; validate.js is the scripted gate) ──
  function validateDataset() {
    const problems = [];
    const seen = new Set();
    EXERCISES.forEach((ex) => {
      if (seen.has(ex.id)) problems.push(`duplicate id "${ex.id}"`);
      seen.add(ex.id);
      if (!GROUP_BY_NAME[ex.muscleGroup]) {
        problems.push(`${ex.id}: unknown muscleGroup "${ex.muscleGroup}"`);
      }
      (ex.avoidIf || []).forEach((tag) => {
        if (!CONDITION_IDS.has(tag)) problems.push(`${ex.id}: unknown avoidIf tag "${tag}"`);
      });
    });
    if (problems.length) {
      console.warn("FitFlexr dataset problems:\n" + problems.join("\n"));
    }
    return problems;
  }

  // ── Deck building ────────────────────────────────────────
  function passesConditions(ex) {
    return !ex.avoidIf.some((tag) => state.filters.conditions.includes(tag));
  }

  // Superset test: an exercise shows only if you own every piece of gear it needs.
  function ownsGear(ex) {
    const owned = new Set(state.filters.equipment);
    return equipOf(ex).every((e) => owned.has(e));
  }

  function eligiblePool() {
    const groups = state.filters.groups;
    const inRoutine = new Set(state.routine.map((r) => r.id));
    return EXERCISES.filter(
      (ex) =>
        (groups.length === 0 || groups.includes(ex.muscleGroup)) &&
        ownsGear(ex) &&
        passesConditions(ex) &&
        !inRoutine.has(ex.id) &&
        !sessionSkipped.has(ex.id)
    );
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── Swipe-to-learn taste profile ─────────────────────────
  // Every swipe nudges attribute weights; liked attributes float exercises up in
  // future decks. Pure client-side, stored in state.taste. Bias only kicks in once
  // there's enough signal so the first sessions stay pure discovery.
  const TASTE_MIN_SWIPES = 8;

  function tasteKeys(ex) {
    const keys = equipOf(ex).map((e) => "equip:" + e);
    if (ex.pattern) keys.push("pattern:" + ex.pattern);
    keys.push("group:" + ex.muscleGroup);
    if (ex.difficulty) keys.push("diff:" + ex.difficulty);
    if (ex.mechanic) keys.push("mechanic:" + ex.mechanic);
    return keys;
  }

  function recordTaste(ex, action) {
    const w = state.taste.weights;
    const delta = action === "save" ? 1 : -0.4;
    tasteKeys(ex).forEach((k) => { w[k] = (w[k] || 0) + delta; });
    state.taste.swipes = (state.taste.swipes || 0) + 1;
  }

  function tasteScore(ex) {
    const w = state.taste.weights || {};
    return tasteKeys(ex).reduce((s, k) => s + (w[k] || 0), 0);
  }

  // Weighted shuffle: taste score plus jitter, so liked traits lead but variety stays.
  function tasteBiasedOrder(pool) {
    return pool
      .map((ex) => ({ ex, s: tasteScore(ex) + Math.random() * 3 }))
      .sort((a, b) => b.s - a.s)
      .map((o) => o.ex);
  }

  function buildDeck() {
    const pool = eligiblePool();
    deck = state.taste.swipes >= TASTE_MIN_SWIPES ? tasteBiasedOrder(pool) : shuffle(pool);
    deckIndex = 0;
    swipeHistory = [];
    deckBuilt = true;
    deckMode = "browse";
    sessionSetsDefault = "";
    renderDeck();
  }

  // ── Workout generation (Phase C) ─────────────────────────
  // Deterministic-ish heuristics over the metadata: goal → focus/difficulty bias +
  // set/rep scheme, time → session size, then a muscle-group round-robin for balance.
  function goalScore(ex, cfg) {
    let s = 0;
    const focus = ex.focus || [];
    (cfg.focus || []).forEach((f) => { if (focus.includes(f)) s += 3; });
    if (cfg.preferMechanic && ex.mechanic === cfg.preferMechanic) s += 1.5;
    if (cfg.maxDifficulty === "Beginner") {
      if (ex.difficulty === "Beginner") s += 2;
      else if (ex.difficulty === "Advanced") s -= 3;
    }
    return s;
  }

  function generateSession() {
    const cfg = GOAL_CONFIG[state.onboarding.goal] || {};
    const count = TIME_COUNT[state.onboarding.timeAvailable] || 6;
    const inRoutine = new Set(state.routine.map((r) => r.id));
    let pool = EXERCISES.filter(
      (ex) => ownsGear(ex) && passesConditions(ex) && !inRoutine.has(ex.id)
    );
    // Honor today's muscle-group picks if any; otherwise build a full-body session.
    const groups = state.filters.groups;
    if (groups.length) pool = pool.filter((ex) => groups.includes(ex.muscleGroup));
    if (!pool.length) return [];

    const scored = pool
      .map((ex) => ({ ex, score: goalScore(ex, cfg) + tasteScore(ex) * 0.5 + Math.random() * 2 }))
      .sort((a, b) => b.score - a.score);

    // Bucket by muscle group (each bucket already best-first), group order = best rep first.
    const byGroup = {};
    const groupOrder = [];
    scored.forEach(({ ex }) => {
      if (!byGroup[ex.muscleGroup]) { byGroup[ex.muscleGroup] = []; groupOrder.push(ex.muscleGroup); }
      byGroup[ex.muscleGroup].push(ex);
    });

    // Round-robin across groups for balanced pattern/muscle coverage.
    const picked = [];
    let i = 0;
    while (picked.length < count && groupOrder.some((g) => byGroup[g].length)) {
      const g = groupOrder[i % groupOrder.length];
      if (byGroup[g].length) picked.push(byGroup[g].shift());
      i++;
    }
    return picked.slice(0, count);
  }

  function startGeneratedSession() {
    const session = generateSession();
    if (!session.length) {
      updateGenerateUI("No matching moves — add gear or clear an injury filter.");
      return;
    }
    const cfg = GOAL_CONFIG[state.onboarding.goal] || {};
    deck = session;
    deckIndex = 0;
    swipeHistory = [];
    deckBuilt = true;
    deckMode = "generated";
    sessionSetsDefault = cfg.setsReps || "";
    renderDeck();
    showScreen("deck");
  }

  function matchesFilters(ex) {
    const groups = state.filters.groups;
    return (
      (groups.length === 0 || groups.includes(ex.muscleGroup)) &&
      ownsGear(ex) &&
      passesConditions(ex)
    );
  }

  // Safety: if a condition (or gear/group) is toggled mid-session, purge the now-
  // ineligible cards from the live deck immediately — never rely on the next
  // "Start swiping". Conditions are the safety-critical case; equipment/groups ride along.
  function purgeActiveDeck() {
    if (!deckBuilt) return;
    deck = deck.slice(0, deckIndex).concat(deck.slice(deckIndex).filter(matchesFilters));
    renderDeck();
  }

  // ── Screens ──────────────────────────────────────────────
  function showScreen(name) {
    currentScreen = name;
    $$(".screen").forEach((s) => { s.hidden = s.id !== "screen-" + name; });
    $$(".tab-btn").forEach((b) => b.classList.toggle("tab-active", b.dataset.screen === name));
    // The onboarding flow is full-screen: hide the tab bar so it can't be escaped mid-setup.
    $("#app").classList.toggle("onboarding-active", name === "onboarding");
    if (name === "deck") renderDeck();
    if (name === "routine") renderRoutine();
    if (name === "filters") { updateMatchCount(); updateGenerateUI(); }
    window.scrollTo(0, 0);
  }

  // ── Onboarding (Phase B first-run flow) ──────────────────
  const OB_STEPS = ["welcome", "goal", "time", "gear", "injuries"];
  let obIndex = 0;

  function startOnboarding() {
    obIndex = 0;
    showScreen("onboarding");
    renderOnboarding();
  }

  function finishOnboarding() {
    state.onboarding.completed = true;
    saveState();
    updateProfileSummaries();
    renderFilterChips();
    showScreen("filters");
  }

  function obStepShell(title, sub) {
    const wrap = el("div", "ob-step");
    wrap.appendChild(el("h1", "ob-title", title));
    if (sub) wrap.appendChild(el("p", "ob-sub", sub));
    return wrap;
  }

  function obWelcome() {
    const wrap = obStepShell("Welcome 👋",
      "Four quick questions and your deck is tuned to you. Change any answer later in Settings.");
    const list = el("ul", "ob-welcome-list");
    [["🎯", "Your goal"], ["⏱️", "How long you train"], ["🏋️", "The gear you have"], ["🛡️", "Anything to protect"]]
      .forEach(([ic, tx]) => {
        const li = el("li");
        li.appendChild(el("span", "ob-welcome-ic", ic));
        li.appendChild(document.createTextNode(tx));
        list.appendChild(li);
      });
    wrap.appendChild(list);
    return wrap;
  }

  function obSingleSelect(grid, btn) {
    grid.querySelectorAll(".ob-option").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
  }

  function obGoal() {
    const wrap = obStepShell("What's your main goal?", "Pick the one that fits best right now.");
    const grid = el("div", "ob-grid");
    GOALS.forEach((g) => {
      const btn = el("button", "ob-option");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.onboarding.goal === g.id));
      btn.appendChild(el("span", "ob-option-ic", g.icon));
      btn.appendChild(el("span", "ob-option-label", g.label));
      btn.addEventListener("click", () => {
        state.onboarding.goal = g.id;
        saveState();
        obSingleSelect(grid, btn);
      });
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function obTime() {
    const wrap = obStepShell("How long do you usually train?",
      "This sizes your generated sessions (coming soon).");
    const grid = el("div", "ob-grid ob-grid-time");
    TIME_OPTIONS.forEach((t) => {
      const btn = el("button", "ob-option ob-option-time");
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.onboarding.timeAvailable === t));
      btn.appendChild(el("span", "ob-option-big", String(t)));
      btn.appendChild(el("span", "ob-option-label", "min"));
      btn.addEventListener("click", () => {
        state.onboarding.timeAvailable = t;
        saveState();
        obSingleSelect(grid, btn);
      });
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function obGear() {
    const wrap = obStepShell("What gear do you have?",
      "Tap a preset, or fine-tune below. We only show moves you can actually do.");
    const presetRow = el("div", "preset-row");
    const chipRow = el("div", "chip-row");
    const syncPresets = () => {
      Array.from(presetRow.children).forEach((pb, idx) => {
        const p = GEAR_PRESETS[idx];
        pb.classList.toggle("preset-active",
          p.gear.length === state.filters.equipment.length &&
          p.gear.every((g) => state.filters.equipment.includes(g)));
      });
    };
    GEAR_PRESETS.forEach((preset) => {
      const btn = el("button", "preset-btn", preset.label);
      btn.type = "button";
      btn.addEventListener("click", () => {
        state.filters.equipment = preset.gear.slice();
        saveState();
        renderOnboarding();
      });
      presetRow.appendChild(btn);
    });
    EQUIPMENT.forEach((eq) => {
      const btn = el("button", "chip chip-equip", eq.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.filters.equipment.includes(eq.id)));
      btn.addEventListener("click", () => {
        const i = state.filters.equipment.indexOf(eq.id);
        if (i === -1) state.filters.equipment.push(eq.id);
        else state.filters.equipment.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
        syncPresets();
      });
      chipRow.appendChild(btn);
    });
    syncPresets();
    wrap.appendChild(presetRow);
    wrap.appendChild(chipRow);
    return wrap;
  }

  function obInjuries() {
    const wrap = obStepShell("Anything to protect?",
      "Toggle any that apply — we keep risky moves out of your deck before you see them. Skip if none.");
    const chipRow = el("div", "chip-row");
    CONDITIONS.forEach((c) => {
      const btn = el("button", "chip chip-cond", c.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.filters.conditions.includes(c.id)));
      btn.addEventListener("click", () => {
        const i = state.filters.conditions.indexOf(c.id);
        if (i === -1) state.filters.conditions.push(c.id);
        else state.filters.conditions.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
      });
      chipRow.appendChild(btn);
    });
    wrap.appendChild(chipRow);
    return wrap;
  }

  const OB_RENDERERS = { welcome: obWelcome, goal: obGoal, time: obTime, gear: obGear, injuries: obInjuries };

  function renderOnboarding() {
    const step = OB_STEPS[obIndex];
    const body = $("#ob-body");
    body.innerHTML = "";
    $("#ob-progress-bar").style.width = ((obIndex + 1) / OB_STEPS.length) * 100 + "%";
    $("#ob-back").style.visibility = obIndex === 0 ? "hidden" : "visible";
    const last = obIndex === OB_STEPS.length - 1;
    $("#ob-next-label").textContent = step === "welcome" ? "Let's go" : last ? "Finish" : "Next";
    body.appendChild((OB_RENDERERS[step] || obWelcome)());
    window.scrollTo(0, 0);
  }

  function profileParts() {
    const parts = [];
    const g = state.onboarding.goal ? GOAL_BY_ID[state.onboarding.goal] : null;
    if (g) parts.push(g.icon + " " + g.label);
    if (state.onboarding.timeAvailable) parts.push("⏱️ " + state.onboarding.timeAvailable + " min");
    return parts;
  }

  function updateProfileSummaries() {
    const parts = profileParts();
    const sum = $("#profile-summary");
    if (sum) {
      if (parts.length) {
        sum.hidden = false;
        sum.innerHTML = "";
        parts.forEach((p) => sum.appendChild(el("span", "profile-chip", p)));
        sum.appendChild(el("span", "profile-edit", "Edit"));
      } else {
        sum.hidden = true;
      }
    }
    const sp = $("#settings-profile");
    if (sp) sp.textContent = parts.length ? parts.join("   ·   ") : "Not set yet — tap below to personalize your deck.";
    updateGenerateUI();
  }

  // The "Generate my session" button subtitle + the swipe-to-learn status line.
  function updateGenerateUI(message) {
    const sub = $("#generate-sub");
    if (sub) {
      const parts = [];
      if (state.onboarding.timeAvailable) parts.push(state.onboarding.timeAvailable + " min");
      const g = state.onboarding.goal ? GOAL_BY_ID[state.onboarding.goal] : null;
      if (g) parts.push(g.label);
      sub.textContent = parts.join(" · ") || "balanced";
    }
    const hint = $("#taste-hint");
    if (!hint) return;
    if (message) { hint.hidden = false; hint.textContent = message; return; }
    const n = state.taste.swipes || 0;
    if (n <= 0) { hint.hidden = true; return; }
    hint.hidden = false;
    hint.textContent = n >= TASTE_MIN_SWIPES
      ? "🧠 Decks are now tuned to your taste · " + n + " swipes"
      : "🧠 Learning your taste · " + n + "/" + TASTE_MIN_SWIPES + " swipes";
  }

  // ── Filters screen ───────────────────────────────────────
  function renderFilterChips() {
    const gWrap = $("#group-chips");
    gWrap.innerHTML = "";
    MUSCLE_GROUPS.forEach((g) => {
      const btn = el("button", "chip chip-group");
      btn.type = "button";
      btn.style.setProperty("--chip", g.color);
      btn.setAttribute("aria-pressed", String(state.filters.groups.includes(g.name)));
      btn.appendChild(el("span", "chip-dot"));
      btn.appendChild(document.createTextNode(g.name));
      btn.addEventListener("click", () => {
        const i = state.filters.groups.indexOf(g.name);
        if (i === -1) state.filters.groups.push(g.name);
        else state.filters.groups.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
        updateMatchCount();
      });
      gWrap.appendChild(btn);
    });

    const pWrap = $("#equipment-presets");
    if (pWrap) {
      pWrap.innerHTML = "";
      GEAR_PRESETS.forEach((preset) => {
        const btn = el("button", "preset-btn", preset.label);
        btn.type = "button";
        const active =
          preset.gear.length === state.filters.equipment.length &&
          preset.gear.every((g) => state.filters.equipment.includes(g));
        btn.classList.toggle("preset-active", active);
        btn.addEventListener("click", () => setEquipment(preset.gear.slice()));
        pWrap.appendChild(btn);
      });
    }

    const eWrap = $("#equipment-chips");
    if (eWrap) {
      eWrap.innerHTML = "";
      EQUIPMENT.forEach((eq) => {
        const btn = el("button", "chip chip-equip", eq.label);
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(state.filters.equipment.includes(eq.id)));
        btn.addEventListener("click", () => {
          const i = state.filters.equipment.indexOf(eq.id);
          if (i === -1) state.filters.equipment.push(eq.id);
          else state.filters.equipment.splice(i, 1);
          saveState();
          btn.setAttribute("aria-pressed", String(i === -1));
          renderPresetStates();
          purgeActiveDeck();
          updateMatchCount();
        });
        eWrap.appendChild(btn);
      });
    }

    const cWrap = $("#condition-chips");
    cWrap.innerHTML = "";
    CONDITIONS.forEach((c) => {
      const btn = el("button", "chip chip-cond", c.label);
      btn.type = "button";
      btn.setAttribute("aria-pressed", String(state.filters.conditions.includes(c.id)));
      btn.addEventListener("click", () => {
        const i = state.filters.conditions.indexOf(c.id);
        if (i === -1) state.filters.conditions.push(c.id);
        else state.filters.conditions.splice(i, 1);
        saveState();
        btn.setAttribute("aria-pressed", String(i === -1));
        purgeActiveDeck();
        updateMatchCount();
      });
      cWrap.appendChild(btn);
    });

    updateMatchCount();
  }

  function updateMatchCount() {
    const n = eligiblePool().length;
    $("#match-count").textContent = n === 1 ? "1 move" : n + " moves";
    $("#btn-start").disabled = n === 0;
  }

  function setAllGroups(all) {
    state.filters.groups = all ? MUSCLE_GROUPS.map((g) => g.name) : [];
    saveState();
    renderFilterChips();
  }

  function setEquipment(list) {
    state.filters.equipment = list;
    saveState();
    renderFilterChips();
    purgeActiveDeck();
    updateMatchCount();
  }

  // Refresh only the preset buttons' active state (after a single-chip toggle).
  function renderPresetStates() {
    const pWrap = $("#equipment-presets");
    if (!pWrap) return;
    Array.from(pWrap.children).forEach((btn, idx) => {
      const preset = GEAR_PRESETS[idx];
      if (!preset) return;
      const active =
        preset.gear.length === state.filters.equipment.length &&
        preset.gear.every((g) => state.filters.equipment.includes(g));
      btn.classList.toggle("preset-active", active);
    });
  }

  // ── Deck screen ──────────────────────────────────────────
  function renderDeck(returning) {
    const stage = $("#deck-stage");
    stage.querySelectorAll(".swipe-card:not(.flying)").forEach((c) => c.remove());

    const remaining = deck.length - deckIndex;
    $("#deck-nodeck").hidden = deckBuilt;
    $("#deck-empty").hidden = !(deckBuilt && remaining <= 0);
    $("#deck-counter").textContent =
      deckBuilt && remaining > 0 ? `${deckIndex + 1} / ${deck.length}` : "";
    const eyebrow = $(".deck-top .eyebrow");
    if (eyebrow) eyebrow.textContent = deckMode === "generated" ? "Your session" : "Flexr Deck";
    updateActionButtons();

    if (!deckBuilt || remaining <= 0) return;

    const visible = deck.slice(deckIndex, deckIndex + 3);
    // Theme the whole deck by the top card's muscle-group color, so the
    // deck header reads "red = chest day" at a glance as you swipe.
    const topGroup = GROUP_BY_NAME[visible[0].muscleGroup];
    $("#screen-deck").style.setProperty("--group-color", topGroup ? topGroup.color : "#888");
    for (let depth = visible.length - 1; depth >= 0; depth--) {
      const card = buildCard(visible[depth], depth);
      stage.appendChild(card);
      if (depth === 0) {
        attachSwipeHandlers(card);
        if (returning) card.classList.add("card-return");
      }
    }
  }

  function updateActionButtons() {
    const hasCard = deckBuilt && deckIndex < deck.length;
    $("#btn-save").disabled = !hasCard;
    $("#btn-skip").disabled = !hasCard;
    $("#btn-undo").disabled = swipeHistory.length === 0;
  }

  function groupPill(groupName) {
    const pill = el("span", "group-pill");
    pill.appendChild(el("span", "dot"));
    pill.appendChild(document.createTextNode(groupName));
    return pill;
  }

  function buildCard(ex, depth) {
    const group = GROUP_BY_NAME[ex.muscleGroup] || { color: "#888" };
    const card = el("article", "swipe-card");
    card.dataset.id = ex.id;
    card.style.setProperty("--depth", depth);
    card.style.setProperty("--group-color", group.color);
    // Primary group tints the card; the first secondary muscle (if any) tints the
    // exercise-name text, so a multi-muscle move shows both groups at a glance.
    const secGroup = (ex.secondaryMuscles || [])
      .map((m) => GROUP_BY_NAME[m])
      .find((g) => g && g.name !== ex.muscleGroup);
    if (secGroup) {
      card.style.setProperty("--secondary-color", secGroup.color);
      card.dataset.hasSecondary = "true";
    }

    const inner = el("div", "card-inner");

    // Front
    const front = el("div", "card-face card-front");
    front.appendChild(el("div", "stamp stamp-save", "SAVE"));
    front.appendChild(el("div", "stamp stamp-skip", "SKIP"));
    const visual = el("div", "card-visual");
    visual.appendChild(el("span", "card-emoji", ex.icon || "💪"));
    front.appendChild(visual);
    const body = el("div", "card-body");
    body.appendChild(groupPill(ex.muscleGroup));
    body.appendChild(el("h2", "card-name", ex.name));
    body.appendChild(el("p", "card-cue", ex.cue));
    const tags = el("div", "tag-row");
    equipOf(ex).forEach((e) => tags.appendChild(el("span", "tag", EQUIP_LABEL[e] || e)));
    tags.appendChild(el("span", "tag diff-" + ex.difficulty.toLowerCase(), ex.difficulty));
    body.appendChild(tags);
    front.appendChild(body);
    front.appendChild(el("span", "flip-hint", "Tap for details"));

    // Back
    const back = el("div", "card-face card-back");
    back.appendChild(groupPill(ex.muscleGroup));
    back.appendChild(el("h2", "card-name card-name-sm", ex.name));
    back.appendChild(el("p", "card-desc", ex.description));
    if (ex.secondaryMuscles && ex.secondaryMuscles.length) {
      back.appendChild(el("p", "card-meta", "Also works: " + ex.secondaryMuscles.join(", ")));
    }
    if (ex.avoidIf && ex.avoidIf.length) {
      const labels = ex.avoidIf.map((t) => (CONDITION_BY_ID[t] ? CONDITION_BY_ID[t].label : t));
      back.appendChild(el("p", "card-flags", "⚠ Flagged for: " + labels.join(" · ")));
    }
    back.appendChild(el("span", "flip-hint", "Tap to flip back"));

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    return card;
  }

  function topCard() {
    const cards = $$("#deck-stage .swipe-card:not(.flying)");
    return cards.length ? cards[cards.length - 1] : null;
  }

  // ── Swiping (pointer events — works for touch and mouse) ──
  function attachSwipeHandlers(card) {
    let active = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let dy = 0;
    let t0 = 0;
    const saveStamp = card.querySelector(".stamp-save");
    const skipStamp = card.querySelector(".stamp-skip");

    const reset = () => {
      card.style.transform = "";
      saveStamp.style.opacity = "";
      skipStamp.style.opacity = "";
    };

    card.addEventListener("pointerdown", (e) => {
      if (card.classList.contains("flying")) return;
      active = true;
      moved = false;
      dx = 0;
      dy = 0;
      startX = e.clientX;
      startY = e.clientY;
      t0 = performance.now();
      card.classList.add("dragging");
      try { card.setPointerCapture(e.pointerId); } catch (_) { /* older browsers */ }
    });

    card.addEventListener("pointermove", (e) => {
      if (!active) return;
      dx = e.clientX - startX;
      dy = e.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 10) moved = true;
      if (!moved) return;
      card.style.transform = `translate(${dx}px, ${dy * 0.3}px) rotate(${dx * 0.055}deg)`;
      const k = Math.min(Math.abs(dx) / 90, 1);
      saveStamp.style.opacity = dx > 0 ? k : 0;
      skipStamp.style.opacity = dx < 0 ? k : 0;
    });

    card.addEventListener("pointerup", () => {
      if (!active) return;
      active = false;
      card.classList.remove("dragging");
      const dt = performance.now() - t0;
      if (!moved) {
        reset();
        if (dt < 600) card.classList.toggle("flipped");
        return;
      }
      const threshold = Math.min(130, card.offsetWidth * 0.35);
      if (dx > threshold) commitSwipe(card, "save", dy);
      else if (dx < -threshold) commitSwipe(card, "skip", dy);
      else reset();
    });

    card.addEventListener("pointercancel", () => {
      if (!active) return;
      active = false;
      card.classList.remove("dragging");
      reset();
    });
  }

  function commitSwipe(card, action, lastDy = 0) {
    if (card.classList.contains("flying")) return;
    const ex = EX_BY_ID[card.dataset.id];
    if (!ex) return;

    if (action === "save") addToRoutine(ex.id, sessionSetsDefault);
    else sessionSkipped.add(ex.id);
    recordTaste(ex, action);
    saveState();
    swipeHistory.push({ id: ex.id, action });
    deckIndex++;

    card.classList.add("flying");
    const dir = action === "save" ? 1 : -1;
    const flyX = dir * (window.innerWidth * 1.1 + 200);
    card.style.transform = `translate(${flyX}px, ${lastDy * 0.3}px) rotate(${dir * 24}deg)`;
    card.style.opacity = "0";
    const stamp = card.querySelector(action === "save" ? ".stamp-save" : ".stamp-skip");
    if (stamp) stamp.style.opacity = "1";
    setTimeout(() => card.remove(), 420);

    renderDeck();
  }

  function undoSwipe() {
    if (!swipeHistory.length) return;
    const last = swipeHistory.pop();
    if (last.action === "save") removeFromRoutine(last.id);
    else sessionSkipped.delete(last.id);
    const ex = EX_BY_ID[last.id];
    if (ex) { // roll back the taste nudge this swipe made
      const w = state.taste.weights;
      const delta = last.action === "save" ? -1 : 0.4;
      tasteKeys(ex).forEach((k) => { w[k] = (w[k] || 0) + delta; });
      state.taste.swipes = Math.max(0, (state.taste.swipes || 0) - 1);
      saveState();
    }
    deckIndex = Math.max(0, deckIndex - 1);
    renderDeck(true);
  }

  // ── Routine ──────────────────────────────────────────────
  function addToRoutine(id, sets) {
    if (state.routine.some((r) => r.id === id)) return;
    state.routine.push({ id, sets: sets || "", notes: "" });
    saveState();
  }

  function removeFromRoutine(id) {
    state.routine = state.routine.filter((r) => r.id !== id);
    saveState();
  }

  function moveInGroup(id, dir) {
    const ex = EX_BY_ID[id];
    if (!ex) return;
    const groupItems = state.routine.filter(
      (r) => EX_BY_ID[r.id] && EX_BY_ID[r.id].muscleGroup === ex.muscleGroup
    );
    const pos = groupItems.findIndex((r) => r.id === id);
    const other = groupItems[pos + dir];
    if (!other) return;
    const i = state.routine.findIndex((r) => r.id === id);
    const j = state.routine.findIndex((r) => r.id === other.id);
    const tmp = state.routine[i];
    state.routine[i] = state.routine[j];
    state.routine[j] = tmp;
    saveState();
    renderRoutine();
  }

  function routineItemEl(entry, groupItems) {
    const ex = EX_BY_ID[entry.id];
    const group = ex ? GROUP_BY_NAME[ex.muscleGroup] : null;
    const item = el("div", "routine-item");
    if (group) item.style.setProperty("--group-color", group.color);

    const top = el("div", "routine-item-top");
    top.appendChild(el("span", "routine-item-icon", ex ? ex.icon : "❓"));
    const name = el("span", "routine-item-name", ex ? ex.name : "(no longer in the library)");
    if (ex) name.appendChild(el("span", "routine-item-equip", equipOf(ex).map((e) => EQUIP_LABEL[e] || e).join(" · ") + " · " + ex.difficulty));
    top.appendChild(name);

    if (ex) {
      const pos = groupItems.findIndex((r) => r.id === entry.id);
      const up = el("button", "icon-btn", "↑");
      up.type = "button";
      up.setAttribute("aria-label", "Move " + ex.name + " up");
      up.disabled = pos === 0;
      up.addEventListener("click", () => moveInGroup(entry.id, -1));
      const down = el("button", "icon-btn", "↓");
      down.type = "button";
      down.setAttribute("aria-label", "Move " + ex.name + " down");
      down.disabled = pos === groupItems.length - 1;
      down.addEventListener("click", () => moveInGroup(entry.id, 1));
      top.appendChild(up);
      top.appendChild(down);
    }

    const remove = el("button", "icon-btn remove", "✕");
    remove.type = "button";
    remove.setAttribute("aria-label", "Remove " + (ex ? ex.name : "exercise") + " from routine");
    remove.addEventListener("click", () => {
      removeFromRoutine(entry.id);
      renderRoutine();
    });
    top.appendChild(remove);
    item.appendChild(top);

    const fields = el("div", "routine-item-fields");
    const sets = el("input", "sets-input");
    sets.placeholder = "3x12";
    sets.maxLength = 20;
    sets.value = entry.sets;
    sets.setAttribute("aria-label", "Sets and reps");
    sets.addEventListener("input", () => { entry.sets = sets.value; scheduleSave(); });
    const notes = el("input", "notes-input");
    notes.placeholder = "Notes — e.g. keep elbows tucked";
    notes.maxLength = 200;
    notes.value = entry.notes;
    notes.setAttribute("aria-label", "Notes");
    notes.addEventListener("input", () => { entry.notes = notes.value; scheduleSave(); });
    fields.appendChild(sets);
    fields.appendChild(notes);
    item.appendChild(fields);

    return item;
  }

  function renderRoutine() {
    const wrap = $("#routine-groups");
    wrap.innerHTML = "";
    const items = state.routine;
    const n = items.length;
    $("#routine-count").textContent = n ? n + (n === 1 ? " exercise" : " exercises") : "";
    $("#routine-empty").hidden = n > 0;
    $("#btn-clear-routine").hidden = n === 0;
    if (!n) return;

    MUSCLE_GROUPS.forEach((g) => {
      const groupItems = items.filter(
        (r) => EX_BY_ID[r.id] && EX_BY_ID[r.id].muscleGroup === g.name
      );
      if (!groupItems.length) return;
      const section = el("section", "routine-group");
      const head = el("h3", "routine-group-head");
      head.style.setProperty("--group-color", g.color);
      head.appendChild(el("span", "dot"));
      head.appendChild(document.createTextNode(g.name + " "));
      head.appendChild(el("span", "group-count", "· " + groupItems.length));
      section.appendChild(head);
      groupItems.forEach((entry) => section.appendChild(routineItemEl(entry, groupItems)));
      wrap.appendChild(section);
    });

    // Entries whose exercise id vanished from a future dataset — still removable.
    const orphans = items.filter((r) => !EX_BY_ID[r.id]);
    if (orphans.length) {
      const section = el("section", "routine-group");
      const head = el("h3", "routine-group-head");
      head.appendChild(el("span", "dot"));
      head.appendChild(document.createTextNode("No longer in the library"));
      section.appendChild(head);
      orphans.forEach((entry) => section.appendChild(routineItemEl(entry, orphans)));
      wrap.appendChild(section);
    }
  }

  // ── Modal (custom confirm — never window.confirm) ────────
  let modalConfirmAction = null;

  function showModal(opts) {
    $("#modal-title").textContent = opts.title;
    $("#modal-text").textContent = opts.text;
    $("#modal-confirm").textContent = opts.confirmLabel || "Confirm";
    modalConfirmAction = opts.onConfirm || null;
    $("#modal").hidden = false;
    $("#modal-cancel").focus();
  }

  function hideModal() {
    $("#modal").hidden = true;
    modalConfirmAction = null;
  }

  // ── Theme ────────────────────────────────────────────────
  function resolvedTheme() {
    if (state.theme === "light" || state.theme === "dark") return state.theme;
    try {
      return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (_) {
      return "light";
    }
  }

  function applyTheme() {
    const mode = resolvedTheme();
    document.documentElement.dataset.theme = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = mode === "dark" ? "#0a0b0d" : "#f4f5f7";
    $$(".seg-btn").forEach((b) =>
      b.classList.toggle("seg-active", b.dataset.themeChoice === state.theme)
    );
  }

  // ── Export ───────────────────────────────────────────────
  function exportString() {
    const payload = Object.assign(
      { app: "FitFlexr", exportedAt: new Date().toISOString() },
      state
    );
    return JSON.stringify(payload, null, 2);
  }

  function downloadExport() {
    const blob = new Blob([exportString()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fitflexr-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ── Wiring ───────────────────────────────────────────────
  function wireEvents() {
    $$(".tab-btn").forEach((b) => b.addEventListener("click", () => showScreen(b.dataset.screen)));

    // Onboarding wizard nav
    $("#ob-next").addEventListener("click", () => {
      if (obIndex >= OB_STEPS.length - 1) finishOnboarding();
      else { obIndex++; renderOnboarding(); }
    });
    $("#ob-back").addEventListener("click", () => {
      if (obIndex > 0) { obIndex--; renderOnboarding(); }
    });
    $("#ob-skip").addEventListener("click", finishOnboarding);
    $("#btn-redo-onboarding").addEventListener("click", startOnboarding);
    $("#profile-summary").addEventListener("click", startOnboarding);

    $("#btn-generate").addEventListener("click", startGeneratedSession);

    $("#btn-groups-all").addEventListener("click", () => setAllGroups(true));
    $("#btn-groups-none").addEventListener("click", () => setAllGroups(false));
    $("#btn-start").addEventListener("click", () => {
      buildDeck();
      showScreen("deck");
    });

    $("#btn-save").addEventListener("click", () => {
      const card = topCard();
      if (card) commitSwipe(card, "save");
    });
    $("#btn-skip").addEventListener("click", () => {
      const card = topCard();
      if (card) commitSwipe(card, "skip");
    });
    $("#btn-undo").addEventListener("click", undoSwipe);

    $("#btn-nodeck-filters").addEventListener("click", () => showScreen("filters"));
    $("#btn-empty-filters").addEventListener("click", () => showScreen("filters"));
    $("#btn-empty-routine").addEventListener("click", () => showScreen("routine"));
    $("#btn-routine-swipe").addEventListener("click", () => showScreen("deck"));

    $("#btn-clear-routine").addEventListener("click", () =>
      showModal({
        title: "Clear your FitFlex Stack?",
        text: "This removes every saved exercise plus their sets and notes. There's no undo — export from Settings first if you want a backup.",
        confirmLabel: "Clear everything",
        onConfirm: () => {
          state.routine = [];
          saveState();
          renderRoutine();
        },
      })
    );

    $("#modal-cancel").addEventListener("click", hideModal);
    $("#modal-confirm").addEventListener("click", () => {
      const fn = modalConfirmAction;
      hideModal();
      if (fn) fn();
    });
    $("#modal").addEventListener("click", (e) => {
      if (e.target === $("#modal")) hideModal();
    });

    $$(".seg-btn").forEach((b) =>
      b.addEventListener("click", () => {
        state.theme = b.dataset.themeChoice;
        saveState();
        applyTheme();
      })
    );
    try {
      matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (state.theme === "system") applyTheme();
      });
    } catch (_) { /* older Safari */ }

    $("#btn-open-filters").addEventListener("click", () => showScreen("filters"));
    $("#btn-export").addEventListener("click", downloadExport);

    // Keyboard support: arrows to swipe, U to undo, F/space to flip.
    document.addEventListener("keydown", (e) => {
      if (!$("#modal").hidden) {
        if (e.key === "Escape") hideModal();
        return;
      }
      if (currentScreen !== "deck") return;
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      const card = topCard();
      if (e.key === "ArrowRight" && card) {
        e.preventDefault();
        commitSwipe(card, "save");
      } else if (e.key === "ArrowLeft" && card) {
        e.preventDefault();
        commitSwipe(card, "skip");
      } else if ((e.key === "f" || e.key === "F" || e.key === " ") && card) {
        e.preventDefault();
        card.classList.toggle("flipped");
      } else if (e.key === "u" || e.key === "U") {
        undoSwipe();
      }
    });

    // Flush any debounced field edits if the tab closes mid-typing.
    window.addEventListener("pagehide", () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveState();
      }
    });
  }

  // ── Service worker (defensive: file:// must never throw) ──
  function registerServiceWorker() {
    try {
      if (!("serviceWorker" in navigator)) return;
      if (location.protocol !== "http:" && location.protocol !== "https:") return;
      navigator.serviceWorker
        .register("./sw.js")
        .catch((err) => console.warn("FitFlexr: service worker registration failed.", err));
    } catch (err) {
      console.warn("FitFlexr: service worker registration skipped.", err);
    }
  }

  // ── Boot ─────────────────────────────────────────────────
  function renderAboutStats() {
    $("#about-stats").textContent =
      EXERCISES.length + " exercises · " + MUSCLE_GROUPS.length +
      " muscle groups · " + CONDITIONS.length + " conditions · all data on-device";
  }

  validateDataset();
  applyTheme();
  renderFilterChips();
  renderAboutStats();
  renderRoutine();
  updateProfileSummaries();
  wireEvents();
  // First run → onboarding; returning users land on the setup screen.
  if (!state.onboarding.completed) startOnboarding();
  else showScreen("filters");
  registerServiceWorker();

  // Read-only handle for scripted smoke tests (see CLAUDE.md checklist).
  window.FitFlexrDebug = {
    get deckRemaining() { return deck.slice(deckIndex); },
    get sessionSkipped() { return Array.from(sessionSkipped); },
    get state() { return JSON.parse(JSON.stringify(state)); },
    exportString,
    validateDataset,
  };
})();
