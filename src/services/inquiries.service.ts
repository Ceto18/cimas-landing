import type { ApiResponse } from "@/types/api.types";
import type { InquiryPayload } from "@/types/inquiry.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createInquiry(
  payload: InquiryPayload
): Promise<ApiResponse<unknown>> {
  const response = await fetch(
    `${API_URL}public/inquiries`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(payload),

      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message || "No se pudo registrar la consulta."
    );
  }

  return result;
}