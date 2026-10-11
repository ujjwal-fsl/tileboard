/**
 * Palette Resolver for TileBoard
 * 
 * Provides stable, deterministic color identity for tasks.
 * Task priority determines saturation, NOT hue.
 * Each task's hue is independently and deterministically assigned from its unique task ID.
 */

export type PaletteId =
  | "honey"
  | "sunflower"
  | "peach"
  | "terracotta"
  | "rose"
  | "sage"
  | "mint"
  | "teal"
  | "powder-blue"
  | "lavender"
  | "lilac"
  | "oat";

export const PALETTES: readonly PaletteId[] = [
  "honey",
  "sunflower",
  "peach",
  "terracotta",
  "rose",
  "sage",
  "mint",
  "teal",
  "powder-blue",
  "lavender",
  "lilac",
  "oat",
] as const;

export const PALETTE_NAMES: Record<PaletteId, string> = {
  honey: "Honey",
  sunflower: "Sunflower",
  peach: "Peach",
  terracotta: "Terracotta",
  rose: "Rose",
  sage: "Sage",
  mint: "Mint",
  teal: "Teal",
  "powder-blue": "Powder Blue",
  lavender: "Lavender",
  lilac: "Lilac",
  oat: "Oat",
};

export type PriorityLevel = "small" | "medium" | "big";

export interface TaskIdentity {
  taskId: string;
  palette: PaletteId;
  priority: PriorityLevel;
  status: "active" | "completed";
  isCarriedForward?: boolean;
}

/**
 * Normalizes any priority representation (small/medium/big, low/medium/high, 1/2/3)
 * into canonical "small" | "medium" | "big".
 */
export function normalizePriority(priority: unknown): PriorityLevel {
  if (typeof priority === "number") {
    if (priority >= 3) return "big";
    if (priority === 2) return "medium";
    return "small";
  }

  if (typeof priority === "string") {
    const p = priority.toLowerCase().trim();
    if (p === "big" || p === "high" || p === "3") return "big";
    if (p === "medium" || p === "2") return "medium";
    if (p === "small" || p === "low" || p === "1") return "small";
  }

  return "small";
}

/**
 * Robust string hashing function for deterministic palette resolution.
 * Returns a non-negative 32-bit integer.
 */
export function hashTaskId(taskId: string): number {
  if (!taskId) return 0;
  let hash = 0;
  for (let i = 0; i < taskId.length; i++) {
    const char = taskId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Assigns an immutable, deterministic palette identity strictly from the task ID.
 * The hue assignment remains completely stable when a task is:
 * - Moved to another date
 * - Resized or reprioritized
 * - Reordered or rearranged on the board
 * - Completed or reopened
 * - Rendered in light or dark mode
 * 
 * Does NOT use grid index, position, date, or priority.
 */
export function resolvePalette(taskId: string): PaletteId {
  if (!taskId) return PALETTES[0];
  const hash = hashTaskId(taskId);
  return PALETTES[hash % PALETTES.length];
}

/**
 * Resolves the full task identity (palette, priority, status) from a task object.
 */
export function resolveTaskIdentity(task: {
  id: string;
  priority?: unknown;
  status?: string;
  isCarriedForward?: boolean;
}): TaskIdentity {
  return {
    taskId: task.id,
    palette: resolvePalette(task.id),
    priority: normalizePriority(task.priority),
    status: task.status === "completed" ? "completed" : "active",
    isCarriedForward: Boolean(task.isCarriedForward),
  };
}
