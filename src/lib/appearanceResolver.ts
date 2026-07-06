// src/lib/appearanceResolver.ts

// This module provides a pure, stateless resolver pipeline for task appearance.
// It builds on the existing identity resolver (resolveTaskIdentity) and visual style
// resolver (resolveTaskVisualStyle) defined in colors.ts. The new function
// resolveTaskAppearance combines these steps while exposing the visualStyle and
// resolvedMode parameters required by the UI layer.

import { resolveTaskIdentity, resolveTaskVisualStyle } from "@/lib/colors";
import type { TaskIdentity, TaskVisualStyleTokens } from "@/lib/colors";
import { designTokens } from '@/lib/designTokens';

export function mapTokensToTailwindClasses(
  tokens: TaskVisualStyleTokens,
  mode: "light" | "dark"
) {
  const bgClass =
    mode === "dark"
      ? designTokens.bgDark[tokens.bgToken as keyof typeof designTokens.bgDark]
      : designTokens.bg[tokens.bgToken as keyof typeof designTokens.bg];
  const borderClass = designTokens.border[tokens.borderToken];
  const textClass =
    mode === "dark"
      ? designTokens.textDark[tokens.textToken as keyof typeof designTokens.textDark]
      : designTokens.text[tokens.textToken as keyof typeof designTokens.text];
  const categoryClass = designTokens.category[tokens.categoryToken];
  const checkmarkClass = designTokens.checkmark[tokens.checkmarkToken];
  return { bgClass, borderClass, textClass, categoryClass, checkmarkClass } as const;
}


/**
 * Resolve a task's appearance based on its identity, the user‑selected visual style,
 * and the resolved colour mode (light/dark).
 *
 * The function is deterministic and side‑effect free: given the same inputs it will
 * always return the same output. The visualStyle and resolvedMode arguments are kept
 * for future extensions (e.g., alternate colour palettes for "pop" style) but are
 * currently not used in the colour calculations.
 */
export function resolveTaskAppearance(
  identity: TaskIdentity,
  visualStyle: "pastel" | "pop",
  resolvedMode: "light" | "dark"
): TaskVisualStyleTokens {
  // At present the colour system does not differentiate between visual styles
  // or light/dark modes – palette colours are already designed to work for both.
  // The arguments are retained to satisfy the public API and allow easy future
  // extension without breaking existing callers.
  //
  // If needed, callers could switch on visualStyle/resolvedMode to select a
  // different mapping. For now we simply delegate to the existing visual style
  // resolver.
  return resolveTaskVisualStyle(identity);
}

export { resolveTaskIdentity };
