/**
 * NumberField.tsx
 * -----------------
 * A labeled numeric input with an optional error message. Shared by
 * every numeric field in the prediction form.
 */

import type { ChangeEvent } from "react";
import styles from "./PredictionForm.module.css";

interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  onChange: (value: string) => void;
}

function NumberField({
  id,
  label,
  value,
  placeholder,
  min,
  max,
  step = 1,
  error,
  onChange,
}: NumberFieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        className={`${styles.control} ${styles.controlMono} ${error ? styles.controlError : ""}`}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}

export default NumberField;
