/**
 * types/index.ts
 * ---------------
 * These types mirror the backend's Pydantic schemas (schemas.py) field
 * for field. Field names and enum values must stay byte-for-byte
 * identical to what the FastAPI backend expects.
 */

export type TransactionType = "New Property" | "Resale" | "Other" | "Unknown";

export type FurnishingType =
  | "Furnished"
  | "Semi-Furnished"
  | "Unfurnished"
  | "Unknown";

// Note: "South -West" intentionally has no space before "West".
// It matches the exact category the model was trained on.
export type FacingType =
  | "East"
  | "West"
  | "North"
  | "South"
  | "North - East"
  | "North - West"
  | "South - East"
  | "South -West"
  | "Unknown";

export type OwnershipType =
  | "Freehold"
  | "Leasehold"
  | "Co-operative Society"
  | "Power Of Attorney"
  | "Unknown";

/** Request body for POST /predict. Matches HouseFeatures in schemas.py. */
export interface HouseFeaturesRequest {
  location: string;
  area_sqft: number;
  Transaction: TransactionType;
  Furnishing: FurnishingType;
  facing: FacingType;
  Ownership: OwnershipType;
  Bathroom: number;
  Balcony: number;
  car_parking_count: number;
  current_floor: number;
  total_floors: number;
}

/** Response body for POST /predict. Matches PredictionResponse in schemas.py. */
export interface PredictionResponse {
  predicted_price: number;
}

/** Response body for GET /health. Matches HealthResponse in schemas.py. */
export interface HealthResponse {
  status: string;
}

/** Editable form state: every field starts as a string so inputs can be empty. */
export type PredictionFormState = {
  location: string;
  area_sqft: string;
  Transaction: TransactionType | "";
  Furnishing: FurnishingType | "";
  facing: FacingType | "";
  Ownership: OwnershipType | "";
  Bathroom: string;
  Balcony: string;
  car_parking_count: string;
  current_floor: string;
  total_floors: string;
};

export type FormErrors = Partial<Record<keyof PredictionFormState, string>>;
