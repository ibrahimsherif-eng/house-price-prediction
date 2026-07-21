/**
 * ErrorBanner.tsx
 * -----------------
 * Shows a friendly, specific message when a prediction request fails
 * (network issue, validation rejection, or a server-side error).
 */

import styles from "./ErrorBanner.module.css";

interface ErrorBannerProps {
  message: string;
}

function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className={styles.banner} role="alert">
      <span className={styles.icon} aria-hidden="true">
        !
      </span>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ErrorBanner;
