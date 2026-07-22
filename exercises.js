/*
 * SwipeFit dataset. Chest, Back, Shoulders fully produced (all equipment types). Remaining
 * groups are placeholders carried from the original 170 (equipment normalized to arrays),
 * replaced batch by batch. equipment = array of EQUIPMENT ids. Run `node validate.js`.
 */

const MUSCLE_GROUPS = [
  {
    "name": "Chest",
    "color": "#ff6b6b"
  },
  {
    "name": "Back",
    "color": "#4d9dff"
  },
  {
    "name": "Shoulders",
    "color": "#ffa62b"
  },
  {
    "name": "Biceps",
    "color": "#a98bff"
  },
  {
    "name": "Triceps",
    "color": "#ff74c3"
  },
  {
    "name": "Core/Abs",
    "color": "#2dd4bf"
  },
  {
    "name": "Glutes",
    "color": "#ff8f4d"
  },
  {
    "name": "Quads",
    "color": "#38bdf8"
  },
  {
    "name": "Hamstrings",
    "color": "#a3e635"
  },
  {
    "name": "Calves",
    "color": "#34d3e0"
  },
  {
    "name": "Full Body/Cardio",
    "color": "#8b7cff"
  }
];

const EQUIPMENT = [
  {
    "id": "bodyweight",
    "label": "Bodyweight"
  },
  {
    "id": "dumbbell",
    "label": "Dumbbells"
  },
  {
    "id": "bench",
    "label": "Bench"
  },
  {
    "id": "resistance-band",
    "label": "Resistance Band"
  },
  {
    "id": "kettlebell",
    "label": "Kettlebell"
  },
  {
    "id": "pull-up-bar",
    "label": "Pull-Up Bar"
  },
  {
    "id": "cable",
    "label": "Cable Machine"
  },
  {
    "id": "machine",
    "label": "Machine"
  },
  {
    "id": "barbell",
    "label": "Barbell"
  },
  {
    "id": "ez-bar",
    "label": "EZ Bar"
  },
  {
    "id": "trx",
    "label": "Suspension (TRX)"
  },
  {
    "id": "box",
    "label": "Box / Step"
  },
  {
    "id": "medicine-ball",
    "label": "Medicine Ball"
  },
  {
    "id": "ab-wheel",
    "label": "Ab Wheel"
  },
  {
    "id": "jump-rope",
    "label": "Jump Rope"
  }
];

const CONDITIONS = [
  {
    "id": "lower-back",
    "label": "Lower Back Issues"
  },
  {
    "id": "knee",
    "label": "Knee Issues"
  },
  {
    "id": "shoulder",
    "label": "Shoulder Issues"
  },
  {
    "id": "wrist",
    "label": "Wrist Issues"
  },
  {
    "id": "neck",
    "label": "Neck Issues"
  },
  {
    "id": "hip",
    "label": "Hip Issues"
  },
  {
    "id": "high-impact",
    "label": "High Impact / Jumping"
  },
  {
    "id": "balance",
    "label": "Balance Issues"
  },
  {
    "id": "pregnancy",
    "label": "Pregnancy"
  }
];

const EXERCISES = [
  {
    "id": "barbell-flat-bench-press",
    "name": "Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Plant your feet, keep your shoulder blades pinned, and press in a slight arc over your shoulders.",
    "description": "Lower the bar under control to the mid-chest before pressing to full extension. Avoid bouncing the bar off your chest or flaring your elbows excessively.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Flat Bench",
      "BB Bench Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-paused-bench-press",
    "name": "Paused Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Pause for one full second on your chest before driving the bar upward.",
    "description": "Control the descent, pause without relaxing, then press explosively. Avoid sinking the bar into your chest during the pause.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⏸️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Competition Bench",
      "Paused Bench"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-close-grip-bench-press",
    "name": "Close-Grip Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Grip just inside shoulder width and keep your elbows close throughout the press.",
    "description": "Lower the bar with control before pressing straight back up. Avoid gripping so narrowly that your wrists collapse inward.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Close Grip Bench",
      "CG Bench"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-incline-bench-press",
    "name": "Incline Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a low incline and press toward your upper chest while keeping your shoulders packed.",
    "description": "Lower the bar to your upper chest before pressing smoothly. Avoid using an excessively steep bench angle that shifts the work to your shoulders.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Incline BB Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-decline-bench-press",
    "name": "Decline Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Secure your legs and lower the bar to the lower chest before pressing upward.",
    "description": "Maintain control through the full range of motion. Avoid lifting your hips off the bench during the press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📉",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Decline BB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-flat-bench-press",
    "name": "Flat Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your wrists stacked over your elbows and press the dumbbells together at the top.",
    "description": "Lower each dumbbell evenly before pressing back to full extension. Avoid letting your elbows drop too far below the bench.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Bench Press",
      "Flat DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-incline-bench-press",
    "name": "Incline Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Set the bench around 30° and press slightly back toward your shoulders.",
    "description": "Lower the dumbbells until your upper arms are just below parallel before pressing up. Avoid shrugging your shoulders during the lift.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Press",
      "Incline Dumbbell Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-decline-bench-press",
    "name": "Decline Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep the dumbbells balanced directly over your lower chest throughout the press.",
    "description": "Press both dumbbells evenly while maintaining shoulder stability. Avoid letting the weights drift too far apart.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📉",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Decline DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-neutral-grip-bench-press",
    "name": "Neutral-Grip Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your palms facing each other and press while keeping your elbows tucked.",
    "description": "Move the dumbbells under control from chest level to full extension. Avoid rotating your wrists during the lift.",
    "avoidIf": [],
    "icon": "🤲",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Hammer Grip DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-squeeze-press",
    "name": "Dumbbell Squeeze Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep the dumbbells pressed together throughout every repetition.",
    "description": "Maintain inward pressure as you press and lower the weights. Avoid allowing the dumbbells to separate at the top.",
    "avoidIf": [],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Crush Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-flat-fly",
    "name": "Flat Dumbbell Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep a slight bend in your elbows and hug a wide barrel as you raise the weights.",
    "description": "Lower until you feel a comfortable chest stretch before returning to the top. Avoid turning the movement into a press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Fly",
      "Dumbbell Flye"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-incline-fly",
    "name": "Incline Dumbbell Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a shallow incline and maintain soft elbows throughout the movement.",
    "description": "Stretch under control before squeezing your chest to bring the weights together. Avoid lowering beyond your shoulder mobility.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Fly"
    ],
    "category": "strength"
  },
  {
    "id": "push-up",
    "name": "Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Maintain a straight line from head to heels and press the floor away.",
    "description": "Lower your chest under control before pushing back to full extension. Avoid letting your hips sag or flare your elbows excessively.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🤸",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Press-Up"
    ],
    "category": "strength"
  },
  {
    "id": "incline-push-up",
    "name": "Incline Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your body rigid while pressing away from the bench.",
    "description": "Lower your chest to the bench before pressing back up. Avoid allowing your lower back to arch.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "📐",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bench Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "decline-push-up",
    "name": "Decline Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Elevate your feet and keep your hips level throughout each repetition.",
    "description": "Lower your chest until just above the floor before pressing upward. Avoid shrugging your shoulders toward your ears.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "⬇️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Feet Elevated Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "knee-push-up",
    "name": "Knee Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Keep a straight line from your knees through your shoulders as you press.",
    "description": "Lower your chest under control before pressing back up. Avoid bending at the hips instead of moving as one unit.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🧎",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Modified Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "wide-push-up",
    "name": "Wide Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Place your hands wider than shoulder width and lower under control.",
    "description": "Press through your palms while keeping your body rigid. Avoid letting your elbows flare aggressively.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wide Grip Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "diamond-push-up",
    "name": "Diamond Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your hands close together beneath your chest and elbows tucked.",
    "description": "Lower until your chest nearly touches your hands before pressing up. Avoid collapsing your wrists inward.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "💎",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Close Push-Up",
      "Close-Grip Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "archer-push-up",
    "name": "Archer Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Shift your weight over one arm while keeping the opposite arm nearly straight.",
    "description": "Alternate sides while maintaining full-body tension. Avoid twisting your hips during the movement.",
    "avoidIf": [
      "wrist",
      "shoulder",
      "balance"
    ],
    "icon": "🏹",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Side-to-Side Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "pseudo-planche-push-up",
    "name": "Pseudo Planche Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Lean your shoulders past your hands before lowering under control.",
    "description": "Maintain the forward lean throughout the repetition. Avoid allowing your hips to sag.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "⚖️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Planche Lean Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "tempo-push-up",
    "name": "Tempo Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Take three to five seconds to lower before pressing up smoothly.",
    "description": "Maintain full-body tension through the slow eccentric. Avoid rushing the lowering phase.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "⏱️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Slow Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "deficit-push-up",
    "name": "Deficit Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower deeper between the supports while maintaining shoulder control.",
    "description": "Increase range of motion without losing stability. Avoid dropping into painful shoulder positions.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "⬇️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Deep Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "wall-push-up",
    "name": "Wall Push-Up",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Stand tall and lower yourself toward the wall in one straight line.",
    "description": "Push away from the wall without shrugging your shoulders. Avoid bending only at the hips.",
    "avoidIf": [],
    "icon": "🧱",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing Wall Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "chest-dip",
    "name": "Chest Dip",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean slightly forward as you lower and press back to the top.",
    "description": "Keep your elbows tracking naturally through the movement. Avoid dropping deeper than your shoulder mobility allows.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "📉",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Dip"
    ],
    "category": "strength"
  },
  {
    "id": "band-chest-press",
    "name": "Resistance Band Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Press straight forward while keeping tension in the band throughout.",
    "description": "Control both the press and the return phase. Avoid allowing the band to snap you backward.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Press"
    ],
    "category": "strength"
  },
  {
    "id": "band-chest-fly",
    "name": "Resistance Band Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Sweep your arms together in a hugging motion while keeping soft elbows.",
    "description": "Maintain constant band tension throughout each repetition. Avoid turning the movement into a press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Fly"
    ],
    "category": "strength"
  },
  {
    "id": "band-high-to-low-crossover",
    "name": "High-to-Low Band Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull downward and inward while squeezing your lower chest.",
    "description": "Control the return without losing posture. Avoid shrugging during the crossover.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band High Crossover"
    ],
    "category": "strength"
  },
  {
    "id": "band-low-to-high-crossover",
    "name": "Low-to-High Band Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive your hands upward in a smooth arc toward eye level.",
    "description": "Squeeze your upper chest at the top of each repetition. Avoid arching your lower back.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Low Crossover"
    ],
    "category": "strength"
  },
  {
    "id": "band-incline-chest-press",
    "name": "Incline Resistance Band Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Press upward at roughly a 30-degree angle while maintaining tension.",
    "description": "Control both directions of the movement. Avoid shrugging your shoulders as you press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Incline Press"
    ],
    "category": "strength"
  },
  {
    "id": "cable-chest-fly",
    "name": "Cable Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Bring the handles together in a wide hugging motion.",
    "description": "Maintain a slight bend in your elbows throughout. Avoid allowing the weights to slam together.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Fly"
    ],
    "category": "strength"
  },
  {
    "id": "high-cable-crossover",
    "name": "High Cable Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the handles downward toward your waist in a controlled arc.",
    "description": "Squeeze your chest at the bottom before returning slowly. Avoid using momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "High Cable Fly"
    ],
    "category": "strength"
  },
  {
    "id": "low-cable-crossover",
    "name": "Low Cable Crossover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Sweep the handles upward until they meet in front of your upper chest.",
    "description": "Move smoothly through the entire range of motion. Avoid leaning backward excessively.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Low Cable Fly"
    ],
    "category": "strength"
  },
  {
    "id": "cable-chest-press",
    "name": "Cable Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Press forward while maintaining even cable tension on both sides.",
    "description": "Keep your torso stable throughout the movement. Avoid stepping too far forward.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Standing Cable Press"
    ],
    "category": "strength"
  },
  {
    "id": "incline-cable-chest-press",
    "name": "Incline Cable Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Press upward from a low cable position while keeping your core braced.",
    "description": "Drive the handles toward your upper chest line. Avoid shrugging your shoulders during the press.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Low Cable Press"
    ],
    "category": "strength"
  },
  {
    "id": "machine-chest-press",
    "name": "Machine Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Adjust the seat so the handles start at mid-chest height.",
    "description": "Press smoothly without locking your elbows forcefully. Avoid lifting your shoulders toward your ears.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Chest Press Machine"
    ],
    "category": "strength"
  },
  {
    "id": "pec-deck-fly",
    "name": "Pec Deck Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Bring the pads together while keeping a gentle bend in your elbows.",
    "description": "Pause briefly at peak contraction before returning slowly. Avoid bouncing the weight stack.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🦋",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Fly"
    ],
    "category": "strength"
  },
  {
    "id": "incline-machine-chest-press",
    "name": "Incline Machine Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Press upward naturally while keeping your shoulder blades against the pad.",
    "description": "Maintain full control throughout each repetition. Avoid forcing your shoulders forward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Incline Chest Press Machine"
    ],
    "category": "strength"
  },
  {
    "id": "hammer-strength-chest-press",
    "name": "Hammer Strength Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive each handle evenly while keeping your chest lifted.",
    "description": "Control the eccentric until the handles return naturally. Avoid locking out aggressively.",
    "avoidIf": [],
    "icon": "🔨",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Plate Loaded Chest Press"
    ],
    "category": "strength"
  },
  {
    "id": "trx-chest-press",
    "name": "TRX Chest Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean farther forward to increase the challenge while maintaining a rigid body.",
    "description": "Press the handles away while keeping your core engaged. Avoid letting your hips sag.",
    "avoidIf": [
      "shoulder",
      "balance"
    ],
    "icon": "🟡",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Chest Press"
    ],
    "category": "strength"
  },
  {
    "id": "trx-chest-fly",
    "name": "TRX Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Advanced",
    "cue": "Keep your elbows softly bent as you open and close your arms.",
    "description": "Maintain tension throughout the movement. Avoid dropping too deep into the stretch.",
    "avoidIf": [
      "shoulder",
      "balance"
    ],
    "icon": "🟡",
    "mechanic": "Isolation",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Suspension Fly"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-floor-press",
    "name": "Kettlebell Floor Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower until your upper arm touches the floor before pressing smoothly upward.",
    "description": "Maintain a neutral wrist throughout the movement. Avoid letting the kettlebell drift behind your shoulder.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Floor Press"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-kettlebell-bench-press",
    "name": "Single-Arm Kettlebell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Brace your core to prevent rotation as you press with one arm.",
    "description": "Complete all repetitions on one side before switching. Avoid twisting your torso during the lift.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-floor-press",
    "name": "Dumbbell Floor Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Pause briefly with your upper arms on the floor before pressing.",
    "description": "Use the floor to limit shoulder range safely. Avoid bouncing your elbows off the ground.",
    "avoidIf": [],
    "icon": "🏠",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Floor Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-pullover",
    "name": "Dumbbell Pullover",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Back",
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the dumbbell only as far as your shoulder mobility comfortably allows.",
    "description": "Pull the weight back over your chest using a controlled arc. Avoid overextending your shoulders.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🌙",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-dumbbell-bench-press",
    "name": "Single-Arm Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your torso stable while pressing with one arm at a time.",
    "description": "Brace your core to resist rotation through every repetition. Avoid letting the working shoulder roll forward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "alternating-dumbbell-bench-press",
    "name": "Alternating Dumbbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Shoulders",
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep one dumbbell extended while pressing with the opposite arm.",
    "description": "Alternate sides while maintaining a stable torso. Avoid dropping the stationary arm prematurely.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔄",
    "mechanic": "Compound",
    "pattern": "Horizontal Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Alternating DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "pull-up",
    "name": "Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull your elbows toward your ribs while keeping your chest lifted.",
    "description": "Start from a dead hang and pull until your chin clears the bar before lowering under control. Avoid kicking or swinging for momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Pronated Pull-Up",
      "Overhand Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "chin-up",
    "name": "Chin-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your elbows close and drive your chest toward the bar.",
    "description": "Pull until your chin passes the bar before lowering with control. Avoid craning your neck to finish the repetition.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Underhand Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "neutral-grip-pull-up",
    "name": "Neutral-Grip Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Keep your palms facing each other and pull your elbows straight down.",
    "description": "Lift until your chin clears the handles before lowering smoothly. Avoid excessive swinging.",
    "avoidIf": [],
    "icon": "🤲",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Hammer Grip Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "wide-grip-pull-up",
    "name": "Wide-Grip Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Use a wide grip and pull your elbows toward your sides.",
    "description": "Raise your chest toward the bar with full-body control. Avoid shortening the range of motion.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Wide Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "commando-pull-up",
    "name": "Commando Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Pull your head beside the bar while alternating sides each set.",
    "description": "Maintain control and keep your torso stable throughout. Avoid twisting aggressively.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🪖",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Side Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "archer-pull-up",
    "name": "Archer Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Pull toward one arm while keeping the opposite arm extended.",
    "description": "Alternate sides while maintaining strict control. Avoid rotating your torso excessively.",
    "avoidIf": [
      "shoulder",
      "balance"
    ],
    "icon": "🏹",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Single-Side Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "scapular-pull-up",
    "name": "Scapular Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your elbows straight and pull only with your shoulder blades.",
    "description": "Lift your body slightly by depressing and retracting the scapulae. Avoid bending your elbows.",
    "avoidIf": [],
    "icon": "🎯",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Scap Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "negative-pull-up",
    "name": "Negative Pull-Up",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Beginner",
    "cue": "Lower yourself as slowly as possible from the top position.",
    "description": "Step or jump to the top before controlling the descent. Avoid dropping quickly at the bottom.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬇️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Eccentric Pull-Up"
    ],
    "category": "strength"
  },
  {
    "id": "inverted-row",
    "name": "Inverted Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your body rigid and pull your chest toward the bar.",
    "description": "Lower yourself under control after each repetition. Avoid letting your hips sag.",
    "avoidIf": [],
    "icon": "↕️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Australian Pull-Up",
      "Body Row"
    ],
    "category": "strength"
  },
  {
    "id": "feet-elevated-inverted-row",
    "name": "Feet-Elevated Inverted Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Elevate your feet and keep your body perfectly straight.",
    "description": "Pull your chest to the bar before lowering slowly. Avoid losing body tension.",
    "avoidIf": [],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Elevated Body Row"
    ],
    "category": "strength"
  },
  {
    "id": "towel-row",
    "name": "Towel Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lean back and pull evenly through both arms.",
    "description": "Use a securely anchored towel and row your body toward it. Avoid using an unstable anchor point.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🧺",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "endurance",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Door Towel Row"
    ],
    "category": "strength"
  },
  {
    "id": "superman",
    "name": "Superman",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your arms and legs together while keeping your neck neutral.",
    "description": "Pause briefly at the top before lowering with control. Avoid looking upward excessively.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🦸",
    "mechanic": "Isolation",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Superman Hold"
    ],
    "category": "strength"
  },
  {
    "id": "prone-y-t-w-raise",
    "name": "Prone Y-T-W Raise",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Move slowly through the Y, T, and W positions without shrugging.",
    "description": "Raise your arms deliberately while keeping your forehead supported. Avoid rushing between positions.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔤",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "YTW Raise"
    ],
    "category": "strength"
  },
  {
    "id": "bodyweight-back-extension",
    "name": "Bodyweight Back Extension",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your chest only until your spine reaches neutral alignment.",
    "description": "Raise and lower under complete control. Avoid hyperextending your lower back.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🌄",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Floor Back Extension"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-snow-angel",
    "name": "Reverse Snow Angel",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Sweep your arms from overhead to your hips while keeping them off the floor.",
    "description": "Move slowly through the full arc without lifting your head. Avoid shrugging your shoulders.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "❄️",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Prone Snow Angel"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-plank",
    "name": "Reverse Plank",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your hips upward while squeezing your shoulder blades together.",
    "description": "Hold a straight line from shoulders to heels. Avoid letting your hips sag.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "🪵",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Back Plank"
    ],
    "category": "strength"
  },
  {
    "id": "bird-dog-row-hold",
    "name": "Bird Dog Row Hold",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Core/Abs",
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Reach long through your arm and opposite leg while keeping your spine neutral.",
    "description": "Pause briefly before switching sides. Avoid rotating your hips during the hold.",
    "avoidIf": [
      "balance",
      "pregnancy"
    ],
    "icon": "🐦",
    "mechanic": "Compound",
    "pattern": "Core",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bird Dog Hold"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-dumbbell-row",
    "name": "Single-Arm Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Pull your elbow toward your hip while keeping your torso stable.",
    "description": "Support yourself on a bench and row the dumbbell through a full range of motion. Avoid twisting your torso to lift heavier weight.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "One-Arm DB Row",
      "Single Arm DB Row"
    ],
    "category": "strength"
  },
  {
    "id": "chest-supported-incline-dumbbell-row",
    "name": "Chest-Supported Incline Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your chest glued to the bench and drive your elbows back.",
    "description": "Row both dumbbells until your elbows pass your torso before lowering under control. Avoid lifting your chest off the bench.",
    "avoidIf": [],
    "icon": "📈",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Row",
      "Chest Supported DB Row"
    ],
    "category": "strength"
  },
  {
    "id": "bent-over-dumbbell-row",
    "name": "Bent-Over Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Maintain a flat back while pulling both elbows toward your hips.",
    "description": "Hinge at the hips and row both dumbbells with control. Avoid rounding your lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Bent Row"
    ],
    "category": "strength"
  },
  {
    "id": "gorilla-dumbbell-row",
    "name": "Gorilla Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Alternate rows while holding a strong hip hinge.",
    "description": "Keep one dumbbell planted while rowing the other. Avoid rotating your torso as you switch sides.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦍",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Alternating Gorilla Row"
    ],
    "category": "strength"
  },
  {
    "id": "dead-stop-dumbbell-row",
    "name": "Dead-Stop Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Pause each dumbbell on the floor before every repetition.",
    "description": "Reset your position after every rep for maximum power. Avoid bouncing the weights off the floor.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "⏸️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Dead Stop Row"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-high-pull",
    "name": "Dumbbell High Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders",
      "Biceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive through your hips before pulling your elbows high.",
    "description": "Generate power from your lower body before finishing with your upper back. Avoid curling the dumbbells upward.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-shrug",
    "name": "Dumbbell Shrug",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your shoulders straight upward without rolling them.",
    "description": "Pause briefly at the top before lowering slowly. Avoid rotating your shoulders in circles.",
    "avoidIf": [
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Carry",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Shrug"
    ],
    "category": "strength"
  },
  {
    "id": "kroc-row",
    "name": "Kroc Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Advanced",
    "cue": "Use controlled body English only after strict pulling breaks down.",
    "description": "Perform high-rep heavy rows while maintaining spinal stability. Avoid jerking the weight from the floor.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦾",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Heavy One-Arm Row"
    ],
    "category": "strength"
  },
  {
    "id": "incline-prone-dumbbell-row",
    "name": "Incline Prone Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Pull your elbows slightly outward while keeping your chest on the bench.",
    "description": "Focus on squeezing your shoulder blades together. Avoid lifting your chest during the row.",
    "avoidIf": [],
    "icon": "🛏️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Prone Incline Row"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-bent-over-row",
    "name": "Barbell Bent-Over Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a solid hip hinge and pull the bar toward your lower ribs.",
    "description": "Row under control while maintaining a neutral spine. Avoid using excessive torso momentum.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Bent Row"
    ],
    "category": "strength"
  },
  {
    "id": "pendlay-row",
    "name": "Pendlay Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Reset the bar on the floor before every explosive repetition.",
    "description": "Pull from a dead stop with a rigid torso. Avoid bouncing the bar between repetitions.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🚀",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "strength",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Dead Stop Barbell Row"
    ],
    "category": "strength"
  },
  {
    "id": "t-bar-row",
    "name": "T-Bar Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive your elbows back while keeping your chest proud.",
    "description": "Pull through a full range of motion before lowering with control. Avoid rounding your spine.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔩",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Landmine Row"
    ],
    "category": "strength"
  },
  {
    "id": "yates-row",
    "name": "Yates Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Use an underhand grip and a slightly more upright torso.",
    "description": "Row toward your lower abdomen with control. Avoid excessive body swing.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "📏",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Underhand Barbell Row"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-shrug",
    "name": "Barbell Shrug",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Beginner",
    "cue": "Lift your shoulders straight toward your ears and pause.",
    "description": "Lower the bar slowly after each repetition. Avoid rolling your shoulders.",
    "avoidIf": [
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Carry",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Shrug"
    ],
    "category": "strength"
  },
  {
    "id": "rack-pull",
    "name": "Rack Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Keep the bar close and lock out by driving your hips forward.",
    "description": "Lift from knee height while maintaining a neutral spine. Avoid hyperextending at lockout.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🗄️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Partial Deadlift"
    ],
    "category": "strength"
  },
  {
    "id": "conventional-deadlift",
    "name": "Conventional Deadlift",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Brace hard, keep the bar against your legs, and push the floor away.",
    "description": "Stand tall by extending your hips and knees together before lowering under control. Avoid rounding your lower back throughout the lift.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Hinge",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "power"
    ],
    "homeFriendly": false,
    "aliases": [
      "Deadlift",
      "Conventional Barbell Deadlift"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-kettlebell-row",
    "name": "Single-Arm Kettlebell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "kettlebell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the kettlebell toward your hip while keeping your torso square.",
    "description": "Move through a controlled range of motion with each repetition. Avoid twisting your shoulders.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "One-Arm KB Row"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-gorilla-row",
    "name": "Kettlebell Gorilla Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Alternate rows while maintaining a strong hip hinge.",
    "description": "Keep one kettlebell grounded while rowing the other. Avoid rotating your torso between repetitions.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦍",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Gorilla Row"
    ],
    "category": "strength"
  },
  {
    "id": "cable-lat-pulldown",
    "name": "Cable Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the bar toward your upper chest while driving your elbows down.",
    "description": "Control the weight as it returns overhead before repeating. Avoid leaning back excessively to create momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Lat Pulldown",
      "Wide Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "close-grip-cable-lat-pulldown",
    "name": "Close-Grip Cable Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Use a close handle and pull your elbows toward your sides.",
    "description": "Focus on squeezing your lats at the bottom position. Avoid turning the movement into a row by leaning too far back.",
    "avoidIf": [],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "V-Bar Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "wide-grip-cable-lat-pulldown",
    "name": "Wide-Grip Cable Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a wider grip and pull your elbows down toward your ribs.",
    "description": "Maintain an upright torso while pulling through the back. Avoid pulling the bar behind your neck.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "↔️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Wide Lat Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "straight-arm-cable-pulldown",
    "name": "Straight-Arm Cable Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your arms straight and pull the bar toward your thighs.",
    "description": "Move only through the shoulder joint while keeping your torso stable. Avoid bending your elbows to turn it into a pressdown.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Pullover",
      "Straight Arm Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "seated-cable-row",
    "name": "Seated Cable Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the handle toward your torso while keeping your chest tall.",
    "description": "Squeeze your shoulder blades together before returning forward. Avoid rounding your back at the stretch.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Row"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-cable-row",
    "name": "Single-Arm Cable Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull one handle toward your hip while resisting rotation.",
    "description": "Keep your torso stable throughout the movement. Avoid twisting toward the cable stack.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🔗",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "One Arm Cable Row"
    ],
    "category": "strength"
  },
  {
    "id": "cable-face-pull",
    "name": "Cable Face Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the rope toward your face while rotating your hands outward.",
    "description": "Control the movement and squeeze your upper back. Avoid shrugging your shoulders upward.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🎯",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rope Face Pull"
    ],
    "category": "strength"
  },
  {
    "id": "cable-pullover",
    "name": "Cable Pullover",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the rope or bar down in an arc while keeping your arms mostly straight.",
    "description": "Focus on lat contraction through the full movement. Avoid bending your elbows excessively.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔗",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Straight Arm Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "lat-pulldown-machine",
    "name": "Lat Pulldown Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the handles down while keeping your chest lifted.",
    "description": "Control the return until your arms are extended. Avoid using body momentum to pull the weight.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Pulldown Machine"
    ],
    "category": "strength"
  },
  {
    "id": "seated-row-machine",
    "name": "Seated Row Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your elbows backward while keeping your chest against the pad.",
    "description": "Pause briefly when your shoulder blades squeeze together. Avoid rounding forward during the return.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Row Machine"
    ],
    "category": "strength"
  },
  {
    "id": "chest-supported-row-machine",
    "name": "Chest-Supported Row Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your chest against the pad and pull smoothly.",
    "description": "Use the support to isolate your back muscles. Avoid lifting your chest away from the pad.",
    "avoidIf": [],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Supported Row Machine"
    ],
    "category": "strength"
  },
  {
    "id": "hammer-strength-row",
    "name": "Hammer Strength Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive the handles back while keeping your shoulders down.",
    "description": "Control each repetition and squeeze your upper back. Avoid jerking the handles toward you.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔨",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Hammer Row"
    ],
    "category": "strength"
  },
  {
    "id": "assisted-pull-up-machine",
    "name": "Assisted Pull-Up Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Pull your chest toward the handles while controlling the assistance.",
    "description": "Use the machine to practice a full pull-up pattern. Avoid relying entirely on the assistance platform.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Assisted Chin-Up Machine"
    ],
    "category": "strength"
  },
  {
    "id": "back-extension-machine",
    "name": "Back Extension Machine",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Extend your torso until your spine reaches neutral alignment.",
    "description": "Move through a controlled hip hinge pattern. Avoid hyperextending your lower back at the top.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️",
    "mechanic": "Isolation",
    "pattern": "Hinge",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": false,
    "aliases": [
      "Machine Hyperextension"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-lat-pulldown",
    "name": "Resistance Band Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band down while driving your elbows toward your ribs.",
    "description": "Anchor the band overhead and control the return to the starting position. Avoid shrugging your shoulders during the pull.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Pulldown"
    ],
    "category": "strength"
  },
  {
    "id": "resistance-band-row",
    "name": "Resistance Band Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band toward your torso while squeezing your shoulder blades.",
    "description": "Maintain a tall posture and controlled tempo throughout the movement. Avoid leaning backward to create momentum.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Seated Row",
      "Band Row"
    ],
    "category": "strength"
  },
  {
    "id": "band-pull-apart",
    "name": "Band Pull-Apart",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band apart while keeping your arms straight.",
    "description": "Squeeze your upper back as the band reaches your chest line. Avoid shrugging or arching your lower back.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Shoulder Pull Apart"
    ],
    "category": "strength"
  },
  {
    "id": "band-straight-arm-pulldown",
    "name": "Band Straight-Arm Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band down with straight arms toward your thighs.",
    "description": "Keep tension on the band throughout the movement. Avoid bending your elbows to compensate.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Pullover"
    ],
    "category": "strength"
  },
  {
    "id": "band-face-pull",
    "name": "Band Face Pull",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band toward your face while rotating your hands outward.",
    "description": "Keep your elbows high and squeeze your upper back. Avoid pulling only with your arms.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🎯",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Resistance Band Face Pull"
    ],
    "category": "strength"
  },
  {
    "id": "band-single-arm-row",
    "name": "Single-Arm Resistance Band Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Row one arm at a time while resisting torso rotation.",
    "description": "Keep your shoulders square throughout each repetition. Avoid turning your body toward the anchor point.",
    "avoidIf": [],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm Band Row"
    ],
    "category": "strength"
  },
  {
    "id": "trx-row",
    "name": "TRX Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Shoulders"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Beginner",
    "cue": "Keep your body straight and pull your chest toward the handles.",
    "description": "Adjust your body angle to change difficulty. Avoid letting your hips drop during the row.",
    "avoidIf": [],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Row"
    ],
    "category": "strength"
  },
  {
    "id": "trx-single-arm-row",
    "name": "TRX Single-Arm Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Core/Abs"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Row with one arm while resisting rotation through your torso.",
    "description": "Maintain a rigid plank position as you pull. Avoid twisting your hips open.",
    "avoidIf": [
      "balance"
    ],
    "icon": "〰️",
    "mechanic": "Compound",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm Suspension Row"
    ],
    "category": "strength"
  },
  {
    "id": "pike-push-up",
    "name": "Pike Push-Up",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Chest"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive your head toward the floor while keeping your hips high.",
    "description": "Press your body upward with your shoulders doing most of the work. Avoid collapsing your neck or losing your pike position.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔺",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Downward Dog Push-Up"
    ],
    "category": "strength"
  },
  {
    "id": "feet-elevated-pike-push-up",
    "name": "Feet-Elevated Pike Push-Up",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Chest"
    ],
    "equipment": [
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Elevate your feet and lower your head between your hands.",
    "description": "Increase the shoulder loading angle while maintaining control. Avoid letting your lower back collapse.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔺",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Elevated Pike Press"
    ],
    "category": "strength"
  },
  {
    "id": "wall-handstand-hold",
    "name": "Wall Handstand Hold",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Press tall through your hands while maintaining a straight body line.",
    "description": "Hold a stable inverted position against the wall. Avoid dumping weight into your neck or shoulders.",
    "avoidIf": [
      "shoulder",
      "neck",
      "wrist"
    ],
    "icon": "🤸",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wall Handstand"
    ],
    "category": "strength"
  },
  {
    "id": "wall-walk",
    "name": "Wall Walk",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Walk your hands forward while climbing your feet up the wall.",
    "description": "Move slowly into an inverted position and return with control. Avoid collapsing through the shoulders.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "🧗",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "strength",
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "Wall Climb"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-lateral-raise",
    "name": "Dumbbell Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the dumbbells out to your sides with controlled motion.",
    "description": "Lift until your arms are near shoulder height before lowering slowly. Avoid swinging the weights upward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Side Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-front-raise",
    "name": "Dumbbell Front Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the dumbbells straight in front of you with control.",
    "description": "Keep your torso still while lifting and lowering the weights. Avoid leaning backward for momentum.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Front Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-rear-delt-fly",
    "name": "Dumbbell Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Sweep the dumbbells outward while squeezing your rear shoulders.",
    "description": "Maintain a stable bent-over position throughout the movement. Avoid shrugging the weights upward.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Rear Fly"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-scaption",
    "name": "Dumbbell Scaption",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the dumbbells in the scapular plane with thumbs slightly upward.",
    "description": "Move smoothly through the shoulder-friendly angle. Avoid forcing painful ranges of motion.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↗️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Scaption Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-cuban-press",
    "name": "Dumbbell Cuban Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate the dumbbells upward before pressing overhead.",
    "description": "Use light weight and controlled rotation through the shoulders. Avoid forcing the range of motion.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔄",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Cuban Rotation Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-six-way-raise",
    "name": "Dumbbell 6-Way Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Move through six controlled raise positions without swinging.",
    "description": "Keep the weights light and maintain shoulder control. Avoid rushing through the sequence.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🔢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "endurance",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Six Way Shoulder Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-around-the-world",
    "name": "Dumbbell Around-the-World",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Circle the dumbbells around your body with smooth control.",
    "description": "Maintain tension through the entire arc of motion. Avoid using momentum to complete the circle.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🌎",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Around World"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-lean-away-lateral-raise",
    "name": "Dumbbell Lean-Away Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean away from support and raise the dumbbell through your side.",
    "description": "Use controlled tension through the lateral deltoid. Avoid shrugging at the top.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Lean Away DB Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-incline-y-raise",
    "name": "Dumbbell Incline Y-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Raise your arms into a Y position while lying on an incline bench.",
    "description": "Focus on controlled shoulder blade movement. Avoid shrugging toward your ears.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🙆",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Incline DB Y Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-l-raise",
    "name": "Dumbbell L-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise your arms into an L shape using slow controlled motion.",
    "description": "Rotate and lift with shoulder control throughout the movement. Avoid using heavy weights.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "📐",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB L Raise"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-powell-raise",
    "name": "Dumbbell Powell Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Intermediate",
    "cue": "Perform a rear-delt raise while lying chest-supported on an incline bench.",
    "description": "Keep the movement isolated to the rear shoulders. Avoid rotating your torso.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Powell Raise"
    ],
    "category": "strength"
  },
  {
    "id": "seated-dumbbell-rear-delt-fly",
    "name": "Seated Dumbbell Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Lean forward and open your arms wide using your rear shoulders.",
    "description": "Squeeze the rear delts at the top before lowering slowly. Avoid turning it into a row.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated DB Rear Fly"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-seated-shoulder-press",
    "name": "Dumbbell Seated Shoulder Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "dumbbell",
      "bench"
    ],
    "difficulty": "Beginner",
    "cue": "Press the dumbbells overhead while keeping your ribs stacked over your hips.",
    "description": "Lower the weights under control to shoulder height before pressing again. Avoid arching your lower back to create momentum.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Seated DB Press",
      "Dumbbell Overhead Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-standing-shoulder-press",
    "name": "Dumbbell Standing Shoulder Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press overhead while maintaining a stable standing position.",
    "description": "Brace your core and move the dumbbells through a controlled path. Avoid leaning backward during the press.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Standing DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-arnold-press",
    "name": "Dumbbell Arnold Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rotate your palms outward as you press the dumbbells overhead.",
    "description": "Use a controlled rotation through the shoulder joint. Avoid forcing the bottom position if mobility is limited.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔄",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Arnold Dumbbell Press"
    ],
    "category": "strength"
  },
  {
    "id": "dumbbell-push-press",
    "name": "Dumbbell Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Use a small leg drive before pressing overhead.",
    "description": "Generate power from the lower body while keeping the press controlled. Avoid turning the movement into a jump.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "DB Push Press"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-dumbbell-overhead-press",
    "name": "Single-Arm Dumbbell Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press one dumbbell overhead while resisting sideways movement.",
    "description": "Maintain a strong brace throughout the press. Avoid leaning away from the working side.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "💪",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Single Arm DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "half-kneeling-dumbbell-press",
    "name": "Half-Kneeling Dumbbell Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press overhead from a half-kneeling position while keeping your torso tall.",
    "description": "Use your core to prevent arching or rotating. Avoid leaning into the pressing side.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🧎",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Half Kneeling DB Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-overhead-press",
    "name": "Barbell Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press the bar overhead while keeping your body rigid.",
    "description": "Move your head slightly back then forward as the bar passes. Avoid excessive lower-back arching.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "Military Press",
      "Strict Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-push-press",
    "name": "Barbell Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Dip slightly with your legs and drive the bar overhead.",
    "description": "Transfer force from your legs into the press. Avoid excessive back extension at lockout.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Push Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-z-press",
    "name": "Barbell Z Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Advanced",
    "cue": "Press overhead while seated on the floor with legs extended.",
    "description": "Maintain a tall seated posture throughout the movement. Avoid leaning backward to complete repetitions.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": false,
    "aliases": [
      "Z Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-landmine-press",
    "name": "Barbell Landmine Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest",
      "Triceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Beginner",
    "cue": "Press the angled bar path upward and forward.",
    "description": "Keep your shoulder packed as you press. Avoid letting the shoulder roll forward at the top.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🚀",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Landmine Shoulder Press"
    ],
    "category": "strength"
  },
  {
    "id": "barbell-upright-row",
    "name": "Barbell Upright Row",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "barbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the bar upward while keeping your elbows slightly above your hands.",
    "description": "Use a comfortable range of motion and controlled tempo. Avoid forcing a narrow grip or excessive height.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "BB Upright Row"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-overhead-press",
    "name": "Kettlebell Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press the kettlebell overhead while keeping your wrist stacked.",
    "description": "Maintain a strong shoulder position throughout the press. Avoid leaning away from the weight.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-push-press",
    "name": "Kettlebell Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Use leg drive to help launch the kettlebell overhead.",
    "description": "Keep the movement powerful and controlled. Avoid losing wrist alignment.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": true,
    "focus": [
      "power",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Push Press"
    ],
    "category": "strength"
  },
  {
    "id": "single-arm-kettlebell-press",
    "name": "Single-Arm Kettlebell Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Press one kettlebell overhead while maintaining a stacked posture.",
    "description": "Brace your core and control the descent. Avoid side bending during the press.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "One Arm KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-bottoms-up-press",
    "name": "Kettlebell Bottoms-Up Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Balance the inverted kettlebell while pressing slowly overhead.",
    "description": "Use light weight and maintain wrist control. Avoid attempting heavy loads before mastering stability.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "🔔",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": true,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "Bottoms Up KB Press"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-halo",
    "name": "Kettlebell Halo",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Beginner",
    "cue": "Circle the kettlebell around your head with controlled movement.",
    "description": "Move smoothly while keeping your ribs down. Avoid forcing uncomfortable shoulder positions.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⭕",
    "mechanic": "Isolation",
    "pattern": "Rotation",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Halo"
    ],
    "category": "mobility"
  },
  {
    "id": "kettlebell-high-pull",
    "name": "Kettlebell High Pull",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back",
      "Core/Abs"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drive the kettlebell upward while leading with your elbow.",
    "description": "Generate power from the hips before pulling. Avoid yanking through the shoulder joint.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "kettlebell-z-press",
    "name": "Kettlebell Z Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Core/Abs",
      "Triceps"
    ],
    "equipment": [
      "kettlebell"
    ],
    "difficulty": "Advanced",
    "cue": "Press kettlebells overhead while seated with legs extended.",
    "description": "Maintain a tall posture and strict pressing mechanics. Avoid leaning backward.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🪑",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "mobility"
    ],
    "homeFriendly": true,
    "aliases": [
      "KB Seated Press"
    ],
    "category": "strength"
  },
  {
    "id": "cable-lateral-raise",
    "name": "Cable Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the cable handle out to your side with controlled tension.",
    "description": "Keep constant tension on the lateral deltoid throughout the movement. Avoid swinging the handle upward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Single Arm Cable Lateral Raise"
    ],
    "category": "strength"
  },
  {
    "id": "cable-front-raise",
    "name": "Cable Front Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the cable handle forward until your arm reaches shoulder height.",
    "description": "Maintain a stable torso throughout each repetition. Avoid leaning back to move heavier weight.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "⬆️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Front Delt Raise"
    ],
    "category": "strength"
  },
  {
    "id": "cable-rear-delt-fly",
    "name": "Cable Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Beginner",
    "cue": "Open your arms outward using your rear shoulders.",
    "description": "Control the cable path and squeeze your rear delts. Avoid rotating your torso to move the weight.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": true,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Reverse Fly"
    ],
    "category": "strength"
  },
  {
    "id": "cable-upright-row",
    "name": "Cable Upright Row",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the cable upward while keeping your elbows higher than your hands.",
    "description": "Use a comfortable range and controlled tempo. Avoid forcing the shoulders into painful positions.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "⬆️",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "cable-y-raise",
    "name": "Cable Y-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "cable"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise your arms into a Y pattern while maintaining shoulder control.",
    "description": "Move smoothly through the shoulder blades and upper back. Avoid shrugging toward your ears.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🙆",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Cable Y Raise"
    ],
    "category": "strength"
  },
  {
    "id": "machine-shoulder-press",
    "name": "Machine Shoulder Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Press the machine handles overhead with controlled movement.",
    "description": "Keep your back supported and press through the shoulders. Avoid locking out aggressively.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Shoulder Press Machine"
    ],
    "category": "strength"
  },
  {
    "id": "machine-lateral-raise",
    "name": "Machine Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the machine pads outward using your side delts.",
    "description": "Maintain slow controlled repetitions. Avoid bouncing the weight stack.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "↔️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Lateral Raise Machine"
    ],
    "category": "strength"
  },
  {
    "id": "reverse-pec-deck",
    "name": "Reverse Pec Deck",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "machine"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the machine arms backward using your rear delts.",
    "description": "Keep your chest against the pad and control the return. Avoid shrugging through the movement.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": false,
    "aliases": [
      "Rear Delt Machine Fly"
    ],
    "category": "strength"
  },
  {
    "id": "band-overhead-press",
    "name": "Resistance Band Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Press the band overhead while keeping your core braced.",
    "description": "Maintain steady tension through the press. Avoid leaning backward to compensate for resistance.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Shoulder Press"
    ],
    "category": "strength"
  },
  {
    "id": "band-lateral-raise",
    "name": "Resistance Band Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the band handles outward using your side delts.",
    "description": "Keep constant tension throughout the movement. Avoid using momentum from your torso.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Side Raise"
    ],
    "category": "strength"
  },
  {
    "id": "band-front-raise",
    "name": "Resistance Band Front Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Raise the band handles forward under control.",
    "description": "Keep your body still while lifting. Avoid swinging the band upward.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🟢",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Front Delt Raise"
    ],
    "category": "strength"
  },
  {
    "id": "band-rear-delt-fly",
    "name": "Resistance Band Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Beginner",
    "cue": "Pull the band apart while squeezing your rear shoulders.",
    "description": "Control the return and maintain posture. Avoid shrugging the shoulders upward.",
    "avoidIf": [],
    "icon": "🪽",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band Reverse Fly"
    ],
    "category": "strength"
  },
  {
    "id": "band-upright-row",
    "name": "Resistance Band Upright Row",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": [
      "resistance-band"
    ],
    "difficulty": "Intermediate",
    "cue": "Pull the band upward while keeping your elbows elevated.",
    "description": "Use controlled resistance and avoid excessive shoulder rotation. Avoid pulling into painful ranges.",
    "avoidIf": [
      "shoulder",
      "wrist",
      "neck"
    ],
    "icon": "🟢",
    "mechanic": "Compound",
    "pattern": "Vertical Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy"
    ],
    "homeFriendly": true,
    "aliases": [
      "Band High Pull"
    ],
    "category": "strength"
  },
  {
    "id": "trx-y-raise",
    "name": "TRX Y-Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Raise your arms into a Y shape while leaning into the straps.",
    "description": "Control your body angle and shoulder position. Avoid shrugging as you raise.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "〰️",
    "mechanic": "Isolation",
    "pattern": "Vertical Push",
    "force": "Static",
    "unilateral": false,
    "focus": [
      "mobility",
      "strength"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Y Raise"
    ],
    "category": "strength"
  },
  {
    "id": "trx-rear-delt-fly",
    "name": "TRX Rear-Delt Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Back"
    ],
    "equipment": [
      "trx"
    ],
    "difficulty": "Intermediate",
    "cue": "Open your arms outward while controlling your body angle.",
    "description": "Use slow repetitions to isolate the rear delts. Avoid letting your hips drop.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "〰️",
    "mechanic": "Isolation",
    "pattern": "Horizontal Pull",
    "force": "Pull",
    "unilateral": false,
    "focus": [
      "hypertrophy",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Suspension Rear Fly"
    ],
    "category": "strength"
  },
  {
    "id": "medicine-ball-overhead-press",
    "name": "Medicine Ball Overhead Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Core/Abs"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Beginner",
    "cue": "Press the medicine ball overhead while maintaining posture.",
    "description": "Keep your core engaged and control the descent. Avoid arching your lower back.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚽",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Push",
    "unilateral": false,
    "focus": [
      "strength",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball Press"
    ],
    "category": "strength"
  },
  {
    "id": "medicine-ball-push-press",
    "name": "Medicine Ball Push Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Full Body/Cardio"
    ],
    "equipment": [
      "medicine-ball"
    ],
    "difficulty": "Intermediate",
    "cue": "Use leg drive to launch the medicine ball overhead.",
    "description": "Generate power while maintaining control. Avoid losing alignment during the press.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "⚡",
    "mechanic": "Compound",
    "pattern": "Vertical Push",
    "force": "Explosive",
    "unilateral": false,
    "focus": [
      "power",
      "endurance"
    ],
    "homeFriendly": true,
    "aliases": [
      "Med Ball Push Press"
    ],
    "category": "conditioning"
  },
  {
    "id": "db-curl",
    "name": "Dumbbell Biceps Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Elbows pinned to your sides; curl up, lower for a slow three-count.",
    "description": "Curl a dumbbell in each hand to your shoulders without letting your elbows drift forward or your torso swing. The lowering half is where the growth is, so take it slow.",
    "avoidIf": [],
    "icon": "💪"
  },
  {
    "id": "hammer-curl",
    "name": "Hammer Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Palms facing each other the whole rep, like swinging a hammer.",
    "description": "A curl with a neutral grip — palms facing your body throughout — that hits the brachialis and forearms and is the most wrist-friendly curl for most people. Same rules: elbows glued to your ribs, no swinging.",
    "avoidIf": [],
    "icon": "🔨"
  },
  {
    "id": "concentration-curl",
    "name": "Concentration Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Elbow braced against your inner thigh — nothing moves but the forearm.",
    "description": "Seated, lean forward and brace your elbow against your inner thigh, then curl a single dumbbell with total strictness. The bracing removes every cheat, so the weight will be humbling.",
    "avoidIf": [],
    "icon": "💪"
  },
  {
    "id": "incline-db-curl",
    "name": "Incline Dumbbell Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie back on an incline bench and let your arms hang behind your body line.",
    "description": "Curling while lying back on a 45–60° incline bench puts the biceps under stretch at the bottom, letting the arms hang fully. Skip it if the stretched shoulder position feels tweaky at the front.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "💪"
  },
  {
    "id": "db-preacher-bench-curl",
    "name": "Bench Preacher Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drape your arm over the incline bench back; curl with no swing.",
    "description": "Set the bench upright and drape your upper arm over the top of the backrest, then curl a dumbbell with the arm fully supported. The pad kills momentum and stretches the biceps hard — lower under control and stop short of a locked elbow.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "💪"
  },
  {
    "id": "db-spider-curl",
    "name": "Spider Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Chest on an incline bench, arms hanging straight down; curl up.",
    "description": "Lie chest-down on an incline bench with your arms hanging straight toward the floor and curl the dumbbells up. Hanging vertically keeps tension on the biceps through the whole rep with zero body english.",
    "avoidIf": [],
    "icon": "🕷️"
  },
  {
    "id": "db-zottman-curl",
    "name": "Zottman Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Curl up palms-up, rotate to palms-down, lower slowly.",
    "description": "Curl the dumbbells up with palms facing up, rotate at the top so your palms face down, then lower slowly in that grip. You get a biceps curl on the way up and a forearm-building reverse curl on the way down.",
    "avoidIf": [],
    "icon": "🔄"
  },
  {
    "id": "db-cross-curl",
    "name": "Cross-Body Hammer Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Curl each dumbbell across your body toward the opposite shoulder.",
    "description": "With a neutral grip, curl each dumbbell diagonally across your body toward the opposite shoulder, alternating arms. The cross-body path emphasises the brachialis and the thickness of the upper arm.",
    "avoidIf": [],
    "icon": "💪"
  },
  {
    "id": "db-drag-curl",
    "name": "Dumbbell Drag Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Drag the dumbbells straight up your torso, elbows drifting back.",
    "description": "Curl the dumbbells while dragging them up close to your body, letting your elbows travel backward instead of staying pinned. The path keeps the biceps working without the shoulders taking over — expect to use less weight.",
    "avoidIf": [],
    "icon": "💪"
  },
  {
    "id": "db-reverse-curl",
    "name": "Reverse Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Palms facing down; curl up keeping the knuckles high.",
    "description": "Curl the dumbbells with an overhand (palms-down) grip, which shifts work onto the forearms and the outer biceps. Go lighter than a normal curl — the grip is much weaker this way.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "💪"
  },
  {
    "id": "db-waiter-curl",
    "name": "Waiter Curl",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Cup one dumbbell in both hands like a tray; curl to your chin.",
    "description": "Hold a single dumbbell vertically in both cupped hands like a tray and curl it to your chin, elbows tight to your body. The centred load makes it a simple, joint-friendly way to hit both biceps together.",
    "avoidIf": [],
    "icon": "🤵"
  },
  {
    "id": "chinup-hold",
    "name": "Chin-Up Hold",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [
      "Back",
      "Core/Abs"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Advanced",
    "cue": "Pull to the top of a chin-up and hold, chin over the bar.",
    "description": "Hold the top position of a chin-up with your chin over the bar for time, palms facing you. A brutal bodyweight biceps and grip builder that also feeds your chin-up strength.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🧗"
  },
  {
    "id": "db-21s",
    "name": "Dumbbell 21s",
    "muscleGroup": "Biceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Seven bottom-half reps, seven top-half, seven full — no rest.",
    "description": "One set of 21s is seven curls through the bottom half of the range, seven through the top half, then seven full curls, back to back. The partial ranges torch the biceps with surprisingly light weight.",
    "avoidIf": [],
    "icon": "💪"
  },
  {
    "id": "bench-dip",
    "name": "Bench Dip",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hands on the bench behind you; lower until elbows hit 90°, no deeper.",
    "description": "With your hands on the bench edge behind you and legs out front, bend your elbows to lower your hips, then press up. Going too deep stresses the shoulder — 90° at the elbow is plenty; bend your knees to make it easier.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🪑"
  },
  {
    "id": "overhead-db-extension",
    "name": "Overhead Dumbbell Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Both hands under one dumbbell overhead; lower it behind your head, elbows in.",
    "description": "Hold one dumbbell overhead with both hands and bend only at the elbows to lower it behind your head, then press up. Keep your elbows pointing forward and your ribs stacked rather than arching your back.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "🏋️"
  },
  {
    "id": "diamond-pushup",
    "name": "Diamond Push-Up",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Thumbs and index fingers form a diamond under your chest.",
    "description": "A push-up with hands close together under your chest, thumbs and index fingers touching, shifting the work heavily onto the triceps. The narrow hand position cranks the wrists — elevate or widen slightly if they protest.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "💎"
  },
  {
    "id": "db-kickback",
    "name": "Dumbbell Triceps Kickback",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hinge forward, upper arm parallel to the floor, straighten the elbow fully.",
    "description": "Brace a hand on the bench, raise your upper arm parallel to the floor, and extend the dumbbell back until your arm is completely straight. All the value is in the full extension and the squeeze at lockout — light weight, no swinging.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "💪"
  },
  {
    "id": "db-skull-crusher",
    "name": "Dumbbell Skull Crusher",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lying down, lower the dumbbells beside your head, elbows pointing up.",
    "description": "Lie on the bench with dumbbells held over your chest and bend at the elbows to lower them beside your ears, then extend up. Dumbbells let your wrists sit neutrally, which most elbows prefer over a straight bar.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "💀"
  },
  {
    "id": "db-tate-press",
    "name": "Tate Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lower the dumbbells toward your chest, elbows flaring out.",
    "description": "Lying on the bench, press two dumbbells up, then lower them toward your chest by flaring the elbows so the weights meet over your sternum, and press back. An old powerlifting move that targets the inner triceps.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️"
  },
  {
    "id": "db-jm-press",
    "name": "Dumbbell JM Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Half press, half skull crusher — lower toward your upper chest.",
    "description": "A hybrid of a close press and a skull crusher: lower the dumbbells toward your upper chest with elbows tucked, then press. It blends pressing strength with triceps isolation and is easier on the elbows than a strict skull crusher.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🏋️"
  },
  {
    "id": "close-pushup",
    "name": "Close-Grip Push-Up",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hands under your shoulders, elbows brushing your ribs as you lower.",
    "description": "A push-up with hands about shoulder-width and elbows tracking tight to your sides, emphasising the triceps over the chest. Keep the elbows in rather than flaring to keep the load where you want it.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "💪"
  },
  {
    "id": "bench-dip-feet-up",
    "name": "Feet-Elevated Bench Dip",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Hands on one bench, heels on another; dip to 90° elbows.",
    "description": "A bench dip with your heels raised on a second surface, adding bodyweight to the triceps. Keep the depth to a 90° elbow — the elevated, loaded version is even less forgiving to the shoulders than the standard dip.",
    "avoidIf": [
      "shoulder",
      "wrist"
    ],
    "icon": "🪑"
  },
  {
    "id": "db-floor-extension",
    "name": "Floor Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "On the floor, lower dumbbells beside your head; the floor caps the range.",
    "description": "A lying triceps extension done on the floor so your upper arms rest down and the range is naturally limited. The floor makes it the gentlest way to load the triceps overhead-style if the bench version bothers your shoulders.",
    "avoidIf": [],
    "icon": "💪"
  },
  {
    "id": "db-close-press",
    "name": "Close Neutral-Grip Press",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Dumbbells touching, elbows tucked; press straight up.",
    "description": "Press two dumbbells held together with a neutral grip while keeping your elbows tucked close to your body, shifting the press onto the triceps. The touching dumbbells and tucked elbows keep it easy on the shoulders.",
    "avoidIf": [],
    "icon": "🏋️"
  },
  {
    "id": "db-overhead-single",
    "name": "Single-Arm Overhead Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "One dumbbell overhead in one hand; lower behind your head, elbow high.",
    "description": "Press one dumbbell overhead and lower it behind your head one arm at a time, keeping the elbow pointing at the ceiling. Working one side at a time exposes and fixes left-right differences; brace your core so you don't lean.",
    "avoidIf": [
      "shoulder",
      "neck"
    ],
    "icon": "💪"
  },
  {
    "id": "bodyweight-skullcrusher",
    "name": "Bodyweight Triceps Extension",
    "muscleGroup": "Triceps",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Hands on the bench, body straight; bend only at the elbows to lower your head.",
    "description": "In a plank against the bench, bend only at the elbows to lower your forehead toward the bench edge, then extend back — a bodyweight skull crusher. Move your feet back to make it harder; keep the body rigid throughout.",
    "avoidIf": [
      "wrist",
      "shoulder",
      "lower-back"
    ],
    "icon": "💀"
  },
  {
    "id": "plank",
    "name": "Plank",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders",
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Forearms down, glutes squeezed, one straight line from head to heels.",
    "description": "Hold a straight-body position on your forearms and toes, squeezing your glutes and bracing your abs like you're about to take a light punch. When the line breaks and your hips sag, the set is over.",
    "avoidIf": [],
    "icon": "🧘"
  },
  {
    "id": "side-plank",
    "name": "Side Plank",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders",
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Stacked feet, hips lifted high — don't let them sag toward the floor.",
    "description": "Prop up on one forearm with your elbow under your shoulder and lift your hips into a straight line, targeting the obliques and deep side stabilizers. Drop the bottom knee to the floor for an easier version.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🧘"
  },
  {
    "id": "dead-bug",
    "name": "Dead Bug",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lower back pressed flat while opposite arm and leg reach away.",
    "description": "On your back with arms up and knees bent to 90°, slowly extend one arm overhead and the opposite leg long, keeping your lower back glued to the floor, then switch. Quietly one of the best back-friendly core drills there is.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🪲"
  },
  {
    "id": "bird-dog",
    "name": "Bird Dog",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "From all fours, reach opposite arm and leg long without tipping your hips.",
    "description": "On hands and knees, extend one arm and the opposite leg until both are level with your torso, pause, and return without letting your hips tip. A rehab-world classic for keeping the spine still while the limbs move.",
    "avoidIf": [
      "wrist",
      "knee"
    ],
    "icon": "🐕"
  },
  {
    "id": "crunch",
    "name": "Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Curl your ribs toward your hips — shoulder blades off the floor is far enough.",
    "description": "Lying with knees bent, curl your upper spine forward until your shoulder blades leave the floor, then lower. It's a short movement, not a sit-up — don't yank your head; fingertips behind the ears, elbows wide.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🤸"
  },
  {
    "id": "situp",
    "name": "Sit-Up",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Roll up one vertebra at a time; exhale on the way up.",
    "description": "From lying with knees bent, curl all the way up to sitting, then roll back down with control. The full range works the abs and hip flexors, but repeated full spinal flexion is what cranky lower backs dislike.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🤸"
  },
  {
    "id": "russian-twist",
    "name": "Russian Twist",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Lean back to 45°, rotate your chest side to side from the ribs.",
    "description": "Seated, lean back until your abs switch on, then rotate side to side, touching the floor beside each hip. Rotate through the mid-back rather than whipping the arms — skip it if twisting under load bothers your spine.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🌀"
  },
  {
    "id": "lying-leg-raise",
    "name": "Lying Leg Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Legs up to vertical, then lower only as far as your lower back stays down.",
    "description": "Lying flat, raise your legs to vertical and lower them toward the floor without letting your lower back peel up — the lowering is the exercise. Bend the knees to make it easier; stop higher the moment your back arches.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🦵"
  },
  {
    "id": "hollow-hold",
    "name": "Hollow Body Hold",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Press your lower back into the floor and hover shoulders and legs — banana shape.",
    "description": "Press your lower back into the floor and lift your shoulders and straight legs a few inches, arms overhead, into a shallow banana shape. Tuck the knees or raise the legs higher to scale it down.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🍌"
  },
  {
    "id": "hanging-knee-raise",
    "name": "Hanging Knee Raise",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "pull-up-bar"
    ],
    "difficulty": "Intermediate",
    "cue": "Hang from a bar; curl your knees up toward your chest, no swinging.",
    "description": "Hang from a pull-up bar and curl your knees up toward your chest by rolling your pelvis, then lower without swinging. Controlling the swing is the whole skill — a slight backward tuck of the pelvis is what works the abs.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🦵"
  },
  {
    "id": "db-weighted-crunch",
    "name": "Weighted Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a dumbbell on your chest; curl your ribs toward your hips.",
    "description": "A crunch with a light dumbbell held against your chest to add resistance to the abs. Keep it a short curl rather than a full sit-up, and don't let the added weight pull your head forward.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🏋️"
  },
  {
    "id": "db-side-bend",
    "name": "Dumbbell Side Bend",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Dumbbell in one hand; bend sideways toward it, then pull straight up.",
    "description": "Hold a dumbbell in one hand and bend sideways toward it, then contract the opposite oblique to pull straight back up. Only load one side at a time and keep the motion strictly side-to-side, not twisting.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🏋️"
  },
  {
    "id": "db-suitcase-hold",
    "name": "Suitcase Carry Hold",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Back",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hold one dumbbell at your side and stand tall — don't let it tip you.",
    "description": "Hold a single heavy dumbbell at one side and either stand tall or walk, resisting the pull that wants to bend you sideways. An anti-lateral-flexion drill that quietly builds a strong, stable core and grip.",
    "avoidIf": [],
    "icon": "🧳"
  },
  {
    "id": "reverse-crunch",
    "name": "Reverse Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Knees bent, curl your hips off the floor toward your ribs.",
    "description": "Lying on your back with knees bent, curl your hips up off the floor toward your ribcage using your lower abs, then lower slowly. It's a small, controlled roll of the pelvis — no throwing the legs for momentum.",
    "avoidIf": [
      "lower-back",
      "pregnancy"
    ],
    "icon": "🤸"
  },
  {
    "id": "bicycle-crunch",
    "name": "Bicycle Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Opposite elbow toward opposite knee, slow and deliberate.",
    "description": "Lying down, bring one elbow toward the opposite knee while extending the other leg, then switch in a slow pedaling motion. The rotation hits the obliques — go slow rather than fast and don't tug on your neck.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🚲"
  },
  {
    "id": "plank-shoulder-tap",
    "name": "Plank Shoulder Tap",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "From a high plank, tap each hand to the opposite shoulder, hips still.",
    "description": "In a high plank with feet wide, tap one hand to the opposite shoulder while keeping your hips from rocking, then alternate. The anti-rotation demand is the point — the slower and stiller your hips, the harder it works.",
    "avoidIf": [
      "wrist",
      "shoulder"
    ],
    "icon": "🧘"
  },
  {
    "id": "v-up",
    "name": "V-Up",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Reach hands to toes, folding into a V, then lower with control.",
    "description": "Lying flat, simultaneously lift your straight legs and torso to reach your hands toward your toes, folding into a V, then lower. A demanding full-length ab move — bend the knees or do tuck-ups to scale it down.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "✅"
  },
  {
    "id": "hollow-rock",
    "name": "Hollow Rock",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Hold the banana shape and rock gently from shoulders to hips.",
    "description": "Get into a hollow hold, then rock your whole rigid body back and forth like a rocking chair without losing the banana shape. The rocking adds a dynamic challenge on top of the hollow hold's tension.",
    "avoidIf": [
      "lower-back",
      "neck",
      "pregnancy"
    ],
    "icon": "🍌"
  },
  {
    "id": "toe-touch-crunch",
    "name": "Toe-Touch Crunch",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Legs up to vertical; reach your hands toward your toes.",
    "description": "Lying with your legs pointed straight up, crunch up and reach your hands toward your toes, then lower your shoulders back down. Keeping the legs vertical takes the hip flexors out and puts the focus on the upper abs.",
    "avoidIf": [
      "neck",
      "pregnancy"
    ],
    "icon": "🦶"
  },
  {
    "id": "plank-reach",
    "name": "Plank Reach-Out",
    "muscleGroup": "Core/Abs",
    "secondaryMuscles": [
      "Shoulders",
      "Back"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "From a forearm plank, reach one arm forward without shifting your hips.",
    "description": "In a forearm plank, extend one arm straight out in front of you and hold briefly before switching, keeping your hips square and level. Removing a support point makes the core fight hard to stop any rotation.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🧘"
  },
  {
    "id": "glute-bridge",
    "name": "Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Drive through your heels and squeeze your glutes to lift your hips.",
    "description": "Lying with knees bent and feet flat, drive your hips up until your body is straight from knees to shoulders, squeeze hard, and lower. The lift should come from the glutes — think 'tuck and lift', not 'arch and push'.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🌉"
  },
  {
    "id": "db-hip-thrust",
    "name": "Dumbbell Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Quads"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Upper back on the bench, dumbbell over your hips — drive up to a flat tabletop.",
    "description": "With your upper back on the bench and a dumbbell held across your hips (pad it), drive your hips up until your torso is level, chin tucked, then lower. The heaviest direct glute loading you can do with dumbbells.",
    "avoidIf": [
      "hip",
      "pregnancy"
    ],
    "icon": "🏋️"
  },
  {
    "id": "single-leg-glute-bridge",
    "name": "Single-Leg Glute Bridge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "One foot down, one leg extended — hips rise level, no tilting.",
    "description": "A glute bridge on one leg with the other held straight or hugged in, which doubles the load on the working glute. Keep the hips level as you rise — a tilting pelvis means the lower back is out-voting the glute.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🌉"
  },
  {
    "id": "donkey-kick",
    "name": "Donkey Kick",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "From all fours, press one flexed foot toward the ceiling, knee bent at 90°.",
    "description": "On hands and knees, keep one knee bent at 90° and press that foot toward the ceiling by squeezing the glute, then lower without touching down. Stop where your back would start to arch — the range is smaller than momentum wants.",
    "avoidIf": [
      "wrist",
      "knee"
    ],
    "icon": "🐴"
  },
  {
    "id": "fire-hydrant",
    "name": "Fire Hydrant",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "From all fours, lift one bent knee out to the side without tilting your hips.",
    "description": "On hands and knees, lift one bent leg out to the side while keeping both hips square to the floor, then lower. Works the side glutes that stabilize every step — height doesn't matter, keeping the torso still does.",
    "avoidIf": [
      "wrist",
      "knee",
      "hip"
    ],
    "icon": "🚒"
  },
  {
    "id": "clamshell",
    "name": "Clamshell",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lie on your side, knees bent, and open the top knee — feet stay together.",
    "description": "Lying on your side with knees bent and stacked, keep your feet touching and lift the top knee open without rolling your pelvis back, then close slowly. A physical-therapy staple for the deep side glutes.",
    "avoidIf": [],
    "icon": "🐚"
  },
  {
    "id": "db-frog-pump",
    "name": "Dumbbell Frog Pump",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Soles of the feet together, knees wide; pump the hips up, dumbbell on the hips.",
    "description": "Lying on your back with the soles of your feet together and knees splayed out, hold a light dumbbell on your hips and pump them up, squeezing the glutes at the top. The frog position biases the work toward the glutes over the hamstrings.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🐸"
  },
  {
    "id": "db-bulgarian-glute",
    "name": "Dumbbell B-Stance Hip Thrust",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Back on the bench; one foot flat, the other just as a kickstand.",
    "description": "A hip thrust with most of the weight on one foot while the other rests lightly forward as a kickstand, so one glute does the lion's share. A dumbbell on the hips loads it; keep both hips rising level.",
    "avoidIf": [
      "hip",
      "pregnancy"
    ],
    "icon": "🏋️"
  },
  {
    "id": "step-through-lunge",
    "name": "Curtsy Lunge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Quads",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Step one leg diagonally behind the other and lower into a curtsy.",
    "description": "From standing, step one foot diagonally behind and across the other, then bend both knees into a curtsy before returning. The crossed angle targets the side glutes strongly — keep your front knee tracking over your foot.",
    "avoidIf": [
      "knee",
      "balance",
      "hip"
    ],
    "icon": "💃"
  },
  {
    "id": "db-single-rdl-glute",
    "name": "Dumbbell Kickstand RDL",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "One foot back on its toes as a kickstand; hinge and drive the front glute.",
    "description": "Hold dumbbells and place one foot slightly back on its toes for balance, then hinge over the front leg and stand by squeezing that glute. The kickstand gives you the single-leg glute focus without the full balance demand.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦵"
  },
  {
    "id": "hip-abduction-side",
    "name": "Side-Lying Leg Raise",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "On your side, raise the top leg straight up, toes pointing forward.",
    "description": "Lying on your side, raise the top leg straight up with the toes pointing forward (not up), then lower slowly to work the side glute. Keeping the toe forward rather than rotated up keeps the focus on the glute, not the hip flexor.",
    "avoidIf": [],
    "icon": "🦵"
  },
  {
    "id": "db-sumo-squat-glute",
    "name": "Dumbbell Sumo Squat",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Quads",
      "Hamstrings"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Wide stance, toes out; hold one dumbbell low and squat between your heels.",
    "description": "Take a wide stance with toes turned out, hold a dumbbell hanging between your legs, and squat straight down, driving your knees out. The wide stance shifts emphasis onto the glutes and inner thighs.",
    "avoidIf": [
      "knee",
      "hip"
    ],
    "icon": "🏋️"
  },
  {
    "id": "glute-bridge-march",
    "name": "Glute Bridge March",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Core/Abs",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a bridge and slowly lift one foot, then the other — hips stay level.",
    "description": "Hold the top of a glute bridge and slowly march one foot up at a time while keeping your hips from dropping or tilting. The support glute has to work overtime to keep everything level.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🌉"
  },
  {
    "id": "reverse-hyper-bench",
    "name": "Bench Reverse Hyper",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Back"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hips on the bench edge, torso down; raise straight legs to level, no higher.",
    "description": "Lie face-down with your hips at the edge of the bench and legs hanging, then raise your straight legs up to body level by squeezing the glutes. Stop at level rather than swinging higher, which just arches the lower back.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🍑"
  },
  {
    "id": "db-good-glute-morning",
    "name": "Dumbbell Hip Hinge",
    "muscleGroup": "Glutes",
    "secondaryMuscles": [
      "Hamstrings",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Dumbbells at your sides; push your hips straight back, then stand tall.",
    "description": "Hold light dumbbells at your sides and push your hips straight back with a flat back until you feel the glutes and hamstrings load, then drive your hips forward to stand. The foundational hinge pattern — master it light before loading heavy.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🍑"
  },
  {
    "id": "bodyweight-squat",
    "name": "Bodyweight Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Sit back and down between your hips, chest up, heels planted.",
    "description": "Feet about shoulder width, sit down between your hips as deep as comfortable and stand back up, knees tracking in line with the toes. The most useful pattern in the library — the depth that feels strong is your depth.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵"
  },
  {
    "id": "goblet-squat",
    "name": "Goblet Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Hug one dumbbell at your chest — it counterbalances you into a deeper squat.",
    "description": "Hold a dumbbell vertically against your chest and squat; the front-loaded weight acts as a counterbalance so most people squat deeper and more upright. The thinking person's first loaded squat.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️"
  },
  {
    "id": "forward-lunge",
    "name": "Forward Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Step forward, lower the back knee toward the floor, push back to standing.",
    "description": "Step forward into a split stance and lower until both knees near 90°, then push off the front foot to return. The braking of the forward step is what makes it harder on the knees than its reverse cousin.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵"
  },
  {
    "id": "reverse-lunge",
    "name": "Reverse Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Step backward into the lunge — easier on the knees than stepping forward.",
    "description": "Step one foot backward and lower the back knee toward the floor, then drive through the front heel to stand. Removing the forward braking step makes this the knee-friendlier lunge and easier to balance.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵"
  },
  {
    "id": "bulgarian-split-squat",
    "name": "Bulgarian Split Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Rear foot on the bench, drop straight down — the front leg does the work.",
    "description": "A split squat with your rear foot on the bench behind you and dumbbells at your sides, loading one leg hard with none of the spinal load of a barbell. Find the foot spacing before adding weight; the balance is half the battle.",
    "avoidIf": [
      "knee",
      "balance",
      "hip"
    ],
    "icon": "🦵"
  },
  {
    "id": "wall-sit",
    "name": "Wall Sit",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Back flat on the wall, thighs parallel to the floor, and hold.",
    "description": "Slide down a wall until your thighs are parallel and knees are over your ankles, then hold the invisible chair with your hands off your legs. Raise the seat height (shallower angle) to make it kinder to the knees.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🪑"
  },
  {
    "id": "step-up",
    "name": "Step-Up",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Whole foot on the bench; drive through that heel without pushing off the floor leg.",
    "description": "Step onto the bench, driving up through the leading leg until you stand tall on it, then step down with control. The honest version barely pushes off the bottom foot — lower the step if you can't help cheating.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵"
  },
  {
    "id": "db-step-up",
    "name": "Dumbbell Step-Up",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Dumbbells at your sides; step up under control, no bouncing off the floor.",
    "description": "A step-up onto the bench holding a dumbbell in each hand, adding real load to a very functional pattern. Keep the movement slow and honest — push through the top foot, don't spring off the bottom one.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🏋️"
  },
  {
    "id": "db-squat",
    "name": "Dumbbell Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "A dumbbell in each hand at your sides; squat down and stand tall.",
    "description": "Hold a dumbbell in each hand at your sides and squat to a comfortable depth, then stand. Loading at your sides keeps your torso upright and is an easy way to add weight once bodyweight squats feel light.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️"
  },
  {
    "id": "db-front-squat",
    "name": "Dumbbell Front Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Rest dumbbells on your shoulders; squat with an upright chest.",
    "description": "Hold two dumbbells on the front of your shoulders and squat, keeping your torso tall and elbows up. The front-loaded position hammers the quads and demands an upright, braced trunk.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️"
  },
  {
    "id": "split-squat",
    "name": "Static Split Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Feet split front and back; drop straight down, no stepping.",
    "description": "Set your feet in a split stance and lower straight down until the back knee nears the floor, then press up — all reps on one side before switching. Staying in place makes it easier to balance than a lunge while still loading each leg.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵"
  },
  {
    "id": "cossack-squat",
    "name": "Cossack Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Wide stance; shift onto one bent leg while the other stays straight.",
    "description": "From a very wide stance, shift your weight down onto one bent leg while the other stays straight with the toe up, then push back to center and switch. A deep, mobility-heavy squat — ease into the depth over time.",
    "avoidIf": [
      "knee",
      "hip",
      "balance"
    ],
    "icon": "🦵"
  },
  {
    "id": "pause-squat",
    "name": "Paused Bodyweight Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Sit to the bottom, hold three seconds, then stand.",
    "description": "A bodyweight squat with a three-second pause at the bottom, which removes any bounce and makes the legs work from a dead stop. The pause builds control and makes bodyweight surprisingly challenging.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🦵"
  },
  {
    "id": "wall-sit-march",
    "name": "Wall Sit March",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a wall sit and slowly lift one foot, then the other.",
    "description": "Hold a wall sit and slowly march one foot up at a time while keeping your hips level against the wall. Lifting a foot doubles the load on the standing leg and adds a balance element to the burn.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🪑"
  },
  {
    "id": "sissy-squat",
    "name": "Sissy Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Hold support, rise on your toes, and lean back bending only your knees.",
    "description": "Holding a support for balance, rise onto your toes and lean your torso back as you bend your knees forward, keeping hips and shoulders in line. It isolates the quads intensely and stretches them hard — build up slowly, and skip it if your knees object.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵"
  },
  {
    "id": "heel-elevated-squat",
    "name": "Heel-Elevated Goblet Squat",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Heels on a small plate or wedge; hug a dumbbell and squat deep.",
    "description": "A goblet squat with your heels slightly raised, which lets you sit straighter and deeper and shifts more work onto the quads. Great for taller people or anyone whose squat depth feels blocked at the ankles.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🏋️"
  },
  {
    "id": "tempo-lunge",
    "name": "Slow Tempo Reverse Lunge",
    "muscleGroup": "Quads",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Three seconds down into the lunge, pause, then drive up.",
    "description": "A reverse lunge slowed to a three-second descent with a pause at the bottom, which builds control and single-leg strength without any load. The slow tempo also lightens the impact on the knee compared to fast reps.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🦵"
  },
  {
    "id": "db-rdl",
    "name": "Dumbbell Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Push your hips straight back, soft knees, until the hamstrings pull the brakes.",
    "description": "Holding dumbbells in front of your thighs, hinge by pushing your hips back with a proud chest and slight knee bend, lowering until the hamstrings hit their stretch, then drive the hips forward. A rounding back is the signal to stop shallower.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️"
  },
  {
    "id": "single-leg-rdl",
    "name": "Single-Leg Romanian Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Hinge on one leg, the other extending behind you as a counterweight.",
    "description": "Balance on one leg and hinge forward, letting the free leg extend straight behind you until your body forms a T, then return. Hamstrings plus a serious balance challenge — keep fingertips on a wall while learning.",
    "avoidIf": [
      "lower-back",
      "balance"
    ],
    "icon": "🦩"
  },
  {
    "id": "nordic-curl",
    "name": "Nordic Hamstring Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Ankles anchored, kneel tall, and lower your body forward as slowly as possible.",
    "description": "Kneel with your ankles anchored under the bench and lower your straight body toward the floor using only your hamstrings as brakes, catching yourself with your hands. Even a few clean negatives are elite-level.",
    "avoidIf": [
      "knee"
    ],
    "icon": "🧎"
  },
  {
    "id": "db-stiff-leg-deadlift",
    "name": "Dumbbell Stiff-Leg Deadlift",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Nearly straight knees; hinge and lower the dumbbells down your shins.",
    "description": "Like a Romanian deadlift but with the knees kept nearly straight, which puts an even bigger stretch on the hamstrings. Keep a flat back and only go as low as your hamstring flexibility allows without rounding.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️"
  },
  {
    "id": "db-b-stance-rdl",
    "name": "Dumbbell B-Stance RDL",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "One foot back on its toes as a kickstand; hinge over the front leg.",
    "description": "A Romanian deadlift with one foot set back on its toes as a light kickstand, biasing most of the load onto the front hamstring without the full balance test of a single-leg version. A great bridge toward true single-leg work.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦵"
  },
  {
    "id": "slider-leg-curl",
    "name": "Sliding Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Heels on sliders in a bridge; slide your feet out, then curl them back.",
    "description": "In a glute bridge with your heels on towels or sliders, slide your feet out until your legs are almost straight, then curl them back in while keeping your hips up. A tough bodyweight hamstring curl — bend one leg to assist if needed.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🛝"
  },
  {
    "id": "bench-hamstring-walkout",
    "name": "Glute Bridge Walkout",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hold a bridge; walk your heels out step by step, then back in.",
    "description": "Hold a glute bridge and slowly step your heels away from your hips one at a time until your legs are long, then walk them back in, keeping the hips lifted throughout. The further out your feet, the harder the hamstrings work.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🌉"
  },
  {
    "id": "db-single-leg-rdl-supported",
    "name": "Kickstand RDL (Hamstring)",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Toes of the back foot down for balance; hinge over the front leg.",
    "description": "Hold dumbbells with one foot slightly back on its toes and hinge over the front leg, feeling the hamstring load, then stand. The kickstand foot removes the balance struggle so you can focus on the hinge and the stretch.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🦵"
  },
  {
    "id": "prone-hamstring-curl-db",
    "name": "Prone Dumbbell Leg Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Calves"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Lie face-down, squeeze a light dumbbell between your feet, curl your heels up.",
    "description": "Lying face-down on the bench, pinch a light dumbbell between your feet and curl your heels toward your glutes, then lower slowly. A homemade lying leg curl — start with the lightest dumbbell you can grip securely.",
    "avoidIf": [],
    "icon": "🦵"
  },
  {
    "id": "good-morning-bw",
    "name": "Bodyweight Good Morning",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Hands behind your head; bow forward from the hips with a flat back.",
    "description": "With hands behind your head and knees soft, bow your torso forward from the hips until you feel the hamstrings load, then stand tall by squeezing them. A gentle, unloaded way to groove the hinge and warm up the posterior chain.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🌅"
  },
  {
    "id": "db-good-morning",
    "name": "Dumbbell Good Morning",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Hold one dumbbell at your chest; bow forward with a locked-flat spine.",
    "description": "Hold a dumbbell against your upper chest and hinge forward until your torso approaches parallel, then stand by driving the hips forward. The load sits far from your hips, so keep it light and your back granite-flat.",
    "avoidIf": [
      "lower-back",
      "hip"
    ],
    "icon": "🌅"
  },
  {
    "id": "single-leg-hip-hinge-reach",
    "name": "Single-Leg Hinge Reach",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Balance on one leg; hinge and reach your hands toward the floor.",
    "description": "Stand on one leg and hinge forward, reaching your hands toward the floor while the free leg floats back, then return to standing tall. An unloaded single-leg RDL that builds hamstring control and balance at the same time.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🦩"
  },
  {
    "id": "seated-db-leg-curl",
    "name": "Seated Dumbbell Hamstring Curl",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Sit on the bench edge, dumbbell between your feet, curl your lower legs back.",
    "description": "Perch on the edge of the bench with a light dumbbell held between your feet and curl your lower legs back underneath you, then extend. A simple seated curl variation for the hamstrings when you have no machine.",
    "avoidIf": [],
    "icon": "🦵"
  },
  {
    "id": "hamstring-bridge-hold",
    "name": "Long-Lever Bridge Hold",
    "muscleGroup": "Hamstrings",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Heels far from your hips, only the heels down; hold the bridge high.",
    "description": "Set up a glute bridge with your heels placed far from your hips and only your heels on the floor, then hold the top position, which loads the hamstrings much more than a normal bridge. Add a light single-leg version once it feels easy.",
    "avoidIf": [
      "pregnancy"
    ],
    "icon": "🌉"
  },
  {
    "id": "standing-calf-raise",
    "name": "Standing Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Rise to your tiptoes, pause at the top, lower until you feel a heel stretch.",
    "description": "Stand tall with fingertips on a wall for balance, rise onto the balls of your feet, pause, and lower until your heels feel a gentle stretch. A step edge gives extra range — calves respond to full range and patience, not bouncing.",
    "avoidIf": [],
    "icon": "🦶"
  },
  {
    "id": "single-leg-calf-raise",
    "name": "Single-Leg Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "All your weight on one foot — full rise, full stretch, no bouncing.",
    "description": "A calf raise on one leg, doubling the load and exposing how much stronger one side is. Hold a wall with one hand; the single-leg stance is itself a small balance drill.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🦶"
  },
  {
    "id": "db-calf-raise",
    "name": "Dumbbell Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Dumbbell in one hand, other hand on the wall — raise, pause, stretch.",
    "description": "A standing calf raise holding a dumbbell in one hand while the other hand steadies you against a wall. The simplest way to add load to calves at home — do all reps one side, then swap the weight over.",
    "avoidIf": [],
    "icon": "🦶"
  },
  {
    "id": "db-seated-calf-raise",
    "name": "Seated Dumbbell Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Sit on the bench, dumbbells on your knees; press up through the balls of your feet.",
    "description": "Sit on the bench with dumbbells resting on your knees and raise your heels through a full range, then lower into a stretch. The bent knee shifts the work to the soleus, the deep calf muscle a standing raise mostly misses.",
    "avoidIf": [],
    "icon": "🦶"
  },
  {
    "id": "toe-walk",
    "name": "Toe Walks",
    "muscleGroup": "Calves",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Walk on your tiptoes, tall as possible, heels never touching down.",
    "description": "Rise onto the balls of your feet and walk, staying as tall as you can for a slow lap of the room. Ankle strength, calf endurance, and a little balance practice disguised as a silly walk.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🩰"
  },
  {
    "id": "step-calf-raise",
    "name": "Deficit Calf Raise",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Balls of your feet on a step edge; drop the heels low, then press high.",
    "description": "Stand with the balls of your feet on the edge of a step and let your heels drop below the step for a deep stretch before pressing all the way up. The added range at the bottom is what makes calves grow.",
    "avoidIf": [],
    "icon": "🦶"
  },
  {
    "id": "db-jump-rope-calf",
    "name": "Calf Raise Pulse",
    "muscleGroup": "Calves",
    "secondaryMuscles": [],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Small fast pulses at the top of a calf raise, staying on your toes.",
    "description": "Rise onto your toes and perform small, fast pulses near the top of the range without dropping your heels all the way down, keeping constant tension on the calves. A burnout finisher — no jumping, just quick controlled pulses.",
    "avoidIf": [],
    "icon": "🦶"
  },
  {
    "id": "db-farmer-calf",
    "name": "Loaded Calf Raise Hold",
    "muscleGroup": "Calves",
    "secondaryMuscles": [
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "Heavy dumbbells at your sides; rise onto your toes and hold at the top.",
    "description": "Hold a heavy dumbbell in each hand, rise onto your toes, and hold the top position for time, which trains the calves isometrically along with your grip and posture. Stay tall and controlled; use a wall if balance wavers.",
    "avoidIf": [
      "balance"
    ],
    "icon": "🦶"
  },
  {
    "id": "burpee",
    "name": "Burpee",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Chest",
      "Quads",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Squat, kick back to a plank, push-up, jump feet in, leap — repeat.",
    "description": "Drop your hands down, kick back to a plank with an optional push-up, hop your feet in, and jump up. The whole gym in one movement — but a lot of impact through wrists and knees; step the feet in and skip the jump for a gentler version.",
    "avoidIf": [
      "knee",
      "high-impact",
      "wrist",
      "pregnancy"
    ],
    "icon": "🔥"
  },
  {
    "id": "jump-squat",
    "name": "Jump Squat",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Advanced",
    "cue": "Squat down, explode up, and land soft like landing on eggshells.",
    "description": "A bodyweight squat that finishes with a jump, landing softly into the next rep. Builds explosive power and spikes the heart rate — the landing is the skill; if joints complain, regular squats deliver most of the benefit.",
    "avoidIf": [
      "knee",
      "high-impact",
      "pregnancy"
    ],
    "icon": "🦘"
  },
  {
    "id": "jumping-jack",
    "name": "Jumping Jacks",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Jump feet wide as arms swing overhead, then snap back together.",
    "description": "Jump your feet out wide while your arms swing overhead, then jump back to standing. A friendly whole-body warm-up — for a no-impact version, step one foot out at a time while the arms do the same swing.",
    "avoidIf": [
      "knee",
      "high-impact"
    ],
    "icon": "⭐"
  },
  {
    "id": "high-knees",
    "name": "High Knees",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Calves",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Run in place, driving knees to hip height, quick light feet.",
    "description": "Sprint in place, driving each knee toward hip height with fast, light ground contacts and pumping arms. Twenty seconds of honest effort is a real interval — marching is the calm, no-impact alternative.",
    "avoidIf": [
      "knee",
      "high-impact",
      "hip"
    ],
    "icon": "🏃"
  },
  {
    "id": "shadow-boxing",
    "name": "Shadow Boxing",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Core/Abs"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Light on your feet, snappy punches at an imaginary target — never full lockout.",
    "description": "Bounce lightly and throw combinations at the air, rotating through the hips with each punch. Cardio, coordination, and stress relief with no equipment — keep a slight bend at the end of every punch to spare the elbows.",
    "avoidIf": [
      "shoulder"
    ],
    "icon": "🥊"
  },
  {
    "id": "mountain-climber",
    "name": "Mountain Climbers",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders",
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "From a plank, drive knees toward your chest in a fast alternating rhythm.",
    "description": "In a high plank, run your knees toward your chest one at a time while your shoulders stay stacked over your wrists. Slow it to a march to drop the impact and keep the core work; the fast version earns the tags.",
    "avoidIf": [
      "wrist",
      "knee",
      "high-impact"
    ],
    "icon": "⛰️"
  },
  {
    "id": "db-swing",
    "name": "Dumbbell Swing",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Back",
      "Core/Abs"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Intermediate",
    "cue": "It's a hip snap, not an arm lift — the dumbbell floats to chest height.",
    "description": "Hold one dumbbell by the head with both hands, hinge and hike it back between your legs, then snap your hips forward so it floats up to chest height. Every swing is a hip hinge — a rounded back turns it into a lower-back grievance.",
    "avoidIf": [
      "lower-back"
    ],
    "icon": "🏋️"
  },
  {
    "id": "bear-crawl",
    "name": "Bear Crawl",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders",
      "Quads"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "Hands and feet down, knees hovering an inch off the floor — crawl slow and level.",
    "description": "On hands and feet with knees hovering just off the ground, crawl forward moving opposite hand and foot together while keeping your back flat. Surprisingly humbling core and shoulder work — speed isn't the goal, a still torso is.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🐻"
  },
  {
    "id": "march-in-place",
    "name": "March in Place",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Lift knees to a comfortable height with a steady rhythm and swinging arms.",
    "description": "March on the spot, lifting the knees to a comfortable height and swinging the arms naturally. The gentlest conditioning option — a warm-up, a between-sets breather, or the low-impact stand-in for anything with jumping.",
    "avoidIf": [],
    "icon": "🚶"
  },
  {
    "id": "db-thruster",
    "name": "Dumbbell Thruster",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Shoulders",
      "Triceps"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Front squat straight into an overhead press — one fluid motion.",
    "description": "Hold dumbbells at your shoulders, squat, and use the drive out of the squat to press them overhead in one motion, then lower into the next rep. A squat, a press, and a cardio interval in one — three sets of joints all need to sign off.",
    "avoidIf": [
      "shoulder",
      "knee",
      "lower-back"
    ],
    "icon": "🚀"
  },
  {
    "id": "farmers-carry",
    "name": "Farmer's Carry",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Back",
      "Shoulders"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Beginner",
    "cue": "Heavy dumbbell in each hand, stand tall, and just walk.",
    "description": "Pick up a heavy dumbbell in each hand and walk with tall posture, level shoulders, and unhurried steps for distance or time. Grip, core, posture, and conditioning from the most functional movement there is — carrying heavy things.",
    "avoidIf": [],
    "icon": "🧳"
  },
  {
    "id": "db-clean-press",
    "name": "Dumbbell Clean & Press",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Quads",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "Pull the dumbbells to your shoulders, then press overhead, then reverse.",
    "description": "From a hinge, pull two dumbbells up to your shoulders in one quick move, then press them overhead, then reverse the whole thing under control. A full-body power builder — keep the hinge flat-backed and the press honest.",
    "avoidIf": [
      "shoulder",
      "lower-back"
    ],
    "icon": "🚀"
  },
  {
    "id": "db-snatch",
    "name": "Single-Arm Dumbbell Snatch",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Glutes",
      "Back"
    ],
    "equipment": [
      "dumbbell"
    ],
    "difficulty": "Advanced",
    "cue": "One dumbbell from between your feet to overhead in one snap.",
    "description": "Explosively pull a single dumbbell from a hinge between your feet straight up to a locked-out overhead position, then lower and repeat. Powerful and cardio-heavy — it demands a solid hinge and a stable overhead, so build up light.",
    "avoidIf": [
      "shoulder",
      "lower-back",
      "wrist"
    ],
    "icon": "⚡"
  },
  {
    "id": "squat-thrust",
    "name": "Squat Thrust",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Quads",
      "Shoulders"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Intermediate",
    "cue": "A burpee without the jump — squat, kick to plank, hop back, stand.",
    "description": "Squat down, kick your feet back to a plank, hop them back in, and stand — a burpee minus the jump and push-up. Most of the conditioning of a burpee with far less impact through the knees.",
    "avoidIf": [
      "wrist",
      "hip"
    ],
    "icon": "🔥"
  },
  {
    "id": "lateral-shuffle",
    "name": "Lateral Shuffle",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Stay low in a quarter squat and shuffle side to side, quick feet.",
    "description": "Sink into a quarter squat and shuffle sideways several steps one way, then back, staying low with quick light feet. A knee-friendly cardio option with no jumping that also lights up the outer hips.",
    "avoidIf": [
      "knee"
    ],
    "icon": "↔️"
  },
  {
    "id": "inchworm",
    "name": "Inchworm",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Core/Abs",
      "Shoulders",
      "Hamstrings"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Hinge, walk your hands out to a plank, walk your feet in, stand.",
    "description": "Hinge and walk your hands out along the floor into a plank, then walk your feet up toward your hands and stand tall. A gentle full-body warm-up that mobilizes the hamstrings and shoulders in one flowing move.",
    "avoidIf": [
      "wrist"
    ],
    "icon": "🐛"
  },
  {
    "id": "step-up-cardio",
    "name": "Fast Step-Ups",
    "muscleGroup": "Full Body/Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": [
      "bodyweight"
    ],
    "difficulty": "Beginner",
    "cue": "Quick alternating step-ups onto the bench, driving your arms.",
    "description": "Step up and down onto the bench at a brisk pace, alternating your lead foot and pumping your arms for rhythm. A simple, low-impact cardio driver — the bench height sets the intensity.",
    "avoidIf": [
      "knee",
      "balance"
    ],
    "icon": "🪜"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MUSCLE_GROUPS, EQUIPMENT, CONDITIONS, EXERCISES };
}
