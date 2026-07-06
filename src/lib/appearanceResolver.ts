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
  padding: string;        // Layout padding (p-3.5 vs p-3)
  hoverClass: string;     // Desktop hover styles
  interactiveClass: string; // Active scaling/press styles
  shadowClass: string;    // Base elevation shadow
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

  // 1. Padding decision based entirely on priority
  const padding = identity.priority === "big" ? "p-3.5" : "p-3";

  // 2. Base shadow from style definition
  const shadowClass = styleDef.shadowClass;

  // 3. Hover and active classes determined by completion status
  const hoverClass = !identity.isCompleted ? styleDef.hoverClass : "";
  const interactiveClass = !identity.isCompleted ? styleDef.interactiveClass : "";

  // 4. Handle carried forward logic
  if (identity.isCarriedForward) {
    return {
      background: "bg-[#FFFBEB]",
      border: "border border-amber-600/[0.12]",
      text: "text-gray-900",
      category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
      checkmark: "text-gray-500",
      completedClass: "",
      padding,
      hoverClass,
      interactiveClass,
      shadowClass,
    };
  }

  const paletteColors = styleDef.colors[resolvedMode][identity.palette];
  const tierKey = identity.priority === "big" ? "high" : identity.priority === "medium" ? "medium" : "low";

  let background = "";
  let completedClass = "";

  // 5. Completed state styling decisions
  if (identity.isCompleted) {
    completedClass = styleDef.completedBaseClass; // Tile base completion styles
    if (styleDef.type === "hierarchical" && paletteColors.completed) {
      background = paletteColors.completed;
    } else {
      background = paletteColors[tierKey];
      completedClass += " opacity-40 grayscale-[40%]";
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
    padding,
    hoverClass,
    interactiveClass,
    shadowClass,
  };
}

