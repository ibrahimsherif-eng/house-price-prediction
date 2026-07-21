/**
 * PredictionForm.tsx
 * --------------------
 * Collects all fields required by POST /predict, validates them
 * client-side, and hands a fully-typed payload to the caller on submit.
 */

import { useState, type FormEvent } from "react";
import {
  FACING_OPTIONS,
  FURNISHING_OPTIONS,
  LOCATIONS,
  OWNERSHIP_OPTIONS,
  TRANSACTION_OPTIONS,
  formatLocationLabel,
} from "../../constants/formOptions";
import type {
  FacingType,
  FormErrors,
  FurnishingType,
  HouseFeaturesRequest,
  OwnershipType,
  PredictionFormState,
  TransactionType,
} from "../../types";
import { hasErrors, validateForm } from "../../utils/validation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import NumberField from "./NumberField";
import SelectField from "./SelectField";
import styles from "./PredictionForm.module.css";

const EMPTY_FORM: PredictionFormState = {
  location: "",
  area_sqft: "",
  Transaction: "",
  Furnishing: "",
  facing: "",
  Ownership: "",
  Bathroom: "",
  Balcony: "",
  car_parking_count: "",
  current_floor: "",
  total_floors: "",
};

interface PredictionFormProps {
  isSubmitting: boolean;
  onSubmit: (payload: HouseFeaturesRequest) => void;
}

function PredictionForm({ isSubmitting, onSubmit }: PredictionFormProps) {
  const [form, setForm] = useState<PredictionFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  function updateField<K extends keyof PredictionFormState>(
    field: K,
    value: PredictionFormState[K]
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    const payload: HouseFeaturesRequest = {
      location: form.location,
      area_sqft: Number(form.area_sqft),
      Transaction: form.Transaction as TransactionType,
      Furnishing: form.Furnishing as FurnishingType,
      facing: form.facing as FacingType,
      Ownership: form.Ownership as OwnershipType,
      Bathroom: Number(form.Bathroom),
      Balcony: Number(form.Balcony),
      car_parking_count: Number(form.car_parking_count),
      current_floor: Number(form.current_floor),
      total_floors: Number(form.total_floors),
    };

    onSubmit(payload);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Location &amp; Deal</h2>
        <div className={styles.grid2}>
          <SelectField
            id="location"
            label="Location"
            placeholder="Select a city"
            options={LOCATIONS}
            value={form.location}
            error={errors.location}
            onChange={(value) => updateField("location", value)}
            formatOption={formatLocationLabel}
          />
          <SelectField
            id="transaction"
            label="Transaction"
            placeholder="Select transaction type"
            options={TRANSACTION_OPTIONS}
            value={form.Transaction}
            error={errors.Transaction}
            onChange={(value) => updateField("Transaction", value as TransactionType)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Property Details</h2>
        <div className={styles.grid3}>
          <SelectField
            id="furnishing"
            label="Furnishing"
            placeholder="Select furnishing status"
            options={FURNISHING_OPTIONS}
            value={form.Furnishing}
            error={errors.Furnishing}
            onChange={(value) => updateField("Furnishing", value as FurnishingType)}
          />
          <SelectField
            id="facing"
            label="Facing"
            placeholder="Select facing direction"
            options={FACING_OPTIONS}
            value={form.facing}
            error={errors.facing}
            onChange={(value) => updateField("facing", value as FacingType)}
          />
          <SelectField
            id="ownership"
            label="Ownership"
            placeholder="Select ownership type"
            options={OWNERSHIP_OPTIONS}
            value={form.Ownership}
            error={errors.Ownership}
            onChange={(value) => updateField("Ownership", value as OwnershipType)}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Measurements</h2>
        <div className={styles.grid3}>
          <NumberField
            id="area_sqft"
            label="Area (sqft)"
            placeholder="e.g. 1200"
            min={1}
            step={1}
            value={form.area_sqft}
            error={errors.area_sqft}
            onChange={(value) => updateField("area_sqft", value)}
          />
          <NumberField
            id="bathroom"
            label="Bathroom"
            placeholder="e.g. 2"
            min={0}
            max={11}
            value={form.Bathroom}
            error={errors.Bathroom}
            onChange={(value) => updateField("Bathroom", value)}
          />
          <NumberField
            id="balcony"
            label="Balcony"
            placeholder="e.g. 1"
            min={0}
            max={11}
            value={form.Balcony}
            error={errors.Balcony}
            onChange={(value) => updateField("Balcony", value)}
          />
          <NumberField
            id="parking"
            label="Parking Spaces"
            placeholder="e.g. 1"
            min={0}
            max={10}
            value={form.car_parking_count}
            error={errors.car_parking_count}
            onChange={(value) => updateField("car_parking_count", value)}
          />
          <NumberField
            id="current_floor"
            label="Current Floor"
            placeholder="e.g. 3"
            min={0}
            value={form.current_floor}
            error={errors.current_floor}
            onChange={(value) => updateField("current_floor", value)}
          />
          <NumberField
            id="total_floors"
            label="Total Floors"
            placeholder="e.g. 10"
            min={0}
            value={form.total_floors}
            error={errors.total_floors}
            onChange={(value) => updateField("total_floors", value)}
          />
        </div>
      </section>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner label="Predicting…" /> : "Predict"}
        </button>
      </div>
    </form>
  );
}

export default PredictionForm;
