import type { ApiResponse } from "@/types/api.types";
import type { Home } from "@/types/home.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHome(): Promise<ApiResponse<Home>> {
  const response = await fetch(
    `${API_URL}public/home`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo obtener la información de inicio."
    );
  }

  return response.json();
}