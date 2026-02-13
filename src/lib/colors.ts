export const SMALL_COLORS = [
  "#F4EBD0",
  "#DCE8F2",
  "#FDE2E4",
  "#E2F0CB",
];

export const MEDIUM_COLORS = [
  "#B5C9E2",
  "#E8A0BF",
  "#A8D5BA",
  "#FFD6A5",
];

export const BIG_COLORS = [
  "#355070",
  "#6D597A",
  "#B56576",
  "#457B9D",
];

export function getRandomColor(priority: "small" | "medium" | "big"): string {
  let palette: string[];
  switch (priority) {
    case "small":
      palette = SMALL_COLORS;
      break;
    case "medium":
      palette = MEDIUM_COLORS;
      break;
    case "big":
      palette = BIG_COLORS;
      break;
    default:
      palette = SMALL_COLORS;
  }
  return palette[Math.floor(Math.random() * palette.length)];
}
