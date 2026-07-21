/**
 * Header.tsx
 * ------------
 * Top section of the page: project title, subtitle, and a small pill
 * showing whether the FastAPI backend is currently reachable.
 */

import { useBackendHealth } from "../../hooks/useBackendHealth";
import styles from "./Header.module.css";

const STATUS_LABEL: Record<string, string> = {
  checking: "Checking model status",
  online: "Model online",
  offline: "Model unreachable",
};

function Header() {
  const status = useBackendHealth();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div>
          <h1 className={styles.title}>House Price Prediction System</h1>
          <p className={styles.subtitle}>
            Predict house prices using a Machine Learning model.
          </p>
        </div>

        <div className={styles.statusPill} data-status={status}>
          <span className={styles.statusDot} aria-hidden="true" />
          {STATUS_LABEL[status]}
        </div>
      </div>
    </header>
  );
}

export default Header;
