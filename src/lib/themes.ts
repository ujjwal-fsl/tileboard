import { PaletteId } from "./paletteResolver";

export type ThemeName = "pastel" | "pop";
export type AppearanceMode = "light" | "dark" | "system";
export type PriorityLevel = "small" | "medium" | "big";

export interface ColorTier {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  hoverBorderColor: string;
}

export interface PaletteThemeColors {
  small: ColorTier;
  medium: ColorTier;
  big: ColorTier;
  completed: ColorTier;
}

export type ThemeRegistry = Record<
  ThemeName,
  Record<
    "light" | "dark",
    Record<PaletteId, PaletteThemeColors>
  >
>;

/**
 * Carefully calibrated 12-family Theme Registry.
 *
 * For the Pastel theme:
 * - High priority (big): Highly saturated, vivid colors (Sat ~80-94%, Lightness ~58-68%).
 * - Medium priority (medium): Moderately saturated colors (Sat ~50-75%, Lightness ~80-84%).
 * - Low priority (small): Lightly saturated, soft pastel tint (Sat ~32-50%, Lightness ~92-94%).
 * - Completed: Calm muted version preserving each task's original hue family (Sat ~10-15%, Lightness ~91-93%).
 *
 * All three priority tiers maintain the exact same recognizable hue family.
 */
export const THEMES: ThemeRegistry = {
  pastel: {
    light: {
      honey: {
        small: {
          backgroundColor: "#F5F1E5",
          borderColor: "rgba(217, 180, 74, 0.15)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(217, 180, 74, 0.35)",
        },
        medium: {
          backgroundColor: "#F1E0B1",
          borderColor: "rgba(202, 138, 4, 0.22)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(202, 138, 4, 0.45)",
        },
        big: {
          backgroundColor: "#F8CB4F",
          borderColor: "rgba(180, 83, 9, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(180, 83, 9, 0.55)",
        },
        completed: {
          backgroundColor: "#EEECE8",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      sunflower: {
        small: {
          backgroundColor: "#F6F3E4",
          borderColor: "rgba(234, 179, 8, 0.15)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(234, 179, 8, 0.35)",
        },
        medium: {
          backgroundColor: "#F4E7AF",
          borderColor: "rgba(202, 138, 4, 0.22)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(202, 138, 4, 0.45)",
        },
        big: {
          backgroundColor: "#F9D843",
          borderColor: "rgba(161, 98, 7, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(161, 98, 7, 0.55)",
        },
        completed: {
          backgroundColor: "#EEEDE8",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      peach: {
        small: {
          backgroundColor: "#F6ECE5",
          borderColor: "rgba(251, 146, 60, 0.16)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(251, 146, 60, 0.35)",
        },
        medium: {
          backgroundColor: "#F3CFB4",
          borderColor: "rgba(234, 88, 12, 0.22)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(234, 88, 12, 0.45)",
        },
        big: {
          backgroundColor: "#F89E59",
          borderColor: "rgba(194, 65, 12, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(194, 65, 12, 0.55)",
        },
        completed: {
          backgroundColor: "#EEEAE8",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      terracotta: {
        small: {
          backgroundColor: "#F4E6E1",
          borderColor: "rgba(239, 68, 68, 0.15)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(239, 68, 68, 0.35)",
        },
        medium: {
          backgroundColor: "#EFBFAE",
          borderColor: "rgba(220, 38, 38, 0.22)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(220, 38, 38, 0.45)",
        },
        big: {
          backgroundColor: "#F1774B",
          borderColor: "rgba(185, 28, 28, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(185, 28, 28, 0.55)",
        },
        completed: {
          backgroundColor: "#EBE6E5",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      rose: {
        small: {
          backgroundColor: "#F5E5E8",
          borderColor: "rgba(244, 63, 94, 0.15)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(244, 63, 94, 0.35)",
        },
        medium: {
          backgroundColor: "#F2B5BF",
          borderColor: "rgba(225, 29, 72, 0.22)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(225, 29, 72, 0.45)",
        },
        big: {
          backgroundColor: "#F65A74",
          borderColor: "rgba(190, 18, 60, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(190, 18, 60, 0.55)",
        },
        completed: {
          backgroundColor: "#EEE8E9",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      sage: {
        small: {
          backgroundColor: "#E3F2E7",
          borderColor: "rgba(74, 222, 128, 0.18)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(74, 222, 128, 0.38)",
        },
        medium: {
          backgroundColor: "#B6EDC3",
          borderColor: "rgba(34, 197, 94, 0.24)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(34, 197, 94, 0.48)",
        },
        big: {
          backgroundColor: "#51EC77",
          borderColor: "rgba(21, 128, 61, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(21, 128, 61, 0.55)",
        },
        completed: {
          backgroundColor: "#E8EDE9",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      mint: {
        small: {
          backgroundColor: "#E2F3ED",
          borderColor: "rgba(52, 211, 153, 0.18)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(52, 211, 153, 0.38)",
        },
        medium: {
          backgroundColor: "#AFEED9",
          borderColor: "rgba(16, 185, 129, 0.24)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(16, 185, 129, 0.48)",
        },
        big: {
          backgroundColor: "#42F0B6",
          borderColor: "rgba(5, 150, 105, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(5, 150, 105, 0.55)",
        },
        completed: {
          backgroundColor: "#E8EDEC",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      teal: {
        small: {
          backgroundColor: "#E2F3F4",
          borderColor: "rgba(45, 212, 191, 0.18)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(45, 212, 191, 0.38)",
        },
        medium: {
          backgroundColor: "#A9ECEF",
          borderColor: "rgba(13, 148, 136, 0.24)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(13, 148, 136, 0.48)",
        },
        big: {
          backgroundColor: "#36ECF2",
          borderColor: "rgba(15, 118, 110, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(15, 118, 110, 0.55)",
        },
        completed: {
          backgroundColor: "#E5EBEB",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      "powder-blue": {
        small: {
          backgroundColor: "#E5EEF6",
          borderColor: "rgba(96, 165, 250, 0.18)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(96, 165, 250, 0.38)",
        },
        medium: {
          backgroundColor: "#B0D3F2",
          borderColor: "rgba(37, 99, 235, 0.24)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(37, 99, 235, 0.48)",
        },
        big: {
          backgroundColor: "#51A9F6",
          borderColor: "rgba(29, 78, 216, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(29, 78, 216, 0.55)",
        },
        completed: {
          backgroundColor: "#E8EBEE",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      lavender: {
        small: {
          backgroundColor: "#E5E6F5",
          borderColor: "rgba(129, 140, 248, 0.18)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(129, 140, 248, 0.38)",
        },
        medium: {
          backgroundColor: "#B5B9F2",
          borderColor: "rgba(79, 70, 229, 0.24)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(79, 70, 229, 0.48)",
        },
        big: {
          backgroundColor: "#616BF5",
          borderColor: "rgba(67, 56, 202, 0.30)",
          textColor: "#FFFFFF",
          hoverBorderColor: "rgba(67, 56, 202, 0.55)",
        },
        completed: {
          backgroundColor: "#E8E8EE",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      lilac: {
        small: {
          backgroundColor: "#EEE6F5",
          borderColor: "rgba(192, 132, 252, 0.18)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(192, 132, 252, 0.38)",
        },
        medium: {
          backgroundColor: "#D8B7F0",
          borderColor: "rgba(147, 51, 234, 0.24)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(147, 51, 234, 0.48)",
        },
        big: {
          backgroundColor: "#B969F2",
          borderColor: "rgba(126, 34, 206, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(126, 34, 206, 0.55)",
        },
        completed: {
          backgroundColor: "#EBE8ED",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
      oat: {
        small: {
          backgroundColor: "#F1ECE4",
          borderColor: "rgba(180, 140, 100, 0.15)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(180, 140, 100, 0.35)",
        },
        medium: {
          backgroundColor: "#E8D6BA",
          borderColor: "rgba(160, 115, 75, 0.22)",
          textColor: "#1E293B",
          hoverBorderColor: "rgba(160, 115, 75, 0.45)",
        },
        big: {
          backgroundColor: "#E2B269",
          borderColor: "rgba(140, 95, 55, 0.30)",
          textColor: "#0F172A",
          hoverBorderColor: "rgba(140, 95, 55, 0.55)",
        },
        completed: {
          backgroundColor: "#EAE9E6",
          borderColor: "rgba(0, 0, 0, 0.05)",
          textColor: "#64748B",
          hoverBorderColor: "rgba(0, 0, 0, 0.12)",
        },
      },
    },
    dark: {
      honey: {
        small: { backgroundColor: "#2A261C", borderColor: "rgba(234, 179, 8, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(234, 179, 8, 0.4)" },
        medium: { backgroundColor: "#3D341D", borderColor: "rgba(234, 179, 8, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(234, 179, 8, 0.5)" },
        big: { backgroundColor: "#594614", borderColor: "rgba(234, 179, 8, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(234, 179, 8, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      sunflower: {
        small: { backgroundColor: "#292718", borderColor: "rgba(250, 204, 21, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(250, 204, 21, 0.4)" },
        medium: { backgroundColor: "#3C3717", borderColor: "rgba(250, 204, 21, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(250, 204, 21, 0.5)" },
        big: { backgroundColor: "#574E11", borderColor: "rgba(250, 204, 21, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(250, 204, 21, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      peach: {
        small: { backgroundColor: "#2E241E", borderColor: "rgba(251, 146, 60, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(251, 146, 60, 0.4)" },
        medium: { backgroundColor: "#422E22", borderColor: "rgba(251, 146, 60, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(251, 146, 60, 0.5)" },
        big: { backgroundColor: "#613D26", borderColor: "rgba(251, 146, 60, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(251, 146, 60, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      terracotta: {
        small: { backgroundColor: "#2D201C", borderColor: "rgba(239, 68, 68, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(239, 68, 68, 0.4)" },
        medium: { backgroundColor: "#43261F", borderColor: "rgba(239, 68, 68, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(239, 68, 68, 0.5)" },
        big: { backgroundColor: "#643022", borderColor: "rgba(239, 68, 68, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(239, 68, 68, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      rose: {
        small: { backgroundColor: "#2D1E22", borderColor: "rgba(244, 63, 94, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(244, 63, 94, 0.4)" },
        medium: { backgroundColor: "#422028", borderColor: "rgba(244, 63, 94, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(244, 63, 94, 0.5)" },
        big: { backgroundColor: "#612433", borderColor: "rgba(244, 63, 94, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(244, 63, 94, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      sage: {
        small: { backgroundColor: "#1C2A1F", borderColor: "rgba(74, 222, 128, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(74, 222, 128, 0.4)" },
        medium: { backgroundColor: "#223B27", borderColor: "rgba(74, 222, 128, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(74, 222, 128, 0.5)" },
        big: { backgroundColor: "#265430", borderColor: "rgba(74, 222, 128, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(74, 222, 128, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      mint: {
        small: { backgroundColor: "#1A2A23", borderColor: "rgba(52, 211, 153, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(52, 211, 153, 0.4)" },
        medium: { backgroundColor: "#1F3C30", borderColor: "rgba(52, 211, 153, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(52, 211, 153, 0.5)" },
        big: { backgroundColor: "#205542", borderColor: "rgba(52, 211, 153, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(52, 211, 153, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      teal: {
        small: { backgroundColor: "#1A2929", borderColor: "rgba(45, 212, 191, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(45, 212, 191, 0.4)" },
        medium: { backgroundColor: "#1D3A3B", borderColor: "rgba(45, 212, 191, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(45, 212, 191, 0.5)" },
        big: { backgroundColor: "#1C5254", borderColor: "rgba(45, 212, 191, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(45, 212, 191, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      "powder-blue": {
        small: { backgroundColor: "#1C242D", borderColor: "rgba(96, 165, 250, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(96, 165, 250, 0.4)" },
        medium: { backgroundColor: "#203142", borderColor: "rgba(96, 165, 250, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(96, 165, 250, 0.5)" },
        big: { backgroundColor: "#204462", borderColor: "rgba(96, 165, 250, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(96, 165, 250, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      lavender: {
        small: { backgroundColor: "#1E202C", borderColor: "rgba(129, 140, 248, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(129, 140, 248, 0.4)" },
        medium: { backgroundColor: "#252941", borderColor: "rgba(129, 140, 248, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(129, 140, 248, 0.5)" },
        big: { backgroundColor: "#2D3560", borderColor: "rgba(129, 140, 248, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(129, 140, 248, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      lilac: {
        small: { backgroundColor: "#251E2B", borderColor: "rgba(192, 132, 252, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(192, 132, 252, 0.4)" },
        medium: { backgroundColor: "#32233E", borderColor: "rgba(192, 132, 252, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(192, 132, 252, 0.5)" },
        big: { backgroundColor: "#47285C", borderColor: "rgba(192, 132, 252, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(192, 132, 252, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      oat: {
        small: { backgroundColor: "#252320", borderColor: "rgba(180, 140, 100, 0.2)", textColor: "#F8FAFC", hoverBorderColor: "rgba(180, 140, 100, 0.4)" },
        medium: { backgroundColor: "#36312B", borderColor: "rgba(180, 140, 100, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(180, 140, 100, 0.5)" },
        big: { backgroundColor: "#4D4235", borderColor: "rgba(180, 140, 100, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(180, 140, 100, 0.7)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
    },
  },
  pop: {
    light: {
      honey: {
        small: { backgroundColor: "#FDE68A", borderColor: "rgba(202, 138, 4, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(202, 138, 4, 0.6)" },
        medium: { backgroundColor: "#FBBF24", borderColor: "rgba(180, 83, 9, 0.4)", textColor: "#0F172A", hoverBorderColor: "rgba(180, 83, 9, 0.7)" },
        big: { backgroundColor: "#F59E0B", borderColor: "rgba(146, 64, 14, 0.5)", textColor: "#000000", hoverBorderColor: "rgba(146, 64, 14, 0.8)" },
        completed: { backgroundColor: "#F3F1EC", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      sunflower: {
        small: { backgroundColor: "#FEF08A", borderColor: "rgba(202, 138, 4, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(202, 138, 4, 0.6)" },
        medium: { backgroundColor: "#FACC15", borderColor: "rgba(161, 98, 7, 0.4)", textColor: "#0F172A", hoverBorderColor: "rgba(161, 98, 7, 0.7)" },
        big: { backgroundColor: "#EAB308", borderColor: "rgba(133, 77, 14, 0.5)", textColor: "#000000", hoverBorderColor: "rgba(133, 77, 14, 0.8)" },
        completed: { backgroundColor: "#F3F1EC", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      peach: {
        small: { backgroundColor: "#FED7AA", borderColor: "rgba(234, 88, 12, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(234, 88, 12, 0.6)" },
        medium: { backgroundColor: "#FB923C", borderColor: "rgba(194, 65, 12, 0.4)", textColor: "#0F172A", hoverBorderColor: "rgba(194, 65, 12, 0.7)" },
        big: { backgroundColor: "#F97316", borderColor: "rgba(154, 52, 18, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(154, 52, 18, 0.8)" },
        completed: { backgroundColor: "#F3EFEA", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      terracotta: {
        small: { backgroundColor: "#FECACA", borderColor: "rgba(220, 38, 38, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(220, 38, 38, 0.6)" },
        medium: { backgroundColor: "#F87171", borderColor: "rgba(185, 28, 28, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(185, 28, 28, 0.7)" },
        big: { backgroundColor: "#EF4444", borderColor: "rgba(153, 27, 27, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(153, 27, 27, 0.8)" },
        completed: { backgroundColor: "#F3ECE9", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      rose: {
        small: { backgroundColor: "#FECDD3", borderColor: "rgba(225, 29, 72, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(225, 29, 72, 0.6)" },
        medium: { backgroundColor: "#FB7185", borderColor: "rgba(190, 18, 60, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(190, 18, 60, 0.7)" },
        big: { backgroundColor: "#F43F5E", borderColor: "rgba(159, 18, 57, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(159, 18, 57, 0.8)" },
        completed: { backgroundColor: "#F3EAEB", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      sage: {
        small: { backgroundColor: "#BBF7D0", borderColor: "rgba(34, 197, 94, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(34, 197, 94, 0.6)" },
        medium: { backgroundColor: "#4ADE80", borderColor: "rgba(21, 128, 61, 0.4)", textColor: "#0F172A", hoverBorderColor: "rgba(21, 128, 61, 0.7)" },
        big: { backgroundColor: "#22C55E", borderColor: "rgba(22, 101, 52, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(22, 101, 52, 0.8)" },
        completed: { backgroundColor: "#E9F0EA", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      mint: {
        small: { backgroundColor: "#A7F3D0", borderColor: "rgba(16, 185, 129, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(16, 185, 129, 0.6)" },
        medium: { backgroundColor: "#34D399", borderColor: "rgba(5, 150, 105, 0.4)", textColor: "#0F172A", hoverBorderColor: "rgba(5, 150, 105, 0.7)" },
        big: { backgroundColor: "#10B981", borderColor: "rgba(4, 120, 87, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(4, 120, 87, 0.8)" },
        completed: { backgroundColor: "#E9EFEB", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      teal: {
        small: { backgroundColor: "#99F6E4", borderColor: "rgba(13, 148, 136, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(13, 148, 136, 0.6)" },
        medium: { backgroundColor: "#2DD4BF", borderColor: "rgba(15, 118, 110, 0.4)", textColor: "#0F172A", hoverBorderColor: "rgba(15, 118, 110, 0.7)" },
        big: { backgroundColor: "#14B8A6", borderColor: "rgba(17, 94, 89, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(17, 94, 89, 0.8)" },
        completed: { backgroundColor: "#E8EFEF", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      "powder-blue": {
        small: { backgroundColor: "#BAE6FD", borderColor: "rgba(37, 99, 235, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(37, 99, 235, 0.6)" },
        medium: { backgroundColor: "#60A5FA", borderColor: "rgba(29, 78, 216, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(29, 78, 216, 0.7)" },
        big: { backgroundColor: "#3B82F6", borderColor: "rgba(30, 64, 175, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(30, 64, 175, 0.8)" },
        completed: { backgroundColor: "#E8EDF2", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      lavender: {
        small: { backgroundColor: "#C7D2FE", borderColor: "rgba(79, 70, 229, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(79, 70, 229, 0.6)" },
        medium: { backgroundColor: "#818CF8", borderColor: "rgba(67, 56, 202, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(67, 56, 202, 0.7)" },
        big: { backgroundColor: "#6366F1", borderColor: "rgba(55, 48, 163, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(55, 48, 163, 0.8)" },
        completed: { backgroundColor: "#E9EAF1", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      lilac: {
        small: { backgroundColor: "#E9D5FF", borderColor: "rgba(147, 51, 234, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(147, 51, 234, 0.6)" },
        medium: { backgroundColor: "#C084FC", borderColor: "rgba(126, 34, 206, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(126, 34, 206, 0.7)" },
        big: { backgroundColor: "#A855F7", borderColor: "rgba(107, 33, 168, 0.5)", textColor: "#FFFFFF", hoverBorderColor: "rgba(107, 33, 168, 0.8)" },
        completed: { backgroundColor: "#EAE7F0", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
      oat: {
        small: { backgroundColor: "#E7D8C5", borderColor: "rgba(160, 115, 75, 0.3)", textColor: "#0F172A", hoverBorderColor: "rgba(160, 115, 75, 0.6)" },
        medium: { backgroundColor: "#D4B99B", borderColor: "rgba(140, 95, 55, 0.4)", textColor: "#0F172A", hoverBorderColor: "rgba(140, 95, 55, 0.7)" },
        big: { backgroundColor: "#C29B70", borderColor: "rgba(120, 75, 40, 0.5)", textColor: "#000000", hoverBorderColor: "rgba(120, 75, 40, 0.8)" },
        completed: { backgroundColor: "#EBE9E5", borderColor: "rgba(0, 0, 0, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(0, 0, 0, 0.15)" },
      },
    },
    dark: {
      honey: {
        small: { backgroundColor: "#3D341D", borderColor: "rgba(251, 191, 36, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(251, 191, 36, 0.6)" },
        medium: { backgroundColor: "#614E18", borderColor: "rgba(251, 191, 36, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(251, 191, 36, 0.7)" },
        big: { backgroundColor: "#886910", borderColor: "rgba(251, 191, 36, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(251, 191, 36, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      sunflower: {
        small: { backgroundColor: "#3C3717", borderColor: "rgba(250, 204, 21, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(250, 204, 21, 0.6)" },
        medium: { backgroundColor: "#5E5312", borderColor: "rgba(250, 204, 21, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(250, 204, 21, 0.7)" },
        big: { backgroundColor: "#85730C", borderColor: "rgba(250, 204, 21, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(250, 204, 21, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      peach: {
        small: { backgroundColor: "#422E22", borderColor: "rgba(251, 146, 60, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(251, 146, 60, 0.6)" },
        medium: { backgroundColor: "#6B4228", borderColor: "rgba(251, 146, 60, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(251, 146, 60, 0.7)" },
        big: { backgroundColor: "#9A5B2F", borderColor: "rgba(251, 146, 60, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(251, 146, 60, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      terracotta: {
        small: { backgroundColor: "#43261F", borderColor: "rgba(248, 113, 113, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(248, 113, 113, 0.6)" },
        medium: { backgroundColor: "#6D3025", borderColor: "rgba(248, 113, 113, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(248, 113, 113, 0.7)" },
        big: { backgroundColor: "#993B2B", borderColor: "rgba(248, 113, 113, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(248, 113, 113, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      rose: {
        small: { backgroundColor: "#422028", borderColor: "rgba(251, 113, 133, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(251, 113, 133, 0.6)" },
        medium: { backgroundColor: "#6B2A38", borderColor: "rgba(251, 113, 133, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(251, 113, 133, 0.7)" },
        big: { backgroundColor: "#993549", borderColor: "rgba(251, 113, 133, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(251, 113, 133, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      sage: {
        small: { backgroundColor: "#223B27", borderColor: "rgba(74, 222, 128, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(74, 222, 128, 0.6)" },
        medium: { backgroundColor: "#295831", borderColor: "rgba(74, 222, 128, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(74, 222, 128, 0.7)" },
        big: { backgroundColor: "#327A40", borderColor: "rgba(74, 222, 128, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(74, 222, 128, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      mint: {
        small: { backgroundColor: "#1F3C30", borderColor: "rgba(52, 211, 153, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(52, 211, 153, 0.6)" },
        medium: { backgroundColor: "#255944", borderColor: "rgba(52, 211, 153, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(52, 211, 153, 0.7)" },
        big: { backgroundColor: "#2C7B5D", borderColor: "rgba(52, 211, 153, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(52, 211, 153, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      teal: {
        small: { backgroundColor: "#1D3A3B", borderColor: "rgba(45, 212, 191, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(45, 212, 191, 0.6)" },
        medium: { backgroundColor: "#235658", borderColor: "rgba(45, 212, 191, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(45, 212, 191, 0.7)" },
        big: { backgroundColor: "#26787B", borderColor: "rgba(45, 212, 191, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(45, 212, 191, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      "powder-blue": {
        small: { backgroundColor: "#203142", borderColor: "rgba(96, 165, 250, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(96, 165, 250, 0.6)" },
        medium: { backgroundColor: "#254867", borderColor: "rgba(96, 165, 250, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(96, 165, 250, 0.7)" },
        big: { backgroundColor: "#2A6494", borderColor: "rgba(96, 165, 250, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(96, 165, 250, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      lavender: {
        small: { backgroundColor: "#252941", borderColor: "rgba(129, 140, 248, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(129, 140, 248, 0.6)" },
        medium: { backgroundColor: "#333A66", borderColor: "rgba(129, 140, 248, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(129, 140, 248, 0.7)" },
        big: { backgroundColor: "#414C8F", borderColor: "rgba(129, 140, 248, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(129, 140, 248, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      lilac: {
        small: { backgroundColor: "#32233E", borderColor: "rgba(192, 132, 252, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(192, 132, 252, 0.6)" },
        medium: { backgroundColor: "#4D2D63", borderColor: "rgba(192, 132, 252, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(192, 132, 252, 0.7)" },
        big: { backgroundColor: "#6C3A8D", borderColor: "rgba(192, 132, 252, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(192, 132, 252, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
      oat: {
        small: { backgroundColor: "#36312B", borderColor: "rgba(212, 185, 155, 0.3)", textColor: "#F8FAFC", hoverBorderColor: "rgba(212, 185, 155, 0.6)" },
        medium: { backgroundColor: "#52473A", borderColor: "rgba(212, 185, 155, 0.4)", textColor: "#FFFFFF", hoverBorderColor: "rgba(212, 185, 155, 0.7)" },
        big: { backgroundColor: "#74624D", borderColor: "rgba(212, 185, 155, 0.6)", textColor: "#FFFFFF", hoverBorderColor: "rgba(212, 185, 155, 0.9)" },
        completed: { backgroundColor: "#1E1F21", borderColor: "rgba(255, 255, 255, 0.08)", textColor: "#64748B", hoverBorderColor: "rgba(255, 255, 255, 0.15)" },
      },
    },
  },
};

export interface VisualStyleDefinition {
  id: ThemeName;
  name: string;
}

export const themes: Record<ThemeName, VisualStyleDefinition> = {
  pastel: { id: "pastel", name: "Pastel" },
  pop: { id: "pop", name: "Pop" },
};

