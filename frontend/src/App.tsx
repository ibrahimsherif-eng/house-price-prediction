/**
 * App.tsx
 * ---------
 * Single-page layout: header, prediction form, result card, footer.
 * Owns the top-level state that connects the form to the backend call.
 */

import { useEffect, useRef, useState } from "react";
import ErrorBanner from "./components/ErrorBanner/ErrorBanner";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import PredictionForm from "./components/PredictionForm/PredictionForm";
import PredictionResult from "./components/PredictionResult/PredictionResult";
import Toast from "./components/Toast/Toast";
import { usePrediction } from "./hooks/usePrediction";
import styles from "./App.module.css";

function App() {
  const { isLoading, predictedPrice, error, submit } = usePrediction();
  const [showToast, setShowToast] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (predictedPrice === null) return;

    setShowToast(true);
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [predictedPrice]);

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <PredictionForm isSubmitting={isLoading} onSubmit={submit} />

          {error && (
            <div className={styles.resultSlot}>
              <ErrorBanner message={error.message} />
            </div>
          )}

          {predictedPrice !== null && !error && (
            <div className={styles.resultSlot}>
              <PredictionResult ref={resultRef} predictedPrice={predictedPrice} />
            </div>
          )}
        </div>
      </main>

      <Footer />

      {showToast && (
        <Toast message="Prediction generated." onDismiss={() => setShowToast(false)} />
      )}
    </>
  );
}

export default App;
