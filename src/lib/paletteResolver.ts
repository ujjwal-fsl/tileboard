// src/lib/paletteResolver.ts

export type PaletteName =
  | "Honey"
  | "Blue"
  | "Rose"
  | "Mint"
  | "Terracotta"
  | "Lavender"
  | "Sunflower"
  | "Teal"
  | "Peach"
  | "Oat"
  | "Lilac"
  | "Sage";

/**
 * Resolves a deterministic palette based on the immutable task ID.
 */
export function resolvePalette(taskId: string): PaletteName {
  const paletteOrder: PaletteName[] = [
    "Honey", "Blue", "Rose", "Mint",
    "Terracotta", "Lavender", "Sunflower", "Teal",
    "Peach", "Oat", "Lilac", "Sage",
  ];
  const index = hashStringToRange(taskId, paletteOrder.length);
  return paletteOrder[index];
}

function hashStringToRange(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
}
