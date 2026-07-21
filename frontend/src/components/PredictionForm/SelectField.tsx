/**
 * SelectField.tsx
 * -----------------
 * A labeled dropdown with an optional error message. Shared by every
 * select-type field in the prediction form.
 */

import type { ChangeEvent } from "react";
import styles from "./PredictionForm.module.css";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  error?: string;
  onChange: (value: string) => void;
  formatOption?: (option: string) => string;
}

function SelectField({
  id,
  label,
  value,
  placeholder,
  options,
  error,
  onChange,
  formatOption,
}: SelectFieldProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={`${styles.control} ${error ? styles.controlError : ""}`}
        value={value}
        onChange={handleChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption ? formatOption(option) : option}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}

export default SelectField;
