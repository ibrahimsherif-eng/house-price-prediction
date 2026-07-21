/**
 * Toast.tsx
 * -----------
 * A small, auto-dismissing notification shown after a successful
 * prediction. Deliberately understated, no animation beyond a fade.
 */

import { useEffect } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  onDismiss: () => void;
  durationMs?: number;
}

function Toast({ message, onDismiss, durationMs = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timer);
  }, [onDismiss, durationMs]);

  return (
    <div className={styles.toast} role="status">
      {message}
    </div>
  );
}

export default Toast;
