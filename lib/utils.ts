import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAbsoluteTime(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return format(parsedDate, "PPP, p"); // Example: Apr 30, 2025, 10:49 AM
}
