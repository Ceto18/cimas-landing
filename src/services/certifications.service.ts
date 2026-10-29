import type {
  ApiResponse,
  PaginationData,
} from "@/types/api.types";

import type {
  Certification,
} from "@/types/certification.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCertifications(
  page = 1,
  perPage = 10
): Promise<
  ApiResponse<PaginationData<Certification>>
> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  const response = await fetch(
    `${API_URL}public/certifications?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener las certificaciones."
    );
  }

  return response.json();
}