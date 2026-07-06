// src/lib/designTokens.ts

// This module contains the concrete visual values (Tailwind utility classes)
// used by the UI layer. It is the single source of truth for all visual
// definitions such as background colours, borders, text colours, category
// badges, and check‑mark colours.

export const designTokens = {
  bg: {
    // Honey
    "palette-01-low": "bg-[#FAF7F0]",
    "palette-01-medium": "bg-[#F5EEDB]",
    "palette-01-high": "bg-[#F0DEC1]",
    "palette-01-completed": "bg-[#F3EFE7]",
    // Sunflower
    "palette-02-low": "bg-[#FAF6ED]",
    "palette-02-medium": "bg-[#F4E8CD]",
    "palette-02-high": "bg-[#ECD6A5]",
    "palette-02-completed": "bg-[#EFE8DB]",
    // Peach
    "palette-03-low": "bg-[#FAF4EF]",
    "palette-03-medium": "bg-[#F6E9DF]",
    "palette-03-high": "bg-[#F1D8C9]",
    "palette-03-completed": "bg-[#EEE5DE]",
    // Terracotta
    "palette-04-low": "bg-[#FAF3EE]",
    "palette-04-medium": "bg-[#F5DFD5]",
    "palette-04-high": "bg-[#ECC5B4]",
    "palette-04-completed": "bg-[#EDE1DB]",
    // Rose
    "palette-05-low": "bg-[#FAF2EF]",
    "palette-05-medium": "bg-[#F5E4DF]",
    "palette-05-high": "bg-[#EFD1C8]",
    "palette-05-completed": "bg-[#EDE2DE]",
    // Sage
    "palette-06-low": "bg-[#F4FAF2]",
    "palette-06-medium": "bg-[#E8F4E4]",
    "palette-06-high": "bg-[#D5EAD0]",
    "palette-06-completed": "bg-[#E2ECE0]",
    // Mint
    "palette-07-low": "bg-[#F2FAF6]",
    "palette-07-medium": "bg-[#DFF3E9]",
    "palette-07-high": "bg-[#C3EADB]",
    "palette-07-completed": "bg-[#DFEBE7]",
    // Teal
    "palette-08-low": "bg-[#F1FAF9]",
    "palette-08-medium": "bg-[#DEF3F0]",
    "palette-08-high": "bg-[#C3EBE6]",
    "palette-08-completed": "bg-[#DFECEB]",
    // Powder Blue
    "palette-09-low": "bg-[#F1F5FA]",
    "palette-09-medium": "bg-[#E4ECF5]",
    "palette-09-high": "bg-[#CADDF0]",
    "palette-09-completed": "bg-[#DFE5EC]",
    // Lavender
    "palette-10-low": "bg-[#F5F2FA]",
    "palette-10-medium": "bg-[#ECE6F5]",
    "palette-10-high": "bg-[#DBD1ED]",
    "palette-10-completed": "bg-[#E6E1EC]",
    // Lilac
    "palette-11-low": "bg-[#F8F2FA]",
    "palette-11-medium": "bg-[#F0E3F5]",
    "palette-11-high": "bg-[#E6CEF0]",
    "palette-11-completed": "bg-[#EAE1EC]",
    // Oat
    "palette-12-low": "bg-[#FAF6F2]",
    "palette-12-medium": "bg-[#F4ECE4]",
    "palette-12-high": "bg-[#ECDDCF]",
    "palette-12-completed": "bg-[#ECE6E1]",
    // Carry forward
    "cf-bg": "bg-[#FFFBEB]",
  },
  bgDark: {
    // Honey (identical to bg for now)
    "palette-01-low": "bg-[#FAF7F0]",
    "palette-01-medium": "bg-[#F5EEDB]",
    "palette-01-high": "bg-[#F0DEC1]",
    "palette-01-completed": "bg-[#F3EFE7]",
    // Sunflower
    "palette-02-low": "bg-[#FAF6ED]",
    "palette-02-medium": "bg-[#F4E8CD]",
    "palette-02-high": "bg-[#ECD6A5]",
    "palette-02-completed": "bg-[#EFE8DB]",
    // Peach
    "palette-03-low": "bg-[#FAF4EF]",
    "palette-03-medium": "bg-[#F6E9DF]",
    "palette-03-high": "bg-[#F1D8C9]",
    "palette-03-completed": "bg-[#EEE5DE]",
    // Terracotta
    "palette-04-low": "bg-[#FAF3EE]",
    "palette-04-medium": "bg-[#F5DFD5]",
    "palette-04-high": "bg-[#ECC5B4]",
    "palette-04-completed": "bg-[#EDE1DB]",
    // Rose
    "palette-05-low": "bg-[#FAF2EF]",
    "palette-05-medium": "bg-[#F5E4DF]",
    "palette-05-high": "bg-[#EFD1C8]",
    "palette-05-completed": "bg-[#EDE2DE]",
    // Sage
    "palette-06-low": "bg-[#F4FAF2]",
    "palette-06-medium": "bg-[#E8F4E4]",
    "palette-06-high": "bg-[#D5EAD0]",
    "palette-06-completed": "bg-[#E2ECE0]",
    // Mint
    "palette-07-low": "bg-[#F2FAF6]",
    "palette-07-medium": "bg-[#DFF3E9]",
    "palette-07-high": "bg-[#C3EADB]",
    "palette-07-completed": "bg-[#DFEBE7]",
    // Teal
    "palette-08-low": "bg-[#F1FAF9]",
    "palette-08-medium": "bg-[#DEF3F0]",
    "palette-08-high": "bg-[#C3EBE6]",
    "palette-08-completed": "bg-[#DFECEB]",
    // Powder Blue
    "palette-09-low": "bg-[#F1F5FA]",
    "palette-09-medium": "bg-[#E4ECF5]",
    "palette-09-high": "bg-[#CADDF0]",
    "palette-09-completed": "bg-[#DFE5EC]",
    // Lavender
    "palette-10-low": "bg-[#F5F2FA]",
    "palette-10-medium": "bg-[#ECE6F5]",
    "palette-10-high": "bg-[#DBD1ED]",
    "palette-10-completed": "bg-[#E6E1EC]",
    // Lilac
    "palette-11-low": "bg-[#F8F2FA]",
    "palette-11-medium": "bg-[#F0E3F5]",
    "palette-11-high": "bg-[#E6CEF0]",
    "palette-11-completed": "bg-[#EAE1EC]",
    // Oat
    "palette-12-low": "bg-[#FAF6F2]",
    "palette-12-medium": "bg-[#F4ECE4]",
    "palette-12-high": "bg-[#ECDDCF]",
    "palette-12-completed": "bg-[#ECE6E1]",
    // Carry forward (dark UI chrome background)
    "cf-bg": "bg-[#2C2A1F]",
  },
  border: {
    "default-border": "border border-black/[0.04]",
    "completed-border": "border border-black/[0.03]",
    "cf-border": "border border-amber-600/[0.12]",
  },
  text: {
    "default-text": "text-gray-900",
    "completed-text": "text-gray-500",
  },
  textDark: {
    "default-text": "text-gray-900",
    "completed-text": "text-gray-500",
  },
  category: {
    "default-category": "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-900/40",
    "completed-category": "absolute top-0 right-0 text-[10px] font-medium uppercase tracking-[0.06em] text-gray-500/40",
  },
  checkmark: {
    "default-checkmark": "text-gray-500",
    "completed-checkmark": "text-gray-500",
  },
} as const;

export type DesignTokens = typeof designTokens;
