/**
 * LoadingSpinner.tsx
 * --------------------
 * A small, quiet rotating ring used inside buttons and loading states.
 */

import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  label?: string;
}

function LoadingSpinner({ label }: LoadingSpinnerProps) {
  return (
    <span className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.ring} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </span>
  );
}

export default LoadingSpinner;
