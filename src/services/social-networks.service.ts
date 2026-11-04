import type {
  SocialNetworkProfilesResponse,
} from "@/types/social-network.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSocialNetworkProfiles(): Promise<SocialNetworkProfilesResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL no está configurada.");
  }

  const baseUrl = API_URL.replace(/\/+$/, "");

  const response = await fetch(
    `${baseUrl}/public/social-network-profiles`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener las redes sociales."
    );
  }

  return response.json();
}