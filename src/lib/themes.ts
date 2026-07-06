// src/lib/themes.ts

import type { PaletteName } from "./paletteResolver.ts";

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

// Refined Pop Palette (Premium, rich, not cartoonish)
const popColorsLight: Record<PaletteName, VisualStyleColors> = {
  Honey: {
    low: "bg-[#FDF9ED]",
    medium: "bg-[#F6E9CD]",
    high: "bg-[#ECD19A]",
    completed: "bg-[#FAF0DB]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Blue: {
    low: "bg-[#EFF5FC]",
    medium: "bg-[#D6E6F7]",
    high: "bg-[#B3D2F1]",
    completed: "bg-[#E3ECF6]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Rose: {
    low: "bg-[#FAF1ED]",
    medium: "bg-[#F7E1D8]",
    high: "bg-[#EBB8A9]",
    completed: "bg-[#F5E7E2]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Mint: {
    low: "bg-[#EFFBF5]",
    medium: "bg-[#D5F5E5]",
    high: "bg-[#ADEBCB]",
    completed: "bg-[#E3F6EC]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Terracotta: {
    low: "bg-[#FAF2EC]",
    medium: "bg-[#F7E0D3]",
    high: "bg-[#EBBBA4]",
    completed: "bg-[#F5E6DC]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Lavender: {
    low: "bg-[#F4F0FB]",
    medium: "bg-[#E5DAF7]",
    high: "bg-[#CCAFF0]",
    completed: "bg-[#EBE3F6]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Sunflower: {
    low: "bg-[#FAF5E6]",
    medium: "bg-[#F5E5C0]",
    high: "bg-[#ECC787]",
    completed: "bg-[#FAF0DC]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Teal: {
    low: "bg-[#EEFAF7]",
    medium: "bg-[#D0F5ED]",
    high: "bg-[#A3EBE0]",
    completed: "bg-[#E2F7F3]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Peach: {
    low: "bg-[#FAF2EC]",
    medium: "bg-[#F6E1D1]",
    high: "bg-[#ECC0A3]",
    completed: "bg-[#FAF4EF]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Oat: {
    low: "bg-[#FAF5EE]",
    medium: "bg-[#F5E8DB]",
    high: "bg-[#E9D1BE]",
    completed: "bg-[#FAF5EE]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Lilac: {
    low: "bg-[#FAF0FA]",
    medium: "bg-[#F5DBF7]",
    high: "bg-[#E8AFED]",
    completed: "bg-[#F8EFF8]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
  Sage: {
    low: "bg-[#F3FAF0]",
    medium: "bg-[#E2F5DC]",
    high: "bg-[#C4EABD]",
    completed: "bg-[#F3FAF0]",
    border: "border border-black/[0.06]",
    text: "text-gray-900",
    category: "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    checkmark: "text-gray-500",
  },
};

export const popTheme: VisualStyleDefinition = {
  id: "pop",
  name: "Pop",
  type: "flat",
  hoverClass: "md:hover:-translate-y-[1.2px] md:hover:border-black/[0.10] md:hover:shadow-[0_2px_5px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]",
  interactiveClass: "md:active:scale-[0.975] md:active:translate-y-0 md:active:shadow-none md:active:border-black/[0.07]",
  completedBaseClass: "opacity-70 scale-[0.98]", // Aligned with pastel completed base class for readability
  shadowClass: "shadow-[0_1px_2px_rgba(0,0,0,0.03),0_0.5px_1px_rgba(0,0,0,0.02)]",
  colors: {
    light: popColorsLight,
    dark: popColorsLight,
  },
};

export const themes: Record<"pastel" | "pop", VisualStyleDefinition> = {
  pastel: pastelTheme,
  pop: popTheme,
};
