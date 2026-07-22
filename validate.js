#!/usr/bin/env node
/*
 * SwipeFit dataset validator — the scripted gate for smoke-test item 4.
 * Run: node validate.js   (exits 1 on any contract violation)
 */
"use strict";

const { MUSCLE_GROUPS, EQUIPMENT, CONDITIONS, EXERCISES } = require("./exercises.js");

const EXPECTED_CONDITION_IDS = [
  "lower-back", "knee", "shoulder", "wrist", "neck",
  "hip", "high-impact", "balance", "pregnancy",
];
// Matt's home setup: the library must stay Bodyweight/Dumbbell only. If EQUIPMENT
// ever grows, this check follows it automatically.
const ALLOWED_EQUIPMENT = EQUIPMENT;
const DIFFICULTY = ["Beginner", "Intermediate", "Advanced"];
const REQUIRED_FIELDS = ["id", "name", "muscleGroup", "secondaryMuscles", "equipment", "difficulty", "cue", "description", "avoidIf", "icon"];

const errors = [];
const groupNames = new Set(MUSCLE_GROUPS.map((g) => g.name));
const conditionIds = new Set(CONDITIONS.map((c) => c.id));

// 1. Conditions contract: exactly the expected ids.
for (const id of EXPECTED_CONDITION_IDS) {
  if (!conditionIds.has(id)) errors.push(`conditions: missing required id "${id}"`);
}
for (const c of CONDITIONS) {
  if (!EXPECTED_CONDITION_IDS.includes(c.id)) errors.push(`conditions: unexpected id "${c.id}"`);
  if (!c.label || typeof c.label !== "string") errors.push(`conditions: "${c.id}" has no label`);
}

// 2. Per-exercise checks.
const seenIds = new Set();
for (const ex of EXERCISES) {
  const where = ex.id || ex.name || "(unnamed exercise)";
  for (const field of REQUIRED_FIELDS) {
    if (ex[field] === undefined) errors.push(`${where}: missing field "${field}"`);
  }
  if (seenIds.has(ex.id)) errors.push(`${where}: duplicate id`);
  seenIds.add(ex.id);
  if (ex.id && !/^[a-z0-9-]+$/.test(ex.id)) errors.push(`${where}: id isn't kebab-case`);
  if (!groupNames.has(ex.muscleGroup)) errors.push(`${where}: unknown muscleGroup "${ex.muscleGroup}"`);
  for (const m of ex.secondaryMuscles || []) {
    if (!groupNames.has(m)) errors.push(`${where}: unknown secondary muscle "${m}"`);
  }
  if (!ALLOWED_EQUIPMENT.includes(ex.equipment)) errors.push(`${where}: equipment "${ex.equipment}" not in EQUIPMENT (Bodyweight/Dumbbell only)`);
  if (!DIFFICULTY.includes(ex.difficulty)) errors.push(`${where}: unknown difficulty "${ex.difficulty}"`);
  for (const tag of ex.avoidIf || []) {
    if (!conditionIds.has(tag)) errors.push(`${where}: avoidIf tag "${tag}" not in conditions list`);
  }
}

// 3. Library size and spread.
if (EXERCISES.length < 150 || EXERCISES.length > 260) {
  errors.push(`library size ${EXERCISES.length} outside the 150–260 target`);
}
const perGroup = {};
for (const g of groupNames) perGroup[g] = 0;
for (const ex of EXERCISES) if (perGroup[ex.muscleGroup] !== undefined) perGroup[ex.muscleGroup]++;
for (const [g, n] of Object.entries(perGroup)) {
  if (n < 5) errors.push(`muscle group "${g}" has only ${n} exercises (minimum 5)`);
}

// 4. Equipment spread (informational + guard that both types are represented).
const perEquip = {};
for (const e of ALLOWED_EQUIPMENT) perEquip[e] = 0;
for (const ex of EXERCISES) if (perEquip[ex.equipment] !== undefined) perEquip[ex.equipment]++;
for (const [e, n] of Object.entries(perEquip)) {
  if (n === 0) errors.push(`no exercises use equipment "${e}"`);
}

// Report.
console.log(`SwipeFit dataset: ${EXERCISES.length} exercises, ${CONDITIONS.length} conditions, ${MUSCLE_GROUPS.length} groups`);
console.log("Per group: " + Object.entries(perGroup).map(([g, n]) => `${g} ${n}`).join(" · "));
console.log("Per equipment: " + Object.entries(perEquip).map(([e, n]) => `${e} ${n}`).join(" · "));
if (errors.length) {
  console.error(`\nFAIL — ${errors.length} problem(s):`);
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
} else {
  console.log("\nOK — all avoidIf tags match the conditions list; all contracts hold.");
}
