/**
 * hooks/useBackendHealth.ts
 * ---------------------------
 * Pings GET /health once on mount so the header can show whether the
 * prediction backend is reachable.
 */

import { useEffect, useState } from "react";
import { checkHealth } from "../services/api";

export type BackendStatus = "checking" | "online" | "offline";

export function useBackendHealth(): BackendStatus {
  const [status, setStatus] = useState<BackendStatus>("checking");

  useEffect(() => {
    let isMounted = true;

    checkHealth()
      .then((response) => {
        if (isMounted) {
          setStatus(response.status === "ok" ? "online" : "offline");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("offline");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return status;
}
