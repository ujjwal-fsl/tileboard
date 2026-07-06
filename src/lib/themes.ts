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

// Rebuilt Pop Theme: Bold, Confident, Modern, Premium Editorial
const popColorsLight: Record<PaletteName, VisualStyleColors> = {
  Honey: {
    low: "bg-[#FFFDF0]",
    medium: "bg-[#FEF08A]",
    high: "bg-[#EAB308]",
    completed: "bg-[#FEF9C3]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Blue: {
    low: "bg-[#EFF6FF]",
    medium: "bg-[#DBEAFE]",
    high: "bg-[#60A5FA]",
    completed: "bg-[#DBEAFE]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Rose: {
    low: "bg-[#FFF5F5]",
    medium: "bg-[#FEE2E2]",
    high: "bg-[#F87171]",
    completed: "bg-[#FEE2E2]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Mint: {
    low: "bg-[#F0FDF4]",
    medium: "bg-[#DCFCE7]",
    high: "bg-[#4ADE80]",
    completed: "bg-[#DCFCE7]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Terracotta: {
    low: "bg-[#FFF7ED]",
    medium: "bg-[#FFEDD5]",
    high: "bg-[#FB923C]",
    completed: "bg-[#FFEDD5]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Lavender: {
    low: "bg-[#FAF5FF]",
    medium: "bg-[#F3E8FF]",
    high: "bg-[#C084FC]",
    completed: "bg-[#F3E8FF]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Sunflower: {
    low: "bg-[#FFFBEB]",
    medium: "bg-[#FEF3C7]",
    high: "bg-[#FBBF24]",
    completed: "bg-[#FEF3C7]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Teal: {
    low: "bg-[#F0FDFA]",
    medium: "bg-[#CCFBF1]",
    high: "bg-[#2DD4BF]",
    completed: "bg-[#CCFBF1]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Peach: {
    low: "bg-[#FFF8F6]",
    medium: "bg-[#FFEADF]",
    high: "bg-[#FCA5A5]",
    completed: "bg-[#FFEADF]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Oat: {
    low: "bg-[#FAF9F6]",
    medium: "bg-[#F5F5F0]",
    high: "bg-[#A8A29E]",
    completed: "bg-[#F5F5F0]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Lilac: {
    low: "bg-[#FDF4FF]",
    medium: "bg-[#FAE8FF]",
    high: "bg-[#F472B6]",
    completed: "bg-[#FAE8FF]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
  },
  Sage: {
    low: "bg-[#F7FEE7]",
    medium: "bg-[#ECFCCB]",
    high: "bg-[#A3E635]",
    completed: "bg-[#ECFCCB]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-600",
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
