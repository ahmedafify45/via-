"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";

export interface QueryParams {
  fields?: string;
  [key: string]: string | string[] | number | boolean | null | undefined;
}

export function useFetch<T>(endpoint: string, queryParams?: QueryParams) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    try {
      const queryString = new URLSearchParams();

      if (queryParams) {
        if (queryParams.fields) {
          queryString.append("fields", queryParams.fields);
        }

        // Handle other parameters
        Object.entries(queryParams).forEach(([key, value]) => {
          if (key !== "fields" && value !== undefined && value !== null) {
            queryString.append(key, String(value));
          }
        });
      }

      const url = queryString.toString()
        ? `${endpoint}?${queryString.toString()}`
        : endpoint;

      const response = await fetcher<T>(url);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { data, loading, error };
}
