/**
 * hooks/usePrediction.ts
 * ------------------------
 * Encapsulates the lifecycle of a prediction request: idle, loading,
 * success, or error. Components stay free of Axios details.
 */

import { useCallback, useState } from "react";
import { predictPrice, toApiError, type ApiError } from "../services/api";
import type { HouseFeaturesRequest } from "../types";

interface UsePredictionResult {
  isLoading: boolean;
  predictedPrice: number | null;
  error: ApiError | null;
  submit: (payload: HouseFeaturesRequest) => Promise<void>;
  reset: () => void;
}

export function usePrediction(): UsePredictionResult {
  const [isLoading, setIsLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const submit = useCallback(async (payload: HouseFeaturesRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await predictPrice(payload);
      setPredictedPrice(result.predicted_price);
    } catch (caughtError) {
      setPredictedPrice(null);
      setError(toApiError(caughtError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPredictedPrice(null);
    setError(null);
  }, []);

  return { isLoading, predictedPrice, error, submit, reset };
}
