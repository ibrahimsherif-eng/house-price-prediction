/**
 * services/api.ts
 * -----------------
 * Single place that knows how to talk to the FastAPI backend.
 * The base URL is read from an environment variable so it can be
 * changed per environment without touching code.
 */

import axios, { AxiosError } from "axios";
import type {
  HealthResponse,
  HouseFeaturesRequest,
  PredictionResponse,
} from "../types";

export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/** A normalized, user-facing error shape used throughout the app. */
export interface ApiError {
  kind: "network" | "validation" | "server" | "unknown";
  message: string;
}

/** Turn any error thrown by Axios into a predictable, friendly ApiError. */
export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ detail?: unknown }>;

    if (!axiosError.response) {
      return {
        kind: "network",
        message:
          axiosError.code === "ECONNABORTED"
            ? "The request took too long to respond. Please try again."
            : `Could not reach the prediction server at ${API_BASE_URL}. Make sure the backend is running.`,
      };
    }

    const { status, data } = axiosError.response;
    const detail = data?.detail;

    if (status === 422) {
      return {
        kind: "validation",
        message: "Some fields failed validation. Please check the form and try again.",
      };
    }

    if (status === 400) {
      return {
        kind: "validation",
        message: typeof detail === "string" ? detail : "The submitted data was rejected by the server.",
      };
    }

    if (status >= 500) {
      return {
        kind: "server",
        message: "The prediction model could not process this request. Please try again.",
      };
    }

    return {
      kind: "unknown",
      message: typeof detail === "string" ? detail : "Something went wrong while getting a prediction.",
    };
  }

  return { kind: "unknown", message: "An unexpected error occurred." };
}

/** POST /predict — returns the predicted house price. */
export async function predictPrice(
  payload: HouseFeaturesRequest
): Promise<PredictionResponse> {
  const response = await apiClient.post<PredictionResponse>("/predict", payload);
  return response.data;
}

/** GET /health — used to show whether the backend is reachable. */
export async function checkHealth(): Promise<HealthResponse> {
  const response = await apiClient.get<HealthResponse>("/health", {
    timeout: 5000,
  });
  return response.data;
}
