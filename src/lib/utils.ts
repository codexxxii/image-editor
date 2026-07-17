import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRINT_SIZES = [
  {
    id: "4x6",
    label: "4 × 6 in",
    width: 4,
    height: 6,
  },
  {
    id: "5x7",
    label: "5 × 7 in",
    width: 5,
    height: 7,
  },
  {
    id: "8x10",
    label: "8 × 10 in",
    width: 8,
    height: 10,
  },

  // Popular frame sizes
  {
    id: "8x12",
    label: "8 × 12 in",
    width: 8,
    height: 12,
  },
  {
    id: "10x10",
    label: "10 × 10 in",
    width: 10,
    height: 10,
  },
  {
    id: "10x13",
    label: "10 × 13 in",
    width: 10,
    height: 13,
  },
  {
    id: "11x14",
    label: "11 × 14 in",
    width: 11,
    height: 14,
  },
  {
    id: "12x12",
    label: "12 × 12 in",
    width: 12,
    height: 12,
  },
  {
    id: "12x16",
    label: "12 × 16 in",
    width: 12,
    height: 16,
  },
  {
    id: "16x20",
    label: "16 × 20 in",
    width: 16,
    height: 20,
  },
  {
    id: "18x24",
    label: "18 × 24 in",
    width: 18,
    height: 24,
  },
  {
    id: "20x24",
    label: "20 × 24 in",
    width: 20,
    height: 24,
  },
  {
    id: "24x36",
    label: "24 × 36 in",
    width: 24,
    height: 36,
  },

  // Square prints
  {
    id: "6x6",
    label: "6 × 6 in",
    width: 6,
    height: 6,
  },
  {
    id: "8x8",
    label: "8 × 8 in",
    width: 8,
    height: 8,
  },
];
