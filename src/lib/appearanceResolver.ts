// src/lib/appearanceResolver.ts

import type { Task } from "@/types/task";
import { resolvePalette } from "./paletteResolver";
import type { PaletteName } from "./paletteResolver";
import { themes } from "./themes";
import type { VisualStyleDefinition } from "./themes";

export interface TaskIdentity {
  palette: PaletteName;
  priority: "small" | "medium" | "big";
  isCompleted: boolean;
  isCarriedForward: boolean;
}

export interface TaskAppearance {
  background: string;
  border: string;
  text: string;
  category: string;
  checkmark: string;
  completedClass: string; // Dynamic presentation style classes
}

/**
 * Layer 1: Resolves raw task data into semantic identity tokens.
 */
export function resolveTaskIdentity(task: Task): TaskIdentity {
  const resolvedPalette = resolvePalette(task.id);
  return {
    palette: resolvedPalette,
    priority: task.priority,
    isCompleted: task.status === "completed",
    isCarriedForward: !!task.isCarriedForward,
  };
}

/**
 * Layer 2: Resolves a task's appearance based on its identity, the user‑selected visual style,
 * and the resolved color mode (light/dark).
 */
export function resolveTaskAppearance(
  identity: TaskIdentity,
  visualStyle: VisualStyleDefinition | "pastel" | "pop",
  resolvedMode: "light" | "dark"
): TaskAppearance {
  // Backward compatibility: if visualStyle is passed as a string, look it up in themes
  const styleDef = typeof visualStyle === "string" ? themes[visualStyle] : visualStyle;

  if (identity.isCarriedForward) {
    return {
      background: "bg-[#FFFBEB]",
      border: "border border-amber-600/[0.12]",
      text: "text-gray-900",
      category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
      checkmark: "text-gray-500",
      completedClass: "",
    };
  }

  const paletteColors = styleDef.colors[resolvedMode][identity.palette];
  const tierKey = identity.priority === "big" ? "high" : identity.priority === "medium" ? "medium" : "low";

  let background = "";
  let completedClass = "";

  if (identity.isCompleted) {
    if (styleDef.type === "hierarchical" && paletteColors.completed) {
      background = paletteColors.completed;
    } else {
      background = paletteColors[tierKey];
      completedClass = "opacity-40 grayscale-[40%]";
    }
  } else {
    background = paletteColors[tierKey];
  }

  return {
    background,
    border: identity.isCompleted ? "border border-black/[0.03]" : paletteColors.border,
    text: identity.isCompleted ? "text-gray-500" : paletteColors.text,
    category: identity.isCompleted
      ? "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-500/40"
      : paletteColors.category,
    checkmark: paletteColors.checkmark,
    completedClass,
  };
}

// Backward compatibility: mapTokensToTailwindClasses
// We keep it as a stub so existing callers don't crash if any are left during the transition,
// but in Tile.tsx we'll refactor it to use the new TaskAppearance properties directly.
export function mapTokensToTailwindClasses(
  tokens: any,
  mode: "light" | "dark"
) {
  // If tokens is already a TaskAppearance object, return it in the format of the old mapping
  if (tokens && typeof tokens === "object" && "background" in tokens) {
    return {
      bgClass: tokens.background,
      borderClass: tokens.border,
      textClass: tokens.text,
      categoryClass: tokens.category,
      checkmarkClass: tokens.checkmark,
      completedClass: tokens.completedClass,
    };
  }
  return {
    bgClass: "",
    borderClass: "",
    textClass: "",
    categoryClass: "",
    checkmarkClass: "",
    completedClass: "",
  };
}
