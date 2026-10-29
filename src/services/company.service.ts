import type { ApiResponse } from "@/types/api.types";
import type { Company } from "@/types/company.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCompany(): Promise<ApiResponse<Company>> {
  const response = await fetch(
    `${API_URL}public/company`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo obtener la información de la empresa."
    );
  }

  return response.json();
}