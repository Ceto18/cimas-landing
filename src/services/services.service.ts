import type {
  ApiResponse,
  PaginationData,
} from "@/types/api.types";

import type { Service } from "@/types/service.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServices(
  page = 1,
  perPage = 10
): Promise<ApiResponse<PaginationData<Service>>> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  const response = await fetch(
    `${API_URL}public/service?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener los servicios."
    );
  }

  return response.json();
}