/*
 * SwipeFit app logic. Data (MUSCLE_GROUPS, CONDITIONS, EXERCISES) comes from
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

  // ── Persistent state (localStorage, schema-versioned) ────
  const STORAGE_KEY = "swipefit";
  const SCHEMA_VERSION = 2;
  const EQUIPMENT_SET = new Set(EQUIPMENT);

  const defaultState = () => ({
    schemaVersion: SCHEMA_VERSION,
    // equipment defaults to everything owned (all of EQUIPMENT); empty === all, like groups.
    filters: { groups: [], equipment: EQUIPMENT.slice(), conditions: [] },
    routine: [], // [{ id, sets, notes }] — references exercises by permanent id only
    theme: "dark",
  });

  function migrate(data) {
    if (!data || typeof data !== "object") return defaultState();
    const out = defaultState();
    const fromVersion = typeof data.schemaVersion === "number" ? data.schemaVersion : 1;
    const filters = data.filters || {};
    out.filters.groups = Array.isArray(filters.groups)
      ? filters.groups.filter((g) => GROUP_BY_NAME[g]) : [];
    out.filters.equipment = Array.isArray(filters.equipment)
      ? filters.equipment.filter((e) => EQUIPMENT_SET.has(e)) : EQUIPMENT.slice();
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
      console.warn("SwipeFit: couldn't read saved data, starting fresh.", err);
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("SwipeFit: couldn't save data.", err);
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
      console.warn("SwipeFit dataset problems:\n" + problems.join("\n"));
    }
    return problems;
  }

  // ── Deck building ────────────────────────────────────────
  function passesConditions(ex) {
    return !ex.avoidIf.some((tag) => state.filters.conditions.includes(tag));
  }

  function eligiblePool() {
    const groups = state.filters.groups;
    const equip = state.filters.equipment;
    const inRoutine = new Set(state.routine.map((r) => r.id));
    return EXERCISES.filter(
      (ex) =>
        (groups.length === 0 || groups.includes(ex.muscleGroup)) &&
        (equip.length === 0 || equip.includes(ex.equipment)) &&
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

  function buildDeck() {
    deck = shuffle(eligiblePool());
    deckIndex = 0;
    swipeHistory = [];
    deckBuilt = true;
    renderDeck();
  }

  function matchesFilters(ex) {
    const groups = state.filters.groups;
    const equip = state.filters.equipment;
    return (
      (groups.length === 0 || groups.includes(ex.muscleGroup)) &&
      (equip.length === 0 || equip.includes(ex.equipment)) &&
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
    if (name === "deck") renderDeck();
    if (name === "routine") renderRoutine();
    if (name === "filters") updateMatchCount();
    window.scrollTo(0, 0);
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

    const eWrap = $("#equipment-chips");
    if (eWrap) {
      eWrap.innerHTML = "";
      EQUIPMENT.forEach((name) => {
        const btn = el("button", "chip chip-equip", name);
        btn.type = "button";
        btn.setAttribute("aria-pressed", String(state.filters.equipment.includes(name)));
        btn.addEventListener("click", () => {
          const i = state.filters.equipment.indexOf(name);
          if (i === -1) state.filters.equipment.push(name);
          else state.filters.equipment.splice(i, 1);
          saveState();
          btn.setAttribute("aria-pressed", String(i === -1));
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

  // ── Deck screen ──────────────────────────────────────────
  function renderDeck(returning) {
    const stage = $("#deck-stage");
    stage.querySelectorAll(".swipe-card:not(.flying)").forEach((c) => c.remove());

    const remaining = deck.length - deckIndex;
    $("#deck-nodeck").hidden = deckBuilt;
    $("#deck-empty").hidden = !(deckBuilt && remaining <= 0);
    $("#deck-counter").textContent =
      deckBuilt && remaining > 0 ? `${deckIndex + 1} / ${deck.length}` : "";
    updateActionButtons();

    if (!deckBuilt || remaining <= 0) return;

    const visible = deck.slice(deckIndex, deckIndex + 3);
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
    tags.appendChild(el("span", "tag", ex.equipment));
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

    if (action === "save") addToRoutine(ex.id);
    else sessionSkipped.add(ex.id);
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
    deckIndex = Math.max(0, deckIndex - 1);
    renderDeck(true);
  }

  // ── Routine ──────────────────────────────────────────────
  function addToRoutine(id) {
    if (state.routine.some((r) => r.id === id)) return;
    state.routine.push({ id, sets: "", notes: "" });
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
    if (ex) name.appendChild(el("span", "routine-item-equip", ex.equipment + " · " + ex.difficulty));
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
      { app: "SwipeFit", exportedAt: new Date().toISOString() },
      state
    );
    return JSON.stringify(payload, null, 2);
  }

  function downloadExport() {
    const blob = new Blob([exportString()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "swipefit-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ── Wiring ───────────────────────────────────────────────
  function wireEvents() {
    $$(".tab-btn").forEach((b) => b.addEventListener("click", () => showScreen(b.dataset.screen)));

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
        title: "Clear My Routine?",
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
        .catch((err) => console.warn("SwipeFit: service worker registration failed.", err));
    } catch (err) {
      console.warn("SwipeFit: service worker registration skipped.", err);
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
  wireEvents();
  showScreen("filters");
  registerServiceWorker();

  // Read-only handle for scripted smoke tests (see CLAUDE.md checklist).
  window.SwipeFitDebug = {
    get deckRemaining() { return deck.slice(deckIndex); },
    get sessionSkipped() { return Array.from(sessionSkipped); },
    get state() { return JSON.parse(JSON.stringify(state)); },
    exportString,
    validateDataset,
  };
})();
