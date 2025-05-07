export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE as string;

export interface QueryParams {
  fields?: string;
  [key: string]: string | string[] | number | boolean | null | undefined;
}

export async function serverFetcher<T>(
  endpoint: string,
  queryParams?: QueryParams
): Promise<T> {
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
    ? `${API_BASE_URL}${endpoint}?${queryString.toString()}`
    : `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
