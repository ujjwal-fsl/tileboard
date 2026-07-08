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

// Rebuilt Pop Theme: Confident, Premium Printed Graphics with Editorial Curated Palette
const popColorsLight: Record<PaletteName, VisualStyleColors> = {
  Honey: { // Warm Sunflower
    low: "bg-[#FFD369]",
    medium: "bg-[#F3B63A]",
    high: "bg-[#D4931A]",
    completed: "bg-[#FFE699]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Blue: { // Royal Cobalt
    low: "bg-[#3B62D9]",
    medium: "bg-[#2848B2]",
    high: "bg-[#19328C]",
    completed: "bg-[#6B8AE6]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Rose: { // Tomato Coral
    low: "bg-[#FF6E61]",
    medium: "bg-[#E84E40]",
    high: "bg-[#CF3629]",
    completed: "bg-[#FF9B91]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Mint: { // Jade
    low: "bg-[#2E9473]",
    medium: "bg-[#1D7457]",
    high: "bg-[#10553E]",
    completed: "bg-[#54B493]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Terracotta: { // Burnt Orange
    low: "bg-[#E67E22]",
    medium: "bg-[#D35400]",
    high: "bg-[#A04000]",
    completed: "bg-[#F39C12]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Lavender: { // Plum
    low: "bg-[#834E72]",
    medium: "bg-[#643453]",
    high: "bg-[#4B223B]",
    completed: "bg-[#A46E93]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Sunflower: { // Pistachio
    low: "bg-[#C3E4A2]",
    medium: "bg-[#ACD885]",
    high: "bg-[#94C668]",
    completed: "bg-[#D5EEBE]",
    border: "border border-black/[0.06]",
    text: "text-black",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-black/40",
    checkmark: "text-black/60",
  },
  Teal: { // Deep Teal
    low: "bg-[#0F8C8C]",
    medium: "bg-[#0A6B6B]",
    high: "bg-[#054C4C]",
    completed: "bg-[#3AA8A8]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Peach: { // Ink Blue
    low: "bg-[#2D4263]",
    medium: "bg-[#1A283C]",
    high: "bg-[#0F1722]",
    completed: "bg-[#5D708B]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Oat: { // Graphite
    low: "bg-[#5C5C5C]",
    medium: "bg-[#454545]",
    high: "bg-[#2F2F2F]",
    completed: "bg-[#8E8E8E]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Lilac: { // Raspberry
    low: "bg-[#D93D71]",
    medium: "bg-[#B32753]",
    high: "bg-[#8C1637]",
    completed: "bg-[#E57399]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
  },
  Sage: { // Eucalyptus
    low: "bg-[#84A9AC]",
    medium: "bg-[#5B8286]",
    high: "bg-[#3B5A5D]",
    completed: "bg-[#A7C5C8]",
    border: "border border-black/[0.06]",
    text: "text-white",
    category: "absolute top-0 right-0 text-[10px] font-semibold uppercase tracking-[0.06em] text-white/55",
    checkmark: "text-white/80",
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
