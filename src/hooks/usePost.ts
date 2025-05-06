/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { fetcher } from "@/lib/fetcher";

export function usePost<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (endpoint: string, payload: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetcher<T>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setData(response);
      return response;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      throw errorObj;
    } finally {
      setLoading(false);
    }
  };

  return { postData, data, loading, error };
}
