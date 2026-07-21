/**
 * PredictionResult.tsx
 * ----------------------
 * Displays the predicted price returned by POST /predict inside a
 * clean summary card, with an Indian Rupee readout and its Lac/Cr
 * shorthand.
 */

import { forwardRef } from "react";
import { formatLacCrore, formatRupees } from "../../utils/formatCurrency";
import styles from "./PredictionResult.module.css";

interface PredictionResultProps {
  predictedPrice: number;
}

const PredictionResult = forwardRef<HTMLDivElement, PredictionResultProps>(
  ({ predictedPrice }, ref) => {
    return (
      <div ref={ref} className={styles.card} role="status">
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M5 12.5L9.5 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className={styles.label}>Predicted House Price</p>
        <p className={styles.price}>{formatRupees(predictedPrice)}</p>
        <p className={styles.subValue}>≈ ₹{formatLacCrore(predictedPrice)}</p>
      </div>
    );
  }
);

PredictionResult.displayName = "PredictionResult";

export default PredictionResult;
