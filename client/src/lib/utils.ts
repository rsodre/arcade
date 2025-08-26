import { clsx, type ClassValue } from "clsx";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const base = "";

export const size = {
  "2xs": "h-3 w-3",
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  default: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
  "2xl": "h-14 w-14",
  "3xl": "h-[72px] w-[72px]",
};

export const iconVariants = cva(base, {
  variants: {
    size,
  },
  defaultVariants: {
    size: "default",
  },
});
