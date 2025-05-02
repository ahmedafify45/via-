import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";

export function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetcher<T>(endpoint);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [endpoint]);

  return { data, loading, error };
}
