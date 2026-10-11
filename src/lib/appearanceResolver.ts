import { PaletteId, TaskIdentity, normalizePriority, PriorityLevel } from "./paletteResolver";
import {
  THEMES,
  ThemeName,
  AppearanceMode,
  ColorTier,
} from "./themes";

export interface TaskAppearanceOptions {
  theme?: ThemeName;
  appearance?: AppearanceMode;
}

export interface TaskAppearance extends ColorTier {
  palette: PaletteId;
  priority: PriorityLevel;
  status: "active" | "completed";
  isCarriedForward: boolean;
  theme: ThemeName;
  appearance: "light" | "dark";
}

export interface ResolveAppearanceParams {
  palette: PaletteId;
  priority: unknown;
  status?: string;
  isCarriedForward?: boolean;
  theme?: ThemeName;
  appearance?: AppearanceMode;
}

/**
 * Resolves the visual appearance for a task based on its palette, priority, status,
 * theme, and appearance mode.
 *
 * Normalizes priority to ensure low, medium, and high correctly map to their
 * respective color tiers without collapsing to default.
 */
export function resolveTaskAppearance(
  identityOrParams: TaskIdentity | ResolveAppearanceParams,
  options?: TaskAppearanceOptions
): TaskAppearance {
  const palette: PaletteId = identityOrParams.palette || "honey";
  const priority: PriorityLevel = normalizePriority(identityOrParams.priority);
  const status: "active" | "completed" = identityOrParams.status === "completed" ? "completed" : "active";
  const isCarriedForward: boolean = Boolean(identityOrParams.isCarriedForward);

  const rawTheme = options?.theme || (identityOrParams as ResolveAppearanceParams).theme || "pastel";
  const theme: ThemeName = rawTheme === "pop" ? "pop" : "pastel";

  const rawAppearance = options?.appearance || (identityOrParams as ResolveAppearanceParams).appearance || "light";
  const appearance: "light" | "dark" = rawAppearance === "dark" ? "dark" : "light";

  const themeGroup = THEMES[theme] || THEMES.pastel;
  const appearanceGroup = themeGroup[appearance] || themeGroup.light;
  const paletteColors = appearanceGroup[palette] || appearanceGroup.honey;

  let baseTier: ColorTier;

  if (status === "completed") {
    baseTier = paletteColors.completed;
  } else if (priority === "big") {
    baseTier = paletteColors.big;
  } else if (priority === "medium") {
    baseTier = paletteColors.medium;
  } else {
    baseTier = paletteColors.small;
  }

  // Preserve carry-forward distinction if active
  let borderColor = baseTier.borderColor;
  let hoverBorderColor = baseTier.hoverBorderColor;
  if (isCarriedForward && status !== "completed") {
    borderColor = appearance === "dark" ? "rgba(245, 158, 11, 0.45)" : "rgba(217, 119, 6, 0.35)";
    hoverBorderColor = appearance === "dark" ? "rgba(245, 158, 11, 0.70)" : "rgba(217, 119, 6, 0.60)";
  }

  return {
    ...baseTier,
    borderColor,
    hoverBorderColor,
    palette,
    priority,
    status,
    isCarriedForward,
    theme,
    appearance,
  };
}
