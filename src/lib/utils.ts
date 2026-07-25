import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PrintSize } from "./use-context";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRINT_SIZES: PrintSize[] = [
  { id: "3.5x2", label: "3.5 × 2 in", width: 3.5, height: 2 },
  { id: "3.5x5", label: "3.5 × 5 in", width: 3.5, height: 5 },
  { id: "4x6", label: "4 × 6 in", width: 4, height: 6 },
  { id: "5x7", label: "5 × 7 in", width: 5, height: 7 },
  { id: "8x10", label: "8 × 10 in", width: 8, height: 10 },
  { id: "11x14", label: "11 × 14 in", width: 11, height: 14 },
  { id: "12x18", label: "12 × 18 in", width: 12, height: 18 },
  { id: "16x20", label: "16 × 20 in", width: 16, height: 20 },
  { id: "18x24", label: "18 × 24 in", width: 18, height: 24 },
  { id: "20x30", label: "20 × 30 in", width: 20, height: 30 },
  { id: "24x36", label: "24 × 36 in", width: 24, height: 36 },
];
