/**
 * constants/formOptions.ts
 * -------------------------
 * Dropdown options for the prediction form. The backend has no endpoint
 * that lists valid values, so these are copied directly from the
 * project's locations.json and from the categories the trained model's
 * encoder was fit on (see schemas.py). Keep this file in sync with the
 * backend if either ever changes.
 */

import type {
  FacingType,
  FurnishingType,
  OwnershipType,
  TransactionType,
} from "../types";

export const LOCATIONS: string[] = [
  "Other",
  "ahmedabad",
  "bangalore",
  "chennai",
  "faridabad",
  "greater-noida",
  "gurgaon",
  "hyderabad",
  "jaipur",
  "kolkata",
  "new-delhi",
  "pune",
  "surat",
  "thane",
  "vadodara",
];

export const TRANSACTION_OPTIONS: TransactionType[] = [
  "New Property",
  "Resale",
  "Other",
  "Unknown",
];

export const FURNISHING_OPTIONS: FurnishingType[] = [
  "Furnished",
  "Semi-Furnished",
  "Unfurnished",
  "Unknown",
];

export const FACING_OPTIONS: FacingType[] = [
  "East",
  "West",
  "North",
  "South",
  "North - East",
  "North - West",
  "South - East",
  "South -West",
  "Unknown",
];

export const OWNERSHIP_OPTIONS: OwnershipType[] = [
  "Freehold",
  "Leasehold",
  "Co-operative Society",
  "Power Of Attorney",
  "Unknown",
];

/** Human-friendly label for a location value, e.g. "new-delhi" -> "New Delhi". */
export function formatLocationLabel(location: string): string {
  if (location === "Other") return "Other";
  return location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
