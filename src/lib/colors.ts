import { Task } from "@/types/task";

export type PaletteId =
  | "palette-01" // Honey
  | "palette-02" // Sunflower
  | "palette-03" // Peach
  | "palette-04" // Terracotta
  | "palette-05" // Rose
  | "palette-06" // Sage
  | "palette-07" // Mint
  | "palette-08" // Teal
  | "palette-09" // Powder Blue
  | "palette-10" // Lavender
  | "palette-11" // Lilac
  | "palette-12"; // Oat

export interface TaskIdentity {
  paletteId: PaletteId;
  tier: "low" | "medium" | "high";
  isCompleted: boolean;
  isCarriedForward: boolean;
}

export interface TaskVisualStyleTokens {
  bgToken: string;
  borderToken: "default-border" | "completed-border" | "cf-border";
  textToken: "default-text" | "completed-text";
  categoryToken: "default-category" | "completed-category";
  checkmarkToken: "default-checkmark" | "completed-checkmark";
}

const PALETTE_IDS: PaletteId[] = [
  "palette-01", "palette-02", "palette-03", "palette-04",
  "palette-05", "palette-06", "palette-07", "palette-08",
  "palette-09", "palette-10", "palette-11", "palette-12"
];

function hashStringToRange(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
}

/**
 * Layer 1: Resolves raw task data into semantic identity tokens.
 * Fallbacks are laid out clearly for future custom colors and categories.
 */
export function resolveTaskIdentity(task: Task): TaskIdentity {
  // 1. Explicit User Palette choice (Future capability: task.paletteId override)
  // if (task.paletteId && PALETTE_IDS.includes(task.paletteId as PaletteId)) {
  //   return {
  //     paletteId: task.paletteId as PaletteId,
  //     ...
  //   };
  // }

  // 2. Category Palette mapping (Future capability)
  // 3. Project Palette mapping (Future capability)
  // 4. Stored Palette ID (Future capability)

  // 5. Deterministic fallback hashing based on stable task ID
  const index = hashStringToRange(task.id, PALETTE_IDS.length);
  return {
    paletteId: PALETTE_IDS[index] || "palette-12",
    tier: task.priority === "big" ? "high" : task.priority === "medium" ? "medium" : "low",
    isCompleted: task.status === "completed",
    isCarriedForward: !!task.isCarriedForward,
  };
}

/**
 * Layer 2: Maps identity tokens into design system visual tokens.
 * Exposes design tokens without exposing Tailwind utility classes directly.
 */
export function resolveTaskVisualStyle(identity: TaskIdentity): TaskVisualStyleTokens {
  if (identity.isCarriedForward) {
    return {
      bgToken: "cf-bg",
      borderToken: "cf-border",
      textToken: "default-text",
      categoryToken: "default-category",
      checkmarkToken: "default-checkmark",
    };
  }

  const bgSuffix = identity.isCompleted ? "completed" : identity.tier;

  return {
    bgToken: `${identity.paletteId}-${bgSuffix}`,
    borderToken: identity.isCompleted ? "completed-border" : "default-border",
    textToken: identity.isCompleted ? "completed-text" : "default-text",
    categoryToken: identity.isCompleted ? "completed-category" : "default-category",
    checkmarkToken: identity.isCompleted ? "completed-checkmark" : "default-checkmark",
  };
}
