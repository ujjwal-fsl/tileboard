// src/lib/themes.ts

import type { PaletteName } from "./paletteResolver";

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
  colors: {
    light: defaultColorsLight,
    dark: defaultColorsLight, // Currently identical pastel palette in both light/dark per specifications
  },
};

export const popTheme: VisualStyleDefinition = {
  id: "pop",
  name: "Pop",
  type: "flat",
  colors: {
    light: defaultColorsLight, // Pop not implemented yet; fallback to pastel layout
    dark: defaultColorsLight,
  },
};

export const themes: Record<"pastel" | "pop", VisualStyleDefinition> = {
  pastel: pastelTheme,
  pop: popTheme,
};
