// utils/helpers.ts — General utility functions
import slugifyLib from "slugify";

/** Generate a URL-friendly slug from a string */
export function slugify(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

/** Format price in PKR */
export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

/** Truncate text to a specified length */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/** Generate a unique ID */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/** Pattern type options */
export const PATTERN_TYPES = [
  "Floral",
  "Abstract",
  "Geometric",
  "Vintage",
  "Minimalist",
  "Artistic Print",
  "Solid",
  "Embroidered",
  "Handpainted",
];

/** Color options */
export const COLOR_OPTIONS = [
  "Ivory",
  "Beige",
  "Blush Pink",
  "Dusty Rose",
  "Sage Green",
  "Lavender",
  "Champagne",
  "Pearl White",
  "Nude",
  "Mauve",
  "Terracotta",
  "Burgundy",
  "Black",
  "Navy",
  "Olive",
];

/** Size options */
export const SIZE_OPTIONS = ["Small", "Medium", "Large"];

/** Material options */
export const MATERIAL_OPTIONS = [
  "Premium Faux Leather",
  "Vegan Leather",
  "Canvas",
  "Cotton",
  "Linen",
  "Jute",
  "Silk Blend",
];
