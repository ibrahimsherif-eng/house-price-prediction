/**
 * utils/validation.ts
 * ---------------------
 * Client-side validation rules. These mirror the constraints enforced
 * by the backend's Pydantic schema (schemas.py) so users see mistakes
 * immediately, instead of waiting for a rejected request.
 */

import { LOCATIONS } from "../constants/formOptions";
import type { FormErrors, PredictionFormState } from "../types";

function parseNumber(value: string): number {
  return Number(value);
}

export function validateForm(form: PredictionFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.location || !LOCATIONS.includes(form.location)) {
    errors.location = "Select a valid location.";
  }

  if (!form.Transaction) {
    errors.Transaction = "Select a transaction type.";
  }

  if (!form.Furnishing) {
    errors.Furnishing = "Select a furnishing status.";
  }

  if (!form.facing) {
    errors.facing = "Select a facing direction.";
  }

  if (!form.Ownership) {
    errors.Ownership = "Select an ownership type.";
  }

  const area = parseNumber(form.area_sqft);
  if (form.area_sqft.trim() === "" || Number.isNaN(area)) {
    errors.area_sqft = "Enter the area in square feet.";
  } else if (area <= 0) {
    errors.area_sqft = "Area must be greater than 0.";
  } else if (area > 100000) {
    errors.area_sqft = "Enter a realistic area (under 100,000 sqft).";
  }

  const bathroom = parseNumber(form.Bathroom);
  if (form.Bathroom.trim() === "" || Number.isNaN(bathroom)) {
    errors.Bathroom = "Enter the number of bathrooms.";
  } else if (bathroom < 0 || bathroom > 11) {
    errors.Bathroom = "Must be between 0 and 11.";
  }

  const balcony = parseNumber(form.Balcony);
  if (form.Balcony.trim() === "" || Number.isNaN(balcony)) {
    errors.Balcony = "Enter the number of balconies.";
  } else if (balcony < 0 || balcony > 11) {
    errors.Balcony = "Must be between 0 and 11.";
  }

  const parking = parseNumber(form.car_parking_count);
  if (form.car_parking_count.trim() === "" || Number.isNaN(parking)) {
    errors.car_parking_count = "Enter the number of parking spaces.";
  } else if (parking < 0 || parking > 10) {
    errors.car_parking_count = "Must be between 0 and 10.";
  }

  const currentFloor = parseNumber(form.current_floor);
  if (form.current_floor.trim() === "" || Number.isNaN(currentFloor)) {
    errors.current_floor = "Enter the current floor.";
  } else if (currentFloor < 0) {
    errors.current_floor = "Cannot be negative.";
  }

  const totalFloors = parseNumber(form.total_floors);
  if (form.total_floors.trim() === "" || Number.isNaN(totalFloors)) {
    errors.total_floors = "Enter the total number of floors.";
  } else if (totalFloors < 0) {
    errors.total_floors = "Cannot be negative.";
  } else if (
    !Number.isNaN(currentFloor) &&
    currentFloor > totalFloors
  ) {
    errors.total_floors = "Total floors cannot be less than the current floor.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
