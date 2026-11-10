import type {
  ApiResponse,
  PaginationData,
} from "@/types/api.types";

import type { Project } from "@/types/project.types";
import type { ProjectType } from "@/types/project-type.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProjects(
  page = 1,
  perPage = 10
): Promise<ApiResponse<PaginationData<Project>>> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  const response = await fetch(
    `${API_URL}public/projects?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener los proyectos."
    );
  }

  return response.json();
}

// OBTENER TIPOS DE PROYECTO
export async function getProjectTypes(): Promise<
  ApiResponse<ProjectType[]>
> {
  const response = await fetch(
    `${API_URL}public/projects/types`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener los tipos de proyecto."
    );
  }

  return response.json();
}