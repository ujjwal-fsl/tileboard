// src/lib/themes.ts

import type { PaletteName } from "./paletteResolver.js";

export interface VisualStyleColors {
  low: string;         // Tailwind bg class (e.g. bg-[#FAF7F0])
  medium: string;      // Tailwind bg class
  high: string;        // Tailwind bg class
  completed?: string;  // Tailwind bg class (Optional, used by hierarchical/Pastel style)
  border: string;      // Tailwind border class (e.g. border-black/[0.04])
  text: string;        // Tailwind text color class
  category: string;    // Tailwind category badge class
  checkmark: string;   // Tailwind checkmark class
}

export interface VisualStyleDefinition {
  id: string;
  name: string;
  type: "hierarchical" | "flat";
  // Interaction/Elevation tokens
  hoverClass: string;
  interactiveClass: string;
  completedBaseClass: string;
  shadowClass: string;
  colors: Record<"light" | "dark", Record<PaletteName, VisualStyleColors>>;
}

const defaultColorsLight: Record<PaletteName, VisualStyleColors> = {
  Honey: {
    low: "bg-[#FAF7F0]",
    medium: "bg-[#F5EEDB]",
    high: "bg-[#F0DEC1]",
    completed: "bg-[#F3EFE7]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Blue: {
    low: "bg-[#F1F5FA]",
    medium: "bg-[#E4ECF5]",
    high: "bg-[#CADDF0]",
    completed: "bg-[#DFE5EC]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Rose: {
    low: "bg-[#FAF2EF]",
    medium: "bg-[#F5E4DF]",
    high: "bg-[#EFD1C8]",
    completed: "bg-[#EDE2DE]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Mint: {
    low: "bg-[#F2FAF6]",
    medium: "bg-[#DFF3E9]",
    high: "bg-[#C3EADB]",
    completed: "bg-[#DFEBE7]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Terracotta: {
    low: "bg-[#FAF3EE]",
    medium: "bg-[#F5DFD5]",
    high: "bg-[#ECC5B4]",
    completed: "bg-[#EDE1DB]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Lavender: {
    low: "bg-[#F5F2FA]",
    medium: "bg-[#ECE6F5]",
    high: "bg-[#DBD1ED]",
    completed: "bg-[#E6E1EC]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Sunflower: {
    low: "bg-[#FAF6ED]",
    medium: "bg-[#F4E8CD]",
    high: "bg-[#ECD6A5]",
    completed: "bg-[#EFE8DB]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Teal: {
    low: "bg-[#F1FAF9]",
    medium: "bg-[#DEF3F0]",
    high: "bg-[#C3EBE6]",
    completed: "bg-[#DFECEB]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Peach: {
    low: "bg-[#FAF4EF]",
    medium: "bg-[#F6E9DF]",
    high: "bg-[#F1D8C9]",
    completed: "bg-[#EEE5DE]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Oat: {
    low: "bg-[#FAF6F2]",
    medium: "bg-[#F4ECE4]",
    high: "bg-[#ECDDCF]",
    completed: "bg-[#ECE6E1]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Lilac: {
    low: "bg-[#F8F2FA]",
    medium: "bg-[#F0E3F5]",
    high: "bg-[#E6CEF0]",
    completed: "bg-[#EAE1EC]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Sage: {
    low: "bg-[#F4FAF2]",
    medium: "bg-[#E8F4E4]",
    high: "bg-[#D5EAD0]",
    completed: "bg-[#E2ECE0]",
    border: "border border-black/[0.04]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
};

export const pastelTheme: VisualStyleDefinition = {
  id: "pastel",
  name: "Pastel",
  type: "hierarchical",
  hoverClass: "md:hover:-translate-y-[1px] md:hover:border-black/[0.08] md:hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0.5px_1px_rgba(0,0,0,0.03)]",
  interactiveClass: "md:active:scale-[0.98] md:active:translate-y-0 md:active:shadow-none md:active:border-black/[0.06]",
  completedBaseClass: "opacity-70 scale-[0.98]",
  shadowClass: "shadow-[0_0.5px_1.5px_rgba(0,0,0,0.02)]",
  colors: {
    light: defaultColorsLight,
    dark: defaultColorsLight,
  },
};

// Rebuilt Pop Theme: Bold, Confident, Modern, Premium Editorial Graphic Blocks
const popColorsLight: Record<PaletteName, VisualStyleColors> = {
  Honey: {
    low: "bg-[#EAB308]",
    medium: "bg-[#EAB308]",
    high: "bg-[#EAB308]",
    completed: "bg-[#FEF08A]",
    border: "border border-black/[0.10]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Blue: {
    low: "bg-[#2563EB]",
    medium: "bg-[#2563EB]",
    high: "bg-[#2563EB]",
    completed: "bg-[#93C5FD]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Rose: {
    low: "bg-[#DC2626]",
    medium: "bg-[#DC2626]",
    high: "bg-[#DC2626]",
    completed: "bg-[#FCA5A5]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Mint: {
    low: "bg-[#059669]",
    medium: "bg-[#059669]",
    high: "bg-[#059669]",
    completed: "bg-[#86EFAC]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Terracotta: {
    low: "bg-[#C2410C]",
    medium: "bg-[#C2410C]",
    high: "bg-[#C2410C]",
    completed: "bg-[#FDBA74]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Lavender: {
    low: "bg-[#7C3AED]",
    medium: "bg-[#7C3AED]",
    high: "bg-[#7C3AED]",
    completed: "bg-[#D8B4FE]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Sunflower: {
    low: "bg-[#F59E0B]",
    medium: "bg-[#F59E0B]",
    high: "bg-[#F59E0B]",
    completed: "bg-[#FDE047]",
    border: "border border-black/[0.10]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Teal: {
    low: "bg-[#0D9488]",
    medium: "bg-[#0D9488]",
    high: "bg-[#0D9488]",
    completed: "bg-[#5EEAD4]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Peach: {
    low: "bg-[#EA580C]",
    medium: "bg-[#EA580C]",
    high: "bg-[#EA580C]",
    completed: "bg-[#FED7AA]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Oat: {
    low: "bg-[#475569]",
    medium: "bg-[#475569]",
    high: "bg-[#475569]",
    completed: "bg-[#D6D3D1]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Lilac: {
    low: "bg-[#DB2777]",
    medium: "bg-[#DB2777]",
    high: "bg-[#DB2777]",
    completed: "bg-[#FBCFE8]",
    border: "border border-black/[0.10]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Sage: {
    low: "bg-[#65A30D]",
    medium: "bg-[#65A30D]",
    high: "bg-[#65A30D]",
    completed: "bg-[#D9F99D]",
    border: "border border-black/[0.10]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
};

export const popTheme: VisualStyleDefinition = {
  id: "pop",
  name: "Pop",
  type: "hierarchical",
  hoverClass: "md:hover:-translate-y-[1.2px] md:hover:border-black/[0.10] md:hover:shadow-[0_2px_5px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]",
  interactiveClass: "md:active:scale-[0.975] md:active:translate-y-0 md:active:shadow-none md:active:border-black/[0.07]",
  completedBaseClass: "opacity-80 scale-[0.98]", // readable completed state
  shadowClass: "shadow-[0_1px_2px_rgba(0,0,0,0.03),0_0.5px_1px_rgba(0,0,0,0.02)]",
  colors: {
    light: popColorsLight,
    dark: popColorsLight, // colourful Pop tiles remain identical in dark mode per directions
  },
};

export const themes: Record<"pastel" | "pop", VisualStyleDefinition> = {
  pastel: pastelTheme,
  pop: popTheme,
};
