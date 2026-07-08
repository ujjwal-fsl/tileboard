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

// Rebuilt Pop Theme: Joyful, Confident, Modern, Creative Editorial Graphic Blocks
const popColorsLight: Record<PaletteName, VisualStyleColors> = {
  Honey: { // Warm Lemon Yellow
    low: "bg-[#FFF6A2]",
    medium: "bg-[#FFEB60]",
    high: "bg-[#EED018]",
    completed: "bg-[#FEF9C3]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Blue: { // Royal Cobalt
    low: "bg-[#60A5FA]",
    medium: "bg-[#3B82F6]",
    high: "bg-[#2563EB]",
    completed: "bg-[#DBEAFE]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Rose: { // Tomato Red / Warm Coral
    low: "bg-[#FA8072]",
    medium: "bg-[#FF6B6B]",
    high: "bg-[#EE5253]",
    completed: "bg-[#FCA5A5]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Mint: { // Emerald Mint
    low: "bg-[#A7F3D0]",
    medium: "bg-[#6EE7B7]",
    high: "bg-[#34D399]",
    completed: "bg-[#D1FAE5]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Terracotta: { // Vibrant Orange
    low: "bg-[#FFB07C]",
    medium: "bg-[#FF8E53]",
    high: "bg-[#E05300]",
    completed: "bg-[#FFE2D1]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Lavender: { // Joyful Purple/Violet
    low: "bg-[#C084FC]",
    medium: "bg-[#A855F7]",
    high: "bg-[#9333EA]",
    completed: "bg-[#F3E8FF]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Sunflower: { // Golden Amber
    low: "bg-[#FDE047]",
    medium: "bg-[#FBBF24]",
    high: "bg-[#F59E0B]",
    completed: "bg-[#FEF3C7]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Teal: { // Vibrant Turquoise
    low: "bg-[#5EEAD4]",
    medium: "bg-[#2DD4BF]",
    high: "bg-[#14B8A6]",
    completed: "bg-[#CCFBF1]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Peach: { // Playful Raspberry Pink
    low: "bg-[#FDA4AF]",
    medium: "bg-[#F43F5E]",
    high: "bg-[#E11D48]",
    completed: "bg-[#FFE4E6]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Oat: { // Bright Sky Aqua
    low: "bg-[#7DD3FC]",
    medium: "bg-[#38BDF8]",
    high: "bg-[#0EA5E9]",
    completed: "bg-[#E0F2FE]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Lilac: { // Bright Orchid
    low: "bg-[#F472B6]",
    medium: "bg-[#EC4899]",
    high: "bg-[#D946EF]",
    completed: "bg-[#FCE7F3]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Sage: { // Fresh Lime Sage
    low: "bg-[#BEF264]",
    medium: "bg-[#A3E635]",
    high: "bg-[#84CC16]",
    completed: "bg-[#ECFCCB]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
};

export const popTheme: VisualStyleDefinition = {
  id: "pop",
  name: "Pop",
  type: "hierarchical",
  hoverClass: "md:hover:-translate-y-[1px] md:hover:border-black/[0.09] md:hover:shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  interactiveClass: "md:active:scale-[0.98] md:active:translate-y-0 md:active:shadow-none md:active:border-black/[0.07]",
  completedBaseClass: "opacity-75 scale-[0.98]",
  shadowClass: "shadow-[0_0.5px_1.5px_rgba(0,0,0,0.02)]", // minimal elevation shadow
  colors: {
    light: popColorsLight,
    dark: popColorsLight, // colourful Pop tiles remain identical in dark mode per directions
  },
};

export const themes: Record<"pastel" | "pop", VisualStyleDefinition> = {
  pastel: pastelTheme,
  pop: popTheme,
};
